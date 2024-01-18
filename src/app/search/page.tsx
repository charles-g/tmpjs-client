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
import CustomModal from "@/components/generic/modal";

// Create an Algolia search client
const searchClient = algoliasearch(appId, searchKey);

function SearchPage() {
    const [radius, setRadius] = useState(20000);

    const [isModalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };


    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-5">Temp Job Search</h1>

            <button
                onClick={handleOpenModal}
                className="visible md:invisible px-4 py-2 bg-gray-500 text-white rounded cursor-pointer"
            >
                Filters
            </button>

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
                    <div className="hidden md:block">
                        <RefinementFilters onDistanceUpdate={(radius) => {
                            setRadius(radius);
                        }}/>
                    </div>
                    <div className="w-full flex-grow">
                        <CustomHits />
                    </div>
                </div>

                <CustomModal open={isModalOpen} onClose={handleCloseModal} templateParts={{
                    wrapperId: "wrapper",
                    contentId: "modal-content",
                    actionId: "modal-actions"
                }}>
                    <div id="wrapper" className="relative">
                        <div id="modal-content">
                            <div className="flex items-center content-center1">
                                <CustomCurrentRefinements />
                                <CustomClearRefinements className="mb-5 mt-2" style={{position:"relative", bottom:"-17px"}} />
                            </div>
                            <RefinementFilters onDistanceUpdate={(radius) => {
                                setRadius(radius);
                            }}/>
                        </div>
                        <div id="modal-actions">
                            <button
                                onClick={handleCloseModal}
                                className="mt-4 px-4 py-2 bg-green-500 text-white rounded cursor-pointer"
                            >
                                Appliquer
                            </button>
                        </div>
                    </div>
                </CustomModal>

            </InstantSearch>

        </div>
    );
}

export default SearchPage;

