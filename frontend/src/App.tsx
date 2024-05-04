import React from "react";
import "./App.scss";
import TaskDetailsModal from "./ui/views/TaskDetailsModal/TaskDetailsModal";
import TasksList from "./ui/views/TasksList/TasksList";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<TasksList />}>
          <Route path="task/:id" element={<TaskDetailsModal />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
