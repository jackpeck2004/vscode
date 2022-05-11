import { AdminTable } from 'components/AdminTable';
import { useAuth } from 'hooks/useAuth';
import { SERVER_URI } from 'lib/constants';
import { Pr } from 'lib/types';
import Error from 'next/error';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FC, useState } from 'react';
import { AdminLayout } from 'components/AdminLayout';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const res = await fetch(`${SERVER_URI}/prs`);
  const prs: Pr[] = await res.json();
  return {
    props: {
      prs,
    },
  };
};

const DashboardPage: FC<{prs: Pr[] }> = ({ prs }) => {
  return <AdminTable prs={prs} />;
}

const ProfilePage: FC = () => {
  const user = useAuth();

  return <pre>{JSON.stringify(user, null, 2)}</pre>;
};

export default function AdminPage({ prs }: { prs: Pr[] }) {
  const user = useAuth();
  const router = useRouter();

  if (!user) {
    return <Error statusCode={500} />;
  }

  switch (router.asPath) {
    case '/admin/dashboard':
      return (
        <AdminLayout>
          <DashboardPage prs={prs} />
        </AdminLayout>
      );
    case '/admin/profile':
      return (
        <AdminLayout>
          <ProfilePage />
        </AdminLayout>
      );
    default:
      return <Link href="/admin/dashboard">Go to Dashboard</Link>;
  }
}
