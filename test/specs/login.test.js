// import loginPage from "../pageobjects/login.screen.js";
import loginPage from "../pageobjects/loginPrivate.screen.js";
import { assert,expect } from "chai";
import data from '../testData/allDataImport.js'

describe('Login Test', () => {

    it('should login with valid credentials', async () => {
        // await loginPage.login('standard_user', 'secret_sauce');
        await loginPage.login(data.loginData.username, data.loginData.password);

        expect(await browser.getUrl()).to.include('inventory.html')
    });

    it('should show error for invalid login', async () => {
        await loginPage.login('invalid_user', 'wrong_password');
        let errorMsg =await loginPage.errorMssg()
        expect(errorMsg).to.be.true;
    });
});
