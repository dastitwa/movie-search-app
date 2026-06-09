export function buildCombinedQuery(
    query: string,
    genre?: string,
    year?: number,
  ) {
    const filters: any[] = [];
  
    if (genre) {
      filters.push({
        term: {
          genre,
        },
      });
    }
  
    if (year) {
      filters.push({
        range: {
          releaseYear: {
            gte: year,
          },
        },
      });
    }
  
    return {
      bool: {
        must: [
          {
            multi_match: {
              query,
  
              fields: [
                'title^3',
                'description',
              ],
            },
          },
        ],
  
        filter: filters,
      },
    };
  }