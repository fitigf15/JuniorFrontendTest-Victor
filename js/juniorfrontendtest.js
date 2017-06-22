/*
functions for testing used in the first commit, you can ignore this file
*/
function userSearch(user)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            // Typical action to be performed when the document is ready:
            if (this.status==200){
                userFound(JSON.parse(xmlHttp.responseText));

            }else {
                userNotFound();
            }
        }
    };
    xmlHttp.open( "GET", "https://api.github.com/users/"+user, true );
    xmlHttp.send();
};

function userFound(response)
{

    var username = response.name;
    if(response.name == null){
        response.name = 'No name set yet.';
    }
    var userbio = response.bio;
    if(response.bio == null){
        response.bio = 'No BIO set yet';
    }
    document.getElementById('div-search-result').innerHTML = "<div id='div-user-profile' class='container'><div id='div-user-pic' class='row left'><img id='img-user-pic' src='"+ response.avatar_url+ "'></img></div><div id='div-user-description' class='row left'><p id='p-login'>@"+response.login+"</p><p id='p-name'>"+response.name+"</p><p id='p-bio>'>"+response.bio+"</p></div></div><div id='div-user-repos'></div></div>";
    repoSearch(response.login);
};

function repoSearch(user)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            // Typical action to be performed when the document is ready:
            if (this.status==200){
                reposFound(JSON.parse(xmlHttp.responseText));
            }else {

            }
        }
    };
    xmlHttp.open( "GET", "https://api.github.com/users/"+user+"/repos", true );
    xmlHttp.send();
};

function reposFound(response){
    var repostext = "";
    for (var i = response.length - 1; i >= 0; i--) {
        repostext += "<li class='li-repo'>" +
            "<div class='div-repo container'>" +
            "<div class='div-repo-name row left'><p class='p-repo-name'>"+response[i].name+"</p></div>" +
            "<div class='div-repo-fork-stars row right'><p class='p-repo-fork-stars row'>"+response[i].stargazers_count+"</p><svg class='p-repo-fork-stars row' height='16' version='1.1' viewBox='0 0 14 16' width='14'><path fill-rule='evenodd' d='M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74z'></path></svg><p class='p-repo-fork-stars row'>"+response[i].forks_count+"</p><svg class='p-repo-fork-stars row' height='16' version='1.1' viewBox='0 0 10 16' width='10'><path fill-rule='evenodd' d='M8 1a1.993 1.993 0 0 0-1 3.72V6L5 8 3 6V4.72A1.993 1.993 0 0 0 2 1a1.993 1.993 0 0 0-1 3.72V6.5l3 3v1.78A1.993 1.993 0 0 0 5 15a1.993 1.993 0 0 0 1-3.72V9.5l3-3V4.72A1.993 1.993 0 0 0 8 1zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3 10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3-10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z'></path></svg>" +
            "</div></div></li>"
    };
    if(repostext == ""){
        document.getElementById('div-user-repos').innerHTML = "<p id='p-repos-not-found'>No repositories found.</p>";
    }else{
        document.getElementById('div-user-repos').innerHTML = "<p id='p-repos-found'>Repositories</p><div id='div-repos-found'><ul id='ul-user-repos'>"+repostext+"</ul></div>";
    };

};

function userNotFound(){
    document.getElementById('div-search-result').innerHTML = "<div id='div-not-found'><p id='p-user-not-found'> Does not exist! </p></div>";
};

function juniorFrontendTest(){
    document.body.onload= function(){
        document.body.innerHTML = "<div id='div-body' class='container'><div id='div-main' class='container'><div id='div-header' class='container'><input type='text' id='input-search-text' class='search-text row left' placeholder='Search username...' autofocus><button type='button' id='button-search' class='button-search row left'>Search</button></div><div id='div-search-result' class='search-result container'></div></div></div></div>";
        document.getElementById('button-search').onclick = function(){
            userSearch(document.getElementById('input-search-text').value);
        };
        document.getElementById('input-search-text').onkeyup = function(keypressed){
            if(keypressed.keyCode==13){
                userSearch(document.getElementById('input-search-text').value);
            }
        };
    };
}

juniorFrontendTest();

/**
 * Created by fitig on 21/06/2017.
 */
