import React, { useEffect, useState } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const res = await axios.get('https://jsonplaceholder.typicode.com/users');
  return res.data;
});


const usersSlice = createSlice({
  name: 'users',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    addUser: (state, action) => {
      const newUser = {
        id: state.list.length + 1,
        name: action.payload,
      };
      state.list.push(newUser);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
       
        state.list = action.payload.map(user => ({
          id: user.id,
          name: user.name
        }));
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

const { addUser } = usersSlice.actions;


const localStore = configureStore({
  reducer: {
    users: usersSlice.reducer,
  },
});


const UsersInner = () => {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector(state => state.users);
  const [newName, setNewName] = useState('');

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleAddUser = () => {
    if (newName.trim()) {
      dispatch(addUser(newName));
      setNewName('');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>User List</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {list.map(user => (
        <div key={user.id} style={{ marginBottom: 10 }}>
          <strong>{user.name}</strong>
        </div>
      ))}

      <div style={{ marginTop: 20 }}>
        <h3>Add New User</h3>
        <input
          type="text"
          placeholder="Enter name"
          value={newName}
          onChange={e => setNewName(e.target.value)}
        />
        <button onClick={handleAddUser} style={{ marginLeft: 10 }}>
          Add
        </button>
      </div>
    </div>
  );
};


const UsersComponent = () => (
  <Provider store={localStore}>
    <UsersInner />
  </Provider>
);

export default UsersComponent;
