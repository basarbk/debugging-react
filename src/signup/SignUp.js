import { useEffect, useState } from "react";
import Input from "../components/Input";
import Alert from "../components/Alert";
import ButtonWithProgress from "../components/ButtonWithProgress";
import axios from 'axios';

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [apiProgress, setApiProgress] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setErrors(previousErrors => {
      return {
        ...previousErrors,
        username: undefined
      }
    })
  }, [username])

  useEffect(() => {
    setErrors(previousErrors => {
      return {
        ...previousErrors,
        email: undefined
      }
    })
  }, [email])

  useEffect(() => {
    setErrors(previousErrors => {
      return {
        ...previousErrors,
        password: undefined
      }
    })
  }, [password])

  const submit = async (event) => {
    event.preventDefault();
    const body = {
      username,
      email,
      password
    };
    setApiProgress(true);
    try {
      const response = await axios.post("/api/1.0/users", body);
      setSignUpSuccess(response.dat.message)
    } catch (error) {
      setErrors(error.response.data.validationErrors);
    }
    setApiProgress(false);
  };

  return (
    <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2">
      {!signUpSuccess && (
        <form className="card">
          <div className="card-header">
            <h1 className="text-center">Sign Up</h1>
          </div>
          <div className="card-body">
            <Input
              id="username"
              label="Username"
              onChange={(e) => setUsername(e.target.valu)}
              help={errors.username}
            />
            <Input
              id="email"
              label="E-mail"
              onChange={(e) => setUsername(e.target.value)}
              help={errors.email}
            />
            <Input
              id="password"
              label="Password"
              onChange={(e) => setPassword(e.target.value)}
              help={errors.password}
              type="password"
            />
            <div className="text-center">
              <ButtonWithProgress apiProgres={apiProgress} onClick={submit}>
                Sign Up
              </ButtonWithProgress>
            </div>
          </div>
        </form>
      )}
      {signUpSuccess && (
        <Alert>{signUpSuccess}</Alert>
      )}
    </div>
  );
}

export default SignUp;
