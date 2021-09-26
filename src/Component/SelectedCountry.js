import React from 'react';
import '../uikit-3.4.6/css/uikit.min.css';

class SelectedCountry extends React.Component{
    constructor(props){
        super(props);
    }

    handleRefreshClick = (e) => {
        this.props.handleRefresh();
        e.preventDefault();
    }

    render(){
        return (
                    <div class="uk-container uk-container-center">
                        <div class="uk-grid">
                            <div class="uk-width-1-1">
                                <h1 class="uk-heading-small">Today's Country</h1>
                                <form>
                                    <div class="uk-margin">
                                        <div class="uk-inline">
                                            <input class="uk-input uk-width-2-3" type="text" value={this.props.country_name}/>
                                            <button class="uk-button uk-button-primary uk-width-1-3" onClick={this.handleRefreshClick}>Refresh</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
        );
    }
}

export default SelectedCountry;