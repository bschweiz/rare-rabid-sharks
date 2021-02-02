import React, { useContext, useEffect, useState } from "react"
import { UserContext } from "./UserProvider"
import { HumanDate } from "../utils/HumanDate"

export const UserDetail = (props) => {
  const { getSingleUser } = useContext(UserContext)
  const userId = parseInt(props.match.params.userId)
  const [user, setUser] = useState({})
  const userType = user.account_type
  const date = new Date(user.created_on)
  let active = ""
  if (user.active === 1) {
    active = "Active"
  } else {
    active = "Disactve"
  }

  useEffect(() => {
    getSingleUser(userId).then(setUser)
  }, [])

  console.log(active)
  return (
    <>
      <h3>
        Name: {user.first_name} {user.last_name}
      </h3>
      <img src={user.profile_image_url} alt={user.first_name} width="100" />
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Password: {user.password}</p>
      {/* <p>Account Type: {user.account_type.label}</p> */}
      <p>Bio: {user.bio}</p>
      <p>Activity Status: {active}</p>
      <p>
        Account Created On:{" "}
        {date.toLocaleString("en-US", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
          timeZone: "America/Chicago",
        })}
      </p>
    </>
  )
}
