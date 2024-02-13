/**
 * `PersistenceContract` interface.
 * This interface defines the methods for basic CRUD operations.
 *
 * @template T - The type of the objects that the methods will operate on.
 *
 * @method create - Create an item of type T and return a promise with the created item.
 * @method update - Update an item with the given id. Return a promise with the updated item or null if the item doesn't exist.
 * @method delete - Delete an item with the given id. Return a promise with a boolean indicating the success of the operation.
 * @method findAll - Return a promise with an array of all items.
 * @method findById - Return a promise with an item with the given id.
 */
export interface PersistenceContract<T> {

    create(item: T): Promise<T>;

    update(id: number, item: T): Promise<T | null>;

    delete(id: number): Promise<boolean>;

    findAll(): Promise<T[]>;
    
    findById(id: number): Promise<T | null>;
}