import React from 'react';


const UserDiet = () => {
  // Define a sample weekly food guide
  const weeklyFoodGuide = [
    { day: 'Monday', breakfast: 'Oatmeal', lunch: 'Chicken Salad', dinner: 'Grilled Fish' },
    { day: 'Tuesday', breakfast: 'Avocado Toast', lunch: 'Quinoa Salad', dinner: 'Vegetable Stir-Fry' },
    { day: 'Wednesday', breakfast: 'Scrambled Eggs', lunch: 'Grilled Chicken Sandwich', dinner: 'Salmon with Vegetables' },
    // Add more days and meals here...
  ];

  return (
    <div>
      <h1>Diet</h1>
      

      
      
   
      <h2 style={{ color: 'orange' }}>Weekly Food Guide</h2>
      <table>
        <thead>
          <tr>
            <th>Day</th>
            <th>Breakfast</th>
            <th>Lunch</th>
            <th>Dinner</th>
          </tr>
        </thead>
        <tbody>
          {weeklyFoodGuide.map((dayMeal, index) => (
            <tr key={index}>
              <td>{dayMeal.day}</td>
              <td>{dayMeal.breakfast}</td>
              <td>{dayMeal.lunch}</td>
              <td>{dayMeal.dinner}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Include additional sections like general foods and recipes/guides */}
    </div>
  );
};

export default UserDiet;
