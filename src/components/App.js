// import { useState } from "react";

// import Form from "./Form";
// import List from "./List";
// import Stat from "./Stat";
// import Login from "./Login";

// import { Routes, Route, Navigate } from "react-router-dom";

// function App() {
//   const [task, addTask] = useState([]);
//   function clearAll() {
//     const confirm = window.confirm("Are you sure about that");
//     if (confirm) addTask([]);
//   }
//   function handleTask(item) {
//     addTask((items) => [...items, item]);
//   }
//   function handleDeleteTask(id) {
//     addTask((items) => items.filter((item) => item.id !== id));
//   }
//   function handleCheckbox(id) {
//     addTask((items) =>
//       items.map((item) =>
//         item.id === id ? { ...item, done: !item.done } : item
//       )
//     );
//   }
//   return (
//     <>
//       <Login />
//       <div className="app">
//         <Form addTask={handleTask} />
//         <List
//           tasks={task}
//           onDeleteTask={handleDeleteTask}
//           checkBox={handleCheckbox}
//           clearAll={clearAll}
//         />
//         <Stat task={task} />
//       </div>
//     </>
//   );
// }

// export default App;

import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Form from "./Form";
import List from "./List";
import Stat from "./Stat";
import Login from "./Login";

function App() {
  const [task, addTask] = useState([]);

  function clearAll() {
    const confirm = window.confirm("Are you sure about that");
    if (confirm) addTask([]);
  }

  function handleTask(item) {
    addTask((items) => [...items, item]);
  }

  function handleDeleteTask(id) {
    addTask((items) => items.filter((item) => item.id !== id));
  }

  function handleCheckbox(id) {
    addTask((items) =>
      items.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    );
  }

  // Main app UI (extracted for clarity)
  const TodoApp = () => (
    <div className="app">
      <Form addTask={handleTask} />
      <List
        tasks={task}
        onDeleteTask={handleDeleteTask}
        checkBox={handleCheckbox}
        clearAll={clearAll}
      />
      <Stat task={task} />
    </div>
  );

  return (
    <Routes>
      {/* Login route */}
      <Route path="/login" element={<Login />} />

      {/* Todo App route */}
      <Route path="/app" element={<TodoApp />} />

      {/* Redirect any unknown path to /login */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;

//
//83 delete button work krneke liye pehle function then usko pass kiya child meh,
//84 checkbox banaya
//85 derived state
//86 using derived state to implement the footer data
//87 made sorting selection
//88 clear button
//89 component seperation and refractoring
//90 exercise
//91 chilren prop
