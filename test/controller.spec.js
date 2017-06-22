/**
 * Created by fitig on 22/06/2017.
 */

describe('Controller test', function () {

    beforeEach(function () {
        app.controller.resetData();
    });

    afterEach(function(){
        app.controller.resetData();
    });

    it("Has initialized attributes", function () {
        expect(Object.keys(app.controller.currentUser).length).toEqual(0);
        expect(app.controller.currentRepos.length).toEqual(0);
    });

    it("Has working reset method", function () {
        app.controller.resetData();
        expect(Object.keys(app.controller.currentUser).length).toEqual(0);
        expect(app.controller.currentRepos.length).toEqual(0);
    });

    it("Has class integration", function () {
        app.controller.currentUser = new User({
            login:"test-user-login",
            name: "test-user-name",
            bio: "test-user-bio",
            avatar_url: "test-user-avatar-url"
        });

        expect(app.controller.currentUser.get_login()).toEqual("test-user-login");
    });

});