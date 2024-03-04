import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { useContext } from "../hooks";
import ReactMarkdown from "react-markdown";
import Highlight from "react-highlight";
import CopyIcon from "@mui/icons-material/CopyAll";
import "highlight.js/styles/github-dark.css";

const Output = () => {
  const { messages, model } = useContext();

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  return (
    <Grid
      container
      spacing={2}
      direction="column-reverse"
      height="100%"
      flexWrap={"nowrap"}
      overflow="auto"
    >
      <Grid item>
        <Typography
          variant="h5"
          color={"#444"}
          textAlign={"center"}
          marginBottom={1.5}
          marginTop={messages.length === 0 ? 20 : 0}
        >
          {model}
        </Typography>

      </Grid>
      {messages.map((message, index) => {
        return (
          <Grid item key={index} maxWidth="100%!important">
            <Card
              variant="outlined"
              sx={{
                background: "#0b0b0b",
                fontSize: 10,
              }}
            >
              <CardContent sx={{ position: "relative", paddingTop: 4 }}>
                <Typography
                  sx={{
                    color: "#999",
                    position: "absolute",
                    top: 2,
                    borderBottom: "1px solid #444",
                    right: 0,
                    left: 0,
                    textAlign: "center",
                    fontSize: 12,
                    opacity: 0.4,
                    textTransform: "uppercase",
                  }}
                >
                  {message.model}
                </Typography>
                <ReactMarkdown
                  components={{
                    p: ({ className, children }) => (
                      <Typography variant="body2" className={className}>
                        {children}
                      </Typography>
                    ),
                    h1: ({ className, children }) => (
                      <Typography variant="h1" className={className}>
                        {children}
                      </Typography>
                    ),
                    h2: ({ className, children }) => (
                      <Typography variant="h2" className={className}>
                        {children}
                      </Typography>
                    ),
                    h3: ({ className, children }) => (
                      <Typography variant="h3" className={className}>
                        {children}
                      </Typography>
                    ),
                    h4: ({ className, children }) => (
                      <Typography variant="h4" className={className}>
                        {children}
                      </Typography>
                    ),
                    h5: ({ className, children }) => (
                      <Typography variant="h5" className={className}>
                        {children}
                      </Typography>
                    ),
                    h6: ({ className, children }) => (
                      <Typography variant="h6" className={className}>
                        {children}
                      </Typography>
                    ),
                    code: ({ inline, children }) =>
                      inline ? (
                        <code>{children}</code>
                      ) : (
                        <Box position="relative">
                          <Highlight>{children}</Highlight>
                          <Button
                            onClick={() => handleCopy(String(children))}
                            variant="text"
                            size="small"
                            sx={{
                              position: "absolute",
                              top: 5,
                              right: 5,
                              minWidth: 0,
                              color: "#999",
                            }}
                          >
                            <CopyIcon />
                          </Button>
                        </Box>
                      ),
                  }}
                >
                  {message.value}
                </ReactMarkdown>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Output;
