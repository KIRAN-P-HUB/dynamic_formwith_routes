import React, { useState } from "react";
import { FormField } from "../redux/formTypes";
import { Box, Select, MenuItem, InputLabel, FormControl, TextField, Button } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { updateField } from "../redux/formSlice";

type Props = { field: FormField };

export default function DerivedFieldConfig({ field }: Props) {
  const allFields = useAppSelector((s) => s.form.fields);
  const dispatch = useAppDispatch();

  const [deps, setDeps] = useState<string[]>(field.derived?.dependencies ?? []);
  const [formula, setFormula] = useState(field.derived?.formula ?? "");

  function save() {
    const updated: FormField = {
      ...field,
      derived: { dependencies: deps, formula: formula || undefined },
    };
    dispatch(updateField(updated));
  }

  return (
    <Box sx={{ mt: 2 }}>
      <FormControl fullWidth>
        <InputLabel>Parent Fields</InputLabel>
        <Select
          multiple
          value={deps}
          label="Parent Fields"
          onChange={(e) => setDeps(typeof e.target.value === "string" ? e.target.value.split(",") : (e.target.value as string[]))}
          renderValue={(selected) => (selected as string[]).map(id => allFields.find(f=>f.id===id)?.label ?? id).join(", ")}
        >
          {allFields.filter(f=>f.id !== field.id).map(f => (
            <MenuItem key={f.id} value={f.id}>{f.label}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Formula"
        fullWidth
        multiline
        rows={2}
        sx={{ mt: 2 }}
        value={formula}
        onChange={(e) => setFormula(e.target.value)}
        helperText="Use parent field IDs as variables. Example: (fieldA + fieldB) / 2"
      />

      <Button variant="contained" sx={{ mt: 2 }} onClick={save}>Save Derived</Button>
    </Box>
  );
}
