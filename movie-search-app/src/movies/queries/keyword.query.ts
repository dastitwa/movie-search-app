export function buildKeywordQuery(
    field: string,
    value: string,
  ) {
    return {
      term: {
        [`${field}.keyword`]: {
          value,
        },
      },
    };
  }