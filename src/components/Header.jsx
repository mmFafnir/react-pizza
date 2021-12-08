import React from 'react';
import { Link } from 'react-router-dom';
import MyButton from './UI/Button/MyButton';

import '../scss/header.scss';


function Header ({totalPrice, allQuantity}) {
    return (
      <header className="header">
        <div className="header__wrapper">
            <div>
                <Link to="/" className="logo">
                  <div className="logo__img">
                    <img src="img/logo.svg"/>
                  </div>
                  <div className="logo__text">
                    <h1>REACT PIZZA</h1>
                    <p>самая вкусная пицца во вселенной</p>
                  </div>
                </Link>
                
            </div>
            <div>
              <Link to="/basket" className="header__btn">
                <p>{(totalPrice) ?totalPrice : 0} ₽</p>
                <hr/>
                <p className="header__btn_left"><img src="img/basket.svg"/> <span>{allQuantity}</span></p>
              </Link>      
            </div>
        </div> 
  
      </header>

    );
} 

export default Header;