export const unicodeNameRegex = /^[\p{L}\p{M}\s\-']+$/u;
export const locationRegex = /^[\p{L}\p{M}\d\s,.'\-()&\/]+$/u;
export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/;
export const numberRegex = /^[0-9]+$/;
