const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let isDrawing = false;

// canvas 기본 세팅
canvas.width = 800;
canvas.height = 600;
ctx.strokeStyle = '#2c2c2c';
ctx.lineWidth = 2.5;

// 사용자 마우스 클린 신호 감지 함수
function startDrawing() {
    isDrawing = true;
}

function draw(event) {
    if(!isDrawing) return;
    const x = event.offsetX;
    const y = event.offsetY;
    if(isDrawing) {
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x,y);
    }
}

function stopDrawing() {
    isDrawing = false;
    ctx.beginPath();
}
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseleave', stopDrawing);
