import {useInstantSearch, useRange} from "react-instantsearch";
import {useEffect, useMemo, useState} from "react";
import {CustomDatePicker} from "@/components/Duet";

const now = new Date();

export function DateRefinement() {
    // const { items, refine } = useRefinementList({
    //     attribute: "companyAvailableContractTimeSlots.timestamp",
    // });

    const { start, range, canRefine, refine } = useRange({
        attribute: "companyAvailableContractTimeSlots.timestamp",
        min: Math.floor((now).getTime()/1000),
        //max: Math.floor(((now).getTime() + 864000000)/1000),
    });
    const { min, max } = range;

    const from = Math.max(min, Number.isFinite(start[0]) ? start[0] : min);
    const to = Math.min(max, Number.isFinite(start[1]) ? start[1] : max);

    const [value, setValue] = useState({
        start: from,
        end: to,
    });

    useEffect(() => {
        setValue({ start: from, end: to });
    }, [from, to]);

    // Set date refinement for companyAvailableContractTimeSlots.timestamp
    const handleDateRefinement = (evt) => {
        const date = evt.target.value;

        // refine((new Date(date)).getTime());
        const startTs = Math.floor((new Date(date)).getTime()/1000);
        const endTs = Math.floor(((new Date(date)).getTime() + 864000000)/1000);

        refine([
            startTs,
            endTs,
        ]);
    }

    const datepickerValue = useMemo(() => {
        // convert to string date format 'YYY/mm/dd'
        return {
            start: new Date(value.start * 1000).toISOString().split('T')[0],
            end: new Date(value.end * 1000).toISOString().split('T')[0],
        }
    }, start);

    return (
        <CustomDatePicker
            identifier="date"
            value={datepickerValue.start}
            onChange={handleDateRefinement}
        />
    )
}
