import { useState } from "react";
import { IconsMap, MenuItemIcon } from "../../types/icons/menuIcons";

interface MenuOption {
  name: string;
  onClick: () => void;
  icon?: MenuItemIcon;
}

export interface ButtonSubMenuComponentProps {
  clickableElement: React.ReactElement;
  menuOptions: MenuOption[];
}

export const useButtonSubMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuOptionsClick = (menuOption: MenuOption) => {
    menuOption.onClick();
    handleClose();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return { anchorEl, handleClick, handleClose, handleMenuOptionsClick };
};
