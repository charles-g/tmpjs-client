import {
    useCurrentRefinements,
    useInfiniteHits,
    useInstantSearch,
    useRange,
    useClearRefinements
} from "react-instantsearch";
import {CustomDatePicker} from "@/components/DuetDatePicker";
import React, {FormEvent, Key, useState} from "react";
import cn from "@/utils/className";
import {debounce} from "@/utils/debounce";
import {FacetAttributes, facetTranslations} from "@/infra/search-engine/config";
import {propsFilter} from "@/utils/propsFilter";
import StarRating from "@/components/StarRating";
import {Hit} from "@algolia/client-search";
import {
    CurrentRefinementsConnectorParamsItem
} from "instantsearch.js/es/connectors/current-refinements/connectCurrentRefinements";
import {BaseHit} from "instantsearch.js";

type Refinement = {
    label: string;
    value: number;
};

type CustomHit = {
    companyName: string;
    companyAddress: {
        street: string;
        city: string;
        country: string;
    };
    companySkills: {
        skillName: string;
    }[];
    postContractFeedbacks: {
        positivePercentage: number;
    };
    timestamp: number;
};

type RefinementItem = CurrentRefinementsConnectorParamsItem;

const transformItems = (items) => {
    return items.map(item => {
        if (item.attribute === FacetAttributes.feedbacks) {
            const refinements: Refinement[] = [];
            if (item.refinements[0] !== undefined) {
                refinements.push({
                    ...item.refinements[0],
                    label: "≥ " + item.refinements[0].value + " %",
                });
            }
            return {
                ...item,
                label: facetTranslations[item.attribute],
                refinements,
            };
        }
        if (item.attribute === 'timestamp') {
            const refinements: Refinement[] = [];
            if (item.refinements[0] !== undefined) {
                const start = item.refinements[0].value;
                refinements.push({
                    ...item.refinements[0],
                    label: "≥ " + (new Date(start*1000)).toLocaleDateString(),
                });
            }
            if (item.refinements[1] !== undefined && item.refinements[1].value) {
                const end = item.refinements[1].value;
                refinements.push({
                    ...item.refinements[1],
                    label: "≤ " + (new Date(end*1000)).toLocaleDateString(),
                });
            }
            return {
                ...item,
                refinements
            };
        } else {
            return item;
        }
    });
};

export function CustomCurrentRefinements(props) {
    const { items, refine } = useCurrentRefinements({
        transformItems,
        excludedAttributes: [FacetAttributes.feedbacks],
    });

    const filteredItems : RefinementItem[] = items.filter((item) => {
        if (item.attribute === FacetAttributes.feedbacks) {
            return item.refinements[0] !== undefined && item.refinements[0].value as number > 0;
        } else {
            return item.refinements.length > 0;
        }
    });

    return (
        <div className="flex flex-nowrap flex-col md:flex-row mb-3" {...props}>
            {filteredItems.map((item) => (
                <div key={[item.indexName, item.label].join('/')}>
                    <div className="text-blue-800 font-medium me-2 py-0.5 mb-2">{ facetTranslations[item.attribute] }</div>
                    {item.refinements.map((refinement) => (
                        <div className="inline px-3 py-2 bg-blue-500 text-white mr-2 rounded" key={refinement.label}>
                              <span>
                                  {refinement.label}
                              </span>
                            <button
                                className="pl-3 py-1 bg-blue-500 text-white"
                                type="button"
                                onClick={(event) => {
                                    refine(refinement);
                                }}
                            >
                                X
                            </button>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

function getUniqueCompanyNames(items) : string[] {
    return items.map(item => item.companyName);
}

export function CustomHits(props) {
    const { hits, showPrevious, showMore, isFirstPage, isLastPage } = useInfiniteHits<CustomHit>(props);
    const companyNames = getUniqueCompanyNames(hits);
    const uniqueCompanyNames = Array.from(new Set(companyNames));
    const getHitsByCompany = (company: string) => hits.filter(item => item.companyName === company);

    const newItems = uniqueCompanyNames.map(companyName => ({
        company: companyName,
        hits: getHitsByCompany(companyName)
    }));

    return (
        <div>
            {!isFirstPage ? (
                <button
                    onClick={showPrevious}
                    className="mb-4 p-4 border rounded bg-white shadow-sm"
                >
                    Show previous results
                </button>
            ) : null}
            {newItems.map((item) => (
                <div key={item.company} className="mb-4 p-4 border rounded bg-white">
                    <h2 className="text-xl font-semibold mb-2">{item.company}</h2>
                    <div className="mb-2">
                        <p className="font-light mb-2">
                            {item.hits[0].companyAddress.street}, {item.hits[0].companyAddress.city}, {item.hits[0].companyAddress.country}
                        </p>
                        <p className="mb-2">
                            {item.hits[0].companySkills.map(skill => (
                                <span key={skill.skillName} className="inline-block bg-gray-100 px-2 py-1 rounded mr-2 mb-2">
                                    {skill.skillName}
                                </span>
                            )
                        )}
                        </p>
                        <div className="mb-2">
                            <StarRating percentage={item.hits[0].postContractFeedbacks.positivePercentage} />
                        </div>
                        <h3 className="mb-2">Dates:</h3>
                        {item.hits.map(hit => (
                            <div key={hit.objectID}>
                                <span className="badge-primary">
                                    {(new Date(hit.timestamp*1000)).toLocaleDateString()}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            {!isLastPage ? (
                <button
                    onClick={showMore}
                    disabled={isLastPage}
                    className="mb-4 p-4 border rounded bg-white shadow-sm"
                >
                    Show more results
                </button>
            ) : null}
        </div>
    );
}

export function DateRefinement() {
    const { start, range, canRefine, refine } = useRange({
        attribute: "timestamp",
    });

    const { indexUiState, setIndexUiState } = useInstantSearch();

    const handleDateRefinement = (evt) => {
        const date = evt.target.value;

        const startTs = Math.floor((new Date(date)).getTime()/1000);
        const endTs = Math.floor(((new Date(date)).getTime() + 864000000)/1000);

        setIndexUiState((prevIndexUiState) => {
            const value = {
                ...prevIndexUiState,
                range: {
                    ...prevIndexUiState.range,
                    'timestamp': `${startTs}:${endTs}`,
                },
            };
            return value;
        });
    }

    return (
        <CustomDatePicker
            identifier="date"
            value=''
            onChange={handleDateRefinement}
        />
    )
}

export function CustomRatingRangeSlider(props: any) {
    const { start, range, canRefine, refine } = useRange({
        attribute: "postContractFeedbacks.positivePercentage",
        min: 0,
        max: 100,
    });

    const [ratingValue, setRatingValue] = useState(0);

    const handleInput = debounce((value) => {
        setRatingValue(value);
        refine([value, 100]);
    });

    return(
        <div className="flex items-center content-center">
            <div className="pb-2 pt-1 px-1">0%</div>
            <div>
                <input
                    name="distance"
                    type="range"
                    step="5"
                    min="0"
                    max="100"
                    value={ratingValue}
                    onInput={(e: FormEvent<HTMLInputElement>) => handleInput(Number((e.target as HTMLInputElement).value))} />
            </div>
            <div className="pb-2 pt-1 px-1">
                100%
            </div>
        </div>
    )

}

export function CustomClearRefinements(props: any) {
    const { canRefine, refine } = useClearRefinements({
        excludedAttributes: [FacetAttributes.feedbacks],
    });

    if (!canRefine) {
        return null;
    }

    const propsFiltered = propsFilter<{
        style?: React.CSSProperties;
        id?: string;
    }>(props, ['style', 'id']);
    const classNames = cn(props?.className, 'clear-refinements px-3 py-1 underline inline-block rounded');

    return (
        <button {...propsFiltered}
                disabled={!canRefine}
                onClick={refine}
                className={classNames}>
            Clear refinements
        </button>
    );
}
