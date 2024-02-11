import React from "react";
import {useCurrentRefinements} from "react-instantsearch";
import {
    CurrentRefinementsConnectorParamsItem
} from "instantsearch.js/es/connectors/current-refinements/connectCurrentRefinements";
import {FacetAttributes, facetTranslations} from "@/infra/search-engine/config";

type Refinement = {
    label: string;
    value: number;
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
