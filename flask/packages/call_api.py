import json, requests, os, shutil, time

# Retrieves full data set from Forest Service, and writes contents to a JSON file.
# Multiple calls necessary to retrieve full data set.
def call():

    count_only = "https://apps.fs.usda.gov/arcx/rest/services/EDW/EDW_RecreationOpportunities_01/MapServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json&returnCountOnly=true"
    url = "https://apps.fs.usda.gov/arcx/rest/services/EDW/EDW_RecreationOpportunities_01/MapServer/0/query?where=1%3D1&outFields=RECAREANAME,LONGITUDE,LATITUDE,RECAREAURL,OPEN_SEASON_START,OPEN_SEASON_END,FORESTNAME,RECAREAID,MARKERACTIVITY,MARKERACTIVITYGROUP,RECAREADESCRIPTION,RECPORTAL_UNIT_KEY,FORESTORGCODE,OBJECTID,FEEDESCRIPTION,OPERATIONAL_HOURS,RESERVATION_INFO,RESTRICTIONS,ACCESSIBILITY,OPENSTATUS&returnGeometry=false&outSR=4326&f=json"

    count = requests.get(count_only).json()
    total_records = count["count"]
    if total_records < 13000:
        return print(f"There was an error with the API. Please try again.")
    print(f"Number of records found: {total_records}")
    
    record_count = 1000
    offset = 0
    x = 0
    path = "jsons/api_calls/"

    if os.path.isdir(path):
        try:
            shutil.rmtree(path)
        except shutil.Error as e:
            print(f"Error: {e}")
    else:
        os.makedirs(path)
        time.sleep(2)

    print(f"Getting records now...")

    while offset < total_records:
        get_records =  requests.get(f"{url}&resultOffset={offset}&resultRecordCount={record_count}").json()

        data = json.dumps(get_records, sort_keys=True, indent=4)
        file_name = path + "json" + str(x)

        with open(file_name, "w") as f:
            f.write(data)  
        
        x +=1
        offset += 1000
        if offset > total_records:
            print(f"Finishing...")
        else:
            print(f"Fetched {offset} records so far...")