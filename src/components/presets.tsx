import { ButtonGroup, Button } from "@mui/material";
import { useContext } from "../hooks";
import CommentIcon from "@mui/icons-material/Comment";
import BugReportIcon from "@mui/icons-material/BugReport";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import HelpIcon from "@mui/icons-material/Help";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const Presets = () => {
  const { setMessage } = useContext();

  return (
    <ButtonGroup size="small">
      <Button
        startIcon={<BugReportIcon />}
        color="secondary"
        onClick={() =>
          setMessage(
            "I have this error when running my  code. Any idea what could be causing it?"
          )
        }
      >
        Debug
      </Button>
      <Button
        startIcon={<LibraryBooksIcon />}
        color="secondary"
        onClick={() =>
          setMessage("Can you generate documentation for this code? ")
        }
      >
        Document
      </Button>
      <Button
        startIcon={<HelpIcon />}
        color="secondary"
        onClick={() => setMessage("Can you explain this code?")}
      >
        Explain
      </Button>
      <Button
        startIcon={<CheckBoxIcon />}
        color="secondary"
        onClick={() => setMessage("Can you write a test for this code?")}
      >
        Write test
      </Button>
      <Button
        startIcon={<CommentIcon />}
        color="secondary"
        onClick={() => setMessage("Can you write a test for this code?")}
      >
        Comments
      </Button>
    </ButtonGroup>
  );
};

export default Presets;
