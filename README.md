# README

# Task Management Application

This is a simple task management application built with Rails 7, GraphQL, React, and TypeScript. It allows users to create, read, update, and delete tasks.

# Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Backend Setup](#backend-setup)
  - [Running Tests](#running-tests)
  - [Frontend Setup](#frontend-setup)
- [Project Structure and Explanation](#project-structure-and-explanation)

  - [Backend Structure](#backend-structure)
  - [Frontend Structure](#frontend-structure--components)

- [Additional Information](#additional-information)

## Features

- Backend API built with Rails 7 and GraphQL
- Frontend user interface built with React and TypeScript
- PostgreSQL database for data persistence
- CRUD operations for tasks
- Basic user interface design and user experience
- Basic security practices implemented

## Prerequisites

- Ruby [3.2.4]

- Node.js [version]
- PostgreSQL [9.3^] (https://www.postgresql.org/docs/current/tutorial-install.html)
- React [18.2^]

## Getting Started

### Backend Setup

1. Check your Ruby version (3.2.4) & install rails if you don't have it:

```bash
ruby-v
gem install rails
```

2. Clone the repository

3. Install dependencies

```bash
bundle install
```

4. Set up the database:

Before running the database setup commands, make sure you have PostgreSQL installed and configured properly.

If your PostgreSQL setup requires a username and password, you can set them using environment variables or directly change them in `config/db/database.yml`:

```bash
export PGUSER="$REPLACE_WITH_YOUR_LOCAL_DB_USER"
export PGPASSWORD="$REPLACE_WITH_YOUR_LOCAL_DB_PASSWORD"
```

Once the database connection is configured, run the following commands to set up the database:

```bash
rails db:create
rails db:migrate
rails db:seed
```

5. Start the server

```bash
rails s -p 3001

```

### Running Tests

Our application uses two testing frameworks: MiniTest for model tests and RSpec for GraphQL endpoint tests.

#### MiniTest

To run tests written in MiniTest (located in the `test` directory), use the following command:

```bash
rails test
```

#### Rspec Tests

To run Rspec tests (located in the `spec` directory), use the following command:

```bash
bundle exec rspec
```

#### GraphIQL

You can access the graphiql playground here once the server is running:

(http:localhost:3001/graphiql)

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the frontend server

```bash
npm run dev
```

### Frontend Tests

While I have not included a full suite of tests for the frontend, I did include one as an example of a component specific unit test. The test is located in `frontend/tests` and can be run with the following command:

```bash
npm test
```

## Project Structure and Explanation

### Backend Structure

The root directory contains the rails application with the following structure:

- `app/`: Contains the models, controllers, GraphQL types and resolvers
  - `models/`: Defines the database models (in this case just the Task model) and their associations
  - `controllers/`: Handles the incoming requests and defines the actions within graphql_controller.rb
  - `graphql/`: Contains the GraphQL schema, types, and resolvers.
    - Queries: `/types/query_type`;
    - Types: `/types/task_type` & `/types/create_task_input_type`;
    - Mutations: `/mutations`
- `db/`: Contains the database migrations and seeds.
  - `migrate/`: Defines the database migration files for creating and modifying database tables
  - `seeds.rb`: Contains the seed data for initializing the database with sample records
- `config/`: Contains the configuration files for the Rails application.
  - `routes.rb`: Defines the application routes and maps them to controller actions.
  - `database.yml`: Specifies the database configuration for different environments.
- `spec/`: Contains the RSpec tests for the GraphQL endpoints.
- `test/`: Contains the MiniTest tests for the models.

### Frontend Structure + Components

The frontend directory contains the React Application and follows a modular and organized structure. The main entrypoint of the application is `src/main.tsx`, which renders the root component defined in `src/App.tsx`. In general, the interface has an emphasis on simplicity and ease of use. There are two main routes - '/' and '/task/:id' each representing a home page and detailed task view page.

- `src/`: Contains the source code for the React components and pages. It is split up into 4 main folders to maintain cleanliness and structure:
  - `shared/`: Contains shared resources and utilities used throughout the frontend application.
    - `graphql/`: Contains GraphQL queries, mutations, and related configuration files for communicating with the backend API.
    - `models`: Defines TypeScript interfaces and types for the Task Model.
    - `utils/`: Contains utility functions and helpers used across the application.
  - `styles/`: Contains all global styles, specifically mixins and variables that are used across the SCSS files. Helps keep individual stylesheets clean and readable, and helps maintain consistency throughout the app.
  - `tests/`: Contains all tests. In the interest of time, I was only able to include one test (for TaskItem), as an example of what I would include.
  - `ui`: Contains all the views, and components of the application. It follows a modular approach where each view corresponds to a unique route in the application.
    - `components`: Represents reusable components that can be used throughout all of the views.
      - CreateTaskForm: Represents a form for creating or editing a task. For the sake of reusability and cleanliness, this form is reused for both updating or creating a new task.
    - `views/`: Contains individual view components, each representing a specific route.
      - `TasksList`: Represents the home page of the app. It is the main view where a user can view all of their tasks, and perform certain actions or mutations. From this page a user can create, edit, or delete a given task. Inside of TasksList are TaskHeader & TaskItem.
      - `TaskDetailsModal`: Represents the task details view, showing detailed infromation about a specific task. When a user clicks on a given task item, it will open up a modal to show a more detailed view with a unique route for that task. If they close the modal it takes them back to '/' where they can see all of their tasks again.

Additional information related to decisions that were made and challenges faced can be found in the reflection here:
[Reflection](https://beryl-relation-603.notion.site/Task-Manager-Reflections-f7f16dcbe2da4142984bf2c030d5e92f)

## Additional Information
