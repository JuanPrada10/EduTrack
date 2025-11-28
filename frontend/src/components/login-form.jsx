import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "@/context/context";
import { useEffect } from "react";

export function LoginForm({ className, ...props }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signIn, isAuthenticated, error, setError } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    setError("");
  }, [setError]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);
  const onSubmit = handleSubmit(async (values) => {
    signIn(values);
  });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Bienvenido</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={onSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Correo electrónico</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="text-sm text-red-600">
                    Este campo es obligatorio
                  </span>
                )}
              </Field>

              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Contraseña</FieldLabel>
                </div>
                <Input
                  type="password"
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <span className="text-sm text-red-600">
                    Este campo es obligatorio
                  </span>
                )}
                <a
                  href="#"
                  className="ml-auto text-sm underline-offset-4 hover:underline"
                >
                  Olvidaste tu contraseña?
                </a>
              </Field>

              <Field>
                <Button type="submit">Iniciar sesión</Button>

                <FieldDescription className="text-center">
                  No tienes una cuenta? <Link to="/register">Regístrate</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      {error && (
        <div className="text-sm text-red-600 text-center">
          {error && error === "Internal server error"
            ? "El correo o la contraseña son incorrectos"
            : error}
        </div>
      )}

      <FieldDescription className="px-6 text-center">
        Proyecto desarrollado para la gestión educativa EduTrack, creado por
        <a href="https://github.com/JuanPrada10/EduTrack.git" target="_blank">
          {" "}
          Cristian Romero y Juan Prada
        </a>
      </FieldDescription>
    </div>
  );
}
