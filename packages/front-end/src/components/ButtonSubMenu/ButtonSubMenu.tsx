import { Box, Menu, MenuItem, SvgIcon } from "@mui/material";
import React from "react";
import { useState } from "react";
import { IconsMap, MenuItemIcon } from "../../types/icons/menuIcons";

interface MenuOption {
  name: string;
  onClick: () => void;
  icon?: MenuItemIcon;
}
interface ButtonSubMenuComponentProps {
  clickableElement: React.ReactElement;
  menuOptions: MenuOption[];
}

export const ButtonSubMenuComponent: React.FunctionComponent<
  ButtonSubMenuComponentProps
> = ({ clickableElement, menuOptions }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const menuItemActions = (menuOption: MenuOption) => {
    menuOption.onClick();
    handleClose();
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      {React.cloneElement(clickableElement, { onClick: handleClick })}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {menuOptions.map((option, index) => {
          return (
            <MenuItem
              key={index}
              onClick={() => {
                menuItemActions(option);
              }}
            >
              {option.icon && (
                <SvgIcon component={IconsMap[option.icon]}></SvgIcon>
              )}
              {option.name}
            </MenuItem>
          );
        })}
      </Menu>
    </Box>
  );
};
