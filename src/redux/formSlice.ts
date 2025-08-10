import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormField } from "./formTypes";

interface FormState {
  fields: FormField[];
}

const initialState: FormState = {
  fields: [],
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    addField(state, action: PayloadAction<FormField>) {
      state.fields.push(action.payload);
    },
    deleteField(state, action: PayloadAction<string>) {
      state.fields = state.fields.filter((f) => f.id !== action.payload);
    },
    setFields(state, action: PayloadAction<FormField[]>) {
      state.fields = action.payload;
    },
    updateField(state, action: PayloadAction<FormField>) {
      const idx = state.fields.findIndex((f) => f.id === action.payload.id);
      if (idx !== -1) state.fields[idx] = action.payload;
    },
    reorderFields(state, action: PayloadAction<{ from: number; to: number }>) {
      const { from, to } = action.payload;
      if (from < 0 || to < 0 || from >= state.fields.length || to >= state.fields.length) return;
      const item = state.fields.splice(from, 1)[0];
      state.fields.splice(to, 0, item);
    },
    clearFields(state) {
      state.fields = [];
    },
  },
});

export const { addField, deleteField, setFields, updateField, reorderFields, clearFields } =
  formSlice.actions;
export default formSlice.reducer;
