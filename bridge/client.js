function IsPlayerAlive() {
  let QBCore = exports['qb-core'].GetCoreObject()
  let PlayerData = QBCore.Functions.GetPlayerData()
  let isAlive = !(PlayerData.metadata['inlaststand'] || PlayerData.metadata['isdead'])
  return isAlive
}

onNet('QBCore:Client:OnPlayerLoaded', () => {
  setTimeout(() => {
    SendNuiMessage(JSON.stringify({
      action: 'show'
    }));
  }, 1000);
})

onNet('QBCore:Client:OnPlayerUnload', () => {
  setTimeout(() => {
    SendNuiMessage(JSON.stringify({
      action: 'hide'
    }));
  }, 1000);
})