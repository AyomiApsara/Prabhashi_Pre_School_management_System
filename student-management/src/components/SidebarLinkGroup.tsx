
import { ExpandLess, ExpandMore, StarBorder } from "@mui/icons-material";
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import SideBarLink from "./SideBarLink";
import { SideBarItem } from "../data/sidebarData";

interface SideBarLinkProps {
  sideBarItem: SideBarItem;
}

const SidebarLinkGroup = (props: SideBarLinkProps) => {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItemButton onClick={handleClick} >
        <ListItemIcon sx={{ color: '#FCFFE7' }} >{props.sideBarItem.icon || <StarBorder />}</ListItemIcon>
        <ListItemText sx={{ color: '#FCFFE7' }} primary={props.sideBarItem.text} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {props.sideBarItem.children?.map(
          (childBarItem: SideBarItem, childIndex: any) => (
            <List disablePadding key={childBarItem.link+childIndex}>
              <SideBarLink sideBarItem={childBarItem} isParent={false} />
            </List>
          )
        )}
      </Collapse>
    </>
  );
};

export default SidebarLinkGroup;
