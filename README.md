# 📰 Fake News Detection Using TensorFlow

## 🚀 Project Overview
Fake news is a major challenge in today's digital era. This project aims to detect fake news using **TensorFlow** and **Natural Language Processing (NLP)** techniques. Users can upload a document (PDF, text file) containing news articles, which will be analyzed to determine whether the news is **real or fake**.

## 🎯 Features
- ✅ **Upload news documents** (PDF, TXT) for analysis.
- 🔍 **Extract text** from uploaded documents.
- 📌 **Preprocess text**: Tokenization, stopword removal, word embeddings, and encoding.
- 🧠 **Predict if the news is real or fake** using a trained TensorFlow model.
- 🌐 **User-friendly web interface** built with Next.js and Tailwind CSS.
- 📄 **JSON mapping**: Extracted text is structured into `content` and `title` for better analysis.
- 🚀 **Live Deployment on Vercel**: [Visit Here](https://fake-news-detection-using-tensorflow.vercel.app/)

---

## 🛠️ Tech Stack

### 🔹 Frontend
- **Next.js (TypeScript)** - For building a fast and scalable UI.
- **Tailwind CSS** - For modern and responsive styling.

### 🔹 Backend
- **Flask** - For handling API requests and model inference.
- **OCR (ocr.py)** - For extracting text from uploaded files.
- **TensorFlow** - For training and predicting fake news.

### 🔹 Deployment
- **Vercel** - Hosting the frontend for seamless user experience.
- **Flask API** - Deployed to serve the ML model.

---

## 📌 Steps Followed
1. **Data Preprocessing**:
   - Tokenization
   - Stopword removal
   - Data encoding
   - Generating word embeddings
2. **Text Extraction from Uploaded Files**:
   - OCR processing of PDFs & text files.
   - Mapping text into `content` and `title`.
3. **Fake News Prediction**:
   - Process extracted text using a trained NLP model.
   - Output `Real` or `Fake` classification.

---

## 🖥️ How to Run Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/Fake_News_Detection_Using_Tensorflow.git
   cd Fake_News_Detection_Using_Tensorflow
   ```

2. **Backend Setup**
   - Install dependencies:
     ```bash
     pip install -r requirements.txt
     ```
   - Run Flask server:
     ```bash
     python app.py
     ```

3. **Frontend Setup**
   - Navigate to frontend folder:
     ```bash
     cd frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the Next.js server:
     ```bash
     npm run dev
     ```

4. **Access the App**
   - Open `http://localhost:3000` in your browser.

---

🚀 **Live Demo**: [Fake News Detection](https://fake-news-detection-using-tensorflow.vercel.app/)
