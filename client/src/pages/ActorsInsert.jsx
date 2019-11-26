import React, {Component} from 'react';
import api from '../api';

import styled from 'styled-components';

const Title = styled.h1.attrs({
    className: 'h1',
})``;


const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    max-width: 1110px;
    margin: 0 auto;
`;

const Label = styled.label`
    margin: 5px;
`;

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`;

const Button = styled.button.attrs({
    className: 'btn btn-primary',
})`
    margin: 15px 15px 15px 5px;
`;

const CancelButton = styled.a.attrs({
    className: 'btn btn-danger',
})`
    margin: 15px 15px 15px 5px;
`;

class ActorsInsert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            middle_name: '',
            headshot: '',
        };
    };

    handleChangeInputFirstName = async event => {
        const first_name = event.target.value;
        this.setState({first_name});
    };
    handleChangeInputLastName = async event => {
        const last_name = event.target.value;
        this.setState({last_name});
    };
    handleChangeInputMiddleName = async event => {
        const middle_name = event.target.value;
        this.setState({middle_name});
    };
    handleChangeInputHeadshot = async event => {
        const headshot = event.target.value;
        this.setState({headshot});
    };

    handleIncludeActor = async () => {
        const {first_name, last_name, middle_name, headshot} = this.state;
        const payload = {first_name, last_name, middle_name, headshot};

        await api.insertActor(payload).then(res => {
            window.alert('Actor added successfully');
            this.setState({
                first_name: '',
                last_name: '',
                middle_name: '',
                headshot: '',
            });
        });
    };

    render() {
        const {first_name, last_name, middle_name, headshot} = this.state;
        return(
            <Wrapper>
                <Title>Add Actor</Title>
                <Label>First Name:</Label>
                <InputText
                    type="text"
                    value={first_name}
                    onChange={this.handleChangeInputFirstName}
                />
                <Label>Last Name:</Label>
                <InputText
                    type="text"
                    value={last_name}
                    onChange={this.handleChangeInputLastName}
                />
                <Label>Middle Name:</Label>
                <InputText
                    type="text"
                    value={middle_name}
                    onChange={this.handleChangeInputMiddleName}
                />
                <Label>Headshot: <small>(Need url)</small></Label>
                  <InputText
                    type="text"
                    value={headshot}
                    onChange={this.handleChangeInputHeadshot}
                />
                <Button onClick={this.handleIncludeActor}>Add Actor</Button>
                <CancelButton href={'/actors/list'}>Cancel</CancelButton>
            </Wrapper>
        );
    };
};

export default ActorsInsert;