import { COLORS } from "../../themes/colors";

export const stylesHeader = {
  circleCtn: {
    position: "relative",

    background: COLORS.LIGHT_BLUE,
    color: COLORS.BLACK,
    p: 2,
    width: 10,
    height: 10,
    borderRadius: 100,
    mr: 2,
    cursor: "pointer",
    "&:hover .fullName": {
      display: "block",
    },
  },
  circleBox: {
    display: "none", // Hide it by default
    position: "absolute",
    top: "100%", // Position below the box
    left: "50%",
    transform: "translateX(-50%)",
    mt: 1,
    backgroundColor: "white",
    color: COLORS.BLACK,
    p: 0.5,
    borderRadius: 2,
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  },
};
