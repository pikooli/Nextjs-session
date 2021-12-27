import { useTranslation } from 'next-i18next';
import Link from 'next/link';

export default function Navbar() {
  const { t } = useTranslation('navbar');
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-lightblue">
      <div className="container-fluid">
        <Link href="/">
          <a className="navbar-brand">{t('title')}</a>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link href="/signup">
                <a className="nav-link" aria-current="page">
                  {t('signup')}
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/signin">
                <a className="nav-link" aria-current="page">
                  {t('signin')}
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
