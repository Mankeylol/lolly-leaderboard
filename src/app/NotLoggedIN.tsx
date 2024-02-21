"use client"
import React from 'react';
import { useState, useEffect } from "react";
import { AuthKitProvider, SignInButton, useProfile } from "@farcaster/auth-kit";
import "@farcaster/auth-kit/styles.css";
import Home from './LoggedIn';




const config = {
    relay: "https://relay.farcaster.xyz",
    rpcUrl: "https://mainnet.optimism.io",
    domain: "Lollypop.xyz",
    siweUri: "https://example.com/login",
};

export default function NotLoggedIN() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const profile = useProfile()


    useEffect(() => {
        // Check if the user is authenticated when the component mounts
        setIsAuthenticated(profile.isAuthenticated);
      }, [profile.isAuthenticated]);
    
      const handleSignInSuccess = () => {
        // Callback to update the authentication status when the user signs in
        setIsAuthenticated(true);
      };
    
      const handleSignOut = () => {
        // Callback to update the authentication status when the user signs out
        setIsAuthenticated(false);
      };
    return (
        <main>
            {isAuthenticated ? (
          <Home />
        ) : (<main className='bg-white h-screen w-screen flex items-center justify-center' >
        <video className="video" width="180" height="315/3" src="/lollypop.mp4" autoPlay muted loop></video>
            <div className="z-10 text-cyan" >
            <SignInButton onSuccess={handleSignInSuccess} onSignOut={handleSignOut} />
            </div>
    </main>)}
        </main>

    )
}
