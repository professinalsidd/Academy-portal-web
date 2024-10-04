import Backdrop from "@mui/material/Backdrop";
import { CircularProgress } from "@mui/material";

const LoadingComp = ({ loading, setLoading }: any) => {
  return (
    <Backdrop
      sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
      open={loading}
      onClick={() => setLoading(false)}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default LoadingComp;
