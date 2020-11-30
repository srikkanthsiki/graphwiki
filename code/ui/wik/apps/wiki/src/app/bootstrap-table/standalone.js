// components/Standalone.js
import React, { Component } from 'react';
import axios from 'axios';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

// API END POINT

class Standalone extends Component {
  state = {
    // Initial state.
    isFetching: false,
    posts: [],
    textFieldValue: '',
  };

  fetch = async () => {
    try {
      console.log('calling');
      this.setState({ ...this.state, isFetching: true ,posts: []}); // Sets loading state.
      const POSTS_SERVICE_URL = `http://localhost:4201/test_api/neo/?noun=${this.state.textFieldValue}`;
      const response = await axios.get(POSTS_SERVICE_URL);
      console.log(response.data.result);
      this.setState({
        ...this.state,
        isFetching: false,
        posts: response.data.result, // Take first 5 posts only
      });
    } catch (e) {
      console.log(e);
      this.setState({ ...this.state, isFetching: false });
    }
  };

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    console.log(error);
  }

  _handleTextFieldChange = (e) => {
    this.setState({
      textFieldValue: e.target.value,
    });
  };

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Data is invalid or System Error .</h1>;
    }
    return (
      <Paper>
        <br />
        <br />
        <form>
          <TextField
            id="outlined-basic"
            label="subject"
            variant="outlined"
            value={this.state.textFieldValue}
            onChange={this._handleTextFieldChange}
          />
          <br />
          <br />
          <Button onClick={this.fetch} variant="contained" color="primary">
            search
          </Button>
          <br />
          <h1>Results</h1>
        </form>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Subject </TableCell>
              <TableCell>Verb</TableCell>
              <TableCell>Object</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.posts &&
              this.state.posts.map((row) => (
                <TableRow key={row.c1}>
                  <TableCell>{row.c1}</TableCell>
                  <TableCell>{row.c2}</TableCell>
                  <TableCell>{row.c3}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <p>{this.state.isFetching ? 'Fetching posts...' : ''}</p>
      </Paper>
    );
  }

  componentDidMount() {
    this._isMounted = true;
    // this.fetchPosts();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  async fetchPostsAsync() {
    try {
      console.log('calling');
      this.setState({ ...this.state, isFetching: true }); // Sets loading state.
      const POSTS_SERVICE_URL =
        'http://localhost:4201/test_api/neo/?verb=USAID';
      const response = await axios.get(POSTS_SERVICE_URL);
      console.log(response.data.result);
      this.setState({
        ...this.state,
        isFetching: false,
        posts: response.data.result, // Take first 5 posts only
      });
    } catch (e) {
      console.log(e);
      this.setState({ ...this.state, isFetching: false });
    }
  }

  fetchPosts = this.fetchPostsAsync;
  fetchNoun = this.fetchPostsAsyncNoun;
  fetchVerb = this.fetchPostsAsyncVerb;
}

export default Standalone;
