const a = { tag: 'a', children: [{ text: 'coucou a' }] };
const b = { tag: 'b', children: [{ text: 'coucou b'  }] };
const b2 = { tag: 'pp', children: [{ text: 'coucou b2 !'}] };
const c = { tag: 'c', children: [{ text: 'coucou c !'}] };
const d = { tag: 'd', children: [{ text: 'coucou d !'}] };

const data = [ a, b ];
const data2 = [ a, b2 ];
const data3 = [ a, b2, c ];
const data4 = [ a, d, b2, c ];

const render = (arr, node, vparent = ROOT_VELEMENT, level = 0) => {
  // create a <tag> into <node>
  let i, l;
  log(level, `${arr.length} nodes to render / vparent has ${vparent.length}`);
  for (i = 0, l = arr.length; i < l; i++) {
    const obj = arr[i];
    let ve = vparent[i];
    

    if (!ve) {
      log(level, `no vnode at [${i}], appending...`);
      let newNode = createNode(obj.tag, obj.text);
      ve = addRE(vparent, newNode, obj);
      node.appendChild(newNode);
      if (obj.children) {
        render(obj.children, newNode, ve.children, level+1);
      }
      
    } else if (ve.obj !== obj) {
      log(level, `node exists at [${i}] but is different... `, false);
      
      if (arr[i+1] && ve.obj === arr[i+1]) {
        log(level, `obj[${i+1}] is the vnode[${i}], prepending at [${i}]`);
        let newNode = createNode(obj.tag, obj.text);
        let oldNode = ve.node;
        ve = prependRE(vparent, i, newNode, obj);
        prependNode(oldNode, newNode);
        if (obj.children) {
          render(obj.children, newNode, ve.children, level+1);
        }
      } else {
        log(level, `replacing [${i}]`);
        let newNode = createNode(obj.tag, obj.text);
        let oldNode = ve.node;
        ve = replaceRE(vparent, i, newNode, obj);
        replaceNode(oldNode, newNode);
        if (obj.children) {
          render(obj.children, newNode, ve.children, level+1);
        }
      }      

    } else {
      log(level, `node [${i}] is the same... `);
      if (obj.children) {
        render(obj.children, ve.node, ve.children, level+1);
      }
    }

  }
  
  // remove nodes in vparent that does not exist anymore
  
  
  
  
  //.insertBefore(nouveauDiv, mon_div);
  // .appendChild
  // .renameNode
  // .replaceChild
  // previous/nextSibling
  // faster than innerHTML => insertAdjacentHTML
  // document.createDocumentFragment()
  log(level, `[${level}] DONE`);
}

const ROOT_VELEMENT = [ ];
const addRE = (parent, node, obj) => { let re = RenderedElement(node, obj); parent.push(re); return re; }
const replaceRE = (parent, index, node, obj) =>  { let re = RenderedElement(node, obj); parent[index] = re; return re; }
const prependRE = (parent, index, node, obj) => { let re = RenderedElement(node, obj); parent.splice(index, 0, new RenderedElement(node, obj)); return re; }
const exists = (parent, obj) => parent.filter(re => re.obj === obj).length > 0;
const RenderedElement = (node, obj) => ({ obj, node, children: [] });

const repeat = (str, length) => new Array(length).fill(str).join('');
const log = (level, msg, crlf) => document.getElementById('log').innerHTML += repeat('--> ', level) + msg + (crlf === false ? '' : '\n');














/*
Can think of something different than vdom such as incdom?
Purpose : mess ui, interaction, can test without browser..
Webworker, represent any ui, any structure actually.
--> can generate xml (yea..?)
Some higher order idea?
Actors ?
*/






const createNode = (tag, innerHTML) => {
  const node = document.createElement(tag);
  if (innerHTML) {
    node.insertAdjacentHTML('beforeend', innerHTML);
  }
  return node;
};

const createTextNode = (text) => {
  return document.createTextNode(text);
};

const replaceNode = (old, neww) => {
  old.parentNode.replaceChild(neww, old);
};

const prependNode = (old, neww) => {
  old.parentNode.insertBefore(neww, old);
};



log(0, repeat('*', 50));
render(data, document.getElementById('app'));
log(0, repeat('*', 50));
render(data2, document.getElementById('app'));
log(0, repeat('*', 50));
render(data3, document.getElementById('app'));
log(0, repeat('*', 50));
render(data4, document.getElementById('app'));
log(0, repeat('*', 50));
a.children = [{ text: 'coucou a modifié!'}];
const data5 = [ a, d, b2, c ];
render(data5, document.getElementById('app'));






