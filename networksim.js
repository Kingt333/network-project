const devices = document.querySelectorAll(".sidebar .device");
const canvas = document.getElementById("networkCanvas");
const clearBtn = document.getElementById("clearCanvas");
const saveBtn = document.getElementById("saveBtn");
const loadBtn = document.getElementById("loadBtn");

let offsetX, offsetY;
let draggedElement = null;

/* Drag from sidebar */
devices.forEach(device => {
  device.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", device.dataset.type);
  });
});

/* Drop into canvas */
canvas.addEventListener("dragover", (e) => {
  e.preventDefault();
});

canvas.addEventListener("drop", (e) => {
  e.preventDefault();
  const type = e.dataTransfer.getData("text/plain");

  const newDevice = document.createElement("div");
  newDevice.className = "device";
  newDevice.textContent = type;
  newDevice.style.left = `${e.offsetX - 40}px`;
  newDevice.style.top = `${e.offsetY - 20}px`;
  newDevice.setAttribute("draggable", false);

  /* Make draggable inside canvas */
  newDevice.addEventListener("mousedown", startDrag);
  canvas.appendChild(newDevice);
});

/* Drag within canvas */
function startDrag(e) {
  draggedElement = e.target;
  offsetX = e.clientX - draggedElement.offsetLeft;
  offsetY = e.clientY - draggedElement.offsetTop;

  document.addEventListener("mousemove", dragElement);
  document.addEventListener("mouseup", stopDrag);
}

function dragElement(e) {
  if (!draggedElement) return;
  draggedElement.style.left = `${e.clientX - offsetX}px`;
  draggedElement.style.top = `${e.clientY - offsetY}px`;
}

function stopDrag() {
  draggedElement = null;
  document.removeEventListener("mousemove", dragElement);
  document.removeEventListener("mouseup", stopDrag);
}

/* Clear button */
clearBtn.addEventListener("click", () => {
  canvas.innerHTML = "";
});

/* Save layout */
saveBtn.addEventListener("click", () => {
  const layout = [];
  canvas.querySelectorAll(".device").forEach(dev => {
    layout.push({
      type: dev.textContent,
      x: dev.offsetLeft,
      y: dev.offsetTop
    });
  });
  localStorage.setItem("networkLayout", JSON.stringify(layout));
  alert("Layout saved!");
});

/* Load layout */
loadBtn.addEventListener("click", () => {
  const saved = JSON.parse(localStorage.getItem("networkLayout"));
  if (!saved) {
    alert("No saved layout found.");
    return;
  }

  canvas.innerHTML = "";
  saved.forEach(item => {
    const newDevice = document.createElement("div");
    newDevice.className = "device";
    newDevice.textContent = item.type;
    newDevice.style.left = `${item.x}px`;
    newDevice.style.top = `${item.y}px`;
    newDevice.addEventListener("mousedown", startDrag);
    canvas.appendChild(newDevice);
  });
});
