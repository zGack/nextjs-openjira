import { useContext } from 'react';
import { Drawer, Box, List, Typography, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';

import { UIContext } from '../../context/ui';

const menuItems: string[] = ['Inbox', 'Starred', 'Send Email', 'Draft'];

export const Sidebar = () => {

  const { sidemenuOpen, closeSideMenu } = useContext(UIContext);

  return (
    <Drawer 
      anchor="left"
      open={sidemenuOpen}
      onClose={closeSideMenu}
    >
      <Box sx={{ width: 250 }}>
        <Box sx={{ padding: '5px 10px'}}>
          <Typography variant='h4'>Menu</Typography>
        </Box>
        <List>
          {
            menuItems.map((text, idx) => (
              <ListItemButton key={text}>
                <ListItemIcon>
                  { idx % 2 ? <InboxOutlinedIcon />: <MailOutlineOutlinedIcon />}
                </ListItemIcon>
                <ListItemText primary={text}/>
              </ListItemButton>
            ))
          } 
        </List>
        <Divider />
        <List>
          {
            menuItems.map((text, idx) => (
              <ListItemButton key={text}>
                <ListItemIcon>
                  { idx % 2 ? <InboxOutlinedIcon />: <MailOutlineOutlinedIcon />}
                </ListItemIcon>
                <ListItemText primary={text}/>
              </ListItemButton>
            ))
          } 
        </List>
      </Box>
    </Drawer> 
  )
}
