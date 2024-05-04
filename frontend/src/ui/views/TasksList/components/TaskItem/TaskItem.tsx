/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import styles from "./TaskItem.module.scss";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { DateFormat } from "../../../../../shared/utils/DateFormat";
import { Task } from "../../../../../shared/models/task";

interface TaskItemProps {
  task: Task;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onClick: () => void;
  onToggleComplete: (completed: boolean, task: Task) => void;
}
function TaskItem({
  task,
  onEdit,
  onDelete,
  onClick,
  onToggleComplete,
}: TaskItemProps) {
  const handleEdit = (e: any) => {
    e.stopPropagation();
    onEdit(task.id);
  };
  const handleDelete = (e: any) => {
    e.stopPropagation();
    onDelete(task.id);
  };
  const handleToggleComplete = (e: any) => {
    e.stopPropagation(); // Stop the click event from bubbling to the li element
    onToggleComplete(task.completed ? false : true, task);
  };

  return (
    <li className={styles.item} onClick={onClick}>
      <div className={styles.checkbox_with_title}>
        <div
          className={styles.checkbox_container}
          onClick={handleToggleComplete}
        >
          <input
            type="checkbox"
            className={styles.checkbox}
            defaultChecked={task.completed}
          />{" "}
        </div>
        <div className={styles.title_container}>
          <div className={styles.title}>{task.title}</div>
          <div className={styles.description}>{task.description}</div>
        </div>
      </div>
      <div className={styles.icons_with_date}>
        <div className={styles.icons}>
          <Pencil1Icon
            className={styles.icon}
            onClick={handleEdit}
            data-testid="edit-icon"
          />
          <TrashIcon
            className={styles.icon}
            onClick={handleDelete}
            data-testid="delete-icon"
          />
        </div>
        <div className={styles.date}>{DateFormat(task.dueDate)}</div>
      </div>
    </li>
  );
}

export default TaskItem;
