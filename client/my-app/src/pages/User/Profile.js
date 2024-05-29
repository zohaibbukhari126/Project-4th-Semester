import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';

const Profile = () => {

  const [profile, setProfile] = useState({
    name: 'Zohaib Abbas',
    age: 20,
    weight: 80,
    height: "5'11"
  });


  const [isEditing, setIsEditing] = useState(false);

  const tableAnimation = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 500 },
  });

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

 
  const handleSaveClick = () => {
    setIsEditing(false);
    
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1 style={{ color: '#333', marginBottom: '20px' }}>Profile</h1>
      <animated.table style={{ margin: '20px auto', borderCollapse: 'collapse', width: '60%', ...tableAnimation }}>
        <tbody>
          <tr>
            <td style={{ padding: '10px', border: '1px solid #ddd' }}>Name:</td>
            <td>{isEditing ? <input type="text" name="name" value={profile.name} onChange={handleInputChange} style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ddd' }} /> : profile.name}</td>
          </tr>
          <tr>
            <td style={{ padding: '10px', border: '1px solid #ddd' }}>Age:</td>
            <td>{isEditing ? <input type="number" name="age" value={profile.age} onChange={handleInputChange} style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ddd' }} /> : profile.age}</td>
          </tr>
          <tr>
            <td style={{ padding: '10px', border: '1px solid #ddd' }}>Weight:</td>
            <td>{isEditing ? <input type="number" name="weight" value={profile.weight} onChange={handleInputChange} style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ddd' }} /> : profile.weight}</td>
          </tr>
          <tr>
            <td style={{ padding: '10px', border: '1px solid #ddd' }}>Height:</td>
            <td>{isEditing ? <input type="text" name="height" value={profile.height} onChange={handleInputChange} style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ddd' }} /> : profile.height}</td>
          </tr>
        </tbody>
      </animated.table>
      {/* Show edit or save button based on editing mode */}
      {isEditing ? (
        <button onClick={handleSaveClick} style={{ backgroundColor: '#008CBA', border: 'none', color: 'white', padding: '10px 20px', textAlign: 'center', textDecoration: 'none', display: 'inline-block', fontSize: '16px', marginTop: '20px', cursor: 'pointer', borderRadius: '5px' }}>Save</button>
      ) : (
        <button onClick={handleEditClick} style={{ backgroundColor: '#f44336', border: 'none', color: 'white', padding: '10px 20px', textAlign: 'center', textDecoration: 'none', display: 'inline-block', fontSize: '16px', marginTop: '20px', cursor: 'pointer', borderRadius: '5px' }}>Edit</button>
      )}
    </div>
  );
};

export default Profile;
