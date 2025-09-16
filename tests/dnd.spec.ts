import { test, expect, type Page } from '@playwright/test';

async function dragCardToColumn(
  page: Page,
  taskSelector: string,
  columnSelector: string
) {
  const task = page.locator(taskSelector).first();
  await expect(task).toBeVisible();
  const taskBox = await task.boundingBox();
  const target = page.locator(columnSelector);
  await expect(target).toBeVisible();
  const targetBox = await target.boundingBox();
  if (!taskBox || !targetBox) throw new Error('Missing bounding boxes');

  // Move from center of task to center of target column
  await page.mouse.move(
    taskBox.x + taskBox.width / 2,
    taskBox.y + taskBox.height / 2
  );
  await page.mouse.down();
  await page.mouse.move(
    targetBox.x + targetBox.width / 2,
    targetBox.y + targetBox.height / 2,
    { steps: 15 }
  );
  await page.mouse.up();
}

test('DnD: moves first task from todo to in_progress', async ({ page }) => {
  await page.goto('/project/project-planetx');

  const todo = page.locator('[data-column-id="todo"]');
  const inprog = page.locator('[data-column-id="in_progress"]');

  await expect(todo).toBeVisible();
  await expect(inprog).toBeVisible();

  const task = todo.locator('[data-task-id]').first();
  await expect(task).toBeVisible();
  const taskId = await task.getAttribute('data-task-id');
  expect(taskId).toBeTruthy();

  // Simulate precise pointer drag for dnd-kit
  await dragCardToColumn(
    page,
    '[data-column-id="todo"] [data-task-id]',
    '[data-column-id="in_progress"]'
  );

  // Assert that the specific task moved
  await expect(inprog.locator(`[data-task-id="${taskId}"]`)).toBeVisible({
    timeout: 10000,
  });
  await expect(todo.locator(`[data-task-id="${taskId}"]`)).toHaveCount(0);
});
