import React, { useEffect, useState } from 'react';
import Recorder from '../components/Recorder/Recorder';
import { useAuth } from '../context/AuthContext';
import { getFileFromStorage } from '../utils/getFileFromStorage';

const Dashboard = () => {
  const { user } = useAuth();
  const array = [];

  getFileFromStorage(user.uid, 1).then((res) => (array[0] = res));
  getFileFromStorage(user.uid, 2).then((res) => (array[1] = res));
  getFileFromStorage(user.uid, 3).then((res) => (array[2] = res));
  getFileFromStorage(user.uid, 4).then((res) => (array[3] = res));
  console.log(array);

  return (
    <div>
      <p>This route is protected</p>
      <p> Well hello {user.email}!</p>
      <Recorder id={1}></Recorder>
      <Recorder id={2}></Recorder>
      <Recorder id={3}></Recorder>
      <Recorder id={4}></Recorder>
    </div>
  );
};

export default Dashboard;
