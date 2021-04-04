import * as ERROR_MSGS from "../constants/error_msgs";
import { interfaces } from "../interfaces/interfaces";

class Lookup<T extends interfaces.Clonable<T>> implements interfaces.Lookup<T> {

    // dictionary used store multiple values for each key <key>
    readonly map = new Map<interfaces.ServiceIdentifier<any>, T[]>()

    // adds a new entry to map
    public add(serviceIdentifier: interfaces.ServiceIdentifier<any>, value: T): void {

        if (serviceIdentifier === null || serviceIdentifier === undefined) {
            throw new Error(ERROR_MSGS.NULL_ARGUMENT);
        }

        if (value === null || value === undefined) {
            throw new Error(ERROR_MSGS.NULL_ARGUMENT);
        }

        const entry = this.map.get(serviceIdentifier);
        if (entry !== undefined) {
            entry.push(value);
            this.map.set(serviceIdentifier, entry);
        } else {
            this.map.set(serviceIdentifier, [value]);
        }
    }

    // gets the value of a entry by its key (serviceIdentifier)
    public get(serviceIdentifier: interfaces.ServiceIdentifier<any>): T[] {

        if (serviceIdentifier === null || serviceIdentifier === undefined) {
            throw new Error(ERROR_MSGS.NULL_ARGUMENT);
        }

        const entry = this.map.get(serviceIdentifier);

        if (entry !== undefined) {
            return entry;
        } else {
            throw new Error(ERROR_MSGS.KEY_NOT_FOUND);
        }
    }

    // removes a entry from map by its key (serviceIdentifier)
    public remove(serviceIdentifier: interfaces.ServiceIdentifier<any>): void {

        if (serviceIdentifier === null || serviceIdentifier === undefined) {
            throw new Error(ERROR_MSGS.NULL_ARGUMENT);
        }

        if (!this.map.delete(serviceIdentifier)) {
            throw new Error(ERROR_MSGS.KEY_NOT_FOUND);
        }

    }

    public removeByCondition(condition: (item: T) => boolean): void {
        this.map.forEach((entries, key) => {
            const updatedEntries = entries.filter((entry) => !condition(entry));
            if (updatedEntries.length > 0) {
                this.map.set(key, updatedEntries);
            } else {
                this.map.delete(key);
            }
        });
    }

    // returns true if map contains a key (serviceIdentifier)
    public hasKey(serviceIdentifier: interfaces.ServiceIdentifier<any>): boolean {

        if (serviceIdentifier === null || serviceIdentifier === undefined) {
            throw new Error(ERROR_MSGS.NULL_ARGUMENT);
        }

        return this.map.has(serviceIdentifier);
    }

    // returns a new Lookup instance; note: this is not a deep clone, only Lookup related data structure (dictionary) is
    // cloned, content remains the same
    public clone(): interfaces.Lookup<T> {

        const copy = new Lookup<T>();

        this.map.forEach((value, key) => {
            value.forEach((b) => copy.add(key, b.clone()));
        });

        return copy;
    }

}

export { Lookup };
