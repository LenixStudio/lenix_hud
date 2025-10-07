fx_version 'cerulean'
game 'gta5'
lua54 'yes'
dependencies {
  'qb-core',
}

author 'Trippler Scripts'

client_scripts {
  'bridge/client.js',
  'client.js'
}
server_script 'server.js'

ui_page 'web/index.html'
files {
  'web/index.html',
  'web/build/client.js'
}