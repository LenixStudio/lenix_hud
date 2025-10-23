const fs = require('fs');
const path = require('path');
const JavaScriptObfuscator = require('javascript-obfuscator');
const { minify } = require('terser');

const IGNORE_FILE_PATHS = [
  'build.js',
  'client/bridge.js',
];

const IGNORE_DIRS = [
  'node_modules',
  'build',
];

const MANIFEST_FILE = 'fxmanifest.lua';

function shouldIgnoreFile(filePath) {
  const relativePath = path.relative(__dirname, filePath).replace(/\\/g, '/');
  return IGNORE_FILE_PATHS.some(ignorePath => {
    const normalizedIgnorePath = ignorePath.replace(/\\/g, '/');
    return relativePath === normalizedIgnorePath;
  });
}

function findJsFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      if (!file.startsWith('.') && !IGNORE_DIRS.includes(file)) {
        findJsFiles(filePath, fileList);
      }
    } else if (file.endsWith('.js') && !shouldIgnoreFile(filePath)) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

async function buildFile(filePath) {
  try {
    const code = fs.readFileSync(filePath, 'utf8');
    const dir = path.dirname(filePath);
    const fileName = path.basename(filePath);
    const buildDir = path.join(dir, 'build');
    const outputPath = path.join(buildDir, fileName);
    
    console.log(`📦 Building: ${path.relative(__dirname, filePath)}`);
    
    const minified = await minify(code, {
      compress: {
        drop_console: false,
        dead_code: true,
        drop_debugger: true,
        conditionals: true,
        evaluate: true,
        booleans: true,
        loops: true,
        unused: true,
        hoist_funs: true,
        keep_fargs: false,
        hoist_vars: true,
        if_return: true,
        join_vars: true,
        side_effects: true,
      },
      mangle: {
        toplevel: true,
        eval: true,
        keep_fnames: false,
      },
      output: {
        comments: false,
        beautify: false,
      },
    });
    
    const obfuscated = JavaScriptObfuscator.obfuscate(minified.code, {
      rotateStringArray: true,
      stringArray: true,
      stringArrayEncoding: ['rc4'],
      stringArrayThreshold: 0.75,
      splitStrings: true,
      splitStringsChunkLength: 10,
      deadCodeInjection: true,
      deadCodeInjectionThreshold: 0.4,
      controlFlowFlattening: true,
      controlFlowFlatteningThreshold: 0.75,
      identifierNamesGenerator: 'hexadecimal',
      renameGlobals: false,
      selfDefending: true,
      compact: true,
      unicodeEscapeSequence: false,
    });
    
    if (!fs.existsSync(buildDir)) {
      fs.mkdirSync(buildDir, { recursive: true });
    }
    
    fs.writeFileSync(outputPath, obfuscated.getObfuscatedCode());
    console.log(`✅ Output: ${path.relative(__dirname, outputPath)}`);
    
    return {
      originalPath: path.relative(__dirname, filePath).replace(/\\/g, '/'),
      builtPath: path.relative(__dirname, outputPath).replace(/\\/g, '/')
    };
    
  } catch (error) {
    console.error(`❌ Error building ${filePath}:`, error.message);
    return null;
  }
}

function updateManifest(builtFiles) {
  const manifestPath = path.join(__dirname, MANIFEST_FILE);
  
  if (!fs.existsSync(manifestPath)) {
    console.log(`⚠️  Manifest file not found: ${MANIFEST_FILE}`);
    return;
  }
  
  let manifestContent = fs.readFileSync(manifestPath, 'utf8');
  
  builtFiles.forEach(({ originalPath, builtPath }) => {
    const escapedOriginal = originalPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`['"]${escapedOriginal}['"]`, 'g');
    manifestContent = manifestContent.replace(regex, `'${builtPath}'`);
  });
  
  fs.writeFileSync(manifestPath, manifestContent);
  console.log(`\n📝 Updated ${MANIFEST_FILE} with built file paths`);
}

async function main() {
  console.log('🔍 Scanning for JavaScript files...\n');
  console.log(`⚙️  Ignoring directories: ${IGNORE_DIRS.join(', ')}`);
  console.log(`⚙️  Ignoring files: ${IGNORE_FILE_PATHS.join(', ')}\n`);
  
  const jsFiles = findJsFiles(__dirname);
  
  if (jsFiles.length === 0) {
    console.log('No JavaScript files found.');
    return;
  }
  
  console.log(`Found ${jsFiles.length} file(s) to build\n`);
  
  const builtFiles = [];
  
  for (const file of jsFiles) {
    const result = await buildFile(file);
    if (result) {
      builtFiles.push(result);
    }
  }
  
  console.log('\n✨ Build complete!');
  
  if (builtFiles.length > 0) {
    updateManifest(builtFiles);
  }
}

main();