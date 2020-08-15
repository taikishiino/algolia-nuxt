import algoliasearch from 'algoliasearch';

const config = {
  appId: process.env.ALGOLIA_APP_ID,
  searchKey: process.env.ALGOLIA_SEARCH_KEY
}
console.warn(config)
const algoliaClient = algoliasearch(config.appId, config.searchKey);

export default algoliaClient;