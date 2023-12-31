import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionSellerActions from "../../store/sellerSession";
import "./SignupForm.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import Cuisines from "../Spots/Cuisines/Autocomplete";
import S3 from "react-aws-s3";



function SignupFormModalSeller() {
  window.Buffer = window.Buffer || require("buffer").Buffer;
  const [previews, setPreviews] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]); //url
  const [uploadedImages, setUploadedImages] = useState([])
  const dispatch = useDispatch();
  const history = useHistory();
  const config = {
    bucketName: process.env.REACT_APP_BUCKET_NAME,
    region: process.env.REACT_APP_REGION,
    accessKeyId: process.env.REACT_APP_ACCESS,
    secretAccessKey: process.env.REACT_APP_SECRET,
  };

  const ReactS3Client = new S3(config);

  const handleAddImages = (e) => { //newphoto
    const imageLists = e.target.files;
    const newPreviews = [];
    const newSelectedFiles = [];

    for (let i = 0; i < imageLists.length; i++) {
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      newPreviews.push(currentImageUrl);
      newSelectedFiles.push(imageLists[i]);
    }

    setPreviews(newPreviews);
    setSelectedFiles(newSelectedFiles);
  };



  const fetchUploadedFiles = () => {
    // Make a request to fetch the uploaded files from the S3 bucket
    // Replace "YOUR_BUCKET_NAME" with your actual bucket name
    fetch(`https://practice-for-uploads.s3.amazonaws.com/`)
      .then((response) => response.text())
      .then((data) => {
        // Process the fetched data and extract the URLs of the uploaded files
        const urls = [];
        const regex = /<Key>(.*?)<\/Key>/g;
        let match = regex.exec(data);
        while (match !== null) {
          urls.push(`https://practice-for-uploads.s3.amazonaws.com/${match[1]}`);
          match = regex.exec(data);
        }
        setUploadedImages(urls);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    // Fetch the uploaded files when the component mounts
    fetchUploadedFiles();
  }, []);



  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [DOB, setDOB] = useState("");
  const [address, setAddress] = useState("");
  const [profilephoto, setProfilePhoto] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [cuisine, setCuisine] = useState("")
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      history.push("/FeedSeller");

      return dispatch(
        sessionSellerActions.sellerSignUp({
          username,
          firstName,
          lastName,
          password,
          DOB,
          address,
          profilephoto,
          cuisine,
          specialty
        })
      )
        .then(closeModal)

        .catch(async (res) => {
          const data = await res.json();
          if (data && data?.errors) setErrors(data?.errors);
        });
    }
   
    if (selectedFiles.length === 0) {
      return; // No files selected
    }

    const uploadPromises = [];





    selectedFiles.forEach((file) => {
      const newFileName = `image_${Date.now()}`;

      const uploadPromise = ReactS3Client.uploadFile(file, newFileName);
      uploadPromises.push(uploadPromise);
    });





    Promise.all(uploadPromises)
      .then((results) => {
        const uploadedImageUrls = results.map((data) => data.location);
        // setImages(uploadedImageUrls);
      })
      .catch((err) => console.error(err));
      return setErrors([
        "Confirm Password field must be the same as the Password field",
      ]);
  };

  useEffect(() => {
    const input = document.getElementById("pac-input");
    const autocomplete = new window.google.maps.places.Autocomplete(input);
  }, []);

  const cuisinesList = [
    { label: 'Afghan cuisine', value: 'Afghan cuisine' },
    { label: 'Albanian cuisine', value: 'Albanian cuisine' },
    { label: 'Algerian cuisine', value: 'Algerian cuisine' },
    { label: 'American cuisine', value: 'American cuisine' },
    { label: 'Andorran cuisine', value: 'Andorran cuisine' },
    { label: 'Angolan cuisine', value: 'Angolan cuisine' },
    { label: 'Antigua and Barbuda cuisine', value: 'Antigua and Barbuda cuisine' },
    { label: 'Argentinian cuisine', value: 'Argentinian cuisine' },
    { label: 'Armenian cuisine', value: 'Armenian cuisine' },
    { label: 'Australian cuisine', value: 'Australian cuisine' },
    { label: 'Austrian cuisine', value: 'Austrian cuisine' },
    { label: 'Azerbaijani cuisine', value: 'Azerbaijani cuisine' },
    { label: 'Bahamian cuisine', value: 'Bahamian cuisine' },
    { label: 'Bahraini cuisine', value: 'Bahraini cuisine' },
    { label: 'Bangladeshi cuisine', value: 'Bangladeshi cuisine' },
    { label: 'Barbadian cuisine', value: 'Barbadian cuisine' },
    { label: 'Belarusian cuisine', value: 'Belarusian cuisine' },
    { label: 'Belgian cuisine', value: 'Belgian cuisine' },
    { label: 'Belizean cuisine', value: 'Belizean cuisine' },
    { label: 'Beninese cuisine', value: 'Beninese cuisine' },
    { label: 'Bhutanese cuisine', value: 'Bhutanese cuisine' },
    { label: 'Bolivian cuisine', value: 'Bolivian cuisine' },
    { label: 'Bosnian cuisine', value: 'Bosnian cuisine' },
    { label: 'Brazilian cuisine', value: 'Brazilian cuisine' },
    { label: 'British cuisine', value: 'British cuisine' },
    { label: 'Bruneian cuisine', value: 'Bruneian cuisine' },
    { label: 'Bulgarian cuisine', value: 'Bulgarian cuisine' },
    { label: 'Burkinabe cuisine', value: 'Burkinabe cuisine' },
    { label: 'Burundian cuisine', value: 'Burundian cuisine' },
    { label: 'Cambodian cuisine', value: 'Cambodian cuisine' },
    { label: 'Cameroonian cuisine', value: 'Cameroonian cuisine' },
    { label: 'Canadian cuisine', value: 'Canadian cuisine' },
    { label: 'Cape Verdean cuisine', value: 'Cape Verdean cuisine' },
    { label: 'Central African Republic cuisine', value: 'Central African Republic cuisine' },
    { label: 'Chadian cuisine', value: 'Chadian cuisine' },
    { label: 'Chilean cuisine', value: 'Chilean cuisine' },
    { label: 'Chinese cuisine', value: 'Chinese cuisine' },
    { label: 'Colombian cuisine', value: 'Colombian cuisine' },
    { label: 'Comorian cuisine', value: 'Comorian cuisine' },
    { label: 'Congolese cuisine', value: 'Congolese cuisine' },
    { label: 'Costa Rican cuisine', value: 'Costa Rican cuisine' },
    { label: 'Croatian cuisine', value: 'Croatian cuisine' },
    { label: 'Cuban cuisine', value: 'Cuban cuisine' },
    { label: 'Cypriot cuisine', value: 'Cypriot cuisine' },
    { label: 'Czech cuisine', value: 'Czech cuisine' },
    { label: 'Danish cuisine', value: 'Danish cuisine' },
    { label: 'Djiboutian cuisine', value: 'Djiboutian cuisine' },
    { label: 'Dominican cuisine', value: 'Dominican cuisine' },
    { label: 'Dutch cuisine', value: 'Dutch cuisine' },
    { label: 'East Timorese cuisine', value: 'East Timorese cuisine' },
    { label: 'Ecuadorean cuisine', value: 'Ecuadorean cuisine' },
    { label: 'Egyptian cuisine', value: 'Egyptian cuisine' },
    { label: 'Emirati cuisine', value: 'Emirati cuisine' },
    { label: 'Equatorial Guinean cuisine', value: 'Equatorial Guinean cuisine' },
    { label: 'Eritrean cuisine', value: 'Eritrean cuisine' },
    { label: 'Estonian cuisine', value: 'Estonian cuisine' },
    { label: 'Ethiopian cuisine', value: 'Ethiopian cuisine' },
    { label: 'Fijian cuisine', value: 'Fijian cuisine' },
    { label: 'Filipino cuisine', value: 'Filipino cuisine' },
    { label: 'Finnish cuisine', value: 'Finnish cuisine' },
    { label: 'French cuisine', value: 'French cuisine' },
    { label: 'Gabonese cuisine', value: 'Gabonese cuisine' },
    { label: 'Gambian cuisine', value: 'Gambian cuisine' },
    { label: 'Georgian cuisine', value: 'Georgian cuisine' },
    { label: 'German cuisine', value: 'German cuisine' },
    { label: 'Ghanaian cuisine', value: 'Ghanaian cuisine' },
    { label: 'Greek cuisine', value: 'Greek cuisine' },
    { label: 'Grenadian cuisine', value: 'Grenadian cuisine' },
    { label: 'Guatemalan cuisine', value: 'Guatemalan cuisine' },
    { label: 'Guinea-Bissauan cuisine', value: 'Guinea-Bissauan cuisine' },
    { label: 'Guinean cuisine', value: 'Guinean cuisine' },
    { label: 'Guyanese cuisine', value: 'Guyanese cuisine' },
    { label: 'Haitian cuisine', value: 'Haitian cuisine' },
    { label: 'Herzegovinian cuisine', value: 'Herzegovinian cuisine' },
    { label: 'Honduran cuisine', value: 'Honduran cuisine' },
    { label: 'Hungarian cuisine', value: 'Hungarian cuisine' },
    { label: 'Icelandic cuisine', value: 'Icelandic cuisine' },
    { label: 'Indian cuisine', value: 'Indian cuisine' },
    { label: 'Indonesian cuisine', value: 'Indonesian cuisine' },
    { label: 'Iranian cuisine', value: 'Iranian cuisine' },
    { label: 'Iraqi cuisine', value: 'Iraqi cuisine' },
    { label: 'Irish cuisine', value: 'Irish cuisine' },
    { label: 'Israeli cuisine', value: 'Israeli cuisine' },
    { label: 'Italian cuisine', value: 'Italian cuisine' },
    { label: 'Ivorian cuisine', value: 'Ivorian cuisine' },
    { label: 'Jamaican cuisine', value: 'Jamaican cuisine' },
    { label: 'Japanese cuisine', value: 'Japanese cuisine' },
    { label: 'Jordanian cuisine', value: 'Jordanian cuisine' },
    { label: 'Kazakhstani cuisine', value: 'Kazakhstani cuisine' },
    { label: 'Kenyan cuisine', value: 'Kenyan cuisine' },
    { label: 'Kittitian cuisine', value: 'Kittitian cuisine' },
    { label: 'Kosovan cuisine', value: 'Kosovan cuisine' },
    { label: 'Kuwaiti cuisine', value: 'Kuwaiti cuisine' },
    { label: 'Kyrgyz cuisine', value: 'Kyrgyz cuisine' },
    { label: 'Laotian cuisine', value: 'Laotian cuisine' },
    { label: 'Latvian cuisine', value: 'Latvian cuisine' },
    { label: 'Lebanese cuisine', value: 'Lebanese cuisine' },
    { label: 'Lesotho cuisine', value: 'Lesotho cuisine' },
    { label: 'Liberian cuisine', value: 'Liberian cuisine' },
    { label: 'Libyan cuisine', value: 'Libyan cuisine' },
    { label: 'Liechtensteiner cuisine', value: 'Liechtensteiner cuisine' },
    { label: 'Lithuanian cuisine', value: 'Lithuanian cuisine' },
    { label: 'Luxembourg cuisine', value: 'Luxembourg cuisine' },
    { label: 'Macanese cuisine', value: 'Macanese cuisine' },
    { label: 'Macedonian cuisine', value: 'Macedonian cuisine' },
    { label: 'Malagasy cuisine', value: 'Malagasy cuisine' },
    { label: 'Malawian cuisine', value: 'Malawian cuisine' },
    { label: 'Malaysian cuisine', value: 'Malaysian cuisine' },
    { label: 'Maldivian cuisine', value: 'Maldivian cuisine' },
    { label: 'Malian cuisine', value: 'Malian cuisine' },
    { label: 'Maltese cuisine', value: 'Maltese cuisine' },
    { label: 'Marshallese cuisine', value: 'Marshallese cuisine' },
    { label: 'Mauritanian cuisine', value: 'Mauritanian cuisine' },
    { label: 'Mauritian cuisine', value: 'Mauritian cuisine' },
    { label: 'Mexican cuisine', value: 'Mexican cuisine' },
    { label: 'Micronesian cuisine', value: 'Micronesian cuisine' },
    { label: 'Moldovan cuisine', value: 'Moldovan cuisine' },
    { label: 'Monacan cuisine', value: 'Monacan cuisine' },
    { label: 'Mongolian cuisine', value: 'Mongolian cuisine' },
    { label: 'Montenegrin cuisine', value: 'Montenegrin cuisine' },
    { label: 'Moroccan cuisine', value: 'Moroccan cuisine' },
    { label: 'Mosotho cuisine', value: 'Mosotho cuisine' },
    { label: 'Motswana cuisine', value: 'Motswana cuisine' },
    { label: 'Mozambican cuisine', value: 'Mozambican cuisine' },
    { label: 'Namibian cuisine', value: 'Namibian cuisine' },
    { label: 'Nauruan cuisine', value: 'Nauruan cuisine' },
    { label: 'Nepalese cuisine', value: 'Nepalese cuisine' },
    { label: 'New Zealand cuisine', value: 'New Zealand cuisine' },
    { label: 'Nicaraguan cuisine', value: 'Nicaraguan cuisine' },
    { label: 'Nigerian cuisine', value: 'Nigerian cuisine' },
    { label: 'Nigerien cuisine', value: 'Nigerien cuisine' },
    { label: 'North Korean cuisine', value: 'North Korean cuisine' },
    { label: 'Norwegian cuisine', value: 'Norwegian cuisine' },
    { label: 'Omani cuisine', value: 'Omani cuisine' },
    { label: 'Pakistani cuisine', value: 'Pakistani cuisine' },
    { label: 'Palauan cuisine', value: 'Palauan cuisine' },
    { label: 'Palestinian cuisine', value: 'Palestinian cuisine' },
    { label: 'Panamanian cuisine', value: 'Panamanian cuisine' },
    { label: 'Papua New Guinean cuisine', value: 'Papua New Guinean cuisine' },
    { label: 'Paraguayan cuisine', value: 'Paraguayan cuisine' },
    { label: 'Peruvian cuisine', value: 'Peruvian cuisine' },
    { label: 'Philippine cuisine', value: 'Philippine cuisine' },
    { label: 'Polish cuisine', value: 'Polish cuisine' },
    { label: 'Portuguese cuisine', value: 'Portuguese cuisine' },
    { label: 'Qatari cuisine', value: 'Qatari cuisine' },
    { label: 'Romanian cuisine', value: 'Romanian cuisine' },
    { label: 'Russian cuisine', value: 'Russian cuisine' },
    { label: 'Rwandan cuisine', value: 'Rwandan cuisine' },
    { label: 'Saint Lucian cuisine', value: 'Saint Lucian cuisine' },
    { label: 'Salvadoran cuisine', value: 'Salvadoran cuisine' },
    { label: 'Samoan cuisine', value: 'Samoan cuisine' },
    { label: 'San Marinese cuisine', value: 'San Marinese cuisine' },
    { label: 'Sao Tomean cuisine', value: 'Sao Tomean cuisine' },
    { label: 'Saudi Arabian cuisine', value: 'Saudi Arabian cuisine' },
    { label: 'Senegalese cuisine', value: 'Senegalese cuisine' },
    { label: 'Serbian cuisine', value: 'Serbian cuisine' },
    { label: 'Seychellois cuisine', value: 'Seychellois cuisine' },
    { label: 'Sierra Leonean cuisine', value: 'Sierra Leonean cuisine' },
    { label: 'Singaporean cuisine', value: 'Singaporean cuisine' },
    { label: 'Slovak cuisine', value: 'Slovak cuisine' },
    { label: 'Slovenian cuisine', value: 'Slovenian cuisine' },
    { label: 'Solomon Islands cuisine', value: 'Solomon Islands cuisine' },
    { label: 'Somali cuisine', value: 'Somali cuisine' },
    { label: 'South African cuisine', value: 'South African cuisine' },
    { label: 'South Korean cuisine', value: 'South Korean cuisine' },
    { label: 'South Sudanese cuisine', value: 'South Sudanese cuisine' },
    { label: 'Spanish cuisine', value: 'Spanish cuisine' },
    { label: 'Sri Lankan cuisine', value: 'Sri Lankan cuisine' },
    { label: 'Sudanese cuisine', value: 'Sudanese cuisine' },
    { label: 'Surinamese cuisine', value: 'Surinamese cuisine' },
    { label: 'Swazi cuisine', value: 'Swazi cuisine' },
    { label: 'Swedish cuisine', value: 'Swedish cuisine' },
    { label: 'Swiss cuisine', value: 'Swiss cuisine' },
    { label: 'Syrian cuisine', value: 'Syrian cuisine' },
    { label: 'Taiwanese cuisine', value: 'Taiwanese cuisine' },
    { label: 'Tajik cuisine', value: 'Tajik cuisine' },
    { label: 'Tanzanian cuisine', value: 'Tanzanian cuisine' },
    { label: 'Thai cuisine', value: 'Thai cuisine' },
    { label: 'Togolese cuisine', value: 'Togolese cuisine' },
    { label: 'Tongan cuisine', value: 'Tongan cuisine' },
    { label: 'Trinidadian and Tobagonian cuisine', value: 'Trinidadian and Tobagonian cuisine' },
    { label: 'Tunisian cuisine', value: 'Tunisian cuisine' },
    { label: 'Turkish cuisine', value: 'Turkish cuisine' },
    { label: 'Turkmen cuisine', value: 'Turkmen cuisine' },
    { label: 'Tuvaluan cuisine', value: 'Tuvaluan cuisine' },
    { label: 'Ugandan cuisine', value: 'Ugandan cuisine' },
    { label: 'Ukrainian cuisine', value: 'Ukrainian cuisine' },
    { label: 'Uruguayan cuisine', value: 'Uruguayan cuisine' },
    { label: 'Uzbek cuisine', value: 'Uzbek cuisine' },
    { label: 'Vanuatuan cuisine', value: 'Vanuatuan cuisine' },
    { label: 'Vatican cuisine', value: 'Vatican cuisine' },
    { label: 'Venezuelan cuisine', value: 'Venezuelan cuisine' },
    { label: 'Vietnamese cuisine', value: 'Vietnamese cuisine' },
    { label: 'Yemeni cuisine', value: 'Yemeni cuisine' },
    { label: 'Zambian cuisine', value: 'Zambian cuisine' },
    { label: 'Zimbabwean cuisine', value: 'Zimbabwean cuisine' }
  ];

  const filteredCuisines = cuisinesList.filter(
    (item) => item.label.toLowerCase().includes(cuisine.toLowerCase())
  );


  return (
    <>
      <div className="signup-seller">  <h1 className="signup-h1">Welcome, chef! </h1></div>
      

        

        <form className="signup-form" onSubmit={handleSubmit}>
          {errors?.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}


          <label>
           <input
              className="text-signup"
              type="file"
              value={profilephoto}
              onChange={(e) => setProfilePhoto(e.target.value)}
              required
            />
        </label>


          <label> username
            <input
              className="text-signup"
              type="text-signup"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <label>
            first name
            <input
              className="text-signup"

              type="text-signup"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </label>
          <label>
            last name
            <input
              className="text-signup"

              type="text-signup"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </label>
          <label>
            password
            <input
              className="text-signup"

              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <label>
            confirm password

            <input
              className="text-signup"

              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
          <label>
            date of birth
            <input
              className="text-signup"

              type="date"
              value={DOB}
              onChange={(e) => setDOB(e.target.value)}
              required
            />
          </label>
          <label>
            address
            <input
              className="text-signup"
              id="pac-input"
              autoComplete="address"
              // type="text-signup"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
        </label>


        <div>
      <label>
        Cuisine
        <input
          input="text"
          className="text-signup"
          type="search"
          value={cuisine}
          onChange={(e) => setCuisine(e.target.value)}
          required
        />
      </label>

     <ul className="hide-place">
                {filteredCuisines.map((item) => (
          <li className="dropdown-countries"  key={item.value} onClick={() => setCuisine(item.label)}>
            {item.label}
          </li>
        ))}
      </ul>
      

    </div>


          <label>
            specialty
              <input
                className="text-signup"
                type="text-signup"
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                required
              />
          </label>







          <button
            type="submit"
            className="button-submit"
          >
            sign up
          </button>
        </form>

      
    </>
  );
}

export default SignupFormModalSeller;
