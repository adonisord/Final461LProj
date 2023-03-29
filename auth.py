from pymongo import MongoClient

client = MongoClient("mongodb+srv://adalordonez:Welcome123!@projectwebsite.o5wvc4k.mongodb.net/test")
database = client.WebsiteDB
users = database.UserCollection

def encrypt(original_string, N, D):
    result = ""

    #we are going to loop through each char in the string
    #for every character in inputText
    #[::-1] means start at the end of the string + move back by 1 [hence the -1]

    for character in original_string[::-1]:

        # since space and ! are not encrypted
        if character == ' ' or character == '!':
            result = character + result

        else:

            #ord will return the ascii value of the char
            val = ord(character) + (N * D)

            # if the value is lower than 34, then we subtract the diff from 126
            if val < 34:
                val = 126 - (34 - val)

            #so if the value is higher than 126, then we add the diff to 34
            if val> 126:
                val = 34 + (val- 126)

            #chr is the letter associated with the ascii value
            #add this to the result
            result = chr(val) + result

    return result

def decrypt(encrypted_string, N, D):
    result = ""

    # we are going to loop through each char in the string
    # for every character in inputText
    # [::-1] means start at the end of the string + move back by 1 [hence the -1]
    for character in encrypted_string[::-1]:
        # characters space and ! are not encrypted
        if character == ' ' or character == '!':
            result = character + result
        else:
            val = ord(character) - N * D
            if val> 126:
                val = 34 + (val - 126)
            if val < 34:
                val = 126 - (34 - val)
            result = chr(val) + result

    return result

def signIn(username, password):
    user = users.find_one({'username':username})
    if user is not None:
        correctPassword = decrypt(user['password'], 4, -1)
        if password == correctPassword:
            return {'message':'success',}
        else:
            return {'message':'The entered password was incorrect. Please enter the correct password.',}
    else:
        return {'message':'This user does not exist. Please enter a valid username or create an account.',}

def signUp(firstName, lastName, username, password):
    user = users.find_one({'username':username})
    if user is None:
        newUser = {"username": username,
                "first_name": firstName,
                "last_name": lastName,
                "password": encrypt(password, 4, -1),
                "projects": []
                }
        users.insert_one(newUser)
        return {'message':'success',}
    else:
        return {'message':'Username already in use.',}