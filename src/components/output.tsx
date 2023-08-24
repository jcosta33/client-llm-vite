"use-client";

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
                    p: ({ node, className, children, ...props }) => {
                      return (
                        <Typography
                          variant="body2"
                          className={className}
                          {...props}
                        >
                          {children}
                        </Typography>
                      );
                    },
                    h1: ({ node, className, children, ...props }) => {
                      return (
                        <Typography
                          variant="h1"
                          className={className}
                          {...props}
                        >
                          {children}
                        </Typography>
                      );
                    },
                    code({ node, inline, className, children, ...props }) {
                      // If inline, retain the default behavior
                      if (inline) {
                        return (
                          <code className={className} {...props}>
                            {children}
                          </code>
                        );
                      }

                      return (
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
                      );
                    },
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
