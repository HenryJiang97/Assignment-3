import React, {Component} from 'react';
import Axios from 'axios';


export default class Main extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          url: [],
          long_url: '',
          short_url: '',
        }    
      }

    componentDidMount() {
        Axios.get('http://localhost:3000/api/url')
            .then(response => {
                this.setState({url: response.data})
            });
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     return this.state.url !== nextState.url;
    //   }

    onChange(key, event) {
        this.setState(
          {[key]: event.target.value}
        )
      }

    onSubmit() {
        Axios.post(
            'http://localhost:3000/api/url', 
            {
            long_url: this.state.long_url,
            short_url: this.state.short_url,
            }
        ).then(function() {
            return Axios.get('http://localhost:3000/api/url')

        })
        .then(response => {
            this.setState({url: response.data})
        })
        .catch(error => console.log(error))
        .finally(() => this.setState(
            {
                long_url: '',
                short_url: '',
            }    
            )
        )   
    }

    // onSearch() {
    //     Axios.get(
    //         'http://localhost:3000/api/url'+this.state.long_url
            
    //     ).then(function() {
    //         return Axios.get('http://localhost:3000/api/url'+this.state.long_url)

    //     })
    //     .then(response => {
    //         this.setState({url: response.data})
    //     })
    //     .catch(error => console.log(error))
    //     .finally(() => this.setState(
    //         {
    //             long_url: '',
    //             short_url: '',
    //         }    
    //         )
    //     )   
    // }
    render() {
        return (
            <div>
                <h1>URL Shortener</h1>
                
                <div>
                    {this.state.url.map(link => 
                        <div>
                        <span>{link.long_url}</span>
                        <span><strong>{link.short_url}</strong></span>
                        </div>
                    )
                    }
                    <label>Your url: </label>
                    <input id="long_url" value={this.state.long_url} 
                    onChange={(e) => this.onChange('long_url', e)}></input>
                </div>

                <div>
                    <label>Your abbreviation: </label>
                    <input id="short_url" value={this.state.short_url} 
                    onChange={(e) => this.onChange('short_url', e)}></input>
                </div>

                <div>
                    <button onClick={() => this.onSubmit()}>Submit</button>
                    <button>Edit</button>
                    <button onClick={() => this.onSearch()}>Search</button>
                    <button>Delete</button>
                </div>
            </div>
        );
    }
}