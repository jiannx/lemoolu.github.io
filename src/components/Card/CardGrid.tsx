
export function CardGrid({ title, children, grid = true }: {
  title?: string;
  children?: any;
  grid?: boolean;
}) {
  return (
    <div className="w-full">
      {title && <h2 className='mt-12 mb-12 text-3xl'>{title}</h2>}
      {grid ?
        <div className='grid grid-cols-1 gap-6 pc:grid-cols-3'>
          {children}
        </div>
        : children
      }
    </div>
  )
}