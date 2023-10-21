import React, { ReactNode, createContext } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Box, Container, ThemeProvider, createTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { SnackbarProvider, VariantType, useSnackbar } from "notistack";
import { StudentManagementResponse } from "../models/response";

interface DefaultLayoutProps {
  children: ReactNode;
}

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const theme = createTheme({
  palette: {
    primary: {
      main: "#11468F",
    },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#11468F", // Replace with your desired background color
          color: "#EEEEEE",
        },
      },
    },
  },
});



const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  





  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={1} preventDuplicate>
        <Box sx={{ display: "flex", height: "100vh" }}>
          <CssBaseline />

          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}  />
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}  />
          <Box
            component="main"
            sx={{ flexGrow: 1, p: 1, backgroundColor: "#FCFFE7" }}
          >
            <DrawerHeader />
            {children}
          </Box>
        </Box>
        </SnackbarProvider>
    </ThemeProvider>
  );
};

export default DefaultLayout;
