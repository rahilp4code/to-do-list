import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import ProtectedRoute from "../auth/ProtectedRoute";
import Login from "../auth/Login";
import TodoPage from "./TodoApp"; // your dashboard

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login />} />

        {/* Protected */}
        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <TodoPage />
            </ProtectedRoute>
          }
        />

        {/* Default redirect */}
        <Route path="*" element={<Navigate to="/app" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
