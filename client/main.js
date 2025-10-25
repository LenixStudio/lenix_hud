let entityHealth, entityArmour;
let updateInterval = null;

RegisterNuiCallback('nuiReady', (data, cb) => {
  cb('ok');

  exports('hud', function() {
    if (updateInterval !== null) {
      clearInterval(updateInterval);
    }

    const isAlive = exports.tr_hud.IsPlayerAlive();
    entityHealth = isAlive ? GetEntityHealth(PlayerPedId()) / 2 : 0;
    entityArmour = GetPedArmour(PlayerPedId());
    
    SendNuiMessage(JSON.stringify({
      action: 'show',
      entityHealth: entityHealth,
      entityArmour: entityArmour
    }));
    
    updateInterval = setInterval(() => {
      const currentEntityHealth = entityHealth;
      const currentEntityArmour = entityArmour;
      const isAlive = exports.tr_hud.IsPlayerAlive();
      
      entityHealth = isAlive ? GetEntityHealth(PlayerPedId()) / 2 : 0;
      entityArmour = GetPedArmour(PlayerPedId());
      
      if (currentEntityHealth != entityHealth || currentEntityArmour != entityArmour) {
        SendNuiMessage(JSON.stringify({
          entityHealth: entityHealth,
          entityArmour: entityArmour
        }));
      }
    }, 100);
  });

  exports('hide', function() {
    if (updateInterval !== null) {
      clearInterval(updateInterval);
      updateInterval = null;
    }
    
    setTimeout(() => {
      SendNuiMessage(JSON.stringify({
        action: 'hide'
      }));
    }, 1000);
  });
});
