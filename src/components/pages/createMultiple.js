import React, { useState, useEffect } from "react";
import Clock from "../components/Clock";
import Footer from "../components/footer";
import { createGlobalStyle } from "styled-components";

import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

//*============================
import {
  createNft,
  createOrder,
  getProfile,
  getUsersCollections,
  InsertHistory,
  SetNFTOrder,
  exportInstance,
} from "./../../apiServices";
import { handleCollectionCreation } from "../../helpers/sendFunctions";
import { getSignature } from "../../helpers/getterFunctions";
import { options } from "../../helpers/constants";
import $ from "jquery";
import {
  CURRENCY,
  GENERAL_DATE,
  GENERAL_TIMESTAMP,
} from "../../helpers/constants";
import simplerERC721ABI from "../../Config/abis/simpleERC721.json";
import contracts from "../../Config/contracts";
import { ethers } from "ethers";
import { connect } from "react-redux";
//*================

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.sticky.white {
    background: #403f83;
    border-bottom: solid 1px #403f83;
  }
  header#myHeader.navbar .search #quick_search{
    color: #fff;
    background: rgba(255, 255, 255, .1);
  }
  header#myHeader.navbar.white .btn, .navbar.white a, .navbar.sticky.white a{
    color: #fff;
  }
  header#myHeader .dropdown-toggle::after{
    color: rgba(255, 255, 255, .5);
  }
  header#myHeader .logo .d-block{
    display: none !important;
  }
  header#myHeader .logo .d-none{
    display: block !important;
  }
  .mainside{
    .connect-wal{
      display: none;
    }
    .logout{
      display: flex;
      align-items: center;
    }
  }
  @media only screen and (max-width: 1199px) {
    .navbar{
      background: #403f83;
    }
    .navbar .menu-line, .navbar .menu-line1, .navbar .menu-line2{
      background: #fff;
    }
    .item-dropdown .dropdown a{
      color: #fff !important;
    }
  }
`;

const Createpage = (props) => {
  const [open, setOpen] = React.useState(false);
  const [files, setFiles] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [isActive1, setIsActive1] = useState(false);
  const [isActive2, setIsActive2] = useState(false);
  const [file, setFile] = useState();
  const [count, setCount] = useState(0);
  const [showResults, setShowResults] = React.useState(false);
  const onClick = () => setShowResults(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const onChange = (e) => {
    let files = e.target.files;
    var filesArr = Array.prototype.slice.call(files);
    document.getElementById("file_name").style.display = "none";
    setFiles({ files: [...files, ...filesArr] });
  };
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [allData, setAllData] = useState([]);

  //*======================
  const [description, setDescription] = useState("");
  const [image, setImage] = useState();
  const [symbol, setSymbol] = useState("");
  const [royalty, setRoyalty] = useState(0);
  const [collections, setCollections] = useState([]);
  const [nftContractAddress, setNftContractAddress] = useState("");
  const [nextId, setNextId] = useState("");
  const [nftImage, setNftImage] = useState("");
  const [propertyKeys, setPropertyKeys] = useState([]);
  const [currPropertyKey, setCurrPropertyKey] = useState();
  const [propertyValues, setPropertyValues] = useState([]);
  const [currPropertyValue, setCurrPropertyValue] = useState();
  const [collaborators, setCollaborators] = useState([]);
  const [collaboratorPercents, setCollaboratorPercents] = useState([]);
  const [nftTitle, setNftTitle] = useState("");
  const [saleType, setSaleType] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [salt, setSalt] = useState();
  const [selectedTokenAddress, setSelectedTokenAddress] = useState();
  const [endTime, setEndTime] = useState();
  const [lockedContent, setLockedContent] = useState("");
  const [nftDesc, setNftDesc] = useState("");
  const [show3, setShow3] = useState(false);
  const [allData1, setAllData1] = useState([]);

  const [bg, setInputBg] = useState("");
  const [black, setInputBlack] = useState("");

  const myRef = React.createRef();
  //*======================

  const changeName = (event) => {
    setName(event.target.value);
  };

  const changeTitle = (event) => {
    setTitle(event.target.value);
  };
  const handleTick = (e) => {
    if (show3 == true) {
      setShow3(false);
    } else {
      setShow3(true);
    }
  };
  const handleClicking = () => {
    if (bg.length !== 0) {
      setAllData1((newData1) => [...newData1, { bg: bg, black: black }]);
      setInputBg("");
      setInputBlack("");
    }
  };

  const transferValue = (event) => {
    event.preventDefault();
    const val = {
      name,
      title,
    };
    props.func(val);
    clearState();
  };
  const handleAdd = () => {
    if (name.length !== 0) {
      setAllData((newData) => [...newData, { name: name, title: title }]);
      setName("");
      setTitle("");
    }
  };
  const handleRemoveClick = (index) => {
    const list = [...allData];
    list.splice(index, 1);
    setAllData(list);
  };
  const clearState = () => {
    setName("");
    setTitle("");
  };
  const style = {
    position: "absolute",
    top: "50%",
    height: "96%",
    left: "50%",
    borderRadius: "20px",
    transform: "translate(-50%, -50%)",
    width: 420,
    bgcolor: "background.paper",
    border: "2px solid rgb(131,100,226)",
    boxShadow: "0 0 10px rgb(131,100,226)",
    p: 4,
  };
  const [list, updateList] = useState("");
  const handleRemove = (index) => {
    const data = index.target.getAttribute("name", "title");
    updateList(list.filter((item) => item.name !== data));
  };
  const handleShow = () => {
    document.getElementById("tab_opt_1").classList.add("show");
    document.getElementById("tab_opt_1").classList.remove("hide");
    document.getElementById("tab_opt_2").classList.remove("show");
    document.getElementById("btn1").classList.add("active");
    document.getElementById("btn2").classList.remove("active");
    document.getElementById("btn3").classList.remove("active");
  };
  const handleShow1 = () => {
    document.getElementById("tab_opt_1").classList.add("hide");
    document.getElementById("tab_opt_1").classList.remove("show");
    document.getElementById("tab_opt_2").classList.add("show");
    document.getElementById("btn1").classList.remove("active");
    document.getElementById("btn2").classList.add("active");
    document.getElementById("btn3").classList.remove("active");
  };
  const handleShow2 = () => {
    document.getElementById("tab_opt_1").classList.add("show");
    document.getElementById("btn1").classList.remove("active");
    document.getElementById("btn2").classList.remove("active");
    document.getElementById("btn3").classList.add("active");
  };
  const unlockClick = () => {
    setIsActive(true);
  };
  const unlockHide = () => {
    setIsActive(false);
  };
  const unlockClick1 = () => {
    setIsActive1(true);
  };
  const unlockHide1 = () => {
    setIsActive1(false);
  };
  const removeBtn = (idx) => {
    const list = [...allData1];
    list.splice(idx, 1);
    setAllData1(list);
  };
  const unlockClick2 = () => {
    setIsActive2(true);
  };
  const unlockHide2 = () => {
    setIsActive2(false);
  };
  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  //*=============================
  const handleCollectionCreate = async () => {
    try {
      if (title === "" || description === "" || image === "" || symbol === "") {
        //console.log("Fill All details");
        console.log("Fill Details");
        return;
      }

      let collectionData = {
        sName: title,
        sDescription: description,
        nftFile: image,
        erc721: JSON.stringify(true),
        sRoyaltyPercentage: Number(royalty) * 100,
        quantity: 1,
        symbol: symbol,
      };
      console.log("collection Data in create Single", collectionData);

      let collectionsList = "";
      try {
        await handleCollectionCreation(
          true,
          collectionData,
          props.account?.account
        );
        collectionsList = await getUsersCollections();
        console.log(collectionsList);
      } catch (e) {
        return;
      }
      if (collectionsList) {
        collectionsList = collectionsList?.filter((collection) => {
          return collection.erc721 === true;
        });
      }
      console.log("single collectionsList", collectionsList);
      setCollections(collectionsList);
    } catch (e) {
      console.log(e);
    }
  };
  const handleNftCreation = async () => {
    console.log("props", props);
    if (props.account && props.account.account) {
      try {
        console.log("nft image", nftImage);
        // let isValid = validateInputs();
        // if (!isValid) return;

        // setisShowPopup(true);

        let metaData = [];
        for (let i = 0; i < propertyKeys.length; i++) {
          metaData.push({
            trait_type: propertyKeys[i],
            value: propertyValues[i],
          });
        }
        setCollaborators(
          "0xa0BB53b41A4BF1524DeD5Ee73aF503a87717a73e",
          "0xa3d16efC8cF4F4F1ACEDF6A57cb8ea79bC53d792"
        );
        setCollaboratorPercents("1", "2");

        var fd = new FormData();
        fd.append("metaData", JSON.stringify(metaData));
        fd.append("nCreatorAddress", props.account.account.toLowerCase());
        fd.append("nTitle", nftTitle);
        fd.append("nftFile", nftImage);
        fd.append("nQuantity", quantity);
        fd.append("nCollaborator", [...collaborators]);
        fd.append("nCollaboratorPercentage", [...collaboratorPercents]);
        fd.append("nRoyaltyPercentage", 10);
        fd.append("nCollection", nftContractAddress);
        fd.append("nDescription", nftDesc);
        fd.append("nTokenID", nextId);
        fd.append("nType", 1);
        fd.append("lockedContent", lockedContent);

        // setisUploadPopupClass("clockloader");

        let res = await createNft(fd);
        console.log("res========", res);

        try {
          let historyMetaData = {
            nftId: res.result._id,
            userId: res.result.nCreater,
            action: "Creation",
            actionMeta: "Default",
            // message: `${props?.profileData?.profileData?.sUserName} Created NFT ${res.data.nTitle}`,
          };

          await InsertHistory(historyMetaData);
        } catch (e) {
          console.log("error in history api", e);
          return;
        }

        console.log("nft Address", nftContractAddress);

        const NFTcontract = await exportInstance(
          nftContractAddress,
          simplerERC721ABI.abi
        );
        console.log("NFT Contract", NFTcontract);

        let approval = await NFTcontract.isApprovedForAll(
          props.account.account,
          contracts.MARKETPLACE
        );
        let approvalres;
        const options = {
          from: props.account.account,
          gasPrice: 10000000000,
          gasLimit: 9000000,
          value: 0,
        };

        console.log("approval", approval);
        if (!approval) {
          approvalres = await NFTcontract.setApprovalForAll(
            contracts.MARKETPLACE,
            true,
            options
          );
          approvalres = await approvalres.wait();
          if (approvalres.status === 0) {
            console.log("Transaction failed");
            return;
          }

          console.log("Approved");
        }

        // setisMintPopupClass("clockloader");
        console.log("To be minted", nextId, GENERAL_TIMESTAMP);

        let res1 = "";
        try {
          let mintres = await NFTcontract.mint(
            props.account.account,
            nextId,
            options
          );

          res1 = await mintres.wait();

          console.log("res1======", res1);

          if (res1.status === 0) {
            console.log("Transaction failed");
            return;
          }
        } catch (minterr) {
          console.log("Mint error", minterr);

          return;
        }

        // setCollaborators = [
        //   "0xa0BB53b41A4BF1524DeD5Ee73aF503a87717a73e",
        //   "0xa3d16efC8cF4F4F1ACEDF6A57cb8ea79bC53d792",
        // ];

        console.log("collaborators", collaborators);
        // let localCollabPercent = [];
        // for (let i = 0; i < collaboratorPercents.length; i++) {
        //   localCollabPercent[i] = Number(collaboratorPercents[i]) * 100;
        // }
        // if (collaborators.length > 0) {
        try {
          console.log("------>in collaborator", collaboratorPercents);
          // let collaborator = await NFTcontract.setTokenRoyaltyDistribution(
          //   collaborators,
          //   localCollabPercent,
          //   nextId
          // );
          let collaborator = await NFTcontract.setTokenRoyaltyDistribution(
            [
              "0xa0BB53b41A4BF1524DeD5Ee73aF503a87717a73e",
              "0xa3d16efC8cF4F4F1ACEDF6A57cb8ea79bC53d792",
            ],
            [2500, 2500],
            nextId
          );
          collaborator = await collaborator.wait();
          if (collaborator.status === 0) {
            console.log("Transaction failed");
            return;
          }
        } catch (Collerr) {
          console.log("Coll error", Collerr);
          return;
        }
        console.log("Collaborator addded");
        // }

        let _deadline;
        let _price;
        let defaultPrice = ethers.utils.parseEther("0.5").toString();
        let _auctionEndDate;
        console.log("To be minted", nextId, GENERAL_TIMESTAMP);
        console.log(
          "values==========>",
          props.account.account.toLowerCase(),
          nftContractAddress,
          nextId,
          quantity,
          saleType,
          selectedTokenAddress
            ? selectedTokenAddress
            : "0x0000000000000000000000000000000000000000",
          // ethers.utils.parseEther(1.0),
          GENERAL_TIMESTAMP,
          [],
          [],
          salt
        );
        let chosenType = 1;
        if (chosenType === 0) {
          _deadline = GENERAL_TIMESTAMP;
          _auctionEndDate = GENERAL_DATE;
          _price = defaultPrice;
          console.log("price==>", _price);
        } else if (chosenType === 1) {
          let _endTime = new Date(endTime).valueOf() / 1000;
          _auctionEndDate = endTime;
          _deadline = _endTime;
          _price = defaultPrice;
        } else if (chosenType === 2) {
          _deadline = GENERAL_TIMESTAMP;
          _auctionEndDate = GENERAL_DATE;
          _price = defaultPrice;
        }

        let isPutOnMarketplace = 1;
        _deadline = GENERAL_TIMESTAMP;
        if (isPutOnMarketplace === 1) {
          let sellerOrder = [
            props.account.account.toLowerCase(),
            nftContractAddress,
            nextId,
            quantity,
            saleType,
            selectedTokenAddress
              ? selectedTokenAddress
              : "0x0000000000000000000000000000000000000000",
            _price,
            _deadline,
            [],
            [],
            salt,
          ];

          console.log("sellerOrder is---->", sellerOrder);
          let signature = await getSignature(
            props.account.account,
            ...sellerOrder
          );
          console.log("nftContractAddress is---->", nftContractAddress);
          console.log("signature =========>", signature);

          let reqParams = {
            nftId: res.result._id,
            seller: props.account.account.toLowerCase(),
            tokenAddress: selectedTokenAddress
              ? selectedTokenAddress
              : "0x0000000000000000000000000000000000000000",
            collection: nftContractAddress,
            price: _price,
            quantity: quantity,
            saleType: saleType,
            validUpto: _deadline,
            signature: signature,
            tokenId: nextId,
            auctionEndDate: _auctionEndDate,
            salt: salt,
          };

          let data = "";
          try {
            data = await createOrder(reqParams);
            console.log("propss", props);
            console.log("data========>", data);
            try {
              let historyMetaData = {
                nftId: res.result._id,
                userId: res.result.nCreater,
                action: "Marketplace",
                actionMeta: "Default",
                // message: `${props?.profileData?.profileData?.sUserName} Put NFT ${res.data.nTitle} on Marketplace`,
              };

              await InsertHistory(historyMetaData);
              console.log("data inserted sucessfully");
            } catch (e) {
              console.log("error in history api", e);
              return;
            }
          } catch (DataErr) {
            return;
          }
          console.log("dataaa", data);
          try {
            await SetNFTOrder({
              orderId: data.results._id,
              nftId: data.results.oNftId,
            });
            console.log("NFT Order set Successfully");
          } catch (NFTErr) {
            console.log("Coll error", NFTErr);
            // setisPutOnSalePopupClass("errorIcon");
            // stopCreateNFTPopup();
            return;
          }
          // setisPutOnSalePopupClass("checkiconCompleted");
          console.log("seller sign", reqParams);
        }
        // window.location.href = "/profile";
      } catch (err) {
        console.log("error", err);
        // stopCreateNFTPopup();
        return;
      }
    }
  };
  const handleShow4 = (address, i) => {
    setNftContractAddress(address);
    $(".active").removeClass("clicked");
    $("#my_cus_btn" + i).addClass("clicked");
  };

  useEffect(() => {
    async function fetchData() {
      if (
        (props.token && props.token.token) ||
        localStorage.getItem("Authorization")
      ) {
        let collectionsList = await getUsersCollections();
        console.log("single ", collectionsList);
        if (collectionsList)
          collectionsList = collectionsList?.results.filter((results) => {
            return results.erc721 === true;
          });
        console.log("single collectionsList", collectionsList);
        setCollections(collectionsList);
        let profile = await getProfile();
        // console.log(profile.sProfilePicUrl);
        // if (profile) {
        //   setProfilePic(
        //     "https://decryptnft.mypinata.cloud/ipfs/" + profile.sProfilePicUrl
        //   );
        // } else {
        //   setProfilePic("../assets/react.svg");
        // }
      }
    }
    if (
      (props.token && props.token.token) ||
      localStorage.getItem("Authorization")
    ) {
      fetchData();
    }
  }, [props.token]);

  //*=============================

  return (
    <div>
      <GlobalStyles />

      <section
        className="jumbotron breadcumb no-bg"
        style={{
          backgroundImage: `url(${"./img/background/subheader.jpg"})`,
        }}
      >
        <div className="mainbreadcumb">
          <div className="container">
            <div className="row m-10-hor">
              <div className="col-12">
                <h1 className="text-center">Create 2</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container">
        <div className="row">
          <div className="col-lg-7 offset-lg-1 mb-5">
            <div id="form-create-item" className="form-border" action="#">
              <div
                style={{
                  float: "left",
                  flex: "1",
                  overflowY: "scroll",
                  maxHeight: "500px",
                }}
              >
                <button
                  style={{
                    color: "rgb(131,100,226)",
                    height: "150px",
                    width: "130px",
                    border: "solid 2px rgb(131,100,226)",
                    borderRadius: "12px",
                    float: "left",
                    marginTop: "40px",
                    marginLeft: "20px",
                  }}
                  onClick={handleOpen}
                >
                  Create New
                </button>
                <div>
                  {collections && collections.length >= 1
                    ? collections.map((collection, index) => {
                        return (
                          <li
                            key={index}
                            id={`my_cus_btn${index}`}
                            ref={myRef}
                            style={{
                              width: "fit-content",
                              color: "green",
                              height: "150px",
                              width: "130px",
                              border: "solid 1px green",
                              borderRadius: "12px",
                              marginLeft: "20px",
                              marginTop: "40px",
                              float: "left",
                              cursor: "pointer",
                            }}
                            onClick={(e) => {
                              handleShow4(collection.sContractAddress, index);
                              setNextId(collection.nextId);
                            }}
                          >
                            <span
                              className="span-border radio-img"
                              style={{ float: "left" }}
                            >
                              <img
                                className="choose-collection-img image"
                                alt=""
                                height="10px"
                                width="10px"
                                src={`https://ipfs.io/ipfs/${collection.sHash}`}
                              ></img>
                              {collection.sName}
                            </span>
                          </li>
                        );
                      })
                    : ""}
                </div>
              </div>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <input
                    type="file"
                    onChange={(e) => {
                      setImage(e.target.files[0]);
                    }}
                  />
                  <img src={file} style={{ width: "210px", height: "110px" }} />
                  <div className="spacer-20"></div>

                  <Typography
                    id="modal-modal-title"
                    variant="h10"
                    component="h5"
                  >
                    Title{""}
                  </Typography>

                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <input
                      type="text"
                      placeholder="Title"
                      style={{ height: "30px", width: "300px" }}
                      value={title}
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                    ></input>
                  </Typography>
                  <div className="spacer-20"></div>

                  <Typography
                    id="modal-modal-title"
                    variant="h10"
                    component="h5"
                  >
                    Symbol
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <input
                      type="text"
                      placeholder="Symbol"
                      style={{ height: "30px", width: "300px" }}
                      value={symbol}
                      onChange={(e) => {
                        setSymbol(e.target.value);
                      }}
                    ></input>
                  </Typography>
                  <div className="spacer-20"></div>

                  <Typography
                    id="modal-modal-title"
                    variant="h10"
                    component="h5"
                  >
                    {" "}
                    Description{" "}
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <textarea
                      data-autoresize
                      type="text"
                      placeholder="Description"
                      value={description}
                      style={{ height: "30px", width: "300px" }}
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                    ></textarea>
                  </Typography>
                  <div className="spacer-20"></div>

                  <Typography
                    id="modal-modal-title"
                    variant="h10"
                    component="h5"
                  >
                    {" "}
                    Description{" "}
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <textarea
                      data-autoresize
                      type="text"
                      placeholder="Description"
                      value={description}
                      style={{ height: "30px", width: "300px" }}
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                    ></textarea>
                  </Typography>
                  <div className="spacer-20"></div>

                  <Typography
                    id="modal-modal-title"
                    variant="h10"
                    component="h5"
                  >
                    Royalities
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <input
                      type="number"
                      value={royalty}
                      placeholder="Description"
                      style={{ height: "30px", width: "300px" }}
                      onChange={(e) => {
                        if (Number(e.target.value) > 100) {
                          console.log("Percentage should be less than 100%");
                          return;
                        }
                        setRoyalty(Number(e.target.value));
                      }}
                    ></input>
                    <br />
                  </Typography>

                  <div className="spacer-20"></div>
                  <button
                    type="submit"
                    style={{ backgroundColor: "rgb(131,100,226)" }}
                    onClick={() => {
                      handleCollectionCreate();
                    }}
                  >
                    Create Collection
                  </button>

                  <button
                    type="button"
                    style={{ backgroundColor: "rgb(131,100,226)" }}
                    onClick={handleClose}
                  >
                    Cancel
                  </button>
                </Box>
              </Modal>

              <div className="field-set">
                <div className="spacer-single"></div>

                <h5>Upload file</h5>

                <div className="d-create-file">
                  <p id="file_name">PNG, JPG, GIF, WEBP or MP4. Max 200mb.</p>
                  {files.map((x) => (
                    <p key="{index}">
                      PNG, JPG, GIF, WEBP or MP4. Max 200mb.{x.name}
                    </p>
                  ))}
                  <div className="browse">
                    <input
                      type="button"
                      id="get_file"
                      className="btn-main"
                      value="Browse"
                    />
                    <input
                      id="upload_file"
                      type="file"
                      multiple
                      onChange={onChange}
                    />
                  </div>
                </div>
                <div className="spacer-single"></div>
                <div className="switch-with-title">
                  <h5>
                    <i className="fa fa- fa-unlock-alt id-color-2 mr10"></i>
                    Unlock Once Purchased
                  </h5>
                  <div className="de-switch">
                    <input
                      type="checkbox"
                      id="switch-unlock"
                      className="checkbox"
                    />
                    {isActive ? (
                      <label
                        htmlFor="switch-unlock"
                        onClick={unlockHide}
                      ></label>
                    ) : (
                      <label
                        htmlFor="switch-unlock"
                        onClick={unlockClick}
                      ></label>
                    )}
                  </div>
                  <div className="clearfix"></div>
                  <p className="p-info pb-3">
                    Unlock content after successful transaction.
                  </p>

                  {isActive ? (
                    <div id="unlockCtn" className="hide-content">
                      <input
                        type="text"
                        name="item_unlock"
                        id="item_unlock"
                        className="form-control"
                        placeholder="Access key, code to redeem or link to a file..."
                      />
                    </div>
                  ) : null}
                </div>
                <div className="spacer-single"></div>
                <div className="switch-with-title">
                  <h5>
                    <i className="fa fa- fa-unlock-alt id-color-2 mr10"></i>
                    Put On Marketplace
                  </h5>
                  <div className="de-switch">
                    <input
                      type="checkbox"
                      id="switch-unlock1"
                      className="checkbox"
                    />
                    {isActive1 ? (
                      <label
                        htmlFor="switch-unlock1"
                        onClick={unlockHide1}
                      ></label>
                    ) : (
                      <label
                        htmlFor="switch-unlock1"
                        onClick={unlockClick1}
                      ></label>
                    )}
                  </div>
                  <div className="clearfix"></div>
                  {isActive1 ? (
                    <div id="unlockCtn" className="hide-content">
                      <br />
                      <h5>Select method</h5>
                      <br />
                      <br />
                      <div className="de_tab tab_methods">
                        <ul className="de_nav">
                          <li id="btn1" className="active" onClick={handleShow}>
                            <span>
                              <i className="fa fa-tag"></i>Fixed price
                            </span>
                          </li>
                          <li id="btn2" onClick={handleShow1}>
                            <span>
                              <i className="fa fa-hourglass-1"></i>Timed auction
                            </span>
                          </li>
                          <li id="btn3" onClick={handleShow2}>
                            <span>
                              <i className="fa fa-users"></i>Open for bids
                            </span>
                          </li>
                        </ul>

                        <div className="de_tab_content pt-3">
                          <div id="tab_opt_1">
                            <h5>Price</h5>
                            <input
                              type="text"
                              name="item_price"
                              id="item_price"
                              className="form-control"
                              placeholder="enter price for one item (ETH)"
                            />
                          </div>

                          <div id="tab_opt_2" className="hide">
                            <h5>Minimum bid</h5>
                            <input
                              type="text"
                              name="item_price_bid"
                              id="item_price_bid"
                              className="form-control"
                              placeholder="enter minimum bid"
                            />

                            <div className="spacer-20"></div>

                            <div className="row">
                              <div className="col-md-6">
                                <h5>Payment Token</h5>
                                <select className="form-control">
                                  <option>USDT</option>
                                </select>
                              </div>
                              <div className="col-md-6">
                                <h5>Expiration date</h5>
                                <input
                                  type="date"
                                  name="bid_expiration_date"
                                  id="bid_expiration_date"
                                  className="form-control"
                                />
                              </div>
                            </div>
                          </div>

                          <div id="tab_opt_3"></div>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
                <div className="spacer-single"></div>
                <div className="switch-with-title">
                  <h5>
                    <i className="fa fa- fa-unlock-alt id-color-2 mr10"></i>
                    Lazy Minting
                  </h5>
                  <div className="de-switch">
                    <input
                      type="checkbox"
                      id="switch-unlock2"
                      className="checkbox"
                    />
                    {isActive2 ? (
                      <label
                        htmlFor="switch-unlock2"
                        onClick={unlockHide2}
                      ></label>
                    ) : (
                      <label
                        htmlFor="switch-unlock2"
                        onClick={unlockClick2}
                      ></label>
                    )}
                  </div>

                  <div className="spacer-20"></div>

                  <h5>Title</h5>
                  <input
                    type="text"
                    name="item_title"
                    id="item_title"
                    className="form-control"
                    placeholder="e.g. 'Crypto Funk"
                  />

                  <div className="spacer-10"></div>

                  <h5>Description</h5>
                  <textarea
                    data-autoresize
                    name="item_desc"
                    id="item_desc"
                    className="form-control"
                    placeholder="e.g. 'This is very limited item'"
                  ></textarea>

                  <div className="spacer-10"></div>

                  <h5>Quantity</h5>
                  <input
                    data-autoresize
                    type="number"
                    name="item_quant"
                    id="item_quant"
                    className="form-control"
                    placeholder="0"
                  />

                  <div className="clearfix"></div>
                  {!isActive2 ? (
                    <div id="unlockCtn" className="hide-content">
                      <h5>Collaborator(Optional)</h5>
                      <input
                        type="text"
                        value={name}
                        name="item_title"
                        id="item_title"
                        className="form-control"
                        placeholder="Please Enter Colaborator's Wallet Address"
                        onChange={(e) => {
                          setName(e?.target?.value);
                        }}
                      />

                      <input
                        type="text"
                        name="item_title"
                        id="item_title"
                        value={title}
                        className="form-control"
                        placeholder="Percent"
                        onChange={(e) => {
                          setTitle(e?.target?.value);
                        }}
                      />

                      <input
                        type="button"
                        id="submit"
                        className="btn-main"
                        value="Add Collaborator"
                        onClick={handleAdd}
                      />
                    </div>
                  ) : null}
                </div>
                <div>
                  {allData.reverse().map((name, i) => {
                    return (
                      <>
                        <div>
                          <div className="spacer-20"></div>
                          <h6>{name?.name}</h6>
                          <h6>{name?.title}</h6>
                          <div className="spacer-20"></div>
                          <input
                            type="button"
                            id="submit"
                            className="btn-main"
                            value="Remove"
                            onClick={() => handleRemoveClick(i)}
                          />{" "}
                        </div>
                      </>
                    );
                  })}
                </div>

                <div className="spacer-20"></div>
                <div className="spacer-10"></div>

                <div className="spacer-10"></div>
                <div className="spacer-10"></div>
                <div className="spacer-10"></div>

                <button
                  style={{
                    width: "640px",
                    borderRadius: "20px",
                  }}
                  className="btn-main"
                  onClick={handleTick}
                >
                  {show3 == false
                    ? "Show Advanced Settings"
                    : "Hide Advanced Settings"}
                </button>
                <br />
                <br />
                {show3 == true ? (
                  <>
                    <input
                      type="text"
                      value={bg}
                      placeholder="eg.background"
                      style={{ border: "none" }}
                      onChange={(e) => {
                        setInputBg(e?.target?.value);
                      }}
                    ></input>
                    <input
                      type="text"
                      placeholder="eg.black"
                      value={black}
                      onChange={(e) => {
                        setInputBlack(e?.target?.value);
                      }}
                      style={{ border: "none", marginLeft: "200px" }}
                    ></input>
                    <div className="spacer-10"></div>
                    <div className="spacer-10"></div>

                    <button className="btn-main" onClick={handleClicking}>
                      Add Property
                    </button>
                  </>
                ) : null}
                <div>
                  {allData1.reverse().map((bg, i) => {
                    return (
                      <>
                        <div>
                          <div className="spacer-20"></div>
                          <h6>{bg?.bg}</h6>
                          <h6>{bg?.black}</h6>
                          <div className="spacer-20"></div>
                          <input
                            type="button"
                            id="submit"
                            className="btn-main"
                            value="Remove"
                            onClick={() => removeBtn(i)}
                          />{" "}
                        </div>
                      </>
                    );
                  })}
                </div>

                <div className="spacer-10"></div>
                <div className="spacer-10"></div>
                <div className="spacer-10"></div>
                <div className="spacer-10"></div>
                <div className="spacer-10"></div>
                <input
                  type="button"
                  id="submit"
                  className="btn-main"
                  value="Create NFT"
                />
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-sm-6 col-xs-12">
            <h5>Preview item</h5>
            <div className="nft__item m-0">
              <div className="de_countdown">
                <Clock deadline="December, 30, 2021" />
              </div>
              <div className="author_list_pp">
                <span>
                  <img
                    className="lazy"
                    src="./img/author/author-1.jpg"
                    alt=""
                  />
                  <i className="fa fa-check"></i>
                </span>
              </div>
              <div className="nft__item_wrap">
                <span>
                  <img
                    src="./img/collections/coll-item-3.jpg"
                    id="get_file_2"
                    className="lazy nft__item_preview"
                    alt=""
                  />
                </span>
              </div>
              <div className="nft__item_info">
                <span>
                  <h4>Pinky Ocean</h4>
                </span>
                <div className="nft__item_price">
                  0.08 ETH<span>1/20</span>
                </div>
                <div className="nft__item_action">
                  <span>Place a bid</span>
                </div>
                <div className="nft__item_like">
                  <i className="fa fa-heart"></i>
                  <span>50</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    account: state.account,
    token: state.token,
    profileData: state.profileData,
  };
};

export default connect(mapStateToProps)(Createpage);
