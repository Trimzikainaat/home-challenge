const newsapiCategories = [
    { id: 'business', name: 'Business' },
    { id: 'entertainment', name: 'Entertainment' },
    { id: 'general', name: 'General' },
    { id: 'health', name: 'Health' },
    { id: 'science', name: 'Science' },
    { id: 'sports', name: 'Sports' },
    { id: 'technology', name: 'Technology' }
];

const nytCategories = [
    { id: 'arts', name: 'Arts' },
    { id: 'automobiles', name: 'Automobiles' },
    { id: 'books', name: 'Books' },
    { id: 'business', name: 'Business' },
    { id: 'fashion', name: 'Fashion' },
    { id: 'food', name: 'Food' },
    { id: 'health', name: 'Health' },
    { id: 'home', name: 'Home' },
    { id: 'insider', name: 'Insider' },
    { id: 'magazine', name: 'Magazine' },
    { id: 'movies', name: 'Movies' },
    { id: 'national', name: 'National' },
    { id: 'nyregion', name: 'NY Region' },
    { id: 'obituaries', name: 'Obituaries' },
    { id: 'opinion', name: 'Opinion' },
    { id: 'politics', name: 'Politics' },
    { id: 'realestate', name: 'Real Estate' },
    { id: 'science', name: 'Science' },
    { id: 'sports', name: 'Sports' },
    { id: 'sundayreview', name: 'Sunday Review' },
    { id: 'technology', name: 'Technology' },
    { id: 'theater', name: 'Theater' },
    { id: 'tmagazine', name: 'T Magazine' },
    { id: 'travel', name: 'Travel' },
    { id: 'upshot', name: 'Upshot' },
    { id: 'world', name: 'World' }
];

const guardianCategories = [
    { id: 'artanddesign', name: 'Art & Design' },
    { id: 'books', name: 'Books' },
    { id: 'business', name: 'Business' },
    { id: 'culture', name: 'Culture' },
    { id: 'education', name: 'Education' },
    { id: 'environment', name: 'Environment' },
    { id: 'fashion', name: 'Fashion' },
    { id: 'film', name: 'Film' },
    { id: 'food', name: 'Food' },
    { id: 'games', name: 'Games' },
    { id: 'global-development', name: 'Global Development' },
    { id: 'music', name: 'Music' },
    { id: 'politics', name: 'Politics' },
    { id: 'science', name: 'Science' },
    { id: 'society', name: 'Society' },
    { id: 'sport', name: 'Sport' },
    { id: 'technology', name: 'Technology' },
    { id: 'travel', name: 'Travel' }
];

export const categories = [
    ...newsapiCategories,
    ...nytCategories,
    ...guardianCategories,
];

export function getCategories() {

    const uniqueCategories = [];

    categories.forEach(category => {
        if (!uniqueCategories.some(c => c.id === category.id)) {
            uniqueCategories.push(category);
        }
    });

    return uniqueCategories;
}

