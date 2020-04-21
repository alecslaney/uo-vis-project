from flask import Flask, jsonify, render_template
import json, requests
import pymongo
from bson import json_util

# Retrieves full data set from Forest Service, and writes contents to a JSON file.
# Multiple calls necessary to retrieve full data set.
def api_call():

    count_only = "https://apps.fs.usda.gov/arcx/rest/services/EDW/EDW_RecreationOpportunities_01/MapServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json&returnCountOnly=true"
    url = "https://apps.fs.usda.gov/arcx/rest/services/EDW/EDW_RecreationOpportunities_01/MapServer/0/query?where=1%3D1&outFields=RECAREANAME,LONGITUDE,LATITUDE,RECAREAURL,OPEN_SEASON_START,OPEN_SEASON_END,FORESTNAME,RECAREAID,MARKERACTIVITY,MARKERACTIVITYGROUP,RECAREADESCRIPTION,RECPORTAL_UNIT_KEY,FORESTORGCODE,OBJECTID,FEEDESCRIPTION,OPERATIONAL_HOURS,RESERVATION_INFO,RESTRICTIONS,ACCESSIBILITY,OPENSTATUS&returnGeometry=false&outSR=4326&f=json"

    count = requests.get(count_only).json()
    total_records = count["count"]
    print(f"Number of records found: {total_records}")
    
    record_count = 1000
    offset = 0
    x = 0
    print(f"Getting records now...")

    while offset < total_records:
        get_records =  requests.get(f"{url}&resultOffset={offset}&resultRecordCount={record_count}").json()

        data = json.dumps(get_records, sort_keys=True, indent=4)
        file_name = "jsons/api_calls/json" + str(x)

        with open(file_name, "w") as f:
            f.write(data)  
        
        x +=1
        offset += 1000
        if offset > total_records:
            print(f"Finishing...")
        else:
            print(f"Fetched {offset} records so far...")

# Parses JSON files for feature dictionary, adds it to MongoDB
def featureExtract():
    i = 0
    file_name = "jsons/api_calls/json0"
    while i < 14:
        with open(file_name) as f:
            d = json.load(f)
            print(f"Accessing {file_name}")
            features = d["features"]
            for x in range(len(features)):
                attribute = features[x]["attributes"]
                collection.insert_one(attribute)
                x +=1
        i +=1
        file_name = "jsons/api_calls/json" + str(i)

# Creation of flask app
app = Flask(__name__)

# Setting up MongoDB
conn = 'mongodb://localhost:27017'
client = pymongo.MongoClient(conn)

db = client.forest_db
collection = db.data
collection.drop()

@app.route("/")
def index():
    featureExtract()
    features = list(collection.find())  

    # Return the template with the teams list passed in
    return render_template('index.html', features=features)

@app.route("/api")
def api_data():
    documents = [doc for doc in collection.find()]

    return json_util.dumps({"data": documents})

# Debugger
if __name__ == "__main__":
    app.run(debug=True)