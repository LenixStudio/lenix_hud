fx_version 'cerulean'
game 'gta5'
lua54 'yes'
dependencies {
  'qb-core',
}

author 'Trippler'
docs 'https://docs.trippler.store'

client_scripts {
  'client/bridge.js',
  'client/build/main.js'
}
ui_page 'web/index.html'
files {
  'web/index.html',
  'web/build/main.js'
}