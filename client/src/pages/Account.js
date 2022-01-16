import React, {useState} from "react";
import {DeleteUser} from '../services/UserServices'
import UpdatePasswordForm from "../components/UpdatePasswordForm";
import UpdateProfileForm from "../components/UpdateProfileForm";
import { useNavigate } from "react-router";
import swal from '@sweetalert/with-react'


const Account = (props) => {
  const navigate = useNavigate()
  const [passwordButton, togglePassword] = useState(false)
  const [profileButton, toggleProfile] = useState(false)

  const showPasswordForm = () => {
    passwordButton ? togglePassword(false) : togglePassword(true)
  }

  const showProfileForm = () => {
    profileButton ? toggleProfile(false) : toggleProfile(true)
  }

  const handleDeleteUser = async (userId) => {
    swal({
      title: "Are you sure?",
      text: "This account will be permanently deleted!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        DeleteUser(userId)
        props.handleLogOut()
        swal("Poof! Account deleted!", {
        icon: "success",
        })
        .then(() => {
        navigate('/signup')
        })
      } else {
        swal("Your account is safe!");
      }
    })
  }

  return (
    <div className="account-page">
      {props.user.image && (
        <div>
          <img src={props.user.image} alt="" />
        </div>
      )}
      <p> User: {props.user.name}</p>
      <p>Email: {props.user.email}</p>
      <button onClick={showPasswordForm}>Update Password</button>
      <button onClick={showProfileForm}>Update User profile</button>
      <button
        onClick={() => {
          handleDeleteUser(props.user.id)
        }}
      >
        Delete Account
      </button>

      {passwordButton && <UpdatePasswordForm user={props.user} />}
      {profileButton && <UpdateProfileForm user={props.user} />}
    </div>
  )
}

export default Account
