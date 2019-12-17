import React from 'react';
import { Link } from 'gatsby';

import './layout.css';

const Layout = ({ children }) => (
  <>
    <header>
      <Link to="/">Video chat app</Link>
    </header>
    <main>{children}</main>
  </>
);

export default Layout;
