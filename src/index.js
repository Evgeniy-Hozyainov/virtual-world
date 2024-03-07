import './styles.css';

import { Graph } from './math/graph.js';
import { GraphEditor } from './graphEditor.js';
import { Viewport } from './viewport.js';
import { Envelope } from './primitives/envelope.js';
import { World } from './world.js';

const btnDeleteAll = document.querySelector('.button__delete-all');
const btnSave = document.querySelector('.button__save');

btnDeleteAll.addEventListener('click', dispose);
btnSave.addEventListener('click', save);

const myCanvas = document.getElementById('myCanvas');

myCanvas.width = 600;
myCanvas.height = 600;

const ctx = myCanvas.getContext('2d');

const graphString = localStorage.getItem('graph');
const graphInfo = graphString ? JSON.parse(graphString) : null;

const graph = graphInfo ? Graph.load(graphInfo) : new Graph();

const world = new World(graph);

const viewport = new Viewport(myCanvas);
const graphEditor = new GraphEditor(viewport, graph);

animate();

function animate() {
  viewport.reset();
  world.generate();
  world.draw(ctx);
  ctx.globalAlpha = 0.3;
  graphEditor.display();
  requestAnimationFrame(animate);
}

function dispose() {
  graphEditor.dispose();
}

function save() {
  localStorage.setItem('graph', JSON.stringify(graph));
}
