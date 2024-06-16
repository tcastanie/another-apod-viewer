/**
 * Proxies the request to the NASA APOD API, adding the API key as a query parameter.
 */
import { joinURL, withQuery } from 'ufo'

export default defineEventHandler(async (event) => {
  const { nasaApodKey } = useRuntimeConfig(event)
  const { nasaApodBase } = useRuntimeConfig(event)
  const path = event.path.replace('/api/apod', '')
  const target = withQuery(joinURL(nasaApodBase, path), { api_key: nasaApodKey })
  return proxyRequest(event, target)
})
