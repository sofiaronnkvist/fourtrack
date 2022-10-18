import React from 'react';
import Recorder from '../components/Recorder/Recorder';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  console.log(user);
  return (
    <div>
      <p>This route is protected</p>
      <p> Well hello {user.email}!</p>
      <Recorder id={1}></Recorder>
      <Recorder id={2}></Recorder>
    </div>
  );
};

export default Dashboard;
