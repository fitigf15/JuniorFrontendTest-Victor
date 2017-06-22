/**
 * Created by fitig on 21/06/2017.
 */
/**
 * @fileOverview  The model class User with attribute definitions and storage management methods
 */
/**
 * Constructor function for the class User
 * @constructor
 * @param {{name: string, avatar_url: string, login: string, bio: string}} slots - Object creation slots.
 */

function User(slots){
    this.login = slots.login;
    this.name = slots.name;
    this.avatar_url = slots.avatar_url;
    this.bio = slots.bio;
}

/***********************************************
 ***  Class-level ("static") properties  *******
 ***********************************************/
User.instances = {};  // initially an empty collection (a map)

/*********************************************************
 ***  Class-level ("static") management methods **
 *********************************************************/
// Convert user to object
User.convertToObject = function (user_slots) {
    return new User( user_slots);
};
// Load the user table from Local Storage
User.retrieveAll = function () {
    var key="", keys=[], usersString="", users={}, i=0;
    try {
        if (localStorage.getItem("users")) {
            usersString = localStorage.getItem("users");
        }
    } catch (e) {
        alert("Error when reading from Local Storage\n" + e);
    }
    if (usersString) {
        users = JSON.parse( usersString);
        keys = Object.keys( users);
        console.log( keys.length +" users loaded.");
        for (i=0; i < keys.length; i++) {
            key = keys[i];
            User.instances[key] = User.convertToObject( users[key]);
        }
    }
};
//  Save all user objects to Local Storage
User.saveAll = function () {
    var usersString="", error=false,
        usersLen = Object.keys( user.instances).length;
    try {
        usersString = JSON.stringify( user.instances);
        localStorage.setItem("users", usersString);
    } catch (e) {
        alert("Error when writing to Local Storage\n" + e);
        error = true;
    }
    if (!error) console.log( usersLen + " users saved.");
};
//  Create a new user
User.add = function (slots) {
    // add user to the user.instances collection
    User.instances[slots.login] = new User( slots);
    console.log("user " + slots.login + " created!");
};
//  Update an existing user
User.update = function (slots) {
    if(User.instances !== {}){
        if (User.instances.avatar_url !== slots.avatar_url) User.instances.avatar_url = slots.avatar_url;
        if (User.instances.name !== slots.name) User.instances.name = slots.name;
        if (User.instances.bio !== slots.bio) User.instances.bio = slots.bio;
    }else{
        console.log("Could not update user because there is none in the database!");
    }


    console.log("user " + slots.login + " modified!");
};
//  Delete a user from persistent storage
User.destroy = function (login) {
    if (user.instances[login]) {
        console.log("user " + login + " deleted");
        delete User.instances[login];
    } else {
        console.log("There is no user with login " + login + " in the database!");
    }
};

//  Clear data
User.clearInstanceData = function () {
    if (confirm("Do you really want to delete all users data?")) {
        User.instances = {};
        localStorage.setItem("users", "{}");
    }
};
/*******************************************
*** Set and get methods             **********
 ********************************************/

User.prototype.get_login = function () {
    return this.login;
}

User.prototype.get_name = function () {
    return this.name;
}

User.prototype.get_bio = function () {
    return this.bio;
}

User.prototype.get_avatar_url = function () {
    return this.avatar_url;
}

User.prototype.set_login = function (login) {
    this.login = login;
}

User.prototype.set_name = function (name) {
    this.name = name;
}

User.prototype.set_bio = function (bio) {
    this.bio = bio;
}

User.prototype.set_avatar_url = function (avatar_url) {
    this.avatar_url = avatar_url;
}

User.prototype.reset = function () {
    this.login=null;
    this.name=null;
    this.bio=null;
    this.avatar_url=null;
}


User.prototype.toJSON = function () {

    return this._data;
}






