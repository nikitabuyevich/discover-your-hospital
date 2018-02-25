export class CheckedRegex {
  regexMatches: boolean;
  regexCorrect: boolean;
  regexError: boolean;

  constructor(regexMatches: boolean, regexCorrect: boolean, regexError: boolean) {
    this.regexMatches = regexMatches;
    this.regexCorrect = regexCorrect;
    this.regexError = regexError;
  }
}
