import React, { useMemo, useState, useEffect } from "react";
import { useAppSelector } from "../redux/hooks";
import { Box, TextField, Button, MenuItem, Select, FormControl, FormControlLabel, Checkbox, RadioGroup, Radio, Typography } from "@mui/material";
import { validateForm } from "../utils/validation";
import { Parser } from "expr-eval";

export default function PreviewPage() {
  const fields = useAppSelector((s) => s.form.fields);
  const [values, setValues] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  // initialize defaults on mount
  useEffect(() => {
    const init: Record<string, any> = {};
    fields.forEach((f) => {
      if (f.defaultValue !== undefined) init[f.id] = f.defaultValue;
      else if (f.type === "checkbox") init[f.id] = false;
      else init[f.id] = "";
    });
    setValues(init);
  }, [fields]);

  // compute derived fields safely with expr-eval
  const computed = useMemo(() => {
    const res = { ...values };
    const parser = new Parser();
    fields.forEach((f) => {
      if (f.derived?.formula) {
        try {
          // build variables mapping from dependencies or empty
          const vars: Record<string, any> = {};
          (f.derived.dependencies ?? []).forEach((d) => {
            const v = res[d];
            vars[d] = v === "" || v === undefined ? 0 : Number(v) ?? v;
          });
          const expr = parser.parse(f.derived.formula);
          const out = expr.evaluate(vars);
          res[f.id] = out;
        } catch (e) {
          // ignore if invalid
        }
      }
    });
    return res;
  }, [fields, values]);

  // update values with computed
  useEffect(() => {
    setValues((prev) => ({ ...prev, ...computed }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [computed]);

  function handleChange(id: string, v: any) {
    setValues((p) => ({ ...p, [id]: v }));
  }

  function doValidate() {
    const errs = validateForm(fields, values);
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    if (doValidate()) {
      alert("Validation passed. Values: " + JSON.stringify(values, null, 2));
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  if (fields.length === 0) return <Typography>No fields in current form. Add some in Create.</Typography>;

  return (
    <Box component="form" onSubmit={handleSubmit}>
      {fields.map((f) => {
        const val = values[f.id] ?? "";
        const err = errors[f.id];
        if (f.derived) {
          return (
            <TextField
              key={f.id}
              label={`${f.label} (derived)`}
              value={val}
              fullWidth
              margin="normal"
              InputProps={{ readOnly: true }}
              helperText={err}
              error={!!err}
            />
          );
        }

        switch (f.type) {
          case "text":
          case "email":
          case "number":
          case "date":
            return (
              <TextField
                key={f.id}
                label={f.label}
                type={f.type === "number" ? "number" : f.type === "date" ? "date" : "text"}
                value={val}
                onChange={(e) => handleChange(f.id, e.target.value)}
                fullWidth
                margin="normal"
                InputLabelProps={f.type === "date" ? { shrink: true } : undefined}
                helperText={err}
                error={!!err}
              />
            );

          case "textarea":
            return (
              <TextField
                key={f.id}
                label={f.label}
                value={val}
                onChange={(e) => handleChange(f.id, e.target.value)}
                fullWidth
                margin="normal"
                multiline
                rows={4}
                helperText={err}
                error={!!err}
              />
            );

          case "select":
            return (
              <FormControl fullWidth sx={{ mt: 2 }} key={f.id}>
                <Select value={val} onChange={(e) => handleChange(f.id, e.target.value)} displayEmpty>
                  <MenuItem value="">{`Select ${f.label}`}</MenuItem>
                  {f.options?.map((o, i) => (
                    <MenuItem key={i} value={o}>
                      {o}
                    </MenuItem>
                  ))}
                </Select>
                {err && <Typography color="error" variant="caption">{err}</Typography>}
              </FormControl>
            );

          case "radio":
            return (
              <Box key={f.id} sx={{ mt: 2 }}>
                <Typography>{f.label}</Typography>
                <RadioGroup value={val} onChange={(e) => handleChange(f.id, e.target.value)}>
                  {f.options?.map((o, i) => (
                    <FormControlLabel key={i} value={o} control={<Radio />} label={o} />
                  ))}
                </RadioGroup>
                {err && <Typography color="error" variant="caption">{err}</Typography>}
              </Box>
            );

          case "checkbox":
            return (
              <FormControlLabel
                key={f.id}
                control={<Checkbox checked={!!val} onChange={(e) => handleChange(f.id, e.target.checked)} />}
                label={f.label}
              />
            );

          default:
            return null;
        }
      })}

      <Box sx={{ mt: 2 }}>
        <Button variant="contained" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </Box>
  );
}
