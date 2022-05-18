import Link from 'next/link';
import { Breadcrumb, BreadcrumbItem, Flex, Text } from '@chakra-ui/react';
import { FiArrowLeftCircle } from 'react-icons/fi';
import { Icon, ChevronRightIcon } from '@chakra-ui/icons';
import { useState, useEffect } from 'react';
import { Pr } from 'lib/types';

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
