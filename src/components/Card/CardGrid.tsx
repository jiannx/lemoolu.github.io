
export function CardGrid({ title, children }: {
  title?: string;
  children?: any;
}) {
  return (
    <div className="w-full">
      {title && <h2 className='mt-12 mb-12 text-3xl'>{title}</h2>}
      <div className='flex justify-between flex-wrap'>
        {children}
      </div>
    </div>
  )
}