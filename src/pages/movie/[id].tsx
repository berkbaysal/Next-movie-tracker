import { NextPageContext } from 'next';
import React from 'react';
import InfoTopDisplay from '../../components/InfoTopDisplay';
import Layout from '../../components/Layout';
import { MovieData, CreditsData, PersonImages } from '../../util/interfaces';
import { validateResponse } from '../../util/utilFunctions';
import CastSlider from '../../components/CastSlider';
import VideoDisplay from '../../components/VideoDisplay';

interface IProps {
  filmInfo: MovieData;
  creditInfo: CreditsData;
}
const Movie = ({ filmInfo, creditInfo }: IProps) => {
  const director = [];
  creditInfo.crew.forEach((crewMember) => {
    if (crewMember.job === 'Director') {
      return director.push(crewMember.name);
    }
  });
  return (
    <Layout>
      <InfoTopDisplay filmInfo={filmInfo} director={director} />
      <CastSlider creditInfo={creditInfo} />
      <VideoDisplay movieId={filmInfo.id} />
    </Layout>
  );
};

export default Movie;

export async function getServerSideProps(ctx: NextPageContext) {
  const URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://' + 'next-movie-tracker-production.up.railway.app';
  const cookie = ctx.req?.headers.cookie;
  const resFilmInfo = await fetch(URL + '/api/movie?id=' + ctx.query.id, {
    headers: {
      cookie: cookie!,
    },
  });

  //validateResponse(await resFilmInfo, ctx);

  const jsonFilmInfo = await resFilmInfo.json();

  const creditsInfo = await fetch(URL + '/api/credits?id=' + ctx.query.id, {
    headers: {
      cookie: cookie!,
    },
  });

  //validateResponse(await creditsInfo, ctx);

  const jsonCreditsInfo: CreditsData = await creditsInfo.json();

  let imageArray: PersonImages[] = [];

  const requests = jsonCreditsInfo.cast.map((castMember) =>
    fetch(URL + '/api/personImage?id=' + castMember.id, {
      headers: {
        cookie: cookie!,
      },
    })
  );
  try {
    const result = await Promise.all(requests);
    for (let i = 0; i < result.length; i++) {
      const item = await result[i].json();
      imageArray.push(item);
    }
  } catch (err) {
    console.log(err);
  }

  return {
    props: {
      filmInfo: jsonFilmInfo,
      creditInfo: jsonCreditsInfo,
    },
  };
}
