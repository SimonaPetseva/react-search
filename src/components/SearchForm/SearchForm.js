import React from 'react';
import {Input, Row, Button, Icon} from 'react-materialize';

const searchForm = (props) => {
    return(
        <Row>
            <Input onChange={props.change} type="text" label="Company Name" value={props.value} s={12} />
            <Button onClick={props.triggerSearch} type='submit' waves='light'>Search<Icon left>search</Icon></Button>
        </Row>
    );
}

export default searchForm;