export interface Band {
  name: string;
  recordLabel: string;
};

export interface Festival {
  name: string;
  bands: Band[];
};

export interface OutputBand {
  name: string;
  festivals: string[];
};

export interface OutputRecord {
  recordLabel: string;
  bands: OutputBand[];
};

export type Order = 'asc' | 'desc';