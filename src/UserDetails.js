

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "./index.css"; // Import the CSS file

function UserDetails() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [clockTime, setClockTime] = useState(0);
  const [clockRunning, setClockRunning] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const [userData, postsData, countriesData] = await Promise.all([
          axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`),
          axios.get(
            `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
          ),
          axios.get("http://worldtimeapi.org/api/timezone"),
        ]);
        console.log(userData.data)
        setUser(userData.data);
        setPosts(postsData.data);
        setCountries(countriesData.data);
        setSelectedCountry(countriesData.data[0]); // Set default country
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [userId]);

  useEffect(() => {
    let intervalId;

    if (clockRunning) {
      intervalId = setInterval(() => {
        setClockTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [clockRunning]);

  const handlePauseResume = () => {
    setClockRunning((prevRunning) => !prevRunning);
  };

  return (
    <div className="user-details-container">
      <Link to="/" className="back-button">
        <button>Back</button>
      </Link>
      <div className="profile-section">
        {user && (
          <div>
            {/* Clock and country selector */}
            <div className="clock-section">
              <h2>{user.name}'s Profile</h2>
              <div className="select-box">
                <div className="select-box-left">
                  <select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                  >
                    {countries.map((country, index) => (
                      <option key={index} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="clock-display">
                  <p>
                    {new Date(clockTime * 1000).toISOString().substr(11, 8)}
                  </p>
                </div>
                <button
                  className="pause-resume-button"
                  onClick={handlePauseResume}
                >
                  {clockRunning ? "Pause" : "Resume"}
                </button>
              </div>
            </div>

            {/* User details */}
            <div className="profile-page">
              <h4>Profile Page</h4>
              <div className="user-details-section">
                <div className="user-details-left">
                  <div>Name: {user.name}</div>
                  <div className="user-details-2">
                    <div>Username: {user.username}</div>|
                    <div>Catch Phrase: {user.company.catchPhrase}</div>
                  </div>
                </div>
                <div className="user-details-right">
                  Address: {user.address.city}, {user.address.street},{" "}
                  {user.address.suite}
                  <div className="user-details-right-2">
                    <div>Email: {user.email}</div>|
                    <div>Phone: {user.phone}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Render posts */}
            <div className="posts-container">
              {posts.map((post) => (
                <div key={post.id} className="post-card">
                  <h3>Post Title</h3>
                  <div>Title: {post.title}</div>
                  <h3>Post Content</h3>
                  <div>Content: {post.body}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserDetails;
