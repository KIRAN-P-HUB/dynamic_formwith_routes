import { FormField } from "../redux/formTypes";

export function validateForm(fields: FormField[], values: Record<string, any>) {
  const errs: Record<string, string> = {};

  fields.forEach((f) => {
    const val = values[f.id];
    const v = f.validation;
    if (v?.required) {
      const empty =
        val === undefined || val === "" || val === null || (Array.isArray(val) && val.length === 0);
      if (empty) {
        errs[f.id] = "Required";
        return;
      }
    }

    if (typeof val === "string") {
      if (v?.minLength && val.length < v.minLength) {
        errs[f.id] = `Minimum length ${v.minLength}`;
        return;
      }
      if (v?.maxLength && val.length > v.maxLength) {
        errs[f.id] = `Maximum length ${v.maxLength}`;
        return;
      }
      if (v?.pattern) {
        try {
          const re = new RegExp(v.pattern);
          if (!re.test(val)) {
            errs[f.id] = "Invalid format";
            return;
          }
        } catch {
          // invalid pattern, ignore
        }
      }
      if (v?.email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!re.test(val)) {
          errs[f.id] = "Invalid email";
          return;
        }
      }
      if (v?.passwordRule) {
        const passRe = /^(?=.*\d).{8,}$/;
        if (!passRe.test(val)) {
          errs[f.id] = "Must be min 8 chars and contain a number";
          return;
        }
      }
    }
  });

  return errs;
}
