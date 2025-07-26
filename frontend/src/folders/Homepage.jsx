import React, { useState, useEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './homepage.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const Homepage = () => {
  const api = "https://academic-fileshare-portal-server.onrender.com/student";
  const facultyapi = "https://academic-fileshare-portal-server.onrender.com/faculty";
  const [faclist, setFaclist] = useState([]);
  const [stdreg, setStdreg] = useState();
  const [list, setList] = useState([]);
  const [facreg, setFacreg] = useState();
  const navigate = useNavigate();

  const [originalstring, setOriginalstring] = useState(0);
  const [originalstring1, setOriginalstring1] = useState(0);
  const [answeer, setAnswer] = useState(0);
  const [anser1, setAnser1] = useState(0);
  const [num1, setNum1] = useState();
  const [num2, setNum2] = useState();
  const [final, setFinal] = useState('');
  const run = useRef(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [showPasswordfa, setShowPasswordfa] = useState(false);
  const [passwordfa, setPasswordfa] = useState('');

  const [originalstringstd, setOriginalstringstd] = useState(0);
  const [originalstring1std, setOriginalstring1std] = useState(0);
  const [answerstd, setAnswerstd] = useState(0);
  const [anser1std, setAnser1std] = useState(0);
  const [num1std, setNum1std] = useState();
  const [num2std, setNum2std] = useState();
  const [finalstd, setFinalstd] = useState('');

  useEffect(() => {
    const fetchdata = async () => {
      const res = await axios.get(api);
      const fac = await axios.get(facultyapi);
      setFaclist(fac.data);
      setList(res.data);
    };
    fetchdata();
  }, [api, facultyapi]);

  useEffect(() => {
    if (run.current) return;
    run.current = true;

    const number1std = Math.random();
    const length22std = number1std.toString().split('.')[1];
    const originalstd = length22std[0];
    const original1std = length22std[1];
    setOriginalstringstd(originalstd);
    setOriginalstring1std(original1std);
    const ansnum1std = Number(originalstd) + 5;
    const ansnum2std = Number(original1std) + 3;
    setNum1std(ansnum1std);
    setNum2std(ansnum2std);
    setFinalstd(ansnum1std + ansnum2std);

    const number1 = Math.random();
    const length22 = number1.toString().split('.')[1];
    const original = length22[0];
    const original1 = length22[1];
    setOriginalstring(original);
    setOriginalstring1(original1);
    const ansnum1 = Number(original) + 5;
    const ansnum2 = Number(original1) + 3;
    setNum1(ansnum1);
    setNum2(ansnum2);
    setFinal(ansnum1 + ansnum2);
  }, []);

  const studentloginbutton = (e) => {
    e.preventDefault();
    const valid = list.some((x) => x.regno === stdreg && x.password === password);
    const value = list.find((x) => x.regno === stdreg && x.password === password);
    if (stdreg && password && answerstd) {
      if (valid) {
        if (answerstd == finalstd) {
          alert("Login successfully");
         
          navigate(`/studentfrontpage/${value._id}/${true}`);
        } else {
          alert("Captcha is wrong!");
        }
      } else {
        alert("Incorrect Regno or Password");
      }
    } else {
      alert("Enter all the Field");
    }
  };

  const facultyloginbutton = (e) => {
    e.preventDefault();
    const valid = faclist.some((x) => x.facultyid === facreg && x.facultypassword === passwordfa);
    const value = faclist.find((x) => x.facultyid === facreg && x.facultypassword === passwordfa);

    if (facreg && passwordfa && anser1) {
      if (valid) {
        if (anser1 == final) {
          alert("Faculty Login Sucessfully");
         
          navigate(`/facultyhomepage/${true}/${value._id}`);
        } else {
          alert("Captcha is wrong!");
        }
      } else {
        alert("Faculty not Registered");
      }
    } else {
      alert("Enter all the field");
    }
  };

  return (
    <>
      <motion.div
        className='lab'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >

      
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <Form className='for card-hover-animate card-animate' onSubmit={studentloginbutton}>
            <h5 style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>Student Login</h5>
            <Form.Group className="mb-3">
              <Form.Label>Register Number</Form.Label>
              <Form.Control type="number" placeholder="Enter Register number" onChange={(e) => setStdreg(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <div style={{ position: 'relative' }}>
                <Form.Control
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ paddingRight: '40px' }}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute', top: '50%', right: '10px',
                    transform: 'translateY(-50%)', cursor: 'pointer', color: 'gray'
                  }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </Form.Group>
            <p>{num1std}+{num2std}=? <Form.Control onChange={(e) => setAnswerstd(e.target.value)} /></p>

            <motion.div whileHover={{ scale: 1.05 }} style={{ display: 'flex', justifyContent: 'center' }}>
              <Button className='car2'variant="outline-primary" type="submit">Submit</Button>
            </motion.div>

            <br />
            <div style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
              <h6>Already have an account?</h6>
              <h6 style={{ cursor: 'pointer' }} onClick={() => navigate('/signup')}>Signup</h6>
            </div>
          </Form>
        </motion.div>

        {/* Faculty Login */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.8 }}
        >
          <Form className='for card-hover-animate card-animate' onSubmit={facultyloginbutton}>
            <h5 style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>Faculty Login</h5>
            <Form.Group className="mb-3">
              <Form.Label>Register Number</Form.Label>
              <Form.Control type="text" placeholder="Enter Register number" onChange={(e) => setFacreg(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <div style={{ position: 'relative' }}>
                <Form.Control
                  type={showPasswordfa ? 'text' : 'password'}
                  value={passwordfa}
                  placeholder="Enter password"
                  onChange={(e) => setPasswordfa(e.target.value)}
                  style={{ paddingRight: '40px' }}
                />
                <span
                  onClick={() => setShowPasswordfa(!showPasswordfa)}
                  style={{
                    position: 'absolute', top: '50%', right: '10px',
                    transform: 'translateY(-50%)', cursor: 'pointer', color: 'gray'
                  }}
                >
                  {showPasswordfa ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </Form.Group>
            <p>{num1}+{num2}=? <Form.Control onChange={(e) => setAnser1(e.target.value)} /></p>

            <motion.div whileHover={{ scale: 1.05 }} style={{ display: 'flex', justifyContent: 'center' }}>
              <Button className='car2' variant="outline-primary" type="submit">Submit</Button>
            </motion.div>

            <br />
            <div style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
              <h6>Already have an account?</h6>
              <h6 style={{ cursor: 'pointer' }} onClick={() => navigate('/signup')}>Signup</h6>
            </div>
          </Form>
        </motion.div>

      </motion.div>
    </>
  );
};

export default Homepage;
