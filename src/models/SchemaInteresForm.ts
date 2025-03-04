import { z } from 'zod';

const numberSchema = (fieldName: string) =>
  z.number({ required_error: `${fieldName} es requerido` });

export const SchemaInteresForm = z.object({
  initialCapital: numberSchema('El capital inicial'),
  annualContribution: numberSchema('La contribución anual'),
  interestRate: numberSchema('La tasa de interés'),
  years: numberSchema('Los años'),
});

export type InteresFormType = z.infer<typeof SchemaInteresForm>;

const numberOrStringSchema = (fieldName: string) =>
  z.union([
    z
      .string({ required_error: `${fieldName} es requerido` })
      .regex(/^\d+(\.\d+)?$/, `${fieldName} debe ser un número`),
    z.number({ required_error: `${fieldName} es requerido` }),
  ]);

export const FormikSchemaInteresForm = z.object({
  initialCapital: numberOrStringSchema('El capital inicial'),
  annualContribution: numberOrStringSchema('La contribución anual'),
  interestRate: numberOrStringSchema('La tasa de interés'),
  years: numberOrStringSchema('Los años'),
});

export type FormikInteresFormType = z.infer<typeof FormikSchemaInteresForm>;
