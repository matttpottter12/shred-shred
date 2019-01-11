import React from 'react';
import './App.css';
class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          respoonse: {},
          post: 'Matt Potter Skiing',
      };
  }

  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('/api/YTsearch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.post }),
    });
    const body = await response.text();
    let results = JSON.parse(body);
    let dynamicList = results.map((links) => <ul><li><div className="vidTitle">{links.title}</div><iframe width="700" height="400" title={links.title} className="ytVid" src={links.url} alt="" /></li></ul>);
    this.setState({ dynamicList });
  };

  render() {
    const list = this.state.dynamicList;
      return (
        <div className="App">
          <h1 className="header">
            Shred Vision
          </h1>
          <form onSubmit={this.handleSubmit}>
            <input 
              className="inputBox"
              type="text"
              value={this.state.post}
              onChange={e => this.setState({ post: e.target.value })}
            />
            <button type="submit">Search</button>
          </form>
          <div>
          {list}
          </div>
        </div>
      );
    }
}
export default App;