"use client"
import { useTranslation } from 'react-i18next';

export default function Trans({
  i18nKey
}: {
  i18nKey: string;
}) {
  const [t] = useTranslation();

  return t(i18nKey) || null;
}