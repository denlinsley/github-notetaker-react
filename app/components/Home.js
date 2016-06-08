import React from 'react'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      notes: [],
      bio: {},
      repos: []
    }
  }
  
  render() {
    return (
      <h2 className='text-center'>
        Search by Github Username Above
      </h2>
    )
  }
}

export default Home
