"use client";

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../components/ui/card"

const registerCompanySchema = z.object({
  name: z.string().min(2, { message: "El nombre de la empresa debe tener al menos 2 caracteres" }),
  nit: z.string().min(9, { message: "El NIT debe tener al menos 9 caracteres" }),
  email: z.string().email({ message: "Ingrese un email válido" }),
  password: z.string().min(8, { message: "La contraseña debe tener al menos 8 caracteres" }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
})

type RegisterCompanyFormValues = z.infer<typeof registerCompanySchema>

export default function RegCompanyComponent() {
  const form = useForm<RegisterCompanyFormValues>({
    resolver: zodResolver(registerCompanySchema),
    defaultValues: {
      name: "",
      nit: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  function onSubmit(data: RegisterCompanyFormValues) {
    console.log(data)
    // Aquí iría la lógica para enviar los datos al servidor
  }

  return (
    <div className="container mx-auto mt-8 p-4">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Registro de Empresa</CardTitle>
          <CardDescription>Crea una cuenta para tu empresa en CompuTrabajo</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre de la Empresa</FormLabel>
                    <FormControl>
                      <Input placeholder="Empresa S.A." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>NIT</FormLabel>
                    <FormControl>
                      <Input placeholder="123456789-0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="empresa@ejemplo.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar Contraseña</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">Registrar Empresa</Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600">
            ¿Ya tienes una cuenta? <a href="/login" className="text-blue-600 hover:underline">Inicia sesión</a>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}