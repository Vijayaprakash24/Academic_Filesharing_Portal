import Button from 'react-bootstrap/esm/Button';
import React, { use, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Image from 'react-bootstrap/Image'
import './Studenthomepage.css'
import { MdLightMode, MdDarkMode } from 'react-icons/md';
import Card from 'react-bootstrap/Card';
import { FaPlus } from "react-icons/fa";
import { useNavigate, useParams } from 'react-router-dom';
import { ImArrowLeft2 } from "react-icons/im";
import { Row, Col } from 'react-bootstrap';
import { useEffect } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form'
import downloadimg from './download.jpg'
import img from '../../../img.png'

const Studenthomepage = () => {

  const studentapi="https://academic-fileshare-portal-server.onrender.com/student";
  const facultyapi="https://academic-fileshare-portal-server.onrender.com/faculty";
  const [list,setList]=useState([])
  const [value,setValue]=useState([])

  const [select,setSelect]=useState("certificates")
  const [certbutton,setCertbutton]=useState(true)
  const [sembutton,setSembutton]=useState(false)
  const [notesbut,setNotesbut]=useState(false)
  const [yournotes,setYournotes]=useState(false)

const {id,thempars}=useParams()
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

const [noteslist,setNoteslist]=useState([])

const [facultynotes,setFacultynotes]=useState([])

const num=[1,2,3,4,5,6,7,8,9,9]

 const [marks, setMarks] = useState([]);
const [sem,setSem]=useState()

const [sem1,setSem1]=useState()
const [sem2,setSem2]=useState([])

const [fanotes1,setFanotes1]=useState([])
const [final,setFinal]=useState([])

const mark1=(sem)=>{
 
  const result=noteslist.flatMap((x)=>
    x.notes.filter((y)=>y.sem===sem))
  if(result.length>0){
 
  setFinal(result)
 }
  else{
    alert("Sem mark not submited  from you")
  }
}

const mark2=(sem)=>{
 
  const result=facultynotes.filter((y)=>y.name===sem)
  if(result.length>0){
  
  setFanotes1(result)
  }
  else{
    alert("Does't notes are get from faculty.")
  }
}

  const mark=async(selectedSemester) => {
    

      try {
        
      
        const res = await axios.get(`${studentapi}/${id}/semester/${selectedSemester}`);
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
        await axios.delete(`${studentapi}/${id}/semester/${sem}`)
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
      setList(res.data);


      const facultydata=await axios.get(facultyapi);
      const valu=facultydata.data?.flatMap(x => x.notes || []);
   


    const val = res.data.find((x) => x._id === id);
  

if (!val) {
  console.error("Student not found for ID:", id);
  return;
}

setValue(val);


const findval = valu.filter((x) => 
  x.classname === val.classname &&
  x.stdyear === val.year &&
  x.department === val.department
);


setFacultynotes(findval);



      const notes=await axios.get(`${studentapi}/notes`,{ params:{classname:val.classname,faculty:val.advisor,department:val.department}})
   
      setNoteslist(notes.data)
     
      
    }catch(err){
      console.error("Error while fetching.",err)
    }
  }; fetchdata();
},[studentapi])



const handndledelete=async(e,x)=>{
   e.preventDefault();
  try{
       await axios.delete(`${studentapi}/${id}/certificate/${x}`)
   
       alert("Certificate deleted sucessfully.")
       setValue((prev) => ({
      ...prev,
      certificate: prev.certificate.filter((cert) => cert._id !== x)
    }));
    navigate(`/studentfrontpage/${id}/true`)
  }catch(err){
    console.log("Error in certificate Deletion.")
  }
}

const handndledeletenotes=async(e,x)=>{
   e.preventDefault();
  try{
       await axios.delete(`${studentapi}/${id}/notes/${x}`)
   
       alert("Certificate deleted sucessfully.")
       setValue((prev) => ({
      ...prev,
      notes: prev.notes.filter((cert) => cert._id !== x)
    }));
  }catch(err){
    console.log("Error in certificate Deletion.")
  }
} 

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
 <div className={`upload-backgroundst ${them ? 'theme-light1' : 'theme-dark1'}`}>

    
       <div className='bit' style={{borderBottomStyle:'solid',borderBlockColor:them?'#FFFFE0':'#FFA500'}}>
           <Navbar className="navbar-fade" expand="lg" style={{marginBottom:'10px',paddingTop:'10px',paddingRight:'30%' }}>
        <Container>
           <Image src={img}
                      
                      width={70}
                      height={70}
                      ></Image>
          <Navbar.Brand 
          onClick={()=>{
            navigate('/studentfrontpage')
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
             
             :<Button style={{backgroundColor:butncolor,color:color1,}} className='theam' onClick={()=>{
      setThem(!them)
     setColor1('white')
     setNavcolor(' #2d2c2e ')
     setButcolor('#FAFA33')
     setDark(' #2d2c2e ')
}}


><MdLightMode/></Button>}
             
              <Nav.Link 
               onMouseEnter={() => setIsHovered1(true)}
               onMouseLeave={() => setIsHovered1(false)}
              style={{ color: isHovered1
               ? 'red' : 'white' }} onClick={(e)=>{
               
                navigate('/studentfrontpage')
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
  height={47}
/> <NavDropdown title={value.name} >
               <NavDropdown.Item onClick={(e)=>navigate(`/edit/${true}/${id}`)}>view Profile</NavDropdown.Item>
              <NavDropdown.Item onClick={(e)=>navigate(`/edit/${true}/${id}`)}>
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
<div style={{ position: 'absolute',paddingLeft:'90%',paddingTop:'1%' }}>
  <button 
  onClick={(e)=>{
    e.preventDefault();
    navigate(`/studentfileupload/${them}/${id}`)
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
    <FaPlus />
  </button>
</div>

<div style={{ position: 'absolute',paddingLeft:'1%',paddingTop:'20%' }}>
  <button 
  onClick={(e)=>{
    e.preventDefault();
    navigate('/')
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
        setSelect("certificates")
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
        setSelect("marks")
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

    <Button className="card-hover-animate card-animate"
      onClick={() => {
       setCertbutton(false);
        setSembutton(false);
        setNotesbut(true)
        setSelect("notes")
      }}
      style={{
        backgroundColor: select==="notes" ? 'blue' : 'yellow',
        color: 'white',
        userSelect: 'none',
        border: 'none',
        padding: '10px 20px',
        fontWeight: 'bold',
        borderRadius: '6px',
      }}
    >
      Notes by each Semesters
    </Button> <Button className="card-hover-animate card-animate"
      onClick={() => {
       setCertbutton(false);
        setSembutton(false);
        setNotesbut(false)
        setYournotes(true)
        setSelect("note")
      }}
      style={{
        backgroundColor: select==="note" ? 'blue' : 'yellow',
        color: 'white',
        userSelect: 'none',
        border: 'none',
        padding: '10px 20px',
        fontWeight: 'bold',
        borderRadius: '6px',
      }}
    >
      Notes posted by me
    </Button>

     <Button className="card-hover-animate card-animate"
      onClick={() => {
       setCertbutton(false);
        setSembutton(false);
        setNotesbut(false)
        setYournotes(false)
        setSelect("fanote")
      
        
      }}
      style={{
        backgroundColor: select==="fanote" ? 'blue' : 'yellow',
        color: 'white',
        userSelect: 'none',
        border: 'none',
        padding: '10px 20px',
        fontWeight: 'bold',
        borderRadius: '6px',
      }}
    >
      Notes are Posted by Faculty
    </Button>

  </div>


  <div  style={{display:'flex'}}>
  {select==="certificates"&& certbutton && (
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
             
             
            }}
          >
            <Button
            className='car2'
              style={{
                backgroundColor: them ? '#e02b13ff' : '#2d2c2e',
                border: 'none',
               
              }}

              onClick={(e)=>navigate(`/editstudentfile1/${id}/${them}/${x._id}`)}
            >
              Edit
            </Button>
            <Button className='car2'
              style={{
                backgroundColor: them ? 'red' : '#2d2c2e',
                border: 'none',
               
              }}
              onClick={(e) => handndledelete(e, x._id)}
            >
              Delete
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  ))}
</Row>

  )}

 
  {select==='marks' &&sembutton && marks && (
  
  <Container className="mt-4  card-animate" style={{ backgroundColor: them ? 'white' : '#5B3CC4',
          color: them ? 'black' : 'white',borderRadius:"20px"}} >
   
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

    <Card className="mb-3" style={{ backgroundColor: them ? 'white' : '#5B3CC4',
          color: them ? 'black' : 'white'}}>
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
    <div style={{display:'flex',justifyContent:'center',paddingBottom:'10px'}}>
    <Button className="card-hover-animate card-animate car2" onClick={(e)=>deletesem(sem)}>Delete</Button>
    </div>
  </Container>
  
)}

{select === "notes" && (
 
  <Row className="g-4 card-animate" style={{ width: "95%" }}>
     <Form style={{ backgroundColor: them ? 'white' : '#5B3CC4',
          color: them ? 'black' : 'white',borderRadius:"20px",paddingTop:"20px",paddingBottom:"20px"}}>
   <Form.Label>Select the Semester Mark to get</Form.Label>
             <Form.Select
  defaultValue=""
  onChange={(e) => {
    const selectedSemester = e.target.value;
   
    mark1(selectedSemester);
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
</Form>
    
      {final?.map((note, idx) => (

        <Col key={`${idx}-${idx}`} sm={12} md={4} lg={3}>
          <Card className="card-hover-animate card-animate"
            style={{
              backgroundColor: them ? "white" : "#5B3CC4",
              color: them ? "black" : "white",
              border: "none",
              borderRadius: "12px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Card.Img
              variant="top"
              src={note.file||downloadimg}
              alt="Card image"
              style={{
                objectFit: "cover",
                width: "100%",
                height: "200px",
                padding: "5px",
                borderTopLeftRadius: "12px",
                borderTopRightRadius: "12px",
              }}
              onError={(e) => (e.target.src = downloadimg)}
            />

            <Card.Body
              style={{
                flex: "4 4 auto",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                
                <Card.Title>{note.sem}</Card.Title>
                <Card.Text>{note.subject}</Card.Text>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  alignItems: "center",
                }}
              >
             
                <Button className="card-hover-animate card-animate car2"
                  style={{
                    backgroundColor: them ? "#007bff" : "#2d2c2e",
                    border: "none",
                  }}
                  onClick={(e) => handndledownload(note.subject, note.file)}
                >
                  Download
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))
    }
  </Row>
)}




  {select==="note"&& (
    <Row className="g-4" style={{width:"95%"}}>
  {value?.notes?.map((x, index) => (
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
          src={x.file || downloadimg}
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
            <Card.Title>{x.sem}</Card.Title>
            <Card.Text>{x.subject}</Card.Text>
          </div>
          
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              alignItems: 'center',
             
             
             
            }}
          >

            <Button className=" card-animate car2"
              style={{
                backgroundColor: them ? 'red' : '#2d2c2e',
                border: 'none',
               
              }}
              onClick={(e) => handndledeletenotes(e, x._id)}
            >
              Delete
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  ))}
</Row>

  )}


{select === "fanote" && (
 
  <Row className="g-4 card-animate" style={{ width: "95%" }}>
    <Form style={{ backgroundColor: them ? 'white' : '#5B3CC4',
          color: them ? 'black' : 'white',borderRadius:"20px",paddingTop:"20px",paddingBottom:"20px"}}>
   <Form.Label>Select the Semester Mark to get</Form.Label>
             <Form.Select
  defaultValue=""
  onChange={(e) => {
    const selectedSemester = e.target.value;
    setSem2(selectedSemester);
    mark2(selectedSemester);
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
</Form>
    
      {fanotes1?.map((note, idx) => (

        <Col key={`${idx}-${idx}`} sm={12} md={4} lg={3}>
          <Card className="card-hover-animate card-animate"
            style={{
              backgroundColor: them ? "white" : "#5B3CC4",
              color: them ? "black" : "white",
              border: "none",
              borderRadius: "12px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Card.Img
              variant="top"
              src={downloadimg}
              alt="Card image"
              style={{
                objectFit: "cover",
                width: "100%",
                height: "200px",
                padding: "5px",
                borderTopLeftRadius: "12px",
                borderTopRightRadius: "12px",
              }}
              onError={(e) => (e.target.src = downloadimg)}
            />

            <Card.Body
              style={{
                flex: "4 4 auto",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
              
                <Card.Title>{note.name}</Card.Title>
                <Card.Text>{note.subject}</Card.Text>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  alignItems: "center",
                }}
              >
                <Button className="card-hover-animate card-animate car2"
                  style={{
                    backgroundColor: them ? "#007bff" : "#2d2c2e",
                    border: "none",
                  }}   onClick={()=>handndledownload(note.subject,note.file)}
                
                >
                  Download
                </Button>
                
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))
    }
  </Row>
)}




</div>

</div>
</div>
    

  );
}


export default Studenthomepage