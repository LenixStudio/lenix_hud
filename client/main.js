let entityHealth, entityArmour;

RegisterNuiCallback('nuiReady', (data, cb) => {
  cb('ok');

  const isAlive = IsPlayerAlive();
  entityHealth = isAlive ? GetEntityHealth(PlayerPedId()) / 2 : 0;
  entityArmour = GetPedArmour(PlayerPedId());
  SendNuiMessage(JSON.stringify({
    entityHealth: entityHealth,
    entityArmour: entityArmour
  }));

  setInterval(() => {
    const currentEntityHealth = entityHealth;
    const currentEntityArmour = entityArmour;
    const isAlive = IsPlayerAlive();
    
    entityHealth = isAlive ? GetEntityHealth(PlayerPedId()) / 2 : 0;
    entityArmour = GetPedArmour(PlayerPedId());
    
    if (currentEntityHealth != entityHealth || currentEntityArmour != entityArmour) {
      SendNuiMessage(JSON.stringify({
        entityHealth: entityHealth,
        entityArmour: entityArmour
      }));
    }
  }, 100);
})