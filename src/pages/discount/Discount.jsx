import React, { useState, useEffect } from 'react';
import "./discount.css";
import { userRequest } from '../../requestMethods';

function Discount() {
  const [discounts, setDiscounts] = useState([]);
  const [editDiscount, setEditDiscount] = useState(null);

  useEffect(() => {
    userRequest.get('/discount/')
      .then(res => setDiscounts(res.data))
      .catch(err => console.log(err));
  }, [discounts]);



  const handleEditClick = discount => {
    setEditDiscount(discount);
  };

  const handleSaveClick = async () => {
    try {
      await userRequest.put(`/discount/${editDiscount._id}`, editDiscount);
      setEditDiscount(null);
      const updatedDiscounts = discounts.map(discount => {
        if (discount._id === editDiscount._id) {
          return editDiscount;
        } else {
          return discount;
        }
      });
      setDiscounts(updatedDiscounts);
      //console.log(updatedDiscounts);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancelClick = () => {
    setEditDiscount(null);
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setEditDiscount(prevDiscount => ({
      ...prevDiscount,
      [name]: value
    }));
  };

  return (
    <div className='discountContainer'>
      <table>
        <thead>
          <tr>
            <th>Percentage Off</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Active</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {discounts.map(discount => (
            <tr key={discount._id}>
              <td>
                {editDiscount && editDiscount._id === discount._id ? (
                  <input
                    type='number'
                    name='percentageOff'
                    value={editDiscount.percentageOff}
                    onChange={handleInputChange}
                  />
                ) : (
                  `${discount.percentageOff}%`
                )}
              </td>
              <td>
                {editDiscount && editDiscount._id === discount._id ? (
                  <input
                    type='date'
                    name='startDate'
                    value={editDiscount.startDate}
                    onChange={handleInputChange}
                  />
                ) : (
                  new Date(discount.startDate).toLocaleDateString()
                )}
              </td>
              <td>
                {editDiscount && editDiscount._id === discount._id ? (
                  <input
                    type='date'
                    name='endDate'
                    value={editDiscount.endDate}
                    onChange={handleInputChange}
                  />
                ) : (
                  new Date(discount.endDate).toLocaleDateString()
                )}
              </td>
              <td>
                {editDiscount && editDiscount._id === discount._id ? (
                  <select name='isActive' value={discount.isActive} onChange={handleInputChange}>
                  <option value={true}>Active</option>
                  <option value={false}>InActive</option>
                </select>
                  
                ) : (
                  discount.isActive ? 'Active' : 'Inactive'
                )}
              </td>
              <td>
                {editDiscount && editDiscount._id === discount._id ? (
                  <>
                    <button onClick={handleSaveClick}>Save</button>
                    <button onClick={handleCancelClick}>Cancel</button>
                  </>
                ) : (
                  <button onClick={() => handleEditClick(discount)}>Edit</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
}

export default Discount;
