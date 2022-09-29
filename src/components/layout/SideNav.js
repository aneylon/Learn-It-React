import { Box, Drawer, Toolbar } from "@mui/material";
import SubjectNavigation from "./SubjectNavigation";

const drawerWidth = 260;

const SideNav = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        // width: drawerWidth,
        flexShrink: 0,
        // paddingTop: "2em",
        // paddingRight: "2em",
        [`& .MuiDrawer-paper`]: {
          // paddingTop: "2em",
          // paddingRight: "2em",
          // width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <div>
          <SubjectNavigation />
        </div>
      </Box>
    </Drawer>
  );
};

export default SideNav;
