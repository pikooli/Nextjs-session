import React, { ReactNode } from 'react';
import Header from 'components/Header';
import Navbar from 'components/Navbar';

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
  <div>
    <Header />
    <Navbar />
    {props.children}
  </div>
);

export default Layout;
