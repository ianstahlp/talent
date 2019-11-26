import React, {Component} from 'react';
import ReactTable from 'react-table';
import api from '../api';

import styled from 'styled-components'

import 'react-table/react-table.css'

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
    max-width: 1190px;
    margin: 0 auto;
`

const Update = styled.div`
    color: #ef9b0f;
    cursor: pointer;
`

const Delete = styled.div`
    color: #ff0000;
    cursor: pointer;
`

class UpdateActor extends Component {
    updateUser = event => {
        event.preventDefault();
        window.location.href = `/actors/update/${this.props.id}`;
    };

    render() {
        return <Update onClick={this.updateUser}>Update</Update>
    };
};

class DeleteActor extends Component {
    deleteUser = event => {
        event.preventDefault();
        if (
            window.confirm(
                `Do you want to delete actor ${this.props.id} permanently?`,
            )
        ) {
            api.deleteActorById(this.props.id);
            window.location.reload();
        };
    };

    render() {
        return <Delete onClick={this.deleteUser}>Delete</Delete>
    };
};

class ActorsList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            actors: [],
            columns: [],
            isLoading: false
        };
    };
    componentDidMount = async () => {
        this.setState({isLoading: true});

        await api.getAllActors().then(actors => {
            this.setState({
                actors: actors.data.data,
                isLoading: false
            });
        });
    };

    render() {
        const {actors, isLoading} = this.state;
        console.log('TCL: ActorsList->render->actors', actors);

        const columns = [
            {
                Header: 'ID',
                accessor: '_id',
                filterable: true,
            },
            {
                Header: 'First Name',
                accessor: 'first_name',
                filterable: true,
            },
            {
                Header: 'Middle Name',
                accessor: 'middle_name',
                filterable: true,
            },
            {
                Header: 'Headshot',
                accessor: 'headshot',
                filterable: false,
                Cell: props => <img src={props.value} />
                // Cell: props => <span>{props.value.join('/')}</span>
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <DeleteActor id={props.original._id} />
                        </span>
                    )
                },
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <UpdateActor id={props.original._id} />
                        </span>
                    )
                },
            },
        ];
        let showTable = true;
        if(!actors.length) {
            showTable = false;
        }
        return (
            <Wrapper>
                {showTable && (
                    <ReactTable
                        data={actors}
                        columns={columns}
                        loading={isLoading}
                        defaultPageSize={10}
                        showPageSizeOptions={true}
                        minRows={0}
                    />
                )}
            </Wrapper>
        );
    };
};

export default ActorsList;