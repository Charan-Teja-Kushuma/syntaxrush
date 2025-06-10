import React from 'react';

interface UserProps { 
  name: string; 
  age: number; 
} 

const UserProfile: React.FC<UserProps> = ({ name, age }) => { 
  return (
    <div className="profile">
      <h2>{name}</h2>
      <p>Age: {age}</p>
    </div>
  ); 
};