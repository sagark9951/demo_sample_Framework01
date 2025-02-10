// hooks_Example.test.js
describe('Order of Execution of Hooks', function() {
    // This will run once before all tests
    before(function() {
        console.log('Before all tests');
    });

    // This will run before each test
    beforeEach(function() {
        console.log('Before each test');
    });

    // A sample test
    it('Test 1', function() {
        console.log('Executing Test 1');
    });

    // Another sample test
    it('Test 2', function() {
        console.log('Executing Test 2');
    });

    // This will run after each test
    afterEach(function() {
        console.log('After each test');
    });

    // This will run once after all tests
    after(function() {
        console.log('After all tests');
    });
});