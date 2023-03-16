import Network from './INetwork'
/* eslint-disable camelcase */
interface IStation {
  id: number,
  CityBikes_id: string,
  name: string,
  country: string,
  latitude: number,
  longitude: number,
  empty_slots: number,
  free_bikes: number,
  network: Network
}

export default IStation
