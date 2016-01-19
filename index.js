const data = {
  tag: 'a',
  children: [
    { tag: 'b', children: [ 'je suis b' ] },
    { tag: 'br' },
    "entre b et c",
    { tag: 'br' },
    { tag: 'c', children: [ 'je suis c' ] }
  ]
};

const createNode = (tag, innerHTML) => {
  const node = document.createElement(tag);
  if (innerHTML) {
    node.insertAdjacentHTML('beforeend', innerHTML);
  }
  return node;
};

const createTextNode = (text) => {
  return document.createTextNode(text);
}

const mount = (obj, node) => {
  if (typeof obj === 'string') {
     const newTextNode = createTextNode(obj);
     node.appendChild(newTextNode);
  } else {
    const newNode = createNode(obj.tag);  
    node.appendChild(newNode);
    if (obj.children) {
      obj.children.forEach(c => mount(c, newNode))
    }
  }
  
  //.insertBefore(nouveauDiv, mon_div);
  // .appendChild
  // .renameNode
  // .replaceChild
  // previous/nextSibling
  // faster than innerHTML => insertAdjacentHTML
  // document.createDocumentFragment()
  
}











mount(data, document.getElementById('app'));






/*
Can think of something different than vdom such as incdom?
Purpose : mess ui, interaction, can test without browser..
Webworker, represent any ui, any structure actually.
--> can generate xml (yea..?)
Some higher order idea?
Actors ?
*/
