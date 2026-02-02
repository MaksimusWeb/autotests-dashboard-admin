const { test, expect } = require('@playwright/test');

let newUserEmail;

test.describe('Админка: удаление пользователя из таблицы', () => {
  const email = 'AutotestsDeletingUser@example.com';
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

    await page.goto('https://admin-dashboard-eight-rust-37.vercel.app/users');

    const newUserName = 'New-Username-Autotests-DU';
    newUserEmail = `DeletingAutotest_${Date.now()}@example.com`;

    await page.locator('button:has-text("Добавить пользователя:")').click();
    await page.locator('#name.input-style').fill(newUserName);
    await page.locator('#email.input-style').fill(newUserEmail);
    await page.locator('#role').selectOption('user');
    await page.locator('button:has-text("💾 Сохранить")').click();

    const rows = page.locator('table tbody tr');
    await expect(rows.locator(`td:has-text("${newUserEmail}")`)).toBeVisible();
  });

  test('Удаление пользователя из таблицы', async ({ page }) => {
    const rows = page.locator('table tbody tr');
    page.once('dialog', (dialog) => dialog.accept());
    await rows
      .filter({ hasText: newUserEmail })
      .locator('button:has-text("🗑️ Удалить")')
      .click();

    await expect(page.locator(`td:has-text("${newUserEmail}")`)).toHaveCount(0);
  });
});
