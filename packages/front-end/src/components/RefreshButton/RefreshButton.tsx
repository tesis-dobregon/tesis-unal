import Button from '@mui/material/Button';
import RefreshIcon from '@mui/icons-material/Cached';

export const RefreshButton = ({
  onClick,
  sx,
}: {
  onClick: () => void;
  sx: any;
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
