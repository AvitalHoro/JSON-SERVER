import {React, useState} from "react";
import { useNavigate } from "react-router-dom";

const CompletionOfDetails = () => 
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
        <input
          type="text"
          value={Fullname}
          onChange={(e) => setFullname(e.target.value)}
          placeholder="Full name"
        />
        <input
          type="email"
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <div>Adress:</div>
        <input
          type="text"
          value={Street}
          onChange={(e) => setStreet(e.target.value)}
          placeholder="Street"
        />
        <input
          type="text"
          value={Suite}
          onChange={(e) => setSuite(e.target.value)}
          placeholder="Suite"
        />
        <input
          type="text"
          value={City}
          onChange={(e) => setCity(e.target.value)}
          placeholder="City"
        />
        <input
          type="text"
          value={Zipcode}
          onChange={(e) => setZipcode(e.target.value)}
          placeholder="Zipcode"
        />
        <input
            type="text"
            value={Phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone"
        />
        <input
          type="text"
          value={CompanyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="company name"
        />

        <button type="submit">Finished</button>
      </form>
        {error && <p>{error}</p>}
        </div>
    );
}


export default CompletionOfDetails;