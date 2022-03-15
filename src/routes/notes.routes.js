const {Router} = require('express');
const router = Router();
const notesController = require('../controllers/notes.controller');
const {isAuthenticated} = require('../helpers/auth');

/*-----CREATE NOTE-----*/
router.get('/notes/add', isAuthenticated ,notesController.renderAddForm);
router.post('/notes/add', isAuthenticated ,notesController.receiveNewNote);

/*-----NOTES-----*/
router.get('/notes', isAuthenticated ,notesController.renderNotes);

/*-----EDIT NOTES-----*/
router.get('/notes/edit/:id', isAuthenticated ,notesController.renderEditForm);
router.put('/notes/edit/:id', isAuthenticated ,notesController.editNote);

/*-----DELETE NOTE-----*/
router.post('/notes/delete/:id', isAuthenticated ,notesController.deleteNote);

module.exports = router;