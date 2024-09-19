// app/dashboard/page.js
'use client';

import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import {RadarChartComponent, LineChartComponent, ChartComponent} from '../component/chart';

import Image from 'next/image';
import image1 from "../public/static/download2.jpeg"
import image2 from "../public/static/DevaGraphicDesignerLogo.jpeg"
import image3 from "../public/static/FreeLogoMaker _ CreateYourLogoin5Minutes.jpeg"
import image4 from "../public/static/download3.jpeg"
import image5 from "../public/static/pastel.jpeg"

const Dashboard = () => {
  const { token, logout } = useContext(AuthContext);
  const router = useRouter();
  const [userProfile, setUserProfile] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);


  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      router.push('/login');
      return;
    }

    const verifyToken = async () => {
      try {
        // Send a request to the token verification endpoint
        const response = await axios.get('http://localhost:5000/api/auth/tokenVerify', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          // console.log('Token is valid', response.data);
        }
      } catch (error) {
        console.error('Token verification failed', error);
        // If the token is invalid or there's an error, redirect to login
        router.push('/login');
      }
    };

    verifyToken();

    const fetchUserProfile = async () => {
      try {
        // First, fetch the user profile to get the role
        // console.log("send api/auth/profile")
        const userRes = await axios.get('http://localhost:5000/api/auth/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const userData = userRes.data;
        // console.log("userres.data", userRes.data)
        setUserProfile(userData);

        // Based on the user's role, fetch either admin or agency profile
        if (userData.role === 'admin') {
          const adminRes = await axios.get('http://localhost:5000/api/agency/all', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setProfile(adminRes.data);
        } else if (userData.role === 'agency') {
          const agencyRes = await axios.get('http://localhost:5000/api/agency/profile', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setProfile(agencyRes.data);
        }
      } catch (error) {
        console.error('Error fetching profiles:', error);
      } finally {
        setLoading(false); // End loading when the fetching is complete
      }
    };

    fetchUserProfile();

    const fetchStats = async () => {
      const res = await axios.get('/api/stats', {
        headers: { Authorization: token }
      });
      setStats(res.data);
    };

    // fetchUserProfile();
    // fetchStats();
  }, [token]);

//   if (!profile || !stats) return <div>Loading...</div>;
// if (!profile) return <div>Loading...</div>;

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div className='bg-[#fffbeb] text-[#212525] min-h-screen py-[24px] px-[24px]'>
      <div className=' flex justify-between px-[24px]'>
        <div>
          <div>
            {
              userProfile && (
                <div>
                  <div className='border-[1px] rounded-[44px] py-[4px] pl-[4px] pr-[16px] border-black text-[24px] flex items-center space-x-[10px]'>
                    <div className='bg-black w-[36px] h-[36px] rounded-[64px] p-[1px]'>
                      <Image 
                        src={image3}
                        // width={400}
                        // height={}
                        alt="Picture of the author"
                        className='object-contain rounded-[64px] '
                        style={{objectFit:"cover"}}
                      />
                    </div>
                    <div>
                      {userProfile.username}
                    </div>
                  </div>
                  <div className='pl-[14px] text-orange-400 font-[600]'>
                    {userProfile.role}
                  </div>
                </div>
              )
            }
          </div>
        </div>
        <div>
          <button onClick={logout} className='bg-[#ffdfdb] px-[14px] py-[6px] rounded-[24px] hover:bg-[#ffb463]'>Logout</button>
        </div>
      </div>
      <main className='h-[100%]'>
        {userProfile ? (
          userProfile.role === 'admin' ? (
            profile ? (
              <div>
                <AdminProfile profile={profile} />
              </div>
            ) : (
              <p>No profile data available</p>
            )
          ) : (
            profile ? (
              <div className='h-[100%]'>
                <Profile profile={profile} />
              </div>
            ) : (
              <div>
                <CreateProfile />
              </div>
            )
          )
        ) : (
          <p>Loading...</p>
        )}
      </main>
    </div>
  );
};

export default Dashboard;

const CreateProfile = () => {
  const [newName, setNewName] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newindustry, setNewindustry] = useState("");

  const handleUpdateProfile = async () => {
      const token = localStorage.getItem('token')
      console.log("token", token)
      await axios.post('http://localhost:5000/api/agency/create', {name: newName, address: newAddress, contact: newPhone, industry: newindustry}, {
        headers: { Authorization: `Bearer ${token}` }
      });
    };

  return (
    <div className='bg-white rounded-[24px] mt-[44px] space-y-[14px] py-[24px] pl-[24px] flex justify-center items-center flex-col w-[60%]'>
      <div className='text-[24px] w-[100%] mb-[24px] font-[600]'>Create Agency Profile</div>
        <>
          <div className='w-[60%]'>
            <div>Agency Name</div>
          <input 
            className='text-black bg-[#fffbe7] w-[100%] rounded-[24px] h-[44px] pl-[22px]'
            type="text"
            placeholder="New Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          </div>
          <div className='w-[60%]'>
          <div>Agency Address</div>
          <input 
            className='text-black bg-[#fffbe7] w-[100%] rounded-[24px] h-[44px] pl-[22px]'
            type="text"
            placeholder="New Address"
            value={newAddress}
            onChange={(e) => setNewAddress(e.target.value)}
          />
          </div>
          <div className='w-[60%]'>
          <div>Agency Contact</div>
          <input 
            className='text-black bg-[#fffbe7] w-[100%] rounded-[24px] h-[44px] pl-[22px]'
            type="text"
            placeholder="New Phone"
            value={newPhone}
            onChange={(e) => setNewPhone(e.target.value)}
          />
          </div>
          <div className='w-[60%]'>
          <div>Agency industry</div>
          <input 
            className='text-black bg-[#fffbe7] w-[100%] rounded-[24px] h-[44px] pl-[22px]'
            type="text"
            placeholder="New Business Hours"
            value={newindustry}
            onChange={(e) => setNewindustry(e.target.value)}
          />
          </div>
          <button onClick={handleUpdateProfile} className='bg-[#edff25] text-[#70752b] rounded-[24px] px-[14px] py-[6px] font-[600]'>Save Changes</button>
          <div className='rounded-[24px] text-wrap w-fit px-[14px] py-[14px] bg-[#fff1f5] text-[12px] mt-[14px]'>
            Refresh after clicking button
          </div>
        </>
    </div>
  );
};

const AdminProfile = ({ profile }) => { // Default to an empty array if profiles is undefined
  const [editMode, setEditMode] = useState(null); // Track which profile is being edited (null means no profile is in edit mode)
  const [editedProfiles, setEditedProfiles] = useState([]);

  useEffect(() => {
    setEditedProfiles(profile);
  }, [profile]);

  const handleUpdateProfile = async (index) => {
    const updatedProfile = editedProfiles[index];

    console.log("updatedprofile", updatedProfile)

    const token = localStorage.getItem('token')
    await axios.put(`http://localhost:5000/api/agency/update/${updatedProfile._id}`, {name: updatedProfile.name, address: updatedProfile.address, contact: updatedProfile.contact, industry: updatedProfile.industry}, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setEditMode(null); // Exit edit mode after saving
  };

  const handleDelete = async (index) => {
    const updatedProfile = editedProfiles[index];
    
    const token = localStorage.getItem('token')
    await axios.delete(`http://localhost:5000/api/agency/${updatedProfile._id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  const handleChange = (index, field, value) => {
    const updatedProfiles = [...editedProfiles];
    updatedProfiles[index] = { ...updatedProfiles[index], [field]: value };
    setEditedProfiles(updatedProfiles);
  };

  if (!profile.length) {
    return <p>No profiles available</p>; // Handle case when there are no profiles
  }

  return (
    <div>
      <div className=' bg-white rounded-[24px] px-[144px] py-[34px] flex flex-col items-center'>
        <div className='text-wrap rounded-[24px]  px-[14px] py-[14px] bg-[#fff1f5] text-[12px] mb-[14px] w-[200%] md:w-[100%]'>
          This dashboard uses mockdata. Because of the time limit it wasn't possible to implement a full scale database schema to handle stats data.
        </div>
        <div className='flex flex-col space-x-[44px] space-y-[24px] lg:space-y-[14px] lg:space-x-[0px] lg:flex-row lg:justify-between'>
          <div className='w-fit h-[280px]'>
            <ChartComponent />
          </div>
          <div className='w-fit h-[220px]'>
            <RadarChartComponent />
          </div>
          <div className='w-fit h-[220px]'>
            <LineChartComponent />
          </div>
        </div>
        
        <div className='grid gap-y-[24px] space-x-[0px] lg:space-x-[64px] lg:flex lg:justify-between mt-[24px]'>
          <div>
            <div className='text-[24px] text-[#909090] font-[600]'>
              Total Visitors
            </div>
            <div className='text-[44px]'>
              1036
            </div>
          </div>
          <div>
            <div className='text-[24px] text-[#909090] font-[600]'>
              Projects
            </div>
            <div className='text-[44px]'>
              54
            </div>
          </div>
          <div>
            <div className='text-[24px] text-[#909090]  font-[600]'>
              Client Satisfaction Rating
            </div>
            <div className='text-[44px]'>
              96%
            </div>
          </div>
          <div>
            <div className='text-[24px] text-[#909090]  font-[600]'>
              Pending Requests
            </div>
            <div className='text-[44px]'>
              6
            </div>
          </div>
        </div>
      </div>
      <div className='lg:grid lg:grid-cols-2 pl-[24px]'>
      
      {editedProfiles.map((profile, index) => (
        <div key={index} style={{ marginBottom: '20px' }} className='bg-white h-fit mt-[24px] rounded-[24px] pt-[24px] lg:w-[80%] px-[24px] py-[24px]'>
          {editMode === index ? (
            <>
            <div className='flex flex-col space-y-[14px] pl-[24px]'>
              <div>
                <input
                  className='text-black bg-[#fffbe7] rounded-[24px] h-[34px] pl-[22px]'
                  type="text"
                  placeholder="New Name"
                  value={profile.name}
                  onChange={(e) => handleChange(index, 'name', e.target.value)}
                />
              </div>
              <div>
                <input
                  className='text-black bg-[#fffbe7] rounded-[24px] h-[34px] pl-[22px]'
                  type="text"
                  placeholder="New Address"
                  value={profile.address}
                  onChange={(e) => handleChange(index, 'address', e.target.value)}
                />
              </div>
              <div>
                <input
                  className='text-black bg-[#fffbe7] rounded-[24px] h-[34px] pl-[22px]'
                  type="text"
                  placeholder="New Phone"
                  value={profile.contact}
                  onChange={(e) => handleChange(index, 'contact', e.target.value)}
                />
              </div>
              <div>
                <input
                  className='text-black bg-[#fffbe7] rounded-[24px] h-[34px] pl-[22px]'
                  type="text"
                  placeholder="New Industry"
                  value={profile.industry}
                  onChange={(e) => handleChange(index, 'industry', e.target.value)}
                />
              </div>
              <button 
                onClick={() => handleUpdateProfile(index)} 
                className='w-fit px-[14px] py-[6px] rounded-[24px] hover:bg-[#7aff37] bg-[#edff25]'
              >
                Save Changes
              </button>
              <button 
                onClick={() => setEditMode(null)} 
                className='w-fit px-[14px] py-[6px] rounded-[24px] bg-[#ff7525] hover:bg-[#fa4c35]'
              >
                Cancel
              </button>
            </div>
          </>
          
          ) : (
            <div className='bg-white px-[12px] rounded-[24px] h-fit'> 
            <div className='w-full flex justify-end mb-[24px]'>
              <button onClick={() => handleDelete(index)} className='bg-[#fa4c35] px-[14px] py-[6px] rounded-[24px] hover:bg-[#ffa362]'>
                Delete
              </button>
            </div>
            
            <div className='w-[100%] h-[100px] bg-orange-500 overflow-hidden'>
              <Image 
                src={image5}
                alt="Picture of the author"
                className='z-0' 
                style={{objectFit:"cover"}}
              />
            </div>
            
            <div className='mt-[-24px]'>
              <div className='bg-white w-[100px] h-[100px] rounded-[64px] p-[7px] z-10'>
                <Image 
                  src={image2}
                  alt="Picture of the author"
                  className='object-contain rounded-[64px]'
                  style={{objectFit:"cover"}}
                />
              </div>
              
              <div className='px-[12px] mt-[12px]'>
                <div className='font-[600] mb-[14px] text-[24px]'>
                  <p>{profile.name}</p>
                </div>
                
                <div className='flex space-x-[14px]'>
                  <p className='px-[8px] border-[1px] border-[black] rounded-[14px] py-[0px] w-fit'>{profile.address}</p>
                  <p className='px-[8px] border-[1px] border-[black] rounded-[14px] py-[0px] w-fit'>{profile.contact}</p>
                </div>
                
                <div className='mt-[4px] mb-[24px]'>
                  <div className='px-[8px] border-[1px] border-[black] rounded-[14px] py-[0px] w-fit'>
                    <p>{profile.industry}</p>
                  </div>
                </div>
                
                <button onClick={() => setEditMode(index)} className='bg-[#edff25] hover:bg-[#7aff37] text-[#70752b] rounded-[24px] px-[14px] py-[6px] font-[600]'>
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
          
          )}
        </div>
      ))}
      </div>
    </div>
  );
};


const Profile = ({ profile }) => {
    const [editMode, setEditMode] = useState(false);
    const [id, setId] = useState(profile._id)
    const [newName, setNewName] = useState(profile.name);
    const [newAddress, setNewAddress] = useState(profile.address);
    const [newPhone, setNewPhone] = useState(profile.contact);
    const [newindustry, setNewindustry] = useState(profile.industry);
    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');
    // const handleUpdateProfile = () => {
    //   // Add logic for updating profile here
    //   setEditMode(false);
    // };

    const handleAddProject = async() => {
      if (newTitle && newDescription) {
  
        // Assuming `updateProfile` will update the profile with the new project
        // const updatedProjects = [...profile.projects, newProject];
        // updateProfile({ ...profile, projects: updatedProjects });
  
        const token = localStorage.getItem('token')
        await axios.put(`http://localhost:5000/api/agency/${id}/project`, {title: newTitle, description: newDescription}, {
          headers: { Authorization: `Bearer ${token}` }
        });

        // Clear input fields after adding the project
        setNewTitle('');
        setNewDescription('');
      }
    };

    const handleDeleteProject  = async(title) => {

      const token = localStorage.getItem('token')
      await axios.delete(`http://localhost:5000/api/agency/${id}/${title}/project`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      

      // Clear input fields after adding the project
      setNewTitle('');
      setNewDescription('');
    };


    const handleUpdateProfile = async () => {
        const token = localStorage.getItem('token')
        await axios.put(`http://localhost:5000/api/agency/update/${id}`, {name: newName, address: newAddress, contact: newPhone, industry: newindustry}, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setEditMode(false);
      };

    return (
      <div className='h-[100%] px-[24px] py-[24px] space-y-[24px]'>
        <div className='md:flex md:space-x-[32px] h-[100%]'>

          <div className='md:w-[40%]'>
            <div className=' bg-white rounded-[24px] pt-[24px] h-[460px]'>
              <div className='pl-[14px] text-[44px]'>Profile</div>
              <div className=''>
                {editMode ? (
                  <div className='flex flex-col space-y-[14px] pl-[24px]'>
                    <div className=''>
                      <input
                        className='text-black bg-[#fffbe7] rounded-[24px] h-[34px] pl-[22px]'
                        type="text"
                        placeholder="New Name"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                      />
                    </div>
                    <div>
                      <input
                        className='text-black  bg-[#fffbe7] rounded-[24px] h-[34px] pl-[22px]'
                        type="text"
                        placeholder="New Address"
                        value={newAddress}
                        onChange={(e) => setNewAddress(e.target.value)}
                      />
                    </div>
                    <div>
                      <input
                        className='text-black  bg-[#fffbe7] rounded-[24px] h-[34px] pl-[22px]'
                        type="text"
                        placeholder="New Phone"
                        value={newPhone}
                        onChange={(e) => setNewPhone(e.target.value)}
                      />
                    </div>
                    <div>
                      <input
                        className='text-black  bg-[#fffbe7] rounded-[24px] h-[34px] pl-[22px]'
                        type="text"
                        placeholder="New Business Hours"
                        value={newindustry}
                        onChange={(e) => setNewindustry(e.target.value)}
                      />
                    </div>
                    <button onClick={handleUpdateProfile} className='w-fit px-[14px] py-[6px] rounded-[24px] hover:bg-[#7aff37] bg-[#edff25]'>Save Changes</button>
                    <button onClick={() => setEditMode(false)} className='w-fit px-[14px] py-[6px] rounded-[24px] bg-[#ff7525] hover:bg-[#fa4c35]'>Cancel</button>
                  </div>
                ) : (
                  <div className='bg-white px-[12px] rounded-[24px]'> 
                    <div className='w-[100%] h-[100px] bg-orange-500  overflow-hidden '>
                      <Image 
                        src={image5}
                        // width={300}
                        // height={100}
                        // fill
                        alt="Picture of the author"
                        className='z-0' 
                        style={{objectFit:"cover"}}
                      />
                    </div>
                    <div className='mt-[-24px]'>
                      <div className='bg-white w-[100px] h-[100px] rounded-[64px] p-[7px] z-10'>
                        <Image 
                          src={image2}
                          // width={400}
                          // height={}
                          alt="Picture of the author"
                          className='object-contain rounded-[64px] '
                          style={{objectFit:"cover"}}
                        />
                      </div>
                      <div className='px-[12px] mt-[12px]'>
                        <div className='font-[600] mb-[14px] text-[24px]'>
                          <p>{profile.name}</p>
                        </div>
                        <div className='flex space-x-[14px]'>
                          <p className='px-[8px] border-[1px] border-[black] rounded-[14px] py-[0px] w-fit'>{profile.address}</p>
                          <p className='px-[8px] border-[1px] border-[black]  rounded-[14px] py-[0px] w-fit'>{profile.contact}</p>
                        </div>
                        <div className='mt-[4px] mb-[24px]'>
                          <div className='px-[8px] border-[1px] border-[black]  rounded-[14px] py-[0px] w-fit'>
                            <p>{profile.industry}</p>
                          </div>
                        </div>
                        <button onClick={() => setEditMode(true)} className='bg-[#edff25] hover:bg-[#7aff37] text-[#70752b] rounded-[24px] px-[14px] py-[6px] font-[600]'>Edit Profile</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className='bg-white mt-[24px] rounded-[24px] py-[24px] px-[24px]'>
              <div className='text-[24px]'>
                View projects
              </div>
              <div className='space-y-[14px] py-[24px] pl-[12px]'>
                {
                  profile.projects && 
                  profile.projects.map((item, index) => (
                    <div key={index} className='leading-[24px] border-b-[2px] flex justify-between'>
                      <div className=''>
                        <div className='text-[24px] font-[600]'>
                          {item.title}
                        </div>
                        <div className='text-[18px]'>
                          {item.description}
                        </div>
                      </div>
                      <div>
                        <button onClick={() => handleDeleteProject(item.title)} className='bg-[#fa4c35] px-[14px] py-[6px] rounded-[24px] hover:bg-[#fab235]'>
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                }
              </div>
              <div className='space-y-[12px]'>
                <div className='text-[24px]'>
                  Add new project
                </div>
                <div>
                  <input
                    className='text-black bg-[#fffbe7] w-[80%] rounded-[24px] h-[44px] pl-[22px]'
                    type="text"
                    placeholder="New title"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    className='text-black bg-[#fffbe7] w-[80%] rounded-[24px] h-[44px] pl-[22px]'
                    type="text"
                    placeholder="New description"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                  />
                </div>
                <button onClick={handleAddProject} className='bg-[#edff25] hover:bg-[#7aff37] text-[#70752b] rounded-[24px] px-[14px] py-[6px] font-[600]'>Add Project</button>
                <div className='rounded-[24px] text-wrap w-fit px-[14px] py-[14px] bg-[#fff1f5] text-[12px] mt-[14px]'>
                  Refresh After Pressing button to see changes
                </div>
              </div>
            </div>
          </div>
      
          <div className=' bg-white md:w-[60%] h-[100%] flex flex-col items-center space-y-[44px] md:space-y-[0px]'>
            <div className='w-full flex justify-center items-center text-[44px] font-[500]'>
              Statistics
            </div>
            <div className=' md:pl-[34px] md:py-[24px] md:grid md:grid-cols-2 md:gap-y-[22px] space-y-[24px] md:space-y-[0px] md:gap-x-[44px]'>
              {/* <div className='w-fit bg-red-300'>
                <ChartComponent />
              </div> */}
              <div className='w-fit h-[220px] pr-[24px]'>
                <RadarChartComponent />
              </div>
              <div className='w-fit h-[220px]'>
                <LineChartComponent />
              </div>
              <div>
                <div className='text-[24px] text-[#909090] font-[600]'>
                  Total Visitors
                </div>
                <div className='text-[44px]'>
                  1036
                </div>
              </div>
              <div>
                <div className='text-[24px] text-[#909090] font-[600]'>
                  Projects
                </div>
                <div className='text-[44px]'>
                  54
                </div>
              </div>
              <div>
                <div className='text-[24px] text-[#909090]  font-[600]'>
                  Client Satisfaction Rating
                </div>
                <div className='text-[44px]'>
                  96%
                </div>
              </div>
              <div>
                <div className='text-[24px] text-[#909090]  font-[600]'>
                  Pending Requests
                </div>
                <div className='text-[44px]'>
                  6
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  };