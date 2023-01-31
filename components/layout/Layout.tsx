import MainNavigation from './MainNavigation';
import classes from './Layout.module.scss';
import { ReactElement } from 'react';

function Layout(params: { children: ReactElement }) {
  return (
    <div className=''>
      <MainNavigation />
      <main className={classes.main}>{params.children}</main>
    </div>
  );
}

export default Layout;
