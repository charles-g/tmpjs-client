import {RefinementList} from "react-instantsearch";
import {CustomHits, CustomRatingRangeSlider, DateRefinement} from "@/components/search/algolia/custom-components";
import {useEffect, useMemo, useState} from "react";

export function RefinementFilters({ onDistanceUpdate }) {

    const [distance, setDistance] = useState(20);
    const radius = useMemo(() => distance * 1000, [distance]);

    useEffect(() => {
        onDistanceUpdate(radius);
    }, [radius]);

    return (
        <>
            <div className="widgets flex flex-col-reverse justify-between">
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
                    />
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
                    />
                </div>
                <div>
                    <div className="widget-wrapper mb-4 bg-white shadow-md p-4 rounded flex-grow">
                        <h2 className="text-xl font-semibold mb-2">Date</h2>
                        <DateRefinement/>
                    </div>

                    <div className="widget-wrapper mb-4 bg-white shadow-md p-4 rounded flex-grow">
                        <h2 className="text-xl font-semibold mb-2">Distance maximum</h2>
                        <input name="distance" type="range" min="1" max="35" value={distance}
                               onInput={(e) => setDistance(e.target.value)}/>
                        <div className="py-2">{distance} km</div>
                    </div>

                    <div className="widget-wrapper mb-4 bg-white shadow-md p-4 rounded flex-grow">
                        <h2 className="text-xl font-semibold mb-2">Rating</h2>
                        <CustomRatingRangeSlider/>
                    </div>
                </div>
            </div>
        </>
    )
}
