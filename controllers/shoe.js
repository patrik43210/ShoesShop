import { setHeader } from "./auth.js";
import commonPartials from './partials.js';
import { create ,get, update, deleteIT } from '../models/events.js';


export function getCreate(ctx) {
    setHeader(ctx);
    ctx.loadPartials(commonPartials).partial('./view/events/create.hbs');

}
export function postCreate(ctx) {
    const { name, price,imageUrl, description, brand } = ctx.params;
    if(name && price &&imageUrl&& description&& brand){
    const organizer = sessionStorage.getItem('user');
    create({  name, price,imageUrl, description, brand , organizer, buyers:0, people: [] })
        .then(() => {
            ctx.redirect('#/home');
        }).catch(e => console.log(e));
    }
}


export function getDetail(ctx) {
    setHeader(ctx);

    const id = ctx.params.id;
    get(id)
        .then(res => {
            const sho = res.data();
            const people = sho.people;
            const person = people.indexOf(sessionStorage.getItem('email'));

            if(person !== -1){
                ctx.isBought = true;
                }
            const shoe = { ...res.data(), id: res.id };
            ctx.isOrganizer = shoe.organizer === sessionStorage.getItem('user');
            ctx.shoe = shoe;
            ctx.loadPartials(commonPartials).partial('./view/events/details.hbs');

        }).catch(e => console.log(e));

}


export function getEdit(ctx) {
    setHeader(ctx);

    const id = ctx.params.id;

    get(id)
        .then(res => {
            const shoe = { ...res.data(), id: res.id };
            ctx.shoe = shoe;
            ctx.loadPartials(commonPartials).partial('./view/events/edit.hbs');

        }).catch(e => console.log(e));

}

export function postEdit(ctx) {
    setHeader(ctx);


    const id = ctx.params.id;
    const { name, price,imageUrl, description, brand } = ctx.params;

    update(id, { name, price,imageUrl, description, brand })
        .then(() => {
            ctx.redirect(`#/details/${id}`);
        }).catch(e => console.log(e));
}


export function getDelete(ctx) {

    const id = ctx.params.id;
    deleteIT(id)
        .then(() => {
            ctx.redirect('#/home');
        }).catch(e => console.log(e));
}



export function buy(ctx) {
    const id = ctx.params.id;
    
    get(id)
        .then(res => {
            const shoe = res.data();
            const email =sessionStorage.getItem('email');
            const people = shoe.people;

            const person = people.indexOf(sessionStorage.getItem('email'));

            if(person !== -1){
                return;}

            const buyers = shoe.buyers + 1;
            update(id, { buyers, 
                people: firebase.firestore.FieldValue.arrayUnion( email )
             })
                .then(() => {
                    ctx.redirect(`#/details/${id}`);
                    
                }).catch(e => console.log(e));
        }).catch(e => console.log(e));

}