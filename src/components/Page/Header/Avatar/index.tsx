"use client"
import { IconDeer, } from '@/components';
import { motion } from 'framer-motion'

export default function () {
  return (
    <motion.div
      whileHover={{ scale: 1.05, borderColor: 'lightGray' }}>
      <IconDeer className='w-8 h-8 text-primary' />
    </motion.div>
  )
}