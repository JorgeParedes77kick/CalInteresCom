import { z } from 'zod';

export const schemaCustomForm = z
  .object({
    name: z.string().min(1, 'El nombre es requerido'),
    email: z.string().email('El email no es valido').min(1, 'El email es requerido'),
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
    confirmPassword: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  });

export type FormValuesForm = z.infer<typeof schemaCustomForm>;
