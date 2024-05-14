import { CardItem } from "../CardItem";

export default function Moment({
  title,
  fromTitle,
  fromLink,
}: {
  title: string,
  fromTitle: string,
  fromLink: string,
}) {
  return (
    <CardItem tag="moment">
      <div className="h-full flex flex-col justify-end">
        <h2 className="font-semibold text-lg">{title}</h2>
        <div className="text-right mt-4 text-sm">
          <a href={fromLink} target="_blank">--{fromTitle}</a>
        </div>
      </div>
    </CardItem>
  );
}