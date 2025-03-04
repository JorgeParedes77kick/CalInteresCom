import { useFormik } from 'formik';
import { FormikInteresFormType, FormikSchemaInteresForm } from 'models/SchemaInteresForm';
import { useCallback, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { formatAmount } from 'utilities/amount.utility';

/* Formula de interes compuesto Capital final = C0 x (1+Ti) ^t
 */
export const useInteresFormik = () => {
  // const {
  //   control,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<InteresFormType>({
  //   resolver: zodResolver(SchemaInteresForm),
  //   mode: 'onBlur',
  // });

  const { values, errors, handleSubmit, handleChange } = useFormik({
    initialValues: {
      initialCapital: '' as string | number,
      annualContribution: '' as string | number,
      interestRate: '' as string | number,
      years: '' as string | number,
    },
    validate: (values) => {
      console.log(' values:', values);
      const result = FormikSchemaInteresForm.safeParse(values);
      if (result.success) return;
      console.log(result.error.issues);
      const errors: Record<string, string> = {};
      result.error.issues.forEach((error) => {
        errors[error.path[0]] = error.message;
      });
      return errors;
    },
    onSubmit: (values) => {
      onSubmit(values);
    },
  });
  const [total, setTotal] = useState<string>('');

  const calculateInterest = useCallback(
    (principal: number, annualAddition: number, timeYears: number, rate: number) => {
      // Formula: A = P(1 + r)^t + PMT * [((1 + r)^t - 1) / r]
      const compoundFactor = Math.pow(1 + rate, timeYears);
      const compoundedPrincipal = principal * compoundFactor;
      const compoundedContributions = annualAddition * ((compoundFactor - 1) / rate);
      return compoundedPrincipal + compoundedContributions;
    },
    [],
  );

  const onSubmit: SubmitHandler<FormikInteresFormType> = useCallback(
    (data: FormikInteresFormType) => {
      const { annualContribution, initialCapital, interestRate, years } = data;
      const annualContributionNumber = Number(annualContribution);
      const initialCapitalNumber = Number(initialCapital);
      const interestRateNumber = Number(interestRate);
      const yearsNumber = Number(years);
      const result = calculateInterest(
        initialCapitalNumber,
        annualContributionNumber,
        yearsNumber,
        interestRateNumber,
      );
      setTotal(formatAmount(result, 0, 2));
    },
    [calculateInterest],
  );

  return {
    formInteres: {
      values,
      handleSubmit,
      errors,
      onSubmit,
      handleChange,
    },

    total,
  };
};
