export interface Field {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
  field_id: number;
}

export interface Question {
  id: number;
  text: string;
  is_coding: boolean;
}