import React, { useState } from 'react';
import ERPImage from '../../../assets/images/8848_Logo.svg';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import './Login.css';
import { toast } from 'react-toastify';
import { login } from '../../../apis/login';

const Login = ({ onLoginSuccess }: any) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const isAPP = window.electron ? true : false;

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getSessionId = () => {
    // const cookies = document.cookie.split('; ');

    if (typeof document === 'undefined') return '';
    const cookieValue = document.cookie
      .split('; ')
      .find(row => row.startsWith(`sid=`))
      ?.split('=')[1];

    console.log(cookieValue, document.cookie, ': cookieValue');
    return cookieValue || '';

    // const cookies = await window.electron.getSid();
    // console.log(cookies, ': cookies');
    // const sidCookie = cookies.find((row:any) => row.startsWith('sid='));
    // return sidCookie ? sidCookie.split('=')[1] : null;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = isAPP
        ? await window.electron.login({ email: formData?.email, password: formData?.password })
        : await login({ email: formData?.email, password: formData?.password });

    //   console.log(response, ': response');
      if (!response?.message) {
        throw new Error('Login failed');
      }
      if (response?.error) {
        toast.error(response?.error || 'Login failed. Please try again.');
      }
      setTimeout(() => {
        onLoginSuccess({ email: formData?.email, password: formData?.password });
      }, 1000)
    } catch (error: any) {
      console.error('Error:', error);
      toast.error(error.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter' && formData.email && formData.password) {
      handleSubmit(e);
    }
  };
  
  console.log('Session ID:', getSessionId());

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 w-100 gray_bg">
      <div className="text-center">
        {/* <div className="card p-4 shadow-sm" style={{ width: "350px" }}> */}
        <form className="card pt-5 pb-5 ps-4 pe-4 shadow-sm login_form" style={{ width: '350px' }} onSubmit={handleSubmit}>
          <div className="mb-4">
            <img src={ERPImage} alt="erp_next_image" style={{ height: '40px', width: '100px' }} />
          </div>
          <h5 className="mb-4" style={{ fontWeight: '600' }}>
            Login to ADA
          </h5>
          <div className="mb-3 input-group">
            <span className="input-group-text border-0 light_bg">
              <FaEnvelope />
            </span>
            <input
              type="email"
              name="email"
              className="form-control light_bg"
              placeholder="jane@example.com"
              value={formData?.email}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              required
            />
          </div>
          <div className="mb-3 input-group">
            <span className="input-group-text border-0 light_bg">
              <FaLock />
            </span>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              className="form-control light_bg"
              placeholder="••••••"
              value={formData.password}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              required
            />
            <button type="button" className="btn border-0 light_bg password_btn" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          {/* <div className="text-end mb-3">
                        <a href="#" className="text-decoration-none">
                            Forgot Password?
                        </a>
                    </div> */}
          <button type="submit" className="btn btn-primary w-100 mt-2 border-0 text-capitalize" disabled={loading}>
            {loading ? 'LOGGIN in...' : 'LOGIN'}
          </button>
          {/* </div> */}
        </form>
        {/* <p className="mt-3">
                    Don't have an account? <a href="#" className="text-dark fw-bold">Sign up</a>
                </p> */}
      </div>
    </div>
  );
};

export default Login;
