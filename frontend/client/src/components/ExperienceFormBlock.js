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
import { setMessages } from "../features/user";



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

  // Pop up deletion form states
  const [displayBasic, setDisplayBasic] = useState(false);
  const [displayModal, setDisplayModal] = useState(false);
  const [displayMaximizable, setDisplayMaximizable] = useState(false);
  const [displayPosition, setDisplayPosition] = useState(false);
  const [displayResponsive, setDisplayResponsive] = useState(false);
  const [position, setPosition] = useState('center');

  // Dialog functions for pop up window to delete experience bullet
  const dialogFuncMap = {
    'displayBasic': setDisplayBasic,
    'displayModal': setDisplayModal,
    'displayMaximizable': setDisplayMaximizable,
    'displayPosition': setDisplayPosition,
    'displayResponsive': setDisplayResponsive
  }

  // Pop up window position
  const onClickPopUp = (name, position) => {
      dialogFuncMap[`${name}`](true);

      if (position) {
          setPosition(position);
      }
  }

  const onHide = (name) => {
    dialogFuncMap[`${name}`](false);
  }

  const renderFooter = (name) => {
    return (
      <div>
        <Button
          label="No"
          icon="pi pi-times"
          onClick={() => onHide(name)}
          className="p-button-text" />
        <Button
          label="Yes"
          icon="pi pi-check"
          onClick={() => {
            onHide(name);
            // deleteExperienceBullet();
          }}
          autoFocus />
      </div>
    );
  }

  // Experience form states
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

          console.log("Experience section exists");
        } else {
          setExperienceSectionExists(false);
          console.log("Experience section does not exist");
        }
        setExperienceSectionData({
          "id": cvId,
          "experiences": data.experience_section.experiences
        });
        console.log(experienceSectionData);
      };
      getCVDetails();
    }
  }, [cvId]);

  const responseExperience = async (data, form) => {
    console.log(data);
    setExperienceBullet(data);
    // Format date to American format
    const start_date = new Date(data.start_date);
    const payload = {
      "id": cvId,
      "experiences": [
        {
          "company": data.company,
          "position": data.position,
          "start_date": new Date(data.start_date).toLocaleDateString("en-US"),
          "end_date": new Date(data.end_date).toLocaleDateString("en-US"),
          "description": data.description,
        }
      ]
    }
    console.log(payload);
    console.log("Experience bullet created in react");
    if (!experienceSectionExists) {
      console.log("Experience section is about to be created");
      try {
        const res = await axios.post(
          `cvs/experience/`,
          payload
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
          payload
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
            <div className="flex justify-content-center flex-column align-content-center mb-4">
                {/* Experience data */}
                <div>
                {experienceSectionData.experiences?.map((experience) => (
                    <>
                      <div className="card mt-4 border-500 border-3 border-round p-4">
                        <div className="card">
                          <div className="formgrid grid">
                            <div className="field col">
                              <label className="text-xl text-center capitalize text-blue-100">
                                Company:
                              </label>
                              <div className="control">
                                <p className="text-lg font-medium">
                                  {experience.company}
                                </p>
                              </div>
                            </div>

                            <div className="field col">
                              <label className="text-xl text-center capitalize text-blue-100">
                                Position:
                              </label>
                              <div className="control">
                                <p className="text-lg font-medium">
                                  {experience.position}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="card">
                          <div className="formgrid grid">
                            <div className="field col">
                              <label className="text-xl text-center capitalize text-blue-100">
                                Start date:
                              </label>
                              <div className="control">
                                <p className="text-lg font-medium">
                                  {experience.start_date}
                                </p>
                              </div>
                            </div>
                            <div className="field col">
                              <label className="text-xl text-center capitalize text-blue-100">
                                End date:
                              </label>
                              <div className="control">
                                <p className="text-lg font-medium">
                                  {experience.end_date}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="card">
                          <div className="formgrid grid">
                            <div className="field col">
                              <label className="text-xl text-center capitalize text-blue-100">
                                Description:
                              </label>
                              <div className="control">
                                <p className="text-lg font-medium">
                                  {experience.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="card flex justify-content-center">
                          <Button
                            label='Edit'
                            className="p-button-rounded p-button-success mr-2 px-4"
                            onClick={(e) => {
                              e.preventDefault();
                              setShowExperienceForm(true);                        
                            }}
                          />
                          <Button
                            label='Delete'
                            className="p-button-rounded p-button-danger ml-2 px-4"
                            onClick={(e) => {
                              e.preventDefault();

                            }}
                          />
                        </div>
                      </div>
                    </>
                  ))}
                <div className="card flex justify-content-center">
                  <Button
                    label='Add experience'
                    className="p-button-rounded p-button-success px-4 mt-4"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowExperienceForm(true);                        
                    }}
                  />
                </div>
              </div>
            </div>
      ) : (
        <>
        Just to check
        </>

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



