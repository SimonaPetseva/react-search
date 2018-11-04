import React from 'react';
import {Col, Row, Card} from 'react-materialize';

const results = (props) =>{
    
    return(
        <Row>
            <Col m={12} s={12}>
                <Card className="hoverable" style={props.style} className='white' textClassName='black-text' title={props.name} actions={[<a href={props.url}>{props.url}</a>]}>
                </Card>
            </Col>
        </Row>
    );
}

export default results;