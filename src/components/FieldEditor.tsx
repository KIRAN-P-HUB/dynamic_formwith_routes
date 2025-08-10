import React, { useState } from "react";
import { useAppDispatch } from "../redux/hooks";
import { addField, updateField } from "../redux/formSlice";
import { FormField, FieldType } from "../redux/formTypes";
import { v4 as uuidv4 } from "uuid";
import {
  Box,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Checkbox,
  FormControlLabel,
  Button,
  Stack,
} from "@mui/material";

const TYPES: FieldType[] = ["text", "number", "textarea", "select", "radio", "checkbox", "date", "email"];

export default function FieldEditor() {
  const dispatch = useAppDispatch();

  const [label, setLabel] = useState("");
  const [type, setType] = useState<FieldType>("text");
  const [required, setRequired] = useState(false);
  const [minLength, setMinLength] = useState<number | "">("");
  const [maxLength, setMaxLength] = useState<number | "">("");
  const [optionsText, setOptionsText] = useState(""); // comma separated
  const [defaultValue, setDefaultValue] = useState<string>("");

  function reset() {
    setLabel("");
    setType("text");
    setRequired(false);
    setMinLength("");
    setMaxLength("");
    setOptionsText("");
    setDefaultValue("");
  }

  function onAddField() {
    const f: FormField = {
      id: uuidv4(),
      label: label.trim(),
      type,
      defaultValue: defaultValue || undefined,
      options: optionsText ? optionsText.split(",").map((s) => s.trim()).filter(Boolean) : undefined,
      validation: {
        required: required || undefined,
        minLength: typeof minLength === "number" ? minLength : undefined,
        maxLength: typeof maxLength === "number" ? maxLength : undefined,
      },
    };
    dispatch(addField(f));
    reset();
  }

  return (
    <Box sx={{ p: 2 }}>
      <Stack spacing={2}>
        <TextField label="Label" value={label} onChange={(e) => setLabel(e.target.value)} fullWidth />

        <FormControl fullWidth>
          <InputLabel>Type</InputLabel>
          <Select value={type} label="Type" onChange={(e) => setType(e.target.value as FieldType)}>
            {TYPES.map((t) => (
              <MenuItem key={t} value={t}>
                {t}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Default value"
          value={defaultValue}
          onChange={(e) => setDefaultValue(e.target.value)}
          fullWidth
        />

        {(type === "select" || type === "radio") && (
          <TextField
            label="Options (comma separated)"
            value={optionsText}
            onChange={(e) => setOptionsText(e.target.value)}
            fullWidth
            helperText="Example: Red,Green,Blue"
          />
        )}

        <FormControlLabel
          control={<Checkbox checked={required} onChange={(e) => setRequired(e.target.checked)} />}
          label="Required"
        />

        <Stack direction="row" spacing={2}>
          <TextField
            label="Min length"
            value={minLength}
            onChange={(e) => setMinLength(e.target.value === "" ? "" : Number(e.target.value))}
            type="number"
          />
          <TextField
            label="Max length"
            value={maxLength}
            onChange={(e) => setMaxLength(e.target.value === "" ? "" : Number(e.target.value))}
            type="number"
          />
        </Stack>

        <Stack direction="row" spacing={2}>
          <Button variant="contained" onClick={onAddField} disabled={!label.trim()}>
            Add Field
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
