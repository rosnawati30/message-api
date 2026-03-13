const { postMesssageService, getMesssageService } = require("../service/messageService")

exports.postMessageController = async (req, res, next) => {
    try{
        const {message} = req.body
        const result = await postMesssageService(message)

        const shareLink = `${req.protocol}://${req.get('host')}/share/${result.id}`
    
        res.json({
            share_link: shareLink,
            expires_at: result.expires_at
        })
    }
    catch(err){
        next(err)
    }
}

exports.getMessageController = async (req, res, next) => {
    try{
        const {id} = req.params
        const result = await getMesssageService(id)

        if(!result){
            return res.status(404).json({
                message: 'Message not found'
            })
        }

        res.json(result)
    }
    catch(err){
        next(err)
    }
}