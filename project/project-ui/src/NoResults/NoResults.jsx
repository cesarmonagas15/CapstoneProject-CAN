import React from 'react'
import './NoResults.css'
import { Link } from 'react-router-dom';
import noResults from './no-results.png'



export default function NoResults() {
    
  
    return (
      <>
    <div className='NoResults'>
        <img className= 'error-sign' src={noResults} alt="No Results sign" />
        <div className='NoResults-title'>
      <h3 className='noResults-header'>Sorry, we couldn't find any results for your search </h3>
    </div>
    </div>
      </>
    );
  }