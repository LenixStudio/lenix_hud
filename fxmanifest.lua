fx_version 'cerulean'
game 'gta5'
lua54 'yes'
dependencies {
  'tr_lib',
  'qb-core'
}

author 'Trippler'
docs 'https://docs.trippler.store'
version '1.0.2'

client_scripts {
  'config.js',
  'client/bridge.js',
  'client/main.js',
}
ui_page 'web/index.html'
file 'web/**'