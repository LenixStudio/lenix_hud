document.addEventListener("DOMContentLoaded", () => {
  let root = document.getElementById("root");
  function updateTheValues(weapon, playerKills) {
    root.innerHTML = `
      <div id="container">
      <div class="weapon-icon">
        <img src="nui://qb-inventory/html/images/${weapon.image}" alt="could not load ${weapon.name}'s image, the fetched image: ${weapon.image}">
      </div>
  
      <div class="ammo-count">
        <span class="ammo-current">${weapon.ammo}</span>
        <span class="ammo-separator">≀</span>
        <span class="ammo-reserve">${weapon.reserve}</span>
      </div>
  
      <div class="weapon-info">
        <div class="weapon-name">${weapon.name}</div>
        <div class="kill-stats">
          <div class="kills-count">${playerKills}x</div>
          <div class="kill-icon">
            <i class="fa-solid fa-skull"></i>
          </div>
        </div>
      </div>
    </div>
    `;
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
    }

    .ammo-separator {
      font-size: 1.5rem;
      color: rgba(255, 255, 255, 0.4);
      margin: 0 0.2rem;
    }

    .ammo-reserve {
      font-size: 1.5rem;
      color: rgba(255, 255, 255, 0.6);
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
  fetch(`https://${GetParentResourceName()}/NuiReady`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  })
  window.addEventListener('message', (event) => {
    let data = event.data;
    if (data.action == 'show') {
      document.body.style.display = 'block';
    } else if (data.action == 'hide') {
      document.body.style.display = 'none';
    } else if (data.action == 'update') {
      updateTheValues(data.weapon, data.playerKills)
      if (data.weapon.ammo <= data.weapon.clipSize / 4) {
        document.getElementsByClassName('ammo-current')[0].style.color = '#ff000020'
        document.getElementsByClassName('ammo-current')[0].style.boxShadow = '0 0 10pxrgba(255, 0, 0, 0.41)'
      }
    }
  })
})