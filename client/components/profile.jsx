import React, { useState, useEffect } from "react";
import { Button, Modal, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";

function Profile() {
  const [modalOpen, setModalOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [formData, setFormData] = useState({
    prevUsername: "",
    newUsername: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "newUsername") {
      setFormData((prevState) => ({
        ...prevState,
        newUsername: value,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Submitting form data:', formData);
      const response = await axios.post('/updateUsername', {
        newUsername: formData.newUsername
      });
      console.log('Username updated successfully:', response.data);
      
      sessionStorage.setItem('username', formData.newUsername);
      setUsername(formData.newUsername);
      setModalOpen(false);
    } catch (error) {
      console.error('Error committing changes:', error);
      console.log('Error response:', error.response);
      setError(error.response?.data?.message || 'An error occurred while changing');
    }
  };
  
  useEffect(() => {
    const fetchUsername = () => {
      try {
        const storedUsername = sessionStorage.getItem('username');
        setUsername(storedUsername);
      } catch (error) {
        console.error("Error fetching username:", error);
      }
    };

    fetchUsername();
  }, []);


  const handleSignOut = () => {
    sessionStorage.removeItem('username'); // Remove username from session storage
    setUsername(""); // Clear username state
    window.location.href = '/'; // Redirect to home page
  };
  

  return (
    <>
      <button
        className="mt-2 text-sm bg-white active:bg-blueGray-50 text-blueGray-700 px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 shadow-sm hover:shadow-sm inline-flex items-center font-bold ease-linear transition-all duration-150"
        type="button"
        onClick={() => setModalOpen(!modalOpen)}
      >
        Hi, {username}
      </button>
      <button
        className="mt-2 text-sm bg-white active:bg-blueGray-50 text-blueGray-700 px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 shadow-sm hover:shadow-sm inline-flex items-center font-bold ease-linear transition-all duration-150"
        type="button"
        onClick={handleSignOut}
      >
        Sign Out
      </button>
      <Modal toggle={() => setModalOpen(!modalOpen)} isOpen={modalOpen}>
        <div className="text-center mt-3 m-2">
          <h5 className="text-gray-600 font-bold">
            {username}&apos;s Profile
          </h5>
        </div>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <div className="text-center">
              <Button color="primary" outline type="submit">Sign Out</Button>
            </div>
            <div className="text-center">
              <Button color="primary" outline type="submit">Change Username</Button>
            </div>
              <Modal toggle={() => setModalOpen(!modalOpen)} isOpen={modalOpen}>
              <div className="text-center mt-3 m-2">
                <h5 className="text-gray-600 font-bold">
                  Change Username
                </h5>
              </div>
              <ModalBody>
                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label for="prevUsername">
                      Current Username: {username} 
                    </Label>
                  </FormGroup>
                  <FormGroup>
                    <Label for="newUsername">
                      New Username
                    </Label>
                    
                    <Input
                      id="newUsername"
                      name="newUsername"
                      placeholder="New Username"
                      type="text"
                      value={formData.newUsername}
                      onChange={handleChange}
                    />
                    

                  </FormGroup>
                  {error && <p className="text-red-500">{error}</p>}
                  <div className="text-center">
                    <Button color="primary" outline type="submit">Change Username</Button>
                  </div>
                </Form>
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" outline type="button" onClick={() => setModalOpen(!modalOpen)}>Close</Button>
              </ModalFooter>
            </Modal>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" outline type="button" onClick={() => setModalOpen(!modalOpen)}>Close</Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default Profile;

