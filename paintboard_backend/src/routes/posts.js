const express = require('express');
const multer = require('multer');
const router = express.Router();

const upload = multer({ dest: 'uploads/' }); // 업로드된 파일을 'uploads' 폴더에 저장

// 업로드된 파일을 처리하는 라우트
router.post('/upload', upload.single('image'), (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  res.status(201).json({ message: 'File uploaded successfully', file: file });
});

module.exports = router;

router.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
  }

  // 성공적으로 파일이 업로드되었을 때
  console.log('File uploaded successfully:', req.file.filename); // 서버 로그에 업로드된 파일 정보 출력
  res.status(200).json({ message: 'File uploaded successfully' });
});
