import { NextPageContext } from 'next'
import React from 'react'
import CastDisplay from '../../components/CastDisplay'
import InfoTopDisplay from '../../components/InfoTopDisplay'
import Layout from '../../components/Layout'
import {MovieData,CreditsData, PersonImages} from "../../util/interfaces"
import { validateResponse } from '../../util/utilFunctions'

interface IProps{
    filmInfo: MovieData
    creditInfo: CreditsData
    imageInfo: PersonImages[]
}

const Movie = ({filmInfo, creditInfo,imageInfo}:IProps) => {
    return (
        <Layout>
            <InfoTopDisplay filmInfo={filmInfo}/>
            <CastDisplay creditInfo={creditInfo} imageInfo={imageInfo}/>
        </Layout>
    )
}

export default Movie

export async function getServerSideProps(ctx: NextPageContext) {
    const cookie = ctx.req?.headers.cookie;
    const resFilmInfo = await fetch("http://localhost:3000/api/movie?id=" + ctx.query.id,{
        headers: {
            cookie: cookie!
        }      
    });
    validateResponse(await resFilmInfo,ctx);
    const jsonFilmInfo = await resFilmInfo.json()

    const creditsInfo = await fetch("http://localhost:3000/api/credits?id=" + ctx.query.id,{
        headers: {
            cookie: cookie!
        }      
    });
    validateResponse(await creditsInfo,ctx);
    const jsonCreditsInfo:CreditsData = await creditsInfo.json()

    let imageArray:PersonImages[] = []

    const requests = jsonCreditsInfo.cast.map((castMember,index)=>(
        fetch("http://localhost:3000/api/personImage?id=" + jsonCreditsInfo.cast[index].id,{
                 headers: {
                    cookie: cookie!
                }      
             })));
        try{
            const result = await Promise.all(requests);
            for (let i=0; i<result.length;i++){
                const item = await result[i].json();
                imageArray.push(item);
            }
        }
        catch(err){
            console.log(err)
        }
        
    return {
        props: {
            filmInfo: jsonFilmInfo,
            creditInfo: jsonCreditsInfo,
            imageInfo: imageArray
        }
    }
}