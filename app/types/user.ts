import type { WithId, Document } from 'mongodb'

export interface User extends WithId<Document> {
    id: string;
    name: string;
    email: string;
    password: string;
  };