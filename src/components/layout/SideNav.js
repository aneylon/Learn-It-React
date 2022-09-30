import { Box, Drawer, Toolbar } from "@mui/material";
import SubjectNavigation from "./SubjectNavigation";

const SideNav = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
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
