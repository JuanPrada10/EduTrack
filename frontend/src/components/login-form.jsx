import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Link, useNavigate } from "react-router-dom"

export function LoginForm({ className, ...props }) {
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    // Aquí luego validas contra el backend, pero por ahora simulamos login exitoso
    navigate("/home")
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Bienvenido</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Correo electrónico</FieldLabel>
                <Input id="email" type="email" placeholder="m@example.com" />
              </Field>

              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Contraseña</FieldLabel>
                  <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
                    Olvidaste tu contraseña?
                  </a>
                </div>
                <Input id="password" type="password" />
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

      <FieldDescription className="px-6 text-center">
        Proyecto desarrollado para la gestión educativa EduTrack, creado por
        <a href="https://github.com/JuanPrada10/EduTrack.git" target="_blank"> Cristian Romero y Juan Prada</a>
      </FieldDescription>
    </div>
  )
}
