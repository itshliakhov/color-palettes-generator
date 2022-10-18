const _cols = document.querySelectorAll(".col");
const _p = document.querySelector("p");
document.addEventListener("keydown", (event) => {
  event.preventDefault();
  if (
    event.code.toLowerCase() === "space" ||
    event.code.toLowerCase() === "enter"
  ) {
    setRandomColors();
  }
});
document.addEventListener("click", (event) => {
  const type = event.target.dataset.type;
  if (type === "lock") {
    const node =
      event.target.tagName.toLowerCase() === "i"
        ? event.target
        : event.target.children[0];
    node.classList.toggle("fa-lock-open");
    node.classList.toggle("fa-lock");
  } else if (type === "copy") {
    clipboardPopUpShow();
    setTimeout(clipboardPopUpShow, 1);
    clipboardPopUpClose();
    setTimeout(clipboardPopUpClose, 700);
    copyToClickboard(event.target.textContent);
  }
});
function generateRandomColor() {
  const hexCodes = "0123456789ABCDEF";
  let color = "";
  for (let i = 0; i < 6; i++) {
    color += hexCodes[Math.floor(Math.random() * hexCodes.length)];
  }
  return "#" + color;
}
function copyToClickboard(text) {
  return navigator.clipboard.writeText(text);
}
function clipboardPopUpShow() {
  _p.style.display = "block";
}
function clipboardPopUpClose() {
  _p.style.display = "none";
}
function setRandomColors(isInitial) {
  const colors = isInitial ? getColorsFromHash() : [];

  _cols.forEach((col, index) => {
    const isLocked = col.querySelector("i").classList.contains("fa-lock");
    const text = col.querySelector("h2");
    const button = col.querySelector("button");
    const color = isInitial
      ? colors[index]
        ? colors[index]
        : generateRandomColor()
      : generateRandomColor();
    if (isLocked) {
      colors.push(text.textContent);
      return;
    }
    if (!isInitial) {
      colors.push(color);
    }
    text.textContent = color;
    col.style.background = color;
    setTextColor(text, color);
    setTextColor(button, color);
  });
  updateColorsHash(colors);
}
function setTextColor(text, color) {
  const luminance = chroma(color).luminance();
  text.style.color = luminance > 0.5 ? "black" : "white";
}
function updateColorsHash(colors = []) {
  document.location.hash = colors.map((col) => col.substring(1)).join("-");
}
function getColorsFromHash() {
  if (document.location.hash.length > 1) {
    return document.location.hash
      .substring(1)
      .split("-")
      .map((color) => "#" + color);
  }
  return [];
}
setRandomColors(true);
