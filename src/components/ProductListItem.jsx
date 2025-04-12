import React from 'react';
import { useNavigate } from "react-router-dom";


export default function ProductListItem({ itemProduct }) {
    const navigate = useNavigate();

  return (
    <>
      <div data-testid='product-item' onClick={() => {navigate(`/${itemProduct.id}`)
      }} className="border border-dark p-3 cardItemList d-flex flex-column justify-content-between align-items-center" >
        <div className="image-container">
          <img src={itemProduct.imgUrl} alt={itemProduct.name} />
        </div>
        <div className="infoCard d-flex flex-column justify-content-between w-100 ">
          <div className="d-flex justify-content-center mt-3">
            <span className="brandName">{itemProduct.brand} {itemProduct.model}</span>
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <span >{itemProduct.price?itemProduct.price+' EUR':'NS'} </span>
          </div>
        </div>
      </div>
    </>
  );
}
