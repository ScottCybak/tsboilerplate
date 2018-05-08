import "reflect-metadata";

type GenericClassDecorator<T> = (target: T) => void;

interface Type<T> {
	new(...args: any[]): T;
}

/**
 * 
 * @param sharedName setting this to a string will force all DI to use
 * the same instance.
 * 
 */
export const Injectable = (sharedName?: string) : GenericClassDecorator<Type<object>> => {
	return (target: Type<object>) => {
		Injector.set(target, sharedName);
	};
};

export const Injector = new class {
	// A map where all registered services will be stored
	protected services: Map<string, Type<any>> = new Map<string, Type<any>>();
	protected singletons: Map<string, Type<any>> = new Map<string, Type<any>>();
	
	// resolving instances
	resolve<T>(target: Type<any>): T {
	  // tokens are required dependencies, while injections are resolved tokens from the Injector
		let tokens = Reflect.getMetadata('design:paramtypes', target) || [],
			injections = tokens.map((token: any) => Injector.resolve<any>(token)),
			sharedKey = (<any>target).prototype.__singleton__,
			cached = this.singletons.get(sharedKey),
			inst = cached || new target(...injections);

		// register if the sharedKey is present and no cached version was found, 
		// if the Injectable was forced to sharing mode
		if (sharedKey && !cached) {
			this.singletons.set(sharedKey, inst);
		}
		return inst;
	}
	
	// store services within the injector
	set(target: Type<any>, sharedName?: string) {
	  	this.services.set(target.name, target);
		if (sharedName) {
			this.singletons.set(sharedName, null);
			target.prototype.__singleton__ = sharedName;
		}
	}
  };