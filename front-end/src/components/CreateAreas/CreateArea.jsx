import React from 'react';
import "./CreateArea.css";
import { categories,types } from '../../Data/data';
import { RemoveCircleOutline,AddCircleOutline } from '@mui/icons-material';

const CreateArea = () => {
  return (
    <div className='post-area'>
      <h1>Publish Your Place</h1>
      <form>
        <div className='post-area__step1'>
            <h2>Tell us about your place</h2>
            <hr/>
            <h3>Which of the following categories best describes your place?</h3>
            <div className='category-list'>
                {categories.map((item,index) => (
                    <div className='category' key={index}>
                        <div className='category-icon'>{item.icon}</div>
                        <p>{item.label}</p>
                    </div>
                ))}
            </div>

            <h3>What type of place will tenants have?</h3>
            <div className='type-list'>
                {types.map((type,index) => (
                    <div className='type' key={index}>
                        <div className='type-text'>
                        <h4>{type.name}</h4>
                        <p>{type.description}</p>
                        </div>
                        <div className='type-icon'>{type.icon}</div>
                        
                    </div>
                ))}
            </div>

            <h3>Where's your place located?</h3>
            <div className='address'>
                <div className='location sa'>
                    <p>Street Address</p>
                    <input type='text' placeholder='Door No,Street Address' required />
                </div>
                <div className='location ct'>
                    <p>City</p>
                    <input type='text' placeholder='City' required/>
                </div>
                <div className='location st'>
                    <p>State</p>
                    <input type='text' placeholder='State' required/>
                </div>
                <div className='location cy'>
                    <p>Country</p>
                    <input type='text' placeholder='Country' required/>
                </div>
            </div>

            <h3>Share something about your place</h3>
            <div className='basics'>
                <div className='basic'>
                    <p>Guests</p>
                    <div className='basic-count'>
                        <RemoveCircleOutline sx={{font:"inherit"}}/>
                        <p>1</p>
                        <AddCircleOutline sx={{font: "inherit"}} />
                    </div>
                </div>
                <div className='basic'>
                    <p>Bedrooms</p>
                    <div className='basic-count'>
                        <RemoveCircleOutline sx={{font:"inherit"}}/>
                        <p>1</p>
                        <AddCircleOutline sx={{font: "inherit"}} />
                    </div>
                </div>
                <div className='basic'>
                    <p>Beds</p>
                    <div className='basic-count'>
                        <RemoveCircleOutline sx={{font:"inherit"}}/>
                        <p>1</p>
                        <AddCircleOutline sx={{font: "inherit"}} />
                    </div>
                </div>
                <div className='basic'>
                    <p>Bathrooms</p>
                    <div className='basic-count'>
                        <RemoveCircleOutline sx={{font:"inherit"}}/>
                        <p>1</p>
                        <AddCircleOutline sx={{font: "inherit"}} />
                    </div>
                </div>
            </div>
        </div>

        <div className='post-area__step2'>
            <h2>Make your place stand out</h2>
            <hr />
        </div>
      </form>
    </div>
  )
}

export default CreateArea
