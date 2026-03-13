const express = require('express')
const {postMessageController, getMessageController} = require('../controllers/messageController')

const router = express.Router()

router.post('/messages', postMessageController)
router.get('/messages/:id', getMessageController)

router.get('/share/:id', getMessageController)

module.exports = router