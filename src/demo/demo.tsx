import * as React from "react";
import { FormLabel, FormControlLabel, Checkbox, Radio, RadioGroup, Select, MenuItem, TextField } from "@mui/material"

export default function Demo(props: any) {
    const [checked, setChecked] = React.useState(false);
    const checkboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // setChecked(event.target.checked);
        props.checkboxChange(event.target.checked);
    };

    const [radioGroupValue, setRadioGroupValue] = React.useState("A");
    const radioGroupChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // setRadioGroupValue((event.target as HTMLInputElement).value);
        props.radioGroupChange((event.target as HTMLInputElement).value);
    };

    const [selectValue, setSelectValue] = React.useState("1");
    const selectChange = (event: any) => {
        setSelectValue(event.target.value as string);
        props.selectChange(event.target.value as string);
    };

    return (
        <>
            <TextField
                data-testid='search-text-field'
                variant="outlined"
                required
                onChange={(e) => { e.target.value }}
                name="name"
                label="label"
                value="value"
                // defaultValue='defaultValue'
                fullWidth
            />;
            <FormLabel component="legend">Checkbox:</FormLabel>
            <FormControlLabel
                label="Yes"
                control={<Checkbox checked={checked} onChange={checkboxChange} />}
            />

            <FormLabel component="legend">Radio:</FormLabel>
            <RadioGroup value={radioGroupValue} onChange={radioGroupChange}>
                <FormControlLabel control={<Radio />} value="A" label="A" />
                <FormControlLabel control={<Radio />} value="B" label="B" />
            </RadioGroup>

            <FormLabel component="legend">Select:</FormLabel>
            <Select
                value={selectValue}
                onChange={selectChange}
                inputProps={{ "data-testid": "select-input" }}
                SelectDisplayProps={{ "data-testid": "select-button" } as {}}
            >
                <MenuItem value={1}>One</MenuItem>
                <MenuItem value={2}>Two</MenuItem>
                <MenuItem value={3}>Three</MenuItem>
            </Select>
        </>
    );
}
