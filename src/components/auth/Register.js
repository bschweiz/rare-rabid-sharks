import React, { useRef } from "react"
import { Link, useHistory } from "react-router-dom"
// import "./Auth.css"

export const Register = (props) => {
  const firstName = useRef()
  const lastName = useRef()
  const username = useRef()
  const email = useRef()
  const password = useRef()
  const verifyPassword = useRef()
  const passwordDialog = useRef()
  const history = useHistory()
  const date = new Date()
  const milliDate = date.getTime()

  const handleRegister = (e) => {
    e.preventDefault()

    if (password.current.value === verifyPassword.current.value) {
      const newUser = {
        "first_name": firstName.current.value,
        "last_name": lastName.current.value,
        "email": email.current.value,
        "password": password.current.value,
        "bio": "",
        "username": username.current.value,
        "created_on": milliDate,
        "profile_image_url":
          "https://images.squarespace-cdn.com/content/v1/5807cfe6d2b8571d8b68c144/1480515998589-7NL4LUSNIIFJUPX8Z4MV/ke17ZwdGBToddI8pDm48kIVI0NgIu4Hmb-wmFS-p3cd7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0gycmlYrUNOm5FlGNDjMZJj6f9OYfcuFirsLK_tEUBlhJZmhFslrvl1gsFu2VInYqA/Booker_JimScheurich_crop.jpg",
        "active": true,
        "account_type_id": 2,
      }

      return fetch("http://127.0.0.1:8088/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(newUser),
      })
        .then((res) => res.json())
        .then((res) => {
          if ("valid" in res && res.valid) {
            localStorage.setItem("rare_user_id", res.token)
            history.push("/")
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

      <form className="form--login" onSubmit={handleRegister}>
        <h1 className="h3 mb-3 font-weight-normal">Register an account</h1>
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
          <label htmlFor="username"> Username </label>
          <input
            ref={username}
            type="text"
            name="username"
            className="form-control"
            placeholder="username"
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
        <fieldset
          style={{
            textAlign: "center",
          }}
        >
          <button className="btn btn-1 btn-sep icon-send" type="submit">
            Register
          </button>
        </fieldset>
      </form>
      <section className="link--register">
        Already registered? <Link to="/login">Login</Link>
      </section>
    </main>
  )
}
