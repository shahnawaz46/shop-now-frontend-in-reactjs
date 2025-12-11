export const getNameInitials = (name: string): string => {
  const [first, last] = name.split(" ");
  return `${first[0]}${last[0]}`;
};
