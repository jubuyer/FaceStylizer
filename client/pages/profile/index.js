import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import Profile from '@/components/profile';
import RHeader from "@/components/header";
import UpdateUsername from "@/components/changeusername";
import { Button, Modal, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from "reactstrap";


const ProfileCard = () => {

  const [modalOpen, setModalOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [open, setOpen] = useState(true);
  const [showUpdateUsername, setShowUpdateUsername] = useState(false);


  const handleSubmit = async (e) => {
    sessionStorage.clear();
  };

    const router = useRouter(); 

    const handleNavigateHome = () => {
        router.push('/'); 
    };


    useEffect(() => {
      const fetchUsername = () => {
      try {
        // Retrieve the username from session storage
        const storedUsername = sessionStorage.getItem('username');
        setUsername(storedUsername);
      } catch (error) {
        console.error("Error fetching username:", error);
      }
    };
  
    fetchUsername();
    }, []);
const toggleUpdateUsernameModal = () => {
        setModalOpen(!modalOpen);
      };
    
  return (


    <div>
        <RHeader/>

      <div className="p-8 bg-white shadow mt-24">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0"></div>
          <div className="place-content-center"></div>
          <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
            <button className="text-white py-2 px-4 uppercase rounded bg-yellow-500 hover:bg-yellow-400 text-white focus:shadow-outline focus:outline-none shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
              Change Password
            </button>
            <button
            className="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
            <UpdateUsername />
                        </button>
          </div>
        </div>
        <div className="mt-40 text-center border-b pb-12">
         
          <div className="px-25 display-flex place-content-center w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl -mt-24 mb-4 flex items-center justify-center text-indigo-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" viewBox="0 0 20 20" fill="#B8860B">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
          <h1 className="text-4xl font-medium text-gray-700">
                {username}
          </h1>
          <p className="mt-8 text-gray-500"><b>Enjoy Stylizing your best Selfies</b></p>
          <p className="mt-2 text-gray-500"><b>FaceStylizer is a Non-Profit Organization</b></p>
        </div>
        <div className="mt-12 flex flex-col justify-center">
          <p className="text-gray-600 text-center font-light lg:px-16">
           <b> Thank you for being part of FaceStylizer Family</b>
          </p>
          <button
            onClick={handleNavigateHome}
             className="mt-5 rounded-sm py-2 px-4 bg-yellow-500 hover:bg-yellow-400 text-white focus:shadow-outline focus:outline-none animate-bounce text-base flex items-center justify-center"
            style={{ maxWidth: "100px", overflow: "hidden", margin: "0 auto" }}
          >
            FaceStylize
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;