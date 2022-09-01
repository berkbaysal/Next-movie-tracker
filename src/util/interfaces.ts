import { NextApiRequest } from "next"

export interface IUser{
    username: string
    password: string
}
export interface UserRequest extends NextApiRequest{
    username:string
    password:string
}

export interface UserNameRequest extends NextApiRequest{
    username:string
}
export interface MultiSearchResult{
    page:number,
    results: (MovieListResult|TVListResult|PersonListResult)[]
    total_results: number
    total_pages: number
}
export interface MovieListResult{
    poster_path: string | null
    adult: boolean
    overview: string
    release_date: string
    genre_ids: Array<number>
    id: number
    original_title:string
    original_language:string
    title:string
    backdrop_path: string | null
    popularity: number
    vote_count: number
    video: boolean
    vote_average: number
    media_type: string
}
export interface TVListResult{
    poster_path: string | null
    media_type: string
    overview: string
    first_air_date: string
    genre_ids: Array<number>
    id: number
    origin_country: string
    original_name:string
    original_language:string
    title:string
    backdrop_path: string | null
    popularity: number
    vote_count: number
    vote_average: number
}
export interface PersonListResult{
    profile_path: string | null
    adult: boolean
    id: number
    media_type: string
    known_for: Array<MovieListResult | TVListResult>
    name: string
    popularity: number
}
export interface MovieData{
    adult: boolean
    backdrop_path: string | null
    belongs_to_collection: null | object
    budget: number
    genres: {id:number, name:string}[]
    homepage: string | null
    id: number
    imdb_id: string | null
    original_language: string
    original_title: string
    overview: string|null
    popularity: number
    poster_path: string|null
    production_companies: {name: string, id:number, logo_path:string|null, origin_country:string}[]
    production_countries: {iso_3166_1: string, name: string}[]
    release_date: string
    revenue: number
    runtime: number | null
    spoken_languages:{iso_639_1:string,name:string}[]
    status: string
    tagline: string|null
    title: string
    video: boolean
    vote_average: number
    vote_count:number
}

interface Credit {
    adult: boolean
    gender: number | null
    id: number
    known_for_department: string
    name: string
    original_name: string
    popularity: number
    profile_path: string | null
    credit_id: string
    order: number
}
export interface Cast extends Credit{
    cast_id: number
    character: string
    order: number
}

export interface Crew extends Credit{
    department: string
    job: string
}

export interface CreditsData{
    id: number
    cast: Cast[]
    crew: Crew[]
}

export interface PersonImages{
    id:number
    profiles:{
        aspect_ratio: number
        file_path: string
        height: number
        iso_639_1: null
        vote_average: number
        width: number
    }[]
}
export interface MovieVideos{
    id: number
    results:MovieVideoResult[]
}
export interface MovieVideoResult{
        iso_639_1: string
        iso_3166_1: string
        name: string
        key: string
        site: string
        size: number
        type: string
        official: boolean
        published_at: string
        id: string
}