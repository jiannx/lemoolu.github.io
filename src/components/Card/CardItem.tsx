"use client"
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
  const linkClasses = 'hover:shadow-lg hover:scale-105 transition cursor-pointer hover:text-primary';

  return (
    <div
      className={`rounded-md relative p-4 w-full min-h-60 glass ${link ? linkClasses : ''}`}
      onClick={onClick}
    >
      {(tag || link) &&
        <div className='absolute w-full top-0 left-0 p-4 text-sm flex justify-between'>
          {tag &&
            <div className='text-base-content'>{Tags[tag]?.icon} {tag.toUpperCase()}</div>
          }
          {link &&
            <div><IconArrowUpRight stroke={1} size={16} /></div>
          }
        </div>
      }
      {children}
    </div>
  )
}