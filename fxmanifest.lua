fx_version 'cerulean'
game 'gta5'
lua54 'yes'
dependencies {
  'qb-core',
}

author 'Trippler Scripts'

client_scripts {
  'src/bridge/client.js',
  'build/client.js'
}

ui_page 'src/web/index.html'
files {
  'src/web/index.html',
  'build/script.js'
}