import { useStats } from 'react-instantsearch';
import className from "@/utils/className";

export function CustomStats(props) {

    const {
        hitsPerPage,
        nbHits,
        areHitsSorted,
        nbSortedHits,
        nbPages,
        page,
        processingTimeMS,
        query,
    } = useStats();

    return (
        <div className={className('text-sm', props.className)}>
            {nbHits} résultats
        </div>
    );
}
