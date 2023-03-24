import React , {useState, useEffect} from 'react'
import "./announcement.css";
import { userRequest } from '../../requestMethods';

function Announcement() {
  const [announcements, setAnnouncements] = useState([]);
  const [editAnnouncement, setEditAnnouncement] = useState(null);

  useEffect(() => {
    userRequest.get('/announcements/')
      .then(res => setAnnouncements(res.data))
      .catch(err => console.log(err));
  }, [announcements]);


  const handleEditClick = announcement => {
    setEditAnnouncement(announcement);
  };

  const handleSaveClick = async () => {
    try {
      await userRequest.put(`/announcements/${editAnnouncement._id}`, editAnnouncement);
      setEditAnnouncement(null);
      const updatedAnnouncements = announcements.map(announcement => {
        if (announcement._id === editAnnouncement._id) {
          return editAnnouncement;
        } else {
          return announcement;
        }
      });
      setAnnouncements(updatedAnnouncements);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancelClick = () => {
    setEditAnnouncement(null);
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setEditAnnouncement(prevAnnouncement => ({
      ...prevAnnouncement,
      [name]: value
    }));
  };

  return (
    <div className='annContainer'>
      <table>
        <thead>
          <tr>
            {/* <th>ID</th>*/}
            <th>Posted By</th> 
            <th>Description</th>
            <th>Show</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {announcements.map(announcement => (
            <tr key={announcement._id}>
              {/* <td>{announcement._id}</td>*/}
              <td>{announcement.postedById}</td> 
              <td>
                {editAnnouncement && editAnnouncement._id === announcement._id ? (
                  <input
                    type='text'
                    name='description'
                    value={editAnnouncement.description}
                    onChange={handleInputChange}
                  />
                ) : (
                  announcement.description
                )}
              </td>
              <td>
                {editAnnouncement && editAnnouncement._id === announcement._id ? (
                  <select name='show' value={editAnnouncement.show} onChange={handleInputChange}>
                    <option value={true}>True</option>
                    <option value={false}>False</option>
                  </select>
                ) : (
                  announcement.show ? 'True' : 'False'
                )}
              </td>
              <td>
                {editAnnouncement && editAnnouncement._id === announcement._id ? (
                  <>
                    <button onClick={handleSaveClick}>Save</button>
                    <button onClick={handleCancelClick}>Cancel</button>
                  </>
                ) : (
                  <button onClick={() => handleEditClick(announcement)}>Edit</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


export default Announcement





