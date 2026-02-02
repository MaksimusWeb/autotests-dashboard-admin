const { test, expect } = require('@playwright/test');

test.describe('Админка: добавление пользователя', () => {
  const email = 'AutotestsAddingUser@example.com';
  const password = 'admin123';
  const adminName = email.split('@')[0];

  test.beforeEach(async ({ page }) => {
    // login
    await page.goto('https://admin-dashboard-eight-rust-37.vercel.app/');
    await page.locator('a[href="/auth/signin"]').click();
    await page.locator('#email').fill(email);
    await page.locator('#password').fill(password);
    await page.locator('button:has-text("Войти")').click();
    await expect(page.locator(`text=Привет, ${adminName}`)).toBeVisible();
    
  });

    test('Добавление нового пользователя', async ({ page }) => {
    await page.goto('https://admin-dashboard-eight-rust-37.vercel.app/users');

    const newUserName = 'New-Username-Autotests-AU';
    const newUserEmail = `AddingAutotest_${Date.now()}@example.com`;

    await page.locator('button:has-text("Добавить пользователя:")').click();
    await page.locator('#name.input-style').fill(newUserName);
    await page.locator('#email.input-style').fill(newUserEmail);
    await page.locator('#role').selectOption('user');
    await page.locator('button:has-text("💾 Сохранить")').click()
    
    const rows = page.locator('table tbody tr')
    await expect(rows.last().locator(`td:has-text("${newUserEmail}")`)).toBeVisible()
});
});



