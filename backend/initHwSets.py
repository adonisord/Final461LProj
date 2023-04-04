from pymongo import MongoClient
import csv

client = MongoClient("mongodb+srv://adalordonez:Welcome123!@projectwebsite.o5wvc4k.mongodb.net/test")
database = client.WebsiteDB
hwSets = database.HardwareSetCollection

def initializeHardwareSets():

    initHwSets = []
    with open('backend/hwSets.csv', newline='') as csvfile:
        reader = csv.DictReader(csvfile)
        i = 0
        for row in reader:
            initHwSets.append(row)
            i += 1
    print(initHwSets)
    hwSets.insert_many(initHwSets)

initializeHardwareSets()