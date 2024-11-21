const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const colorInput = document.querySelector("#color");
const lineWidthInput = document.querySelector("#lineWidth");
const increaseLineWidthBtn = document.querySelector("#increaseLineWidth");
const decreaseLineWidthBtn = document.querySelector("#decreaseLineWidth");
const eraser = document.querySelector("#eraser");
const clear = document.querySelector("#clearall");

let isDrawing = false;
let isErasing = false;

// canvas 기본 세팅
canvas.width = 800;
canvas.height = 600;
ctx.strokeStyle = '#2c2c2c';
ctx.lineWidth = 2.5;

// 마우스 이벤트 핸들러
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

// 마우스 이벤트 리스너
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseleave', stopDrawing);

// 색상 변경 핸들러
function changeColor(color) {
    ctx.strokeStyle = color;
    isErasing = false; // 지우개 해제
    eraser.classList.remove('active');
}

colorInput.addEventListener("input", function (event) {
    changeColor(event.target.value);
});

// 선 굵기 변경 핸들러
function setLineWidth(lineWidth) {
    ctx.lineWidth = lineWidth;
    lineWidthInput.value = lineWidth; // 값 반영
}

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

// 선 굵기 변경 이벤트 리스너
increaseLineWidthBtn.addEventListener("click", increaseLineWidth);
decreaseLineWidthBtn.addEventListener("click", decreaseLineWidth);
lineWidthInput.addEventListener("input", function (event) {
    setLineWidth(parseInt(event.target.value));
});

// 지우개 기능 핸들러
function toggleEraser() {
    isErasing = !isErasing;
    if (isErasing) {
        ctx.strokeStyle = '#FFFFFF'; // 흰색으로 설정하여 지우개처럼 작동
        eraser.classList.add('active'); // 버튼에 활성화 클래스 추가
    } else {
        ctx.strokeStyle = colorInput.value; // 다시 현재 선택된 색으로 복귀
        eraser.classList.remove('active'); // 활성화 클래스 제거
    }
}

eraser.addEventListener('click', toggleEraser);

// 전체 지우기 기능 핸들러
function eraseAll() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // 캔버스 전체 지우기
}

clear.addEventListener('click', eraseAll);