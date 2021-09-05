const btoa = require('btoa')
const { createFetch } = require('../libs/fetch')

const fetch = createFetch('spotify-api')

const { SPOTIFY_API_CLIENT_SECRET, SPOTIFY_API_CLIENT_ID } = process.env
const apiBase = 'https://api.spotify.com'

let accessToken = null

const getAccessToken = async () => {
  if (accessToken) {
    return accessToken
  }
  const token = await fetch('https://accounts.spotify.com/api/token?grant_type=client_credentials', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${btoa(`${SPOTIFY_API_CLIENT_ID}:${SPOTIFY_API_CLIENT_SECRET}`)}`
    }
  })
    .then(res => res.json())
    .then(data => {
      return data.access_token
    })
  accessToken = token
  return token
}

/**
 * Calling Spotify API (baseURL as https://api.spotify.com)
 * @param {string} relativeUrl
 * @param {import('node-fetch').Request} requestConfig
 */
const spotifyApiFetch = async (relativeUrl, requestConfig = {}) => {
  const accessToken = await getAccessToken()
  const headers = {
    ...requestConfig.headers,
    Authorization: `Bearer ${accessToken}`
  }
  return fetch(new URL(relativeUrl, apiBase).href, {
    ...requestConfig,
    headers
  })
}

module.exports = {
  getAccessToken,
  fetch: spotifyApiFetch
}
