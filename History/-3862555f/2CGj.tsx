import { Container, Heading } from '@chakra-ui/react';
import { BreadcrumbBar } from 'components/BreadcrumbBar';
import { useAuth } from 'hooks/useAuth';
import { SERVER_URI } from 'lib/constants';
import type { Pr } from 'lib/types';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import Error from 'next/error';
import React from 'react';
import { useEffect, useState } from 'react';
import { createReactEditorJS } from 'react-editor-js';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { slug } = ctx.query;

  const res = await fetch(`${SERVER_URI}/pr?slug=${slug}`);
  console.log(res);

  if (res.status !== 200) {
    return {
      props: {
        errorCode: 404,
        pr: null,
      },
    };
  }

  const pr: Pr = await res.json();

  return {
    props: {
      errorCode: null,
      pr,
    },
  };
}

export default function EditPr({ errorCode, pr: fetchedPr }: { errorCode: number | null; pr: Pr | null }) {
  const user = useAuth();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pr, setPr] = useState(fetchedPr);
  const ReactEditorJS = createReactEditorJS();
  let Header;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      Header = dynamic(() => import('@editorjs/header'));
    }
  }, [Header])

  if (!user) {
    return <Error statusCode={500} />;
  }

  if (errorCode || !pr) {
    return <Error statusCode={404} />;
  }

  return (
    <form>
      <BreadcrumbBar pr={pr} backUrl="/admin/dashboard" />
      <Container py={4}>
        <Heading
          fontWeight={600}
          fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
          lineHeight={'110%'}
        >
          {pr.title}
        </Heading>
        { Header && <h1>header</h1>}
        <ReactEditorJS
          defaultValue={{
            blocks: [
              {
                id: '12iM3lqzcm',
                type: 'paragraph',
                data: {
                  text: pr.content,
                },
              },
            ],
          }}
        />
      </Container>
    </form>
  );
}
