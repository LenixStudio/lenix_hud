import { useDiv } from "@trippler/tr_kit/nui"

document.body.id = `body`

useDiv({
  parent: 'body',
  content:  `
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
  `
})

const style = document.createElement("style")
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

  #weaponary-root {
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
    background: linear-gradient(135deg, rgba(30, 30, 30, 0.9), rgba(20, 20, 20, 0.9));
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    min-width: 150px;
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
    width: 70px;
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
    background: linear-gradient(135deg, rgba(30, 30, 30, 0.9), rgba(20, 20, 20, 0.9));
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
`
document.head.appendChild(style)