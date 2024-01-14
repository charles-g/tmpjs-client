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
    useToggleRefinement, useRange, useHits, useCurrentRefinements
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

// Replace these with your Algolia credentials
const algoliaAppId = 'BD8UVRQT34';
const algoliaSearchKey = '95bcc902b6f02a71642725d46ea5ead8';
const algoliaIndexName = 'availabilities';

// Create an Algolia search client
const searchClient = algoliasearch(algoliaAppId, algoliaSearchKey);

// Algolia Index
const indexName = algoliaIndexName;

const now = new Date();

function SearchPage() {
    const [distance, setDistance] = useState(20);
    const radius = useMemo(() => distance * 1000, [distance]);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-5">Job Search</h1>

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

                <div className="flex items-center content-center1" style={{minHeight: "100px"}}>
                    <CustomCurrentRefinements />
                    <CustomClearRefinements className="mb-5 mt-2" style={{position:"relative", bottom:"-17px"}} />
                </div>

                <div className="flex gap-5">
                    <div className="w-25">
                        <div className="widgets flex flex-col-reverse justify-between">
                        {/* RefinementList for companySkills */}
                        <div className="widget-wrapper mb-4 bg-white shadow-md p-4 rounded flex-grow">
                            <h2 className="text-xl font-semibold mb-2">Skills</h2>
                            <RefinementList
                                attribute="companySkills.skillName"
                                searchable
                                showMore
                                limit={5}
                                classNames={{
                                    root: 'refinement-skills',
                                    searchBox: 'mb-3 border',
                                    item: 'mb-2 bg-gray-100 p-2 border rounded',
                                    selectedItem: '',
                                    checkbox: 'mr-2 cursor-pointer',
                                    labelText: 'mr-2 cursor-pointer',
                                    count: 'font-bold',
                                }}
                            >
                            </RefinementList>
                        </div>

                        <div className="widget-wrapper mb-4 bg-white shadow-md p-4 rounded flex-grow">
                            <h2>Position</h2>
                            <RefinementList
                                attribute="contractPositionName"
                                searchable
                                showMore
                                limit={5}
                                classNames={{
                                    root: 'refinement-skills',
                                    searchBox: 'mb-3 border',
                                    item: 'mb-2 bg-gray-100 p-2 border rounded',
                                    selectedItem: '',
                                    checkbox: 'mr-2 cursor-pointer',
                                    labelText: 'mr-2 cursor-pointer',
                                    count: 'font-bold',
                                }}
                            >
                            </RefinementList>
                        </div>

                        <div>
                            <div className="widget-wrapper mb-4 bg-white shadow-md p-4 rounded flex-grow">
                                <h2 className="text-xl font-semibold mb-2">Date</h2>
                                <DateRefinement />
                            </div>

                            <div className="widget-wrapper mb-4 bg-white shadow-md p-4 rounded flex-grow">
                                <h2 className="text-xl font-semibold mb-2">Distance maximum</h2>
                                <input name="distance" type="range" min="1" max="35" value={distance} onInput={(e) => setDistance(e.target.value)} />
                                <div className="py-2">{distance} km</div>
                            </div>

                            <div className="widget-wrapper mb-4 bg-white shadow-md p-4 rounded flex-grow">
                                <h2 className="text-xl font-semibold mb-2">Rating</h2>
                                <CustomRatingRangeSlider />
                            </div>
                        </div>
                    </div>
                    </div>
                    <div className="flex-grow">
                        <CustomHits />
                    </div>
                </div>
            </InstantSearch>
        </div>
    );
}

export default SearchPage;

