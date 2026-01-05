import { showVitals, hideVitals, updateVitalsBars } from "../modules/vitals"
import { onNuiCallback } from "@trippler/tr_lib/nui"

onNuiCallback('showVitals', showVitals)

onNuiCallback('updateVitalsBars', (entityHealth: number, entityArmour: number) => {
  updateVitalsBars(entityHealth, entityArmour)
})

onNuiCallback('hideVitals', hideVitals)