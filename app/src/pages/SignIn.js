import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';      


export default function SignIn() {
    return (
        <div className="App">
            <body className="App-body">
                <img className="UserImg"src="user_icon.svg" alt="logo" />
                <p>Logowanie</p>
                <Form>
                    <Form.Group>
                        <Form.Label>Email/Login</Form.Label>
                        <Form.Control type="email" placeholder="e-mail" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Hasło</Form.Label>
                        <Form.Control type="password" placeholder="hasło" />
                    </Form.Group>
                    <Button className="SubmitButton" variant="primary" type="submit">
                        Zaloguj się
                    </Button>
                </Form>
            </body>
        </div>
    );
}