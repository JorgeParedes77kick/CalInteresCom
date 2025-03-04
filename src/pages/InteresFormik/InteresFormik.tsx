import { Button } from 'components/Button/Button';
import { Card } from 'components/Card/Card';
import { FormikCurrencyInput } from 'components/Form/FormikCurrencyInput';
import { useInteresFormik } from 'pages/InteresFormik/useInteresFormik';

const InteresFormik = () => {
  const {
    formInteres: { values, errors, handleSubmit, onSubmit, handleChange },
    total,
  } = useInteresFormik();

  return (
    <div className="d-flex justify-center" style={{ marginTop: '2rem' }}>
      <Card header={'Calculadora de interés compuesto'} style={{ width: 'fit-content' }}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
          }}
        >
          <FormikCurrencyInput
            name={'initialCapital'}
            label={'Capital Inicial'}
            error={errors?.initialCapital}
            autoComplete="off"
            value={values.initialCapital}
            onChange={handleChange}
          />
          <FormikCurrencyInput
            name={'annualContribution'}
            label={'Contribución Anual'}
            error={errors?.annualContribution}
            autoComplete="off"
            value={values.annualContribution}
            onChange={handleChange}
          />

          <FormikCurrencyInput
            name={'years'}
            label={'Años'}
            error={errors?.years}
            autoComplete="off"
            symbol=""
            value={values.years}
            onChange={handleChange}
          />
          <FormikCurrencyInput
            name={'interestRate'}
            label={'Interes Estimado'}
            error={errors?.interestRate}
            autoComplete="off"
            symbol=""
            value={values.interestRate}
            onChange={handleChange}
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

export default InteresFormik;
