import React from "react";
import { useAppSelector } from "../redux/hooks";
import FieldItem from "./FieldItem";
import { Typography, Box } from "@mui/material";

export default function FieldList() {
  const fields = useAppSelector((s) => s.form.fields);

  if (fields.length === 0) {
    return <Typography>No fields added yet.</Typography>;
  }

  return (
    <Box>
      {fields.map((f, idx) => (
        <FieldItem key={f.id} field={f} index={idx} total={fields.length} />
      ))}
    </Box>
  );
}
