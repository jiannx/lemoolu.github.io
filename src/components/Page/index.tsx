import React from "react";
import { useRouter } from 'next/router';
import styles from './Page.module.scss';
import Header from '../Header';
import Bottom from '../Bottom';
import classnames from 'classnames';
import Head from 'next/head'

export default function Page(props: any) {
  return (
    <>
      <Head>
        <title>LemooLu&apos;s Blog</title>
      </Head>
      <div className={classnames('min-h-full', props.className)}>
        <Header />
        <div className={classnames('pt-14', { [styles.container]: props.container })} style={props.style}>
          {props.children}
        </div>
        <Bottom />
      </div >
    </>
  )
}