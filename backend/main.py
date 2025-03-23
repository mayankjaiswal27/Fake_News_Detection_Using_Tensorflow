from flask import Flask, request, jsonify
from flask_cors import CORS
import pdfplumber
from docx import Document
import os
import pytesseract
from PIL import Image
import numpy as np
import pickle
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.sequence import pad_sequences

app = Flask(__name__)
CORS(app)

# Model parameters
max_length = 54
trunc_type = 'post'
padding_type = 'post'

# Load the pre-trained model and tokenizer
model = load_model('fake_news_model.h5')
with open('tokenizer.pkl', 'rb') as f:
    tokenizer = pickle.load(f)

def extract_text_from_txt(file_path):
    with open(file_path, "r", encoding="utf-8") as file:
        return file.read()

def extract_text_from_docx(file_path):
    doc = Document(file_path)
    return "\n".join([para.text for para in doc.paragraphs])

def extract_text_from_pdf(file_path):
    text = ""
    with pdfplumber.open(file_path) as pdf:
        for page in pdf.pages:
            extracted_text = page.extract_text()
            if extracted_text:
                text += extracted_text + "\n"
    return text

def extract_text_from_image(file_path):
    image = Image.open(file_path)
    text = pytesseract.image_to_string(image)
    return text

def map_to_json(text):
    lines = text.strip().split("\n")
    if len(lines) > 1:
        title = lines[0]
        news = " ".join(lines[1:])
    else:
        title = "Unknown Title"
        news = text
    return {"title": title, "news": news}

def predict_fake_news(title):
    sequences = tokenizer.texts_to_sequences([title])
    padded = pad_sequences(sequences, maxlen=max_length, padding=padding_type, truncating=trunc_type)
    prediction = model.predict(padded, verbose=0)[0][0]
    return "This news is True" if prediction >= 0.5 else "This news is False"

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    file_path = os.path.join("uploads", file.filename)
    file.save(file_path)

    if file.filename.endswith(".txt"):
        text = extract_text_from_txt(file_path)
    elif file.filename.endswith(".docx"):
        text = extract_text_from_docx(file_path)
    elif file.filename.endswith(".pdf"):
        text = extract_text_from_pdf(file_path)
    elif file.filename.lower().endswith((".png", ".jpg", ".jpeg")):
        text = extract_text_from_image(file_path)
    else:
        return jsonify({"error": "Unsupported file format"}), 400

    mapped_json = map_to_json(text)
    prediction = predict_fake_news(mapped_json["title"])
    mapped_json["prediction"] = prediction

    return jsonify(mapped_json)

@app.route('/analyze', methods=['POST'])
def analyze_text():
    data = request.get_json()
    if not data or 'title' not in data or 'news' not in data:
        return jsonify({"error": "Missing title or news content"}), 400

    title = data['title']
    prediction = predict_fake_news(title)
    return jsonify({"title": title, "news": data['news'], "prediction": prediction})

if __name__ == '__main__':
    if not os.path.exists("uploads"):
        os.makedirs("uploads")
    port = int(os.environ.get("PORT", 5000)) 
    app.run(host="0.0.0.0", port=port, debug=True)