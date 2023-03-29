import json
from bson import ObjectId
from pymongo import MongoClient
import jsonEncoder

client = MongoClient("mongodb+srv://adalordonez:Welcome123!@projectwebsite.o5wvc4k.mongodb.net/test")
database = client.WebsiteDB

users = database.UserCollection
projects = database.ProjectCollection
hardwareSets = database.HardwareSetCollection

def updateHwSet(set, newQty):
    print(newQty)
    hwSetAvailability = hardwareSets.find_one({'set':int(set)})['availability']
    print('original availability: ', hwSetAvailability)
    hardwareSets.update_one({'set':set}, {'$set':{'availability':newQty}})
    hwSetAvailability = hardwareSets.find_one({'set':int(set)})['availability']
    print('new availability: ', hwSetAvailability)

def hwSetInProjHardware(set, projHardware):
    for hw in projHardware:
        projHardwareSet = hw['set']
        if projHardwareSet == set:
            return True
    return False

def projInUserProjs(projectID, userProjs):
    for project in userProjs:
        userProjID = str(project['_id'])
        if userProjID == projectID:
            return True
    return False

def getAllProjects(username):
    allProjectsCursor = projects.find({})
    allProjects = []
    for project in allProjectsCursor:
        allProjects.append(project)
    JSONProjects = json.loads(jsonEncoder.MongoJSONEncoder().encode(allProjects))
    JSONProjects.append({'username':username},)
    return JSONProjects

def getUserProjects(username):
    user = users.find_one({'username':username})
    if user is not None:
        userProjectList = users.find_one({'username':username})['projects']
        JSONUserProjects = json.loads(jsonEncoder.MongoJSONEncoder().encode(userProjectList))
        userProjects = []
        for project in JSONUserProjects:
            actualProject = projects.find_one({'_id':ObjectId(project['_id'])})
            userProjects.append(json.loads(jsonEncoder.MongoJSONEncoder().encode(actualProject)))
        return userProjects

def createProject(username, projectName, projectDescription):
    newProject = {"name": projectName,
            "description": projectDescription,
            "authorized_users":[username],
            "hardware":[],
            }
    projectID = projects.insert_one(newProject).inserted_id

    joinProject(username, projectID)
    return {'message': 'success',}

def leaveProject(username, projectID):
    userProjects = users.find_one({'username':username})['projects']
    project = projects.find_one({'_id':ObjectId(projectID)})
    authUsers = project['authorized_users']
    projectNameAndID = {}
    projectNameAndID.update({'name':project['name']})
    projectNameAndID.update({'_id':project['_id']})
    if projInUserProjs(projectID, userProjects) and project is not None:
        userProjects.remove(projectNameAndID)
        users.update_one({'username':username}, {'$set':{'projects':userProjects}})
    if username in authUsers and username is not None:
        authUsers.remove(username)
        projects.update_one({'_id':ObjectId(projectID)}, {'$set':{'authorized_users':authUsers}})

def joinProject(username, projectID):
    userProjects = users.find_one({'username':username})['projects']
    project = projects.find_one({'_id':ObjectId(projectID)})
    authUsers = project['authorized_users']
    projectNameAndID = {}
    projectNameAndID.update({'name':project['name']})
    projectNameAndID.update({'_id':project['_id']})
    if username not in authUsers and username is not None:
        authUsers.append(username)
        projects.update_one({'_id':ObjectId(projectID)}, {'$set':{'authorized_users':authUsers}})
    if not projInUserProjs(projectID, userProjects) and project is not None:
        userProjects.append(projectNameAndID)
        users.update_one({'username':username}, {'$set':{'projects':userProjects}})

def joinProjectByID(username, projectID):
    if ObjectId.is_valid(projectID):
        userProjects = users.find_one({'username':username})['projects']
        project = projects.find_one({'_id':ObjectId(projectID)})
        authUsers = project['authorized_users']
        projectNameAndID = {}
        projectNameAndID.update({'name':project['name']})
        projectNameAndID.update({'_id':project['_id']})
        if project is not None:
            if username not in authUsers and username is not None:
                authUsers.append(username)
                projects.update_one({'_id':ObjectId(projectID)}, {'$set':{'authorized_users':authUsers}})
            if not projInUserProjs(projectID, userProjects):
                userProjects.append(projectNameAndID)
                users.update_one({'username':username}, {'$set':{'projects':userProjects}})
            return {'message':'success',}
        else:
            return {'message':'Project does not exist. Please enter a valid ID.',}
    else:
        return {'message':'Project ID is invalid.',}
    
def checkOutHardware(projectID, set, qty):
    project = projects.find_one({'_id':ObjectId(projectID)})
    if project is not None:
        projectHardware = project['hardware']
    hwSet = hardwareSets.find_one({'set':int(set)})
    if hwSet is not None:
        hwSetAvailability = hwSet['availability']
        hwSetCapacity = hwSet['capacity']
    
    if int(qty) <= int(hwSetAvailability):
        if hwSetInProjHardware(set, projectHardware):
            for hw in projectHardware:
                if hw['set'] == set:
                    newQty = int(hw['qty']) + int(qty)
                    hw['qty'] = newQty
        else:
            addedHwSet = {'set':set,'qty':int(qty),}
            projectHardware.append(addedHwSet)
            newQty = qty
        newHwSetAvailability = int(hwSetAvailability) - int(qty)
        hardwareSets.update_one({'set':int(set)}, {'$set':{'availability':int(newHwSetAvailability)}})
        projects.update_one({'_id':ObjectId(projectID)}, {'$set':{'hardware':projectHardware}})
        return {
            'message':'success',
            'newQty':newQty,
            }
    else:
        return {
            'message':'You cannot check out ' + str(qty) + ' units from set ' + str(set) + '. There are only ' + str(hwSetAvailability) + ' units available.' ,
            }

def checkInHardware(projectID, set, qty):
    project = projects.find_one({'_id':ObjectId(projectID)})
    if project is not None:
        projectHardware = project['hardware']
    hwSet = hardwareSets.find_one({'set':int(set)})
    if hwSet is not None:
        hwSetAvailability = hwSet['availability']
    
    if hwSetInProjHardware(set, projectHardware):
        response = {}
        for hw in projectHardware:
            if hw['set'] == set:
                if hw['qty'] == 0:
                    response = {'message': 'This project does not have any hardware checked out from hardware set ' + str(set) + '.',}
                else:
                    newQty = int(hw['qty']) - int(qty)
                    if newQty >= 0:
                        response = {
                            'message': 'success',
                            'newQty':newQty,
                            }
                        hw['qty'] = newQty
                        newHwSetAvailability = int(hwSetAvailability) + int(qty)
                        hardwareSets.update_one({'set':int(set)}, {'$set':{'availability':int(newHwSetAvailability)}})
                        projects.update_one({'_id':ObjectId(projectID)}, {'$set':{'hardware':projectHardware}})
                    else:
                        response = {'message': 'You cannot check in ' + str(qty) + ' units. There are only ' + str(hw['qty']) + ' checked out.',}
        return response
    else:
        return{'message': 'This project does not have any hardware checked out from hardware set ' + str(set) + '.',}
    
def getAllAvailability():
    allAvailabilityCursor = hardwareSets.find({})
    allAvailability = []
    for avail in allAvailabilityCursor:
        allAvailability.append(avail)
    JSONAllAvailability = json.loads(jsonEncoder.MongoJSONEncoder().encode(allAvailability))
    return JSONAllAvailability