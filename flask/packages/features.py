import pymongo
import json, shutil, os, time
import re

# Allows natural (human) sorting
def nsort(l): 
    convert = lambda text: int(text) if text.isdigit() else text.lower() 
    alphanum_key = lambda key: [ convert(c) for c in re.split('([0-9]+)', key) ] 
    return sorted(l, key = alphanum_key)

#Parses JSON files for feature dictionary, adds it to database
def extract():
    conn = 'mongodb://localhost:27017'
    client = pymongo.MongoClient(conn)

    db = client.forest_db
    collection = db.data
    collection.drop()

    for subdir, dirs, files in os.walk(r"jsons\api_calls"):
        for filename in nsort(files):
            filepath = os.path.join(subdir, filename)
            with open(filepath) as f:
                d = json.load(f)
                print(f"Extracting from {filename}")
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
    
    # Deletes local JSONs now that they are loaded into the database
    path = "jsons"
    try:
        shutil.rmtree(path)
    except shutil.Error as e:
        print(f"Error: {e}")