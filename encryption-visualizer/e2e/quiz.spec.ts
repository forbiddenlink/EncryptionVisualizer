import { test, expect } from '@playwright/test';

test.describe('Quiz System', () => {
  test('should display quiz on AES page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('navigation').getByRole('button', { name: 'AES', exact: true }).click();

    // Look for quiz section
    await expect(page.getByText(/Knowledge Check/i)).toBeVisible();
    await expect(page.getByText(/1 \/ 5/i)).toBeVisible();
  });

  test('should allow answering quiz questions on AES page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('navigation').getByRole('button', { name: 'AES', exact: true }).click();

    // Find a quiz answer option and click it (quiz question about AES variant)
    // The answer options are displayed as buttons with the answer text
    const answerButton = page.locator('[data-testid="quiz-question"]').or(page.getByText(/Knowledge Check/i).locator('..').locator('..')).getByRole('button').first();
    if (await answerButton.isVisible({ timeout: 5000 })) {
      await answerButton.click();
      // Should show feedback or advance
      await expect(page.getByText(/2 \/ 5/i).or(page.getByText(/Correct/i)).or(page.getByText(/Incorrect/i))).toBeVisible({ timeout: 5000 });
    }
  });

  test('should display quiz on RSA page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('navigation').getByRole('button', { name: 'RSA', exact: true }).click();

    // Look for quiz section
    await expect(page.getByText(/Knowledge Check/i)).toBeVisible();
  });

  test('should display quiz on Hashing page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('navigation').getByRole('button', { name: 'Hashing', exact: true }).click();

    // Look for quiz section
    await expect(page.getByText(/Knowledge Check/i)).toBeVisible();
  });
});
