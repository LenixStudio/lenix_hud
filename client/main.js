RegisterNuiCallback('NuiReady', function(data, cb) {
  cb(true)
  SendNuiMessage(JSON.stringify({
    action: 'show'
  }))

  const QBCore = exports['qb-core'].GetCoreObject()
  setInterval(() => {
    const ped = PlayerPedId()
    const [retvalWeapon, weaponHash] = GetCurrentPedWeapon(ped, false);
    const [retvalClip, ammo] = GetAmmoInClip(ped, weaponHash);
    const reserve = GetAmmoInPedWeapon(ped, weaponHash);
    const clip = GetWeaponClipSize(weaponHash);
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
        clipSize: clip
      },
      playerKills: exports['tr_gunhud'].getPlayerKills()
    }))
  }, 90)
})