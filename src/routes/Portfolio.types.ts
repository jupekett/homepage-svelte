export type Project = {
  id: string;
  name: string;
  description: string;
  liveAddress?: string;
  downtimeReason?: string;
  repository: string;
};

export type ProjectCategory = {
  id: string;
  name: string;
  description?: string;
  projects: Array<Project>;
};
