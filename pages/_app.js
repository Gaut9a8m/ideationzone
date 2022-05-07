import '../styles/globals.css'
import '../styles/login.css'
import '../styles/calender.css'
import '../styles/navbar.css'
import '../styles/room.css'
import '../styles/form.css'


import Head from 'next/head';
import Script from 'next/script'
import { CookiesProvider } from "react-cookie"
import Navbar from '../components/navbar'

function MyApp({ Component, pageProps, user }) {
  return (
    <>
        <Head> 
            <link    href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
            crossOrigin="anonymous"
            />
          <script src="https://code.jquery.com/jquery-3.6.0.min.js"
                      integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
                      crossorigin="anonymous"></script>     
        <script type="text/javascript" src="/static/script.js" > </script>
        </Head>
        
        <Script
                id="bootstrap-cdn"
                src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" />
        
        <CookiesProvider>
        <Navbar {...pageProps} />
        <Component {...pageProps} /> 
        </CookiesProvider>
    </>
            
    )
}

export default MyApp


