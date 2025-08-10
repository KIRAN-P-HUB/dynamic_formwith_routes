import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Form {
  id: string;
  name: string;
  createdAt: string;
}

const MyFormsPage: React.FC = () => {
  const [forms, setForms] = useState<Form[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedForms = localStorage.getItem("myForms");
    if (storedForms) {
      setForms(JSON.parse(storedForms));
    }
  }, []);

  const deleteForm = (formId: string) => {
    // Using window.confirm to bypass no-restricted-globals ESLint rule
    const userConfirmed = window.confirm("Are you sure you want to delete this form?");
    if (userConfirmed) {
      const updatedForms = forms.filter((form) => form.id !== formId);
      setForms(updatedForms);
      localStorage.setItem("myForms", JSON.stringify(updatedForms));
    }
  };

  const viewForm = (formId: string) => {
    navigate(`/form/${formId}`);
  };

  const editForm = (formId: string) => {
    navigate(`/edit-form/${formId}`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Forms</h2>
      {forms.length === 0 ? (
        <p>No forms found. Create one!</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ borderBottom: "1px solid #ccc", textAlign: "left" }}>Form Name</th>
              <th style={{ borderBottom: "1px solid #ccc", textAlign: "left" }}>Created At</th>
              <th style={{ borderBottom: "1px solid #ccc", textAlign: "left" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {forms.map((form) => (
              <tr key={form.id}>
                <td style={{ padding: "8px 0" }}>{form.name}</td>
                <td>{new Date(form.createdAt).toLocaleString()}</td>
                <td>
                  <button onClick={() => viewForm(form.id)} style={{ marginRight: "10px" }}>
                    View
                  </button>
                  <button onClick={() => editForm(form.id)} style={{ marginRight: "10px" }}>
                    Edit
                  </button>
                  <button onClick={() => deleteForm(form.id)} style={{ color: "red" }}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyFormsPage;
