import allureReporter from "@wdio/allure-reporter"

class AllureUtility {

    async stepLevelLog(message) {
        await allureReporter.addStep(message)
    }

    /**
    * @description This is used to add link in the report
    * @param {string} link 
    * @param {string} websiteName 
    */
    async addLink(link, websiteName) {
        await allureReporter.addLink(link, websiteName, 'website')
    }

    /**
    * @description This function is used to add testcase id 
    * @param {String} Test Case Id as Per TCM
    */
    async addTestCaseId(testCaseID) {
        await allureReporter.addLabel("Test id : ",testCaseID)
    }
}

export default new AllureUtility()