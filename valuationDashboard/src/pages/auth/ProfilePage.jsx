import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import "./ProfilePage.css";

const ProfilePage = () => {
  const { user, login } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [profileImage, setProfileImage] = useState("https://via.placeholder.com/150");

  useEffect(() => {
    if (user) {
      setUsername(user.name || "");
      setEmail(user.email || "");
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = { ...user, name: username, email };
    login(updatedUser);
    alert("Profile updated successfully!");
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    // Logic to change password
    alert("Password changed successfully!");
    setShowPassword(false);
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <h1 className="profile-title">Edit Profile</h1>
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="profile-button"
          >
            {showPassword ? "Cancel" : "Change Password"}
          </button>
        </div>

        {showPassword ? (
          <div className="profile-section-divider">
            <h2 className="profile-section-title">Change Password</h2>
            <form onSubmit={handlePasswordChange}>
              <div className="mb-4">
                <label className="profile-form-label" htmlFor="password">
                  New Password
                </label>
                <input
                  className="profile-form-input"
                  id="password"
                  type="password"
                  placeholder="******************"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="profile-form-label" htmlFor="current-password">
                  Current Password
                </label>
                <input
                  className="profile-form-input"
                  id="current-password"
                  type="password"
                  placeholder="******************"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="profile-form-label" htmlFor="confirm-password">
                  Confirm New Password
                </label>
                <input
                  className="profile-form-input"
                  id="confirm-password"
                  type="password"
                  placeholder="******************"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div className="flex items-center">
                <button className="profile-update-button" type="submit">
                  Update Password
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div>
            <div className="flex items-center mb-6">
              <div className="relative">
                <img
                  className="w-32 h-32 rounded-full mr-6"
                  src={profileImage}
                  alt="Profile"
                />
                <label
                  htmlFor="profileImage"
                  className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L14.732 5.232z" />
                  </svg>
                  <input type="file" id="profileImage" className="hidden" onChange={handleImageChange} />
                </label>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{username}</h2>
                <p className="text-gray-600">{email}</p>
              </div>
            </div>

            <div className="profile-section-divider">
              <h2 className="profile-section-title">Organization Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="profile-form-label">Organization Name</label>
                  <p className="profile-form-text">Fintech Solutions Inc.</p>
                </div>
                <div>
                  <label className="profile-form-label">Organization Address</label>
                  <p className="profile-form-text">123 Finance Street, Suite 456, Money City, 78910</p>
                </div>
                <div>
                  <label className="profile-form-label">Contact Number</label>
                  <p className="profile-form-text">+1 (555) 123-4567</p>
                </div>
                <div>
                  <label className="profile-form-label">Email</label>
                  <p className="profile-form-text">contact@fintechsolutions.com</p>
                </div>
              </div>
            </div>

            <div className="profile-section-divider">
              <h2 className="profile-section-title">User Details</h2>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="mb-4">
                    <label className="profile-form-label" htmlFor="username">
                      Username
                    </label>
                    <input
                      className="profile-form-input"
                      id="username"
                      type="text"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="profile-form-label" htmlFor="email">
                      Email
                    </label>
                    <input
                      className="profile-form-input"
                      id="email"
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="profile-form-label">Role</label>
                    <p className="profile-form-text">Administrator</p>
                  </div>
                  <div className="mb-4">
                    <label className="profile-form-label">Department</label>
                    <p className="profile-form-text">IT</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <button className="profile-update-button" type="submit">
                    Update Profile
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;