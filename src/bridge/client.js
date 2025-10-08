exports('IsPlayerAlive', function() {
  let QBCore = exports['qb-core'].GetCoreObject()
  let PlayerData = QBCore.Functions.GetPlayerData()
  let isAlive = !(PlayerData.metadata['inlaststand'] || PlayerData.metadata['isdead'])
  return isAlive
})

onNet('QBCore:Client:OnPlayerLoaded', () => {
  exports.tr_hud.ShowHud()
})

onNet('QBCore:Client:OnPlayerUnload', () => {
  exports.tr_hud.HideHud()
})