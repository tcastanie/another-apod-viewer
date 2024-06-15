/**
 * Proxies the request to the NASA APOD API, adding the API key as a query parameter.
 */
import { joinURL, withQuery } from 'ufo'

export default defineEventHandler(async (event) => {
  const apiKey = useRuntimeConfig().nasaApodKey
  const apiBase = useRuntimeConfig().nasaApodBase
  const path = event.path.replace('/api/apod', '')
  const target = withQuery(joinURL(apiBase, path), { api_key: apiKey })
  return proxyRequest(event, target)
})
