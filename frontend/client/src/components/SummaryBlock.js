import React, { useEffect, useState } from "react";
import { Form, Field } from 'react-final-form';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button'



const SummaryBlock = () => {
  const [summary, setSummary] = useState({
    summary: '',
  });

  const onSubmit = (values) => {
    console.log(values);
    // setHeaderFormData(values);
  };
  

  return (
    <>
      <Form
        onSubmit={onSubmit}
        initialValues={{ summary: '' }}
        // validate={validate}
        render={({ handleSubmit }) => (
          <form
            className="p-fluid bg-slate-900 p-6 rounded shadow-md"
          >
            <div className="card">
              <div className="formgrid grid">
                <div className="field col">
                  <Field name="summary" render={({ input, meta }) => (
                    <div className="field col w-full">
                      <span className="p-float-label">
                        <InputTextarea
                          id="summary" {...input}
                          autoFocus
                          className=""
                        />
                        <label
                          htmlFor="summary"
                          className="">
                            summary
                        </label>
                      </span>
                    </div>
                  )} />
                </div>

              </div>
            </div>

            <Button type="submit" label="Save" className="mt-2" />
          </form>
        )} />
    </>
  );
};

export default SummaryBlock;



