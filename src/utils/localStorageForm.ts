import { FormField } from "../redux/formTypes";

export interface SavedForm {
  id: string;
  name: string;
  createdAt: string;
  fields: FormField[];
}

const KEY = "my_forms_v1";

export function loadSavedForms(): SavedForm[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    return JSON.parse(raw) as SavedForm[];
  } catch {
    return [];
  }
}

export function saveFormToLocalStorage(form: Omit<SavedForm, "createdAt">) {
  const existing = loadSavedForms();
  const toSave = { ...form, createdAt: new Date().toISOString() };
  existing.push(toSave);
  localStorage.setItem(KEY, JSON.stringify(existing));
}

export function deleteSavedForm(id: string) {
  const existing = loadSavedForms();
  const filtered = existing.filter((f) => f.id !== id);
  localStorage.setItem(KEY, JSON.stringify(filtered));
}
