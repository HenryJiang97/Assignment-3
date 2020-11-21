import React, {Component} from 'react';
import Axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

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
        this.getUrl = this.getUrl.bind(this);
    }

    onLongUrlInputChange(evt) {
        this.setState({long_url: evt.target.value});
    }

    onShortUrlInputChange(evt) {
        this.setState({short_url: evt.target.value});
    }

    onGetButtonClick() {
        document.getElementById("url").value = "";
        this.getUrl();
    }

    getUrl() {
        const that = this;
        const long_url = this.state.long_url;

        Axios.get(`http://localhost:3000/api/url/${long_url}`)
            .then(function(response) {
                console.log(response.data);

                if (response.data !== "") {    // Found url in the db
                    alert("Url exist in the database");
                    that.setState({
                        long_url: response.data.long_url,
                        short_url: response.data.short_url
                    });
                } else {    // Not found url in the db
                    alert("No short version for this url, created one.");
                    let short_url = uuidv4();
                    that.postUrl(long_url, short_url);
                }
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    postUrl(long_url, short_url) {
        const that = this;

        Axios.post('http://localhost:3000/api/url', {
            long_url: long_url,
            short_url: short_url
        })
        .then(function(response) {
            console.log(response.data);

            that.setState({
                long_url: response.data[0].long_url,
                short_url: response.data[0].short_url
            });
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
                    <label>URL: </label>
                    <input type="url" id="url" onChange={this.onLongUrlInputChange}></input>
                </div>

                {/* <div>
                    <label>Short url: </label>
                    <input type="url" onChange={this.onShortUrlInputChange}></input>
                </div> */}

                <div>
                    <button onClick={this.onGetButtonClick}>GET</button>
                </div>

                <div>
                    <h3>Result</h3>
                    <h4>Long URL: {this.state.long_url}</h4>
                    <h4>Short URL: {this.state.short_url}</h4>
                </div>

            </div>
        );
    }
}