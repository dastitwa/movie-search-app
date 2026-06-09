export function buildPartialQuery(
  query: string,
) {
  return {
    wildcard: {
      'title.keyword': {
        value: `*${query}*`,
        case_insensitive: true,
      },
    },
  };
}