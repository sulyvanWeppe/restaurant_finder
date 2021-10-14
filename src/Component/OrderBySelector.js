import React from 'react';
import { Container, Col, Row, Form } from 'react-bootstrap';

class OrderBySelector extends React.Component{
    constructor(props){
        super(props);
    }

    handleRadioChange = (e) => {
        this.props.handleOrderByChange(e.target.id);
    }

    render(){
        return (
            <Container >
                <Row><h4>Order result by : </h4></Row>
                <Row>
                    <Form.Group as={Row} className="mb-3" >
                        <Col>
                            <Form.Check
                            type="radio"
                            label="Rating"
                            name="orderBySelectorRadios"
                            id="rating"
                            onChange={this.handleRadioChange}
                            defaultChecked
                            />
                            <Form.Check
                            type="radio"
                            label="Distance from location"
                            name="orderBySelectorRadios"
                            id="distance"
                            onChange={this.handleRadioChange}
                            />
                        </Col>
                    </Form.Group>
                </Row>
            </Container>
        );
    }
}

export default OrderBySelector;