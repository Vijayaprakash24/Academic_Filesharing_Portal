import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';


const Edit = () => {
    const {role,id}=useParams();

    const navigate=useNavigate();
  const [state, setState] = useState(role==='true');
  const studentapi="https://academic-fileshare-portal-server.onrender.com/student";
  const facultyapi="https://academic-fileshare-portal-server.onrender.com/faculty";

  const [stdname, setStdname] = useState();
  const [stdregno, setStdregno] = useState();
  const [stdclass, setStdclass] = useState();
  const [stddepart, setStddepart] = useState();
  const [year,setYear]=useState()
  const [stdadvisor, setStdadvisor] = useState();
  const [stdpass, setStdpass] = useState('');
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
  

  const [list,setList]=useState([])
const [list1,setList1]=useState([])
 


  useEffect(()=>{
    const fetchdata=async()=>{

      try{
 if(role==='true'){
  const res=await axios.get(studentapi)
  const value=res.data?.find((x)=>x._id===id);
  console.log(value)
  setList(value)
  setStdname(value.name)
  setYear(value.year)
   setStdregno(value.regno)
 setStdclass(value.classname);
 setStddepart(value.department);
setStdadvisor(value.advisor);
setStdpass(value.password);
setList1(value)
    const res1=await axios.get(`${facultyapi}/department/${value.department}`)
            console.log(res1.data)
            setList(res1.data)

 }else{
  const res=await axios.get(facultyapi)
  const value=res.data?.find((x)=>x._id===id);
  console.log(value)
  setFacname(value.facultyname);
  setFacid(value.facultyid);
  setFacpass(value.facultypassword);
  setFacdept(value.facultydepartment);
  setList1(value)
 }}catch(err){
  console.log('Error in fetching',err)
 }


        
 

    };fetchdata()

  },[])


  
    const stdsubmit=async()=>{
      const newdata={
        regno:stdregno,
        name:stdname,
        year:year,
        department:stddepart,
        classname:stdclass,
        advisor:stdadvisor,
        password:stdpass
      }
      try{
      const res=await axios.put(`${studentapi}/${id}`,newdata)
      }catch(err){
        console.log("Error in fetching",err)
      }
    }


const facsubmit=async()=>{
alert(facdept)
    const newdata={
      facultyname:facname,
      facultyid:facid,
      facultydepartment:facdept,
      facultypassword:facpass
    
    }
    try{
      const res=await axios.put(`${facultyapi}/${id}`,newdata)
      alert(`${facultyapi}/${id}`)
    }catch(err){
      console.log("Error in Editing",err)
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
        <b>Edit Profile</b>
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

            <Form className='signupform'>

              <div className='divclass'>
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
                
              </div>

              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Reg.No</Form.Label>
                <Form.Control
                  type="number"
                  value={stdregno||''}
                  placeholder="Enter your Register Number"
                  onChange={(e) => setStdregno(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col} >
                <Form.Label>Student Name</Form.Label>
                <Form.Control
                  type="text"
                  value={stdname||''}
                  placeholder="Student Name"
                  onChange={(e) => setStdname(e.target.value)}
                />
              </Form.Group>

                <Form.Group as={Col} className="mb-3" controlId="formGridAddress1">
                               <Form.Label>Year</Form.Label>
                               <Form.Control
                               value={year||''}
                                 placeholder="ex 2027-29"
                                 onChange={(e) => setYear(e.target.value)
                                  
                                 }
                               />
                  </Form.Group>
               

              <Form.Group as={Col} className="mb-3" controlId="formGridAddress1">
                <Form.Label>Class</Form.Label>
                <Form.Control
                  placeholder="ex A,B,C"
                  value={stdclass||''}
                  onChange={(e) => setStdclass(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col} className="mb-3" controlId="formGridAddress2">
                <Form.Label>Select Department</Form.Label>
                <Form.Select
                  value={stddepart||''}
                  onChange={(e) => setStddepart(e.target.value)
                    
                  }
                >
                  <option>choose an option</option>
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
                  value={stdadvisor||''}
                  onChange={(e) => setStdadvisor(e.target.value)}
                >
                   <option value="choose" >Choose...</option>
                  {Array.isArray(list)&&list.map((x, index) => (
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
                <Button className='buttonclassfaculty'
                  variant="outline-primary"
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    stdsubmit();
                    navigate(`/studentfrontpage/${id}/true`)
                   
                  }}
                >
                  Submit
                </Button>
              </div>

            </Form>
          </div>


        ) : (

  // faculty login

        
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Image
              src='https://c8.alamy.com/comp/2BKNARJ/a-man-stands-in-front-of-inputted-secured-data-registration-form-or-login-user-interface-isometric-flat-vector-illustration-of-infographic-elements-2BKNARJ.jpg'
              width={'40%'}
              className='image'
            />

            <Form className='signupform'>

              <div className='divclass'>
              
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
                  value={facname||''}
                  placeholder="Enter Faculty Name"
                  onChange={(e) => setFacname(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Faculty Id</Form.Label>
                <Form.Control
                  type="text"
                  value={facid||''}
                  placeholder="Faculty Id"
                  onChange={(e) => setFacid(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col} className="mb-3" controlId="formGridAddress2">
                <Form.Label>Select Department</Form.Label>
                <Form.Select
                 
                  value={facdept||""}
                  onChange={(e) => setFacdept(e.target.value)}
                >
                  <option>choose an option</option>
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

            

              <br />

              <div style={{ display: 'flex', justifyContent: "center" }}>
                <Button  className='buttonclassfaculty'
                  variant="outline-primary"
                  type="submit"
                  onClick={(e) => {
                     
                    facsubmit();
                    navigate(`/facultyhomepage/true/${id}`)
                   
                  }}
                >
                  Submit
                </Button>
              </div>

            </Form>
          </div>
        )}
      </div>
      </div>
    </>
  );
};

export default Edit;
