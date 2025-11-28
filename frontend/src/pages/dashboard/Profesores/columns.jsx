"use client"

import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export const columns = [
  {
    accessorKey: "nombre",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Nombre del estudiante
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "materia",
    header: "Materia",
  },
  {
    accessorKey: "nota",
    header: "Nota",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const profesor = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>

            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(profesor.email)}
            >
              Copiar email
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={() => alert(`Editar ${profesor.nombre}`)}
            >
              Editar Nota
            </DropdownMenuItem>

          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
