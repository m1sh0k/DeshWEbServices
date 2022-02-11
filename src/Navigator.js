import React, { useState, useEffect,useCallback } from "react";
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeopleIcon from '@mui/icons-material/People';
import DnsRoundedIcon from '@mui/icons-material/DnsRounded';
import PermMediaOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActual';
import EngineeringIcon from '@mui/icons-material/Engineering';
import BuildIcon from '@mui/icons-material/Build';
import ReportIcon from '@mui/icons-material/Report';



// const categories = [
//     {
//         children: [
//             {
//                 id: 'Authentication',
//                 icon: <PeopleIcon />,
//                 active: true,
//             },
//             {id: 'Server Control', icon: <EngineeringIcon />, active: false,},
//             {id: 'Server Setup', icon: <BuildIcon />,active: false,},
//             {id: 'Database', icon: <DnsRoundedIcon /> ,active: false,},
//             {id: 'Storage', icon: <PermMediaOutlinedIcon />,active: false, },
//             {id: 'Reports', icon: <ReportIcon />,active: false, },
//
//         ],
//     },
// ];

const item = {
    py: '2px',
    px: 3,
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover, &:focus': {
        bgcolor: 'rgba(255, 255, 255, 0.08)',
    },
};

const itemCategory = {
    boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
    py: 1.5,
    px: 3,
};



export default function Navigator(props) {

    const { currentPage,categories,toggleActivePage,...other } = props;
    console.log("navigator cat update: ",categories[0].children);

    // const toggleTabFont =(name)=>{
    //     console.log("nav toggleTabFont: ",(name));
    //     categories.forEach((itm) => {
    //         itm.children.forEach((itmChi)=>{
    //             itmChi.active = itmChi.id === name;
    //         })
    //     })
    // };

    return (
        <Drawer key={currentPage} variant="permanent" {...other}>
            <List disablePadding>
                <ListItem sx={{ ...item, ...itemCategory, fontSize: 22, color: '#fff' }}>
                    DeshWebServices
                </ListItem>
                {categories.map(({ id, children }) => (
                    <Box key={id} sx={{ bgcolor: '#101F33' }}>
                        <ListItem sx={{ py: 2, px: 3 }}>
                            <ListItemText sx={{ color: '#fff' }}>{id}</ListItemText>
                        </ListItem>
                        {
                            children.map(({ id: childId, icon, active }) =>
                                    <ListItem disablePadding key={childId} onClick={()=> {
                                        toggleActivePage(childId);
                                        //toggleTabFont(childId);
                                    }}>
                                        <ListItemButton selected={active} sx={item}>
                                            <ListItemIcon>{icon}</ListItemIcon>
                                            <ListItemText>{childId}</ListItemText>
                                        </ListItemButton>
                                    </ListItem>
                            )
                        }

                        <Divider sx={{ mt: 2 }} />
                    </Box>
                ))}
            </List>
        </Drawer>
    );
}