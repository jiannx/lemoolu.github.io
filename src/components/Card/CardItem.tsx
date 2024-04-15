"use client"
import { Box, GridItem, Heading, Link, Text, LinkBox, LinkOverlay, Flex } from '@chakra-ui/react'
import dayjs from 'dayjs';
import { IconArrowUpRight } from '@tabler/icons-react';
import { useRouter } from 'next/navigation'

const Tags = {
  'blog': { icon: '📝' },
  'moment': { icon: '💭' },
  'personal': { icon: '💻' },
}

export function CardItem({
  tag,
  link,
  colSpan,
  rowSpan,
  p,
  asBox,
  children
}: {
  tag?: keyof typeof Tags;
  link?: string;
  colSpan?: number;
  rowSpan?: number;
  p?: number;
  asBox?: boolean;
  children?: any;
}) {
  const router = useRouter()
  const onClick = () => {
    link && router.push(link);
  }

  const ChildClass = asBox ? Box : GridItem;

  return (
    <ChildClass
      rowSpan={rowSpan}
      colSpan={colSpan}
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
        backgroundColor: 'lightGray'
      } : {}}
    >
      {(tag || link) &&
        <Flex position={'absolute'} w={'100%'} left={0} top={0} p={4} fontSize={'xs'} justifyContent={'space-between'}>
          {tag && <Box>{Tags[tag]?.icon} {tag.toUpperCase()}</Box>}
          {link && <Box><IconArrowUpRight stroke={1} size={16} /></Box>}
        </Flex>
      }
      {children}
    </ChildClass>
  )
}