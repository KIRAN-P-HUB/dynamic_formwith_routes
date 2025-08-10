export type FieldType = "text" | "number" | "textarea" | "select" | "radio" | "checkbox" | "date" | "email";

export interface ValidationRules {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string; // regex string
  email?: boolean;
  passwordRule?: boolean;
}

export interface DerivedField {
  // allow multiple parents
  dependencies?: string[]; // parent field IDs
  formula?: string; // expression using parent field ids as variables
}

export interface FormField {
  id: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: string[]; // for select/radio
  defaultValue?: any;
  validation?: ValidationRules;
  derived?: DerivedField;
}




  