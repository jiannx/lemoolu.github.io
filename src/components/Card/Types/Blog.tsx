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
        <span className="text-sm">{data}</span>
        <p className="font-semibold text-lg">{title}</p>
        <span>{desc}</span>
      </div>
    </CardItem>
  );
}