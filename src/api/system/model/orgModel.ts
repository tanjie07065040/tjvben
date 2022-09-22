import { TreeItem } from "/@/components/Tree";

export interface OrgModel extends TreeItem {
  id?: string;
  orgpid?: string;
  orgid?: string;
  orgname?: string;
  orgenable?: string;
  orgregion?: string;
  operationname?: string;
  operationtime?: string;
  appenable?: string;
}