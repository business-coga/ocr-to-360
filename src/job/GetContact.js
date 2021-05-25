const axios = require('axios').default
const model = require('./../model')
const https = require('https');

async function GetAllContact(){
    const response = await axios({
        method: 'GET',
        url: process.env.OCR_SERVER_URL,
        headers : {
            "x-api-key" : process.env.X_API_KEY
        },
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
        params : {
            page : 1,
            page_size : process.env.PAGE_SIZE
        }
    })
    if(response.status == 200){
        let contacts = response.data.data || []
        let contactsAvailable = await model.contact.find().select('contact_id')
        let contactInsert = []
        if(contacts !== undefined){
            for(let i=0; i < contacts.length; i++){
                contacts[i].contact_id = contacts[i].id
                delete contacts[i].id
                if(contactsAvailable.find(x => x._doc.contact_id == contacts[i].contact_id) === undefined){
                    contactInsert.push(contacts[i])
                }
            }
        }

        model.contact.insertMany(contactInsert).then(docs => {
            console.log(`${(new Date()).toLocaleString()} Inserted : ${contactInsert.length} contact.`)
        }).catch(err => console.log(err))

    }else{
        console.log(`${(new Date()).toLocaleString()} ${JSON.stringify({
            status: response.status,
            statusText: response.statusText
        })}`)
    }
}



module.exports = function (){
    GetAllContact().catch(err => 
        console.log(`${(new Date()).toLocaleString()} ${JSON.stringify({
            status : err.response.status,
            statusText : err.response.statusText
        })}`
    ))
}