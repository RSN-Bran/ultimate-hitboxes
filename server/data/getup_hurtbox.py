from os import listdir
from os.path import isfile, join
import json

def read(file):
    with open(file) as f:
        data=json.load(f)

    for move in data["moves"]:
        if (move["name"] == "Ledge Attack" or move["name"] == "Getup Attack (Up)" or move["name"] == "Getup Attack (Down)") and "hurtboxes" not in move:
            finalFrame = move["hitboxes"][-1]["frames"][-1]
            hurtboxJson = '[{"type": "Intangible","bone": "all","hp": "","frames":[],"color": "darkblue","notes": ""}]'
            i=1
            frames = []
            hurtbox = json.loads(hurtboxJson)
            while(i<=finalFrame):
                hurtbox[0]["frames"].append(i)
                frames.append(i)
                i+=1

            move["hurtboxes"] = hurtbox
            print(move)
        elif move["name"] == "Trip Attack" and "hurtboxes" not in move:
            hurtboxJson = '[{"type": "Intangible","bone": "all","hp": "","frames": [1,2,3,4,5,6,7],"color": "darkblue","notes": ""}]'
            hurtbox = json.loads(hurtboxJson)
            move["hurtboxes"] = hurtbox
            print(move)
        elif (move["name"] == "Forward Throw" or move["name"] == "Back Throw" or move["name"] == "Up Throw" or move["name"] == "Down Throw") and "hurtboxes" not in move:
            finalFrame = move["throws"][0]["frames"][-1]
            hurtboxJson = '[{"type": "Invincible","bone": "all","hp": "","frames":[],"color": "lightgreen","notes": ""}]'
            i=1
            frames = []
            hurtbox = json.loads(hurtboxJson)
            while(i<=finalFrame):
                hurtbox[0]["frames"].append(i)
                frames.append(i)
                i+=1

            move["hurtboxes"] = hurtbox
            print(move)
    print(data)
    with open(file, "w") as f:
        json.dump(data, f, indent=4)

def main():

    allFiles = [f for f in listdir(".") if isfile(join(".", f))]
    print(allFiles)
    for file in allFiles:
        if "_" in file and ".json" in file and "olimar" not in file:
            print(file)
            read(file)


main()