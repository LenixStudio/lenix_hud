document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root')
  root.innerHTML = `
    <div id='container'>
      <div id='health'>
        <div class='icon'>
          <i class="fa-solid fa-heart-pulse"></i>
        </div>
        <div class='bar'>
          <div class="filled" id="health-filled"></div>
        </div>
      </div>
      <div id='shield'>
        <div class='icon'>
          <i class="fa-solid fa-shield"></i>
        </div>
        <div class='bar'>
          <div class="filled" id="shield-filled"></div>
        </div>
      </div>
    </div>
  `
  const style = document.createElement('style');
  style.textContent = `
    #root {
      display: none; 
    }
    #container {
      position: fixed;
      bottom: 10px;
      left: 30px;
      display: flex;
      gap: 10px;
    }
    #health, #shield {
      background: rgba(255, 255, 255, 0.2);
      padding: 10px;
      border-radius: 3px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .icon {
      background: rgba(255, 255, 255, 0.3);
      color: white;
      font-size: 24px;
      padding: 10px;
      border-radius: 3px;
    }
    .bar {
      width: 200px;
      height: 15px;
      background: rgba(255,255,255,0.3);
      border-radius: 3px;
      position: relative;
      overflow: hidden;
    }
    .filled {
      height: 100%;
      transition: width 0.3s ease;
      border-radius: 3px;
    }
    #health-filled {
      background: white;
      width: 0%
    }
    #shield, #shield .icon {
      background: rgba(0, 166, 255, 0.2);
    }
    #shield .icon {
      color: rgb(0, 157, 255)
    }
    #shield .filled {
      background: rgba(0, 166, 255, 0.6);
    }
    #shield-filled {
      background:rgba(0, 152, 203, 0.7);
      width: 0%
    }
  `;
  document.head.appendChild(style);
  window.addEventListener('message', (event) => {
    const data = event.data;
    if (data.action == 'show') {
      root.style.display = 'block';
    }
    if (data.action == 'hide') {
      root.style.display = 'none';
    }
    if (data.entityHealth !== undefined) {
      document.getElementById('health-filled').style.width = data.entityHealth + '%';
    }
    if (data.entityArmour !== undefined) {
      document.getElementById('shield-filled').style.width = data.entityArmour + '%';
    }
  });
  fetch(`https://${GetParentResourceName()}/nuiReady`, {
    method: 'POST',
    body: JSON.stringify({})
  });
})