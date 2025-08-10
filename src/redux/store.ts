import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./formSlice";

const LOCAL_KEY = "current_form_fields_v1";

function loadInitialState() {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    if (!raw) return undefined;
    const parsed = JSON.parse(raw);
    return { form: { fields: parsed } };
  } catch {
    return undefined;
  }
}

export const store = configureStore({
  reducer: {
    form: formReducer,
  },
  preloadedState: loadInitialState(),
});

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem(LOCAL_KEY, JSON.stringify(state.form.fields));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
