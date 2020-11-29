import React, {Component} from 'react';
import Axios from 'axios';
const prefix = "http://localhost:3000/api/url/";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const short_url = urlParams.get('short_url');


export default class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            long_url: ""
        };
        this.deleteButtonClicked = this.deleteButtonClicked.bind(this);
        this.editButtonClicked = this.editButtonClicked.bind(this);
        this.deleteUrl = this.deleteUrl.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }

    editButtonClicked() {
        this.editUrl();
    }

    deleteButtonClicked() {
        this.deleteUrl();
    }

    onInputChange(evt) {
        this.setState({long_url: evt.target.value});
    }

    editUrl() {
        const long_url = this.state.long_url;

        Axios.put(`${prefix}${short_url}?long_url=${long_url}`)
        .then(function(response) {
            alert("Updated successfully");
        })
        .catch(function(error) {
            console.log(error);
        });
    }

    deleteUrl() {
        Axios.delete(`${prefix}${short_url}`)
            .then(function() {
                alert("Successfully deleted");
            })
            .catch(function() {
                alert("Deletion error");
            });
    }

    render() {

        return (
            <div>
                <h2>Edit</h2>
                <input onChange={this.onInputChange} placeholder="Long Url"></input>
                <button onClick={this.editButtonClicked}>EDIT</button>
                <button onClick={this.deleteButtonClicked}>DELETE</button>
            </div>
        
        );
    }
}