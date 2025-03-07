import { DateTimePicker, DateTimePickerProps } from "@mui/x-date-pickers";
import React from "react";

const CustomDateTimePicker: React.FC<DateTimePickerProps<any>> = (props) => {
    return (
        <DateTimePicker
            {...props}
            ampm={false}
            sx={{
                "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    backgroundColor: "white",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#ccc",
                    transition: "border-color 0.3s ease",
                },
                "& .MuiOutlinedInput-root:not(.Mui-disabled):hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#e68a00",
                },
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#e68a00",
                },
                "& .MuiInputLabel-root": {
                    color: "#52525b",
                    "&.Mui-focused": {
                        color: "#e68a00",
                    },
                },
                "& .MuiFormHelperText-root.Mui-error": {
                    color: "transparent",
                },
            }}
        />
    );
};

export default CustomDateTimePicker;