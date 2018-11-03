const fs = require('fs');

const fetchNotes = ()=>{
  try{
    var notesString = fs.readFileSync('notes-data.json');
    return JSON.parse(notesString);
  }catch(err){
    return [];
  }
}
const saveNotes = (notes)=>{
    fs.writeFileSync('notes-data.json',JSON.stringify(notes));
}

const addNote = (title,body)=>{
  var notes = fetchNotes();
  var note = {
    title,
    body
  }

  var duplicateNotes = notes.filter((note)=>note.title.toLowerCase()===title.toLowerCase());

  if(duplicateNotes.length===0){
    notes.push(note);
    saveNotes(notes);
    return `Note with title "${note.title}" is added.`
  }else{
    return `Title must be unique.You cannot use Title which is already there....`
  }
}

const removeNote = (title)=>{
  var notes = fetchNotes();
  var index = notes.findIndex((note)=>note.title===title);
  if(index!== -1){
    notes.splice(index,1);
    saveNotes(notes);
    return `Note with title "${title}" is removed.`
  }
  else{
    return `Their is no note with title "${title}". Please recheck your command`
  }
}

const getNote = (title)=>{
  var notes = fetchNotes();
  var note = notes.find((note)=>note.title===title);
  if(note){
    console.log("Fetching The Note for You....");
    console.log("------");
    console.log(`Title : ${note.title}`,`       Body : ${note.body}`)
  }
  else{
    console.log(`Their is no Note with Title "${title}".`);
  }
}

const getAll = ()=>{
  var notes = fetchNotes();
  if(notes.length>0){
  console.log("Fetching The Notes for You....");
  notes.forEach((note)=>{
      console.log("------");
      console.log(`Title : ${note.title.toUpperCase()}`);
      console.log(`Body  : ${note.body}`);
  })
  }else console.log('There are no Notes to Show');
}

const removeAll = ()=>{
  var notes = fetchNotes();
  notes = [];
  saveNotes(notes);
}

module.exports = {
  addNote,
  removeNote,
  getNote,
  getAll,
  removeAll
}
