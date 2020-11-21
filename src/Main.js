import React, {Component} from 'react';
import Axios from 'axios';

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            long_url: "",
            short_url: ""
        };
        this.onLongUrlInputChange = this.onLongUrlInputChange.bind(this);
        this.onShortUrlInputChange = this.onShortUrlInputChange.bind(this);
        this.onGetButtonClick = this.onGetButtonClick.bind(this);
        this.onPostButtonClick = this.onPostButtonClick.bind(this);
        this.getUrl = this.getUrl.bind(this);
    }

    onLongUrlInputChange(evt) {
        this.setState({long_url: evt.target.value});
    }

    onShortUrlInputChange(evt) {
        this.setState({short_url: evt.target.value});
    }

    onGetButtonClick() {
        this.getUrl();
    }

    onPostButtonClick() {
        this.postUrl();
    }

    getUrl() {
        const long_url = this.state.long_url;
        Axios.get(`http://localhost:3000/api/url/${long_url}`)
            .then(function(response) {
                console.log(response.data);
            })
            .catch(function(error) {
                console.log(error);
            })
            .then(function() {
                
            });
    }

    postUrl() {
        const long_url = this.state.long_url;
        const short_url = this.state.short_url;
        Axios.post('http://localhost:3000/api/url', {
            long_url: long_url,
            short_url: short_url
        })
        .then(function(response) {
            console.log(response.data);
        })
        .catch(function(error) {
            console.log(error);
        })
    }

    render() {
        return (
            <div>
                <h1>URL Shortener</h1>
                
                <div>
                    <label>Your url: </label>
                    <input type="url" onChange={this.onLongUrlInputChange}></input>
                </div>

                <div>
                    <label>Short url: </label>
                    <input type="url" onChange={this.onShortUrlInputChange}></input>
                </div>

                <button onClick={this.onGetButtonClick}>GET</button>
                <button onClick={this.onPostButtonClick}>POST</button>
            </div>
        );
    }
}