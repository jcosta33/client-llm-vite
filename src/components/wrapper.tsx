"use client";
import { FC, useMemo } from "react";
import { Grid, Box } from "@mui/material";
import Input from "./input";
import Output from "./output";
import { useContext } from "../hooks";
import Prompt from "./prompt";
import ResponsiveAppBar from "./appbar";
import Tweaker from "./tweaker";
import { isOnPhone } from "./utils";

const TweakerSection: FC = () => {
  return (
    <Grid item sm={2}>
      <Box
        height="100vh"
        overflow="auto"
        borderRight="1px solid #222"
        padding={2}
      >
        <Tweaker />
      </Box>
    </Grid>
  );
};

interface CodeLayoutProps {
  fullscreen: boolean;
}

const CodeLayout: FC<CodeLayoutProps> = ({ fullscreen }) => {
  return (
    <Grid item sm={fullscreen ? 12 : 10}>
      <ResponsiveAppBar />
      <Grid container spacing={0}>
        <Grid item sm={6}>
          <Box height="calc(100vh - 64px)" overflow="auto" padding={2}>
            <Input />
          </Box>
        </Grid>

        <Grid item sm={6}>
          <Box height="calc(100vh - 70px)" padding={2}>
            <Output />
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

interface DefaultLayoutProps {
  fullscreen: boolean;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ fullscreen }) => {
  return (
    <Grid item sm={fullscreen ? 12 : 10}>
      <ResponsiveAppBar />
      <Grid container spacing={0} justifyContent={"center"}>
        <Grid item sm={8}>
          <Box height="calc(100vh - 350px)" marginBottom={2} marginTop={2}>
            <Output />
          </Box>
          <Prompt />
        </Grid>
      </Grid>
    </Grid>
  );
};

const Wrapper: FC = () => {
  const { layout, fullscreen } = useContext();
  const userIsOnPhone = useMemo(() => isOnPhone(), []);

  const renderLayout = () => {
    if (layout === "code" && !userIsOnPhone) {
      return <CodeLayout fullscreen={fullscreen} />;
    }
    return <DefaultLayout fullscreen={fullscreen} />;
  };

  return (
    <Grid container spacing={0}>
      {!fullscreen && !userIsOnPhone && <TweakerSection />}
      {renderLayout()}
    </Grid>
  );
};

export default Wrapper;
