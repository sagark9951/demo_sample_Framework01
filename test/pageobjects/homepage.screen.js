import { assert,expect } from "chai";
import reporter from '../utils/allureUtility.js'


const homePage = {
    errorMessage : '.error-message-container'
}

class HomePage {

    get usernameInput() { return $('#user-name'); }
    get passwordInput() { return $('#password'); }
    get loginButton() { return $('#login-button'); }
    // get errorMessage() { return $('.error-message-container'); }

    async login(username, password) {
        await this.usernameInput.setValue(username);
        await reporter.stepLevelLog(`Entered ${username} in User input field`)

        await this.passwordInput.setValue(password);
        await reporter.stepLevelLog(`Entered ${password} in password input field`)

        await this.loginButton.click();
        await reporter.stepLevelLog(`Clicked on Login Button`)
    }

    async errorMssg(){
        return await $(loginPage.errorMessage).isDisplayed()
    }
}

export default new HomePage();
