# PaintBoard

---

**PaintBoard** is an interactive web-based drawing application developed using **HTML**, **CSS**, **JavaScript**, and **Node.js** for backend support. It leverages the **canvas** element in JavaScript to deliver a dynamic and user-friendly drawing environment. The application allows users to create artwork, adjust brush settings, save their drawings, and share them with others via an integrated backend server.

## Features

- **Interactive Canvas Drawing**: PaintBoard offers users a real-time drawing experience by utilizing mouse events to create diverse shapes, lines, and illustrations directly on the canvas.

- **Brush Customization**: Users can personalize brush attributes, including **color**, **line width**, and **eraser mode**. Customization options include:
  - **Brush Size Adjustment**: Dynamically modify the brush size by increasing or decreasing the line width.
  - **Color Picker**: Select colors from a comprehensive palette to enhance creativity.

- **Eraser Tool**: Toggle between drawing and erasing modes to modify or remove parts of the artwork.

- **Clear All Function**: Clear the entire canvas with a single click for a fresh start.

- **Upload Functionality**: Save your creations by uploading them to the server. Uploaded files are securely stored and can be accessed by other users.

- **Backend Integration**: PaintBoard's backend server, built with **Node.js** and **Express.js**, manages drawing files efficiently. The server enables both storing and retrieving artwork, thereby facilitating user collaboration.

## Installation

### Requirements
- Node.js
- npm

### Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/YourUsername/PaintBoard.git
   ```

2. Navigate to the backend folder and install dependencies:
   ```bash
   cd paintboard_backend
   npm install
   ```

3. Start the backend server:
   ```bash
   npm run dev
   ```

4. Open `index.html` from the `paintboard_frontend` folder in your browser to begin drawing.

## Folder Structure

```
paintboard_backend/
  |- node_modules/
  |- src/
  |    |- app.js
  |    |- routes/
  |    |    |- index.js
  |    |    |- posts.js
  |- .env
  |- .gitignore
  |- package.json
  |- README.md

paintboard_frontend/
  |- app.js
  |- index.html
  |- style.css
```

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript, Bootstrap (for enhanced user interface design)
- **Backend**: Node.js, Express.js, Multer (to handle file uploads)
- **Other Tools**: Nodemon, dotenv

## Usage

1. Launch the application by opening the HTML file in your browser.
2. Use the color palette to choose a preferred brush color.
3. Adjust the brush width using the dedicated buttons or input field.
4. Draw freely on the canvas using the mouse.
5. Erase segments of your drawing or clear the entire canvas if needed.
6. Click the upload button to save your drawing on the server.

## Future Improvements

- **User Authentication**: Introduce a user authentication system, enabling individuals to create accounts and manage their artwork.
- **Comment and Like System**: Enhance user engagement by allowing comments and likes on drawings shared by others.
- **Gallery View**: Implement a gallery feature to showcase drawings from various users, fostering a community-driven experience.

## License

This project is licensed under the MIT License, allowing free use, modification, and distribution with proper attribution.

