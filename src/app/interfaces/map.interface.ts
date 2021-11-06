export interface IMap<T, U, V> {
  toDomain(inputDTO: T): U;
  toDTO(model: U): V;
}
