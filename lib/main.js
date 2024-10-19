const toolData = [
  {
    name: "Div",
    code: "<div></div>",
  },
  {
    name: "Paragraph",
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
};

const dragleaveHandler = (ev) => {
  console.log("dragleave", ev.target);
  checkTag(ev.target).classList.remove("target");
};

const dropHandler = (ev) => {
  ev.preventDefault();
  const target = checkTag(ev.target);
  const data = JSON.parse(ev.dataTransfer.getData("text/plain"));
  const source = $(`#${data.id}`);
  console.log("drophandler", { data, source, target: target });

  if (data.type == "create") {
    const className = $(`#${source.id} input`).value;
    const elem = elemFromString(source.dataset.code);
    elem.setAttribute("draggable", true);
    elem.setAttribute("id", getUID("blocks"));
    elem.className = "block " + className;
    addDragStartHandler(elem, { type: "move", id: elem.id });
    elem.prepend(getTagHTML(elem));
    elem.addEventListener("dragleave", dragleaveHandler);
    target.appendChild(elem);
    target.classList.remove("target");
  } else if (data.type == "move") {
    if (source != target && !source.contains(target)) {
      const tag = target.firstElementChild;
      target.prepend(source);

      if (target.id != "content") {
        target.prepend(tag);
      }
    } else {
      console.log(
        "cant move(s=t, s<-t)",
        source != target,
        source.contains(target)
      );
    }

    target.classList.remove("target");
    console.log("moving", { source, target });
  } else {
    console.log("OAW nofhinh");
  }
};

const getTagHTML = (elem) => {
  const tag = elem.tagName.toLowerCase();
  const className = elem.className
    .replace("block", "")
    .trim()
    .replace(/ /g, ".");
  const finalClassName = className ? `.${className}` : "";
  return elemFromString(
    `<span class="tag"><span class="tag-content">${tag}${finalClassName}</span></span>`
  );
};

const addDragStartHandler = (elem, data) => {
  elem.addEventListener("dragstart", (ev) => {
    console.log("dragstart", { elem, evTarget: ev.target });
    ev.dataTransfer.setData("text/plain", JSON.stringify(data));
    ev.stopPropagation();
  });
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
    div.setAttribute("data-code", item.code);
    div.classList.add("bg-primary-subtle", "rounded", "p-2");
    div.innerHTML = `<p class="fw-bold">${item.name}</p>
<div>Class: <input /></div>`;
    addDragStartHandler(div, { type: "create", id: div.id });
    $("#tools").append(div);
  });
});
