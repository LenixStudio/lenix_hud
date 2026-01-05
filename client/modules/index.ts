import { vitals } from "../../shared/constants"
import { getPlayerFxData } from "../api/vitals"
import { triggerNuiCallback } from "@trippler/tr_lib/client"

let entityHealth: number, entityArmour: number
let updateInterval: unknown

const isPlayerAlive = () => {
  const playerData = getPlayerFxData()
  let isAlive = !(playerData.metadata['inlaststand'] || playerData.metadata['isdead'])
  return isAlive
}

export const showVitals = () => {
  if (updateInterval !== null) {
    clearInterval(updateInterval)
  }

  const isAlive = isPlayerAlive()
  entityHealth = isAlive ? GetEntityHealth(PlayerPedId()) / 2 : 0
  entityArmour = GetPedArmour(PlayerPedId())
  
  triggerNuiCallback('showVitals', entityHealth, entityArmour)
  
  updateInterval = setInterval(() => {
    const currentEntityHealth = entityHealth
    const currentEntityArmour = entityArmour
    const isAlive = isPlayerAlive()
    
    entityHealth = isAlive ? GetEntityHealth(PlayerPedId()) / 2 : 0
    entityArmour = GetPedArmour(PlayerPedId())
    
    if (currentEntityHealth != entityHealth || currentEntityArmour != entityArmour) {
      triggerNuiCallback('updateVitalsBars', entityHealth, entityArmour)
    }
  }, vitals.refreshInterval)
}

export const hideVitals = () => {
  if (updateInterval !== null) {
    clearInterval(updateInterval)
    updateInterval = null
  }
  
  setTimeout(() => {
    triggerNuiCallback('hideVitals')
  }, 1000)
}