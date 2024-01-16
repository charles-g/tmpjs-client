export enum FacetAttributes {
    company = 'companyName',
    address = 'companyAddress',
    skills = 'companySkills.skillName',
    position = 'contractPositionName',
    feedbacks = 'postContractFeedbacks.positivePercentage',
    timestamp = 'timestamp',
};

export const facetTranslations = {
    [FacetAttributes.skills]: 'Skills',
    [FacetAttributes.position]: 'Position',
    [FacetAttributes.feedbacks]: 'Rating',
    [FacetAttributes.timestamp]: 'Date',
};

export const appId = 'BD8UVRQT34';
export const searchKey = '95bcc902b6f02a71642725d46ea5ead8';
export const indexName = 'availabilities';
