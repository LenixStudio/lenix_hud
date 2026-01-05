import { WeaponaryNuiData } from "../../../shared/types"

const weaponImage = document.getElementById('weapon-image') as HTMLImageElement
const ammoCurrent = document.querySelector('.ammo-current') as HTMLDivElement
const ammoReserve = document.querySelector('.ammo-reserve')
const weaponName = document.querySelector('.weapon-name')
const killsCount = document.querySelector('.kills-count')

export const showWeaponary = () => {
  document.body.style.display = 'block'
}

export const hideWeaponary = () => {
  document.body.style.display = 'none'
}

export const updateWeaponaryValues = ({
  name,
  image,
  ammo,
  reserve,
  clipSize,
  playerKills
}: WeaponaryNuiData) => {
  weaponImage.src = `${image}`
  weaponImage.alt = name
  if (ammoReserve) ammoReserve.textContent = `${reserve}`
  if (weaponName) weaponName.textContent = name
  if (killsCount) killsCount.textContent = `${playerKills}x`
  
  if (ammoCurrent) {
    ammoCurrent.textContent = `${ammo}`
    if (clipSize && ammo <= clipSize / 4) {
      ammoCurrent.style.color = '#ff4444'
      ammoCurrent.style.textShadow = '0 0 10px rgba(255, 0, 0, 0.6)'
    } else if (clipSize && ammo <= clipSize / 2) {
      ammoCurrent.style.color = '#ffaa44'
      ammoCurrent.style.textShadow = '0 0 10px rgba(255, 170, 68, 0.6)'
    } else {
      ammoCurrent.style.color = '#ffffff'
      ammoCurrent.style.textShadow = '0 0 10px rgba(255, 255, 255, 0.5)'
    }
  }
}