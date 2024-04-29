import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

export enum MenuItemIcon{
    delete = 1,
    edit = 2,
    viewData = 3
}

type MenuItemIconMap = {
    [key in MenuItemIcon]: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
        muiName: string;
    };
};

export const IconsMap: MenuItemIconMap = {
    [MenuItemIcon.delete] : DeleteIcon,
    [MenuItemIcon.edit] : EditIcon,
    [MenuItemIcon.viewData] : VisibilityIcon
}