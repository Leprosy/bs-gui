const toolData = [
  {
    name: "Div",
    tag: "div",
    code: "<div></div>",
  },
  {
    name: "Paragraph",
    tag: "p",
    code: "<p>Lorem ipsum</p>",
  },
  {
    name: "Image",
    tag: "img",
    code: '<img src="https://l3pro.netlify.app/html_test/celes.jpeg" />',
  },
];

// Helpers
window.getUID = (str) => {
  const prefix = str ? str + "-" : "";
  const postfix = ("-" + Math.random() * 46656) | 0;
  return `${prefix}${new Date().getTime()}${postfix}`;
};

window.$ = (query) => {
  const result = document.querySelectorAll(query);
  if (result.length == 1) return result[0];
  return result;
};

// Handlers
window.dragoverHandler = (ev) => {
  ev.preventDefault();
  ev.target.classList.add("target");
  // console.log(ev.target);
  // ev.dataTransfer.dropEffect = "copy";
};

window.dragleaveHandler = (ev) => {
  console.log("dragleave", ev.target);
  ev.target.classList.remove("target");
};

window.dropHandler = (ev) => {
  ev.preventDefault();
  const data = JSON.parse(ev.dataTransfer.getData("text/plain"));
  const elem = elemFromString(data.code);
  const className = data.class ? `.${data.class.replace(" ", ".")}` : "";
  elem.dataset.before = `${data.tag}${className}`;
  elem.className = "block " + data.class;
  elem.addEventListener("dragleave", dragleaveHandler);
  ev.target.appendChild(elem);
  ev.target.classList.remove("target");
  console.log("drophandler", { data, target: ev.target, element: elem });
};

window.elemFromString = (str) => {
  const elem = document.createElement("template");
  elem.innerHTML = str;
  return elem.content.firstElementChild;
};

// Init
document.addEventListener("DOMContentLoaded", () => {
  // Add tools
  toolData.forEach((item) => {
    const div = document.createElement("div");
    div.setAttribute("draggable", true);
    div.setAttribute("id", getUID("tool"));
    div.classList.add("bg-primary-subtle", "rounded", "p-2");
    div.innerHTML = `<p class="fw-bold">${item.name}</p>
<div>Class: <input /></div>`;

    div.addEventListener("dragstart", (ev) => {
      // const img = new Image();
      // img.src = "img/block.png";
      console.log(ev.target.id);
      // ev.dataTransfer.setDragImage(img, 10, 10);
      ev.dataTransfer.setData(
        "text/plain",
        JSON.stringify({
          code: item.code,
          tag: item.tag,
          class: ev.target.querySelector("input").value,
        })
      );
      // ev.dataTransfer.dropEffect = "copy";
    });

    $("#tools").append(div);
  });
});
