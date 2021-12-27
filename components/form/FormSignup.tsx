import { Obj } from 'utils/types';
import { useTranslation } from 'next-i18next';
import { Error } from 'components/text/Index';

export default function FormSignup({
  errors,
  success
}: {
  errors: Obj;
  success: String;
}) {
  const { t } = useTranslation('errors');

  return (
    <>
      <div className="form-floating mb-3">
        <input
          type="text"
          className={`form-control ${errors.firstname && 'is-invalid'}`}
          name="firstname"
          placeholder="firstname"
        />
        <label htmlFor="firstname">Prénom</label>
        <Error text={t(errors.firstname)} />
      </div>

      <div className="form-floating mb-3">
        <input
          type="text"
          className={`form-control ${errors.lastname && 'is-invalid'}`}
          name="lastname"
          placeholder="lastname"
        />
        <label htmlFor="lastname">Nom</label>
        <Error text={t(errors.lastname)} />
      </div>

      <div className="form-floating mb-3">
        <input
          type="email"
          className={`form-control ${errors.email && 'is-invalid'}`}
          name="email"
          placeholder="email"
        />
        <label htmlFor="email">Email</label>
        <Error text={t(errors.email)} />
      </div>

      <div className="form-floating mb-3">
        <input
          type="password"
          className={`form-control ${errors.password && 'is-invalid'}`}
          name="password"
          placeholder="password"
        />
        <label htmlFor="password">Mot de passe</label>
        <Error text={t(errors.password)} />
      </div>

      <div className="form-floating mb-3">
        <input
          type="password"
          className={`form-control ${errors.re_password && 'is-invalid'}`}
          name="re_password"
          placeholder="re_password"
        />
        <label htmlFor="re_password">Vérification du Mot de passe</label>
        <Error text={t(errors.re_password)} />
      </div>

      <button className="btn btn-primary" disabled={!!success}>
        Créer son compte
      </button>
    </>
  );
}
