import React, { Component } from 'react';
import config from '../../config/config';
import load from '../../helpers/spreadsheet';

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
            console.log('onLoad0',data);
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
        console.log('parties ',parties);
        if (error) {
            return <div>
                {this.state.error}
            </div>
        }
        return (
            // <div>hey</div>
            <ul>
                {parties.map((party, i)=>(
                    <li key={i}>
                    {party.foundationYear} {party.name}
                    </li>
                ))}
            </ul>
        )
    }
}

export default PostList;