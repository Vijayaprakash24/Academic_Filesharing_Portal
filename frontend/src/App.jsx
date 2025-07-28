
import Homepage from './folders/Homepage'
import 'bootstrap/dist/css/bootstrap.min.css'

import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Signup from './folders/signup/Signup'
import Studenthomepage from './folders/student/studentfrontpage/Studenthomepage'
import Facultyhomepage from './folders/faculty/facultyhomepage/Facultyhomepage'
import Studentfileuploadpage from './folders/student/fileuploadpage/Studentfileuploadpage'
import Eachstudentdetail from './folders/faculty/eachstudentdetail/Eachstudentdetail'
import Edit from './Edit'
import Editstudentfile from './folders/student/fileuploadpage/Editstudentfile'
import Frontpage from './Frontpage'

function App() {


  return (
  <BrowserRouter basename="/">
  <Routes>
    <Route path='/login' element={<Homepage/>}/>
    <Route path='/' element={<Frontpage/>}/>
    <Route path='/signup' element={<Signup/>}/>
    <Route path='/studentfrontpage' element={<Studenthomepage/>}/>
    <Route path='/studentfrontpage/:id/:thempars' element={<Studenthomepage/>}/>
    <Route path='/editstudentfile1/:id/:thempars/:id1' element={<Editstudentfile/>}/>
    <Route path='/facultyhomepage' element={<Facultyhomepage/>}/>
     <Route path='/facultyhomepage/:thempars/:id' element={<Facultyhomepage/>}/>
    <Route path='/studentfileupload/:thempars/:id' element={<Studentfileuploadpage/>}/>
    <Route path='/eachstudentdetail/:stdid/:thempars/:facid' element={<Eachstudentdetail/>}/>
    <Route path='/edit/:role/:id' element={<Edit/>}/>

  </Routes>
  
  </BrowserRouter>

  )
}

export default App
