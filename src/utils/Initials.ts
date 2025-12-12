export const getNameInitials = (name: string): string => {
  const parts = name.trim().split(" ");
  console.log("parts", parts);

  if (parts.length === 1) {
    return parts[0][0].toUpperCase();
  }

  return (parts[0][0] + parts[1][0]).toUpperCase();
};
