import { test } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { loginData } from '../test-data/loginData';

let loginPage: LoginPage;

test.describe('@edge SauceDemo login edge cases', () => {
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test('locked out user cannot login', async () => {
    await loginPage.login(
      loginData.lockedOutUser.username,
      loginData.lockedOutUser.password
    );

    await loginPage.verifyLoginErrorMessage(
      'Epic sadface: Sorry, this user has been locked out.'
    );
  });

  test('empty username and password shows required field error', async () => {
    await loginPage.login('', '');

    await loginPage.verifyLoginErrorMessage(
      'Epic sadface: Username is required'
    );
  });

  test('empty username shows username required error', async () => {
    await loginPage.login('', loginData.validUser.password);

    await loginPage.verifyLoginErrorMessage(
      'Epic sadface: Username is required'
    );
  });

  test('empty password shows password required error', async () => {
    await loginPage.login(loginData.validUser.username, '');

    await loginPage.verifyLoginErrorMessage(
      'Epic sadface: Password is required'
    );
  });

  test('invalid password with valid username shows login failure', async () => {
    await loginPage.login(loginData.validUser.username, loginData.invalidUser.password);

    await loginPage.verifyLoginErrorMessage(
      'Epic sadface: Username and password do not match any user in this service'
    );
  });

  test('username with special characters is rejected', async () => {
    await loginPage.login('!@#$%^&*()', 'secret_sauce');

    await loginPage.verifyLoginErrorMessage(
      'Epic sadface: Username and password do not match any user in this service'
    );
  });
});
