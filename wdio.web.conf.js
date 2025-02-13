import { expect } from 'chai';
import path from 'path';
import fs from 'fs';
import reporter from './test/utils/allureUtility.js'
import allure from 'allure-commandline'



const ENV = process.env.ENV || 'qa';
const urls = {
    dev: 'https://www.amazon.in/',
    qa: 'https://www.saucedemo.com/',
    prod: 'https://www.saucedemo.com/'
};
if (!urls[ENV]) {
    throw new Error(`Environment ${ENV} is not defined. Please use 'dev', 'qa', or 'prod'.`);
}


export const config = {
   
    runner: 'local',
   
    specs: [
        './test/specs/**/*.js'
    ],
    // Patterns to exclude.
    exclude: [
        // 'path/to/excluded/files'
    ],
    
    maxInstances: Number(process.env.MAX_INSTANCES) || 4,

    capabilities: [{
        // to change browser name in run command give : BROWSER = 'firefox' or BROWSER='MicrosoftEdge'
        browserName: process.env.BROWSER || 'chrome',
    },],

    
    // ===================
    // Test Configurations
    // ===================
  
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    logLevel: 'info',
   
    
    bail: 0,
  
    baseUrl: urls[ENV],

    waitforTimeout: 10000,
 
    connectionRetryTimeout: 120000,

    connectionRetryCount: 3,
   
    framework: 'mocha',


    reporters: [
        'spec',
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: false,
        }],

        // ['junit', {
        //     outputDir: './reports/junit-results/',
        //     outputFileFormat: function(options) { // optional
        //         return `results-${options.cid}.${options.capabilities}.xml`
        //     }
        // }],
    ],


    // Options to be passed to Mocha.
    // See the full list at http://mochajs.org/
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },

    //
    // =====
    // Hooks
    // =====
    // WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
    // it and to build services around it. You can either apply a single function or an array of
    // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
    // resolved to continue.
    /**
     * Gets executed once before all workers get launched.
     * @param {object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     */
    onPrepare: function (config, capabilities) {
        /*removing allure-result forlder to generate new results at the end of execution*/
        const allureResultsDir = path.join(process.cwd(), 'allure-results');
        fs.rm(allureResultsDir, { recursive: true, force: true }, (err) => {
            if (err) {
                console.error('Could not remove allure-results:', err);
            } else {
                console.log('Cleaned up allure-results directory');
            }
        });
    },
    
    before:async function (capabilities, specs) {
     global.expect = expect ;
    },
   
   
    // beforeSuite: function (suite) {
    // },
    /**
     * Function to be executed before a test (in Mocha/Jasmine) starts.
     */
    beforeTest: async function (test, context) {
        await browser.maximizeWindow()
        await browser.url('./')  //(./)  dot slash - is by default taking url from baseurl parameter
        await reporter.addLink(await urls[ENV], `Sauce Lab - ${ENV} environment`) // addding the URL link in allure report
    },
 
    beforeEach: async function () {
        // Any setup before each test goes here, but make sure `browser` commands
        // like `$`, `get`, etc., are only used when `browser` is properly initialized
        console.log('Preparing the environment for the test...');
    },
    // beforeHook: function (test, context, hookName) {
    // },
   
    // afterHook: function (test, context, { error, result, duration, passed, retries }, hookName) {
    // },
    /**
     * Function to be executed after a test (in Mocha/Jasmine only)
     * @param {object}  test             test object
     * @param {object}  context          scope object the test was executed with
     * @param {Error}   result.error     error object in case the test fails, otherwise `undefined`
     * @param {*}       result.result    return object of test function
     * @param {number}  result.duration  duration of test
     * @param {boolean} result.passed    true if test has passed, otherwise false
     * @param {object}  result.retries   information about spec related retries, e.g. `{ attempts: 0, limit: 0 }`
     */
    afterTest: async function (test, context, { error, result, duration, passed, retries }) {
        if (error) {
            await browser.takeScreenshot()
        }
        await browser.execute(() => {
            window.localStorage.clear(); // clear cookies
            window.sessionStorage.clear(); // clear cache
        });
        // or
        // await browser.deleteAllCookies()
    },


    /**
     * Hook that gets executed after the suite has ended
     * @param {object} suite suite details
     */
    // afterSuite: function (suite) {
    // },

    // afterCommand: function (commandName, args, result, error) {
    // },
 
    // after: function (result, capabilities, specs) {
    // },

    // afterSession: function (config, capabilities, specs) {
    // },
    /**
     * Gets executed after all workers got shut down and the process is about to exit. An error
     * thrown in the onComplete hook will result in the test run failing.
     * @param {object} exitCode 0 - success, 1 - fail
     * @param {object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {<Object>} results object containing test results
     */
    onComplete: function (exitCode, config, capabilities, results) {
        const reportError = new Error('Could not generate Allure report')
        const now = new Date();
        const timestamp = `${now.getDate()}-${(now.getMonth() + 1)}-${now.getFullYear()}_${now.getHours()}-${now.getMinutes()}`;
        if (!fs.existsSync('Web_Execution_Report')) {
            fs.mkdirSync('Web_Execution_Report');
        }
        const reportDir = path.join('Web_Execution_Report', `Report_${timestamp}`);
        const reportFile = `Web_Report_${timestamp}.html`

        const generation = allure(['generate', '--single-file', 'allure-results', '--clean', '--output', reportDir])

        return new Promise((resolve, reject) => {
            const generationTimeout = setTimeout(
                () => reject(reportError), 150000)
            generation.on('exit', function (exitCode) {
                clearTimeout(generationTimeout)
                if (exitCode !== 0) {
                    return reject(reportError)
                }
                const oldPath = path.join(reportDir, 'index.html');
                const newPath = path.join(reportDir, reportFile);
                fs.rename(oldPath, newPath, (err) => {
                    if (err) {
                        return reject(new Error('Could not rename the Allure report file.'));
                    }
                    console.log('Allure report successfully generated')
                    resolve()
                })
            })
        })
    },
    /**
    * Gets executed when a refresh happens.
    * @param {string} oldSessionId session ID of the old session
    * @param {string} newSessionId session ID of the new session
    */
    // onReload: function(oldSessionId, newSessionId) {
    // }
    /**
    * Hook that gets executed before a WebdriverIO assertion happens.
    * @param {object} params information about the assertion to be executed
    */
    // beforeAssertion: function(params) {
    // }
    /**
    * Hook that gets executed after a WebdriverIO assertion happened.
    * @param {object} params information about the assertion that was executed, including its results
    */
    // afterAssertion: function(params) {
    // }
}
