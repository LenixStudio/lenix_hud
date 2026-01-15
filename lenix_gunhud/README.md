# lenix_gunhud
HUD for gun stats: ammo, name, image, etc

## About
### Introduction
Welcome to Gun Hud.

This script is designed to enhance your server's gameplay by:
* UI that let your players get an idea in a better way about their weapon's name, current ammo, reserve ammo and image. as well as they can see how much kills they have in overall, the current weapon ammo's color'll be changed depending on how much they have left ammo in the weapon, the more they shoot, the more it gets darker torwards the red color

### Instructions
* Installation: drag and drop
* Environment: QB
* Support: available with priority

> Enjoy your improved gaming experience with Gun Hud!

<img width="487" height="178" alt="gunhud" src="https://github.com/user-attachments/assets/cc6a138f-0972-4b9e-b335-76832e29b39b" />

## Instructions
this script is basically a dnd resource, you just need to implement your own kills function and integrate it into your database so the gunhud gets a synced data

## Configuration

```js
const config = {
    // the image of the fist you want to display
    fistImage: "https://gtahash.ru/Image/Fist-icon.b82f0d52caf21ad19d97f6fb77056a77.png",
    // the path to your inventory's images
    imagesPath: "qb-inventory/html/images"
}
```

## Roadmap
- [ ] add kills count linking it with the database
