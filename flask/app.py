from flask import Flask, jsonify
import csv, json

csv_file_path = "../sql_exploration/Recreation_Opportunities_Feature_Layer.csv"
json_file_path = "data.json"

data = {}
with open(csv_file_path, encoding="utf8") as csvFile:
    csvReader = csv.DictReader(csvFile)
    for csvRow in csvReader:
        objectID = csvRow["OBJECTID"]
        data[objectID] = csvRow

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
    return jsonify(data)

# Debugger
if __name__ == "__main__":
    app.run(debug=True)