// src/utils/localStorageUtils.ts
import { FormField } from "../redux/formTypes";

// Define the structure for a full form
export interface StoredForm {
  id: string;
  name: string;
  fields: FormField[];
}

const STORAGE_KEY = "forms";

/**
 * Save a form (id, name, fields) into localStorage
 */
export function saveFormFieldsToStorage(form: StoredForm) {
  const existing: StoredForm[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  existing.push(form);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
}

/**
 * Load all saved forms from localStorage
 */
export function loadFormFieldsFromStorage(): StoredForm[] {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
}

/**
 * Delete a form by its ID
 */
export function deleteFormFromStorage(id: string) {
  const existing: StoredForm[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  const updated = existing.filter(form => form.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

/**
 * Update an existing form in localStorage
 */
export function updateFormInStorage(updatedForm: StoredForm) {
  const existing: StoredForm[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  const updated = existing.map(form =>
    form.id === updatedForm.id ? updatedForm : form
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}
