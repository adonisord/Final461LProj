from pymongo import MongoClient
import configparser
import csv

client = MongoClient("mongodb+srv://adalordonez:Welcome123!@projectwebsite.o5wvc4k.mongodb.net/test")
database = client.WebsiteDB
hwSets = database.HardwareSetCollection

def initializeHardwareSets():

    initHwSets = []
    with open('hwsets.csv', newline='') as csvfile:
        reader = csv.DictReader(csvfile)
        i = 0
        for row in reader:
            initHwSets[i] = {row['set'], row['capacity'], row['availability']}
            print(initHwSets[i])
            i += 0
    hwSets.insert_many(initHwSets)

initializeHardwareSets()
