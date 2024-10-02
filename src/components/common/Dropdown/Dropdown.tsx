import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SxProps,
} from "@mui/material";
import { Theme } from "@emotion/react";

type DropdownType = {
  value?: string;
  onChange?: any;
  label: string;
  sx?: SxProps<Theme>;
  data?: any;
};

const DropdownComp = ({ value, onChange, label, sx, data }: DropdownType) => {
  return (
    <FormControl sx={{ m: 1, ...sx }}>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label={label}
        onChange={(e) => onChange(e.target.value)}
      >
        {data?.map((item: any, i: any) => (
          <MenuItem key={i} value={item} disabled={item === "Admin"}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DropdownComp;
