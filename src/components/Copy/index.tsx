"use client"
import { Tooltip, Box } from "@chakra-ui/react";
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
      <Tooltip label={isCopied ? 'Copied!' : copyTip} closeOnClick={false}>
        <Box position={'relative'}>
          {children}
          {isCopied &&
            <Box position={'absolute'} bottom={0} right={0} bg={'white'} borderRadius={'100%'} >
              <IconCircleCheckFilled stroke={1} size={12} color="green" />
            </Box>
          }
        </Box>
      </Tooltip>
    </Link>
  )
}