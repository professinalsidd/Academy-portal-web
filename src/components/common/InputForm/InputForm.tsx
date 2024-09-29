import { Box, IconButton, Typography } from "@mui/material";
import { InputHTMLAttributes, forwardRef, useState } from "react";
import useResponsive from "../../../themes/themes";
import { VisibilityOff, Visibility } from "@mui/icons-material";

interface FormTypes extends InputHTMLAttributes<HTMLInputElement> {
  placeHolder?: string;
  label?: string;
  type?: string;
}

// Use forwardRef to ensure the ref is passed correctly
const InputFormComp = forwardRef<HTMLInputElement, FormTypes>(
  ({ placeHolder, label, type, ...props }, ref) => {
    const { isDesktop } = useResponsive();
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
    return (
      <Box flexDirection={isDesktop ? "column" : "row"} width={"100%"} m={1}>
        <Typography>{label}</Typography>
        {/* Pass the ref directly to the input field */}
        <input
          className="input-field"
          placeholder={placeHolder}
          {...props}
          ref={ref}
          type={type === "password" && showPassword ? "text" : type}
        />
        {type === "password" && (
          <IconButton
            onClick={togglePasswordVisibility}
            style={{ position: "absolute", right: 50, marginTop: 2 }}
            edge="end"
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        )}
      </Box>
    );
  }
);

export default InputFormComp;
