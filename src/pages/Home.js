import React, { useContext } from 'react'
import { Search } from '../components/Search'
import { Card } from '../components/Card'
import { GithubContext } from '../context/github/githubContext'
import Spinner from '../components/UI/Spinner/Spinner'

export const Home = () => {
  const {users, loading} = useContext(GithubContext)

  return (
    <React.Fragment>
      <Search />

      <div className='row'>
        {
          loading
          ? <Spinner />
          : users.map(user => (
              <div className='col-sm-4 mb-4' key={user.id}>
                <Card user={user} />
              </div>
            ))
        }
      </div>
    </React.Fragment>
  )
}
