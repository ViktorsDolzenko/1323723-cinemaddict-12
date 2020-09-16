import Abstract from '../view/abstract.js';
export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
};

export const render = (container, element, place) => {
  if (container instanceof Abstract) {
    container = container.getElement();
  }

  if (element instanceof Abstract) {
    element = element.getElement();
  }

  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;

  }
};

export const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};


export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const showPopup = (child) => {
  if (child instanceof Abstract) {
    child = child.getElement();
  }
  document.body.appendChild(child);
  document.body.classList.add(`hide-overflow`);
};

export const closePopup = (child) => {
  if (child instanceof Abstract) {
    child = child.getElement();
  }
  document.body.removeChild(child);
  document.body.classList.remove(`hide-overflow`);
};

export const remove = (component) => {
  if (component === null) {
    return;
  }

  component.getElement().remove();
  component.removeElement();
};

export const replace = (newChild, oldChild) => {
  if (oldChild instanceof Abstract) {
    oldChild = oldChild.getElement();
  }

  if (newChild instanceof Abstract) {
    newChild = newChild.getElement();
  }

  const parent = oldChild.parentElement;

  if (parent === null || oldChild === null || newChild === null) {
    throw new Error(`Can't replace unexisting elements`);
  }

  parent.replaceChild(newChild, oldChild);
};
