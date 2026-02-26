import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should load homepage and show navigation', async ({ page }) => {
    await page.goto('/');

    // Check main heading
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Encryption');

    // Check navigation buttons exist in the header
    const nav = page.getByRole('navigation');
    await expect(nav.getByRole('button', { name: 'AES', exact: true })).toBeVisible();
    await expect(nav.getByRole('button', { name: 'RSA', exact: true })).toBeVisible();
    await expect(nav.getByRole('button', { name: 'Hashing', exact: true })).toBeVisible();
    await expect(nav.getByRole('button', { name: 'Glossary', exact: true })).toBeVisible();
  });

  test('should navigate to AES page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('navigation').getByRole('button', { name: 'AES', exact: true }).click();
    await expect(page.getByRole('heading', { name: /AES Encryption Visualizer/i })).toBeVisible();
  });

  test('should navigate to RSA page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('navigation').getByRole('button', { name: 'RSA', exact: true }).click();
    await expect(page.getByRole('heading', { name: /RSA Encryption Visualizer/i })).toBeVisible();
  });

  test('should navigate to Hashing page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('navigation').getByRole('button', { name: 'Hashing', exact: true }).click();
    await expect(page.getByRole('heading', { name: /Hash Functions Visualizer/i })).toBeVisible();
  });

  test('should navigate to Glossary page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('navigation').getByRole('button', { name: 'Glossary', exact: true }).click();
    await expect(page.getByRole('heading', { name: /Crypto Glossary/i })).toBeVisible();
  });

  test('should toggle theme', async ({ page }) => {
    await page.goto('/');

    // Check dark mode is default
    const darkRadio = page.getByRole('radio', { name: 'Dark mode' });
    await expect(darkRadio).toBeChecked();

    // Switch to light mode
    await page.getByRole('radio', { name: 'Light mode' }).click();
    await expect(page.getByRole('radio', { name: 'Light mode' })).toBeChecked();
  });
});
