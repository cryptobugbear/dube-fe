import { AssetTypes, WorkOrderStatuses, WorkOrderTypes } from "./enums";

export interface Member {
  id: string;
  name: string;
  orgId: string;
  cognitoId: string;
}

export interface Organization {
  id: string;
  name: string;
  members: Member[];
}

export interface Audit {
  createdAt: string;
  createdBy: string;
}

export interface WorkOrder {
  id: string;
  name: string;
  image: string;
  description: string;
  type: WorkOrderTypes;
  status: WorkOrderStatuses;
}

export interface Asset {
  id: string;
  name: string;
  location: string;
  organization: Organization;
  audit: Audit;
  workOrders: WorkOrder[];
  type: AssetTypes;
  imageS3: string;
}
