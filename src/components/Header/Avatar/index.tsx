"use client"
import { IconDeer, } from '@/components';
import { Box,  } from '@chakra-ui/react';
import { Avatar } from '@chakra-ui/react';
import { motion } from 'framer-motion'

export default function () {
  return (
    <Box
      as={motion.div}
      border='1px'
      borderColor='gray'
      borderRadius={'100%'}
      whileHover={{ scale: 1.05, borderColor: 'lightGray' }}>
      <Avatar
        as={motion.div}
        bg='none'
        icon={<IconDeer boxSize={6} color='dark' />}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
      />
    </Box>
  )
}