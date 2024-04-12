"use client"
import { Box, GridItem, Heading, Link, Text, LinkBox, LinkOverlay, Flex } from '@chakra-ui/react'
import dayjs from 'dayjs';
import { IconArrowUpRight } from '@tabler/icons-react';
import { useRouter } from 'next/navigation'

const Tags: any = {
  'blog': { icon: '📝' },
  'moment': { icon: '' },
}

export function CardItem({
  tag,
  link,
  colSpan,
  rowSpan,
  p,
  children
}: {
  tag?: string;
  link?: string;
  colSpan?: number;
  rowSpan?: number;
  p?: number;
  children?: any;
}) {
  const router = useRouter()
  const onClick = () => {
    link && router.push(link);
  }

  return (
    <GridItem
      rowSpan={rowSpan || 1}
      colSpan={colSpan || 1}
      width={'100%'}
      border={1}
      borderWidth={1}
      borderStyle={'solid'}
      borderColor={'gray'}
      borderRadius={4}
      onClick={onClick}
      position={'relative'}
      p={p ?? 4}
      cursor={link ? 'pointer' : 'auto'}
      _hover={link ? {
        backgroundColor: 'gray'
      } : {}}
    >
      {(tag || link) &&
        <Flex position={'absolute'} w={'100%'} left={0} top={0} p={4} fontSize={'xs'} justifyContent={'space-between'}>
          {tag && <Box>{Tags[tag]?.icon} {tag.toUpperCase()}</Box>}
          {link && <Box><IconArrowUpRight stroke={1} size={16} /></Box>}
        </Flex>
      }
      {children}
    </GridItem>
  )
}