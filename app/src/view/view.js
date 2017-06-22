/**
 * Created by fitig on 21/06/2017.
 */
/**
 * @fileOverview  Contains various view functions for the use case listRepos
 */
app.view.mainView = {
    setupInitialView : function() {
        document.getElementById('button-search').addEventListener('click',app.view.mainView.handleButtonSearchClickEvent);
        document.getElementById('input-search-text').addEventListener('keyup',app.view.mainView.handleInputSearchTextEvent);
    },
    handleButtonSearchClickEvent: function () {
        app.view.mainView.callControllerSearchByLogin(document.getElementById('input-search-text').value);
    },
    handleInputSearchTextEvent: function () {
        if(event.keyCode===13){
            app.view.mainView.callControllerSearchByLogin(document.getElementById('input-search-text').value);
        }
    },
    callControllerSearchByLogin: function(login){
        app.controller.searchUserByLogin(
            login,
            app.view.mainView.updateInterfaceAfterSuccessfulUserSearch,
            app.view.mainView.updateInterfaceAfterSuccessfulReposSearch,
            app.view.mainView.updateInterfaceAfterUnsuccessfulSearchAttempt
        );
    },
    updateInterfaceAfterSuccessfulUserSearch: function (login,name,avatar_url,bio) {
        if(name === null){
            document.getElementById('p-name').innerHTML = 'No name set yet.';
        }else{
            document.getElementById('p-name').innerHTML = name;
        }
        if(bio === null){
            document.getElementById('p-bio').innerHTML = 'No BIO set yet';
        }else{
            document.getElementById('p-bio').innerHTML = bio;
        }
        document.getElementById('img-user-pic').src = avatar_url;
        document.getElementById('p-login').innerHTML =login;


        document.getElementById('div-search-result').style= 'display:visible;';
        document.getElementById('div-not-found').style= 'display:none;';
        document.getElementById('div-user-profile').style= 'display:visible;';
        document.getElementById('div-user-repos').style= 'display:visible;';

    },
    updateInterfaceAfterUnsuccessfulSearchAttempt: function () {
        document.getElementById('div-search-result').style= 'display:visible;';
        document.getElementById('div-not-found').style= 'display:visible;';
        document.getElementById('div-user-profile').style= 'display:none;';
        document.getElementById('div-user-repos').style= 'display:none;';
        app.controller.resetData();
    },
    updateInterfaceAfterSuccessfulReposSearch : function (reposArray) {
        console.log(reposArray);
        if(reposArray.length==0){
            document.getElementById('p-repos-not-found').style= 'display:visible;';
            document.getElementById('div-repos-found').style= 'display:none;';
        }else{
            var reposString = '';
            for (var i=0; i<reposArray.length;i++) {
                 reposString+= "<li class='li-repo'>" +
                    "<div class='div-repo container'>" +
                    "<div class='div-repo-name row left'><p class='p-repo-name'>"+reposArray[i].get_name()+"</p></div>" +
                    "<div class='div-repo-fork-stars row right'><p class='p-repo-fork-stars row'>"+reposArray[i].get_stargazers_count()+"</p>" +
                    "<svg class='p-repo-fork-stars row' height='16' version='1.1' viewBox='0 0 14 16' width='14'><path fill-rule='evenodd' d='M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74z'></path></svg>" +
                    "<p class='p-repo-fork-stars row'>"+reposArray[i].get_forks_count()+"</p>" +
                    "<svg class='p-repo-fork-stars row' height='16' version='1.1' viewBox='0 0 10 16' width='10'><path fill-rule='evenodd' d='M8 1a1.993 1.993 0 0 0-1 3.72V6L5 8 3 6V4.72A1.993 1.993 0 0 0 2 1a1.993 1.993 0 0 0-1 3.72V6.5l3 3v1.78A1.993 1.993 0 0 0 5 15a1.993 1.993 0 0 0 1-3.72V9.5l3-3V4.72A1.993 1.993 0 0 0 8 1zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3 10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3-10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z'></path></svg>" +
                    "</div></div></li>";
            }
            document.getElementById('ul-user-repos').innerHTML = reposString;

            document.getElementById('p-repos-not-found').style= 'display:none;';
            document.getElementById('div-repos-found').style= 'display:visible;';


        }
        app.controller.resetData();
    }
};