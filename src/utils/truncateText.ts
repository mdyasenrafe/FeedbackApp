export const truncateText = (
  name: string | null | undefined,
  maxLength: number,
  defaultValue: string = 'שחקן',
): string => {
  const displayName: string = name ?? defaultValue;
  return displayName.length > maxLength
    ? `${displayName.slice(0, maxLength)}..`
    : displayName;
};
