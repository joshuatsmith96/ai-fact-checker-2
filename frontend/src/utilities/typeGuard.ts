/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export const isGeminiError = (data: any): data is { error: string } => {
  return data && typeof data.error === 'string';
};
