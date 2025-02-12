import loginPage from "../pageobjects/loginPrivate.screen.js";
import { assert,expect } from "chai";
import data from '../testData/allDataImport.js'
import mainPageScreen from "../pageobjects/mainPage.screen.js";

describe('Login and Add  Product to cart Test', () => {

    it('should login with valid credentials', async () => {
        // await loginPage.login('standard_user', 'secret_sauce');
        await loginPage.login(data.loginData.username, data.loginData.password);

        expect(await browser.getUrl()).to.include('inventory.html')
        await mainPageScreen.verifyProductsDisplayed();

        await mainPageScreen.addFirstProductToCart();
    });
});
