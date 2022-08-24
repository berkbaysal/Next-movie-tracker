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
export interface MovieSearchResults{
    page:number,
    results: MovieSearchResult[]
    total_results: number
    total_pages: number
}
interface MovieSearchResult{
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
}