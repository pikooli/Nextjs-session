import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import Layout from 'components/Layout';
import { FormEvent } from "react";
import { withSessionSsr } from "lib/session";

import styles from '../styles/Home.module.css';
import prisma from 'lib/prisma';
import bcrypt  from 'bcryptjs';
import Form from 'components/Form';

export const getServerSideProps: GetServerSideProps = withSessionSsr(async function getServerSideProps({ req }) {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true

    }
  });
  const salt = await bcrypt.genSaltSync(10);
  const hash = await bcrypt.hashSync("aaa", salt);
  return { props: { users, salt, hash } };
})

type UserProps = {
  id:     number;
  email:  string;
  name?:   string;
};

type Props = {
  users: UserProps[],
  hash: string,
  salt: string
};

const Home: NextPage<Props> = (props) => {
  const { users, salt, hash } = props;
  const onSubmit = (e:FormEvent) => {
    e.preventDefault();
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: 'test@gmail.com', password: 'aaa' })}
      ).then(res => console.log(res));
  }

  return (
    <Layout>
      <div className={styles.container}>
        <Form onSubmit={onSubmit} errorMessage=''/>
        <p>SALT: {props.salt}</p>
        <p>HASH: {props.hash}</p>
        {users.map((user, idx) => <p key={idx}>{user.id} {user.email}</p>)}
      </div>
    </Layout>
  )
}

export default Home
