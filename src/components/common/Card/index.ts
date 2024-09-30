import { COLORS } from "../../../themes/colors";

export const styleCard = {
  root: {
    // minWidth: 370,
    height: 100,
    mt: 2,
    flex: 1,
    transition: "background-color 0.3s ease",
    "&:hover": {
      cursor: "pointer",
    },
    padding: 2,
    backgroundColor: COLORS.WHITE,
    borderRadius: 2,
  },
  subRoot: {
    background: COLORS.LIGHT_BLUE,
    width: 50,
    height: 50,
    borderRadius: 99,
    fontSize: 20,
    color: COLORS.WHITE,
  },
  count: {
    backgroundColor: COLORS.LIGHT_BLUE,
    color: COLORS.BLACK,
    borderRadius: 99,
    width: 40,
    height: 40,
    textAlign: "center",
  },
};
