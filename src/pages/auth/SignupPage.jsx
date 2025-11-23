// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// const SignupPage = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     role: 'sales', // Default role
//     password: '',
//     confirmPassword: '',
//   });

//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setSuccess(null);

//     // --- Frontend Validation ---
//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match.");
//       return;
//     }
//     if (formData.password.length < 8) {
//       setError("Password must be at least 8 characters long.");
//       return;
//     }

//     setLoading(true);

//     try {
//         // --- MOCK API CALL ---
//         // Save the user to localStorage so login can pick up role
//         const usersRaw = localStorage.getItem('mock_users');
//         const users = usersRaw ? JSON.parse(usersRaw) : [];

//         // Prevent duplicate emails
//         if (users.find(u => u.email === formData.email)) {
//           setError('An account with this email already exists. Please login.');
//           setLoading(false);
//           return;
//         }

//         const newUser = {
//           name: formData.name,
//           email: formData.email,
//           role: formData.role,
//           password: formData.password, // plain text for mock only
//         };

//         users.push(newUser);
//         localStorage.setItem('mock_users', JSON.stringify(users));

//         console.log("Saved mock user:", newUser);

//         // Simulate network delay
//         await new Promise(resolve => setTimeout(resolve, 800));

//         // Assuming the API call is successful
//         setSuccess("Registration successful! Redirecting to login...");

//         // Redirect to login page after a short delay
//         setTimeout(() => {
//           navigate('/login');
//         }, 1200);

//     } catch (apiError) {
//       // Example of handling an error from the backend (e.g., email already exists)
//       setError(apiError.response?.data?.message || "Registration failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   // List of roles for the dropdown
//   const roles = [
//     { value: 'sales', label: 'Sales / CRM' },
//     { value: 'credit', label: 'Credit Team' },
//     { value: 'legal', label: 'Legal Team' },
//     { value: 'valuation', label: 'Valuation / Verification' },
//     { value: 'finance', label: 'Finance Team' },
//     { value: 'compliance', label: 'Compliance' },
//   ];

//   return (
//     <div className="relative flex items-center justify-center min-h-screen bg-gray-900 overflow-hidden">
//       {/* animated background blobs */}
//       <div className="absolute -top-28 -left-28 w-72 h-72 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full opacity-30 blur-3xl animate-blob" />
//       <div className="absolute -bottom-28 -right-20 w-72 h-72 bg-gradient-to-tr from-yellow-400 to-pink-500 rounded-full opacity-30 blur-3xl animate-blob animation-delay-2500" />

//       <div className="relative z-10 p-8 bg-white rounded-lg shadow-xl w-full max-w-md">
//         <h2 className="text-2xl font-bold text-center mb-6">Create Your Account</h2>
//         <form onSubmit={handleSubmit}>
//           {/* Form Fields */}
//           <div className="mb-4">
//             <label className="block text-gray-700">Full Name</label>
//             <input type="text" name="name" onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Email</label>
//             <input type="email" name="email" onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Department / Role</label>
//             <select name="role" onChange={handleChange} value={formData.role} className="w-full px-3 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
//               {roles.map(role => (
//                 <option key={role.value} value={role.value}>{role.label}</option>
//               ))}
//             </select>
//           </div>
//           <PasswordField name="password" value={formData.password} onChange={handleChange} label="Password" />
//           <PasswordField name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} label="Confirm Password" />

//           {/* Error and Success Messages */}
//           {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
//           {success && <p className="text-green-500 text-sm mb-4 text-center">{success}</p>}

//           <button type="submit" disabled={loading} className="w-full py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors">
//             {loading ? 'Creating Account...' : 'Sign Up'}
//           </button>
//         </form>
//         <p className="mt-6 text-center text-sm">
//           Already have an account?{' '}
//           <Link to="/login" className="text-blue-600 hover:underline">
//             Login here
//           </Link>
//         </p>
//       </div>
//       <style>{` 
//         .animate-blob { animation: blob 8s infinite; }
//         .animation-delay-2500 { animation-delay: 2.5s; }
//         @keyframes blob { 0% { transform: translate(0px, 0px) scale(1); } 33% { transform: translate(25px, -15px) scale(1.05); } 66% { transform: translate(-15px, 20px) scale(0.95); } 100% { transform: translate(0px, 0px) scale(1); } }
//         .blur-3xl { filter: blur(48px); }
//       `}</style>
//     </div>
//   );
// };

// export default SignupPage;

// // Reusable PasswordField component for Signup page (keeps file self-contained)
// function PasswordField({ name, value, onChange, label }) {
//   const [show, setShow] = useState(false);
//   const [focused, setFocused] = useState(false);

//   return (
//     <div className="mb-4 relative">
//       <label className="block text-gray-700">{label}</label>
//       <div className="mt-1 relative">
//         <input
//           type={show ? 'text' : 'password'}
//           name={name}
//           value={value}
//           onChange={onChange}
//           onFocus={() => setFocused(true)}
//           onBlur={() => setFocused(false)}
//           className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 pr-12"
//           required
//         />
//         <button
//           type="button"
//           onClick={() => setShow(!show)}
//           className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1"
//           aria-label={show ? 'Hide password' : 'Show password'}
//         >
//           <div className={`w-9 h-7 flex items-center justify-center ${focused || value.length>0 ? 'scale-90' : ''}`}>
//             {focused || value.length>0 ? (
//               <svg width="34" height="24" viewBox="0 0 34 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 12h26" stroke="#374151" strokeWidth="2" strokeLinecap="round"/></svg>
//             ) : (
//               <svg width="34" height="24" viewBox="0 0 34 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 12C6 5 12 2 17 2s11 3 15 10c-4 7-10 10-15 10S6 19 2 12z" stroke="#374151" strokeWidth="1.5" fill="none"/><circle cx="17" cy="12" r="3" fill="#374151"/></svg>
//             )}
//           </div>
//         </button>
//       </div>
//     </div>
//   );
// }


import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'valuation',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (formData.password !== formData.confirmPassword) return setError("Passwords do not match.");
    if (formData.password.length < 8) return setError("Password must be at least 8 characters long.");

    setLoading(true);

    try {
      const usersRaw = localStorage.getItem('mock_users');
      const users = usersRaw ? JSON.parse(usersRaw) : [];

      if (users.find(u => u.email === formData.email)) {
        setError('Email already exists. Please login.');
        setLoading(false);
        return;
      }

      const newUser = { ...formData };
      users.push(newUser);
      localStorage.setItem('mock_users', JSON.stringify(users));

      setSuccess("Registration successful! Redirecting to login...");
      setTimeout(() => navigate('/login'), 1200);

    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-white to-blue-50 px-4">
      <div className="relative w-full max-w-md p-8 bg-white rounded-3xl shadow-xl border border-gray-100">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">Create Your Account</h2>
        <p className="text-center text-gray-500 mb-6 text-sm">Sign up to join the Valuation Dashboard</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField label="Full Name" name="name" value={formData.name} onChange={handleChange} />
          <InputField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} />
          <PasswordField name="password" value={formData.password} onChange={handleChange} label="Password" />
          <PasswordField name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} label="Confirm Password" />

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {success && <p className="text-green-500 text-sm text-center">{success}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-2 bg-linear-to-r from-blue-600 to-blue-600 hover:from-blue-600 hover:to-blue-600 text-white font-semibold rounded-xl shadow-md transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-500 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 font-medium hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;

// ====================
// Reusable InputField
function InputField({ label, name, type = 'text', value, onChange }) {
  return (
    <div>
      <label className="block text-gray-700 font-medium mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 border rounded-xl shadow-sm border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
        required
      />
    </div>
  );
}

// ====================
// Reusable PasswordField
function PasswordField({ name, value, onChange, label }) {
  const [show, setShow] = useState(false);

  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-medium mb-1">{label}</label>
      <div className="relative flex items-center">
        <input
          type={show ? 'text' : 'password'}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full px-4 py-3 pr-16 border rounded-xl shadow-sm border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
          required
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 text-gray-500 hover:text-gray-700 font-medium"
        >
          {show ? 'Hide' : 'Show'}
        </button>
      </div>
    </div>
  );
}

