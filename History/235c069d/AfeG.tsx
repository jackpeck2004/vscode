import { ChevronRightIcon, Icon } from '@chakra-ui/icons';
import { Breadcrumb, BreadcrumbItem, Flex, Text } from '@chakra-ui/react';
import type { Pr } from 'lib/types';
import Link from 'next/link';
import { FiArrowLeftCircle } from 'react-icons/fi';

export function BreadcrumbBar({ pr, backUrl }: { pr: Pr, backUrl: string }) {
  return (
    <Link href={backUrl ? backUrl : '/'}>
      <Flex
        bg={'twin.500'}
        color={'white'}
        px={16}
        py={4}
        alignItems={'center'}
        _hover={{ cursor: 'pointer' }}
      >
        <Icon as={FiArrowLeftCircle} mr={4} />
        <Breadcrumb
          spacing={2}
          separator={<ChevronRightIcon color="inherit" />}
          _hover={{ textDecoration: 'underline' }}
        >
          <BreadcrumbItem isCurrentPage>
            <Text>{pr.subject}</Text>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <Text>{pr.title}</Text>
          </BreadcrumbItem>
        </Breadcrumb>
      </Flex>
    </Link>
  );
}
