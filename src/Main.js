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
        document.getElementById("long_url").value = "";
        document.getElementById("short_url").value = "";
        this.getUrl();
    }

    getUrl() {
        const that = this;
        const long_url = this.state.long_url;
        let short_url = this.state.short_url;

        Axios.get(`http://localhost:3000/api/url/${long_url}`)
            .then(function(response) {
                console.log(response.data);

                if (response.data !== "") {    // Found url in the db
                    alert("Url exist in the database");

                    document.getElementById("long_url_label").innerText = "Long URL: " + response.data.long_url;
                    document.getElementById("short_url_label").innerText = "Short URL: " + response.data.short_url;

                } else {    // Not found url in the db
                    alert("No short version for this url, created one.");
                    if (short_url === "") {
                        short_url = uuidv4();
                    }
                    that.postUrl(long_url, short_url);
                }
            })
            .catch(function(error) {
                console.log(error);
            })
            .then(function() {
                that.setState({
                    long_url: "",
                    short_url: ""
                });
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

            document.getElementById("long_url_label").innerText = "Long URL: " + response.data[0].long_url;
            document.getElementById("short_url_label").innerText = "Short URL: " + response.data[0].short_url;
        })
        .catch(function(error) {
            console.log(error);
        })
        .then(function() {
            that.setState({
                long_url: "",
                short_url: ""
            });
        });
    }

    render() {
        return (
            <div>
                <h1>URL Shortener</h1>
                
                <div>
                    <label>URL: </label>
                    <input type="url" id="long_url" onChange={this.onLongUrlInputChange}></input>
                </div>

                <div>
                    <label>Customized Suffix (Leave blank for random): </label>
                    <input type="url" id="short_url" onChange={this.onShortUrlInputChange}></input>
                </div>

                <div>
                    <button onClick={this.onGetButtonClick}>PROCESS</button>
                </div>

                <div>
                    <h3>Result</h3>
                    <h4 id="long_url_label"> </h4>
                    <h4 id="short_url_label"> </h4>
                </div>

            </div>
        );
    }
}