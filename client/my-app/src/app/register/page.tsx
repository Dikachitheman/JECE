// app/register/page.js
"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [username, setUsername] = useState('');
  const [pin, setPin] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('agency'); // Default role is 'agency'
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request to register the user
      await axios.post('http://localhost:5000/api/auth/register', {
        // username,
        // firstname,
        // lastname,
        // phonenumber,
        email,
        username,
        password,
        role, // Pass the selected role
      });
      // After successful registration, redirect the user to the login page
      router.push('/login');
    } catch (error) {
      console.error('Error registering user:', error);
      // Handle registration error, e.g., display an error message
    }
  };

  return (
    <div className='bg-[#fffbe7] h-screen w-screen text-black flex flex-col justify-center items-center'>
      <form onSubmit={handleSubmit} className='text-black bg-white rounded-[24px] py-[44px] w-[30%] flex flex-col items-center'>
        <h2 className=''>Register</h2>
        
        <div className='mt-[24px] mb-[14px]'>
          <div>Username</div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='bg-[#fffbe7] rounded-[24px] h-[34px] w-[300px] pl-[22px]'
          />
        </div>

        <div className='mb-[14px]'>
          <div>Email</div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='bg-[#fffbe7] rounded-[24px] h-[34px] w-[300px] pl-[22px]'
          />
        </div>

        <div className='mb-[14px]'>
          <div>Password</div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='bg-[#fffbe7] rounded-[24px] h-[34px] w-[300px] pl-[22px]'
          />
        </div>

        <div className='mb-[24px]'>
          <div>Role</div>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className='bg-[#fffbe7] rounded-[24px] h-[34px] w-[300px] pl-[22px]'
          >
            <option value="admin">Admin</option>
            <option value="agency">Agency</option>
          </select>
        </div>

        <button type="submit" className='bg-[#edff25] text-[#70752b] rounded-[24px] px-[14px] py-[6px] font-[600]'>Register</button>
      </form>

      <p className='mt-[24px]'>
        Already have an account? <Link href="/login" className='bg-[#ffd187] text-[#70752b] rounded-[24px] px-[14px] py-[6px] font-[600]'>Login</Link>
      </p>
    </div>

  );
}

