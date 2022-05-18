import {
  Box, Container,
  Heading, useColorModeValue
} from '@chakra-ui/react';
import { BreadcrumbBar } from 'components/BreadcrumbBar';
import { PrEditor } from 'components/PrEditor';
import { useAuth } from 'hooks/useAuth';
import { SERVER_URI } from 'lib/constants';
import { Pr } from 'lib/types';
import Error from 'next/error';
import { useRouter } from 'next/router';

export async function getServerSideProps(ctx: any) {
  const { slug } = ctx.query;

  const res = await fetch(`${SERVER_URI}/pr?slug=${slug}`);

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

export default function EditPr({ errorCode, pr }: { errorCode: number | null; pr: Pr }) {
  const router = useRouter();
  const user = useAuth();

  if (user === null) {
    return <Error statusCode={500} />;
  }

  if (errorCode) {
    return <Error statusCode={404} />;
  }

  return (
    <Box bg={useColorModeValue('gray.100', 'gray.800')} h={'88vh'}>
      <BreadcrumbBar pr={pr} backUrl="/admin/dashboard" />
      <Container py={4}>
        <Heading
          fontWeight={600}
          fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
          lineHeight={'110%'}
        >
          {pr.title}
        </Heading>
        <PrEditor pr={pr} />
      </Container>
    </Box>
  );
}
