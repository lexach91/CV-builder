import { Form, Field } from 'react-final-form';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button'


const onSubmit = (values) => {
  console.log(values);
};

const HeaderBlock = (
  <>
    <Form
      onSubmit={onSubmit}
      initialValues={{ first_name: '', last_name: '', email: '', password: '', birthday: null, country: null, password_confirm: '' }}
      // validate={validate}
      render={({ handleSubmit }) => (
        <form
          className="p-fluid bg-slate-900 p-6 rounded shadow-md"
        >
          <div className="card">
            <div class="formgrid grid">
              <div class="field col">
                <Field name="first_name" render={({ input, meta }) => (
                  <div className="field">
                    <span className="p-float-label">
                      <InputText
                        id="first_name" {...input}
                        autoFocus
                        className=""
                      />
                      <label
                        htmlFor="first_name"
                        className="">
                          First name
                      </label>
                    </span>
                  </div>
                )} />
              </div>

              <div class="field col">
                <Field name="last_name" render={({ input, meta }) => (
                  <div className="field">
                    <span className="p-float-label">
                      <InputText
                        id="last_name" {...input}
                        autoFocus
                        className=""
                      />
                      <label
                        htmlFor="last_name"
                        className="">
                          Last name
                      </label>
                    </span>
                  </div>
                )} />
              </div>
            </div>
          </div>

          <div className="card mb-4">
            <div class="formgrid grid">
              <Field name="job_title" render={({ input, meta }) => (
                  <div className="field col w-full">
                    <span className="p-float-label">
                      <InputText
                        id="job_title" {...input}
                        autoFocus
                        className=""
                      />
                      <label
                        htmlFor="job_title"
                        className="">
                          job_title
                      </label>
                    </span>
                  </div>
                )} />
            </div>
          </div>

          <div className="card">
            <div class="formgrid grid">
              <div class="field col">
                <Field name="email" render={({ input, meta }) => (
                  <div className="field">
                    <span className="p-float-label">
                      <InputText
                        id="email" {...input}
                        autoFocus
                        className=""
                      />
                      <label
                        htmlFor="email"
                        className="">
                          email
                      </label>
                    </span>
                  </div>
                )} />
              </div>

              <div class="field col">
                <Field name="phone" render={({ input, meta }) => (
                  <div className="field">
                    <span className="p-float-label">
                      <InputText
                        id="phone" {...input}
                        autoFocus
                        className=""
                      />
                      <label
                        htmlFor="phone"
                        className="">
                          phone
                      </label>
                    </span>
                  </div>
                )} />
              </div>
            </div>
          </div>

          <div className="card">
            <div class="formgrid grid">
              <Field name="address" render={({ input, meta }) => (
                  <div className="field col w-full">
                    <span className="p-float-label">
                      <InputText
                        id="address" {...input}
                        autoFocus
                        className=""
                      />
                      <label
                        htmlFor="address"
                        className="">
                          address
                      </label>
                    </span>
                  </div>
                )} />
            </div>
          </div>

          <div className="card">
            <div class="formgrid grid">
              <Field name="url_link" render={({ input, meta }) => (
                  <div className="field col w-full">
                    <span className="p-float-label">
                      <InputText
                        id="url_link" {...input}
                        autoFocus
                        className=""
                      />
                      <label
                        htmlFor="url_link"
                        className="">
                          url_link
                      </label>
                    </span>
                  </div>
                )} />
            </div>
          </div>

          <Button type="submit" label="Save" className="mt-2" />
        </form>
      )} />
  </>
);

export default HeaderBlock;



