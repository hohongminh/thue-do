import { useState } from 'react';
import Quote from '~/layouts/Footer/Footer';
// import './test.css';
import classNames from 'classnames/bind';
import styles from './Register.module.scss';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const cx = classNames.bind(styles);

function Login() {
    
    const [cnt1, setcnt1] = useState('');
    const [cnt2, setcnt2] = useState('');
    const [cnt3, setcnt3] = useState('is-hidden');
    const [cnt4, setcnt4] = useState('');
    const [cnt5, setcnt5] = useState('');

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [errorMessage1, setErrorMessage1] = useState('');
    const [error, setError] = useState('');
    const [error1, setError1] = useState('');
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!username || !email || !password) {
            setErrorMessage('Vui lòng nhập đầy đủ thông tin');
            return;
        }
        try {
            // Send a post request to the server with the user's email and password
            const response = await fetch(`${process.env.REACT_APP_BASE_URLS}users/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });

            // Parse the response as JSON
            const data = await response.json();

            // If the response has an error, set the error state and return
            if (data.message) {
                setError(data.message);
                return;
            } else {
                setError('Đăng ký tài khoản thành công');
            }

            // If the response has a token, save it to local storage

            localStorage.setItem('user', JSON.parse(data));

            // Redirect the user to the dashboard
        } catch (error) {
            console.error(error);
        }
        if (password && username) {
            // setValid(true);
            window.location.href = '/';
        }
        // setSubmitted(true);
    };

    const handleSubmit1 = async (event) => {
        event.preventDefault();
        if (!username || !password) {
            setErrorMessage1('Vui lòng nhập đầy đủ thông tin');
            return;
        }
        try {
            // Send a post request to the server with the user's email and password
            const response = await fetch(`https://product-rental.herokuapp.com/api/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({ username, password }),
            });

            // Parse the response as JSON
            const data1 = await response.json();

            // If the response has an error, set the error state and return
            if (data1.message) {
                setError1(data1.message);

                return;
            }

            // If the response has a token, save it to local storage
            localStorage.setItem('user', JSON.stringify(data1));

            // Redirect the user to the dashboard
        } catch (error) {
            console.error(error);
        }
        if (password && username) {
            const decentralization = JSON.parse(localStorage.getItem('user'));
            // console.log(decentralization.role[0].name);
            if (decentralization.role[0].name === 'ADMIN') {
                window.location.href = '/admin';
                // console.log('admin');
            } else {
                console.log('user');
                window.location.href = '/';
            }
        }
    };
    return (
        <div>
            <div className={cx('main')}>
                <div className={`container a-container ${cnt1}`} id="a-container">
                    <form className="form" id="a-form" method="" action="" onSubmit={handleSubmit}>
                        <h2 className="form_title title">Create Account</h2>
                        <div className="form__icons">
                            <img
                                className="form__icon"
                                src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaGVpZ2h0PSI1MHB4IiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCA1MCA1MCIgd2lkdGg9IjUwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6c2tldGNoPSJodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2gvbnMiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48dGl0bGUvPjxkZWZzLz48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIj48ZyBmaWxsPSIjMDAwMDAwIiBpZD0iRmFjZWJvb2siPjxwYXRoIGQ9Ik0yNSw1MCBDMzguODA3MTE5NCw1MCA1MCwzOC44MDcxMTk0IDUwLDI1IEM1MCwxMS4xOTI4ODA2IDM4LjgwNzExOTQsMCAyNSwwIEMxMS4xOTI4ODA2LDAgMCwxMS4xOTI4ODA2IDAsMjUgQzAsMzguODA3MTE5NCAxMS4xOTI4ODA2LDUwIDI1LDUwIFogTTI1LDQ3IEMzNy4xNTAyNjUxLDQ3IDQ3LDM3LjE1MDI2NTEgNDcsMjUgQzQ3LDEyLjg0OTczNDkgMzcuMTUwMjY1MSwzIDI1LDMgQzEyLjg0OTczNDksMyAzLDEyLjg0OTczNDkgMywyNSBDMywzNy4xNTAyNjUxIDEyLjg0OTczNDksNDcgMjUsNDcgWiBNMjYuODE0NTE5NywzNiBMMjYuODE0NTE5NywyNC45OTg3MTIgTDMwLjA2ODc0NDksMjQuOTk4NzEyIEwzMC41LDIxLjIwNzYwNzIgTDI2LjgxNDUxOTcsMjEuMjA3NjA3MiBMMjYuODIwMDQ4NiwxOS4zMTAxMjI3IEMyNi44MjAwNDg2LDE4LjMyMTM0NDIgMjYuOTIwNzIwOSwxNy43OTE1MzQxIDI4LjQ0MjU1MzgsMTcuNzkxNTM0MSBMMzAuNDc2OTYyOSwxNy43OTE1MzQxIEwzMC40NzY5NjI5LDE0IEwyNy4yMjIyNzY5LDE0IEMyMy4zMTI4NzU3LDE0IDIxLjkzNjg2NzgsMTUuODM5MDkzNyAyMS45MzY4Njc4LDE4LjkzMTg3MDkgTDIxLjkzNjg2NzgsMjEuMjA4MDM2NiBMMTkuNSwyMS4yMDgwMzY2IEwxOS41LDI0Ljk5OTE0MTMgTDIxLjkzNjg2NzgsMjQuOTk5MTQxMyBMMjEuOTM2ODY3OCwzNiBMMjYuODE0NTE5NywzNiBaIE0yNi44MTQ1MTk3LDM2IiBpZD0iT3ZhbC0xIi8+PC9nPjwvZz48L3N2Zz4="
                                alt=""
                            />
                        </div>
                        <span className="form__span">or use email for registration</span>
                        <input
                            className="form__input"
                            type="text"
                            placeholder="Name"
                            onChange={(event) => setUsername(event.target.value)}
                            value={username}
                        />
                        {errorMessage && !username && <span className={cx('error')}>Vui lòng nhập tên tài khoản</span>}

                        <input
                            className="form__input"
                            type="text"
                            placeholder="Email"
                            onChange={(event) => setEmail(event.target.value)}
                            value={email}
                        />
                        {errorMessage && !email && <span className={cx('error')}>Vui lòng nhập Email</span>}
                        <input
                            className="form__input"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                        {errorMessage && !password && <span className={cx('error')}>Vui lòng nhập Mật Khẩu</span>}
                        {error && <p className={cx('error')}>{error}</p>}

                        <button className="form__button button submit">SIGN UP</button>
                    </form>
                </div>
                <div className={`container b-container ${cnt1} ${cnt2}`} id="b-container" style={{ width: 515 }}>
                    <form className="form" id="b-form" method="" action="" onSubmit={handleSubmit1}>
                        <h2 className="form_title title">Sign in to Website</h2>
                        <div className="form__icons">
                            <img
                                className="form__icon"
                                src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaGVpZ2h0PSI1MHB4IiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCA1MCA1MCIgd2lkdGg9IjUwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6c2tldGNoPSJodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2gvbnMiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48dGl0bGUvPjxkZWZzLz48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIj48ZyBmaWxsPSIjMDAwMDAwIiBpZD0iRmFjZWJvb2siPjxwYXRoIGQ9Ik0yNSw1MCBDMzguODA3MTE5NCw1MCA1MCwzOC44MDcxMTk0IDUwLDI1IEM1MCwxMS4xOTI4ODA2IDM4LjgwNzExOTQsMCAyNSwwIEMxMS4xOTI4ODA2LDAgMCwxMS4xOTI4ODA2IDAsMjUgQzAsMzguODA3MTE5NCAxMS4xOTI4ODA2LDUwIDI1LDUwIFogTTI1LDQ3IEMzNy4xNTAyNjUxLDQ3IDQ3LDM3LjE1MDI2NTEgNDcsMjUgQzQ3LDEyLjg0OTczNDkgMzcuMTUwMjY1MSwzIDI1LDMgQzEyLjg0OTczNDksMyAzLDEyLjg0OTczNDkgMywyNSBDMywzNy4xNTAyNjUxIDEyLjg0OTczNDksNDcgMjUsNDcgWiBNMjYuODE0NTE5NywzNiBMMjYuODE0NTE5NywyNC45OTg3MTIgTDMwLjA2ODc0NDksMjQuOTk4NzEyIEwzMC41LDIxLjIwNzYwNzIgTDI2LjgxNDUxOTcsMjEuMjA3NjA3MiBMMjYuODIwMDQ4NiwxOS4zMTAxMjI3IEMyNi44MjAwNDg2LDE4LjMyMTM0NDIgMjYuOTIwNzIwOSwxNy43OTE1MzQxIDI4LjQ0MjU1MzgsMTcuNzkxNTM0MSBMMzAuNDc2OTYyOSwxNy43OTE1MzQxIEwzMC40NzY5NjI5LDE0IEwyNy4yMjIyNzY5LDE0IEMyMy4zMTI4NzU3LDE0IDIxLjkzNjg2NzgsMTUuODM5MDkzNyAyMS45MzY4Njc4LDE4LjkzMTg3MDkgTDIxLjkzNjg2NzgsMjEuMjA4MDM2NiBMMTkuNSwyMS4yMDgwMzY2IEwxOS41LDI0Ljk5OTE0MTMgTDIxLjkzNjg2NzgsMjQuOTk5MTQxMyBMMjEuOTM2ODY3OCwzNiBMMjYuODE0NTE5NywzNiBaIE0yNi44MTQ1MTk3LDM2IiBpZD0iT3ZhbC0xIi8+PC9nPjwvZz48L3N2Zz4="
                                alt=""
                            />
                        </div>
                        <span className="form__span">or use your email account</span>

                        <input
                            className="form__input"
                            type="text"
                            placeholder="Email"
                            value={username}
                            onChange={(event) => {
                                setUsername(event.target.value);
                            }}
                        />
                        {errorMessage1 && !username && <span className={cx('error')}>Vui lòng nhập tên tài khoản</span>}

                        <input
                            className="form__input"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(event) => {
                                setPassword(event.target.value);
                            }}
                        />
                        {errorMessage1 && !password && <span className={cx('error')}>Vui lòng nhập Mật Khẩu </span>}

                        {error1 ? <span className={cx('error')}>{error1}</span> : <></>}
                        <a className="form__link" href="# ">
                            Forgot your password?
                        </a>
                        <button className="form__button button submit">SIGN IN</button>
                    </form>
                </div>
                <div className={`switch ${cnt4}`} id="switch-cnt">
                    <div className={`switch__circle ${cnt4}`}></div>
                    <div className={`switch__circle switch__circle--t ${cnt4}`}></div>
                    <div className={`switch__container ${cnt5}`} id={`switch-c1 `}>
                        <h2 className="switch__title title">Welcome Back !</h2>
                        <p className="switch__description description">
                            To keep connected with us please login with your personal info
                        </p>
                        <button
                            className="switch__button button switch-btn"
                            onClick={() => {
                                setcnt1('is-txl');
                                setcnt2('is-z200');
                                setcnt3('');
                                setcnt4('is-txr');
                                setcnt5('is-hidden');
                                setEmail('');
                                setPassword('');
                                setUsername('');
                                setError1('');
                                setError('');
                                setErrorMessage('');
                                setErrorMessage1('');
                            }}
                        >
                            SIGN IN
                        </button>
                    </div>
                    <div className={`switch__container ${cnt3}`} id="switch-c2">
                        <h2 className="switch__title title">Hello Friend !</h2>
                        <p className="switch__description description">
                            Enter your personal details and start journey with us
                        </p>
                        <button
                            className="switch__button button switch-btn1"
                            onClick={() => {
                                setcnt1('');
                                setcnt2('');
                                setcnt3('is-hidden');
                                setcnt5('');
                                setcnt4('');
                                setEmail('');
                                setPassword('');
                                setUsername('');
                                setError('');
                                setError1('');
                                setErrorMessage('');
                                setErrorMessage1('');
                            }}
                        >
                            SIGN UP
                        </button>
                    </div>
                </div>
            </div>

            <Quote />
        </div>
    );
}

export default Login;
