import Button from 'react-bootstrap/esm/Button';
import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './facultyhomepage.css'
import { MdLightMode, MdDarkMode } from 'react-icons/md';
import Card from 'react-bootstrap/Card';
import { FaPlus } from "react-icons/fa";
import { useNavigate, useParams } from 'react-router-dom';
import Image from 'react-bootstrap/esm/Image';
import { ImArrowLeft2 } from "react-icons/im";
import {Row,Col} from 'react-bootstrap'
import InputGroupText from 'react-bootstrap/esm/InputGroupText';
import axios from 'axios';
import Form from 'react-bootstrap/Form'
import Offcanvas from 'react-bootstrap/Offcanvas';
import downloadimg from './download.jpg'
import img from '../../../img.png'

const Facultyhomepage = () => {
const {thempars,id}=useParams();
const facultyapi="https://academic-fileshare-portal-server.onrender.com/faculty"
const studentapi="https://academic-fileshare-portal-server.onrender.com/student"
const navigate=useNavigate()



 const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

        const [select,setSelect]=useState("students")
        const [totstd,setTotstd]=useState(true)
        const [sembutton,setSembutton]=useState(false)
        const [notesbut,setNotesbut]=useState(false)
        const [totgrade,setTotgrade]=useState(false)
        

const [color1,setColor1]=useState('white')
const [them,setThem]=useState(thempars==='true')
const [navcolor,setNavcolor]=useState(' #2d2c2e ')
const [butncolor,setButcolor]=useState('#FAFA33');
const [dark,setDark]=useState(' #2d2c2e ')
const [isHovered1, setIsHovered1] = useState(false);
const [isHovered2, setIsHovered2] = useState(false);
const [isHovered3, setIsHovered3] = useState(false);


const [val,setVal]=useState([])
const [std,setStd]=useState([])
const [mark,setMark]=useState([])
const [marks,setMarks]=useState()
const [data,setData]=useState([])

const [studentdetails,setStudentdetails]=useState([])


const [noteyear,setNoteyear]=useState('')
const [notsem,setNotesem]=useState('')
  const [sub,setSub]=useState('')
  const [cla,setCla]=useState()
  const [notedept,setNotedept]=useState()
  const [fil,setFil]=useState('')

useEffect(()=>{
  const fetchdata=async()=>{
    try{
      const res=await axios.get(facultyapi);
      
      const val=res.data.find((x)=>x._id===id)
      setVal(val)
   

      const stdi=await axios.get(studentapi)
     
      
  const det=[...new Set(stdi.data?.flatMap((x)=>x.year?[x.year]:[])??[])]

   setStudentdetails(det)

      const st=await axios.get(`${facultyapi}/${val.facultyname}/${val.facultydepartment}`)
    
      setStd(st.data)
    }catch(err){
      console.log("Error in fetching There is no students details",err)
    }
  };fetchdata();
},[facultyapi])

const fetchmark=async()=>{

  const res=await axios.get(`${facultyapi}/mark/${marks}/${val.facultyname}`)
  setMark(res.data)


}



const fetchstudentmarks = () => {
  const sem = notsem

  const result = std
    .map((student) => {
      const match = student.semester?.find((x) => x.semester === sem);
      return match ? { regno: student.regno, semester: match } : null;
    })
    .filter((x) => x !== null);

 
  setData(result); 

};


const subjectMap = new Map();

data.forEach((student) => {
  student.semester?.subjects?.forEach((sub) => {
    const normalized = sub.subjectname.toLowerCase();
    if (!subjectMap.has(normalized)) {
      subjectMap.set(normalized, sub.subjectname);
    }
  });
});

const allSubjects = Array.from(subjectMap.values());


const notessubmit=()=>{
  const data={name:notsem,
    stdyear:noteyear,
    subject:sub,
    department:notedept,
    classname:cla,
    file:fil}
    try{
  const list =axios.post(`${facultyapi}/notes/${id}`,data)
   alert("Updated sucessfully")
    }catch(err){
      alert(err)
    }
}


const fileupload=()=>{
  const file=e.target.files[0];
  try{
    if(file){
    const filerender=new FileReader(file);
    filerender.onload=function(e){
            const base64=e.target.result;
            setResult(base64)
            
          }
          render.readAsDataURL(file)
       
        }
  }catch(err){
    console.log("Error while uploading file:",err)
  }
}


const handndledeletenotes=async(e,x)=>{
   e.preventDefault();
  try{
  
       await axios.delete(`${facultyapi}/${id}/notes/${x}`)
   
       alert("Certificate deleted sucessfully.")
       setVal((prev) => ({
      ...prev,
      notes: prev.notes.filter((cert) => cert._id !== x)
    }));
  }catch(err){
    console.log("Error in certificate Deletion.")
  }
} 






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
                navigate('/facultyhomepage')
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
/> <NavDropdown title={val.facultyname} >
               <NavDropdown.Item onClick={(e)=>navigate(`/edit/${false}/${id}`)}>view Profile</NavDropdown.Item>
              <NavDropdown.Item onClick={(e)=>navigate(`/edit/${false}/${id}`)}>
                Edit your Profile
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={(e)=>navigate('/')}>
               Log Out
              </NavDropdown.Item>
               <NavDropdown.Item onClick={(e)=>{
                              axios.delete(`${facultyapi}/${id}`)
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
          e.preventDefault();
          navigate('/')
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

<div style={{ paddingTop:'7%'

 }}>
  <div style={{ display: 'flex', justifyContent: 'center', gap: '16px'}}>
    <Button variant="primary" onClick={handleShow}>
        Launch
      </Button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
  <div
    style={{
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection:'column',
      gap: '20px',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '10px 0',
    }}
  >
    <p
      onClick={() => {
        setTotstd(true);
        setSelect("students");
      }}
      style={{
        cursor: 'pointer',
        fontWeight: select === "students" ? 'bold' : 'normal',
        color: select === "students" ? 'blue' : 'black',
        margin: 0,
      }}
    >
      Total Students
    </p>

    <p
      onClick={() => {
        setTotstd(false);
        setSembutton(true);
        setSelect("sem");
      }}
      style={{
        cursor: 'pointer',
        fontWeight: select === "sem" ? 'bold' : 'normal',
        color: select === "sem" ? 'blue' : 'black',
        margin: 0,
      }}
    >
      Semester Marks
    </p>

    <p
      onClick={() => {
        setTotstd(false);
        setSembutton(false);
        setTotgrade(true);
        setSelect("grade");
      }}
      style={{
        cursor: 'pointer',
        fontWeight: select === "grade" ? 'bold' : 'normal',
        color: select === "grade" ? 'blue' : 'black',
        margin: 0,
      }}
    >
      Notes by Semester
    </p>

    <p
      onClick={() => {
        setTotstd(false);
        setSembutton(false);
        setTotgrade(false);
        setNotesbut(true);
        setSelect("note");
      }}
      style={{
        cursor: 'pointer',
        fontWeight: select === "note" ? 'bold' : 'normal',
        color: select === "note" ? 'blue' : 'black',
        margin: 0,
      }}
    >
      Notes to Submiton
    </p>

    <p
      onClick={() => {
        setTotstd(false);
        setSembutton(false);
        setTotgrade(false);
        setNotesbut(false);
        setSelect("fanote");
      }}
      style={{
        cursor: 'pointer',
        fontWeight: select === "fanote" ? 'bold' : 'normal',
        color: select === "fanote" ? 'blue' : 'black',
        margin: 0,
      }}
    >
      Faculty Notes
    </p>
  </div>
</Offcanvas.Body>

      </Offcanvas>
   
   
   
  </div>

    
   
     <div style={{display:'flex',justifyContent:'center',paddingLeft:'15%',paddingRight:'15%'}}>
      {select=='students'&&(
      <Row className="g-4" style={{minWidth:'20%'}}>
  {std.map((x, index) => (
    <Col key={index} sm={12} md={4} lg={3}>
      
      
      <Card  className="card-hover-animate card-animate"
        style={{
          backgroundColor: them ? 'white' : '#5B3CC4',
          color: them ? 'black' : 'white',
          border: 'none',borderRadius: '12px',boxShadow: '0 4px 8px rgba(0,0,0,0.1)',minHeight:'100%'
        }}
      >
        <Card.Img
          variant="top"
          src="https://static.thenounproject.com/png/209914-200.png"
          alt="Card image"
          style={{  height:'50%',width: '100%' }}
        />
        <Card.Body>
          <Card.Title>{x.regno}</Card.Title>
           <Card.Title>{x.name}</Card.Title>
         
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              alignItems: 'center',
            }}
          >
            <Button  className="button-animate car2" 
            onClick={(e)=>navigate(`/eachstudentdetail/${x._id}/${them}/${id}`)}
              style={{
                backgroundColor: them ? '#007bff' : '#2d2c2e',
                border: 'none',
                
              }}
            >
              view
            </Button>
           
          </div>
        </Card.Body>
      </Card>
    </Col>
  ))}
</Row>
  )}
</div>
   
  {select=='sem'&&(
  <Container className="mt-4 card-animate">
  
    <h2 className="text-center mb-4">Semester Marks</h2>
    <Form.Label>Select the Semester Mark to get</Form.Label>
             <Form.Select
  defaultValue=""
  onChange={(e) => {
    const selectedSemester = e.target.value;

     setMarks(selectedSemester);
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
    <Card className="mb-3 ">
      <Card.Header style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
        Semester: {marks}
      </Card.Header>
     {(() => {
  const mergedMarks = {};

  mark?.forEach((entry) => {
    const key = entry.subject.toLowerCase();
    if (!mergedMarks[key]) {
      mergedMarks[key] = {
        subject: entry.subject, 
        grades: [...entry.grades],
      };
    } else {
      entry.grades.forEach((g) => {
        const existing = mergedMarks[key].grades.find((x) => x.grade === g.grade);
        if (existing) {
          existing.count += g.count;
        } else {
          mergedMarks[key].grades.push({ ...g });
        }
      });
    }
  });

  const normalizedMarkList = Object.values(mergedMarks);

  return normalizedMarkList.map((sub, subIndex) => (
    <Card.Body key={subIndex}>
      <Row>
        <Col sm={6} md={4}>
          <Card className="mb-2" bg="light">
            <Card.Body>
              <strong>Subject: {sub.subject}</strong><br />
              {sub.grades?.map((x, index) => (
                <div key={index}>
                  {x.grade} {x.count}
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Card.Body>
  ));
})()}
    </Card>
   <div style={{display:'flex',justifyContent:'center'}}>
    <Button style={{backgroundColor:'red'}}
    className='car2'
    onClick={(e)=>fetchmark()}>Get Mark</Button>
     </div>
  </Container>
   )}


{select==='grade'&&(
  <div className='card-animate'>
    <div style={{paddingRight:'20%',paddingLeft:'20%',display:'flex',justifyContent:'center'}}>
    <Form.Select onChange={(e) => setNotesem(e.target.value)}>
          <option>Select Semester</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
        </Form.Select>
        </div>
<Container className="mt-5">
  {data?.length > 0 && (
    <>
      <h3 className="text-center">Semester {notsem} Marks</h3>
      <table className="table table-bordered table-striped mt-3 card-animate">
        <thead>
          <tr>
        <th>Reg No</th>
{(() => {
  const subjectMap = new Map();

  data.forEach((x) => {
    x.semester?.subjects?.forEach((s) => {
      const lower = s.subjectname.toLowerCase();
      if (!subjectMap.has(lower)) {
        subjectMap.set(lower, s.subjectname); 
      }
    });
  });

  return Array.from(subjectMap.values()).map((s, index) => (
    <th key={index}>{s}</th>
  ));
})()}

      </tr>
      </thead>
      <tbody>
        {data.map((item, rowIndex) => {
          const subjectMap = {};
          item.semester?.subjects?.forEach((sub) => {
            subjectMap[sub.subjectname] = sub.grade;
          });

          return (
            <tr key={rowIndex}>
              <td>{item.regno}</td>
              {allSubjects.map((subject, colIndex) => {
  const normalized = subject.toLowerCase();
  const actualGrade = Object.entries(subjectMap).find(
    ([key]) => key.toLowerCase() === normalized
  );
  return (
    <td key={colIndex}>
      {actualGrade ? actualGrade[1] : "-"}
    </td>
  );
})}

            </tr>
          );
        })}
      </tbody>
    </table>
    </>
  )}
</Container>
<div style={{display:'flex',justifyContent:'center'}}>

<Button
style={{backgroundColor:'red'}}
className='car1'
onClick={()=>fetchstudentmarks()}>click</Button>
</div>
</div>
)}



{select==='note'&&(
<div style={{display:'flex',justifyContent:'center'}} className='card-animate'>
<Form style={{paddingRight:'20%',backgroundColor:'red',padding:'5%'}}>
  <div style={{display:'flex',justifyContent:'center'}}>
  <h5 >Notes form</h5>
  </div>
   <Form.Group as={Col} controlId="note-sem">
        <Form.Label>Semester</Form.Label>
        <Form.Select onChange={(e) => setNotesem(e.target.value)}>
          <option>Select Semester</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
        </Form.Select>
      </Form.Group>
      <Form.Label>Select the Semester Mark to get</Form.Label>
             <Form.Select
  defaultValue=""
  onChange={(e) => {
    const selectedSemester = e.target.value;

     setNotedept(selectedSemester);
     alert(selectedSemester)
  }}
>
  <option disabled value="">Select the Semester</option>
   <option>choose an option</option>
                   <option>CSE</option>
                  <option>AIML</option>
                  <option>IT</option>
                  <option>MECH</option>
                  <option>BIOMEDICL</option>
                  <option>CHEMICAL</option>
</Form.Select>
       <Form.Group as={Col} controlId="note-sem">
        <Form.Label>Semester</Form.Label>
        <Form.Select onChange={(e) => setNoteyear(e.target.value)}>
          <option>Select Semester</option>
          {studentdetails.map((x,index)=>
          <option key={index}>{x}</option>
          )}
              
             
        </Form.Select>
      </Form.Group>

  <Form.Group as={Col} controlId="note-subject">
        <Form.Label>Class to submit the Notes</Form.Label>
        <Form.Control type="text" placeholder="Enter subject name" onChange={(e) => setCla
          (e.target.value)} />
      </Form.Group>

      <Form.Group as={Col} controlId="note-subject">
        <Form.Label>Subject Name</Form.Label>
        <Form.Control type="text" placeholder="Enter subject name" onChange={(e) => setSub
          (e.target.value)} />
      </Form.Group>
      
      <Form.Group as={Col} className="mb-3" controlId="formGridNotes">
        <Form.Label>Upload Notes File</Form.Label>
        <Form.Control type="file" onChange={fileupload} />
      </Form.Group>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button 
        className='car1'
        style={{ backgroundColor: them ? '#FFB347' : '#5B3CC4' }} type="submit" onClick={notessubmit}  >
          Submit Notes
        </Button>
      </div>
 
  
  </Form>

</div>
)}

  {select==="fanote"&& (
    <Row className="g-4" style={{width:"95%"}}>
  {val?.notes?.map((x, index) => (
    <Col key={index} sm={12} md={4} lg={3} >
      <Card className="card-hover-animate card-animate"
        style={{
          backgroundColor: them ? 'white' : '#5B3CC4',
          color: them ? 'black' : 'white',
          border: 'none',
          borderRadius: '12px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)', 
          display: 'flex',
          gap:'100%',
          minHeight:'100%',
          flexDirection: 'column',
        }}
      >
        <Card.Img
          variant="top"
          src={x.file||downloadimg}
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
        <Card.Body style={{ flex: '4 4 auto', display: 'flex', flexDirection: 'column' }}>
          <div>
            <Card.Title>Semester: {x.name}</Card.Title>
            <Card.Title>{x.department}/Sec: {x.classname}</Card.Title>
            <Card.Text>Subject Name with Description: {x.subject}</Card.Text>
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
                backgroundColor: them ? '#007bff' : '#2d2c2e',
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
    </div>
    
    
</div>

  );
}


export default Facultyhomepage