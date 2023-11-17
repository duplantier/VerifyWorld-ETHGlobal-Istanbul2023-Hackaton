import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';

import { useNavigate } from "react-router-dom";

import { useTheme } from '@mui/material';

function ResponsiveAppBar({ is_dashboard }) {
    const navigate = useNavigate();
    const theme = useTheme();

    const app_name = "sqy1r"

    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const pages = React.useMemo(() => {
        if (is_dashboard) {
            return []
        } else {
            return ["Sign", "View", "Upload"]
        }
    }, [is_dashboard])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = (event) => {
        if (event.currentTarget.textContent === "View") {
            scrollToTop()
            navigate("/view")
        } else if (event.currentTarget.textContent === "Upload") {
            scrollToTop()
            navigate("/upload")
        } else if (event.currentTarget.textContent === "Sign") {
            scrollToTop()
            navigate("/sign")
        }
        setAnchorElNav(null);
    };


    return (
        <AppBar position="static" sx={{
            backgroundColor: "white",
            justifyItems: "center",
            boxShadow: "none",
            paddingTop: "25px",
            paddingBottom: "10px",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            paddingLeft: "2rem",
            paddingRight: "2rem",
            alignItems: "center",
            position: "sticky",
        }}>

            <Container maxWidth >

                <Toolbar disableGutters sx={{
                    justifyContent: "space-between",
                }}>

                    <Box sx={{
                        display: { xs: "none", md: "flex" },
                        alignContent: "center",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "0.5rem",
                    }}>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={() => {
                                scrollToTop()
                                navigate("/")
                            }}
                            sx={{
                                ":hover": {
                                    backgroundColor: "transparent"

                                },
                                ":focus": {
                                    backgroundColor: "transparent"

                                },
                                ":active": {
                                    backgroundColor: "transparent"

                                },

                            }}
                        >
                            <Box component="img" sx={{ width: "50px", justifyContent: "center", alignItems: "center" }} src={"../logo.png"} alt='logo of notionlift' />
                        </IconButton>

                        <Typography variant='h1' sx={{
                            background: `-webkit-linear-gradient(10deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            ml: "0.05em",
                            fontSize: "1.728rem",
                            ":hover": {
                                cursor: "pointer"
                            }

                        }} onClick={() => {
                            scrollToTop()
                            navigate("/")
                        }}>
                            {app_name}
                        </Typography>
                    </Box>

                    <Box sx={{
                        display: { xs: "flex", md: "none" },
                        alignContent: "center",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "0.5rem",
                    }}>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={() => {
                                scrollToTop()
                                navigate("/")
                            }}
                        >
                            <Box component="img" sx={{ width: "50px", justifyContent: "center", alignItems: "center" }} src={"../logo.png"} alt='logo of notionlift' />
                        </IconButton>

                        <Typography variant='h1' sx={{
                            background: `-webkit-linear-gradient(10deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            ml: "0.05em",
                            fontSize: "1.728rem",
                            ":hover": {
                                cursor: "pointer"
                            }

                        }} onClick={() => {
                            scrollToTop()
                            navigate("/")
                        }}>
                            {app_name}
                        </Typography>

                    </Box>

                    <Box sx={{
                        display: { xs: 'flex', md: 'none' },
                        alignContent: "center",
                    }}>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={handleOpenNavMenu}
                        >
                            <MenuIcon color='primary' />
                        </IconButton>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorElNav}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            {pages.map((page, index) => (
                                <MenuItem key={index} onClick={handleCloseNavMenu}>{page}</MenuItem>
                            ))}

                        </Menu>
                    </Box>

                    <Box sx={{
                        display: { xs: 'none', md: 'flex' },
                        alignContent: "center",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "2rem",
                    }}>

                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            {pages.map((page, index) => (
                                <Button
                                    key={index}
                                    color='inherit'
                                    sx={{
                                        textTransform: "none",
                                        ":hover": {
                                            backgroundColor: "transparent"

                                        },
                                        ":focus": {
                                            backgroundColor: "transparent"

                                        },
                                        ":active": {
                                            backgroundColor: "transparent"

                                        },
                                        ml: "1rem",
                                    }}
                                    onClick={handleCloseNavMenu}
                                >
                                    <Typography variant='h5' sx={{
                                        color: "black",
                                        mr: "1rem",
                                    }}>
                                        {page}
                                    </Typography>

                                </Button>
                            ))}

                        </Box>

                    </Box>


                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;