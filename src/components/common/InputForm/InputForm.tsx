import { Box, Typography } from "@mui/material";
import { InputHTMLAttributes, forwardRef } from "react";
import useResponsive from "../../../themes/themes";

interface FormTypes extends InputHTMLAttributes<HTMLInputElement> {
  placeHolder?: string;
  label?: string;
}

// Use forwardRef to ensure the ref is passed correctly
const InputFormComp = forwardRef<HTMLInputElement, FormTypes>(
  ({ placeHolder, label, ...props }, ref) => {
    const { isDesktop } = useResponsive();
    return (
      <Box flexDirection={isDesktop ? "column" : "row"} width={"100%"} m={1}>
        <Typography>{label}</Typography>
        {/* Pass the ref directly to the input field */}
        <input
          className="input-field"
          placeholder={placeHolder}
          {...props}
          ref={ref}
        />
      </Box>
    );
  }
);

export default InputFormComp;
