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
        const errorID = document.getElementById('error-active').id;
        const ariaInput = () =>{
            if(error){
                githubInput.setAttribute("aria-invalid", "true");
                githubInput.setAttribute("aria-describedBy", errorID);
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
                    <img src={search} 
                    alt=''
                    aria-hidden='true' />
                    <form onSubmit={handleSubmit}>
                        <input
                        id='githubInput'
                        placeholder='Search Github username&#8230;'
                        value={input}
                        onChange={(event) => setInput(event.target.value)}  
                        className={'input'}
                        aria-label='Search github username'
                        role='search'
                        />
                    </form>
                </div>
                <div className='right-container'>
                    <p className={error ? 'error-active' : 'error'}
                    id='error-active'
                    aria-live='polite'>
                        {error ? 'No results' : ''}
                    </p>
                    <button
                    onClick={handleSubmit}
                    aria-label='Submit github username'>
                        Search
                    </button>
                </div>
            </div>
            {/* User Card */}
            <div className={dark ? "user-card dark" : "user-card"}
            aria-live='polite'>
                <div className='profile-container'>
                    <img src={data.avatar_url} alt={data.name} className='pfp'></img>
                    <div className={'user-name'}>
                        <div>
                            <h2 className={data.name === null ? 'name-unavailable' : 'name'}>
                                {data.name !== null ? data.name : "Unavailable"}
                            </h2>
                            <p className='login-name'>@{data.login}</p>
                        </div>
                        <p className='date-join'>{getDateJoined(data.created_at)}</p>
                    </div>
                </div>
                <div className='user-info'>
                    <p className={data.bio === null ? 'bio-unavailable' : 'bio'}>
                        {data.bio === null ? "This profile has no bio" : data.bio}
                    </p>
                    <section className={"user-stats"}>
                        <h3 class="sr-only">User profile stats</h3>
                        <ul>
                            <li className='repos'>
                                <p>Repos <br /><span>{data.public_repos}</span></p> 
                            </li>
                            <li className='followers'>
                                <p>Followers <br/><span>{data.followers}</span></p>  
                            </li>
                            <li className='following'>
                                <p>Following <br /><span>{data.following}</span></p> 
                            </li>
                        </ul>
                    </section>
                    <section className={'user-links'}>
                        <h3 class="sr-only">User profile information</h3>
                        <ul>
                            <li className={classUnavailable(data.location)}>
                                <img src={location} 
                                alt=''
                                aria-hidden='true'/>
                                <p>{infoUnavailable(data.location)}</p>
                            </li>
                            <li className={classUnavailable(data.twitter_username)}>
                                <img src={twitter} 
                                alt=''
                                aria-hidden='true'/>
                                <p>{infoUnavailable(data.twitter_username)}</p>
                            </li>
                            <li className={classUnavailable(data.blog)}>
                                <img src={website} 
                                alt=''
                                aria-hidden='true'/>
                                <a href={data.blog}>{infoUnavailable(data.blog)}</a>
                            </li>
                            <li className={classUnavailable(data.company)}>
                                <img src={company} 
                                alt=''
                                aria-hidden='true'/>
                                <p>{infoUnavailable(data.company)}</p>
                            </li>
                        </ul>
                    </section>
                </div>
            </div>
        </main>
    );
};
 
export default Main;