import {
    useInstantSearch,
    useRange,
    useClearRefinements
} from "react-instantsearch";
import {CustomDatePicker} from "@/components/DuetDatePicker";
import React, {FormEvent, useState} from "react";
import cn from "@/utils/className";
import {throttle} from "@/utils/debounce-throttle";
import {FacetAttributes} from "@/infra/search-engine/config";
import {propsFilter} from "@/utils/propsFilter";

export function DateRefinement({startDate} : {startDate: string}) {
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
            value={startDate}
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

    const handleInput = throttle((value) => {
        setRatingValue(value);
        refine([value, 100]);
    });

    return (
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
