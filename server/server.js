const express=require('express');
const mongoose=require('mongoose')
require('dotenv').config();
const cors=require('cors');
const multer=require('multer');
const { TIMEOUT } = require('dns');

const upload=multer();
const app=express();
app.use(cors());
app.use(express.json({limit:'10mb'}));

mongoose.connect(process.env.RESTAPI_DBCONNECT,{serverSelectionTimeoutMS: 100000 }).then(()=>{
    console.log("Database is connected")
}).catch((err)=>{console.log(err)})

const certificateschema=new mongoose.Schema({
    title:String,   
    date:String,
    description:String,
    certificate:String}
   
, {_id:true})
    

const semesterschema = new mongoose.Schema({
  semester: String,
  subjects: [
    {
      subjectname: String, 
      grade: String
    }
  ]       
}, { _id: true });   
 
const notes=new mongoose.Schema({
  sem:String,
  subject:String,
  file:String
},{_id:true})
 
const studentschema=new mongoose.Schema({
    regno:String,
    name:String,
    classname:String,
    year:String,
    department:String,
    advisor:String,
    password:String,
    certificate:[certificateschema],
    semester:[semesterschema],
    notes:[notes]
})

const notesschmea=new mongoose.Schema({
  name:String,
  stdyear:String,
  subject:String,
  department:String,
  classname:String,
  file:String
},{_id:true})

const facultyschema=new mongoose.Schema({
  facultyid:String,
  facultyname:String,
  facultyclassname:String,
  facultydepartment:String,
  facultypassword:String,
  notes:[notesschmea]
})
  

const model=new mongoose.model('student',studentschema);
const facultymodel=new mongoose.model('faculty',facultyschema);

app.post('/student',async(req,res)=>{
    const {regno,name,classname,year,department,advisor,password}=req.body;
    try{
        const list=model({regno,name,classname,year,department,advisor,password})
        await list.save();
        return res.status(201).json(list)
    }catch(err){
        console.err("err while uploading",err)
        res.status(500).json({message:"Internal server error."})
    }
})

app.put('/student/:id',async(req,res)=>{
  const {id}=req.params;
    const {regno,name,classname,year,department,advisor,password}=req.body;
    try{
        
      const student=await model.findById(id)
      student.regno=regno,
      student.name=name,
      student.classname=classname,
      student.year=year,
      student.department=department,
      student.advisor=advisor,
      student.password=password

      await student.save();
        return res.status(201).json(student)
    }catch(err){
        console.error("err while uploading",err)
        res.status(500).json({message:"Internal server error."})
    }
})

app.get('/student',async(req,res)=>{
    try{
        const list =await model.find();
        res.status(201).json(list);
    }catch(err){
        console.log(err)
        res.status(500).json({message:err.message})
    }
})
 


app.post('/student/:id/mark', async (req, res) => {
  const { id } = req.params;
  const { semester, subjects } = req.body; 

  if (!semester || !Array.isArray(subjects) || subjects.length === 0) {
    return res.status(400).json({ message: "Semester and subjects are required" });
  }

  try {
    const student = await model.findById(id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

  const index=student.semester.findIndex(s=>s.semester===semester);
  
    if (index !== -1) {
      student.semester[index].subjects = subjects;
    } else {
      student.semester.push({ semester, subjects });
    }
    await student.save(); 

    return res.status(201).json(student);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.get('/student/:id/semester/:sem', async (req, res) => {
  const { id, sem } = req.params;

  try {
    const student = await model.findById(id);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const semData = student.semester.find(s => s.semester === sem);

    if (!semData) {
      return res.status(404).json({ message: 'Semester not found' });
    }

    res.status(200).json(semData);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.delete('/student/:id/semester/:sem', async (req, res) => {
  const { id, sem } = req.params;

  try {
    const student = await model.findById(id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    } 

    
    const updatedSemesters = student.semester.filter(s => s.semester !== sem);

    if (updatedSemesters.length === student.semester.length) {
      return res.status(404).json({ message: `Semester ${sem} not found` });
    }

    student.semester = updatedSemesters;
    await student.save();

    res.status(200).json({ message: `Semester ${sem} deleted successfully`, data: student.semester });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/student/certificate/:id",async(req,res)=>{
  const {id}=req.params;
  const {title,date,description,certificate}=req.body;
  const list=await model.findById(id)
  try{
    if(!title||!date||!description||!certificate){
      return res.status(400).json({message:"require all the filed"})
    } 
       
    list.certificate.push({title,date,description,certificate})
    await list.save();
    res.status(201).json(list)
  }catch(err){
        console.error("err while uploading",err)
        res.status(500).json({message:"Internal server error."})
    }
})


app.post("/student/notes/:id",async(req,res)=>{
  const {id}=req.params;

  const {sem,subject,file}=req.body;
  const list=await model.findById(id)
  try{
    if(!sem||!subject||!file){
      return res.status(400).json({message:"require all the filed"})
    } 
       
    list.notes.push({sem,subject,file})
    await list.save();
    res.status(201).json(list)
  }catch(err){
        console.error("err while uploading",err)
        res.status(500).json({message:"Internal server error."})
    }
})

app.get('/student/notes', async (req, res) => {
  const { classname:classname, faculty,department } = req.query;
 

  try {
    const students = await model.find({ classname: classname, advisor: faculty,department}, { notes: 1, name: 1, regno: 1 });
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: "Error fetching notes" });
  }
});

app.delete("/student/:id/notes/:notesid", async (req, res) => {
  const { id, notesid } = req.params;
  
  try {
    const student = await model.findById(id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    } 
 
    const originalLength = student.notes.length;

    student.notes = student.notes.filter(
      cert => cert._id.toString() !== notesid
    );

    if (student.notes.length === originalLength) {
      return res.status(404).json({ message: "Certificate not found" });
    }

    await student.save();
    res.status(200).json({ message: "Certificate deleted successfully" });
  } catch (err) {
    console.error("Error while deleting certificate:", err);
    res.status(500).json({ message: "Internal server error." });
  }
});


app.get("/student/:id/:certificateid",async(req,res)=>{
  const {id,certificateid}=req.params;
  const student=await model.findById(id);
  try{
    if(!student){
      res.status(404).json({message:"User does't found"})
    }
    const certificate=student.certificate.find(c=>c._id.toString()===certificateid);
    res.status(200).json(certificate)
  }catch(err){
        console.error("err while uploading",err)
        res.status(500).json({message:"Internal server error."})
    }

}) 

app.put("/student/:id/:certificateid",async(req,res)=>{
 const {id,certificateid}=req.params;
 const {title,date,description,certificate}=req.body;
 const student=await model.findById(id);
 try{
  if(!student){
    res.status(404).json({message:"User not Found."})
  }
  const updatecertificate=await student.certificate.id(certificateid)
  if(!updatecertificate){
    return res.status(404).json({message:"Certificate not found."})
  }
  updatecertificate.title=title;
  updatecertificate.date=date;
  updatecertificate.description=description;
  updatecertificate.certificate=certificate;

  await student.save();
      res.status(200).json({ message: "Certificate updated successfully", certificate: updatecertificate });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
 

})


app.delete("/student/:id/certificate/:certificateid", async (req, res) => {
  const { id, certificateid } = req.params;
  
  try {
    const student = await model.findById(id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const originalLength = student.certificate.length;

    student.certificate = student.certificate.filter(
      cert => cert._id.toString() !== certificateid
    );

    if (student.certificate.length === originalLength) {
      return res.status(404).json({ message: "Certificate not found" });
    }

    await student.save();
    res.status(200).json({ message: "Certificate deleted successfully" });
  } catch (err) {
    console.error("Error while deleting certificate:", err);
    res.status(500).json({ message: "Internal server error." });
  }
});


app.delete("/student/:id",async(req,res)=>{
  const {id}=req.params;
  const student=await model.findByIdAndDelete(id);
  try{
     if(!student){
      res.status(404).json({message:"User not found"})
     }
      res.status(201).json(student);
  }catch(err){
       console.err("err while uploading",err)
        res.status(500).json({message:"Internal server error."})
     }
})




//faculty backend

app.post('/faculty',async(req,res)=>{
  const {facultyname,facultyid,facultydepartment,facultypassword}=req.body;

  try{
  const list=facultymodel({facultyname,facultyid,facultydepartment,facultypassword});
  await list.save();
  res.status(201).json(list)  
  }catch(err){
    console.error("error while uploading",err)
    res.status(500).json({message:"Internal server error."})
  }
})

app.post("/faculty/notes/:id",async(req,res)=>{
  const {id}=req.params;
  console.log("certificate")

  const {name,
  stdyear,
  subject,
  department,
  classname,
  file}=req.body;
  console.log(department)
  const list=await facultymodel.findById(id)
  try{
    if(!name||!stdyear||!subject||!classname||!department){
      return res.status(400).json({message:"require all the filed"})
    } 
       
    list.notes.push({name,
  stdyear,
  subject,
  classname,
  department,
  file})
    await list.save();
    res.status(201).json(list)
  }catch(err){
        console.error("err while uploading",err)
        res.status(500).json({message:"Internal server error."})
    }
}) 

app.put('/faculty/:id',async(req,res)=>{
  const {id}=req.params;
   const {facultyname,facultyid,facultydepartment,facultypassword}=req.body;
    try{
      const updatefaculty=await facultymodel.findById(id)
      updatefaculty.facultyname=facultyname,
      updatefaculty.facultyid=facultyid,
      updatefaculty.facultydepartment=facultydepartment,
      updatefaculty.facultypassword=facultypassword
      
      await updatefaculty.save();
      res.status(200).json(updatefaculty);
    }catch(err){
    console.error("error while uploading",err)
    res.status(500).json({message:"Internal server error."})
  } 
})

app.get('/faculty',async(req,res)=>{
  try{
    const list=await facultymodel.find();
    res.status(200).json(list);
  }catch(err){
    console.error("Errror while fetching",err)
    res.status(500).json({message:"Internal server errror"})
  }
})

app.delete('/faculty/:id',async(req,res)=>{
  const {id}=req.params;
  const list=await facultymodel.findByIdAndDelete(id);
  try{
    if(!list){
      res.status(404).json({message:"User not found"});
    }
    res.status(201).json(list);
  }catch(err){
    console.error("Error while Deleting",err);
    res.status(500).json({message:"Internal server Error"})
  }
})

app.get('/faculty/department/:dept', async (req, res) => {
  const { dept } = req.params;

  try {
    const facultyList = await facultymodel.find(
      { facultydepartment: dept },
      { facultyname: 1, _id: 0 } 
    );

    if (facultyList.length === 0) {
      return res.status(404).json({ message: "No faculty found in this department" });
    }

    res.status(200).json(facultyList);
  } catch (err) {
    console.error("Error while fetching faculty by department", err);
    res.status(500).json({ message: "Internal server error." });
  }
});


app.get('/faculty/:name/:department',async(req,res)=>{
  const {name,department}=req.params;
  
  
  try{
    const studentlist=await model.find(
      {advisor:name,department:department},
       
    ).sort({ regno: 1 })
    if(studentlist.length===0){
     return res.status(404).json({ message: "No faculty found in this department" });
    }
    res.status(200).json(studentlist)
  }catch (err) {
    console.error("Error while fetching faculty by department", err);
    res.status(500).json({ message: "Internal server error." });
  }
})


app.get('/faculty/mark/:sem/:advisor', async (req, res) => {
  const { sem, advisor } = req.params;
 

  try {
    const result = await model.aggregate([
       { $match: { advisor: advisor } },
      { $unwind: "$semester" },
      { $match: { "semester.semester": sem } },
      { $unwind: "$semester.subjects" },
      {
        $group: {
          _id: {
            subject: "$semester.subjects.subjectname",
            grade: "$semester.subjects.grade"
          },
          count: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: "$_id.subject",
          grades: {
            $push: {
              grade: "$_id.grade",
              count: "$count"
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          subject: "$_id",
          grades: 1
        }
      }
    ]);

    res.status(200).json(result);
  } catch (err) {
    console.error("Error fetching grade count:", err);
    res.status(500).json({ message: "Internal server error." });
  }
});

app.delete("/faculty/:id/notes/:notesid", async (req, res) => {
  const { id, notesid } = req.params;

  
  try {
    const student = await facultymodel.findById(id);
    if (!student) {
      return res.status(404).json({ message: "Faculty not found" });
    } 

    const originalLength = student.notes.length;

    student.notes = student.notes.filter(
      cert => cert._id.toString() !== notesid
    );

    if (student.notes.length === originalLength) {
      return res.status(404).json({ message: "Certificate not found" });
    }

    await student.save();
    res.status(200).json({ message: "Certificate deleted successfully" });
  } catch (err) {
    console.error("Error while deleting certificate:", err);
    res.status(500).json({ message: "Internal server error." });
  }
});




const port=process.env.PORT || 4000;
app.listen(port,()=>console.log("the server responding at"+port))
