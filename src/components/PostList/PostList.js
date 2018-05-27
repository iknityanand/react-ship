import React, { Component } from 'react';
import config from '../../config/config';
import load from '../../helpers/spreadsheet';

import ReactTable from 'react-table';
import "react-table/react-table.css";

class PostList extends Component {

    constructor() {
        super();
        this.state = {
            parties: [],
            error: null
        }
    }

    componentDidMount() {
        //loading javascript library for client
        window.gapi.load("client", this.initClient);
    }

    onLoad = (data, error) => {
        if (data) {
            console.log('onLoad0', data);
            const parties = data.parties;
            console.log(parties);
            this.setState({ parties });
        } else {
            this.setState({ error });
        }
    };

    initClient = () => {
        //initializ e js client library
        window.gapi.client.init({
            apiKey: config.apiKey,
            discoveryDocs: config.discoveryDocs
        })
            .then(() => {
                load(this.onLoad);
            })
    }

    render() {
        const { parties, error } = this.state;

        const columns = [{
            Header: 'Name',
            accessor: 'name'
        }, {
            Header: 'Abbreviation',
            accessor: 'abbreviation'
        }, {
            Header: 'Foundation Year',
            accessor: 'foundationYear'
        }, {
            Header: 'Current Leader',
            accessor: 'currentLeader'
        }, {
            Header: 'States/UT',
            accessor: 'statesUT'
        }, {
            Header: 'Symbol',
            accessor: 'symbol'
        }]

        console.log('parties ', parties);
        if (error) {
            return <div>
                {this.state.error}
            </div>
        }
        return (
            <div>
                <h1>List of political parties in India</h1>
                <ReactTable
                    data={this.state.parties}
                    columns={columns}
                />


            </div>
        )
    }
}

export default PostList;