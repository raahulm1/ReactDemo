import React from 'react';
import { Provider, useSelector } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';


const usersSlice = createSlice({
  name: 'users',
  initialState: [
    { id: 1, name: 'Ram' },
    { id: 2, name: 'Hanuman' },
    { id: 3, name: 'Krishna' }
  ],
  reducers: {}
});


const postsSlice = createSlice({
  name: 'posts',
  initialState: [
    { id: 101, userId: 1, content: 'Hello!', createdAt: "2025-06-27T12:00:00Z" },
    { id: 102, userId: 1, content: 'Again!', createdAt: "2025-06-22T12:00:00Z"},
    { id: 103, userId: 2, content: 'Old Post', createdAt: '2024-01-01T00:00:00Z' }
  ],
  reducers: {}
});


const store = configureStore({
  reducer: {
    users: usersSlice.reducer,
    posts: postsSlice.reducer
  }
});


const selectUsers = (state) => state.users;
const selectPosts = (state) => state.posts;

const activeUsersByPosts = createSelector(
  [selectUsers, selectPosts],
  (users, posts) => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentPosts = posts.filter(
      post => new Date(post.createdAt) >= sevenDaysAgo
    );

    const postCount = recentPosts.reduce((acc, post) => {
      acc[post.userId] = (acc[post.userId] || 0) + 1;
      return acc;
    }, {});

    return users
      .filter(user => postCount[user.id])
      .map(user => ({ ...user, postCount: postCount[user.id] }))
      .sort((a, b) => b.postCount - a.postCount);
  }
);


const ActiveUsers = () => {
  const activeUsers = useSelector(activeUsersByPosts);

  return (
    <div style={{ textAlign: 'center'}}>
      <ul>
        <h2>Users and posts which done in last 7 days </h2>
        {activeUsers.map(user => (
          <li key={user.id}>
            {user.name} — {user.postCount} posts
          </li>
        ))}
      </ul>
    </div>
  );
};


function Active() {
  return (
    <Provider store={store}>
      <div style={{ padding: '20px', fontFamily: 'Arial' }}> 
        <ActiveUsers />
      </div>
    </Provider>
  );
}

export default Active;
