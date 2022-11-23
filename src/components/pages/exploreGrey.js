import React, { memo, useState, useEffect } from "react";
import ColumnNewRedux from "../components/ColumnNewRedux";
import Footer from "../components/footer";
import TopFilterBar from "../components/TopFilterBar";

//*===================
import { GetOnSaleItems, GetSearchedNft } from "../../apiServices";
import { connect } from "react-redux";
import ipfsAPI from "ipfs-api";

//*===================
//IMPORT DYNAMIC STYLED COMPONENT
import { StyledHeader } from "../Styles";
//SWITCH VARIABLE FOR PAGE STYLE
const theme = "GREY"; //LIGHT, GREY, RETRO

const ipfs = ipfsAPI("ipfs.infura.io", "5001", {
  protocol: "https",
  auth: "21w11zfV67PHKlkAEYAZWoj2tsg:f2b73c626c9f1df9f698828420fa8439",
});

const Explore = (props) => {
  const [height, setHeight] = React.useState(0);
  const [items, setItems] = useState([]);
  const [likeEvent, setLikeEvent] = useState(false);
  const onImgLoad = ({ target: img }) => {
    let currentHeight = height;
    if (currentHeight < img.offsetHeight) {
      setHeight(img.offsetHeight);
    }
  };

  useEffect(() => {
    async function fetch() {
      console.log("propss", props);
      let data;
      let itemsOnSale = [];

      if (!props.searchedData) {
        if (props.exploreSaleType?.exploreSaleType === -1) {
          data = {
            page: 1,
            limit: 15,
            conditions: {
              oStatus: 1,
            },
          };
        } else {
          data = {
            page: 1,
            limit: 15,
            conditions: {
              oStatus: 1,
              // oType: props.exploreSaleType?.exploreSaleType,
              oType: 1,
            },
          };
        }
        itemsOnSale = await GetOnSaleItems(data);

        if (props.nftType !== -1)
          itemsOnSale.results[0] = itemsOnSale.results[0].filter((item) => {
            return item.nType === props.nftType;
          });
      } else {
        let reqParams = {
          length: 48,
          start: 0,
          sTextsearch: props.searchedData,
          sSellingType: "",
          sSortingType: "",
          page: 1,
          limit: 10,
        };
        itemsOnSale = await GetSearchedNft(reqParams);
      }
      console.log("itemsOnSale", itemsOnSale);
      let localRes = [];
      for (let i = 0; i < itemsOnSale?.results[0]?.length; i++) {
        console.log("resssss111", itemsOnSale.results[0][i].nHash);
        let res = await ipfs.cat(itemsOnSale.results[0][i].nHash);
        localRes[i] = res;
        console.log("resssss", res);
        console.log("File content >> ", JSON.parse(res.toString("utf8")));
        console.log("res----->>", res);
      }

      for (let i = 0; i < itemsOnSale?.results[0]?.length; i++) {
        itemsOnSale.results[0][i].imageHash = JSON.parse(
          localRes[i].toString("utf8")
        ).image;
      }

      setItems(
        itemsOnSale && itemsOnSale.results ? itemsOnSale.results[0] : []
      );
    }

    fetch();
  }, [props]);
  return (
    <div className="greyscheme">
      <StyledHeader theme={theme} />
      <section className="jumbotron breadcumb no-bg">
        <div className="mainbreadcumb">
          <div className="container">
            <div className="row m-10-hor">
              <div className="col-12">
                <h1 className="text-center">Explore</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container">
        <div className="row">
          <div className="col-lg-12">
            <TopFilterBar />
          </div>
        </div>
        <ColumnNewRedux />
      </section>

      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    account: state.account,
    token: state.token,
    exploreSaleType: state.exploreSaleType,
  };
};
export default connect(mapStateToProps)(Explore);
