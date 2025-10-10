document.addEventListener("DOMContentLoaded", () => {
  let root = document.getElementById("root");
  
  function initializeHUD() {
    root.innerHTML = `
      <div id="container">
        <div class="weapon-icon">
          <img id="weapon-image" src="" alt="weapon">
        </div>
    
        <div class="ammo-count">
          <span class="ammo-current">-</span>
          <span class="ammo-separator">/</span>
          <span class="ammo-reserve">-</span>
        </div>
    
        <div class="weapon-info">
          <div class="weapon-name"></div>
          <div class="kill-stats">
            <div class="kills-count">0x</div>
            <div class="kill-icon">
              <i class="fa-solid fa-skull"></i>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  
  let weaponImage, ammoCurrent, ammoReserve, weaponName, killsCount;
  
  function cacheElements() {
    weaponImage = document.getElementById('weapon-image');
    ammoCurrent = document.querySelector('.ammo-current');
    ammoReserve = document.querySelector('.ammo-reserve');
    weaponName = document.querySelector('.weapon-name');
    killsCount = document.querySelector('.kills-count');
  }
  
  function updateTheValues(weapon, playerKills) {
    weaponImage.src = `nui://qb-inventory/html/images/${weapon.image}`;
    weaponImage.alt = weapon.name;
    
    ammoCurrent.textContent = weapon.ammo;
    ammoReserve.textContent = weapon.reserve;
    
    weaponName.textContent = weapon.name;
    
    killsCount.textContent = `${playerKills}x`;
    
    if (weapon.clipSize && weapon.ammo <= weapon.clipSize / 4) {
      ammoCurrent.style.color = '#ff4444';
      ammoCurrent.style.textShadow = '0 0 10px rgba(255, 0, 0, 0.6)';
    } else if (weapon.clipSize && weapon.ammo <= weapon.clipSize / 2) {
      ammoCurrent.style.color = '#ffaa44';
      ammoCurrent.style.textShadow = '0 0 10px rgba(255, 170, 68, 0.6)';
    } else {
      ammoCurrent.style.color = '#ffffff';
      ammoCurrent.style.textShadow = '0 0 10px rgba(255, 255, 255, 0.5)';
    }
  }
  
  let style = document.createElement("style");
  style.textContent = `
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      display: none;
    }

    #root {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      display: flex;
      justify-content: flex-end;
      align-items: flex-end;
    }

    #container {
      display: grid;
      grid-template-columns: auto 1fr;
      grid-template-rows: auto auto;
      gap: 0.5rem;
      transform: skewY(3deg);
      perspective: 1000px;
    }

    .weapon-icon {
      grid-row: 1 / 3;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
    }

    .weapon-icon::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    }

    .weapon-icon img {
      width: 120px;
      height: auto;
      filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5));
      transition: all 0.3s ease;
    }

    .ammo-count {
      background: linear-gradient(135deg, rgba(30, 30, 30, 0.9), rgba(20, 20, 20, 0.9));
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 1rem 2rem;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 0.3rem;
      font-weight: 300;
      letter-spacing: 2px;
    }

    .ammo-current {
      font-size: 2.5rem;
      font-weight: 700;
      color: #ffffff;
      text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
      transition: all 0.3s ease;
    }

    .ammo-separator {
      font-size: 1.5rem;
      color: rgba(255, 255, 255, 0.4);
      margin: 0 0.2rem;
    }

    .ammo-reserve {
      font-size: 1.5rem;
      color: rgba(255, 255, 255, 0.6);
      transition: all 0.3s ease;
    }

    .weapon-info {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 0.5rem;
    }

    .weapon-name {
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.08));
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.15);
      padding: 0.8rem 1.5rem;
      color: #ffffff;
      font-size: 1.2rem;
      font-weight: 500;
      letter-spacing: 1px;
      display: flex;
      align-items: center;
      transition: all 0.3s ease;
    }

    .kill-stats {
      display: flex;
      gap: 0.5rem;
    }

    .kills-count {
      background: linear-gradient(135deg, rgba(40, 40, 40, 0.9), rgba(30, 30, 30, 0.9));
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 0.8rem 1.2rem;
      color: #ffffff;
      font-size: 1.1rem;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 50px;
      transition: all 0.3s ease;
    }

    .kill-icon {
      background: linear-gradient(135deg, #2a2a2a, #1a1a1a);
      border: 1px solid rgba(255, 255, 255, 0.15);
      padding: 0.8rem 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .kill-icon i {
      color: #888;
      font-size: 1.2rem;
    }
  `;
  document.head.appendChild(style);
  
  initializeHUD();
  cacheElements();

  fetch(`https://${GetParentResourceName()}/NuiReady`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });

  window.addEventListener('message', (event) => {
    let data = event.data;

    if (data.action === 'show') {
      document.body.style.display = 'block';
    } else if (data.action === 'hide') {
      document.body.style.display = 'none';
    } else if (data.action === 'update') {
      updateTheValues(data.weapon, data.playerKills);
    }
  });
});