import React from 'react';

var List = React.createClass({
    render: function() {
        return (
            <div>
                <div><a href="#/">返回首页</a></div>
                <div>这是列表页</div>
                <div>{this.props.children}</div>
            </div>
        );
    }
});

export default  List;