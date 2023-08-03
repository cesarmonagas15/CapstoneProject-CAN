import React from 'react'
import './NotFound.css'
import { Link } from 'react-router-dom';
import errorSign from './error.png'


export default function NotFound() {
    
  
    return (
      <>
    <div className='notFound'>
        <img className= 'error-sign' src={errorSign} alt="error sign" />
        <div className='notFound-title'>
      <h2>404 - PAGE NOT FOUND</h2>
      <p> The page you are looking for might have been removed, had its name changed or is temporarily unavailable</p>
      </div>

      <Link to="/">
                <button className="searchRecipes">Go to homepage</button>
        </Link>
    </div>
      </>
    );
  }