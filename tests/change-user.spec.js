const { test, expect } = require('@playwright/test');

let newUserEmail;
let newUserName;

test.describe('Админка: изменение информации пользователя', () => {
  const email = 'AutotestsChangingUser@example.com';
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

    newUserName = 'New-Username-Autotests-CU';
    newUserEmail = `ChangingAutotest_${Date.now()}@example.com`;
    
    await page.goto('https://admin-dashboard-eight-rust-37.vercel.app/users')
    await page.locator('button:has-text("Добавить пользователя:")').click();
    await page.locator('#name.input-style').fill(newUserName);
    await page.locator('#email.input-style').fill(newUserEmail);
    await page.locator('#role').selectOption('user');
    await page.locator('button:has-text("💾 Сохранить")').click();
    
    const rows = page.locator('table tbody tr');
    await expect(rows.locator(`td:has-text("${newUserEmail}")`)
        ).toBeVisible();

  });

  test('Изменение информации пользователя', async ({ page }) => {
    await page.goto('https://admin-dashboard-eight-rust-37.vercel.app/users');

    const changedUserName = 'ChangedByAutotestUserName';
    const changedUserEmail = 'ChangedByAutotest@email.com';
    const rows = page.locator('table tbody tr');

    await rows
      .filter({ hasText: newUserEmail })
      .locator('button:has-text("✏️ Редактировать")')
      .click();
    await page.locator(`input[value="${newUserName}"]`).fill(changedUserName);
    await page.locator(`input[value="${newUserEmail}"]`).fill(changedUserEmail);
    const modal = page.locator(
      'div:has(h3:has-text("Редактировать пользователя"))'
    );
    await modal.locator('form select').selectOption('admin');
    await page.locator('button:has-text("Сохранить")').click();

    await expect(
      rows.last().locator(`td:has-text("${changedUserEmail}")`)
    ).toBeVisible();
  });
});
