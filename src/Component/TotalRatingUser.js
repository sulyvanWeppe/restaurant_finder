import React from 'react';
import '../uikit-3.4.6/css/uikit.min.css';

class TotalRatingUser extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <p>Total number of user's rating : {this.props.total_rating_user}</p>
        )
    }
}

export default TotalRatingUser;