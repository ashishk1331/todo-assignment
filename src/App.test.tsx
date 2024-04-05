import { describe, expect, test } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';

describe('App', () => {
  test('should render input field and add button', () => {
    render(<App />);
    const input = screen.getByRole('textbox', { name: 'Add Task:' });
    const button = screen.getByRole('button', { name: 'Add' });

    expect(input).toBeInTheDocument(); // assert
    expect(button).toBeInTheDocument();
  });

  test('should add task to list when add button is clicked', async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByRole('textbox', { name: 'Add Task:' });
    const button = screen.getByRole('button', { name: 'Add' });

    await user.type(input, 'New Task');
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText('New Task')).toBeInTheDocument();
    });
  });

  test('should clear the input field after adding a task', async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByRole('textbox', { name: 'Add Task:' });
    const button = screen.getByRole('button', { name: 'Add' });

    await user.type(input, 'New Task');
    await user.click(button);

    await waitFor(() => {
      expect(input).toHaveValue('');
    });
  });

  test('should not add an empty task', async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByRole('textbox', { name: 'Add Task:' });
    const button = screen.getByRole('button', { name: 'Add' });

    await user.type(input, '   '); // Makes sense to also test with spaces
    await user.click(button);

    await waitFor(() => {
      expect(screen.queryAllByRole('listitem')).toHaveLength(0);
    });
  });

  test('should add a task by pressing the enter key', async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByRole('textbox', { name: 'Add Task:' });

    await user.type(input, 'New Task{enter}');

    await waitFor(() => {
      expect(screen.queryAllByRole('listitem')).toHaveLength(1);
    });
  });
});

describe('Edit and Deletion feature', () => {
  test('should render an input field when edit button is clicked', async () => {
    // Add a task
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByRole('textbox', { name: 'Add Task:' });
    const button = screen.getByRole('button', { name: 'Add' });

    await user.type(input, 'New Task');
    await user.click(button);

    // Edit the task
    const editButton = screen.getByRole('button', { name: 'edit' });

    await user.click(editButton);

    await waitFor(() => {
      expect(screen.getByDisplayValue('New Task')).toBeInTheDocument();
    });
  });

  test('should save the new title when save button is clicked', async () => {
    // Add a task
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByRole('textbox', { name: 'Add Task:' });
    const button = screen.getByRole('button', { name: 'Add' });

    await user.type(input, 'New Task');
    await user.click(button);

    // Edit the task
    const editButton = screen.getByRole('button', { name: 'edit' });

    await user.click(editButton);

    const textBox = screen.getByDisplayValue('New Task');
    const saveButton = screen.getByRole('button', { name: 'save' });

    await user.type(textBox, ' Addition');
    await user.click(saveButton);

    await waitFor(() => {
      expect(screen.getByText('New Task Addition')).toBeInTheDocument();
    });
  });

  test('should cancel editing when cancel button is clicked', async () => {
    // Add a task
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByRole('textbox', { name: 'Add Task:' });
    const button = screen.getByRole('button', { name: 'Add' });

    await user.type(input, 'New Task');
    await user.click(button);

    // Edit the task
    const editButton = screen.getByRole('button', { name: 'edit' });

    await user.click(editButton);

    const cancel = screen.getByRole('button', { name: 'cancel' });

    await user.click(cancel);

    await waitFor(() => {
      expect(screen.getByText('New Task')).toBeInTheDocument();
    });
  });

  test('should delete a task when delete button is clicked', async () => {
    // Add a task
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByRole('textbox', { name: 'Add Task:' });
    const button = screen.getByRole('button', { name: 'Add' });

    await user.type(input, 'New Task');
    await user.click(button);

    // Delete the task
    const deleteButton = screen.getByRole('button', { name: 'delete' });

    await user.click(deleteButton);

    await waitFor(() => {
      expect(screen.queryAllByRole('listitem')).toHaveLength(0);
    });
  });
});
