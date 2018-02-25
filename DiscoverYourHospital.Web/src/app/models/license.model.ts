export class License {
  licenseId: number;
  licenseName: string;
  licenseVersion: string;
  licenseNameAndVersion: string;
  licenseText: string;
  licenseRegex: string;
  lastModifiedBy: string;
  lastUpdated: Date;
  status: number;
  approvedForInternalUse: boolean;
  approvedForExternalUse: boolean;

  constructor() {
    this.approvedForInternalUse = false;
    this.approvedForExternalUse = false;
  }
}
