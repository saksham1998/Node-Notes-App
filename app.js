
const fs = require('fs');
const yargs = require('yargs');
const notes = require('./notes');
const titleDes = {
  describe:'Title of note',
  demand:true,
  alias:'t'
};
const bodyDes = {
  describe:'Body of note',
  demand:true,
  alias:'b'
}
const argv = yargs.command('add','Adds a New Note',{
  title:titleDes,
  body:bodyDes
  })
  .command('list','Lists all Notes',{})
  .command('read','Reads a Note',{
    title:titleDes
  })
  .command('remove','Remove the specified Note',{
    title:titleDes
  })
  .command('removeAll','Removes all the notes',{})
.help().argv;

var command = argv._[0];
// console.log(argv);


if(command==='add'){
  var message = notes.addNote(argv.title,argv.body);
  console.log(message)
}
else if(command==='list'){
  notes.getAll()
}
else if(command==='read'){
  notes.getNote(argv.title);

}
else if(command==='remove'){
  var message = notes.removeNote(argv.title);
  console.log(message)
}
else if(command==='removeAll'){
  notes.removeAll();
  console.log('All the Notes are removed');
}
else console.log('Command not appropriate....');
