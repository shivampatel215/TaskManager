import { gql } from "@apollo/client";

export const GET_ALL_TASKS = gql`
  query GetAllTasks {
    allTasks {
      id
      title
      description
      completed
      dueDate
    }
  }
`;

export const CREATE_TASK = gql`
  mutation CreateTask($input: CreateTaskInput!) {
    createTask(input: $input) {
      task {
        id
        title
        description
        dueDate
        completed
      }
      errors
    }
  }
`;

export const GET_TASK_BY_ID = gql`
  query GetTaskById($id: ID!) {
    task(id: $id) {
      id
      title
      description
      completed
      dueDate
    }
  }
`;

export const UPDATE_TASK = gql`
  mutation UpdateTask(
    $id: ID!
    $title: String
    $description: String
    $completed: Boolean
    $dueDate: ISO8601Date
  ) {
    updateTask(
      id: $id
      title: $title
      description: $description
      completed: $completed
      dueDate: $dueDate
    ) {
      task {
        id
        title
        description
        completed
        dueDate
      }
      errors
    }
  }
`;

export const DELETE_TASK = gql`
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id) {
      id
    }
  }
`;
