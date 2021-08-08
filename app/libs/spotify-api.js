const { FetchError } = require('node-fetch')
const { createFetch } = require('../libs/fetch')

const fetch = createFetch('spotify-api')

const { SPOTIFY_API_CLIENT_SECRET, SPOTIFY_API_CLIENT_ID } = process.env

let accessToken = null

const getAccessToken = async () => {
  if (accessToken) {
    return accessToken
  }
  accessToken = await fetch(`https://accounts.spotify.com/api/token?grant_type=client_credentials`, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${btoa(`${SPOTIFY_API_CLIENT_ID}:${SPOTIFY_API_CLIENT_SECRET}`)}`
    }
  }).then(res => {
    const resData = res.json()
    return resData.access_token
  })
  return accessToken
}

/**
 * @param {Request} fetchOptions
 */
const spotifyApiFetch = async (fetchOptions) => {
  const accessToken = await getAccessToken()
  return fetch({
    ...fetchOptions,
    headers: {
      ...fetchOptions.headers,
      Authorization: `Bearer ${accessToken}`
    }
  })
}

module.exports = {
  getAccessToken,
  fetch: spotifyApiFetch
}
