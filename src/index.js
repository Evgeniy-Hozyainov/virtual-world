import './styles.css';

import { Graph } from './math/graph.js';
import { Point } from './primitives/point.js';
import { Segment } from './primitives/segment.js';
import { GraphEditor } from './graphEditor.js';
import { Viewport } from './viewport.js';

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
const viewport = new Viewport(myCanvas);
const graphEditor = new GraphEditor(viewport, graph);

animate();

function animate() {
  viewport.reset();
  graphEditor.display();
  requestAnimationFrame(animate);
}

function dispose() {
  graphEditor.dispose();
}

function save() {
  localStorage.setItem('graph', JSON.stringify(graph));
}
