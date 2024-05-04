/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import {
  CREATE_TASK,
  GET_ALL_TASKS,
  UPDATE_TASK,
} from "../../../shared/graphql/queries";
import styles from "./CreateTask.module.scss";
import { CalendarIcon } from "@radix-ui/react-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Task } from "../../../shared/models/task";

interface CreateTaskProps {
  onClose: () => void;
  task?: Task;
  isEditing?: boolean;
}

function CreateTask({ onClose, task, isEditing = false }: CreateTaskProps) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      title: task ? task.title : "",
      description: task ? task.description : "",
      completed: task ? task.completed : false,
      dueDate: task && task.dueDate ? new Date(task.dueDate) : new Date(),
    },
  });

  //To deal with timezone discrepancies with the backend
  const dueDate = watch("dueDate");
  const utcDueDate = dueDate
    ? new Date(dueDate.getTime() + dueDate.getTimezoneOffset() * 60000)
    : new Date();

  const [createOrUpdateTask, { error }] = useMutation(
    isEditing ? UPDATE_TASK : CREATE_TASK,
    {
      refetchQueries: [{ query: GET_ALL_TASKS }],
    }
  );

  const onSubmit = (data: any) => {
    const variables =
      isEditing && task
        ? { id: task.id, ...data, dueDate: data.dueDate.toISOString() }
        : { input: { ...data, dueDate: data.dueDate.toISOString() } };
    createOrUpdateTask({ variables })
      .then((result) => {
        if (isEditing && result.data.updateTask.errors.length === 0) {
          reset();
          onClose();
        } else if (!isEditing && result.data.createTask.errors.length === 0) {
          reset();
          onClose();
        }
      })
      .catch(console.error);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.form_editing_area}>
          <div className={styles.input_area}>
            <input
              {...register("title", { required: true })}
              placeholder="Task Title"
              className={styles.title_input}
              autoFocus={true}
            />
            <textarea
              {...register("description", { required: true })}
              placeholder="Description"
              className={styles.description_input}
            />
          </div>
          <div className={styles.checkbox_area}>
            <label className={styles.calendar}>
              <DatePicker
                selected={isEditing ? utcDueDate : dueDate}
                onChange={(date: Date) => setValue("dueDate", date)}
                dateFormat="MMM d"
                customInput={<input />}
                closeOnScroll={true}
              />
              <CalendarIcon />
            </label>
            <div className={styles.checkboxContainer}>
              <input
                type="checkbox"
                id="completed"
                {...register("completed")}
              />
              <label htmlFor="completed">Completed</label>
            </div>
          </div>
        </div>
        <div className={styles.form_actions}>
          <button
            type="button"
            onClick={onClose}
            className={`${styles.button} ${styles.cancel}`}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className={`${styles.button} ${
              isValid && !isSubmitting ? styles.save : styles.disabled
            }`}
          >
            Save
          </button>
        </div>
        {error && <p>Error: {error.message}</p>}
      </form>
    </div>
  );
}

export default CreateTask;
