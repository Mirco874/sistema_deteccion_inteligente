import { AppBar, Box, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material";
import React, { FC } from "react"
import DashboardIcon from '@mui/icons-material/Dashboard';
import VisibilityIcon from '@mui/icons-material/Visibility';
import NewspaperIcon from '@mui/icons-material/Newspaper';

interface Props {
    children: React.ReactNode;
}

export const DetectionPanelLayout: FC<Props> = ({ children }) => {
  return (
    <Grid container height={"100vh"}>
        <Grid item component="aside" xs={2.3} sx={{width:"100%"}}> 
            <Drawer
                variant="permanent"
                anchor="left"
                PaperProps= {{
                    sx: {
                        width:"19%",
                        background:"#0C3169",
                        color:"white"
                    }
                }}
            >
                <Toolbar>
                    <Box             
                        component="img"
                        sx={{
                        height: 60,
                        width: 60,
                        marginRight: "12px"
                        }}
                        alt="Eagle"
                        src="../src/assets/eagle.png"
                    />    
                    <Typography 
                        variant="subtitle1" 
                        component="h3"
                       
                    >
                        Sistema de detección de conducta criminal
                    </Typography>
                </Toolbar>
                <Divider />
                <List>
                    <ListItem disablePadding>

                        <ListItemButton>
                            <ListItemIcon >
                                <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText primary="Inicio" />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <VisibilityIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Vigilancia Inteligente" />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <NewspaperIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Reportes" />
                        </ListItemButton>
                    </ListItem>

                </List>
            </Drawer>
        </Grid>

        <Grid item component="main" xs={9.7}>
            <AppBar 
                position="static"
                sx={{

                    background:"white", 
                    color: "black", 
                    boxShadow: 1
                }}
                >
                <Toolbar>
                <Typography variant="h5" component="h1">
                    Vigilancia
                </Typography>
                </Toolbar>
            </AppBar>
            <Box padding="20px">
                {children}
            </Box>
        </Grid>

    </Grid>
  )
}
