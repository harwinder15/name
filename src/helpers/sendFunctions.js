import { BigNumber } from "big-number";
import { ethers } from "ethers";

import simplerERC721ABI from "./../Config/abis/simpleERC721.json";
import simplerERC1155ABI from "../Config/abis/simpleERC1155.json";
import marketPlaceABI from "../Config/abis/marketplace.json";
import Creator1 from "../Config/abis/creatorV1.json";
import { readReceipt } from "./getterFunctions";

import {
  exportInstance,
  getOrderDetails,
  UpdateOrderStatus,
  DeleteOrder,
  InsertHistory,
  createCollection,
} from "../apiServices";

export const handleCollectionCreation = async (
  isSingle,
  collectionData,
  account
) => {
  console.log("collection data", collectionData);
  // let Provider = new ethers.providers.Web3Provider(window.ethereum);
  // const Signer = await Provider.getSigner();
  // const creator = new ethers.Contract(
  //   "0x00e8938EFb57A1A135c4f6fDBCee6CF9E64777c8",
  //   Creator1.abi,
  //   Signer
  // );

  let creator = await exportInstance(
    "0x00e8938EFb57A1A135c4f6fDBCee6CF9E64777c8",
    Creator1.abi
  );
  console.log(creator);
  let res1;
  let contractAddress;
  let fd;
  console.log(collectionData);
  try {
    if (isSingle)
      res1 = await creator.deploySimpleERC721(
        collectionData.sName,
        collectionData.symbol,
        collectionData.nftFile,
        collectionData.sRoyaltyPercentage
      );
    else {
      res1 = await creator.deploySimpleERC1155(
        collectionData.nftFile,
        collectionData.sRoyaltyPercentage
      );
    }
    let hash = res1;
    res1 = await res1.wait();
    if (res1.status === 0) {
      // NotificationManager.error("Transaction failed");
      console.log("Transaction Failed S");
      return;
    }
    contractAddress = await readReceipt(hash);
    console.log("contract receipt", contractAddress);
    let royalty = await exportInstance(
      contractAddress,
      isSingle ? simplerERC721ABI.abi : simplerERC1155ABI.abi
    );

    let res = await royalty.setDefaultRoyaltyDistribution(
      [account],
      [collectionData.sRoyaltyPercentage]
    );
    res = await res.wait();
    console.log(collectionData.sName);
    console.log(collectionData.sDescription);
    console.log("==========", collectionData.nftFile);
    if (res.status === 0) {
      // NotificationManager.error("Transaction failed");
      console.log("Transaction Failed B");
      return;
    }

    if (res1.status === 1) {
      fd = new FormData();

      fd.append("sName", collectionData.sName);
      fd.append("sDescription", collectionData.sDescription);
      fd.append("nftFile", collectionData.nftFile);
      fd.append("sContractAddress", contractAddress);
      fd.append(
        "erc721",
        isSingle ? JSON.stringify(true) : JSON.stringify(false)
      );
      fd.append("sRoyaltyPercentage", collectionData.sRoyaltyPercentage);
      fd.append("quantity", collectionData.quantity);
    }
    await createCollection(fd);
    console.log(await createCollection(fd));

    console.log("Collection Created Successfully");
    return true;
  } catch (e) {
    console.log("Transaction Failed A");

    console.log("error in contract function call", e);
    if (e.code === 401) {
      // NotificationManager.error("User denied ");
      console.log("User Denied");
      return false;
    }
  }
};
