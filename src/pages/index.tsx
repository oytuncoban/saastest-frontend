/* eslint-disable @next/next/no-img-element */
import Link from "next/link"
import { useRouter } from "next/router"

const Index = () => {
  const router = useRouter()

  return <Link href='/home'>Go Homepage</Link>
}

export default Index
