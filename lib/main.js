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
];

/**
 * Helpers
 */
// Creates a UID
const getUID = (str) => {
  const prefix = str ? str + "-" : "";
  const postfix = ("-" + Math.random() * 46656) | 0;
  return `${prefix}${new Date().getTime()}${postfix}`;
};

// Basic selector function
const $ = (query) => {
  const result = document.querySelectorAll(query);
  if (result.length == 1) return result[0];
  return result;
};

// Creates an element from a HTML string
const elemFromString = (str) => {
  const elem = document.createElement("template");
  elem.innerHTML = str;
  return elem.content.firstElementChild;
};

// Checks if element is a tag, returns its parent if so
const checkTag = (elem) => {
  if (elem.classList.contains("tag")) {
    return elem.parentElement;
  } else if (elem.classList.contains("tag-content")) {
    return elem.parentElement.parentElement;
  } else {
    return elem;
  }
};

/**
 * Handlers
 */
const dragoverHandler = (ev) => {
  ev.preventDefault();
  checkTag(ev.target).classList.add("target");
  // console.log(ev.target);
  // ev.dataTransfer.dropEffect = "copy";
};

const dragleaveHandler = (ev) => {
  console.log("dragleave", ev.target);
  checkTag(ev.target).classList.remove("target");
};

const dropHandler = (ev) => {
  ev.preventDefault();
  const target = checkTag(ev.target);
  const data = JSON.parse(ev.dataTransfer.getData("text/plain"));
  const className = data.class ? `.${data.class.replace(" ", ".")}` : "";
  const elem = elemFromString(data.code);
  const tag = elemFromString(
    `<span class="tag"><span class="tag-content">${data.tag}${className}</span></span>`
  );
  elem.prepend(tag);
  elem.className = "block " + data.class;
  elem.addEventListener("dragleave", dragleaveHandler);
  target.appendChild(elem);
  target.classList.remove("target");
  console.log("drophandler", { data, target: target, element: elem });
};

/**
 * Init code
 */
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
