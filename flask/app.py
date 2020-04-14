from flask import Flask, jsonify
import pandas as pd
import json

df = pd.read_csv("../data_clean.csv")
df.to_json("../data.json", orient="index")

with open("../data.json") as f:
  data = json.load(f)

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