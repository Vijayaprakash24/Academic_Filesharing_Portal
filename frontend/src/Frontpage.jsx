import Button from 'react-bootstrap/esm/Button';
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown'
import { MdLightMode, MdDarkMode } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import './frontpage.css'
import Image from 'react-bootstrap/esm/Image';
import { ImArrowLeft2 } from "react-icons/im";
import { useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import img from'./img.png'

import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { motion } from 'framer-motion';



const Frontpage = () => {
  const thempars  = true


const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 }
};


  const navigate = useNavigate();
  const [color1, setColor1] = useState('white');
  const [them, setThem] = useState('true');
  const [isHovered9, setIsHovered9] = useState(false);
  const [isHovere8, setIsHovere8] = useState(false);
  const [isHovere7, setIsHovere7] = useState(false);
  const [isHovere6, setIsHovere6] = useState(false);
  const [isHovere5, setIsHovere5] = useState(false);
  const [isHovere4, setIsHovere4] = useState(false);
  const [isHovere3, setIsHovere3] = useState(false);
  const [isHovere2, setIsHovere2] = useState(false);
  const [isHovere1, setIsHovere1] = useState(false);

const [isHovered1, setIsHovered1] = useState(false);
const [isHovered2, setIsHovered2] = useState(false);
const [isHovered3, setIsHovered3] = useState(false);



  return (
    <div >

      <div className="bit">
        
        <Navbar className="navbar-fade" 
 expand="lg" style={{  backgroundColor:them?'#4B32B5':'#141619', paddingTop: '10px', paddingRight: '20%' }}>
          <Container>
            <Image src={img}
            
            width={70}
            height={70}
            ></Image>
            <Navbar.Brand
              onClick={() => {
                navigate('/');
              }}
              style={{ color: them ? color1 : 'white', cursor: 'pointer',paddingLeft:"20px" }}
            >
              File Sharing Portal
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
                navigate('/studentfrontpage')
               }}>Home</Nav.Link>
              <Nav.Link onMouseEnter={() => setIsHovered2(true)}
               onMouseLeave={() => setIsHovered2(false)}
              style={{ color: isHovered2 ? 'red' : 'white' }}>About</Nav.Link>
               <Nav.Link onMouseEnter={() => setIsHovered3(true)}
               onMouseLeave={() => setIsHovered3(false)}
              style={{ color: isHovered3 ? 'red' : 'white' }}>Contactus</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      <div style={{paddingLeft:'100px',paddingRight:'100px',paddingTop:'2%',backgroundColor:them?'white':'#141619'}}>
        <motion.div
    variants={fadeInUp}
  initial="hidden"
  whileInView="visible"
  transition={{ duration: 1.5,ease:'easeIn' }}
  viewport={{ once: true }}
>
      <div  className={`upload-backgroundfrontpage ${them ? 'theme-light' : 'theme-dark'}`}
      >
        <div style={{display:'flex',justifyContent:'center',color:'white'}}>
          <motion.div
    initial={{ opacity: 1, x: 100 }} 
    whileInView={{ opacity: 1, x: 0 }} 
    transition={{ duration: 2.8, ease: 'easeOut' }}
    viewport={{ once: true, amount: 0.2 }}
  >
        <h6 style={{fontSize:'250%'}}>This website for students and faculty</h6>
        </motion.div>
       
        </div>
         <br></br>
              <motion.div
    initial={{ opacity: 1, x: -100 }} 
    whileInView={{ opacity: 1, x: 0 }} 
    transition={{ duration: 2.8, ease: 'easeOut' }}
    viewport={{ once: true, amount: 0.2 }}
  >
         <div style={{display:'flex',justifyContent:'center'}} >
        <Button variant='danger' className='car1'
        onClick={(e)=>navigate('/login')}
        style={{paddingLeft:"2%",paddingRight:'2%'}}>Login for <br></br>Faculty/Students</Button>
        </div>
        </motion.div>
</div>
</motion.div>
      </div>
   
      {/*next content*/}
      <div style={{paddingLeft:'100px',paddingRight:'100px',backgroundColor:them?'white':"#141619"}}>
        <div style={{backgroundColor:'rgba(234, 242, 248,0.1)'}}>
      <div style={{paddingLeft:'20px',paddingRight:'50%',paddingTop:'2%'}}>

<motion.div
   variants={fadeInUp}
  initial="hidden"
  whileInView="visible"
  transition={{ duration: 0.6, ease: 'easeOut' }}
  viewport={{ once: true, amount: 0.2 }}
>

         <Card style={{display:'flex',flexDirection:'row',padding:'5px',backgroundColor:them?isHovered9?"blue":'white':isHovered9?'blue':'blueviolet',
         color:them?isHovered9?"white":'black':isHovered9?'white':'white'

          }} className='car'
         
         
            onMouseEnter={() => setIsHovered9(true)}
               onMouseLeave={() => setIsHovered9(false)}
         
         
         >
          <div style={{display:'flex',width:'350%'}}>
      <Card.Img variant="top"style={{display:'flex',minWidth:'100%'}} src="https://t4.ftcdn.net/jpg/11/76/41/61/240_F_1176416157_gXCLJWSRxprcQju1EUW1j4nk8YdadPoS.jpg" />
     </div> <Card.Body>

 <motion.div
    initial={{ opacity: 1, x: 100 }} 
    whileInView={{ opacity: 1, x: 0 }} 
    transition={{ duration: 0.8, ease: 'easeOut' }}
    viewport={{ once: true, amount: 0.2 }}
  >

        <Card.Title>🎓 Student Experience</Card.Title>
         </motion.div>
        <motion.div
    initial={{ opacity: 1, x: 100 }} 
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 1.5,delay:0.5, ease: 'easeOut' }}
    viewport={{ once: true, amount: 0.2 }}
  >
        <Card.Text>
         Students found the Academic File Sharing Portal extremely convenient for uploading and managing their certificates and semester marks. The portal’s intuitive design allowed them to easily access files from any device without the fear of losing important documents. A major highlight for many students was the note-sharing feature, which enabled seamless collaboration before exams. Additionally, the inclusion of a dark mode was appreciated by those who study during late hours, enhancing comfort and usability.
        </Card.Text>
        </motion.div>
       
      </Card.Body>
    </Card>
    </motion.div>

      </div>

       <div style={{paddingRight:'20px',paddingLeft:'50%',paddingTop:'2%'}}>


<motion.div
  
  variants={fadeInUp}
  initial="hidden"
  whileInView="visible"
  transition={{ duration: 0.6, ease: 'easeOut' }}
  viewport={{ once: true, amount: 0.2 }}
>
        
         <Card style={{display:'flex',flexDirection:'row',padding:'5px' ,backgroundColor:them?isHovere8?"blue":'white':isHovere8?'blue':'blueviolet',
         color:them?isHovere8?"white":'black':isHovere8?'white':'white'



}} className='car'
 onMouseEnter={() => setIsHovere8(true)}
               onMouseLeave={() => setIsHovere8(false)}

>
          <Card.Body>
             <motion.div
    initial={{ opacity: 1, x: -100 }} 
    whileInView={{ opacity: 1, x: 0 }} 
    transition={{ duration: 0.8, ease: 'easeOut' }}
    viewport={{ once: true, amount: 0.2 }}
  >
        <Card.Title>👩‍🏫 Faculty Feedback</Card.Title>
        </motion.div>
             <motion.div
    initial={{ opacity: 1, x: -100 }}  
    whileInView={{ opacity: 1, x: 0 }} 
    transition={{ duration: 1.5,delay:0.5, ease: 'easeOut' }}
    viewport={{ once: true, amount: 0.2 }}
  >
        <Card.Text>
        Faculty members praised the platform for streamlining the way they access and manage student submissions. The semester-wise filtering system and organized student view helped them quickly locate and evaluate academic records. Teachers also highlighted how the portal allowed them to upload and distribute notes efficiently to entire classes, replacing traditional email methods and reducing communication delays. Overall, it improved their workflow and saved valuable time.   </Card.Text>
        </motion.div>
      </Card.Body>
       <div style={{display:'flex',width:'350%'}}>
      <Card.Img variant="top"style={{display:'flex',minWidth:'100%'}} src="https://t4.ftcdn.net/jpg/11/89/53/85/360_F_1189538528_5alAJqU6tG8TSmKKzqpmJVszEn8vW5hs.jpg" />
     </div>
    </Card>
    </motion.div>
      </div>


       <div style={{paddingLeft:'20px',paddingRight:'50%',paddingTop:'2%'}}>


<motion.div
   variants={fadeInUp}
  initial="hidden"
  whileInView="visible"
  transition={{ duration: 0.6, ease: 'easeOut' }}
  viewport={{ once: true, amount: 0.2 }}
>

         <Card style={{display:'flex',flexDirection:'row',padding:'5px'
,backgroundColor:them?isHovere7?"blue":'white':isHovere7?'blue':'blueviolet',
         color:them?isHovere7?"white":'black':isHovere7?'white':'white'
          }}
           onMouseEnter={() => setIsHovere7(true)}
               onMouseLeave={() => setIsHovere7(false)}
          className='car'>
          <div style={{display:'flex',width:'350%'}}>
      <Card.Img variant="top"style={{display:'flex',minWidth:'100%'}} src="https://t4.ftcdn.net/jpg/11/92/11/69/240_F_1192116957_zwmGRMB2UT6jp2fQabmo3Q8kCf1VSO67.jpg" />
     </div> <Card.Body>

          <motion.div
    initial={{ opacity: 1, x: 100 }} 
    whileInView={{ opacity: 1, x: 0 }} 
    transition={{ duration: 0.8, ease: 'easeOut' }}
    viewport={{ once: true, amount: 0.2 }}
  >
          <Card.Title>🚀 Overall User Satisfaction</Card.Title>
          </motion.div>
           <motion.div
    initial={{ opacity: 1, x: 100 }}  
    whileInView={{ opacity: 1, x: 0 }} 
    transition={{ duration: 1.5,delay:0.5, ease: 'easeOut' }}
    viewport={{ once: true, amount: 0.2 }}
  >  
        <Card.Text>
        Across both student and faculty users, the portal was recognized for its responsive performance, clean UI, and secure file handling. Users valued the centralized system for academic document storage and noted how it boosted both productivity and academic collaboration. The consistent feedback suggests the platform has made a meaningful impact on improving digital file sharing in educational settings.
        </Card.Text>
        </motion.div>

      </Card.Body>
    </Card>
    </motion.div>
    </div>
      </div>
     


<div style={{backgroundColor:'rgba(234, 242, 248,0.1)',paddingBottom:'1px'}} >
      <div style={{paddingLeft:"100px",paddingBottom:"3%",paddingTop:'20px'}}>

<motion.div
    variants={fadeInUp}
  initial="hidden"
  whileInView="visible"
  transition={{ duration: 1.5 }}
  viewport={{ once: true }}
>


        <h2 style={{color:them?'black':'white',paddingTop:"20px"}}>👩‍🎓 For Students</h2>
        <div style={{display:'flex',flexDirection:'row',justifyContent:'center',gap:'50px'}}>
          <Card style={{ width: '18rem'

,backgroundColor:them?isHovere6?"blue":'white':isHovere6?'blue':'blueviolet',
         color:them?isHovere6?"white":'black':isHovere6?'white':'white'


          }} className='car'
          
           onMouseEnter={() => setIsHovere6(true)}
               onMouseLeave={() => setIsHovere6(false)}
          
          >
      
      <Card.Body style={{display:"flex",flexDirection:'column',paddingTop:"20%"}}>
          <motion.div
    initial={{ opacity: 1, y: 150 }}  
    whileInView={{ opacity: 1, y: 0 }} 
    transition={{ duration: 1.5,delay:0.5, ease: 'easeOut' }}
    viewport={{ once: true, amount: 0.2 }}
  >  
        <Card.Title>✅ 1. Login</Card.Title>
        <ul>
          <li>Use your registered student ID and password to log in.</li>
          <li>If you don't have an account, contact your class faculty.</li>
        </ul>
         <Card.Title>🎨 5. Switch Theme</Card.Title>
        <ul>
          <li>Use the light/dark toggle button on the top right to change appearance as per your preference.</li>
        
        </ul>
        </motion.div>
   
      </Card.Body>
    </Card>

     <Card style={{ width: '18rem',backgroundColor:them?isHovere5?"blue":'white':isHovere5?'blue':'blueviolet',
         color:them?isHovere5?"white":'black':isHovere5?'white':'white'
 }}
 
  onMouseEnter={() => setIsHovere5(true)}
               onMouseLeave={() => setIsHovere5(false)}
               className='car'>
      
      <Card.Body>
           <motion.div
    initial={{ opacity: 1, y: 150 }}  
    whileInView={{ opacity: 1, y: 0 }} 
    transition={{ duration: 1.5,delay:0.5, ease: 'easeOut' }}
    viewport={{ once: true, amount: 0.2 }}
  >  
          <Card.Title>📤 2. Upload Files</Card.Title>
        <ul>
          <li>Go to the Certificates or Semester Marks section.</li>
          <li>Click on "Upload" and select the appropriate file.</li>
          <li>Fill in details like semester, subject, or description, then submit.</li>
        </ul>
         <Card.Title>📚 3. Share Notes</Card.Title>
        <ul>
          <li>Open the Notes Upload section.</li>
          <li>Choose the semester and subject</li>
          <li>Upload PDF, DOCX, or supported formats.</li>
          <li>Shared notes will be visible to all students in your class.</li>
        
        </ul>
        </motion.div>
      
      </Card.Body>
    </Card>

     <Card style={{ width: '18rem',backgroundColor:them?isHovere4?"blue":'white':isHovere4?'blue':'blueviolet',
         color:them?isHovere4?"white":'black':isHovere4?'white':'white'
 }} 
  onMouseEnter={() => setIsHovere4(true)}
               onMouseLeave={() => setIsHovere4(false)}
 className='car'>
      
      <Card.Body style={{paddingTop:"50%"}}>
           <motion.div
    initial={{ opacity: 1, y: 150 }}  
    whileInView={{ opacity: 1, y: 0 }} 
    transition={{ duration: 1.5,delay:0.5, ease: 'easeOut' }}
    viewport={{ once: true, amount: 0.2 }}
  >  
         <Card.Title>📥 4. View & Download</Card.Title>
        <ul>
          <li>Navigate to the Shared Notes or My Files section.</li>
          <li>Click on any file to preview or download it instantly.</li>
        </ul>
        </motion.div>
      </Card.Body>
    </Card>


        </div>
        </motion.div>
      </div>


        <div style={{paddingLeft:"100px",paddingBottom:"3%"}}>

<motion.div
    variants={fadeInUp}
  initial="hidden"
  whileInView="visible"
  transition={{ duration: 1.5 }}
  viewport={{ once: true }}
>

        <h2 style={{color:them?'black':'white'}}>👨‍🏫 For Faculty</h2>
        <div style={{display:'flex',flexDirection:'row',justifyContent:'center',gap:'50px'}}>
          <Card style={{ width: '18rem',backgroundColor:them?isHovere3?"blue":'white':isHovere3?'blue':'blueviolet',
         color:them?isHovere3?"white":'black':isHovere3?'white':'white'
 }} 
  onMouseEnter={() => setIsHovere3(true)}
               onMouseLeave={() => setIsHovere3(false)}
 className='car'>
      
      <Card.Body style={{display:"flex",flexDirection:'column',paddingTop:"20%"}}>
           <motion.div
    initial={{ opacity: 1, y: 150 }}  
    whileInView={{ opacity: 1, y: 0 }} 
    transition={{ duration: 1.5,delay:0.5, ease: 'easeOut' }}
    viewport={{ once: true, amount: 0.2 }}
  >  
        <Card.Title>✅ 1. Login</Card.Title>
        <ul>
          <li>Use your faculty ID and password to access the portal.</li>
          
        </ul>
         <Card.Title>🔄 5. Theme & Navigation</Card.Title>
        <ul>
          <li>Use the navigation bar to switch between views (Students, Notes, Dashboard).</li>
          <li>Toggle between light/dark mode for comfort.</li>
        
        </ul>
        </motion.div>
   
      </Card.Body>
    </Card>

     <Card style={{ width: '18rem',backgroundColor:them?isHovere2?"blue":'white':isHovere2?'blue':'blueviolet',
         color:them?isHovere2?"white":'black':isHovere2?'white':'white'
 }} 
  onMouseEnter={() => setIsHovere2(true)}
               onMouseLeave={() => setIsHovere2(false)}
 className='car'>
      
      <Card.Body>
           <motion.div
    initial={{ opacity: 1, y: 150 }}  
    whileInView={{ opacity: 1, y: 0 }} 
    transition={{ duration: 1.5,delay:0.5, ease: 'easeOut' }}
    viewport={{ once: true, amount: 0.2 }}
  >  
          <Card.Title>👀 2. View Student Files</Card.Title>
        <ul>
          <li>Go to the Student View section.</li>
          <li>Select class, semester, or student name to filter results.</li>
          <li>Click on individual files to view or download.</li>
        </ul>
         <Card.Title>📤 3. Upload Notes</Card.Title>
        <ul>
          <li>Visit the Faculty Notes Upload section.</li>
          <li>Select semester and subject, then upload notes.</li>
          <li>Notes will be instantly accessible to all students in the selected class.</li>
        </ul>
      </motion.div>
      </Card.Body>
    </Card>

     <Card style={{ width: '18rem',backgroundColor:them?isHovere1?"blue":'white':isHovere1?'blue':'blueviolet',
         color:them?isHovere1?"white":'black':isHovere1?'white':'white'
 }} 
  onMouseEnter={() => setIsHovere1(true)}
               onMouseLeave={() => setIsHovere1(false)}
 className='car'>
      
      <Card.Body style={{paddingTop:"50%"}}>
           <motion.div
    initial={{ opacity: 1, y: 150 }}  
    whileInView={{ opacity: 1, y: 0 }} 
    transition={{ duration: 1.5,delay:0.5, ease: 'easeOut' }}
    viewport={{ once: true, amount: 0.2 }}
  >  
         <Card.Title>📂 4. Manage Files</Card.Title>
        <ul>
          <li>Use options to edit, delete, or update any uploaded file.</li>
          <li>Stay organized by updating subject titles or adding new resources.</li>
        </ul>
        </motion.div>
      </Card.Body>
    </Card>


        </div>
          </motion.div>
      </div>
    
        </div>
         
    </div>
    
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.2 }} 
     
    >

      <div style={{ borderTop: '2px solid black',backgroundColor:'black'}}>
                 <footer className="bg-gradient-to-r  from-blue-800 to-purple-800 text-white" >
                   <div className="container mx-auto px-4 py-8 text-center space-y-8">
                 
                     <div>
                       <h6 className="text-3xl font-bold mb-1">Academic File Sharing Portal</h6>
                     
                     </div>
                
                     <div>
                       <h6 className="text-xl font-semibold mb-1">Follow Us</h6>
                       <div className="flex justify-center ">
                         <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                           <FaFacebook className="text-2xl space-x-4 hover:text-blue-500 transition" />
                         </a>
                         <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                           <FaTwitter className=" hover:text-blue-400 transition" />
                         </a>
                         <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                           <FaInstagram className="text-2xl hover:text-pink-500 transition" />
                         </a>
                         <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                           <FaLinkedin className="text-2xl hover:text-blue-700 transition" />
                         </a>
                     
                
             
                 
                     <div className="border-t border-gray-700 pt-2">
                       <p className="text-sm">
                         &copy; 2025 Academic File Sharing Portal. All rights reserved.
                       </p>
                     </div>  </div>
                          </div>
                   </div>
                 </footer>
                </div>
                 </motion.div>
                 </div>
                  
               
  );
};

export default Frontpage;
