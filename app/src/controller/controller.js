/**
 * Created by fitig on 21/06/2017.
 */
/**
 * @fileOverview  Defining the main namespace ("app") and its MVC subnamespaces
 */
'use strict';
// main namespace app
var app = { model:{}, view:{}, controller:{} };


app.controller = {
    currentUser : {},
    currentRepos : [],
    searchUserByLogin: function (user_login, userCallback, repoCallback, userNotFoundCallback) {
        var xmlHttp = new XMLHttpRequest();

        xmlHttp.onreadystatechange = function() {
            if (this.readyState === 4) {
                // Typical action to be performed when the document is ready:
                if (this.status===200){
                    var parsedResponse = JSON.parse(this.responseText);
                    var user_slots = new User({
                        login: parsedResponse.login,
                        name: parsedResponse.name,
                        avatar_url: parsedResponse.avatar_url,
                        bio: parsedResponse.bio
                    });
                    //User.add(user_slots);
                    app.controller.currentUser = new User(user_slots);
                    // We search for the user repos, even if he doesn't have, in that case we will get an empty repo array from GitHub

                    app.controller.searchRepoByUserLogin(repoCallback, userNotFoundCallback);

                    //userCallback(User.instances);
                    userCallback(app.controller.currentUser.get_login(),app.controller.currentUser.get_name(),app.controller.currentUser.get_avatar_url(),app.controller.currentUser.get_bio());

                }else if(this.status ===404) {
                    // user doesn't exist
                    userNotFoundCallback();
                    app.controller.resetData();
                }
            }
        };
        xmlHttp.timeout = 750;
        xmlHttp.ontimeout = function () {
            userNotFoundCallback();
        }
        xmlHttp.open( "GET", "https://api.github.com/users/"+user_login );
        xmlHttp.send();


    },
    searchRepoByUserLogin: function (repoCallback, userNotFoundCallback) {

        var xmlHttp2 = new XMLHttpRequest();
        xmlHttp2.onreadystatechange = function() {
            if (this.readyState === 4) {
                // Typical action to be performed when the document is ready:
                if (this.status===200){
                    var parsedResponse = JSON.parse(this.responseText);
                    var i;
                    for (i = parsedResponse.length - 1; i >= 0; i--) {
                        var slots = {
                            name: parsedResponse[i].name,
                            stargazers_count: parsedResponse[i].stargazers_count,
                            forks_count: parsedResponse[i].forks_count
                        };
                        //user_slots.repos[slots.name] =  new Repo(slots);
                        app.controller.currentRepos.push (new Repo(slots));
                    }

                    repoCallback(app.controller.currentRepos);



                }else if(this.status ===404) {
                    // user doesn't exist
                    userNotFoundCallback();
                    app.controller.resetData();
                }

            }
        };
        xmlHttp2.timeout = 750;
        xmlHttp2.ontimeout = function () {
            userNotFoundCallback();
        }
        xmlHttp2.open( 'GET', 'https://api.github.com/users/'+app.controller.currentUser.get_login()+'/repos' );
        xmlHttp2.send();
    },
    resetData: function () {
        app.controller.currentUser = {};
        app.controller.currentRepos = [];
    }
};

