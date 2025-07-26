import Button from 'react-bootstrap/esm/Button';
import React, { use, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Image from 'react-bootstrap/Image'
import { MdLightMode, MdDarkMode } from 'react-icons/md';
import Card from 'react-bootstrap/Card';
import { FaPlus } from "react-icons/fa";
import { useNavigate, useParams } from 'react-router-dom';
import { ImArrowLeft2 } from "react-icons/im";
import { Row, Col } from 'react-bootstrap';
import { useEffect } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form'
import img from '../../../img.png'


const Eachstudentdetail = () => {

  const studentapi="https://academic-fileshare-portal-server.onrender.com/student";
  const facultyapi="https://academic-fileshare-portal-server.onrender.com/faculty"
  const [list,setList]=useState([])
  const [value,setValue]=useState([])
  const [value1,setValue1]=useState([])

  const [certbutton,setCertbutton]=useState(true)
  const [sembutton,setSembutton]=useState(false)

const {stdid,thempars,facid}=useParams()
console.log(facid)
const navigate=useNavigate()
const [color1,setColor1]=useState('white')
const [them,setThem]=useState(thempars==='true')
const [navcolor,setNavcolor]=useState(' #2d2c2e ')
const [butncolor,setButcolor]=useState('#FAFA33');
const [dark,setDark]=useState(' #2d2c2e ')
const [isHovered1, setIsHovered1] = useState(false);
const [isHovered2, setIsHovered2] = useState(false);
const [isHovered3, setIsHovered3] = useState(false);
const [isHovered4, setIsHovered4] = useState(false);



 const [marks, setMarks] = useState([]);
const [sem,setSem]=useState()


  const mark=async(selectedSemester) => {
   
      try {
        const res = await axios.get(`${studentapi}/${stdid}/semester/${selectedSemester}`);
      setMarks(res.data);
   
      } catch (error) {
    
         if (error.response?.status === 404) {
      alert(`No data found for semester ${selectedSemester}.`);
    } else {
      alert("An unexpected error occurred while fetching marks.");
    }
    
   
      }
    };

const deletesem=async(sem)=>{
     
      try{
        await axios.delete(`${studentapi}/${stdid}/semester/${sem}`)
         setMarks(null);

   
    alert(`Semester ${sem} deleted successfully.`);
      } catch (error) {
    
         if (error.response?.status === 404) {
      alert(`No data found for semester ${sem}.`);
    } else {
      alert("An unexpected error occurred while fetching marks.");
    }
      }
    }



useEffect(()=>{
  const fetchdata=async()=>{
    try{
      const res=await axios.get(studentapi);
      const get=await axios.get(facultyapi)
      setList(res.data);
      const val=res.data.find((x)=>x._id===stdid)
      const facval=get.data.find((x)=>x._id===facid)
      setValue(val)
      setValue1(facval)
    }catch(err){
      console.error("Error while fetching.",err)
    }
  }; fetchdata();
},[studentapi])



const handndledownload = (filename, b64string) => {
  
  if (!b64string || typeof b64string !== "string" || !b64string.startsWith("data:")) {
    console.error("Invalid Base64 string:", b64string);
    alert("Invalid Base64 string or no file available for download.");
    return;
  }

  
  const link = document.createElement("a");
  link.href = b64string; 
  link.download = filename || "download.txt";

 
  document.body.appendChild(link); 
  link.click();
  document.body.removeChild(link); 
};


  return (

    
        <div className={`upload-facultybackground ${them ? 'theme-facultylight' : 'theme-facultydark'}`}>

    
       <div className='bit' style={{borderBottomStyle:'solid',borderBlockColor:them?'#FFFFE0':'#FFA500'}}>
           <Navbar className="navbar-fade" expand="lg" style={{marginBottom:'10px',paddingTop:'10px',paddingRight:'30%' }}>
        <Container>
           <Image src={img}
                                
                                width={70}
                                height={70}
                                ></Image>
          <Navbar.Brand 
          onClick={()=>{
            navigate('/facultyhomepage')
          }}
          style={{ color: 'white',cursor:'pointer',paddingLeft:"20px" }}>Studenthomepage</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
             {them?
<Button style={{backgroundColor:dark,color:color1,border:'none'}} className='theam1' onClick={()=>{
      setThem(!them)
     setColor1(' #2d2c2e ')
     setNavcolor('white')
     setButcolor('white')
     setDark('#5B3CC4')
}}

><MdDarkMode/> </Button>
:
             <Button style={{backgroundColor:butncolor,color:color1,}} className='theam' onClick={()=>{
      setThem(!them)
     setColor1('white')
     setNavcolor(' #2d2c2e ')
     setButcolor('#FAFA33')
     setDark(' #2d2c2e ')
}}


><MdLightMode/></Button>
               }
              <Nav.Link 
               onMouseEnter={() => setIsHovered1(true)}
               onMouseLeave={() => setIsHovered1(false)}
              style={{ color: isHovered1
               ? 'red' : 'white' }} onClick={(e)=>{
                navigate(`/facultyhomepage/${them}/${facid}`)
               }}>Home</Nav.Link>
              <Nav.Link onMouseEnter={() => setIsHovered2(true)}
               onMouseLeave={() => setIsHovered2(false)}
              style={{ color: isHovered2 ? 'red' : 'white' }}>About</Nav.Link>
               <Nav.Link onMouseEnter={() => setIsHovered3(true)}
               onMouseLeave={() => setIsHovered3(false)}
              style={{ color: isHovered3 ? 'red' : 'white' }}>Contactus</Nav.Link>

              <div style={{display:'flex',flexDirection:'row'}}>
              <Image  style={{paddingTop:'5%'}}
  src="https://www.citypng.com/public/uploads/preview/hd-profile-user-round-blue-icon-symbol-transparent-png-701751695033492ww0i0raud4.png" 
  roundedCircle 
  width={40} 
  height={45}
/> <NavDropdown title={value1.facultyname} >
               <NavDropdown.Item onClick={(e)=>navigate(`/edit/${false}/${facid}`)}>view Profile</NavDropdown.Item>
              <NavDropdown.Item onClick={(e)=>navigate(`/edit/${false}/${facid}`)}>
                Edit your Profile
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={(e)=>navigate('/')}>
               Log Out
              </NavDropdown.Item>
                 <NavDropdown.Item onClick={(e)=>{
                  axios.delete(`${facultyapi}/${facid}`)
                  navigate('/')}}>
               Delete Faculty Account
              </NavDropdown.Item>
            </NavDropdown>
</div>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      </div>


<div style={{ position: 'absolute',paddingLeft:'1%',paddingTop:'20%' }}>
  <button 
  onClick={(e)=>{
   navigate(`/facultyhomepage/${them}/${facid}`)
   alert(facid)

  }}
  
  style={{
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    border: 'none',
    backgroundColor: navcolor,
    color:color1,
    fontSize: '20px',
    cursor: 'pointer',
    boxShadow: '0 2px 5px rgba(0,0,0,0.3)'
  }}>
    <ImArrowLeft2 />
  </button>
</div>
<div style={{ paddingTop:'7%',paddingLeft:'10%' }}>
  <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '30px' }}>
    <Button className="card-hover-animate card-animate"
      onClick={() => {
        setCertbutton(true);
        setSembutton(false);
      }}
      style={{
        backgroundColor: certbutton ? 'blue' : 'yellow',
        color: 'white',
        userSelect: 'none',
        border: 'none',
        padding: '10px 20px',
        fontWeight: 'bold',
        borderRadius: '6px',
      }}
    >
      Certificates
    </Button>

    <Button className="card-hover-animate card-animate"
      onClick={() => {
        setCertbutton(false);
        setSembutton(true);
      
      }}
      style={{
        backgroundColor: sembutton ? 'blue' : 'yellow',
        color: 'white',
        userSelect: 'none',
        border: 'none',
        padding: '10px 20px',
        fontWeight: 'bold',
        borderRadius: '6px',
      }}
    >
      Semester Marks
    </Button>
  </div>


  <div  style={{display:'flex'}}>
  {certbutton && (
    <Row className="g-4" style={{width:"95%"}}>
  {value?.certificate?.map((x, index) => (
    <Col key={index} sm={12} md={4} lg={3} >
      <Card className="card-hover-animate card-animate"
        style={{
          backgroundColor: them ? 'white' : '#5B3CC4',
          color: them ? 'black' : 'white',
          border: 'none',
          borderRadius: '12px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          height: '100%',
          
          display: 'flex',
          gap:'100%',
          flexDirection: 'column',
        }}
      >
        <Card.Img
          variant="top"
          src={x.certificate || downloadimg}
          alt="Card image"
          style={{
            objectFit: 'cover',
            width: '100%',
            height: '200px',
            padding:'5px',
            borderTopLeftRadius: '12px',
            borderTopRightRadius: '12px',
          }}
          onError={(e) => (e.target.src = downloadimg)}
        />
        <Card.Body style={{ flex: '4 4 auto', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <Card.Title>{x.title}</Card.Title>
            <Card.Text>{x.description}</Card.Text>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              alignItems: 'center',
              paddingTop:'50px'
             
             
            }}
          >
           
            <Button className='car2'
              style={{
                backgroundColor: them ? '#007bff' : '#2d2c2e',
                border: 'none',
               
              }}
              onClick={(e) => handndledownload(x.title, x.certificate)}
            >
              Download
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  ))}
</Row>

  )}

 
  {sembutton && marks && (
  <Container className="mt-4 card-animate">
    <h2 className="text-center mb-4">Semester Marks</h2>
    <Form.Label>Select the Semester Mark to get</Form.Label>
             <Form.Select
  defaultValue=""
  onChange={(e) => {
    const selectedSemester = e.target.value;
    setSem(selectedSemester);
    mark(selectedSemester);
  }}
>
  <option disabled value="">Select the Semester</option>
  <option>1</option>
  <option>2</option>
  <option>3</option>
  <option>4</option>
  <option>5</option>
  <option>6</option>
  <option>7</option>
  <option>8</option>
</Form.Select>

    <Card className="mb-3">
      <Card.Header style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
        Semester: {marks.semester}
      </Card.Header>
      <Card.Body>
        <Row>
          {marks.subjects?.map((sub, subIndex) => (
            <Col sm={6} md={4} key={subIndex}>
              <Card className="mb-2" bg="light">
                <Card.Body>
                  <strong>Subject: {sub.subjectname}</strong><br />
                  Grade: {sub.grade}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Card.Body>
    </Card>
    <div style={{display:'flex',justifyContent:'center'}}>
    <Button className="card-hover-animate card-animate car1" onClick={(e)=>deletesem(sem)}>Delete</Button>
 </div>
  </Container>
  
)}






</div>

</div>
</div>
    

  );
}


export default Eachstudentdetail