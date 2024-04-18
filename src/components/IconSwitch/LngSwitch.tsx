"use client"
import { IconSwitch } from './IconSwitch';
import { useState } from 'react';
import {  i18n, Lng, changeLanguage } from '@/i18n';

const useDark = function () {
  const [value, setModeState] = useState<string>(i18n.language || Lng.zhCN);

  const onChange = (lng: Lng) => {
    changeLanguage(lng);
    setModeState(lng);
  }
  return { value, onChange };
}

export function LngSwitch({
  className
}: {
  className?: string
}) {
  const { value, onChange } = useDark();
  return (
    <IconSwitch
      trueValue={Lng.zhCN}
      falseValue={Lng.enUS}
      className={className}
      trueIcon={'中'}
      falseIcon={'EN'}
      value={value}
      onChange={onChange}
    />
  )
}