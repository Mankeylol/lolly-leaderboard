"use client"
import { AuthKitProvider } from "@farcaster/auth-kit";
import Home from "./LoggedIn";
import NotLoggedIN from "./NotLoggedIN";
import './styles.css';

const config = {
  relay: "https://relay.farcaster.xyz",
  rpcUrl: "https://mainnet.optimism.io",
  domain: "Lollypop.xyz",
  siweUri: "https://example.com/login",
};

export default function page () {
  
  return(<>
  <AuthKitProvider config={config}>
    <NotLoggedIN/>
  </AuthKitProvider>

  </>)
}
