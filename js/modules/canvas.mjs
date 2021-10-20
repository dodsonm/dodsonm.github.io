function create(id, host, width, height) {
  let canvasEl = document.createElement('canvas');
  host.appendChild(canvasEl);

  canvasEl.id = id;
  canvasEl.width = width;
  canvasEl.height = height;

  let ctx = canvasEl.getContext('2d');

  return {
    ctx: ctx,
    id: id
  };
}

export { create };
