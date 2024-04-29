import React from "react";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/material";

interface DrawerComponentProps {
  children: React.ReactNode;
  onCloseDrawer?: () => void;
  isOpen: boolean;
}

export const DrawerComponent: React.FC<DrawerComponentProps> = ({
  children,
  onCloseDrawer = () => {},
  isOpen = false,
}) => {
  return (
    <Drawer
      anchor="right"
      open={isOpen}
      sx={{ "& .MuiDrawer-paper": { zIndex: -1 }, marginTop: "5rem" }}
      PaperProps={{
        sx: { width: "35%" },
      }}
    >
      <IconButton
        onClick={() => onCloseDrawer()}
        sx={{ position: "absolute", right: 0, top: 0 }}
      >
        <CloseIcon />
      </IconButton>
      <Box>{children}</Box>
    </Drawer>
  );
};
