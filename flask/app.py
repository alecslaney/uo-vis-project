from flask import Flask, jsonify
import json, requests

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

def featureExtract():
    i = 0
    file_name = "jsons/api_calls/json0"
    big_json = {}
    while i < 14:
        with open(file_name) as f:
            d = json.load(f)
            print(f"Accessing {file_name}")
            features = d["features"]
            for x in range(len(features)):
                attribute = features[x]["attributes"]
                to_add = {attribute["OBJECTID"]: attribute}
                big_json.update(to_add)
                x +=1
        i +=1
        file_name = "jsons/api_calls/json" + str(i)
    
    to_json = json.dumps(big_json, indent=4, sort_keys=True)
    with open("jsons/features.json", "w") as f:
        f.write(to_json)

api_call()
featureExtract()
print(f"Complete.")

# # Creation of flask app
# app = Flask(__name__)

# @app.route("/")
# def index():
#     return (
#         f"Index of Data API<br/>"
#         f"<a href=/api/data>Click here to see the json<br/>"
#     )

# @app.route("/api/data")
# def apiData():
#     return to_json

# # Debugger
# if __name__ == "__main__":
#     app.run(debug=True)