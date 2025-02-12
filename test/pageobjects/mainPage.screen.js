import { expect } from "chai";
import allureUtility from "../utils/allureUtility";


class MainPage {
    get productsHeader() { return $("//div[contains(@*,'header')]/span[text()='Products']"); }
    get firstProduct() { return $("(//*[@data-test='inventory-item-name'])[position()=1]"); }
    get addFirstProductToCartButton() {return $("(//*[@data-test='inventory-item-name'])[position()=1]/ancestor::div[@*='inventory-item-description']//button")}
    get addToCartBtn() {return $("//button[@id='add-to-cart']")}
    
    async verifyProductsDisplayed() {
        await (this.productsHeader).waitForDisplayed({timeout:6000})
        console.log("await this.productsHeader.isDisplayed() : ~~ ",await this.productsHeader.isDisplayed()); 
         expect(await this.productsHeader.isDisplayed()).to.be.true;
        await allureUtility.stepLevelLog("Product Header is displayed")
    }

    async addFirstProductToCart() {
        await this.firstProduct.waitForDisplayed({timeout:6000})
        await this.addFirstProductToCartButton.waitForEnabled()
        await this.addFirstProductToCartButton.click();
        await allureUtility.stepLevelLog("Product Added to cart")
    }
}

export default new MainPage();