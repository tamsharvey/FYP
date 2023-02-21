from pathlib import Path
import pandas as pd
import sqlite3

Path('../my_data.db').touch()
conn = sqlite3.connect('../my_data.db')
c = conn.cursor()

c.execute('''CREATE TABLE info1 (tconst text, titleType text)''')


# load the data into a Pandas DataFrame
info1 = pd.read_csv('/Users/tamsinharvey/Documents/College/4th Year/FYP/App/public/Databases/title.basics.tsv')
# write the data to a sqlite table
info1.to_sql('users', conn, if_exists='append', index = False)