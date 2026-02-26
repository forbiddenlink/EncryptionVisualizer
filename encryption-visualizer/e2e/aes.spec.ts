import { test, expect } from '@playwright/test';

test.describe('AES Visualization', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByRole('navigation').getByRole('button', { name: 'AES', exact: true }).click();
  });

  test('should display AES input panel', async ({ page }) => {
    // Check for plaintext input
    await expect(page.getByRole('textbox', { name: /plaintext/i })).toBeVisible();

    // Check for key input
    await expect(page.getByRole('textbox', { name: /key/i })).toBeVisible();

    // Check for encrypt button
    await expect(page.getByRole('button', { name: /Start Encryption/i })).toBeVisible();
  });

  test('should encrypt text when button is clicked', async ({ page }) => {
    // The example is pre-loaded, just click encrypt
    await page.getByRole('button', { name: /Start Encryption/i }).click();

    // Wait for visualization to show step info
    await expect(page.getByText(/Step 1 of/i)).toBeVisible({ timeout: 5000 });
  });

  test('should display educational content', async ({ page }) => {
    // Check for educational cards
    await expect(page.getByText(/What is AES/i)).toBeVisible();
    await expect(page.getByText(/Common Mistakes/i)).toBeVisible();
  });

  test('should have quiz section', async ({ page }) => {
    // Check for quiz
    await expect(page.getByText(/Knowledge Check/i)).toBeVisible();
  });
});
