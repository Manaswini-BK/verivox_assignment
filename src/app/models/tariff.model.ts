export interface ITariff {
    id: number;
    name: string;
    download: number;
    upload: number;
    price: string;
    benefits: string[];
    tariffFeatures?: string;
  }