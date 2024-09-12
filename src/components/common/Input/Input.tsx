import { VisibilityOff, Visibility } from "@mui/icons-material";
import * as THEME from "@mui/material";
import React, { Fragment } from "react";
import { SxProps, Theme } from "@mui/material/styles";

type InputTypes = {
  label?: string;
  value?: string;
  onClick?: () => void;
  icon?: boolean;
  sx?: SxProps<Theme>;
  showPassword?: boolean;
  handleClickShowPassword?: () => void;
  tooltipContent: string;
  type: string;
} & THEME.TextFieldProps;

const InputComp = ({
  label,
  value,
  onClick,
  icon,
  sx,
  showPassword,
  handleClickShowPassword,
  tooltipContent,
  type,
  ...props
}: InputTypes) => {
  return (
    <Fragment>
      {icon ? (
        <THEME.FormControl sx={{ m: 1 }} variant="outlined">
          <THEME.InputLabel htmlFor="outlined-adornment-password">
            {label}
          </THEME.InputLabel>
          <THEME.OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <THEME.InputAdornment position="end">
                <THEME.IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </THEME.IconButton>
              </THEME.InputAdornment>
            }
            label={label}
            value={value}
            onClick={onClick}
            sx={{ ...sx }}
          />
        </THEME.FormControl>
      ) : (
        <THEME.Tooltip title={tooltipContent} arrow>
          <THEME.TextField
            label={label}
            value={value}
            onClick={onClick}
            id="outlined-start-adornment"
            sx={{ m: 1, ...sx }}
            type={type}
            {...props}
          />
        </THEME.Tooltip>
      )}
    </Fragment>
  );
};

export default InputComp;
