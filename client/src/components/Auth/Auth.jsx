import React, { useState } from 'react'
import "./Auth.css"

// Auth() handles logins, setting token and also setting user id
function Auth({ updateLocalStorage }) {

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [login, setLogin] = useState(true)
    

    const register = () => login ? null : (
        <>
        <input
          className='inputs'
          type="text"
          id="first-name"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
          placeholder='Enter first name'
        />
        <input
          className='inputs'
          type="text"
          id="last-name"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
          placeholder='Enter last name'
        />
        </>
    )

    const loginToggle = () => {
      setLogin(!login)
      setFirstName("")
      setLastName("")
      setEmail("")
      setPassword("")
    }

    const toggleBtn = () => login ? "Sign Up" : "Login"

    const handleSubmit = e => {
      e.preventDefault()

      const url = login
        ? "http://127.0.0.1:4000/user/login"
        : "http://127.0.0.1:4000/user/register"

      const body = login
        ? {email, password}
        : {firstName, lastName, email, password}

      fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: new Headers({
            "Content-Type": "application/json",
        })
      })
      .then(res => res.json())
      .then(data => updateLocalStorage(data.token, data.name, data.id))
      .catch(err => console.log(err))
    }

    return (
      <>
      <form action="" className='login-form'>
        {register()}
        <input
          className='inputs'
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Enter email" 
        />
        <input 
          className='inputs'
          type="password"
          name="password"
          id="pwd"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Enter password"
        />
        <span id='form-btns'>
          <button id='enter' onClick={handleSubmit}>Enter</button>
          <div onClick={loginToggle} id="toggle-btn">{toggleBtn()}</div>
        </span>

      </form>
      </>
    )
}

export default Auth