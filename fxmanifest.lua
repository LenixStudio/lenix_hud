fx_version 'cerulean'
game 'gta5'
lua54 'yes'
dependencies {
  'tr_lib'
}

author 'Trippler'
docs 'https://docs.trippler.store'
version '1.0.2'

files {
  'config.json',
}
client_scripts {
  'client/bridge.js',
  'client/main.js',
}
ui_page 'web/index.html'
file 'web/**'