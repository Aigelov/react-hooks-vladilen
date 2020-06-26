import React, { Fragment, useContext, useEffect } from 'react'
import { GithubContext } from '../context/github/githubContext'
import Spinner from '../components/UI/Spinner/Spinner'
import { Link } from 'react-router-dom'
import { Repos } from '../components/Repos'

export const Profile = ({match}) => {
  const {getUser, getRepos, user, repos, loading} = useContext(GithubContext)
  const urlName = match.params.name

  useEffect(() => {
    getUser(urlName)
    getRepos(urlName)
    // eslint-disable-next-line
  }, [])

  if (loading) {
    return <Spinner />
  }

  const {
    name, company, avatar_url,
    location, bio, blog,
    login, html_url, followers,
    following, public_repos, public_gists
  } = user

  return (
    <Fragment>
      <Link
        to={'/'}
        className='btn btn-link'
      >На главную</Link>

      <div className='card mb-4'>
        <div className='card-body'>
          <div className='row'>
            <div className='col-sm-3 text-center'>
              <img
                src={avatar_url}
                alt={name}
                className='mb-3'
                style={{width: '150px'}}
              />
              <h3>{name}</h3>
              {location && <p>Местоположение: {location}</p>}
            </div>
            <div className='col'>
              {
                bio && <Fragment>
                  <h3>BIO</h3>
                  <p>{bio}</p>
                </Fragment>
              }
              <a
                href={html_url}
                className='btn btn-dark btn-sm mb-3'
                target='_blank'
                rel='noopener noreferrer'
              >Открыть профиль</a>
              <ul>
                {login && <li>
                  <strong>Username: </strong>{login}
                </li>}
                {company && <li>
                  <strong>Company: </strong>{company}
                </li>}
                {blog && <li>
                  <strong>Website: </strong>{blog}
                </li>}
              </ul>

              <div className='badge badge-primary mr-1'>Подписчики {followers}</div>
              <div className='badge badge-success mr-1'>Подписан {following}</div>
              <div className='badge badge-info mr-1'>Репозитории {public_repos}</div>
              <div className='badge badge-dark'>Gists {public_gists}</div>
            </div>
          </div>
        </div>
      </div>

      <Repos repos={repos} />
    </Fragment>
  )
}
