// src/pages/CreatePage.tsx
import React, { useState } from "react";
import { Box, Typography, TextField, Button, Paper, Stack } from "@mui/material";

export default function CreatePage() {
  const [formName, setFormName] = useState("");
  const [formDescription, setFormDescription] = useState("");

  const handleCreate = () => {
    if (!formName.trim()) {
      alert("Please enter a form name");
      return;
    }
    console.log("New Form:", { formName, formDescription });
    setFormName("");
    setFormDescription("");
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Create New Form
      </Typography>

      <Paper sx={{ p: 3 }}>
        <Stack spacing={2}>
          <TextField
            label="Form Name"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            fullWidth
          />
          <TextField
            label="Description"
            value={formDescription}
            onChange={(e) => setFormDescription(e.target.value)}
            fullWidth
            multiline
            rows={3}
          />
          <Button variant="contained" color="primary" onClick={handleCreate}>
            Create
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
