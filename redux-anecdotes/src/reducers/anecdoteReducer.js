import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    vote(state, action) {
      const id = action.payload.id;
      const anecdoteToVote = state.find((a) => a.id === id);
      const changedAnecdote = {
        ...anecdoteToVote,
        votes: action.payload.votes,
      };
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : changedAnecdote
      );
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdote(state, action) {
      return action.payload;
    },
  },
});

export const initializeAnecdote = () => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.getAll();
    dispatch(setAnecdote(anecdote));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const votes = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.update({
      ...anecdote,
      votes: anecdote.votes + 1,
    });
    dispatch(vote(updatedAnecdote));
  };
};

export const { appendAnecdote, setAnecdote, vote } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
