import commonPartials from './partials.js';
import { setHeader } from './auth.js';
import { getAll } from '../models/events.js';

export function getHome(ctx) {
    setHeader(ctx);

    getAll()
    .then(res => {
   
      const shoes = res.docs.map(x => x = { ...x.data(), id: x.id });

        ctx.shoes = shoes.sort((a,b)=> b.buyers - a.buyers );
     

       
    ctx.loadPartials(commonPartials).partial('./view/home.hbs'); 
});

}