"use client"
import Link from 'next/link'
import { AvatarBadge, Box, Center, Heading, IconButton, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, VStack } from '@chakra-ui/react';
import { HStack, Flex, Divider } from '@chakra-ui/react';
import { IconMenu2 } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { Link as ChakraLink } from "@chakra-ui/react";


export default function ({ href, children }: any) {
  return (
    <Link href={href} passHref legacyBehavior>
      <ChakraLink as={motion.a}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {children}
      </ChakraLink>
    </Link>
  )
}