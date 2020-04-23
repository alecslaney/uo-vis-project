from flask import Flask, jsonify, render_template, redirect, url_for
from flask_pymongo import PyMongo
from flask_cors import CORS
from packages import call_api, features, encoder

# Creation of Flask app
app = Flask(__name__)
CORS(app)

# Setting up MongoDB
conn = 'mongodb://localhost:27017/forest_db'
client = PyMongo(app, uri=conn)

# Landing page
@app.route("/")
def index():
    return render_template("landing.html")

# Map page
@app.route("/map")
def map():
    return render_template("index.html")

# Populates the API and displays the map page
@app.route("/display")
def render():
    populate_api()
    return (redirect(url_for('map'), code=302))

# Gets all of the data for building the API database
@app.route("/call_api")
def get_data():
    call_api.call()
    return (redirect(url_for('index'), code=302))

# Builds the database
@app.route("/build")
def build_db():
    features.extract()
    return (redirect(url_for('index'), code=302))

# Page containing JSON serialized data from MongoDB
@app.route("/api")
def populate_api():
    documents = [doc for doc in client.db.data.find()]
    documents = [{**document, '_id': encoder.encode(document['_id'])} for document in documents]

    return jsonify(documents)

# Debugger
if __name__ == "__main__":
    app.run(debug=True)