from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app, support_credentials=True)

@cross_origin(supports_credentials=True)
@app.route("/sendmessage", methods=['POST'])
def sendmessage():
    print(request.json)
    return jsonify(request.json)

if __name__ == "__main__":
    app.run(debug=True)