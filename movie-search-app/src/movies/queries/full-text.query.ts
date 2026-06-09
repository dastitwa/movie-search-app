export function buildFullTextQuery(
    searchText: string,
  ) {
    return {
      multi_match: {
        query: searchText,
  
        fields: [
          'title^3',
          'description',
        ],
      },
    };
  }