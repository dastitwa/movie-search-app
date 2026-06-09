export async function measureExecutionTime<T>(
    fn: () => Promise<T>,
  ): Promise<{
    result: T;
    executionTime: number;
  }> {
    const start = performance.now();
  
    const result = await fn();
  
    return {
      result,
      executionTime: performance.now() - start,
    };
  }