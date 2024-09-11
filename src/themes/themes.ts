import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

type Breakpoints = {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
};

const useResponsive = (): Breakpoints => {
  const theme = useTheme();

  const isMobile = useMediaQuery("(max-width: 500px)");
  const isTablet = useMediaQuery("(min-width: 501px) and (max-width: 1200px)");
  const isDesktop = useMediaQuery("(min-width: 1201px)");

  return { isMobile, isTablet, isDesktop };
};

export default useResponsive;
