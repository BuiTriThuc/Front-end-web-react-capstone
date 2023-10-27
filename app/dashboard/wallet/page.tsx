import HistoryPayment from "@/app/components/wallet/HistoryPayment";
import React from "react";
import { BiWallet } from "react-icons/bi";
import Wallet from "./Wallet";
import GetUserWallet from "@/app/actions/getUserWallet";
import GetTransfer from "@/app/actions/getTransfer";

export default async function WalletPage() {
  const userWallet = await GetUserWallet();
  const transfer = await GetTransfer();
  return <Wallet userWallet={userWallet} transfer={transfer} />;
}
