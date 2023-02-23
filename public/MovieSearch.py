import urllib.request
import urllib.parse
import urllib.error
import json
import pandas as pd
import sqlite3

# Gets the secret API key (you have to get one from OMDB website and use that, 1000 daily limit) from a JSON file, stored in the same folder
with open('/App/public/json_files/APIkeys.json') as f:
    keys = json.load(f)
    omdbapi = keys['OMDBapi']
    serviceurl = 'http://www.omdbapi.com/?'
    apikey = '&apikey='+ '751f8593'


# Function for printing a JSON dataset
def print_json(json_data):
    list_keys = ['Title', 'Year', 'Rated', 'Released', 'Runtime', 'Genre', 'Director', 'Writer',
                 'Actors', 'Plot', 'Language', 'Country', 'Awards', 'Ratings',
                 'Metascore', 'imdbRating', 'imdbVotes', 'imdbID']
    print("-" * 50)
    for k in list_keys:
        if k in list(json_data.keys()):
            print(f"{k}: {json_data[k]}")
    print("-" * 50)

# Saves the movie data
def save_in_database(json_data):
    filename = input("Please enter a name for the database (extension not needed, it will be added automatically): ")
    filename = filename + '.sqlite'

    conn = sqlite3.connect(str(filename))
    cur = conn.cursor()

    title = json_data['Title']
    # Goes through the json dataset and extracts information if it is available
    if json_data['Year'] != 'N/A':
        year = int(json_data['Year'])
    if json_data['Runtime'] != 'N/A':
        runtime = int(json_data['Runtime'].split()[0])
    if json_data['Country'] != 'N/A':
        country = json_data['Country']
    if json_data['Metascore'] != 'N/A':
        metascore = float(json_data['Metascore'])
    else:
        metascore = -1
    if json_data['imdbRating'] != 'N/A':
        imdb_rating = float(json_data['imdbRating'])
    else:
        imdb_rating = -1

    # SQL commands
    cur.execute('''CREATE TABLE IF NOT EXISTS MovieInfo 
       (Title TEXT, Year INTEGER, Runtime INTEGER, Country TEXT, Metascore REAL, IMDBRating REAL)''')

    cur.execute('SELECT Title FROM MovieInfo WHERE Title = ? ', (title,))
    row = cur.fetchone()

    if row is None:
        cur.execute('''INSERT INTO MovieInfo (Title, Year, Runtime, Country, Metascore, IMDBRating)
                   VALUES (?,?,?,?,?,?)''', (title, year, runtime, country, metascore, imdb_rating))
    else:
        print("Record already found. No update made.")

    # Commits the change and close the connection to the database
    conn.commit()
    conn.close()


# Print to local database
def print_database(database):
    conn = sqlite3.connect(str(database))
    cur = conn.cursor()

    for row in cur.execute('SELECT * FROM MovieInfo'):
        print(row)
    conn.close()


# Save database content in excel file
def save_in_excel(filename, database):
   if filename.split('.')[-1] != 'xls' and filename.split('.')[-1] != 'xlsx':
      print("Filename does not have correct extension. Please try again")
      return None


   # df=pd.DataFrame(columns=['Title','Year', 'Runtime', 'Country', 'Metascore', 'IMDB_Rating'])

   conn = sqlite3.connect(str(database))
   # cur=conn.cursor()

   df = pd.read_sql_query("SELECT * FROM MovieInfo", conn)
   conn.close()

   df.to_excel(filename, sheet_name='Movie Info')




# Function to search for information about a movie
def search_movie(title):
   if len(title) < 1 or title == 'quit':
      print("Goodbye now...")
      return None

   try:
      url = serviceurl + urllib.parse.urlencode({'t': title}) + apikey
      print(f'Retrieving the data of "{title}" now... ')
      uh = urllib.request.urlopen(url)
      data = uh.read()
      json_data = json.loads(data)

      if json_data['Response'] == 'True':
         print_json(json_data)

      else:
         print("Error encountered: ", json_data['Error'])

   except urllib.error.URLError as e:
      print(f"ERROR: {e.reason}")




title = input('\nEnter the name of a movie (enter \'quit\' or hit ENTER to quit): ')
if len(title) < 1 or title=='quit':
    print("Goodbye now...")
else:
    search_movie(title)