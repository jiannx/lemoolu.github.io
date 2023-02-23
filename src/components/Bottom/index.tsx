import React from "react";
import { useRouter } from 'next/router';
import styles from './Bottom.module.scss';

interface BottomProps {}

export default function Bottom({}: BottomProps) {

  return (
    <div className={styles.bottom}>
      Personal blog by LemooLu
    </div>
  )
}