class Segment {
  constructor(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
  }

  // проверим, что сегмент равен/включает переданный seg'мент.
  // То есть все точки переданного сегмента содержатся в данном сегменте.
  //    this     ==     seg           seg
  // (1)----(2)  ==  (1)---(2) или (2)---(1)
  equals(seg) {
    return this.includes(seg.p1) && this.includes(seg.p2);
  }

  // проверим, что сегмент включает точку point
  includes(point) {
    return this.p1.equals(point) || this.p2.equals(point);
  }

  draw(ctx, { width = 2, color = 'black', dash = [] } = {}) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.setLineDash(dash);
    ctx.moveTo(this.p1.x, this.p1.y);
    ctx.lineTo(this.p2.x, this.p2.y);
    ctx.stroke();
    ctx.setLineDash([]);
  }
}

export { Segment };
