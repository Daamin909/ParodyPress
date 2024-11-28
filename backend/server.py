from flask import Flask, request, jsonify
from flask_cors import CORS
from parody import makeNews


app = Flask(__name__)
CORS(app)



@app.route("/api/getnews", methods=['POST'])
def getNews():
    data = request.get_json()
    intensity = data['intensity']
    query = data['search']
    news = makeNews(intensity, query)
    return jsonify(news)



if __name__ == '__main__':
    app.run(debug=True)