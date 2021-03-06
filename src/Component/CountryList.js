import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import '../uikit-3.4.6/css/uikit.min.css';

class CountryList extends React.Component{
    constructor(props){
        super(props);
        this.state = {selectedCountry: ''};
    }

    handleAddCountryClick = (e) => {
        var newCountry = prompt('New Country : ');
        this.props.handleAddCountry(newCountry);
        //@ToDo: Add newCountry to the list using the state
        e.preventDefault();
    }

    handleDeleteCountryClick = (e) => {
        //Check a country was selected
        if (this.state.selectedCountry)
        {
            var confirmDeletion = window.confirm('Are you sure you want to remove '+this.state.selectedCountry);
            if (confirmDeletion)
            {
                this.props.handleDeleteCountry(this.state.selectedCountry);
            }
    
            //Reset state property : selectedCountry
            this.setState({selectedCountry: ''});    
        }
        else
        {
            alert('Select a country to delete first');
        }

        e.preventDefault();
    }

    handleCountrySelect = (e) => {
        this.setState({selectedCountry: e.target.innerHTML});
    }

    render(){
        var countriesList = this.props.countries;
        const countriesListDisplay = countriesList.map((element, index) => 
                <li key={index}><button class="uk-button uk-button-link" type="button" onClick={this.handleCountrySelect}>{element}</button></li>
        );

        return (
            <Container id="country_list">
                <Row>
                    <h3 class="uk-heading-small">Food Type List</h3>
                </Row>
                <Row>
                    <div class="uk-panel">
                        <ul class="uk-list">
                            {countriesListDisplay}
                        </ul>
                    </div>
                </Row>
                <Row>
                    <form>
                        <div class="uk-margin">
                            <div class="uk-inline" id="country_management_button">
                                <button class="uk-button uk-button-primary" onClick={this.handleAddCountryClick}>Add Country</button>
                                <button class="uk-button uk-button-primary" onClick={this.handleDeleteCountryClick}>Delete Country</button>
                            </div>
                        </div>
                    </form>  
                </Row>
            </Container>
        );
    }
}

export default CountryList;