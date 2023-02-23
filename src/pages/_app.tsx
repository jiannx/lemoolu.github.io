import '@/styles/design_tokens.css'
import '@/styles/globals.css'
import 'normalize.css';
import type { AppProps } from 'next/app'

const hello = `
###  ##  #######   ##       ##      #######           ##  ###  #######  ######    ##      ######
###  ##  ##        ##       ##      ##   ##           ##  ###  ##   ##  ##  ##    ##      ##  ##
###  ##  ##        ##       ##      ##   ##           ##  ###  ##   ##  ##  ##    ##      ##  ##
#######  #######  ###      ###      ##  ###           ## ####  ##  ###  #######  ###      ### ###
###  ##  ###      ###      ###      ##  ###           #######  ##  ###  ### ###  ###      ### ###
###  ##  # #      ###      ###      ##  ###           #######  ##  ###  ### ###  ###      ### ###
###  ##  #######  ######   ######   #######           ##  ###  #######  ### ###  ######   #######

`
console.log(hello)

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
