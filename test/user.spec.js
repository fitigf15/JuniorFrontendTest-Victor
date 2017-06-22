/**
 * Created by fitig on 21/06/2017.
 */
describe('User test', function() {

    var user;

    beforeEach(function () {
        user = new User({
            login:"test-user-login",
            name: "test-user-name",
            bio: "test-user-bio",
            avatar_url: "test-user-avatar-url"
        });
    });
    afterEach(function(){
        user.reset();
    });

    it("Has initialized attributes", function () {
        expect(user.get_login()).toEqual("test-user-login");
        expect(user.get_name()).toEqual("test-user-name");
        expect(user.get_bio()).toEqual("test-user-bio");
        expect(user.get_avatar_url()).toEqual("test-user-avatar-url");
    });


    it("Has working set method", function () {

        user.set_login("test-user2-login");
        user.set_name("test-user2-name");
        user.set_bio("test-user2-bio");
        user.set_avatar_url("test-user2-avatar-url");


        expect(user.get_login()).toEqual("test-user2-login");
        expect(user.get_name()).toEqual("test-user2-name");
        expect(user.get_bio()).toEqual("test-user2-bio");
        expect(user.get_avatar_url()).toEqual("test-user2-avatar-url");

        user.set_name("test-user2-name2");
        expect(user.get_name()).toEqual("test-user2-name2");
    });

    it("Has working reset method", function () {

        user.reset();

        expect(user.get_login()).toBeNull();
        expect(user.get_name()).toBeNull();
        expect(user.get_bio()).toBeNull();
        expect(user.get_avatar_url()).toBeNull();
    });


});