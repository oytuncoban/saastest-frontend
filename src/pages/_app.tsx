import type { AppProps } from "next/app"
import { ThemeProvider, CssBaseline } from "@mui/material"
import { lightTheme } from "@/theme/themes"
import "../styles/globals.css"

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider theme={lightTheme}>
    <CssBaseline />
    <Component {...pageProps} />
  </ThemeProvider>
)

export default MyApp
