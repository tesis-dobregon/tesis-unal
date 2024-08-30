import Button from '@mui/material/Button';
import RefreshIcon from '@mui/icons-material/Cached';
import { SxProps, Theme } from '@mui/material';

export const RefreshButton = ({
  onClick,
  sx,
}: {
  onClick: () => void;
  sx?: SxProps<Theme>;
}) => {
  return (
    <Button
      sx={sx}
      color="primary"
      variant="outlined"
      startIcon={<RefreshIcon />}
      onClick={onClick}
    >
      Refresh
    </Button>
  );
};
