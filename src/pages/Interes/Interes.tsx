import { Button } from 'components/Button/Button';
import { Card } from 'components/Card/Card';
import { CurrencyInput } from 'components/Form/CurrencyInput';
import { useInteres } from 'pages/Interes/useInteres';

const Interes = () => {
  const {
    formInteres: { control, errors, handleSubmit, onSubmit },
    total,
  } = useInteres();

  return (
    <div className="d-flex justify-center" style={{ marginTop: '2rem' }}>
      <Card header={'Calculadora de interés compuesto'} style={{ width: 'fit-content' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CurrencyInput
            name={'initialCapital'}
            label={'Capital Inicial'}
            control={control}
            error={errors?.initialCapital}
            autoComplete="off"
          />
          <CurrencyInput
            name={'annualContribution'}
            label={'Contribución Anual'}
            control={control}
            error={errors?.annualContribution}
            autoComplete="off"
          />

          <CurrencyInput
            name={'years'}
            label={'Años'}
            control={control}
            error={errors?.years}
            autoComplete="off"
            symbol=""
          />
          <CurrencyInput
            name={'interestRate'}
            label={'Interes Estimado'}
            control={control}
            error={errors?.interestRate}
            autoComplete="off"
            symbol=""
          />
          <div className="d-flex justify-between">
            <h3>{total}</h3>
            <Button>Calcular</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Interes;
