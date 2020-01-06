import React from 'react';
import './App.css';
import {BrowserRouter , Route , Switch} from 'react-router-dom';
import Theme from './Theme';
import Template from './start/font';
import Register from './start/Register';
import Login from './start/Login';
import Whoops404 from './error404';
import NewsAdmin from './views/tintuc/NewsAdmin';
import SvAdmin from './views/sv/SvAdmin';
import DssvAdmin from './views/dssv/dssvAdmin';
import Hp from './views/dshp/Hphp';
import DshpAdmin from './views/dshp/dshpAdmin';
import Sv from './views/sv/Svsv';
import Dssv from './views/dssv/dssv';

function App(){

  return(
    <BrowserRouter>
    <Theme>
        <Switch>
        <Route exact path="/" component={Template}></Route>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/regist" component={Register}></Route>
        <Route exact path="/logged/admin/news" component={NewsAdmin}></Route>
        <Route exact path="/logged/admin/sv" component={SvAdmin}></Route>
        <Route exact path="/logged/admin/dssv" component={DssvAdmin}></Route>
        <Route path="/logged/admin/hp" component={DshpAdmin}></Route>
        <Route path="/logged/sv" component={Sv}></Route>
        <Route exact path="/logged/dssv" component={Dssv}></Route>
        <Route path="/logged/hp" component={Hp}></Route>
        <Route component={Whoops404}></Route>
        </Switch>
    </Theme>
    </BrowserRouter>
  );
}



export default App;
