import { vitals, weaponary } from "../../shared/constants";

if (vitals.enabled && weaponary.enabled) {
  await import('./vitals')
  await import('./weaponary')
  const { showVitals } = await import('../modules/vitals')
  const { showWeaponary } = await import('../modules/weaponary')
  exports('showHud', () => {
    showVitals()
    showWeaponary()
  })

} else if (weaponary.enabled) {
  await import('./weaponary')
  const { showWeaponary } = await import('../modules/weaponary')
  exports('showHud', showWeaponary)

} else if (vitals.enabled) {
  await import('./vitals')
  const { showVitals } = await import('../modules/vitals')
  exports('showHud', showVitals)
}