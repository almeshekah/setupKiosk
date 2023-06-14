import { FC } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';

interface RouteGuardProps {
  component: JSX.Element;
  title?: string;
}

export const PrivateRoute: FC<RouteGuardProps> = ({
  component,
  title,
}: RouteGuardProps) => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <meta charSet='utf-8' />
        {title && <title>{t(title)}</title>}
      </Helmet>
      {component}
    </>
  );
};
