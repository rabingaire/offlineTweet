import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";
import { markActionsOffline } from "redux-offline-queue";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions(
  {
    postTweet: ["id", "tweet"],
    successfullyPosted: null
  },
  {
    prefix: "tweet/"
  }
);

markActionsOffline(Creators, ["postTweet"]);

export const TweetsTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  tweets: {},
  pendingTweetPosts: 0
});

/* ------------- Reducers ------------- */

// export const postTweet = (state, { id, tweet }) =>
//   console.log(state) ||
//   state.merge({
//     tweets: { ...state.tweets, [id]: { tweet } },
//     pendingTweetPosts: state.pendingTweetPosts + 1
//   });

export const postTweet = (state, { id, tweet }) => {
  console.log("hehehee", state);
  const tweets = Object.assign({}, { ...state.tweets, [id]: { tweet } });
  const pendingTweetPosts = state.pendingTweetPosts + 1;
  const a = Object.assign({}, { tweets, pendingTweetPosts });
  console.log("hello", a);
  return a;
  // state.merge({
  //   tweets: { ...state.tweets, [id]: { tweet } },
  //   pendingTweetPosts: state.pendingTweetPosts + 1
  // });
};

export const successfullyPosted = state => {
  const pendingTweetPosts = state.pendingTweetPosts - 1;
  const tweets = { ...state.tweets };
  const a = Object.assign({}, { tweets, pendingTweetPosts });
  return a;
};

export const reducer = createReducer(INITIAL_STATE, {
  [Types.POST_TWEET]: postTweet,
  [Types.SUCCESSFULLY_POSTED]: successfullyPosted
});
