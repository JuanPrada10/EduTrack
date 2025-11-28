"use client"

import { DataTable } from "./data-table"
import { columns } from "./columns"

export default function Profesores() {
  // Datos de ejemplo (puedes reemplazarlos luego por tu API)
  const profesores = [
    { id: 1, nombre: "Carlos Pérez", email: "carlos@colegio.edu", materia: "Matemáticas" },
    { id: 2, nombre: "Ana Ruiz", email: "ana@colegio.edu", materia: "Lengua" },
    { id: 3, nombre: "Luis Gómez", email: "luis@colegio.edu", materia: "Historia" },
  ]

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Gestión de Profesores</h1>

      <DataTable columns={columns} data={profesores} />
    </div>
  )
}
