import React from "react";
import Header from './Header';
import Bottom from './Bottom';

const WIDTH_NUM: any = { full: 'w-full', lg: 'max-w-7xl', sm: 'max-w-4xl' };
type size = keyof typeof WIDTH_NUM;

const Container = ({ className, children, size = 'full', }: {
  className?: string;
  children?: any;
  size?: size; // 屏幕
}) => {

  return (
    <div className={`${WIDTH_NUM[size]} mx-auto ${size === 'full' ? 'px-0' : 'px-4'} ${className}`}>
      {children}
    </div>
  );
}

export default function Page({
  children,
  title,
  size,
}: {
  children: React.ReactNode;
  isFull?: boolean;
  title?: any;
  size?: size; // 屏幕
}) {

  return (
    <>
      <Header />
      {title && <div>{title}</div>}
      <Container size={size} className="pt-16">{children}</Container>
      <Bottom />
    </>
  )
}

Page.Container = Container;