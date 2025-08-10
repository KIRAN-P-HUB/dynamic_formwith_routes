import React from "react";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import { Container, AppBar, Toolbar, Button, Typography } from "@mui/material";
import BuildPage from "./pages/BuildPage";
import PreviewPage from "./pages/PreviewPage";
import MyFormsPage from "./pages/MyFormsPage";
import { useAppSelector } from "./redux/hooks";

export default function App() {
  const fields = useAppSelector((s) => s.form.fields);

  return (
    <BrowserRouter>
      <AppBar position="static">
        <Toolbar>
          <Typography sx={{ flexGrow: 1 }}>Form Builder</Typography>
          <Button color="inherit" component={Link} to="/create">Create</Button>
          <Button color="inherit" component={Link} to="/preview" disabled={fields.length === 0}>Preview</Button>
          <Button color="inherit" component={Link} to="/myforms">My Forms</Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<Navigate to="/create" replace />} />
          <Route path="/create" element={<BuildPage />} />
          <Route
            path="/preview"
            element={fields.length === 0 ? <Navigate to="/create" replace /> : <PreviewPage />}
          />
          <Route path="/myforms" element={<MyFormsPage />} />
          <Route path="*" element={<Navigate to="/create" replace />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}
