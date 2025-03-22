from flask import Flask, request, jsonify, session
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from utils import query_pinecone
import os
from groq import Groq

app = Flask(__name__)
CORS(app, supports_credentials=True, origins='http://localhost:3000')  
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SECRET_KEY'] = 'your-secret-key'  
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)

with app.app_context():
    db.create_all()

@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.get_json()  
    if not data:
        return jsonify({'error': 'No input provided'}), 400
    first_name = data.get('firstname')
    last_name = data.get('lastname')
    email = data.get('email')
    password = data.get('password')
    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'Email already exists'}), 400
    new_user = User(
        first_name=first_name,
        last_name=last_name,
        email=email,
        password=generate_password_hash(password)
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'detail': 'User created successfully'}), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()  
    if not data:
        return jsonify({'error': 'No input provided'}), 400
    email = data.get('email')
    password = data.get('password')
    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password, password):
        return jsonify({'error': 'Invalid email or password'}), 401
    session['user_id'] = user.id
    return jsonify({'email': user.email, 'firstname': user.first_name, 'lastname': user.last_name}), 200

@app.route('/api/logout', methods=['GET'])
def logout():
    session.pop('user_id', None)
    return jsonify({'message': 'Logged out successfully'}), 200

@app.route("/api/completions", methods=["POST"])
def completions():
    data = request.get_json()  
    if not data:
        return jsonify({'error': 'No input provided'}), 400
    
    query_text = data.get('input')
    if not query_text:
        return jsonify({'error': 'No text provided in the request'}), 400

    context = query_pinecone(query_text)

    groq_api_key = os.getenv("GROQ_API")
    client = Groq(
        api_key=groq_api_key,
    )

    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "system",
                "content": f"""You are an AI assistant for an “AI-Powered Retail Investor Dashboard” named InvestWise, specifically designed for Indian investors to help retail investors make informed financial decisions. Incorporate the following information when formulating responses:

                Problem Statement:
                - Retail investors in India struggle with complexity in financial markets, evolving tax regulations (e.g., Income Tax Act), and lack of personalized guidance.
                - Your goal is to integrate data from Indian financial providers, tax tools, and market regulation databases (such as SEBI guidelines) into one user-friendly platform.
                - Provide AI-based, personalized investment advice based on the user’s financial goals, risk appetite, and Indian market conditions.
                - Include tax calculations (e.g., Section 80C, LTCG, STCG) and compliance guidance concerning relevant Indian regulations and laws.

                Pinecone Context:
                - The Pinecone knowledge base returns relevant documents or metadata. Use any details from the query results to inform your answers.
                - {{context}}

                Requirements:
                - Answer user queries regarding investment strategies, tax implications, and market regulations relevant to India.
                - Provide clear, concise responses tailored to the user’s goals and risk profile.
                - Adhere to best practices and compliance guidelines based on Indian laws and processes.
                - If any requested information is not found in the Pinecone context or other provided data, respond with what is known and do not fabricate details.

                Maintain a professional tone, base answers on the provided context, and avoid including private or unsupported content."""
            },
            {
                "role": "user",
                "content": query_text
            }
        ],
        model="llama-3.1-8b-instant",
    )

    return jsonify({'response': chat_completion.choices[0].message.content}), 200
    

if __name__ == '__main__':
    app.run(debug=True)