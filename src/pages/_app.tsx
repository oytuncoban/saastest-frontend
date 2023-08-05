import type { AppProps } from "next/app"
import { ThemeProvider, CssBaseline } from "@mui/material"
import { lightTheme } from "@/theme/themes"
import "../styles/globals.css"
import Head from "next/head"
import { AppConfig } from "@/utils/AppConfig"

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider theme={lightTheme}>
    <CssBaseline />
    <Head>
      <meta name='description' content={AppConfig.description} />
      <title>{AppConfig.title}</title>
    </Head>
    <Component {...pageProps} />
  </ThemeProvider>
)

export default MyApp
