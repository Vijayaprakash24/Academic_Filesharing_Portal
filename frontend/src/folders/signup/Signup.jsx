import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import './signup.css'
import Image from 'react-bootstrap/Image'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Signup = () => {
const studentapi="https://academic-fileshare-portal-server.onrender.com/student";

const facultyapi="https://academic-fileshare-portal-server.onrender.com/faculty"

  const [state, setState] = useState(true);
  const navigate=useNavigate();

  const [stdname, setStdname] = useState();
  const [stdregno, setStdregno] = useState();
  const [stdclass, setStdclass] = useState();
  const [stddepart, setStddepart] = useState();
  const [stdadvisor, setStdadvisor] = useState();
  const [stdpass, setStdpass] = useState('');
  const [year,setYear]=useState('')
  const [stdshowpass,setStdshowpass]=useState('');
  const [stdconpass, setStdconpass] = useState('');
  const [stdshowconpass,setStdshowconpass]=useState('');


  const [facname, setFacname] = useState();
  const [facid, setFacid] = useState();
  const [facpass, setFacpass] = useState('');
  const [facshowpass,setFacshowpass]=useState('')
  const [facdept, setFacdept] = useState();
  const [facconpass, setFacconpass] = useState('');
  const [facshowconpass,setFacshowconpass]=useState();
  

  const [list1,setList1]=useState([])
  const [list,setList]=useState([])


  useEffect(()=>{
   const fetchdata=async()=>{
    const res=await axios.get(studentapi);
    setList1(res.data)
    
   };fetchdata();


  },[])

  const selectdept=async(value)=>{
 
          const res=await axios.get(`${facultyapi}/department/${value}`)
          
          setList(res.data)
  }

const handlesubmitstutent=async(e)=>{
  const val=list.some((x)=>x.regno===stdregno)
 
  if(val){
    e.preventDefault();
     if(!stdname||!stdregno||!stdclass||!stdadvisor||!stddepart||!stdpass){
      alert("Enter all the field")
     }
     else if(year.length>7||year.length<7){
           alert("The Should be '2023-27' this formate and must have length 7 and yours year length is " + year.length)

     }


  else{
    try{
      if(stdconpass===stdpass){
   
       const student={regno: stdregno,
  name: stdname,
  classname: stdclass,
    year:year,
  department: stddepart,
  advisor: stdadvisor,
  password: stdpass};
      const res=await axios.post(studentapi,student)
     
      alert("student added sucessfully")
      navigate('/login')
       }else{
        alert("Confirm password and Password is not Sampe")
       }
    
  }catch(err){
    console.error("Error  posting student:",err);
    alert("Failed to add student");
  }
}
  }else{
    alert("Regno Already exist")
  }
}


const facultypostdata=async()=>{
   const val=list.some((x)=>x.facultyid===facid)
   if(val){
  if(!facname||!facid||!facdept||!facpass){
    alert("Enter all the field")
  }
  try{
    if(facpass===facconpass){
    const faculty={
      facultyname:facname
      ,facultyid:facid,
      facultydepartment:facdept,
      facultypassword:facpass

    };
    const res=await axios.post(facultyapi,faculty)
    
      alert("Faculty added sucessfully")
      navigate('/login')
  }else{
    alert("Confirm password and Password is not same.")
  }
  }catch(err){
    console.error("Error  posting faculty:",err);
    alert("Failed to add faculty");
  }
}else{
   alert("Regno Already exist")
}
}

  return (
    <>
    <div className='imgdiv'>
      <h5 style={{
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '90px',
        paddingLeft: '35%',
        color: '#5B3CC4'
      }}>
        <b>Academic Registration</b>
      </h5>

      <br />

      <div className='pagediv'>

        {state ? (
          <div style={{ display: 'flex', flexDirection: 'row',gap:'25px' }}>
            <Image
              src='https://c8.alamy.com/comp/2BKNARJ/a-man-stands-in-front-of-inputted-secured-data-registration-form-or-login-user-interface-isometric-flat-vector-illustration-of-infographic-elements-2BKNARJ.jpg'
              width={'40%'}
              className='image'
            />

            <Form className='signupform card-animate' onSubmit={handlesubmitstutent}>

              <div className='divclass  card-animate'>
                <Button
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    backgroundColor: '#4B32B5',
                    paddingTop: '20px',
                    paddingBottom: '20px',
                    paddingLeft: '20px',
                    paddingRight: '20px',
                  }}
                  onClick={() => setState(true)}
                >
                  <b>Student Signup</b>
                </Button>
                <Button
                  className='spanclass'
                  onClick={() => setState(false)}
                  style={{
                    color: '#5B3CC4',
                    paddingTop: '20px',
                    paddingBottom: '20px',
                    paddingLeft: '20px',
                    paddingRight: '20px',
                  }}
                >
                  Faculty Login
                </Button>
              </div>

              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Reg.No</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter your Register Number"
                  onChange={(e) => setStdregno(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col} >
                <Form.Label>Student Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Student Name"
                  onChange={(e) => setStdname(e.target.value)}
                />
              </Form.Group>

               <Form.Group as={Col} className="mb-3" controlId="formGridAddress1">
                <Form.Label>Year</Form.Label>
                <Form.Control
                  placeholder="ex 2027-29"
                  onChange={(e) => setYear(e.target.value)
                   
                  }
                />
              </Form.Group>

              <Form.Group as={Col} className="mb-3" controlId="formGridAddress1">
                <Form.Label>Class</Form.Label>
                 <Form.Select
                  defaultValue="Choose..."
                  onChange={(e) => {
                    const value=e.target.value;
                     selectdept(value)
                    setStdclass(value)}
                  }
                >
                  <option>Select </option>
                    <option>A</option>
                  <option>B</option>
                  <option>C</option>
                  <option>D</option>
                  <option>E</option>
                  <option>F</option>
                 
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} className="mb-3" controlId="formGridAddress2">
                <Form.Label>Select Department</Form.Label>
                <Form.Select
                  defaultValue="Choose..."
                  onChange={(e) => {
                    const value=e.target.value;
                     selectdept(value)
                    setStddepart(value)}
                  }
                >
                  <option>Select </option>
                    <option>CSE</option>
                  <option>AIML</option>
                  <option>IT</option>
                  <option>MECH</option>
                  <option>BIOMEDICL</option>
                  <option>CHEMICAL</option>
                 
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>Class Advisor</Form.Label>
                <Form.Select
                  defaultValue="Choose..."
                  onChange={(e) =>{
                    console.log(e.target.value)
                    setStdadvisor(e.target.value)}}
                >
                   <option value="choose" >Choose...</option>
                  {list?.map((x, index) => (
    <option key={index} value={x.facultyname}>
      {x.facultyname}
    </option>
  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Password</Form.Label>
                 <div style={{ position: 'relative' }}>
                <Form.Control
                   type={stdshowpass?'text':'password'}
                  placeholder='Enter Password'
                  value={stdpass}
                  onChange={(e) => setStdpass(e.target.value)}
                />

                 <span
                        onClick={() => setStdshowpass(!stdshowpass)}
                        style={{
                          position: 'absolute',
                          top: '50%',
                          right: '10px',
                          transform: 'translateY(-50%)',
                          cursor: 'pointer',
                          color: 'gray'
                        }}
                      >
                        {stdshowpass ? <FaEyeSlash /> : <FaEye />}
                      </span>
                    </div>
                
              </Form.Group>

              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Confirmation Password</Form.Label>
                 <div style={{ position: 'relative' }}>
                <Form.Control
                  type={stdshowconpass?'text':'password'}
                  placeholder='Enter Confirm Password'
                  value={stdconpass}
                  onChange={(e) => setStdconpass(e.target.value)}
                />


                 <span
                        onClick={() => setStdshowconpass(!stdshowconpass)}
                        style={{
                          position: 'absolute',
                          top: '50%',
                          right: '10px',
                          transform: 'translateY(-50%)',
                          cursor: 'pointer',
                          color: 'gray'
                        }}
                      >
                        {stdshowconpass ? <FaEyeSlash /> : <FaEye />}
                      </span>
                    </div>


              </Form.Group>

              <br />

              <div style={{ display: 'flex', justifyContent: "center" }}>
                <Button className='buttonclassfaculty '
                  variant="outline-primary"
                  type="submit"
                 
                >
                  Submit
                </Button>
              </div>
                 <br></br>
                <div style={{display:'flex',flexDirection:'row',gap:'5px'}}> 
            <h6>Create new account?</h6>
            <h6 style={{cursor:'pointer'}} onClick={()=>{
             navigate('/')
            }}> Login in </h6>
</div>
            </Form>
          </div>


        ) : (

  // faculty login

        
          <div style={{ display: 'flex', flexDirection: 'row' }} className=" card-animate">
            <Image
              src='https://c8.alamy.com/comp/2BKNARJ/a-man-stands-in-front-of-inputted-secured-data-registration-form-or-login-user-interface-isometric-flat-vector-illustration-of-infographic-elements-2BKNARJ.jpg'
              width={'40%'}
              className='image'
            />

            <Form className='signupform '>

              <div className='divclass  card-animate'>
                <Button
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    color: '#5B3CC4',
                    paddingTop: '20px',
                    paddingBottom: '20px',
                    paddingLeft: '20px',
                    paddingRight: '20px'
                  }}
                  className='spanclass'
                  onClick={() => setState(true)}
                >
                  Student Signup
                </Button>
                <Button
                  className='spanclass'
                  style={{
                    backgroundColor: '#4B32B5',
                    paddingTop: '20px',
                    paddingBottom: '20px',
                    paddingLeft: '20px',
                    paddingRight: '20px'
                  }}
                  onClick={() => setState(false)}
                >
                  <b>Faculty Login</b>
                </Button>
              </div>

              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Faculty Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Faculty Name"
                  onChange={(e) => setFacname(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Faculty Id</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Faculty Id"
                  onChange={(e) => setFacid(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col} className="mb-3" controlId="formGridAddress2">
                <Form.Label>Select Department</Form.Label>
                <Form.Select
                  defaultValue="Choose..."
                  onChange={(e) => setFacdept(e.target.value)}
                >
                  <option>Select </option>
                  <option>CSE</option>
                  <option>AIML</option>
                  <option>IT</option>
                  <option>MECH</option>
                  <option>BIOMEDICL</option>
                  <option>CHEMICAL</option>
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Password</Form.Label>
                 <div style={{ position: 'relative' }}>
                <Form.Control
                   type={facshowpass?'text':'password'}
                  placeholder='Enter Password'
                  value={facpass}
                  onChange={(e) => setFacpass(e.target.value)}
                />
                
                <span
                        onClick={() => setFacshowpass(!facshowpass)}
                        style={{
                          position: 'absolute',
                          top: '50%',
                          right: '10px',
                          transform: 'translateY(-50%)',
                          cursor: 'pointer',
                          color: 'gray'
                        }}
                      >
                        {facshowpass ? <FaEyeSlash /> : <FaEye />}
                      </span>
                    </div>





              </Form.Group>

              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Confirmation Password</Form.Label>
                <div style={{ position: 'relative' }}>
                <Form.Control
                 type={facshowconpass?'text':'password'}
                  placeholder='Enter Confirm Password'
                  value={facconpass}
                  onChange={(e) => setFacconpass(e.target.value)}
                />


                    <span
                        onClick={() => setFacshowconpass(!facshowconpass)}
                        style={{
                          position: 'absolute',
                          top: '50%',
                          right: '10px',
                          transform: 'translateY(-50%)',
                          cursor: 'pointer',
                          color: 'gray'
                        }}
                      >
                        {facshowconpass ? <FaEyeSlash /> : <FaEye />}
                      </span>
                    </div>


              </Form.Group>

              <br />

              <div style={{ display: 'flex', justifyContent: "center" }}>
                <Button  className='buttonclassfaculty'
                  variant="outline-primary"
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    facultypostdata();
                    
                       }}
                >
                  Submit
                </Button>
              </div>

                  <br></br>
                <div style={{display:'flex',flexDirection:'row',gap:'5px'}}> 
            <h6>Create new account?</h6>
            <h6  style={{cursor:'pointer'}} onClick={(e)=>navigate('/')}> Login in </h6>
</div>
               
            </Form>
          </div>
        )}
      </div>
      </div>
    </>
  );
};

export default Signup;
