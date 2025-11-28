import { useState, useEffect } from "react";
import { LoginRequest, RegisterRequest, createTipoUsuario } from "@/api/auth";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "@/context/context";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
        setIsAuthenticated(true);
      } catch (e) {
        console.error("Token inválido al inicializar:", e);
        localStorage.removeItem("token");
        setUser(null);
        setIsAuthenticated(false);
      }
    }
  }, []);

  const signIn = async (credencials) => {
    try {
      const res = await LoginRequest(credencials);
      const { token } = res.data;
      localStorage.setItem("token", token);
      const decoded = jwtDecode(token);
      console.log(decoded);
      setUser(decoded);
      setIsAuthenticated(true);
    } catch (e) {
      setError(e.response.data.message);
      console.log(error);
    }
  };

  const signUp = async (user) => {
    try {
      const createUser = {
        fullName: user.fullName,
        email: user.email,
        password: user.password,
        rol: user.rol,
      };

      const res = await RegisterRequest(createUser);

      if (res.status !== 201) {
        throw new Error("Error al registrar el usuario");
      }

      const newProfesor = {
        especialidad: user.especialidad,
        usuarioId: res.data.user.id,
      };
      const newEstudiante = {
        ano_ingreso: user.year,
        usuarioId: res.data.user.id,
      };
      const resTipoUsuario = await createTipoUsuario(
        user.rol === "profesor" ? newProfesor : newEstudiante,
        user.rol
      );

      if (resTipoUsuario.status !== 201) {
        throw new Error("Error al registrar el tipo de usuario");
      }
      console.log(resTipoUsuario);
      if (res.status === 201 && resTipoUsuario.status === 201) {
        return true;
      }
      return false;
    } catch (e) {
      const msg = e?.response?.data?.message ?? e.message ?? String(e);
      setError(msg);
      console.error(e);
    }
  };

  const signOut = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);
  };
  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        user,
        isAuthenticated,
        signUp,
        error,
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
