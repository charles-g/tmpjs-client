export enum FacetAttributes {
    company = 'companyName',
    address = 'companyAddress',
    skills = 'companySkills.skillName',
    position = 'contractPositionName',
    feedbacks = 'postContractFeedbacks.positivePercentage',
    timestamp = 'timestamp',
};

export const facetTranslations = {
    [FacetAttributes.skills]: 'Compétences',
    [FacetAttributes.position]: 'Poste',
    [FacetAttributes.feedbacks]: 'Note',
    [FacetAttributes.timestamp]: 'Date',
};

export const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID as string;
export const searchKey = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY as string;
export const indexName = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME as string;
