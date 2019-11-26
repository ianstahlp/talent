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
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`;

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`;

class ActorsUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
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
    handleUpdateActor = async () => {
        const {id, first_name, last_name, middle_name, headshot} = this.state;
        const payload = {first_name, last_name, middle_name, headshot};

        await api.updateActorById(id, payload).then(res => {
            window.alert('Actor info updated successfully');
            this.setState({
                first_name: '',
                last_name: '',
                middle_name: '',
                headshot: ''
            });
        });
    }
    componentDidMount = async () => {
        const {id} = this.state;
        const actor = await api.getActorById(id);

        this.setState({
            first_name: actor.data.data.first_name,
            last_name: actor.data.data.last_name,
            middle_name: actor.data.data.middle_name,
            headshot: actor.data.data.headshot
        });
    };

    render() {
        const {first_name, last_name, middle_name, headshot} = this.state;
        return (
            <Wrapper>
                <Title>Edit Actor Info</Title>
                <Label>First Name: </Label>
                <InputText
                    type="text"
                    value={first_name}
                    onChange={this.handleChangeInputFirstName}
                />
                 <Label>Last Name: </Label>
                <InputText
                    type="text"
                    value={last_name}
                    onChange={this.handleChangeInputLastName}
                />
                 <Label>Middle Name: </Label>
                <InputText
                    type="text"
                    value={middle_name}
                    onChange={this.handleChangeInputMiddleName}
                />
                 <Label>Headshot: </Label>
                <InputText
                    type="text"
                    value={headshot}
                    onChange={this.handleChangeInputHeadshot}
                />
                
                <Button onClick={this.handleUpdateActor}>Update Actor</Button>
                <CancelButton href={'/movies/list'}>Cancel</CancelButton>
            </Wrapper>
        );
    };
};

export default ActorsUpdate;
