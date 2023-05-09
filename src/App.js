import React from "react";
import './App.css';
import Topbar from "./components/topbar/Topbar";
import Sidebar from "./components/sidebar/Sidebar";
import Home from './pages/home/Home';
import {BrowserRouter as Router, Switch, Routes, Route, Navigate} from  "react-router-dom";
import UserList from './pages/userList/UserList';
import User from './pages/user/User';
import NewUser from './pages/newUser/NewUser';
import ProductList from './pages/productList/ProductList';
import Product from './pages/product/Product';
import TransactionList from "./pages/transactionList/TransactionList";
import Transaction from "./pages/transaction/Transaction";
import Login from './pages/login/Login';
import MessageList from "./pages/messageList/MessageList";
import Message from "./pages/message/Message";
import NewProduct from './pages/newProduct/NewProduct';
import Announcement from "./pages/announcement/Announcement";
import Discount from "./pages/discount/Discount";
import { useSelector } from "react-redux";


function App() {
//  const admin = useSelector((state) => state.user.currentUser.isAdmin);
const admin = useSelector((state) => state.user.currentUser ? state.user.currentUser.isAdmin : null);

//console.log(admin)

  return (
    <Router>
    <Topbar />
    <div className="container">
      <Sidebar />
      <Routes>
        {admin ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/newproduct" element={<NewProduct />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/user/:userId" element={<User />} />
            <Route path="/newUser" element={<NewUser />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/product/:productId" element={<Product />} />
            <Route path="/transactions" element={<TransactionList />} />
            <Route path="/transaction/:orderId" element={<Transaction />} />
            <Route path="/messages" element={<MessageList/>}/>
            <Route path="/message/:firstUserId/:secondUserId" element={<Message/>}/>
            <Route path="/announcements" element={<Announcement/>}/>
            <Route path ="/discount" element={<Discount/>}/>
          </>
        ) : (
          <Route path="/" element={<Login />} />
        )}
      </Routes>
    </div>
  </Router>
  );
}

export default App;
