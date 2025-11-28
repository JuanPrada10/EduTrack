import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import NotFound from "@/pages/NotFound";

import Dashboard from "@/pages/dashboard/dashboard";
import Home from "@/pages/dashboard/Home";
import Profesores from "@/pages/dashboard/Profesores";
import Estudiantes from "@/pages/dashboard/Estudiantes";
import Feedback from "@/pages/dashboard/Feedback";
import { AuthProvider } from "@/context/AuthContext";

export default function AppRouter() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* AUTH */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* DASHBOARD */}
          <Route path="/home" element={<Dashboard />}>
            <Route index element={<Home />} />
            <Route path="profesores" element={<Profesores />} />
            <Route path="estudiantes" element={<Estudiantes />} />
            <Route path="feedback" element={<Feedback />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
