import React, { useMemo, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
  GET_ALL_TASKS,
  DELETE_TASK,
  UPDATE_TASK,
} from "../../../shared/graphql/queries";
import styles from "./TasksList.module.scss";
import { PlusIcon } from "@radix-ui/react-icons";
import CreateTask from "../../components/CreateTaskForm/CreateTask";
import TaskItem from "./components/TaskItem/TaskItem";
import TaskHeader from "./components/TaskHeader/TaskHeader";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Task } from "../../../shared/models/task";

const TasksList: React.FC = () => {
  const {
    loading,
    error,
    data: tasksData,
  } = useQuery<{ allTasks: Task[] }>(GET_ALL_TASKS);
  const navigate = useNavigate();
  const location = useLocation();
  const showModal = location.pathname.includes("/task/");
  const [showForm, setShowForm] = useState(false);
  const [deleteTask] = useMutation<{ deleteTask: { id: string } }>(
    DELETE_TASK,
    {
      refetchQueries: [{ query: GET_ALL_TASKS }],
    }
  );
  const [updateTask] = useMutation<{ updateTask: Task }>(UPDATE_TASK, {
    refetchQueries: [{ query: GET_ALL_TASKS }],
  });
  const [editTaskId, setEditTaskId] = useState<string | null>(null);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleDelete = (id: string) => {
    deleteTask({ variables: { id } });
  };

  const toggleEdit = (id: string) => {
    setEditTaskId((prev) => (prev === id ? null : id));
  };

  const handleTaskClick = (id: string) => {
    navigate(`/task/${id}`);
  };

  const toggleComplete = (completed: boolean, task: Task) => {
    const dueDate = task.dueDate ? new Date(task.dueDate) : null;

    updateTask({
      variables: {
        id: task.id,
        completed,
        title: task.title,
        description: task.description || "",
        dueDate: dueDate ? dueDate.toISOString() : null,
      },
    });
  };

  const sortedTasks = useMemo(() => {
    if (!tasksData) return [];

    const tasks = [...tasksData.allTasks];
    tasks.sort((a, b) => {
      if (a.completed && !b.completed) return 1;
      if (!a.completed && b.completed) return -1;

      const dateA = a.dueDate
        ? new Date(a.dueDate).getTime()
        : new Date(8640000000000000).getTime();
      const dateB = b.dueDate
        ? new Date(b.dueDate).getTime()
        : new Date(8640000000000000).getTime();

      return dateA - dateB;
    });

    return tasks;
  }, [tasksData]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <div>{error.message} </div>;
  }

  return (
    <div className={styles.container}>
      <TaskHeader count={tasksData?.allTasks.length || 0} />
      <ul className={styles.list}>
        {sortedTasks.map((task) => (
          <div key={task.id} className={styles.item_container}>
            {editTaskId === task.id ? (
              <CreateTask
                task={task}
                onClose={() => toggleEdit(task.id)}
                isEditing={true}
              />
            ) : (
              <TaskItem
                task={task}
                onDelete={handleDelete}
                onEdit={toggleEdit}
                onClick={() => handleTaskClick(task.id)}
                onToggleComplete={toggleComplete}
              />
            )}
          </div>
        ))}
        {!showForm && (
          <button className={styles.add_task_button} onClick={toggleForm}>
            <PlusIcon className={styles.plus} /> Add Task
          </button>
        )}
      </ul>
      {showForm && <CreateTask onClose={toggleForm} />}
      {showModal && <Outlet />}
    </div>
  );
};

export default TasksList;
