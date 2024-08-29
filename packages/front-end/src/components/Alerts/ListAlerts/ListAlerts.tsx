import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Box, IconButton, SvgIcon, Typography } from '@mui/material';
import { Alert } from '@smart-city-unal/shared-types';
import React from 'react';
import { HeaderProperty } from '../../../types/sensors/table/table';
import { ButtonSubMenuComponent } from '../../ButtonSubMenu/ButtonSubMenu';
import { TableComponent } from '../../Table/Table';
import { useListAlerts } from './useListAlerts';
import { MenuItemIcon } from '../../../types/icons/menuIcons';

export const ListAlertsComponent: React.FunctionComponent = () => {
  const { isLoading, isError, rows, handleEdit, handleDelete } =
    useListAlerts();

  const headerProperties: HeaderProperty[] = [
    {
      name: 'Contaminante',
      accesor: 'contaminant',
      showName: true,
      renderAction: (data: Alert) => {
        return <Typography>{data.contaminant}</Typography>;
      },
    },
    {
      name: 'Umbral Inferior',
      accesor: 'lowerThreshold',
      showName: true,
      renderAction: (data: Alert) => {
        return <Typography>{data.lowerThreshold}</Typography>;
      },
    },
    {
      name: 'Umbral Superior',
      accesor: 'upperThreshold',
      showName: true,
      renderAction: (data: Alert) => {
        return <Typography>{data.upperThreshold}</Typography>;
      },
    },
    {
      name: 'Acción',
      accesor: 'action',
      showName: true,
      renderAction: (data: Alert) => {
        return <Typography>{data.action}</Typography>;
      },
    },
    {
      name: 'Destinatario',
      accesor: 'metadata.email',
      showName: true,
      renderAction: (data: Alert) => {
        return <Typography>{data.metadata.email}</Typography>;
      },
    },
    {
      name: 'Mensaje',
      accesor: 'message',
      showName: true,
      renderAction: (data: Alert) => {
        return <Typography>{data.message}</Typography>;
      },
    },
    {
      name: 'Creado en',
      accesor: 'createdAt',
      showName: true,
      renderAction: (data: Alert) => {
        return (
          <Typography>{new Date(data.createdAt).toLocaleString()}</Typography>
        );
      },
    },
    {
      name: 'Actions',
      accesor: '',
      showName: false,
      renderAction: (data: any) => <></>,
    },
  ];

  return (
    <Box>
      {isLoading && <Typography>Cargando...</Typography>}
      {isError && <Typography>Error al cargar los datos</Typography>}
      <TableComponent
        data={rows}
        header={headerProperties.map((property) => ({
          ...property,
          renderAction:
            property.name === 'Actions'
              ? (data: Alert) => (
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
                    ]}
                  />
                )
              : property.renderAction,
        }))}
      />
    </Box>
  );
};
