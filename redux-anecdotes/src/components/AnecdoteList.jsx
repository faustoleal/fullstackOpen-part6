import { useDispatch, useSelector } from "react-redux";
import { votes } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div>
      {anecdote.content} <br />
      {`has ${anecdote.votes}`}{" "}
      <button onClick={() => handleClick(anecdote)}>votes</button>
    </div>
  );
};

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => state.anecdotes);
  const filters = useSelector((state) => state.filter);

  const sortAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes);

  const filter = sortAnecdotes.filter((el) =>
    el.content.toLowerCase().includes(filters)
  );

  const handleClick = (anecdote) => {
    dispatch(votes(anecdote));
    dispatch(setNotification(`you voted ${anecdote.content}`, 3));
  };

  return (
    <>
      <ul>
        {filter.map((anecdote) => (
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={handleClick}
          />
        ))}
      </ul>
    </>
  );
};

export default AnecdoteList;
