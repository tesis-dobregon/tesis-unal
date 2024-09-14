import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  SvgIcon,
  Typography,
} from '@mui/material';
import { TableComponent } from '../../Table/Table';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CircleIcon from '@mui/icons-material/Circle';
import { HeaderProperty } from '../../../types/sensors/table/table';
import { ButtonSubMenuComponent } from '../../ButtonSubMenu/ButtonSubMenu';
import { MenuItemIcon } from '../../../types/icons/menuIcons';
import { ListSensorsComponentProps, useListSensors } from './useListSensors';
import { SensorEntity, SensorStatus } from '@smart-city-unal/shared-types';

export const ListSensorsComponent: React.FunctionComponent<
  ListSensorsComponentProps
> = (props) => {
  const { handleEdit, handleDelete, handleView, rows, visualMode } =
    useListSensors(props);

  const headerProperties: HeaderProperty[] = [
    {
      name: 'Nombre del sensor',
      accesor: 'name',
      showName: true,
      renderAction: (data: SensorEntity) => {
        return <Typography>{data.name}</Typography>;
      },
    },
    {
      name: 'Id',
      accesor: 'customId',
      showName: true,
      renderAction: (data: SensorEntity) => {
        return <Typography>{data.customId}</Typography>;
      },
    },
    {
      name: 'Tipo',
      accesor: 'type',
      showName: true,
      renderAction: (data: SensorEntity) => {
        return <Typography>{data.type}</Typography>;
      },
    },
    // {
    //   name: 'Última Act.',
    //   accesor: 'lastUpdate',
    //   showName: true,
    //   renderAction: (data: any) => {
    //     return <Typography>{data.lastHeartBeat}</Typography>;
    //   },
    // },
    {
      name: 'Periodo',
      accesor: 'measurementFrequency',
      showName: true,
      renderAction: (data: SensorEntity) => {
        return <Typography>{data.measurementFrequency}</Typography>;
      },
    },
    {
      name: 'Estado',
      accesor: 'status',
      showName: true,
      renderAction: (data: SensorEntity) => {
        switch (data.status) {
          case SensorStatus.ACTIVE:
            return (
              <Box
                sx={{ display: 'flex', flexDirection: 'row' }}
                component="section"
              >
                <SvgIcon component={CircleIcon} color="success">
                  {' '}
                </SvgIcon>
              </Box>
            );

          case SensorStatus.WAITING:
            return (
              <Box component="section">
                <SvgIcon component={CircleIcon} color="warning">
                  {' '}
                </SvgIcon>
              </Box>
            );
          case SensorStatus.INACTIVE:
            return (
              <Box component="section">
                <SvgIcon component={CircleIcon} color="error">
                  {' '}
                </SvgIcon>
              </Box>
            );
          default:
            return <></>;
        }
      },
    },
    {
      name: 'Ubicación',
      accesor: 'location',
      showName: true,
      renderAction: (data: SensorEntity) => {
        return (
          <Typography>
            {data.location?.lat} , {data?.location?.lon}
          </Typography>
        );
      },
    },
    {
      name: 'Creado',
      accesor: 'createdAt',
      showName: true,
      renderAction: (data: SensorEntity) => {
        return <Typography>{data.createdAt?.toString()}</Typography>;
      },
    },
  ];

  if (!visualMode) {
    headerProperties.push({
      name: 'Actions',
      accesor: '',
      showName: false,
      renderAction: (data: any) => <></>,
    });
  }

  return (
    <Box>
      {!visualMode && (
        <Box>
          <List>
            <ListItem key={0}>
              <SvgIcon component={CircleIcon} color="success" />
              <ListItemText
                primary="Activo"
                secondary={'Representa un sensor en funcionamiento'}
              />
            </ListItem>
            <ListItem key={1}>
              <SvgIcon component={CircleIcon} color="warning" />
              <ListItemText
                primary="Pendiente"
                secondary={
                  'Representa un sensor que ha sido creado pero no ha sido activado'
                }
              />
            </ListItem>
            <ListItem key={2}>
              <SvgIcon component={CircleIcon} color="error" />
              <ListItemText
                primary="Inactivo"
                secondary={'Representa un sensor apagado'}
              />
            </ListItem>
          </List>
        </Box>
      )}

      <TableComponent
        data={rows}
        header={headerProperties.map((property) => ({
          ...property,
          renderAction:
            property.name === 'Actions'
              ? (data: SensorEntity) => (
                  <ButtonSubMenuComponent
                    clickableElement={
                      <IconButton aria-label="more">
                        <SvgIcon component={MoreHorizIcon} />
                      </IconButton>
                    }
                    menuOptions={[
                      {
                        name: 'Editar',
                        onClick: () => handleEdit(data),
                        icon: MenuItemIcon.EDIT,
                      },
                      {
                        name: 'Eliminar',
                        onClick: () => handleDelete(data),
                        icon: MenuItemIcon.DELETE,
                      },
                      {
                        name: 'Ver datos recolectados',
                        onClick: () => handleView(data),
                        icon: MenuItemIcon.VIEW_DATA,
                      },
                    ]}
                  />
                )
              : property.renderAction,
        }))}
      />
    </Box>
  );
};
