import { test, expect } from '@playwright/test';

test.describe('Hashing Visualization', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Hashing' }).click();
  });

  test('should display hash input panel', async ({ page }) => {
    // Check for input field
    await expect(page.getByRole('textbox', { name: /Enter text to hash/i })).toBeVisible();

    // Check for hash button
    await expect(page.getByRole('button', { name: /Hash It/i })).toBeVisible();
  });

  test('should compute hash when button clicked', async ({ page }) => {
    // Click hash button
    await page.getByRole('button', { name: /Hash It/i }).click();

    // Wait for step visualization
    await expect(page.getByText(/Step 1 of/i)).toBeVisible({ timeout: 5000 });
  });

  test('should have avalanche effect demo', async ({ page }) => {
    // Look for avalanche effect section
    await expect(page.getByText(/Avalanche Effect/i).first()).toBeVisible();
  });

  test('should display educational content', async ({ page }) => {
    // Check for educational cards
    await expect(page.getByText(/What is Hashing/i)).toBeVisible();
    await expect(page.getByText(/Key Properties/i)).toBeVisible();
    await expect(page.getByText(/Common Mistakes/i)).toBeVisible();
  });

  test('should have quiz section', async ({ page }) => {
    // Check for quiz
    await expect(page.getByText(/Knowledge Check/i)).toBeVisible();
  });
});
