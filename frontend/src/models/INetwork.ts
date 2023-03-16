import Station from './IStation'

interface INetwork {
  id: number,
  // eslint-disable-next-line camelcase
  CityBikes_id: string,
  name: string,
  href: string,
  company: string,
  city: string,
  country: string,
  stations: Station[],
}

export default INetwork
