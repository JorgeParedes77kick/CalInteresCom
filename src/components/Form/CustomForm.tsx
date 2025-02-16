import { zodResolver } from '@hookform/resolvers/zod';
import { InputForm } from 'components/Form/InputForm';
import { SubmitHandler, useForm } from 'react-hook-form';

import { FormValuesForm, schemaCustomForm } from 'models/SchemaCustomForm';
import './styles.scss';

export const CustomForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValuesForm>({
    resolver: zodResolver(schemaCustomForm),
  });

  const onSubmit: SubmitHandler<FormValuesForm> = (data: FormValuesForm) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputForm name={'name'} label={'Nombre'} control={control} error={errors?.name} />
      <InputForm
        name={'email'}
        label={'Email'}
        type="email"
        control={control}
        error={errors?.email}
      />
      <InputForm
        name={'password'}
        label={'Contraseña'}
        type="password"
        control={control}
        error={errors?.password}
      />
      <InputForm
        name={'confirmPassword'}
        label={'Confirmar Contraseña'}
        type="password"
        control={control}
        error={errors?.confirmPassword}
      />
      <button type="submit" className="btn btn-primary">
        Enviar
      </button>
    </form>
  );
};
