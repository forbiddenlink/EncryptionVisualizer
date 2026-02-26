import { test, expect } from '@playwright/test';

test.describe('RSA Visualization', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByRole('navigation').getByRole('button', { name: 'RSA', exact: true }).click();
  });

  test('should display RSA key generation panel', async ({ page }) => {
    // Check for key size selection
    await expect(page.getByText(/Select Key Size/i)).toBeVisible();

    // Check for generate button
    await expect(page.getByRole('button', { name: /Generate RSA Key Pair/i })).toBeVisible();
  });

  test('should generate RSA key pair', async ({ page }) => {
    // Click generate keys button
    await page.getByRole('button', { name: /Generate RSA Key Pair/i }).click();

    // Wait for step visualization
    await expect(page.getByText(/Step 1 of/i)).toBeVisible({ timeout: 10000 });
  });

  test('should display educational content', async ({ page }) => {
    // Check for educational cards
    await expect(page.getByText(/What is RSA/i)).toBeVisible();
    await expect(page.getByText(/Key Generation Steps/i)).toBeVisible();
    await expect(page.getByText(/Common Mistakes/i)).toBeVisible();
  });

  test('should have quiz section', async ({ page }) => {
    // Check for quiz
    await expect(page.getByText(/Knowledge Check/i)).toBeVisible();
  });
});
