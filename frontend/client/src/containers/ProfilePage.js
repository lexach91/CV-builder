import Layout from "../components/Layout";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { CountryService } from "../service/CountryService";
import { Form, Field } from 'react-final-form';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { Password } from 'primereact/password';
import { classNames } from 'primereact/utils';
import { resetRegistered } from '../features/user';


const ProfilePage = () => {
  const { isAuthenticated, user, registered, loading } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const countryservice = new CountryService();
  const [editMode, setEditMode] = useState(false);
  const [editFirstName, setEditFirstName] = useState(false);
  const [editLastName, setEditLastName] = useState(false);
  const [editBirthDate, setEditBirthDate] = useState(false);
  const [editCountry, setEditCountry] = useState(false);
  const [formUploading, setFormUploading] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [passwordUpdating, setPasswordUpdating] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  useEffect(() => {
    if (isAuthenticated === false && loading === false) {
      navigate("/login");
    }
  }, [isAuthenticated, loading]);


  useEffect(() => {
    countryservice.getCountries().then(data => setCountries(data));
  }, []);

  useEffect(() => {
    if (isAuthenticated && user) {
      setFirstName(user.first_name);
      setLastName(user.last_name);
      setEmail(user.email);
      setBirthDate(user.birthday);
      setCountry(user.country);
    } else {
      setFirstName("");
      setLastName("");
      setEmail("");
      setBirthDate("");
      setCountry("");
    }
  }, [isAuthenticated, user]);



  const onChangeFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const onChangeLastName = (e) => {
    setLastName(e.target.value);
  };

  const onChangeBirthDate = (e) => {
    setBirthDate(e.target.value);
  };

  const onChangeCountry = (e) => {
    setCountry(e.target.value);
    setEditCountry(false);
  };

  return (
    <Layout title='CV-builder | My CVs' content='Welcome to the Your Profile page'>
      <div className="pt-4 container mx-auto">
        <h1 className="text-6xl text-center my-6 text-emerald-400 ">
          Your Profile
        </h1>
        <p  className="text-xl text-center">

        </p>

      <Dialog
        header="Change Password"
        footer={
          <div>
            <Button
              label="Cancel"
              onClick={() => {
                setDialogVisible(false);
                setOldPassword("");
                setNewPassword("");
                setConfirmPassword("");
              }}
            />
            <Button
              label="Submit"
              disabled={
                oldPassword.length === 0 ||
                newPassword.length === 0 ||
                confirmPassword.length === 0 ||
                newPassword !== confirmPassword
              }
              onClick={() => {

              }}
            />
          </div>
        }>
        <div className="form-group">
          <label htmlFor="oldPassword">Old Password</label>
          <Password
            id="oldPassword"
            value={oldPassword}
            // onChange={}
            placeholder="Old Password"
            feedback={false}
            toggleMask={true}
          />
        </div>
        <div className="form-group">
          <label htmlFor="newPassword">New Password</label>
          <Password
            id="newPassword"
            value={newPassword}
            // onChange={}
            placeholder="New Password"
            toggleMask={true}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <Password
            id="confirmPassword"
            value={confirmPassword}
            // onChange={}
            placeholder="Confirm Password"
            feedback={false}
            toggleMask={true}
          />
        </div>
      </Dialog>


      <div className="bg-slate-900 p-4 w-full md:w-8 md:mx-auto">
        <div className="text-500 mb-3">
          Your profile information can be changed here.
        </div>
        <ul className="list-none p-0 m-0">
          <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
            <div className="text-500 w-6 md:w-2 font-medium">First Name</div>
            <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
              {editFirstName ? (
                <InputText
                  name="first_name"
                  value={firstName}
                  onChange={onChangeFirstName}
                  onBlur={() => setEditFirstName(!editFirstName)}
                />
              ) : (
                <div className="text-900">{firstName}</div>
              )}
            </div>
            <div className="w-6 md:w-2 flex justify-content-end">
              <Button
                label="Edit"
                icon="pi pi-pencil"
                className="p-button-text bg-indigo-700 hover:bg-indigo-800 text-white"
                onClick={() => setEditFirstName(!editFirstName)}
              />
            </div>
          </li>
          <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
            <div className="text-500 w-6 md:w-2 font-medium">Last Name</div>
            <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
              {editLastName ? (
                <InputText
                  name="last_name"
                  value={lastName}
                  onChange={onChangeLastName}
                  onBlur={() => setEditLastName(!editLastName)}
                />
              ) : (
                <div className="text-900">{lastName}</div>
              )}
            </div>
            <div className="w-6 md:w-2 flex justify-content-end">
              <Button
                label="Edit"
                icon="pi pi-pencil"
                className="p-button-text bg-indigo-700 hover:bg-indigo-800 text-white"
                onClick={() => setEditLastName(!editLastName)}
              />
            </div>
          </li>
          <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
            <div className="text-500 w-6 md:w-2 font-medium">Email</div>
            <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
              <div className="text-900">{email}</div>
            </div>
            <div className="w-6 md:w-2 flex justify-content-end bg-indigo-900">
              <Button
                label="Can't change"
                icon="pi pi-times"
                className="p-button-text"
                disabled={true}
              />
            </div>
          </li>
          <li className="flex align-items-center py-3 px-2 border-top-1 border-bottom-1 border-300 flex-wrap">
            <div className="text-500 w-6 md:w-2 font-medium">Birth Date</div>
            <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1 line-height-3">
              {editBirthDate ? (
                <Calendar
                  name="birth_date"
                  dateFormat="yy-mm-dd"
                  mask="9999-99-99"
                  showIcon
                  value={new Date(birthDate)}
                  onChange={onChangeBirthDate}
                />
              ) : (
                <div className="text-900">{birthDate}</div>
              )}
            </div>
            <div className="w-6 md:w-2 flex justify-content-end">
              <Button
                label="Edit"
                icon="pi pi-pencil"
                className="p-button-text bg-indigo-700 hover:bg-indigo-800 text-white"
                onClick={() => setEditBirthDate(!editBirthDate)}
              />
            </div>
          </li>
          <li className="flex align-items-center py-3 px-2 border-top-1 border-bottom-1 border-300 flex-wrap">
            <div className="text-500 w-6 md:w-2 font-medium">Country</div>
            <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1 line-height-3">
              {editCountry ? (
                <Dropdown
                  name="country"
                  value={country}
                  options={countries}
                  onChange={onChangeCountry}
                />
              ) : (
                <div className="text-900">{country}</div>
              )}
            </div>
            <div className="w-6 md:w-2 flex justify-content-end">
              <Button
                label="Edit"
                icon="pi pi-pencil"
                className="p-button-text bg-indigo-700 hover:bg-indigo-800 text-white"
                onClick={() => setEditCountry(!editCountry)}
              />
            </div>
          </li>
          <li className="flex align-items-center py-3 px-2 border-top-1 border-bottom-1 border-300 flex-wrap">
            <div className="text-500 w-6 md:w-2 font-medium">Password</div>
            <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1 line-height-3">
              <div className="text-900">*********</div>
              {}
            </div>
            <div className="w-6 md:w-2 flex justify-content-end">
              <Button
                label="Edit"
                icon="pi pi-pencil"
                className="p-button-text bg-indigo-700 hover:bg-indigo-800 text-white"
                // onClick={}
              />
            </div>
          </li>
        </ul>
        <div className="flex justify-content-center mt-3">
          <Button
            label="Save"
            icon="pi pi-check"
            className="p-button-primary"
            // onClick={}
            loading={formUploading}
            // disabled={}
          />
        </div>
      </div>
  
    <> </>
      </div>
    </Layout>
  );
}

export default ProfilePage;