import { test } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { loginData } from '../test-data/loginData';

let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.navigate();
});

test('valid login using Page Object Model', async () => {
  await loginPage.login(
    loginData.validUser.username,
    loginData.validUser.password
  );

  await loginPage.verifyLoginSuccess();
});

test('invalid login shows error', async () => {
  await loginPage.login(
    loginData.invalidUser.username,
    loginData.invalidUser.password
  );

  await loginPage.verifyLoginError();
});