import React, {Component} from 'react';

export default class Main extends Component {


    render() {
        return (
            <div>
                <h1>URL Shortener</h1>
                
                <div>
                    <label>Your url: </label>
                    <input type="url"></input>
                </div>

                <div>
                    <label>Short url: </label>
                    <h5>PlaceHolder</h5>
                </div>
            </div>
        );
    }
}