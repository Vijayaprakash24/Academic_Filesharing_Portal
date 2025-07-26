import Button from 'react-bootstrap/esm/Button';
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown'
import { MdLightMode, MdDarkMode } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import './fileupload.css';
import Image from 'react-bootstrap/esm/Image';
import { ImArrowLeft2 } from "react-icons/im";
import { useEffect } from 'react';
import axios from 'axios';
import img from '../../../img.png'

const Editstudentfile = () => {
  const { thempars,id,id1 } = useParams();
 const [list,setList]=useState([])
  const studentapi="http://localhost:7841/student";

  const [state, setState] = useState(true);
  const navigate = useNavigate();
  const [color1, setColor1] = useState('white');
  const [them, setThem] = useState(thempars === 'true');
const [isHovered1, setIsHovered1] = useState(false);
const [isHovered2, setIsHovered2] = useState(false);
const [isHovered3, setIsHovered3] = useState(false);

const [certificatename,setCertificatename]=useState();
const [date,setDate]=useState();
const [description,setDescription]=useState();
 const [result,setResult]=useState()


useEffect(()=>{
    const fetchdata=async()=>
{    try{
        const res=await axios.get(`${studentapi}/${id}/${id1}`)
        setList(res.data)
       
        setCertificatename(res.data.title)
        setDescription(res.data.description)
        setDate(res.data.date)
        setResult(res.data.certificate)
    }catch(err){
        console.log("Error in Fetching")
    }
};fetchdata();
},[studentapi])

  const postdata=async(e)=>{
e.preventDefault();
     const certificatesubmition={
        title:certificatename|| list?.certificatename,
    date:date|| list?.date,
    description:description||list?.description,
    certificate:result||list?.certificate,

     }
  
     
    try{
    const datas=await axios.put(`${studentapi}/${id}/${id1}`,certificatesubmition)
 
     navigate(`/studentfrontpage/${id}/${them}`)
    }
  catch(err){
    console.error("Error  posting certificate:",err);
    alert("Failed to add certificate");
  }
}




  const selectfile=(e)=>{
         const file=e.target.files[0];
         if(file){
          const render=new FileReader();
          render.onload=function(e){
            const base64=e.target.result;
            setResult(base64)
            
          }
          render.readAsDataURL(file)
          
         
         }else{
          alert("File is not selected")
         }
  }


  return (
    <div className={`upload-background ${them ? 'theme-light' : 'theme-dark'}`}>

      <div className="bit">
        <Navbar className="navbar-fade" expand="lg" style={{  backgroundColor:them?'#FFB347':'#4B32B5', paddingTop: '10px', paddingRight: '30%' }}>
          <Container>
             <Image src={img}
                      
                      width={70}
                      height={70}
                      ></Image>
            <Navbar.Brand
              onClick={() => {
                navigate(`/studentfrontpage/${id}/${them}`);
              }}
              style={{ color: them ? color1 : 'white', cursor: 'pointer',paddingLeft:"20px" }}
            >
              Studenthomepage
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
              {them?
                 <Button
                  style={{ backgroundColor: them ? 'white' : '#5B3CC4', color: them ? 'black' : 'black', border: 'none' }}
                  className="theam1"
                  onClick={() => setThem(!them)}
                >
                  <MdDarkMode />
                </Button>
              
              
              
                : <Button
                  style={{ backgroundColor: them ? '#FFB347' : 'white', color: them ? color1 : '#2d2c2e' }}
                  className="theam"
                  onClick={() => setThem(!them)}
                >
                  <MdLightMode />
                </Button>}
               
                   <Nav.Link 
               onMouseEnter={() => setIsHovered1(true)}
               onMouseLeave={() => setIsHovered1(false)}
              style={{ color: isHovered1
               ? 'red' : 'white' }} onClick={(e)=>{
                navigate(`/studentfrontpage/${id}/${them}`)
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
/> <NavDropdown title="name" >
            <NavDropdown.Item onClick={(e)=>navigate(`/edit/${true}`)}>view Profile</NavDropdown.Item>
              <NavDropdown.Item onClick={(e)=>navigate(`/edit/${true}`)}>
                Edit your Profile
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={(e)=>navigate('/')}>
               Log Out
              </NavDropdown.Item>
               <NavDropdown.Item onClick={(e)=>{
                              axios.delete(`${studentapi}/${id}`)
                              navigate('/')}}>
                            Delete Student Account
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
    e.preventDefault();
    navigate(`/studentfrontpage/${id}/${them}`)
  }}
  
  style={{
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    border: 'none',
    backgroundColor: them?'black':'white',
    color:them?'white':'black',
    fontSize: '20px',
    cursor: 'pointer',
    boxShadow: '0 2px 5px rgba(0,0,0,0.3)'
  }}>
    <ImArrowLeft2 />
  </button>
</div>


      <div className="uploaddiv" style={{ paddingTop:'3%'}}>
      <div style={{display:'flex'}}>
      <h5  style={{color:them?'black':'white'}}><b>Student file Upload</b></h5>
      </div>
    
          
          <Form className="uploadform" style={{borderColor:them?'#FFB347':'#4B32B5',borderRadius:'20px'}}>
            <div className="divclass">
              <Button
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  backgroundColor: them?'#FFB347':'#4B32B5',
                  padding: '20px',
                }}
                onClick={() => setState(true)}
              >
                <b>Certificate Edit</b>
              </Button>
             
            </div>

            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Certificate Name with Reg.No</Form.Label>
              <Form.Control type="text" 
              value={certificatename||''}
              onChange={(e)=>setCertificatename(e.target.value)}/>
            </Form.Group>
             <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Description for Certificate</Form.Label>
              <Form.Control type="text"
              value={description||''}
              placeholder="Enter Your Certificate Name" onChange={(e)=>setDescription(e.target.value)}/>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Date of Submition</Form.Label>
              <Form.Control type="date"  
              value={date||''}
              onChange={(e)=>setDate(e.target.value)} />
            </Form.Group>

            <Form.Group as={Col} className="mb-3" controlId="formGridAddress1">
              <Form.Label>Submit your File</Form.Label>
              <Form.Control type="file" onChange={selectfile}/>
            </Form.Group>


            <div style={{display:'flex',justifyContent:'center'}}>
            <Button
            className='card-hover-animate'
            style={{backgroundColor:them?'#FFB347':'#5B3CC4'}} type="submit"  onClick={postdata}>
              Submit
            </Button>
            </div>
          </Form>
      
       
      </div>
    </div>
  );
};

export default Editstudentfile;
