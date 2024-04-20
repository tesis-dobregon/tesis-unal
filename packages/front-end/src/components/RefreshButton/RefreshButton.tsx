import Button from "@mui/material/Button";
import RefreshIcon from "@mui/icons-material/Cached";

export const RefreshButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button
      color="primary"
      variant="outlined"
      startIcon={<RefreshIcon />}
      onClick={onClick}
    >
      Refresh
    </Button>
  );
};
