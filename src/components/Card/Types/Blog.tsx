import { CardItem } from "../CardItem";

export default function Blog({
  title,
  desc,
  data,
  href,
}: {
  title: string;
  desc?: string;
  data?: string;
  href?: string;
}) {
  return (
    <CardItem tag="blog" link={href}>
      <div className="h-full flex flex-col justify-end">
        <span className="text-sm mb-2">{data}</span>
        <h2 className="font-semibold text-lg mb-2">{title}</h2>
        <span className="text-sm">{desc}</span>
      </div>
    </CardItem>
  );
}