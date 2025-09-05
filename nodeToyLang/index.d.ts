export interface ObjCodeItem {
  action: string;
  type?: string;
  value?: string;
  display?: string;
  varname?: string;
}

export function toObjectCompiler(input: string): ObjCodeItem[];
