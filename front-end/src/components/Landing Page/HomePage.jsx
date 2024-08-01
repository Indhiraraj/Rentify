import React, { useContext, useEffect, useState } from 'react';
import "./homePage.css";
import PopularProperties from '../PopularProperties/PopularProperties';
import Slider from '../Slider/Slider';
import { RentifyContext } from '../ContextProvider/RentifyContextProvider';
import Categories from '../Categories/Categories';

const HomePage = () => {
  const { reviews,setReviews } = useContext(RentifyContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:4000/api/user-reviews");
        if (response.ok) {
          const data = await response.json();
          // console.log(data.reviews);
          setReviews(data.reviews);
        } else {
          throw new Error("Failed to fetch reviews");
        }
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    };

    fetchReviews();
  }, [setReviews]);

  return (
    <div className='Home_Page'>
      <section className='over-view'>
        <h1 className='quote'>
          &#8220;Your ideal rental, just a click away.&#8221;
        </h1>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <>
            <p className='info'>Here's what our users think about us</p>
           {reviews && <Slider/>}
            
          </>
        )}
      </section>

      <Categories/>

      <section className='hero' id='hero'>
        <h1 className='hero__h1'>Popular Properties</h1>
        <PopularProperties />
      </section>
    </div>
  );
};

export default HomePage;
