import axios from 'axios'
import { getRequest, postRequest, putRequest } from './axiosClient'

describe('Axios Client', () => {
  it('should make a get request', async () => {
    await getRequest('test')
    expect(axios.create).toHaveBeenCalled()
  })
  it('should make a post request', async () => {
    await postRequest('test', {})
    expect(axios.create).toHaveBeenCalled()
  })
  it('should make a put request', async () => {
    await putRequest('test', {})
    expect(axios.create).toHaveBeenCalled()
  })
})
