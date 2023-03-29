from pymongo import MongoClient

client = MongoClient("mongodb+srv://adalordonez:Welcome123!@projectwebsite.o5wvc4k.mongodb.net/test")
database = client.WebsiteDB
hwSets = database.HardwareSetCollection

def initializeHardwareSets():
    initHwSets = [
        {
            'set':1,
            'capacity':100,
            'availability':100
        },
        {
            'set':2,
            'capacity':100,
            'availability':100
        }
    ]
    hwSets.insert_many(initHwSets)

initializeHardwareSets()