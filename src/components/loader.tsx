import { LinearProgress } from "@mui/material";
import { useContext } from "../hooks";

const Loader = () => {
  const { chatLoading } = useContext();

  return (
    <LinearProgress
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        display: !chatLoading ? "none" : "block",
      }}
    />
  );
};

export default Loader;
