import { getHome } from './controllers/home.js'
import { getLogin, getRegister, postRegister, postLogin, getLogout } from './controllers/user.js';
import { getCreate, postCreate ,getDetail,getEdit,postEdit,getDelete, buy} from './controllers/shoe.js';


const app = Sammy("body", function () {
    this.use("Handlebars", "hbs");

    this.get('#/home', getHome);



    this.get('#/login', getLogin);
    this.get('#/register', getRegister);


    this.post('#/register',postRegister );
    this.post('#/login', postLogin);
    this.get('#/logout', getLogout);


    this.get('#/create', getCreate);
    this.post('#/create', postCreate);

    this.get('#/details/:id', getDetail);

    this.get('#/edit/:id', getEdit);
    this.post('#/edit/:id', postEdit);

    this.get('#/delete/:id', getDelete);

    this.get('#/buy/:id', buy);

  
});
app.run('#/home');