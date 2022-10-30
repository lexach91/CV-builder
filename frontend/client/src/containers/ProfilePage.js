import Layout from "../components/Layout";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { CountryService } from "../service/CountryService";


const ProfilePage = () => {
  const { isAuthenticated, user, registered, loading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [country, setCountry] = useState("");
  const [countriesList, setCountriesList] = useState([]);
  const countryservice = new CountryService();
  const [editMode, setEditMode] = useState(false);
  const [editFirstName, setEditFirstName] = useState(false);
  const [editLastName, setEditLastName] = useState(false);
  const [editBirthDate, setEditBirthDate] = useState(false);
  const [editCountry, setEditCountry] = useState(false);
  // const toast = useRef(null);
  const [formUploading, setFormUploading] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [passwordUpdating, setPasswordUpdating] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  useEffect(() => {
    if (isAuthenticated === false && loading === false) {

    }
  }, [isAuthenticated, loading]);

  if (registered) {
    navigate("/");
  }

  useEffect(() => {
    countryservice.getCountries().then((data) => {
      setCountriesList(data);
    });
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


  return (
    <Layout title='CV-builder | My CVs' content='Welcome to the Your Profile page'>
      <div className="pt-4 container mx-auto">
        <h1 className="text-6xl text-center my-6 text-emerald-400 ">
          Your Profile
        </h1>
        <p  className="text-xl text-center">

        </p>
      </div>
    </Layout>
  );
}

export default ProfilePage;