/**
 * Created by fitig on 21/06/2017.
 */
/**
 * @fileOverview  The model class Repo with attribute definitions and storage management methods
 */
/**
 * Constructor function for the class Repo
 * @constructor
 * @param {{name: string, stargazers_count: number, forks_count: number}} slots - Object creation slots.
 */

function Repo(slots){
    this.name = slots.name;
    this.stargazers_count = slots.stargazers_count;
    this.forks_count = slots.forks_count;
}

/***********************************************
 ***  Class-level ("static") properties  *******
 ***********************************************/
Repo.instances = {};  // initially an empty collection (a map)

/*********************************************************
 ***  Class-level ("static") storage management methods **
 *********************************************************/
// Convert repo to object
Repo.convertToObject = function (repo_slots) {
    return new Repo( repo_slots);
};
// Load the repo table from Local Storage
Repo.retrieveAll = function () {
    var key="", keys=[], reposString="", repos={}, i=0;
    try {
        if (localStorage.getItem("repos")) {
            reposString = localStorage.getItem("repos");
        }
    } catch (e) {
        alert("Error when reading from Local Storage\n" + e);
    }
    if (reposString) {
        repos = JSON.parse( reposString);
        keys = Object.keys( repos);
        console.log( keys.length +" repos loaded.");
        for (i=0; i < keys.length; i++) {
            key = keys[i];
            Repo.instances[key] = Repo.convertToObject( repos[key]);
        }
    }
};
//  Save all repo objects to Local Storage
Repo.saveAll = function () {
    var reposString="", error=false,
        reposLen = Object.keys( Repo.instances).length;
    try {
        reposString = JSON.stringify( Repo.instances);
        localStorage.setItem("repos", reposString);
    } catch (e) {
        alert("Error when writing to Local Storage\n" + e);
        error = true;
    }
    if (!error) console.log( reposLen + " repos saved.");
};
//  Create a new repo
Repo.add = function (slots) {
    // add repo to the Repo.instances collection
    Repo.instances[slots.name] = new Repo( slots);
    console.log("Repo " + slots.name + " created!");
};
//  Update an existing repo
Repo.update = function (slots) {
    var repo = Repo.instances[slots.name];
    if (repo.forks_count !== parseInt(slots.forks_count)) repo.forks_count = parseInt(slots.forks_count);
    if (repo.stargazers_count !== parseInt( slots.stargazers_count)) repo.stargazers_count = parseInt( slots.stargazers_count);
    console.log("Repo " + slots.name + " modified!");
};
//  Delete a repo from persistent storage
Repo.destroy = function (name) {
    if (Repo.instances[name]) {
        console.log("Repo " + name + " deleted");
        delete Repo.instances[name];
    } else {
        console.log("There is no Repo with name " + name + " in the database!");
    }
};
//  Clear data
Repo.clearInstanceData = function () {
    if (confirm("Do you really want to delete all repos data?")) {
        Repo.instances = {};
        localStorage.setItem("repos", "{}");
    }
};


/*******************************************
 *** Set and get methods             **********
 ********************************************/

Repo.prototype.get_name = function () {
    return this.name;
}

Repo.prototype.get_stargazers_count = function () {
    return this.stargazers_count;
}

Repo.prototype.get_forks_count = function () {
    return this.forks_count;
}


Repo.prototype.set_name = function (name) {
    this.name = name;
}

Repo.prototype.set_stargazers_count = function (stargazers_count) {
    this.stargazers_count = stargazers_count;
}

Repo.prototype.set_forks_count = function (forks_count) {
    this.forks_count = forks_count;
}

Repo.prototype.reset = function () {
    this.name=null;
    this.stargazers_count=0;
    this.forks_count=0;
}

Repo.prototype.toJSON = function () {
    return this._data;
}

Repo.prototype.toArray = function () {
    return [this.name,this.stargazers_count,this.forks_count];
}