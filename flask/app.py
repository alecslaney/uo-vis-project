from flask import Flask, jsonify, render_template
from flask_cors import CORS
import json, requests
import pymongo
from flask_pymongo import PyMongo
from bson import json_util
from bson.objectid import ObjectId

def newEncoder(o):
    if type(o) == ObjectId:
        return str(o)
    return o.__str__

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
    conn = 'mongodb://localhost:27017'
    client = pymongo.MongoClient(conn)

    db = client.forest_db
    collection = db.data
    collection.drop()

    i = 0
    file_name = "jsons/api_calls/json0"
    while i < 14:
        with open(file_name) as f:
            d = json.load(f)
            print(f"Accessing {file_name}")
            features = d["features"]
            for x in range(len(features)):
                attribute = {}
                attribute["long"] = float(features[x]["attributes"]["LONGITUDE"])
                attribute["lat"] = float(features[x]["attributes"]["LATITUDE"])
                attribute["accessibility"] = features[x]["attributes"]["ACCESSIBILITY"]
                attribute["fees"] = features[x]["attributes"]["FEEDESCRIPTION"]
                attribute["forest"] = features[x]["attributes"]["FORESTNAME"]
                attribute["activity"] = features[x]["attributes"]["MARKERACTIVITY"]
                attribute["activity_group"] = features[x]["attributes"]["MARKERACTIVITYGROUP"]
                attribute["status"] = features[x]["attributes"]["OPENSTATUS"]
                attribute["hours"] = features[x]["attributes"]["OPERATIONAL_HOURS"]
                attribute["descr"] = features[x]["attributes"]["RECAREADESCRIPTION"]
                attribute["area_name"] = features[x]["attributes"]["RECAREANAME"]
                attribute["url"] = features[x]["attributes"]["RECAREAURL"]
                attribute["res_info"] = features[x]["attributes"]["RESERVATION_INFO"]
                attribute["restr"] = features[x]["attributes"]["RESTRICTIONS"]
                attribute["season_start"] = features[x]["attributes"]["OPEN_SEASON_START"]
                attribute["season_end"] = features[x]["attributes"]["OPEN_SEASON_END"]
                attribute["id"] = int(features[x]["attributes"]["OBJECTID"])
                attribute["area_id"] = int(features[x]["attributes"]["RECAREAID"])
                attribute["forest_id"] = int(features[x]["attributes"]["FORESTORGCODE"])
                attribute["portal_id"] = int(features[x]["attributes"]["RECPORTAL_UNIT_KEY"])
                collection.insert_one(attribute)
                x +=1
        i +=1
        file_name = "jsons/api_calls/json" + str(i)

# Creation of flask app
app = Flask(__name__)
CORS(app)

# Setting up MongoDB
conn = 'mongodb://localhost:27017/forest_db'
client = PyMongo(app, uri=conn)

@app.route("/")
def index():
    return (
        f"Hello! Go to /api to view the data."
    )

@app.route("/api")
def api_data():
    featureExtract()
    
    documents = [doc for doc in client.db.data.find()]

    documents = [{**document, '_id': newEncoder(document['_id'])} for document in documents]

    return jsonify(documents)

# Debugger
if __name__ == "__main__":
    app.run(debug=True)