import React from 'react';
import '../uikit-3.4.6/css/uikit.min.css';
import CountryList from './CountryList';
import SelectedCountry from './SelectedCountry';
import UIkit from '../uikit-3.4.6/css/uikit.min.css';
import * as ArrayUtil from "../Util/ArrayUtil.js"

class CountryManagement extends React.Component{
    constructor(props){
        super(props);
    }

    handleRefresh = () => {
        const randomCountry = ArrayUtil.getRandomElement(this.props.countriesList) ?? '';
        this.props.handleRefresh(randomCountry);
    }

    handleAddCountry = (country) => {
        //Check if country already in the list
        if (this.props.countriesList.includes(country))
        {
            alert('This country is already in the list');
        }
        else
        {
            this.props.handleAddCountry(country);
        }
    }   

    handleDeleteCountry = (country) => {
        this.props.handleDeleteCountry(country);
    }

    render(){
        return (   
            <div class="uk-container uk-container-center" class="uk-width-1-3">
                <div class="uk-grid">
                    <div class="uk-width-1-1">
                        <SelectedCountry country_name={this.props.selectedCountry} handleRefresh={this.handleRefresh} />
                        <CountryList countries={this.props.countriesList} handleAddCountry={this.handleAddCountry} handleDeleteCountry={this.handleDeleteCountry} />
                    </div>
                </div>
            </div>
        );
    }
}

export default CountryManagement;