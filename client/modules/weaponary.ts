import { triggerNuiCallback } from "@trippler/tr_lib/client"
import { weaponary } from "../../shared/constants"
import { getFxItemsData, getPlayerKills } from "../api/weaponary"
import { WeaponaryNuiData } from "../../shared/types"

let interval: any

const updateWeapon = () => {
  interval = setInterval(() => {
    const ped = PlayerPedId()
    const [_retvalWeapon, weaponHash] = GetCurrentPedWeapon(ped, false)
    const [_retvalClip, ammo] = GetAmmoInClip(ped, weaponHash)
    const reserve = GetAmmoInPedWeapon(ped, weaponHash)
    const clipSize = GetWeaponClipSize(weaponHash)
    const fistImage = weaponary.fistImage
    let weaponName = 'Unknown'
    let weaponImage = 'Undefined'
    for (const itemName in getFxItemsData) {
      const item = getFxItemsData[itemName]
      if (item.name && GetHashKey(item.name) === weaponHash) {
        weaponName = item.label
        weaponImage = item.name == 'weapon_unarmed' ? fistImage : `nui://${weaponary.imagesPath}/${item.image}`
        break
      }
    }
    triggerNuiCallback('updateWeaponary', {
      name: weaponName,
      image: weaponImage,
      ammo: ammo,
      reserve: reserve - ammo,
      clipSize: clipSize,
      playerKills: getPlayerKills()
    } satisfies WeaponaryNuiData)
  }, 90)
}

export const showWeaponary = () => {
  triggerNuiCallback('showWeaponary')
  updateWeapon()
}

export const hideWeaponary = () => {
  triggerNuiCallback('hideWeaponary')
  clearInterval(interval)
}