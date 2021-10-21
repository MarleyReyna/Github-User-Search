import React from 'react';
import './Header.scss';
import moon from './icon-moon.svg';
import sun from './icon-sun.svg';

const Header = (props) => {
    
    const dark = props.dark;
    const setDark = props.setDark

    return (
        <header className='header-container'>
            <h2 className={dark ? 'dev-dark' : 'dev-light'}>devfinder</h2>
            <div className='darkmode-container' onClick={() => setDark(!dark)}>
                <div className={dark ? 'dark-mode on' : 'dark-mode'}>
                    <p>Dark</p>
                    <img src={moon} 
                    alt='dark-mode' 
                    className='moon'/>
                </div>
                <div className={dark ? 'light-mode' : 'light-mode on'}>
                    <p>Light</p>
                    <img src={sun} 
                    alt='light-mode' 
                    className='sun' />
                </div>
            </div>
        </header>
    );
}
 
export default Header;