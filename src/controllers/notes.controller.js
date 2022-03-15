const Note = require('../models/note.model');

const notesController = {};

/*-----NEW NOTE-----*/

notesController.renderAddForm = (req, res) => {
    res.render('notes/new-note')
}

notesController.receiveNewNote = async (req, res) => {
    try {
        const {title, description, link} = req.body;

        const newNote = new Note({
            title: title,
            description: description,
            link: link
        });

        newNote.user = req.user._id;

        await newNote.save();


        req.flash('success_msg', 'Note Added Successfully');
        res.redirect('/notes');

    } catch (error) {
        console.log(error);
    }
};

/*-----SHOW NOTES-----*/

notesController.renderNotes = async (req, res) => {
    try {
        const dbNotes = await Note.find({user: req.user.id}).lean();

        console.log(dbNotes);
        res.render('notes/notes', { dbNotes: dbNotes });
    } catch (error) {
        console.log(error);
    }
}

/*-----EDIT NOTES-----*/

notesController.renderEditForm = async (req, res) => {
    const noteToEdit = await Note.findOne({id: req.params.id}).lean();

    console.log(noteToEdit);
    
    res.render('notes/edit-note', {noteToEdit: noteToEdit});
}

notesController.editNote = async (req, res) => {
    const {title, description, link} = req.body;

    await Note.findByIdAndUpdate(req.params.id, {
        title: title,
        description: description,
        link: link
    });

    req.flash('success_msg', 'Note Edit Successfully');
    res.redirect('/notes');
}

/*-----DELETE NOTES-----*/

notesController.deleteNote = async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);

    req.flash('success_msg', 'Note Deleted Successfully');
    res.redirect('/notes');
}

module.exports = notesController;
