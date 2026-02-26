const desktop = document.getElementById("desktop");
let zIndex = 1;

function updateClock() {
  document.getElementById("clock").innerText =
    new Date().toLocaleTimeString();
}
setInterval(updateClock, 1000);
updateClock();

function openApp(name) {
  const win = document.createElement("div");
  win.className = "window";
  win.style.top = "100px";
  win.style.left = "120px";
  win.style.zIndex = ++zIndex;

  win.innerHTML = `
    <div class="window-header">
      <div class="btn red" onclick="this.closest('.window').remove()"></div>
      <div class="btn yellow"></div>
      <div class="btn green"></div>
      <span style="margin-left:10px;">${name}</span>
    </div>
    <div class="window-content">
      Bienvenue dans ${name} sur LuminasOS ✨
    </div>
  `;

  win.onmousedown = () => win.style.zIndex = ++zIndex;

  makeDraggable(win);
  desktop.appendChild(win);
}

function makeDraggable(el) {
  const header = el.querySelector(".window-header");
  let offsetX = 0, offsetY = 0, isDown = false;

  header.onmousedown = function(e) {
    isDown = true;
    offsetX = el.offsetLeft - e.clientX;
    offsetY = el.offsetTop - e.clientY;
  };

  document.onmouseup = () => isDown = false;

  document.onmousemove = function(e) {
    if (!isDown) return;
    el.style.left = (e.clientX + offsetX) + "px";
    el.style.top = (e.clientY + offsetY) + "px";
  };
}
