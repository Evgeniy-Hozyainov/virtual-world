import { Point } from './primitives/point.js';
import { Segment } from './primitives/segment.js';
import { getNearestPoint } from './math/utils.js';

class GraphEditor {
  constructor(canvas, graph) {
    this.canvas = canvas;
    this.graph = graph;

    this.ctx = this.canvas.getContext('2d');

    this.selected = null; // Выбранная Point
    this.hovered = null; // Точка над которой находится указатель мыши
    this.dragging = false;
    this.mouse = null;

    this.#addEventListeners(); // Добавим прослушиватели событий
  }

  #addEventListeners() {
    this.canvas.addEventListener('mousedown', this.#handleMouseDown.bind(this));
    this.canvas.addEventListener('mousemove', this.#handleMouseMove.bind(this));
    this.canvas.addEventListener('contextmenu', (evt) => evt.preventDefault());
    this.canvas.addEventListener('mouseup', (evt) => (this.dragging = false));
  }

  #handleMouseMove(evt) {
    this.mouse = new Point(evt.offsetX, evt.offsetY);
    // Определяем находится ли указатель мыши над существующей точкой
    this.hovered = getNearestPoint(this.mouse, this.graph.points, 10);
    if (this.dragging == true) {
      this.selected.x = this.mouse.x;
      this.selected.y = this.mouse.y;
    }
  }

  #handleMouseDown(evt) {
     if (evt.button == 2) {
        // right click
        if (this.selected) {
          this.selected = null;
        } else if (this.hovered) {
          this.#removePoint(this.hovered);
        }
      }
      if (evt.button == 0) {
        // left click
        // Если клик мышью был выполнен над уже существующей точкой,
        // то новая Point не создаётся, а выбирается hovered Point
        if (this.hovered) {
          this.#select(this.hovered);
          this.dragging = true;
          return;
        }

        // Создаём новую Point
        this.graph.addPoint(this.mouse);
        this.#select(this.mouse);
        this.hovered = this.mouse;
      }
  }

  #select(point) {
    if (this.selected) {
      // Если есть selected Point, то создаём новый Segment между ней и указанной Point
      this.graph.tryAddSegment(new Segment(this.selected, point));
    }
    // Устанавливаем selected Point в указанную Point
    this.selected = point;
  }

  #removePoint(point) {
    this.graph.removePoint(point);
    this.hovered = null;
    if (point == this.selected) {
      this.selected = null;
    }
  }

  display() {
    this.graph.draw(this.ctx);
    if (this.hovered) {
      this.hovered.draw(this.ctx, { fill: true });
    }
    if (this.selected) {
      const intent = this.hovered ? this.hovered : this.mouse;
      new Segment(this.selected, intent).draw(this.ctx, { dash: [3, 3] });
      this.selected.draw(this.ctx, { outline: true });
    }
  }
}

export { GraphEditor };
