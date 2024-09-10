import { Box, Typography } from "@mui/material";
import WrapperComp from "../../../components/common/Wrapper";
import StackBarsComp from "../../../components/common/Bars/StackBarsComp";
import PieArcLabelComp from "../../../components/common/Pie/StackPieComp";
import TableComp from "../../../components/common/Table/Table";

const cardData = [
  {
    icon: <i className="fa-brands fa-html5"></i>,
    label: "HTML Projects",
    bg: "#E34F26",
    color: "#fff",
  },
  {
    icon: <i className="fa-brands fa-css3-alt"></i>,
    label: "CSS Project",
    bg: "#1572B6",
    color: "#fff",
  },
  {
    icon: <i className="fa-brands fa-js"></i>,
    label: "JS Project",
    bg: "#F7DF1E",
    color: "#333",
  },
  {
    icon: <i className="fa-brands fa-react"></i>,
    label: "React",
    bg: "#61DAFB",
    color: "#333",
  },
  {
    icon: <i className="fa-brands fa-react"></i>,
    label: "React Native",
    bg: "#61DAFB",
    color: "#333",
  },
];

const DashboardScreen = () => {
  return (
    <WrapperComp title="Welcome Back NextGen Coder Program Academy">
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {cardData.map((item) => (
          <Box
            key={item.label}
            sx={{
              background: "#fff",
              height: 200,
              width: 300,
              borderRadius: 2,
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              mt: 2,
              flex: 1,
              flexWrap: "wrap",
              mr: 2,
            }}
          >
            <Box
              sx={{
                background: item.bg,
                width: 50,
                height: 50,
                borderRadius: 99,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                bg: "#fff",
                fontSize: 20,
                color: item.color,
              }}
            >
              {item.icon}
            </Box>
            <Typography mt={2} textTransform={"uppercase"}>
              {item.label}
            </Typography>
          </Box>
        ))}
      </Box>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        flex={1}
      >
        <Box
          sx={{
            background: "#fff",
            borderRadius: 2,
            maxWidth: 800,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 2,
            p: 2,
            height: 400,
          }}
        >
          <StackBarsComp />
        </Box>
        <Box
          sx={{
            background: "#fff",
            borderRadius: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 2,
            p: 2,
            height: 400,
          }}
        >
          {/* <PieArcLabelComp /> */}
          <TableComp />
        </Box>
      </Box>
    </WrapperComp>
  );
};

export default DashboardScreen;
