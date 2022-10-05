export interface JsonFormData {
  field: string;
  label: string;
  type: string;
  hidden: string;
  mandatory: boolean | string;
  value?: any;
  errors?: Array<any>;
  validators?: object;
}
