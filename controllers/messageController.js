const { postMesssageService, getMesssageService } = require("../service/messageService")

exports.postMessageController = async (req, res, next) => {
    try{
        const {to, from, message} = req.body
        const result = await postMesssageService({to, from, message})
    
        res.json({
            id: result.id,
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