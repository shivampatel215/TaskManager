import React from "react";
import styles from "./TaskHeader.module.scss";
import { CheckCircledIcon } from "@radix-ui/react-icons";

interface TaskHeaderProps {
  count: number;
}
function TaskHeader({ count }: TaskHeaderProps) {
  return (
    <div className={styles.header_container}>
      <div className={styles.header}>Tasks</div>
      <div className={styles.subheader}>
        <CheckCircledIcon className={styles.circle_check} />
        {count} tasks
      </div>
    </div>
  );
}

export default TaskHeader;
