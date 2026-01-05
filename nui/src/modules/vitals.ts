export const updateVitalsBars = (entityHealth: number, entityArmour: number) => {
  const healthFilled = document.getElementById('health-filled')
  const shielfFilled = document.getElementById('shield-filled')
  if (entityHealth && healthFilled) healthFilled.style.width = entityHealth + '%'
  if (entityArmour && shielfFilled) shielfFilled.style.width = entityArmour + '%'
}

export const showVitals = () => {
  const root = document.getElementById('vitals-root')
  if (root) root.style.display = 'block'
}

export const hideVitals = () => {
  const root = document.getElementById('vitals-root')
  if (root) root.style.display = 'none'
}