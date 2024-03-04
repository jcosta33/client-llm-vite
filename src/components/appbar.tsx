import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Psychology";
import Person from "@mui/icons-material/Person";
import { useState } from "react";
import {
  FormControl,
  FormControlLabel,
  InputLabel,
  Select,
  Switch,
} from "@mui/material";
import { useContext } from "../hooks";

const settings = ["Settings", "Presets", "Contexts"];

function ResponsiveAppBar() {
  const { setFullscreen, setLayout, layout } = useContext();

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        background: "#000",
        boxShadow: "none",
        borderBottom: "1px solid #222",
      }}
    >
      <Toolbar>
        <AdbIcon sx={{ fontSize: 30, mr: 3 }} />

        <Box gap={1} display={"flex"} sx={{ flexGrow: 1 }}>
          <FormControl variant="outlined" size="small">
            <InputLabel id="language-label">Layout</InputLabel>

            <Select
              labelId="layout-label"
              label="Layout"
              onChange={(e) => setLayout(e.target.value)}
              value={layout}
              variant="outlined"
            >
              <MenuItem value="chat">Chat</MenuItem>
              <MenuItem value="code">Code</MenuItem>
            </Select>
          </FormControl>

          <FormControlLabel
            value="start"
            control={
              <Switch
                color="secondary"
                onChange={(e) => setFullscreen(e.target.checked)}
              />
            }
            label="Full screen"
            labelPlacement="start"
          />
        </Box>

        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Person />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
export default ResponsiveAppBar;
