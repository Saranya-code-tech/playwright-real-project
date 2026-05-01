import { Page, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async login(username: string, password: string) {
    await this.page.fill('#user-name', username);
    await this.page.fill('#password', password);
    await this.page.click('#login-button');
  }

  async verifyLoginSuccess() {
    await expect(this.page).toHaveURL(/inventory/);
    await expect(this.page.locator('[data-test="title"]')).toHaveText('Products');
  }

  async verifyLoginError() {
    await expect(this.page.locator('[data-test="error"]')).toBeVisible();
  }

  async verifyLoginErrorMessage(expectedMessage: string) {
    const errorLocator = this.page.locator('[data-test="error"]');
    await expect(errorLocator).toBeVisible();
    await expect(errorLocator).toHaveText(expectedMessage);
  }
}