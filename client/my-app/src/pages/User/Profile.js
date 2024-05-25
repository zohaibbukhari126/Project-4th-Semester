import React, { useState } from 'react';

const Profile = () => {
  // Define initial profile data
  const [profile, setProfile] = useState({
    name: 'Your Name',
    age: 20,
    weight: 80,
    height: "5'11"
  });

  // State for editing mode
  const [isEditing, setIsEditing] = useState(false);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value
    });
  };

  // Handle edit button click
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // Handle save button click
  const handleSaveClick = () => {
    setIsEditing(false);
    // Here you can add logic to save the updated profile data
  };

  return (
    <div>
      <h1>Profile</h1>
      <table className="profile-table">
        <tbody>
          <tr>
            <td>Name:</td>
            <td>{isEditing ? <input type="text" name="name" value={profile.name} onChange={handleInputChange} /> : profile.name}</td>
          </tr>
          <tr>
            <td>Age:</td>
            <td>{isEditing ? <input type="number" name="age" value={profile.age} onChange={handleInputChange} /> : profile.age}</td>
          </tr>
          <tr>
            <td>Weight:</td>
            <td>{isEditing ? <input type="number" name="weight" value={profile.weight} onChange={handleInputChange} /> : profile.weight}</td>
          </tr>
          <tr>
            <td>Height:</td>
            <td>{isEditing ? <input type="text" name="height" value={profile.height} onChange={handleInputChange} /> : profile.height}</td>
          </tr>
        </tbody>
      </table>
      {/* Show edit or save button based on editing mode */}
      {isEditing ? (
        <button onClick={handleSaveClick} className="btn">Save</button>
      ) : (
        <button onClick={handleEditClick} className="btn">Edit</button>
      )}
    </div>
  );
};

export default Profile;
