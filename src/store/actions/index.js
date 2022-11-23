import {
  createAction as action,
  createAsyncAction as asyncAction,
} from "typesafe-actions";
import {
  ACCOUNT_UPDATE,
  TOKEN_UPDATE,
  WEB3_LOADED,
  ACCOUNT_UPDATE_ON_DISCONNECT,
  EXPLORE_SALE_TYPE_UPDATE,
  NFT_LIST_PARAMS_UPDATE,
  PROFILE_DATA_LOADED,
  AUTHOR_DATA_LOADED,
} from "../constants/action-types";

export const getNftBreakdown = asyncAction(
  "nft/GET_NFT_BREAKDOWN",
  "nft/GET_NFT_BREAKDOWN_SUCCESS",
  "nft/GET_NFT_BREAKDOWN_FAIL"
)();

export const getNftShowcase = asyncAction(
  "nft/GET_NFT_SHOWCASE",
  "nft/GET_NFT_SHOWCASE_SUCCESS",
  "nft/GET_NFT_SHOWCASE_FAIL"
)();

export const getNftDetail = asyncAction(
  "nft/GET_NFT_DETAIL",
  "nft/GET_NFT_DETAIL_SUCCESS",
  "nft/GET_NFT_DETAIL_FAIL"
)();

export const getHotCollections = asyncAction(
  "nft/GET_HOT_COLLECTIONS",
  "nft/GET_HOT_COLLECTIONS_SUCCESS",
  "nft/GET_HOT_COLLECTIONS_FAIL"
)();

export const getAuthorList = asyncAction(
  "nft/GET_AUTHOR_LIST",
  "nft/GET_AUTHOR_LIST_SUCCESS",
  "nft/GET_AUTHOR_LIST_FAIL"
)();

export const getAuthorRanking = asyncAction(
  "nft/GET_AUTHOR_RANKING",
  "nft/GET_AUTHOR_RANKING_SUCCESS",
  "nft/GET_AUTHOR_RANKING_FAIL"
)();

export const getBlogPosts = asyncAction(
  "nft/GET_BLOG_POSTS",
  "nft/GET_BLOG_POSTS_SUCCESS",
  "nft/GET_BLOG_POSTS_FAIL"
)();

export const getRecentPosts = asyncAction(
  "nft/GET_RECENT_POSTS",
  "nft/GET_RECENT_POSTS_SUCCESS",
  "nft/GET_RECENT_POSTS_FAIL"
)();

export const getTags = asyncAction(
  "nft/GET_TAGS",
  "nft/GET_TAGS_SUCCESS",
  "nft/GET_TAGS_FAIL"
)();

export const getComments = asyncAction(
  "nft/GET_COMMENTS",
  "nft/GET_COMMENTS_SUCCESS",
  "nft/GET_COMMENTS_FAIL"
)();

export const clearNfts = action("nft/CLEAR_ALL_NFTS")();
export const clearFilter = action("nft/CLEAR_FILTER")();
export const filterCategories = action("nft/FILTER_CATEGORIES")();
export const filterStatus = action("nft/FILTER_STATUS")();
export const filterItemsType = action("nft/FILTER_ITEMS_TYPE")();
export const filterCollections = action("nft/FILTER_COLLECTIONS")();
export const filterNftTitle = action("nft/FILTER_NFT_TITLE")();

//*==========
export function accountUpdate(payload) {
  return { type: ACCOUNT_UPDATE, payload };
}

export function exploreSaleTypeUpdated(payload) {
  return { type: EXPLORE_SALE_TYPE_UPDATE, payload };
}

export function tokenUpdate(payload) {
  return { type: TOKEN_UPDATE, payload };
}

export function web3Loaded(payload) {
  return { type: WEB3_LOADED, payload };
}

export function accountUpdateOnDisconnect() {
  localStorage.removeItem("selected_account");
  return { type: ACCOUNT_UPDATE_ON_DISCONNECT };
}

export function nftListParamsUpdate(payload) {
  return { type: NFT_LIST_PARAMS_UPDATE, payload };
}

export function userProfileDataLoaded(payload) {
  return { type: PROFILE_DATA_LOADED, payload };
}

export function authorDataLoaded(payload) {
  return { type: AUTHOR_DATA_LOADED, payload };
}
