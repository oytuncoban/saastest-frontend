import rawTheme from "@/theme/raw"
import { AppConfig } from "@/utils/AppConfig"
import { CssBaseline, ThemeProvider } from "@mui/material"
import type { AppProps } from "next/app"
import Head from "next/head"
import "../styles/globals.css"

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <ThemeProvider theme={rawTheme}>
      <CssBaseline />
      <Head>
        <meta name='description' content={AppConfig.description} />
        <title>{AppConfig.title}</title>
      </Head>
      <Component {...pageProps} />
    </ThemeProvider>
  </>
)

export default MyApp
