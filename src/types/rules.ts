export interface RuleSection {
  id: string;
  title: string;
  content: string;
  tags: string[];
  subsections?: RuleSection[];
}
