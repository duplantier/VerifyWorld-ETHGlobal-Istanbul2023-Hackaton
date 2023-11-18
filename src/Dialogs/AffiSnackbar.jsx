import React from 'react';
import { Snackbar, Alert, Typography} from '@mui/material';

const AffiSnackbar = ({snackOpen, setSnackOpen, vertical="bottom", horizontal="center"}) => {
    return <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={snackOpen.open}
            onClose={() => {
                setSnackOpen((prevError) => ({ ...prevError, open: false }));
            }}
            key={vertical + horizontal}
          >     
             <Alert severity={snackOpen.is_success ? "success" : "error"} size sx={{
                    backgroundColor: snackOpen.is_success ? "#227755" : "error.main" ,
                    borderRadius: "1rem",
                    color: "#ffffff",
                    gap: "0.5rem",
                    "& .MuiAlert-icon": {
                        fontSize: "2.05rem",
                        color: "#ffffff",
                      }
                    
             }}>
                <Typography variant='body2'>
                {snackOpen.text}
                </Typography>
    
             </Alert>
          </Snackbar>

}

export default AffiSnackbar;