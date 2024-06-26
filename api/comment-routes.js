const router = require ('express').Router();
const {
    User,
    Post,
    Comment
} = require('../../models');
const withAuth = require('../../utils/auth');


//To get comment
router.get("/", (req, res) => {
    Comment.findAll()
     .then((dbCommentData) => res.json(dbCommentData))
     .catch ((err) => {
        console.log (err);
        res.statuss (500).json (err);
    });
});

//To creat comment
router.post ('/', withAuth, (reg, res) => {
    if (req.session){
        Comment.create({
            comment_text: req.body.comment_text,
            post_id: req.body.post_id,
            user_id: req.session.user_id
        })
        .then (dbCommentData => res.json (dbCommentData))
        .catch(err => {
            console.log (err);
            res.status (400).json (err);
         });
    }
});



module.exports = routers;