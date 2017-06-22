/**
 * Created by fitig on 23/06/2017.
 */
describe("SearchUserLogin test", function () {
    beforeEach(function (done) {
        app.controller.searchUserByLogin("gerardcobas",console.log,console.log,console.log);
        setTimeout(done,1500);
    });
    afterEach(function(){
        app.controller.resetData();
    });
    it("Has working searchUserByLogin method", function (done) {
        console.log(app.controller.currentUser.get_login());
        expect(app.controller.currentUser.get_login()).toEqual("gerardcobas");
        expect(app.controller.currentUser.get_avatar_url()).toEqual("https://avatars2.githubusercontent.com/u/1464953?v=3");
        expect(app.controller.currentUser.get_bio()).toBeNull();
        expect(app.controller.currentUser.get_name()).toEqual("Gerard-Cobas");
        expect(app.controller.currentRepos[0].get_name()).toEqual("try_git");
        expect(app.controller.currentRepos[0].get_stargazers_count()).toEqual(1);
        expect(app.controller.currentRepos[0].get_forks_count()).toEqual(0);
        done();
    });
});