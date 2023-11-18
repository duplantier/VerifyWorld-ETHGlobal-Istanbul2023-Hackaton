import { Box, Typography } from "@mui/material";
import NotFoundSvg from "../assets/illustatus.svg";

const NotFound = () => {
    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100vh",
        }}>
            <img src={NotFoundSvg} alt="404" style={{width: "100%", maxWidth: "800px"}}/>

            <Typography variant="body2" sx={{
                textAlign: "center",
                color: "white",
                fontFamily: "Inter",
                mt: "2rem",
            }}>
                We couldn't find the page you were looking for. If you think this is a mistake, please contact us.
            </Typography>

        </Box>
    );
    }

export default NotFound;