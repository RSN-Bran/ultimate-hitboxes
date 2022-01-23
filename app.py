from flask import Flask, redirect, url_for, request
import json
import boto3
import os

app = Flask(__name__)

client = boto3.client('s3', aws_access_key_id="AKIAJFQAJOJ4BRH4H3EQ", aws_secret_access_key="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")

print(os.environ)

def getCharacterFile(character):
    
    try:
        dataFile=open('./data/'+character+'.json')
        data = json.load(dataFile)
        return data
    except FileNotFoundError:
        return {"Error": "Invalid Character"}

@app.route('/')
def index():
    return {"name": "hello"}

@app.route('/characterData', methods=["GET"])
def characterData():
    dataFile = open('./data/characterData.json')
    data = json.load(dataFile)
    return data

@app.route('/data/<string:character>', methods=["GET"])
def getCharacter(character):
    return getCharacterFile(character)

@app.route('/data/<string:character>/<string:move>', methods=["GET"])
def getMove(character, move):
    
    data = getCharacterFile(character)

    myMove = None
    for dataMove in data["moves"]:
        if dataMove["value"] == move:
            myMove = dataMove
            break

    return myMove

@app.route('/images/<string:character>/<string:move>', methods=["GET"])
def getImages(character, move):

    data = getCharacterFile(character)

    myMove = None
    for dataMove in data["moves"]:
        if dataMove["value"] == move:
            myMove = dataMove
            break

    if myMove == None:
        return {"Error": "Invalid Move"}

    if "frame" in request.args:
        resp = client.generate_presigned_url('get_object', Params={'Bucket': 'ultimate-hitboxes', 'Key': "frames/"+character+"/"+move+"/"+request.args["frame"]+".png"})
        return resp
    print(request.args)

    start = 1
    end = int(myMove["faf"])

    if "startFrame" in request.args:
        start = int(request.args["startFrame"])
    if "endFrame" in request.args:
        end = int(request.args["endFrame"])
    arr = []
    for i in range(max(1,start), min(int(myMove["faf"])+1, end+1)):
        arr.append(client.generate_presigned_url('get_object', Params={'Bucket': 'ultimate-hitboxes', 'Key': "frames/"+character+"/"+move+"/"+str(i)+".png"}))
    urls = {"urls": arr, "imgCount": len(arr)}
    return urls
    
    


if __name__ == "__main__":
    app.run(debug=True)