import React, {Component} from 'react';
import Axios from 'axios';
import {Redirect} from 'react-router-dom';
const prefix = "http://localhost:3000/api/url/";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const short_url = urlParams.get('short_url');


export default class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            long_url: "",
            toMain: false,
        };
        this.deleteButtonClicked = this.deleteButtonClicked.bind(this);
        this.editButtonClicked = this.editButtonClicked.bind(this);
        this.deleteUrl = this.deleteUrl.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }

    editButtonClicked() {
        this.getAndEditUrl();
    }

    deleteButtonClicked() {
        this.getAndDeleteUrl();
    }

    onInputChange(evt) {
        this.setState({long_url: evt.target.value});
    }

    getAndEditUrl() {
        const that = this;
        Axios.get(`${prefix}${short_url}/search`)
            .then(function(response) {
                if (response.data !== "") {    
                    // Found short url in the db
                    that.editUrl();
                } else {    
                    // Did not find short url in db
                    alert("this short url does not exist in DB, redirecting to main page");
                    that.setState({
                        toMain: true,
                    })
                }
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    getAndDeleteUrl() {
        const that = this;
        Axios.get(`${prefix}${short_url}/search`)
            .then(function(response) {
                if (response.data !== "") {    
                    // Found short url in the db
                    that.deleteUrl();
                } else {    
                    // Did not find short url in db
                    alert("this short url does not exist in DB, redirecting to main page");
                    that.setState({
                        toMain: true,
                    })
                }
            })
            .catch(function(error) {
                console.log(error);
            });
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
        const curState = this;
        Axios.delete(`${prefix}${short_url}`)
            .then(function() {
                alert("Successfully deleted, redirecting to main page");
                curState.setState({
                    toMain: true,
                })
            })
            .catch(function() {
                alert("Deletion error");
            });
    }

    render() {
        if (this.state.toMain) {
            return <Redirect to='/main' />
        }

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