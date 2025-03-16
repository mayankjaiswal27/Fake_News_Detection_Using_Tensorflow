from flask import Flask, request, jsonify
from flask_cors import CORS
import pdfplumber
from docx import Document
import os

app = Flask(__name__)
CORS(app)

def extract_text_from_txt(file_path):
    """Extract text from a TXT file."""
    with open(file_path, "r", encoding="utf-8") as file:
        return file.read()

def extract_text_from_docx(file_path):
    """Extract text from a DOCX file."""
    doc = Document(file_path)
    return "\n".join([para.text for para in doc.paragraphs])

def extract_text_from_pdf(file_path):
    """Extract text from a PDF file."""
    text = ""
    with pdfplumber.open(file_path) as pdf:
        for page in pdf.pages:
            text += page.extract_text() + "\n"
    return text

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['file']
    
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    # Save the uploaded file
    file_path = os.path.join("uploads", file.filename)
    file.save(file_path)

    # Extract text based on file type
    if file.filename.endswith(".txt"):
        text = extract_text_from_txt(file_path)
    elif file.filename.endswith(".docx"):
        text = extract_text_from_docx(file_path)
    elif file.filename.endswith(".pdf"):
        text = extract_text_from_pdf(file_path)
    else:
        return jsonify({"error": "Unsupported file format"}), 400

    return jsonify({"extracted_text": text})

if __name__ == '__main__':
    if not os.path.exists("uploads"):
        os.makedirs("uploads")  
    app.run(debug=True)
