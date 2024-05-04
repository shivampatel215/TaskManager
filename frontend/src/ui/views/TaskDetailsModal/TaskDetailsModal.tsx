import React from "react";
import { useQuery } from "@apollo/client";
import { useParams, useNavigate } from "react-router-dom";
import { GET_TASK_BY_ID } from "../../../shared/graphql/queries";
import styles from "./TaskDetailsModal.module.scss";
import { Cross1Icon } from "@radix-ui/react-icons";
import { DateFormat } from "../../../shared/utils/DateFormat";

function TaskDetailsModal() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(GET_TASK_BY_ID, {
    variables: { id },
  });

  const handleClose = () => {
    navigate(-1);
  };

  if (loading) return <p>Loading task details...</p>;
  if (error) {
    console.error(error);
    if (error.message.includes("Task not found")) {
      return <p>Task Not Found</p>;
    } else {
      return <p>Error loading details</p>;
    }
  }
  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <button onClick={handleClose} className={styles.close_button}>
            <Cross1Icon className={styles.crossIcon} />
          </button>
        </div>
        <div className={styles.task_details_container}>
          <div className={styles.row}>
            <div className={styles.check_container}>
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={data.task.completed}
                readOnly={true}
              />
              <div className={styles.title}>{data.task.title}</div>
            </div>
            <div className={styles.date}>{DateFormat(data.task.dueDate)}</div>
          </div>
          <div className={styles.description}>{data.task.description}</div>
        </div>
      </div>
    </div>
  );
}

export default TaskDetailsModal;
