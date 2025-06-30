import React from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';

// 1. Create slice for bank account
const bankSlice = createSlice({
  name: 'bank',
  initialState: {
    balance: 1000, // initial balance
  },
  reducers: {
    deposit: (state, action) => {
      state.balance += action.payload;
    },
    withdraw: (state, action) => {
      if (state.balance >= action.payload) {
        state.balance -= action.payload;
      } else {
        alert('Insufficient balance!');
      }
    },
  },
});

// Export actions
const { deposit, withdraw } = bankSlice.actions;

// 2. Create store
const store = configureStore({
  reducer: {
    bank: bankSlice.reducer,
  },
});

// 3. Component to use store
const BankAccount = () => {
  const dispatch = useDispatch();
  const balance = useSelector(state => state.bank.balance);

  return (
    <div style={{ textAlign: 'center'}}>
      <h2>Bank Account</h2>
      <h3>Current Balance: ₹{balance}</h3>
      <button onClick={() => dispatch(deposit(500))}>Deposit ₹500</button>
      <button onClick={() => dispatch(withdraw(300))} style={{ marginLeft: 10 }}>
        Withdraw ₹300
      </button>
    </div>
  );
};

// 4. Root Component
const BankApp = () => (
  <Provider store={store}>
    <BankAccount />
  </Provider>
);

export default BankApp;
