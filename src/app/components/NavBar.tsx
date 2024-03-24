"use client";

import React, { createElement } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";
import { Grid } from "@mui/material";
import logo from "../images/logo.jpg";
import Image from "next/image";
import AuthProfileMenu from "./AuthProfileMenu";
import useAuth from "../hooks/useAuth";
import HomeIcon from "@mui/icons-material/Home";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ContactPageIcon from "@mui/icons-material/ContactPage";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const drawerWidth = 240;
const navItems = ["Home", "Documentation", "Contact"];
const linkItems = ["/", "/pages/doc", "/pages/contact"];
const homeIcon = HomeIcon;
const docIcon = MenuBookIcon;
const contactIcon = ContactPageIcon;
const iconItems = [homeIcon, docIcon, contactIcon];

export default function DrawerAppBar(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { isAuthenticated } = useAuth();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box sx={{ textAlign: "center" }}>
      <Link href="/" passHref>
        <Image src={logo} alt="What A Joke" />
      </Link>
      <Divider />
      <List>
        {navItems.map((item, index) => (
          <Grid item key={item}>
            <Link href={linkItems[index]} passHref>
              <Button
                key={item}
                sx={{ color: "#fff" }}
                onClick={handleDrawerToggle}
              >
                {item}
              </Button>
            </Link>
          </Grid>
        ))}
      </List>
      <Divider />
      <Grid item sx={{ display: "flex", justifyContent: "center" }}>
        {isAuthenticated ? <AuthProfileMenu /> : null}
      </Grid>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }}>
            <Link href="/" passHref>
              <Image src={logo} alt="What A Joke" width={100} height={50} />
            </Link>
          </Box>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Grid container spacing={2} justifyContent="flex-end">
              {navItems.map((item, index) => (
                <Grid item key={item} sx={{ display: "flex" }}>
                  <Link href={linkItems[index]} passHref>
                    <Button
                      key={item}
                      sx={{ color: "#fff" }}
                      startIcon={createElement(iconItems[index])}
                    >
                      {item}
                    </Button>
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Box>
          {isAuthenticated ? <AuthProfileMenu /> : null}
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
}
