import Link from 'next/link'

export default function ({
  href,
  children,
  ...others
}: any) {
  const child = (
    <a
      className='transition hover:scale-105'
      {...others}
    >
      {children}
    </a>
  );
  if (href) {
    return (
      <Link href={href || ''} passHref legacyBehavior  >
        {child}
      </Link>
    )
  }
  return child;
}