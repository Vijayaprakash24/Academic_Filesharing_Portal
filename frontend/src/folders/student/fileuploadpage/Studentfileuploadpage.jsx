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

const Studentfileuploadpage = () => {
  const { thempars,id } = useParams();
 
  const studentapi="http://localhost:7841/student";

  const [state, setState] = useState(true);
  const [formType, setFormType] = useState('certificate');
 const [value,setValue]=useState([])
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

  const [sempaper, setSempaper] = useState('');
  const [subjects, setSubjects] = useState([]); 
  const [sem,setSem]=useState('')

  const [notsem,setNotesem]=useState('')
  const [sub,setSub]=useState('')
  const [fil,setFil]=useState('')


  const postdata=async(e)=>{
e.preventDefault();
     const certificatesubmition={
        title:certificatename,
    date:date,
    description:description,
    certificate:result,

     }
     alert(`${studentapi}/certificate/${id}`)
      
    try{
    const datas=await axios.post(`${studentapi}/certificate/${id}`,certificatesubmition)
     navigate(`/studentfrontpage/${id}/${them}`)
    }
  catch(err){
    console.error("Error  posting certificate:",err);
    alert("Failed to add certificate");
  }
}

useEffect(()=>{
  const fetchdata=async()=>{
    try{
      const res=await axios.get(studentapi);
       const val = res.data.find((x) => x._id === id);
       setValue(val)
  
     }catch(err){
      console.error("Error while fetching.",err)
    }
  }; fetchdata();
},[studentapi])

 const postnotes=async(e)=>{
e.preventDefault();
     const note={
        sem:notsem,
    
    subject:sub,
    file:result,

     }
     alert(`${studentapi}/certificate/${id}`)
    
    try{
    const datas=await axios.post(`${studentapi}/notes/${id}`,note)
 
     navigate(`/studentfrontpage/${id}/${them}`)
    }
  catch(err){
    console.error("Error  posting certificate:",err);
    alert("Failed to add certificate");
  }
}



  const handleSempaperChange = (e) => {
    const value = parseInt(e.target.value, 10) || 0;
    setSempaper(value);
   const emptySubjects = Array.from({ length: value }, () => ({ subjectname: '', grade: '' }));
   setSubjects(emptySubjects);
  };

  const handleSubjectChange = (index, field, value) => {
    
    const updated = [...subjects];
    updated[index][field] = value;
    setSubjects(updated);
  };
  const semestersubmit = async () => {
    
  try {
    const res = await axios.post(`${studentapi}/${id}/mark`, {
      semester: sem,  
      subjects: subjects
    });
    alert("Marks saved successfully!");
     navigate(`/studentfrontpage/${id}/${them}`)
  } catch (error) {
    console.error(error);
    alert("Error saving marks");
  }
};


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
/> <NavDropdown title={value.name}>
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

<div style={{ position: 'absolute',paddingLeft:'1%',paddingTop:'20%' }}
>
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


      <div className="uploaddiv  card-animate" style={{ paddingTop:'3%'}} >
      <div style={{display:'flex'}}>
      <h5  style={{color:them?'black':'white'}}><b>Student file Upload</b></h5>
      </div>
        
          
         <Form className="uploadform" style={{ borderColor: them ? '#FFB347' : '#4B32B5', borderRadius: '20px' }} onSubmit={postdata}>
  <div className="divclass">
    <Button className="card-hover-animate card-animate"
      style={{
        backgroundColor: formType === 'certificate' ? (them ? '#FFB347' : '#4B32B5') : 'transparent',
        color: formType === 'certificate' ? 'white' : (them ? '#FFB347' : '#5B3CC4'),
        padding: '20px',
        border: 'none'
      }}
      onClick={() => setFormType('certificate')}
      type="button"
    >
      <b>Certificate Submission</b>
    </Button>

    <Button className="card-hover-animate card-animate"
      style={{
        backgroundColor: formType === 'semester' ? (them ? '#FFB347' : '#4B32B5') : 'transparent',
        color: formType === 'semester' ? 'white' : (them ? '#FFB347' : '#5B3CC4'),
        padding: '20px',
        border: 'none'
      }}
      onClick={() => setFormType('semester')}
      type="button"
    >
      <b>Semester Mark Submission</b>
    </Button>

    <Button className="card-hover-animate card-animate"
      style={{
        backgroundColor: formType === 'notes' ? (them ? '#FFB347' : '#4B32B5') : 'transparent',
        color: formType === 'notes' ? 'white' : (them ? '#FFB347' : '#5B3CC4'),
        padding: '20px',
        border: 'none'
      }}
      onClick={() => setFormType('notes')}
      type="button"
    >
      <b>Notes Submission</b>
    </Button>
  </div>

  {/* Certificate Form */}
  {formType === 'certificate' && (
    <div className="card-animate">
      <Form.Group as={Col} controlId="formGridEmail">
        <Form.Label>Certificate Name with Reg.No</Form.Label>
        <Form.Control type="text" placeholder="Enter Your Certificate Name with Reg.No" onChange={(e) => setCertificatename(e.target.value)} />
      </Form.Group>
      <Form.Group as={Col} controlId="formGridDescription">
        <Form.Label>Description for Certificate</Form.Label>
        <Form.Control type="text" placeholder="Enter Description" onChange={(e) => setDescription(e.target.value)} />
      </Form.Group>
      <Form.Group as={Col} controlId="formGridDate">
        <Form.Label>Date of Submission</Form.Label>
        <Form.Control type="date" onChange={(e) => setDate(e.target.value)} />
      </Form.Group>
      <Form.Group as={Col} className="mb-3" controlId="formGridFile">
        <Form.Label>Submit your File</Form.Label>
        <Form.Control type="file" onChange={selectfile} />
      </Form.Group>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button className="card-hover-animate card-animate"
        style={{ backgroundColor: them ? '#FFB347' : '#5B3CC4' }} type="submit">
          Submit
        </Button>
      </div>
    </div>
  )}

  {/* Semester Mark Submission */}
  {formType === 'semester' && (
    <div className=" card-animate">
      <Form.Group as={Col} controlId="semesterSelect" >
        <Form.Label>Select the Semester</Form.Label>
        <Form.Select onChange={(e) => setSem(e.target.value)}>
          <option>Select</option>
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
      <Form.Group as={Col} controlId="paperCount">
        <Form.Label>Number of Papers</Form.Label>
        <Form.Control type="number" placeholder="No. of papers" onChange={handleSempaperChange} />
      </Form.Group>
      {subjects.map((subject, index) => (
        <div key={index}>
          <Form.Group className="mb-3" controlId={`subject-${index}`}>
            <Form.Label>Subject Name {index + 1}</Form.Label>
            <Form.Control
              placeholder="Subject Name"
              value={subject.subjectname}
              onChange={(e) => handleSubjectChange(index, 'subjectname', e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId={`grade-${index}`}>
            <Form.Label>Grade {index + 1}</Form.Label>
            <Form.Select onChange={(e) => handleSubjectChange(index, 'grade', e.target.value)}>
              <option>Select Grade</option>
              <option>O</option>
              <option>A+</option>
              <option>A</option>
              <option>B+</option>
              <option>B</option>
              <option>C</option>
              <option>RA</option>
            </Form.Select>
          </Form.Group>
        </div>
      ))}<br></br>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button 
        className="card-hover-animate card-animate"
        style={{ backgroundColor: them ? '#FFB347' : '#5B3CC4' }} type="button" onClick={semestersubmit}>
          Submit
        </Button>
      </div>
    </div>
  )}

  {/* Notes Submission */}
  {formType === 'notes' && (
    <div className="card-animate">
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
      <Form.Group as={Col} controlId="note-subject">
        <Form.Label>Subject Name</Form.Label>
        <Form.Control type="text" placeholder="Enter subject name" onChange={(e) => setSub
          (e.target.value)} />
      </Form.Group>
      <Form.Group as={Col} className="mb-3" controlId="formGridNotes">
        <Form.Label>Upload Notes File</Form.Label>
        <Form.Control type="file" onChange={selectfile} />
      </Form.Group>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button 
        className="card-hover-animate card-animate"
        style={{ backgroundColor: them ? '#FFB347' : '#5B3CC4' }} type="submit"   onClick={postnotes}>
          Submit Notes
        </Button>
      </div>
    </div>
  )}
</Form>

        
      </div>
    </div>
  );
};

export default Studentfileuploadpage;
