"use client"
import { AppConfig } from "@/utils/AppConfig"
import { Button, Grid, Stack } from "@mui/material"
import Head from "next/head"
import Header from "./components/Header/Header"
import Dashboard from "./dashboard/Dashboard"
import SideMenu from "./components/SideMenu/SideMenu"
export default function Home() {
  return (
    <>
      <Head>
        <title>A/B Testing as SaaS</title>
      </Head>
      <main>
        <Header/>
        <Dashboard/>
        <SideMenu/>
      </main>
    </>
  )
}
