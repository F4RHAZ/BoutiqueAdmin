import React from "react";
import { useState } from "react";

import "./newProduct.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { addProduct } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function NewProduct() {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState([]);
  const [cat, setCat] = useState([]);
  const dispatch = useDispatch();
  const history = useNavigate();



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


  const trialImage = (e) =>{
    e.preventDefault();
    console.log(file);
  }

  const handleClick = (e) => {
    e.preventDefault();
  
    if (!inputs.title || !inputs.desc || !inputs.price || !inputs.categories || !inputs.size || !file.length) {
      alert("Please Enter All Fields");
      return;
    }
  
    const storage = getStorage(app);
    const productImages = [];
  
    // Counter to keep track of successful uploads
    let uploadCount = 0;
  
    // Loop through selected files and upload each one
    for (let i = 0; i < file.length; i++) {
      const fileName = new Date().getTime() + file[i].name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file[i]);
  
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload ${i+1} is ${progress}% done`);
        },
        (error) => {
          // Handle unsuccessful uploads
          console.log(`Upload ${i+1} failed: ${error.message}`);
  
          // Add an error message to the productImages array
          productImages.push(`Upload ${i+1} failed: ${error.message}`);
  
          // Check if all files have been uploaded
          if (productImages.length === file.length) {
            // Display error message to user
            alert("Failed to upload all images. Please try again.");
          }
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            productImages.push(downloadURL);
            uploadCount++;
  
            // When all files have been uploaded, add the product to the database with the uploaded images
            if (uploadCount === file.length) {
              const product = { ...inputs, img: productImages };
  
              // Use a try-catch block to catch any errors that occur during the database write operation
              try {
                addProduct(product, dispatch);
                
              } catch (error) {
                console.log("Error adding product to database:", error);
                alert("Failed to add product. Please try again.");
              }
            }
          });
        }
      );
    }
  };

  return (
    
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input
             
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files)}
            required
            multiple
          />
          
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input
            name="title"
            type="text"
            placeholder="Cloth Name"
            onChange={handleChange}
            required
          />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input
            name="desc"
            type="text"
            placeholder="description..."
            onChange={handleChange}
            required
          />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input
            name="price"
            type="number"
            placeholder="100"
            onChange={handleChange}
            required
          />
        </div>
        <div className="addProductItem">
          <label>Categories</label>
          <input name="categories" type="text" placeholder="jeans,skirts" onChange={handleCat} />
        </div>
        <div className="addProductItem">
          <label>Size</label>
          <input name="size" type="text" placeholder="L, X, 32, 40" onChange={handleCat} />
        </div>
        <div className="addProductItem">
          <label>Colors</label>
          <input name="color" type="text" placeholder="red, blue, green" onChange={handleCat} />
        </div>
        <div className="addProductItem">
          <label>Stock</label> 
          <select name="inStock" onChange={handleChange}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <button onClick={handleClick} className="addProductButton">
          Create
        </button>
      </form>
    </div>
  );
}