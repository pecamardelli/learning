import React, { Component } from "react";
import { ToastContainer } from 'react-toastify';
import http from './services/httpServices';
import config from './config.json'
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";

class App extends Component {
  state = {
    posts: []
  };

	async componentDidMount() {
		const { data: posts }	= await http.get(config.apiEndpoint);
		this.setState({ posts });
	};
	
  handleAdd = async () => {
	const obj				= { title: 'Latin text', body: 'Lorem ipsum dolor sit amet consectetur'};
    const { data: post }	= await http.post(config.apiEndpoint, obj);
	
	const posts				= [ post, ...this.state.posts ];
	this.setState({ posts });
  };

  handleUpdate = async post => {
    post.title	= `${post.title} (UPDATED)`;
	await http.put(`${config.apiEndpoint}/${post.id}`, post);
	//const { data }		= await http.patch(`${config.apiEndpoint}/${post.id}`, { title: post.title });
	
	const posts		= [ ...this.state.posts ];
	const index		= posts.indexOf(post);
	posts[index]	= { ...post };
	this.setState({ posts });
  };

  handleDelete = async post => {
	// Optimistic approach
	const originalPosts	= this.state.posts;
	
	const posts	= this.state.posts.filter(p => p.id !== post.id);
	this.setState({ posts });
	
	try {
		await http.delete(`aa${config.apiEndpoint}/${post.id}`);
	}
    catch (ex) {
		// The ex object has the "request" and "response" property. We'll use them to determine
		// what kind of error we encountered (expected or unexpected)
		if(ex.response && ex.response.status === 404){
			alert('The post with the given ID was not found on the server.');
		}
		
		// We have encountered ourselves with an issue at the backend... Rolling back actions...
		this.setState({ posts: originalPosts });
	}
	
  };

  render() {
    return (
      <React.Fragment>
		<ToastContainer />
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map(post => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;
