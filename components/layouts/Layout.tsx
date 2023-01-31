import { FC, PropsWithChildren } from "react";
import Head from "next/head"

import { Box } from "@mui/material"

import { Navbar, Sidebar } from "../ui";

interface Props {
  title?: string;
  children: JSX.Element | JSX.Element[]
}

export const Layout: FC<PropsWithChildren<Props>> = ({ title = 'OpenJira', children}) => {
  return (
    <Box sx={{flexFlow: 1}}>
      <Head>
        <title>{ title }</title>
      </Head>

      <Navbar />
      <Sidebar />

      <Box sx={{ padding: '10px 20px'}}>
        { children }
      </Box>
    </Box>
  )
}
