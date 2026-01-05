import { onNuiCallback } from "@trippler/tr_lib/nui"
import { hideWeaponary, showWeaponary, updateWeaponaryValues } from "../modules/weaponary"
import { WeaponaryNuiData } from "../../../shared/types"

onNuiCallback('showWeaponary', () => {
  showWeaponary()
})

onNuiCallback('hideWeaponary', () => {
  hideWeaponary()
})

onNuiCallback('hideWeaponary', (data: WeaponaryNuiData) => updateWeaponaryValues(data))