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
  onClick?: () => void;
  label: string;
  sx?: SxProps<Theme>;
  data?: any;
};

const DropdownComp = ({ value, onClick, label, sx, data }: DropdownType) => {
  console.log("data",data)
  return (
    <FormControl sx={{ m: 1, ...sx }}>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label={label}
        onChange={onClick}
      >
        {data?.map((item: any, i: any) => (
          <MenuItem key={i} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DropdownComp;
