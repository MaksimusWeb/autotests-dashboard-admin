const { test, expect } = require('@playwright/test')

test('Успешный логин', async ({ page }) => {
    await page.goto('https://admin-dashboard-eight-rust-37.vercel.app/');

    const email = 'Autotest@example.com'
    const password = 'admin123'

    const loginLink = page.locator('a[href="/auth/signin"]')
    await loginLink.click()
    
    const emailInput = page.locator('#email')
    const passwordInput = page.locator('#password')
    await emailInput.fill(email)
    await passwordInput.fill(password)
    await page.locator('button:has-text("Войти")').click()

    const adminName = email.split('@')[0];

    const greeting = page.locator(`text=Привет, ${adminName}`)

    await expect(greeting).toBeVisible()
})