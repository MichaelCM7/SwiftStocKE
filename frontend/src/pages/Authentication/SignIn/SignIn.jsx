import './SignIn.css';
import axios from 'axios';
import { useState } from 'react';

export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    axios.post('/api/auth/sign-in', {
      email: email,
      password: password
    })
  }

  return (
    <>
      <h1>SignIn Page</h1>
    </>
  );
}