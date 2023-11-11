import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import myIcon from './res/profile-icon.png';

const Navbar = () => {
    const location = useLocation();
    const email = sessionStorage.getItem('email');

    return (
      <>
        <nav className='navbar'>
        <div className='profile'>
        <span className='profile-icon'>
          <img src={myIcon} alt="My Icon" style={{ width: '40px', height: '40px' }} />
        </span>
        <span className='profile-email'>{email}</span>
      </div>
          <ul className='navmenu'>
            <li className='navitem'>
                <Link  className='navlink' to='/' exact style={location.pathname === '/' ? { backgroundColor: '#9c2c2c' } : null}>
                Home
                </Link>
            </li>
            <li className='navitem'>
                <Link  className='navlink' to='/ingredients' style={location.pathname === '/ingredients' ? { backgroundColor: '#9c2c2c' } : null}>
                Ingredients
                </Link>
            </li>
            <li className='navitem'>
                <Link className='navlink'  to='/products' style={location.pathname === '/products' ? { backgroundColor: '#9c2c2c' } : null}>
                Products
                </Link>
            </li>
            <li className='navitem'>
                <Link className='navlink'  to='/recipes' style={location.pathname === '/recipes' ? { backgroundColor: '#9c2c2c' } : null}>
                Recipes
                </Link>
            </li>
            {/* <li className='navitem'>
                <Link  className='navlink' to='/register' style={location.pathname === '/register' ? { backgroundColor: '#9c2c2c' } : null}>
                Register
                </Link>
            </li> */}
            <li className='navitem'>
                <Link  className='navlink' to='/login' style={location.pathname === '/login' ? { backgroundColor: '#9c2c2c' } : null}>
                Account
                </Link>
            </li>
  

          </ul>

        </nav>
      </>
    );
  };
    
  export default Navbar;