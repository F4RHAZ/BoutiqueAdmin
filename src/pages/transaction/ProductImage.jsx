import { useState, useEffect } from 'react';
import { userRequest } from '../../requestMethods';


function ProductImage({ productId }) {
  

//console.log(productId)


  return (
    <img
      className="transactionUpdateImg"
      src={productId ? productId : 'https://via.placeholder.com/500'}
      alt=""
    />
  );
}

export default ProductImage;