import React from 'react';
import './App.css';
import app from './firebase.js'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const db = app.database();

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    }
  }

  componentDidMount() {
    db.ref().once('value').then(snapshot => {
      let posts = snapshot.val().reverse()
      let newState = [];
      for (let post in posts) {
        newState.push({
          id: posts.length - 1 - parseInt(post),
          content: posts[post].content,
          date: posts[post].date
        });
      }
      this.setState({
        posts: newState
      });
    });
  }
  
  render() {
    return (
      <div className="Posts">
        {this.state.posts.map(post => {
          return (
            <div className="card mb-4 ml-4 mr-4">
              <div className="card-body">  
                <div className="posts">
                  <p className="card-title text-left">#NTUConfessions{post.id}</p>
                  <p className="card-text text-left">"{post.content}"</p>
                  <p className="card-text text-left">Submitted {post.date}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    );
  }
}

class Navbar extends React.Component {
  render() {
    return (
      <Router>
        <nav class="navbar navbar-expand-md navbar-light bg-light mb-4">
          <Link to="/" class="navbar-brand mb-0 h1 ml-3">CONfess</Link>
          <Link to="/confess" class="nav-item nav-link">Post Confession</Link>
          <a href="https://www.facebook.com/NTUConfess/" target="_blank" class="nav-item nav-link">View on FB</a>
        </nav> 
        <Switch>
          <Route path="/confess">
            <Confess />
          </Route>
          <Route path="/">
            <Posts />
          </Route>
        </Switch>
      </Router>
    )
  }
}

class Confess extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 1,
      content: '',
      date: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  write() {
    db.ref().once('value').then(snapshot => {
      let num = snapshot.val().length;
      this.setState({
        id: num
      });
    }).then(() => {
      db.ref('/' + this.state.id).set({
        content: this.state.content,
        date: this.state.date
      });
    });
  }

  handleChange(event) {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth()+1;
    let year = date.getFullYear();
    let parsedDate = year + "-" + month + "-" + day;
    this.setState({content: event.target.value, date: parsedDate});
  }

  handleSubmit(event) {
    this.write();
    alert('Submitted confession!');
    event.preventDefault();
  }

  render() {
    return (
      <div className="ml-5 mr-5">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label for="content">Say what you want to say:</label>
            <textarea class="form-control" value={this.state.content} onChange={this.handleChange} id="content" rows="25" />
          </div>
          <input type="submit" value="Submit" class="btn btn-primary mb-2" />
        </form>
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Navbar />
      </div>
    );
  }
}

export default App;
