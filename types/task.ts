export interface Task {
  id: string;
  description: string;
  isDone: boolean;
}

export type Product = {
  id: string;
  nomProduit: string;
  prix: number;
  devise: string;
  imageUrl: string;
  qte?: number;
  typeVente?: string;
  date?: string;
  descriptionProduit?: string;
  category?: string;
  collection?: string;
  tailles?: string[];
  couleurs?: string[];
  createdAt?: string;
  updatedAt?: string;
  idvendeur?: string;
  namestore?: string;
  isNew?: boolean;
  // Pour la compatibilité avec CartItem
  name?: string;
  price?: string | number;
  image?: string;
  description?: string;
}



export type TaskFilter = 'all' | 'done' | 'undone';

export type ParamsID = {
  params: Promise<{
    id?: string;
  }>
}