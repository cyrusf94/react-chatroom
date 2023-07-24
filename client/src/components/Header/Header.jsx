import React from 'react'
import "./Header.css"

function Header({ roomName, logout }) {
    return (
        <>
        <div id='header'>
            <h1>Chat Room</h1>
            <h2>{roomName}</h2>
            <button id="logout" onClick={logout}>Logout</button>
        </div>
        </>
    )
}

export default Header