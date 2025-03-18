from flask import Flask, request, jsonify
from flask_cors import CORS
import pdfplumber
from docx import Document
import os
import pytesseract
from PIL import Image

app = Flask(__name__)
CORS(app)

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
    return jsonify(mapped_json)

if __name__ == '__main__':
    if not os.path.exists("uploads"):
        os.makedirs("uploads")
    app.run(debug=True)
