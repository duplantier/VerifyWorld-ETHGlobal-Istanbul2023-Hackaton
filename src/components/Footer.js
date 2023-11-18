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
            logo: 'deneme-logo.svg',
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
        /*    {
               title: "Contact Us",
               data: [{
                   title: "Our Contact Page",
                   link: "/contact",
               },
               {
                   title: support_email,
                   link: "",
               },
               ]
           },
           {
               title: "Socials",
               data: [{
                   title: "Twitter ",
                   link: "https://twitter.com/" + twitter_handle,
                   icon: <AiFillTwitterCircle size={15} />,
                   open_in_new_tab: true,
               },
               ]
           } */
    ]

    /* const subTexts = [
        program_name + " runs under the company of Liya, LLC, a company registered in United States of America. Payment processing is handled through Liya, LLC's bank account & Stripe",
    ] */

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
            width: "100hv",
            backgroundColor: "black",
            color: "text.main",
            marginTop: "1rem",
            padding: "1rem",
            gap: "1rem",
        }}>
            <Grid container direction="row" justifyContent="space-between" alignItems="flex-start" alignContent={"center"}
                xs={12} sm={11} md={10} lg={8} xl={6}
                spacing={2} gap={3} sx={{
                    mb: "1rem",
                    mt: "1rem",
                }}>
                {

                    footerContent.map((column, index) => (
                        <Grid item key={index} xs sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: { xs: "center", sm: "center" },
                            alignContent: "center",
                            gap: "1rem",
                            minWidth: "200px",
                        }}>
                            <img src={column.logo} />
                            <Typography variant="h5" sx={{
                                color: "rgba(255, 255, 255, 1)",
                                mb: "2rem",
                            }}>
                                {column.title}
                            </Typography>


                            {
                                column.data.map((item, index) => (
                                    <Typography key={index} variant="body2" sx={{
                                        color: "rgba(255, 255, 255, 0.5)",
                                        "&:hover": {
                                            color: "rgba(255, 255, 255, 0.8)",
                                            cursor: "pointer",
                                        },
                                        display: "block",
                                    }}>
                                        {
                                            !item.open_in_new_tab ? (item.link ? (
                                                <Link to={item.link} onClick={() => {
                                                    scrollToTop()
                                                }} style={{
                                                    textDecoration: "none",
                                                    color: "inherit",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "0.5rem",
                                                }}>
                                                    {item.title} {item.icon}
                                                </Link>
                                            ) : <Typography variant='body2' sx={{
                                                textDecoration: "none",
                                                color: "inherit",
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "0.5rem",

                                                ":hover": {
                                                    cursor: "auto",
                                                }

                                            }}>
                                                {item.title} {item.icon}
                                            </Typography>
                                            ) : (
                                                <Typography onClick={() => { openInNewTab(item.link) }} variant='body2' sx={{
                                                    textDecoration: "none",
                                                    color: "inherit",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "0.5rem",

                                                    ":hover": {
                                                        cursor: "pointer",
                                                    }

                                                }}>
                                                    {item.title} {item.icon}
                                                </Typography>
                                            )
                                        }
                                    </Typography>
                                ))
                            }
                        </Grid>
                    ))
                }

            </Grid>

            {/* <Divider sx={{
                width: "100%",
                mt: "1rem",
                mb: "1rem",
                backgroundColor: "rgba(255, 255, 255, 0.2)",
            }} /> */}

            {/* {
                subTexts.map((text, index) => (
                    <>
                        <Typography key={index} variant="body2" sx={{
                            color: "rgba(255, 255, 255, 0.5)",
                            display: "block",
                            textAlign: "center",
                            pl: "1rem",
                            pr: "1rem",
                        }}>
                            {text}
                        </Typography>

                        <Divider sx={{
                            width: "100%",
                            mt: "1rem",
                            mb: "1rem",
                            backgroundColor: "rgba(255, 255, 255, 0.2)",
                        }} />

                    </>
                ))

            } */}
        </Box>

    )
}

export default Footer
