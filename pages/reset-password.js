import ResetPasswordForm from '../components/forms/ResetPasswordForm';
import AuthSideBarLayout from '../components/layouts/AuthSideBarLayout';
import React, { useState, useEffect } from 'react';

function ResetPasswordPage() {

  const [popupOpen, setPopup] = useState(false);
  const [error, setError] = useState(false);
  const [formData, setFormdata] = useState('');



  const handleFormSubmit = () => {
    if (formData == '') {
      setError(true)
    } else if (!formData.email.includes("@vida.co.uk")){
      setError(true)
    } else setPopup(true);
  };

  const handleChange = (e) => {
    console.log(formData)
    setFormdata({[e.target.id]: e.target.value})
    setError(false)
  };

  const closePopup = (popupState) => {
    setPopup(false);
  };


  useEffect(() => {

  });

  return (
    <AuthSideBarLayout>
      <ResetPasswordForm onClick={handleFormSubmit} error={error} handleChange={handleChange}/>
    </AuthSideBarLayout>
  )
}

export default ResetPasswordPage;
