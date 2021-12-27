import React, { useState } from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';

import Layout from 'components/Layout';
import { FormSignup } from 'components/form/Index';
import getTranslations from 'utils/getTranslations';
import request from 'utils/request';
import formUtils from 'utils/formUtils';
import { Success } from 'components/text/Index';

export const getServerSideProps: GetServerSideProps = getTranslations([
  'success',
  'errors'
]);

const Signup: NextPage = (props) => {
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const { t } = useTranslation('success');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { action } = e.currentTarget;
    if (e.currentTarget.password.value !== e.currentTarget.re_password.value) {
      setErrors({ re_password: 'notsame' });
    }

    request({
      url: action,
      method: 'POST',
      body: formUtils.getValues(e.currentTarget)
    }).then(async (res) => {
      if (res.status === 200) {
        return setSuccess('success.signup');
      }
      const errors = await res.json();
      setErrors(errors);
    });
  };

  return (
    <Layout>
      <Head>
        <title>YoungDoc - Signup</title>
      </Head>
      <div className="container">
        <div className="mt-5">
          <form onSubmit={onSubmit} action="/api/signup" method="POST">
            <Success text={t(success)} />
            <FormSignup errors={errors} success={success} />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
