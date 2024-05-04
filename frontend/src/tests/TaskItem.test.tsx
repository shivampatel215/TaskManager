import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TaskItem from "../ui/views/TasksList/components/TaskItem/TaskItem";
import "@testing-library/jest-dom";

describe("TaskItem", () => {
  const task = {
    id: "1",
    title: "Test Task",
    description: "This is a test task",
    completed: false,
    dueDate: "2023-05-03",
  };

  const onEdit = jest.fn();
  const onDelete = jest.fn();
  const onClick = jest.fn();
  const onToggleComplete = jest.fn();

  beforeEach(() => {
    render(
      <TaskItem
        task={task}
        onEdit={onEdit}
        onDelete={onDelete}
        onClick={onClick}
        onToggleComplete={onToggleComplete}
      />
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders task title and description", () => {
    expect(screen.getByText(task.title)).toBeInTheDocument();
    expect(screen.getByText(task.description)).toBeInTheDocument();
  });

  it("calls onEdit when edit icon is clicked", () => {
    fireEvent.click(screen.getByTestId("edit-icon"));
    expect(onEdit).toHaveBeenCalledWith(task.id);
  });

  it("calls onDelete when delete icon is clicked", () => {
    fireEvent.click(screen.getByTestId("delete-icon"));
    expect(onDelete).toHaveBeenCalledWith(task.id);
  });

  it("calls onClick when task item is clicked", () => {
    fireEvent.click(screen.getByRole("listitem"));
    expect(onClick).toHaveBeenCalled();
  });

  it("calls onToggleComplete when checkbox is clicked", () => {
    fireEvent.click(screen.getByRole("checkbox"));
    expect(onToggleComplete).toHaveBeenCalledWith(!task.completed, task);
  });
});
