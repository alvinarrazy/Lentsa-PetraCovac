//MASIH ERROR JANGAN DIPAKE DULU
import { API } from '../../config';
import axios from 'axios';
import { postConstant } from '../types';
import { authHeader } from '../helpers/auth-header';

export const postService = {
    getAllPost,
    postNewCard,
    // getPost
};

function loadLocalCards() {
    return [
        {
            name: 'Dark Magician',
            atk: '2500',
            def: '2100',
            description: 'The ultimate wizard in terms of attack and defense.',
            src: '/images/Dark-Magician.jpg'
        },
        {
            name: 'Red-Eyes Black Dragon',
            atk: '2400',
            def: '2000',
            description: 'A ferocious dragon with a deadly attack.',
            src: '/images/Red-Eyes_Black_Dragon.png'
        },
        {
            name: 'Blue-Eyes White Dragon',
            atk: '3000',
            def: '2500',
            description: 'This legendary dragon is a powerful engine of destruction. Virtually invincible, very few have faced this awesome creature and lived to tell the tale.',
            src: '/images/Blue-Eyes_White_Dragon.png'
        },
        {
            name: 'Obelisk the Tormentor',
            atk: '4000',
            def: '4000',
            description: "Requires 3 Tributes to Normal Summon (cannot be Normal Set). This card's Normal Summon cannot be negated. When Normal Summoned, cards and effects cannot be activated. Neither player can target this card with card effects. Once per turn, during the End Phase, if this card was Special Summoned: Send it to the GY. You can Tribute 2 monsters; destroy all monsters your opponent controls. This card cannot declare an attack the turn this effect is activated.",
            src: '/images/Obelisk-the-tormentor.jpg'
        },
        {
            name: 'Slifer the Sky Dragon',
            atk: '?',
            def: '?',
            description: "Requires 3 Tributes to Normal Summon (cannot be Normal Set). This card's Normal Summon cannot be negated. When Normal Summoned, cards and effects cannot be activated. Once per turn, during the End Phase, if this card was Special Summoned: Send it to the GY. Gains 1000 ATK/DEF for each card in your hand. If a monster(s) is Normal or Special Summoned to your opponent's field in Attack Position: That monster(s) loses 2000 ATK, then if its ATK has been reduced to 0 as a result, destroy it.",
            src: '/images/Slifer.jpg'
        },
        {
            name: 'The Winged Dragon of Ra',
            atk: '?',
            def: '?',
            description: "Cannot be Special Summoned. Requires 3 Tributes to Normal Summon (cannot be Normal Set). This card's Normal Summon cannot be negated. When Normal Summoned, other cards and effects cannot be activated. When this card is Normal Summoned: You can pay LP so that you only have 100 left; this card gains ATK/DEF equal to the amount of LP paid. You can pay 1000 LP, then target 1 monster on the field; destroy that target.",
            src: '/images/ra.jpg'
        },

    ]
}

// async function getAllPost(){
//     // const data = await axios.get('http://localhost:3001/api/post/getcard')
//     const data = await axios.get(`${API}/${postConstant.GET_ALL_POST}`)
//     console.log(data.data);
//     localStorage.setItem('posts', JSON.stringify(data.data.posts));
//     return data.data.posts;
// }

async function getAllPost() {
    // const data = await axios.get('http://localhost:3001/api/post/getcard')
    // const data = await axios.get(`${API}/${postConstant.GET_ALL_POST}`)
    // console.log(data.data);
    // localStorage.setItem('posts', JSON.stringify(data.data.posts));
    // return data.data.posts;
    localStorage.setItem('localcards', JSON.stringify(loadLocalCards))
}

function postNewCard(newCard) {
    axios.post(`${API}/${postConstant.ADD_POST}`, newCard)
}

// async function getPost(id){
//     // const data = await axios.get('http://localhost:3001/api/post/getcard')
//     const data = await axios.get(`${API}/${postConstant.GET_POST}${id}`)
//     console.log(data.data);
//     localStorage.setItem('preferredPosts', JSON.stringify(data.data.posts));
//     return data.data.posts;
// }

