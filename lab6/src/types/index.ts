export interface Category {
    id: number
    name: string
    image: string
}

export interface Readable<T, ID = number> {
  getAll(): Promise<T[]>;
  getById(id: ID): Promise<T>;
}

export interface Creatable<T, D> {
  create(data: D): Promise<T>;
}

export interface Editable<T, D, ID = number> {
  update(id: ID, data: D): Promise<T>;
}

export interface Deletable<ID = number> {
  delete(id: ID): Promise<void>;
}

export interface CrudRepository<T, D, ID = number>
  extends Readable<T, ID>,
    Creatable<T, D>,
    Editable<T, D, ID>,
    Deletable<ID> {}
