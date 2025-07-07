# 🌿 LeafGuard — AI-Based Plant Disease Detection

**LeafGuard** is a powerful, browser-based web application that uses a Teachable Machine image model (TensorFlow.js) to detect plant leaf diseases in real time. Users can analyze leaves using either a webcam or by uploading images. The interface is clean, responsive, and fully functional without any backend.

---

## 🚀 Features

- 📷 Detect diseases via **webcam** or **image upload**
- 🤖 Built using **TensorFlow.js** and **Teachable Machine**
- 🌱 Identifies conditions like:
  - **Healthy**
  - **Powdery Mildew**
  - **Rust**
- 📊 Visual result cards with icons and probability
- 💻 Responsive UI with drag & drop support

---

## 🛠️ Technologies Used

- **HTML5, CSS3, JavaScript**
- **TensorFlow.js** (via CDN)
- **Teachable Machine Image Model**
- **Responsive design** with flexbox and media queries

---

## 📸 How It Works

1. Click **Camera** to activate webcam or **Upload** to select a leaf image.
2. The model runs the prediction in-browser.
3. Get real-time results with class labels and probability.

---

## 🔗 Live Demo

You can run the app by opening `index.html` in a browser.  
Optional: Host it via GitHub Pages for public access.

---

## 📁 Folder Structure

```
LeafGuard/
│
├── index.html         # Main application page
├── style.css          # All UI and layout styles
└── script.js          # JavaScript logic with TensorFlow integration
```

---

## 🧠 Model Info

Model URL:  
`https://teachablemachine.withgoogle.com/models/UAIniK_gb/`

Classes:
- **Healthy**
- **Powdery**
- **Rust**

---

## 🧪 Future Enhancements

- 🌍 Add support for more plant types and diseases
- 📱 Progressive Web App (PWA) support
- 🌐 Multilingual UI

---

## 🙌 Acknowledgements

- [Teachable Machine by Google](https://teachablemachine.withgoogle.com/)
- [TensorFlow.js](https://www.tensorflow.org/js)
- [Unsplash](https://unsplash.com) for background images
