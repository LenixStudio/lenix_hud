# lenix_gunhud
HUD for gun stats: ammo, name, image, etc

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
