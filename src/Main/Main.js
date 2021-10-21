import React from 'react';
import {useState, useEffect} from 'react';
import './Main.scss'
import search from './Icons/icon-search.svg';
import twitter from './Icons/icon-twitter.svg'
import company from './Icons/icon-company.svg'
import location from './Icons/icon-location.svg'
import website from './Icons/icon-website.svg'



const Main = (props) => {
    const [input, setInput] = useState('');
    const [data, setData] = useState([]);
    const [error, setError] = useState(false);
    const dark = props.dark;

    useEffect(() =>{
        loadUser('octocat')
    }, []);

    useEffect(() =>{
        setError(false);
    }, [input]);

    useEffect(() =>{
        const githubInput = document.getElementById('githubInput');
        const ariaInput = () =>{
            if(error){
                githubInput.setAttribute("aria-invalid", "true");
                githubInput.setAttribute("aria-describedBy", "User not found");
            } else if(error !== true && githubInput.hasAttribute("aria-invalid")){
                githubInput.removeAttribute("aria-invalid");
                githubInput.removeAttribute("aria-describedBy");
            }
        };
        ariaInput();
    }, [error]);

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const handleSubmit = (e) =>{
        e.preventDefault();
        loadUser(input);
    };

    const handleEnter = (e) =>{
        if(e.keyCode === 13){
            loadUser(input);
        }
    };

    const loadUser = (input) =>{
        fetch(`https://api.github.com/users/${input}`)
            .then((res) => res.json())
            .then((result) =>{
                    if(result.message !== 'Not Found'){
                        setData(result);
                        setError(false);
                        setInput('');
                    } else{
                        setError(true);
                    }
                }
            )
    };

    const infoUnavailable = (info) =>{
        if(info === null || info === ''){
            return 'Not Available';
        } else{
            return info;
        }
    };

    const getDateJoined = (date) =>{
        if(date !== undefined){
            let timeStrip = date.split("T")
            var dateStrip = timeStrip[0].split("-")
            var day = dateStrip[2];
            var month = months[dateStrip[1] - 1]
            var year = dateStrip[0];
            return ("Joined " + day  + " " + month +  " " + year)
        }
    };

    const classUnavailable = (info) =>{
        if(info === null || info === ''){
            return 'unavailable';
        }
    };

    return (
        <main>
            {/* Search Bar */}
            <div className={dark ? 'searchbar dark' : 'searchbar'} role='search'>
                <div className='left-container'>
                    <img src={search} alt='search' />
                    <input
                    id='githubInput'
                    placeholder='Search Github username&#8230;'
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    onKeyDown={handleEnter}    
                    className={dark ? 'input dark' : 'input'}
                    aria-label='Search github username'
                    role='search'
                    />
                </div>
                <div className='right-container'>
                    <p className={error ? 'error-active' : 'error'}>
                        No results
                    </p>
                    <button
                    onClick={handleSubmit}
                    aria-label='Submit github username'>
                        Search
                    </button>
                </div>
            </div>
            {/* User Card */}
            <div className={dark ? "user-card dark" : "user-card"}>
                <div className='profile-container'>
                    <img src={data.avatar_url} alt='profile' className='pfp'></img>
                    <div className={dark ? 'user-name dark' : 'user-name'}>
                        <div>
                            <h1 className={data.name === null ? 'name-unavailable' : 'name'}>
                                {data.name !== null ? data.name : "Unavailable"}
                            </h1>
                            <p className='login-name'>@{data.login}</p>
                        </div>
                        <p className='date-join'>{getDateJoined(data.created_at)}</p>
                    </div>
                </div>
                <div className='user-info'>
                    <p className={data.bio === null ? 'bio-unavailable' : 'bio'}>
                        {data.bio === null ? "This profile has no bio" : data.bio}
                    </p>
                    <div className={dark ? "user-stats dark" : "user-stats"}>
                        <div className='repos'>
                            Repos <span>{data.public_repos}</span>
                        </div>
                        <div className='followers'>
                            Followers <span>{data.followers}</span>
                        </div>
                        <div className='following'>
                            Following <span>{data.following}</span>
                        </div>
                    </div>
                    <div className={dark ? 'user-links dark' : 'user-links'}>
                        <div className={classUnavailable(data.location)}>
                            <img src={location} alt='location'/>
                            <p>{infoUnavailable(data.location)}</p>
                        </div>
                        <div className={classUnavailable(data.twitter_username)}>
                            <img src={twitter} alt='twitter'/>
                            <p>{infoUnavailable(data.twitter_username)}</p>
                        </div>
                        <div className={classUnavailable(data.blog)}>
                            <img src={website} alt='blog'/>
                            <a href={data.blog}>{infoUnavailable(data.blog)}</a>
                        </div>
                        <div className={classUnavailable(data.company)}>
                            <img src={company} alt='company'/>
                            <p>{infoUnavailable(data.company)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
 
export default Main;