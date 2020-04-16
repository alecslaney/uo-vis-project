from flask import Flask, jsonify
import pandas as pd
import json
import requests

url = "https://apps.fs.usda.gov/arcx/rest/services/EDW/EDW_RecreationOpportunities_01/MapServer/0/query?where=1%3D1&outFields=RECAREANAME,LONGITUDE,LATITUDE,RECAREAURL,OPEN_SEASON_START,OPEN_SEASON_END,FORESTNAME,RECAREAID,MARKERACTIVITY,MARKERACTIVITYGROUP,RECAREADESCRIPTION,RECPORTAL_UNIT_KEY,FORESTORGCODE,OBJECTID,FEEDESCRIPTION,OPERATIONAL_HOURS,RESERVATION_INFO,RESTRICTIONS,ACCESSIBILITY,OPENSTATUS&returnGeometry=false&outSR=4326&f=json"
response = requests.get(url).json()

# df = pd.read_csv("../data_clean.csv")
# df.to_json("../data.json", orient="index")

# with open("../data.json") as f:
#   data = json.load(f)

# Creation of flask app
app = Flask(__name__)

@app.route("/")
def index():
    return (
        f"Index of Data API<br/>"
        f"<a href=/api/data>Click here to see the json<br/>"
    )

@app.route("/api/data")
def apiData():
    return json.dumps(response, indent=1)
    # return jsonify(data)

# Debugger
if __name__ == "__main__":
    app.run(debug=True)