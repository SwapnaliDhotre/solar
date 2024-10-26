import React, { useState } from 'react';
import './login.css';
import logo from '../assets/solar.png';

const Login = () => {
    const [provider, setProvider] = useState<IProvider | null>(null);
    
    return (
        <div className='card'>
        <div className="card-container">
            <div className="left-section">
                <h1> Solar NFT </h1>
                {/* <h6>Tag lines .....</h6> */}
                <img src={logo} alt='logo' className='logo-image'></img>
            </div>
            <div className="right-section">
                <h1 style={{color: '#08d1c0da'}}>Welcome</h1>
                <form style={{paddingRight: 20}}>
                    <input type="email" placeholder="Username" required />
                    <input type="password" placeholder="Password" required />
                    <a href="/forgot-password">Forget password?</a>
                    <button style={{margin: 7}} type="submit">Login</button>
                </form>
                <p style={{fontSize: 13}}>Don't have an account? <a href="/signup">Sign In</a></p>
            </div>
      </div>
      </div>
    )
};

export default Login;