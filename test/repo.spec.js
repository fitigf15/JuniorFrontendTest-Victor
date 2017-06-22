/**
 * Created by fitig on 21/06/2017.
 */
describe('Repo test', function() {
    var repo;

    beforeEach(function () {
        repo = new Repo({
            name:"test-repo-name",
            stargazers_count: 1,
            forks_count: 2});
    });
    afterEach(function(){
        repo.reset();
    });

    it("Has initialized attributes", function () {
        expect(repo.get_name()).toEqual("test-repo-name");
        expect(repo.get_stargazers_count()).toEqual(1);
        expect(repo.get_forks_count()).toEqual(2);
    });

    it("Has working set methods", function () {

        repo.set_name("test-repo2-name");
        repo.set_stargazers_count(2);
        repo.set_forks_count(4);

        expect(repo.get_name()).toEqual("test-repo2-name");
        expect(repo.get_stargazers_count()).toEqual(2);
        expect(repo.get_forks_count()).toEqual(4);

        repo.set_name("test-repo2-name2");
        expect(repo.get_name()).toEqual("test-repo2-name2");
    });

    it("Has working reset method", function () {

        repo.reset();

        expect(repo.get_name()).toBeNull();
        expect(repo.get_stargazers_count()).toEqual(0);
        expect(repo.get_forks_count()).toEqual(0);
    });


});