import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

export enum MenuItemIcon {
  DELETE = 'DELETE',
  EDIT = 'EDIT',
  VIEW_DATA = 'VIEW_DATA',
}

type MenuItemIconMap = {
  // eslint-disable-next-line
  [key in MenuItemIcon]: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
    muiName: string;
  };
};

export const IconsMap: MenuItemIconMap = {
  [MenuItemIcon.DELETE]: DeleteIcon,
  [MenuItemIcon.EDIT]: EditIcon,
  [MenuItemIcon.VIEW_DATA]: VisibilityIcon,
};
