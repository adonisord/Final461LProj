import os
from flask import Flask, request, session
import auth, projectFuncts

app = Flask(__name__, static_folder='../build', static_url_path='/')
app.secret_key = "8ASD98345JHKLJHLKB^@HNB"

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')

@app.route('/auth', methods=['POST'])
def authenticate_user():
    response = ''
    authSource = request.form['auth_source']
    if authSource == 'sign_in':
        username = request.form['username']
        password = request.form['password']
        print(username, password)
        response = auth.signIn(username, password)
    elif authSource == 'sign_up':
        firstName = request.form['first_name']
        lastName = request.form['last_name']
        username = request.form['username']
        password = request.form['password']
        response = auth.signUp(firstName, lastName, username, password)
    session['username'] = username
    return response

@app.route('/join-project', methods=['POST'])
def joinProj():
    response = ''
    if 'username' in session:
        username = session['username']
        if request.form['join_source'] == 'button':
            projectID = request.form['project_id']
            projectFuncts.joinProject(username, projectID)
            return {'status': 'success',}
        elif request.form['join_source'] == 'page':
            projectID = request.form['project_id']
            response = projectFuncts.joinProjectByID(username, projectID)
            return response
    else:
        return {'status': 'error', 'msg': 'Please log in or sign up.',}

@app.route('/create-project', methods=['POST'])
def createProj():
    response = ''
    if 'username' in session:
        username = session['username']
        projectName = request.form['project_name']
        projectDescription = request.form['project_description']
        response = projectFuncts.createProject(username, projectName, projectDescription)
        return response
    else:
        return {'status': 'error', 'msg': 'Please log in or sign up.',}    

@app.route('/leave-project', methods=['POST'])
def leaveProj():
    if 'username' in session:
        username = session['username']
        projectID = request.form['project_id']
        projectFuncts.leaveProject(username, projectID)
        return {'status': 'success',}
    else:
        return {'status': 'error', 'msg': 'Please log in or sign up.',}

@app.route('/view-my-projects')
def getUserProjs():
    if 'username' in session:
        username = session['username']
        projects = projectFuncts.getUserProjects(username)
        return projects
    else:
        return {'status': 'error', 'msg': 'Please log in or sign up.',}

@app.route('/view-all-projects')
def getAllProjs():
    if 'username' in session:
        username = session['username']
        projects = projectFuncts.getAllProjects(username)
        return projects
    else:
        return {'status': 'error', 'msg': 'Please log in or sign up.',}

@app.route('/check-in-hardware', methods=['POST'])
def checkInHw():
    projID = request.form['project_id']
    set = request.form['set']
    qty = request.form['qty']
    response = projectFuncts.checkInHardware(projID, set, qty)
    return response

@app.route('/check-out-hardware', methods=['POST'])
def checkOutHw():
    projID = request.form['project_id']
    set = request.form['set']
    qty = request.form['qty']
    response = projectFuncts.checkOutHardware(projID, set, qty)
    return response

@app.route('/get-all-availability')
def getAllAvail():
        response = projectFuncts.getAllAvailability()
        return response

#DEVELOPMENT USE FUNCTION ONLY
@app.route("/user")
def user():
    print(session)
    if 'username' in session:
        username = session['username']
        return f"<h1>User {username}'s session is in progress.</h1"
    else:
        return {'status': 'error', 'msg': 'Please log in or sign up.',}

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=False, port=os.environ.get('PORT', 80))