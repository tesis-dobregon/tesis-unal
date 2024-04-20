import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import  './drawer.scss'
interface props {
    children: React.ReactNode;
    toogleDrawer: () => void;
    isOpen: boolean;
}

const DrawerComponent: React.FC<props> = ({ children, toogleDrawer = ()=>{}, isOpen = false }) => {
    return (
        <div className=''>
            <Drawer
                anchor="right"
                open={isOpen}
                onClose={() =>{}}
                className='drawer-right'
                sx={{ "& .MuiDrawer-paper": {zIndex: -1 } }}
            >
                <IconButton
                    onClick={() =>toogleDrawer()}
                    sx={{ position: 'absolute', right: 0, top: 0 }}>
                <CloseIcon />
                </IconButton>
                <div style={{ width: '300px'}}>
                    {children}
                </div>
            </Drawer>
        </div>
    );
};

export default DrawerComponent;