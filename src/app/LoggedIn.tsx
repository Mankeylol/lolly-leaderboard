"use client"

import "@farcaster/auth-kit/styles.css";
import { AuthKitProvider, SignInButton, useProfile } from "@farcaster/auth-kit";
import axios from 'axios';
import { useEffect, useState } from 'react';
import './styles.css';

const config = {
  relay: "https://relay.farcaster.xyz",
  rpcUrl: "https://mainnet.optimism.io",
  domain: "Lollypop.xyz",
  siweUri: "https://example.com/login",
};

interface User {
  username: string;
  points: number;
}

const getRandomGradient = () => {
  const colors = ['#a854a8', '#d69350', '#5183a0', '#a05e53']; // Add more colors as needed
  const randomColor1 = colors[Math.floor(Math.random() * colors.length)];
  const randomColor2 = colors[Math.floor(Math.random() * colors.length)];
  return `linear-gradient(to right, ${randomColor1}, ${randomColor2})`;
};

function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const response = await axios.get<User[]>('https://lolly-leaderboard-backend.vercel.app/leaderboard');
        setLeaderboardData(response.data);
        setLoading(false); // Set loading to false when data is loaded
      } catch (error) {
        console.error(error);
        setLoading(false); // Set loading to false on error
      }
    };

    fetchLeaderboardData();
  }, []);

  return (
    <div className="mb-16">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {leaderboardData.map((user, index) => (
            <li key={index} className="leaderboard-item">
              <div className="user-container" style={{ background: getRandomGradient() }}>
                <div>
                <span className="number">{index + 1}.</span>
                <span className="username">{user.username}</span>
                </div>
                <span className="points">{user.points} 🍭</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Navbar() {
  return (
    <div className="navbar w-screen">
      <h2 style={{ color: 'white' }}>Lollypop Leaderboard</h2>
    </div>
  );
}

function Footer() {
  const profile = useProfile();
  const [userData, setUserData] = useState<User | null>(null); // Use the User type

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (profile.isAuthenticated) {
          const response = await axios.post('https://lolly-leaderboard-backend.vercel.app/getUserDetails', {
            fid: profile.profile.fid,
          });
          console.log(response)
          if (response.data && response.data.user) {
            setUserData(response.data.user);
          } else {
            console.error('Invalid response structure:', response.data);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, [profile]);

  return (
    <div className="footer">
      <div className="footer-item">
        {userData && userData.username && (
          <span>{userData.username}</span>
        )}
      </div>
      <div className="footer-item">
        {userData && userData.points !== undefined && (
          <span>{userData.points} 🍭</span>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  
  return (
    <main style={{ fontFamily: 'Inter, "Inter Placeholder", sans-serif' }}>
        <Navbar />
        <Leaderboard />
        <Footer />
    </main>
  );
}