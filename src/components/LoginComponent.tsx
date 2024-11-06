"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { AlertCircle } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email({ message: "Ingrese un email válido" }),
  password: z
    .string()
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginFormValues) {
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(
        "http://172.21.234.224:3001/api/auth/user/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      if (response.status === 201) {
        setSuccess("Inicio de sesión exitoso");
      } else if (result.message === "Error email not Found") {
        setError("El email ingresado no está registrado. Por favor, verifique o cree una cuenta.");
      } else if (result.message === "Password Incorrect") {
        setError("La contraseña ingresada es incorrecta. Por favor, intente nuevamente.");
      } else {
        setError("Ha ocurrido un error inesperado. Por favor, intente más tarde.");
      }

      console.log(result);
    } catch (error) {
      console.error(error);
      setError("Error de conexión. Por favor, verifique su conexión a internet e intente nuevamente.");
    }
  }

  return (
    <div className="container mx-auto mt-8 p-4">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Iniciar sesión</CardTitle>
          <CardDescription>Ingresa a tu cuenta de CompuTrabajo</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert variant="default" className="mb-4 bg-green-100 text-green-800 border-green-300">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Éxito</AlertTitle>
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="tu@email.com" {...field} />
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
              <Button type="submit" className="w-full">
                Iniciar sesión
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600">
            ¿No tienes una cuenta?{" "}
            <a href="/register/user" className="text-blue-600 hover:underline">
              Regístrate
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
