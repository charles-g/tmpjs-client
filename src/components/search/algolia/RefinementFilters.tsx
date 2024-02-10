import {RefinementList} from "react-instantsearch";
import {CustomRatingRangeSlider, DateRefinement} from "@/components/search/algolia/custom-components";
import {FormEvent, useEffect, useMemo, useState} from "react";

export function RefinementFilters({ onDistanceUpdate }: { onDistanceUpdate: (radius: number) => void }) {

    const [distance, setDistance] = useState(20);
    const radius = useMemo(() => distance * 1000, [distance]);

    useEffect(() => {
        onDistanceUpdate(radius);
    }, [radius, onDistanceUpdate]);

    return (
        <>
            <div className="widgets flex flex-col-reverse justify-between">
                <div className="widget-wrapper mb-4 flex-grow">
                    <h2 className="text-xl font-semibold mb-2">Skills</h2>
                    <RefinementList
                        attribute="companySkills.skillName"
                        showMore
                        limit={5}
                        classNames={{
                            root: 'refinement-skills',
                            searchBox: 'mb-3 border',
                            item: 'mb-2 bg-gray-100 p-2 border-solid border-2 border-gray-400 rounded',
                            selectedItem: '',
                            checkbox: 'mr-2 cursor-pointer',
                            labelText: 'mr-2 cursor-pointer',
                            count: 'font-bold',
                            showMore: 'text-blue-500 cursor-pointer text-sm',
                        }}
                    />
                </div>
                <div className="widget-wrapper mb-4 flex-grow">
                    <h2 className="text-xl font-semibold mb-2">Position</h2>
                    <RefinementList
                        attribute="contractPositionName"
                        limit={5}
                        classNames={{
                            root: 'refinement-skills',
                            searchBox: 'mb-3 border',
                            item: 'mb-2 bg-gray-100 p-2 border-solid border-2 border-gray-400 rounded',
                            selectedItem: '',
                            checkbox: 'mr-2 cursor-pointer',
                            labelText: 'mr-2 cursor-pointer',
                            count: 'font-bold',
                        }}
                    />
                </div>
                <div>
                    <div className="widget-wrapper mb-4 flex-grow">
                        <h2 className="text-xl font-semibold mb-2">Start date</h2>
                        <DateRefinement/>
                    </div>

                    <div className="widget-wrapper mb-4 flex-grow">
                        <h2 className="text-xl font-semibold mb-2">Distance</h2>
                        <input name="distance" type="range" min="1" max="35" value={distance}
                               onInput={(e: FormEvent<HTMLInputElement>) => setDistance(Number((e.target as HTMLInputElement).value))}/>
                        <div className="py-2">{distance} km</div>
                    </div>

                    <div className="widget-wrapper mb-4 flex-grow">
                        <h2 className="text-xl font-semibold mb-2">Rating</h2>
                        <CustomRatingRangeSlider/>
                    </div>
                </div>
            </div>
        </>
    )
}
