import React, { useState } from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import Layout from 'components/Layout';
import { FormSignin } from 'components/form/Index';
import getTranslations from 'utils/getTranslations';
import request from 'utils/request';
import formUtils from 'utils/formUtils';

export const getServerSideProps: GetServerSideProps = getTranslations();

const Signin: NextPage = (props) => {
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { action } = e.currentTarget;
    if (!e.currentTarget.email.value || !e.currentTarget.password.value) {
      return;
    }
    request({
      url: action,
      method: 'POST',
      body: formUtils.getValues(e.currentTarget)
    }).then(async (res) => {
      if (res.status === 200) {
        return router.push('/');
      }
      const errors = await res.json();
      setErrors(errors);
    });
  };

  return (
    <Layout>
      <Head>
        <title>YoungDoc - Signin</title>
      </Head>
      <div className="container">
        <div className="mt-5">
          <form onSubmit={onSubmit} action="/api/signin" method="POST">
            <FormSignin errors={errors} />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Signin;
