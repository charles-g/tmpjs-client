import {RefinementList} from "react-instantsearch";
import {CustomRatingRangeSlider, DateRefinement} from "@/components/search/algolia/CustomComponents";
import {FormEvent} from "react";

type RefinementFiltersProps = {
    minDate: string,
    minRating: number,
    distanceKm: number,
    onDistanceUpdate: (radius: number) => void,
    onRatingUpdate: (rating) => void,
    onDateUpdate: (date) => void
}

export function RefinementFilters(props: RefinementFiltersProps) {

    const {minDate, onDateUpdate, onDistanceUpdate, distanceKm, minRating, onRatingUpdate} = props;

    const setDistance = (distance) => {
        onDistanceUpdate(distance*1000);
    }

    return (
        <>
            <div className="widgets flex flex-col-reverse justify-between">
                <div className="widget-wrapper mb-4 flex-grow">
                    <h2 className="text-base font-semibold mb-2">Compétences</h2>
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
                    <h2 className="text-base font-semibold mb-2">Poste</h2>
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
                    <div className="widget-wrapper mb-5 flex-grow">
                        <h2 className="text-base font-semibold mb-2">A partir du</h2>
                        <DateRefinement startDate={minDate} onDateUpdate={(date) => onDateUpdate(date)}/>
                    </div>

                    <div className="widget-wrapper mb-3 flex-grow">
                        <h2 className="text-base font-semibold mb-2">Distance maximum</h2>
                        <input name="distance" type="range" min="1" max="35" value={distanceKm}
                               onInput={(e: FormEvent<HTMLInputElement>) => setDistance(Number((e.target as HTMLInputElement).value))}/>
                        <div className="py-2">{distanceKm} km</div>
                    </div>

                    <div className="widget-wrapper mb-3 flex-grow">
                        <h2 className="text-base font-semibold mb-2">Taux d&lsquo;évaluations positives minimum</h2>
                        <CustomRatingRangeSlider
                            ratingPercentage={minRating}
                            onRatingUpdate={(rating) => onRatingUpdate(rating)}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
