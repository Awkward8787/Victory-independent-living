export interface NavItem {
  label: string;
  path: string;
}

export interface GroundingSource {
  web?: {
    uri: string;
    title: string;
  };
  maps?: {
    uri: string;
    title: string;
    placeAnswerSources?: {
        reviewSnippets?: {
            snippet?: string;
        }[]
    }[]
  };
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  sources?: GroundingSource[];
  isError?: boolean;
}
