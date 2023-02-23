from flask import Flask, request, jsonify
import tmdbsimple as tmdb
import json

tmdb.API_KEY = '53c1020b3a0e7aeb482d50f68918374e'

app = Flask(__name__)


@app.route("./funcs/index.js")
def searchMovie():
    name = request.args.get('movieSearch')
    print(name)
    return


if __name__ == "__main__":
    from waitress import serve
    serve(app, host="0.0.0.0", port=8080)
