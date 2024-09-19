// // app/login/page.js
// "use client"
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import axios from 'axios';
// import { useUser } from '../layout';

// export default function LoginPage() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const router = useRouter();

//   const { user, setUser } = useUser();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Make a POST request to log the user in
//       const response = await axios.post('http://localhost:5000/login', { email, password });
//       const name = `${response.data.user.firstname}, ${response.data.user.lastname}`
//       console.log(response.data.user.firstname)
//       console.log("hhhhhh")
//       setUser(name)
//       // Check the user's role and redirect them to the appropriate page
//       if (response.data.role === 'superadmin') {
//         router.push('/superadmin');
//       } else if (response.data.role === 'admin') {
//         router.push('/super-admin');
//       } else {
//         // Redirect regular users to a protected route (e.g., a dashboard)
//         router.push('/super-admin');
//       }
//     } catch (error) {
//       console.error('Error logging in:', error);
//       // Handle login error, e.g., display an error message
//     }
//   };

//   return (
//     <div>
//       <h1>Login</h1>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Email:
//           <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
//         </label>
//         <label>
//           Password:
//           <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//         </label>
//         <button type="submit">Login</button>
//       </form>
//       <p>
//         Don't have an account? <Link href="/register">Register</Link>
//       </p>
//     </div>
//   );
// }