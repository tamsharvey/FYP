import firebase_admin
import requests
from flask import Flask, request, render_template
from firebase_admin import db, firestore, credentials
from bs4 import BeautifulSoup

app = Flask(__name__)
db = firestore.client()

cred = credentials.Certificate("finalyearproject-837f4-firebase-adminsdk-1b0y6-55db3d525a.json")
firebase_admin.initialize_app(cred)
apiURL = f'https://api.themoviedb.org/3/discover/movie?api_key=53c1020b3a0e7aeb482d50f68918374e'


@app.route('trend', methods=["GET"])
def trending():
    apiUrlFunc = 'https://us-central1-finalyearproject-837f4.cloudfunctions.net/generatemovies'
    # resp = requests.get(apiURL)
    # respData = resp.json()
    #
    # print(respData)
    #
    # trending(respData['results'])
    response = requests.get(apiUrlFunc)

    return response


@app.route('/searchMovie', methods=['GET', 'POST'])
def searchMovie():
    if request.method == 'POST':
        title = request.form.get('search')
        apiUrlFunc = 'https://us-central1-finalyearproject-837f4.cloudfunctions.net/searchmovie'
        response = requests.get(apiUrlFunc)

        return response, title


@app.route('printMoiveInfo', methods=['GET'])
def printMovieInfo():
    ref = db.reference('server/saving-data/fireblog/Movies')
    movies = ref.get()
    movie_list = []
    for movie in movies:
        movie_data = movie.to_dict()
        movie_list.append(movie_data)

    return render_template('movieInfo.html', movie=movie_list)

    # apiUrlFunc = 'https://us-central1-finalyearproject-837f4.cloudfunctions.net/searchmovie'

    # response = requests.get(apiUrlFunc)
    # return response, 'Test'
    # soup = BeautifulSoup(open("index.html", encoding="utf8"), "html.parser")
    #
    # print(soup.find_all("div", class_="someclass"))

    # file = codecs.open("sample.html", "r", "utf-8")
    # print(file.read())

    # apiUrl = 'https://us-central1-finalyearproject-837f4.cloudfunctions.net/searchmovie'
    # response = requests.get(apiUrl)

    # if response.status_code == 200:
    #     response_data = {'status': 'success'}
    #     status_code = 200
    # else:
    #     response_data = {'status': 'error', 'message': 'API request failed'}
    #     status_code = 500
    #
    # return response_data, status_code
    # return 'Test'


if __name__ == "__main__":
    from waitress import serve

    serve(app, host="0.0.0.0", port=8080)
