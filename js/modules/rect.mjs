/**
 * [draw description]
 * @param  {[type]} ctx           HTMLCanvasElement context
 * @param  {[type]} x
 * @param  {[type]} y
 * @param  {[type]} w
 * @param  {[type]} h
 * @param  {[type]} fillStyle
 * @param  {Object} [strokeStyle=null]
 * @return {[type]}
 */
function draw(ctx, x, y, w, h, fillStyle, strokeStyle = null) {
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.fillStyle = fillStyle;
  ctx.fill();

  if (strokeStyle) {
    ctx.lineWidth = 0.05; // TODO use 1/scale instead
    ctx.strokeStyle = strokeStyle;
    ctx.stroke();
  }

  return {
    x: x,
    y: y,
    w: w,
    h: h,
    fillStyle: fillStyle,
    strokeStyle: strokeStyle,
  };
}

function getPerimeter(length, listId) {
  let listItem = document.createElement('li');
  listItem.textContent = `${name} perimeter is ${length * 4}px.`

  let list = document.getElementById(listId);
  list.appendChild(listItem);
}

export { draw, getPerimeter };
