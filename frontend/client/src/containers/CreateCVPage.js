import Layout from "../components/Layout";
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog';
import { useNavigate } from "react-router-dom";
import HeaderFormBlock from "../components/HeaderFormBlock";
import SummaryFormBlock from "../components/SummaryFormBlock";
import ExperienceFormBlock from "../components/ExperienceFormBlock";
import { setMessages } from "../features/user";


const CreateCVPage = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [experienceForm, setExperienceForm] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.user);

  const [displayBasic, setDisplayBasic] = useState(false);
  const [displayModal, setDisplayModal] = useState(false);
  const [displayMaximizable, setDisplayMaximizable] = useState(false);
  const [displayPosition, setDisplayPosition] = useState(false);
  const [displayResponsive, setDisplayResponsive] = useState(false);
  const [position, setPosition] = useState('center');

  // Dialog functions for pop up window to delete CV
  const dialogFuncMap = {
      'displayBasic': setDisplayBasic,
      'displayModal': setDisplayModal,
      'displayMaximizable': setDisplayMaximizable,
      'displayPosition': setDisplayPosition,
      'displayResponsive': setDisplayResponsive
  }

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
            deleteCV();
          }}
          autoFocus />
      </div>
    );
  }

  // Check if user is authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      getCVDetails();
    }
  }, [isAuthenticated]);

  // Get CV details
  const getCVDetails = async () => {
    console.log(window.location.origin);
    const res = axios.get(`cvs/?id=${cvId}`);
    
    const data = await res.data;
    console.log(data);
  };
  
  // Get CV id from url
  const cvId = useParams().id;
  console.log(cvId);

  let IdProps = {
    cvId: cvId,
  }


  // Delete CV
  const deleteCV = async () => {
    try {
      await axios.delete(`cvs/?id=${cvId}`);
      dispatch(setMessages("CV deleted successfully"));
      navigate("/cvs");
    } catch (error) {
      console.log("Error deleting CV");
    }
  };

  return (
    <Layout title='CV-builder | My CVs' content='Welcome to the Create CV page'>
      <div className="pt-4 container mx-auto">
        <h1 className="text-center mb-5">Create CV</h1>
        <div className="flex justify-content-center">

          <Button
            className="p-button-rounded p-button-danger"
            label="Delete CV"
            icon="pi pi-times"
            onClick={() => onClickPopUp('displayBasic')} />
          <Dialog
            header="Header"
            visible={displayBasic}
            style={{ width: '50vw', color: 'red' }}
            footer={renderFooter('displayBasic')}
            onHide={() => onHide('displayBasic')}
            >
            <p>Are you sure yo want to delete this CV?</p>
          </Dialog>
        </div>
        <div className="flex justify-content-center">
          <div className="card min-w-screen flex justify-content-center flex-column align-content-center">
            <div className="card mt-4 border-500 border-3 border-round p-4 mx-auto w-6 justify-content-center">
              <h2 className="text-2xl text-center mb-4 text-emerald-400">Header</h2>
              <HeaderFormBlock {...IdProps}/>
            </div>
            {/* Summary block */}
            <div className="card mt-4 border-500 border-3 border-round p-4 mx-auto w-6 justify-content-center">
              <h2 className="text-2xl text-center mb-4 text-emerald-400">Summary</h2>
              <SummaryFormBlock {...IdProps}/>
            </div>
            {/* Experience block */}
            <div className="card mt-4 border-500 border-3 border-round p-4 mx-auto w-6 justify-content-center">
              <h2 className="text-2xl text-center mb-4 text-emerald-400">Experience</h2>
              {!experienceForm && (
                <div className="flex justify-content-center m-4">
                  <Button
                    label='Add experience'
                    className="p-button-rounded p-button-success"
                    onClick={(e) => {
                      e.preventDefault();
                      setExperienceForm(true);
                    }}
                  />
                </div>
              )}
              {experienceForm && <ExperienceFormBlock  />}
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );

}

export default CreateCVPage;