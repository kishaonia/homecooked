import { editSpotThunk } from "../../../store/spots";
import { getOneSpotThunk } from "../../../store/spots";
import './EditSpot.css'
import { NavLink } from 'react-router-dom';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';



export default function EditSpot() {
    const { spotId } = useParams()
    const dispatch = useDispatch();
    const spot = useSelector(state => state?.spots)
    const spotDetails = spot[spotId]
    const history = useHistory();
    const [address, setAddress] = useState("");
    const [country, setCountry] = useState("");
    const [error, setError] = useState({});
    const [city, setCity] = useState("");
 
    const [description, setDescription] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    // const [previewImage, setPreviewImage] = useState("");
    // const [image2, setImage2] = useState("");
    // const [image3, setImage3] = useState("");
    const [state, setState] = useState("")
    // const [image4, setImage4] = useState("");
    // const [image5, setImage5] = useState("");
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");
    // // const spot = useSelector(state => state.spots)
    // const spotDetails = spot[spotId]

useEffect(() => {
    dispatch(getOneSpotThunk(spotId))
    setAddress(spotDetails?.address);
    setCountry(spotDetails?.country);
    setCity(spotDetails?.city);
    setName(spotDetails?.name);
    setDescription(spotDetails?.description);
    setPrice(spotDetails?.price);
    setState(spotDetails?.state)


}, [dispatch, JSON?.stringify(spotId), JSON?.stringify(spotDetails?.address), JSON?.stringify(spotDetails?.country), JSON?.stringify(spotDetails?.city), JSON?.stringify(spotDetails?.name), JSON?.stringify(spotDetails?.description), JSON?.stringify(spotDetails?.name), JSON?.stringify(spotDetails?.state)])

    const onSubmit = async (e) => {
        e.preventDefault();
        const error = {}
        if (!price || !parseInt(price)) {
            error.price = "Price is required and must be a number."
        }
        if (!address) {
            error.address = "Address is required."
        }
        if (description.length < 30) {
            error.description = "Description is required and needs to be at least 30 characters long."
        }
        if (!name) {
            error.name = "Name is required."
        }
        if (!city) {
            error.city = "City is required."
        }

        // if (price && !(Number.isInteger(price))) {
        //    error.price = "Price is required needs to be a number."
        // }
        if (!state) {
            error.state = "State is required."
        }
        if (!country) {
            error.country = "Country is required."
        }
        // if (!previewImage) {
        //     error.previewImage = "Preview image is required."
        // }
        // if (previewImage) {
        //     if (
        //         !(previewImage.endsWith(".jpeg") || previewImage.endsWith(".png") || previewImage.endsWith(".jpeg"))
        //     )
        //         error.previewImage = "The image url needs to end in .jpeg, .png, or jpeg"
        // }

        // if (image2) {
        //     if (
        //         !(image2.endsWith(".jpeg") || image2.endsWith(".png") || image2.endsWith(".jpeg"))
        //     )
        //         error.image2 = "The image url needs to end in .jpeg, .png, or jpeg"
        // }
        // if (image3) {
        //     if (
        //         !(image3.endsWith(".jpeg") || image3.endsWith(".png") || image3.endsWith(".jpeg"))
        //     )
        //         error.image3 = "The image url needs to end in .jpeg, .png, or jpeg"
        // }
        // if (image4) {
        //     if (
        //         !(image4.endsWith(".jpeg") || image4.endsWith(".png") || image4.endsWith(".jpeg"))
        //     )
        //         error.image2 = "The image url needs to end in .jpeg, .png, or jpeg"
        // }
        // if (image5) {
        //     if (
        //         !(image5.endsWith(".jpeg") || image5.endsWith(".png") || image5.endsWith(".jpeg"))
        //     )
        //         error.image5 = "The image url needs to end in .jpeg, .png, or jpeg"
        // }
        setError(error);
        if (Object?.keys(error).length > 0) {
        }
        // if (error.length > 0) {
        //     return setError({})

        // }
        const spot = {
            country: country,
            address: address,
            city: city,
            state: state,
            description: description,
            price: price,
            name: name,
            lng: lng || 687.22,
            lat: lng || 345.22
        }

    const spotEdit = await dispatch(editSpotThunk(spot, spotId))
    if (spotEdit) {
        history.push(`/spots/${spotId}`)
    }
        // const spotImagesArr = [];

        // if (previewImage) {
        //     const prevImage = {
        //         preview: true,
        //         url: previewImage
        //     }
        //     spotImagesArr.push(prevImage)
        // }

        // if (image2) {
        //     const newImage2 = {
        //         preview: false,
        //         url: image2
        //     }
        //     spotImagesArr.push(newImage2)
        // }
        // if (image3) {
        //     const newImage3 = {
        //         preview: false,
        //         url: image3
        //     }
        //     spotImagesArr.push(newImage3)
        // }
        // if (image4) {
        //     const newImage4 = {
        //         preview: false,
        //         url: image4
        //     }
        //     spotImagesArr.push(newImage4)
        // }
        // if (image5) {
        //     const newImage5 = {
        //         preview: false,
        //         url: image5
        //     }
        //     spotImagesArr.push(newImage5)
        // }


        // const spotCreated = await dispatch(createOneSpotThunk(spot, spotImagesArr))

        // if (spotCreated && spotCreated.id) {
        //     history.push(`/spots/${spotCreated.id}`)
        // }

    }
    return (
      <div className="page-edit-spot">
        <form className="edit-spot-form" onSubmit={onSubmit}>
          <div className="createanewspot"> Edit Spot</div>
          {/* <br></br> */}
          <div className="whereisyourplacelocated">
            Where's your place located?
          </div>
          <h4>
            Guests will only get your exact address once they booked a
            reservation
          </h4>
          <label className="create-spot-label">Country</label>
          {Object?.keys(error).length ? (
            <h5>
              {error?.country && (
                <span className="error">{error?.country}</span>
              )}
            </h5>
          ) : (
            <h7></h7>
          )}
          <input
            type="text"
            placeholder={spotDetails?.country}
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <label className="create-spot-label">Street Address</label>
          {Object?.keys(error).length ? (
            <h5>
              {error?.address && (
                <span className="error">{error?.address}</span>
              )}
            </h5>
          ) : (
            <h7></h7>
          )}
          <input
            type="text"
            value={address}
            placeHolder={spotDetails?.address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <label className="create-spot-label">City</label>

          {Object?.keys(error).length ? (
            <h5>
              {error?.city && <span className="error">{error?.city}</span>}
            </h5>
          ) : (
            <h7></h7>
          )}
          <input
            type="text"
            value={city}
            placeHolder={spotDetails?.city}
            onChange={(e) => setCity(e.target.value)}
          />
          <label className="create-spot-label">State</label>
          {error?.state && <span className="error">{error?.state}</span>}
          <input
            type="text"
            placeHolder={spotDetails?.state}
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
          <label className="create-spot-label">Description</label>
          <div className="description-caption">
            Mention the best features of your space, any special amentities
            <br></br> like fast wif or parking, and what you love about the
            neighborhood.
          </div>
          {error?.description && (
            <span className="error">{error?.description}</span>
          )}
          <input
            type="text"
            value={description}
            placeholder={spotDetails?.description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label className="create-spot-label">
            Create a title for your spot
          </label>
          <div className="description-caption">
            Catch guests' attention with a spot title that highlights what makes
            your place special.
          </div>
          {error?.name && <span className="error">{error?.name}</span>}
          <input
            type="text"
            value={name}
            placeholder={spotDetails?.name}
            onChange={(e) => setName(e.target.value)}
          />
          <label className="create-spot-label">
            Set a base price for your spot
          </label>
          <div className="description-caption">
            Competitive pricing can help your listing stand out and rank higher
            in search results.
          </div>
          {error?.price && <span className="error">{error?.price}</span>}
          <input
            type="text"
            value={price}
            placeholder={spotDetails?.price}
            onChange={(e) => setPrice(e.target.value)}
          />
          {/* <label className="create-spot-label">Preview Image URL</label> */}
          {/* {error?.previewImage && <span className="error">{error?.previewImage}</span>}
                <input
                    type="text"
                    value={previewImage}
                    placeholder="Preview Image URL"
                    onChange={e => setPreviewImage(e.target.value)}
                />
                <label className="create-spot-label">Image URL
                    (Upload in jpeg format only.)</label>
                {error?.image2 && <span className="error">{error?.image2}</span>}
                <input
                    type="text"
                    value={image2}
                    placeholder="Image URL"
                    onChange={e => setImage2(e.target.value)}
                />

                {error?.image3 && <span className="error">{error?.image3}</span>}
                <input
                    type="text"
                    value={image3}
                    placeholder="Image URL"
                    onChange={e => setImage3(e.target.value)}
                />
                {error?.image4 && <span className="error">{error?.image4}</span>}
                <input
                    type="text"
                    value={image4}
                    placeholder="Image URL"
                    onChange={e => setImage4(e.target.value)}
                />
                {error?.image5 && <span className="error">{error?.image5}</span>}
                <input
                    type="text"
                    value={image5}
                    placeholder="Image URL"
                    onChange={e => setImage5(e.target.value)}
                /> */}
          <button className="button-create-spot" type="submit">
            Update Your Spot
          </button>
        </form>
      </div>
    );
}