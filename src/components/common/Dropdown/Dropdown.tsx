import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import React from "react";
import { genderData } from "../../../db";

type DropdownType = {
  value?: string;
  onClick?: () => void;
  label: string;
};

const DropdownComp = ({ value, onClick, label }: DropdownType) => {
  return (
    <FormControl sx={{ m: 1 }}>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label={label}
        onChange={onClick}
      >
        {genderData.map((item, i) => (
          <MenuItem key={i} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DropdownComp;
