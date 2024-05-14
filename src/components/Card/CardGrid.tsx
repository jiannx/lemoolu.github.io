
export function CardGrid({ title, children }: {
  title?: string;
  children?: any;
}) {
  return (
    <div className="w-full">
      {title && <h1 className='mt-20 mb-12 text-4xl'>{title}</h1>}
      <div className='flex justify-between flex-wrap'>
        {children}
      </div>
    </div>
  )
}