import { hideWeaponary, showWeaponary } from "../modules/weaponary"

export const getPlayerKills = () => {
  const playerKills = 128 // define your player kills variable from your server's logic
  return playerKills
}

export const getFxItemsData = exports['qb-core'].GetCoreObject().Shared.Items

onNet('QBCore:Client:OnPlayerLoaded', () => {
  showWeaponary()
})

onNet('QBCore:Client:OnPlayerUnload', () => {
  hideWeaponary()
})