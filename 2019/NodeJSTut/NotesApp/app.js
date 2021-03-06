const yargs = require('yargs');

const titleOptions = {
  describe: 'Title of note',
  demand: true,
  alias: 't',
};

const bodyOptions = {
  describe: 'Body of note',
  demand: true,
  alias: 'b',
};

const argv = yargs
  .command('add', 'Add a new note', {
    title: titleOptions,
    body: bodyOptions,
  })
  .command('list', 'List all notes')
  .command('read', 'Read a note', {
    title: titleOptions,
  })
  .command('remove', 'Remove a note', {
    title: titleOptions,
  })
  .help().argv;

const notes = require('./notes');

const command = argv._[0];
if (command === 'add') {
  const note = notes.addNote(argv.title, argv.body);
  if (note) notes.printNote(note);
  else console.log('Retry with a different title');
} else if (command === 'list') {
  const noteList = notes.getAll();
  console.log(`Printing ${noteList.length} note(s).`);
  noteList.forEach((note, index) => {
    console.log(`Note ${index + 1}: `);
    notes.printNote(note);
  });
} else if (command === 'read') {
  const note = notes.getNote(argv.title);
  if (note) notes.printNote(note);
  else console.log('Note not found');
} else if (command === 'remove') {
  const noteRemoved = notes.removeNote(argv.title);
  console.log(noteRemoved ? 'Note removed' : 'Note not found');
} else console.log('Command not recognized');
