
import React from "react";
import SendIcon from "@mui/icons-material/Send";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import {
  Link,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { SideBarItem } from "../data/sidebarData";

interface SideBarLinkProps {
  sideBarItem: SideBarItem;
  isParent: boolean;
}

const SideBarLink = (props: SideBarLinkProps) => {
  return props.isParent ? (
    <Link href={props.sideBarItem.link} >
      <ListItemButton>
        <ListItemIcon sx={{ color: '#FCFFE7' }}>{props.sideBarItem.icon || <SendIcon />}</ListItemIcon>
        <ListItemText sx={{ color: '#FCFFE7' }} primary={props.sideBarItem.text} />
      </ListItemButton>
    </Link>
  ) : (
    <Link href={props.sideBarItem.link} >
      <ListItemButton sx={{ pl: 4 }}>
        <ListItemIcon sx={{ color: '#FCFFE7' }} >{props.sideBarItem.icon || <InboxIcon />}</ListItemIcon>
        <ListItemText sx={{ color: '#FCFFE7' }} primary={props.sideBarItem.text} />
      </ListItemButton>
    </Link>
  );
};

export default SideBarLink;
