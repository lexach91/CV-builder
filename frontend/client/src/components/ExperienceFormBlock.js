import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Field } from 'react-final-form';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button'
import "react-datepicker/dist/react-datepicker.css";
import { Calendar } from 'primereact/calendar';
import { Checkbox } from 'primereact/checkbox';



const ExperienceFormBlock = (props) => {
  const { isAuthenticated, user, registered, loading } = useSelector(
    (state) => state.user
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated]);

  const [showExperienceForm, setShowExperienceForm] = useState(false);
  const [experienceSectionExists, setExperienceSectionExists] = useState(false);
  const [experienceSectionData, setExperienceSectionData] = useState({});
  const [experienceBullet, setExperienceBullet] = useState({
    company: "",
    position: "",
    start_date: "",
    end_date: "",
    description: "",
  });
  const [present, setPresent] = useState(false);

  // Props with cvId
  const { cvId } = props;

  // Retrieve experience section data
  useEffect(() => {
    if (cvId) {
      const getCVDetails = async () => {
        console.log(window.location.origin);
        const res = await axios.get(`cvs/?id=${cvId}`);

        const data = await res.data;
        console.log(data);
        if (data.experience_section !== null) {
          setExperienceSectionExists(true)
          setExperienceSectionData({data});
          console.log(experienceSectionData);
          console.log("Experience section exists");
        } else {
          setExperienceSectionExists(false);
          console.log("Experience section does not exist");
        }
      };
      getCVDetails();
    }
  }, [cvId]);

  const responseExperience = async (data, form) => {
    console.log(data);
    setExperienceBullet(data);
    const payloadExperienceBullet = {
      id: cvId,
      company: data.company,
      position: data.position,
      start_date: data.start_date,
      end_date: data.end_date,
      description: data.description,
    };
    console.log(payloadExperienceBullet);
    console.log("Experience bullet created");
    if (!experienceSectionExists) {
      console.log("Experience section is about to be created");
      try {
        const res = await axios.post(
          `cvs/experience/`,
          payloadExperienceBullet
        );
        const data = await res.data;
        console.log(data);
        setExperienceSectionExists(true);
        setExperienceSectionData(data);
        setShowExperienceForm(false);
      }
      catch (err) {
        console.log(err);
      }
    } else {
      console.log("Experience section is about to be updated");
      try {
        const res = await axios.put(
          `cvs/experience/`,
          payloadExperienceBullet
        );
        const data = await res.data;
        console.log(data);
        setExperienceSectionData(data);
        setShowExperienceForm(false);
      }
      catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
    {!showExperienceForm && (
      <div className="flex justify-content-center m-4">
        {/* Check if Experience exist */}
        {experienceSectionExists ? (
          <>
            <div className="flex justify-content-center flex-column align-content-center mb-4">
              <div>
                {/* Experience data */}

              </div>
            </div>
            <Button
              label='Edit experience'
              className="p-button-rounded p-button-success m-0"
              onClick={(e) => {
                e.preventDefault();
                setShowExperienceForm(true);                        
              }}
            />
        </> 
      ) : (
        <Button
          label='Add experience'
          className="p-button-rounded p-button-success"
          onClick={(e) => {
            e.preventDefault();
            setShowExperienceForm(true);                        
          }}
        />
      )}
    </div>
    )}
    {showExperienceForm && (
      <Form
        onSubmit={responseExperience}
        initialValues={{ company: '', position: '', start_date: '', end_date: '', description: '' }}
        // validate={validate}
        render={({ handleSubmit }) => (
          <form
            className="p-fluid bg-slate-900 p-6 rounded shadow-md"
            onSubmit={handleSubmit}
          >
            <div className="card mt-4 border-500 border-3 border-round p-4">
              <div className="card">
                <div className="formgrid grid">
                  <div className="field col">
                    <Field name="company" render={({ input, meta }) => (
                      <div className="field">
                        <span className="p-float-label">
                          <InputText
                            id={`company-new`}
                            {...input}
                            autoFocus
                            className=""
                          />
                          <label
                            htmlFor={`company-new`}
                            className="">
                              company
                          </label>
                        </span>
                      </div>
                    )} />
                  </div>
                  <div className="field col">
                    <Field name="position" render={({ input, meta }) => (
                      <div className="field">
                        <span className="p-float-label">
                          <InputText
                            id={`position-new`}
                            {...input}
                            autoFocus
                            className=""
                          />
                          <label
                            htmlFor={`position-new`}
                            className="">
                              position
                          </label>
                        </span>
                      </div>
                    )} />
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="formgrid grid">
                  <div className="field col">
                    <Field name="start_date" render={({ input, meta }) => (
                      <div className="field">
                        <span className="p-float-label">
                          <Calendar
                            id="start-date"
                            {...input}
                            dateFormat="dd/mm/yy"
                            mask="99/99/9999"
                            showIcon
                          />
                          <label
                            htmlFor={`start-date`}
                            className="">
                              start_date
                          </label>
                        </span>
                      </div>
                    )} />
                  </div>
                  <div className="field col">
                    <Field name="end_date" render={({ input, meta }) => (
                      <div className="field">
                        {present ? (
                          <span className="p-float-label">
                            <InputText
                              id={`end-date`}
                              value = "Present"
                              disabled
                              className="font-bold"
                            />
                            <label
                              htmlFor={`end-date`}
                              className="">
                                end_date
                            </label>
                          </span>
                        ) : (
                        <span className="p-float-label">
                          <Calendar
                            id="end-date"
                            {...input}
                            dateFormat="dd/mm/yy"
                            mask="99/99/9999"
                            showIcon
                            disabled={present}
                            visible={present}
                          />
                          
                          <label
                            htmlFor={`end-date`}
                            className="">
                              end_date
                          </label>
                        </span>
                          )
                        }
                      </div>
                    )} />
                  </div>
                </div>
                <div className="card">
                  <div className="formgrid grid">
                    <div className="field col flex align-content-center">
                      <Checkbox
                        inputId="job-present"
                        value="Present"
                        onChange={e => setPresent(e.checked)} checked={present}

                        >
                      </Checkbox>
                      <label htmlFor="job-present" className="p-checkbox-label ml-2 pb-1">Present</label>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="formgrid grid">
                    <Field name="description" render={({ input, meta }) => (
                        <div className="field col w-full">
                          <span className="p-float-label">
                            <InputTextarea
                              id={`description-new`}
                              {...input}
                              autoFocus
                              className=""
                            />
                            <label
                              htmlFor={`description-new`}
                              className="">
                                description
                            </label>
                          </span>
                        </div>
                      )} />
                  </div>
                </div>
              </div>
              <Button type="submit" label="Submit" icon="pi pi-check"/>
            </div>
          </form>
        )} />
    )}
    </>
  );
};

export default ExperienceFormBlock;



