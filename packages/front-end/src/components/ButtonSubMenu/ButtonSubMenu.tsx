import { Box, Menu, MenuItem, SvgIcon } from "@mui/material";
import React from "react";
import { IconsMap } from "../../types/icons/menuIcons";
import {
  useButtonSubMenu,
  ButtonSubMenuComponentProps,
} from "./useButtonSubMenu";

export const ButtonSubMenuComponent: React.FunctionComponent<
  ButtonSubMenuComponentProps
> = ({ clickableElement, menuOptions }) => {
  const { anchorEl, handleClick, handleClose, handleMenuOptionsClick } =
    useButtonSubMenu();

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
                handleMenuOptionsClick(option);
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
