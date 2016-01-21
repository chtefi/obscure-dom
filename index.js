// http://jsbin.com/gudexakudi/edit?html,js,output
console.clear();

const render = (arr, node, vparent = ROOT_VELEMENT, level = 0) => {
  // create a <tag> into <node>
  let i, l;
  log(level, `${arr.length} nodes to render / vparent has ${vparent.length}`);
  for (i = 0, l = arr.length; i < l; i++) {
    const obj = arr[i];
    let ve = vparent[i];
    
    if (!ve) {
      log(level, `no vnode at [${i}], appending...`);
      let newNode = createProperNode(obj);
      ve = addRE(vparent, newNode, obj);
      node.appendChild(newNode);
      if (obj.children) {
        render(obj.children, newNode, ve.children, level+1);
      }
      
    } else if (ve.obj !== obj) {
      log(level, `node exists at [${i}] but is different... `, false);
      
      if (arr[i+1] && ve.obj === arr[i+1]) {
        log(level, `obj[${i+1}] is the vnode[${i}], prepending at [${i}]`);
        let newNode = createProperNode(obj);
        let oldNode = ve.node;
        ve = prependRE(vparent, i, newNode, obj);
        HTML.prependNode(oldNode, newNode);
        if (obj.children) {
          render(obj.children, newNode, ve.children, level+1);
        }
      } else {
        log(level, `replacing [${i}]`);
        let newNode = createProperNode(obj);
        let oldNode = ve.node;
        ve = replaceRE(vparent, i, newNode, obj);
        HTML.replaceNode(oldNode, newNode);
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
const createProperNode = (obj) => {
  if (obj.text) {
    return HTML.createTextNode(obj.text);
  } else {
    return HTML.createNode(obj.tag);
  }
}

function repeat(str, length) { return new Array(length).fill(str).join(''); }
function log(level, msg, crlf) { document.getElementById('log').innerHTML += repeat('--> ', level) + msg + (crlf === false ? '' : '\n'); }














/*
Can think of something different than vdom such as incdom?
Purpose : mess ui, interaction, can test without browser..
Webworker, represent any ui, any structure actually.
--> can generate xml (yea..?)
Some higher order idea?
Actors ?
*/





const HTML = {
  createNode(tag, innerHTML) {
    const node = document.createElement(tag);
    if (innerHTML) {
      node.insertAdjacentHTML('beforeend', innerHTML);
    }
    return node;
  },
  createTextNode(text) {
    console.log('create text ? ' + text)
    return document.createTextNode(text);
  },
  replaceNode(old, neww) {
    old.parentNode.replaceChild(neww, old);
  },
  prependNode(old, neww) {
    old.parentNode.insertBefore(neww, old);
  }
};

var spyCreateNode = expect.spyOn(HTML, 'createNode').andCallThrough();
var spyReplaceNode = expect.spyOn(HTML, 'replaceNode').andCallThrough();
var spyCreateText = expect.spyOn(HTML, 'createTextNode').andCallThrough();


const a = { tag: 'a', children: [{ text: 'coucou a' }] };
const b = { tag: 'b', children: [{ text: 'coucou b'  }] };
const b2 = { tag: 'pp', children: [{ text: 'coucou b2 !'}] };
const c = { tag: 'c', children: [{ text: 'coucou c !'}] };
const d = { tag: 'd', children: [{ text: 'coucou d !'}] };
const br = { tag: 'br' };
const br2 = { tag: 'br' };

const data = [ a, br, b ];
const data2 = [ a, br, b2 ];
const data3 = [ a, br,    b2,     c ];
const data4 = [ a, br, d, b2, br2, c ];
const data5 = [ a, br, d, b2, br2, c ];

// 3 nodes, 2 text (child)
log(0, repeat('*', 50));
render(data, document.getElementById('app'));
expect(spyCreateNode.calls.length).toBe(3);
expect(spyCreateText.calls.length).toBe(2);
clearSpies();

log(0, repeat('*', 50));
render(data2, document.getElementById('app'));
expect(spyCreateNode.calls.length).toBe(1);
expect(spyCreateText.calls.length).toBe(1);
expect(spyReplaceNode.calls.length).toBe(1);
clearSpies();

log(0, repeat('*', 50));
render(data3, document.getElementById('app'));
expect(spyCreateNode.calls.length).toBe(1);
expect(spyCreateText.calls.length).toBe(1);
expect(spyReplaceNode.calls.length).toBe(0);
clearSpies();

log(0, repeat('*', 50));
render(data4, document.getElementById('app'));
expect(spyCreateNode.calls.length).toBe(2);
expect(spyCreateText.calls.length).toBe(1);
expect(spyReplaceNode.calls.length).toBe(0);
clearSpies();



log(0, repeat('*', 50));
a.children = [{ text: 'coucou a modifié!'}];
render(data5, document.getElementById('app'));
expect(spyCreateNode.calls.length).toBe(0);
expect(spyCreateText.calls.length).toBe(1);
expect(spyReplaceNode.calls.length).toBe(1);
clearSpies();






function clearSpies() {
  spyCreateNode.calls = [];
  spyCreateText.calls = [];
  spyReplaceNode.calls = [];
}

