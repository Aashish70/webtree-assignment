import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from '../components/ui/card';

function MainCard() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('https://randomuser.me/api/?page=1&results=1&seed=abc');
        setUserData(response.data.results[0]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!userData) {
    return <p>No data available</p>;
  }

  const { name, gender, phone, picture } = userData;

  return (
    <Card className="flex p-6 space-x-6 bg-yellow-100 shadow-lg rounded-lg w-full max-w-3xl">
      <div>
        <img
          src={picture?.large}
          alt={`${name?.first} ${name?.last}`}
          className="w-40 h-40 rounded-full"
        />
      </div>
      <div>
        <div className="mb-4">
          <p className="text-2xl font-bold">{name?.first} {name?.last}</p>
          <p className="text-lg text-gray-500">{gender}</p>
        </div>
        <div className="text-lg text-gray-700">
          <p>Phone: {phone}</p>
        </div>
      </div>
    </Card>
  );
}

export default MainCard;
