"use client"
import Link from "../Link";
import { useState } from "react";
import { IconCircleCheckFilled } from '@tabler/icons-react';

export default function Copy({ copyTip, copyData, children }: {
  copyTip: string;
  copyData: string;
  children: any;
}) {
  const [isCopied, setIsCopied] = useState(false);

  return (
    <Link
      onClick={() => {
        navigator.clipboard.writeText(copyData)
        setIsCopied(true);
      }}
      onMouseLeave={() => {
        setIsCopied(false);
      }}
    >
      <div className="tooltip" data-tip={isCopied ? 'Copied!' : copyTip}>
        <div className="relative">
          {children}
          {isCopied &&
            <div className="absolute bottom-0 right-0 bg-base-100 rounded-full" >
              <IconCircleCheckFilled stroke={1} size={12} color="green" />
            </div>
          }
        </div>
      </div>
    </Link>
  )
}