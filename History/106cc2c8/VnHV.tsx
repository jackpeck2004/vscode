import { Icon } from '@chakra-ui/icons';
import { Button, Container, Flex, Heading, Text } from '@chakra-ui/react';
import { BreadcrumbBar } from 'components/BreadcrumbBar';
import parse from 'html-react-parser';
import { GetServerSideProps } from 'next';
import Error from 'next/error';
import { FiDownload } from 'react-icons/fi';
import { SERVER_URI } from '../lib/constants';
import { Pr } from '../lib/types';

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
};

export default function PrPage({
  errorCode,
  pr,
}: {
  errorCode: 404 | null;
  pr: Pr;
}) {
  if (errorCode) {
    return <Error statusCode={404} />;
  }
  return (
    <>
      {/*<pre>{JSON.stringify(pr, null, 2)}</pre>*/}
      <BreadcrumbBar pr={pr} backUrl="/" />
      <Container py={8} maxW="container.sm">
        <Flex w="100%" justifyContent="space-between">
          <Heading
            fontFamily={'futura-pt-condensed'}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            color={'twin.500'}
            fontWeight={500}
            w="80%"
          >
            {pr.title}
          </Heading>
          <a
            href="https://twin.services/wp-content/uploads/2022/04/cs_fire_bilanci-consolidatoresponsabilita%CC%80-2021.pdf"
            target="_blank"
            rel="noreferrer"
            download
          >
            <Button colorScheme={'twin'} w={16} h={16}>
              <Icon as={FiDownload} h={8} w={8} />
            </Button>
          </a>
        </Flex>
        <Text>{parse(pr.content)}</Text>
      </Container>
    </>
  );
}