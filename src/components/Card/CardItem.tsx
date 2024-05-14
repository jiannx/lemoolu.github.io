"use client"
import { IconArrowUpRight } from '@tabler/icons-react';
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

const Tags = {
  'blog': { icon: '📝' },
  'moment': { icon: '💭' },
  'personal': { icon: '💻' },
}

export function CardItem({
  tag,
  link,
  children
}: {
  tag?: keyof typeof Tags;
  link?: string;
  children?: any;
}) {
  const router = useRouter()
  const onClick = () => {
    link && router.push(link);
  }

  return (
    <motion.div
      className="border border-neutral-content rounded-md relative p-4 w-full min-h-60 mb-6 pc:w-[32%] hover:bg-gray"
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: link ? 0.9 : 1.02 }}
    >
      {(tag || link) &&
        <div className='absolute w-full top-0 left-0 p-4 text-sm flex justify-between'>
          {tag && <div>{Tags[tag]?.icon} {tag.toUpperCase()}</div>}
          {link && <div><IconArrowUpRight stroke={1} size={16} /></div>}
        </div>
      }
      {children}
    </motion.div>
  )
}