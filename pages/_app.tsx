import '../styles/global.css'
import { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}



// todo

// the profile page does not log out users even -
// the quiz app too, even when the mongo db data is deleted that is because the data is from local storage