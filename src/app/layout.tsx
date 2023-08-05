import { PropsWithChildren } from "react"
import "@/app/globals.css"

export default function RootLayout({ children }: PropsWithChildren<{}>) {
  return <div>{children}</div>
}
