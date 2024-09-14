import useMediaQuery from "@mui/material/useMediaQuery";

type Breakpoints = {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
};

const useResponsive = (): Breakpoints => {
  const isDesktop = useMediaQuery("(min-width:1200px)");
  const isTablet = useMediaQuery("(min-width:768px) and (max-width:1199px)");
  const isMobile = useMediaQuery("(max-width:767px)");

  return { isMobile, isTablet, isDesktop };
};

export default useResponsive;
