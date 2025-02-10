import { expect } from "chai";
import reporter from '../utils/allureUtility.js';

class LoginPage {
    // Private locators
    #usernameInput = '#user-name';
    #passwordInput = '#password';
    #loginButton ='#login-button';
    #errorMessage = '.error-message-container';

    // Getter for the error message to check visibility
    async errorMssg() {
        return await $(this.#errorMessage).isDisplayed();
    }

    // Method to perform login action
    async login(username, password) {
        // Wait for elements to be visible before interacting
        await $(this.#usernameInput).waitForDisplayed({ timeout: 5000 });
        await $(this.#passwordInput).waitForDisplayed({ timeout: 5000 });
        await $(this.#loginButton).waitForDisplayed({ timeout: 5000 });

        // Set username value
        await $(this.#usernameInput).setValue(username);
        await reporter.stepLevelLog(`Entered ${username} in User input field`);

        // Set password value
        await $(this.#passwordInput).setValue(password);
        await reporter.stepLevelLog(`Entered ${password} in password input field`);

        // Click the login button
        await $(this.#loginButton).click();
        await reporter.stepLevelLog(`Clicked on Login Button`);
    }
}

export default new LoginPage();
