import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "@/context/context";
import { useNavigate } from "react-router-dom";

export function SignupForm({ className, ...props }) {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm();
  const { signUp, error, setError } = useAuth();
  const [rol, setRol] = useState("");
  const navigate = useNavigate();
  const handlerChangeRol = (value) => {
    setRol(value);
    setValue("rol", value);
  };

  const onSubmit = handleSubmit(async (data) => {
    const created = await signUp(data);
    if (created) {
      navigate("/");
    }
  });
  useEffect(() => {
    setError("");
  }, [setError]);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Crea tu cuenta</CardTitle>
          <CardDescription>
            Ingresa tu correo electrónico para crear tu cuenta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Nombre completo</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  placeholder="Juan Pérez"
                  {...register("fullName", { required: true })}
                />
                {errors.fullName && (
                  <span className="text-sm text-red-600">
                    Este campo es obligatorio
                  </span>
                )}
              </Field>
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
                <Field className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="password">Contraseña</FieldLabel>
                    <Input
                      id="password"
                      type="password"
                      {...register("password", { required: true })}
                    />
                    {errors.password && (
                      <span className="text-sm text-red-600">
                        Este campo es obligatorio
                      </span>
                    )}
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirm-password">
                      Confirmar contraseña
                    </FieldLabel>
                    <Input
                      id="confirm-password"
                      type="password"
                      {...register("confirmPassword", { required: true })}
                    />
                    {errors.confirmPassword && (
                      <span className="text-sm text-red-600">
                        Este campo es obligatorio
                      </span>
                    )}
                  </Field>
                </Field>
                <FieldDescription>
                  Debe tener al menos 8 caracteres.
                </FieldDescription>
              </Field>
              <Field>
                <FieldLabel htmlFor="rol">Rol</FieldLabel>
                <Select onValueChange={(value) => handlerChangeRol(value)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Seleccione un Rol" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel htmlFor="rol">Roles</SelectLabel>
                      <SelectItem value="estudiante">Estudiante</SelectItem>
                      <SelectItem value="profesor">Profesor</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {errors.rol && (
                  <span className="text-sm text-red-600">
                    Este campo es obligatorio
                  </span>
                )}
              </Field>
              {rol === "profesor" && (
                <Field>
                  <FieldLabel htmlFor="especialidad">Especialidad</FieldLabel>
                  <Input
                    id="especialidad"
                    type="text"
                    placeholder="Matemáticas"
                    {...register("especialidad", { required: true })}
                  />
                </Field>
              )}
              {errors.especialidad && (
                <span className="text-sm text-red-600">
                  Este campo es obligatorio
                </span>
              )}
              {rol === "estudiante" && (
                <Field>
                  <FieldLabel htmlFor="year">Año de Ingreso</FieldLabel>
                  <Input
                    id="year"
                    type="number"
                    placeholder="2023"
                    {...register("year", { required: true })}
                  />
                </Field>
              )}
              {errors.year && (
                <span className="text-sm text-red-600">
                  Este campo es obligatorio
                </span>
              )}
              <Field>
                <Button type="submit">Crear cuenta</Button>
                <FieldDescription className="text-center">
                  ¿Ya tienes una cuenta? <Link to="/">Iniciar sesión</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      {error && (
        <div className="text-sm text-red-600 text-center">{error && error}</div>
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
