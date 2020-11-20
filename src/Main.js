import React, {Component} from 'react';

export default class Main extends Component {


    render() {
        return (
            <div>
                <h1>URL Shortener</h1>
                
                <div>
                    <label>Your url: </label>
                    <input type="long-url"></input>
                </div>

                <div>
                    <label>Your abbreviation: </label>
                    <input type="short-url"></input>
                </div>

                <div>
                    <button>Generate</button>
                    <button>Edit</button>
                    <button>Search</button>
                    <button>Delete</button>
                </div>
            </div>
        );
    }
}