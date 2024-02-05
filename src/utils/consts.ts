export const REGEX_FORMATTED_QUERY = /\s+/g;

export const DEBOUNCE_DELAY = 500;
export const BASIC_URL = 'https://api.punkapi.com/v2/beers';

export type Beer = {
    id: number
    name: string
    tagline: string
    first_brewed: string
    ph: number
    abv: number
    image_url: string
}