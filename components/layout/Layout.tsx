import MainNavigation from './MainNavigation';
import classes from './Layout.module.css';
import { ReactElement } from 'react';

function Layout(params: { children: ReactElement }) {
  return (
    <div>
      <MainNavigation />
      <main className={classes.main}>{params.children}</main>
    </div>
  );
}

export default Layout;
