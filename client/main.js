RegisterNuiCallback('NuiReady', function(data, cb) {
  cb(true)

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

  const QBCore = exports['qb-core'].GetCoreObject()
  let interval
  function updateWeapon() {
    interval = setInterval(() => {
      const ped = PlayerPedId()
      const [retvalWeapon, weaponHash] = GetCurrentPedWeapon(ped, false);
      const [retvalClip, ammo] = GetAmmoInClip(ped, weaponHash);
      const reserve = GetAmmoInPedWeapon(ped, weaponHash);
      const clipSize = GetWeaponClipSize(weaponHash);
      let weaponName = 'Unknown'
      let weaponImage = 'https://gtahash.ru/Image/Fist-icon.b82f0d52caf21ad19d97f6fb77056a77.png'
      for (let itemName in QBCore.Shared.Items) {
        let item = QBCore.Shared.Items[itemName]
        if (item.name && GetHashKey(item.name) === weaponHash) {
          weaponName = item.label
          weaponImage = item.image
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
        playerKills: exports['tr_gunhud'].getPlayerKills()
      }))
    }, 90)
  }
})