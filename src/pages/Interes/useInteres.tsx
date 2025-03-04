import { zodResolver } from '@hookform/resolvers/zod';
import { InteresFormType, SchemaInteresForm } from 'models/SchemaInteresForm';
import { useCallback, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { formatAmount, parseAmount } from 'utilities/amount.utility';

/* Formula de interes compuesto Capital final = C0 x (1+Ti) ^t
 */
export const useInteres = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<InteresFormType>({
    resolver: zodResolver(SchemaInteresForm),
    mode: 'onBlur',
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

  const onSubmit: SubmitHandler<InteresFormType> = useCallback(
    (data: InteresFormType) => {
      const { annualContribution, initialCapital, interestRate, years } = data;
      const annualContributionNumber = parseAmount(annualContribution);
      const initialCapitalNumber = parseAmount(initialCapital);
      const interestRateNumber = parseAmount(interestRate);
      const yearsNumber = parseAmount(years);
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

  // const formInteres = useMemo(() => ({
  //   control,
  //   handleSubmit,
  //   errors,
  //   onSubmit,
  // }), [control, handleSubmit, errors, onSubmit]);

  return {
    formInteres: {
      control,
      handleSubmit,
      errors,
      onSubmit,
    },
    total,
  };
};
