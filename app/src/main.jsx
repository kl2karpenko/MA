import React from 'react';

var HomePage = React.createClass({
    render: function () {
        return (
            <div>
                Second App!
            </div>
        );
    }
});

React.render(
    <HomePage />,
    document.body
);