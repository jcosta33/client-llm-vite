import { ButtonGroup, Button } from "@mui/material";
import { useContext } from "../hooks";
import FunctionsIcon from "@mui/icons-material/Functions"; // Functional programming
import SpeedIcon from "@mui/icons-material/Speed"; // High-performance
import ChildCareIcon from "@mui/icons-material/ChildCare"; // Beginners

const Contexts = () => {
  const { setContext } = useContext(); // Assuming you have a method to set the context

  return (
    <ButtonGroup size="small">
      <Button
        startIcon={<FunctionsIcon />}
        color="primary"
        onClick={() =>
          setContext("The code follows the functional programming paradigm.")
        }
      >
        Functional
      </Button>

      <Button
        startIcon={<SpeedIcon />}
        color="primary"
        onClick={() =>
          setContext("The application is designed for high-performance tasks.")
        }
      >
        Performance
      </Button>

      <Button
        startIcon={<ChildCareIcon />}
        color="primary"
        onClick={() =>
          setContext("The content should be tailored for beginners.")
        }
      >
        Beginner
      </Button>
    </ButtonGroup>
  );
};

export default Contexts;
