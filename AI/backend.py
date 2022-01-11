from logging import debug
from flask import Flask, request, jsonify
from chatbot import ChatBot
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app, support_credentials=True)

chatBotInstance = ChatBot()

@app.route('/api/getResponse', methods=['POST'])
@cross_origin(supports_credentials=True)
def getResponse():
    body = request.json
    
    message = body['message']

    response = chatBotInstance.chat(message)

    return jsonify({ "response": response })

if __name__ == "__main__":
    app.run(debug=True, port=1111)