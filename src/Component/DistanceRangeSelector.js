import React from 'react';
import { Container, Col, Row, Form } from 'react-bootstrap';

class DistanceRangeSelector extends React.Component{
    constructor(props){
        super(props);
    }

    handleRangeChange = (e) => {
        this.props.handleRangeDistanceChange(e.target.value*20);
    }

    render(){
        return (
            <Container >
                <Row><h4>Distance from your location : {this.props.distanceRangeValue} m</h4></Row>
                <Row>
                    <Form.Range onChange={this.handleRangeChange}/>
                </Row>
            </Container>
        );
    }
}

export default DistanceRangeSelector;