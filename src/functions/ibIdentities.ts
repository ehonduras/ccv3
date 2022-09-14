export const ibIdentities = ["Franco", "Anastasia", "John"];

export function obtainPossibleCallees(
  identities: string[],
  callerIdentity: string
) {
  identities.filter(item => item != callerIdentity);
}
