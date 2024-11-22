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

// canvas 기본 세팅
function setCanvasSize() {
    // 최소 사이즈
    const MIN_WIDTH = 400;
    const MIN_HEIGHT = 300; 

    let newWidth = window.innerWidth * 0.9;
    let newHeight = window.innerHeight * 0.9;

    if(newWidth < MIN_WIDTH) {
        newWidth = MIN_WIDTH;
    }
    if(newHeight < MIN_WIDTH) {
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
function startDrawing() {
    isDrawing = true;
}

function draw(event) {
    if (!isDrawing) return;

    const x = event.offsetX;
    const y = event.offsetY;

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

// 업로드 관련 함수
uploadBtn.addEventListener("click", () => {
    const dataURL = canvas.toDataURL(); // 캔버스의 그림을 DataURL 형식으로 변환
    fetch('http://localhost:3000/posts/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image: dataURL })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Upload successful', data);
    })
    .catch(error => {
      console.error('Error uploading image:', error);
    });
  });

  // main.js (프론트엔드)

// 업로드 버튼 클릭 시 이미지 업로드 함수
async function uploadImage() {
    const fileInput = document.querySelector("#fileInput");
    const formData = new FormData();
    formData.append("image", fileInput.files[0]);

    try {
        const response = await fetch('http://localhost:3000/upload', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const data = await response.json();
            // 업로드 성공 메시지를 띄움
            alert(data.message); // 예: "File uploaded successfully"
            displaySuccessMessage("Upload successful!");
        } else {
            throw new Error('Upload failed');
        }
    } catch (error) {
        console.error('Error uploading file:', error);
        alert('Failed to upload image. Please try again.');
    }
}

// 업로드 성공 메시지 함수
function displaySuccessMessage(message) {
    const messageContainer = document.createElement("div");
    messageContainer.className = "upload-success-message";
    messageContainer.innerText = message;

    // 메시지를 body에 추가
    document.body.appendChild(messageContainer);

    // 3초 후 메시지 제거
    setTimeout(() => {
        document.body.removeChild(messageContainer);
    }, 3000);
}

// 업로드 버튼 클릭 이벤트 리스너
document.querySelector("#uploadButton").addEventListener("click", uploadImage);