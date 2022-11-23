import { combineReducers } from "redux";
import nftReducer from "./nfts";
import hotCollectionsReducer from "./hotCollections";
import authorListReducer from "./authorList";
import filterReducer from "./filters";
import blogPostsReducer from "./blogs";
import accountState from "./accountState";

export const rootReducer = combineReducers({
  AccountState: accountState,
  NFT: nftReducer,
  hotCollection: hotCollectionsReducer,
  authors: authorListReducer,
  filters: filterReducer,
  blogs: blogPostsReducer,
});

const reducers = (state, action) => rootReducer(state, action);

export default reducers;
