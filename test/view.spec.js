/**
 * Created by fitig on 22/06/2017.
 */

describe('View test', function () {

    beforeEach(function () {
        app.controller.currentUser = {};
        app.controller.currentRepos = {};
    });

    afterEach(function(){
        app.controller.resetData();
    });



});