import loginData from './loginData.js';
import commonData from "./commonData.js";

// Get the environment variable or default to 'prod'
const env = process.env.ENV || 'prod';

// Create a testData object based on the environment
const testData = {
    common: commonData,
    loginData: loginData[env],
};

export default testData;