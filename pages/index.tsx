import type { NextPage, GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next'

import styles from '../styles/Home.module.css';
import Layout from 'components/Layout';
import getTranslations from 'utils/getTranslations';
import { withSessionSsr } from 'lib/session';
import { Obj } from 'utils/types';

export const getServerSideProps: GetServerSideProps = withSessionSsr(getTranslations(async ({req}) => {
  return { props: { user: req.session?.user || null} }
}));

const Home: NextPage<Obj> = (props) => {
  const {locale, locales, asPath} = useRouter();
  const { t } = useTranslation('common');

  return (
    <Layout>
      <div className={styles.container}>
        locale: {locale}, locales : {locales}, asPath: {asPath}
        <h1>{t('h1')}</h1>
        User : {JSON.stringify(props.user)}
      </div>
    </Layout>
  )
}

export default Home
