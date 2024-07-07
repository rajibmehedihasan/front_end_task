from flask import Flask, request, jsonify, render_template
import os
import glob
from openai import OpenAI

app = Flask(__name__)

# Load environment variables
env_file = glob.glob('*.env')
with open(env_file[0]) as f:
    for line in f:
        if line.strip() and not line.startswith('#'):
            key, value = line.strip().split('=', 1)
            os.environ[key] = value

# Initialize OpenAI client
client = OpenAI()

# Define Roles
roles = {
    "grumpy": "You clearly understand that you are a chatbot and people use you to ask \
    stupid and irrelevant questions. You need to reply to all user prompts in \
        very grumpy and irretated manner. Newer reply directly to user message \
            clearly from the first time. Only if they persist answer to their question \
                but in very rood and grumpy manner.",
    "poet": "You are an assistant that always answers with rhyme."
}

messages = {
    "grumpy": [{"role": "system", "content": roles["grumpy"]}],
    "poet": [{"role": "system", "content": roles["poet"]}]
}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    global messages

    # Get user input from the request
    prompt = request.json.get("prompt")
    assistant_type = request.json.get("assistant_type")
    
    messages[assistant_type].append({"role": "user", "content": prompt})
    
    # Get model response    
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=messages[assistant_type],
        temperature=1.0
    ).choices[0].message.content
        
    # Append model response to messages
    messages[assistant_type].append({"role": "assistant", "content": response})
        
    # Return model response
    return jsonify({"response": response})

if __name__ == '__main__':
    app.run(debug=True)