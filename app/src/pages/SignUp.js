import Button from 'react-bootstrap/Button';      
import Form from 'react-bootstrap/Form';      
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

async function register(credentials) {
    console.log(credentials);
    return fetch("http://localhost:3030/register", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  }).then(data => data.json())
}

export default function SignUp() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signUpStatus, setSignUpStatus] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        const res = await register({
          email,
          password
        });
        setSignUpStatus(res.message);
        if(res.message == "Sukces"){
          sessionStorage.setItem("isLogged", true);
          sessionStorage.setItem("id", res.id);
          navigate('/konto', { replace: true });
          window.location.reload(false);
        } else {
          sessionStorage.setItem("isLogged", false);
        }
    } 
    return (
      <section>
        <div className='SignFormContainer'>
          <img className="UserImg"src="user_icon.svg" alt="logo" />
          <h2 className='SignInfo'>Rejestracja</h2>
                <Form onSubmit={handleSubmit}>
                  <div className='EmailContainer'>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="e-mail" value={email} onChange={(event) => setEmail(event.target.value)} />
                    </Form.Group>
                  </div>
                  <div className='PasswordContainer'>
                    <Form.Group>
                        <Form.Label>Hasło</Form.Label>
                        <Form.Control type="password" placeholder="hasło" value={password} onChange={(event) => setPassword(event.target.value)} />
                    </Form.Group>
                  </div>
                  <div className='SignButtonContainer'>
                    <Button className="SubmitButton" variant="primary" type="submit">
                        Zarejestruj się
                    </Button>
                  </div>
                </Form>
                <p className='SignUpStatus'>{signUpStatus}</p>
          </div>
      </section>
    );
}