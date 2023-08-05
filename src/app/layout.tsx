import { PropsWithChildren } from "react"
import "../styles/globals.css"

export default function RootLayout({ children }: PropsWithChildren<{}>) {
  return <div>{children}</div>
}
