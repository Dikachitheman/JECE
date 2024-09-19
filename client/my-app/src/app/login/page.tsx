// app/login/page.js
'use client';

import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import Link from 'next/link';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      login(res.data.token);
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div className='bg-[#fffbe7] h-screen w-screen text-black flex flex-col justify-center items-center'>
      <form onSubmit={handleSubmit} className='text-black bg-white rounded-[24px] py-[44px] w-[30%] flex flex-col items-center'>
        <h2 className=''>Login page</h2>
        
        <div className='mt-[24px] mb-[14px]'>
          <div>
            Email
          </div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='bg-[#fffbe7] rounded-[24px] h-[34px] w-[300px] pl-[22px]'
          />
        </div>
        <div className='mb-[24px]'>
          <div>Password</div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='bg-[#fffbe7] rounded-[24px] h-[34px] w-[300px] pl-[22px]'
          />
        </div>
        <button type="submit" className='bg-[#edff25] hover:bg-[#7aff37] text-[#70752b] rounded-[24px] px-[14px] py-[6px] font-[600]'>Login</button>
        <div className='rounded-[24px] text-wrap w-[60%] px-[14px] py-[14px] bg-[#fff1f5] text-[12px] mt-[14px]'>
          Because of time limit for performing this task, you may have to refresh page after clicking on some buttons to see changes, like edit profile button and add project button. If you log in as admin you can delete agency profiles but you'd have to refresh page to see effect.
        </div>
      </form>
      <p className='mt-[24px]'>
        Don't have an account? <Link href="/register" className='bg-[#ffd187] text-[#70752b] rounded-[24px] px-[14px] py-[6px] font-[600]'>Register</Link>
      </p>
    </div>
  );
};

export default Login;
