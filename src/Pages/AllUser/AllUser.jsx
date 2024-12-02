import React, {useState, useEffect} from 'react';
import './AllUser.css';
import Help from '../../Components/Help/Help'
import emptyImg from '../../images/empty.jpeg'
import { NavLink, useParams } from 'react-router-dom';
import { FiPlusSquare } from "react-icons/fi";
import { FiSettings } from "react-icons/fi";
import { FiBookmark } from "react-icons/fi";
import { FiCamera } from "react-icons/fi";
import { useFirebase } from '../../Firebase';

function AllUser() {

  const firebase = useFirebase();
  const {alluserId} = useParams();

  const [userData, setUserData] = useState(null);
  console.log(userData);
  const [bio, setBio] = useState("");
  const [username, setUsername] = useState('');

  useEffect(()=>{
     const fetchUser = () => {
        const user = firebase.users.find((u)=> u.username === alluserId);
        setUserData(user);
     };
     fetchUser();
  },[firebase.users, alluserId]);

  useEffect(() => {
    const fetchBio = async () => {
      try {
        const fetchedBio = await firebase.getUserBio(); 
        setBio(fetchedBio); 
      } catch (error) {
        console.error("Error fetching bio:", error);
      }
    };

    fetchBio();
  }, [firebase]);

  useEffect(() => {
    const fetchBio = async () => {
      try {
        const fetchedUsername = await firebase.getUsername(); 
        setUsername(fetchedUsername); 
      } catch (error) {
        console.error("Error fetching username:", error);
      }
    };

    fetchBio();
  }, [firebase]);

  if (!userData) {
    return <h2>User not found</h2>;
  };


  return (
    <>
    <main>
      <div className="user-container">
         <div className="top-user-section">
                <div className="logo-section">
                 <img src={userData.photoURL || emptyImg} alt="" />
                </div>
                <div className="profile-section">
                   <div className="profile-container">
                   <div className="user-username-detail">
                    <h4>{userData.username}</h4>
                    <button>Following</button>
                    <button>Message</button>
                    <h3><FiSettings /></h3>
                   </div>
                   <div className="folling-followers-details">
                    <h4>0 <span>post</span></h4>
                    <h4>15 <span>followers</span></h4>
                    <h4>360 <span>following</span></h4>
                   </div>
                   <div className="user-other-bio-details">
                     <div className="user-name">
                      <h4 className='account-name'>{userData.fullName}</h4>
                      <p>{userData.bio || ""}</p>
                     </div>
                   </div>
                </div>
              </div>
              </div>

              <div className="user-line">
               <hr />
              </div>

         <div className="bottom-user-section">
              <div className="botttom-user-container">
                 <div className="post-saved">
                 <p><FiPlusSquare /></p>
                 <span>Post</span>
                 </div>
                 <div className="post-saved">
                 <p><FiBookmark /></p>
                 <span>Saved</span>
                 </div>
              </div>
              <div className="post-section">
                <div className="post-box">
                   <h1><FiCamera /></h1>
                   <h2>No Post yet</h2>
                </div>
              </div>
         </div>
      </div>
     <div className="user-help-box">
     <Help/>
     </div>
    </main>
    </>
  )
}

export default AllUser