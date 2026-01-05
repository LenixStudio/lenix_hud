import { showVitals,  } from "../modules"

export const getPlayerFxData = () => {
  const QBCore = exports['qb-core'].GetCoreObject()
  const PlayerData = QBCore.Functions.GetPlayerData()
  return PlayerData
}

onNet('QBCore:Client:OnPlayerLoaded', () => {
  showVitals()
})

onNet('QBCore:Client:OnPlayerUnload', () => {
  hideVitals()
})
