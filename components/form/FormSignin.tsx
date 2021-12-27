import { useTranslation } from 'next-i18next';
import { Obj } from 'utils/types';
import { Error } from 'components/text/Index';

export default function FormSignup({ errors }: { errors: Obj }) {
  const { t } = useTranslation('errors');
  console.log(errors);
  return (
    <>
      <div className="form-floating mb-3">
        <input
          type="email"
          className={`form-control ${errors.user && 'is-invalid'}`}
          name="email"
          placeholder="email"
        />
        <label htmlFor="email">Email</label>
      </div>

      <div className="form-floating mb-3">
        <input
          type="password"
          className={`form-control ${errors.user && 'is-invalid'}`}
          name="password"
          placeholder="password"
        />
        <label htmlFor="password">Mot de passe</label>
      </div>
      <Error text={t(errors.user)} />
      <button className="btn btn-primary">Identification</button>
    </>
  );
}
