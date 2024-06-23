import {React, useState} from "react";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";

const CompletionOfDetails = ({ setUser }) => 
{

    const [Fullname, setFullname] = useState("");
    const [Email, setEmail] = useState("");
    const [Street, setStreet] = useState("");
    const [Suite, setSuite] = useState("");
    const [City, setCity] = useState("");
    const [Zipcode, setZipcode] = useState("");
    const [Phone, setPhone] = useState("");
    const [CompanyName, setCompanyName] = useState("");
    const navigate = useNavigate();

    const getLat = () => Math.random() * 180 - 90;
    const getLng = () => Math.random() * 360 - 180;
    const getCatchPhrase = (companyName) => companyName + ' is the best';
    const getBs = (companyName) => companyName + ' is the best of the best';

    const registerUser = JSON.parse(localStorage.getItem('tempRegisterUser'));
    if(!registerUser) navigate('/register');

    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if( !Fullname || !Email || !Phone )
            {
                setError('Full name, Email and Phone are required');
                return;
            }


        const newUser = 
    {
        "name": Fullname,
        "username": registerUser.username,
        "email": Email,
        "address": {
          "street": Street,
          "suite": Suite,
          "city": City,
          "zipcode": Zipcode,
          "geo": {
            "lat": getLat(),
            "lng": getLng()
          }
        },
        "phone": Phone,
        "website": registerUser.website,
        "company": {
          "name": CompanyName,
          "catchPhrase": getCatchPhrase(CompanyName),
          "bs": getBs(CompanyName)
        }
      }
      
      fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      })
        .then(response => response.json())
        .then(user => {
            console.log('User added:', user); 
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user)
            navigate('/home');
        })
        .catch(error => {
            // Handle any errors that occurred during the fetch or JSON parsing
            console.error('Error adding user:', error);
          });
  
      // Clear the form
      localStorage.removeItem('tempRegisterUser');
        setFullname('');
        setEmail('');
        setStreet('');
        setSuite('');
        setCity('');
        setZipcode('');
        setPhone('');
        setCompanyName('');

    }

    return (
        <div>
            <h2>Complete your details to continue</h2>
            <form onSubmit={handleSubmit}>
            <div style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '30px',
          alignItems: 'center',
          margin: '20px',
          }}>
              <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          marginTop: '34px',
              }}>
              <TextField
                type="text"
                label="Full name"
                value={Fullname}
                onChange={(e) => setFullname(e.target.value)}
                required
              />
              <TextField
                type="email"
                label="Email"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <TextField
                type="text"
                label="Phone"
                value={Phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              
              <TextField
                type="text"
                label="Company Name"
                value={CompanyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
              </div>
              <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
              }}>
              <div>Address:</div>
              <TextField
                type="text"
                label="Street"
                value={Street}
                onChange={(e) => setStreet(e.target.value)}
              />
              <TextField
                type="text"
                label="Suite"
                value={Suite}
                onChange={(e) => setSuite(e.target.value)}
              />
              <TextField
                type="text"
                label="City"
                value={City}
                onChange={(e) => setCity(e.target.value)}
              />
              <TextField
                type="text"
                label="Zipcode"
                value={Zipcode}
                onChange={(e) => setZipcode(e.target.value)}
              />
              </div>  

        </div>
        <button type="submit">Finished</button>

      </form>
        {error && <p>{error}</p>}
        </div>
    );
}


export default CompletionOfDetails;