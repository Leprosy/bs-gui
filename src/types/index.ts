export interface HTMLBlockStructure {
  id: string;
  label: string;
  tagName: string;
  classList?: string[];
  parentId?: string;
  children: HTMLBlockStructure[];
}
