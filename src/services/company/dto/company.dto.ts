export class CreateCompanyRequest {
  companyName: string;
  companyImg: unknown;
}

export interface AssignCompanyRequest {
  userId: string;
  companyId: string;
}
