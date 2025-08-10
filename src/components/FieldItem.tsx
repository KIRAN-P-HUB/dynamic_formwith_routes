import React from "react";
import { FormField } from "../redux/formTypes";
import { useAppDispatch } from "../redux/hooks";
import { deleteField, updateField, reorderFields } from "../redux/formSlice";
import { Box, IconButton, Typography, Stack, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import EditIcon from "@mui/icons-material/Edit";

type Props = {
  field: FormField;
  index: number;
  total: number;
};

export default function FieldItem({ field, index, total }: Props) {
  const dispatch = useAppDispatch();

  return (
    <Box sx={{ p: 2, border: "1px solid #ddd", borderRadius: 1, mb: 1, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <Box>
        <Typography variant="subtitle1">{field.label}</Typography>
        <Typography variant="caption">{field.type}{field.validation?.required ? " • Required" : ""}</Typography>
      </Box>

      <Stack direction="row" spacing={1}>
        <IconButton aria-label="move-up" disabled={index === 0} onClick={() => dispatch(reorderFields({ from: index, to: index - 1 }))}>
          <ArrowUpwardIcon />
        </IconButton>
        <IconButton aria-label="move-down" disabled={index === total - 1} onClick={() => dispatch(reorderFields({ from: index, to: index + 1 }))}>
          <ArrowDownwardIcon />
        </IconButton>

        <IconButton color="error" onClick={() => dispatch(deleteField(field.id))}>
          <DeleteIcon />
        </IconButton>
      </Stack>
    </Box>
  );
}
