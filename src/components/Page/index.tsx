import React from "react";
import { useRouter } from 'next/router';
import styles from './Page.module.scss';
import Menu from '../Menu';
import Bottom from '../Bottom';
import classnames from 'classnames';
import Head from 'next/head'

export default function Page(props: any) {
  console.log('props', props)
  return (
    <>
      <Head>
        <title>LemooLu's Blog</title>
      </Head>
      <div className={classnames(styles.page, props.className)}>
        <Menu visible={props.menu} />
        <div className={classnames(styles.content, { [styles.container]: props.container })}>
          {props.children}
        </div>
        <Bottom />
      </div >
    </>
  )
}