import requests
from flask import Flask, request
import tmdbsimple as tmdb
import json

tmdb.API_KEY = '53c1020b3a0e7aeb482d50f68918374e'

app = Flask(__name__)


@app.route('./searchMovie', methods=['GET'])
def searchMovie():
    apiUrl = 'https://us-central1-finalyearproject-837f4.cloudfunctions.net/searchMovie?query=1&apiKey=53c1020b3a0e7aeb482d50f68918374e'

    response = requests.get(apiUrl)

    if response.status_code == 200:
        response_data = {'status': 'success'}
        status_code = 200
    else:
        response_data = {'status': 'error', 'message': 'API request failed'}
        status_code = 500

    return response_data, status_code


if __name__ == "__main__":
    from waitress import serve
    serve(app, host="0.0.0.0", port=8080)
