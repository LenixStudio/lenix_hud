# lenix_hud
HUD for PvP servers, including stats for health, armor, ammo, name, image, etc

## About
### Introduction
Welcome to Hud.

This script is designed to enhance your server's gameplay by providing a UI that let your players :
* look to how much health and armor quality they have
* get an idea in a better way about their weapon's name, current ammo, reserve ammo and image. as well as they can see how much kills they have in overall, the current weapon ammo's color'll be changed depending on how much they have left ammo in the weapon, the more they shoot, the more it gets darker torwards the red color

### Instructions
* Installation: this script is basically a dnd resource, you just need to implement your own kills function and integrate it into your database so the weaponary hud gets a synced data
* Environment: QB
* Support: available with priority

> Enjoy your improved gaming experience with Hud!

- Vitals
<img width="591" height="84" alt="hud" src="https://github.com/user-attachments/assets/f95ffcfb-2d4e-4501-9195-838e3f4fb92f" />

- Weaponary
<img width="487" height="178" alt="gunhud" src="https://github.com/user-attachments/assets/cc6a138f-0972-4b9e-b335-76832e29b39b" />

## Roadmap
- [ ] add kills count linking it with the database
- [ ] deploy the production mode of the script
- [ ] add support for other frameworks
- [ ] test the drawtext and helper modules

# Imports
## Client

### Show

```js
exports.lenix_hud.show()
```

### Hide

```js
exports.lenix_hud.hide()
```

## Configuration
```ts
vitals = {
  // whether the vitals hud is enabled or not
  enabled: boolean,
  // the number of milliseconds between each refresh
  refreshInterval: number
}
weaponary = {
  // whether the weaponary hud is enabled or not
  enabled: boolean,
  // the image of the fist you want to display
  fistImage: string,
  // the path to your inventory's images
  imagesPath: string
}
```