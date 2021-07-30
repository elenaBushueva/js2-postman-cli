const axios = require('axios');
const readlineSync = require('readline-sync');
let id;
const action = readlineSync.question('Choose your action:\n' +
    '"C" to Create\n' +
    '"S" to Search\n' +
    '"D" to Delete\n');
/////////////////////////////////////////// CREATE /////////////
if(action[0].toLowerCase() === 'c'){
    const data = {
        "name": readlineSync.question('Type event name: '),
        "description": readlineSync.question('Type event description: '),
        "price": readlineSync.question('Type event price: '),
    }
    axios({
        method: 'POST',
        url: `https://bogutskii-ticket.herokuapp.com/event`,
        data: data,
    }).then(res => {
        console.log(res.data)
    }).catch(err => console.log(err))
}
////////////////////////////////////////// SEARCH //////////////
else if(action[0].toLowerCase() === 's'){
    const data = {
        "name": readlineSync.question('Type searching event name: '),
    }
        axios({
            method: 'POST',
            url: `https://bogutskii-ticket.herokuapp.com/event/search`,
            data: data,
        }).then(res => {
            res.data.payload.items.length ?
                console.log(res.data.payload.items) : console.log('Event not found!')
        }).catch(err => console.log(err))
    }
///////////////////////////////////////// DELETE ///////////////
else if(action[0] === 'd'){
    const data = {
        "name": readlineSync.question('Type name to delete: '),
    }
    axios({
        method: 'POST',
        url: 'https://bogutskii-ticket.herokuapp.com/event/search',
        data: data,
    }).then(res => {
        res.data.payload.items.length ?
            console.log(res.data.payload.items[0].name, res.data.payload.items[0]._id)
            : console.log('Event not found!');
        id = res.data.payload.items[0]._id;
        axios({
            method: 'DELETE',
            url: `https://bogutskii-ticket.herokuapp.com/event/${id}`
        }).then(res => console.log(res))
    }).catch(err => console.log(err))
} else {
    console.log('Incorrect input!')
}

