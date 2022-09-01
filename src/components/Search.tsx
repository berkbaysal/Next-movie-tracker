import React, { useEffect, useState } from 'react';
import { MultiSearchResult, MovieListResult, PersonListResult, TVListResult } from '../util/interfaces';
import styles from '../styles/Search.module.css';
import Router from 'next/router';
import SearchResultPerson from './SearchResultPerson';
import SearchResultTvSeries from './SearchResultTvSeries';
import SearchResultMovie from './SearchResultMovie';
import { validateResponse } from '../util/utilFunctions';

const MAX_RESULTS_DISPLAYED = 8;

interface IProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const Search = ({ searchTerm, setSearchTerm }: IProps) => {
  const [searchResults, setSearchResults] = useState(null);

  function isMovie(obj: any): obj is MovieListResult {
    return obj.media_type === 'movie';
  }
  function isPerson(obj: any): obj is PersonListResult {
    return obj.media_type === 'person';
  }
  function isTvShow(obj: any): obj is TVListResult {
    return obj.media_type === 'tv';
  }
  function handleRedirect(assetType: string, assetId: number) {
    if (assetType === 'movie') {
      setSearchTerm('');
      setSearchResults(null);
      Router.push('/movie/' + assetId);
    }
  }

  useEffect(() => {
    function updateSearchResults(queryRes: MultiSearchResult) {
      if (!queryRes.results) {
        return [];
      }
      const returnArray = queryRes.results.map((result, index) => {
        if (isMovie(result)) {
          if (index >= MAX_RESULTS_DISPLAYED) {
            return;
          }
          return <SearchResultMovie result={result} handleRedirect={handleRedirect} />;
        } else if (isTvShow(result)) {
          if (index >= MAX_RESULTS_DISPLAYED) {
            return;
          }
          return <SearchResultTvSeries result={result} />;
        } else if (isPerson(result)) {
          if (index >= MAX_RESULTS_DISPLAYED) {
            return;
          }
          return <SearchResultPerson result={result} />;
        }
      });
      return returnArray;
    }

    async function handleSearch() {
      const res = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: searchTerm }),
      });
      validateResponse(res);
      const searchResults = await res.json();
      setSearchResults(updateSearchResults(searchResults));
    }
    handleSearch();
  }, [searchTerm]);
  return <div className={styles.searchResults}>{searchResults && searchResults.length > 0 ? searchResults : <div>No results</div>}</div>;
};

export default Search;
