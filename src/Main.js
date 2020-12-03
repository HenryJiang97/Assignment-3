import React, { Component } from 'react';
import Axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
const prefix = 'https://cs5620-assignment3-backend.herokuapp.com/api/url/';

var urlencode = require('urlencode');

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            long_url: '',
            short_url: '',
        };
        this.onLongUrlInputChange = this.onLongUrlInputChange.bind(this);
        this.onShortUrlInputChange = this.onShortUrlInputChange.bind(this);
        this.onGetButtonClick = this.onGetButtonClick.bind(this);
        this.getUrl = this.getUrl.bind(this);
        this.resetState = this.resetState.bind(this);
    }

    onLongUrlInputChange(evt) {
        this.setState({ long_url: evt.target.value });
    }

    onShortUrlInputChange(evt) {
        this.setState({ short_url: evt.target.value });
    }

    resetState() {
        this.setState({
            long_url: '',
            short_url: '',
        });
    }

    onGetButtonClick() {
        document.getElementById('long_url').value = '';
        document.getElementById('short_url').value = '';
        this.getUrl();
    }

    validURL(str) {
        var pattern = new RegExp(
            '^(https?:\\/\\/)' + // protocol
                '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
                '((\\d{1,3}\\.){3}\\d{1,3}))' + // ip (v4) address
                '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + //port
                '(\\?[;&amp;a-z\\d%_.~+=-]*)?' + // query string
                '(\\#[-a-z\\d_]*)?$',
            'i'
        );
        return pattern.test(str);
    }

    getUrl() {
        const that = this;
        const long_url = urlencode(this.state.long_url, 'gbk');
        console.log('Get Url Long Url: ', long_url);

        var short_url = this.state.short_url;
        if (short_url === '') {
            short_url = uuidv4();
        }
        console.log('Get Url Short Url: ', short_url);

        if (this.validURL(this.state.long_url)) {
            Axios.get(`${prefix}${short_url}/search`)
                .then(function (response) {
                    if (response.data !== '') {
                        // Found short url in the db
                        alert(
                            'This short url aleady exist in DB, please use another one!'
                        );
                        document.getElementById('long_url_label').innerText =
                            'Long URL: ' +
                            urlencode.decode(response.data.long_url, 'gbk');
                        document.getElementById('short_url_label').innerText =
                            'Short URL: ' + prefix + response.data.short_url;
                        that.resetState();
                    } else {
                        // Did not find short url in db
                        that.postUrl(long_url, short_url);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            alert('Invalid URL input');
        }
    }

    postUrl(long_url, short_url) {
        const that = this;
        Axios.post(prefix, {
            long_url: long_url,
            short_url: short_url,
        })
            .then(function (response) {
                alert('successfully compressed url');
                document.getElementById('long_url_label').innerText =
                    'Long URL: ' +
                    urlencode.decode(response.data.long_url, 'gbk');
                document.getElementById('short_url_label').innerText =
                    'Short URL: ' + prefix + response.data.short_url;
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                that.resetState();
            });
    }

    render() {
        return (
            <div>
                <h1>URL Shortener</h1>

                <div>
                    <label>URL: </label>
                    <input
                        type="url"
                        id="long_url"
                        onChange={this.onLongUrlInputChange}></input>
                </div>

                <div>
                    <label>Customized Suffix (Leave blank for random): </label>
                    <input
                        type="url"
                        id="short_url"
                        onChange={this.onShortUrlInputChange}></input>
                </div>

                <div>
                    <button onClick={this.onGetButtonClick}>GET</button>
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
