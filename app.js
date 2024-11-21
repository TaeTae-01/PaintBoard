const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const color = document.querySelector("#color");
const lineWidthInput = document.querySelector("#lineWidth");
const increaseLineWidthBtn = document.querySelector("#increaseLineWidth");
const decreaseLineWidthBtn = document.querySelector("#decreaseLineWidth");

let isDrawing = false;

// canvas 기본 세팅
canvas.width = 800;
canvas.height = 600;
ctx.strokeStyle = '#2c2c2c';
ctx.lineWidth = 2.5;

// 사용자 마우스 클릭 신호 감지 함수
function startDrawing() {
    isDrawing = true;
}

function draw(event) {
    if (!isDrawing) return;
    const x = event.offsetX;
    const y = event.offsetY;
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

function stopDrawing() {
    isDrawing = false;
    ctx.beginPath();
}

function changeColor(color) {
    ctx.strokeStyle = color;
}

color.addEventListener("input", function (event) {
    changeColor(event.target.value);
});

function setLineWidth(lineWidth) {
    ctx.lineWidth = lineWidth;
    lineWidthInput.value = lineWidth; // 값 반영
}

// 버튼 이벤트로 굵기 조절
function increaseLineWidth() {
    let currentWidth = parseInt(lineWidthInput.value);
    if (currentWidth < 10) {
        currentWidth++;
        setLineWidth(currentWidth);
    }
}

function decreaseLineWidth() {
    let currentWidth = parseInt(lineWidthInput.value);
    if (currentWidth > 1) {
        currentWidth--;
        setLineWidth(currentWidth);
    }
}

// 버튼 이벤트 리스너
increaseLineWidthBtn.addEventListener("click", increaseLineWidth);
decreaseLineWidthBtn.addEventListener("click", decreaseLineWidth);

// 굵기 변경 이벤트 리스너
lineWidthInput.addEventListener("input", function (event) {
    setLineWidth(parseInt(event.target.value));
});

// 마우스 이벤트 리스너
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseleave', stopDrawing);
