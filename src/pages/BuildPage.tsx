import React from "react";
import FieldEditor from "../components/FieldEditor";
import FieldList from "../components/FieldList";
import { Box, Button, Stack } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
// ✅ Fixed import: match the actual function name in localStorageUtils.ts
import { saveFormFieldsToStorage } from "../utils/localStorageUtils";
import { v4 as uuidv4 } from "uuid";
import { clearFields } from "../redux/formSlice";
import { useNavigate } from "react-router-dom";

export default function BuildPage() {
  const fields = useAppSelector((s) => s.form.fields);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleSave() {
    if (fields.length === 0) {
      alert("Add at least one field before saving.");
      return;
    }
    const name = window.prompt("Enter form name");
    if (!name) return;
    // ✅ Use correct function name
    saveFormFieldsToStorage({ id: uuidv4(), name: name.trim(), fields });
    alert("Form saved");
  }

  function handleClear() {
    // ✅ Use window.confirm to avoid ESLint restricted-globals error
    if (!window.confirm("Clear current builder fields?")) return;
    dispatch(clearFields());
    navigate("/create"); // stay on page
  }

  return (
    <Box>
      <Stack direction={{ xs: "column", md: "row" }} spacing={4}>
        <Box sx={{ flex: 1 }}>
          <FieldEditor />
        </Box>
        <Box sx={{ flex: 1 }}>
          <FieldList />
        </Box>
      </Stack>

      <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
        <Button
          variant="contained"
          onClick={() => navigate("/preview")}
          disabled={fields.length === 0}
        >
          Preview
        </Button>
        <Button
          variant="outlined"
          onClick={handleSave}
          disabled={fields.length === 0}
        >
          Save Form
        </Button>
        <Button variant="text" color="error" onClick={handleClear}>
          Clear
        </Button>
      </Stack>
    </Box>
  );
}
