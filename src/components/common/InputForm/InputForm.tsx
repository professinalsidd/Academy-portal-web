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

    const styles = {
      password: {
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        height: 45,
        width: "100%",
        border: "1px solid #d2e0fb",
        padding: "10px",
        borderRadius: "5px",
      },
    };

    return (
      <Box flexDirection={isDesktop ? "column" : "row"} width={"100%"} m={1}>
        <Typography>{label}</Typography>
        {type !== "password" && (
          <input
            className="input-field"
            placeholder={placeHolder}
            {...props}
            ref={ref}
            type={type}
          />
        )}
        {type === "password" && (
          <Box sx={styles.password}>
            <input
              placeholder={placeHolder}
              {...props}
              ref={ref}
              className="input-field password"
              type={type === "password" && showPassword ? "text" : type}
            />
            <IconButton onClick={togglePasswordVisibility} edge="end">
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </Box>
        )}
      </Box>
    );
  }
);

export default InputFormComp;
