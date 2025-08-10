// src/components/FormRenderer.tsx
import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

interface Field {
  id: string;
  label: string;
  type: string;
  required?: boolean;
  options?: string[]; // for dropdown/select fields
}

interface FormRendererProps {
  fields: Field[];
  formName?: string;
  onSubmit?: (data: Record<string, any>) => void;
}

export default function FormRenderer({
  fields,
  formName,
  onSubmit,
}: FormRendererProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});

  function handleChange(id: string, value: any) {
    setFormData((prev) => ({ ...prev, [id]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    } else {
      console.log("Form submitted:", formData);
      alert("Form submitted! Check console for data.");
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 500, mx: "auto" }}>
      {formName && (
        <Typography variant="h5" sx={{ mb: 2 }}>
          {formName}
        </Typography>
      )}

      {fields.map((field) => {
        switch (field.type) {
          case "text":
          case "number":
          case "date":
          case "email":
            return (
              <TextField
                key={field.id}
                label={field.label}
                type={field.type}
                required={field.required}
                fullWidth
                margin="normal"
                onChange={(e) => handleChange(field.id, e.target.value)}
              />
            );

          case "textarea":
            return (
              <TextField
                key={field.id}
                label={field.label}
                multiline
                rows={4}
                required={field.required}
                fullWidth
                margin="normal"
                onChange={(e) => handleChange(field.id, e.target.value)}
              />
            );

          case "select":
            return (
              <FormControl key={field.id} fullWidth margin="normal" required={field.required}>
                <InputLabel>{field.label}</InputLabel>
                <Select
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  defaultValue=""
                >
                  {field.options?.map((opt, idx) => (
                    <MenuItem key={idx} value={opt}>
                      {opt}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            );

          case "checkbox":
            return (
              <FormControlLabel
                key={field.id}
                control={
                  <Checkbox
                    onChange={(e) => handleChange(field.id, e.target.checked)}
                  />
                }
                label={field.label}
              />
            );

          default:
            return (
              <Typography key={field.id} color="error">
                Unsupported field type: {field.type}
              </Typography>
            );
        }
      })}

      <Button
        variant="contained"
        type="submit"
        sx={{ mt: 3 }}
      >
        Submit
      </Button>
    </Box>
  );
}
