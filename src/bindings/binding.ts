import { BindingScopeEnum, BindingTypeEnum } from "../constants/literal_types";
import { interfaces } from "../interfaces/interfaces";
import { id } from "../utils/id";

class Binding<T> implements interfaces.Binding<T> {

    public id: number = id();
    public moduleId: string;

    // Determines weather the bindings has been already activated
    // The activation action takes place when an instance is resolved
    // If the scope is singleton it only happens once
    public activated: boolean = false;

    // A runtime identifier because at runtime we don't have interfaces
    public serviceIdentifier: interfaces.ServiceIdentifier<T>;

    // The constructor of a class which must implement T
    public implementationType: interfaces.Newable<T> | null = null;

    // Cache used to allow singleton scope and BindingType.ConstantValue bindings
    public cache: T | null = null;

    // Cache used to allow BindingType.DynamicValue bindings
    public dynamicValue: ((context: interfaces.Context) => T) | null = null;

    // The scope mode to be used
    public scope: interfaces.BindingScope = BindingScopeEnum.Transient;

    // The kind of binding
    public type: interfaces.BindingType = BindingTypeEnum.Invalid;

    // A factory method used in BindingType.Factory bindings
    public factory: interfaces.FactoryCreator<T> | null = null;

    // An async factory method used in BindingType.Provider bindings
    public provider: interfaces.ProviderCreator<T> | null = null;

    // A constraint used to limit the contexts in which this binding is applicable
    public constraint: (request: interfaces.Request) => boolean = (request: interfaces.Request) => true;

    // On activation handler (invoked just before an instance is added to cache and injected)
    public onActivation: ((context: interfaces.Context, injectable: T) => T) | null = null;

    public constructor(serviceIdentifier: interfaces.ServiceIdentifier<T>) {
        this.serviceIdentifier = serviceIdentifier;
    }

    static of<T>(serviceIdentifier: interfaces.ServiceIdentifier<T>, scope: interfaces.BindingScope) {
        const binding = new Binding<T>(serviceIdentifier)
        binding.scope = scope
        return binding
    }

    public clone(): interfaces.Binding<T> {
        const clone = Binding.of(this.serviceIdentifier, this.scope);
        clone.activated = (this.scope === BindingScopeEnum.Singleton) ? this.activated : false;
        clone.implementationType = this.implementationType;
        clone.dynamicValue = this.dynamicValue;
        clone.scope = this.scope;
        clone.type = this.type;
        clone.factory = this.factory;
        clone.provider = this.provider;
        clone.constraint = this.constraint;
        clone.onActivation = this.onActivation;
        clone.cache = this.cache;
        return clone;
    }

}

export { Binding };
