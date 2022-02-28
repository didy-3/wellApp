const drawLine = (ctx, info, style, thickness = {}) => {
    const {x, y, x1, y1} = info;
    const {color = 'black', width = thickness} = style;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x1, y1);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();
}
export default drawLine;