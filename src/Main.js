// import React, {Component} from 'react';
// import Axios from 'axios';


// export default class Main extends Component {
//     constructor(props) {
//         super(props);
    
//         this.state = {
//           url: [],
//           long_url: '',
//           short_url: '',
//         }    
//       }

//     componentDidMount() {
//         Axios.get('http://localhost:3000/api/url')
//             .then(response => {
//                 this.setState({url: response.data})
//             });
//     }

//     // shouldComponentUpdate(nextProps, nextState) {
//     //     return this.state.url !== nextState.url;
//     //   }

//     onChange(key, event) {
//         this.setState(
//           {[key]: event.target.value}
//         )
//       }

//     onSubmit() {
//         Axios.post(
//             'http://localhost:3000/api/url', 
//             {
//             long_url: this.state.long_url,
//             short_url: this.state.short_url,
//             }
//         ).then(function() {
//             return Axios.get('http://localhost:3000/api/url')

//         })
//         .then(response => {
//             this.setState({url: response.data})
//         })
//         .catch(error => console.log(error))
//         .finally(() => this.setState(
//             {
//                 long_url: '',
//                 short_url: '',
//             }    
//             )
//         )   
//     }

//     // onSearch() {
//     //     Axios.get(
//     //         'http://localhost:3000/api/url'+this.state.long_url
            
//     //     ).then(function() {
//     //         return Axios.get('http://localhost:3000/api/url'+this.state.long_url)

//     //     })
//     //     .then(response => {
//     //         this.setState({url: response.data})
//     //     })
//     //     .catch(error => console.log(error))
//     //     .finally(() => this.setState(
//     //         {
//     //             long_url: '',
//     //             short_url: '',
//     //         }    
//     //         )
//     //     )   
//     // }
//     render() {
//         return (
//             <div>
//                 <h1>URL Shortener</h1>
                
//                 <div>
//                     {this.state.url.map(link => 
//                         <div>
//                         <span>{link.long_url}</span>
//                         <span><strong>{link.short_url}</strong></span>
//                         </div>
//                     )
//                     }
//                     <label>Your url: </label>
//                     <input id="long_url" value={this.state.long_url} 
//                     onChange={(e) => this.onChange('long_url', e)}></input>
//                 </div>

//                 <div>
//                     <label>Your abbreviation: </label>
//                     <input id="short_url" value={this.state.short_url} 
//                     onChange={(e) => this.onChange('short_url', e)}></input>
//                 </div>

//                 <div>
//                     <button onClick={() => this.onSubmit()}>Submit</button>
//                     <button>Edit</button>
//                     <button onClick={() => this.onSearch()}>Search</button>
//                     <button>Delete</button>
//                 </div>
//             </div>
//         );
//     }
// }

import React, {Component} from 'react';
import Axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
// import {Redirect, Route} from 'react-router-dom';

var urlencode = require('urlencode');

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            long_url: "",
            short_url: "",
        };
        this.onLongUrlInputChange = this.onLongUrlInputChange.bind(this);
        this.onShortUrlInputChange = this.onShortUrlInputChange.bind(this);
        this.onGetButtonClick = this.onGetButtonClick.bind(this);
        this.onEditButtonClick = this.onEditButtonClick.bind(this);
        this.getUrl = this.getUrl.bind(this);
        this.editUrl = this.editUrl.bind(this);
        this.deleteUrl = this.deleteUrl.bind(this);
    }

    onLongUrlInputChange(evt) {
        console.log(evt.target.value);
        this.setState({long_url: evt.target.value});
        
    }

    onShortUrlInputChange(evt) {
        this.setState({short_url: evt.target.value});
    }

    

    onEditButtonClick() {
        // document.getElementById("long_url").value = "";
        // document.getElementById("short_url").value = "";

        this.editUrl();
    }

    onDeleteButtonClick(short_url) {
        console.log("press delete button")
        console.log(short_url);
        this.deleteUrl(short_url);
    }

 

    getUrl() {
        const curState = this;
        const long_url = urlencode(this.state.long_url, 'gbk');
        console.log("long url");
        console.log(long_url);
        
        var short_url = this.state.short_url;
        if (short_url === "") {
            short_url = uuidv4();
        };
        console.log(short_url);

        Axios.get(`http://localhost:3000/api/url/${short_url}/search`)
            .then(function(response) {
                console.log("response from backend");
                console.log(response);
                console.log("182...........................");
                console.log(long_url, short_url);
                if (response.data !== "") {    
                    // Found short url in the db
                    alert("This short url aleady exist in DB, please use another one!");
                    return null;

                } else {    
                    //did not find short url in db
                    curState.postUrl(long_url, short_url);
                    return true;
                
                    // postUrl(long_url, short_url_input) 
                    // Axios.get(`http://localhost:3000/api/url/${short_url_input}`)
                    // .then(function(response) {
                    //     console.log(response.data);

                    //     if (response.data !== "") {    
                    //         // Found short url in the db
                    //         alert("short Url exist in the database");

                    //         document.getElementById("long_url_label").innerText = "Long URL: " + urlencode.decode(response.data.long_url, 'gbk');
                    //         document.getElementById("short_url_label").innerText = "Short URL: " + response.data.short_url;

                    //         curState.setState({
                    //             long_url: urlencode.decode(response.data.long_url, 'gbk'),
                    //             short_url: "",
                    //             toDashboard: true,
                    //         });
                            

                    //     }else{
                    //         alert("No short version for this url, created one.");
                            
                    //         console.log("the input short_url is");
                    //         console.log(short_url_input);
                    //         curState.postUrl(long_url, short_url_input);
                    //     }
                    // })
                    
                }
            })
            .catch(function(error) {
                console.log(error);
            });
        
            
    }
    editUrl() {
        const curState = this;
        console.log("cur state");
        console.log(curState);
        const long_url = urlencode(this.state.long_url, 'gbk');
        var short_url_input = this.state.short_url;
        console.log("from edit url");
        console.log(long_url);
        console.log(short_url_input);
        this.editLongUrl(curState, long_url, short_url_input);

    }

    deleteUrl(short_url) {
        const curState = this;
        console.log("cur state");
        console.log(short_url);
        Axios.delete(`http://localhost:3000/api/url/${short_url}`)
        .then(function(response){
            if (response.data !== "") { 
                alert("Successfully deleted url");
                curState.setState({
                    long_url: "",
                    short_url: "",
                    toDashboard: false,
                });
            }
        })
    }

    editLongUrl(curState, long_url, short_url_input) {
        Axios.put(`http://localhost:3000/api/url/${short_url_input}?long_url=${long_url}`)
        .then(function(response) {
            console.log(response.data);

            if (response.data !== "") {    
                // Found short url in the db
                // update long url in the db successfully

                // document.getElementById("long_url_label").innerText = "Long URL: " + urlencode.decode(response.data.long_url, 'gbk');
                // document.getElementById("short_url_label").innerText = "Short URL: " + response.data.short_url;

                curState.setState({
                    long_url: long_url,
                    short_url: "",
                    toDashboard: true,
                });

            }else{
                alert("No able to edit short url, created one");
                if (short_url_input === "") {
                    short_url_input = uuidv4();
                }
                console.log("the input short_url is");
                console.log(short_url_input);
                curState.postUrl(long_url, short_url_input);
            }
        })
    }

    postUrl(long_url, short_url) {
        const curState = this;
        console.log("post url is: ");
        console.log(short_url);
        console.log(long_url);
        let redirecturl = "";
        Axios.post('http://localhost:3000/api/url/', {
            long_url: long_url,
            short_url: short_url,
        })
        .then(function(response) {
            alert("successfully compressed url");
            console.log(response.data.long_url);
            console.log(response.data.short_url);
            redirecturl = urlencode.decode(response.data.long_url, 'gbk');
            console.log(redirecturl);
            document.getElementById("long_url_label").innerText = "Long URL: " + urlencode.decode(response.data.long_url, 'gbk');
            document.getElementById("short_url_label").innerText = "Short URL: " + response.data.short_url;
        })
        .catch(function(error) {
            console.log(error);
            alert("error in compressing url");
        })
        .then(function() {
            curState.setState({
                long_url: "",
                short_url: "",
            });
        });
    }

    onGetButtonClick() {
        document.getElementById("long_url").value = "";
        document.getElementById("short_url").value = "";
        this.getUrl();
    }

    render() {
        if(this.state.toDashboard){
            const url = urlencode.decode(this.state.long_url, 'gbk');
            const short_url = this.state.short_url;
            console.log(url);
            return (
                <div>
                    <a href={url}><strong>The long url you want to compress: </strong>{url}</a>
                    <div><strong>The abbreviation: </strong>{short_url}</div>
                    <input type="url" id="long_url" onChange={this.onLongUrlInputChange}></input>
                    <button onClick={this.onEditButtonClick}>Edit</button>
                    <button onClick={this.onDeleteButtonClick(short_url)}>Delete</button>
                </div>
            );
        }

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