import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import DrawerHeader from "./DrawerHeader";
import SidebarLinkGroup from "./SidebarLinkGroup";
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import {
  Adjust,
  People,
  Error,
  AccessibleForward,
  LocalPrintshop,
  QrCode,
  Assessment,
  WorkHistory,
  PrecisionManufacturing,
  BugReport,
  Outlet,
} from "@mui/icons-material";
import Diversity1Icon from '@mui/icons-material/Diversity1';
import SideBarLink from "./SideBarLink";
import { SideBarItem } from "../data/sidebarData";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import { ROLES } from "../App";
import { useEffect } from "react";
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
export interface SideBarState {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const Sidebar = (sideBarState: SideBarState) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(sideBarState.sidebarOpen);
  const { auth } = useAuth();
  const [sideBars, setsideBarItems] = React.useState([]);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleDrawerClose = () => {
    sideBarState.setSidebarOpen(false);
  };

  const sideBarItems: Array<SideBarItem> = [];
  //useEffect(()=>{
    auth?.roles?.forEach((role: any) => {
      if([ROLES.principal]?.includes(role)){
        sideBarItems.push({
          text: "Student",
          link: "students",
          isParent: false,
          icon: <Diversity1Icon  />,
          children: [],
        });
    
        sideBarItems.push({
          text: "Teacher",
          link: "teachers",
          isParent: false,
          icon: <People />,
          children: [],
        });
    
        sideBarItems.push({
          text: "Class",
          link: "grades",
          isParent: false,
          icon: <GroupWorkIcon />,
          children: [],
        });
        sideBarItems.push({
          text: "Attendance",
          link: "attendances",
          isParent: false,
          icon: <ExitToAppIcon />,
          children: [],
        });
      }
      
      if([ROLES.teacher]?.includes(role) ){
        sideBarItems.push({
          text: "Students",
          link: "students",
          isParent: false,
          icon: <ExitToAppIcon />,
          children: [],
        });
        sideBarItems.push({
          text: "Attendance",
          link: "attendances",
          isParent: false,
          icon: <ExitToAppIcon />,
          children: [],
        });
      
    }
    if([ROLES.student]?.includes(role) ){
      sideBarItems.push({
        text: "Attendance",
        link: "attendancesview",
        isParent: false,
        icon: <ExitToAppIcon />,
        children: [],
      });

      sideBarItems.push({
        text: "Class",
        link: "gradesview",
        isParent: false,
        icon: <GroupWorkIcon />,
        children: [],
      });

      sideBarItems.push({
        text: "Teacher",
        link: "teachersview",
        isParent: false,
        icon: <People />,
        children: [],
      });
    
  } 
      
     
    })
  //},[])
  //console.log(auth?.roles)
  
   

  return (
    <>
      <Drawer  variant="permanent" open={sideBarState.sidebarOpen}  color="primary" theme={theme}>
        <DrawerHeader className="flex items-center justify-center">
          
          <div className="p-0 flex-grow">
            <img
              className="w-full h-full object-contain"
              src="/images/logo.png"
              alt="Logo"
            />
          </div>
        </DrawerHeader>
        <Divider />
        <List>
          {sideBarItems.map((sideBarItem, index) =>
            sideBarItem.isParent ? (
              <SidebarLinkGroup
                sideBarItem={sideBarItem}
                key={sideBarItem.link + index}
              />
            ) : (
              <SideBarLink
                sideBarItem={sideBarItem}
                isParent={true}
                key={sideBarItem.link}
              />
            )
          )}
        </List>
        <div className="mt-auto p-4">
          <img className="w-full h-full" src="/images/int99.png" alt="Logo" />
        </div>
       
      </Drawer>
    </>
  );
};

export default Sidebar;
