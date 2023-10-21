export type SideBarItem = {
    text:string,
    link:string,
    isParent:boolean,
    icon?: React.ReactNode;
    children:SideBarItem[]
}