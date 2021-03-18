function focus() {
  console.log("focus");
  const el = document.querySelector("#root");
  if (el) {
    el.classList.add("focus");
    el.focus();
  }
}

function unfocus() {
  console.log("unfocus");
  // focus on Tree
  const el = document.querySelector("#root");
  if (el) {
    el.classList.remove("focus");
  }
}

window.addEventListener("focus", focus);
window.addEventListener("blur", unfocus);

console.log("boot OK");
