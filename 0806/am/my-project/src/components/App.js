

import React from 'react';
import ReactDom from 'react-dom';

import List from './list'

import Detail from './deatail'

import Index from './index'

import Innews from './innews'

import { Router, Route, hashHistory,IndexRoute } from 'react-router';

var App = React.createClass({
    render: function() {
        return (
            <div>
                <h5 className="title">hello, yeoman app!</h5>
                <div>React Router: </div>
                <div>{this.props.children}</div>
            </div>
        );
    }
});

// var List = React.createClass({
//     render: function() {
//         return (
//             <div>
//                 <div><a href="#/">返回首页</a></div>
//                 <div>这是列表页</div>
//             </div>
//         );
//     }
// });

// var Detail = React.createClass({
//     render: function() {
//         return (
//             <div>
//                 <div><a href="#/">返回首页</a></div>
//                 <div>这是详情页</div>
//             </div>
//         );
//     }
// });

//最终渲染
ReactDom.render((
    <Router history={hashHistory}>
        <Route path='/' component={App}>
                <IndexRoute component={Index} />
                 <Route path='/detail' component={Detail} />
                <Route path='list' component={List} />
                    <IndexRoute component={Innews} />
                    {/* <Route path='list/innews' component={Innews} />  */}
                 </Route>
         </Route>
    </Router>
), document.getElementById('app'));

export default App
