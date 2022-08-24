import { createTheme } from '@mui/material/styles';
const themeColor = "#F25C05";


export const authTheme = createTheme({

    components:{
        MuiTextField: {
            styleOverrides:{
                root:{
                    marginBottom: "1rem"
                }
            }
        },
        MuiButton: {
            styleOverrides:{
                root:{
                    marginBottom: "1rem"
                }
            }
        }
    }
})

export const searchBarTheme = createTheme({

    components:{
        MuiTextField: {
            styleOverrides:{
                root:{
                    backgroundColor: "#EEE",
                    minWidth:"32rem",
                    fontSize:"1rem",
                    borderRadius:"0.5rem",
                    borderBottom:"none",
                    position:"relative"
                }
            }
        }
    }
})
export const searchCategoryButtons = createTheme({

    components:{
        MuiButton: {
            styleOverrides:{
                root:{
                    backgroundColor: "white",
                    color: themeColor,
                    fontWeight: "700",
                    fontSize:"0.75rem",
                    padding:"0.1rem 2rem",
                    borderRadius:"1rem",
                    position:"relative",
                    margin:"0.5rem"
                }
            }
        }
    }
})

