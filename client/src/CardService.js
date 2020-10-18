import axios from 'axios';

const url = 'http://localhost:5000/api/cards/';

class CardService {
    // get cards
    static getCards() {
        return new Promise ((resolve,reject) => {
            axios.get(url).then((res) => {
                const data = res.data;
                // console.log(data);
                resolve(
                    data.map(post => ({
                        ...post
                    }))
                );
            })
            .catch((err)=> {
                reject(err);
            })
        });
    }

    // create card
    static insertCard(name, education, contact) {
        return axios.post(url, {
            name: name,
            education: education,
            contact: contact,
            status: 'Applied'
        });
    }

    // update card
    static updateCard(id, status) {
        return axios.put(url+id, {
            status: status
        });
    }

    // delete card
    static deleteCard(id) {
        return axios.delete(url+ id);
    }
}

export default CardService;