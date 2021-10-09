import React from 'react';
import '../uikit-3.4.6/css/uikit.min.css';
import CountryList from './CountryList';
import SelectedCountry from './SelectedCountry';
import OrderBySelector from './OrderBySelector';
import DistanceRangeSelector from './DistanceRangeSelector';
import * as ArrayUtil from "../Util/ArrayUtil.js"
import { Container, Row, Col } from 'react-bootstrap';

class CountryManagement extends React.Component{
    constructor(props){
        super(props);
    }

    handleRefresh = () => {
        var randomCountry;
        do {
            randomCountry = ArrayUtil.getRandomElement(this.props.countriesList) ?? '';
        } while (randomCountry === this.props.selectedCountry)
        
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

    handleRangeDistanceChange = (distance) => {
        this.props.handleRange(distance);
    }

    render(){
        return ( 
            <Container id="country_management">
                <Row>
                    <Col>
                        <SelectedCountry country_name={this.props.selectedCountry} handleRefresh={this.handleRefresh} />
                        <CountryList countries={this.props.countriesList} handleAddCountry={this.handleAddCountry} handleDeleteCountry={this.handleDeleteCountry} />
                        <div class="uk-divider-icon"></div>
                        <h3>Settings</h3>
                        <OrderBySelector handleOrderByChange={this.props.handleOrderBy}/>
                        <DistanceRangeSelector handleRangeDistanceChange={this.handleRangeDistanceChange} distanceRangeValue={this.props.distanceRangeValue}/>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default CountryManagement;