import React from "react";
import { useRouter } from 'next/router';
import styles from './Button.module.scss';

interface ButtonProps {
  type?: 'block' | 'link';
  link?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export default function Button({
  type = 'link',
  children,
  link,
  onClick,
}: ButtonProps) {
  const router = useRouter();
  const _onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (link) {
      router.push(link);
    }
    onClick && onClick();
  }

  return (
    <div
      className={'inline-block py-3 px-6 text-xs text-dark bg-white border border-dark hover:bg-gray cursor-pointer'}
      onClick={_onClick}
    >
      {children}
    </div>
  )
}