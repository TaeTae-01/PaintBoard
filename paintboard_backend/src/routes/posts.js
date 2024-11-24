const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// 업로드된 파일을 처리하는 라우트
router.post('/upload', (req, res) => {
  const { image } = req.body; // Base64 이미지 데이터 받아오기
  if (!image) {
    return res.status(400).json({ message: 'No image data provided' });
  }

  // Base64 데이터에서 실제 이미지 데이터 추출
  const base64Data = image.replace(/^data:image\/png;base64,/, "");
  const filename = `image_${Date.now()}.png`;
  const filepath = path.join(__dirname, '../../uploads/', filename);

  // 파일로 저장
  fs.writeFile(filepath, base64Data, 'base64', (err) => {
    if (err) {
      console.error('Error saving file:', err);
      return res.status(500).json({ message: 'Error saving file' });
    }
    console.log('File uploaded successfully:', filename);
    res.status(200).json({ message: 'File uploaded successfully', filename });
  });
});

// 업로드된 파일을 제공하는 라우트
router.get('/uploads/:filename', (req, res) => {
  const { filename } = req.params;
  const filepath = path.join(__dirname, '../../uploads/', filename);
  res.sendFile(filepath);
});

module.exports = router;
