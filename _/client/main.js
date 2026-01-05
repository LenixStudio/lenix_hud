RegisterNuiCallback('nuiReady', function(data, cb) {
  cb(true)
  const QBCore = exports['qb-core'].GetCoreObject()
  let interval

  onNet('QBCore:Client:OnPlayerLoaded', () => {
    SendNuiMessage(JSON.stringify({
      action: 'show'
    }))
    updateWeapon()
  })

  onNet('QBCore:Client:OnPlayerUnload', () => {
    SendNuiMessage(JSON.stringify({
      action: 'hide'
    }))
    clearInterval(interval)
  })

  function updateWeapon() {
    interval = setInterval(() => {
      const ped = PlayerPedId()
      const [retvalWeapon, weaponHash] = GetCurrentPedWeapon(ped, false);
      const [retvalClip, ammo] = GetAmmoInClip(ped, weaponHash);
      const reserve = GetAmmoInPedWeapon(ped, weaponHash);
      const clipSize = GetWeaponClipSize(weaponHash);
      const fistImage = config.fistImage
      let weaponName = 'Unknown'
      let weaponImage = 'Undefined'
      for (let itemName in QBCore.Shared.Items) {
        let item = QBCore.Shared.Items[itemName]
        if (item.name && GetHashKey(item.name) === weaponHash) {
          weaponName = item.label
          weaponImage = item.name == 'weapon_unarmed' ? fistImage : `nui://${config.imagesPath}/${item.image}`
          break
        }
      }
      SendNuiMessage(JSON.stringify({
        action: 'update',
        weapon: {
          name: weaponName,
          image: weaponImage,
          ammo: ammo,
          reserve: reserve - ammo,
          clipSize: clipSize
        },
        playerKills: exports.lenix_gunhud.getPlayerKills()
      }))
    }, 90)
  }
})