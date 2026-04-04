const supabase = require('../config/supabaseConfig')

exports.postMesssageService = async ({to, from, message, template}) => {
    //create expires time 
        const expiresAt = new Date()
        expiresAt.setHours(expiresAt.getHours() + 24)

    //insert to, from, and message text to 'messages' table in supabase
    const{data, error} = await supabase
        .from('messages')
        .insert([
            {
                to,
                from,
                message,
                template,
                expires_at: expiresAt
            }
        ])
        .select()

    if(error){
        throw error
    }

    return data[0]
}

exports.getMesssageService = async (id) => {
    //select message from 'messages' table 
    const {data, error} = await supabase
        .from('messages')
        .select('id, to, from, message, template, expires_at')
        .eq('id', id)
        .single()

    if(error){
        throw error 
    }

    const now = new Date()

    if(new Date(data.expires_at) < now){
        throw new Error('Message expired')
    }

    return data
}