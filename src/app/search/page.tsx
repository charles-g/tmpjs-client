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
    useInstantSearch
} from 'react-instantsearch';
import algoliasearch from 'algoliasearch/lite';
import type { UiState } from 'instantsearch.js';
import {useMemo, useState} from 'react';

// Defines the custom elements from the date picker for use on the window object
import { MapContainer, TileLayer } from 'react-leaflet';
import {CustomDatePicker} from "@/components/Duet";

// Replace these with your Algolia credentials
const algoliaAppId = 'RRF095AMPW';
const algoliaSearchKey = '32bd623aff8882a3e8e59bc055e3da12';
const algoliaIndexName = 'omd';

// Create an Algolia search client
const searchClient = algoliasearch(algoliaAppId, algoliaSearchKey);

// Algolia Index
const indexName = algoliaIndexName;

const CompanyHit = (data) => {
    const { hit } = data;
    const distance = (hit._rankingInfo.geoDistance/1000).toFixed(1);

    return (
        <div className="mb-4 p-4 border rounded bg-white">
            <h2 className="text-xl font-semibold mb-2">{hit.companyName}</h2>
            <p className="mb-2">{hit.companyAddress.street}, {hit.companyAddress.city}, {hit.companyAddress.country}</p>
            <p className="mb-2">Skills: {hit.companySkills.map(skill => skill.skillName).join(', ')}</p>
            <p className="mb-2">Available dates: {hit.companyAvailableContractTimeSlots.map((date, i) => {
                return (
                    <span key={i} className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                        {(new Date(date.timestamp)).toLocaleDateString()}
                    </span>
                );
            })}
            </p>
            <p>Rating: {hit.postContractFeedbacks.positivePercentage} %</p>
            <p>Distance: {distance} km</p>
        </div>
    )
};

function DateRefinement() {
    const { indexUiState, setIndexUiState } = useInstantSearch();
    console.log('indexUiState', indexUiState);
    // Set date refinement for companyAvailableContractTimeSlots.timestamp
    const handleDateRefinement = (date) => {
        setIndexUiState((prevIndexUiState: UiState) => ({
            ...prevIndexUiState,
        }));
    }

    return (
        <CustomDatePicker
            identifier="date"
            value=""
            onChange={handleDateRefinement}
        />
    )
}

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

                <CurrentRefinements
                    classNames={{
                        root: 'current-refinements mb-5',
                        list: 'flex flex-wrap',
                        label: 'hidden',
                        category: 'p-2 border rounded bg-blue-500 text-white mr-2 mb-2',
                        delete: 'ml-2',
                    }}
                />

                <ClearRefinements
                    classNames={{
                        root: 'clear-refinements mb-5',
                    }}
                />

                <div className="flex mb-4">
                    {/* SearchBox component for the search input */}
                    <SearchBox
                        classNames={{
                            root: 'searchbox',
                            form: 'flex w-full',
                            input: 'p-2 w-full',
                            submit: 'px-3 bg-white',
                            reset: 'px-3 bg-white',
                        }}
                    />
                </div>

                <div className="widgets md:flex justify-between gap-10">
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
                        <h2 className="text-xl font-semibold mb-2">Rating</h2>
                        <RangeInput
                            attribute="postContractFeedbacks.positivePercentage"
                            min={0} max={100}
                            classNames={{
                                root: 'range-input',
                                form: 'flex w-full',
                                input: 'px-2 w-full border rounded',
                                separator: 'mx-2',
                                submit: 'ml-2 px-3 bg-blue-500 text-white',
                            }}
                        />
                    </div>

                    <div className="widget-wrapper mb-4 bg-white shadow-md p-4 rounded flex-grow">
                        <h2 className="text-xl font-semibold mb-2">Date</h2>
                        <RangeInput
                            attribute="companyAvailableContractTimeSlots.timestamp"
                            min={0}
                            classNames={{
                                root: 'range-input',
                                form: 'flex w-full',
                                input: 'px-2 w-full border rounded',
                                separator: 'mx-2',
                                submit: 'ml-2 px-3 bg-blue-500 text-white',
                            }}
                        />
                    </div>

                        {/* GeoSearch for companyAddress coordinates */}
                    <div className="widget-wrapper mb-4 bg-white shadow-md p-4 rounded flex-grow">
                        <h2 className="text-xl font-semibold mb-2">Distance maximum</h2>
                        <input name="distance" type="range" min="1" max="20" value={distance} onInput={(e) => setDistance(e.target.value)} />
                        <div className="py-2">{distance} km</div>
                    </div>
                </div>

                {/* Hits component to display search results */}
                <Hits hitComponent={CompanyHit} />
            </InstantSearch>
        </div>
    );
}

export default SearchPage;

