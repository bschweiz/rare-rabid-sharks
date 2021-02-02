import React, { useEffect, useContext } from "react"
import { Link, useHistory } from "react-router-dom"
import { UserContext } from "./UserProvider"
import { User } from "./UserDetail"

export const UserList = (props) => {
  console.log(props)
  const { users, getAllUsers } = useContext(UserContext)
  useEffect(() => {
    getAllUsers()
  }, [])
  console.log(users)
  return (
    <>
      <p>User List</p>
      <ul>
        {users.map((user) => (
          <li>
            <Link to={`/users/${user.id}`}>
              {user.first_name} {user.last_name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}
