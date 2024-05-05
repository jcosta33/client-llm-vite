import CopyIcon from "@mui/icons-material/CopyAll";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import "highlight.js/styles/github-dark.css";
import Highlight from "react-highlight";
import ReactMarkdown from "react-markdown";
import { useContext } from "../hooks";

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
      {messages
        .filter((message) => message.role !== "system")
        .map((message, index) => {
          return (
            <Grid
              item
              key={index}
              maxWidth="100%!important"
              textAlign={message.role === "assistant" ? "left" : "right"}
              sx={
                message.role === "assistant"
                  ? { paddingRight: 10 }
                  : { marginLeft: 10 }
              }
            >
              <Card
                variant="outlined"
                sx={{
                  background: "#000",
                  fontSize: 10,
                  display: "inline-block",
                }}
              >
                <CardContent
                  sx={{
                    position: "relative",
                    paddingTop: 4,
                    paddingBottom: "16px!important",
                  }}
                >
                  <Typography
                    sx={{
                      color: "#999",
                      position: "absolute",
                      top: 2,
                      borderBottom: "1px solid #444",
                      right: 0,
                      left: 0,
                      textAlign: "left",
                      paddingLeft: "16px",
                      paddingRight: "16px",
                      fontSize: 12,
                      opacity: 0.4,
                      textTransform: "uppercase",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
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
                    {message.content}
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
