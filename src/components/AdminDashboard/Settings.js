import React, { useState } from "react";

const Settings = () => {
  const [email, setEmail] = useState("admin@clinigoal.com");
  const [password, setPassword] = useState("");

  const handleSave = () => {
    alert("Settings saved successfully!");
  };

  return (
    <div className="section-container">
      <h2>Settings ⚙️</h2>

      <div className="form">
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>New Password</label>
        <input
          type="password"
          placeholder="Change password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleSave}>Save Changes</button>
      </div>
    </div>
  );
};

export default Settings;
