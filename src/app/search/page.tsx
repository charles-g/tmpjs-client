'use client'

import {
    InstantSearch,
    Hits,
    SearchBox,
    RefinementList,
    GeoSearch,
    Configure,
    RangeInput,
    CurrentRefinements,
    Highlight,
    ClearRefinements,
    useInstantSearch,
    useRefinementList,
    useToggleRefinement, useRange, useHits, useCurrentRefinements, Stats
} from 'react-instantsearch';
import algoliasearch from 'algoliasearch/lite';

import {useEffect, useMemo, useState} from 'react';
import {
    CustomClearRefinements,
    CustomCurrentRefinements,
    CustomHits,
    CustomRatingRangeSlider,
    DateRefinement
} from "@/components/search/algolia/custom-components";
import { appId, indexName, searchKey} from "@/infra/search-engine/config";
import {RefinementFilters} from "@/components/search/algolia/refinement-filters";

// Create an Algolia search client
const searchClient = algoliasearch(appId, searchKey);

function SearchPage() {
    const [radius, setRadius] = useState(20000);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-5">Temp Job Search</h1>

            <InstantSearch
                searchClient={searchClient}
                indexName={indexName}
                future={{preserveSharedStateOnUnmount: true}}
            >

                <Configure
                    hitsPerPage={10}
                    aroundRadius={radius}
                    getRankingInfo={true}
                    aroundLatLngViaIP
                />

                <Stats />
                <div className="flex items-center content-center1" style={{minHeight: "100px"}}>
                    <CustomCurrentRefinements />
                    <CustomClearRefinements className="mb-5 mt-2" style={{position:"relative", bottom:"-17px"}} />
                </div>

                <div className="flex gap-5">
                    <div className="w-1/4">
                        <RefinementFilters onDistanceUpdate={(radius) => {
                            setRadius(radius);
                        }}/>
                    </div>
                    <div className="w-3/4 flex-grow">
                        <CustomHits />
                    </div>
                </div>
            </InstantSearch>
        </div>
    );
}

export default SearchPage;

