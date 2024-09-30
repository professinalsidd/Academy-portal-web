export const LAYOUT = {
  flexCCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  columnCCenter: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  },
  flexRowBetween: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  columnStart: {
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column",
  },
  columnEnd: {
    display: "flex",
    justifyContent: "flex-end",
    flexDirection: "column",
  },
  flexRowAround: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
  flexColumn: {
    display: "flex",
    flexDirection: "column",
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
  },
  flexCCenterWithGap: (gap = "0.2rem") => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap,
  }),
  flexColumnWithGap: (gap = "0.2rem") => ({
    display: "flex",
    flexDirection: "column",
    gap,
  }),
  flexRowWithGap: (gap = "0.2rem") => ({
    display: "flex",
    flexDirection: "row",
    gap,
  }),
  flexWrapRowWithGap: (gap = "0.5rem") => ({
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    gap,
  }),
  flexWrap: {
    display: "flex",
    flexWrap: "wrap",
  },
  flexRowAJCenter: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  flexCenter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};
