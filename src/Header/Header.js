import React from 'react';
import './Header.scss';
import moon from './icon-moon.svg';
import sun from './icon-sun.svg';

const Header = (props) => {
    
    const dark = props.dark;
    const setDark = props.setDark;

    const handleKeyDown = (key) =>{
        if (key.keyCode === 39 || key.keyCode === 37){
            setDark(!dark);
        }
    };

    return (
        <header className='header-container'>
            <h1 className={dark ? 'dev-dark' : 'dev-light'}>devfinder</h1>
            <div className='darkmode-container' 
            onClick={() => setDark(!dark)}
            tabIndex='0'
            onKeyDown={handleKeyDown}>
                <h3 className='sr-only'>Light Mode toggle button</h3>
                <div className={dark ? 'dark-mode on' : 'dark-mode'}>
                    <p>Dark</p>
                    <img src={moon} 
                    alt=''
                    aria-hidden='true' 
                    className='moon'/>
                </div>
                <div className={dark ? 'light-mode' : 'light-mode on'}>
                    <p>Light</p>
                    <img src={sun} 
                    alt=''
                    aria-hidden='true'  
                    className='sun' />
                </div>
            </div>
        </header>
    );
};
 
export default Header;