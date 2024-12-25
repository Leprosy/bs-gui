export interface HTMLBlockStructure {
  id: string;
  label: string;
  tagName: string;
  classList?: string[]
  children: HTMLBlockStructure[];
}
