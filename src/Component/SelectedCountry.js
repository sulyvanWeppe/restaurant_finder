import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import Toto from './Toto';

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
            <Container id="selected_country">
                <Row>
                    <Col><h3 class="uk-heading-small">Today's Country</h3></Col>
                </Row>
                <Row>
                    <Col><input class="uk-input uk-width-2-3" type="text" value={this.props.country_name}/></Col>
                </Row>
                <Row>
                    <Col><button class="uk-button uk-button-primary uk-width-1-3" onClick={this.handleRefreshClick}>Refresh</button></Col>
                </Row>
            </Container>
        );
    }
}

export default SelectedCountry;