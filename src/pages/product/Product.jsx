import { Link, useLocation } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart"
import {productData} from "../../dummyData"
import { Publish } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";
import { updateProduct } from "../../redux/apiCalls";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";


export default function Product() {
    const location = useLocation()
    const productId = location.pathname.split("/")[2];
    const [pStats, setPStats] = useState([]);
    
    const dispatch = useDispatch();

    const [inputs, setInputs] = useState({});
    const [file, setFile] = useState(null);
    const [cat, setCat] = useState([]);


    const handleChange = (e) => {
      setInputs((prev) => {
        return { ...prev, [e.target.name]: e.target.value };
      });
    };
    const handleCat = (e) => {
      setInputs((prev) => {
        return { ...prev, [e.target.name]: e.target.value.split(",") };
      });
    };

    //inputs && console.log(inputs);

    const product = useSelector((state)=>
        state.product.products.find((product) => product._id === productId)
    );
      
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get("orders/income?pid=" + productId);
        const list = res.data.sort((a,b)=>{
            return a._id - b._id
        })
        list.map((item) =>
          setPStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ])
        );
      } catch (err) {
        console.log(err);
      } 
    };
    getStats();
  }, [productId, MONTHS]);


    const handleSubmit = async (e) => {
    e.preventDefault();
   

     updateProduct(productId, inputs, dispatch )
   };

  function handleFileChange(e, index) {
    console.log(e, index);
    const newFiles = [...product.img];
    newFiles[index] = e.target.files[0];
    setFile(prevProduct => ({ ...prevProduct, files: newFiles }));
  }

  
  //console.log(product)

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
       
          <Link to="/newproduct">
            <button className="productAddButton">Create</button>
          </Link>
      </div>
      <div className="productTop">
          <div className="productTopLeft">
              <Chart data={pStats} dataKey="Sales" title="Sales Performance"/>
          </div>
          <div className="productTopRight">
              <div className="productInfoTop">
                  <img src={product.img} alt="" className="productInfoImg" />
                  <span className="productName">{product.title}</span>
              </div>
              <div className="productInfoBottom">
                  <div className="productInfoItem">
                      <span className="productInfoKey">id:</span>
                      <span className="productInfoValue">{product._id}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">sales:</span>
                      <span className="productInfoValue"></span>
                  </div>
                
                  <div className="productInfoItem">
                      <span className="productInfoKey">in stock:</span>
                      <span className="productInfoValue">{product.inStock ? (
                      <span style={{ color: "green" }}>Yes</span>
                    ) : (
                      <span style={{ color: "red" }}>Out of stock</span>
                    )}</span>
                  </div>
              </div>
          </div>
      </div>

      <div className="productBottom">
          <form className="productForm" onSubmit={handleSubmit}>
              <div className="productFormLeft">
                  <label>Product Name</label>
                  <input  name="title" type="text" placeholder={product.title} onChange={handleChange}/>
                  <label>In Stock</label>
                  <select name="inStock" id="idStock"
                  
                  onChange={handleChange}
                  >
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                  </select>
                  <label>Product Description</label>
                  <input  name="desc" type="text" placeholder={product.desc} onChange={handleChange} />
                  <label>Product Price</label>
                  <input  name="price" type="text" placeholder={ product && product.price} onChange={handleChange} />
                  <label>Product Size</label>
                  <input  name="size" type="text" placeholder={product && product.size} onChange={handleCat}/>
                  <label>Product Category</label>
                  <input name="categories" type="text" placeholder={product.categories} onChange={handleCat}/>
                  <label>Product Color</label>
                  <input name="color" type="text" placeholder={product.color} onChange={handleCat}/>
                  
              </div>
              
              {/* <div className="productFormRight">
                  <div className="productUpload">
                      <img src={product.img} alt="" className="productUploadImg" />
                      <label htmlFor="file">
                          <Publish/>
                      </label>
                      <input 
                        type="file" 
                        id="file" 
                        style={{display:"none"}} 
                        onChange={(e) => setFile(e.target.files[0])}
                      />
                  </div>
                  <button className="productButton">Update</button>
              </div> */}

<div className="productFormRight">
  {product.img.map((img, index) => (
    <div key={index} className="productUpload">
      <img src={img} alt="" className="productUploadImg" />
      <label htmlFor={`file-${index}`}>
        <Publish/>
      </label>
      <input 
        type="file" 
        id={`file-${index}`} 
        style={{display:"none"}} 
        onChange={(e) => handleFileChange(e, index)}
      />
    </div>
  ))}
  <button className="productButton">Update</button>
</div>



          </form>
      </div>
    </div>
  );
}