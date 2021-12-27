// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextApiHandler
} from 'next';
import type { IronSessionOptions } from 'iron-session';
import { withIronSessionSsr, withIronSessionApiRoute } from 'iron-session/next';
import type { User } from 'utils/types';

// This is where we specify the typings of req.session.*
declare module 'iron-session' {
  interface IronSessionData {
    user?: User;
  }
}

export const sessionOptions: IronSessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD as string,
  cookieName: 'youngdoc',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production'
  }
};

// this if for the api router
export function withSessionRoute(handler: NextApiHandler) {
  return withIronSessionApiRoute(handler, sessionOptions);
}

// this if for the page router
export function withSessionSsr<
  P extends { [key: string]: unknown } = { [key: string]: unknown }
>(
  handler: (
    context: GetServerSidePropsContext
  ) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>
) {
  return withIronSessionSsr(handler, sessionOptions);
}
