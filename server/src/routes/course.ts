import express from 'express';
import controller from '../controllers/course';

const router = express.Router();

router.post('/create', controller.create);
router.get('/:courseID', controller.read);
router.get('/user/:userID', controller.readAll);
router.post('/query', controller.query);
router.patch('/:courseID', controller.update);
router.delete('/:courseID', controller.deleteCourse);
router.get('/:courseID/lessons', controller.getLessons);
router.patch('/:courseID/add', controller.addLesson);
router.delete('/:courseID/:lessonID', controller.deleteLesson);
router.patch('/:courseID/:lessonID', controller.updateLessonTitle);

export default router;

// create, read, readAll, query, update, deleteCourse;
