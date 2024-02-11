import {useInfiniteHits} from "react-instantsearch";
import StarRating from "@/components/StarRating";
import React from "react";

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

const getUniqueCompanyNames = (items) : string[] => {
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
