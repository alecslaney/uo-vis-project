from bson.objectid import ObjectId

# Helps with serializing MongoDB's ObjectID to JSON.
def encode(o):
    if type(o) == ObjectId:
        return str(o)
    return o.__str__