import {
  exportInstance,
  GetCollectionsByAddress,
  GetCollectionsNftList,
  GetMyCollectionsList,
  GetMyLikedNft,
  GetMyNftList,
  GetMyOnSaleNft,
  GetNftDetails,
  getOrderDetails,
} from "../apiServices";
import { ethers } from "ethers";
import contracts from "../Config/contracts";

// const ipfsAPI = require("ipfs-api");
// const ipfs = ipfsAPI("ipfs.infura.io", "5001", {
//   protocol: "https",
//   auth: "21w11zfV67PHKlkAEYAZWoj2tsg:f2b73c626c9f1df9f698828420fa8439",
// });

const toTypedOrder = (
  account,
  tokenAddress,
  id,
  quantity,
  listingType,
  paymentTokenAddress,
  valueToPay,
  deadline,
  bundleTokens,
  bundleTokensQuantity,
  salt
) => {
  const domain = {
    chainId: 80001,
    name: "LN Marketplace",
    verifyingContract: contracts.MARKETPLACE,
    version: "1",
  };
  const types = {
    Order: [
      { name: "user", type: "address" },
      { name: "tokenAddress", type: "address" },
      { name: "tokenId", type: "uint256" },
      { name: "quantity", type: "uint256" },
      { name: "listingType", type: "uint256" },
      { name: "paymentToken", type: "address" },
      { name: "value", type: "uint256" },
      { name: "deadline", type: "uint256" },
      { name: "bundleTokens", type: "uint256[]" },
      { name: "bundleTokensQuantity", type: "uint256[]" },
      { name: "salt", type: "uint256" },
    ],
  };

  const value = {
    user: account,
    tokenAddress: tokenAddress,
    tokenId: id,
    quantity: quantity,
    listingType: listingType,
    paymentToken: paymentTokenAddress,
    value: valueToPay,
    deadline: deadline,
    bundleTokens: bundleTokens,
    bundleTokensQuantity: bundleTokensQuantity,
    salt: salt,
  };

  return { domain, types, value };
};

export const readReceipt = async (hash) => {
  try {
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    const receipt = await provider.getTransactionReceipt(hash.hash);
    let contractAddress = receipt.logs[0].address;
    return contractAddress;
  } catch (e) {
    console.log("error in api", e);
  }
};

export const getSignature = async (signer, ...args) => {
  try {
    console.log("111");
    const order = toTypedOrder(...args);
    console.log("order is---->", order);
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    console.log("222");
    const signer1 = provider.getSigner();
    console.log("signer1=========>", signer1.address);
    console.log("333");
    console.log(args);
    const signedTypedHash = await signer1._signTypedData(
      order.domain,
      order.types,
      order.value
    );
    console.log("444");
    const sig = ethers.utils.splitSignature(signedTypedHash);
    console.log("555");

    return [sig.v, sig.r, sig.s];
  } catch (e) {
    if (e.code === 4001) {
      console.log("User denied ");
      return false;
    }
    console.log("error in api", e);
    return false;
  }
};
