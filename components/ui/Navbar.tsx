import { useContext } from "react";
import NextLink from "next/link";

import { AppBar, IconButton, Link, Toolbar, Typography } from "@mui/material"
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

import { UIContext } from "../../context/ui";

export const Navbar = () => {

  const { openSideMenu } = useContext(UIContext)

  return (
    <AppBar position="sticky" >
      <Toolbar>
        <IconButton 
          size="large"
          edge="start"
          onClick={openSideMenu}
        >
          <MenuOutlinedIcon />
        </IconButton>
        {/* REVISAR FUNCIONAMIENTO DE NextLink en NextJS 13 */}
        <NextLink href="/" passHref legacyBehavior>
          <Link color="white" underline="none">
            <Typography variant="h6" >OpenJira</Typography>
          </Link>
        </NextLink>
      </Toolbar>
    </AppBar>
  )
}
