import { Box, Divider, Grid, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { AiFillTwitterCircle } from "react-icons/ai"

const Footer = () => {
    const date = new Date()
    const year = date.getFullYear()

    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    const program_name = "VerifyWorld"
    // const support_email = "hello@verifyworld.com"
    // const twitter_handle = "@verifyworld"

    const footerContent = [
        {
            title: program_name,
            logo_path: '/logo.svg',
            data: [{
                title: program_name + " ©{year}".replace("{year}", year),
                link: "/",
            },
            {
                title: "Terms Of Service",
                link: "/terms-of-service",
            },
            {
                title: "Privacy Policy",
                link: "/privacy",
            },
            ]
        },
    ]


    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
            width: "100hv",
            backgroundColor: "rgb(15 23 42)",
            color: "text.main",
            padding: "1rem",
            gap: "1rem",
        }}>
            <Grid container direction="column" justifyContent="center" alignItems="flex-center" alignContent={"center"}
                xs={12} sm={11} md={10} lg={8} xl={6}
                gap={1} sx={{
                    mb: "2rem",
                    mt: "1rem",
                }}>

                {
                    footerContent.map((column, index) => (
                        <>
                            <img src={column.logo_path} />

                            <Grid item key={index} xs sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: { xs: "center", sm: "center" },
                                alignContent: "center",
                                gap: "1rem",
                                minWidth: "200px",
                            }}>
                                <Typography variant="h5" sx={{
                                    color: "rgba(255, 255, 255, 1)",
                                }}>
                                    {column.title}

                                </Typography>
                                <p className='text-white text-center'>
                                    VerifyWorld is a platform that allows you to verify the authenticity of your documents using WorldID.
                                </p>

                            </Grid>

                        </>
                    ))
                }

            </Grid>
        </Box>

    )
}

export default Footer
