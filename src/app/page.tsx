'use client'

import algoliasearch from 'algoliasearch/lite';
import { useState } from 'react';
import {
  InstantSearch,
  Configure,
  useInstantSearch,
  useRefinementList,
  useToggleRefinement, useRange, useHits, useCurrentRefinements, Stats
} from 'react-instantsearch';
import {
  CustomClearRefinements,
} from "@/components/search/algolia/CustomComponents";
import {CustomHits} from "@/components/search/algolia/CustomHits";
import {CustomCurrentRefinements} from "@/components/search/algolia/CustomCurrentRefinements";
import {RefinementFilters} from "@/components/search/algolia/RefinementFilters";
import {CustomStats} from "@/components/search/algolia/CustomStats";

import { appId, indexName, searchKey} from "@/infra/search-engine/config";
import CustomModal from "@/components/generic/Modal";

// Create an Algolia search client
const searchClient = algoliasearch(appId, searchKey);

function SearchPage() {
  const [radius, setRadius] = useState(20000);
  const [rating, setRating] = useState(0);
  const [minDate, setMinDate] = useState('2024-01-11');

  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
      <div className="container mx-auto p-4">
        <h1 className="text-xl font-bold">Trouvez une mission en intérim</h1>

        <button
            onClick={handleOpenModal}
            className="visible md:invisible my-3 px-4 py-2 bg-gray-500 text-white rounded cursor-pointer"
        >
          Filtrer
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

          <div className="flex gap-7">
            <div className="w-1/4 hidden md:block">
              <RefinementFilters
                  distanceKm={radius/1000}
                  onDistanceUpdate={(radius) => { setRadius(radius) }}
                  onRatingUpdate={(rating) => setRating(rating)}
                  minRating={rating}
                  minDate={minDate}
                  onDateUpdate={(date) => setMinDate(date)}
              />
            </div>
            <div className="w-full flex-grow">
              <div className="flex items-center justify-between">
                <div className="hidden md:flex items-center content-center1" style={{minHeight: "100px"}}>
                  <CustomCurrentRefinements />
                  <CustomClearRefinements className="mb-5 mt-2" style={{position:"relative", bottom:"-17px"}} />
                </div>
                <div>
                  <CustomStats className="mb-2 relative" />
                </div>
              </div>
              <CustomHits />
            </div>
          </div>

          <CustomModal
              open={isModalOpen}
              onClose={handleCloseModal}
              templateParts={{
                wrapperId: "wrapper",
                contentId: "modal-content",
                actionId: "modal-actions"
              }}>
            <div id="wrapper" className="relative">
              <div id="modal-content">
                <div className="hidden flex items-center content-center1">
                  <CustomCurrentRefinements />
                  <CustomClearRefinements className="mb-5 mt-2" style={{position:"relative", bottom:"-17px"}} />
                </div>
                <RefinementFilters
                    distanceKm={radius/1000}
                    onDistanceUpdate={(radius) => { setRadius(radius) }}
                    onRatingUpdate={(rating) => setRating(rating)}
                    minRating={rating}
                    minDate={minDate}
                    onDateUpdate={(date) => setMinDate(date)}
                />
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

