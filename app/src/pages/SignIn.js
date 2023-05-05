import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


async function login(credentials) {
    console.log(credentials);
    return fetch("http://localhost:3030/login", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  }).then(data => data.json())
}

export default function SignIn() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginStatus, setLoginStatus] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        const res = await login({
          email,
          password
        });
        setLoginStatus(res.message);
        if(res.message == "Sukces"){
          sessionStorage.setItem("isLogged", true);
          navigate('/konto', { replace: true });
          window.location.reload(false);
        } else {
          sessionStorage.setItem("isLogged", false);
        }
    } 
    return (
        <div className="App">
            <body className="App-body">
                <img className="UserImg"src="user_icon.svg" alt="logo" />
                <p>Logowanie</p>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Email/Login</Form.Label>
                        <Form.Control type="email" placeholder="e-mail" value={email} onChange={(event) => setEmail(event.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Hasło</Form.Label>
                        <Form.Control type="password" placeholder="hasło" value={password} onChange={(event) => setPassword(event.target.value)} />
                    </Form.Group>
                    <Button className="SubmitButton" variant="primary" type="submit">
                        Zaloguj się
                    </Button>
                </Form>
                <p>{loginStatus}</p>
            </body>
        </div>
    );
}