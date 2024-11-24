const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const colorInput = document.querySelector("#color");
const lineWidthInput = document.querySelector("#lineWidth");
const increaseLineWidthBtn = document.querySelector("#increaseLineWidth");
const decreaseLineWidthBtn = document.querySelector("#decreaseLineWidth");
const eraser = document.querySelector("#eraser");
const clear = document.querySelector("#clearall");
const uploadBtn = document.getElementById("uploadBtn");

let isDrawing = false;
let isErasing = false;

// canvas 기본 세팅 (CSS에서 크기 설정을 제거하고 JS로만 설정)
function setCanvasSize() {
    // 최소 사이즈
    const MIN_WIDTH = 400;
    const MIN_HEIGHT = 300; 

    let newWidth = window.innerWidth * 0.9;
    let newHeight = window.innerHeight * 0.75;

    if (newWidth < MIN_WIDTH) {
        newWidth = MIN_WIDTH;
    }
    if (newHeight < MIN_HEIGHT) {
        newHeight = MIN_HEIGHT;
    }

    canvas.width = newWidth;
    canvas.height = newHeight;

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

setCanvasSize();
window.addEventListener("resize", setCanvasSize);

// 마우스 이벤트 핸들러
function startDrawing(event) {
    isDrawing = true;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
}

function draw(event) {
    if (!isDrawing) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
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
    isErasing = false;
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
        ctx.strokeStyle = '#FFFFFF';
        eraser.classList.add('active');
    } else {
        ctx.strokeStyle = colorInput.value;
        eraser.classList.remove('active');
    }
}

eraser.addEventListener('click', toggleEraser);

// 전체 지우기 기능 핸들러
function eraseAll() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

clear.addEventListener('click', eraseAll);

// 업로드 관련 함수
uploadBtn.addEventListener("click", async () => {
    const dataURL = canvas.toDataURL("image/png");

    const loadingSpinner = document.getElementById("loading-spinner");
    loadingSpinner.style.display = "block";

    try {
        const response = await fetch('http://localhost:5000/api/upload', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ image: dataURL }),
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        const result = await response.json();
        console.log("Upload successful:", result);
        displaySuccessMessage("Image uploaded successfully!");

        // 업로드된 이미지 링크 추가
        const messageContainer = document.getElementById("message-container");
        const link = document.createElement('a');
        link.href = `http://localhost:5000/uploads/${result.filename}`;
        link.textContent = "Click here to view your uploaded image";
        link.target = "_blank"; // 새 창에서 열기
        messageContainer.appendChild(link);
    } catch (error) {
        console.error("Upload failed:", error);
        displayErrorMessage("Failed to upload image. Please try again later.");
    } finally {
        loadingSpinner.style.display = "none";
    }
});

// 업로드 성공 메시지 함수
function displaySuccessMessage(message) {
    const messageContainer = document.getElementById("message-container");
    messageContainer.textContent = message;
    messageContainer.style.color = "green";

    // 3초 후에 메시지 제거
    setTimeout(() => {
        messageContainer.textContent = "";
    }, 3000);
}

function displayErrorMessage(message) {
    const messageContainer = document.getElementById("message-container");
    messageContainer.textContent = message;
    messageContainer.style.color = "red";

    // 3초 후에 메시지 제거
    setTimeout(() => {
        messageContainer.textContent = "";
    }, 3000);
}