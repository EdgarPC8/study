import React, { useState } from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import PoolIcon from "@mui/icons-material/Pool";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import MenuBookIcon from '@mui/icons-material/MenuBook';

function NavBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElMenu, setAnchorElMenu] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenMoreMenu = (event) => {
    setAnchorElMenu(event.currentTarget);
  };

  const handleCloseMoreMenu = () => {
    setAnchorElMenu(null);
  };

  const permisos = {
    Programador: [
      {
        name: "Suma",
        link: "/matematicas",
      },
      {
        name: "Resultados",
        link: "/resultados",
      },
    //   {
    //     name: "Tablas",
    //     menu: {
    //       items: [
    //         { name: "Metros", link: "/metros" },
    //         { name: "Pruebas", link: "/pruebas" },
    //         { name: "Tiempos", link: "/tiempos" },
    //         { name: "Nadadores", link: "/nadadores" },
    //         { name: "Institucion", link: "/institucion" },
    //         { name: "Usuarios", link: "/usuarios" },
    //       ],
    //     },
    //   },
    ],
  };

  const pagesToShow = permisos["Programador"] || [];

  return (
    <AppBar position="static">
      <Box maxWidth="xl">
        <Toolbar disableGutters>
          <MenuBookIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />

          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Study
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pagesToShow.map((page, index) => (
                <MenuItem key={page.name} onClick={handleOpenMoreMenu}>
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
              <Menu
                anchorEl={anchorElMenu}
                keepMounted
                open={Boolean(anchorElMenu)}
                onClose={handleCloseMoreMenu}
              >
                {pagesToShow
                  .find((page) => page.menu)
                  ?.menu.items.map((item) => (
                    <MenuItem
                      key={item.name}
                      onClick={handleCloseMoreMenu}
                      component={Link}
                      to={item.link}
                    >
                      <Typography textAlign="center">{item.name}</Typography>
                    </MenuItem>
                  ))}
              </Menu>
            </Menu>
          </Box>
          <PoolIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Natación
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pagesToShow.map((page, index) => (
              page.menu ? (
                <Tabs
                  key={page.name}
                  value={false}
                  variant="scrollable"
                  scrollButtons="auto"
                  aria-label="scrollable auto tabs example"
                >
                  <Tab
                    label={page.name}
                    onClick={handleOpenMoreMenu}
                    sx={{ my: 2, color: "white" }}
                  />
                </Tabs>
              ) : (
                <Button
                  key={page.name}
                  component={Link}
                  to={page.link}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page.name}
                </Button>
              )
            ))}
          </Box>
        </Toolbar>
      </Box>
    </AppBar>
  );
}

export default NavBar;
