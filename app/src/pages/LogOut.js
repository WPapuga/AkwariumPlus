import React from 'react'

function LogOut() {
  if(sessionStorage.getItem('isLogged') == "true"){
    sessionStorage.setItem('isLogged', false);
    window.location.reload(false);
  }
  return (
    <div>
        <h1>Wylogowano pomyślnie</h1>
    </div>
  )
}

export default LogOut