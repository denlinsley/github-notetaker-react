import React from 'react'
import Repos from './Github/Repos'
import UserProfile from './Github/UserProfile'
import Notes from './Notes/Notes'
import getGithubInfo from '../utils/helpers'
import Rebase from 're-base'

// cannot not mixins (reactfire) use ES6 class syntax - use re-base instead
const base = Rebase.createClass('https://gh-note-taker-eh.firebaseio.com/')

class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      notes: [],
      bio: {},
      repos: []
    }
  }

  componentDidMount() {
    this.init(this.props.params.username)
  }

  componentWillReceiveProps(nextProps) {
    base.removeBinding(this.ref)
    this.init(nextProps.params.username)
  }

  componentWillUnmount() {
    base.removeBinding(this.ref)
  }

  init(username) {
    // bind a property on your state to a firebase endpoint
    this.ref = base.bindToState(username, { // endpoint
      context: this,
      asArray: true,
      state: 'notes', // property on state to bind to
    }) 

    getGithubInfo(username)
      .then(function(data) { // FIXME
        this.setState({
          bio: data.bio,
          repos: data.repos
        })
      }.bind(this))
  }

  handleAddNote(newNote) {
    base.post(this.props.params.username, {
      data: this.state.notes.concat([newNote]) // the whole array
    })
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-4">
          <UserProfile username={this.props.params.username} bio={this.state.bio} />
        </div>
        <div className="col-md-4">
          <Repos username={this.props.params.username} repos={this.state.repos} />
        </div>
        <div className="col-md-4">
          <Notes 
            username={this.props.params.username} 
            notes={this.state.notes} 
            addNote={(newNote) => this.handleAddNote(newNote)} />
        </div>
      </div>
    )
  }
}

export default Profile
