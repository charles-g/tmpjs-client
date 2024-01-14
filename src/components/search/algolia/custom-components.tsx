import {
    useCurrentRefinements,
    useInfiniteHits,
    useInstantSearch,
    useRange,
    useClearRefinements
} from "react-instantsearch";
import {CustomDatePicker} from "@/components/Duet";
import {useState} from "react";
import {className} from "@/utils/className";
import {debounce} from "@/utils/debounce";

enum FacetAttributes {
    company = 'companyName',
    address = 'companyAddress',
    skills = 'companySkills.skillName',
    position = 'contractPositionName',
    feedbacks = 'postContractFeedbacks.positivePercentage',
    timestamp = 'timestamp',
};

const facetTranslations = {
    [FacetAttributes.skills]: 'Skills',
    [FacetAttributes.position]: 'Position',
    [FacetAttributes.feedbacks]: 'Rating',
    [FacetAttributes.timestamp]: 'Date',
};

const transformItems = (items) => {
    return items.map(item => {
        if (item.attribute === FacetAttributes.feedbacks) {
            const refinements = [];
            if (item.refinements[0] !== undefined) {
                refinements.push({
                    ...item.refinements[0],
                    label: "≥ " + item.refinements[0].value + " %",
                });
            }
            // if (item.refinements[1] !== undefined && item.refinements[1].value) {
            //     refinements.push({
            //         ...item.refinements[1],
            //         label: "≤ " + item.refinements[1].value + " %",
            //     });
            // }
            return {
                ...item,
                label: facetTranslations[item.attribute],
                refinements,
            };
        }
        if (item.attribute === 'timestamp') {
            const refinements = [];
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
    const { items, canRefine, refine } = useCurrentRefinements({
        transformItems,
        excludedAttributes: [FacetAttributes.feedbacks],
    });

    const filteredItems = items.filter((item) => {
        if (item.attribute === FacetAttributes.feedbacks) {
            return item.refinements[0] !== undefined && item.refinements[0].value > 0;
        } else {
            return item.refinements.length > 0;
        }
    });

    return (
        <div className="flex flex-col md:flex-row mb-3">
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

function getUniqueCompanies(items) {
    return items.map(item => item.companyName);
}

export function CustomHits(props) {
    const { hits, showPrevious, showMore, isFirstPage, isLastPage } = useInfiniteHits(props);
    const companies = getUniqueCompanies(hits);
    const uniqueCompanies = [...new Set(companies)];
    const newItems = uniqueCompanies.map(company => ({
        company,
        hits: hits.filter(item => item.companyName === company),
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
            {newItems.map(item => (
                <div key={item.company} className="mb-4 p-4 border rounded bg-white">
                    <h2 className="text-xl font-semibold mb-2">{item.company}</h2>
                    <div>
                        <p>{item.hits[0].companyAddress.street}, {item.hits[0].companyAddress.city}, {item.hits[0].companyAddress.country}</p>
                        <p>Skills: {item.hits[0].companySkills.map(skill => skill.skillName).join(', ')}</p>
                        <p>Rating: {item.hits[0].postContractFeedbacks.positivePercentage} %</p>
                    </div>
                    {item.hits.map(hit => (
                        <div key={hit.objectID}>
                            <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                                {(new Date(hit.timestamp*1000)).toLocaleDateString()}
                            </span>
                        </div>
                    ))}
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
        // min: Math.floor((now).getTime()/1000),
        // max: Math.floor(((now).getTime() + 864000000)/1000),
    });
    // const { min, max } = {
    //     min: Math.floor((now).getTime()/1000),
    //     max: Math.floor(((now).getTime() + 864000000)/1000)
    // };

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

export function CustomRatingRangeSlider(props) {
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
                    onInput={(e) => handleInput(e.target.value)} />
            </div>
            <div className="pb-2 pt-1 px-1">
                100%
            </div>
        </div>
    )

}

export function CustomClearRefinements(props) {
    const { canRefine, refine } = useClearRefinements({
        excludedAttributes: [FacetAttributes.feedbacks],
    });

    if (!canRefine) {
        return null;
    }

    const classNames = className(props?.className, 'clear-refinements px-3 py-1 underline inline-block rounded');

    return (
        <button {...props}
                disabled={!canRefine}
                onClick={refine}
                className={classNames}>
            Clear refinements
        </button>
    );
}
