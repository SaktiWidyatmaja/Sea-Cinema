'use client'

import { useState, useEffect } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";

export default function TopUpWithdrawal() {
  const [topUpAmount, setTopUpAmount] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [balance, setBalance] = useState(0);
  const [maxWithdrawal, setMaxWithdrawal] = useState(0);

  useEffect(() => {
    const getBalance = async () => {
      try {
        const response = await fetch("/api/balance");
        const data = await response.json();
        setBalance(data.balance);
        setMaxWithdrawal(Math.min(data.balance, 500000));
      } catch (error) {
        console.error("Failed to fetch balance:", error);
      }
    };

    getBalance();
  }, []);

  const handleTopUp = async () => {
    try {
      // Panggil API untuk melakukan top up balance
      await fetch("/api/balance", {
        method: "PATCH",
        body: JSON.stringify({ balance: balance+topUpAmount }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Set ulang nilai balance setelah top up berhasil
      setBalance(balance + topUpAmount);

      // Set ulang input field
      setTopUpAmount(0);
      window.location.reload();
    } catch (error) {
      console.error("Failed to top up balance:", error);
    }
  };

  const handleWithdrawal = async () => {
    try {
      // Validasi jumlah penarikan tidak boleh negatif atau melebihi saldo maksimum
      if (withdrawAmount <= 0) {
        console.error("Withdrawal amount must be a positive number");
        return;
      }
      if (withdrawAmount > maxWithdrawal) {
        console.error("Withdrawal amount exceeds the maximum limit");
        return;
      }

      // Panggil API untuk melakukan penarikan balance
      await fetch("/api/balance", {
        method: "PATCH",
        body: JSON.stringify({ balance: balance - withdrawAmount }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Set ulang nilai balance setelah penarikan berhasil
      setBalance(balance - withdrawAmount);

      // Set ulang input field
      setWithdrawAmount(0);
      window.location.reload();
    } catch (error) {
      console.error("Failed to withdraw balance:", error);
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Box sx={{ flex: "1 1 50%", backgroundColor: "white", padding: "1rem" }}>
        <Typography variant="h6">Top Up</Typography>
        <TextField
          type="number"
          label="Amount (Rupiah)"
          value={topUpAmount}
          onChange={(e) => setTopUpAmount(Number(e.target.value))}
          fullWidth
          margin="normal"
        />
        <Button variant="outlined" onClick={handleTopUp}>
          Top Up
        </Button>
      </Box>
      <Box sx={{ flex: "1 1 50%", backgroundColor: "white", padding: "1rem" }}>
        <Typography variant="h6">Withdrawal</Typography>
        <TextField
          type="number"
          label="Amount (Rupiah)"
          value={withdrawAmount}
          onChange={(e) => setWithdrawAmount(Number(e.target.value))}
          fullWidth
          margin="normal"
          error={withdrawAmount > maxWithdrawal}
          helperText={withdrawAmount > maxWithdrawal ? "Withdrawal amount exceeds the maximum withdrawal amount" : ""}
        />
        <Button variant="outlined" onClick={handleWithdrawal}>
          Withdraw
        </Button>
      </Box>
    </Box>
  );
}
