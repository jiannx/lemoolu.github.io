import classNames from "classnames";
import React from "react";
import Link from "../Link";

interface IconSwitchProps {
  /** true对应的值 */
  trueValue?: any;
  falseValue?: any;
  value?: any;
  onChange?: (v: any) => void;
  trueIcon?: any;
  falseIcon?: any;
  className?: string;
  style?: React.CSSProperties;
}

export function IconSwitch({
  trueValue = true,
  falseValue = false,
  value,
  onChange,
  trueIcon,
  falseIcon,
  className,
  style,
}: IconSwitchProps) {
  const _onChange = () => {
    if (value === trueValue) {
      onChange?.(falseValue);
    } else {
      onChange?.(trueValue);
    }
  }

  return (
    <Link>
      <div onClick={_onChange} className={classNames('block cursor-pointer', className)} style={style} suppressHydrationWarning>
        {value === trueValue ? (falseIcon || falseValue) : (trueIcon || trueValue)}
      </div>
    </Link>
  )
}