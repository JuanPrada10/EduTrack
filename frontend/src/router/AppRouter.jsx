import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import NotFound from "@/pages/NotFound";
import Dashboard from "@/pages/dashboard/dashboard";

export default function AppRouter() {
  return (
    <BrowserRouter>
        <Routes>
            { /* AUTH */ }
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/home" element={<Dashboard />} />

            { /* 404 */ }
            <Route path="*" element={<NotFound />} />
        </Routes>            
    </BrowserRouter>
  );
}
