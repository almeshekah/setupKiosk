import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';
import {
  Layout,
} from 'antd';
import dayjs from 'dayjs';



import classes from './Layout.module.scss';

const { Content } = Layout;

const noLayoutLinks = ['unauthorized'];

export const MainLayout: FC = () => {
  const [showLayout, setShowLayout] = useState(true);
  const { i18n,  } = useTranslation();
  const { dir, language } = i18n;
  const { pathname } = location;



  useEffect(() => {
    if (language === 'ar') {
      dayjs.locale('ar-sa');
    } else {
      dayjs.locale();
    }
    document.body.dir = dir(language);
  }, [language]);

  useEffect(() => {
    setShowLayout(
      !pathname.split('/').some((p) => noLayoutLinks.some((l) => p.includes(l)))
    );
  }, [pathname]);

  if (!showLayout) {
    return (
      <Layout>
        <Layout className='bg-[#F6F2ED]'>
          <Content>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    );
  }

  return (
    <>
      <Layout>

        <Layout>
          
          <Content className={classes.content}>
            <div
              style={{
                flex: 'auto',
                display: 'flex',
                flexDirection: 'column',
              }}>
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};
