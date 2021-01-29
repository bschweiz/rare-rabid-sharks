import React, { useRef, useState } from "react"
import { useHistory } from "react-router-dom"
import "./Login.css"

export const Register = (props) => {
  const history = useHistory()
  const firstName = useRef()
  const lastName = useRef()
  const userName = useRef()
  const email = useRef()
  const password = useRef()
  const verifyPassword = useRef()
  const passwordDialog = useRef()
  const conflictDialog = useRef()
  const date = new Date()
  const milliDate = date.getTime()

  const getall = () => {
    return fetch(`http://localhost:8088/users`).then((res) =>
      res.json().then((users) => console.log(users))
    )
  }

  const existingUserCheck = () => {
    // If your json-server URL is different, please change it below!
    return fetch(`http://localhost:8088/users?email=${email.current.value}`)
      .then((_) => _.json())
      .then((user) => ("id" in user ? user : false))
  }

  const handleRegister = (e) => {
    e.preventDefault()

    if (password.current.value === verifyPassword.current.value) {
      getall()
      existingUserCheck()
        .then((res) => console.log(res))
        .then((userExists) => {
          if (!userExists) {
            // If your json-server URL is different, please change it below!
            fetch("http://localhost:8088/users", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                "first_name": `${firstName.current.value}`,
                "last_name": `${lastName.current.value}`,
                "email": email.current.value,
                "password": password.current.value,
                "bio": "",
                "username": `${userName.current.value}`,
                "profile_image_url": "",
                "created_on": milliDate,
                "active": true,
                "account_type_id": 2,
              }),
            })
              .then((_) => _.json())
              .then((createdUser) => {
                if (createdUser.hasOwnProperty("id")) {
                  // The user id is saved under the key app_user_id in local Storage. Change below if needed!
                  localStorage.setItem("rare_user_id", createdUser.id)
                  history.push("/")
                }
              })
          } else {
            conflictDialog.current.showModal()
          }
        })
    } else {
      passwordDialog.current.showModal()
    }
  }

  return (
    <main style={{ textAlign: "center" }}>
      <dialog className="dialog dialog--password" ref={passwordDialog}>
        <div>Passwords do not match</div>
        <button className="button--close" onClick={(e) => passwordDialog.current.close()}>
          Close
        </button>
      </dialog>

      <dialog className="dialog dialog--password" ref={conflictDialog}>
        <div>Account with that email address already exists</div>
        <button className="button--close" onClick={(e) => conflictDialog.current.close()}>
          Close
        </button>
      </dialog>

      <form className="form--login" onSubmit={handleRegister}>
        <h1 className="h3 mb-3 font-weight-normal">Please Register for Application Name</h1>
        <fieldset>
          <label htmlFor="firstName"> First Name </label>
          <input
            ref={firstName}
            type="text"
            name="firstName"
            className="form-control"
            placeholder="First name"
            required
            autoFocus
          />
        </fieldset>
        <fieldset>
          <label htmlFor="lastName"> Last Name </label>
          <input
            ref={lastName}
            type="text"
            name="lastName"
            className="form-control"
            placeholder="Last name"
            required
          />
        </fieldset>
        <fieldset>
          <label htmlFor="userName"> User Name </label>
          <input
            ref={userName}
            type="text"
            name="userName"
            className="form-control"
            placeholder="user name"
            required
          />
        </fieldset>
        <fieldset>
          <label htmlFor="inputEmail"> Email address </label>
          <input
            ref={email}
            type="email"
            name="email"
            className="form-control"
            placeholder="Email address"
            required
          />
        </fieldset>
        <fieldset>
          <label htmlFor="inputPassword"> Password </label>
          <input
            ref={password}
            type="password"
            name="password"
            className="form-control"
            placeholder="Password"
            required
          />
        </fieldset>
        <fieldset>
          <label htmlFor="verifyPassword"> Verify Password </label>
          <input
            ref={verifyPassword}
            type="password"
            name="verifyPassword"
            className="form-control"
            placeholder="Verify password"
            required
          />
        </fieldset>
        <fieldset>
          <button type="submit"> Sign in </button>
        </fieldset>
      </form>
    </main>
  )
}
