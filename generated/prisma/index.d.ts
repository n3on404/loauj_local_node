
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model StationConfig
 * 
 */
export type StationConfig = $Result.DefaultSelection<Prisma.$StationConfigPayload>
/**
 * Model Staff
 * 
 */
export type Staff = $Result.DefaultSelection<Prisma.$StaffPayload>
/**
 * Model Session
 * 
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>
/**
 * Model Driver
 * 
 */
export type Driver = $Result.DefaultSelection<Prisma.$DriverPayload>
/**
 * Model Vehicle
 * 
 */
export type Vehicle = $Result.DefaultSelection<Prisma.$VehiclePayload>
/**
 * Model VehicleAuthorizedStation
 * 
 */
export type VehicleAuthorizedStation = $Result.DefaultSelection<Prisma.$VehicleAuthorizedStationPayload>
/**
 * Model VehicleQueue
 * 
 */
export type VehicleQueue = $Result.DefaultSelection<Prisma.$VehicleQueuePayload>
/**
 * Model Route
 * 
 */
export type Route = $Result.DefaultSelection<Prisma.$RoutePayload>
/**
 * Model VehicleSchedule
 * 
 */
export type VehicleSchedule = $Result.DefaultSelection<Prisma.$VehicleSchedulePayload>
/**
 * Model Booking
 * 
 */
export type Booking = $Result.DefaultSelection<Prisma.$BookingPayload>
/**
 * Model SyncQueue
 * 
 */
export type SyncQueue = $Result.DefaultSelection<Prisma.$SyncQueuePayload>
/**
 * Model OperationLog
 * 
 */
export type OperationLog = $Result.DefaultSelection<Prisma.$OperationLogPayload>
/**
 * Model OfflineCustomer
 * 
 */
export type OfflineCustomer = $Result.DefaultSelection<Prisma.$OfflineCustomerPayload>
/**
 * Model SyncOperation
 * 
 */
export type SyncOperation = $Result.DefaultSelection<Prisma.$SyncOperationPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more StationConfigs
 * const stationConfigs = await prisma.stationConfig.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more StationConfigs
   * const stationConfigs = await prisma.stationConfig.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.stationConfig`: Exposes CRUD operations for the **StationConfig** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more StationConfigs
    * const stationConfigs = await prisma.stationConfig.findMany()
    * ```
    */
  get stationConfig(): Prisma.StationConfigDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.staff`: Exposes CRUD operations for the **Staff** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Staff
    * const staff = await prisma.staff.findMany()
    * ```
    */
  get staff(): Prisma.StaffDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.driver`: Exposes CRUD operations for the **Driver** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Drivers
    * const drivers = await prisma.driver.findMany()
    * ```
    */
  get driver(): Prisma.DriverDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.vehicle`: Exposes CRUD operations for the **Vehicle** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Vehicles
    * const vehicles = await prisma.vehicle.findMany()
    * ```
    */
  get vehicle(): Prisma.VehicleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.vehicleAuthorizedStation`: Exposes CRUD operations for the **VehicleAuthorizedStation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VehicleAuthorizedStations
    * const vehicleAuthorizedStations = await prisma.vehicleAuthorizedStation.findMany()
    * ```
    */
  get vehicleAuthorizedStation(): Prisma.VehicleAuthorizedStationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.vehicleQueue`: Exposes CRUD operations for the **VehicleQueue** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VehicleQueues
    * const vehicleQueues = await prisma.vehicleQueue.findMany()
    * ```
    */
  get vehicleQueue(): Prisma.VehicleQueueDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.route`: Exposes CRUD operations for the **Route** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Routes
    * const routes = await prisma.route.findMany()
    * ```
    */
  get route(): Prisma.RouteDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.vehicleSchedule`: Exposes CRUD operations for the **VehicleSchedule** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VehicleSchedules
    * const vehicleSchedules = await prisma.vehicleSchedule.findMany()
    * ```
    */
  get vehicleSchedule(): Prisma.VehicleScheduleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.booking`: Exposes CRUD operations for the **Booking** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Bookings
    * const bookings = await prisma.booking.findMany()
    * ```
    */
  get booking(): Prisma.BookingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.syncQueue`: Exposes CRUD operations for the **SyncQueue** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SyncQueues
    * const syncQueues = await prisma.syncQueue.findMany()
    * ```
    */
  get syncQueue(): Prisma.SyncQueueDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.operationLog`: Exposes CRUD operations for the **OperationLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OperationLogs
    * const operationLogs = await prisma.operationLog.findMany()
    * ```
    */
  get operationLog(): Prisma.OperationLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.offlineCustomer`: Exposes CRUD operations for the **OfflineCustomer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OfflineCustomers
    * const offlineCustomers = await prisma.offlineCustomer.findMany()
    * ```
    */
  get offlineCustomer(): Prisma.OfflineCustomerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.syncOperation`: Exposes CRUD operations for the **SyncOperation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SyncOperations
    * const syncOperations = await prisma.syncOperation.findMany()
    * ```
    */
  get syncOperation(): Prisma.SyncOperationDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.10.1
   * Query Engine version: 9b628578b3b7cae625e8c927178f15a170e74a9c
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    StationConfig: 'StationConfig',
    Staff: 'Staff',
    Session: 'Session',
    Driver: 'Driver',
    Vehicle: 'Vehicle',
    VehicleAuthorizedStation: 'VehicleAuthorizedStation',
    VehicleQueue: 'VehicleQueue',
    Route: 'Route',
    VehicleSchedule: 'VehicleSchedule',
    Booking: 'Booking',
    SyncQueue: 'SyncQueue',
    OperationLog: 'OperationLog',
    OfflineCustomer: 'OfflineCustomer',
    SyncOperation: 'SyncOperation'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "stationConfig" | "staff" | "session" | "driver" | "vehicle" | "vehicleAuthorizedStation" | "vehicleQueue" | "route" | "vehicleSchedule" | "booking" | "syncQueue" | "operationLog" | "offlineCustomer" | "syncOperation"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      StationConfig: {
        payload: Prisma.$StationConfigPayload<ExtArgs>
        fields: Prisma.StationConfigFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StationConfigFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StationConfigPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StationConfigFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StationConfigPayload>
          }
          findFirst: {
            args: Prisma.StationConfigFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StationConfigPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StationConfigFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StationConfigPayload>
          }
          findMany: {
            args: Prisma.StationConfigFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StationConfigPayload>[]
          }
          create: {
            args: Prisma.StationConfigCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StationConfigPayload>
          }
          createMany: {
            args: Prisma.StationConfigCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StationConfigCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StationConfigPayload>[]
          }
          delete: {
            args: Prisma.StationConfigDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StationConfigPayload>
          }
          update: {
            args: Prisma.StationConfigUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StationConfigPayload>
          }
          deleteMany: {
            args: Prisma.StationConfigDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StationConfigUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StationConfigUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StationConfigPayload>[]
          }
          upsert: {
            args: Prisma.StationConfigUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StationConfigPayload>
          }
          aggregate: {
            args: Prisma.StationConfigAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStationConfig>
          }
          groupBy: {
            args: Prisma.StationConfigGroupByArgs<ExtArgs>
            result: $Utils.Optional<StationConfigGroupByOutputType>[]
          }
          count: {
            args: Prisma.StationConfigCountArgs<ExtArgs>
            result: $Utils.Optional<StationConfigCountAggregateOutputType> | number
          }
        }
      }
      Staff: {
        payload: Prisma.$StaffPayload<ExtArgs>
        fields: Prisma.StaffFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StaffFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StaffFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload>
          }
          findFirst: {
            args: Prisma.StaffFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StaffFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload>
          }
          findMany: {
            args: Prisma.StaffFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload>[]
          }
          create: {
            args: Prisma.StaffCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload>
          }
          createMany: {
            args: Prisma.StaffCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StaffCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload>[]
          }
          delete: {
            args: Prisma.StaffDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload>
          }
          update: {
            args: Prisma.StaffUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload>
          }
          deleteMany: {
            args: Prisma.StaffDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StaffUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StaffUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload>[]
          }
          upsert: {
            args: Prisma.StaffUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload>
          }
          aggregate: {
            args: Prisma.StaffAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStaff>
          }
          groupBy: {
            args: Prisma.StaffGroupByArgs<ExtArgs>
            result: $Utils.Optional<StaffGroupByOutputType>[]
          }
          count: {
            args: Prisma.StaffCountArgs<ExtArgs>
            result: $Utils.Optional<StaffCountAggregateOutputType> | number
          }
        }
      }
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>
        fields: Prisma.SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
      Driver: {
        payload: Prisma.$DriverPayload<ExtArgs>
        fields: Prisma.DriverFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DriverFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DriverFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverPayload>
          }
          findFirst: {
            args: Prisma.DriverFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DriverFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverPayload>
          }
          findMany: {
            args: Prisma.DriverFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverPayload>[]
          }
          create: {
            args: Prisma.DriverCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverPayload>
          }
          createMany: {
            args: Prisma.DriverCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DriverCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverPayload>[]
          }
          delete: {
            args: Prisma.DriverDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverPayload>
          }
          update: {
            args: Prisma.DriverUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverPayload>
          }
          deleteMany: {
            args: Prisma.DriverDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DriverUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DriverUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverPayload>[]
          }
          upsert: {
            args: Prisma.DriverUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverPayload>
          }
          aggregate: {
            args: Prisma.DriverAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDriver>
          }
          groupBy: {
            args: Prisma.DriverGroupByArgs<ExtArgs>
            result: $Utils.Optional<DriverGroupByOutputType>[]
          }
          count: {
            args: Prisma.DriverCountArgs<ExtArgs>
            result: $Utils.Optional<DriverCountAggregateOutputType> | number
          }
        }
      }
      Vehicle: {
        payload: Prisma.$VehiclePayload<ExtArgs>
        fields: Prisma.VehicleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VehicleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VehicleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>
          }
          findFirst: {
            args: Prisma.VehicleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VehicleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>
          }
          findMany: {
            args: Prisma.VehicleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>[]
          }
          create: {
            args: Prisma.VehicleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>
          }
          createMany: {
            args: Prisma.VehicleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VehicleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>[]
          }
          delete: {
            args: Prisma.VehicleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>
          }
          update: {
            args: Prisma.VehicleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>
          }
          deleteMany: {
            args: Prisma.VehicleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VehicleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VehicleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>[]
          }
          upsert: {
            args: Prisma.VehicleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>
          }
          aggregate: {
            args: Prisma.VehicleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVehicle>
          }
          groupBy: {
            args: Prisma.VehicleGroupByArgs<ExtArgs>
            result: $Utils.Optional<VehicleGroupByOutputType>[]
          }
          count: {
            args: Prisma.VehicleCountArgs<ExtArgs>
            result: $Utils.Optional<VehicleCountAggregateOutputType> | number
          }
        }
      }
      VehicleAuthorizedStation: {
        payload: Prisma.$VehicleAuthorizedStationPayload<ExtArgs>
        fields: Prisma.VehicleAuthorizedStationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VehicleAuthorizedStationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleAuthorizedStationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VehicleAuthorizedStationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleAuthorizedStationPayload>
          }
          findFirst: {
            args: Prisma.VehicleAuthorizedStationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleAuthorizedStationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VehicleAuthorizedStationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleAuthorizedStationPayload>
          }
          findMany: {
            args: Prisma.VehicleAuthorizedStationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleAuthorizedStationPayload>[]
          }
          create: {
            args: Prisma.VehicleAuthorizedStationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleAuthorizedStationPayload>
          }
          createMany: {
            args: Prisma.VehicleAuthorizedStationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VehicleAuthorizedStationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleAuthorizedStationPayload>[]
          }
          delete: {
            args: Prisma.VehicleAuthorizedStationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleAuthorizedStationPayload>
          }
          update: {
            args: Prisma.VehicleAuthorizedStationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleAuthorizedStationPayload>
          }
          deleteMany: {
            args: Prisma.VehicleAuthorizedStationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VehicleAuthorizedStationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VehicleAuthorizedStationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleAuthorizedStationPayload>[]
          }
          upsert: {
            args: Prisma.VehicleAuthorizedStationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleAuthorizedStationPayload>
          }
          aggregate: {
            args: Prisma.VehicleAuthorizedStationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVehicleAuthorizedStation>
          }
          groupBy: {
            args: Prisma.VehicleAuthorizedStationGroupByArgs<ExtArgs>
            result: $Utils.Optional<VehicleAuthorizedStationGroupByOutputType>[]
          }
          count: {
            args: Prisma.VehicleAuthorizedStationCountArgs<ExtArgs>
            result: $Utils.Optional<VehicleAuthorizedStationCountAggregateOutputType> | number
          }
        }
      }
      VehicleQueue: {
        payload: Prisma.$VehicleQueuePayload<ExtArgs>
        fields: Prisma.VehicleQueueFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VehicleQueueFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleQueuePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VehicleQueueFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleQueuePayload>
          }
          findFirst: {
            args: Prisma.VehicleQueueFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleQueuePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VehicleQueueFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleQueuePayload>
          }
          findMany: {
            args: Prisma.VehicleQueueFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleQueuePayload>[]
          }
          create: {
            args: Prisma.VehicleQueueCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleQueuePayload>
          }
          createMany: {
            args: Prisma.VehicleQueueCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VehicleQueueCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleQueuePayload>[]
          }
          delete: {
            args: Prisma.VehicleQueueDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleQueuePayload>
          }
          update: {
            args: Prisma.VehicleQueueUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleQueuePayload>
          }
          deleteMany: {
            args: Prisma.VehicleQueueDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VehicleQueueUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VehicleQueueUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleQueuePayload>[]
          }
          upsert: {
            args: Prisma.VehicleQueueUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleQueuePayload>
          }
          aggregate: {
            args: Prisma.VehicleQueueAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVehicleQueue>
          }
          groupBy: {
            args: Prisma.VehicleQueueGroupByArgs<ExtArgs>
            result: $Utils.Optional<VehicleQueueGroupByOutputType>[]
          }
          count: {
            args: Prisma.VehicleQueueCountArgs<ExtArgs>
            result: $Utils.Optional<VehicleQueueCountAggregateOutputType> | number
          }
        }
      }
      Route: {
        payload: Prisma.$RoutePayload<ExtArgs>
        fields: Prisma.RouteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RouteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RouteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutePayload>
          }
          findFirst: {
            args: Prisma.RouteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RouteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutePayload>
          }
          findMany: {
            args: Prisma.RouteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutePayload>[]
          }
          create: {
            args: Prisma.RouteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutePayload>
          }
          createMany: {
            args: Prisma.RouteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RouteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutePayload>[]
          }
          delete: {
            args: Prisma.RouteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutePayload>
          }
          update: {
            args: Prisma.RouteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutePayload>
          }
          deleteMany: {
            args: Prisma.RouteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RouteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RouteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutePayload>[]
          }
          upsert: {
            args: Prisma.RouteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutePayload>
          }
          aggregate: {
            args: Prisma.RouteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRoute>
          }
          groupBy: {
            args: Prisma.RouteGroupByArgs<ExtArgs>
            result: $Utils.Optional<RouteGroupByOutputType>[]
          }
          count: {
            args: Prisma.RouteCountArgs<ExtArgs>
            result: $Utils.Optional<RouteCountAggregateOutputType> | number
          }
        }
      }
      VehicleSchedule: {
        payload: Prisma.$VehicleSchedulePayload<ExtArgs>
        fields: Prisma.VehicleScheduleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VehicleScheduleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleSchedulePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VehicleScheduleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleSchedulePayload>
          }
          findFirst: {
            args: Prisma.VehicleScheduleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleSchedulePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VehicleScheduleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleSchedulePayload>
          }
          findMany: {
            args: Prisma.VehicleScheduleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleSchedulePayload>[]
          }
          create: {
            args: Prisma.VehicleScheduleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleSchedulePayload>
          }
          createMany: {
            args: Prisma.VehicleScheduleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VehicleScheduleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleSchedulePayload>[]
          }
          delete: {
            args: Prisma.VehicleScheduleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleSchedulePayload>
          }
          update: {
            args: Prisma.VehicleScheduleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleSchedulePayload>
          }
          deleteMany: {
            args: Prisma.VehicleScheduleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VehicleScheduleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VehicleScheduleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleSchedulePayload>[]
          }
          upsert: {
            args: Prisma.VehicleScheduleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehicleSchedulePayload>
          }
          aggregate: {
            args: Prisma.VehicleScheduleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVehicleSchedule>
          }
          groupBy: {
            args: Prisma.VehicleScheduleGroupByArgs<ExtArgs>
            result: $Utils.Optional<VehicleScheduleGroupByOutputType>[]
          }
          count: {
            args: Prisma.VehicleScheduleCountArgs<ExtArgs>
            result: $Utils.Optional<VehicleScheduleCountAggregateOutputType> | number
          }
        }
      }
      Booking: {
        payload: Prisma.$BookingPayload<ExtArgs>
        fields: Prisma.BookingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BookingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BookingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          findFirst: {
            args: Prisma.BookingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BookingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          findMany: {
            args: Prisma.BookingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>[]
          }
          create: {
            args: Prisma.BookingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          createMany: {
            args: Prisma.BookingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BookingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>[]
          }
          delete: {
            args: Prisma.BookingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          update: {
            args: Prisma.BookingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          deleteMany: {
            args: Prisma.BookingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BookingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BookingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>[]
          }
          upsert: {
            args: Prisma.BookingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          aggregate: {
            args: Prisma.BookingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBooking>
          }
          groupBy: {
            args: Prisma.BookingGroupByArgs<ExtArgs>
            result: $Utils.Optional<BookingGroupByOutputType>[]
          }
          count: {
            args: Prisma.BookingCountArgs<ExtArgs>
            result: $Utils.Optional<BookingCountAggregateOutputType> | number
          }
        }
      }
      SyncQueue: {
        payload: Prisma.$SyncQueuePayload<ExtArgs>
        fields: Prisma.SyncQueueFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SyncQueueFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncQueuePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SyncQueueFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncQueuePayload>
          }
          findFirst: {
            args: Prisma.SyncQueueFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncQueuePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SyncQueueFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncQueuePayload>
          }
          findMany: {
            args: Prisma.SyncQueueFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncQueuePayload>[]
          }
          create: {
            args: Prisma.SyncQueueCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncQueuePayload>
          }
          createMany: {
            args: Prisma.SyncQueueCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SyncQueueCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncQueuePayload>[]
          }
          delete: {
            args: Prisma.SyncQueueDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncQueuePayload>
          }
          update: {
            args: Prisma.SyncQueueUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncQueuePayload>
          }
          deleteMany: {
            args: Prisma.SyncQueueDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SyncQueueUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SyncQueueUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncQueuePayload>[]
          }
          upsert: {
            args: Prisma.SyncQueueUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncQueuePayload>
          }
          aggregate: {
            args: Prisma.SyncQueueAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSyncQueue>
          }
          groupBy: {
            args: Prisma.SyncQueueGroupByArgs<ExtArgs>
            result: $Utils.Optional<SyncQueueGroupByOutputType>[]
          }
          count: {
            args: Prisma.SyncQueueCountArgs<ExtArgs>
            result: $Utils.Optional<SyncQueueCountAggregateOutputType> | number
          }
        }
      }
      OperationLog: {
        payload: Prisma.$OperationLogPayload<ExtArgs>
        fields: Prisma.OperationLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OperationLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OperationLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OperationLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OperationLogPayload>
          }
          findFirst: {
            args: Prisma.OperationLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OperationLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OperationLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OperationLogPayload>
          }
          findMany: {
            args: Prisma.OperationLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OperationLogPayload>[]
          }
          create: {
            args: Prisma.OperationLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OperationLogPayload>
          }
          createMany: {
            args: Prisma.OperationLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OperationLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OperationLogPayload>[]
          }
          delete: {
            args: Prisma.OperationLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OperationLogPayload>
          }
          update: {
            args: Prisma.OperationLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OperationLogPayload>
          }
          deleteMany: {
            args: Prisma.OperationLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OperationLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OperationLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OperationLogPayload>[]
          }
          upsert: {
            args: Prisma.OperationLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OperationLogPayload>
          }
          aggregate: {
            args: Prisma.OperationLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOperationLog>
          }
          groupBy: {
            args: Prisma.OperationLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<OperationLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.OperationLogCountArgs<ExtArgs>
            result: $Utils.Optional<OperationLogCountAggregateOutputType> | number
          }
        }
      }
      OfflineCustomer: {
        payload: Prisma.$OfflineCustomerPayload<ExtArgs>
        fields: Prisma.OfflineCustomerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OfflineCustomerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfflineCustomerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OfflineCustomerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfflineCustomerPayload>
          }
          findFirst: {
            args: Prisma.OfflineCustomerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfflineCustomerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OfflineCustomerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfflineCustomerPayload>
          }
          findMany: {
            args: Prisma.OfflineCustomerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfflineCustomerPayload>[]
          }
          create: {
            args: Prisma.OfflineCustomerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfflineCustomerPayload>
          }
          createMany: {
            args: Prisma.OfflineCustomerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OfflineCustomerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfflineCustomerPayload>[]
          }
          delete: {
            args: Prisma.OfflineCustomerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfflineCustomerPayload>
          }
          update: {
            args: Prisma.OfflineCustomerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfflineCustomerPayload>
          }
          deleteMany: {
            args: Prisma.OfflineCustomerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OfflineCustomerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OfflineCustomerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfflineCustomerPayload>[]
          }
          upsert: {
            args: Prisma.OfflineCustomerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfflineCustomerPayload>
          }
          aggregate: {
            args: Prisma.OfflineCustomerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOfflineCustomer>
          }
          groupBy: {
            args: Prisma.OfflineCustomerGroupByArgs<ExtArgs>
            result: $Utils.Optional<OfflineCustomerGroupByOutputType>[]
          }
          count: {
            args: Prisma.OfflineCustomerCountArgs<ExtArgs>
            result: $Utils.Optional<OfflineCustomerCountAggregateOutputType> | number
          }
        }
      }
      SyncOperation: {
        payload: Prisma.$SyncOperationPayload<ExtArgs>
        fields: Prisma.SyncOperationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SyncOperationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncOperationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SyncOperationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncOperationPayload>
          }
          findFirst: {
            args: Prisma.SyncOperationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncOperationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SyncOperationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncOperationPayload>
          }
          findMany: {
            args: Prisma.SyncOperationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncOperationPayload>[]
          }
          create: {
            args: Prisma.SyncOperationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncOperationPayload>
          }
          createMany: {
            args: Prisma.SyncOperationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SyncOperationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncOperationPayload>[]
          }
          delete: {
            args: Prisma.SyncOperationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncOperationPayload>
          }
          update: {
            args: Prisma.SyncOperationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncOperationPayload>
          }
          deleteMany: {
            args: Prisma.SyncOperationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SyncOperationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SyncOperationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncOperationPayload>[]
          }
          upsert: {
            args: Prisma.SyncOperationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncOperationPayload>
          }
          aggregate: {
            args: Prisma.SyncOperationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSyncOperation>
          }
          groupBy: {
            args: Prisma.SyncOperationGroupByArgs<ExtArgs>
            result: $Utils.Optional<SyncOperationGroupByOutputType>[]
          }
          count: {
            args: Prisma.SyncOperationCountArgs<ExtArgs>
            result: $Utils.Optional<SyncOperationCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    stationConfig?: StationConfigOmit
    staff?: StaffOmit
    session?: SessionOmit
    driver?: DriverOmit
    vehicle?: VehicleOmit
    vehicleAuthorizedStation?: VehicleAuthorizedStationOmit
    vehicleQueue?: VehicleQueueOmit
    route?: RouteOmit
    vehicleSchedule?: VehicleScheduleOmit
    booking?: BookingOmit
    syncQueue?: SyncQueueOmit
    operationLog?: OperationLogOmit
    offlineCustomer?: OfflineCustomerOmit
    syncOperation?: SyncOperationOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type StaffCountOutputType
   */

  export type StaffCountOutputType = {
    bookings: number
    verifications: number
    sessions: number
  }

  export type StaffCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bookings?: boolean | StaffCountOutputTypeCountBookingsArgs
    verifications?: boolean | StaffCountOutputTypeCountVerificationsArgs
    sessions?: boolean | StaffCountOutputTypeCountSessionsArgs
  }

  // Custom InputTypes
  /**
   * StaffCountOutputType without action
   */
  export type StaffCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffCountOutputType
     */
    select?: StaffCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * StaffCountOutputType without action
   */
  export type StaffCountOutputTypeCountBookingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookingWhereInput
  }

  /**
   * StaffCountOutputType without action
   */
  export type StaffCountOutputTypeCountVerificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookingWhereInput
  }

  /**
   * StaffCountOutputType without action
   */
  export type StaffCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }


  /**
   * Count Type VehicleCountOutputType
   */

  export type VehicleCountOutputType = {
    queueEntries: number
    authorizedStations: number
  }

  export type VehicleCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    queueEntries?: boolean | VehicleCountOutputTypeCountQueueEntriesArgs
    authorizedStations?: boolean | VehicleCountOutputTypeCountAuthorizedStationsArgs
  }

  // Custom InputTypes
  /**
   * VehicleCountOutputType without action
   */
  export type VehicleCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleCountOutputType
     */
    select?: VehicleCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * VehicleCountOutputType without action
   */
  export type VehicleCountOutputTypeCountQueueEntriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VehicleQueueWhereInput
  }

  /**
   * VehicleCountOutputType without action
   */
  export type VehicleCountOutputTypeCountAuthorizedStationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VehicleAuthorizedStationWhereInput
  }


  /**
   * Count Type VehicleQueueCountOutputType
   */

  export type VehicleQueueCountOutputType = {
    bookings: number
  }

  export type VehicleQueueCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bookings?: boolean | VehicleQueueCountOutputTypeCountBookingsArgs
  }

  // Custom InputTypes
  /**
   * VehicleQueueCountOutputType without action
   */
  export type VehicleQueueCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleQueueCountOutputType
     */
    select?: VehicleQueueCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * VehicleQueueCountOutputType without action
   */
  export type VehicleQueueCountOutputTypeCountBookingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookingWhereInput
  }


  /**
   * Count Type RouteCountOutputType
   */

  export type RouteCountOutputType = {
    schedules: number
  }

  export type RouteCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    schedules?: boolean | RouteCountOutputTypeCountSchedulesArgs
  }

  // Custom InputTypes
  /**
   * RouteCountOutputType without action
   */
  export type RouteCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RouteCountOutputType
     */
    select?: RouteCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RouteCountOutputType without action
   */
  export type RouteCountOutputTypeCountSchedulesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VehicleScheduleWhereInput
  }


  /**
   * Models
   */

  /**
   * Model StationConfig
   */

  export type AggregateStationConfig = {
    _count: StationConfigCountAggregateOutputType | null
    _min: StationConfigMinAggregateOutputType | null
    _max: StationConfigMaxAggregateOutputType | null
  }

  export type StationConfigMinAggregateOutputType = {
    id: string | null
    stationId: string | null
    stationName: string | null
    governorate: string | null
    delegation: string | null
    serverVersion: string | null
    lastSync: Date | null
    isOnline: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StationConfigMaxAggregateOutputType = {
    id: string | null
    stationId: string | null
    stationName: string | null
    governorate: string | null
    delegation: string | null
    serverVersion: string | null
    lastSync: Date | null
    isOnline: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StationConfigCountAggregateOutputType = {
    id: number
    stationId: number
    stationName: number
    governorate: number
    delegation: number
    serverVersion: number
    lastSync: number
    isOnline: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type StationConfigMinAggregateInputType = {
    id?: true
    stationId?: true
    stationName?: true
    governorate?: true
    delegation?: true
    serverVersion?: true
    lastSync?: true
    isOnline?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StationConfigMaxAggregateInputType = {
    id?: true
    stationId?: true
    stationName?: true
    governorate?: true
    delegation?: true
    serverVersion?: true
    lastSync?: true
    isOnline?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StationConfigCountAggregateInputType = {
    id?: true
    stationId?: true
    stationName?: true
    governorate?: true
    delegation?: true
    serverVersion?: true
    lastSync?: true
    isOnline?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type StationConfigAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StationConfig to aggregate.
     */
    where?: StationConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StationConfigs to fetch.
     */
    orderBy?: StationConfigOrderByWithRelationInput | StationConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StationConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StationConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StationConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned StationConfigs
    **/
    _count?: true | StationConfigCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StationConfigMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StationConfigMaxAggregateInputType
  }

  export type GetStationConfigAggregateType<T extends StationConfigAggregateArgs> = {
        [P in keyof T & keyof AggregateStationConfig]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStationConfig[P]>
      : GetScalarType<T[P], AggregateStationConfig[P]>
  }




  export type StationConfigGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StationConfigWhereInput
    orderBy?: StationConfigOrderByWithAggregationInput | StationConfigOrderByWithAggregationInput[]
    by: StationConfigScalarFieldEnum[] | StationConfigScalarFieldEnum
    having?: StationConfigScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StationConfigCountAggregateInputType | true
    _min?: StationConfigMinAggregateInputType
    _max?: StationConfigMaxAggregateInputType
  }

  export type StationConfigGroupByOutputType = {
    id: string
    stationId: string
    stationName: string
    governorate: string
    delegation: string
    serverVersion: string
    lastSync: Date | null
    isOnline: boolean
    createdAt: Date
    updatedAt: Date
    _count: StationConfigCountAggregateOutputType | null
    _min: StationConfigMinAggregateOutputType | null
    _max: StationConfigMaxAggregateOutputType | null
  }

  type GetStationConfigGroupByPayload<T extends StationConfigGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StationConfigGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StationConfigGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StationConfigGroupByOutputType[P]>
            : GetScalarType<T[P], StationConfigGroupByOutputType[P]>
        }
      >
    >


  export type StationConfigSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    stationId?: boolean
    stationName?: boolean
    governorate?: boolean
    delegation?: boolean
    serverVersion?: boolean
    lastSync?: boolean
    isOnline?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["stationConfig"]>

  export type StationConfigSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    stationId?: boolean
    stationName?: boolean
    governorate?: boolean
    delegation?: boolean
    serverVersion?: boolean
    lastSync?: boolean
    isOnline?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["stationConfig"]>

  export type StationConfigSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    stationId?: boolean
    stationName?: boolean
    governorate?: boolean
    delegation?: boolean
    serverVersion?: boolean
    lastSync?: boolean
    isOnline?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["stationConfig"]>

  export type StationConfigSelectScalar = {
    id?: boolean
    stationId?: boolean
    stationName?: boolean
    governorate?: boolean
    delegation?: boolean
    serverVersion?: boolean
    lastSync?: boolean
    isOnline?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type StationConfigOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "stationId" | "stationName" | "governorate" | "delegation" | "serverVersion" | "lastSync" | "isOnline" | "createdAt" | "updatedAt", ExtArgs["result"]["stationConfig"]>

  export type $StationConfigPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "StationConfig"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      stationId: string
      stationName: string
      governorate: string
      delegation: string
      serverVersion: string
      lastSync: Date | null
      isOnline: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["stationConfig"]>
    composites: {}
  }

  type StationConfigGetPayload<S extends boolean | null | undefined | StationConfigDefaultArgs> = $Result.GetResult<Prisma.$StationConfigPayload, S>

  type StationConfigCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StationConfigFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StationConfigCountAggregateInputType | true
    }

  export interface StationConfigDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['StationConfig'], meta: { name: 'StationConfig' } }
    /**
     * Find zero or one StationConfig that matches the filter.
     * @param {StationConfigFindUniqueArgs} args - Arguments to find a StationConfig
     * @example
     * // Get one StationConfig
     * const stationConfig = await prisma.stationConfig.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StationConfigFindUniqueArgs>(args: SelectSubset<T, StationConfigFindUniqueArgs<ExtArgs>>): Prisma__StationConfigClient<$Result.GetResult<Prisma.$StationConfigPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one StationConfig that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StationConfigFindUniqueOrThrowArgs} args - Arguments to find a StationConfig
     * @example
     * // Get one StationConfig
     * const stationConfig = await prisma.stationConfig.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StationConfigFindUniqueOrThrowArgs>(args: SelectSubset<T, StationConfigFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StationConfigClient<$Result.GetResult<Prisma.$StationConfigPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StationConfig that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StationConfigFindFirstArgs} args - Arguments to find a StationConfig
     * @example
     * // Get one StationConfig
     * const stationConfig = await prisma.stationConfig.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StationConfigFindFirstArgs>(args?: SelectSubset<T, StationConfigFindFirstArgs<ExtArgs>>): Prisma__StationConfigClient<$Result.GetResult<Prisma.$StationConfigPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StationConfig that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StationConfigFindFirstOrThrowArgs} args - Arguments to find a StationConfig
     * @example
     * // Get one StationConfig
     * const stationConfig = await prisma.stationConfig.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StationConfigFindFirstOrThrowArgs>(args?: SelectSubset<T, StationConfigFindFirstOrThrowArgs<ExtArgs>>): Prisma__StationConfigClient<$Result.GetResult<Prisma.$StationConfigPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more StationConfigs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StationConfigFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all StationConfigs
     * const stationConfigs = await prisma.stationConfig.findMany()
     * 
     * // Get first 10 StationConfigs
     * const stationConfigs = await prisma.stationConfig.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const stationConfigWithIdOnly = await prisma.stationConfig.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StationConfigFindManyArgs>(args?: SelectSubset<T, StationConfigFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StationConfigPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a StationConfig.
     * @param {StationConfigCreateArgs} args - Arguments to create a StationConfig.
     * @example
     * // Create one StationConfig
     * const StationConfig = await prisma.stationConfig.create({
     *   data: {
     *     // ... data to create a StationConfig
     *   }
     * })
     * 
     */
    create<T extends StationConfigCreateArgs>(args: SelectSubset<T, StationConfigCreateArgs<ExtArgs>>): Prisma__StationConfigClient<$Result.GetResult<Prisma.$StationConfigPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many StationConfigs.
     * @param {StationConfigCreateManyArgs} args - Arguments to create many StationConfigs.
     * @example
     * // Create many StationConfigs
     * const stationConfig = await prisma.stationConfig.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StationConfigCreateManyArgs>(args?: SelectSubset<T, StationConfigCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many StationConfigs and returns the data saved in the database.
     * @param {StationConfigCreateManyAndReturnArgs} args - Arguments to create many StationConfigs.
     * @example
     * // Create many StationConfigs
     * const stationConfig = await prisma.stationConfig.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many StationConfigs and only return the `id`
     * const stationConfigWithIdOnly = await prisma.stationConfig.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StationConfigCreateManyAndReturnArgs>(args?: SelectSubset<T, StationConfigCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StationConfigPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a StationConfig.
     * @param {StationConfigDeleteArgs} args - Arguments to delete one StationConfig.
     * @example
     * // Delete one StationConfig
     * const StationConfig = await prisma.stationConfig.delete({
     *   where: {
     *     // ... filter to delete one StationConfig
     *   }
     * })
     * 
     */
    delete<T extends StationConfigDeleteArgs>(args: SelectSubset<T, StationConfigDeleteArgs<ExtArgs>>): Prisma__StationConfigClient<$Result.GetResult<Prisma.$StationConfigPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one StationConfig.
     * @param {StationConfigUpdateArgs} args - Arguments to update one StationConfig.
     * @example
     * // Update one StationConfig
     * const stationConfig = await prisma.stationConfig.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StationConfigUpdateArgs>(args: SelectSubset<T, StationConfigUpdateArgs<ExtArgs>>): Prisma__StationConfigClient<$Result.GetResult<Prisma.$StationConfigPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more StationConfigs.
     * @param {StationConfigDeleteManyArgs} args - Arguments to filter StationConfigs to delete.
     * @example
     * // Delete a few StationConfigs
     * const { count } = await prisma.stationConfig.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StationConfigDeleteManyArgs>(args?: SelectSubset<T, StationConfigDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StationConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StationConfigUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many StationConfigs
     * const stationConfig = await prisma.stationConfig.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StationConfigUpdateManyArgs>(args: SelectSubset<T, StationConfigUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StationConfigs and returns the data updated in the database.
     * @param {StationConfigUpdateManyAndReturnArgs} args - Arguments to update many StationConfigs.
     * @example
     * // Update many StationConfigs
     * const stationConfig = await prisma.stationConfig.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more StationConfigs and only return the `id`
     * const stationConfigWithIdOnly = await prisma.stationConfig.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends StationConfigUpdateManyAndReturnArgs>(args: SelectSubset<T, StationConfigUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StationConfigPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one StationConfig.
     * @param {StationConfigUpsertArgs} args - Arguments to update or create a StationConfig.
     * @example
     * // Update or create a StationConfig
     * const stationConfig = await prisma.stationConfig.upsert({
     *   create: {
     *     // ... data to create a StationConfig
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the StationConfig we want to update
     *   }
     * })
     */
    upsert<T extends StationConfigUpsertArgs>(args: SelectSubset<T, StationConfigUpsertArgs<ExtArgs>>): Prisma__StationConfigClient<$Result.GetResult<Prisma.$StationConfigPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of StationConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StationConfigCountArgs} args - Arguments to filter StationConfigs to count.
     * @example
     * // Count the number of StationConfigs
     * const count = await prisma.stationConfig.count({
     *   where: {
     *     // ... the filter for the StationConfigs we want to count
     *   }
     * })
    **/
    count<T extends StationConfigCountArgs>(
      args?: Subset<T, StationConfigCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StationConfigCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a StationConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StationConfigAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StationConfigAggregateArgs>(args: Subset<T, StationConfigAggregateArgs>): Prisma.PrismaPromise<GetStationConfigAggregateType<T>>

    /**
     * Group by StationConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StationConfigGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StationConfigGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StationConfigGroupByArgs['orderBy'] }
        : { orderBy?: StationConfigGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StationConfigGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStationConfigGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the StationConfig model
   */
  readonly fields: StationConfigFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for StationConfig.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StationConfigClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the StationConfig model
   */
  interface StationConfigFieldRefs {
    readonly id: FieldRef<"StationConfig", 'String'>
    readonly stationId: FieldRef<"StationConfig", 'String'>
    readonly stationName: FieldRef<"StationConfig", 'String'>
    readonly governorate: FieldRef<"StationConfig", 'String'>
    readonly delegation: FieldRef<"StationConfig", 'String'>
    readonly serverVersion: FieldRef<"StationConfig", 'String'>
    readonly lastSync: FieldRef<"StationConfig", 'DateTime'>
    readonly isOnline: FieldRef<"StationConfig", 'Boolean'>
    readonly createdAt: FieldRef<"StationConfig", 'DateTime'>
    readonly updatedAt: FieldRef<"StationConfig", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * StationConfig findUnique
   */
  export type StationConfigFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StationConfig
     */
    select?: StationConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StationConfig
     */
    omit?: StationConfigOmit<ExtArgs> | null
    /**
     * Filter, which StationConfig to fetch.
     */
    where: StationConfigWhereUniqueInput
  }

  /**
   * StationConfig findUniqueOrThrow
   */
  export type StationConfigFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StationConfig
     */
    select?: StationConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StationConfig
     */
    omit?: StationConfigOmit<ExtArgs> | null
    /**
     * Filter, which StationConfig to fetch.
     */
    where: StationConfigWhereUniqueInput
  }

  /**
   * StationConfig findFirst
   */
  export type StationConfigFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StationConfig
     */
    select?: StationConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StationConfig
     */
    omit?: StationConfigOmit<ExtArgs> | null
    /**
     * Filter, which StationConfig to fetch.
     */
    where?: StationConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StationConfigs to fetch.
     */
    orderBy?: StationConfigOrderByWithRelationInput | StationConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StationConfigs.
     */
    cursor?: StationConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StationConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StationConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StationConfigs.
     */
    distinct?: StationConfigScalarFieldEnum | StationConfigScalarFieldEnum[]
  }

  /**
   * StationConfig findFirstOrThrow
   */
  export type StationConfigFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StationConfig
     */
    select?: StationConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StationConfig
     */
    omit?: StationConfigOmit<ExtArgs> | null
    /**
     * Filter, which StationConfig to fetch.
     */
    where?: StationConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StationConfigs to fetch.
     */
    orderBy?: StationConfigOrderByWithRelationInput | StationConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StationConfigs.
     */
    cursor?: StationConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StationConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StationConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StationConfigs.
     */
    distinct?: StationConfigScalarFieldEnum | StationConfigScalarFieldEnum[]
  }

  /**
   * StationConfig findMany
   */
  export type StationConfigFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StationConfig
     */
    select?: StationConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StationConfig
     */
    omit?: StationConfigOmit<ExtArgs> | null
    /**
     * Filter, which StationConfigs to fetch.
     */
    where?: StationConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StationConfigs to fetch.
     */
    orderBy?: StationConfigOrderByWithRelationInput | StationConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing StationConfigs.
     */
    cursor?: StationConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StationConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StationConfigs.
     */
    skip?: number
    distinct?: StationConfigScalarFieldEnum | StationConfigScalarFieldEnum[]
  }

  /**
   * StationConfig create
   */
  export type StationConfigCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StationConfig
     */
    select?: StationConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StationConfig
     */
    omit?: StationConfigOmit<ExtArgs> | null
    /**
     * The data needed to create a StationConfig.
     */
    data: XOR<StationConfigCreateInput, StationConfigUncheckedCreateInput>
  }

  /**
   * StationConfig createMany
   */
  export type StationConfigCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many StationConfigs.
     */
    data: StationConfigCreateManyInput | StationConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * StationConfig createManyAndReturn
   */
  export type StationConfigCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StationConfig
     */
    select?: StationConfigSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StationConfig
     */
    omit?: StationConfigOmit<ExtArgs> | null
    /**
     * The data used to create many StationConfigs.
     */
    data: StationConfigCreateManyInput | StationConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * StationConfig update
   */
  export type StationConfigUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StationConfig
     */
    select?: StationConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StationConfig
     */
    omit?: StationConfigOmit<ExtArgs> | null
    /**
     * The data needed to update a StationConfig.
     */
    data: XOR<StationConfigUpdateInput, StationConfigUncheckedUpdateInput>
    /**
     * Choose, which StationConfig to update.
     */
    where: StationConfigWhereUniqueInput
  }

  /**
   * StationConfig updateMany
   */
  export type StationConfigUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update StationConfigs.
     */
    data: XOR<StationConfigUpdateManyMutationInput, StationConfigUncheckedUpdateManyInput>
    /**
     * Filter which StationConfigs to update
     */
    where?: StationConfigWhereInput
    /**
     * Limit how many StationConfigs to update.
     */
    limit?: number
  }

  /**
   * StationConfig updateManyAndReturn
   */
  export type StationConfigUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StationConfig
     */
    select?: StationConfigSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StationConfig
     */
    omit?: StationConfigOmit<ExtArgs> | null
    /**
     * The data used to update StationConfigs.
     */
    data: XOR<StationConfigUpdateManyMutationInput, StationConfigUncheckedUpdateManyInput>
    /**
     * Filter which StationConfigs to update
     */
    where?: StationConfigWhereInput
    /**
     * Limit how many StationConfigs to update.
     */
    limit?: number
  }

  /**
   * StationConfig upsert
   */
  export type StationConfigUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StationConfig
     */
    select?: StationConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StationConfig
     */
    omit?: StationConfigOmit<ExtArgs> | null
    /**
     * The filter to search for the StationConfig to update in case it exists.
     */
    where: StationConfigWhereUniqueInput
    /**
     * In case the StationConfig found by the `where` argument doesn't exist, create a new StationConfig with this data.
     */
    create: XOR<StationConfigCreateInput, StationConfigUncheckedCreateInput>
    /**
     * In case the StationConfig was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StationConfigUpdateInput, StationConfigUncheckedUpdateInput>
  }

  /**
   * StationConfig delete
   */
  export type StationConfigDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StationConfig
     */
    select?: StationConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StationConfig
     */
    omit?: StationConfigOmit<ExtArgs> | null
    /**
     * Filter which StationConfig to delete.
     */
    where: StationConfigWhereUniqueInput
  }

  /**
   * StationConfig deleteMany
   */
  export type StationConfigDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StationConfigs to delete
     */
    where?: StationConfigWhereInput
    /**
     * Limit how many StationConfigs to delete.
     */
    limit?: number
  }

  /**
   * StationConfig without action
   */
  export type StationConfigDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StationConfig
     */
    select?: StationConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StationConfig
     */
    omit?: StationConfigOmit<ExtArgs> | null
  }


  /**
   * Model Staff
   */

  export type AggregateStaff = {
    _count: StaffCountAggregateOutputType | null
    _min: StaffMinAggregateOutputType | null
    _max: StaffMaxAggregateOutputType | null
  }

  export type StaffMinAggregateOutputType = {
    id: string | null
    cin: string | null
    phoneNumber: string | null
    firstName: string | null
    lastName: string | null
    role: string | null
    isActive: boolean | null
    lastLogin: Date | null
    syncedAt: Date | null
  }

  export type StaffMaxAggregateOutputType = {
    id: string | null
    cin: string | null
    phoneNumber: string | null
    firstName: string | null
    lastName: string | null
    role: string | null
    isActive: boolean | null
    lastLogin: Date | null
    syncedAt: Date | null
  }

  export type StaffCountAggregateOutputType = {
    id: number
    cin: number
    phoneNumber: number
    firstName: number
    lastName: number
    role: number
    isActive: number
    lastLogin: number
    syncedAt: number
    _all: number
  }


  export type StaffMinAggregateInputType = {
    id?: true
    cin?: true
    phoneNumber?: true
    firstName?: true
    lastName?: true
    role?: true
    isActive?: true
    lastLogin?: true
    syncedAt?: true
  }

  export type StaffMaxAggregateInputType = {
    id?: true
    cin?: true
    phoneNumber?: true
    firstName?: true
    lastName?: true
    role?: true
    isActive?: true
    lastLogin?: true
    syncedAt?: true
  }

  export type StaffCountAggregateInputType = {
    id?: true
    cin?: true
    phoneNumber?: true
    firstName?: true
    lastName?: true
    role?: true
    isActive?: true
    lastLogin?: true
    syncedAt?: true
    _all?: true
  }

  export type StaffAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Staff to aggregate.
     */
    where?: StaffWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Staff to fetch.
     */
    orderBy?: StaffOrderByWithRelationInput | StaffOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StaffWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Staff from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Staff.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Staff
    **/
    _count?: true | StaffCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StaffMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StaffMaxAggregateInputType
  }

  export type GetStaffAggregateType<T extends StaffAggregateArgs> = {
        [P in keyof T & keyof AggregateStaff]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStaff[P]>
      : GetScalarType<T[P], AggregateStaff[P]>
  }




  export type StaffGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StaffWhereInput
    orderBy?: StaffOrderByWithAggregationInput | StaffOrderByWithAggregationInput[]
    by: StaffScalarFieldEnum[] | StaffScalarFieldEnum
    having?: StaffScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StaffCountAggregateInputType | true
    _min?: StaffMinAggregateInputType
    _max?: StaffMaxAggregateInputType
  }

  export type StaffGroupByOutputType = {
    id: string
    cin: string
    phoneNumber: string
    firstName: string
    lastName: string
    role: string
    isActive: boolean
    lastLogin: Date | null
    syncedAt: Date
    _count: StaffCountAggregateOutputType | null
    _min: StaffMinAggregateOutputType | null
    _max: StaffMaxAggregateOutputType | null
  }

  type GetStaffGroupByPayload<T extends StaffGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StaffGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StaffGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StaffGroupByOutputType[P]>
            : GetScalarType<T[P], StaffGroupByOutputType[P]>
        }
      >
    >


  export type StaffSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cin?: boolean
    phoneNumber?: boolean
    firstName?: boolean
    lastName?: boolean
    role?: boolean
    isActive?: boolean
    lastLogin?: boolean
    syncedAt?: boolean
    bookings?: boolean | Staff$bookingsArgs<ExtArgs>
    verifications?: boolean | Staff$verificationsArgs<ExtArgs>
    sessions?: boolean | Staff$sessionsArgs<ExtArgs>
    _count?: boolean | StaffCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["staff"]>

  export type StaffSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cin?: boolean
    phoneNumber?: boolean
    firstName?: boolean
    lastName?: boolean
    role?: boolean
    isActive?: boolean
    lastLogin?: boolean
    syncedAt?: boolean
  }, ExtArgs["result"]["staff"]>

  export type StaffSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cin?: boolean
    phoneNumber?: boolean
    firstName?: boolean
    lastName?: boolean
    role?: boolean
    isActive?: boolean
    lastLogin?: boolean
    syncedAt?: boolean
  }, ExtArgs["result"]["staff"]>

  export type StaffSelectScalar = {
    id?: boolean
    cin?: boolean
    phoneNumber?: boolean
    firstName?: boolean
    lastName?: boolean
    role?: boolean
    isActive?: boolean
    lastLogin?: boolean
    syncedAt?: boolean
  }

  export type StaffOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "cin" | "phoneNumber" | "firstName" | "lastName" | "role" | "isActive" | "lastLogin" | "syncedAt", ExtArgs["result"]["staff"]>
  export type StaffInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bookings?: boolean | Staff$bookingsArgs<ExtArgs>
    verifications?: boolean | Staff$verificationsArgs<ExtArgs>
    sessions?: boolean | Staff$sessionsArgs<ExtArgs>
    _count?: boolean | StaffCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type StaffIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type StaffIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $StaffPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Staff"
    objects: {
      bookings: Prisma.$BookingPayload<ExtArgs>[]
      verifications: Prisma.$BookingPayload<ExtArgs>[]
      sessions: Prisma.$SessionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      cin: string
      phoneNumber: string
      firstName: string
      lastName: string
      role: string
      isActive: boolean
      lastLogin: Date | null
      syncedAt: Date
    }, ExtArgs["result"]["staff"]>
    composites: {}
  }

  type StaffGetPayload<S extends boolean | null | undefined | StaffDefaultArgs> = $Result.GetResult<Prisma.$StaffPayload, S>

  type StaffCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StaffFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StaffCountAggregateInputType | true
    }

  export interface StaffDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Staff'], meta: { name: 'Staff' } }
    /**
     * Find zero or one Staff that matches the filter.
     * @param {StaffFindUniqueArgs} args - Arguments to find a Staff
     * @example
     * // Get one Staff
     * const staff = await prisma.staff.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StaffFindUniqueArgs>(args: SelectSubset<T, StaffFindUniqueArgs<ExtArgs>>): Prisma__StaffClient<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Staff that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StaffFindUniqueOrThrowArgs} args - Arguments to find a Staff
     * @example
     * // Get one Staff
     * const staff = await prisma.staff.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StaffFindUniqueOrThrowArgs>(args: SelectSubset<T, StaffFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StaffClient<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Staff that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffFindFirstArgs} args - Arguments to find a Staff
     * @example
     * // Get one Staff
     * const staff = await prisma.staff.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StaffFindFirstArgs>(args?: SelectSubset<T, StaffFindFirstArgs<ExtArgs>>): Prisma__StaffClient<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Staff that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffFindFirstOrThrowArgs} args - Arguments to find a Staff
     * @example
     * // Get one Staff
     * const staff = await prisma.staff.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StaffFindFirstOrThrowArgs>(args?: SelectSubset<T, StaffFindFirstOrThrowArgs<ExtArgs>>): Prisma__StaffClient<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Staff that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Staff
     * const staff = await prisma.staff.findMany()
     * 
     * // Get first 10 Staff
     * const staff = await prisma.staff.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const staffWithIdOnly = await prisma.staff.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StaffFindManyArgs>(args?: SelectSubset<T, StaffFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Staff.
     * @param {StaffCreateArgs} args - Arguments to create a Staff.
     * @example
     * // Create one Staff
     * const Staff = await prisma.staff.create({
     *   data: {
     *     // ... data to create a Staff
     *   }
     * })
     * 
     */
    create<T extends StaffCreateArgs>(args: SelectSubset<T, StaffCreateArgs<ExtArgs>>): Prisma__StaffClient<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Staff.
     * @param {StaffCreateManyArgs} args - Arguments to create many Staff.
     * @example
     * // Create many Staff
     * const staff = await prisma.staff.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StaffCreateManyArgs>(args?: SelectSubset<T, StaffCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Staff and returns the data saved in the database.
     * @param {StaffCreateManyAndReturnArgs} args - Arguments to create many Staff.
     * @example
     * // Create many Staff
     * const staff = await prisma.staff.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Staff and only return the `id`
     * const staffWithIdOnly = await prisma.staff.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StaffCreateManyAndReturnArgs>(args?: SelectSubset<T, StaffCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Staff.
     * @param {StaffDeleteArgs} args - Arguments to delete one Staff.
     * @example
     * // Delete one Staff
     * const Staff = await prisma.staff.delete({
     *   where: {
     *     // ... filter to delete one Staff
     *   }
     * })
     * 
     */
    delete<T extends StaffDeleteArgs>(args: SelectSubset<T, StaffDeleteArgs<ExtArgs>>): Prisma__StaffClient<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Staff.
     * @param {StaffUpdateArgs} args - Arguments to update one Staff.
     * @example
     * // Update one Staff
     * const staff = await prisma.staff.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StaffUpdateArgs>(args: SelectSubset<T, StaffUpdateArgs<ExtArgs>>): Prisma__StaffClient<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Staff.
     * @param {StaffDeleteManyArgs} args - Arguments to filter Staff to delete.
     * @example
     * // Delete a few Staff
     * const { count } = await prisma.staff.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StaffDeleteManyArgs>(args?: SelectSubset<T, StaffDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Staff.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Staff
     * const staff = await prisma.staff.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StaffUpdateManyArgs>(args: SelectSubset<T, StaffUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Staff and returns the data updated in the database.
     * @param {StaffUpdateManyAndReturnArgs} args - Arguments to update many Staff.
     * @example
     * // Update many Staff
     * const staff = await prisma.staff.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Staff and only return the `id`
     * const staffWithIdOnly = await prisma.staff.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends StaffUpdateManyAndReturnArgs>(args: SelectSubset<T, StaffUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Staff.
     * @param {StaffUpsertArgs} args - Arguments to update or create a Staff.
     * @example
     * // Update or create a Staff
     * const staff = await prisma.staff.upsert({
     *   create: {
     *     // ... data to create a Staff
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Staff we want to update
     *   }
     * })
     */
    upsert<T extends StaffUpsertArgs>(args: SelectSubset<T, StaffUpsertArgs<ExtArgs>>): Prisma__StaffClient<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Staff.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffCountArgs} args - Arguments to filter Staff to count.
     * @example
     * // Count the number of Staff
     * const count = await prisma.staff.count({
     *   where: {
     *     // ... the filter for the Staff we want to count
     *   }
     * })
    **/
    count<T extends StaffCountArgs>(
      args?: Subset<T, StaffCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StaffCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Staff.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StaffAggregateArgs>(args: Subset<T, StaffAggregateArgs>): Prisma.PrismaPromise<GetStaffAggregateType<T>>

    /**
     * Group by Staff.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StaffGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StaffGroupByArgs['orderBy'] }
        : { orderBy?: StaffGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StaffGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStaffGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Staff model
   */
  readonly fields: StaffFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Staff.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StaffClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    bookings<T extends Staff$bookingsArgs<ExtArgs> = {}>(args?: Subset<T, Staff$bookingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    verifications<T extends Staff$verificationsArgs<ExtArgs> = {}>(args?: Subset<T, Staff$verificationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sessions<T extends Staff$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, Staff$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Staff model
   */
  interface StaffFieldRefs {
    readonly id: FieldRef<"Staff", 'String'>
    readonly cin: FieldRef<"Staff", 'String'>
    readonly phoneNumber: FieldRef<"Staff", 'String'>
    readonly firstName: FieldRef<"Staff", 'String'>
    readonly lastName: FieldRef<"Staff", 'String'>
    readonly role: FieldRef<"Staff", 'String'>
    readonly isActive: FieldRef<"Staff", 'Boolean'>
    readonly lastLogin: FieldRef<"Staff", 'DateTime'>
    readonly syncedAt: FieldRef<"Staff", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Staff findUnique
   */
  export type StaffFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Staff
     */
    omit?: StaffOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffInclude<ExtArgs> | null
    /**
     * Filter, which Staff to fetch.
     */
    where: StaffWhereUniqueInput
  }

  /**
   * Staff findUniqueOrThrow
   */
  export type StaffFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Staff
     */
    omit?: StaffOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffInclude<ExtArgs> | null
    /**
     * Filter, which Staff to fetch.
     */
    where: StaffWhereUniqueInput
  }

  /**
   * Staff findFirst
   */
  export type StaffFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Staff
     */
    omit?: StaffOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffInclude<ExtArgs> | null
    /**
     * Filter, which Staff to fetch.
     */
    where?: StaffWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Staff to fetch.
     */
    orderBy?: StaffOrderByWithRelationInput | StaffOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Staff.
     */
    cursor?: StaffWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Staff from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Staff.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Staff.
     */
    distinct?: StaffScalarFieldEnum | StaffScalarFieldEnum[]
  }

  /**
   * Staff findFirstOrThrow
   */
  export type StaffFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Staff
     */
    omit?: StaffOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffInclude<ExtArgs> | null
    /**
     * Filter, which Staff to fetch.
     */
    where?: StaffWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Staff to fetch.
     */
    orderBy?: StaffOrderByWithRelationInput | StaffOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Staff.
     */
    cursor?: StaffWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Staff from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Staff.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Staff.
     */
    distinct?: StaffScalarFieldEnum | StaffScalarFieldEnum[]
  }

  /**
   * Staff findMany
   */
  export type StaffFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Staff
     */
    omit?: StaffOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffInclude<ExtArgs> | null
    /**
     * Filter, which Staff to fetch.
     */
    where?: StaffWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Staff to fetch.
     */
    orderBy?: StaffOrderByWithRelationInput | StaffOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Staff.
     */
    cursor?: StaffWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Staff from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Staff.
     */
    skip?: number
    distinct?: StaffScalarFieldEnum | StaffScalarFieldEnum[]
  }

  /**
   * Staff create
   */
  export type StaffCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Staff
     */
    omit?: StaffOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffInclude<ExtArgs> | null
    /**
     * The data needed to create a Staff.
     */
    data: XOR<StaffCreateInput, StaffUncheckedCreateInput>
  }

  /**
   * Staff createMany
   */
  export type StaffCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Staff.
     */
    data: StaffCreateManyInput | StaffCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Staff createManyAndReturn
   */
  export type StaffCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Staff
     */
    omit?: StaffOmit<ExtArgs> | null
    /**
     * The data used to create many Staff.
     */
    data: StaffCreateManyInput | StaffCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Staff update
   */
  export type StaffUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Staff
     */
    omit?: StaffOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffInclude<ExtArgs> | null
    /**
     * The data needed to update a Staff.
     */
    data: XOR<StaffUpdateInput, StaffUncheckedUpdateInput>
    /**
     * Choose, which Staff to update.
     */
    where: StaffWhereUniqueInput
  }

  /**
   * Staff updateMany
   */
  export type StaffUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Staff.
     */
    data: XOR<StaffUpdateManyMutationInput, StaffUncheckedUpdateManyInput>
    /**
     * Filter which Staff to update
     */
    where?: StaffWhereInput
    /**
     * Limit how many Staff to update.
     */
    limit?: number
  }

  /**
   * Staff updateManyAndReturn
   */
  export type StaffUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Staff
     */
    omit?: StaffOmit<ExtArgs> | null
    /**
     * The data used to update Staff.
     */
    data: XOR<StaffUpdateManyMutationInput, StaffUncheckedUpdateManyInput>
    /**
     * Filter which Staff to update
     */
    where?: StaffWhereInput
    /**
     * Limit how many Staff to update.
     */
    limit?: number
  }

  /**
   * Staff upsert
   */
  export type StaffUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Staff
     */
    omit?: StaffOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffInclude<ExtArgs> | null
    /**
     * The filter to search for the Staff to update in case it exists.
     */
    where: StaffWhereUniqueInput
    /**
     * In case the Staff found by the `where` argument doesn't exist, create a new Staff with this data.
     */
    create: XOR<StaffCreateInput, StaffUncheckedCreateInput>
    /**
     * In case the Staff was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StaffUpdateInput, StaffUncheckedUpdateInput>
  }

  /**
   * Staff delete
   */
  export type StaffDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Staff
     */
    omit?: StaffOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffInclude<ExtArgs> | null
    /**
     * Filter which Staff to delete.
     */
    where: StaffWhereUniqueInput
  }

  /**
   * Staff deleteMany
   */
  export type StaffDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Staff to delete
     */
    where?: StaffWhereInput
    /**
     * Limit how many Staff to delete.
     */
    limit?: number
  }

  /**
   * Staff.bookings
   */
  export type Staff$bookingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    where?: BookingWhereInput
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    cursor?: BookingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BookingScalarFieldEnum | BookingScalarFieldEnum[]
  }

  /**
   * Staff.verifications
   */
  export type Staff$verificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    where?: BookingWhereInput
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    cursor?: BookingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BookingScalarFieldEnum | BookingScalarFieldEnum[]
  }

  /**
   * Staff.sessions
   */
  export type Staff$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Staff without action
   */
  export type StaffDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Staff
     */
    omit?: StaffOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffInclude<ExtArgs> | null
  }


  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionMinAggregateOutputType = {
    id: string | null
    staffId: string | null
    token: string | null
    staffData: string | null
    isActive: boolean | null
    lastActivity: Date | null
    expiresAt: Date | null
    createdOffline: boolean | null
    lastOfflineAt: Date | null
    createdAt: Date | null
  }

  export type SessionMaxAggregateOutputType = {
    id: string | null
    staffId: string | null
    token: string | null
    staffData: string | null
    isActive: boolean | null
    lastActivity: Date | null
    expiresAt: Date | null
    createdOffline: boolean | null
    lastOfflineAt: Date | null
    createdAt: Date | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    staffId: number
    token: number
    staffData: number
    isActive: number
    lastActivity: number
    expiresAt: number
    createdOffline: number
    lastOfflineAt: number
    createdAt: number
    _all: number
  }


  export type SessionMinAggregateInputType = {
    id?: true
    staffId?: true
    token?: true
    staffData?: true
    isActive?: true
    lastActivity?: true
    expiresAt?: true
    createdOffline?: true
    lastOfflineAt?: true
    createdAt?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    staffId?: true
    token?: true
    staffData?: true
    isActive?: true
    lastActivity?: true
    expiresAt?: true
    createdOffline?: true
    lastOfflineAt?: true
    createdAt?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    staffId?: true
    token?: true
    staffData?: true
    isActive?: true
    lastActivity?: true
    expiresAt?: true
    createdOffline?: true
    lastOfflineAt?: true
    createdAt?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    id: string
    staffId: string
    token: string
    staffData: string
    isActive: boolean
    lastActivity: Date
    expiresAt: Date
    createdOffline: boolean
    lastOfflineAt: Date | null
    createdAt: Date
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    staffId?: boolean
    token?: boolean
    staffData?: boolean
    isActive?: boolean
    lastActivity?: boolean
    expiresAt?: boolean
    createdOffline?: boolean
    lastOfflineAt?: boolean
    createdAt?: boolean
    staff?: boolean | StaffDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    staffId?: boolean
    token?: boolean
    staffData?: boolean
    isActive?: boolean
    lastActivity?: boolean
    expiresAt?: boolean
    createdOffline?: boolean
    lastOfflineAt?: boolean
    createdAt?: boolean
    staff?: boolean | StaffDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    staffId?: boolean
    token?: boolean
    staffData?: boolean
    isActive?: boolean
    lastActivity?: boolean
    expiresAt?: boolean
    createdOffline?: boolean
    lastOfflineAt?: boolean
    createdAt?: boolean
    staff?: boolean | StaffDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectScalar = {
    id?: boolean
    staffId?: boolean
    token?: boolean
    staffData?: boolean
    isActive?: boolean
    lastActivity?: boolean
    expiresAt?: boolean
    createdOffline?: boolean
    lastOfflineAt?: boolean
    createdAt?: boolean
  }

  export type SessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "staffId" | "token" | "staffData" | "isActive" | "lastActivity" | "expiresAt" | "createdOffline" | "lastOfflineAt" | "createdAt", ExtArgs["result"]["session"]>
  export type SessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    staff?: boolean | StaffDefaultArgs<ExtArgs>
  }
  export type SessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    staff?: boolean | StaffDefaultArgs<ExtArgs>
  }
  export type SessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    staff?: boolean | StaffDefaultArgs<ExtArgs>
  }

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Session"
    objects: {
      staff: Prisma.$StaffPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      staffId: string
      token: string
      staffData: string
      isActive: boolean
      lastActivity: Date
      expiresAt: Date
      createdOffline: boolean
      lastOfflineAt: Date | null
      createdAt: Date
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions and returns the data updated in the database.
     * @param {SessionUpdateManyAndReturnArgs} args - Arguments to update many Sessions.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SessionUpdateManyAndReturnArgs>(args: SelectSubset<T, SessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    staff<T extends StaffDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StaffDefaultArgs<ExtArgs>>): Prisma__StaffClient<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Session model
   */
  interface SessionFieldRefs {
    readonly id: FieldRef<"Session", 'String'>
    readonly staffId: FieldRef<"Session", 'String'>
    readonly token: FieldRef<"Session", 'String'>
    readonly staffData: FieldRef<"Session", 'String'>
    readonly isActive: FieldRef<"Session", 'Boolean'>
    readonly lastActivity: FieldRef<"Session", 'DateTime'>
    readonly expiresAt: FieldRef<"Session", 'DateTime'>
    readonly createdOffline: FieldRef<"Session", 'Boolean'>
    readonly lastOfflineAt: FieldRef<"Session", 'DateTime'>
    readonly createdAt: FieldRef<"Session", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Session createManyAndReturn
   */
  export type SessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
  }

  /**
   * Session updateManyAndReturn
   */
  export type SessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }

  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to delete.
     */
    limit?: number
  }

  /**
   * Session without action
   */
  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
  }


  /**
   * Model Driver
   */

  export type AggregateDriver = {
    _count: DriverCountAggregateOutputType | null
    _min: DriverMinAggregateOutputType | null
    _max: DriverMaxAggregateOutputType | null
  }

  export type DriverMinAggregateOutputType = {
    id: string | null
    cin: string | null
    phoneNumber: string | null
    firstName: string | null
    lastName: string | null
    originGovernorateId: string | null
    originDelegationId: string | null
    originAddress: string | null
    vehicleId: string | null
    accountStatus: string | null
    isActive: boolean | null
    syncedAt: Date | null
  }

  export type DriverMaxAggregateOutputType = {
    id: string | null
    cin: string | null
    phoneNumber: string | null
    firstName: string | null
    lastName: string | null
    originGovernorateId: string | null
    originDelegationId: string | null
    originAddress: string | null
    vehicleId: string | null
    accountStatus: string | null
    isActive: boolean | null
    syncedAt: Date | null
  }

  export type DriverCountAggregateOutputType = {
    id: number
    cin: number
    phoneNumber: number
    firstName: number
    lastName: number
    originGovernorateId: number
    originDelegationId: number
    originAddress: number
    vehicleId: number
    accountStatus: number
    isActive: number
    syncedAt: number
    _all: number
  }


  export type DriverMinAggregateInputType = {
    id?: true
    cin?: true
    phoneNumber?: true
    firstName?: true
    lastName?: true
    originGovernorateId?: true
    originDelegationId?: true
    originAddress?: true
    vehicleId?: true
    accountStatus?: true
    isActive?: true
    syncedAt?: true
  }

  export type DriverMaxAggregateInputType = {
    id?: true
    cin?: true
    phoneNumber?: true
    firstName?: true
    lastName?: true
    originGovernorateId?: true
    originDelegationId?: true
    originAddress?: true
    vehicleId?: true
    accountStatus?: true
    isActive?: true
    syncedAt?: true
  }

  export type DriverCountAggregateInputType = {
    id?: true
    cin?: true
    phoneNumber?: true
    firstName?: true
    lastName?: true
    originGovernorateId?: true
    originDelegationId?: true
    originAddress?: true
    vehicleId?: true
    accountStatus?: true
    isActive?: true
    syncedAt?: true
    _all?: true
  }

  export type DriverAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Driver to aggregate.
     */
    where?: DriverWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Drivers to fetch.
     */
    orderBy?: DriverOrderByWithRelationInput | DriverOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DriverWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Drivers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Drivers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Drivers
    **/
    _count?: true | DriverCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DriverMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DriverMaxAggregateInputType
  }

  export type GetDriverAggregateType<T extends DriverAggregateArgs> = {
        [P in keyof T & keyof AggregateDriver]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDriver[P]>
      : GetScalarType<T[P], AggregateDriver[P]>
  }




  export type DriverGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DriverWhereInput
    orderBy?: DriverOrderByWithAggregationInput | DriverOrderByWithAggregationInput[]
    by: DriverScalarFieldEnum[] | DriverScalarFieldEnum
    having?: DriverScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DriverCountAggregateInputType | true
    _min?: DriverMinAggregateInputType
    _max?: DriverMaxAggregateInputType
  }

  export type DriverGroupByOutputType = {
    id: string
    cin: string
    phoneNumber: string
    firstName: string
    lastName: string
    originGovernorateId: string | null
    originDelegationId: string | null
    originAddress: string | null
    vehicleId: string | null
    accountStatus: string
    isActive: boolean
    syncedAt: Date
    _count: DriverCountAggregateOutputType | null
    _min: DriverMinAggregateOutputType | null
    _max: DriverMaxAggregateOutputType | null
  }

  type GetDriverGroupByPayload<T extends DriverGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DriverGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DriverGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DriverGroupByOutputType[P]>
            : GetScalarType<T[P], DriverGroupByOutputType[P]>
        }
      >
    >


  export type DriverSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cin?: boolean
    phoneNumber?: boolean
    firstName?: boolean
    lastName?: boolean
    originGovernorateId?: boolean
    originDelegationId?: boolean
    originAddress?: boolean
    vehicleId?: boolean
    accountStatus?: boolean
    isActive?: boolean
    syncedAt?: boolean
    vehicle?: boolean | Driver$vehicleArgs<ExtArgs>
  }, ExtArgs["result"]["driver"]>

  export type DriverSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cin?: boolean
    phoneNumber?: boolean
    firstName?: boolean
    lastName?: boolean
    originGovernorateId?: boolean
    originDelegationId?: boolean
    originAddress?: boolean
    vehicleId?: boolean
    accountStatus?: boolean
    isActive?: boolean
    syncedAt?: boolean
    vehicle?: boolean | Driver$vehicleArgs<ExtArgs>
  }, ExtArgs["result"]["driver"]>

  export type DriverSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cin?: boolean
    phoneNumber?: boolean
    firstName?: boolean
    lastName?: boolean
    originGovernorateId?: boolean
    originDelegationId?: boolean
    originAddress?: boolean
    vehicleId?: boolean
    accountStatus?: boolean
    isActive?: boolean
    syncedAt?: boolean
    vehicle?: boolean | Driver$vehicleArgs<ExtArgs>
  }, ExtArgs["result"]["driver"]>

  export type DriverSelectScalar = {
    id?: boolean
    cin?: boolean
    phoneNumber?: boolean
    firstName?: boolean
    lastName?: boolean
    originGovernorateId?: boolean
    originDelegationId?: boolean
    originAddress?: boolean
    vehicleId?: boolean
    accountStatus?: boolean
    isActive?: boolean
    syncedAt?: boolean
  }

  export type DriverOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "cin" | "phoneNumber" | "firstName" | "lastName" | "originGovernorateId" | "originDelegationId" | "originAddress" | "vehicleId" | "accountStatus" | "isActive" | "syncedAt", ExtArgs["result"]["driver"]>
  export type DriverInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vehicle?: boolean | Driver$vehicleArgs<ExtArgs>
  }
  export type DriverIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vehicle?: boolean | Driver$vehicleArgs<ExtArgs>
  }
  export type DriverIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vehicle?: boolean | Driver$vehicleArgs<ExtArgs>
  }

  export type $DriverPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Driver"
    objects: {
      vehicle: Prisma.$VehiclePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      cin: string
      phoneNumber: string
      firstName: string
      lastName: string
      originGovernorateId: string | null
      originDelegationId: string | null
      originAddress: string | null
      vehicleId: string | null
      accountStatus: string
      isActive: boolean
      syncedAt: Date
    }, ExtArgs["result"]["driver"]>
    composites: {}
  }

  type DriverGetPayload<S extends boolean | null | undefined | DriverDefaultArgs> = $Result.GetResult<Prisma.$DriverPayload, S>

  type DriverCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DriverFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DriverCountAggregateInputType | true
    }

  export interface DriverDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Driver'], meta: { name: 'Driver' } }
    /**
     * Find zero or one Driver that matches the filter.
     * @param {DriverFindUniqueArgs} args - Arguments to find a Driver
     * @example
     * // Get one Driver
     * const driver = await prisma.driver.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DriverFindUniqueArgs>(args: SelectSubset<T, DriverFindUniqueArgs<ExtArgs>>): Prisma__DriverClient<$Result.GetResult<Prisma.$DriverPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Driver that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DriverFindUniqueOrThrowArgs} args - Arguments to find a Driver
     * @example
     * // Get one Driver
     * const driver = await prisma.driver.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DriverFindUniqueOrThrowArgs>(args: SelectSubset<T, DriverFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DriverClient<$Result.GetResult<Prisma.$DriverPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Driver that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriverFindFirstArgs} args - Arguments to find a Driver
     * @example
     * // Get one Driver
     * const driver = await prisma.driver.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DriverFindFirstArgs>(args?: SelectSubset<T, DriverFindFirstArgs<ExtArgs>>): Prisma__DriverClient<$Result.GetResult<Prisma.$DriverPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Driver that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriverFindFirstOrThrowArgs} args - Arguments to find a Driver
     * @example
     * // Get one Driver
     * const driver = await prisma.driver.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DriverFindFirstOrThrowArgs>(args?: SelectSubset<T, DriverFindFirstOrThrowArgs<ExtArgs>>): Prisma__DriverClient<$Result.GetResult<Prisma.$DriverPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Drivers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriverFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Drivers
     * const drivers = await prisma.driver.findMany()
     * 
     * // Get first 10 Drivers
     * const drivers = await prisma.driver.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const driverWithIdOnly = await prisma.driver.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DriverFindManyArgs>(args?: SelectSubset<T, DriverFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DriverPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Driver.
     * @param {DriverCreateArgs} args - Arguments to create a Driver.
     * @example
     * // Create one Driver
     * const Driver = await prisma.driver.create({
     *   data: {
     *     // ... data to create a Driver
     *   }
     * })
     * 
     */
    create<T extends DriverCreateArgs>(args: SelectSubset<T, DriverCreateArgs<ExtArgs>>): Prisma__DriverClient<$Result.GetResult<Prisma.$DriverPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Drivers.
     * @param {DriverCreateManyArgs} args - Arguments to create many Drivers.
     * @example
     * // Create many Drivers
     * const driver = await prisma.driver.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DriverCreateManyArgs>(args?: SelectSubset<T, DriverCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Drivers and returns the data saved in the database.
     * @param {DriverCreateManyAndReturnArgs} args - Arguments to create many Drivers.
     * @example
     * // Create many Drivers
     * const driver = await prisma.driver.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Drivers and only return the `id`
     * const driverWithIdOnly = await prisma.driver.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DriverCreateManyAndReturnArgs>(args?: SelectSubset<T, DriverCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DriverPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Driver.
     * @param {DriverDeleteArgs} args - Arguments to delete one Driver.
     * @example
     * // Delete one Driver
     * const Driver = await prisma.driver.delete({
     *   where: {
     *     // ... filter to delete one Driver
     *   }
     * })
     * 
     */
    delete<T extends DriverDeleteArgs>(args: SelectSubset<T, DriverDeleteArgs<ExtArgs>>): Prisma__DriverClient<$Result.GetResult<Prisma.$DriverPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Driver.
     * @param {DriverUpdateArgs} args - Arguments to update one Driver.
     * @example
     * // Update one Driver
     * const driver = await prisma.driver.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DriverUpdateArgs>(args: SelectSubset<T, DriverUpdateArgs<ExtArgs>>): Prisma__DriverClient<$Result.GetResult<Prisma.$DriverPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Drivers.
     * @param {DriverDeleteManyArgs} args - Arguments to filter Drivers to delete.
     * @example
     * // Delete a few Drivers
     * const { count } = await prisma.driver.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DriverDeleteManyArgs>(args?: SelectSubset<T, DriverDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Drivers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriverUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Drivers
     * const driver = await prisma.driver.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DriverUpdateManyArgs>(args: SelectSubset<T, DriverUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Drivers and returns the data updated in the database.
     * @param {DriverUpdateManyAndReturnArgs} args - Arguments to update many Drivers.
     * @example
     * // Update many Drivers
     * const driver = await prisma.driver.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Drivers and only return the `id`
     * const driverWithIdOnly = await prisma.driver.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DriverUpdateManyAndReturnArgs>(args: SelectSubset<T, DriverUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DriverPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Driver.
     * @param {DriverUpsertArgs} args - Arguments to update or create a Driver.
     * @example
     * // Update or create a Driver
     * const driver = await prisma.driver.upsert({
     *   create: {
     *     // ... data to create a Driver
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Driver we want to update
     *   }
     * })
     */
    upsert<T extends DriverUpsertArgs>(args: SelectSubset<T, DriverUpsertArgs<ExtArgs>>): Prisma__DriverClient<$Result.GetResult<Prisma.$DriverPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Drivers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriverCountArgs} args - Arguments to filter Drivers to count.
     * @example
     * // Count the number of Drivers
     * const count = await prisma.driver.count({
     *   where: {
     *     // ... the filter for the Drivers we want to count
     *   }
     * })
    **/
    count<T extends DriverCountArgs>(
      args?: Subset<T, DriverCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DriverCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Driver.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriverAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DriverAggregateArgs>(args: Subset<T, DriverAggregateArgs>): Prisma.PrismaPromise<GetDriverAggregateType<T>>

    /**
     * Group by Driver.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriverGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DriverGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DriverGroupByArgs['orderBy'] }
        : { orderBy?: DriverGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DriverGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDriverGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Driver model
   */
  readonly fields: DriverFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Driver.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DriverClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    vehicle<T extends Driver$vehicleArgs<ExtArgs> = {}>(args?: Subset<T, Driver$vehicleArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Driver model
   */
  interface DriverFieldRefs {
    readonly id: FieldRef<"Driver", 'String'>
    readonly cin: FieldRef<"Driver", 'String'>
    readonly phoneNumber: FieldRef<"Driver", 'String'>
    readonly firstName: FieldRef<"Driver", 'String'>
    readonly lastName: FieldRef<"Driver", 'String'>
    readonly originGovernorateId: FieldRef<"Driver", 'String'>
    readonly originDelegationId: FieldRef<"Driver", 'String'>
    readonly originAddress: FieldRef<"Driver", 'String'>
    readonly vehicleId: FieldRef<"Driver", 'String'>
    readonly accountStatus: FieldRef<"Driver", 'String'>
    readonly isActive: FieldRef<"Driver", 'Boolean'>
    readonly syncedAt: FieldRef<"Driver", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Driver findUnique
   */
  export type DriverFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Driver
     */
    select?: DriverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Driver
     */
    omit?: DriverOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverInclude<ExtArgs> | null
    /**
     * Filter, which Driver to fetch.
     */
    where: DriverWhereUniqueInput
  }

  /**
   * Driver findUniqueOrThrow
   */
  export type DriverFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Driver
     */
    select?: DriverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Driver
     */
    omit?: DriverOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverInclude<ExtArgs> | null
    /**
     * Filter, which Driver to fetch.
     */
    where: DriverWhereUniqueInput
  }

  /**
   * Driver findFirst
   */
  export type DriverFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Driver
     */
    select?: DriverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Driver
     */
    omit?: DriverOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverInclude<ExtArgs> | null
    /**
     * Filter, which Driver to fetch.
     */
    where?: DriverWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Drivers to fetch.
     */
    orderBy?: DriverOrderByWithRelationInput | DriverOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Drivers.
     */
    cursor?: DriverWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Drivers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Drivers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Drivers.
     */
    distinct?: DriverScalarFieldEnum | DriverScalarFieldEnum[]
  }

  /**
   * Driver findFirstOrThrow
   */
  export type DriverFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Driver
     */
    select?: DriverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Driver
     */
    omit?: DriverOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverInclude<ExtArgs> | null
    /**
     * Filter, which Driver to fetch.
     */
    where?: DriverWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Drivers to fetch.
     */
    orderBy?: DriverOrderByWithRelationInput | DriverOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Drivers.
     */
    cursor?: DriverWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Drivers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Drivers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Drivers.
     */
    distinct?: DriverScalarFieldEnum | DriverScalarFieldEnum[]
  }

  /**
   * Driver findMany
   */
  export type DriverFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Driver
     */
    select?: DriverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Driver
     */
    omit?: DriverOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverInclude<ExtArgs> | null
    /**
     * Filter, which Drivers to fetch.
     */
    where?: DriverWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Drivers to fetch.
     */
    orderBy?: DriverOrderByWithRelationInput | DriverOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Drivers.
     */
    cursor?: DriverWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Drivers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Drivers.
     */
    skip?: number
    distinct?: DriverScalarFieldEnum | DriverScalarFieldEnum[]
  }

  /**
   * Driver create
   */
  export type DriverCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Driver
     */
    select?: DriverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Driver
     */
    omit?: DriverOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverInclude<ExtArgs> | null
    /**
     * The data needed to create a Driver.
     */
    data: XOR<DriverCreateInput, DriverUncheckedCreateInput>
  }

  /**
   * Driver createMany
   */
  export type DriverCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Drivers.
     */
    data: DriverCreateManyInput | DriverCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Driver createManyAndReturn
   */
  export type DriverCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Driver
     */
    select?: DriverSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Driver
     */
    omit?: DriverOmit<ExtArgs> | null
    /**
     * The data used to create many Drivers.
     */
    data: DriverCreateManyInput | DriverCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Driver update
   */
  export type DriverUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Driver
     */
    select?: DriverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Driver
     */
    omit?: DriverOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverInclude<ExtArgs> | null
    /**
     * The data needed to update a Driver.
     */
    data: XOR<DriverUpdateInput, DriverUncheckedUpdateInput>
    /**
     * Choose, which Driver to update.
     */
    where: DriverWhereUniqueInput
  }

  /**
   * Driver updateMany
   */
  export type DriverUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Drivers.
     */
    data: XOR<DriverUpdateManyMutationInput, DriverUncheckedUpdateManyInput>
    /**
     * Filter which Drivers to update
     */
    where?: DriverWhereInput
    /**
     * Limit how many Drivers to update.
     */
    limit?: number
  }

  /**
   * Driver updateManyAndReturn
   */
  export type DriverUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Driver
     */
    select?: DriverSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Driver
     */
    omit?: DriverOmit<ExtArgs> | null
    /**
     * The data used to update Drivers.
     */
    data: XOR<DriverUpdateManyMutationInput, DriverUncheckedUpdateManyInput>
    /**
     * Filter which Drivers to update
     */
    where?: DriverWhereInput
    /**
     * Limit how many Drivers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Driver upsert
   */
  export type DriverUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Driver
     */
    select?: DriverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Driver
     */
    omit?: DriverOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverInclude<ExtArgs> | null
    /**
     * The filter to search for the Driver to update in case it exists.
     */
    where: DriverWhereUniqueInput
    /**
     * In case the Driver found by the `where` argument doesn't exist, create a new Driver with this data.
     */
    create: XOR<DriverCreateInput, DriverUncheckedCreateInput>
    /**
     * In case the Driver was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DriverUpdateInput, DriverUncheckedUpdateInput>
  }

  /**
   * Driver delete
   */
  export type DriverDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Driver
     */
    select?: DriverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Driver
     */
    omit?: DriverOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverInclude<ExtArgs> | null
    /**
     * Filter which Driver to delete.
     */
    where: DriverWhereUniqueInput
  }

  /**
   * Driver deleteMany
   */
  export type DriverDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Drivers to delete
     */
    where?: DriverWhereInput
    /**
     * Limit how many Drivers to delete.
     */
    limit?: number
  }

  /**
   * Driver.vehicle
   */
  export type Driver$vehicleArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    where?: VehicleWhereInput
  }

  /**
   * Driver without action
   */
  export type DriverDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Driver
     */
    select?: DriverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Driver
     */
    omit?: DriverOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverInclude<ExtArgs> | null
  }


  /**
   * Model Vehicle
   */

  export type AggregateVehicle = {
    _count: VehicleCountAggregateOutputType | null
    _avg: VehicleAvgAggregateOutputType | null
    _sum: VehicleSumAggregateOutputType | null
    _min: VehicleMinAggregateOutputType | null
    _max: VehicleMaxAggregateOutputType | null
  }

  export type VehicleAvgAggregateOutputType = {
    capacity: number | null
    year: number | null
  }

  export type VehicleSumAggregateOutputType = {
    capacity: number | null
    year: number | null
  }

  export type VehicleMinAggregateOutputType = {
    id: string | null
    licensePlate: string | null
    capacity: number | null
    model: string | null
    year: number | null
    color: string | null
    isActive: boolean | null
    isAvailable: boolean | null
    syncedAt: Date | null
  }

  export type VehicleMaxAggregateOutputType = {
    id: string | null
    licensePlate: string | null
    capacity: number | null
    model: string | null
    year: number | null
    color: string | null
    isActive: boolean | null
    isAvailable: boolean | null
    syncedAt: Date | null
  }

  export type VehicleCountAggregateOutputType = {
    id: number
    licensePlate: number
    capacity: number
    model: number
    year: number
    color: number
    isActive: number
    isAvailable: number
    syncedAt: number
    _all: number
  }


  export type VehicleAvgAggregateInputType = {
    capacity?: true
    year?: true
  }

  export type VehicleSumAggregateInputType = {
    capacity?: true
    year?: true
  }

  export type VehicleMinAggregateInputType = {
    id?: true
    licensePlate?: true
    capacity?: true
    model?: true
    year?: true
    color?: true
    isActive?: true
    isAvailable?: true
    syncedAt?: true
  }

  export type VehicleMaxAggregateInputType = {
    id?: true
    licensePlate?: true
    capacity?: true
    model?: true
    year?: true
    color?: true
    isActive?: true
    isAvailable?: true
    syncedAt?: true
  }

  export type VehicleCountAggregateInputType = {
    id?: true
    licensePlate?: true
    capacity?: true
    model?: true
    year?: true
    color?: true
    isActive?: true
    isAvailable?: true
    syncedAt?: true
    _all?: true
  }

  export type VehicleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Vehicle to aggregate.
     */
    where?: VehicleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vehicles to fetch.
     */
    orderBy?: VehicleOrderByWithRelationInput | VehicleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VehicleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vehicles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vehicles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Vehicles
    **/
    _count?: true | VehicleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VehicleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VehicleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VehicleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VehicleMaxAggregateInputType
  }

  export type GetVehicleAggregateType<T extends VehicleAggregateArgs> = {
        [P in keyof T & keyof AggregateVehicle]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVehicle[P]>
      : GetScalarType<T[P], AggregateVehicle[P]>
  }




  export type VehicleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VehicleWhereInput
    orderBy?: VehicleOrderByWithAggregationInput | VehicleOrderByWithAggregationInput[]
    by: VehicleScalarFieldEnum[] | VehicleScalarFieldEnum
    having?: VehicleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VehicleCountAggregateInputType | true
    _avg?: VehicleAvgAggregateInputType
    _sum?: VehicleSumAggregateInputType
    _min?: VehicleMinAggregateInputType
    _max?: VehicleMaxAggregateInputType
  }

  export type VehicleGroupByOutputType = {
    id: string
    licensePlate: string
    capacity: number
    model: string | null
    year: number | null
    color: string | null
    isActive: boolean
    isAvailable: boolean
    syncedAt: Date
    _count: VehicleCountAggregateOutputType | null
    _avg: VehicleAvgAggregateOutputType | null
    _sum: VehicleSumAggregateOutputType | null
    _min: VehicleMinAggregateOutputType | null
    _max: VehicleMaxAggregateOutputType | null
  }

  type GetVehicleGroupByPayload<T extends VehicleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VehicleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VehicleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VehicleGroupByOutputType[P]>
            : GetScalarType<T[P], VehicleGroupByOutputType[P]>
        }
      >
    >


  export type VehicleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    licensePlate?: boolean
    capacity?: boolean
    model?: boolean
    year?: boolean
    color?: boolean
    isActive?: boolean
    isAvailable?: boolean
    syncedAt?: boolean
    driver?: boolean | Vehicle$driverArgs<ExtArgs>
    queueEntries?: boolean | Vehicle$queueEntriesArgs<ExtArgs>
    authorizedStations?: boolean | Vehicle$authorizedStationsArgs<ExtArgs>
    _count?: boolean | VehicleCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vehicle"]>

  export type VehicleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    licensePlate?: boolean
    capacity?: boolean
    model?: boolean
    year?: boolean
    color?: boolean
    isActive?: boolean
    isAvailable?: boolean
    syncedAt?: boolean
  }, ExtArgs["result"]["vehicle"]>

  export type VehicleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    licensePlate?: boolean
    capacity?: boolean
    model?: boolean
    year?: boolean
    color?: boolean
    isActive?: boolean
    isAvailable?: boolean
    syncedAt?: boolean
  }, ExtArgs["result"]["vehicle"]>

  export type VehicleSelectScalar = {
    id?: boolean
    licensePlate?: boolean
    capacity?: boolean
    model?: boolean
    year?: boolean
    color?: boolean
    isActive?: boolean
    isAvailable?: boolean
    syncedAt?: boolean
  }

  export type VehicleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "licensePlate" | "capacity" | "model" | "year" | "color" | "isActive" | "isAvailable" | "syncedAt", ExtArgs["result"]["vehicle"]>
  export type VehicleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    driver?: boolean | Vehicle$driverArgs<ExtArgs>
    queueEntries?: boolean | Vehicle$queueEntriesArgs<ExtArgs>
    authorizedStations?: boolean | Vehicle$authorizedStationsArgs<ExtArgs>
    _count?: boolean | VehicleCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type VehicleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type VehicleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $VehiclePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Vehicle"
    objects: {
      driver: Prisma.$DriverPayload<ExtArgs> | null
      queueEntries: Prisma.$VehicleQueuePayload<ExtArgs>[]
      authorizedStations: Prisma.$VehicleAuthorizedStationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      licensePlate: string
      capacity: number
      model: string | null
      year: number | null
      color: string | null
      isActive: boolean
      isAvailable: boolean
      syncedAt: Date
    }, ExtArgs["result"]["vehicle"]>
    composites: {}
  }

  type VehicleGetPayload<S extends boolean | null | undefined | VehicleDefaultArgs> = $Result.GetResult<Prisma.$VehiclePayload, S>

  type VehicleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VehicleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VehicleCountAggregateInputType | true
    }

  export interface VehicleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Vehicle'], meta: { name: 'Vehicle' } }
    /**
     * Find zero or one Vehicle that matches the filter.
     * @param {VehicleFindUniqueArgs} args - Arguments to find a Vehicle
     * @example
     * // Get one Vehicle
     * const vehicle = await prisma.vehicle.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VehicleFindUniqueArgs>(args: SelectSubset<T, VehicleFindUniqueArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Vehicle that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VehicleFindUniqueOrThrowArgs} args - Arguments to find a Vehicle
     * @example
     * // Get one Vehicle
     * const vehicle = await prisma.vehicle.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VehicleFindUniqueOrThrowArgs>(args: SelectSubset<T, VehicleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Vehicle that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleFindFirstArgs} args - Arguments to find a Vehicle
     * @example
     * // Get one Vehicle
     * const vehicle = await prisma.vehicle.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VehicleFindFirstArgs>(args?: SelectSubset<T, VehicleFindFirstArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Vehicle that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleFindFirstOrThrowArgs} args - Arguments to find a Vehicle
     * @example
     * // Get one Vehicle
     * const vehicle = await prisma.vehicle.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VehicleFindFirstOrThrowArgs>(args?: SelectSubset<T, VehicleFindFirstOrThrowArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Vehicles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Vehicles
     * const vehicles = await prisma.vehicle.findMany()
     * 
     * // Get first 10 Vehicles
     * const vehicles = await prisma.vehicle.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const vehicleWithIdOnly = await prisma.vehicle.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VehicleFindManyArgs>(args?: SelectSubset<T, VehicleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Vehicle.
     * @param {VehicleCreateArgs} args - Arguments to create a Vehicle.
     * @example
     * // Create one Vehicle
     * const Vehicle = await prisma.vehicle.create({
     *   data: {
     *     // ... data to create a Vehicle
     *   }
     * })
     * 
     */
    create<T extends VehicleCreateArgs>(args: SelectSubset<T, VehicleCreateArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Vehicles.
     * @param {VehicleCreateManyArgs} args - Arguments to create many Vehicles.
     * @example
     * // Create many Vehicles
     * const vehicle = await prisma.vehicle.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VehicleCreateManyArgs>(args?: SelectSubset<T, VehicleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Vehicles and returns the data saved in the database.
     * @param {VehicleCreateManyAndReturnArgs} args - Arguments to create many Vehicles.
     * @example
     * // Create many Vehicles
     * const vehicle = await prisma.vehicle.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Vehicles and only return the `id`
     * const vehicleWithIdOnly = await prisma.vehicle.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VehicleCreateManyAndReturnArgs>(args?: SelectSubset<T, VehicleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Vehicle.
     * @param {VehicleDeleteArgs} args - Arguments to delete one Vehicle.
     * @example
     * // Delete one Vehicle
     * const Vehicle = await prisma.vehicle.delete({
     *   where: {
     *     // ... filter to delete one Vehicle
     *   }
     * })
     * 
     */
    delete<T extends VehicleDeleteArgs>(args: SelectSubset<T, VehicleDeleteArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Vehicle.
     * @param {VehicleUpdateArgs} args - Arguments to update one Vehicle.
     * @example
     * // Update one Vehicle
     * const vehicle = await prisma.vehicle.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VehicleUpdateArgs>(args: SelectSubset<T, VehicleUpdateArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Vehicles.
     * @param {VehicleDeleteManyArgs} args - Arguments to filter Vehicles to delete.
     * @example
     * // Delete a few Vehicles
     * const { count } = await prisma.vehicle.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VehicleDeleteManyArgs>(args?: SelectSubset<T, VehicleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Vehicles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Vehicles
     * const vehicle = await prisma.vehicle.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VehicleUpdateManyArgs>(args: SelectSubset<T, VehicleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Vehicles and returns the data updated in the database.
     * @param {VehicleUpdateManyAndReturnArgs} args - Arguments to update many Vehicles.
     * @example
     * // Update many Vehicles
     * const vehicle = await prisma.vehicle.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Vehicles and only return the `id`
     * const vehicleWithIdOnly = await prisma.vehicle.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VehicleUpdateManyAndReturnArgs>(args: SelectSubset<T, VehicleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Vehicle.
     * @param {VehicleUpsertArgs} args - Arguments to update or create a Vehicle.
     * @example
     * // Update or create a Vehicle
     * const vehicle = await prisma.vehicle.upsert({
     *   create: {
     *     // ... data to create a Vehicle
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Vehicle we want to update
     *   }
     * })
     */
    upsert<T extends VehicleUpsertArgs>(args: SelectSubset<T, VehicleUpsertArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Vehicles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleCountArgs} args - Arguments to filter Vehicles to count.
     * @example
     * // Count the number of Vehicles
     * const count = await prisma.vehicle.count({
     *   where: {
     *     // ... the filter for the Vehicles we want to count
     *   }
     * })
    **/
    count<T extends VehicleCountArgs>(
      args?: Subset<T, VehicleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VehicleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Vehicle.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VehicleAggregateArgs>(args: Subset<T, VehicleAggregateArgs>): Prisma.PrismaPromise<GetVehicleAggregateType<T>>

    /**
     * Group by Vehicle.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VehicleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VehicleGroupByArgs['orderBy'] }
        : { orderBy?: VehicleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VehicleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVehicleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Vehicle model
   */
  readonly fields: VehicleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Vehicle.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VehicleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    driver<T extends Vehicle$driverArgs<ExtArgs> = {}>(args?: Subset<T, Vehicle$driverArgs<ExtArgs>>): Prisma__DriverClient<$Result.GetResult<Prisma.$DriverPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    queueEntries<T extends Vehicle$queueEntriesArgs<ExtArgs> = {}>(args?: Subset<T, Vehicle$queueEntriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VehicleQueuePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    authorizedStations<T extends Vehicle$authorizedStationsArgs<ExtArgs> = {}>(args?: Subset<T, Vehicle$authorizedStationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VehicleAuthorizedStationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Vehicle model
   */
  interface VehicleFieldRefs {
    readonly id: FieldRef<"Vehicle", 'String'>
    readonly licensePlate: FieldRef<"Vehicle", 'String'>
    readonly capacity: FieldRef<"Vehicle", 'Int'>
    readonly model: FieldRef<"Vehicle", 'String'>
    readonly year: FieldRef<"Vehicle", 'Int'>
    readonly color: FieldRef<"Vehicle", 'String'>
    readonly isActive: FieldRef<"Vehicle", 'Boolean'>
    readonly isAvailable: FieldRef<"Vehicle", 'Boolean'>
    readonly syncedAt: FieldRef<"Vehicle", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Vehicle findUnique
   */
  export type VehicleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * Filter, which Vehicle to fetch.
     */
    where: VehicleWhereUniqueInput
  }

  /**
   * Vehicle findUniqueOrThrow
   */
  export type VehicleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * Filter, which Vehicle to fetch.
     */
    where: VehicleWhereUniqueInput
  }

  /**
   * Vehicle findFirst
   */
  export type VehicleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * Filter, which Vehicle to fetch.
     */
    where?: VehicleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vehicles to fetch.
     */
    orderBy?: VehicleOrderByWithRelationInput | VehicleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Vehicles.
     */
    cursor?: VehicleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vehicles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vehicles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Vehicles.
     */
    distinct?: VehicleScalarFieldEnum | VehicleScalarFieldEnum[]
  }

  /**
   * Vehicle findFirstOrThrow
   */
  export type VehicleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * Filter, which Vehicle to fetch.
     */
    where?: VehicleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vehicles to fetch.
     */
    orderBy?: VehicleOrderByWithRelationInput | VehicleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Vehicles.
     */
    cursor?: VehicleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vehicles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vehicles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Vehicles.
     */
    distinct?: VehicleScalarFieldEnum | VehicleScalarFieldEnum[]
  }

  /**
   * Vehicle findMany
   */
  export type VehicleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * Filter, which Vehicles to fetch.
     */
    where?: VehicleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vehicles to fetch.
     */
    orderBy?: VehicleOrderByWithRelationInput | VehicleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Vehicles.
     */
    cursor?: VehicleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vehicles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vehicles.
     */
    skip?: number
    distinct?: VehicleScalarFieldEnum | VehicleScalarFieldEnum[]
  }

  /**
   * Vehicle create
   */
  export type VehicleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * The data needed to create a Vehicle.
     */
    data: XOR<VehicleCreateInput, VehicleUncheckedCreateInput>
  }

  /**
   * Vehicle createMany
   */
  export type VehicleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Vehicles.
     */
    data: VehicleCreateManyInput | VehicleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Vehicle createManyAndReturn
   */
  export type VehicleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * The data used to create many Vehicles.
     */
    data: VehicleCreateManyInput | VehicleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Vehicle update
   */
  export type VehicleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * The data needed to update a Vehicle.
     */
    data: XOR<VehicleUpdateInput, VehicleUncheckedUpdateInput>
    /**
     * Choose, which Vehicle to update.
     */
    where: VehicleWhereUniqueInput
  }

  /**
   * Vehicle updateMany
   */
  export type VehicleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Vehicles.
     */
    data: XOR<VehicleUpdateManyMutationInput, VehicleUncheckedUpdateManyInput>
    /**
     * Filter which Vehicles to update
     */
    where?: VehicleWhereInput
    /**
     * Limit how many Vehicles to update.
     */
    limit?: number
  }

  /**
   * Vehicle updateManyAndReturn
   */
  export type VehicleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * The data used to update Vehicles.
     */
    data: XOR<VehicleUpdateManyMutationInput, VehicleUncheckedUpdateManyInput>
    /**
     * Filter which Vehicles to update
     */
    where?: VehicleWhereInput
    /**
     * Limit how many Vehicles to update.
     */
    limit?: number
  }

  /**
   * Vehicle upsert
   */
  export type VehicleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * The filter to search for the Vehicle to update in case it exists.
     */
    where: VehicleWhereUniqueInput
    /**
     * In case the Vehicle found by the `where` argument doesn't exist, create a new Vehicle with this data.
     */
    create: XOR<VehicleCreateInput, VehicleUncheckedCreateInput>
    /**
     * In case the Vehicle was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VehicleUpdateInput, VehicleUncheckedUpdateInput>
  }

  /**
   * Vehicle delete
   */
  export type VehicleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * Filter which Vehicle to delete.
     */
    where: VehicleWhereUniqueInput
  }

  /**
   * Vehicle deleteMany
   */
  export type VehicleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Vehicles to delete
     */
    where?: VehicleWhereInput
    /**
     * Limit how many Vehicles to delete.
     */
    limit?: number
  }

  /**
   * Vehicle.driver
   */
  export type Vehicle$driverArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Driver
     */
    select?: DriverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Driver
     */
    omit?: DriverOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DriverInclude<ExtArgs> | null
    where?: DriverWhereInput
  }

  /**
   * Vehicle.queueEntries
   */
  export type Vehicle$queueEntriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleQueue
     */
    select?: VehicleQueueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleQueue
     */
    omit?: VehicleQueueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleQueueInclude<ExtArgs> | null
    where?: VehicleQueueWhereInput
    orderBy?: VehicleQueueOrderByWithRelationInput | VehicleQueueOrderByWithRelationInput[]
    cursor?: VehicleQueueWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VehicleQueueScalarFieldEnum | VehicleQueueScalarFieldEnum[]
  }

  /**
   * Vehicle.authorizedStations
   */
  export type Vehicle$authorizedStationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleAuthorizedStation
     */
    select?: VehicleAuthorizedStationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleAuthorizedStation
     */
    omit?: VehicleAuthorizedStationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleAuthorizedStationInclude<ExtArgs> | null
    where?: VehicleAuthorizedStationWhereInput
    orderBy?: VehicleAuthorizedStationOrderByWithRelationInput | VehicleAuthorizedStationOrderByWithRelationInput[]
    cursor?: VehicleAuthorizedStationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VehicleAuthorizedStationScalarFieldEnum | VehicleAuthorizedStationScalarFieldEnum[]
  }

  /**
   * Vehicle without action
   */
  export type VehicleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
  }


  /**
   * Model VehicleAuthorizedStation
   */

  export type AggregateVehicleAuthorizedStation = {
    _count: VehicleAuthorizedStationCountAggregateOutputType | null
    _min: VehicleAuthorizedStationMinAggregateOutputType | null
    _max: VehicleAuthorizedStationMaxAggregateOutputType | null
  }

  export type VehicleAuthorizedStationMinAggregateOutputType = {
    id: string | null
    vehicleId: string | null
    stationId: string | null
    createdAt: Date | null
    syncedAt: Date | null
  }

  export type VehicleAuthorizedStationMaxAggregateOutputType = {
    id: string | null
    vehicleId: string | null
    stationId: string | null
    createdAt: Date | null
    syncedAt: Date | null
  }

  export type VehicleAuthorizedStationCountAggregateOutputType = {
    id: number
    vehicleId: number
    stationId: number
    createdAt: number
    syncedAt: number
    _all: number
  }


  export type VehicleAuthorizedStationMinAggregateInputType = {
    id?: true
    vehicleId?: true
    stationId?: true
    createdAt?: true
    syncedAt?: true
  }

  export type VehicleAuthorizedStationMaxAggregateInputType = {
    id?: true
    vehicleId?: true
    stationId?: true
    createdAt?: true
    syncedAt?: true
  }

  export type VehicleAuthorizedStationCountAggregateInputType = {
    id?: true
    vehicleId?: true
    stationId?: true
    createdAt?: true
    syncedAt?: true
    _all?: true
  }

  export type VehicleAuthorizedStationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VehicleAuthorizedStation to aggregate.
     */
    where?: VehicleAuthorizedStationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VehicleAuthorizedStations to fetch.
     */
    orderBy?: VehicleAuthorizedStationOrderByWithRelationInput | VehicleAuthorizedStationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VehicleAuthorizedStationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VehicleAuthorizedStations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VehicleAuthorizedStations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VehicleAuthorizedStations
    **/
    _count?: true | VehicleAuthorizedStationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VehicleAuthorizedStationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VehicleAuthorizedStationMaxAggregateInputType
  }

  export type GetVehicleAuthorizedStationAggregateType<T extends VehicleAuthorizedStationAggregateArgs> = {
        [P in keyof T & keyof AggregateVehicleAuthorizedStation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVehicleAuthorizedStation[P]>
      : GetScalarType<T[P], AggregateVehicleAuthorizedStation[P]>
  }




  export type VehicleAuthorizedStationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VehicleAuthorizedStationWhereInput
    orderBy?: VehicleAuthorizedStationOrderByWithAggregationInput | VehicleAuthorizedStationOrderByWithAggregationInput[]
    by: VehicleAuthorizedStationScalarFieldEnum[] | VehicleAuthorizedStationScalarFieldEnum
    having?: VehicleAuthorizedStationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VehicleAuthorizedStationCountAggregateInputType | true
    _min?: VehicleAuthorizedStationMinAggregateInputType
    _max?: VehicleAuthorizedStationMaxAggregateInputType
  }

  export type VehicleAuthorizedStationGroupByOutputType = {
    id: string
    vehicleId: string
    stationId: string
    createdAt: Date
    syncedAt: Date
    _count: VehicleAuthorizedStationCountAggregateOutputType | null
    _min: VehicleAuthorizedStationMinAggregateOutputType | null
    _max: VehicleAuthorizedStationMaxAggregateOutputType | null
  }

  type GetVehicleAuthorizedStationGroupByPayload<T extends VehicleAuthorizedStationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VehicleAuthorizedStationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VehicleAuthorizedStationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VehicleAuthorizedStationGroupByOutputType[P]>
            : GetScalarType<T[P], VehicleAuthorizedStationGroupByOutputType[P]>
        }
      >
    >


  export type VehicleAuthorizedStationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    vehicleId?: boolean
    stationId?: boolean
    createdAt?: boolean
    syncedAt?: boolean
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vehicleAuthorizedStation"]>

  export type VehicleAuthorizedStationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    vehicleId?: boolean
    stationId?: boolean
    createdAt?: boolean
    syncedAt?: boolean
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vehicleAuthorizedStation"]>

  export type VehicleAuthorizedStationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    vehicleId?: boolean
    stationId?: boolean
    createdAt?: boolean
    syncedAt?: boolean
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vehicleAuthorizedStation"]>

  export type VehicleAuthorizedStationSelectScalar = {
    id?: boolean
    vehicleId?: boolean
    stationId?: boolean
    createdAt?: boolean
    syncedAt?: boolean
  }

  export type VehicleAuthorizedStationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "vehicleId" | "stationId" | "createdAt" | "syncedAt", ExtArgs["result"]["vehicleAuthorizedStation"]>
  export type VehicleAuthorizedStationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
  }
  export type VehicleAuthorizedStationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
  }
  export type VehicleAuthorizedStationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
  }

  export type $VehicleAuthorizedStationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VehicleAuthorizedStation"
    objects: {
      vehicle: Prisma.$VehiclePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      vehicleId: string
      stationId: string
      createdAt: Date
      syncedAt: Date
    }, ExtArgs["result"]["vehicleAuthorizedStation"]>
    composites: {}
  }

  type VehicleAuthorizedStationGetPayload<S extends boolean | null | undefined | VehicleAuthorizedStationDefaultArgs> = $Result.GetResult<Prisma.$VehicleAuthorizedStationPayload, S>

  type VehicleAuthorizedStationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VehicleAuthorizedStationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VehicleAuthorizedStationCountAggregateInputType | true
    }

  export interface VehicleAuthorizedStationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VehicleAuthorizedStation'], meta: { name: 'VehicleAuthorizedStation' } }
    /**
     * Find zero or one VehicleAuthorizedStation that matches the filter.
     * @param {VehicleAuthorizedStationFindUniqueArgs} args - Arguments to find a VehicleAuthorizedStation
     * @example
     * // Get one VehicleAuthorizedStation
     * const vehicleAuthorizedStation = await prisma.vehicleAuthorizedStation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VehicleAuthorizedStationFindUniqueArgs>(args: SelectSubset<T, VehicleAuthorizedStationFindUniqueArgs<ExtArgs>>): Prisma__VehicleAuthorizedStationClient<$Result.GetResult<Prisma.$VehicleAuthorizedStationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one VehicleAuthorizedStation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VehicleAuthorizedStationFindUniqueOrThrowArgs} args - Arguments to find a VehicleAuthorizedStation
     * @example
     * // Get one VehicleAuthorizedStation
     * const vehicleAuthorizedStation = await prisma.vehicleAuthorizedStation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VehicleAuthorizedStationFindUniqueOrThrowArgs>(args: SelectSubset<T, VehicleAuthorizedStationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VehicleAuthorizedStationClient<$Result.GetResult<Prisma.$VehicleAuthorizedStationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VehicleAuthorizedStation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleAuthorizedStationFindFirstArgs} args - Arguments to find a VehicleAuthorizedStation
     * @example
     * // Get one VehicleAuthorizedStation
     * const vehicleAuthorizedStation = await prisma.vehicleAuthorizedStation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VehicleAuthorizedStationFindFirstArgs>(args?: SelectSubset<T, VehicleAuthorizedStationFindFirstArgs<ExtArgs>>): Prisma__VehicleAuthorizedStationClient<$Result.GetResult<Prisma.$VehicleAuthorizedStationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VehicleAuthorizedStation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleAuthorizedStationFindFirstOrThrowArgs} args - Arguments to find a VehicleAuthorizedStation
     * @example
     * // Get one VehicleAuthorizedStation
     * const vehicleAuthorizedStation = await prisma.vehicleAuthorizedStation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VehicleAuthorizedStationFindFirstOrThrowArgs>(args?: SelectSubset<T, VehicleAuthorizedStationFindFirstOrThrowArgs<ExtArgs>>): Prisma__VehicleAuthorizedStationClient<$Result.GetResult<Prisma.$VehicleAuthorizedStationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more VehicleAuthorizedStations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleAuthorizedStationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VehicleAuthorizedStations
     * const vehicleAuthorizedStations = await prisma.vehicleAuthorizedStation.findMany()
     * 
     * // Get first 10 VehicleAuthorizedStations
     * const vehicleAuthorizedStations = await prisma.vehicleAuthorizedStation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const vehicleAuthorizedStationWithIdOnly = await prisma.vehicleAuthorizedStation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VehicleAuthorizedStationFindManyArgs>(args?: SelectSubset<T, VehicleAuthorizedStationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VehicleAuthorizedStationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a VehicleAuthorizedStation.
     * @param {VehicleAuthorizedStationCreateArgs} args - Arguments to create a VehicleAuthorizedStation.
     * @example
     * // Create one VehicleAuthorizedStation
     * const VehicleAuthorizedStation = await prisma.vehicleAuthorizedStation.create({
     *   data: {
     *     // ... data to create a VehicleAuthorizedStation
     *   }
     * })
     * 
     */
    create<T extends VehicleAuthorizedStationCreateArgs>(args: SelectSubset<T, VehicleAuthorizedStationCreateArgs<ExtArgs>>): Prisma__VehicleAuthorizedStationClient<$Result.GetResult<Prisma.$VehicleAuthorizedStationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many VehicleAuthorizedStations.
     * @param {VehicleAuthorizedStationCreateManyArgs} args - Arguments to create many VehicleAuthorizedStations.
     * @example
     * // Create many VehicleAuthorizedStations
     * const vehicleAuthorizedStation = await prisma.vehicleAuthorizedStation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VehicleAuthorizedStationCreateManyArgs>(args?: SelectSubset<T, VehicleAuthorizedStationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many VehicleAuthorizedStations and returns the data saved in the database.
     * @param {VehicleAuthorizedStationCreateManyAndReturnArgs} args - Arguments to create many VehicleAuthorizedStations.
     * @example
     * // Create many VehicleAuthorizedStations
     * const vehicleAuthorizedStation = await prisma.vehicleAuthorizedStation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many VehicleAuthorizedStations and only return the `id`
     * const vehicleAuthorizedStationWithIdOnly = await prisma.vehicleAuthorizedStation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VehicleAuthorizedStationCreateManyAndReturnArgs>(args?: SelectSubset<T, VehicleAuthorizedStationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VehicleAuthorizedStationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a VehicleAuthorizedStation.
     * @param {VehicleAuthorizedStationDeleteArgs} args - Arguments to delete one VehicleAuthorizedStation.
     * @example
     * // Delete one VehicleAuthorizedStation
     * const VehicleAuthorizedStation = await prisma.vehicleAuthorizedStation.delete({
     *   where: {
     *     // ... filter to delete one VehicleAuthorizedStation
     *   }
     * })
     * 
     */
    delete<T extends VehicleAuthorizedStationDeleteArgs>(args: SelectSubset<T, VehicleAuthorizedStationDeleteArgs<ExtArgs>>): Prisma__VehicleAuthorizedStationClient<$Result.GetResult<Prisma.$VehicleAuthorizedStationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one VehicleAuthorizedStation.
     * @param {VehicleAuthorizedStationUpdateArgs} args - Arguments to update one VehicleAuthorizedStation.
     * @example
     * // Update one VehicleAuthorizedStation
     * const vehicleAuthorizedStation = await prisma.vehicleAuthorizedStation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VehicleAuthorizedStationUpdateArgs>(args: SelectSubset<T, VehicleAuthorizedStationUpdateArgs<ExtArgs>>): Prisma__VehicleAuthorizedStationClient<$Result.GetResult<Prisma.$VehicleAuthorizedStationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more VehicleAuthorizedStations.
     * @param {VehicleAuthorizedStationDeleteManyArgs} args - Arguments to filter VehicleAuthorizedStations to delete.
     * @example
     * // Delete a few VehicleAuthorizedStations
     * const { count } = await prisma.vehicleAuthorizedStation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VehicleAuthorizedStationDeleteManyArgs>(args?: SelectSubset<T, VehicleAuthorizedStationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VehicleAuthorizedStations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleAuthorizedStationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VehicleAuthorizedStations
     * const vehicleAuthorizedStation = await prisma.vehicleAuthorizedStation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VehicleAuthorizedStationUpdateManyArgs>(args: SelectSubset<T, VehicleAuthorizedStationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VehicleAuthorizedStations and returns the data updated in the database.
     * @param {VehicleAuthorizedStationUpdateManyAndReturnArgs} args - Arguments to update many VehicleAuthorizedStations.
     * @example
     * // Update many VehicleAuthorizedStations
     * const vehicleAuthorizedStation = await prisma.vehicleAuthorizedStation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more VehicleAuthorizedStations and only return the `id`
     * const vehicleAuthorizedStationWithIdOnly = await prisma.vehicleAuthorizedStation.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VehicleAuthorizedStationUpdateManyAndReturnArgs>(args: SelectSubset<T, VehicleAuthorizedStationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VehicleAuthorizedStationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one VehicleAuthorizedStation.
     * @param {VehicleAuthorizedStationUpsertArgs} args - Arguments to update or create a VehicleAuthorizedStation.
     * @example
     * // Update or create a VehicleAuthorizedStation
     * const vehicleAuthorizedStation = await prisma.vehicleAuthorizedStation.upsert({
     *   create: {
     *     // ... data to create a VehicleAuthorizedStation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VehicleAuthorizedStation we want to update
     *   }
     * })
     */
    upsert<T extends VehicleAuthorizedStationUpsertArgs>(args: SelectSubset<T, VehicleAuthorizedStationUpsertArgs<ExtArgs>>): Prisma__VehicleAuthorizedStationClient<$Result.GetResult<Prisma.$VehicleAuthorizedStationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of VehicleAuthorizedStations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleAuthorizedStationCountArgs} args - Arguments to filter VehicleAuthorizedStations to count.
     * @example
     * // Count the number of VehicleAuthorizedStations
     * const count = await prisma.vehicleAuthorizedStation.count({
     *   where: {
     *     // ... the filter for the VehicleAuthorizedStations we want to count
     *   }
     * })
    **/
    count<T extends VehicleAuthorizedStationCountArgs>(
      args?: Subset<T, VehicleAuthorizedStationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VehicleAuthorizedStationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VehicleAuthorizedStation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleAuthorizedStationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VehicleAuthorizedStationAggregateArgs>(args: Subset<T, VehicleAuthorizedStationAggregateArgs>): Prisma.PrismaPromise<GetVehicleAuthorizedStationAggregateType<T>>

    /**
     * Group by VehicleAuthorizedStation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleAuthorizedStationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VehicleAuthorizedStationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VehicleAuthorizedStationGroupByArgs['orderBy'] }
        : { orderBy?: VehicleAuthorizedStationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VehicleAuthorizedStationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVehicleAuthorizedStationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VehicleAuthorizedStation model
   */
  readonly fields: VehicleAuthorizedStationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VehicleAuthorizedStation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VehicleAuthorizedStationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    vehicle<T extends VehicleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, VehicleDefaultArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the VehicleAuthorizedStation model
   */
  interface VehicleAuthorizedStationFieldRefs {
    readonly id: FieldRef<"VehicleAuthorizedStation", 'String'>
    readonly vehicleId: FieldRef<"VehicleAuthorizedStation", 'String'>
    readonly stationId: FieldRef<"VehicleAuthorizedStation", 'String'>
    readonly createdAt: FieldRef<"VehicleAuthorizedStation", 'DateTime'>
    readonly syncedAt: FieldRef<"VehicleAuthorizedStation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * VehicleAuthorizedStation findUnique
   */
  export type VehicleAuthorizedStationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleAuthorizedStation
     */
    select?: VehicleAuthorizedStationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleAuthorizedStation
     */
    omit?: VehicleAuthorizedStationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleAuthorizedStationInclude<ExtArgs> | null
    /**
     * Filter, which VehicleAuthorizedStation to fetch.
     */
    where: VehicleAuthorizedStationWhereUniqueInput
  }

  /**
   * VehicleAuthorizedStation findUniqueOrThrow
   */
  export type VehicleAuthorizedStationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleAuthorizedStation
     */
    select?: VehicleAuthorizedStationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleAuthorizedStation
     */
    omit?: VehicleAuthorizedStationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleAuthorizedStationInclude<ExtArgs> | null
    /**
     * Filter, which VehicleAuthorizedStation to fetch.
     */
    where: VehicleAuthorizedStationWhereUniqueInput
  }

  /**
   * VehicleAuthorizedStation findFirst
   */
  export type VehicleAuthorizedStationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleAuthorizedStation
     */
    select?: VehicleAuthorizedStationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleAuthorizedStation
     */
    omit?: VehicleAuthorizedStationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleAuthorizedStationInclude<ExtArgs> | null
    /**
     * Filter, which VehicleAuthorizedStation to fetch.
     */
    where?: VehicleAuthorizedStationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VehicleAuthorizedStations to fetch.
     */
    orderBy?: VehicleAuthorizedStationOrderByWithRelationInput | VehicleAuthorizedStationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VehicleAuthorizedStations.
     */
    cursor?: VehicleAuthorizedStationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VehicleAuthorizedStations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VehicleAuthorizedStations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VehicleAuthorizedStations.
     */
    distinct?: VehicleAuthorizedStationScalarFieldEnum | VehicleAuthorizedStationScalarFieldEnum[]
  }

  /**
   * VehicleAuthorizedStation findFirstOrThrow
   */
  export type VehicleAuthorizedStationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleAuthorizedStation
     */
    select?: VehicleAuthorizedStationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleAuthorizedStation
     */
    omit?: VehicleAuthorizedStationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleAuthorizedStationInclude<ExtArgs> | null
    /**
     * Filter, which VehicleAuthorizedStation to fetch.
     */
    where?: VehicleAuthorizedStationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VehicleAuthorizedStations to fetch.
     */
    orderBy?: VehicleAuthorizedStationOrderByWithRelationInput | VehicleAuthorizedStationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VehicleAuthorizedStations.
     */
    cursor?: VehicleAuthorizedStationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VehicleAuthorizedStations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VehicleAuthorizedStations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VehicleAuthorizedStations.
     */
    distinct?: VehicleAuthorizedStationScalarFieldEnum | VehicleAuthorizedStationScalarFieldEnum[]
  }

  /**
   * VehicleAuthorizedStation findMany
   */
  export type VehicleAuthorizedStationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleAuthorizedStation
     */
    select?: VehicleAuthorizedStationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleAuthorizedStation
     */
    omit?: VehicleAuthorizedStationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleAuthorizedStationInclude<ExtArgs> | null
    /**
     * Filter, which VehicleAuthorizedStations to fetch.
     */
    where?: VehicleAuthorizedStationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VehicleAuthorizedStations to fetch.
     */
    orderBy?: VehicleAuthorizedStationOrderByWithRelationInput | VehicleAuthorizedStationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VehicleAuthorizedStations.
     */
    cursor?: VehicleAuthorizedStationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VehicleAuthorizedStations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VehicleAuthorizedStations.
     */
    skip?: number
    distinct?: VehicleAuthorizedStationScalarFieldEnum | VehicleAuthorizedStationScalarFieldEnum[]
  }

  /**
   * VehicleAuthorizedStation create
   */
  export type VehicleAuthorizedStationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleAuthorizedStation
     */
    select?: VehicleAuthorizedStationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleAuthorizedStation
     */
    omit?: VehicleAuthorizedStationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleAuthorizedStationInclude<ExtArgs> | null
    /**
     * The data needed to create a VehicleAuthorizedStation.
     */
    data: XOR<VehicleAuthorizedStationCreateInput, VehicleAuthorizedStationUncheckedCreateInput>
  }

  /**
   * VehicleAuthorizedStation createMany
   */
  export type VehicleAuthorizedStationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VehicleAuthorizedStations.
     */
    data: VehicleAuthorizedStationCreateManyInput | VehicleAuthorizedStationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VehicleAuthorizedStation createManyAndReturn
   */
  export type VehicleAuthorizedStationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleAuthorizedStation
     */
    select?: VehicleAuthorizedStationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleAuthorizedStation
     */
    omit?: VehicleAuthorizedStationOmit<ExtArgs> | null
    /**
     * The data used to create many VehicleAuthorizedStations.
     */
    data: VehicleAuthorizedStationCreateManyInput | VehicleAuthorizedStationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleAuthorizedStationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * VehicleAuthorizedStation update
   */
  export type VehicleAuthorizedStationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleAuthorizedStation
     */
    select?: VehicleAuthorizedStationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleAuthorizedStation
     */
    omit?: VehicleAuthorizedStationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleAuthorizedStationInclude<ExtArgs> | null
    /**
     * The data needed to update a VehicleAuthorizedStation.
     */
    data: XOR<VehicleAuthorizedStationUpdateInput, VehicleAuthorizedStationUncheckedUpdateInput>
    /**
     * Choose, which VehicleAuthorizedStation to update.
     */
    where: VehicleAuthorizedStationWhereUniqueInput
  }

  /**
   * VehicleAuthorizedStation updateMany
   */
  export type VehicleAuthorizedStationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VehicleAuthorizedStations.
     */
    data: XOR<VehicleAuthorizedStationUpdateManyMutationInput, VehicleAuthorizedStationUncheckedUpdateManyInput>
    /**
     * Filter which VehicleAuthorizedStations to update
     */
    where?: VehicleAuthorizedStationWhereInput
    /**
     * Limit how many VehicleAuthorizedStations to update.
     */
    limit?: number
  }

  /**
   * VehicleAuthorizedStation updateManyAndReturn
   */
  export type VehicleAuthorizedStationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleAuthorizedStation
     */
    select?: VehicleAuthorizedStationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleAuthorizedStation
     */
    omit?: VehicleAuthorizedStationOmit<ExtArgs> | null
    /**
     * The data used to update VehicleAuthorizedStations.
     */
    data: XOR<VehicleAuthorizedStationUpdateManyMutationInput, VehicleAuthorizedStationUncheckedUpdateManyInput>
    /**
     * Filter which VehicleAuthorizedStations to update
     */
    where?: VehicleAuthorizedStationWhereInput
    /**
     * Limit how many VehicleAuthorizedStations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleAuthorizedStationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * VehicleAuthorizedStation upsert
   */
  export type VehicleAuthorizedStationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleAuthorizedStation
     */
    select?: VehicleAuthorizedStationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleAuthorizedStation
     */
    omit?: VehicleAuthorizedStationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleAuthorizedStationInclude<ExtArgs> | null
    /**
     * The filter to search for the VehicleAuthorizedStation to update in case it exists.
     */
    where: VehicleAuthorizedStationWhereUniqueInput
    /**
     * In case the VehicleAuthorizedStation found by the `where` argument doesn't exist, create a new VehicleAuthorizedStation with this data.
     */
    create: XOR<VehicleAuthorizedStationCreateInput, VehicleAuthorizedStationUncheckedCreateInput>
    /**
     * In case the VehicleAuthorizedStation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VehicleAuthorizedStationUpdateInput, VehicleAuthorizedStationUncheckedUpdateInput>
  }

  /**
   * VehicleAuthorizedStation delete
   */
  export type VehicleAuthorizedStationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleAuthorizedStation
     */
    select?: VehicleAuthorizedStationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleAuthorizedStation
     */
    omit?: VehicleAuthorizedStationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleAuthorizedStationInclude<ExtArgs> | null
    /**
     * Filter which VehicleAuthorizedStation to delete.
     */
    where: VehicleAuthorizedStationWhereUniqueInput
  }

  /**
   * VehicleAuthorizedStation deleteMany
   */
  export type VehicleAuthorizedStationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VehicleAuthorizedStations to delete
     */
    where?: VehicleAuthorizedStationWhereInput
    /**
     * Limit how many VehicleAuthorizedStations to delete.
     */
    limit?: number
  }

  /**
   * VehicleAuthorizedStation without action
   */
  export type VehicleAuthorizedStationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleAuthorizedStation
     */
    select?: VehicleAuthorizedStationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleAuthorizedStation
     */
    omit?: VehicleAuthorizedStationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleAuthorizedStationInclude<ExtArgs> | null
  }


  /**
   * Model VehicleQueue
   */

  export type AggregateVehicleQueue = {
    _count: VehicleQueueCountAggregateOutputType | null
    _avg: VehicleQueueAvgAggregateOutputType | null
    _sum: VehicleQueueSumAggregateOutputType | null
    _min: VehicleQueueMinAggregateOutputType | null
    _max: VehicleQueueMaxAggregateOutputType | null
  }

  export type VehicleQueueAvgAggregateOutputType = {
    queuePosition: number | null
    availableSeats: number | null
    totalSeats: number | null
    basePrice: number | null
  }

  export type VehicleQueueSumAggregateOutputType = {
    queuePosition: number | null
    availableSeats: number | null
    totalSeats: number | null
    basePrice: number | null
  }

  export type VehicleQueueMinAggregateOutputType = {
    id: string | null
    vehicleId: string | null
    destinationId: string | null
    destinationName: string | null
    queueType: string | null
    queuePosition: number | null
    status: string | null
    enteredAt: Date | null
    availableSeats: number | null
    totalSeats: number | null
    basePrice: number | null
    estimatedDeparture: Date | null
    actualDeparture: Date | null
    syncedAt: Date | null
  }

  export type VehicleQueueMaxAggregateOutputType = {
    id: string | null
    vehicleId: string | null
    destinationId: string | null
    destinationName: string | null
    queueType: string | null
    queuePosition: number | null
    status: string | null
    enteredAt: Date | null
    availableSeats: number | null
    totalSeats: number | null
    basePrice: number | null
    estimatedDeparture: Date | null
    actualDeparture: Date | null
    syncedAt: Date | null
  }

  export type VehicleQueueCountAggregateOutputType = {
    id: number
    vehicleId: number
    destinationId: number
    destinationName: number
    queueType: number
    queuePosition: number
    status: number
    enteredAt: number
    availableSeats: number
    totalSeats: number
    basePrice: number
    estimatedDeparture: number
    actualDeparture: number
    syncedAt: number
    _all: number
  }


  export type VehicleQueueAvgAggregateInputType = {
    queuePosition?: true
    availableSeats?: true
    totalSeats?: true
    basePrice?: true
  }

  export type VehicleQueueSumAggregateInputType = {
    queuePosition?: true
    availableSeats?: true
    totalSeats?: true
    basePrice?: true
  }

  export type VehicleQueueMinAggregateInputType = {
    id?: true
    vehicleId?: true
    destinationId?: true
    destinationName?: true
    queueType?: true
    queuePosition?: true
    status?: true
    enteredAt?: true
    availableSeats?: true
    totalSeats?: true
    basePrice?: true
    estimatedDeparture?: true
    actualDeparture?: true
    syncedAt?: true
  }

  export type VehicleQueueMaxAggregateInputType = {
    id?: true
    vehicleId?: true
    destinationId?: true
    destinationName?: true
    queueType?: true
    queuePosition?: true
    status?: true
    enteredAt?: true
    availableSeats?: true
    totalSeats?: true
    basePrice?: true
    estimatedDeparture?: true
    actualDeparture?: true
    syncedAt?: true
  }

  export type VehicleQueueCountAggregateInputType = {
    id?: true
    vehicleId?: true
    destinationId?: true
    destinationName?: true
    queueType?: true
    queuePosition?: true
    status?: true
    enteredAt?: true
    availableSeats?: true
    totalSeats?: true
    basePrice?: true
    estimatedDeparture?: true
    actualDeparture?: true
    syncedAt?: true
    _all?: true
  }

  export type VehicleQueueAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VehicleQueue to aggregate.
     */
    where?: VehicleQueueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VehicleQueues to fetch.
     */
    orderBy?: VehicleQueueOrderByWithRelationInput | VehicleQueueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VehicleQueueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VehicleQueues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VehicleQueues.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VehicleQueues
    **/
    _count?: true | VehicleQueueCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VehicleQueueAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VehicleQueueSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VehicleQueueMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VehicleQueueMaxAggregateInputType
  }

  export type GetVehicleQueueAggregateType<T extends VehicleQueueAggregateArgs> = {
        [P in keyof T & keyof AggregateVehicleQueue]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVehicleQueue[P]>
      : GetScalarType<T[P], AggregateVehicleQueue[P]>
  }




  export type VehicleQueueGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VehicleQueueWhereInput
    orderBy?: VehicleQueueOrderByWithAggregationInput | VehicleQueueOrderByWithAggregationInput[]
    by: VehicleQueueScalarFieldEnum[] | VehicleQueueScalarFieldEnum
    having?: VehicleQueueScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VehicleQueueCountAggregateInputType | true
    _avg?: VehicleQueueAvgAggregateInputType
    _sum?: VehicleQueueSumAggregateInputType
    _min?: VehicleQueueMinAggregateInputType
    _max?: VehicleQueueMaxAggregateInputType
  }

  export type VehicleQueueGroupByOutputType = {
    id: string
    vehicleId: string
    destinationId: string
    destinationName: string
    queueType: string
    queuePosition: number
    status: string
    enteredAt: Date
    availableSeats: number
    totalSeats: number
    basePrice: number
    estimatedDeparture: Date | null
    actualDeparture: Date | null
    syncedAt: Date
    _count: VehicleQueueCountAggregateOutputType | null
    _avg: VehicleQueueAvgAggregateOutputType | null
    _sum: VehicleQueueSumAggregateOutputType | null
    _min: VehicleQueueMinAggregateOutputType | null
    _max: VehicleQueueMaxAggregateOutputType | null
  }

  type GetVehicleQueueGroupByPayload<T extends VehicleQueueGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VehicleQueueGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VehicleQueueGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VehicleQueueGroupByOutputType[P]>
            : GetScalarType<T[P], VehicleQueueGroupByOutputType[P]>
        }
      >
    >


  export type VehicleQueueSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    vehicleId?: boolean
    destinationId?: boolean
    destinationName?: boolean
    queueType?: boolean
    queuePosition?: boolean
    status?: boolean
    enteredAt?: boolean
    availableSeats?: boolean
    totalSeats?: boolean
    basePrice?: boolean
    estimatedDeparture?: boolean
    actualDeparture?: boolean
    syncedAt?: boolean
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
    bookings?: boolean | VehicleQueue$bookingsArgs<ExtArgs>
    _count?: boolean | VehicleQueueCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vehicleQueue"]>

  export type VehicleQueueSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    vehicleId?: boolean
    destinationId?: boolean
    destinationName?: boolean
    queueType?: boolean
    queuePosition?: boolean
    status?: boolean
    enteredAt?: boolean
    availableSeats?: boolean
    totalSeats?: boolean
    basePrice?: boolean
    estimatedDeparture?: boolean
    actualDeparture?: boolean
    syncedAt?: boolean
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vehicleQueue"]>

  export type VehicleQueueSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    vehicleId?: boolean
    destinationId?: boolean
    destinationName?: boolean
    queueType?: boolean
    queuePosition?: boolean
    status?: boolean
    enteredAt?: boolean
    availableSeats?: boolean
    totalSeats?: boolean
    basePrice?: boolean
    estimatedDeparture?: boolean
    actualDeparture?: boolean
    syncedAt?: boolean
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vehicleQueue"]>

  export type VehicleQueueSelectScalar = {
    id?: boolean
    vehicleId?: boolean
    destinationId?: boolean
    destinationName?: boolean
    queueType?: boolean
    queuePosition?: boolean
    status?: boolean
    enteredAt?: boolean
    availableSeats?: boolean
    totalSeats?: boolean
    basePrice?: boolean
    estimatedDeparture?: boolean
    actualDeparture?: boolean
    syncedAt?: boolean
  }

  export type VehicleQueueOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "vehicleId" | "destinationId" | "destinationName" | "queueType" | "queuePosition" | "status" | "enteredAt" | "availableSeats" | "totalSeats" | "basePrice" | "estimatedDeparture" | "actualDeparture" | "syncedAt", ExtArgs["result"]["vehicleQueue"]>
  export type VehicleQueueInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
    bookings?: boolean | VehicleQueue$bookingsArgs<ExtArgs>
    _count?: boolean | VehicleQueueCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type VehicleQueueIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
  }
  export type VehicleQueueIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
  }

  export type $VehicleQueuePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VehicleQueue"
    objects: {
      vehicle: Prisma.$VehiclePayload<ExtArgs>
      bookings: Prisma.$BookingPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      vehicleId: string
      destinationId: string
      destinationName: string
      queueType: string
      queuePosition: number
      status: string
      enteredAt: Date
      availableSeats: number
      totalSeats: number
      basePrice: number
      estimatedDeparture: Date | null
      actualDeparture: Date | null
      syncedAt: Date
    }, ExtArgs["result"]["vehicleQueue"]>
    composites: {}
  }

  type VehicleQueueGetPayload<S extends boolean | null | undefined | VehicleQueueDefaultArgs> = $Result.GetResult<Prisma.$VehicleQueuePayload, S>

  type VehicleQueueCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VehicleQueueFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VehicleQueueCountAggregateInputType | true
    }

  export interface VehicleQueueDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VehicleQueue'], meta: { name: 'VehicleQueue' } }
    /**
     * Find zero or one VehicleQueue that matches the filter.
     * @param {VehicleQueueFindUniqueArgs} args - Arguments to find a VehicleQueue
     * @example
     * // Get one VehicleQueue
     * const vehicleQueue = await prisma.vehicleQueue.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VehicleQueueFindUniqueArgs>(args: SelectSubset<T, VehicleQueueFindUniqueArgs<ExtArgs>>): Prisma__VehicleQueueClient<$Result.GetResult<Prisma.$VehicleQueuePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one VehicleQueue that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VehicleQueueFindUniqueOrThrowArgs} args - Arguments to find a VehicleQueue
     * @example
     * // Get one VehicleQueue
     * const vehicleQueue = await prisma.vehicleQueue.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VehicleQueueFindUniqueOrThrowArgs>(args: SelectSubset<T, VehicleQueueFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VehicleQueueClient<$Result.GetResult<Prisma.$VehicleQueuePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VehicleQueue that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleQueueFindFirstArgs} args - Arguments to find a VehicleQueue
     * @example
     * // Get one VehicleQueue
     * const vehicleQueue = await prisma.vehicleQueue.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VehicleQueueFindFirstArgs>(args?: SelectSubset<T, VehicleQueueFindFirstArgs<ExtArgs>>): Prisma__VehicleQueueClient<$Result.GetResult<Prisma.$VehicleQueuePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VehicleQueue that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleQueueFindFirstOrThrowArgs} args - Arguments to find a VehicleQueue
     * @example
     * // Get one VehicleQueue
     * const vehicleQueue = await prisma.vehicleQueue.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VehicleQueueFindFirstOrThrowArgs>(args?: SelectSubset<T, VehicleQueueFindFirstOrThrowArgs<ExtArgs>>): Prisma__VehicleQueueClient<$Result.GetResult<Prisma.$VehicleQueuePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more VehicleQueues that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleQueueFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VehicleQueues
     * const vehicleQueues = await prisma.vehicleQueue.findMany()
     * 
     * // Get first 10 VehicleQueues
     * const vehicleQueues = await prisma.vehicleQueue.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const vehicleQueueWithIdOnly = await prisma.vehicleQueue.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VehicleQueueFindManyArgs>(args?: SelectSubset<T, VehicleQueueFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VehicleQueuePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a VehicleQueue.
     * @param {VehicleQueueCreateArgs} args - Arguments to create a VehicleQueue.
     * @example
     * // Create one VehicleQueue
     * const VehicleQueue = await prisma.vehicleQueue.create({
     *   data: {
     *     // ... data to create a VehicleQueue
     *   }
     * })
     * 
     */
    create<T extends VehicleQueueCreateArgs>(args: SelectSubset<T, VehicleQueueCreateArgs<ExtArgs>>): Prisma__VehicleQueueClient<$Result.GetResult<Prisma.$VehicleQueuePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many VehicleQueues.
     * @param {VehicleQueueCreateManyArgs} args - Arguments to create many VehicleQueues.
     * @example
     * // Create many VehicleQueues
     * const vehicleQueue = await prisma.vehicleQueue.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VehicleQueueCreateManyArgs>(args?: SelectSubset<T, VehicleQueueCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many VehicleQueues and returns the data saved in the database.
     * @param {VehicleQueueCreateManyAndReturnArgs} args - Arguments to create many VehicleQueues.
     * @example
     * // Create many VehicleQueues
     * const vehicleQueue = await prisma.vehicleQueue.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many VehicleQueues and only return the `id`
     * const vehicleQueueWithIdOnly = await prisma.vehicleQueue.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VehicleQueueCreateManyAndReturnArgs>(args?: SelectSubset<T, VehicleQueueCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VehicleQueuePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a VehicleQueue.
     * @param {VehicleQueueDeleteArgs} args - Arguments to delete one VehicleQueue.
     * @example
     * // Delete one VehicleQueue
     * const VehicleQueue = await prisma.vehicleQueue.delete({
     *   where: {
     *     // ... filter to delete one VehicleQueue
     *   }
     * })
     * 
     */
    delete<T extends VehicleQueueDeleteArgs>(args: SelectSubset<T, VehicleQueueDeleteArgs<ExtArgs>>): Prisma__VehicleQueueClient<$Result.GetResult<Prisma.$VehicleQueuePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one VehicleQueue.
     * @param {VehicleQueueUpdateArgs} args - Arguments to update one VehicleQueue.
     * @example
     * // Update one VehicleQueue
     * const vehicleQueue = await prisma.vehicleQueue.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VehicleQueueUpdateArgs>(args: SelectSubset<T, VehicleQueueUpdateArgs<ExtArgs>>): Prisma__VehicleQueueClient<$Result.GetResult<Prisma.$VehicleQueuePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more VehicleQueues.
     * @param {VehicleQueueDeleteManyArgs} args - Arguments to filter VehicleQueues to delete.
     * @example
     * // Delete a few VehicleQueues
     * const { count } = await prisma.vehicleQueue.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VehicleQueueDeleteManyArgs>(args?: SelectSubset<T, VehicleQueueDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VehicleQueues.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleQueueUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VehicleQueues
     * const vehicleQueue = await prisma.vehicleQueue.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VehicleQueueUpdateManyArgs>(args: SelectSubset<T, VehicleQueueUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VehicleQueues and returns the data updated in the database.
     * @param {VehicleQueueUpdateManyAndReturnArgs} args - Arguments to update many VehicleQueues.
     * @example
     * // Update many VehicleQueues
     * const vehicleQueue = await prisma.vehicleQueue.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more VehicleQueues and only return the `id`
     * const vehicleQueueWithIdOnly = await prisma.vehicleQueue.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VehicleQueueUpdateManyAndReturnArgs>(args: SelectSubset<T, VehicleQueueUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VehicleQueuePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one VehicleQueue.
     * @param {VehicleQueueUpsertArgs} args - Arguments to update or create a VehicleQueue.
     * @example
     * // Update or create a VehicleQueue
     * const vehicleQueue = await prisma.vehicleQueue.upsert({
     *   create: {
     *     // ... data to create a VehicleQueue
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VehicleQueue we want to update
     *   }
     * })
     */
    upsert<T extends VehicleQueueUpsertArgs>(args: SelectSubset<T, VehicleQueueUpsertArgs<ExtArgs>>): Prisma__VehicleQueueClient<$Result.GetResult<Prisma.$VehicleQueuePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of VehicleQueues.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleQueueCountArgs} args - Arguments to filter VehicleQueues to count.
     * @example
     * // Count the number of VehicleQueues
     * const count = await prisma.vehicleQueue.count({
     *   where: {
     *     // ... the filter for the VehicleQueues we want to count
     *   }
     * })
    **/
    count<T extends VehicleQueueCountArgs>(
      args?: Subset<T, VehicleQueueCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VehicleQueueCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VehicleQueue.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleQueueAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VehicleQueueAggregateArgs>(args: Subset<T, VehicleQueueAggregateArgs>): Prisma.PrismaPromise<GetVehicleQueueAggregateType<T>>

    /**
     * Group by VehicleQueue.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleQueueGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VehicleQueueGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VehicleQueueGroupByArgs['orderBy'] }
        : { orderBy?: VehicleQueueGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VehicleQueueGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVehicleQueueGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VehicleQueue model
   */
  readonly fields: VehicleQueueFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VehicleQueue.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VehicleQueueClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    vehicle<T extends VehicleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, VehicleDefaultArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    bookings<T extends VehicleQueue$bookingsArgs<ExtArgs> = {}>(args?: Subset<T, VehicleQueue$bookingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the VehicleQueue model
   */
  interface VehicleQueueFieldRefs {
    readonly id: FieldRef<"VehicleQueue", 'String'>
    readonly vehicleId: FieldRef<"VehicleQueue", 'String'>
    readonly destinationId: FieldRef<"VehicleQueue", 'String'>
    readonly destinationName: FieldRef<"VehicleQueue", 'String'>
    readonly queueType: FieldRef<"VehicleQueue", 'String'>
    readonly queuePosition: FieldRef<"VehicleQueue", 'Int'>
    readonly status: FieldRef<"VehicleQueue", 'String'>
    readonly enteredAt: FieldRef<"VehicleQueue", 'DateTime'>
    readonly availableSeats: FieldRef<"VehicleQueue", 'Int'>
    readonly totalSeats: FieldRef<"VehicleQueue", 'Int'>
    readonly basePrice: FieldRef<"VehicleQueue", 'Float'>
    readonly estimatedDeparture: FieldRef<"VehicleQueue", 'DateTime'>
    readonly actualDeparture: FieldRef<"VehicleQueue", 'DateTime'>
    readonly syncedAt: FieldRef<"VehicleQueue", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * VehicleQueue findUnique
   */
  export type VehicleQueueFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleQueue
     */
    select?: VehicleQueueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleQueue
     */
    omit?: VehicleQueueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleQueueInclude<ExtArgs> | null
    /**
     * Filter, which VehicleQueue to fetch.
     */
    where: VehicleQueueWhereUniqueInput
  }

  /**
   * VehicleQueue findUniqueOrThrow
   */
  export type VehicleQueueFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleQueue
     */
    select?: VehicleQueueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleQueue
     */
    omit?: VehicleQueueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleQueueInclude<ExtArgs> | null
    /**
     * Filter, which VehicleQueue to fetch.
     */
    where: VehicleQueueWhereUniqueInput
  }

  /**
   * VehicleQueue findFirst
   */
  export type VehicleQueueFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleQueue
     */
    select?: VehicleQueueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleQueue
     */
    omit?: VehicleQueueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleQueueInclude<ExtArgs> | null
    /**
     * Filter, which VehicleQueue to fetch.
     */
    where?: VehicleQueueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VehicleQueues to fetch.
     */
    orderBy?: VehicleQueueOrderByWithRelationInput | VehicleQueueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VehicleQueues.
     */
    cursor?: VehicleQueueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VehicleQueues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VehicleQueues.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VehicleQueues.
     */
    distinct?: VehicleQueueScalarFieldEnum | VehicleQueueScalarFieldEnum[]
  }

  /**
   * VehicleQueue findFirstOrThrow
   */
  export type VehicleQueueFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleQueue
     */
    select?: VehicleQueueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleQueue
     */
    omit?: VehicleQueueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleQueueInclude<ExtArgs> | null
    /**
     * Filter, which VehicleQueue to fetch.
     */
    where?: VehicleQueueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VehicleQueues to fetch.
     */
    orderBy?: VehicleQueueOrderByWithRelationInput | VehicleQueueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VehicleQueues.
     */
    cursor?: VehicleQueueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VehicleQueues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VehicleQueues.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VehicleQueues.
     */
    distinct?: VehicleQueueScalarFieldEnum | VehicleQueueScalarFieldEnum[]
  }

  /**
   * VehicleQueue findMany
   */
  export type VehicleQueueFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleQueue
     */
    select?: VehicleQueueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleQueue
     */
    omit?: VehicleQueueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleQueueInclude<ExtArgs> | null
    /**
     * Filter, which VehicleQueues to fetch.
     */
    where?: VehicleQueueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VehicleQueues to fetch.
     */
    orderBy?: VehicleQueueOrderByWithRelationInput | VehicleQueueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VehicleQueues.
     */
    cursor?: VehicleQueueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VehicleQueues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VehicleQueues.
     */
    skip?: number
    distinct?: VehicleQueueScalarFieldEnum | VehicleQueueScalarFieldEnum[]
  }

  /**
   * VehicleQueue create
   */
  export type VehicleQueueCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleQueue
     */
    select?: VehicleQueueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleQueue
     */
    omit?: VehicleQueueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleQueueInclude<ExtArgs> | null
    /**
     * The data needed to create a VehicleQueue.
     */
    data: XOR<VehicleQueueCreateInput, VehicleQueueUncheckedCreateInput>
  }

  /**
   * VehicleQueue createMany
   */
  export type VehicleQueueCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VehicleQueues.
     */
    data: VehicleQueueCreateManyInput | VehicleQueueCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VehicleQueue createManyAndReturn
   */
  export type VehicleQueueCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleQueue
     */
    select?: VehicleQueueSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleQueue
     */
    omit?: VehicleQueueOmit<ExtArgs> | null
    /**
     * The data used to create many VehicleQueues.
     */
    data: VehicleQueueCreateManyInput | VehicleQueueCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleQueueIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * VehicleQueue update
   */
  export type VehicleQueueUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleQueue
     */
    select?: VehicleQueueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleQueue
     */
    omit?: VehicleQueueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleQueueInclude<ExtArgs> | null
    /**
     * The data needed to update a VehicleQueue.
     */
    data: XOR<VehicleQueueUpdateInput, VehicleQueueUncheckedUpdateInput>
    /**
     * Choose, which VehicleQueue to update.
     */
    where: VehicleQueueWhereUniqueInput
  }

  /**
   * VehicleQueue updateMany
   */
  export type VehicleQueueUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VehicleQueues.
     */
    data: XOR<VehicleQueueUpdateManyMutationInput, VehicleQueueUncheckedUpdateManyInput>
    /**
     * Filter which VehicleQueues to update
     */
    where?: VehicleQueueWhereInput
    /**
     * Limit how many VehicleQueues to update.
     */
    limit?: number
  }

  /**
   * VehicleQueue updateManyAndReturn
   */
  export type VehicleQueueUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleQueue
     */
    select?: VehicleQueueSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleQueue
     */
    omit?: VehicleQueueOmit<ExtArgs> | null
    /**
     * The data used to update VehicleQueues.
     */
    data: XOR<VehicleQueueUpdateManyMutationInput, VehicleQueueUncheckedUpdateManyInput>
    /**
     * Filter which VehicleQueues to update
     */
    where?: VehicleQueueWhereInput
    /**
     * Limit how many VehicleQueues to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleQueueIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * VehicleQueue upsert
   */
  export type VehicleQueueUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleQueue
     */
    select?: VehicleQueueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleQueue
     */
    omit?: VehicleQueueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleQueueInclude<ExtArgs> | null
    /**
     * The filter to search for the VehicleQueue to update in case it exists.
     */
    where: VehicleQueueWhereUniqueInput
    /**
     * In case the VehicleQueue found by the `where` argument doesn't exist, create a new VehicleQueue with this data.
     */
    create: XOR<VehicleQueueCreateInput, VehicleQueueUncheckedCreateInput>
    /**
     * In case the VehicleQueue was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VehicleQueueUpdateInput, VehicleQueueUncheckedUpdateInput>
  }

  /**
   * VehicleQueue delete
   */
  export type VehicleQueueDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleQueue
     */
    select?: VehicleQueueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleQueue
     */
    omit?: VehicleQueueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleQueueInclude<ExtArgs> | null
    /**
     * Filter which VehicleQueue to delete.
     */
    where: VehicleQueueWhereUniqueInput
  }

  /**
   * VehicleQueue deleteMany
   */
  export type VehicleQueueDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VehicleQueues to delete
     */
    where?: VehicleQueueWhereInput
    /**
     * Limit how many VehicleQueues to delete.
     */
    limit?: number
  }

  /**
   * VehicleQueue.bookings
   */
  export type VehicleQueue$bookingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    where?: BookingWhereInput
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    cursor?: BookingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BookingScalarFieldEnum | BookingScalarFieldEnum[]
  }

  /**
   * VehicleQueue without action
   */
  export type VehicleQueueDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleQueue
     */
    select?: VehicleQueueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleQueue
     */
    omit?: VehicleQueueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleQueueInclude<ExtArgs> | null
  }


  /**
   * Model Route
   */

  export type AggregateRoute = {
    _count: RouteCountAggregateOutputType | null
    _avg: RouteAvgAggregateOutputType | null
    _sum: RouteSumAggregateOutputType | null
    _min: RouteMinAggregateOutputType | null
    _max: RouteMaxAggregateOutputType | null
  }

  export type RouteAvgAggregateOutputType = {
    basePrice: number | null
  }

  export type RouteSumAggregateOutputType = {
    basePrice: number | null
  }

  export type RouteMinAggregateOutputType = {
    id: string | null
    departureStationId: string | null
    destinationStationId: string | null
    destinationName: string | null
    basePrice: number | null
    isActive: boolean | null
    syncedAt: Date | null
  }

  export type RouteMaxAggregateOutputType = {
    id: string | null
    departureStationId: string | null
    destinationStationId: string | null
    destinationName: string | null
    basePrice: number | null
    isActive: boolean | null
    syncedAt: Date | null
  }

  export type RouteCountAggregateOutputType = {
    id: number
    departureStationId: number
    destinationStationId: number
    destinationName: number
    basePrice: number
    isActive: number
    syncedAt: number
    _all: number
  }


  export type RouteAvgAggregateInputType = {
    basePrice?: true
  }

  export type RouteSumAggregateInputType = {
    basePrice?: true
  }

  export type RouteMinAggregateInputType = {
    id?: true
    departureStationId?: true
    destinationStationId?: true
    destinationName?: true
    basePrice?: true
    isActive?: true
    syncedAt?: true
  }

  export type RouteMaxAggregateInputType = {
    id?: true
    departureStationId?: true
    destinationStationId?: true
    destinationName?: true
    basePrice?: true
    isActive?: true
    syncedAt?: true
  }

  export type RouteCountAggregateInputType = {
    id?: true
    departureStationId?: true
    destinationStationId?: true
    destinationName?: true
    basePrice?: true
    isActive?: true
    syncedAt?: true
    _all?: true
  }

  export type RouteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Route to aggregate.
     */
    where?: RouteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Routes to fetch.
     */
    orderBy?: RouteOrderByWithRelationInput | RouteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RouteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Routes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Routes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Routes
    **/
    _count?: true | RouteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RouteAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RouteSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RouteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RouteMaxAggregateInputType
  }

  export type GetRouteAggregateType<T extends RouteAggregateArgs> = {
        [P in keyof T & keyof AggregateRoute]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRoute[P]>
      : GetScalarType<T[P], AggregateRoute[P]>
  }




  export type RouteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RouteWhereInput
    orderBy?: RouteOrderByWithAggregationInput | RouteOrderByWithAggregationInput[]
    by: RouteScalarFieldEnum[] | RouteScalarFieldEnum
    having?: RouteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RouteCountAggregateInputType | true
    _avg?: RouteAvgAggregateInputType
    _sum?: RouteSumAggregateInputType
    _min?: RouteMinAggregateInputType
    _max?: RouteMaxAggregateInputType
  }

  export type RouteGroupByOutputType = {
    id: string
    departureStationId: string
    destinationStationId: string
    destinationName: string
    basePrice: number
    isActive: boolean
    syncedAt: Date
    _count: RouteCountAggregateOutputType | null
    _avg: RouteAvgAggregateOutputType | null
    _sum: RouteSumAggregateOutputType | null
    _min: RouteMinAggregateOutputType | null
    _max: RouteMaxAggregateOutputType | null
  }

  type GetRouteGroupByPayload<T extends RouteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RouteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RouteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RouteGroupByOutputType[P]>
            : GetScalarType<T[P], RouteGroupByOutputType[P]>
        }
      >
    >


  export type RouteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    departureStationId?: boolean
    destinationStationId?: boolean
    destinationName?: boolean
    basePrice?: boolean
    isActive?: boolean
    syncedAt?: boolean
    schedules?: boolean | Route$schedulesArgs<ExtArgs>
    _count?: boolean | RouteCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["route"]>

  export type RouteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    departureStationId?: boolean
    destinationStationId?: boolean
    destinationName?: boolean
    basePrice?: boolean
    isActive?: boolean
    syncedAt?: boolean
  }, ExtArgs["result"]["route"]>

  export type RouteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    departureStationId?: boolean
    destinationStationId?: boolean
    destinationName?: boolean
    basePrice?: boolean
    isActive?: boolean
    syncedAt?: boolean
  }, ExtArgs["result"]["route"]>

  export type RouteSelectScalar = {
    id?: boolean
    departureStationId?: boolean
    destinationStationId?: boolean
    destinationName?: boolean
    basePrice?: boolean
    isActive?: boolean
    syncedAt?: boolean
  }

  export type RouteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "departureStationId" | "destinationStationId" | "destinationName" | "basePrice" | "isActive" | "syncedAt", ExtArgs["result"]["route"]>
  export type RouteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    schedules?: boolean | Route$schedulesArgs<ExtArgs>
    _count?: boolean | RouteCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RouteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type RouteIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $RoutePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Route"
    objects: {
      schedules: Prisma.$VehicleSchedulePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      departureStationId: string
      destinationStationId: string
      destinationName: string
      basePrice: number
      isActive: boolean
      syncedAt: Date
    }, ExtArgs["result"]["route"]>
    composites: {}
  }

  type RouteGetPayload<S extends boolean | null | undefined | RouteDefaultArgs> = $Result.GetResult<Prisma.$RoutePayload, S>

  type RouteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RouteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RouteCountAggregateInputType | true
    }

  export interface RouteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Route'], meta: { name: 'Route' } }
    /**
     * Find zero or one Route that matches the filter.
     * @param {RouteFindUniqueArgs} args - Arguments to find a Route
     * @example
     * // Get one Route
     * const route = await prisma.route.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RouteFindUniqueArgs>(args: SelectSubset<T, RouteFindUniqueArgs<ExtArgs>>): Prisma__RouteClient<$Result.GetResult<Prisma.$RoutePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Route that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RouteFindUniqueOrThrowArgs} args - Arguments to find a Route
     * @example
     * // Get one Route
     * const route = await prisma.route.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RouteFindUniqueOrThrowArgs>(args: SelectSubset<T, RouteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RouteClient<$Result.GetResult<Prisma.$RoutePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Route that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RouteFindFirstArgs} args - Arguments to find a Route
     * @example
     * // Get one Route
     * const route = await prisma.route.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RouteFindFirstArgs>(args?: SelectSubset<T, RouteFindFirstArgs<ExtArgs>>): Prisma__RouteClient<$Result.GetResult<Prisma.$RoutePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Route that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RouteFindFirstOrThrowArgs} args - Arguments to find a Route
     * @example
     * // Get one Route
     * const route = await prisma.route.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RouteFindFirstOrThrowArgs>(args?: SelectSubset<T, RouteFindFirstOrThrowArgs<ExtArgs>>): Prisma__RouteClient<$Result.GetResult<Prisma.$RoutePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Routes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RouteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Routes
     * const routes = await prisma.route.findMany()
     * 
     * // Get first 10 Routes
     * const routes = await prisma.route.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const routeWithIdOnly = await prisma.route.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RouteFindManyArgs>(args?: SelectSubset<T, RouteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoutePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Route.
     * @param {RouteCreateArgs} args - Arguments to create a Route.
     * @example
     * // Create one Route
     * const Route = await prisma.route.create({
     *   data: {
     *     // ... data to create a Route
     *   }
     * })
     * 
     */
    create<T extends RouteCreateArgs>(args: SelectSubset<T, RouteCreateArgs<ExtArgs>>): Prisma__RouteClient<$Result.GetResult<Prisma.$RoutePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Routes.
     * @param {RouteCreateManyArgs} args - Arguments to create many Routes.
     * @example
     * // Create many Routes
     * const route = await prisma.route.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RouteCreateManyArgs>(args?: SelectSubset<T, RouteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Routes and returns the data saved in the database.
     * @param {RouteCreateManyAndReturnArgs} args - Arguments to create many Routes.
     * @example
     * // Create many Routes
     * const route = await prisma.route.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Routes and only return the `id`
     * const routeWithIdOnly = await prisma.route.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RouteCreateManyAndReturnArgs>(args?: SelectSubset<T, RouteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoutePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Route.
     * @param {RouteDeleteArgs} args - Arguments to delete one Route.
     * @example
     * // Delete one Route
     * const Route = await prisma.route.delete({
     *   where: {
     *     // ... filter to delete one Route
     *   }
     * })
     * 
     */
    delete<T extends RouteDeleteArgs>(args: SelectSubset<T, RouteDeleteArgs<ExtArgs>>): Prisma__RouteClient<$Result.GetResult<Prisma.$RoutePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Route.
     * @param {RouteUpdateArgs} args - Arguments to update one Route.
     * @example
     * // Update one Route
     * const route = await prisma.route.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RouteUpdateArgs>(args: SelectSubset<T, RouteUpdateArgs<ExtArgs>>): Prisma__RouteClient<$Result.GetResult<Prisma.$RoutePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Routes.
     * @param {RouteDeleteManyArgs} args - Arguments to filter Routes to delete.
     * @example
     * // Delete a few Routes
     * const { count } = await prisma.route.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RouteDeleteManyArgs>(args?: SelectSubset<T, RouteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Routes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RouteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Routes
     * const route = await prisma.route.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RouteUpdateManyArgs>(args: SelectSubset<T, RouteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Routes and returns the data updated in the database.
     * @param {RouteUpdateManyAndReturnArgs} args - Arguments to update many Routes.
     * @example
     * // Update many Routes
     * const route = await prisma.route.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Routes and only return the `id`
     * const routeWithIdOnly = await prisma.route.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RouteUpdateManyAndReturnArgs>(args: SelectSubset<T, RouteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoutePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Route.
     * @param {RouteUpsertArgs} args - Arguments to update or create a Route.
     * @example
     * // Update or create a Route
     * const route = await prisma.route.upsert({
     *   create: {
     *     // ... data to create a Route
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Route we want to update
     *   }
     * })
     */
    upsert<T extends RouteUpsertArgs>(args: SelectSubset<T, RouteUpsertArgs<ExtArgs>>): Prisma__RouteClient<$Result.GetResult<Prisma.$RoutePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Routes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RouteCountArgs} args - Arguments to filter Routes to count.
     * @example
     * // Count the number of Routes
     * const count = await prisma.route.count({
     *   where: {
     *     // ... the filter for the Routes we want to count
     *   }
     * })
    **/
    count<T extends RouteCountArgs>(
      args?: Subset<T, RouteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RouteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Route.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RouteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RouteAggregateArgs>(args: Subset<T, RouteAggregateArgs>): Prisma.PrismaPromise<GetRouteAggregateType<T>>

    /**
     * Group by Route.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RouteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RouteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RouteGroupByArgs['orderBy'] }
        : { orderBy?: RouteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RouteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRouteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Route model
   */
  readonly fields: RouteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Route.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RouteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    schedules<T extends Route$schedulesArgs<ExtArgs> = {}>(args?: Subset<T, Route$schedulesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VehicleSchedulePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Route model
   */
  interface RouteFieldRefs {
    readonly id: FieldRef<"Route", 'String'>
    readonly departureStationId: FieldRef<"Route", 'String'>
    readonly destinationStationId: FieldRef<"Route", 'String'>
    readonly destinationName: FieldRef<"Route", 'String'>
    readonly basePrice: FieldRef<"Route", 'Float'>
    readonly isActive: FieldRef<"Route", 'Boolean'>
    readonly syncedAt: FieldRef<"Route", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Route findUnique
   */
  export type RouteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Route
     */
    select?: RouteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Route
     */
    omit?: RouteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RouteInclude<ExtArgs> | null
    /**
     * Filter, which Route to fetch.
     */
    where: RouteWhereUniqueInput
  }

  /**
   * Route findUniqueOrThrow
   */
  export type RouteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Route
     */
    select?: RouteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Route
     */
    omit?: RouteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RouteInclude<ExtArgs> | null
    /**
     * Filter, which Route to fetch.
     */
    where: RouteWhereUniqueInput
  }

  /**
   * Route findFirst
   */
  export type RouteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Route
     */
    select?: RouteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Route
     */
    omit?: RouteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RouteInclude<ExtArgs> | null
    /**
     * Filter, which Route to fetch.
     */
    where?: RouteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Routes to fetch.
     */
    orderBy?: RouteOrderByWithRelationInput | RouteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Routes.
     */
    cursor?: RouteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Routes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Routes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Routes.
     */
    distinct?: RouteScalarFieldEnum | RouteScalarFieldEnum[]
  }

  /**
   * Route findFirstOrThrow
   */
  export type RouteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Route
     */
    select?: RouteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Route
     */
    omit?: RouteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RouteInclude<ExtArgs> | null
    /**
     * Filter, which Route to fetch.
     */
    where?: RouteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Routes to fetch.
     */
    orderBy?: RouteOrderByWithRelationInput | RouteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Routes.
     */
    cursor?: RouteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Routes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Routes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Routes.
     */
    distinct?: RouteScalarFieldEnum | RouteScalarFieldEnum[]
  }

  /**
   * Route findMany
   */
  export type RouteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Route
     */
    select?: RouteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Route
     */
    omit?: RouteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RouteInclude<ExtArgs> | null
    /**
     * Filter, which Routes to fetch.
     */
    where?: RouteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Routes to fetch.
     */
    orderBy?: RouteOrderByWithRelationInput | RouteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Routes.
     */
    cursor?: RouteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Routes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Routes.
     */
    skip?: number
    distinct?: RouteScalarFieldEnum | RouteScalarFieldEnum[]
  }

  /**
   * Route create
   */
  export type RouteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Route
     */
    select?: RouteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Route
     */
    omit?: RouteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RouteInclude<ExtArgs> | null
    /**
     * The data needed to create a Route.
     */
    data: XOR<RouteCreateInput, RouteUncheckedCreateInput>
  }

  /**
   * Route createMany
   */
  export type RouteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Routes.
     */
    data: RouteCreateManyInput | RouteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Route createManyAndReturn
   */
  export type RouteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Route
     */
    select?: RouteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Route
     */
    omit?: RouteOmit<ExtArgs> | null
    /**
     * The data used to create many Routes.
     */
    data: RouteCreateManyInput | RouteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Route update
   */
  export type RouteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Route
     */
    select?: RouteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Route
     */
    omit?: RouteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RouteInclude<ExtArgs> | null
    /**
     * The data needed to update a Route.
     */
    data: XOR<RouteUpdateInput, RouteUncheckedUpdateInput>
    /**
     * Choose, which Route to update.
     */
    where: RouteWhereUniqueInput
  }

  /**
   * Route updateMany
   */
  export type RouteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Routes.
     */
    data: XOR<RouteUpdateManyMutationInput, RouteUncheckedUpdateManyInput>
    /**
     * Filter which Routes to update
     */
    where?: RouteWhereInput
    /**
     * Limit how many Routes to update.
     */
    limit?: number
  }

  /**
   * Route updateManyAndReturn
   */
  export type RouteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Route
     */
    select?: RouteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Route
     */
    omit?: RouteOmit<ExtArgs> | null
    /**
     * The data used to update Routes.
     */
    data: XOR<RouteUpdateManyMutationInput, RouteUncheckedUpdateManyInput>
    /**
     * Filter which Routes to update
     */
    where?: RouteWhereInput
    /**
     * Limit how many Routes to update.
     */
    limit?: number
  }

  /**
   * Route upsert
   */
  export type RouteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Route
     */
    select?: RouteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Route
     */
    omit?: RouteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RouteInclude<ExtArgs> | null
    /**
     * The filter to search for the Route to update in case it exists.
     */
    where: RouteWhereUniqueInput
    /**
     * In case the Route found by the `where` argument doesn't exist, create a new Route with this data.
     */
    create: XOR<RouteCreateInput, RouteUncheckedCreateInput>
    /**
     * In case the Route was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RouteUpdateInput, RouteUncheckedUpdateInput>
  }

  /**
   * Route delete
   */
  export type RouteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Route
     */
    select?: RouteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Route
     */
    omit?: RouteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RouteInclude<ExtArgs> | null
    /**
     * Filter which Route to delete.
     */
    where: RouteWhereUniqueInput
  }

  /**
   * Route deleteMany
   */
  export type RouteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Routes to delete
     */
    where?: RouteWhereInput
    /**
     * Limit how many Routes to delete.
     */
    limit?: number
  }

  /**
   * Route.schedules
   */
  export type Route$schedulesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleSchedule
     */
    select?: VehicleScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleSchedule
     */
    omit?: VehicleScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleScheduleInclude<ExtArgs> | null
    where?: VehicleScheduleWhereInput
    orderBy?: VehicleScheduleOrderByWithRelationInput | VehicleScheduleOrderByWithRelationInput[]
    cursor?: VehicleScheduleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VehicleScheduleScalarFieldEnum | VehicleScheduleScalarFieldEnum[]
  }

  /**
   * Route without action
   */
  export type RouteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Route
     */
    select?: RouteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Route
     */
    omit?: RouteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RouteInclude<ExtArgs> | null
  }


  /**
   * Model VehicleSchedule
   */

  export type AggregateVehicleSchedule = {
    _count: VehicleScheduleCountAggregateOutputType | null
    _avg: VehicleScheduleAvgAggregateOutputType | null
    _sum: VehicleScheduleSumAggregateOutputType | null
    _min: VehicleScheduleMinAggregateOutputType | null
    _max: VehicleScheduleMaxAggregateOutputType | null
  }

  export type VehicleScheduleAvgAggregateOutputType = {
    availableSeats: number | null
    totalSeats: number | null
  }

  export type VehicleScheduleSumAggregateOutputType = {
    availableSeats: number | null
    totalSeats: number | null
  }

  export type VehicleScheduleMinAggregateOutputType = {
    id: string | null
    vehicleId: string | null
    routeId: string | null
    departureTime: Date | null
    availableSeats: number | null
    totalSeats: number | null
    status: string | null
    actualDeparture: Date | null
    syncedAt: Date | null
  }

  export type VehicleScheduleMaxAggregateOutputType = {
    id: string | null
    vehicleId: string | null
    routeId: string | null
    departureTime: Date | null
    availableSeats: number | null
    totalSeats: number | null
    status: string | null
    actualDeparture: Date | null
    syncedAt: Date | null
  }

  export type VehicleScheduleCountAggregateOutputType = {
    id: number
    vehicleId: number
    routeId: number
    departureTime: number
    availableSeats: number
    totalSeats: number
    status: number
    actualDeparture: number
    syncedAt: number
    _all: number
  }


  export type VehicleScheduleAvgAggregateInputType = {
    availableSeats?: true
    totalSeats?: true
  }

  export type VehicleScheduleSumAggregateInputType = {
    availableSeats?: true
    totalSeats?: true
  }

  export type VehicleScheduleMinAggregateInputType = {
    id?: true
    vehicleId?: true
    routeId?: true
    departureTime?: true
    availableSeats?: true
    totalSeats?: true
    status?: true
    actualDeparture?: true
    syncedAt?: true
  }

  export type VehicleScheduleMaxAggregateInputType = {
    id?: true
    vehicleId?: true
    routeId?: true
    departureTime?: true
    availableSeats?: true
    totalSeats?: true
    status?: true
    actualDeparture?: true
    syncedAt?: true
  }

  export type VehicleScheduleCountAggregateInputType = {
    id?: true
    vehicleId?: true
    routeId?: true
    departureTime?: true
    availableSeats?: true
    totalSeats?: true
    status?: true
    actualDeparture?: true
    syncedAt?: true
    _all?: true
  }

  export type VehicleScheduleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VehicleSchedule to aggregate.
     */
    where?: VehicleScheduleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VehicleSchedules to fetch.
     */
    orderBy?: VehicleScheduleOrderByWithRelationInput | VehicleScheduleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VehicleScheduleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VehicleSchedules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VehicleSchedules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VehicleSchedules
    **/
    _count?: true | VehicleScheduleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VehicleScheduleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VehicleScheduleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VehicleScheduleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VehicleScheduleMaxAggregateInputType
  }

  export type GetVehicleScheduleAggregateType<T extends VehicleScheduleAggregateArgs> = {
        [P in keyof T & keyof AggregateVehicleSchedule]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVehicleSchedule[P]>
      : GetScalarType<T[P], AggregateVehicleSchedule[P]>
  }




  export type VehicleScheduleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VehicleScheduleWhereInput
    orderBy?: VehicleScheduleOrderByWithAggregationInput | VehicleScheduleOrderByWithAggregationInput[]
    by: VehicleScheduleScalarFieldEnum[] | VehicleScheduleScalarFieldEnum
    having?: VehicleScheduleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VehicleScheduleCountAggregateInputType | true
    _avg?: VehicleScheduleAvgAggregateInputType
    _sum?: VehicleScheduleSumAggregateInputType
    _min?: VehicleScheduleMinAggregateInputType
    _max?: VehicleScheduleMaxAggregateInputType
  }

  export type VehicleScheduleGroupByOutputType = {
    id: string
    vehicleId: string
    routeId: string
    departureTime: Date
    availableSeats: number
    totalSeats: number
    status: string
    actualDeparture: Date | null
    syncedAt: Date
    _count: VehicleScheduleCountAggregateOutputType | null
    _avg: VehicleScheduleAvgAggregateOutputType | null
    _sum: VehicleScheduleSumAggregateOutputType | null
    _min: VehicleScheduleMinAggregateOutputType | null
    _max: VehicleScheduleMaxAggregateOutputType | null
  }

  type GetVehicleScheduleGroupByPayload<T extends VehicleScheduleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VehicleScheduleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VehicleScheduleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VehicleScheduleGroupByOutputType[P]>
            : GetScalarType<T[P], VehicleScheduleGroupByOutputType[P]>
        }
      >
    >


  export type VehicleScheduleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    vehicleId?: boolean
    routeId?: boolean
    departureTime?: boolean
    availableSeats?: boolean
    totalSeats?: boolean
    status?: boolean
    actualDeparture?: boolean
    syncedAt?: boolean
    route?: boolean | RouteDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vehicleSchedule"]>

  export type VehicleScheduleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    vehicleId?: boolean
    routeId?: boolean
    departureTime?: boolean
    availableSeats?: boolean
    totalSeats?: boolean
    status?: boolean
    actualDeparture?: boolean
    syncedAt?: boolean
    route?: boolean | RouteDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vehicleSchedule"]>

  export type VehicleScheduleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    vehicleId?: boolean
    routeId?: boolean
    departureTime?: boolean
    availableSeats?: boolean
    totalSeats?: boolean
    status?: boolean
    actualDeparture?: boolean
    syncedAt?: boolean
    route?: boolean | RouteDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vehicleSchedule"]>

  export type VehicleScheduleSelectScalar = {
    id?: boolean
    vehicleId?: boolean
    routeId?: boolean
    departureTime?: boolean
    availableSeats?: boolean
    totalSeats?: boolean
    status?: boolean
    actualDeparture?: boolean
    syncedAt?: boolean
  }

  export type VehicleScheduleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "vehicleId" | "routeId" | "departureTime" | "availableSeats" | "totalSeats" | "status" | "actualDeparture" | "syncedAt", ExtArgs["result"]["vehicleSchedule"]>
  export type VehicleScheduleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    route?: boolean | RouteDefaultArgs<ExtArgs>
  }
  export type VehicleScheduleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    route?: boolean | RouteDefaultArgs<ExtArgs>
  }
  export type VehicleScheduleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    route?: boolean | RouteDefaultArgs<ExtArgs>
  }

  export type $VehicleSchedulePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VehicleSchedule"
    objects: {
      route: Prisma.$RoutePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      vehicleId: string
      routeId: string
      departureTime: Date
      availableSeats: number
      totalSeats: number
      status: string
      actualDeparture: Date | null
      syncedAt: Date
    }, ExtArgs["result"]["vehicleSchedule"]>
    composites: {}
  }

  type VehicleScheduleGetPayload<S extends boolean | null | undefined | VehicleScheduleDefaultArgs> = $Result.GetResult<Prisma.$VehicleSchedulePayload, S>

  type VehicleScheduleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VehicleScheduleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VehicleScheduleCountAggregateInputType | true
    }

  export interface VehicleScheduleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VehicleSchedule'], meta: { name: 'VehicleSchedule' } }
    /**
     * Find zero or one VehicleSchedule that matches the filter.
     * @param {VehicleScheduleFindUniqueArgs} args - Arguments to find a VehicleSchedule
     * @example
     * // Get one VehicleSchedule
     * const vehicleSchedule = await prisma.vehicleSchedule.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VehicleScheduleFindUniqueArgs>(args: SelectSubset<T, VehicleScheduleFindUniqueArgs<ExtArgs>>): Prisma__VehicleScheduleClient<$Result.GetResult<Prisma.$VehicleSchedulePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one VehicleSchedule that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VehicleScheduleFindUniqueOrThrowArgs} args - Arguments to find a VehicleSchedule
     * @example
     * // Get one VehicleSchedule
     * const vehicleSchedule = await prisma.vehicleSchedule.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VehicleScheduleFindUniqueOrThrowArgs>(args: SelectSubset<T, VehicleScheduleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VehicleScheduleClient<$Result.GetResult<Prisma.$VehicleSchedulePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VehicleSchedule that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleScheduleFindFirstArgs} args - Arguments to find a VehicleSchedule
     * @example
     * // Get one VehicleSchedule
     * const vehicleSchedule = await prisma.vehicleSchedule.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VehicleScheduleFindFirstArgs>(args?: SelectSubset<T, VehicleScheduleFindFirstArgs<ExtArgs>>): Prisma__VehicleScheduleClient<$Result.GetResult<Prisma.$VehicleSchedulePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VehicleSchedule that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleScheduleFindFirstOrThrowArgs} args - Arguments to find a VehicleSchedule
     * @example
     * // Get one VehicleSchedule
     * const vehicleSchedule = await prisma.vehicleSchedule.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VehicleScheduleFindFirstOrThrowArgs>(args?: SelectSubset<T, VehicleScheduleFindFirstOrThrowArgs<ExtArgs>>): Prisma__VehicleScheduleClient<$Result.GetResult<Prisma.$VehicleSchedulePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more VehicleSchedules that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleScheduleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VehicleSchedules
     * const vehicleSchedules = await prisma.vehicleSchedule.findMany()
     * 
     * // Get first 10 VehicleSchedules
     * const vehicleSchedules = await prisma.vehicleSchedule.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const vehicleScheduleWithIdOnly = await prisma.vehicleSchedule.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VehicleScheduleFindManyArgs>(args?: SelectSubset<T, VehicleScheduleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VehicleSchedulePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a VehicleSchedule.
     * @param {VehicleScheduleCreateArgs} args - Arguments to create a VehicleSchedule.
     * @example
     * // Create one VehicleSchedule
     * const VehicleSchedule = await prisma.vehicleSchedule.create({
     *   data: {
     *     // ... data to create a VehicleSchedule
     *   }
     * })
     * 
     */
    create<T extends VehicleScheduleCreateArgs>(args: SelectSubset<T, VehicleScheduleCreateArgs<ExtArgs>>): Prisma__VehicleScheduleClient<$Result.GetResult<Prisma.$VehicleSchedulePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many VehicleSchedules.
     * @param {VehicleScheduleCreateManyArgs} args - Arguments to create many VehicleSchedules.
     * @example
     * // Create many VehicleSchedules
     * const vehicleSchedule = await prisma.vehicleSchedule.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VehicleScheduleCreateManyArgs>(args?: SelectSubset<T, VehicleScheduleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many VehicleSchedules and returns the data saved in the database.
     * @param {VehicleScheduleCreateManyAndReturnArgs} args - Arguments to create many VehicleSchedules.
     * @example
     * // Create many VehicleSchedules
     * const vehicleSchedule = await prisma.vehicleSchedule.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many VehicleSchedules and only return the `id`
     * const vehicleScheduleWithIdOnly = await prisma.vehicleSchedule.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VehicleScheduleCreateManyAndReturnArgs>(args?: SelectSubset<T, VehicleScheduleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VehicleSchedulePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a VehicleSchedule.
     * @param {VehicleScheduleDeleteArgs} args - Arguments to delete one VehicleSchedule.
     * @example
     * // Delete one VehicleSchedule
     * const VehicleSchedule = await prisma.vehicleSchedule.delete({
     *   where: {
     *     // ... filter to delete one VehicleSchedule
     *   }
     * })
     * 
     */
    delete<T extends VehicleScheduleDeleteArgs>(args: SelectSubset<T, VehicleScheduleDeleteArgs<ExtArgs>>): Prisma__VehicleScheduleClient<$Result.GetResult<Prisma.$VehicleSchedulePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one VehicleSchedule.
     * @param {VehicleScheduleUpdateArgs} args - Arguments to update one VehicleSchedule.
     * @example
     * // Update one VehicleSchedule
     * const vehicleSchedule = await prisma.vehicleSchedule.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VehicleScheduleUpdateArgs>(args: SelectSubset<T, VehicleScheduleUpdateArgs<ExtArgs>>): Prisma__VehicleScheduleClient<$Result.GetResult<Prisma.$VehicleSchedulePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more VehicleSchedules.
     * @param {VehicleScheduleDeleteManyArgs} args - Arguments to filter VehicleSchedules to delete.
     * @example
     * // Delete a few VehicleSchedules
     * const { count } = await prisma.vehicleSchedule.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VehicleScheduleDeleteManyArgs>(args?: SelectSubset<T, VehicleScheduleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VehicleSchedules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleScheduleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VehicleSchedules
     * const vehicleSchedule = await prisma.vehicleSchedule.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VehicleScheduleUpdateManyArgs>(args: SelectSubset<T, VehicleScheduleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VehicleSchedules and returns the data updated in the database.
     * @param {VehicleScheduleUpdateManyAndReturnArgs} args - Arguments to update many VehicleSchedules.
     * @example
     * // Update many VehicleSchedules
     * const vehicleSchedule = await prisma.vehicleSchedule.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more VehicleSchedules and only return the `id`
     * const vehicleScheduleWithIdOnly = await prisma.vehicleSchedule.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VehicleScheduleUpdateManyAndReturnArgs>(args: SelectSubset<T, VehicleScheduleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VehicleSchedulePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one VehicleSchedule.
     * @param {VehicleScheduleUpsertArgs} args - Arguments to update or create a VehicleSchedule.
     * @example
     * // Update or create a VehicleSchedule
     * const vehicleSchedule = await prisma.vehicleSchedule.upsert({
     *   create: {
     *     // ... data to create a VehicleSchedule
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VehicleSchedule we want to update
     *   }
     * })
     */
    upsert<T extends VehicleScheduleUpsertArgs>(args: SelectSubset<T, VehicleScheduleUpsertArgs<ExtArgs>>): Prisma__VehicleScheduleClient<$Result.GetResult<Prisma.$VehicleSchedulePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of VehicleSchedules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleScheduleCountArgs} args - Arguments to filter VehicleSchedules to count.
     * @example
     * // Count the number of VehicleSchedules
     * const count = await prisma.vehicleSchedule.count({
     *   where: {
     *     // ... the filter for the VehicleSchedules we want to count
     *   }
     * })
    **/
    count<T extends VehicleScheduleCountArgs>(
      args?: Subset<T, VehicleScheduleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VehicleScheduleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VehicleSchedule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleScheduleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VehicleScheduleAggregateArgs>(args: Subset<T, VehicleScheduleAggregateArgs>): Prisma.PrismaPromise<GetVehicleScheduleAggregateType<T>>

    /**
     * Group by VehicleSchedule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleScheduleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VehicleScheduleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VehicleScheduleGroupByArgs['orderBy'] }
        : { orderBy?: VehicleScheduleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VehicleScheduleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVehicleScheduleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VehicleSchedule model
   */
  readonly fields: VehicleScheduleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VehicleSchedule.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VehicleScheduleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    route<T extends RouteDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RouteDefaultArgs<ExtArgs>>): Prisma__RouteClient<$Result.GetResult<Prisma.$RoutePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the VehicleSchedule model
   */
  interface VehicleScheduleFieldRefs {
    readonly id: FieldRef<"VehicleSchedule", 'String'>
    readonly vehicleId: FieldRef<"VehicleSchedule", 'String'>
    readonly routeId: FieldRef<"VehicleSchedule", 'String'>
    readonly departureTime: FieldRef<"VehicleSchedule", 'DateTime'>
    readonly availableSeats: FieldRef<"VehicleSchedule", 'Int'>
    readonly totalSeats: FieldRef<"VehicleSchedule", 'Int'>
    readonly status: FieldRef<"VehicleSchedule", 'String'>
    readonly actualDeparture: FieldRef<"VehicleSchedule", 'DateTime'>
    readonly syncedAt: FieldRef<"VehicleSchedule", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * VehicleSchedule findUnique
   */
  export type VehicleScheduleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleSchedule
     */
    select?: VehicleScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleSchedule
     */
    omit?: VehicleScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleScheduleInclude<ExtArgs> | null
    /**
     * Filter, which VehicleSchedule to fetch.
     */
    where: VehicleScheduleWhereUniqueInput
  }

  /**
   * VehicleSchedule findUniqueOrThrow
   */
  export type VehicleScheduleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleSchedule
     */
    select?: VehicleScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleSchedule
     */
    omit?: VehicleScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleScheduleInclude<ExtArgs> | null
    /**
     * Filter, which VehicleSchedule to fetch.
     */
    where: VehicleScheduleWhereUniqueInput
  }

  /**
   * VehicleSchedule findFirst
   */
  export type VehicleScheduleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleSchedule
     */
    select?: VehicleScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleSchedule
     */
    omit?: VehicleScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleScheduleInclude<ExtArgs> | null
    /**
     * Filter, which VehicleSchedule to fetch.
     */
    where?: VehicleScheduleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VehicleSchedules to fetch.
     */
    orderBy?: VehicleScheduleOrderByWithRelationInput | VehicleScheduleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VehicleSchedules.
     */
    cursor?: VehicleScheduleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VehicleSchedules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VehicleSchedules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VehicleSchedules.
     */
    distinct?: VehicleScheduleScalarFieldEnum | VehicleScheduleScalarFieldEnum[]
  }

  /**
   * VehicleSchedule findFirstOrThrow
   */
  export type VehicleScheduleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleSchedule
     */
    select?: VehicleScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleSchedule
     */
    omit?: VehicleScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleScheduleInclude<ExtArgs> | null
    /**
     * Filter, which VehicleSchedule to fetch.
     */
    where?: VehicleScheduleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VehicleSchedules to fetch.
     */
    orderBy?: VehicleScheduleOrderByWithRelationInput | VehicleScheduleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VehicleSchedules.
     */
    cursor?: VehicleScheduleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VehicleSchedules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VehicleSchedules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VehicleSchedules.
     */
    distinct?: VehicleScheduleScalarFieldEnum | VehicleScheduleScalarFieldEnum[]
  }

  /**
   * VehicleSchedule findMany
   */
  export type VehicleScheduleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleSchedule
     */
    select?: VehicleScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleSchedule
     */
    omit?: VehicleScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleScheduleInclude<ExtArgs> | null
    /**
     * Filter, which VehicleSchedules to fetch.
     */
    where?: VehicleScheduleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VehicleSchedules to fetch.
     */
    orderBy?: VehicleScheduleOrderByWithRelationInput | VehicleScheduleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VehicleSchedules.
     */
    cursor?: VehicleScheduleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VehicleSchedules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VehicleSchedules.
     */
    skip?: number
    distinct?: VehicleScheduleScalarFieldEnum | VehicleScheduleScalarFieldEnum[]
  }

  /**
   * VehicleSchedule create
   */
  export type VehicleScheduleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleSchedule
     */
    select?: VehicleScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleSchedule
     */
    omit?: VehicleScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleScheduleInclude<ExtArgs> | null
    /**
     * The data needed to create a VehicleSchedule.
     */
    data: XOR<VehicleScheduleCreateInput, VehicleScheduleUncheckedCreateInput>
  }

  /**
   * VehicleSchedule createMany
   */
  export type VehicleScheduleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VehicleSchedules.
     */
    data: VehicleScheduleCreateManyInput | VehicleScheduleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VehicleSchedule createManyAndReturn
   */
  export type VehicleScheduleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleSchedule
     */
    select?: VehicleScheduleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleSchedule
     */
    omit?: VehicleScheduleOmit<ExtArgs> | null
    /**
     * The data used to create many VehicleSchedules.
     */
    data: VehicleScheduleCreateManyInput | VehicleScheduleCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleScheduleIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * VehicleSchedule update
   */
  export type VehicleScheduleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleSchedule
     */
    select?: VehicleScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleSchedule
     */
    omit?: VehicleScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleScheduleInclude<ExtArgs> | null
    /**
     * The data needed to update a VehicleSchedule.
     */
    data: XOR<VehicleScheduleUpdateInput, VehicleScheduleUncheckedUpdateInput>
    /**
     * Choose, which VehicleSchedule to update.
     */
    where: VehicleScheduleWhereUniqueInput
  }

  /**
   * VehicleSchedule updateMany
   */
  export type VehicleScheduleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VehicleSchedules.
     */
    data: XOR<VehicleScheduleUpdateManyMutationInput, VehicleScheduleUncheckedUpdateManyInput>
    /**
     * Filter which VehicleSchedules to update
     */
    where?: VehicleScheduleWhereInput
    /**
     * Limit how many VehicleSchedules to update.
     */
    limit?: number
  }

  /**
   * VehicleSchedule updateManyAndReturn
   */
  export type VehicleScheduleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleSchedule
     */
    select?: VehicleScheduleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleSchedule
     */
    omit?: VehicleScheduleOmit<ExtArgs> | null
    /**
     * The data used to update VehicleSchedules.
     */
    data: XOR<VehicleScheduleUpdateManyMutationInput, VehicleScheduleUncheckedUpdateManyInput>
    /**
     * Filter which VehicleSchedules to update
     */
    where?: VehicleScheduleWhereInput
    /**
     * Limit how many VehicleSchedules to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleScheduleIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * VehicleSchedule upsert
   */
  export type VehicleScheduleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleSchedule
     */
    select?: VehicleScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleSchedule
     */
    omit?: VehicleScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleScheduleInclude<ExtArgs> | null
    /**
     * The filter to search for the VehicleSchedule to update in case it exists.
     */
    where: VehicleScheduleWhereUniqueInput
    /**
     * In case the VehicleSchedule found by the `where` argument doesn't exist, create a new VehicleSchedule with this data.
     */
    create: XOR<VehicleScheduleCreateInput, VehicleScheduleUncheckedCreateInput>
    /**
     * In case the VehicleSchedule was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VehicleScheduleUpdateInput, VehicleScheduleUncheckedUpdateInput>
  }

  /**
   * VehicleSchedule delete
   */
  export type VehicleScheduleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleSchedule
     */
    select?: VehicleScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleSchedule
     */
    omit?: VehicleScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleScheduleInclude<ExtArgs> | null
    /**
     * Filter which VehicleSchedule to delete.
     */
    where: VehicleScheduleWhereUniqueInput
  }

  /**
   * VehicleSchedule deleteMany
   */
  export type VehicleScheduleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VehicleSchedules to delete
     */
    where?: VehicleScheduleWhereInput
    /**
     * Limit how many VehicleSchedules to delete.
     */
    limit?: number
  }

  /**
   * VehicleSchedule without action
   */
  export type VehicleScheduleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleSchedule
     */
    select?: VehicleScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VehicleSchedule
     */
    omit?: VehicleScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleScheduleInclude<ExtArgs> | null
  }


  /**
   * Model Booking
   */

  export type AggregateBooking = {
    _count: BookingCountAggregateOutputType | null
    _avg: BookingAvgAggregateOutputType | null
    _sum: BookingSumAggregateOutputType | null
    _min: BookingMinAggregateOutputType | null
    _max: BookingMaxAggregateOutputType | null
  }

  export type BookingAvgAggregateOutputType = {
    seatsBooked: number | null
    totalAmount: number | null
  }

  export type BookingSumAggregateOutputType = {
    seatsBooked: number | null
    totalAmount: number | null
  }

  export type BookingMinAggregateOutputType = {
    id: string | null
    queueId: string | null
    seatsBooked: number | null
    totalAmount: number | null
    bookingSource: string | null
    bookingType: string | null
    customerName: string | null
    customerPhone: string | null
    onlineTicketId: string | null
    paymentStatus: string | null
    paymentMethod: string | null
    verificationCode: string | null
    qrCode: string | null
    isVerified: boolean | null
    verifiedAt: Date | null
    verifiedById: string | null
    createdOffline: boolean | null
    localId: string | null
    createdBy: string | null
    createdAt: Date | null
    syncStatus: string | null
  }

  export type BookingMaxAggregateOutputType = {
    id: string | null
    queueId: string | null
    seatsBooked: number | null
    totalAmount: number | null
    bookingSource: string | null
    bookingType: string | null
    customerName: string | null
    customerPhone: string | null
    onlineTicketId: string | null
    paymentStatus: string | null
    paymentMethod: string | null
    verificationCode: string | null
    qrCode: string | null
    isVerified: boolean | null
    verifiedAt: Date | null
    verifiedById: string | null
    createdOffline: boolean | null
    localId: string | null
    createdBy: string | null
    createdAt: Date | null
    syncStatus: string | null
  }

  export type BookingCountAggregateOutputType = {
    id: number
    queueId: number
    seatsBooked: number
    totalAmount: number
    bookingSource: number
    bookingType: number
    customerName: number
    customerPhone: number
    onlineTicketId: number
    paymentStatus: number
    paymentMethod: number
    verificationCode: number
    qrCode: number
    isVerified: number
    verifiedAt: number
    verifiedById: number
    createdOffline: number
    localId: number
    createdBy: number
    createdAt: number
    syncStatus: number
    _all: number
  }


  export type BookingAvgAggregateInputType = {
    seatsBooked?: true
    totalAmount?: true
  }

  export type BookingSumAggregateInputType = {
    seatsBooked?: true
    totalAmount?: true
  }

  export type BookingMinAggregateInputType = {
    id?: true
    queueId?: true
    seatsBooked?: true
    totalAmount?: true
    bookingSource?: true
    bookingType?: true
    customerName?: true
    customerPhone?: true
    onlineTicketId?: true
    paymentStatus?: true
    paymentMethod?: true
    verificationCode?: true
    qrCode?: true
    isVerified?: true
    verifiedAt?: true
    verifiedById?: true
    createdOffline?: true
    localId?: true
    createdBy?: true
    createdAt?: true
    syncStatus?: true
  }

  export type BookingMaxAggregateInputType = {
    id?: true
    queueId?: true
    seatsBooked?: true
    totalAmount?: true
    bookingSource?: true
    bookingType?: true
    customerName?: true
    customerPhone?: true
    onlineTicketId?: true
    paymentStatus?: true
    paymentMethod?: true
    verificationCode?: true
    qrCode?: true
    isVerified?: true
    verifiedAt?: true
    verifiedById?: true
    createdOffline?: true
    localId?: true
    createdBy?: true
    createdAt?: true
    syncStatus?: true
  }

  export type BookingCountAggregateInputType = {
    id?: true
    queueId?: true
    seatsBooked?: true
    totalAmount?: true
    bookingSource?: true
    bookingType?: true
    customerName?: true
    customerPhone?: true
    onlineTicketId?: true
    paymentStatus?: true
    paymentMethod?: true
    verificationCode?: true
    qrCode?: true
    isVerified?: true
    verifiedAt?: true
    verifiedById?: true
    createdOffline?: true
    localId?: true
    createdBy?: true
    createdAt?: true
    syncStatus?: true
    _all?: true
  }

  export type BookingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Booking to aggregate.
     */
    where?: BookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookings to fetch.
     */
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Bookings
    **/
    _count?: true | BookingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BookingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BookingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BookingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BookingMaxAggregateInputType
  }

  export type GetBookingAggregateType<T extends BookingAggregateArgs> = {
        [P in keyof T & keyof AggregateBooking]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBooking[P]>
      : GetScalarType<T[P], AggregateBooking[P]>
  }




  export type BookingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookingWhereInput
    orderBy?: BookingOrderByWithAggregationInput | BookingOrderByWithAggregationInput[]
    by: BookingScalarFieldEnum[] | BookingScalarFieldEnum
    having?: BookingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BookingCountAggregateInputType | true
    _avg?: BookingAvgAggregateInputType
    _sum?: BookingSumAggregateInputType
    _min?: BookingMinAggregateInputType
    _max?: BookingMaxAggregateInputType
  }

  export type BookingGroupByOutputType = {
    id: string
    queueId: string
    seatsBooked: number
    totalAmount: number
    bookingSource: string
    bookingType: string
    customerName: string | null
    customerPhone: string | null
    onlineTicketId: string | null
    paymentStatus: string
    paymentMethod: string
    verificationCode: string
    qrCode: string | null
    isVerified: boolean
    verifiedAt: Date | null
    verifiedById: string | null
    createdOffline: boolean
    localId: string | null
    createdBy: string | null
    createdAt: Date
    syncStatus: string
    _count: BookingCountAggregateOutputType | null
    _avg: BookingAvgAggregateOutputType | null
    _sum: BookingSumAggregateOutputType | null
    _min: BookingMinAggregateOutputType | null
    _max: BookingMaxAggregateOutputType | null
  }

  type GetBookingGroupByPayload<T extends BookingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BookingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BookingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BookingGroupByOutputType[P]>
            : GetScalarType<T[P], BookingGroupByOutputType[P]>
        }
      >
    >


  export type BookingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    queueId?: boolean
    seatsBooked?: boolean
    totalAmount?: boolean
    bookingSource?: boolean
    bookingType?: boolean
    customerName?: boolean
    customerPhone?: boolean
    onlineTicketId?: boolean
    paymentStatus?: boolean
    paymentMethod?: boolean
    verificationCode?: boolean
    qrCode?: boolean
    isVerified?: boolean
    verifiedAt?: boolean
    verifiedById?: boolean
    createdOffline?: boolean
    localId?: boolean
    createdBy?: boolean
    createdAt?: boolean
    syncStatus?: boolean
    queue?: boolean | VehicleQueueDefaultArgs<ExtArgs>
    createdByStaff?: boolean | Booking$createdByStaffArgs<ExtArgs>
    verifiedByStaff?: boolean | Booking$verifiedByStaffArgs<ExtArgs>
  }, ExtArgs["result"]["booking"]>

  export type BookingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    queueId?: boolean
    seatsBooked?: boolean
    totalAmount?: boolean
    bookingSource?: boolean
    bookingType?: boolean
    customerName?: boolean
    customerPhone?: boolean
    onlineTicketId?: boolean
    paymentStatus?: boolean
    paymentMethod?: boolean
    verificationCode?: boolean
    qrCode?: boolean
    isVerified?: boolean
    verifiedAt?: boolean
    verifiedById?: boolean
    createdOffline?: boolean
    localId?: boolean
    createdBy?: boolean
    createdAt?: boolean
    syncStatus?: boolean
    queue?: boolean | VehicleQueueDefaultArgs<ExtArgs>
    createdByStaff?: boolean | Booking$createdByStaffArgs<ExtArgs>
    verifiedByStaff?: boolean | Booking$verifiedByStaffArgs<ExtArgs>
  }, ExtArgs["result"]["booking"]>

  export type BookingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    queueId?: boolean
    seatsBooked?: boolean
    totalAmount?: boolean
    bookingSource?: boolean
    bookingType?: boolean
    customerName?: boolean
    customerPhone?: boolean
    onlineTicketId?: boolean
    paymentStatus?: boolean
    paymentMethod?: boolean
    verificationCode?: boolean
    qrCode?: boolean
    isVerified?: boolean
    verifiedAt?: boolean
    verifiedById?: boolean
    createdOffline?: boolean
    localId?: boolean
    createdBy?: boolean
    createdAt?: boolean
    syncStatus?: boolean
    queue?: boolean | VehicleQueueDefaultArgs<ExtArgs>
    createdByStaff?: boolean | Booking$createdByStaffArgs<ExtArgs>
    verifiedByStaff?: boolean | Booking$verifiedByStaffArgs<ExtArgs>
  }, ExtArgs["result"]["booking"]>

  export type BookingSelectScalar = {
    id?: boolean
    queueId?: boolean
    seatsBooked?: boolean
    totalAmount?: boolean
    bookingSource?: boolean
    bookingType?: boolean
    customerName?: boolean
    customerPhone?: boolean
    onlineTicketId?: boolean
    paymentStatus?: boolean
    paymentMethod?: boolean
    verificationCode?: boolean
    qrCode?: boolean
    isVerified?: boolean
    verifiedAt?: boolean
    verifiedById?: boolean
    createdOffline?: boolean
    localId?: boolean
    createdBy?: boolean
    createdAt?: boolean
    syncStatus?: boolean
  }

  export type BookingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "queueId" | "seatsBooked" | "totalAmount" | "bookingSource" | "bookingType" | "customerName" | "customerPhone" | "onlineTicketId" | "paymentStatus" | "paymentMethod" | "verificationCode" | "qrCode" | "isVerified" | "verifiedAt" | "verifiedById" | "createdOffline" | "localId" | "createdBy" | "createdAt" | "syncStatus", ExtArgs["result"]["booking"]>
  export type BookingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    queue?: boolean | VehicleQueueDefaultArgs<ExtArgs>
    createdByStaff?: boolean | Booking$createdByStaffArgs<ExtArgs>
    verifiedByStaff?: boolean | Booking$verifiedByStaffArgs<ExtArgs>
  }
  export type BookingIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    queue?: boolean | VehicleQueueDefaultArgs<ExtArgs>
    createdByStaff?: boolean | Booking$createdByStaffArgs<ExtArgs>
    verifiedByStaff?: boolean | Booking$verifiedByStaffArgs<ExtArgs>
  }
  export type BookingIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    queue?: boolean | VehicleQueueDefaultArgs<ExtArgs>
    createdByStaff?: boolean | Booking$createdByStaffArgs<ExtArgs>
    verifiedByStaff?: boolean | Booking$verifiedByStaffArgs<ExtArgs>
  }

  export type $BookingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Booking"
    objects: {
      queue: Prisma.$VehicleQueuePayload<ExtArgs>
      createdByStaff: Prisma.$StaffPayload<ExtArgs> | null
      verifiedByStaff: Prisma.$StaffPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      queueId: string
      seatsBooked: number
      totalAmount: number
      bookingSource: string
      bookingType: string
      customerName: string | null
      customerPhone: string | null
      onlineTicketId: string | null
      paymentStatus: string
      paymentMethod: string
      verificationCode: string
      qrCode: string | null
      isVerified: boolean
      verifiedAt: Date | null
      verifiedById: string | null
      createdOffline: boolean
      localId: string | null
      createdBy: string | null
      createdAt: Date
      syncStatus: string
    }, ExtArgs["result"]["booking"]>
    composites: {}
  }

  type BookingGetPayload<S extends boolean | null | undefined | BookingDefaultArgs> = $Result.GetResult<Prisma.$BookingPayload, S>

  type BookingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BookingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BookingCountAggregateInputType | true
    }

  export interface BookingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Booking'], meta: { name: 'Booking' } }
    /**
     * Find zero or one Booking that matches the filter.
     * @param {BookingFindUniqueArgs} args - Arguments to find a Booking
     * @example
     * // Get one Booking
     * const booking = await prisma.booking.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BookingFindUniqueArgs>(args: SelectSubset<T, BookingFindUniqueArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Booking that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BookingFindUniqueOrThrowArgs} args - Arguments to find a Booking
     * @example
     * // Get one Booking
     * const booking = await prisma.booking.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BookingFindUniqueOrThrowArgs>(args: SelectSubset<T, BookingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Booking that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingFindFirstArgs} args - Arguments to find a Booking
     * @example
     * // Get one Booking
     * const booking = await prisma.booking.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BookingFindFirstArgs>(args?: SelectSubset<T, BookingFindFirstArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Booking that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingFindFirstOrThrowArgs} args - Arguments to find a Booking
     * @example
     * // Get one Booking
     * const booking = await prisma.booking.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BookingFindFirstOrThrowArgs>(args?: SelectSubset<T, BookingFindFirstOrThrowArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Bookings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Bookings
     * const bookings = await prisma.booking.findMany()
     * 
     * // Get first 10 Bookings
     * const bookings = await prisma.booking.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const bookingWithIdOnly = await prisma.booking.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BookingFindManyArgs>(args?: SelectSubset<T, BookingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Booking.
     * @param {BookingCreateArgs} args - Arguments to create a Booking.
     * @example
     * // Create one Booking
     * const Booking = await prisma.booking.create({
     *   data: {
     *     // ... data to create a Booking
     *   }
     * })
     * 
     */
    create<T extends BookingCreateArgs>(args: SelectSubset<T, BookingCreateArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Bookings.
     * @param {BookingCreateManyArgs} args - Arguments to create many Bookings.
     * @example
     * // Create many Bookings
     * const booking = await prisma.booking.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BookingCreateManyArgs>(args?: SelectSubset<T, BookingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Bookings and returns the data saved in the database.
     * @param {BookingCreateManyAndReturnArgs} args - Arguments to create many Bookings.
     * @example
     * // Create many Bookings
     * const booking = await prisma.booking.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Bookings and only return the `id`
     * const bookingWithIdOnly = await prisma.booking.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BookingCreateManyAndReturnArgs>(args?: SelectSubset<T, BookingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Booking.
     * @param {BookingDeleteArgs} args - Arguments to delete one Booking.
     * @example
     * // Delete one Booking
     * const Booking = await prisma.booking.delete({
     *   where: {
     *     // ... filter to delete one Booking
     *   }
     * })
     * 
     */
    delete<T extends BookingDeleteArgs>(args: SelectSubset<T, BookingDeleteArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Booking.
     * @param {BookingUpdateArgs} args - Arguments to update one Booking.
     * @example
     * // Update one Booking
     * const booking = await prisma.booking.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BookingUpdateArgs>(args: SelectSubset<T, BookingUpdateArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Bookings.
     * @param {BookingDeleteManyArgs} args - Arguments to filter Bookings to delete.
     * @example
     * // Delete a few Bookings
     * const { count } = await prisma.booking.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BookingDeleteManyArgs>(args?: SelectSubset<T, BookingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bookings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Bookings
     * const booking = await prisma.booking.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BookingUpdateManyArgs>(args: SelectSubset<T, BookingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bookings and returns the data updated in the database.
     * @param {BookingUpdateManyAndReturnArgs} args - Arguments to update many Bookings.
     * @example
     * // Update many Bookings
     * const booking = await prisma.booking.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Bookings and only return the `id`
     * const bookingWithIdOnly = await prisma.booking.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BookingUpdateManyAndReturnArgs>(args: SelectSubset<T, BookingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Booking.
     * @param {BookingUpsertArgs} args - Arguments to update or create a Booking.
     * @example
     * // Update or create a Booking
     * const booking = await prisma.booking.upsert({
     *   create: {
     *     // ... data to create a Booking
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Booking we want to update
     *   }
     * })
     */
    upsert<T extends BookingUpsertArgs>(args: SelectSubset<T, BookingUpsertArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Bookings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingCountArgs} args - Arguments to filter Bookings to count.
     * @example
     * // Count the number of Bookings
     * const count = await prisma.booking.count({
     *   where: {
     *     // ... the filter for the Bookings we want to count
     *   }
     * })
    **/
    count<T extends BookingCountArgs>(
      args?: Subset<T, BookingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BookingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Booking.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BookingAggregateArgs>(args: Subset<T, BookingAggregateArgs>): Prisma.PrismaPromise<GetBookingAggregateType<T>>

    /**
     * Group by Booking.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BookingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BookingGroupByArgs['orderBy'] }
        : { orderBy?: BookingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BookingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBookingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Booking model
   */
  readonly fields: BookingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Booking.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BookingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    queue<T extends VehicleQueueDefaultArgs<ExtArgs> = {}>(args?: Subset<T, VehicleQueueDefaultArgs<ExtArgs>>): Prisma__VehicleQueueClient<$Result.GetResult<Prisma.$VehicleQueuePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    createdByStaff<T extends Booking$createdByStaffArgs<ExtArgs> = {}>(args?: Subset<T, Booking$createdByStaffArgs<ExtArgs>>): Prisma__StaffClient<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    verifiedByStaff<T extends Booking$verifiedByStaffArgs<ExtArgs> = {}>(args?: Subset<T, Booking$verifiedByStaffArgs<ExtArgs>>): Prisma__StaffClient<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Booking model
   */
  interface BookingFieldRefs {
    readonly id: FieldRef<"Booking", 'String'>
    readonly queueId: FieldRef<"Booking", 'String'>
    readonly seatsBooked: FieldRef<"Booking", 'Int'>
    readonly totalAmount: FieldRef<"Booking", 'Float'>
    readonly bookingSource: FieldRef<"Booking", 'String'>
    readonly bookingType: FieldRef<"Booking", 'String'>
    readonly customerName: FieldRef<"Booking", 'String'>
    readonly customerPhone: FieldRef<"Booking", 'String'>
    readonly onlineTicketId: FieldRef<"Booking", 'String'>
    readonly paymentStatus: FieldRef<"Booking", 'String'>
    readonly paymentMethod: FieldRef<"Booking", 'String'>
    readonly verificationCode: FieldRef<"Booking", 'String'>
    readonly qrCode: FieldRef<"Booking", 'String'>
    readonly isVerified: FieldRef<"Booking", 'Boolean'>
    readonly verifiedAt: FieldRef<"Booking", 'DateTime'>
    readonly verifiedById: FieldRef<"Booking", 'String'>
    readonly createdOffline: FieldRef<"Booking", 'Boolean'>
    readonly localId: FieldRef<"Booking", 'String'>
    readonly createdBy: FieldRef<"Booking", 'String'>
    readonly createdAt: FieldRef<"Booking", 'DateTime'>
    readonly syncStatus: FieldRef<"Booking", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Booking findUnique
   */
  export type BookingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter, which Booking to fetch.
     */
    where: BookingWhereUniqueInput
  }

  /**
   * Booking findUniqueOrThrow
   */
  export type BookingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter, which Booking to fetch.
     */
    where: BookingWhereUniqueInput
  }

  /**
   * Booking findFirst
   */
  export type BookingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter, which Booking to fetch.
     */
    where?: BookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookings to fetch.
     */
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Bookings.
     */
    cursor?: BookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bookings.
     */
    distinct?: BookingScalarFieldEnum | BookingScalarFieldEnum[]
  }

  /**
   * Booking findFirstOrThrow
   */
  export type BookingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter, which Booking to fetch.
     */
    where?: BookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookings to fetch.
     */
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Bookings.
     */
    cursor?: BookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bookings.
     */
    distinct?: BookingScalarFieldEnum | BookingScalarFieldEnum[]
  }

  /**
   * Booking findMany
   */
  export type BookingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter, which Bookings to fetch.
     */
    where?: BookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookings to fetch.
     */
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Bookings.
     */
    cursor?: BookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookings.
     */
    skip?: number
    distinct?: BookingScalarFieldEnum | BookingScalarFieldEnum[]
  }

  /**
   * Booking create
   */
  export type BookingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * The data needed to create a Booking.
     */
    data: XOR<BookingCreateInput, BookingUncheckedCreateInput>
  }

  /**
   * Booking createMany
   */
  export type BookingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Bookings.
     */
    data: BookingCreateManyInput | BookingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Booking createManyAndReturn
   */
  export type BookingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * The data used to create many Bookings.
     */
    data: BookingCreateManyInput | BookingCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Booking update
   */
  export type BookingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * The data needed to update a Booking.
     */
    data: XOR<BookingUpdateInput, BookingUncheckedUpdateInput>
    /**
     * Choose, which Booking to update.
     */
    where: BookingWhereUniqueInput
  }

  /**
   * Booking updateMany
   */
  export type BookingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Bookings.
     */
    data: XOR<BookingUpdateManyMutationInput, BookingUncheckedUpdateManyInput>
    /**
     * Filter which Bookings to update
     */
    where?: BookingWhereInput
    /**
     * Limit how many Bookings to update.
     */
    limit?: number
  }

  /**
   * Booking updateManyAndReturn
   */
  export type BookingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * The data used to update Bookings.
     */
    data: XOR<BookingUpdateManyMutationInput, BookingUncheckedUpdateManyInput>
    /**
     * Filter which Bookings to update
     */
    where?: BookingWhereInput
    /**
     * Limit how many Bookings to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Booking upsert
   */
  export type BookingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * The filter to search for the Booking to update in case it exists.
     */
    where: BookingWhereUniqueInput
    /**
     * In case the Booking found by the `where` argument doesn't exist, create a new Booking with this data.
     */
    create: XOR<BookingCreateInput, BookingUncheckedCreateInput>
    /**
     * In case the Booking was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BookingUpdateInput, BookingUncheckedUpdateInput>
  }

  /**
   * Booking delete
   */
  export type BookingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter which Booking to delete.
     */
    where: BookingWhereUniqueInput
  }

  /**
   * Booking deleteMany
   */
  export type BookingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Bookings to delete
     */
    where?: BookingWhereInput
    /**
     * Limit how many Bookings to delete.
     */
    limit?: number
  }

  /**
   * Booking.createdByStaff
   */
  export type Booking$createdByStaffArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Staff
     */
    omit?: StaffOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffInclude<ExtArgs> | null
    where?: StaffWhereInput
  }

  /**
   * Booking.verifiedByStaff
   */
  export type Booking$verifiedByStaffArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Staff
     */
    omit?: StaffOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffInclude<ExtArgs> | null
    where?: StaffWhereInput
  }

  /**
   * Booking without action
   */
  export type BookingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
  }


  /**
   * Model SyncQueue
   */

  export type AggregateSyncQueue = {
    _count: SyncQueueCountAggregateOutputType | null
    _avg: SyncQueueAvgAggregateOutputType | null
    _sum: SyncQueueSumAggregateOutputType | null
    _min: SyncQueueMinAggregateOutputType | null
    _max: SyncQueueMaxAggregateOutputType | null
  }

  export type SyncQueueAvgAggregateOutputType = {
    id: number | null
    retryCount: number | null
  }

  export type SyncQueueSumAggregateOutputType = {
    id: number | null
    retryCount: number | null
  }

  export type SyncQueueMinAggregateOutputType = {
    id: number | null
    tableName: string | null
    recordId: string | null
    operation: string | null
    data: string | null
    syncStatus: string | null
    retryCount: number | null
    error: string | null
    createdAt: Date | null
    lastAttempt: Date | null
  }

  export type SyncQueueMaxAggregateOutputType = {
    id: number | null
    tableName: string | null
    recordId: string | null
    operation: string | null
    data: string | null
    syncStatus: string | null
    retryCount: number | null
    error: string | null
    createdAt: Date | null
    lastAttempt: Date | null
  }

  export type SyncQueueCountAggregateOutputType = {
    id: number
    tableName: number
    recordId: number
    operation: number
    data: number
    syncStatus: number
    retryCount: number
    error: number
    createdAt: number
    lastAttempt: number
    _all: number
  }


  export type SyncQueueAvgAggregateInputType = {
    id?: true
    retryCount?: true
  }

  export type SyncQueueSumAggregateInputType = {
    id?: true
    retryCount?: true
  }

  export type SyncQueueMinAggregateInputType = {
    id?: true
    tableName?: true
    recordId?: true
    operation?: true
    data?: true
    syncStatus?: true
    retryCount?: true
    error?: true
    createdAt?: true
    lastAttempt?: true
  }

  export type SyncQueueMaxAggregateInputType = {
    id?: true
    tableName?: true
    recordId?: true
    operation?: true
    data?: true
    syncStatus?: true
    retryCount?: true
    error?: true
    createdAt?: true
    lastAttempt?: true
  }

  export type SyncQueueCountAggregateInputType = {
    id?: true
    tableName?: true
    recordId?: true
    operation?: true
    data?: true
    syncStatus?: true
    retryCount?: true
    error?: true
    createdAt?: true
    lastAttempt?: true
    _all?: true
  }

  export type SyncQueueAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SyncQueue to aggregate.
     */
    where?: SyncQueueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SyncQueues to fetch.
     */
    orderBy?: SyncQueueOrderByWithRelationInput | SyncQueueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SyncQueueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SyncQueues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SyncQueues.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SyncQueues
    **/
    _count?: true | SyncQueueCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SyncQueueAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SyncQueueSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SyncQueueMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SyncQueueMaxAggregateInputType
  }

  export type GetSyncQueueAggregateType<T extends SyncQueueAggregateArgs> = {
        [P in keyof T & keyof AggregateSyncQueue]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSyncQueue[P]>
      : GetScalarType<T[P], AggregateSyncQueue[P]>
  }




  export type SyncQueueGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SyncQueueWhereInput
    orderBy?: SyncQueueOrderByWithAggregationInput | SyncQueueOrderByWithAggregationInput[]
    by: SyncQueueScalarFieldEnum[] | SyncQueueScalarFieldEnum
    having?: SyncQueueScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SyncQueueCountAggregateInputType | true
    _avg?: SyncQueueAvgAggregateInputType
    _sum?: SyncQueueSumAggregateInputType
    _min?: SyncQueueMinAggregateInputType
    _max?: SyncQueueMaxAggregateInputType
  }

  export type SyncQueueGroupByOutputType = {
    id: number
    tableName: string
    recordId: string
    operation: string
    data: string
    syncStatus: string
    retryCount: number
    error: string | null
    createdAt: Date
    lastAttempt: Date | null
    _count: SyncQueueCountAggregateOutputType | null
    _avg: SyncQueueAvgAggregateOutputType | null
    _sum: SyncQueueSumAggregateOutputType | null
    _min: SyncQueueMinAggregateOutputType | null
    _max: SyncQueueMaxAggregateOutputType | null
  }

  type GetSyncQueueGroupByPayload<T extends SyncQueueGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SyncQueueGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SyncQueueGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SyncQueueGroupByOutputType[P]>
            : GetScalarType<T[P], SyncQueueGroupByOutputType[P]>
        }
      >
    >


  export type SyncQueueSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tableName?: boolean
    recordId?: boolean
    operation?: boolean
    data?: boolean
    syncStatus?: boolean
    retryCount?: boolean
    error?: boolean
    createdAt?: boolean
    lastAttempt?: boolean
  }, ExtArgs["result"]["syncQueue"]>

  export type SyncQueueSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tableName?: boolean
    recordId?: boolean
    operation?: boolean
    data?: boolean
    syncStatus?: boolean
    retryCount?: boolean
    error?: boolean
    createdAt?: boolean
    lastAttempt?: boolean
  }, ExtArgs["result"]["syncQueue"]>

  export type SyncQueueSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tableName?: boolean
    recordId?: boolean
    operation?: boolean
    data?: boolean
    syncStatus?: boolean
    retryCount?: boolean
    error?: boolean
    createdAt?: boolean
    lastAttempt?: boolean
  }, ExtArgs["result"]["syncQueue"]>

  export type SyncQueueSelectScalar = {
    id?: boolean
    tableName?: boolean
    recordId?: boolean
    operation?: boolean
    data?: boolean
    syncStatus?: boolean
    retryCount?: boolean
    error?: boolean
    createdAt?: boolean
    lastAttempt?: boolean
  }

  export type SyncQueueOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tableName" | "recordId" | "operation" | "data" | "syncStatus" | "retryCount" | "error" | "createdAt" | "lastAttempt", ExtArgs["result"]["syncQueue"]>

  export type $SyncQueuePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SyncQueue"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      tableName: string
      recordId: string
      operation: string
      data: string
      syncStatus: string
      retryCount: number
      error: string | null
      createdAt: Date
      lastAttempt: Date | null
    }, ExtArgs["result"]["syncQueue"]>
    composites: {}
  }

  type SyncQueueGetPayload<S extends boolean | null | undefined | SyncQueueDefaultArgs> = $Result.GetResult<Prisma.$SyncQueuePayload, S>

  type SyncQueueCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SyncQueueFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SyncQueueCountAggregateInputType | true
    }

  export interface SyncQueueDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SyncQueue'], meta: { name: 'SyncQueue' } }
    /**
     * Find zero or one SyncQueue that matches the filter.
     * @param {SyncQueueFindUniqueArgs} args - Arguments to find a SyncQueue
     * @example
     * // Get one SyncQueue
     * const syncQueue = await prisma.syncQueue.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SyncQueueFindUniqueArgs>(args: SelectSubset<T, SyncQueueFindUniqueArgs<ExtArgs>>): Prisma__SyncQueueClient<$Result.GetResult<Prisma.$SyncQueuePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SyncQueue that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SyncQueueFindUniqueOrThrowArgs} args - Arguments to find a SyncQueue
     * @example
     * // Get one SyncQueue
     * const syncQueue = await prisma.syncQueue.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SyncQueueFindUniqueOrThrowArgs>(args: SelectSubset<T, SyncQueueFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SyncQueueClient<$Result.GetResult<Prisma.$SyncQueuePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SyncQueue that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncQueueFindFirstArgs} args - Arguments to find a SyncQueue
     * @example
     * // Get one SyncQueue
     * const syncQueue = await prisma.syncQueue.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SyncQueueFindFirstArgs>(args?: SelectSubset<T, SyncQueueFindFirstArgs<ExtArgs>>): Prisma__SyncQueueClient<$Result.GetResult<Prisma.$SyncQueuePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SyncQueue that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncQueueFindFirstOrThrowArgs} args - Arguments to find a SyncQueue
     * @example
     * // Get one SyncQueue
     * const syncQueue = await prisma.syncQueue.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SyncQueueFindFirstOrThrowArgs>(args?: SelectSubset<T, SyncQueueFindFirstOrThrowArgs<ExtArgs>>): Prisma__SyncQueueClient<$Result.GetResult<Prisma.$SyncQueuePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SyncQueues that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncQueueFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SyncQueues
     * const syncQueues = await prisma.syncQueue.findMany()
     * 
     * // Get first 10 SyncQueues
     * const syncQueues = await prisma.syncQueue.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const syncQueueWithIdOnly = await prisma.syncQueue.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SyncQueueFindManyArgs>(args?: SelectSubset<T, SyncQueueFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SyncQueuePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SyncQueue.
     * @param {SyncQueueCreateArgs} args - Arguments to create a SyncQueue.
     * @example
     * // Create one SyncQueue
     * const SyncQueue = await prisma.syncQueue.create({
     *   data: {
     *     // ... data to create a SyncQueue
     *   }
     * })
     * 
     */
    create<T extends SyncQueueCreateArgs>(args: SelectSubset<T, SyncQueueCreateArgs<ExtArgs>>): Prisma__SyncQueueClient<$Result.GetResult<Prisma.$SyncQueuePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SyncQueues.
     * @param {SyncQueueCreateManyArgs} args - Arguments to create many SyncQueues.
     * @example
     * // Create many SyncQueues
     * const syncQueue = await prisma.syncQueue.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SyncQueueCreateManyArgs>(args?: SelectSubset<T, SyncQueueCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SyncQueues and returns the data saved in the database.
     * @param {SyncQueueCreateManyAndReturnArgs} args - Arguments to create many SyncQueues.
     * @example
     * // Create many SyncQueues
     * const syncQueue = await prisma.syncQueue.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SyncQueues and only return the `id`
     * const syncQueueWithIdOnly = await prisma.syncQueue.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SyncQueueCreateManyAndReturnArgs>(args?: SelectSubset<T, SyncQueueCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SyncQueuePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SyncQueue.
     * @param {SyncQueueDeleteArgs} args - Arguments to delete one SyncQueue.
     * @example
     * // Delete one SyncQueue
     * const SyncQueue = await prisma.syncQueue.delete({
     *   where: {
     *     // ... filter to delete one SyncQueue
     *   }
     * })
     * 
     */
    delete<T extends SyncQueueDeleteArgs>(args: SelectSubset<T, SyncQueueDeleteArgs<ExtArgs>>): Prisma__SyncQueueClient<$Result.GetResult<Prisma.$SyncQueuePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SyncQueue.
     * @param {SyncQueueUpdateArgs} args - Arguments to update one SyncQueue.
     * @example
     * // Update one SyncQueue
     * const syncQueue = await prisma.syncQueue.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SyncQueueUpdateArgs>(args: SelectSubset<T, SyncQueueUpdateArgs<ExtArgs>>): Prisma__SyncQueueClient<$Result.GetResult<Prisma.$SyncQueuePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SyncQueues.
     * @param {SyncQueueDeleteManyArgs} args - Arguments to filter SyncQueues to delete.
     * @example
     * // Delete a few SyncQueues
     * const { count } = await prisma.syncQueue.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SyncQueueDeleteManyArgs>(args?: SelectSubset<T, SyncQueueDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SyncQueues.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncQueueUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SyncQueues
     * const syncQueue = await prisma.syncQueue.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SyncQueueUpdateManyArgs>(args: SelectSubset<T, SyncQueueUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SyncQueues and returns the data updated in the database.
     * @param {SyncQueueUpdateManyAndReturnArgs} args - Arguments to update many SyncQueues.
     * @example
     * // Update many SyncQueues
     * const syncQueue = await prisma.syncQueue.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SyncQueues and only return the `id`
     * const syncQueueWithIdOnly = await prisma.syncQueue.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SyncQueueUpdateManyAndReturnArgs>(args: SelectSubset<T, SyncQueueUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SyncQueuePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SyncQueue.
     * @param {SyncQueueUpsertArgs} args - Arguments to update or create a SyncQueue.
     * @example
     * // Update or create a SyncQueue
     * const syncQueue = await prisma.syncQueue.upsert({
     *   create: {
     *     // ... data to create a SyncQueue
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SyncQueue we want to update
     *   }
     * })
     */
    upsert<T extends SyncQueueUpsertArgs>(args: SelectSubset<T, SyncQueueUpsertArgs<ExtArgs>>): Prisma__SyncQueueClient<$Result.GetResult<Prisma.$SyncQueuePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SyncQueues.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncQueueCountArgs} args - Arguments to filter SyncQueues to count.
     * @example
     * // Count the number of SyncQueues
     * const count = await prisma.syncQueue.count({
     *   where: {
     *     // ... the filter for the SyncQueues we want to count
     *   }
     * })
    **/
    count<T extends SyncQueueCountArgs>(
      args?: Subset<T, SyncQueueCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SyncQueueCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SyncQueue.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncQueueAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SyncQueueAggregateArgs>(args: Subset<T, SyncQueueAggregateArgs>): Prisma.PrismaPromise<GetSyncQueueAggregateType<T>>

    /**
     * Group by SyncQueue.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncQueueGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SyncQueueGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SyncQueueGroupByArgs['orderBy'] }
        : { orderBy?: SyncQueueGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SyncQueueGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSyncQueueGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SyncQueue model
   */
  readonly fields: SyncQueueFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SyncQueue.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SyncQueueClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SyncQueue model
   */
  interface SyncQueueFieldRefs {
    readonly id: FieldRef<"SyncQueue", 'Int'>
    readonly tableName: FieldRef<"SyncQueue", 'String'>
    readonly recordId: FieldRef<"SyncQueue", 'String'>
    readonly operation: FieldRef<"SyncQueue", 'String'>
    readonly data: FieldRef<"SyncQueue", 'String'>
    readonly syncStatus: FieldRef<"SyncQueue", 'String'>
    readonly retryCount: FieldRef<"SyncQueue", 'Int'>
    readonly error: FieldRef<"SyncQueue", 'String'>
    readonly createdAt: FieldRef<"SyncQueue", 'DateTime'>
    readonly lastAttempt: FieldRef<"SyncQueue", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SyncQueue findUnique
   */
  export type SyncQueueFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncQueue
     */
    select?: SyncQueueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncQueue
     */
    omit?: SyncQueueOmit<ExtArgs> | null
    /**
     * Filter, which SyncQueue to fetch.
     */
    where: SyncQueueWhereUniqueInput
  }

  /**
   * SyncQueue findUniqueOrThrow
   */
  export type SyncQueueFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncQueue
     */
    select?: SyncQueueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncQueue
     */
    omit?: SyncQueueOmit<ExtArgs> | null
    /**
     * Filter, which SyncQueue to fetch.
     */
    where: SyncQueueWhereUniqueInput
  }

  /**
   * SyncQueue findFirst
   */
  export type SyncQueueFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncQueue
     */
    select?: SyncQueueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncQueue
     */
    omit?: SyncQueueOmit<ExtArgs> | null
    /**
     * Filter, which SyncQueue to fetch.
     */
    where?: SyncQueueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SyncQueues to fetch.
     */
    orderBy?: SyncQueueOrderByWithRelationInput | SyncQueueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SyncQueues.
     */
    cursor?: SyncQueueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SyncQueues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SyncQueues.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SyncQueues.
     */
    distinct?: SyncQueueScalarFieldEnum | SyncQueueScalarFieldEnum[]
  }

  /**
   * SyncQueue findFirstOrThrow
   */
  export type SyncQueueFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncQueue
     */
    select?: SyncQueueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncQueue
     */
    omit?: SyncQueueOmit<ExtArgs> | null
    /**
     * Filter, which SyncQueue to fetch.
     */
    where?: SyncQueueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SyncQueues to fetch.
     */
    orderBy?: SyncQueueOrderByWithRelationInput | SyncQueueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SyncQueues.
     */
    cursor?: SyncQueueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SyncQueues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SyncQueues.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SyncQueues.
     */
    distinct?: SyncQueueScalarFieldEnum | SyncQueueScalarFieldEnum[]
  }

  /**
   * SyncQueue findMany
   */
  export type SyncQueueFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncQueue
     */
    select?: SyncQueueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncQueue
     */
    omit?: SyncQueueOmit<ExtArgs> | null
    /**
     * Filter, which SyncQueues to fetch.
     */
    where?: SyncQueueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SyncQueues to fetch.
     */
    orderBy?: SyncQueueOrderByWithRelationInput | SyncQueueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SyncQueues.
     */
    cursor?: SyncQueueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SyncQueues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SyncQueues.
     */
    skip?: number
    distinct?: SyncQueueScalarFieldEnum | SyncQueueScalarFieldEnum[]
  }

  /**
   * SyncQueue create
   */
  export type SyncQueueCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncQueue
     */
    select?: SyncQueueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncQueue
     */
    omit?: SyncQueueOmit<ExtArgs> | null
    /**
     * The data needed to create a SyncQueue.
     */
    data: XOR<SyncQueueCreateInput, SyncQueueUncheckedCreateInput>
  }

  /**
   * SyncQueue createMany
   */
  export type SyncQueueCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SyncQueues.
     */
    data: SyncQueueCreateManyInput | SyncQueueCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SyncQueue createManyAndReturn
   */
  export type SyncQueueCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncQueue
     */
    select?: SyncQueueSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SyncQueue
     */
    omit?: SyncQueueOmit<ExtArgs> | null
    /**
     * The data used to create many SyncQueues.
     */
    data: SyncQueueCreateManyInput | SyncQueueCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SyncQueue update
   */
  export type SyncQueueUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncQueue
     */
    select?: SyncQueueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncQueue
     */
    omit?: SyncQueueOmit<ExtArgs> | null
    /**
     * The data needed to update a SyncQueue.
     */
    data: XOR<SyncQueueUpdateInput, SyncQueueUncheckedUpdateInput>
    /**
     * Choose, which SyncQueue to update.
     */
    where: SyncQueueWhereUniqueInput
  }

  /**
   * SyncQueue updateMany
   */
  export type SyncQueueUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SyncQueues.
     */
    data: XOR<SyncQueueUpdateManyMutationInput, SyncQueueUncheckedUpdateManyInput>
    /**
     * Filter which SyncQueues to update
     */
    where?: SyncQueueWhereInput
    /**
     * Limit how many SyncQueues to update.
     */
    limit?: number
  }

  /**
   * SyncQueue updateManyAndReturn
   */
  export type SyncQueueUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncQueue
     */
    select?: SyncQueueSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SyncQueue
     */
    omit?: SyncQueueOmit<ExtArgs> | null
    /**
     * The data used to update SyncQueues.
     */
    data: XOR<SyncQueueUpdateManyMutationInput, SyncQueueUncheckedUpdateManyInput>
    /**
     * Filter which SyncQueues to update
     */
    where?: SyncQueueWhereInput
    /**
     * Limit how many SyncQueues to update.
     */
    limit?: number
  }

  /**
   * SyncQueue upsert
   */
  export type SyncQueueUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncQueue
     */
    select?: SyncQueueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncQueue
     */
    omit?: SyncQueueOmit<ExtArgs> | null
    /**
     * The filter to search for the SyncQueue to update in case it exists.
     */
    where: SyncQueueWhereUniqueInput
    /**
     * In case the SyncQueue found by the `where` argument doesn't exist, create a new SyncQueue with this data.
     */
    create: XOR<SyncQueueCreateInput, SyncQueueUncheckedCreateInput>
    /**
     * In case the SyncQueue was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SyncQueueUpdateInput, SyncQueueUncheckedUpdateInput>
  }

  /**
   * SyncQueue delete
   */
  export type SyncQueueDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncQueue
     */
    select?: SyncQueueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncQueue
     */
    omit?: SyncQueueOmit<ExtArgs> | null
    /**
     * Filter which SyncQueue to delete.
     */
    where: SyncQueueWhereUniqueInput
  }

  /**
   * SyncQueue deleteMany
   */
  export type SyncQueueDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SyncQueues to delete
     */
    where?: SyncQueueWhereInput
    /**
     * Limit how many SyncQueues to delete.
     */
    limit?: number
  }

  /**
   * SyncQueue without action
   */
  export type SyncQueueDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncQueue
     */
    select?: SyncQueueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncQueue
     */
    omit?: SyncQueueOmit<ExtArgs> | null
  }


  /**
   * Model OperationLog
   */

  export type AggregateOperationLog = {
    _count: OperationLogCountAggregateOutputType | null
    _avg: OperationLogAvgAggregateOutputType | null
    _sum: OperationLogSumAggregateOutputType | null
    _min: OperationLogMinAggregateOutputType | null
    _max: OperationLogMaxAggregateOutputType | null
  }

  export type OperationLogAvgAggregateOutputType = {
    id: number | null
  }

  export type OperationLogSumAggregateOutputType = {
    id: number | null
  }

  export type OperationLogMinAggregateOutputType = {
    id: number | null
    staffId: string | null
    operation: string | null
    details: string | null
    success: boolean | null
    error: string | null
    createdAt: Date | null
  }

  export type OperationLogMaxAggregateOutputType = {
    id: number | null
    staffId: string | null
    operation: string | null
    details: string | null
    success: boolean | null
    error: string | null
    createdAt: Date | null
  }

  export type OperationLogCountAggregateOutputType = {
    id: number
    staffId: number
    operation: number
    details: number
    success: number
    error: number
    createdAt: number
    _all: number
  }


  export type OperationLogAvgAggregateInputType = {
    id?: true
  }

  export type OperationLogSumAggregateInputType = {
    id?: true
  }

  export type OperationLogMinAggregateInputType = {
    id?: true
    staffId?: true
    operation?: true
    details?: true
    success?: true
    error?: true
    createdAt?: true
  }

  export type OperationLogMaxAggregateInputType = {
    id?: true
    staffId?: true
    operation?: true
    details?: true
    success?: true
    error?: true
    createdAt?: true
  }

  export type OperationLogCountAggregateInputType = {
    id?: true
    staffId?: true
    operation?: true
    details?: true
    success?: true
    error?: true
    createdAt?: true
    _all?: true
  }

  export type OperationLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OperationLog to aggregate.
     */
    where?: OperationLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OperationLogs to fetch.
     */
    orderBy?: OperationLogOrderByWithRelationInput | OperationLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OperationLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OperationLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OperationLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OperationLogs
    **/
    _count?: true | OperationLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OperationLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OperationLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OperationLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OperationLogMaxAggregateInputType
  }

  export type GetOperationLogAggregateType<T extends OperationLogAggregateArgs> = {
        [P in keyof T & keyof AggregateOperationLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOperationLog[P]>
      : GetScalarType<T[P], AggregateOperationLog[P]>
  }




  export type OperationLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OperationLogWhereInput
    orderBy?: OperationLogOrderByWithAggregationInput | OperationLogOrderByWithAggregationInput[]
    by: OperationLogScalarFieldEnum[] | OperationLogScalarFieldEnum
    having?: OperationLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OperationLogCountAggregateInputType | true
    _avg?: OperationLogAvgAggregateInputType
    _sum?: OperationLogSumAggregateInputType
    _min?: OperationLogMinAggregateInputType
    _max?: OperationLogMaxAggregateInputType
  }

  export type OperationLogGroupByOutputType = {
    id: number
    staffId: string
    operation: string
    details: string | null
    success: boolean
    error: string | null
    createdAt: Date
    _count: OperationLogCountAggregateOutputType | null
    _avg: OperationLogAvgAggregateOutputType | null
    _sum: OperationLogSumAggregateOutputType | null
    _min: OperationLogMinAggregateOutputType | null
    _max: OperationLogMaxAggregateOutputType | null
  }

  type GetOperationLogGroupByPayload<T extends OperationLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OperationLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OperationLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OperationLogGroupByOutputType[P]>
            : GetScalarType<T[P], OperationLogGroupByOutputType[P]>
        }
      >
    >


  export type OperationLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    staffId?: boolean
    operation?: boolean
    details?: boolean
    success?: boolean
    error?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["operationLog"]>

  export type OperationLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    staffId?: boolean
    operation?: boolean
    details?: boolean
    success?: boolean
    error?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["operationLog"]>

  export type OperationLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    staffId?: boolean
    operation?: boolean
    details?: boolean
    success?: boolean
    error?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["operationLog"]>

  export type OperationLogSelectScalar = {
    id?: boolean
    staffId?: boolean
    operation?: boolean
    details?: boolean
    success?: boolean
    error?: boolean
    createdAt?: boolean
  }

  export type OperationLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "staffId" | "operation" | "details" | "success" | "error" | "createdAt", ExtArgs["result"]["operationLog"]>

  export type $OperationLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OperationLog"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      staffId: string
      operation: string
      details: string | null
      success: boolean
      error: string | null
      createdAt: Date
    }, ExtArgs["result"]["operationLog"]>
    composites: {}
  }

  type OperationLogGetPayload<S extends boolean | null | undefined | OperationLogDefaultArgs> = $Result.GetResult<Prisma.$OperationLogPayload, S>

  type OperationLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OperationLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OperationLogCountAggregateInputType | true
    }

  export interface OperationLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OperationLog'], meta: { name: 'OperationLog' } }
    /**
     * Find zero or one OperationLog that matches the filter.
     * @param {OperationLogFindUniqueArgs} args - Arguments to find a OperationLog
     * @example
     * // Get one OperationLog
     * const operationLog = await prisma.operationLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OperationLogFindUniqueArgs>(args: SelectSubset<T, OperationLogFindUniqueArgs<ExtArgs>>): Prisma__OperationLogClient<$Result.GetResult<Prisma.$OperationLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OperationLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OperationLogFindUniqueOrThrowArgs} args - Arguments to find a OperationLog
     * @example
     * // Get one OperationLog
     * const operationLog = await prisma.operationLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OperationLogFindUniqueOrThrowArgs>(args: SelectSubset<T, OperationLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OperationLogClient<$Result.GetResult<Prisma.$OperationLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OperationLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OperationLogFindFirstArgs} args - Arguments to find a OperationLog
     * @example
     * // Get one OperationLog
     * const operationLog = await prisma.operationLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OperationLogFindFirstArgs>(args?: SelectSubset<T, OperationLogFindFirstArgs<ExtArgs>>): Prisma__OperationLogClient<$Result.GetResult<Prisma.$OperationLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OperationLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OperationLogFindFirstOrThrowArgs} args - Arguments to find a OperationLog
     * @example
     * // Get one OperationLog
     * const operationLog = await prisma.operationLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OperationLogFindFirstOrThrowArgs>(args?: SelectSubset<T, OperationLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__OperationLogClient<$Result.GetResult<Prisma.$OperationLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OperationLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OperationLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OperationLogs
     * const operationLogs = await prisma.operationLog.findMany()
     * 
     * // Get first 10 OperationLogs
     * const operationLogs = await prisma.operationLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const operationLogWithIdOnly = await prisma.operationLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OperationLogFindManyArgs>(args?: SelectSubset<T, OperationLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OperationLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OperationLog.
     * @param {OperationLogCreateArgs} args - Arguments to create a OperationLog.
     * @example
     * // Create one OperationLog
     * const OperationLog = await prisma.operationLog.create({
     *   data: {
     *     // ... data to create a OperationLog
     *   }
     * })
     * 
     */
    create<T extends OperationLogCreateArgs>(args: SelectSubset<T, OperationLogCreateArgs<ExtArgs>>): Prisma__OperationLogClient<$Result.GetResult<Prisma.$OperationLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OperationLogs.
     * @param {OperationLogCreateManyArgs} args - Arguments to create many OperationLogs.
     * @example
     * // Create many OperationLogs
     * const operationLog = await prisma.operationLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OperationLogCreateManyArgs>(args?: SelectSubset<T, OperationLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OperationLogs and returns the data saved in the database.
     * @param {OperationLogCreateManyAndReturnArgs} args - Arguments to create many OperationLogs.
     * @example
     * // Create many OperationLogs
     * const operationLog = await prisma.operationLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OperationLogs and only return the `id`
     * const operationLogWithIdOnly = await prisma.operationLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OperationLogCreateManyAndReturnArgs>(args?: SelectSubset<T, OperationLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OperationLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a OperationLog.
     * @param {OperationLogDeleteArgs} args - Arguments to delete one OperationLog.
     * @example
     * // Delete one OperationLog
     * const OperationLog = await prisma.operationLog.delete({
     *   where: {
     *     // ... filter to delete one OperationLog
     *   }
     * })
     * 
     */
    delete<T extends OperationLogDeleteArgs>(args: SelectSubset<T, OperationLogDeleteArgs<ExtArgs>>): Prisma__OperationLogClient<$Result.GetResult<Prisma.$OperationLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OperationLog.
     * @param {OperationLogUpdateArgs} args - Arguments to update one OperationLog.
     * @example
     * // Update one OperationLog
     * const operationLog = await prisma.operationLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OperationLogUpdateArgs>(args: SelectSubset<T, OperationLogUpdateArgs<ExtArgs>>): Prisma__OperationLogClient<$Result.GetResult<Prisma.$OperationLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OperationLogs.
     * @param {OperationLogDeleteManyArgs} args - Arguments to filter OperationLogs to delete.
     * @example
     * // Delete a few OperationLogs
     * const { count } = await prisma.operationLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OperationLogDeleteManyArgs>(args?: SelectSubset<T, OperationLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OperationLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OperationLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OperationLogs
     * const operationLog = await prisma.operationLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OperationLogUpdateManyArgs>(args: SelectSubset<T, OperationLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OperationLogs and returns the data updated in the database.
     * @param {OperationLogUpdateManyAndReturnArgs} args - Arguments to update many OperationLogs.
     * @example
     * // Update many OperationLogs
     * const operationLog = await prisma.operationLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more OperationLogs and only return the `id`
     * const operationLogWithIdOnly = await prisma.operationLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OperationLogUpdateManyAndReturnArgs>(args: SelectSubset<T, OperationLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OperationLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one OperationLog.
     * @param {OperationLogUpsertArgs} args - Arguments to update or create a OperationLog.
     * @example
     * // Update or create a OperationLog
     * const operationLog = await prisma.operationLog.upsert({
     *   create: {
     *     // ... data to create a OperationLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OperationLog we want to update
     *   }
     * })
     */
    upsert<T extends OperationLogUpsertArgs>(args: SelectSubset<T, OperationLogUpsertArgs<ExtArgs>>): Prisma__OperationLogClient<$Result.GetResult<Prisma.$OperationLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OperationLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OperationLogCountArgs} args - Arguments to filter OperationLogs to count.
     * @example
     * // Count the number of OperationLogs
     * const count = await prisma.operationLog.count({
     *   where: {
     *     // ... the filter for the OperationLogs we want to count
     *   }
     * })
    **/
    count<T extends OperationLogCountArgs>(
      args?: Subset<T, OperationLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OperationLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OperationLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OperationLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OperationLogAggregateArgs>(args: Subset<T, OperationLogAggregateArgs>): Prisma.PrismaPromise<GetOperationLogAggregateType<T>>

    /**
     * Group by OperationLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OperationLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OperationLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OperationLogGroupByArgs['orderBy'] }
        : { orderBy?: OperationLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OperationLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOperationLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OperationLog model
   */
  readonly fields: OperationLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OperationLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OperationLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the OperationLog model
   */
  interface OperationLogFieldRefs {
    readonly id: FieldRef<"OperationLog", 'Int'>
    readonly staffId: FieldRef<"OperationLog", 'String'>
    readonly operation: FieldRef<"OperationLog", 'String'>
    readonly details: FieldRef<"OperationLog", 'String'>
    readonly success: FieldRef<"OperationLog", 'Boolean'>
    readonly error: FieldRef<"OperationLog", 'String'>
    readonly createdAt: FieldRef<"OperationLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * OperationLog findUnique
   */
  export type OperationLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OperationLog
     */
    select?: OperationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OperationLog
     */
    omit?: OperationLogOmit<ExtArgs> | null
    /**
     * Filter, which OperationLog to fetch.
     */
    where: OperationLogWhereUniqueInput
  }

  /**
   * OperationLog findUniqueOrThrow
   */
  export type OperationLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OperationLog
     */
    select?: OperationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OperationLog
     */
    omit?: OperationLogOmit<ExtArgs> | null
    /**
     * Filter, which OperationLog to fetch.
     */
    where: OperationLogWhereUniqueInput
  }

  /**
   * OperationLog findFirst
   */
  export type OperationLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OperationLog
     */
    select?: OperationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OperationLog
     */
    omit?: OperationLogOmit<ExtArgs> | null
    /**
     * Filter, which OperationLog to fetch.
     */
    where?: OperationLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OperationLogs to fetch.
     */
    orderBy?: OperationLogOrderByWithRelationInput | OperationLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OperationLogs.
     */
    cursor?: OperationLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OperationLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OperationLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OperationLogs.
     */
    distinct?: OperationLogScalarFieldEnum | OperationLogScalarFieldEnum[]
  }

  /**
   * OperationLog findFirstOrThrow
   */
  export type OperationLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OperationLog
     */
    select?: OperationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OperationLog
     */
    omit?: OperationLogOmit<ExtArgs> | null
    /**
     * Filter, which OperationLog to fetch.
     */
    where?: OperationLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OperationLogs to fetch.
     */
    orderBy?: OperationLogOrderByWithRelationInput | OperationLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OperationLogs.
     */
    cursor?: OperationLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OperationLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OperationLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OperationLogs.
     */
    distinct?: OperationLogScalarFieldEnum | OperationLogScalarFieldEnum[]
  }

  /**
   * OperationLog findMany
   */
  export type OperationLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OperationLog
     */
    select?: OperationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OperationLog
     */
    omit?: OperationLogOmit<ExtArgs> | null
    /**
     * Filter, which OperationLogs to fetch.
     */
    where?: OperationLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OperationLogs to fetch.
     */
    orderBy?: OperationLogOrderByWithRelationInput | OperationLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OperationLogs.
     */
    cursor?: OperationLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OperationLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OperationLogs.
     */
    skip?: number
    distinct?: OperationLogScalarFieldEnum | OperationLogScalarFieldEnum[]
  }

  /**
   * OperationLog create
   */
  export type OperationLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OperationLog
     */
    select?: OperationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OperationLog
     */
    omit?: OperationLogOmit<ExtArgs> | null
    /**
     * The data needed to create a OperationLog.
     */
    data: XOR<OperationLogCreateInput, OperationLogUncheckedCreateInput>
  }

  /**
   * OperationLog createMany
   */
  export type OperationLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OperationLogs.
     */
    data: OperationLogCreateManyInput | OperationLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OperationLog createManyAndReturn
   */
  export type OperationLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OperationLog
     */
    select?: OperationLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OperationLog
     */
    omit?: OperationLogOmit<ExtArgs> | null
    /**
     * The data used to create many OperationLogs.
     */
    data: OperationLogCreateManyInput | OperationLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OperationLog update
   */
  export type OperationLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OperationLog
     */
    select?: OperationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OperationLog
     */
    omit?: OperationLogOmit<ExtArgs> | null
    /**
     * The data needed to update a OperationLog.
     */
    data: XOR<OperationLogUpdateInput, OperationLogUncheckedUpdateInput>
    /**
     * Choose, which OperationLog to update.
     */
    where: OperationLogWhereUniqueInput
  }

  /**
   * OperationLog updateMany
   */
  export type OperationLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OperationLogs.
     */
    data: XOR<OperationLogUpdateManyMutationInput, OperationLogUncheckedUpdateManyInput>
    /**
     * Filter which OperationLogs to update
     */
    where?: OperationLogWhereInput
    /**
     * Limit how many OperationLogs to update.
     */
    limit?: number
  }

  /**
   * OperationLog updateManyAndReturn
   */
  export type OperationLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OperationLog
     */
    select?: OperationLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OperationLog
     */
    omit?: OperationLogOmit<ExtArgs> | null
    /**
     * The data used to update OperationLogs.
     */
    data: XOR<OperationLogUpdateManyMutationInput, OperationLogUncheckedUpdateManyInput>
    /**
     * Filter which OperationLogs to update
     */
    where?: OperationLogWhereInput
    /**
     * Limit how many OperationLogs to update.
     */
    limit?: number
  }

  /**
   * OperationLog upsert
   */
  export type OperationLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OperationLog
     */
    select?: OperationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OperationLog
     */
    omit?: OperationLogOmit<ExtArgs> | null
    /**
     * The filter to search for the OperationLog to update in case it exists.
     */
    where: OperationLogWhereUniqueInput
    /**
     * In case the OperationLog found by the `where` argument doesn't exist, create a new OperationLog with this data.
     */
    create: XOR<OperationLogCreateInput, OperationLogUncheckedCreateInput>
    /**
     * In case the OperationLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OperationLogUpdateInput, OperationLogUncheckedUpdateInput>
  }

  /**
   * OperationLog delete
   */
  export type OperationLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OperationLog
     */
    select?: OperationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OperationLog
     */
    omit?: OperationLogOmit<ExtArgs> | null
    /**
     * Filter which OperationLog to delete.
     */
    where: OperationLogWhereUniqueInput
  }

  /**
   * OperationLog deleteMany
   */
  export type OperationLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OperationLogs to delete
     */
    where?: OperationLogWhereInput
    /**
     * Limit how many OperationLogs to delete.
     */
    limit?: number
  }

  /**
   * OperationLog without action
   */
  export type OperationLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OperationLog
     */
    select?: OperationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OperationLog
     */
    omit?: OperationLogOmit<ExtArgs> | null
  }


  /**
   * Model OfflineCustomer
   */

  export type AggregateOfflineCustomer = {
    _count: OfflineCustomerCountAggregateOutputType | null
    _avg: OfflineCustomerAvgAggregateOutputType | null
    _sum: OfflineCustomerSumAggregateOutputType | null
    _min: OfflineCustomerMinAggregateOutputType | null
    _max: OfflineCustomerMaxAggregateOutputType | null
  }

  export type OfflineCustomerAvgAggregateOutputType = {
    id: number | null
  }

  export type OfflineCustomerSumAggregateOutputType = {
    id: number | null
  }

  export type OfflineCustomerMinAggregateOutputType = {
    id: number | null
    name: string | null
    phone: string | null
    cin: string | null
    createdAt: Date | null
  }

  export type OfflineCustomerMaxAggregateOutputType = {
    id: number | null
    name: string | null
    phone: string | null
    cin: string | null
    createdAt: Date | null
  }

  export type OfflineCustomerCountAggregateOutputType = {
    id: number
    name: number
    phone: number
    cin: number
    createdAt: number
    _all: number
  }


  export type OfflineCustomerAvgAggregateInputType = {
    id?: true
  }

  export type OfflineCustomerSumAggregateInputType = {
    id?: true
  }

  export type OfflineCustomerMinAggregateInputType = {
    id?: true
    name?: true
    phone?: true
    cin?: true
    createdAt?: true
  }

  export type OfflineCustomerMaxAggregateInputType = {
    id?: true
    name?: true
    phone?: true
    cin?: true
    createdAt?: true
  }

  export type OfflineCustomerCountAggregateInputType = {
    id?: true
    name?: true
    phone?: true
    cin?: true
    createdAt?: true
    _all?: true
  }

  export type OfflineCustomerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OfflineCustomer to aggregate.
     */
    where?: OfflineCustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OfflineCustomers to fetch.
     */
    orderBy?: OfflineCustomerOrderByWithRelationInput | OfflineCustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OfflineCustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OfflineCustomers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OfflineCustomers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OfflineCustomers
    **/
    _count?: true | OfflineCustomerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OfflineCustomerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OfflineCustomerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OfflineCustomerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OfflineCustomerMaxAggregateInputType
  }

  export type GetOfflineCustomerAggregateType<T extends OfflineCustomerAggregateArgs> = {
        [P in keyof T & keyof AggregateOfflineCustomer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOfflineCustomer[P]>
      : GetScalarType<T[P], AggregateOfflineCustomer[P]>
  }




  export type OfflineCustomerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OfflineCustomerWhereInput
    orderBy?: OfflineCustomerOrderByWithAggregationInput | OfflineCustomerOrderByWithAggregationInput[]
    by: OfflineCustomerScalarFieldEnum[] | OfflineCustomerScalarFieldEnum
    having?: OfflineCustomerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OfflineCustomerCountAggregateInputType | true
    _avg?: OfflineCustomerAvgAggregateInputType
    _sum?: OfflineCustomerSumAggregateInputType
    _min?: OfflineCustomerMinAggregateInputType
    _max?: OfflineCustomerMaxAggregateInputType
  }

  export type OfflineCustomerGroupByOutputType = {
    id: number
    name: string
    phone: string | null
    cin: string | null
    createdAt: Date
    _count: OfflineCustomerCountAggregateOutputType | null
    _avg: OfflineCustomerAvgAggregateOutputType | null
    _sum: OfflineCustomerSumAggregateOutputType | null
    _min: OfflineCustomerMinAggregateOutputType | null
    _max: OfflineCustomerMaxAggregateOutputType | null
  }

  type GetOfflineCustomerGroupByPayload<T extends OfflineCustomerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OfflineCustomerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OfflineCustomerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OfflineCustomerGroupByOutputType[P]>
            : GetScalarType<T[P], OfflineCustomerGroupByOutputType[P]>
        }
      >
    >


  export type OfflineCustomerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    phone?: boolean
    cin?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["offlineCustomer"]>

  export type OfflineCustomerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    phone?: boolean
    cin?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["offlineCustomer"]>

  export type OfflineCustomerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    phone?: boolean
    cin?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["offlineCustomer"]>

  export type OfflineCustomerSelectScalar = {
    id?: boolean
    name?: boolean
    phone?: boolean
    cin?: boolean
    createdAt?: boolean
  }

  export type OfflineCustomerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "phone" | "cin" | "createdAt", ExtArgs["result"]["offlineCustomer"]>

  export type $OfflineCustomerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OfflineCustomer"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      phone: string | null
      cin: string | null
      createdAt: Date
    }, ExtArgs["result"]["offlineCustomer"]>
    composites: {}
  }

  type OfflineCustomerGetPayload<S extends boolean | null | undefined | OfflineCustomerDefaultArgs> = $Result.GetResult<Prisma.$OfflineCustomerPayload, S>

  type OfflineCustomerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OfflineCustomerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OfflineCustomerCountAggregateInputType | true
    }

  export interface OfflineCustomerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OfflineCustomer'], meta: { name: 'OfflineCustomer' } }
    /**
     * Find zero or one OfflineCustomer that matches the filter.
     * @param {OfflineCustomerFindUniqueArgs} args - Arguments to find a OfflineCustomer
     * @example
     * // Get one OfflineCustomer
     * const offlineCustomer = await prisma.offlineCustomer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OfflineCustomerFindUniqueArgs>(args: SelectSubset<T, OfflineCustomerFindUniqueArgs<ExtArgs>>): Prisma__OfflineCustomerClient<$Result.GetResult<Prisma.$OfflineCustomerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OfflineCustomer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OfflineCustomerFindUniqueOrThrowArgs} args - Arguments to find a OfflineCustomer
     * @example
     * // Get one OfflineCustomer
     * const offlineCustomer = await prisma.offlineCustomer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OfflineCustomerFindUniqueOrThrowArgs>(args: SelectSubset<T, OfflineCustomerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OfflineCustomerClient<$Result.GetResult<Prisma.$OfflineCustomerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OfflineCustomer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfflineCustomerFindFirstArgs} args - Arguments to find a OfflineCustomer
     * @example
     * // Get one OfflineCustomer
     * const offlineCustomer = await prisma.offlineCustomer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OfflineCustomerFindFirstArgs>(args?: SelectSubset<T, OfflineCustomerFindFirstArgs<ExtArgs>>): Prisma__OfflineCustomerClient<$Result.GetResult<Prisma.$OfflineCustomerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OfflineCustomer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfflineCustomerFindFirstOrThrowArgs} args - Arguments to find a OfflineCustomer
     * @example
     * // Get one OfflineCustomer
     * const offlineCustomer = await prisma.offlineCustomer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OfflineCustomerFindFirstOrThrowArgs>(args?: SelectSubset<T, OfflineCustomerFindFirstOrThrowArgs<ExtArgs>>): Prisma__OfflineCustomerClient<$Result.GetResult<Prisma.$OfflineCustomerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OfflineCustomers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfflineCustomerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OfflineCustomers
     * const offlineCustomers = await prisma.offlineCustomer.findMany()
     * 
     * // Get first 10 OfflineCustomers
     * const offlineCustomers = await prisma.offlineCustomer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const offlineCustomerWithIdOnly = await prisma.offlineCustomer.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OfflineCustomerFindManyArgs>(args?: SelectSubset<T, OfflineCustomerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OfflineCustomerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OfflineCustomer.
     * @param {OfflineCustomerCreateArgs} args - Arguments to create a OfflineCustomer.
     * @example
     * // Create one OfflineCustomer
     * const OfflineCustomer = await prisma.offlineCustomer.create({
     *   data: {
     *     // ... data to create a OfflineCustomer
     *   }
     * })
     * 
     */
    create<T extends OfflineCustomerCreateArgs>(args: SelectSubset<T, OfflineCustomerCreateArgs<ExtArgs>>): Prisma__OfflineCustomerClient<$Result.GetResult<Prisma.$OfflineCustomerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OfflineCustomers.
     * @param {OfflineCustomerCreateManyArgs} args - Arguments to create many OfflineCustomers.
     * @example
     * // Create many OfflineCustomers
     * const offlineCustomer = await prisma.offlineCustomer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OfflineCustomerCreateManyArgs>(args?: SelectSubset<T, OfflineCustomerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OfflineCustomers and returns the data saved in the database.
     * @param {OfflineCustomerCreateManyAndReturnArgs} args - Arguments to create many OfflineCustomers.
     * @example
     * // Create many OfflineCustomers
     * const offlineCustomer = await prisma.offlineCustomer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OfflineCustomers and only return the `id`
     * const offlineCustomerWithIdOnly = await prisma.offlineCustomer.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OfflineCustomerCreateManyAndReturnArgs>(args?: SelectSubset<T, OfflineCustomerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OfflineCustomerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a OfflineCustomer.
     * @param {OfflineCustomerDeleteArgs} args - Arguments to delete one OfflineCustomer.
     * @example
     * // Delete one OfflineCustomer
     * const OfflineCustomer = await prisma.offlineCustomer.delete({
     *   where: {
     *     // ... filter to delete one OfflineCustomer
     *   }
     * })
     * 
     */
    delete<T extends OfflineCustomerDeleteArgs>(args: SelectSubset<T, OfflineCustomerDeleteArgs<ExtArgs>>): Prisma__OfflineCustomerClient<$Result.GetResult<Prisma.$OfflineCustomerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OfflineCustomer.
     * @param {OfflineCustomerUpdateArgs} args - Arguments to update one OfflineCustomer.
     * @example
     * // Update one OfflineCustomer
     * const offlineCustomer = await prisma.offlineCustomer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OfflineCustomerUpdateArgs>(args: SelectSubset<T, OfflineCustomerUpdateArgs<ExtArgs>>): Prisma__OfflineCustomerClient<$Result.GetResult<Prisma.$OfflineCustomerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OfflineCustomers.
     * @param {OfflineCustomerDeleteManyArgs} args - Arguments to filter OfflineCustomers to delete.
     * @example
     * // Delete a few OfflineCustomers
     * const { count } = await prisma.offlineCustomer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OfflineCustomerDeleteManyArgs>(args?: SelectSubset<T, OfflineCustomerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OfflineCustomers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfflineCustomerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OfflineCustomers
     * const offlineCustomer = await prisma.offlineCustomer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OfflineCustomerUpdateManyArgs>(args: SelectSubset<T, OfflineCustomerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OfflineCustomers and returns the data updated in the database.
     * @param {OfflineCustomerUpdateManyAndReturnArgs} args - Arguments to update many OfflineCustomers.
     * @example
     * // Update many OfflineCustomers
     * const offlineCustomer = await prisma.offlineCustomer.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more OfflineCustomers and only return the `id`
     * const offlineCustomerWithIdOnly = await prisma.offlineCustomer.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OfflineCustomerUpdateManyAndReturnArgs>(args: SelectSubset<T, OfflineCustomerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OfflineCustomerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one OfflineCustomer.
     * @param {OfflineCustomerUpsertArgs} args - Arguments to update or create a OfflineCustomer.
     * @example
     * // Update or create a OfflineCustomer
     * const offlineCustomer = await prisma.offlineCustomer.upsert({
     *   create: {
     *     // ... data to create a OfflineCustomer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OfflineCustomer we want to update
     *   }
     * })
     */
    upsert<T extends OfflineCustomerUpsertArgs>(args: SelectSubset<T, OfflineCustomerUpsertArgs<ExtArgs>>): Prisma__OfflineCustomerClient<$Result.GetResult<Prisma.$OfflineCustomerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OfflineCustomers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfflineCustomerCountArgs} args - Arguments to filter OfflineCustomers to count.
     * @example
     * // Count the number of OfflineCustomers
     * const count = await prisma.offlineCustomer.count({
     *   where: {
     *     // ... the filter for the OfflineCustomers we want to count
     *   }
     * })
    **/
    count<T extends OfflineCustomerCountArgs>(
      args?: Subset<T, OfflineCustomerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OfflineCustomerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OfflineCustomer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfflineCustomerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OfflineCustomerAggregateArgs>(args: Subset<T, OfflineCustomerAggregateArgs>): Prisma.PrismaPromise<GetOfflineCustomerAggregateType<T>>

    /**
     * Group by OfflineCustomer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfflineCustomerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OfflineCustomerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OfflineCustomerGroupByArgs['orderBy'] }
        : { orderBy?: OfflineCustomerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OfflineCustomerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOfflineCustomerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OfflineCustomer model
   */
  readonly fields: OfflineCustomerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OfflineCustomer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OfflineCustomerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the OfflineCustomer model
   */
  interface OfflineCustomerFieldRefs {
    readonly id: FieldRef<"OfflineCustomer", 'Int'>
    readonly name: FieldRef<"OfflineCustomer", 'String'>
    readonly phone: FieldRef<"OfflineCustomer", 'String'>
    readonly cin: FieldRef<"OfflineCustomer", 'String'>
    readonly createdAt: FieldRef<"OfflineCustomer", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * OfflineCustomer findUnique
   */
  export type OfflineCustomerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfflineCustomer
     */
    select?: OfflineCustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OfflineCustomer
     */
    omit?: OfflineCustomerOmit<ExtArgs> | null
    /**
     * Filter, which OfflineCustomer to fetch.
     */
    where: OfflineCustomerWhereUniqueInput
  }

  /**
   * OfflineCustomer findUniqueOrThrow
   */
  export type OfflineCustomerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfflineCustomer
     */
    select?: OfflineCustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OfflineCustomer
     */
    omit?: OfflineCustomerOmit<ExtArgs> | null
    /**
     * Filter, which OfflineCustomer to fetch.
     */
    where: OfflineCustomerWhereUniqueInput
  }

  /**
   * OfflineCustomer findFirst
   */
  export type OfflineCustomerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfflineCustomer
     */
    select?: OfflineCustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OfflineCustomer
     */
    omit?: OfflineCustomerOmit<ExtArgs> | null
    /**
     * Filter, which OfflineCustomer to fetch.
     */
    where?: OfflineCustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OfflineCustomers to fetch.
     */
    orderBy?: OfflineCustomerOrderByWithRelationInput | OfflineCustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OfflineCustomers.
     */
    cursor?: OfflineCustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OfflineCustomers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OfflineCustomers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OfflineCustomers.
     */
    distinct?: OfflineCustomerScalarFieldEnum | OfflineCustomerScalarFieldEnum[]
  }

  /**
   * OfflineCustomer findFirstOrThrow
   */
  export type OfflineCustomerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfflineCustomer
     */
    select?: OfflineCustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OfflineCustomer
     */
    omit?: OfflineCustomerOmit<ExtArgs> | null
    /**
     * Filter, which OfflineCustomer to fetch.
     */
    where?: OfflineCustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OfflineCustomers to fetch.
     */
    orderBy?: OfflineCustomerOrderByWithRelationInput | OfflineCustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OfflineCustomers.
     */
    cursor?: OfflineCustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OfflineCustomers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OfflineCustomers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OfflineCustomers.
     */
    distinct?: OfflineCustomerScalarFieldEnum | OfflineCustomerScalarFieldEnum[]
  }

  /**
   * OfflineCustomer findMany
   */
  export type OfflineCustomerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfflineCustomer
     */
    select?: OfflineCustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OfflineCustomer
     */
    omit?: OfflineCustomerOmit<ExtArgs> | null
    /**
     * Filter, which OfflineCustomers to fetch.
     */
    where?: OfflineCustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OfflineCustomers to fetch.
     */
    orderBy?: OfflineCustomerOrderByWithRelationInput | OfflineCustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OfflineCustomers.
     */
    cursor?: OfflineCustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OfflineCustomers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OfflineCustomers.
     */
    skip?: number
    distinct?: OfflineCustomerScalarFieldEnum | OfflineCustomerScalarFieldEnum[]
  }

  /**
   * OfflineCustomer create
   */
  export type OfflineCustomerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfflineCustomer
     */
    select?: OfflineCustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OfflineCustomer
     */
    omit?: OfflineCustomerOmit<ExtArgs> | null
    /**
     * The data needed to create a OfflineCustomer.
     */
    data: XOR<OfflineCustomerCreateInput, OfflineCustomerUncheckedCreateInput>
  }

  /**
   * OfflineCustomer createMany
   */
  export type OfflineCustomerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OfflineCustomers.
     */
    data: OfflineCustomerCreateManyInput | OfflineCustomerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OfflineCustomer createManyAndReturn
   */
  export type OfflineCustomerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfflineCustomer
     */
    select?: OfflineCustomerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OfflineCustomer
     */
    omit?: OfflineCustomerOmit<ExtArgs> | null
    /**
     * The data used to create many OfflineCustomers.
     */
    data: OfflineCustomerCreateManyInput | OfflineCustomerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OfflineCustomer update
   */
  export type OfflineCustomerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfflineCustomer
     */
    select?: OfflineCustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OfflineCustomer
     */
    omit?: OfflineCustomerOmit<ExtArgs> | null
    /**
     * The data needed to update a OfflineCustomer.
     */
    data: XOR<OfflineCustomerUpdateInput, OfflineCustomerUncheckedUpdateInput>
    /**
     * Choose, which OfflineCustomer to update.
     */
    where: OfflineCustomerWhereUniqueInput
  }

  /**
   * OfflineCustomer updateMany
   */
  export type OfflineCustomerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OfflineCustomers.
     */
    data: XOR<OfflineCustomerUpdateManyMutationInput, OfflineCustomerUncheckedUpdateManyInput>
    /**
     * Filter which OfflineCustomers to update
     */
    where?: OfflineCustomerWhereInput
    /**
     * Limit how many OfflineCustomers to update.
     */
    limit?: number
  }

  /**
   * OfflineCustomer updateManyAndReturn
   */
  export type OfflineCustomerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfflineCustomer
     */
    select?: OfflineCustomerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OfflineCustomer
     */
    omit?: OfflineCustomerOmit<ExtArgs> | null
    /**
     * The data used to update OfflineCustomers.
     */
    data: XOR<OfflineCustomerUpdateManyMutationInput, OfflineCustomerUncheckedUpdateManyInput>
    /**
     * Filter which OfflineCustomers to update
     */
    where?: OfflineCustomerWhereInput
    /**
     * Limit how many OfflineCustomers to update.
     */
    limit?: number
  }

  /**
   * OfflineCustomer upsert
   */
  export type OfflineCustomerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfflineCustomer
     */
    select?: OfflineCustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OfflineCustomer
     */
    omit?: OfflineCustomerOmit<ExtArgs> | null
    /**
     * The filter to search for the OfflineCustomer to update in case it exists.
     */
    where: OfflineCustomerWhereUniqueInput
    /**
     * In case the OfflineCustomer found by the `where` argument doesn't exist, create a new OfflineCustomer with this data.
     */
    create: XOR<OfflineCustomerCreateInput, OfflineCustomerUncheckedCreateInput>
    /**
     * In case the OfflineCustomer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OfflineCustomerUpdateInput, OfflineCustomerUncheckedUpdateInput>
  }

  /**
   * OfflineCustomer delete
   */
  export type OfflineCustomerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfflineCustomer
     */
    select?: OfflineCustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OfflineCustomer
     */
    omit?: OfflineCustomerOmit<ExtArgs> | null
    /**
     * Filter which OfflineCustomer to delete.
     */
    where: OfflineCustomerWhereUniqueInput
  }

  /**
   * OfflineCustomer deleteMany
   */
  export type OfflineCustomerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OfflineCustomers to delete
     */
    where?: OfflineCustomerWhereInput
    /**
     * Limit how many OfflineCustomers to delete.
     */
    limit?: number
  }

  /**
   * OfflineCustomer without action
   */
  export type OfflineCustomerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfflineCustomer
     */
    select?: OfflineCustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OfflineCustomer
     */
    omit?: OfflineCustomerOmit<ExtArgs> | null
  }


  /**
   * Model SyncOperation
   */

  export type AggregateSyncOperation = {
    _count: SyncOperationCountAggregateOutputType | null
    _avg: SyncOperationAvgAggregateOutputType | null
    _sum: SyncOperationSumAggregateOutputType | null
    _min: SyncOperationMinAggregateOutputType | null
    _max: SyncOperationMaxAggregateOutputType | null
  }

  export type SyncOperationAvgAggregateOutputType = {
    sequenceNumber: number | null
    retryCount: number | null
  }

  export type SyncOperationSumAggregateOutputType = {
    sequenceNumber: number | null
    retryCount: number | null
  }

  export type SyncOperationMinAggregateOutputType = {
    id: string | null
    stationId: string | null
    tableName: string | null
    recordId: string | null
    operation: string | null
    syncStatus: string | null
    sequenceNumber: number | null
    clientRequestId: string | null
    transactionId: string | null
    retryCount: number | null
    error: string | null
    syncLogId: string | null
    createdAt: Date | null
    syncedAt: Date | null
    resolvedAt: Date | null
  }

  export type SyncOperationMaxAggregateOutputType = {
    id: string | null
    stationId: string | null
    tableName: string | null
    recordId: string | null
    operation: string | null
    syncStatus: string | null
    sequenceNumber: number | null
    clientRequestId: string | null
    transactionId: string | null
    retryCount: number | null
    error: string | null
    syncLogId: string | null
    createdAt: Date | null
    syncedAt: Date | null
    resolvedAt: Date | null
  }

  export type SyncOperationCountAggregateOutputType = {
    id: number
    stationId: number
    tableName: number
    recordId: number
    operation: number
    data: number
    syncStatus: number
    sequenceNumber: number
    clientRequestId: number
    transactionId: number
    retryCount: number
    error: number
    syncLogId: number
    createdAt: number
    syncedAt: number
    resolvedAt: number
    _all: number
  }


  export type SyncOperationAvgAggregateInputType = {
    sequenceNumber?: true
    retryCount?: true
  }

  export type SyncOperationSumAggregateInputType = {
    sequenceNumber?: true
    retryCount?: true
  }

  export type SyncOperationMinAggregateInputType = {
    id?: true
    stationId?: true
    tableName?: true
    recordId?: true
    operation?: true
    syncStatus?: true
    sequenceNumber?: true
    clientRequestId?: true
    transactionId?: true
    retryCount?: true
    error?: true
    syncLogId?: true
    createdAt?: true
    syncedAt?: true
    resolvedAt?: true
  }

  export type SyncOperationMaxAggregateInputType = {
    id?: true
    stationId?: true
    tableName?: true
    recordId?: true
    operation?: true
    syncStatus?: true
    sequenceNumber?: true
    clientRequestId?: true
    transactionId?: true
    retryCount?: true
    error?: true
    syncLogId?: true
    createdAt?: true
    syncedAt?: true
    resolvedAt?: true
  }

  export type SyncOperationCountAggregateInputType = {
    id?: true
    stationId?: true
    tableName?: true
    recordId?: true
    operation?: true
    data?: true
    syncStatus?: true
    sequenceNumber?: true
    clientRequestId?: true
    transactionId?: true
    retryCount?: true
    error?: true
    syncLogId?: true
    createdAt?: true
    syncedAt?: true
    resolvedAt?: true
    _all?: true
  }

  export type SyncOperationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SyncOperation to aggregate.
     */
    where?: SyncOperationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SyncOperations to fetch.
     */
    orderBy?: SyncOperationOrderByWithRelationInput | SyncOperationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SyncOperationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SyncOperations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SyncOperations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SyncOperations
    **/
    _count?: true | SyncOperationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SyncOperationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SyncOperationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SyncOperationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SyncOperationMaxAggregateInputType
  }

  export type GetSyncOperationAggregateType<T extends SyncOperationAggregateArgs> = {
        [P in keyof T & keyof AggregateSyncOperation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSyncOperation[P]>
      : GetScalarType<T[P], AggregateSyncOperation[P]>
  }




  export type SyncOperationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SyncOperationWhereInput
    orderBy?: SyncOperationOrderByWithAggregationInput | SyncOperationOrderByWithAggregationInput[]
    by: SyncOperationScalarFieldEnum[] | SyncOperationScalarFieldEnum
    having?: SyncOperationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SyncOperationCountAggregateInputType | true
    _avg?: SyncOperationAvgAggregateInputType
    _sum?: SyncOperationSumAggregateInputType
    _min?: SyncOperationMinAggregateInputType
    _max?: SyncOperationMaxAggregateInputType
  }

  export type SyncOperationGroupByOutputType = {
    id: string
    stationId: string
    tableName: string
    recordId: string
    operation: string
    data: JsonValue
    syncStatus: string
    sequenceNumber: number
    clientRequestId: string
    transactionId: string | null
    retryCount: number
    error: string | null
    syncLogId: string | null
    createdAt: Date
    syncedAt: Date | null
    resolvedAt: Date | null
    _count: SyncOperationCountAggregateOutputType | null
    _avg: SyncOperationAvgAggregateOutputType | null
    _sum: SyncOperationSumAggregateOutputType | null
    _min: SyncOperationMinAggregateOutputType | null
    _max: SyncOperationMaxAggregateOutputType | null
  }

  type GetSyncOperationGroupByPayload<T extends SyncOperationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SyncOperationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SyncOperationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SyncOperationGroupByOutputType[P]>
            : GetScalarType<T[P], SyncOperationGroupByOutputType[P]>
        }
      >
    >


  export type SyncOperationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    stationId?: boolean
    tableName?: boolean
    recordId?: boolean
    operation?: boolean
    data?: boolean
    syncStatus?: boolean
    sequenceNumber?: boolean
    clientRequestId?: boolean
    transactionId?: boolean
    retryCount?: boolean
    error?: boolean
    syncLogId?: boolean
    createdAt?: boolean
    syncedAt?: boolean
    resolvedAt?: boolean
  }, ExtArgs["result"]["syncOperation"]>

  export type SyncOperationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    stationId?: boolean
    tableName?: boolean
    recordId?: boolean
    operation?: boolean
    data?: boolean
    syncStatus?: boolean
    sequenceNumber?: boolean
    clientRequestId?: boolean
    transactionId?: boolean
    retryCount?: boolean
    error?: boolean
    syncLogId?: boolean
    createdAt?: boolean
    syncedAt?: boolean
    resolvedAt?: boolean
  }, ExtArgs["result"]["syncOperation"]>

  export type SyncOperationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    stationId?: boolean
    tableName?: boolean
    recordId?: boolean
    operation?: boolean
    data?: boolean
    syncStatus?: boolean
    sequenceNumber?: boolean
    clientRequestId?: boolean
    transactionId?: boolean
    retryCount?: boolean
    error?: boolean
    syncLogId?: boolean
    createdAt?: boolean
    syncedAt?: boolean
    resolvedAt?: boolean
  }, ExtArgs["result"]["syncOperation"]>

  export type SyncOperationSelectScalar = {
    id?: boolean
    stationId?: boolean
    tableName?: boolean
    recordId?: boolean
    operation?: boolean
    data?: boolean
    syncStatus?: boolean
    sequenceNumber?: boolean
    clientRequestId?: boolean
    transactionId?: boolean
    retryCount?: boolean
    error?: boolean
    syncLogId?: boolean
    createdAt?: boolean
    syncedAt?: boolean
    resolvedAt?: boolean
  }

  export type SyncOperationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "stationId" | "tableName" | "recordId" | "operation" | "data" | "syncStatus" | "sequenceNumber" | "clientRequestId" | "transactionId" | "retryCount" | "error" | "syncLogId" | "createdAt" | "syncedAt" | "resolvedAt", ExtArgs["result"]["syncOperation"]>

  export type $SyncOperationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SyncOperation"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      stationId: string
      tableName: string
      recordId: string
      operation: string
      data: Prisma.JsonValue
      syncStatus: string
      sequenceNumber: number
      clientRequestId: string
      transactionId: string | null
      retryCount: number
      error: string | null
      syncLogId: string | null
      createdAt: Date
      syncedAt: Date | null
      resolvedAt: Date | null
    }, ExtArgs["result"]["syncOperation"]>
    composites: {}
  }

  type SyncOperationGetPayload<S extends boolean | null | undefined | SyncOperationDefaultArgs> = $Result.GetResult<Prisma.$SyncOperationPayload, S>

  type SyncOperationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SyncOperationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SyncOperationCountAggregateInputType | true
    }

  export interface SyncOperationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SyncOperation'], meta: { name: 'SyncOperation' } }
    /**
     * Find zero or one SyncOperation that matches the filter.
     * @param {SyncOperationFindUniqueArgs} args - Arguments to find a SyncOperation
     * @example
     * // Get one SyncOperation
     * const syncOperation = await prisma.syncOperation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SyncOperationFindUniqueArgs>(args: SelectSubset<T, SyncOperationFindUniqueArgs<ExtArgs>>): Prisma__SyncOperationClient<$Result.GetResult<Prisma.$SyncOperationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SyncOperation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SyncOperationFindUniqueOrThrowArgs} args - Arguments to find a SyncOperation
     * @example
     * // Get one SyncOperation
     * const syncOperation = await prisma.syncOperation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SyncOperationFindUniqueOrThrowArgs>(args: SelectSubset<T, SyncOperationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SyncOperationClient<$Result.GetResult<Prisma.$SyncOperationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SyncOperation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncOperationFindFirstArgs} args - Arguments to find a SyncOperation
     * @example
     * // Get one SyncOperation
     * const syncOperation = await prisma.syncOperation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SyncOperationFindFirstArgs>(args?: SelectSubset<T, SyncOperationFindFirstArgs<ExtArgs>>): Prisma__SyncOperationClient<$Result.GetResult<Prisma.$SyncOperationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SyncOperation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncOperationFindFirstOrThrowArgs} args - Arguments to find a SyncOperation
     * @example
     * // Get one SyncOperation
     * const syncOperation = await prisma.syncOperation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SyncOperationFindFirstOrThrowArgs>(args?: SelectSubset<T, SyncOperationFindFirstOrThrowArgs<ExtArgs>>): Prisma__SyncOperationClient<$Result.GetResult<Prisma.$SyncOperationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SyncOperations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncOperationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SyncOperations
     * const syncOperations = await prisma.syncOperation.findMany()
     * 
     * // Get first 10 SyncOperations
     * const syncOperations = await prisma.syncOperation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const syncOperationWithIdOnly = await prisma.syncOperation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SyncOperationFindManyArgs>(args?: SelectSubset<T, SyncOperationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SyncOperationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SyncOperation.
     * @param {SyncOperationCreateArgs} args - Arguments to create a SyncOperation.
     * @example
     * // Create one SyncOperation
     * const SyncOperation = await prisma.syncOperation.create({
     *   data: {
     *     // ... data to create a SyncOperation
     *   }
     * })
     * 
     */
    create<T extends SyncOperationCreateArgs>(args: SelectSubset<T, SyncOperationCreateArgs<ExtArgs>>): Prisma__SyncOperationClient<$Result.GetResult<Prisma.$SyncOperationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SyncOperations.
     * @param {SyncOperationCreateManyArgs} args - Arguments to create many SyncOperations.
     * @example
     * // Create many SyncOperations
     * const syncOperation = await prisma.syncOperation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SyncOperationCreateManyArgs>(args?: SelectSubset<T, SyncOperationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SyncOperations and returns the data saved in the database.
     * @param {SyncOperationCreateManyAndReturnArgs} args - Arguments to create many SyncOperations.
     * @example
     * // Create many SyncOperations
     * const syncOperation = await prisma.syncOperation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SyncOperations and only return the `id`
     * const syncOperationWithIdOnly = await prisma.syncOperation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SyncOperationCreateManyAndReturnArgs>(args?: SelectSubset<T, SyncOperationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SyncOperationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SyncOperation.
     * @param {SyncOperationDeleteArgs} args - Arguments to delete one SyncOperation.
     * @example
     * // Delete one SyncOperation
     * const SyncOperation = await prisma.syncOperation.delete({
     *   where: {
     *     // ... filter to delete one SyncOperation
     *   }
     * })
     * 
     */
    delete<T extends SyncOperationDeleteArgs>(args: SelectSubset<T, SyncOperationDeleteArgs<ExtArgs>>): Prisma__SyncOperationClient<$Result.GetResult<Prisma.$SyncOperationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SyncOperation.
     * @param {SyncOperationUpdateArgs} args - Arguments to update one SyncOperation.
     * @example
     * // Update one SyncOperation
     * const syncOperation = await prisma.syncOperation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SyncOperationUpdateArgs>(args: SelectSubset<T, SyncOperationUpdateArgs<ExtArgs>>): Prisma__SyncOperationClient<$Result.GetResult<Prisma.$SyncOperationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SyncOperations.
     * @param {SyncOperationDeleteManyArgs} args - Arguments to filter SyncOperations to delete.
     * @example
     * // Delete a few SyncOperations
     * const { count } = await prisma.syncOperation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SyncOperationDeleteManyArgs>(args?: SelectSubset<T, SyncOperationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SyncOperations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncOperationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SyncOperations
     * const syncOperation = await prisma.syncOperation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SyncOperationUpdateManyArgs>(args: SelectSubset<T, SyncOperationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SyncOperations and returns the data updated in the database.
     * @param {SyncOperationUpdateManyAndReturnArgs} args - Arguments to update many SyncOperations.
     * @example
     * // Update many SyncOperations
     * const syncOperation = await prisma.syncOperation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SyncOperations and only return the `id`
     * const syncOperationWithIdOnly = await prisma.syncOperation.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SyncOperationUpdateManyAndReturnArgs>(args: SelectSubset<T, SyncOperationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SyncOperationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SyncOperation.
     * @param {SyncOperationUpsertArgs} args - Arguments to update or create a SyncOperation.
     * @example
     * // Update or create a SyncOperation
     * const syncOperation = await prisma.syncOperation.upsert({
     *   create: {
     *     // ... data to create a SyncOperation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SyncOperation we want to update
     *   }
     * })
     */
    upsert<T extends SyncOperationUpsertArgs>(args: SelectSubset<T, SyncOperationUpsertArgs<ExtArgs>>): Prisma__SyncOperationClient<$Result.GetResult<Prisma.$SyncOperationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SyncOperations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncOperationCountArgs} args - Arguments to filter SyncOperations to count.
     * @example
     * // Count the number of SyncOperations
     * const count = await prisma.syncOperation.count({
     *   where: {
     *     // ... the filter for the SyncOperations we want to count
     *   }
     * })
    **/
    count<T extends SyncOperationCountArgs>(
      args?: Subset<T, SyncOperationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SyncOperationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SyncOperation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncOperationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SyncOperationAggregateArgs>(args: Subset<T, SyncOperationAggregateArgs>): Prisma.PrismaPromise<GetSyncOperationAggregateType<T>>

    /**
     * Group by SyncOperation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncOperationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SyncOperationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SyncOperationGroupByArgs['orderBy'] }
        : { orderBy?: SyncOperationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SyncOperationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSyncOperationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SyncOperation model
   */
  readonly fields: SyncOperationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SyncOperation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SyncOperationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SyncOperation model
   */
  interface SyncOperationFieldRefs {
    readonly id: FieldRef<"SyncOperation", 'String'>
    readonly stationId: FieldRef<"SyncOperation", 'String'>
    readonly tableName: FieldRef<"SyncOperation", 'String'>
    readonly recordId: FieldRef<"SyncOperation", 'String'>
    readonly operation: FieldRef<"SyncOperation", 'String'>
    readonly data: FieldRef<"SyncOperation", 'Json'>
    readonly syncStatus: FieldRef<"SyncOperation", 'String'>
    readonly sequenceNumber: FieldRef<"SyncOperation", 'Int'>
    readonly clientRequestId: FieldRef<"SyncOperation", 'String'>
    readonly transactionId: FieldRef<"SyncOperation", 'String'>
    readonly retryCount: FieldRef<"SyncOperation", 'Int'>
    readonly error: FieldRef<"SyncOperation", 'String'>
    readonly syncLogId: FieldRef<"SyncOperation", 'String'>
    readonly createdAt: FieldRef<"SyncOperation", 'DateTime'>
    readonly syncedAt: FieldRef<"SyncOperation", 'DateTime'>
    readonly resolvedAt: FieldRef<"SyncOperation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SyncOperation findUnique
   */
  export type SyncOperationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncOperation
     */
    select?: SyncOperationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncOperation
     */
    omit?: SyncOperationOmit<ExtArgs> | null
    /**
     * Filter, which SyncOperation to fetch.
     */
    where: SyncOperationWhereUniqueInput
  }

  /**
   * SyncOperation findUniqueOrThrow
   */
  export type SyncOperationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncOperation
     */
    select?: SyncOperationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncOperation
     */
    omit?: SyncOperationOmit<ExtArgs> | null
    /**
     * Filter, which SyncOperation to fetch.
     */
    where: SyncOperationWhereUniqueInput
  }

  /**
   * SyncOperation findFirst
   */
  export type SyncOperationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncOperation
     */
    select?: SyncOperationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncOperation
     */
    omit?: SyncOperationOmit<ExtArgs> | null
    /**
     * Filter, which SyncOperation to fetch.
     */
    where?: SyncOperationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SyncOperations to fetch.
     */
    orderBy?: SyncOperationOrderByWithRelationInput | SyncOperationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SyncOperations.
     */
    cursor?: SyncOperationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SyncOperations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SyncOperations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SyncOperations.
     */
    distinct?: SyncOperationScalarFieldEnum | SyncOperationScalarFieldEnum[]
  }

  /**
   * SyncOperation findFirstOrThrow
   */
  export type SyncOperationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncOperation
     */
    select?: SyncOperationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncOperation
     */
    omit?: SyncOperationOmit<ExtArgs> | null
    /**
     * Filter, which SyncOperation to fetch.
     */
    where?: SyncOperationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SyncOperations to fetch.
     */
    orderBy?: SyncOperationOrderByWithRelationInput | SyncOperationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SyncOperations.
     */
    cursor?: SyncOperationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SyncOperations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SyncOperations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SyncOperations.
     */
    distinct?: SyncOperationScalarFieldEnum | SyncOperationScalarFieldEnum[]
  }

  /**
   * SyncOperation findMany
   */
  export type SyncOperationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncOperation
     */
    select?: SyncOperationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncOperation
     */
    omit?: SyncOperationOmit<ExtArgs> | null
    /**
     * Filter, which SyncOperations to fetch.
     */
    where?: SyncOperationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SyncOperations to fetch.
     */
    orderBy?: SyncOperationOrderByWithRelationInput | SyncOperationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SyncOperations.
     */
    cursor?: SyncOperationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SyncOperations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SyncOperations.
     */
    skip?: number
    distinct?: SyncOperationScalarFieldEnum | SyncOperationScalarFieldEnum[]
  }

  /**
   * SyncOperation create
   */
  export type SyncOperationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncOperation
     */
    select?: SyncOperationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncOperation
     */
    omit?: SyncOperationOmit<ExtArgs> | null
    /**
     * The data needed to create a SyncOperation.
     */
    data: XOR<SyncOperationCreateInput, SyncOperationUncheckedCreateInput>
  }

  /**
   * SyncOperation createMany
   */
  export type SyncOperationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SyncOperations.
     */
    data: SyncOperationCreateManyInput | SyncOperationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SyncOperation createManyAndReturn
   */
  export type SyncOperationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncOperation
     */
    select?: SyncOperationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SyncOperation
     */
    omit?: SyncOperationOmit<ExtArgs> | null
    /**
     * The data used to create many SyncOperations.
     */
    data: SyncOperationCreateManyInput | SyncOperationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SyncOperation update
   */
  export type SyncOperationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncOperation
     */
    select?: SyncOperationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncOperation
     */
    omit?: SyncOperationOmit<ExtArgs> | null
    /**
     * The data needed to update a SyncOperation.
     */
    data: XOR<SyncOperationUpdateInput, SyncOperationUncheckedUpdateInput>
    /**
     * Choose, which SyncOperation to update.
     */
    where: SyncOperationWhereUniqueInput
  }

  /**
   * SyncOperation updateMany
   */
  export type SyncOperationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SyncOperations.
     */
    data: XOR<SyncOperationUpdateManyMutationInput, SyncOperationUncheckedUpdateManyInput>
    /**
     * Filter which SyncOperations to update
     */
    where?: SyncOperationWhereInput
    /**
     * Limit how many SyncOperations to update.
     */
    limit?: number
  }

  /**
   * SyncOperation updateManyAndReturn
   */
  export type SyncOperationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncOperation
     */
    select?: SyncOperationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SyncOperation
     */
    omit?: SyncOperationOmit<ExtArgs> | null
    /**
     * The data used to update SyncOperations.
     */
    data: XOR<SyncOperationUpdateManyMutationInput, SyncOperationUncheckedUpdateManyInput>
    /**
     * Filter which SyncOperations to update
     */
    where?: SyncOperationWhereInput
    /**
     * Limit how many SyncOperations to update.
     */
    limit?: number
  }

  /**
   * SyncOperation upsert
   */
  export type SyncOperationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncOperation
     */
    select?: SyncOperationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncOperation
     */
    omit?: SyncOperationOmit<ExtArgs> | null
    /**
     * The filter to search for the SyncOperation to update in case it exists.
     */
    where: SyncOperationWhereUniqueInput
    /**
     * In case the SyncOperation found by the `where` argument doesn't exist, create a new SyncOperation with this data.
     */
    create: XOR<SyncOperationCreateInput, SyncOperationUncheckedCreateInput>
    /**
     * In case the SyncOperation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SyncOperationUpdateInput, SyncOperationUncheckedUpdateInput>
  }

  /**
   * SyncOperation delete
   */
  export type SyncOperationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncOperation
     */
    select?: SyncOperationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncOperation
     */
    omit?: SyncOperationOmit<ExtArgs> | null
    /**
     * Filter which SyncOperation to delete.
     */
    where: SyncOperationWhereUniqueInput
  }

  /**
   * SyncOperation deleteMany
   */
  export type SyncOperationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SyncOperations to delete
     */
    where?: SyncOperationWhereInput
    /**
     * Limit how many SyncOperations to delete.
     */
    limit?: number
  }

  /**
   * SyncOperation without action
   */
  export type SyncOperationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncOperation
     */
    select?: SyncOperationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncOperation
     */
    omit?: SyncOperationOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const StationConfigScalarFieldEnum: {
    id: 'id',
    stationId: 'stationId',
    stationName: 'stationName',
    governorate: 'governorate',
    delegation: 'delegation',
    serverVersion: 'serverVersion',
    lastSync: 'lastSync',
    isOnline: 'isOnline',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type StationConfigScalarFieldEnum = (typeof StationConfigScalarFieldEnum)[keyof typeof StationConfigScalarFieldEnum]


  export const StaffScalarFieldEnum: {
    id: 'id',
    cin: 'cin',
    phoneNumber: 'phoneNumber',
    firstName: 'firstName',
    lastName: 'lastName',
    role: 'role',
    isActive: 'isActive',
    lastLogin: 'lastLogin',
    syncedAt: 'syncedAt'
  };

  export type StaffScalarFieldEnum = (typeof StaffScalarFieldEnum)[keyof typeof StaffScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    id: 'id',
    staffId: 'staffId',
    token: 'token',
    staffData: 'staffData',
    isActive: 'isActive',
    lastActivity: 'lastActivity',
    expiresAt: 'expiresAt',
    createdOffline: 'createdOffline',
    lastOfflineAt: 'lastOfflineAt',
    createdAt: 'createdAt'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const DriverScalarFieldEnum: {
    id: 'id',
    cin: 'cin',
    phoneNumber: 'phoneNumber',
    firstName: 'firstName',
    lastName: 'lastName',
    originGovernorateId: 'originGovernorateId',
    originDelegationId: 'originDelegationId',
    originAddress: 'originAddress',
    vehicleId: 'vehicleId',
    accountStatus: 'accountStatus',
    isActive: 'isActive',
    syncedAt: 'syncedAt'
  };

  export type DriverScalarFieldEnum = (typeof DriverScalarFieldEnum)[keyof typeof DriverScalarFieldEnum]


  export const VehicleScalarFieldEnum: {
    id: 'id',
    licensePlate: 'licensePlate',
    capacity: 'capacity',
    model: 'model',
    year: 'year',
    color: 'color',
    isActive: 'isActive',
    isAvailable: 'isAvailable',
    syncedAt: 'syncedAt'
  };

  export type VehicleScalarFieldEnum = (typeof VehicleScalarFieldEnum)[keyof typeof VehicleScalarFieldEnum]


  export const VehicleAuthorizedStationScalarFieldEnum: {
    id: 'id',
    vehicleId: 'vehicleId',
    stationId: 'stationId',
    createdAt: 'createdAt',
    syncedAt: 'syncedAt'
  };

  export type VehicleAuthorizedStationScalarFieldEnum = (typeof VehicleAuthorizedStationScalarFieldEnum)[keyof typeof VehicleAuthorizedStationScalarFieldEnum]


  export const VehicleQueueScalarFieldEnum: {
    id: 'id',
    vehicleId: 'vehicleId',
    destinationId: 'destinationId',
    destinationName: 'destinationName',
    queueType: 'queueType',
    queuePosition: 'queuePosition',
    status: 'status',
    enteredAt: 'enteredAt',
    availableSeats: 'availableSeats',
    totalSeats: 'totalSeats',
    basePrice: 'basePrice',
    estimatedDeparture: 'estimatedDeparture',
    actualDeparture: 'actualDeparture',
    syncedAt: 'syncedAt'
  };

  export type VehicleQueueScalarFieldEnum = (typeof VehicleQueueScalarFieldEnum)[keyof typeof VehicleQueueScalarFieldEnum]


  export const RouteScalarFieldEnum: {
    id: 'id',
    departureStationId: 'departureStationId',
    destinationStationId: 'destinationStationId',
    destinationName: 'destinationName',
    basePrice: 'basePrice',
    isActive: 'isActive',
    syncedAt: 'syncedAt'
  };

  export type RouteScalarFieldEnum = (typeof RouteScalarFieldEnum)[keyof typeof RouteScalarFieldEnum]


  export const VehicleScheduleScalarFieldEnum: {
    id: 'id',
    vehicleId: 'vehicleId',
    routeId: 'routeId',
    departureTime: 'departureTime',
    availableSeats: 'availableSeats',
    totalSeats: 'totalSeats',
    status: 'status',
    actualDeparture: 'actualDeparture',
    syncedAt: 'syncedAt'
  };

  export type VehicleScheduleScalarFieldEnum = (typeof VehicleScheduleScalarFieldEnum)[keyof typeof VehicleScheduleScalarFieldEnum]


  export const BookingScalarFieldEnum: {
    id: 'id',
    queueId: 'queueId',
    seatsBooked: 'seatsBooked',
    totalAmount: 'totalAmount',
    bookingSource: 'bookingSource',
    bookingType: 'bookingType',
    customerName: 'customerName',
    customerPhone: 'customerPhone',
    onlineTicketId: 'onlineTicketId',
    paymentStatus: 'paymentStatus',
    paymentMethod: 'paymentMethod',
    verificationCode: 'verificationCode',
    qrCode: 'qrCode',
    isVerified: 'isVerified',
    verifiedAt: 'verifiedAt',
    verifiedById: 'verifiedById',
    createdOffline: 'createdOffline',
    localId: 'localId',
    createdBy: 'createdBy',
    createdAt: 'createdAt',
    syncStatus: 'syncStatus'
  };

  export type BookingScalarFieldEnum = (typeof BookingScalarFieldEnum)[keyof typeof BookingScalarFieldEnum]


  export const SyncQueueScalarFieldEnum: {
    id: 'id',
    tableName: 'tableName',
    recordId: 'recordId',
    operation: 'operation',
    data: 'data',
    syncStatus: 'syncStatus',
    retryCount: 'retryCount',
    error: 'error',
    createdAt: 'createdAt',
    lastAttempt: 'lastAttempt'
  };

  export type SyncQueueScalarFieldEnum = (typeof SyncQueueScalarFieldEnum)[keyof typeof SyncQueueScalarFieldEnum]


  export const OperationLogScalarFieldEnum: {
    id: 'id',
    staffId: 'staffId',
    operation: 'operation',
    details: 'details',
    success: 'success',
    error: 'error',
    createdAt: 'createdAt'
  };

  export type OperationLogScalarFieldEnum = (typeof OperationLogScalarFieldEnum)[keyof typeof OperationLogScalarFieldEnum]


  export const OfflineCustomerScalarFieldEnum: {
    id: 'id',
    name: 'name',
    phone: 'phone',
    cin: 'cin',
    createdAt: 'createdAt'
  };

  export type OfflineCustomerScalarFieldEnum = (typeof OfflineCustomerScalarFieldEnum)[keyof typeof OfflineCustomerScalarFieldEnum]


  export const SyncOperationScalarFieldEnum: {
    id: 'id',
    stationId: 'stationId',
    tableName: 'tableName',
    recordId: 'recordId',
    operation: 'operation',
    data: 'data',
    syncStatus: 'syncStatus',
    sequenceNumber: 'sequenceNumber',
    clientRequestId: 'clientRequestId',
    transactionId: 'transactionId',
    retryCount: 'retryCount',
    error: 'error',
    syncLogId: 'syncLogId',
    createdAt: 'createdAt',
    syncedAt: 'syncedAt',
    resolvedAt: 'resolvedAt'
  };

  export type SyncOperationScalarFieldEnum = (typeof SyncOperationScalarFieldEnum)[keyof typeof SyncOperationScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    
  /**
   * Deep Input Types
   */


  export type StationConfigWhereInput = {
    AND?: StationConfigWhereInput | StationConfigWhereInput[]
    OR?: StationConfigWhereInput[]
    NOT?: StationConfigWhereInput | StationConfigWhereInput[]
    id?: StringFilter<"StationConfig"> | string
    stationId?: StringFilter<"StationConfig"> | string
    stationName?: StringFilter<"StationConfig"> | string
    governorate?: StringFilter<"StationConfig"> | string
    delegation?: StringFilter<"StationConfig"> | string
    serverVersion?: StringFilter<"StationConfig"> | string
    lastSync?: DateTimeNullableFilter<"StationConfig"> | Date | string | null
    isOnline?: BoolFilter<"StationConfig"> | boolean
    createdAt?: DateTimeFilter<"StationConfig"> | Date | string
    updatedAt?: DateTimeFilter<"StationConfig"> | Date | string
  }

  export type StationConfigOrderByWithRelationInput = {
    id?: SortOrder
    stationId?: SortOrder
    stationName?: SortOrder
    governorate?: SortOrder
    delegation?: SortOrder
    serverVersion?: SortOrder
    lastSync?: SortOrderInput | SortOrder
    isOnline?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StationConfigWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    stationId?: string
    AND?: StationConfigWhereInput | StationConfigWhereInput[]
    OR?: StationConfigWhereInput[]
    NOT?: StationConfigWhereInput | StationConfigWhereInput[]
    stationName?: StringFilter<"StationConfig"> | string
    governorate?: StringFilter<"StationConfig"> | string
    delegation?: StringFilter<"StationConfig"> | string
    serverVersion?: StringFilter<"StationConfig"> | string
    lastSync?: DateTimeNullableFilter<"StationConfig"> | Date | string | null
    isOnline?: BoolFilter<"StationConfig"> | boolean
    createdAt?: DateTimeFilter<"StationConfig"> | Date | string
    updatedAt?: DateTimeFilter<"StationConfig"> | Date | string
  }, "id" | "stationId">

  export type StationConfigOrderByWithAggregationInput = {
    id?: SortOrder
    stationId?: SortOrder
    stationName?: SortOrder
    governorate?: SortOrder
    delegation?: SortOrder
    serverVersion?: SortOrder
    lastSync?: SortOrderInput | SortOrder
    isOnline?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: StationConfigCountOrderByAggregateInput
    _max?: StationConfigMaxOrderByAggregateInput
    _min?: StationConfigMinOrderByAggregateInput
  }

  export type StationConfigScalarWhereWithAggregatesInput = {
    AND?: StationConfigScalarWhereWithAggregatesInput | StationConfigScalarWhereWithAggregatesInput[]
    OR?: StationConfigScalarWhereWithAggregatesInput[]
    NOT?: StationConfigScalarWhereWithAggregatesInput | StationConfigScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"StationConfig"> | string
    stationId?: StringWithAggregatesFilter<"StationConfig"> | string
    stationName?: StringWithAggregatesFilter<"StationConfig"> | string
    governorate?: StringWithAggregatesFilter<"StationConfig"> | string
    delegation?: StringWithAggregatesFilter<"StationConfig"> | string
    serverVersion?: StringWithAggregatesFilter<"StationConfig"> | string
    lastSync?: DateTimeNullableWithAggregatesFilter<"StationConfig"> | Date | string | null
    isOnline?: BoolWithAggregatesFilter<"StationConfig"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"StationConfig"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"StationConfig"> | Date | string
  }

  export type StaffWhereInput = {
    AND?: StaffWhereInput | StaffWhereInput[]
    OR?: StaffWhereInput[]
    NOT?: StaffWhereInput | StaffWhereInput[]
    id?: StringFilter<"Staff"> | string
    cin?: StringFilter<"Staff"> | string
    phoneNumber?: StringFilter<"Staff"> | string
    firstName?: StringFilter<"Staff"> | string
    lastName?: StringFilter<"Staff"> | string
    role?: StringFilter<"Staff"> | string
    isActive?: BoolFilter<"Staff"> | boolean
    lastLogin?: DateTimeNullableFilter<"Staff"> | Date | string | null
    syncedAt?: DateTimeFilter<"Staff"> | Date | string
    bookings?: BookingListRelationFilter
    verifications?: BookingListRelationFilter
    sessions?: SessionListRelationFilter
  }

  export type StaffOrderByWithRelationInput = {
    id?: SortOrder
    cin?: SortOrder
    phoneNumber?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    lastLogin?: SortOrderInput | SortOrder
    syncedAt?: SortOrder
    bookings?: BookingOrderByRelationAggregateInput
    verifications?: BookingOrderByRelationAggregateInput
    sessions?: SessionOrderByRelationAggregateInput
  }

  export type StaffWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    cin?: string
    AND?: StaffWhereInput | StaffWhereInput[]
    OR?: StaffWhereInput[]
    NOT?: StaffWhereInput | StaffWhereInput[]
    phoneNumber?: StringFilter<"Staff"> | string
    firstName?: StringFilter<"Staff"> | string
    lastName?: StringFilter<"Staff"> | string
    role?: StringFilter<"Staff"> | string
    isActive?: BoolFilter<"Staff"> | boolean
    lastLogin?: DateTimeNullableFilter<"Staff"> | Date | string | null
    syncedAt?: DateTimeFilter<"Staff"> | Date | string
    bookings?: BookingListRelationFilter
    verifications?: BookingListRelationFilter
    sessions?: SessionListRelationFilter
  }, "id" | "cin">

  export type StaffOrderByWithAggregationInput = {
    id?: SortOrder
    cin?: SortOrder
    phoneNumber?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    lastLogin?: SortOrderInput | SortOrder
    syncedAt?: SortOrder
    _count?: StaffCountOrderByAggregateInput
    _max?: StaffMaxOrderByAggregateInput
    _min?: StaffMinOrderByAggregateInput
  }

  export type StaffScalarWhereWithAggregatesInput = {
    AND?: StaffScalarWhereWithAggregatesInput | StaffScalarWhereWithAggregatesInput[]
    OR?: StaffScalarWhereWithAggregatesInput[]
    NOT?: StaffScalarWhereWithAggregatesInput | StaffScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Staff"> | string
    cin?: StringWithAggregatesFilter<"Staff"> | string
    phoneNumber?: StringWithAggregatesFilter<"Staff"> | string
    firstName?: StringWithAggregatesFilter<"Staff"> | string
    lastName?: StringWithAggregatesFilter<"Staff"> | string
    role?: StringWithAggregatesFilter<"Staff"> | string
    isActive?: BoolWithAggregatesFilter<"Staff"> | boolean
    lastLogin?: DateTimeNullableWithAggregatesFilter<"Staff"> | Date | string | null
    syncedAt?: DateTimeWithAggregatesFilter<"Staff"> | Date | string
  }

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    id?: StringFilter<"Session"> | string
    staffId?: StringFilter<"Session"> | string
    token?: StringFilter<"Session"> | string
    staffData?: StringFilter<"Session"> | string
    isActive?: BoolFilter<"Session"> | boolean
    lastActivity?: DateTimeFilter<"Session"> | Date | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    createdOffline?: BoolFilter<"Session"> | boolean
    lastOfflineAt?: DateTimeNullableFilter<"Session"> | Date | string | null
    createdAt?: DateTimeFilter<"Session"> | Date | string
    staff?: XOR<StaffScalarRelationFilter, StaffWhereInput>
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    staffId?: SortOrder
    token?: SortOrder
    staffData?: SortOrder
    isActive?: SortOrder
    lastActivity?: SortOrder
    expiresAt?: SortOrder
    createdOffline?: SortOrder
    lastOfflineAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    staff?: StaffOrderByWithRelationInput
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    staffId?: StringFilter<"Session"> | string
    staffData?: StringFilter<"Session"> | string
    isActive?: BoolFilter<"Session"> | boolean
    lastActivity?: DateTimeFilter<"Session"> | Date | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    createdOffline?: BoolFilter<"Session"> | boolean
    lastOfflineAt?: DateTimeNullableFilter<"Session"> | Date | string | null
    createdAt?: DateTimeFilter<"Session"> | Date | string
    staff?: XOR<StaffScalarRelationFilter, StaffWhereInput>
  }, "id" | "token">

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    staffId?: SortOrder
    token?: SortOrder
    staffData?: SortOrder
    isActive?: SortOrder
    lastActivity?: SortOrder
    expiresAt?: SortOrder
    createdOffline?: SortOrder
    lastOfflineAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: SessionCountOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Session"> | string
    staffId?: StringWithAggregatesFilter<"Session"> | string
    token?: StringWithAggregatesFilter<"Session"> | string
    staffData?: StringWithAggregatesFilter<"Session"> | string
    isActive?: BoolWithAggregatesFilter<"Session"> | boolean
    lastActivity?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    expiresAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    createdOffline?: BoolWithAggregatesFilter<"Session"> | boolean
    lastOfflineAt?: DateTimeNullableWithAggregatesFilter<"Session"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
  }

  export type DriverWhereInput = {
    AND?: DriverWhereInput | DriverWhereInput[]
    OR?: DriverWhereInput[]
    NOT?: DriverWhereInput | DriverWhereInput[]
    id?: StringFilter<"Driver"> | string
    cin?: StringFilter<"Driver"> | string
    phoneNumber?: StringFilter<"Driver"> | string
    firstName?: StringFilter<"Driver"> | string
    lastName?: StringFilter<"Driver"> | string
    originGovernorateId?: StringNullableFilter<"Driver"> | string | null
    originDelegationId?: StringNullableFilter<"Driver"> | string | null
    originAddress?: StringNullableFilter<"Driver"> | string | null
    vehicleId?: StringNullableFilter<"Driver"> | string | null
    accountStatus?: StringFilter<"Driver"> | string
    isActive?: BoolFilter<"Driver"> | boolean
    syncedAt?: DateTimeFilter<"Driver"> | Date | string
    vehicle?: XOR<VehicleNullableScalarRelationFilter, VehicleWhereInput> | null
  }

  export type DriverOrderByWithRelationInput = {
    id?: SortOrder
    cin?: SortOrder
    phoneNumber?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    originGovernorateId?: SortOrderInput | SortOrder
    originDelegationId?: SortOrderInput | SortOrder
    originAddress?: SortOrderInput | SortOrder
    vehicleId?: SortOrderInput | SortOrder
    accountStatus?: SortOrder
    isActive?: SortOrder
    syncedAt?: SortOrder
    vehicle?: VehicleOrderByWithRelationInput
  }

  export type DriverWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    cin?: string
    vehicleId?: string
    AND?: DriverWhereInput | DriverWhereInput[]
    OR?: DriverWhereInput[]
    NOT?: DriverWhereInput | DriverWhereInput[]
    phoneNumber?: StringFilter<"Driver"> | string
    firstName?: StringFilter<"Driver"> | string
    lastName?: StringFilter<"Driver"> | string
    originGovernorateId?: StringNullableFilter<"Driver"> | string | null
    originDelegationId?: StringNullableFilter<"Driver"> | string | null
    originAddress?: StringNullableFilter<"Driver"> | string | null
    accountStatus?: StringFilter<"Driver"> | string
    isActive?: BoolFilter<"Driver"> | boolean
    syncedAt?: DateTimeFilter<"Driver"> | Date | string
    vehicle?: XOR<VehicleNullableScalarRelationFilter, VehicleWhereInput> | null
  }, "id" | "cin" | "vehicleId">

  export type DriverOrderByWithAggregationInput = {
    id?: SortOrder
    cin?: SortOrder
    phoneNumber?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    originGovernorateId?: SortOrderInput | SortOrder
    originDelegationId?: SortOrderInput | SortOrder
    originAddress?: SortOrderInput | SortOrder
    vehicleId?: SortOrderInput | SortOrder
    accountStatus?: SortOrder
    isActive?: SortOrder
    syncedAt?: SortOrder
    _count?: DriverCountOrderByAggregateInput
    _max?: DriverMaxOrderByAggregateInput
    _min?: DriverMinOrderByAggregateInput
  }

  export type DriverScalarWhereWithAggregatesInput = {
    AND?: DriverScalarWhereWithAggregatesInput | DriverScalarWhereWithAggregatesInput[]
    OR?: DriverScalarWhereWithAggregatesInput[]
    NOT?: DriverScalarWhereWithAggregatesInput | DriverScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Driver"> | string
    cin?: StringWithAggregatesFilter<"Driver"> | string
    phoneNumber?: StringWithAggregatesFilter<"Driver"> | string
    firstName?: StringWithAggregatesFilter<"Driver"> | string
    lastName?: StringWithAggregatesFilter<"Driver"> | string
    originGovernorateId?: StringNullableWithAggregatesFilter<"Driver"> | string | null
    originDelegationId?: StringNullableWithAggregatesFilter<"Driver"> | string | null
    originAddress?: StringNullableWithAggregatesFilter<"Driver"> | string | null
    vehicleId?: StringNullableWithAggregatesFilter<"Driver"> | string | null
    accountStatus?: StringWithAggregatesFilter<"Driver"> | string
    isActive?: BoolWithAggregatesFilter<"Driver"> | boolean
    syncedAt?: DateTimeWithAggregatesFilter<"Driver"> | Date | string
  }

  export type VehicleWhereInput = {
    AND?: VehicleWhereInput | VehicleWhereInput[]
    OR?: VehicleWhereInput[]
    NOT?: VehicleWhereInput | VehicleWhereInput[]
    id?: StringFilter<"Vehicle"> | string
    licensePlate?: StringFilter<"Vehicle"> | string
    capacity?: IntFilter<"Vehicle"> | number
    model?: StringNullableFilter<"Vehicle"> | string | null
    year?: IntNullableFilter<"Vehicle"> | number | null
    color?: StringNullableFilter<"Vehicle"> | string | null
    isActive?: BoolFilter<"Vehicle"> | boolean
    isAvailable?: BoolFilter<"Vehicle"> | boolean
    syncedAt?: DateTimeFilter<"Vehicle"> | Date | string
    driver?: XOR<DriverNullableScalarRelationFilter, DriverWhereInput> | null
    queueEntries?: VehicleQueueListRelationFilter
    authorizedStations?: VehicleAuthorizedStationListRelationFilter
  }

  export type VehicleOrderByWithRelationInput = {
    id?: SortOrder
    licensePlate?: SortOrder
    capacity?: SortOrder
    model?: SortOrderInput | SortOrder
    year?: SortOrderInput | SortOrder
    color?: SortOrderInput | SortOrder
    isActive?: SortOrder
    isAvailable?: SortOrder
    syncedAt?: SortOrder
    driver?: DriverOrderByWithRelationInput
    queueEntries?: VehicleQueueOrderByRelationAggregateInput
    authorizedStations?: VehicleAuthorizedStationOrderByRelationAggregateInput
  }

  export type VehicleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    licensePlate?: string
    AND?: VehicleWhereInput | VehicleWhereInput[]
    OR?: VehicleWhereInput[]
    NOT?: VehicleWhereInput | VehicleWhereInput[]
    capacity?: IntFilter<"Vehicle"> | number
    model?: StringNullableFilter<"Vehicle"> | string | null
    year?: IntNullableFilter<"Vehicle"> | number | null
    color?: StringNullableFilter<"Vehicle"> | string | null
    isActive?: BoolFilter<"Vehicle"> | boolean
    isAvailable?: BoolFilter<"Vehicle"> | boolean
    syncedAt?: DateTimeFilter<"Vehicle"> | Date | string
    driver?: XOR<DriverNullableScalarRelationFilter, DriverWhereInput> | null
    queueEntries?: VehicleQueueListRelationFilter
    authorizedStations?: VehicleAuthorizedStationListRelationFilter
  }, "id" | "licensePlate">

  export type VehicleOrderByWithAggregationInput = {
    id?: SortOrder
    licensePlate?: SortOrder
    capacity?: SortOrder
    model?: SortOrderInput | SortOrder
    year?: SortOrderInput | SortOrder
    color?: SortOrderInput | SortOrder
    isActive?: SortOrder
    isAvailable?: SortOrder
    syncedAt?: SortOrder
    _count?: VehicleCountOrderByAggregateInput
    _avg?: VehicleAvgOrderByAggregateInput
    _max?: VehicleMaxOrderByAggregateInput
    _min?: VehicleMinOrderByAggregateInput
    _sum?: VehicleSumOrderByAggregateInput
  }

  export type VehicleScalarWhereWithAggregatesInput = {
    AND?: VehicleScalarWhereWithAggregatesInput | VehicleScalarWhereWithAggregatesInput[]
    OR?: VehicleScalarWhereWithAggregatesInput[]
    NOT?: VehicleScalarWhereWithAggregatesInput | VehicleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Vehicle"> | string
    licensePlate?: StringWithAggregatesFilter<"Vehicle"> | string
    capacity?: IntWithAggregatesFilter<"Vehicle"> | number
    model?: StringNullableWithAggregatesFilter<"Vehicle"> | string | null
    year?: IntNullableWithAggregatesFilter<"Vehicle"> | number | null
    color?: StringNullableWithAggregatesFilter<"Vehicle"> | string | null
    isActive?: BoolWithAggregatesFilter<"Vehicle"> | boolean
    isAvailable?: BoolWithAggregatesFilter<"Vehicle"> | boolean
    syncedAt?: DateTimeWithAggregatesFilter<"Vehicle"> | Date | string
  }

  export type VehicleAuthorizedStationWhereInput = {
    AND?: VehicleAuthorizedStationWhereInput | VehicleAuthorizedStationWhereInput[]
    OR?: VehicleAuthorizedStationWhereInput[]
    NOT?: VehicleAuthorizedStationWhereInput | VehicleAuthorizedStationWhereInput[]
    id?: StringFilter<"VehicleAuthorizedStation"> | string
    vehicleId?: StringFilter<"VehicleAuthorizedStation"> | string
    stationId?: StringFilter<"VehicleAuthorizedStation"> | string
    createdAt?: DateTimeFilter<"VehicleAuthorizedStation"> | Date | string
    syncedAt?: DateTimeFilter<"VehicleAuthorizedStation"> | Date | string
    vehicle?: XOR<VehicleScalarRelationFilter, VehicleWhereInput>
  }

  export type VehicleAuthorizedStationOrderByWithRelationInput = {
    id?: SortOrder
    vehicleId?: SortOrder
    stationId?: SortOrder
    createdAt?: SortOrder
    syncedAt?: SortOrder
    vehicle?: VehicleOrderByWithRelationInput
  }

  export type VehicleAuthorizedStationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    vehicleId_stationId?: VehicleAuthorizedStationVehicleIdStationIdCompoundUniqueInput
    AND?: VehicleAuthorizedStationWhereInput | VehicleAuthorizedStationWhereInput[]
    OR?: VehicleAuthorizedStationWhereInput[]
    NOT?: VehicleAuthorizedStationWhereInput | VehicleAuthorizedStationWhereInput[]
    vehicleId?: StringFilter<"VehicleAuthorizedStation"> | string
    stationId?: StringFilter<"VehicleAuthorizedStation"> | string
    createdAt?: DateTimeFilter<"VehicleAuthorizedStation"> | Date | string
    syncedAt?: DateTimeFilter<"VehicleAuthorizedStation"> | Date | string
    vehicle?: XOR<VehicleScalarRelationFilter, VehicleWhereInput>
  }, "id" | "vehicleId_stationId">

  export type VehicleAuthorizedStationOrderByWithAggregationInput = {
    id?: SortOrder
    vehicleId?: SortOrder
    stationId?: SortOrder
    createdAt?: SortOrder
    syncedAt?: SortOrder
    _count?: VehicleAuthorizedStationCountOrderByAggregateInput
    _max?: VehicleAuthorizedStationMaxOrderByAggregateInput
    _min?: VehicleAuthorizedStationMinOrderByAggregateInput
  }

  export type VehicleAuthorizedStationScalarWhereWithAggregatesInput = {
    AND?: VehicleAuthorizedStationScalarWhereWithAggregatesInput | VehicleAuthorizedStationScalarWhereWithAggregatesInput[]
    OR?: VehicleAuthorizedStationScalarWhereWithAggregatesInput[]
    NOT?: VehicleAuthorizedStationScalarWhereWithAggregatesInput | VehicleAuthorizedStationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"VehicleAuthorizedStation"> | string
    vehicleId?: StringWithAggregatesFilter<"VehicleAuthorizedStation"> | string
    stationId?: StringWithAggregatesFilter<"VehicleAuthorizedStation"> | string
    createdAt?: DateTimeWithAggregatesFilter<"VehicleAuthorizedStation"> | Date | string
    syncedAt?: DateTimeWithAggregatesFilter<"VehicleAuthorizedStation"> | Date | string
  }

  export type VehicleQueueWhereInput = {
    AND?: VehicleQueueWhereInput | VehicleQueueWhereInput[]
    OR?: VehicleQueueWhereInput[]
    NOT?: VehicleQueueWhereInput | VehicleQueueWhereInput[]
    id?: StringFilter<"VehicleQueue"> | string
    vehicleId?: StringFilter<"VehicleQueue"> | string
    destinationId?: StringFilter<"VehicleQueue"> | string
    destinationName?: StringFilter<"VehicleQueue"> | string
    queueType?: StringFilter<"VehicleQueue"> | string
    queuePosition?: IntFilter<"VehicleQueue"> | number
    status?: StringFilter<"VehicleQueue"> | string
    enteredAt?: DateTimeFilter<"VehicleQueue"> | Date | string
    availableSeats?: IntFilter<"VehicleQueue"> | number
    totalSeats?: IntFilter<"VehicleQueue"> | number
    basePrice?: FloatFilter<"VehicleQueue"> | number
    estimatedDeparture?: DateTimeNullableFilter<"VehicleQueue"> | Date | string | null
    actualDeparture?: DateTimeNullableFilter<"VehicleQueue"> | Date | string | null
    syncedAt?: DateTimeFilter<"VehicleQueue"> | Date | string
    vehicle?: XOR<VehicleScalarRelationFilter, VehicleWhereInput>
    bookings?: BookingListRelationFilter
  }

  export type VehicleQueueOrderByWithRelationInput = {
    id?: SortOrder
    vehicleId?: SortOrder
    destinationId?: SortOrder
    destinationName?: SortOrder
    queueType?: SortOrder
    queuePosition?: SortOrder
    status?: SortOrder
    enteredAt?: SortOrder
    availableSeats?: SortOrder
    totalSeats?: SortOrder
    basePrice?: SortOrder
    estimatedDeparture?: SortOrderInput | SortOrder
    actualDeparture?: SortOrderInput | SortOrder
    syncedAt?: SortOrder
    vehicle?: VehicleOrderByWithRelationInput
    bookings?: BookingOrderByRelationAggregateInput
  }

  export type VehicleQueueWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: VehicleQueueWhereInput | VehicleQueueWhereInput[]
    OR?: VehicleQueueWhereInput[]
    NOT?: VehicleQueueWhereInput | VehicleQueueWhereInput[]
    vehicleId?: StringFilter<"VehicleQueue"> | string
    destinationId?: StringFilter<"VehicleQueue"> | string
    destinationName?: StringFilter<"VehicleQueue"> | string
    queueType?: StringFilter<"VehicleQueue"> | string
    queuePosition?: IntFilter<"VehicleQueue"> | number
    status?: StringFilter<"VehicleQueue"> | string
    enteredAt?: DateTimeFilter<"VehicleQueue"> | Date | string
    availableSeats?: IntFilter<"VehicleQueue"> | number
    totalSeats?: IntFilter<"VehicleQueue"> | number
    basePrice?: FloatFilter<"VehicleQueue"> | number
    estimatedDeparture?: DateTimeNullableFilter<"VehicleQueue"> | Date | string | null
    actualDeparture?: DateTimeNullableFilter<"VehicleQueue"> | Date | string | null
    syncedAt?: DateTimeFilter<"VehicleQueue"> | Date | string
    vehicle?: XOR<VehicleScalarRelationFilter, VehicleWhereInput>
    bookings?: BookingListRelationFilter
  }, "id">

  export type VehicleQueueOrderByWithAggregationInput = {
    id?: SortOrder
    vehicleId?: SortOrder
    destinationId?: SortOrder
    destinationName?: SortOrder
    queueType?: SortOrder
    queuePosition?: SortOrder
    status?: SortOrder
    enteredAt?: SortOrder
    availableSeats?: SortOrder
    totalSeats?: SortOrder
    basePrice?: SortOrder
    estimatedDeparture?: SortOrderInput | SortOrder
    actualDeparture?: SortOrderInput | SortOrder
    syncedAt?: SortOrder
    _count?: VehicleQueueCountOrderByAggregateInput
    _avg?: VehicleQueueAvgOrderByAggregateInput
    _max?: VehicleQueueMaxOrderByAggregateInput
    _min?: VehicleQueueMinOrderByAggregateInput
    _sum?: VehicleQueueSumOrderByAggregateInput
  }

  export type VehicleQueueScalarWhereWithAggregatesInput = {
    AND?: VehicleQueueScalarWhereWithAggregatesInput | VehicleQueueScalarWhereWithAggregatesInput[]
    OR?: VehicleQueueScalarWhereWithAggregatesInput[]
    NOT?: VehicleQueueScalarWhereWithAggregatesInput | VehicleQueueScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"VehicleQueue"> | string
    vehicleId?: StringWithAggregatesFilter<"VehicleQueue"> | string
    destinationId?: StringWithAggregatesFilter<"VehicleQueue"> | string
    destinationName?: StringWithAggregatesFilter<"VehicleQueue"> | string
    queueType?: StringWithAggregatesFilter<"VehicleQueue"> | string
    queuePosition?: IntWithAggregatesFilter<"VehicleQueue"> | number
    status?: StringWithAggregatesFilter<"VehicleQueue"> | string
    enteredAt?: DateTimeWithAggregatesFilter<"VehicleQueue"> | Date | string
    availableSeats?: IntWithAggregatesFilter<"VehicleQueue"> | number
    totalSeats?: IntWithAggregatesFilter<"VehicleQueue"> | number
    basePrice?: FloatWithAggregatesFilter<"VehicleQueue"> | number
    estimatedDeparture?: DateTimeNullableWithAggregatesFilter<"VehicleQueue"> | Date | string | null
    actualDeparture?: DateTimeNullableWithAggregatesFilter<"VehicleQueue"> | Date | string | null
    syncedAt?: DateTimeWithAggregatesFilter<"VehicleQueue"> | Date | string
  }

  export type RouteWhereInput = {
    AND?: RouteWhereInput | RouteWhereInput[]
    OR?: RouteWhereInput[]
    NOT?: RouteWhereInput | RouteWhereInput[]
    id?: StringFilter<"Route"> | string
    departureStationId?: StringFilter<"Route"> | string
    destinationStationId?: StringFilter<"Route"> | string
    destinationName?: StringFilter<"Route"> | string
    basePrice?: FloatFilter<"Route"> | number
    isActive?: BoolFilter<"Route"> | boolean
    syncedAt?: DateTimeFilter<"Route"> | Date | string
    schedules?: VehicleScheduleListRelationFilter
  }

  export type RouteOrderByWithRelationInput = {
    id?: SortOrder
    departureStationId?: SortOrder
    destinationStationId?: SortOrder
    destinationName?: SortOrder
    basePrice?: SortOrder
    isActive?: SortOrder
    syncedAt?: SortOrder
    schedules?: VehicleScheduleOrderByRelationAggregateInput
  }

  export type RouteWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RouteWhereInput | RouteWhereInput[]
    OR?: RouteWhereInput[]
    NOT?: RouteWhereInput | RouteWhereInput[]
    departureStationId?: StringFilter<"Route"> | string
    destinationStationId?: StringFilter<"Route"> | string
    destinationName?: StringFilter<"Route"> | string
    basePrice?: FloatFilter<"Route"> | number
    isActive?: BoolFilter<"Route"> | boolean
    syncedAt?: DateTimeFilter<"Route"> | Date | string
    schedules?: VehicleScheduleListRelationFilter
  }, "id">

  export type RouteOrderByWithAggregationInput = {
    id?: SortOrder
    departureStationId?: SortOrder
    destinationStationId?: SortOrder
    destinationName?: SortOrder
    basePrice?: SortOrder
    isActive?: SortOrder
    syncedAt?: SortOrder
    _count?: RouteCountOrderByAggregateInput
    _avg?: RouteAvgOrderByAggregateInput
    _max?: RouteMaxOrderByAggregateInput
    _min?: RouteMinOrderByAggregateInput
    _sum?: RouteSumOrderByAggregateInput
  }

  export type RouteScalarWhereWithAggregatesInput = {
    AND?: RouteScalarWhereWithAggregatesInput | RouteScalarWhereWithAggregatesInput[]
    OR?: RouteScalarWhereWithAggregatesInput[]
    NOT?: RouteScalarWhereWithAggregatesInput | RouteScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Route"> | string
    departureStationId?: StringWithAggregatesFilter<"Route"> | string
    destinationStationId?: StringWithAggregatesFilter<"Route"> | string
    destinationName?: StringWithAggregatesFilter<"Route"> | string
    basePrice?: FloatWithAggregatesFilter<"Route"> | number
    isActive?: BoolWithAggregatesFilter<"Route"> | boolean
    syncedAt?: DateTimeWithAggregatesFilter<"Route"> | Date | string
  }

  export type VehicleScheduleWhereInput = {
    AND?: VehicleScheduleWhereInput | VehicleScheduleWhereInput[]
    OR?: VehicleScheduleWhereInput[]
    NOT?: VehicleScheduleWhereInput | VehicleScheduleWhereInput[]
    id?: StringFilter<"VehicleSchedule"> | string
    vehicleId?: StringFilter<"VehicleSchedule"> | string
    routeId?: StringFilter<"VehicleSchedule"> | string
    departureTime?: DateTimeFilter<"VehicleSchedule"> | Date | string
    availableSeats?: IntFilter<"VehicleSchedule"> | number
    totalSeats?: IntFilter<"VehicleSchedule"> | number
    status?: StringFilter<"VehicleSchedule"> | string
    actualDeparture?: DateTimeNullableFilter<"VehicleSchedule"> | Date | string | null
    syncedAt?: DateTimeFilter<"VehicleSchedule"> | Date | string
    route?: XOR<RouteScalarRelationFilter, RouteWhereInput>
  }

  export type VehicleScheduleOrderByWithRelationInput = {
    id?: SortOrder
    vehicleId?: SortOrder
    routeId?: SortOrder
    departureTime?: SortOrder
    availableSeats?: SortOrder
    totalSeats?: SortOrder
    status?: SortOrder
    actualDeparture?: SortOrderInput | SortOrder
    syncedAt?: SortOrder
    route?: RouteOrderByWithRelationInput
  }

  export type VehicleScheduleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: VehicleScheduleWhereInput | VehicleScheduleWhereInput[]
    OR?: VehicleScheduleWhereInput[]
    NOT?: VehicleScheduleWhereInput | VehicleScheduleWhereInput[]
    vehicleId?: StringFilter<"VehicleSchedule"> | string
    routeId?: StringFilter<"VehicleSchedule"> | string
    departureTime?: DateTimeFilter<"VehicleSchedule"> | Date | string
    availableSeats?: IntFilter<"VehicleSchedule"> | number
    totalSeats?: IntFilter<"VehicleSchedule"> | number
    status?: StringFilter<"VehicleSchedule"> | string
    actualDeparture?: DateTimeNullableFilter<"VehicleSchedule"> | Date | string | null
    syncedAt?: DateTimeFilter<"VehicleSchedule"> | Date | string
    route?: XOR<RouteScalarRelationFilter, RouteWhereInput>
  }, "id">

  export type VehicleScheduleOrderByWithAggregationInput = {
    id?: SortOrder
    vehicleId?: SortOrder
    routeId?: SortOrder
    departureTime?: SortOrder
    availableSeats?: SortOrder
    totalSeats?: SortOrder
    status?: SortOrder
    actualDeparture?: SortOrderInput | SortOrder
    syncedAt?: SortOrder
    _count?: VehicleScheduleCountOrderByAggregateInput
    _avg?: VehicleScheduleAvgOrderByAggregateInput
    _max?: VehicleScheduleMaxOrderByAggregateInput
    _min?: VehicleScheduleMinOrderByAggregateInput
    _sum?: VehicleScheduleSumOrderByAggregateInput
  }

  export type VehicleScheduleScalarWhereWithAggregatesInput = {
    AND?: VehicleScheduleScalarWhereWithAggregatesInput | VehicleScheduleScalarWhereWithAggregatesInput[]
    OR?: VehicleScheduleScalarWhereWithAggregatesInput[]
    NOT?: VehicleScheduleScalarWhereWithAggregatesInput | VehicleScheduleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"VehicleSchedule"> | string
    vehicleId?: StringWithAggregatesFilter<"VehicleSchedule"> | string
    routeId?: StringWithAggregatesFilter<"VehicleSchedule"> | string
    departureTime?: DateTimeWithAggregatesFilter<"VehicleSchedule"> | Date | string
    availableSeats?: IntWithAggregatesFilter<"VehicleSchedule"> | number
    totalSeats?: IntWithAggregatesFilter<"VehicleSchedule"> | number
    status?: StringWithAggregatesFilter<"VehicleSchedule"> | string
    actualDeparture?: DateTimeNullableWithAggregatesFilter<"VehicleSchedule"> | Date | string | null
    syncedAt?: DateTimeWithAggregatesFilter<"VehicleSchedule"> | Date | string
  }

  export type BookingWhereInput = {
    AND?: BookingWhereInput | BookingWhereInput[]
    OR?: BookingWhereInput[]
    NOT?: BookingWhereInput | BookingWhereInput[]
    id?: StringFilter<"Booking"> | string
    queueId?: StringFilter<"Booking"> | string
    seatsBooked?: IntFilter<"Booking"> | number
    totalAmount?: FloatFilter<"Booking"> | number
    bookingSource?: StringFilter<"Booking"> | string
    bookingType?: StringFilter<"Booking"> | string
    customerName?: StringNullableFilter<"Booking"> | string | null
    customerPhone?: StringNullableFilter<"Booking"> | string | null
    onlineTicketId?: StringNullableFilter<"Booking"> | string | null
    paymentStatus?: StringFilter<"Booking"> | string
    paymentMethod?: StringFilter<"Booking"> | string
    verificationCode?: StringFilter<"Booking"> | string
    qrCode?: StringNullableFilter<"Booking"> | string | null
    isVerified?: BoolFilter<"Booking"> | boolean
    verifiedAt?: DateTimeNullableFilter<"Booking"> | Date | string | null
    verifiedById?: StringNullableFilter<"Booking"> | string | null
    createdOffline?: BoolFilter<"Booking"> | boolean
    localId?: StringNullableFilter<"Booking"> | string | null
    createdBy?: StringNullableFilter<"Booking"> | string | null
    createdAt?: DateTimeFilter<"Booking"> | Date | string
    syncStatus?: StringFilter<"Booking"> | string
    queue?: XOR<VehicleQueueScalarRelationFilter, VehicleQueueWhereInput>
    createdByStaff?: XOR<StaffNullableScalarRelationFilter, StaffWhereInput> | null
    verifiedByStaff?: XOR<StaffNullableScalarRelationFilter, StaffWhereInput> | null
  }

  export type BookingOrderByWithRelationInput = {
    id?: SortOrder
    queueId?: SortOrder
    seatsBooked?: SortOrder
    totalAmount?: SortOrder
    bookingSource?: SortOrder
    bookingType?: SortOrder
    customerName?: SortOrderInput | SortOrder
    customerPhone?: SortOrderInput | SortOrder
    onlineTicketId?: SortOrderInput | SortOrder
    paymentStatus?: SortOrder
    paymentMethod?: SortOrder
    verificationCode?: SortOrder
    qrCode?: SortOrderInput | SortOrder
    isVerified?: SortOrder
    verifiedAt?: SortOrderInput | SortOrder
    verifiedById?: SortOrderInput | SortOrder
    createdOffline?: SortOrder
    localId?: SortOrderInput | SortOrder
    createdBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    syncStatus?: SortOrder
    queue?: VehicleQueueOrderByWithRelationInput
    createdByStaff?: StaffOrderByWithRelationInput
    verifiedByStaff?: StaffOrderByWithRelationInput
  }

  export type BookingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    onlineTicketId?: string
    verificationCode?: string
    localId?: string
    AND?: BookingWhereInput | BookingWhereInput[]
    OR?: BookingWhereInput[]
    NOT?: BookingWhereInput | BookingWhereInput[]
    queueId?: StringFilter<"Booking"> | string
    seatsBooked?: IntFilter<"Booking"> | number
    totalAmount?: FloatFilter<"Booking"> | number
    bookingSource?: StringFilter<"Booking"> | string
    bookingType?: StringFilter<"Booking"> | string
    customerName?: StringNullableFilter<"Booking"> | string | null
    customerPhone?: StringNullableFilter<"Booking"> | string | null
    paymentStatus?: StringFilter<"Booking"> | string
    paymentMethod?: StringFilter<"Booking"> | string
    qrCode?: StringNullableFilter<"Booking"> | string | null
    isVerified?: BoolFilter<"Booking"> | boolean
    verifiedAt?: DateTimeNullableFilter<"Booking"> | Date | string | null
    verifiedById?: StringNullableFilter<"Booking"> | string | null
    createdOffline?: BoolFilter<"Booking"> | boolean
    createdBy?: StringNullableFilter<"Booking"> | string | null
    createdAt?: DateTimeFilter<"Booking"> | Date | string
    syncStatus?: StringFilter<"Booking"> | string
    queue?: XOR<VehicleQueueScalarRelationFilter, VehicleQueueWhereInput>
    createdByStaff?: XOR<StaffNullableScalarRelationFilter, StaffWhereInput> | null
    verifiedByStaff?: XOR<StaffNullableScalarRelationFilter, StaffWhereInput> | null
  }, "id" | "onlineTicketId" | "verificationCode" | "localId">

  export type BookingOrderByWithAggregationInput = {
    id?: SortOrder
    queueId?: SortOrder
    seatsBooked?: SortOrder
    totalAmount?: SortOrder
    bookingSource?: SortOrder
    bookingType?: SortOrder
    customerName?: SortOrderInput | SortOrder
    customerPhone?: SortOrderInput | SortOrder
    onlineTicketId?: SortOrderInput | SortOrder
    paymentStatus?: SortOrder
    paymentMethod?: SortOrder
    verificationCode?: SortOrder
    qrCode?: SortOrderInput | SortOrder
    isVerified?: SortOrder
    verifiedAt?: SortOrderInput | SortOrder
    verifiedById?: SortOrderInput | SortOrder
    createdOffline?: SortOrder
    localId?: SortOrderInput | SortOrder
    createdBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    syncStatus?: SortOrder
    _count?: BookingCountOrderByAggregateInput
    _avg?: BookingAvgOrderByAggregateInput
    _max?: BookingMaxOrderByAggregateInput
    _min?: BookingMinOrderByAggregateInput
    _sum?: BookingSumOrderByAggregateInput
  }

  export type BookingScalarWhereWithAggregatesInput = {
    AND?: BookingScalarWhereWithAggregatesInput | BookingScalarWhereWithAggregatesInput[]
    OR?: BookingScalarWhereWithAggregatesInput[]
    NOT?: BookingScalarWhereWithAggregatesInput | BookingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Booking"> | string
    queueId?: StringWithAggregatesFilter<"Booking"> | string
    seatsBooked?: IntWithAggregatesFilter<"Booking"> | number
    totalAmount?: FloatWithAggregatesFilter<"Booking"> | number
    bookingSource?: StringWithAggregatesFilter<"Booking"> | string
    bookingType?: StringWithAggregatesFilter<"Booking"> | string
    customerName?: StringNullableWithAggregatesFilter<"Booking"> | string | null
    customerPhone?: StringNullableWithAggregatesFilter<"Booking"> | string | null
    onlineTicketId?: StringNullableWithAggregatesFilter<"Booking"> | string | null
    paymentStatus?: StringWithAggregatesFilter<"Booking"> | string
    paymentMethod?: StringWithAggregatesFilter<"Booking"> | string
    verificationCode?: StringWithAggregatesFilter<"Booking"> | string
    qrCode?: StringNullableWithAggregatesFilter<"Booking"> | string | null
    isVerified?: BoolWithAggregatesFilter<"Booking"> | boolean
    verifiedAt?: DateTimeNullableWithAggregatesFilter<"Booking"> | Date | string | null
    verifiedById?: StringNullableWithAggregatesFilter<"Booking"> | string | null
    createdOffline?: BoolWithAggregatesFilter<"Booking"> | boolean
    localId?: StringNullableWithAggregatesFilter<"Booking"> | string | null
    createdBy?: StringNullableWithAggregatesFilter<"Booking"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Booking"> | Date | string
    syncStatus?: StringWithAggregatesFilter<"Booking"> | string
  }

  export type SyncQueueWhereInput = {
    AND?: SyncQueueWhereInput | SyncQueueWhereInput[]
    OR?: SyncQueueWhereInput[]
    NOT?: SyncQueueWhereInput | SyncQueueWhereInput[]
    id?: IntFilter<"SyncQueue"> | number
    tableName?: StringFilter<"SyncQueue"> | string
    recordId?: StringFilter<"SyncQueue"> | string
    operation?: StringFilter<"SyncQueue"> | string
    data?: StringFilter<"SyncQueue"> | string
    syncStatus?: StringFilter<"SyncQueue"> | string
    retryCount?: IntFilter<"SyncQueue"> | number
    error?: StringNullableFilter<"SyncQueue"> | string | null
    createdAt?: DateTimeFilter<"SyncQueue"> | Date | string
    lastAttempt?: DateTimeNullableFilter<"SyncQueue"> | Date | string | null
  }

  export type SyncQueueOrderByWithRelationInput = {
    id?: SortOrder
    tableName?: SortOrder
    recordId?: SortOrder
    operation?: SortOrder
    data?: SortOrder
    syncStatus?: SortOrder
    retryCount?: SortOrder
    error?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    lastAttempt?: SortOrderInput | SortOrder
  }

  export type SyncQueueWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: SyncQueueWhereInput | SyncQueueWhereInput[]
    OR?: SyncQueueWhereInput[]
    NOT?: SyncQueueWhereInput | SyncQueueWhereInput[]
    tableName?: StringFilter<"SyncQueue"> | string
    recordId?: StringFilter<"SyncQueue"> | string
    operation?: StringFilter<"SyncQueue"> | string
    data?: StringFilter<"SyncQueue"> | string
    syncStatus?: StringFilter<"SyncQueue"> | string
    retryCount?: IntFilter<"SyncQueue"> | number
    error?: StringNullableFilter<"SyncQueue"> | string | null
    createdAt?: DateTimeFilter<"SyncQueue"> | Date | string
    lastAttempt?: DateTimeNullableFilter<"SyncQueue"> | Date | string | null
  }, "id">

  export type SyncQueueOrderByWithAggregationInput = {
    id?: SortOrder
    tableName?: SortOrder
    recordId?: SortOrder
    operation?: SortOrder
    data?: SortOrder
    syncStatus?: SortOrder
    retryCount?: SortOrder
    error?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    lastAttempt?: SortOrderInput | SortOrder
    _count?: SyncQueueCountOrderByAggregateInput
    _avg?: SyncQueueAvgOrderByAggregateInput
    _max?: SyncQueueMaxOrderByAggregateInput
    _min?: SyncQueueMinOrderByAggregateInput
    _sum?: SyncQueueSumOrderByAggregateInput
  }

  export type SyncQueueScalarWhereWithAggregatesInput = {
    AND?: SyncQueueScalarWhereWithAggregatesInput | SyncQueueScalarWhereWithAggregatesInput[]
    OR?: SyncQueueScalarWhereWithAggregatesInput[]
    NOT?: SyncQueueScalarWhereWithAggregatesInput | SyncQueueScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"SyncQueue"> | number
    tableName?: StringWithAggregatesFilter<"SyncQueue"> | string
    recordId?: StringWithAggregatesFilter<"SyncQueue"> | string
    operation?: StringWithAggregatesFilter<"SyncQueue"> | string
    data?: StringWithAggregatesFilter<"SyncQueue"> | string
    syncStatus?: StringWithAggregatesFilter<"SyncQueue"> | string
    retryCount?: IntWithAggregatesFilter<"SyncQueue"> | number
    error?: StringNullableWithAggregatesFilter<"SyncQueue"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"SyncQueue"> | Date | string
    lastAttempt?: DateTimeNullableWithAggregatesFilter<"SyncQueue"> | Date | string | null
  }

  export type OperationLogWhereInput = {
    AND?: OperationLogWhereInput | OperationLogWhereInput[]
    OR?: OperationLogWhereInput[]
    NOT?: OperationLogWhereInput | OperationLogWhereInput[]
    id?: IntFilter<"OperationLog"> | number
    staffId?: StringFilter<"OperationLog"> | string
    operation?: StringFilter<"OperationLog"> | string
    details?: StringNullableFilter<"OperationLog"> | string | null
    success?: BoolFilter<"OperationLog"> | boolean
    error?: StringNullableFilter<"OperationLog"> | string | null
    createdAt?: DateTimeFilter<"OperationLog"> | Date | string
  }

  export type OperationLogOrderByWithRelationInput = {
    id?: SortOrder
    staffId?: SortOrder
    operation?: SortOrder
    details?: SortOrderInput | SortOrder
    success?: SortOrder
    error?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type OperationLogWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: OperationLogWhereInput | OperationLogWhereInput[]
    OR?: OperationLogWhereInput[]
    NOT?: OperationLogWhereInput | OperationLogWhereInput[]
    staffId?: StringFilter<"OperationLog"> | string
    operation?: StringFilter<"OperationLog"> | string
    details?: StringNullableFilter<"OperationLog"> | string | null
    success?: BoolFilter<"OperationLog"> | boolean
    error?: StringNullableFilter<"OperationLog"> | string | null
    createdAt?: DateTimeFilter<"OperationLog"> | Date | string
  }, "id">

  export type OperationLogOrderByWithAggregationInput = {
    id?: SortOrder
    staffId?: SortOrder
    operation?: SortOrder
    details?: SortOrderInput | SortOrder
    success?: SortOrder
    error?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: OperationLogCountOrderByAggregateInput
    _avg?: OperationLogAvgOrderByAggregateInput
    _max?: OperationLogMaxOrderByAggregateInput
    _min?: OperationLogMinOrderByAggregateInput
    _sum?: OperationLogSumOrderByAggregateInput
  }

  export type OperationLogScalarWhereWithAggregatesInput = {
    AND?: OperationLogScalarWhereWithAggregatesInput | OperationLogScalarWhereWithAggregatesInput[]
    OR?: OperationLogScalarWhereWithAggregatesInput[]
    NOT?: OperationLogScalarWhereWithAggregatesInput | OperationLogScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"OperationLog"> | number
    staffId?: StringWithAggregatesFilter<"OperationLog"> | string
    operation?: StringWithAggregatesFilter<"OperationLog"> | string
    details?: StringNullableWithAggregatesFilter<"OperationLog"> | string | null
    success?: BoolWithAggregatesFilter<"OperationLog"> | boolean
    error?: StringNullableWithAggregatesFilter<"OperationLog"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"OperationLog"> | Date | string
  }

  export type OfflineCustomerWhereInput = {
    AND?: OfflineCustomerWhereInput | OfflineCustomerWhereInput[]
    OR?: OfflineCustomerWhereInput[]
    NOT?: OfflineCustomerWhereInput | OfflineCustomerWhereInput[]
    id?: IntFilter<"OfflineCustomer"> | number
    name?: StringFilter<"OfflineCustomer"> | string
    phone?: StringNullableFilter<"OfflineCustomer"> | string | null
    cin?: StringNullableFilter<"OfflineCustomer"> | string | null
    createdAt?: DateTimeFilter<"OfflineCustomer"> | Date | string
  }

  export type OfflineCustomerOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrderInput | SortOrder
    cin?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type OfflineCustomerWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: OfflineCustomerWhereInput | OfflineCustomerWhereInput[]
    OR?: OfflineCustomerWhereInput[]
    NOT?: OfflineCustomerWhereInput | OfflineCustomerWhereInput[]
    name?: StringFilter<"OfflineCustomer"> | string
    phone?: StringNullableFilter<"OfflineCustomer"> | string | null
    cin?: StringNullableFilter<"OfflineCustomer"> | string | null
    createdAt?: DateTimeFilter<"OfflineCustomer"> | Date | string
  }, "id">

  export type OfflineCustomerOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrderInput | SortOrder
    cin?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: OfflineCustomerCountOrderByAggregateInput
    _avg?: OfflineCustomerAvgOrderByAggregateInput
    _max?: OfflineCustomerMaxOrderByAggregateInput
    _min?: OfflineCustomerMinOrderByAggregateInput
    _sum?: OfflineCustomerSumOrderByAggregateInput
  }

  export type OfflineCustomerScalarWhereWithAggregatesInput = {
    AND?: OfflineCustomerScalarWhereWithAggregatesInput | OfflineCustomerScalarWhereWithAggregatesInput[]
    OR?: OfflineCustomerScalarWhereWithAggregatesInput[]
    NOT?: OfflineCustomerScalarWhereWithAggregatesInput | OfflineCustomerScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"OfflineCustomer"> | number
    name?: StringWithAggregatesFilter<"OfflineCustomer"> | string
    phone?: StringNullableWithAggregatesFilter<"OfflineCustomer"> | string | null
    cin?: StringNullableWithAggregatesFilter<"OfflineCustomer"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"OfflineCustomer"> | Date | string
  }

  export type SyncOperationWhereInput = {
    AND?: SyncOperationWhereInput | SyncOperationWhereInput[]
    OR?: SyncOperationWhereInput[]
    NOT?: SyncOperationWhereInput | SyncOperationWhereInput[]
    id?: StringFilter<"SyncOperation"> | string
    stationId?: StringFilter<"SyncOperation"> | string
    tableName?: StringFilter<"SyncOperation"> | string
    recordId?: StringFilter<"SyncOperation"> | string
    operation?: StringFilter<"SyncOperation"> | string
    data?: JsonFilter<"SyncOperation">
    syncStatus?: StringFilter<"SyncOperation"> | string
    sequenceNumber?: IntFilter<"SyncOperation"> | number
    clientRequestId?: StringFilter<"SyncOperation"> | string
    transactionId?: StringNullableFilter<"SyncOperation"> | string | null
    retryCount?: IntFilter<"SyncOperation"> | number
    error?: StringNullableFilter<"SyncOperation"> | string | null
    syncLogId?: StringNullableFilter<"SyncOperation"> | string | null
    createdAt?: DateTimeFilter<"SyncOperation"> | Date | string
    syncedAt?: DateTimeNullableFilter<"SyncOperation"> | Date | string | null
    resolvedAt?: DateTimeNullableFilter<"SyncOperation"> | Date | string | null
  }

  export type SyncOperationOrderByWithRelationInput = {
    id?: SortOrder
    stationId?: SortOrder
    tableName?: SortOrder
    recordId?: SortOrder
    operation?: SortOrder
    data?: SortOrder
    syncStatus?: SortOrder
    sequenceNumber?: SortOrder
    clientRequestId?: SortOrder
    transactionId?: SortOrderInput | SortOrder
    retryCount?: SortOrder
    error?: SortOrderInput | SortOrder
    syncLogId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    syncedAt?: SortOrderInput | SortOrder
    resolvedAt?: SortOrderInput | SortOrder
  }

  export type SyncOperationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    clientRequestId?: string
    AND?: SyncOperationWhereInput | SyncOperationWhereInput[]
    OR?: SyncOperationWhereInput[]
    NOT?: SyncOperationWhereInput | SyncOperationWhereInput[]
    stationId?: StringFilter<"SyncOperation"> | string
    tableName?: StringFilter<"SyncOperation"> | string
    recordId?: StringFilter<"SyncOperation"> | string
    operation?: StringFilter<"SyncOperation"> | string
    data?: JsonFilter<"SyncOperation">
    syncStatus?: StringFilter<"SyncOperation"> | string
    sequenceNumber?: IntFilter<"SyncOperation"> | number
    transactionId?: StringNullableFilter<"SyncOperation"> | string | null
    retryCount?: IntFilter<"SyncOperation"> | number
    error?: StringNullableFilter<"SyncOperation"> | string | null
    syncLogId?: StringNullableFilter<"SyncOperation"> | string | null
    createdAt?: DateTimeFilter<"SyncOperation"> | Date | string
    syncedAt?: DateTimeNullableFilter<"SyncOperation"> | Date | string | null
    resolvedAt?: DateTimeNullableFilter<"SyncOperation"> | Date | string | null
  }, "id" | "clientRequestId">

  export type SyncOperationOrderByWithAggregationInput = {
    id?: SortOrder
    stationId?: SortOrder
    tableName?: SortOrder
    recordId?: SortOrder
    operation?: SortOrder
    data?: SortOrder
    syncStatus?: SortOrder
    sequenceNumber?: SortOrder
    clientRequestId?: SortOrder
    transactionId?: SortOrderInput | SortOrder
    retryCount?: SortOrder
    error?: SortOrderInput | SortOrder
    syncLogId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    syncedAt?: SortOrderInput | SortOrder
    resolvedAt?: SortOrderInput | SortOrder
    _count?: SyncOperationCountOrderByAggregateInput
    _avg?: SyncOperationAvgOrderByAggregateInput
    _max?: SyncOperationMaxOrderByAggregateInput
    _min?: SyncOperationMinOrderByAggregateInput
    _sum?: SyncOperationSumOrderByAggregateInput
  }

  export type SyncOperationScalarWhereWithAggregatesInput = {
    AND?: SyncOperationScalarWhereWithAggregatesInput | SyncOperationScalarWhereWithAggregatesInput[]
    OR?: SyncOperationScalarWhereWithAggregatesInput[]
    NOT?: SyncOperationScalarWhereWithAggregatesInput | SyncOperationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SyncOperation"> | string
    stationId?: StringWithAggregatesFilter<"SyncOperation"> | string
    tableName?: StringWithAggregatesFilter<"SyncOperation"> | string
    recordId?: StringWithAggregatesFilter<"SyncOperation"> | string
    operation?: StringWithAggregatesFilter<"SyncOperation"> | string
    data?: JsonWithAggregatesFilter<"SyncOperation">
    syncStatus?: StringWithAggregatesFilter<"SyncOperation"> | string
    sequenceNumber?: IntWithAggregatesFilter<"SyncOperation"> | number
    clientRequestId?: StringWithAggregatesFilter<"SyncOperation"> | string
    transactionId?: StringNullableWithAggregatesFilter<"SyncOperation"> | string | null
    retryCount?: IntWithAggregatesFilter<"SyncOperation"> | number
    error?: StringNullableWithAggregatesFilter<"SyncOperation"> | string | null
    syncLogId?: StringNullableWithAggregatesFilter<"SyncOperation"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"SyncOperation"> | Date | string
    syncedAt?: DateTimeNullableWithAggregatesFilter<"SyncOperation"> | Date | string | null
    resolvedAt?: DateTimeNullableWithAggregatesFilter<"SyncOperation"> | Date | string | null
  }

  export type StationConfigCreateInput = {
    id?: string
    stationId: string
    stationName: string
    governorate: string
    delegation: string
    serverVersion: string
    lastSync?: Date | string | null
    isOnline?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StationConfigUncheckedCreateInput = {
    id?: string
    stationId: string
    stationName: string
    governorate: string
    delegation: string
    serverVersion: string
    lastSync?: Date | string | null
    isOnline?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StationConfigUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    stationId?: StringFieldUpdateOperationsInput | string
    stationName?: StringFieldUpdateOperationsInput | string
    governorate?: StringFieldUpdateOperationsInput | string
    delegation?: StringFieldUpdateOperationsInput | string
    serverVersion?: StringFieldUpdateOperationsInput | string
    lastSync?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StationConfigUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    stationId?: StringFieldUpdateOperationsInput | string
    stationName?: StringFieldUpdateOperationsInput | string
    governorate?: StringFieldUpdateOperationsInput | string
    delegation?: StringFieldUpdateOperationsInput | string
    serverVersion?: StringFieldUpdateOperationsInput | string
    lastSync?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StationConfigCreateManyInput = {
    id?: string
    stationId: string
    stationName: string
    governorate: string
    delegation: string
    serverVersion: string
    lastSync?: Date | string | null
    isOnline?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StationConfigUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    stationId?: StringFieldUpdateOperationsInput | string
    stationName?: StringFieldUpdateOperationsInput | string
    governorate?: StringFieldUpdateOperationsInput | string
    delegation?: StringFieldUpdateOperationsInput | string
    serverVersion?: StringFieldUpdateOperationsInput | string
    lastSync?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StationConfigUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    stationId?: StringFieldUpdateOperationsInput | string
    stationName?: StringFieldUpdateOperationsInput | string
    governorate?: StringFieldUpdateOperationsInput | string
    delegation?: StringFieldUpdateOperationsInput | string
    serverVersion?: StringFieldUpdateOperationsInput | string
    lastSync?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isOnline?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StaffCreateInput = {
    id: string
    cin: string
    phoneNumber: string
    firstName: string
    lastName: string
    role: string
    isActive?: boolean
    lastLogin?: Date | string | null
    syncedAt: Date | string
    bookings?: BookingCreateNestedManyWithoutCreatedByStaffInput
    verifications?: BookingCreateNestedManyWithoutVerifiedByStaffInput
    sessions?: SessionCreateNestedManyWithoutStaffInput
  }

  export type StaffUncheckedCreateInput = {
    id: string
    cin: string
    phoneNumber: string
    firstName: string
    lastName: string
    role: string
    isActive?: boolean
    lastLogin?: Date | string | null
    syncedAt: Date | string
    bookings?: BookingUncheckedCreateNestedManyWithoutCreatedByStaffInput
    verifications?: BookingUncheckedCreateNestedManyWithoutVerifiedByStaffInput
    sessions?: SessionUncheckedCreateNestedManyWithoutStaffInput
  }

  export type StaffUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    cin?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookings?: BookingUpdateManyWithoutCreatedByStaffNestedInput
    verifications?: BookingUpdateManyWithoutVerifiedByStaffNestedInput
    sessions?: SessionUpdateManyWithoutStaffNestedInput
  }

  export type StaffUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    cin?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookings?: BookingUncheckedUpdateManyWithoutCreatedByStaffNestedInput
    verifications?: BookingUncheckedUpdateManyWithoutVerifiedByStaffNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutStaffNestedInput
  }

  export type StaffCreateManyInput = {
    id: string
    cin: string
    phoneNumber: string
    firstName: string
    lastName: string
    role: string
    isActive?: boolean
    lastLogin?: Date | string | null
    syncedAt: Date | string
  }

  export type StaffUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    cin?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StaffUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    cin?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateInput = {
    id?: string
    token: string
    staffData: string
    isActive?: boolean
    lastActivity?: Date | string
    expiresAt: Date | string
    createdOffline?: boolean
    lastOfflineAt?: Date | string | null
    createdAt?: Date | string
    staff: StaffCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateInput = {
    id?: string
    staffId: string
    token: string
    staffData: string
    isActive?: boolean
    lastActivity?: Date | string
    expiresAt: Date | string
    createdOffline?: boolean
    lastOfflineAt?: Date | string | null
    createdAt?: Date | string
  }

  export type SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    staffData?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastActivity?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdOffline?: BoolFieldUpdateOperationsInput | boolean
    lastOfflineAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    staff?: StaffUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    staffId?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    staffData?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastActivity?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdOffline?: BoolFieldUpdateOperationsInput | boolean
    lastOfflineAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateManyInput = {
    id?: string
    staffId: string
    token: string
    staffData: string
    isActive?: boolean
    lastActivity?: Date | string
    expiresAt: Date | string
    createdOffline?: boolean
    lastOfflineAt?: Date | string | null
    createdAt?: Date | string
  }

  export type SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    staffData?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastActivity?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdOffline?: BoolFieldUpdateOperationsInput | boolean
    lastOfflineAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    staffId?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    staffData?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastActivity?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdOffline?: BoolFieldUpdateOperationsInput | boolean
    lastOfflineAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DriverCreateInput = {
    id: string
    cin: string
    phoneNumber: string
    firstName: string
    lastName: string
    originGovernorateId?: string | null
    originDelegationId?: string | null
    originAddress?: string | null
    accountStatus?: string
    isActive?: boolean
    syncedAt: Date | string
    vehicle?: VehicleCreateNestedOneWithoutDriverInput
  }

  export type DriverUncheckedCreateInput = {
    id: string
    cin: string
    phoneNumber: string
    firstName: string
    lastName: string
    originGovernorateId?: string | null
    originDelegationId?: string | null
    originAddress?: string | null
    vehicleId?: string | null
    accountStatus?: string
    isActive?: boolean
    syncedAt: Date | string
  }

  export type DriverUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    cin?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    originGovernorateId?: NullableStringFieldUpdateOperationsInput | string | null
    originDelegationId?: NullableStringFieldUpdateOperationsInput | string | null
    originAddress?: NullableStringFieldUpdateOperationsInput | string | null
    accountStatus?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vehicle?: VehicleUpdateOneWithoutDriverNestedInput
  }

  export type DriverUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    cin?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    originGovernorateId?: NullableStringFieldUpdateOperationsInput | string | null
    originDelegationId?: NullableStringFieldUpdateOperationsInput | string | null
    originAddress?: NullableStringFieldUpdateOperationsInput | string | null
    vehicleId?: NullableStringFieldUpdateOperationsInput | string | null
    accountStatus?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DriverCreateManyInput = {
    id: string
    cin: string
    phoneNumber: string
    firstName: string
    lastName: string
    originGovernorateId?: string | null
    originDelegationId?: string | null
    originAddress?: string | null
    vehicleId?: string | null
    accountStatus?: string
    isActive?: boolean
    syncedAt: Date | string
  }

  export type DriverUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    cin?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    originGovernorateId?: NullableStringFieldUpdateOperationsInput | string | null
    originDelegationId?: NullableStringFieldUpdateOperationsInput | string | null
    originAddress?: NullableStringFieldUpdateOperationsInput | string | null
    accountStatus?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DriverUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    cin?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    originGovernorateId?: NullableStringFieldUpdateOperationsInput | string | null
    originDelegationId?: NullableStringFieldUpdateOperationsInput | string | null
    originAddress?: NullableStringFieldUpdateOperationsInput | string | null
    vehicleId?: NullableStringFieldUpdateOperationsInput | string | null
    accountStatus?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VehicleCreateInput = {
    id: string
    licensePlate: string
    capacity: number
    model?: string | null
    year?: number | null
    color?: string | null
    isActive?: boolean
    isAvailable?: boolean
    syncedAt: Date | string
    driver?: DriverCreateNestedOneWithoutVehicleInput
    queueEntries?: VehicleQueueCreateNestedManyWithoutVehicleInput
    authorizedStations?: VehicleAuthorizedStationCreateNestedManyWithoutVehicleInput
  }

  export type VehicleUncheckedCreateInput = {
    id: string
    licensePlate: string
    capacity: number
    model?: string | null
    year?: number | null
    color?: string | null
    isActive?: boolean
    isAvailable?: boolean
    syncedAt: Date | string
    driver?: DriverUncheckedCreateNestedOneWithoutVehicleInput
    queueEntries?: VehicleQueueUncheckedCreateNestedManyWithoutVehicleInput
    authorizedStations?: VehicleAuthorizedStationUncheckedCreateNestedManyWithoutVehicleInput
  }

  export type VehicleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    licensePlate?: StringFieldUpdateOperationsInput | string
    capacity?: IntFieldUpdateOperationsInput | number
    model?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    driver?: DriverUpdateOneWithoutVehicleNestedInput
    queueEntries?: VehicleQueueUpdateManyWithoutVehicleNestedInput
    authorizedStations?: VehicleAuthorizedStationUpdateManyWithoutVehicleNestedInput
  }

  export type VehicleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    licensePlate?: StringFieldUpdateOperationsInput | string
    capacity?: IntFieldUpdateOperationsInput | number
    model?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    driver?: DriverUncheckedUpdateOneWithoutVehicleNestedInput
    queueEntries?: VehicleQueueUncheckedUpdateManyWithoutVehicleNestedInput
    authorizedStations?: VehicleAuthorizedStationUncheckedUpdateManyWithoutVehicleNestedInput
  }

  export type VehicleCreateManyInput = {
    id: string
    licensePlate: string
    capacity: number
    model?: string | null
    year?: number | null
    color?: string | null
    isActive?: boolean
    isAvailable?: boolean
    syncedAt: Date | string
  }

  export type VehicleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    licensePlate?: StringFieldUpdateOperationsInput | string
    capacity?: IntFieldUpdateOperationsInput | number
    model?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VehicleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    licensePlate?: StringFieldUpdateOperationsInput | string
    capacity?: IntFieldUpdateOperationsInput | number
    model?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VehicleAuthorizedStationCreateInput = {
    id?: string
    stationId: string
    createdAt?: Date | string
    syncedAt: Date | string
    vehicle: VehicleCreateNestedOneWithoutAuthorizedStationsInput
  }

  export type VehicleAuthorizedStationUncheckedCreateInput = {
    id?: string
    vehicleId: string
    stationId: string
    createdAt?: Date | string
    syncedAt: Date | string
  }

  export type VehicleAuthorizedStationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    stationId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vehicle?: VehicleUpdateOneRequiredWithoutAuthorizedStationsNestedInput
  }

  export type VehicleAuthorizedStationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    vehicleId?: StringFieldUpdateOperationsInput | string
    stationId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VehicleAuthorizedStationCreateManyInput = {
    id?: string
    vehicleId: string
    stationId: string
    createdAt?: Date | string
    syncedAt: Date | string
  }

  export type VehicleAuthorizedStationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    stationId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VehicleAuthorizedStationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    vehicleId?: StringFieldUpdateOperationsInput | string
    stationId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VehicleQueueCreateInput = {
    id: string
    destinationId: string
    destinationName: string
    queueType?: string
    queuePosition: number
    status?: string
    enteredAt: Date | string
    availableSeats: number
    totalSeats: number
    basePrice: number
    estimatedDeparture?: Date | string | null
    actualDeparture?: Date | string | null
    syncedAt: Date | string
    vehicle: VehicleCreateNestedOneWithoutQueueEntriesInput
    bookings?: BookingCreateNestedManyWithoutQueueInput
  }

  export type VehicleQueueUncheckedCreateInput = {
    id: string
    vehicleId: string
    destinationId: string
    destinationName: string
    queueType?: string
    queuePosition: number
    status?: string
    enteredAt: Date | string
    availableSeats: number
    totalSeats: number
    basePrice: number
    estimatedDeparture?: Date | string | null
    actualDeparture?: Date | string | null
    syncedAt: Date | string
    bookings?: BookingUncheckedCreateNestedManyWithoutQueueInput
  }

  export type VehicleQueueUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    destinationId?: StringFieldUpdateOperationsInput | string
    destinationName?: StringFieldUpdateOperationsInput | string
    queueType?: StringFieldUpdateOperationsInput | string
    queuePosition?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    enteredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    availableSeats?: IntFieldUpdateOperationsInput | number
    totalSeats?: IntFieldUpdateOperationsInput | number
    basePrice?: FloatFieldUpdateOperationsInput | number
    estimatedDeparture?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualDeparture?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vehicle?: VehicleUpdateOneRequiredWithoutQueueEntriesNestedInput
    bookings?: BookingUpdateManyWithoutQueueNestedInput
  }

  export type VehicleQueueUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    vehicleId?: StringFieldUpdateOperationsInput | string
    destinationId?: StringFieldUpdateOperationsInput | string
    destinationName?: StringFieldUpdateOperationsInput | string
    queueType?: StringFieldUpdateOperationsInput | string
    queuePosition?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    enteredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    availableSeats?: IntFieldUpdateOperationsInput | number
    totalSeats?: IntFieldUpdateOperationsInput | number
    basePrice?: FloatFieldUpdateOperationsInput | number
    estimatedDeparture?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualDeparture?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookings?: BookingUncheckedUpdateManyWithoutQueueNestedInput
  }

  export type VehicleQueueCreateManyInput = {
    id: string
    vehicleId: string
    destinationId: string
    destinationName: string
    queueType?: string
    queuePosition: number
    status?: string
    enteredAt: Date | string
    availableSeats: number
    totalSeats: number
    basePrice: number
    estimatedDeparture?: Date | string | null
    actualDeparture?: Date | string | null
    syncedAt: Date | string
  }

  export type VehicleQueueUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    destinationId?: StringFieldUpdateOperationsInput | string
    destinationName?: StringFieldUpdateOperationsInput | string
    queueType?: StringFieldUpdateOperationsInput | string
    queuePosition?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    enteredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    availableSeats?: IntFieldUpdateOperationsInput | number
    totalSeats?: IntFieldUpdateOperationsInput | number
    basePrice?: FloatFieldUpdateOperationsInput | number
    estimatedDeparture?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualDeparture?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VehicleQueueUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    vehicleId?: StringFieldUpdateOperationsInput | string
    destinationId?: StringFieldUpdateOperationsInput | string
    destinationName?: StringFieldUpdateOperationsInput | string
    queueType?: StringFieldUpdateOperationsInput | string
    queuePosition?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    enteredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    availableSeats?: IntFieldUpdateOperationsInput | number
    totalSeats?: IntFieldUpdateOperationsInput | number
    basePrice?: FloatFieldUpdateOperationsInput | number
    estimatedDeparture?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualDeparture?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RouteCreateInput = {
    id: string
    departureStationId: string
    destinationStationId: string
    destinationName: string
    basePrice: number
    isActive?: boolean
    syncedAt: Date | string
    schedules?: VehicleScheduleCreateNestedManyWithoutRouteInput
  }

  export type RouteUncheckedCreateInput = {
    id: string
    departureStationId: string
    destinationStationId: string
    destinationName: string
    basePrice: number
    isActive?: boolean
    syncedAt: Date | string
    schedules?: VehicleScheduleUncheckedCreateNestedManyWithoutRouteInput
  }

  export type RouteUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    departureStationId?: StringFieldUpdateOperationsInput | string
    destinationStationId?: StringFieldUpdateOperationsInput | string
    destinationName?: StringFieldUpdateOperationsInput | string
    basePrice?: FloatFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    schedules?: VehicleScheduleUpdateManyWithoutRouteNestedInput
  }

  export type RouteUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    departureStationId?: StringFieldUpdateOperationsInput | string
    destinationStationId?: StringFieldUpdateOperationsInput | string
    destinationName?: StringFieldUpdateOperationsInput | string
    basePrice?: FloatFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    schedules?: VehicleScheduleUncheckedUpdateManyWithoutRouteNestedInput
  }

  export type RouteCreateManyInput = {
    id: string
    departureStationId: string
    destinationStationId: string
    destinationName: string
    basePrice: number
    isActive?: boolean
    syncedAt: Date | string
  }

  export type RouteUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    departureStationId?: StringFieldUpdateOperationsInput | string
    destinationStationId?: StringFieldUpdateOperationsInput | string
    destinationName?: StringFieldUpdateOperationsInput | string
    basePrice?: FloatFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RouteUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    departureStationId?: StringFieldUpdateOperationsInput | string
    destinationStationId?: StringFieldUpdateOperationsInput | string
    destinationName?: StringFieldUpdateOperationsInput | string
    basePrice?: FloatFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VehicleScheduleCreateInput = {
    id: string
    vehicleId: string
    departureTime: Date | string
    availableSeats: number
    totalSeats: number
    status?: string
    actualDeparture?: Date | string | null
    syncedAt: Date | string
    route: RouteCreateNestedOneWithoutSchedulesInput
  }

  export type VehicleScheduleUncheckedCreateInput = {
    id: string
    vehicleId: string
    routeId: string
    departureTime: Date | string
    availableSeats: number
    totalSeats: number
    status?: string
    actualDeparture?: Date | string | null
    syncedAt: Date | string
  }

  export type VehicleScheduleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    vehicleId?: StringFieldUpdateOperationsInput | string
    departureTime?: DateTimeFieldUpdateOperationsInput | Date | string
    availableSeats?: IntFieldUpdateOperationsInput | number
    totalSeats?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    actualDeparture?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    route?: RouteUpdateOneRequiredWithoutSchedulesNestedInput
  }

  export type VehicleScheduleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    vehicleId?: StringFieldUpdateOperationsInput | string
    routeId?: StringFieldUpdateOperationsInput | string
    departureTime?: DateTimeFieldUpdateOperationsInput | Date | string
    availableSeats?: IntFieldUpdateOperationsInput | number
    totalSeats?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    actualDeparture?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VehicleScheduleCreateManyInput = {
    id: string
    vehicleId: string
    routeId: string
    departureTime: Date | string
    availableSeats: number
    totalSeats: number
    status?: string
    actualDeparture?: Date | string | null
    syncedAt: Date | string
  }

  export type VehicleScheduleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    vehicleId?: StringFieldUpdateOperationsInput | string
    departureTime?: DateTimeFieldUpdateOperationsInput | Date | string
    availableSeats?: IntFieldUpdateOperationsInput | number
    totalSeats?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    actualDeparture?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VehicleScheduleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    vehicleId?: StringFieldUpdateOperationsInput | string
    routeId?: StringFieldUpdateOperationsInput | string
    departureTime?: DateTimeFieldUpdateOperationsInput | Date | string
    availableSeats?: IntFieldUpdateOperationsInput | number
    totalSeats?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    actualDeparture?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingCreateInput = {
    id: string
    seatsBooked: number
    totalAmount: number
    bookingSource: string
    bookingType?: string
    customerName?: string | null
    customerPhone?: string | null
    onlineTicketId?: string | null
    paymentStatus?: string
    paymentMethod?: string
    verificationCode: string
    qrCode?: string | null
    isVerified?: boolean
    verifiedAt?: Date | string | null
    createdOffline?: boolean
    localId?: string | null
    createdAt?: Date | string
    syncStatus?: string
    queue: VehicleQueueCreateNestedOneWithoutBookingsInput
    createdByStaff?: StaffCreateNestedOneWithoutBookingsInput
    verifiedByStaff?: StaffCreateNestedOneWithoutVerificationsInput
  }

  export type BookingUncheckedCreateInput = {
    id: string
    queueId: string
    seatsBooked: number
    totalAmount: number
    bookingSource: string
    bookingType?: string
    customerName?: string | null
    customerPhone?: string | null
    onlineTicketId?: string | null
    paymentStatus?: string
    paymentMethod?: string
    verificationCode: string
    qrCode?: string | null
    isVerified?: boolean
    verifiedAt?: Date | string | null
    verifiedById?: string | null
    createdOffline?: boolean
    localId?: string | null
    createdBy?: string | null
    createdAt?: Date | string
    syncStatus?: string
  }

  export type BookingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    seatsBooked?: IntFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    bookingSource?: StringFieldUpdateOperationsInput | string
    bookingType?: StringFieldUpdateOperationsInput | string
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    onlineTicketId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentStatus?: StringFieldUpdateOperationsInput | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    verificationCode?: StringFieldUpdateOperationsInput | string
    qrCode?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdOffline?: BoolFieldUpdateOperationsInput | boolean
    localId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncStatus?: StringFieldUpdateOperationsInput | string
    queue?: VehicleQueueUpdateOneRequiredWithoutBookingsNestedInput
    createdByStaff?: StaffUpdateOneWithoutBookingsNestedInput
    verifiedByStaff?: StaffUpdateOneWithoutVerificationsNestedInput
  }

  export type BookingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    queueId?: StringFieldUpdateOperationsInput | string
    seatsBooked?: IntFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    bookingSource?: StringFieldUpdateOperationsInput | string
    bookingType?: StringFieldUpdateOperationsInput | string
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    onlineTicketId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentStatus?: StringFieldUpdateOperationsInput | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    verificationCode?: StringFieldUpdateOperationsInput | string
    qrCode?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verifiedById?: NullableStringFieldUpdateOperationsInput | string | null
    createdOffline?: BoolFieldUpdateOperationsInput | boolean
    localId?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncStatus?: StringFieldUpdateOperationsInput | string
  }

  export type BookingCreateManyInput = {
    id: string
    queueId: string
    seatsBooked: number
    totalAmount: number
    bookingSource: string
    bookingType?: string
    customerName?: string | null
    customerPhone?: string | null
    onlineTicketId?: string | null
    paymentStatus?: string
    paymentMethod?: string
    verificationCode: string
    qrCode?: string | null
    isVerified?: boolean
    verifiedAt?: Date | string | null
    verifiedById?: string | null
    createdOffline?: boolean
    localId?: string | null
    createdBy?: string | null
    createdAt?: Date | string
    syncStatus?: string
  }

  export type BookingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    seatsBooked?: IntFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    bookingSource?: StringFieldUpdateOperationsInput | string
    bookingType?: StringFieldUpdateOperationsInput | string
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    onlineTicketId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentStatus?: StringFieldUpdateOperationsInput | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    verificationCode?: StringFieldUpdateOperationsInput | string
    qrCode?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdOffline?: BoolFieldUpdateOperationsInput | boolean
    localId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncStatus?: StringFieldUpdateOperationsInput | string
  }

  export type BookingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    queueId?: StringFieldUpdateOperationsInput | string
    seatsBooked?: IntFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    bookingSource?: StringFieldUpdateOperationsInput | string
    bookingType?: StringFieldUpdateOperationsInput | string
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    onlineTicketId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentStatus?: StringFieldUpdateOperationsInput | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    verificationCode?: StringFieldUpdateOperationsInput | string
    qrCode?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verifiedById?: NullableStringFieldUpdateOperationsInput | string | null
    createdOffline?: BoolFieldUpdateOperationsInput | boolean
    localId?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncStatus?: StringFieldUpdateOperationsInput | string
  }

  export type SyncQueueCreateInput = {
    tableName: string
    recordId: string
    operation: string
    data: string
    syncStatus?: string
    retryCount?: number
    error?: string | null
    createdAt?: Date | string
    lastAttempt?: Date | string | null
  }

  export type SyncQueueUncheckedCreateInput = {
    id?: number
    tableName: string
    recordId: string
    operation: string
    data: string
    syncStatus?: string
    retryCount?: number
    error?: string | null
    createdAt?: Date | string
    lastAttempt?: Date | string | null
  }

  export type SyncQueueUpdateInput = {
    tableName?: StringFieldUpdateOperationsInput | string
    recordId?: StringFieldUpdateOperationsInput | string
    operation?: StringFieldUpdateOperationsInput | string
    data?: StringFieldUpdateOperationsInput | string
    syncStatus?: StringFieldUpdateOperationsInput | string
    retryCount?: IntFieldUpdateOperationsInput | number
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastAttempt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SyncQueueUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    tableName?: StringFieldUpdateOperationsInput | string
    recordId?: StringFieldUpdateOperationsInput | string
    operation?: StringFieldUpdateOperationsInput | string
    data?: StringFieldUpdateOperationsInput | string
    syncStatus?: StringFieldUpdateOperationsInput | string
    retryCount?: IntFieldUpdateOperationsInput | number
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastAttempt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SyncQueueCreateManyInput = {
    id?: number
    tableName: string
    recordId: string
    operation: string
    data: string
    syncStatus?: string
    retryCount?: number
    error?: string | null
    createdAt?: Date | string
    lastAttempt?: Date | string | null
  }

  export type SyncQueueUpdateManyMutationInput = {
    tableName?: StringFieldUpdateOperationsInput | string
    recordId?: StringFieldUpdateOperationsInput | string
    operation?: StringFieldUpdateOperationsInput | string
    data?: StringFieldUpdateOperationsInput | string
    syncStatus?: StringFieldUpdateOperationsInput | string
    retryCount?: IntFieldUpdateOperationsInput | number
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastAttempt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SyncQueueUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    tableName?: StringFieldUpdateOperationsInput | string
    recordId?: StringFieldUpdateOperationsInput | string
    operation?: StringFieldUpdateOperationsInput | string
    data?: StringFieldUpdateOperationsInput | string
    syncStatus?: StringFieldUpdateOperationsInput | string
    retryCount?: IntFieldUpdateOperationsInput | number
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastAttempt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type OperationLogCreateInput = {
    staffId: string
    operation: string
    details?: string | null
    success?: boolean
    error?: string | null
    createdAt?: Date | string
  }

  export type OperationLogUncheckedCreateInput = {
    id?: number
    staffId: string
    operation: string
    details?: string | null
    success?: boolean
    error?: string | null
    createdAt?: Date | string
  }

  export type OperationLogUpdateInput = {
    staffId?: StringFieldUpdateOperationsInput | string
    operation?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    success?: BoolFieldUpdateOperationsInput | boolean
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OperationLogUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    staffId?: StringFieldUpdateOperationsInput | string
    operation?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    success?: BoolFieldUpdateOperationsInput | boolean
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OperationLogCreateManyInput = {
    id?: number
    staffId: string
    operation: string
    details?: string | null
    success?: boolean
    error?: string | null
    createdAt?: Date | string
  }

  export type OperationLogUpdateManyMutationInput = {
    staffId?: StringFieldUpdateOperationsInput | string
    operation?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    success?: BoolFieldUpdateOperationsInput | boolean
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OperationLogUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    staffId?: StringFieldUpdateOperationsInput | string
    operation?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    success?: BoolFieldUpdateOperationsInput | boolean
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OfflineCustomerCreateInput = {
    name: string
    phone?: string | null
    cin?: string | null
    createdAt?: Date | string
  }

  export type OfflineCustomerUncheckedCreateInput = {
    id?: number
    name: string
    phone?: string | null
    cin?: string | null
    createdAt?: Date | string
  }

  export type OfflineCustomerUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    cin?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OfflineCustomerUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    cin?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OfflineCustomerCreateManyInput = {
    id?: number
    name: string
    phone?: string | null
    cin?: string | null
    createdAt?: Date | string
  }

  export type OfflineCustomerUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    cin?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OfflineCustomerUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    cin?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SyncOperationCreateInput = {
    id?: string
    stationId: string
    tableName: string
    recordId: string
    operation: string
    data: JsonNullValueInput | InputJsonValue
    syncStatus: string
    sequenceNumber: number
    clientRequestId: string
    transactionId?: string | null
    retryCount?: number
    error?: string | null
    syncLogId?: string | null
    createdAt?: Date | string
    syncedAt?: Date | string | null
    resolvedAt?: Date | string | null
  }

  export type SyncOperationUncheckedCreateInput = {
    id?: string
    stationId: string
    tableName: string
    recordId: string
    operation: string
    data: JsonNullValueInput | InputJsonValue
    syncStatus: string
    sequenceNumber: number
    clientRequestId: string
    transactionId?: string | null
    retryCount?: number
    error?: string | null
    syncLogId?: string | null
    createdAt?: Date | string
    syncedAt?: Date | string | null
    resolvedAt?: Date | string | null
  }

  export type SyncOperationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    stationId?: StringFieldUpdateOperationsInput | string
    tableName?: StringFieldUpdateOperationsInput | string
    recordId?: StringFieldUpdateOperationsInput | string
    operation?: StringFieldUpdateOperationsInput | string
    data?: JsonNullValueInput | InputJsonValue
    syncStatus?: StringFieldUpdateOperationsInput | string
    sequenceNumber?: IntFieldUpdateOperationsInput | number
    clientRequestId?: StringFieldUpdateOperationsInput | string
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    retryCount?: IntFieldUpdateOperationsInput | number
    error?: NullableStringFieldUpdateOperationsInput | string | null
    syncLogId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SyncOperationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    stationId?: StringFieldUpdateOperationsInput | string
    tableName?: StringFieldUpdateOperationsInput | string
    recordId?: StringFieldUpdateOperationsInput | string
    operation?: StringFieldUpdateOperationsInput | string
    data?: JsonNullValueInput | InputJsonValue
    syncStatus?: StringFieldUpdateOperationsInput | string
    sequenceNumber?: IntFieldUpdateOperationsInput | number
    clientRequestId?: StringFieldUpdateOperationsInput | string
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    retryCount?: IntFieldUpdateOperationsInput | number
    error?: NullableStringFieldUpdateOperationsInput | string | null
    syncLogId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SyncOperationCreateManyInput = {
    id?: string
    stationId: string
    tableName: string
    recordId: string
    operation: string
    data: JsonNullValueInput | InputJsonValue
    syncStatus: string
    sequenceNumber: number
    clientRequestId: string
    transactionId?: string | null
    retryCount?: number
    error?: string | null
    syncLogId?: string | null
    createdAt?: Date | string
    syncedAt?: Date | string | null
    resolvedAt?: Date | string | null
  }

  export type SyncOperationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    stationId?: StringFieldUpdateOperationsInput | string
    tableName?: StringFieldUpdateOperationsInput | string
    recordId?: StringFieldUpdateOperationsInput | string
    operation?: StringFieldUpdateOperationsInput | string
    data?: JsonNullValueInput | InputJsonValue
    syncStatus?: StringFieldUpdateOperationsInput | string
    sequenceNumber?: IntFieldUpdateOperationsInput | number
    clientRequestId?: StringFieldUpdateOperationsInput | string
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    retryCount?: IntFieldUpdateOperationsInput | number
    error?: NullableStringFieldUpdateOperationsInput | string | null
    syncLogId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SyncOperationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    stationId?: StringFieldUpdateOperationsInput | string
    tableName?: StringFieldUpdateOperationsInput | string
    recordId?: StringFieldUpdateOperationsInput | string
    operation?: StringFieldUpdateOperationsInput | string
    data?: JsonNullValueInput | InputJsonValue
    syncStatus?: StringFieldUpdateOperationsInput | string
    sequenceNumber?: IntFieldUpdateOperationsInput | number
    clientRequestId?: StringFieldUpdateOperationsInput | string
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    retryCount?: IntFieldUpdateOperationsInput | number
    error?: NullableStringFieldUpdateOperationsInput | string | null
    syncLogId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type StationConfigCountOrderByAggregateInput = {
    id?: SortOrder
    stationId?: SortOrder
    stationName?: SortOrder
    governorate?: SortOrder
    delegation?: SortOrder
    serverVersion?: SortOrder
    lastSync?: SortOrder
    isOnline?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StationConfigMaxOrderByAggregateInput = {
    id?: SortOrder
    stationId?: SortOrder
    stationName?: SortOrder
    governorate?: SortOrder
    delegation?: SortOrder
    serverVersion?: SortOrder
    lastSync?: SortOrder
    isOnline?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StationConfigMinOrderByAggregateInput = {
    id?: SortOrder
    stationId?: SortOrder
    stationName?: SortOrder
    governorate?: SortOrder
    delegation?: SortOrder
    serverVersion?: SortOrder
    lastSync?: SortOrder
    isOnline?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BookingListRelationFilter = {
    every?: BookingWhereInput
    some?: BookingWhereInput
    none?: BookingWhereInput
  }

  export type SessionListRelationFilter = {
    every?: SessionWhereInput
    some?: SessionWhereInput
    none?: SessionWhereInput
  }

  export type BookingOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type StaffCountOrderByAggregateInput = {
    id?: SortOrder
    cin?: SortOrder
    phoneNumber?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    lastLogin?: SortOrder
    syncedAt?: SortOrder
  }

  export type StaffMaxOrderByAggregateInput = {
    id?: SortOrder
    cin?: SortOrder
    phoneNumber?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    lastLogin?: SortOrder
    syncedAt?: SortOrder
  }

  export type StaffMinOrderByAggregateInput = {
    id?: SortOrder
    cin?: SortOrder
    phoneNumber?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    lastLogin?: SortOrder
    syncedAt?: SortOrder
  }

  export type StaffScalarRelationFilter = {
    is?: StaffWhereInput
    isNot?: StaffWhereInput
  }

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    staffId?: SortOrder
    token?: SortOrder
    staffData?: SortOrder
    isActive?: SortOrder
    lastActivity?: SortOrder
    expiresAt?: SortOrder
    createdOffline?: SortOrder
    lastOfflineAt?: SortOrder
    createdAt?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    staffId?: SortOrder
    token?: SortOrder
    staffData?: SortOrder
    isActive?: SortOrder
    lastActivity?: SortOrder
    expiresAt?: SortOrder
    createdOffline?: SortOrder
    lastOfflineAt?: SortOrder
    createdAt?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    staffId?: SortOrder
    token?: SortOrder
    staffData?: SortOrder
    isActive?: SortOrder
    lastActivity?: SortOrder
    expiresAt?: SortOrder
    createdOffline?: SortOrder
    lastOfflineAt?: SortOrder
    createdAt?: SortOrder
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type VehicleNullableScalarRelationFilter = {
    is?: VehicleWhereInput | null
    isNot?: VehicleWhereInput | null
  }

  export type DriverCountOrderByAggregateInput = {
    id?: SortOrder
    cin?: SortOrder
    phoneNumber?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    originGovernorateId?: SortOrder
    originDelegationId?: SortOrder
    originAddress?: SortOrder
    vehicleId?: SortOrder
    accountStatus?: SortOrder
    isActive?: SortOrder
    syncedAt?: SortOrder
  }

  export type DriverMaxOrderByAggregateInput = {
    id?: SortOrder
    cin?: SortOrder
    phoneNumber?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    originGovernorateId?: SortOrder
    originDelegationId?: SortOrder
    originAddress?: SortOrder
    vehicleId?: SortOrder
    accountStatus?: SortOrder
    isActive?: SortOrder
    syncedAt?: SortOrder
  }

  export type DriverMinOrderByAggregateInput = {
    id?: SortOrder
    cin?: SortOrder
    phoneNumber?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    originGovernorateId?: SortOrder
    originDelegationId?: SortOrder
    originAddress?: SortOrder
    vehicleId?: SortOrder
    accountStatus?: SortOrder
    isActive?: SortOrder
    syncedAt?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type DriverNullableScalarRelationFilter = {
    is?: DriverWhereInput | null
    isNot?: DriverWhereInput | null
  }

  export type VehicleQueueListRelationFilter = {
    every?: VehicleQueueWhereInput
    some?: VehicleQueueWhereInput
    none?: VehicleQueueWhereInput
  }

  export type VehicleAuthorizedStationListRelationFilter = {
    every?: VehicleAuthorizedStationWhereInput
    some?: VehicleAuthorizedStationWhereInput
    none?: VehicleAuthorizedStationWhereInput
  }

  export type VehicleQueueOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type VehicleAuthorizedStationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type VehicleCountOrderByAggregateInput = {
    id?: SortOrder
    licensePlate?: SortOrder
    capacity?: SortOrder
    model?: SortOrder
    year?: SortOrder
    color?: SortOrder
    isActive?: SortOrder
    isAvailable?: SortOrder
    syncedAt?: SortOrder
  }

  export type VehicleAvgOrderByAggregateInput = {
    capacity?: SortOrder
    year?: SortOrder
  }

  export type VehicleMaxOrderByAggregateInput = {
    id?: SortOrder
    licensePlate?: SortOrder
    capacity?: SortOrder
    model?: SortOrder
    year?: SortOrder
    color?: SortOrder
    isActive?: SortOrder
    isAvailable?: SortOrder
    syncedAt?: SortOrder
  }

  export type VehicleMinOrderByAggregateInput = {
    id?: SortOrder
    licensePlate?: SortOrder
    capacity?: SortOrder
    model?: SortOrder
    year?: SortOrder
    color?: SortOrder
    isActive?: SortOrder
    isAvailable?: SortOrder
    syncedAt?: SortOrder
  }

  export type VehicleSumOrderByAggregateInput = {
    capacity?: SortOrder
    year?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type VehicleScalarRelationFilter = {
    is?: VehicleWhereInput
    isNot?: VehicleWhereInput
  }

  export type VehicleAuthorizedStationVehicleIdStationIdCompoundUniqueInput = {
    vehicleId: string
    stationId: string
  }

  export type VehicleAuthorizedStationCountOrderByAggregateInput = {
    id?: SortOrder
    vehicleId?: SortOrder
    stationId?: SortOrder
    createdAt?: SortOrder
    syncedAt?: SortOrder
  }

  export type VehicleAuthorizedStationMaxOrderByAggregateInput = {
    id?: SortOrder
    vehicleId?: SortOrder
    stationId?: SortOrder
    createdAt?: SortOrder
    syncedAt?: SortOrder
  }

  export type VehicleAuthorizedStationMinOrderByAggregateInput = {
    id?: SortOrder
    vehicleId?: SortOrder
    stationId?: SortOrder
    createdAt?: SortOrder
    syncedAt?: SortOrder
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type VehicleQueueCountOrderByAggregateInput = {
    id?: SortOrder
    vehicleId?: SortOrder
    destinationId?: SortOrder
    destinationName?: SortOrder
    queueType?: SortOrder
    queuePosition?: SortOrder
    status?: SortOrder
    enteredAt?: SortOrder
    availableSeats?: SortOrder
    totalSeats?: SortOrder
    basePrice?: SortOrder
    estimatedDeparture?: SortOrder
    actualDeparture?: SortOrder
    syncedAt?: SortOrder
  }

  export type VehicleQueueAvgOrderByAggregateInput = {
    queuePosition?: SortOrder
    availableSeats?: SortOrder
    totalSeats?: SortOrder
    basePrice?: SortOrder
  }

  export type VehicleQueueMaxOrderByAggregateInput = {
    id?: SortOrder
    vehicleId?: SortOrder
    destinationId?: SortOrder
    destinationName?: SortOrder
    queueType?: SortOrder
    queuePosition?: SortOrder
    status?: SortOrder
    enteredAt?: SortOrder
    availableSeats?: SortOrder
    totalSeats?: SortOrder
    basePrice?: SortOrder
    estimatedDeparture?: SortOrder
    actualDeparture?: SortOrder
    syncedAt?: SortOrder
  }

  export type VehicleQueueMinOrderByAggregateInput = {
    id?: SortOrder
    vehicleId?: SortOrder
    destinationId?: SortOrder
    destinationName?: SortOrder
    queueType?: SortOrder
    queuePosition?: SortOrder
    status?: SortOrder
    enteredAt?: SortOrder
    availableSeats?: SortOrder
    totalSeats?: SortOrder
    basePrice?: SortOrder
    estimatedDeparture?: SortOrder
    actualDeparture?: SortOrder
    syncedAt?: SortOrder
  }

  export type VehicleQueueSumOrderByAggregateInput = {
    queuePosition?: SortOrder
    availableSeats?: SortOrder
    totalSeats?: SortOrder
    basePrice?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type VehicleScheduleListRelationFilter = {
    every?: VehicleScheduleWhereInput
    some?: VehicleScheduleWhereInput
    none?: VehicleScheduleWhereInput
  }

  export type VehicleScheduleOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RouteCountOrderByAggregateInput = {
    id?: SortOrder
    departureStationId?: SortOrder
    destinationStationId?: SortOrder
    destinationName?: SortOrder
    basePrice?: SortOrder
    isActive?: SortOrder
    syncedAt?: SortOrder
  }

  export type RouteAvgOrderByAggregateInput = {
    basePrice?: SortOrder
  }

  export type RouteMaxOrderByAggregateInput = {
    id?: SortOrder
    departureStationId?: SortOrder
    destinationStationId?: SortOrder
    destinationName?: SortOrder
    basePrice?: SortOrder
    isActive?: SortOrder
    syncedAt?: SortOrder
  }

  export type RouteMinOrderByAggregateInput = {
    id?: SortOrder
    departureStationId?: SortOrder
    destinationStationId?: SortOrder
    destinationName?: SortOrder
    basePrice?: SortOrder
    isActive?: SortOrder
    syncedAt?: SortOrder
  }

  export type RouteSumOrderByAggregateInput = {
    basePrice?: SortOrder
  }

  export type RouteScalarRelationFilter = {
    is?: RouteWhereInput
    isNot?: RouteWhereInput
  }

  export type VehicleScheduleCountOrderByAggregateInput = {
    id?: SortOrder
    vehicleId?: SortOrder
    routeId?: SortOrder
    departureTime?: SortOrder
    availableSeats?: SortOrder
    totalSeats?: SortOrder
    status?: SortOrder
    actualDeparture?: SortOrder
    syncedAt?: SortOrder
  }

  export type VehicleScheduleAvgOrderByAggregateInput = {
    availableSeats?: SortOrder
    totalSeats?: SortOrder
  }

  export type VehicleScheduleMaxOrderByAggregateInput = {
    id?: SortOrder
    vehicleId?: SortOrder
    routeId?: SortOrder
    departureTime?: SortOrder
    availableSeats?: SortOrder
    totalSeats?: SortOrder
    status?: SortOrder
    actualDeparture?: SortOrder
    syncedAt?: SortOrder
  }

  export type VehicleScheduleMinOrderByAggregateInput = {
    id?: SortOrder
    vehicleId?: SortOrder
    routeId?: SortOrder
    departureTime?: SortOrder
    availableSeats?: SortOrder
    totalSeats?: SortOrder
    status?: SortOrder
    actualDeparture?: SortOrder
    syncedAt?: SortOrder
  }

  export type VehicleScheduleSumOrderByAggregateInput = {
    availableSeats?: SortOrder
    totalSeats?: SortOrder
  }

  export type VehicleQueueScalarRelationFilter = {
    is?: VehicleQueueWhereInput
    isNot?: VehicleQueueWhereInput
  }

  export type StaffNullableScalarRelationFilter = {
    is?: StaffWhereInput | null
    isNot?: StaffWhereInput | null
  }

  export type BookingCountOrderByAggregateInput = {
    id?: SortOrder
    queueId?: SortOrder
    seatsBooked?: SortOrder
    totalAmount?: SortOrder
    bookingSource?: SortOrder
    bookingType?: SortOrder
    customerName?: SortOrder
    customerPhone?: SortOrder
    onlineTicketId?: SortOrder
    paymentStatus?: SortOrder
    paymentMethod?: SortOrder
    verificationCode?: SortOrder
    qrCode?: SortOrder
    isVerified?: SortOrder
    verifiedAt?: SortOrder
    verifiedById?: SortOrder
    createdOffline?: SortOrder
    localId?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    syncStatus?: SortOrder
  }

  export type BookingAvgOrderByAggregateInput = {
    seatsBooked?: SortOrder
    totalAmount?: SortOrder
  }

  export type BookingMaxOrderByAggregateInput = {
    id?: SortOrder
    queueId?: SortOrder
    seatsBooked?: SortOrder
    totalAmount?: SortOrder
    bookingSource?: SortOrder
    bookingType?: SortOrder
    customerName?: SortOrder
    customerPhone?: SortOrder
    onlineTicketId?: SortOrder
    paymentStatus?: SortOrder
    paymentMethod?: SortOrder
    verificationCode?: SortOrder
    qrCode?: SortOrder
    isVerified?: SortOrder
    verifiedAt?: SortOrder
    verifiedById?: SortOrder
    createdOffline?: SortOrder
    localId?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    syncStatus?: SortOrder
  }

  export type BookingMinOrderByAggregateInput = {
    id?: SortOrder
    queueId?: SortOrder
    seatsBooked?: SortOrder
    totalAmount?: SortOrder
    bookingSource?: SortOrder
    bookingType?: SortOrder
    customerName?: SortOrder
    customerPhone?: SortOrder
    onlineTicketId?: SortOrder
    paymentStatus?: SortOrder
    paymentMethod?: SortOrder
    verificationCode?: SortOrder
    qrCode?: SortOrder
    isVerified?: SortOrder
    verifiedAt?: SortOrder
    verifiedById?: SortOrder
    createdOffline?: SortOrder
    localId?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    syncStatus?: SortOrder
  }

  export type BookingSumOrderByAggregateInput = {
    seatsBooked?: SortOrder
    totalAmount?: SortOrder
  }

  export type SyncQueueCountOrderByAggregateInput = {
    id?: SortOrder
    tableName?: SortOrder
    recordId?: SortOrder
    operation?: SortOrder
    data?: SortOrder
    syncStatus?: SortOrder
    retryCount?: SortOrder
    error?: SortOrder
    createdAt?: SortOrder
    lastAttempt?: SortOrder
  }

  export type SyncQueueAvgOrderByAggregateInput = {
    id?: SortOrder
    retryCount?: SortOrder
  }

  export type SyncQueueMaxOrderByAggregateInput = {
    id?: SortOrder
    tableName?: SortOrder
    recordId?: SortOrder
    operation?: SortOrder
    data?: SortOrder
    syncStatus?: SortOrder
    retryCount?: SortOrder
    error?: SortOrder
    createdAt?: SortOrder
    lastAttempt?: SortOrder
  }

  export type SyncQueueMinOrderByAggregateInput = {
    id?: SortOrder
    tableName?: SortOrder
    recordId?: SortOrder
    operation?: SortOrder
    data?: SortOrder
    syncStatus?: SortOrder
    retryCount?: SortOrder
    error?: SortOrder
    createdAt?: SortOrder
    lastAttempt?: SortOrder
  }

  export type SyncQueueSumOrderByAggregateInput = {
    id?: SortOrder
    retryCount?: SortOrder
  }

  export type OperationLogCountOrderByAggregateInput = {
    id?: SortOrder
    staffId?: SortOrder
    operation?: SortOrder
    details?: SortOrder
    success?: SortOrder
    error?: SortOrder
    createdAt?: SortOrder
  }

  export type OperationLogAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type OperationLogMaxOrderByAggregateInput = {
    id?: SortOrder
    staffId?: SortOrder
    operation?: SortOrder
    details?: SortOrder
    success?: SortOrder
    error?: SortOrder
    createdAt?: SortOrder
  }

  export type OperationLogMinOrderByAggregateInput = {
    id?: SortOrder
    staffId?: SortOrder
    operation?: SortOrder
    details?: SortOrder
    success?: SortOrder
    error?: SortOrder
    createdAt?: SortOrder
  }

  export type OperationLogSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type OfflineCustomerCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    cin?: SortOrder
    createdAt?: SortOrder
  }

  export type OfflineCustomerAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type OfflineCustomerMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    cin?: SortOrder
    createdAt?: SortOrder
  }

  export type OfflineCustomerMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    cin?: SortOrder
    createdAt?: SortOrder
  }

  export type OfflineCustomerSumOrderByAggregateInput = {
    id?: SortOrder
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type SyncOperationCountOrderByAggregateInput = {
    id?: SortOrder
    stationId?: SortOrder
    tableName?: SortOrder
    recordId?: SortOrder
    operation?: SortOrder
    data?: SortOrder
    syncStatus?: SortOrder
    sequenceNumber?: SortOrder
    clientRequestId?: SortOrder
    transactionId?: SortOrder
    retryCount?: SortOrder
    error?: SortOrder
    syncLogId?: SortOrder
    createdAt?: SortOrder
    syncedAt?: SortOrder
    resolvedAt?: SortOrder
  }

  export type SyncOperationAvgOrderByAggregateInput = {
    sequenceNumber?: SortOrder
    retryCount?: SortOrder
  }

  export type SyncOperationMaxOrderByAggregateInput = {
    id?: SortOrder
    stationId?: SortOrder
    tableName?: SortOrder
    recordId?: SortOrder
    operation?: SortOrder
    syncStatus?: SortOrder
    sequenceNumber?: SortOrder
    clientRequestId?: SortOrder
    transactionId?: SortOrder
    retryCount?: SortOrder
    error?: SortOrder
    syncLogId?: SortOrder
    createdAt?: SortOrder
    syncedAt?: SortOrder
    resolvedAt?: SortOrder
  }

  export type SyncOperationMinOrderByAggregateInput = {
    id?: SortOrder
    stationId?: SortOrder
    tableName?: SortOrder
    recordId?: SortOrder
    operation?: SortOrder
    syncStatus?: SortOrder
    sequenceNumber?: SortOrder
    clientRequestId?: SortOrder
    transactionId?: SortOrder
    retryCount?: SortOrder
    error?: SortOrder
    syncLogId?: SortOrder
    createdAt?: SortOrder
    syncedAt?: SortOrder
    resolvedAt?: SortOrder
  }

  export type SyncOperationSumOrderByAggregateInput = {
    sequenceNumber?: SortOrder
    retryCount?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type BookingCreateNestedManyWithoutCreatedByStaffInput = {
    create?: XOR<BookingCreateWithoutCreatedByStaffInput, BookingUncheckedCreateWithoutCreatedByStaffInput> | BookingCreateWithoutCreatedByStaffInput[] | BookingUncheckedCreateWithoutCreatedByStaffInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutCreatedByStaffInput | BookingCreateOrConnectWithoutCreatedByStaffInput[]
    createMany?: BookingCreateManyCreatedByStaffInputEnvelope
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
  }

  export type BookingCreateNestedManyWithoutVerifiedByStaffInput = {
    create?: XOR<BookingCreateWithoutVerifiedByStaffInput, BookingUncheckedCreateWithoutVerifiedByStaffInput> | BookingCreateWithoutVerifiedByStaffInput[] | BookingUncheckedCreateWithoutVerifiedByStaffInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutVerifiedByStaffInput | BookingCreateOrConnectWithoutVerifiedByStaffInput[]
    createMany?: BookingCreateManyVerifiedByStaffInputEnvelope
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
  }

  export type SessionCreateNestedManyWithoutStaffInput = {
    create?: XOR<SessionCreateWithoutStaffInput, SessionUncheckedCreateWithoutStaffInput> | SessionCreateWithoutStaffInput[] | SessionUncheckedCreateWithoutStaffInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutStaffInput | SessionCreateOrConnectWithoutStaffInput[]
    createMany?: SessionCreateManyStaffInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type BookingUncheckedCreateNestedManyWithoutCreatedByStaffInput = {
    create?: XOR<BookingCreateWithoutCreatedByStaffInput, BookingUncheckedCreateWithoutCreatedByStaffInput> | BookingCreateWithoutCreatedByStaffInput[] | BookingUncheckedCreateWithoutCreatedByStaffInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutCreatedByStaffInput | BookingCreateOrConnectWithoutCreatedByStaffInput[]
    createMany?: BookingCreateManyCreatedByStaffInputEnvelope
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
  }

  export type BookingUncheckedCreateNestedManyWithoutVerifiedByStaffInput = {
    create?: XOR<BookingCreateWithoutVerifiedByStaffInput, BookingUncheckedCreateWithoutVerifiedByStaffInput> | BookingCreateWithoutVerifiedByStaffInput[] | BookingUncheckedCreateWithoutVerifiedByStaffInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutVerifiedByStaffInput | BookingCreateOrConnectWithoutVerifiedByStaffInput[]
    createMany?: BookingCreateManyVerifiedByStaffInputEnvelope
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
  }

  export type SessionUncheckedCreateNestedManyWithoutStaffInput = {
    create?: XOR<SessionCreateWithoutStaffInput, SessionUncheckedCreateWithoutStaffInput> | SessionCreateWithoutStaffInput[] | SessionUncheckedCreateWithoutStaffInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutStaffInput | SessionCreateOrConnectWithoutStaffInput[]
    createMany?: SessionCreateManyStaffInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type BookingUpdateManyWithoutCreatedByStaffNestedInput = {
    create?: XOR<BookingCreateWithoutCreatedByStaffInput, BookingUncheckedCreateWithoutCreatedByStaffInput> | BookingCreateWithoutCreatedByStaffInput[] | BookingUncheckedCreateWithoutCreatedByStaffInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutCreatedByStaffInput | BookingCreateOrConnectWithoutCreatedByStaffInput[]
    upsert?: BookingUpsertWithWhereUniqueWithoutCreatedByStaffInput | BookingUpsertWithWhereUniqueWithoutCreatedByStaffInput[]
    createMany?: BookingCreateManyCreatedByStaffInputEnvelope
    set?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    disconnect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    delete?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    update?: BookingUpdateWithWhereUniqueWithoutCreatedByStaffInput | BookingUpdateWithWhereUniqueWithoutCreatedByStaffInput[]
    updateMany?: BookingUpdateManyWithWhereWithoutCreatedByStaffInput | BookingUpdateManyWithWhereWithoutCreatedByStaffInput[]
    deleteMany?: BookingScalarWhereInput | BookingScalarWhereInput[]
  }

  export type BookingUpdateManyWithoutVerifiedByStaffNestedInput = {
    create?: XOR<BookingCreateWithoutVerifiedByStaffInput, BookingUncheckedCreateWithoutVerifiedByStaffInput> | BookingCreateWithoutVerifiedByStaffInput[] | BookingUncheckedCreateWithoutVerifiedByStaffInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutVerifiedByStaffInput | BookingCreateOrConnectWithoutVerifiedByStaffInput[]
    upsert?: BookingUpsertWithWhereUniqueWithoutVerifiedByStaffInput | BookingUpsertWithWhereUniqueWithoutVerifiedByStaffInput[]
    createMany?: BookingCreateManyVerifiedByStaffInputEnvelope
    set?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    disconnect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    delete?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    update?: BookingUpdateWithWhereUniqueWithoutVerifiedByStaffInput | BookingUpdateWithWhereUniqueWithoutVerifiedByStaffInput[]
    updateMany?: BookingUpdateManyWithWhereWithoutVerifiedByStaffInput | BookingUpdateManyWithWhereWithoutVerifiedByStaffInput[]
    deleteMany?: BookingScalarWhereInput | BookingScalarWhereInput[]
  }

  export type SessionUpdateManyWithoutStaffNestedInput = {
    create?: XOR<SessionCreateWithoutStaffInput, SessionUncheckedCreateWithoutStaffInput> | SessionCreateWithoutStaffInput[] | SessionUncheckedCreateWithoutStaffInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutStaffInput | SessionCreateOrConnectWithoutStaffInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutStaffInput | SessionUpsertWithWhereUniqueWithoutStaffInput[]
    createMany?: SessionCreateManyStaffInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutStaffInput | SessionUpdateWithWhereUniqueWithoutStaffInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutStaffInput | SessionUpdateManyWithWhereWithoutStaffInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type BookingUncheckedUpdateManyWithoutCreatedByStaffNestedInput = {
    create?: XOR<BookingCreateWithoutCreatedByStaffInput, BookingUncheckedCreateWithoutCreatedByStaffInput> | BookingCreateWithoutCreatedByStaffInput[] | BookingUncheckedCreateWithoutCreatedByStaffInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutCreatedByStaffInput | BookingCreateOrConnectWithoutCreatedByStaffInput[]
    upsert?: BookingUpsertWithWhereUniqueWithoutCreatedByStaffInput | BookingUpsertWithWhereUniqueWithoutCreatedByStaffInput[]
    createMany?: BookingCreateManyCreatedByStaffInputEnvelope
    set?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    disconnect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    delete?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    update?: BookingUpdateWithWhereUniqueWithoutCreatedByStaffInput | BookingUpdateWithWhereUniqueWithoutCreatedByStaffInput[]
    updateMany?: BookingUpdateManyWithWhereWithoutCreatedByStaffInput | BookingUpdateManyWithWhereWithoutCreatedByStaffInput[]
    deleteMany?: BookingScalarWhereInput | BookingScalarWhereInput[]
  }

  export type BookingUncheckedUpdateManyWithoutVerifiedByStaffNestedInput = {
    create?: XOR<BookingCreateWithoutVerifiedByStaffInput, BookingUncheckedCreateWithoutVerifiedByStaffInput> | BookingCreateWithoutVerifiedByStaffInput[] | BookingUncheckedCreateWithoutVerifiedByStaffInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutVerifiedByStaffInput | BookingCreateOrConnectWithoutVerifiedByStaffInput[]
    upsert?: BookingUpsertWithWhereUniqueWithoutVerifiedByStaffInput | BookingUpsertWithWhereUniqueWithoutVerifiedByStaffInput[]
    createMany?: BookingCreateManyVerifiedByStaffInputEnvelope
    set?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    disconnect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    delete?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    update?: BookingUpdateWithWhereUniqueWithoutVerifiedByStaffInput | BookingUpdateWithWhereUniqueWithoutVerifiedByStaffInput[]
    updateMany?: BookingUpdateManyWithWhereWithoutVerifiedByStaffInput | BookingUpdateManyWithWhereWithoutVerifiedByStaffInput[]
    deleteMany?: BookingScalarWhereInput | BookingScalarWhereInput[]
  }

  export type SessionUncheckedUpdateManyWithoutStaffNestedInput = {
    create?: XOR<SessionCreateWithoutStaffInput, SessionUncheckedCreateWithoutStaffInput> | SessionCreateWithoutStaffInput[] | SessionUncheckedCreateWithoutStaffInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutStaffInput | SessionCreateOrConnectWithoutStaffInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutStaffInput | SessionUpsertWithWhereUniqueWithoutStaffInput[]
    createMany?: SessionCreateManyStaffInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutStaffInput | SessionUpdateWithWhereUniqueWithoutStaffInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutStaffInput | SessionUpdateManyWithWhereWithoutStaffInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type StaffCreateNestedOneWithoutSessionsInput = {
    create?: XOR<StaffCreateWithoutSessionsInput, StaffUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: StaffCreateOrConnectWithoutSessionsInput
    connect?: StaffWhereUniqueInput
  }

  export type StaffUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<StaffCreateWithoutSessionsInput, StaffUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: StaffCreateOrConnectWithoutSessionsInput
    upsert?: StaffUpsertWithoutSessionsInput
    connect?: StaffWhereUniqueInput
    update?: XOR<XOR<StaffUpdateToOneWithWhereWithoutSessionsInput, StaffUpdateWithoutSessionsInput>, StaffUncheckedUpdateWithoutSessionsInput>
  }

  export type VehicleCreateNestedOneWithoutDriverInput = {
    create?: XOR<VehicleCreateWithoutDriverInput, VehicleUncheckedCreateWithoutDriverInput>
    connectOrCreate?: VehicleCreateOrConnectWithoutDriverInput
    connect?: VehicleWhereUniqueInput
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type VehicleUpdateOneWithoutDriverNestedInput = {
    create?: XOR<VehicleCreateWithoutDriverInput, VehicleUncheckedCreateWithoutDriverInput>
    connectOrCreate?: VehicleCreateOrConnectWithoutDriverInput
    upsert?: VehicleUpsertWithoutDriverInput
    disconnect?: VehicleWhereInput | boolean
    delete?: VehicleWhereInput | boolean
    connect?: VehicleWhereUniqueInput
    update?: XOR<XOR<VehicleUpdateToOneWithWhereWithoutDriverInput, VehicleUpdateWithoutDriverInput>, VehicleUncheckedUpdateWithoutDriverInput>
  }

  export type DriverCreateNestedOneWithoutVehicleInput = {
    create?: XOR<DriverCreateWithoutVehicleInput, DriverUncheckedCreateWithoutVehicleInput>
    connectOrCreate?: DriverCreateOrConnectWithoutVehicleInput
    connect?: DriverWhereUniqueInput
  }

  export type VehicleQueueCreateNestedManyWithoutVehicleInput = {
    create?: XOR<VehicleQueueCreateWithoutVehicleInput, VehicleQueueUncheckedCreateWithoutVehicleInput> | VehicleQueueCreateWithoutVehicleInput[] | VehicleQueueUncheckedCreateWithoutVehicleInput[]
    connectOrCreate?: VehicleQueueCreateOrConnectWithoutVehicleInput | VehicleQueueCreateOrConnectWithoutVehicleInput[]
    createMany?: VehicleQueueCreateManyVehicleInputEnvelope
    connect?: VehicleQueueWhereUniqueInput | VehicleQueueWhereUniqueInput[]
  }

  export type VehicleAuthorizedStationCreateNestedManyWithoutVehicleInput = {
    create?: XOR<VehicleAuthorizedStationCreateWithoutVehicleInput, VehicleAuthorizedStationUncheckedCreateWithoutVehicleInput> | VehicleAuthorizedStationCreateWithoutVehicleInput[] | VehicleAuthorizedStationUncheckedCreateWithoutVehicleInput[]
    connectOrCreate?: VehicleAuthorizedStationCreateOrConnectWithoutVehicleInput | VehicleAuthorizedStationCreateOrConnectWithoutVehicleInput[]
    createMany?: VehicleAuthorizedStationCreateManyVehicleInputEnvelope
    connect?: VehicleAuthorizedStationWhereUniqueInput | VehicleAuthorizedStationWhereUniqueInput[]
  }

  export type DriverUncheckedCreateNestedOneWithoutVehicleInput = {
    create?: XOR<DriverCreateWithoutVehicleInput, DriverUncheckedCreateWithoutVehicleInput>
    connectOrCreate?: DriverCreateOrConnectWithoutVehicleInput
    connect?: DriverWhereUniqueInput
  }

  export type VehicleQueueUncheckedCreateNestedManyWithoutVehicleInput = {
    create?: XOR<VehicleQueueCreateWithoutVehicleInput, VehicleQueueUncheckedCreateWithoutVehicleInput> | VehicleQueueCreateWithoutVehicleInput[] | VehicleQueueUncheckedCreateWithoutVehicleInput[]
    connectOrCreate?: VehicleQueueCreateOrConnectWithoutVehicleInput | VehicleQueueCreateOrConnectWithoutVehicleInput[]
    createMany?: VehicleQueueCreateManyVehicleInputEnvelope
    connect?: VehicleQueueWhereUniqueInput | VehicleQueueWhereUniqueInput[]
  }

  export type VehicleAuthorizedStationUncheckedCreateNestedManyWithoutVehicleInput = {
    create?: XOR<VehicleAuthorizedStationCreateWithoutVehicleInput, VehicleAuthorizedStationUncheckedCreateWithoutVehicleInput> | VehicleAuthorizedStationCreateWithoutVehicleInput[] | VehicleAuthorizedStationUncheckedCreateWithoutVehicleInput[]
    connectOrCreate?: VehicleAuthorizedStationCreateOrConnectWithoutVehicleInput | VehicleAuthorizedStationCreateOrConnectWithoutVehicleInput[]
    createMany?: VehicleAuthorizedStationCreateManyVehicleInputEnvelope
    connect?: VehicleAuthorizedStationWhereUniqueInput | VehicleAuthorizedStationWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DriverUpdateOneWithoutVehicleNestedInput = {
    create?: XOR<DriverCreateWithoutVehicleInput, DriverUncheckedCreateWithoutVehicleInput>
    connectOrCreate?: DriverCreateOrConnectWithoutVehicleInput
    upsert?: DriverUpsertWithoutVehicleInput
    disconnect?: DriverWhereInput | boolean
    delete?: DriverWhereInput | boolean
    connect?: DriverWhereUniqueInput
    update?: XOR<XOR<DriverUpdateToOneWithWhereWithoutVehicleInput, DriverUpdateWithoutVehicleInput>, DriverUncheckedUpdateWithoutVehicleInput>
  }

  export type VehicleQueueUpdateManyWithoutVehicleNestedInput = {
    create?: XOR<VehicleQueueCreateWithoutVehicleInput, VehicleQueueUncheckedCreateWithoutVehicleInput> | VehicleQueueCreateWithoutVehicleInput[] | VehicleQueueUncheckedCreateWithoutVehicleInput[]
    connectOrCreate?: VehicleQueueCreateOrConnectWithoutVehicleInput | VehicleQueueCreateOrConnectWithoutVehicleInput[]
    upsert?: VehicleQueueUpsertWithWhereUniqueWithoutVehicleInput | VehicleQueueUpsertWithWhereUniqueWithoutVehicleInput[]
    createMany?: VehicleQueueCreateManyVehicleInputEnvelope
    set?: VehicleQueueWhereUniqueInput | VehicleQueueWhereUniqueInput[]
    disconnect?: VehicleQueueWhereUniqueInput | VehicleQueueWhereUniqueInput[]
    delete?: VehicleQueueWhereUniqueInput | VehicleQueueWhereUniqueInput[]
    connect?: VehicleQueueWhereUniqueInput | VehicleQueueWhereUniqueInput[]
    update?: VehicleQueueUpdateWithWhereUniqueWithoutVehicleInput | VehicleQueueUpdateWithWhereUniqueWithoutVehicleInput[]
    updateMany?: VehicleQueueUpdateManyWithWhereWithoutVehicleInput | VehicleQueueUpdateManyWithWhereWithoutVehicleInput[]
    deleteMany?: VehicleQueueScalarWhereInput | VehicleQueueScalarWhereInput[]
  }

  export type VehicleAuthorizedStationUpdateManyWithoutVehicleNestedInput = {
    create?: XOR<VehicleAuthorizedStationCreateWithoutVehicleInput, VehicleAuthorizedStationUncheckedCreateWithoutVehicleInput> | VehicleAuthorizedStationCreateWithoutVehicleInput[] | VehicleAuthorizedStationUncheckedCreateWithoutVehicleInput[]
    connectOrCreate?: VehicleAuthorizedStationCreateOrConnectWithoutVehicleInput | VehicleAuthorizedStationCreateOrConnectWithoutVehicleInput[]
    upsert?: VehicleAuthorizedStationUpsertWithWhereUniqueWithoutVehicleInput | VehicleAuthorizedStationUpsertWithWhereUniqueWithoutVehicleInput[]
    createMany?: VehicleAuthorizedStationCreateManyVehicleInputEnvelope
    set?: VehicleAuthorizedStationWhereUniqueInput | VehicleAuthorizedStationWhereUniqueInput[]
    disconnect?: VehicleAuthorizedStationWhereUniqueInput | VehicleAuthorizedStationWhereUniqueInput[]
    delete?: VehicleAuthorizedStationWhereUniqueInput | VehicleAuthorizedStationWhereUniqueInput[]
    connect?: VehicleAuthorizedStationWhereUniqueInput | VehicleAuthorizedStationWhereUniqueInput[]
    update?: VehicleAuthorizedStationUpdateWithWhereUniqueWithoutVehicleInput | VehicleAuthorizedStationUpdateWithWhereUniqueWithoutVehicleInput[]
    updateMany?: VehicleAuthorizedStationUpdateManyWithWhereWithoutVehicleInput | VehicleAuthorizedStationUpdateManyWithWhereWithoutVehicleInput[]
    deleteMany?: VehicleAuthorizedStationScalarWhereInput | VehicleAuthorizedStationScalarWhereInput[]
  }

  export type DriverUncheckedUpdateOneWithoutVehicleNestedInput = {
    create?: XOR<DriverCreateWithoutVehicleInput, DriverUncheckedCreateWithoutVehicleInput>
    connectOrCreate?: DriverCreateOrConnectWithoutVehicleInput
    upsert?: DriverUpsertWithoutVehicleInput
    disconnect?: DriverWhereInput | boolean
    delete?: DriverWhereInput | boolean
    connect?: DriverWhereUniqueInput
    update?: XOR<XOR<DriverUpdateToOneWithWhereWithoutVehicleInput, DriverUpdateWithoutVehicleInput>, DriverUncheckedUpdateWithoutVehicleInput>
  }

  export type VehicleQueueUncheckedUpdateManyWithoutVehicleNestedInput = {
    create?: XOR<VehicleQueueCreateWithoutVehicleInput, VehicleQueueUncheckedCreateWithoutVehicleInput> | VehicleQueueCreateWithoutVehicleInput[] | VehicleQueueUncheckedCreateWithoutVehicleInput[]
    connectOrCreate?: VehicleQueueCreateOrConnectWithoutVehicleInput | VehicleQueueCreateOrConnectWithoutVehicleInput[]
    upsert?: VehicleQueueUpsertWithWhereUniqueWithoutVehicleInput | VehicleQueueUpsertWithWhereUniqueWithoutVehicleInput[]
    createMany?: VehicleQueueCreateManyVehicleInputEnvelope
    set?: VehicleQueueWhereUniqueInput | VehicleQueueWhereUniqueInput[]
    disconnect?: VehicleQueueWhereUniqueInput | VehicleQueueWhereUniqueInput[]
    delete?: VehicleQueueWhereUniqueInput | VehicleQueueWhereUniqueInput[]
    connect?: VehicleQueueWhereUniqueInput | VehicleQueueWhereUniqueInput[]
    update?: VehicleQueueUpdateWithWhereUniqueWithoutVehicleInput | VehicleQueueUpdateWithWhereUniqueWithoutVehicleInput[]
    updateMany?: VehicleQueueUpdateManyWithWhereWithoutVehicleInput | VehicleQueueUpdateManyWithWhereWithoutVehicleInput[]
    deleteMany?: VehicleQueueScalarWhereInput | VehicleQueueScalarWhereInput[]
  }

  export type VehicleAuthorizedStationUncheckedUpdateManyWithoutVehicleNestedInput = {
    create?: XOR<VehicleAuthorizedStationCreateWithoutVehicleInput, VehicleAuthorizedStationUncheckedCreateWithoutVehicleInput> | VehicleAuthorizedStationCreateWithoutVehicleInput[] | VehicleAuthorizedStationUncheckedCreateWithoutVehicleInput[]
    connectOrCreate?: VehicleAuthorizedStationCreateOrConnectWithoutVehicleInput | VehicleAuthorizedStationCreateOrConnectWithoutVehicleInput[]
    upsert?: VehicleAuthorizedStationUpsertWithWhereUniqueWithoutVehicleInput | VehicleAuthorizedStationUpsertWithWhereUniqueWithoutVehicleInput[]
    createMany?: VehicleAuthorizedStationCreateManyVehicleInputEnvelope
    set?: VehicleAuthorizedStationWhereUniqueInput | VehicleAuthorizedStationWhereUniqueInput[]
    disconnect?: VehicleAuthorizedStationWhereUniqueInput | VehicleAuthorizedStationWhereUniqueInput[]
    delete?: VehicleAuthorizedStationWhereUniqueInput | VehicleAuthorizedStationWhereUniqueInput[]
    connect?: VehicleAuthorizedStationWhereUniqueInput | VehicleAuthorizedStationWhereUniqueInput[]
    update?: VehicleAuthorizedStationUpdateWithWhereUniqueWithoutVehicleInput | VehicleAuthorizedStationUpdateWithWhereUniqueWithoutVehicleInput[]
    updateMany?: VehicleAuthorizedStationUpdateManyWithWhereWithoutVehicleInput | VehicleAuthorizedStationUpdateManyWithWhereWithoutVehicleInput[]
    deleteMany?: VehicleAuthorizedStationScalarWhereInput | VehicleAuthorizedStationScalarWhereInput[]
  }

  export type VehicleCreateNestedOneWithoutAuthorizedStationsInput = {
    create?: XOR<VehicleCreateWithoutAuthorizedStationsInput, VehicleUncheckedCreateWithoutAuthorizedStationsInput>
    connectOrCreate?: VehicleCreateOrConnectWithoutAuthorizedStationsInput
    connect?: VehicleWhereUniqueInput
  }

  export type VehicleUpdateOneRequiredWithoutAuthorizedStationsNestedInput = {
    create?: XOR<VehicleCreateWithoutAuthorizedStationsInput, VehicleUncheckedCreateWithoutAuthorizedStationsInput>
    connectOrCreate?: VehicleCreateOrConnectWithoutAuthorizedStationsInput
    upsert?: VehicleUpsertWithoutAuthorizedStationsInput
    connect?: VehicleWhereUniqueInput
    update?: XOR<XOR<VehicleUpdateToOneWithWhereWithoutAuthorizedStationsInput, VehicleUpdateWithoutAuthorizedStationsInput>, VehicleUncheckedUpdateWithoutAuthorizedStationsInput>
  }

  export type VehicleCreateNestedOneWithoutQueueEntriesInput = {
    create?: XOR<VehicleCreateWithoutQueueEntriesInput, VehicleUncheckedCreateWithoutQueueEntriesInput>
    connectOrCreate?: VehicleCreateOrConnectWithoutQueueEntriesInput
    connect?: VehicleWhereUniqueInput
  }

  export type BookingCreateNestedManyWithoutQueueInput = {
    create?: XOR<BookingCreateWithoutQueueInput, BookingUncheckedCreateWithoutQueueInput> | BookingCreateWithoutQueueInput[] | BookingUncheckedCreateWithoutQueueInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutQueueInput | BookingCreateOrConnectWithoutQueueInput[]
    createMany?: BookingCreateManyQueueInputEnvelope
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
  }

  export type BookingUncheckedCreateNestedManyWithoutQueueInput = {
    create?: XOR<BookingCreateWithoutQueueInput, BookingUncheckedCreateWithoutQueueInput> | BookingCreateWithoutQueueInput[] | BookingUncheckedCreateWithoutQueueInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutQueueInput | BookingCreateOrConnectWithoutQueueInput[]
    createMany?: BookingCreateManyQueueInputEnvelope
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type VehicleUpdateOneRequiredWithoutQueueEntriesNestedInput = {
    create?: XOR<VehicleCreateWithoutQueueEntriesInput, VehicleUncheckedCreateWithoutQueueEntriesInput>
    connectOrCreate?: VehicleCreateOrConnectWithoutQueueEntriesInput
    upsert?: VehicleUpsertWithoutQueueEntriesInput
    connect?: VehicleWhereUniqueInput
    update?: XOR<XOR<VehicleUpdateToOneWithWhereWithoutQueueEntriesInput, VehicleUpdateWithoutQueueEntriesInput>, VehicleUncheckedUpdateWithoutQueueEntriesInput>
  }

  export type BookingUpdateManyWithoutQueueNestedInput = {
    create?: XOR<BookingCreateWithoutQueueInput, BookingUncheckedCreateWithoutQueueInput> | BookingCreateWithoutQueueInput[] | BookingUncheckedCreateWithoutQueueInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutQueueInput | BookingCreateOrConnectWithoutQueueInput[]
    upsert?: BookingUpsertWithWhereUniqueWithoutQueueInput | BookingUpsertWithWhereUniqueWithoutQueueInput[]
    createMany?: BookingCreateManyQueueInputEnvelope
    set?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    disconnect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    delete?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    update?: BookingUpdateWithWhereUniqueWithoutQueueInput | BookingUpdateWithWhereUniqueWithoutQueueInput[]
    updateMany?: BookingUpdateManyWithWhereWithoutQueueInput | BookingUpdateManyWithWhereWithoutQueueInput[]
    deleteMany?: BookingScalarWhereInput | BookingScalarWhereInput[]
  }

  export type BookingUncheckedUpdateManyWithoutQueueNestedInput = {
    create?: XOR<BookingCreateWithoutQueueInput, BookingUncheckedCreateWithoutQueueInput> | BookingCreateWithoutQueueInput[] | BookingUncheckedCreateWithoutQueueInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutQueueInput | BookingCreateOrConnectWithoutQueueInput[]
    upsert?: BookingUpsertWithWhereUniqueWithoutQueueInput | BookingUpsertWithWhereUniqueWithoutQueueInput[]
    createMany?: BookingCreateManyQueueInputEnvelope
    set?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    disconnect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    delete?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    update?: BookingUpdateWithWhereUniqueWithoutQueueInput | BookingUpdateWithWhereUniqueWithoutQueueInput[]
    updateMany?: BookingUpdateManyWithWhereWithoutQueueInput | BookingUpdateManyWithWhereWithoutQueueInput[]
    deleteMany?: BookingScalarWhereInput | BookingScalarWhereInput[]
  }

  export type VehicleScheduleCreateNestedManyWithoutRouteInput = {
    create?: XOR<VehicleScheduleCreateWithoutRouteInput, VehicleScheduleUncheckedCreateWithoutRouteInput> | VehicleScheduleCreateWithoutRouteInput[] | VehicleScheduleUncheckedCreateWithoutRouteInput[]
    connectOrCreate?: VehicleScheduleCreateOrConnectWithoutRouteInput | VehicleScheduleCreateOrConnectWithoutRouteInput[]
    createMany?: VehicleScheduleCreateManyRouteInputEnvelope
    connect?: VehicleScheduleWhereUniqueInput | VehicleScheduleWhereUniqueInput[]
  }

  export type VehicleScheduleUncheckedCreateNestedManyWithoutRouteInput = {
    create?: XOR<VehicleScheduleCreateWithoutRouteInput, VehicleScheduleUncheckedCreateWithoutRouteInput> | VehicleScheduleCreateWithoutRouteInput[] | VehicleScheduleUncheckedCreateWithoutRouteInput[]
    connectOrCreate?: VehicleScheduleCreateOrConnectWithoutRouteInput | VehicleScheduleCreateOrConnectWithoutRouteInput[]
    createMany?: VehicleScheduleCreateManyRouteInputEnvelope
    connect?: VehicleScheduleWhereUniqueInput | VehicleScheduleWhereUniqueInput[]
  }

  export type VehicleScheduleUpdateManyWithoutRouteNestedInput = {
    create?: XOR<VehicleScheduleCreateWithoutRouteInput, VehicleScheduleUncheckedCreateWithoutRouteInput> | VehicleScheduleCreateWithoutRouteInput[] | VehicleScheduleUncheckedCreateWithoutRouteInput[]
    connectOrCreate?: VehicleScheduleCreateOrConnectWithoutRouteInput | VehicleScheduleCreateOrConnectWithoutRouteInput[]
    upsert?: VehicleScheduleUpsertWithWhereUniqueWithoutRouteInput | VehicleScheduleUpsertWithWhereUniqueWithoutRouteInput[]
    createMany?: VehicleScheduleCreateManyRouteInputEnvelope
    set?: VehicleScheduleWhereUniqueInput | VehicleScheduleWhereUniqueInput[]
    disconnect?: VehicleScheduleWhereUniqueInput | VehicleScheduleWhereUniqueInput[]
    delete?: VehicleScheduleWhereUniqueInput | VehicleScheduleWhereUniqueInput[]
    connect?: VehicleScheduleWhereUniqueInput | VehicleScheduleWhereUniqueInput[]
    update?: VehicleScheduleUpdateWithWhereUniqueWithoutRouteInput | VehicleScheduleUpdateWithWhereUniqueWithoutRouteInput[]
    updateMany?: VehicleScheduleUpdateManyWithWhereWithoutRouteInput | VehicleScheduleUpdateManyWithWhereWithoutRouteInput[]
    deleteMany?: VehicleScheduleScalarWhereInput | VehicleScheduleScalarWhereInput[]
  }

  export type VehicleScheduleUncheckedUpdateManyWithoutRouteNestedInput = {
    create?: XOR<VehicleScheduleCreateWithoutRouteInput, VehicleScheduleUncheckedCreateWithoutRouteInput> | VehicleScheduleCreateWithoutRouteInput[] | VehicleScheduleUncheckedCreateWithoutRouteInput[]
    connectOrCreate?: VehicleScheduleCreateOrConnectWithoutRouteInput | VehicleScheduleCreateOrConnectWithoutRouteInput[]
    upsert?: VehicleScheduleUpsertWithWhereUniqueWithoutRouteInput | VehicleScheduleUpsertWithWhereUniqueWithoutRouteInput[]
    createMany?: VehicleScheduleCreateManyRouteInputEnvelope
    set?: VehicleScheduleWhereUniqueInput | VehicleScheduleWhereUniqueInput[]
    disconnect?: VehicleScheduleWhereUniqueInput | VehicleScheduleWhereUniqueInput[]
    delete?: VehicleScheduleWhereUniqueInput | VehicleScheduleWhereUniqueInput[]
    connect?: VehicleScheduleWhereUniqueInput | VehicleScheduleWhereUniqueInput[]
    update?: VehicleScheduleUpdateWithWhereUniqueWithoutRouteInput | VehicleScheduleUpdateWithWhereUniqueWithoutRouteInput[]
    updateMany?: VehicleScheduleUpdateManyWithWhereWithoutRouteInput | VehicleScheduleUpdateManyWithWhereWithoutRouteInput[]
    deleteMany?: VehicleScheduleScalarWhereInput | VehicleScheduleScalarWhereInput[]
  }

  export type RouteCreateNestedOneWithoutSchedulesInput = {
    create?: XOR<RouteCreateWithoutSchedulesInput, RouteUncheckedCreateWithoutSchedulesInput>
    connectOrCreate?: RouteCreateOrConnectWithoutSchedulesInput
    connect?: RouteWhereUniqueInput
  }

  export type RouteUpdateOneRequiredWithoutSchedulesNestedInput = {
    create?: XOR<RouteCreateWithoutSchedulesInput, RouteUncheckedCreateWithoutSchedulesInput>
    connectOrCreate?: RouteCreateOrConnectWithoutSchedulesInput
    upsert?: RouteUpsertWithoutSchedulesInput
    connect?: RouteWhereUniqueInput
    update?: XOR<XOR<RouteUpdateToOneWithWhereWithoutSchedulesInput, RouteUpdateWithoutSchedulesInput>, RouteUncheckedUpdateWithoutSchedulesInput>
  }

  export type VehicleQueueCreateNestedOneWithoutBookingsInput = {
    create?: XOR<VehicleQueueCreateWithoutBookingsInput, VehicleQueueUncheckedCreateWithoutBookingsInput>
    connectOrCreate?: VehicleQueueCreateOrConnectWithoutBookingsInput
    connect?: VehicleQueueWhereUniqueInput
  }

  export type StaffCreateNestedOneWithoutBookingsInput = {
    create?: XOR<StaffCreateWithoutBookingsInput, StaffUncheckedCreateWithoutBookingsInput>
    connectOrCreate?: StaffCreateOrConnectWithoutBookingsInput
    connect?: StaffWhereUniqueInput
  }

  export type StaffCreateNestedOneWithoutVerificationsInput = {
    create?: XOR<StaffCreateWithoutVerificationsInput, StaffUncheckedCreateWithoutVerificationsInput>
    connectOrCreate?: StaffCreateOrConnectWithoutVerificationsInput
    connect?: StaffWhereUniqueInput
  }

  export type VehicleQueueUpdateOneRequiredWithoutBookingsNestedInput = {
    create?: XOR<VehicleQueueCreateWithoutBookingsInput, VehicleQueueUncheckedCreateWithoutBookingsInput>
    connectOrCreate?: VehicleQueueCreateOrConnectWithoutBookingsInput
    upsert?: VehicleQueueUpsertWithoutBookingsInput
    connect?: VehicleQueueWhereUniqueInput
    update?: XOR<XOR<VehicleQueueUpdateToOneWithWhereWithoutBookingsInput, VehicleQueueUpdateWithoutBookingsInput>, VehicleQueueUncheckedUpdateWithoutBookingsInput>
  }

  export type StaffUpdateOneWithoutBookingsNestedInput = {
    create?: XOR<StaffCreateWithoutBookingsInput, StaffUncheckedCreateWithoutBookingsInput>
    connectOrCreate?: StaffCreateOrConnectWithoutBookingsInput
    upsert?: StaffUpsertWithoutBookingsInput
    disconnect?: StaffWhereInput | boolean
    delete?: StaffWhereInput | boolean
    connect?: StaffWhereUniqueInput
    update?: XOR<XOR<StaffUpdateToOneWithWhereWithoutBookingsInput, StaffUpdateWithoutBookingsInput>, StaffUncheckedUpdateWithoutBookingsInput>
  }

  export type StaffUpdateOneWithoutVerificationsNestedInput = {
    create?: XOR<StaffCreateWithoutVerificationsInput, StaffUncheckedCreateWithoutVerificationsInput>
    connectOrCreate?: StaffCreateOrConnectWithoutVerificationsInput
    upsert?: StaffUpsertWithoutVerificationsInput
    disconnect?: StaffWhereInput | boolean
    delete?: StaffWhereInput | boolean
    connect?: StaffWhereUniqueInput
    update?: XOR<XOR<StaffUpdateToOneWithWhereWithoutVerificationsInput, StaffUpdateWithoutVerificationsInput>, StaffUncheckedUpdateWithoutVerificationsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type BookingCreateWithoutCreatedByStaffInput = {
    id: string
    seatsBooked: number
    totalAmount: number
    bookingSource: string
    bookingType?: string
    customerName?: string | null
    customerPhone?: string | null
    onlineTicketId?: string | null
    paymentStatus?: string
    paymentMethod?: string
    verificationCode: string
    qrCode?: string | null
    isVerified?: boolean
    verifiedAt?: Date | string | null
    createdOffline?: boolean
    localId?: string | null
    createdAt?: Date | string
    syncStatus?: string
    queue: VehicleQueueCreateNestedOneWithoutBookingsInput
    verifiedByStaff?: StaffCreateNestedOneWithoutVerificationsInput
  }

  export type BookingUncheckedCreateWithoutCreatedByStaffInput = {
    id: string
    queueId: string
    seatsBooked: number
    totalAmount: number
    bookingSource: string
    bookingType?: string
    customerName?: string | null
    customerPhone?: string | null
    onlineTicketId?: string | null
    paymentStatus?: string
    paymentMethod?: string
    verificationCode: string
    qrCode?: string | null
    isVerified?: boolean
    verifiedAt?: Date | string | null
    verifiedById?: string | null
    createdOffline?: boolean
    localId?: string | null
    createdAt?: Date | string
    syncStatus?: string
  }

  export type BookingCreateOrConnectWithoutCreatedByStaffInput = {
    where: BookingWhereUniqueInput
    create: XOR<BookingCreateWithoutCreatedByStaffInput, BookingUncheckedCreateWithoutCreatedByStaffInput>
  }

  export type BookingCreateManyCreatedByStaffInputEnvelope = {
    data: BookingCreateManyCreatedByStaffInput | BookingCreateManyCreatedByStaffInput[]
    skipDuplicates?: boolean
  }

  export type BookingCreateWithoutVerifiedByStaffInput = {
    id: string
    seatsBooked: number
    totalAmount: number
    bookingSource: string
    bookingType?: string
    customerName?: string | null
    customerPhone?: string | null
    onlineTicketId?: string | null
    paymentStatus?: string
    paymentMethod?: string
    verificationCode: string
    qrCode?: string | null
    isVerified?: boolean
    verifiedAt?: Date | string | null
    createdOffline?: boolean
    localId?: string | null
    createdAt?: Date | string
    syncStatus?: string
    queue: VehicleQueueCreateNestedOneWithoutBookingsInput
    createdByStaff?: StaffCreateNestedOneWithoutBookingsInput
  }

  export type BookingUncheckedCreateWithoutVerifiedByStaffInput = {
    id: string
    queueId: string
    seatsBooked: number
    totalAmount: number
    bookingSource: string
    bookingType?: string
    customerName?: string | null
    customerPhone?: string | null
    onlineTicketId?: string | null
    paymentStatus?: string
    paymentMethod?: string
    verificationCode: string
    qrCode?: string | null
    isVerified?: boolean
    verifiedAt?: Date | string | null
    createdOffline?: boolean
    localId?: string | null
    createdBy?: string | null
    createdAt?: Date | string
    syncStatus?: string
  }

  export type BookingCreateOrConnectWithoutVerifiedByStaffInput = {
    where: BookingWhereUniqueInput
    create: XOR<BookingCreateWithoutVerifiedByStaffInput, BookingUncheckedCreateWithoutVerifiedByStaffInput>
  }

  export type BookingCreateManyVerifiedByStaffInputEnvelope = {
    data: BookingCreateManyVerifiedByStaffInput | BookingCreateManyVerifiedByStaffInput[]
    skipDuplicates?: boolean
  }

  export type SessionCreateWithoutStaffInput = {
    id?: string
    token: string
    staffData: string
    isActive?: boolean
    lastActivity?: Date | string
    expiresAt: Date | string
    createdOffline?: boolean
    lastOfflineAt?: Date | string | null
    createdAt?: Date | string
  }

  export type SessionUncheckedCreateWithoutStaffInput = {
    id?: string
    token: string
    staffData: string
    isActive?: boolean
    lastActivity?: Date | string
    expiresAt: Date | string
    createdOffline?: boolean
    lastOfflineAt?: Date | string | null
    createdAt?: Date | string
  }

  export type SessionCreateOrConnectWithoutStaffInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutStaffInput, SessionUncheckedCreateWithoutStaffInput>
  }

  export type SessionCreateManyStaffInputEnvelope = {
    data: SessionCreateManyStaffInput | SessionCreateManyStaffInput[]
    skipDuplicates?: boolean
  }

  export type BookingUpsertWithWhereUniqueWithoutCreatedByStaffInput = {
    where: BookingWhereUniqueInput
    update: XOR<BookingUpdateWithoutCreatedByStaffInput, BookingUncheckedUpdateWithoutCreatedByStaffInput>
    create: XOR<BookingCreateWithoutCreatedByStaffInput, BookingUncheckedCreateWithoutCreatedByStaffInput>
  }

  export type BookingUpdateWithWhereUniqueWithoutCreatedByStaffInput = {
    where: BookingWhereUniqueInput
    data: XOR<BookingUpdateWithoutCreatedByStaffInput, BookingUncheckedUpdateWithoutCreatedByStaffInput>
  }

  export type BookingUpdateManyWithWhereWithoutCreatedByStaffInput = {
    where: BookingScalarWhereInput
    data: XOR<BookingUpdateManyMutationInput, BookingUncheckedUpdateManyWithoutCreatedByStaffInput>
  }

  export type BookingScalarWhereInput = {
    AND?: BookingScalarWhereInput | BookingScalarWhereInput[]
    OR?: BookingScalarWhereInput[]
    NOT?: BookingScalarWhereInput | BookingScalarWhereInput[]
    id?: StringFilter<"Booking"> | string
    queueId?: StringFilter<"Booking"> | string
    seatsBooked?: IntFilter<"Booking"> | number
    totalAmount?: FloatFilter<"Booking"> | number
    bookingSource?: StringFilter<"Booking"> | string
    bookingType?: StringFilter<"Booking"> | string
    customerName?: StringNullableFilter<"Booking"> | string | null
    customerPhone?: StringNullableFilter<"Booking"> | string | null
    onlineTicketId?: StringNullableFilter<"Booking"> | string | null
    paymentStatus?: StringFilter<"Booking"> | string
    paymentMethod?: StringFilter<"Booking"> | string
    verificationCode?: StringFilter<"Booking"> | string
    qrCode?: StringNullableFilter<"Booking"> | string | null
    isVerified?: BoolFilter<"Booking"> | boolean
    verifiedAt?: DateTimeNullableFilter<"Booking"> | Date | string | null
    verifiedById?: StringNullableFilter<"Booking"> | string | null
    createdOffline?: BoolFilter<"Booking"> | boolean
    localId?: StringNullableFilter<"Booking"> | string | null
    createdBy?: StringNullableFilter<"Booking"> | string | null
    createdAt?: DateTimeFilter<"Booking"> | Date | string
    syncStatus?: StringFilter<"Booking"> | string
  }

  export type BookingUpsertWithWhereUniqueWithoutVerifiedByStaffInput = {
    where: BookingWhereUniqueInput
    update: XOR<BookingUpdateWithoutVerifiedByStaffInput, BookingUncheckedUpdateWithoutVerifiedByStaffInput>
    create: XOR<BookingCreateWithoutVerifiedByStaffInput, BookingUncheckedCreateWithoutVerifiedByStaffInput>
  }

  export type BookingUpdateWithWhereUniqueWithoutVerifiedByStaffInput = {
    where: BookingWhereUniqueInput
    data: XOR<BookingUpdateWithoutVerifiedByStaffInput, BookingUncheckedUpdateWithoutVerifiedByStaffInput>
  }

  export type BookingUpdateManyWithWhereWithoutVerifiedByStaffInput = {
    where: BookingScalarWhereInput
    data: XOR<BookingUpdateManyMutationInput, BookingUncheckedUpdateManyWithoutVerifiedByStaffInput>
  }

  export type SessionUpsertWithWhereUniqueWithoutStaffInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutStaffInput, SessionUncheckedUpdateWithoutStaffInput>
    create: XOR<SessionCreateWithoutStaffInput, SessionUncheckedCreateWithoutStaffInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutStaffInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutStaffInput, SessionUncheckedUpdateWithoutStaffInput>
  }

  export type SessionUpdateManyWithWhereWithoutStaffInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutStaffInput>
  }

  export type SessionScalarWhereInput = {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[]
    OR?: SessionScalarWhereInput[]
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[]
    id?: StringFilter<"Session"> | string
    staffId?: StringFilter<"Session"> | string
    token?: StringFilter<"Session"> | string
    staffData?: StringFilter<"Session"> | string
    isActive?: BoolFilter<"Session"> | boolean
    lastActivity?: DateTimeFilter<"Session"> | Date | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    createdOffline?: BoolFilter<"Session"> | boolean
    lastOfflineAt?: DateTimeNullableFilter<"Session"> | Date | string | null
    createdAt?: DateTimeFilter<"Session"> | Date | string
  }

  export type StaffCreateWithoutSessionsInput = {
    id: string
    cin: string
    phoneNumber: string
    firstName: string
    lastName: string
    role: string
    isActive?: boolean
    lastLogin?: Date | string | null
    syncedAt: Date | string
    bookings?: BookingCreateNestedManyWithoutCreatedByStaffInput
    verifications?: BookingCreateNestedManyWithoutVerifiedByStaffInput
  }

  export type StaffUncheckedCreateWithoutSessionsInput = {
    id: string
    cin: string
    phoneNumber: string
    firstName: string
    lastName: string
    role: string
    isActive?: boolean
    lastLogin?: Date | string | null
    syncedAt: Date | string
    bookings?: BookingUncheckedCreateNestedManyWithoutCreatedByStaffInput
    verifications?: BookingUncheckedCreateNestedManyWithoutVerifiedByStaffInput
  }

  export type StaffCreateOrConnectWithoutSessionsInput = {
    where: StaffWhereUniqueInput
    create: XOR<StaffCreateWithoutSessionsInput, StaffUncheckedCreateWithoutSessionsInput>
  }

  export type StaffUpsertWithoutSessionsInput = {
    update: XOR<StaffUpdateWithoutSessionsInput, StaffUncheckedUpdateWithoutSessionsInput>
    create: XOR<StaffCreateWithoutSessionsInput, StaffUncheckedCreateWithoutSessionsInput>
    where?: StaffWhereInput
  }

  export type StaffUpdateToOneWithWhereWithoutSessionsInput = {
    where?: StaffWhereInput
    data: XOR<StaffUpdateWithoutSessionsInput, StaffUncheckedUpdateWithoutSessionsInput>
  }

  export type StaffUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    cin?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookings?: BookingUpdateManyWithoutCreatedByStaffNestedInput
    verifications?: BookingUpdateManyWithoutVerifiedByStaffNestedInput
  }

  export type StaffUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    cin?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookings?: BookingUncheckedUpdateManyWithoutCreatedByStaffNestedInput
    verifications?: BookingUncheckedUpdateManyWithoutVerifiedByStaffNestedInput
  }

  export type VehicleCreateWithoutDriverInput = {
    id: string
    licensePlate: string
    capacity: number
    model?: string | null
    year?: number | null
    color?: string | null
    isActive?: boolean
    isAvailable?: boolean
    syncedAt: Date | string
    queueEntries?: VehicleQueueCreateNestedManyWithoutVehicleInput
    authorizedStations?: VehicleAuthorizedStationCreateNestedManyWithoutVehicleInput
  }

  export type VehicleUncheckedCreateWithoutDriverInput = {
    id: string
    licensePlate: string
    capacity: number
    model?: string | null
    year?: number | null
    color?: string | null
    isActive?: boolean
    isAvailable?: boolean
    syncedAt: Date | string
    queueEntries?: VehicleQueueUncheckedCreateNestedManyWithoutVehicleInput
    authorizedStations?: VehicleAuthorizedStationUncheckedCreateNestedManyWithoutVehicleInput
  }

  export type VehicleCreateOrConnectWithoutDriverInput = {
    where: VehicleWhereUniqueInput
    create: XOR<VehicleCreateWithoutDriverInput, VehicleUncheckedCreateWithoutDriverInput>
  }

  export type VehicleUpsertWithoutDriverInput = {
    update: XOR<VehicleUpdateWithoutDriverInput, VehicleUncheckedUpdateWithoutDriverInput>
    create: XOR<VehicleCreateWithoutDriverInput, VehicleUncheckedCreateWithoutDriverInput>
    where?: VehicleWhereInput
  }

  export type VehicleUpdateToOneWithWhereWithoutDriverInput = {
    where?: VehicleWhereInput
    data: XOR<VehicleUpdateWithoutDriverInput, VehicleUncheckedUpdateWithoutDriverInput>
  }

  export type VehicleUpdateWithoutDriverInput = {
    id?: StringFieldUpdateOperationsInput | string
    licensePlate?: StringFieldUpdateOperationsInput | string
    capacity?: IntFieldUpdateOperationsInput | number
    model?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    queueEntries?: VehicleQueueUpdateManyWithoutVehicleNestedInput
    authorizedStations?: VehicleAuthorizedStationUpdateManyWithoutVehicleNestedInput
  }

  export type VehicleUncheckedUpdateWithoutDriverInput = {
    id?: StringFieldUpdateOperationsInput | string
    licensePlate?: StringFieldUpdateOperationsInput | string
    capacity?: IntFieldUpdateOperationsInput | number
    model?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    queueEntries?: VehicleQueueUncheckedUpdateManyWithoutVehicleNestedInput
    authorizedStations?: VehicleAuthorizedStationUncheckedUpdateManyWithoutVehicleNestedInput
  }

  export type DriverCreateWithoutVehicleInput = {
    id: string
    cin: string
    phoneNumber: string
    firstName: string
    lastName: string
    originGovernorateId?: string | null
    originDelegationId?: string | null
    originAddress?: string | null
    accountStatus?: string
    isActive?: boolean
    syncedAt: Date | string
  }

  export type DriverUncheckedCreateWithoutVehicleInput = {
    id: string
    cin: string
    phoneNumber: string
    firstName: string
    lastName: string
    originGovernorateId?: string | null
    originDelegationId?: string | null
    originAddress?: string | null
    accountStatus?: string
    isActive?: boolean
    syncedAt: Date | string
  }

  export type DriverCreateOrConnectWithoutVehicleInput = {
    where: DriverWhereUniqueInput
    create: XOR<DriverCreateWithoutVehicleInput, DriverUncheckedCreateWithoutVehicleInput>
  }

  export type VehicleQueueCreateWithoutVehicleInput = {
    id: string
    destinationId: string
    destinationName: string
    queueType?: string
    queuePosition: number
    status?: string
    enteredAt: Date | string
    availableSeats: number
    totalSeats: number
    basePrice: number
    estimatedDeparture?: Date | string | null
    actualDeparture?: Date | string | null
    syncedAt: Date | string
    bookings?: BookingCreateNestedManyWithoutQueueInput
  }

  export type VehicleQueueUncheckedCreateWithoutVehicleInput = {
    id: string
    destinationId: string
    destinationName: string
    queueType?: string
    queuePosition: number
    status?: string
    enteredAt: Date | string
    availableSeats: number
    totalSeats: number
    basePrice: number
    estimatedDeparture?: Date | string | null
    actualDeparture?: Date | string | null
    syncedAt: Date | string
    bookings?: BookingUncheckedCreateNestedManyWithoutQueueInput
  }

  export type VehicleQueueCreateOrConnectWithoutVehicleInput = {
    where: VehicleQueueWhereUniqueInput
    create: XOR<VehicleQueueCreateWithoutVehicleInput, VehicleQueueUncheckedCreateWithoutVehicleInput>
  }

  export type VehicleQueueCreateManyVehicleInputEnvelope = {
    data: VehicleQueueCreateManyVehicleInput | VehicleQueueCreateManyVehicleInput[]
    skipDuplicates?: boolean
  }

  export type VehicleAuthorizedStationCreateWithoutVehicleInput = {
    id?: string
    stationId: string
    createdAt?: Date | string
    syncedAt: Date | string
  }

  export type VehicleAuthorizedStationUncheckedCreateWithoutVehicleInput = {
    id?: string
    stationId: string
    createdAt?: Date | string
    syncedAt: Date | string
  }

  export type VehicleAuthorizedStationCreateOrConnectWithoutVehicleInput = {
    where: VehicleAuthorizedStationWhereUniqueInput
    create: XOR<VehicleAuthorizedStationCreateWithoutVehicleInput, VehicleAuthorizedStationUncheckedCreateWithoutVehicleInput>
  }

  export type VehicleAuthorizedStationCreateManyVehicleInputEnvelope = {
    data: VehicleAuthorizedStationCreateManyVehicleInput | VehicleAuthorizedStationCreateManyVehicleInput[]
    skipDuplicates?: boolean
  }

  export type DriverUpsertWithoutVehicleInput = {
    update: XOR<DriverUpdateWithoutVehicleInput, DriverUncheckedUpdateWithoutVehicleInput>
    create: XOR<DriverCreateWithoutVehicleInput, DriverUncheckedCreateWithoutVehicleInput>
    where?: DriverWhereInput
  }

  export type DriverUpdateToOneWithWhereWithoutVehicleInput = {
    where?: DriverWhereInput
    data: XOR<DriverUpdateWithoutVehicleInput, DriverUncheckedUpdateWithoutVehicleInput>
  }

  export type DriverUpdateWithoutVehicleInput = {
    id?: StringFieldUpdateOperationsInput | string
    cin?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    originGovernorateId?: NullableStringFieldUpdateOperationsInput | string | null
    originDelegationId?: NullableStringFieldUpdateOperationsInput | string | null
    originAddress?: NullableStringFieldUpdateOperationsInput | string | null
    accountStatus?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DriverUncheckedUpdateWithoutVehicleInput = {
    id?: StringFieldUpdateOperationsInput | string
    cin?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    originGovernorateId?: NullableStringFieldUpdateOperationsInput | string | null
    originDelegationId?: NullableStringFieldUpdateOperationsInput | string | null
    originAddress?: NullableStringFieldUpdateOperationsInput | string | null
    accountStatus?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VehicleQueueUpsertWithWhereUniqueWithoutVehicleInput = {
    where: VehicleQueueWhereUniqueInput
    update: XOR<VehicleQueueUpdateWithoutVehicleInput, VehicleQueueUncheckedUpdateWithoutVehicleInput>
    create: XOR<VehicleQueueCreateWithoutVehicleInput, VehicleQueueUncheckedCreateWithoutVehicleInput>
  }

  export type VehicleQueueUpdateWithWhereUniqueWithoutVehicleInput = {
    where: VehicleQueueWhereUniqueInput
    data: XOR<VehicleQueueUpdateWithoutVehicleInput, VehicleQueueUncheckedUpdateWithoutVehicleInput>
  }

  export type VehicleQueueUpdateManyWithWhereWithoutVehicleInput = {
    where: VehicleQueueScalarWhereInput
    data: XOR<VehicleQueueUpdateManyMutationInput, VehicleQueueUncheckedUpdateManyWithoutVehicleInput>
  }

  export type VehicleQueueScalarWhereInput = {
    AND?: VehicleQueueScalarWhereInput | VehicleQueueScalarWhereInput[]
    OR?: VehicleQueueScalarWhereInput[]
    NOT?: VehicleQueueScalarWhereInput | VehicleQueueScalarWhereInput[]
    id?: StringFilter<"VehicleQueue"> | string
    vehicleId?: StringFilter<"VehicleQueue"> | string
    destinationId?: StringFilter<"VehicleQueue"> | string
    destinationName?: StringFilter<"VehicleQueue"> | string
    queueType?: StringFilter<"VehicleQueue"> | string
    queuePosition?: IntFilter<"VehicleQueue"> | number
    status?: StringFilter<"VehicleQueue"> | string
    enteredAt?: DateTimeFilter<"VehicleQueue"> | Date | string
    availableSeats?: IntFilter<"VehicleQueue"> | number
    totalSeats?: IntFilter<"VehicleQueue"> | number
    basePrice?: FloatFilter<"VehicleQueue"> | number
    estimatedDeparture?: DateTimeNullableFilter<"VehicleQueue"> | Date | string | null
    actualDeparture?: DateTimeNullableFilter<"VehicleQueue"> | Date | string | null
    syncedAt?: DateTimeFilter<"VehicleQueue"> | Date | string
  }

  export type VehicleAuthorizedStationUpsertWithWhereUniqueWithoutVehicleInput = {
    where: VehicleAuthorizedStationWhereUniqueInput
    update: XOR<VehicleAuthorizedStationUpdateWithoutVehicleInput, VehicleAuthorizedStationUncheckedUpdateWithoutVehicleInput>
    create: XOR<VehicleAuthorizedStationCreateWithoutVehicleInput, VehicleAuthorizedStationUncheckedCreateWithoutVehicleInput>
  }

  export type VehicleAuthorizedStationUpdateWithWhereUniqueWithoutVehicleInput = {
    where: VehicleAuthorizedStationWhereUniqueInput
    data: XOR<VehicleAuthorizedStationUpdateWithoutVehicleInput, VehicleAuthorizedStationUncheckedUpdateWithoutVehicleInput>
  }

  export type VehicleAuthorizedStationUpdateManyWithWhereWithoutVehicleInput = {
    where: VehicleAuthorizedStationScalarWhereInput
    data: XOR<VehicleAuthorizedStationUpdateManyMutationInput, VehicleAuthorizedStationUncheckedUpdateManyWithoutVehicleInput>
  }

  export type VehicleAuthorizedStationScalarWhereInput = {
    AND?: VehicleAuthorizedStationScalarWhereInput | VehicleAuthorizedStationScalarWhereInput[]
    OR?: VehicleAuthorizedStationScalarWhereInput[]
    NOT?: VehicleAuthorizedStationScalarWhereInput | VehicleAuthorizedStationScalarWhereInput[]
    id?: StringFilter<"VehicleAuthorizedStation"> | string
    vehicleId?: StringFilter<"VehicleAuthorizedStation"> | string
    stationId?: StringFilter<"VehicleAuthorizedStation"> | string
    createdAt?: DateTimeFilter<"VehicleAuthorizedStation"> | Date | string
    syncedAt?: DateTimeFilter<"VehicleAuthorizedStation"> | Date | string
  }

  export type VehicleCreateWithoutAuthorizedStationsInput = {
    id: string
    licensePlate: string
    capacity: number
    model?: string | null
    year?: number | null
    color?: string | null
    isActive?: boolean
    isAvailable?: boolean
    syncedAt: Date | string
    driver?: DriverCreateNestedOneWithoutVehicleInput
    queueEntries?: VehicleQueueCreateNestedManyWithoutVehicleInput
  }

  export type VehicleUncheckedCreateWithoutAuthorizedStationsInput = {
    id: string
    licensePlate: string
    capacity: number
    model?: string | null
    year?: number | null
    color?: string | null
    isActive?: boolean
    isAvailable?: boolean
    syncedAt: Date | string
    driver?: DriverUncheckedCreateNestedOneWithoutVehicleInput
    queueEntries?: VehicleQueueUncheckedCreateNestedManyWithoutVehicleInput
  }

  export type VehicleCreateOrConnectWithoutAuthorizedStationsInput = {
    where: VehicleWhereUniqueInput
    create: XOR<VehicleCreateWithoutAuthorizedStationsInput, VehicleUncheckedCreateWithoutAuthorizedStationsInput>
  }

  export type VehicleUpsertWithoutAuthorizedStationsInput = {
    update: XOR<VehicleUpdateWithoutAuthorizedStationsInput, VehicleUncheckedUpdateWithoutAuthorizedStationsInput>
    create: XOR<VehicleCreateWithoutAuthorizedStationsInput, VehicleUncheckedCreateWithoutAuthorizedStationsInput>
    where?: VehicleWhereInput
  }

  export type VehicleUpdateToOneWithWhereWithoutAuthorizedStationsInput = {
    where?: VehicleWhereInput
    data: XOR<VehicleUpdateWithoutAuthorizedStationsInput, VehicleUncheckedUpdateWithoutAuthorizedStationsInput>
  }

  export type VehicleUpdateWithoutAuthorizedStationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    licensePlate?: StringFieldUpdateOperationsInput | string
    capacity?: IntFieldUpdateOperationsInput | number
    model?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    driver?: DriverUpdateOneWithoutVehicleNestedInput
    queueEntries?: VehicleQueueUpdateManyWithoutVehicleNestedInput
  }

  export type VehicleUncheckedUpdateWithoutAuthorizedStationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    licensePlate?: StringFieldUpdateOperationsInput | string
    capacity?: IntFieldUpdateOperationsInput | number
    model?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    driver?: DriverUncheckedUpdateOneWithoutVehicleNestedInput
    queueEntries?: VehicleQueueUncheckedUpdateManyWithoutVehicleNestedInput
  }

  export type VehicleCreateWithoutQueueEntriesInput = {
    id: string
    licensePlate: string
    capacity: number
    model?: string | null
    year?: number | null
    color?: string | null
    isActive?: boolean
    isAvailable?: boolean
    syncedAt: Date | string
    driver?: DriverCreateNestedOneWithoutVehicleInput
    authorizedStations?: VehicleAuthorizedStationCreateNestedManyWithoutVehicleInput
  }

  export type VehicleUncheckedCreateWithoutQueueEntriesInput = {
    id: string
    licensePlate: string
    capacity: number
    model?: string | null
    year?: number | null
    color?: string | null
    isActive?: boolean
    isAvailable?: boolean
    syncedAt: Date | string
    driver?: DriverUncheckedCreateNestedOneWithoutVehicleInput
    authorizedStations?: VehicleAuthorizedStationUncheckedCreateNestedManyWithoutVehicleInput
  }

  export type VehicleCreateOrConnectWithoutQueueEntriesInput = {
    where: VehicleWhereUniqueInput
    create: XOR<VehicleCreateWithoutQueueEntriesInput, VehicleUncheckedCreateWithoutQueueEntriesInput>
  }

  export type BookingCreateWithoutQueueInput = {
    id: string
    seatsBooked: number
    totalAmount: number
    bookingSource: string
    bookingType?: string
    customerName?: string | null
    customerPhone?: string | null
    onlineTicketId?: string | null
    paymentStatus?: string
    paymentMethod?: string
    verificationCode: string
    qrCode?: string | null
    isVerified?: boolean
    verifiedAt?: Date | string | null
    createdOffline?: boolean
    localId?: string | null
    createdAt?: Date | string
    syncStatus?: string
    createdByStaff?: StaffCreateNestedOneWithoutBookingsInput
    verifiedByStaff?: StaffCreateNestedOneWithoutVerificationsInput
  }

  export type BookingUncheckedCreateWithoutQueueInput = {
    id: string
    seatsBooked: number
    totalAmount: number
    bookingSource: string
    bookingType?: string
    customerName?: string | null
    customerPhone?: string | null
    onlineTicketId?: string | null
    paymentStatus?: string
    paymentMethod?: string
    verificationCode: string
    qrCode?: string | null
    isVerified?: boolean
    verifiedAt?: Date | string | null
    verifiedById?: string | null
    createdOffline?: boolean
    localId?: string | null
    createdBy?: string | null
    createdAt?: Date | string
    syncStatus?: string
  }

  export type BookingCreateOrConnectWithoutQueueInput = {
    where: BookingWhereUniqueInput
    create: XOR<BookingCreateWithoutQueueInput, BookingUncheckedCreateWithoutQueueInput>
  }

  export type BookingCreateManyQueueInputEnvelope = {
    data: BookingCreateManyQueueInput | BookingCreateManyQueueInput[]
    skipDuplicates?: boolean
  }

  export type VehicleUpsertWithoutQueueEntriesInput = {
    update: XOR<VehicleUpdateWithoutQueueEntriesInput, VehicleUncheckedUpdateWithoutQueueEntriesInput>
    create: XOR<VehicleCreateWithoutQueueEntriesInput, VehicleUncheckedCreateWithoutQueueEntriesInput>
    where?: VehicleWhereInput
  }

  export type VehicleUpdateToOneWithWhereWithoutQueueEntriesInput = {
    where?: VehicleWhereInput
    data: XOR<VehicleUpdateWithoutQueueEntriesInput, VehicleUncheckedUpdateWithoutQueueEntriesInput>
  }

  export type VehicleUpdateWithoutQueueEntriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    licensePlate?: StringFieldUpdateOperationsInput | string
    capacity?: IntFieldUpdateOperationsInput | number
    model?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    driver?: DriverUpdateOneWithoutVehicleNestedInput
    authorizedStations?: VehicleAuthorizedStationUpdateManyWithoutVehicleNestedInput
  }

  export type VehicleUncheckedUpdateWithoutQueueEntriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    licensePlate?: StringFieldUpdateOperationsInput | string
    capacity?: IntFieldUpdateOperationsInput | number
    model?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    driver?: DriverUncheckedUpdateOneWithoutVehicleNestedInput
    authorizedStations?: VehicleAuthorizedStationUncheckedUpdateManyWithoutVehicleNestedInput
  }

  export type BookingUpsertWithWhereUniqueWithoutQueueInput = {
    where: BookingWhereUniqueInput
    update: XOR<BookingUpdateWithoutQueueInput, BookingUncheckedUpdateWithoutQueueInput>
    create: XOR<BookingCreateWithoutQueueInput, BookingUncheckedCreateWithoutQueueInput>
  }

  export type BookingUpdateWithWhereUniqueWithoutQueueInput = {
    where: BookingWhereUniqueInput
    data: XOR<BookingUpdateWithoutQueueInput, BookingUncheckedUpdateWithoutQueueInput>
  }

  export type BookingUpdateManyWithWhereWithoutQueueInput = {
    where: BookingScalarWhereInput
    data: XOR<BookingUpdateManyMutationInput, BookingUncheckedUpdateManyWithoutQueueInput>
  }

  export type VehicleScheduleCreateWithoutRouteInput = {
    id: string
    vehicleId: string
    departureTime: Date | string
    availableSeats: number
    totalSeats: number
    status?: string
    actualDeparture?: Date | string | null
    syncedAt: Date | string
  }

  export type VehicleScheduleUncheckedCreateWithoutRouteInput = {
    id: string
    vehicleId: string
    departureTime: Date | string
    availableSeats: number
    totalSeats: number
    status?: string
    actualDeparture?: Date | string | null
    syncedAt: Date | string
  }

  export type VehicleScheduleCreateOrConnectWithoutRouteInput = {
    where: VehicleScheduleWhereUniqueInput
    create: XOR<VehicleScheduleCreateWithoutRouteInput, VehicleScheduleUncheckedCreateWithoutRouteInput>
  }

  export type VehicleScheduleCreateManyRouteInputEnvelope = {
    data: VehicleScheduleCreateManyRouteInput | VehicleScheduleCreateManyRouteInput[]
    skipDuplicates?: boolean
  }

  export type VehicleScheduleUpsertWithWhereUniqueWithoutRouteInput = {
    where: VehicleScheduleWhereUniqueInput
    update: XOR<VehicleScheduleUpdateWithoutRouteInput, VehicleScheduleUncheckedUpdateWithoutRouteInput>
    create: XOR<VehicleScheduleCreateWithoutRouteInput, VehicleScheduleUncheckedCreateWithoutRouteInput>
  }

  export type VehicleScheduleUpdateWithWhereUniqueWithoutRouteInput = {
    where: VehicleScheduleWhereUniqueInput
    data: XOR<VehicleScheduleUpdateWithoutRouteInput, VehicleScheduleUncheckedUpdateWithoutRouteInput>
  }

  export type VehicleScheduleUpdateManyWithWhereWithoutRouteInput = {
    where: VehicleScheduleScalarWhereInput
    data: XOR<VehicleScheduleUpdateManyMutationInput, VehicleScheduleUncheckedUpdateManyWithoutRouteInput>
  }

  export type VehicleScheduleScalarWhereInput = {
    AND?: VehicleScheduleScalarWhereInput | VehicleScheduleScalarWhereInput[]
    OR?: VehicleScheduleScalarWhereInput[]
    NOT?: VehicleScheduleScalarWhereInput | VehicleScheduleScalarWhereInput[]
    id?: StringFilter<"VehicleSchedule"> | string
    vehicleId?: StringFilter<"VehicleSchedule"> | string
    routeId?: StringFilter<"VehicleSchedule"> | string
    departureTime?: DateTimeFilter<"VehicleSchedule"> | Date | string
    availableSeats?: IntFilter<"VehicleSchedule"> | number
    totalSeats?: IntFilter<"VehicleSchedule"> | number
    status?: StringFilter<"VehicleSchedule"> | string
    actualDeparture?: DateTimeNullableFilter<"VehicleSchedule"> | Date | string | null
    syncedAt?: DateTimeFilter<"VehicleSchedule"> | Date | string
  }

  export type RouteCreateWithoutSchedulesInput = {
    id: string
    departureStationId: string
    destinationStationId: string
    destinationName: string
    basePrice: number
    isActive?: boolean
    syncedAt: Date | string
  }

  export type RouteUncheckedCreateWithoutSchedulesInput = {
    id: string
    departureStationId: string
    destinationStationId: string
    destinationName: string
    basePrice: number
    isActive?: boolean
    syncedAt: Date | string
  }

  export type RouteCreateOrConnectWithoutSchedulesInput = {
    where: RouteWhereUniqueInput
    create: XOR<RouteCreateWithoutSchedulesInput, RouteUncheckedCreateWithoutSchedulesInput>
  }

  export type RouteUpsertWithoutSchedulesInput = {
    update: XOR<RouteUpdateWithoutSchedulesInput, RouteUncheckedUpdateWithoutSchedulesInput>
    create: XOR<RouteCreateWithoutSchedulesInput, RouteUncheckedCreateWithoutSchedulesInput>
    where?: RouteWhereInput
  }

  export type RouteUpdateToOneWithWhereWithoutSchedulesInput = {
    where?: RouteWhereInput
    data: XOR<RouteUpdateWithoutSchedulesInput, RouteUncheckedUpdateWithoutSchedulesInput>
  }

  export type RouteUpdateWithoutSchedulesInput = {
    id?: StringFieldUpdateOperationsInput | string
    departureStationId?: StringFieldUpdateOperationsInput | string
    destinationStationId?: StringFieldUpdateOperationsInput | string
    destinationName?: StringFieldUpdateOperationsInput | string
    basePrice?: FloatFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RouteUncheckedUpdateWithoutSchedulesInput = {
    id?: StringFieldUpdateOperationsInput | string
    departureStationId?: StringFieldUpdateOperationsInput | string
    destinationStationId?: StringFieldUpdateOperationsInput | string
    destinationName?: StringFieldUpdateOperationsInput | string
    basePrice?: FloatFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VehicleQueueCreateWithoutBookingsInput = {
    id: string
    destinationId: string
    destinationName: string
    queueType?: string
    queuePosition: number
    status?: string
    enteredAt: Date | string
    availableSeats: number
    totalSeats: number
    basePrice: number
    estimatedDeparture?: Date | string | null
    actualDeparture?: Date | string | null
    syncedAt: Date | string
    vehicle: VehicleCreateNestedOneWithoutQueueEntriesInput
  }

  export type VehicleQueueUncheckedCreateWithoutBookingsInput = {
    id: string
    vehicleId: string
    destinationId: string
    destinationName: string
    queueType?: string
    queuePosition: number
    status?: string
    enteredAt: Date | string
    availableSeats: number
    totalSeats: number
    basePrice: number
    estimatedDeparture?: Date | string | null
    actualDeparture?: Date | string | null
    syncedAt: Date | string
  }

  export type VehicleQueueCreateOrConnectWithoutBookingsInput = {
    where: VehicleQueueWhereUniqueInput
    create: XOR<VehicleQueueCreateWithoutBookingsInput, VehicleQueueUncheckedCreateWithoutBookingsInput>
  }

  export type StaffCreateWithoutBookingsInput = {
    id: string
    cin: string
    phoneNumber: string
    firstName: string
    lastName: string
    role: string
    isActive?: boolean
    lastLogin?: Date | string | null
    syncedAt: Date | string
    verifications?: BookingCreateNestedManyWithoutVerifiedByStaffInput
    sessions?: SessionCreateNestedManyWithoutStaffInput
  }

  export type StaffUncheckedCreateWithoutBookingsInput = {
    id: string
    cin: string
    phoneNumber: string
    firstName: string
    lastName: string
    role: string
    isActive?: boolean
    lastLogin?: Date | string | null
    syncedAt: Date | string
    verifications?: BookingUncheckedCreateNestedManyWithoutVerifiedByStaffInput
    sessions?: SessionUncheckedCreateNestedManyWithoutStaffInput
  }

  export type StaffCreateOrConnectWithoutBookingsInput = {
    where: StaffWhereUniqueInput
    create: XOR<StaffCreateWithoutBookingsInput, StaffUncheckedCreateWithoutBookingsInput>
  }

  export type StaffCreateWithoutVerificationsInput = {
    id: string
    cin: string
    phoneNumber: string
    firstName: string
    lastName: string
    role: string
    isActive?: boolean
    lastLogin?: Date | string | null
    syncedAt: Date | string
    bookings?: BookingCreateNestedManyWithoutCreatedByStaffInput
    sessions?: SessionCreateNestedManyWithoutStaffInput
  }

  export type StaffUncheckedCreateWithoutVerificationsInput = {
    id: string
    cin: string
    phoneNumber: string
    firstName: string
    lastName: string
    role: string
    isActive?: boolean
    lastLogin?: Date | string | null
    syncedAt: Date | string
    bookings?: BookingUncheckedCreateNestedManyWithoutCreatedByStaffInput
    sessions?: SessionUncheckedCreateNestedManyWithoutStaffInput
  }

  export type StaffCreateOrConnectWithoutVerificationsInput = {
    where: StaffWhereUniqueInput
    create: XOR<StaffCreateWithoutVerificationsInput, StaffUncheckedCreateWithoutVerificationsInput>
  }

  export type VehicleQueueUpsertWithoutBookingsInput = {
    update: XOR<VehicleQueueUpdateWithoutBookingsInput, VehicleQueueUncheckedUpdateWithoutBookingsInput>
    create: XOR<VehicleQueueCreateWithoutBookingsInput, VehicleQueueUncheckedCreateWithoutBookingsInput>
    where?: VehicleQueueWhereInput
  }

  export type VehicleQueueUpdateToOneWithWhereWithoutBookingsInput = {
    where?: VehicleQueueWhereInput
    data: XOR<VehicleQueueUpdateWithoutBookingsInput, VehicleQueueUncheckedUpdateWithoutBookingsInput>
  }

  export type VehicleQueueUpdateWithoutBookingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    destinationId?: StringFieldUpdateOperationsInput | string
    destinationName?: StringFieldUpdateOperationsInput | string
    queueType?: StringFieldUpdateOperationsInput | string
    queuePosition?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    enteredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    availableSeats?: IntFieldUpdateOperationsInput | number
    totalSeats?: IntFieldUpdateOperationsInput | number
    basePrice?: FloatFieldUpdateOperationsInput | number
    estimatedDeparture?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualDeparture?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vehicle?: VehicleUpdateOneRequiredWithoutQueueEntriesNestedInput
  }

  export type VehicleQueueUncheckedUpdateWithoutBookingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    vehicleId?: StringFieldUpdateOperationsInput | string
    destinationId?: StringFieldUpdateOperationsInput | string
    destinationName?: StringFieldUpdateOperationsInput | string
    queueType?: StringFieldUpdateOperationsInput | string
    queuePosition?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    enteredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    availableSeats?: IntFieldUpdateOperationsInput | number
    totalSeats?: IntFieldUpdateOperationsInput | number
    basePrice?: FloatFieldUpdateOperationsInput | number
    estimatedDeparture?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualDeparture?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StaffUpsertWithoutBookingsInput = {
    update: XOR<StaffUpdateWithoutBookingsInput, StaffUncheckedUpdateWithoutBookingsInput>
    create: XOR<StaffCreateWithoutBookingsInput, StaffUncheckedCreateWithoutBookingsInput>
    where?: StaffWhereInput
  }

  export type StaffUpdateToOneWithWhereWithoutBookingsInput = {
    where?: StaffWhereInput
    data: XOR<StaffUpdateWithoutBookingsInput, StaffUncheckedUpdateWithoutBookingsInput>
  }

  export type StaffUpdateWithoutBookingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    cin?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    verifications?: BookingUpdateManyWithoutVerifiedByStaffNestedInput
    sessions?: SessionUpdateManyWithoutStaffNestedInput
  }

  export type StaffUncheckedUpdateWithoutBookingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    cin?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    verifications?: BookingUncheckedUpdateManyWithoutVerifiedByStaffNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutStaffNestedInput
  }

  export type StaffUpsertWithoutVerificationsInput = {
    update: XOR<StaffUpdateWithoutVerificationsInput, StaffUncheckedUpdateWithoutVerificationsInput>
    create: XOR<StaffCreateWithoutVerificationsInput, StaffUncheckedCreateWithoutVerificationsInput>
    where?: StaffWhereInput
  }

  export type StaffUpdateToOneWithWhereWithoutVerificationsInput = {
    where?: StaffWhereInput
    data: XOR<StaffUpdateWithoutVerificationsInput, StaffUncheckedUpdateWithoutVerificationsInput>
  }

  export type StaffUpdateWithoutVerificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    cin?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookings?: BookingUpdateManyWithoutCreatedByStaffNestedInput
    sessions?: SessionUpdateManyWithoutStaffNestedInput
  }

  export type StaffUncheckedUpdateWithoutVerificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    cin?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookings?: BookingUncheckedUpdateManyWithoutCreatedByStaffNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutStaffNestedInput
  }

  export type BookingCreateManyCreatedByStaffInput = {
    id: string
    queueId: string
    seatsBooked: number
    totalAmount: number
    bookingSource: string
    bookingType?: string
    customerName?: string | null
    customerPhone?: string | null
    onlineTicketId?: string | null
    paymentStatus?: string
    paymentMethod?: string
    verificationCode: string
    qrCode?: string | null
    isVerified?: boolean
    verifiedAt?: Date | string | null
    verifiedById?: string | null
    createdOffline?: boolean
    localId?: string | null
    createdAt?: Date | string
    syncStatus?: string
  }

  export type BookingCreateManyVerifiedByStaffInput = {
    id: string
    queueId: string
    seatsBooked: number
    totalAmount: number
    bookingSource: string
    bookingType?: string
    customerName?: string | null
    customerPhone?: string | null
    onlineTicketId?: string | null
    paymentStatus?: string
    paymentMethod?: string
    verificationCode: string
    qrCode?: string | null
    isVerified?: boolean
    verifiedAt?: Date | string | null
    createdOffline?: boolean
    localId?: string | null
    createdBy?: string | null
    createdAt?: Date | string
    syncStatus?: string
  }

  export type SessionCreateManyStaffInput = {
    id?: string
    token: string
    staffData: string
    isActive?: boolean
    lastActivity?: Date | string
    expiresAt: Date | string
    createdOffline?: boolean
    lastOfflineAt?: Date | string | null
    createdAt?: Date | string
  }

  export type BookingUpdateWithoutCreatedByStaffInput = {
    id?: StringFieldUpdateOperationsInput | string
    seatsBooked?: IntFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    bookingSource?: StringFieldUpdateOperationsInput | string
    bookingType?: StringFieldUpdateOperationsInput | string
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    onlineTicketId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentStatus?: StringFieldUpdateOperationsInput | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    verificationCode?: StringFieldUpdateOperationsInput | string
    qrCode?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdOffline?: BoolFieldUpdateOperationsInput | boolean
    localId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncStatus?: StringFieldUpdateOperationsInput | string
    queue?: VehicleQueueUpdateOneRequiredWithoutBookingsNestedInput
    verifiedByStaff?: StaffUpdateOneWithoutVerificationsNestedInput
  }

  export type BookingUncheckedUpdateWithoutCreatedByStaffInput = {
    id?: StringFieldUpdateOperationsInput | string
    queueId?: StringFieldUpdateOperationsInput | string
    seatsBooked?: IntFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    bookingSource?: StringFieldUpdateOperationsInput | string
    bookingType?: StringFieldUpdateOperationsInput | string
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    onlineTicketId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentStatus?: StringFieldUpdateOperationsInput | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    verificationCode?: StringFieldUpdateOperationsInput | string
    qrCode?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verifiedById?: NullableStringFieldUpdateOperationsInput | string | null
    createdOffline?: BoolFieldUpdateOperationsInput | boolean
    localId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncStatus?: StringFieldUpdateOperationsInput | string
  }

  export type BookingUncheckedUpdateManyWithoutCreatedByStaffInput = {
    id?: StringFieldUpdateOperationsInput | string
    queueId?: StringFieldUpdateOperationsInput | string
    seatsBooked?: IntFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    bookingSource?: StringFieldUpdateOperationsInput | string
    bookingType?: StringFieldUpdateOperationsInput | string
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    onlineTicketId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentStatus?: StringFieldUpdateOperationsInput | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    verificationCode?: StringFieldUpdateOperationsInput | string
    qrCode?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verifiedById?: NullableStringFieldUpdateOperationsInput | string | null
    createdOffline?: BoolFieldUpdateOperationsInput | boolean
    localId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncStatus?: StringFieldUpdateOperationsInput | string
  }

  export type BookingUpdateWithoutVerifiedByStaffInput = {
    id?: StringFieldUpdateOperationsInput | string
    seatsBooked?: IntFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    bookingSource?: StringFieldUpdateOperationsInput | string
    bookingType?: StringFieldUpdateOperationsInput | string
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    onlineTicketId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentStatus?: StringFieldUpdateOperationsInput | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    verificationCode?: StringFieldUpdateOperationsInput | string
    qrCode?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdOffline?: BoolFieldUpdateOperationsInput | boolean
    localId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncStatus?: StringFieldUpdateOperationsInput | string
    queue?: VehicleQueueUpdateOneRequiredWithoutBookingsNestedInput
    createdByStaff?: StaffUpdateOneWithoutBookingsNestedInput
  }

  export type BookingUncheckedUpdateWithoutVerifiedByStaffInput = {
    id?: StringFieldUpdateOperationsInput | string
    queueId?: StringFieldUpdateOperationsInput | string
    seatsBooked?: IntFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    bookingSource?: StringFieldUpdateOperationsInput | string
    bookingType?: StringFieldUpdateOperationsInput | string
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    onlineTicketId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentStatus?: StringFieldUpdateOperationsInput | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    verificationCode?: StringFieldUpdateOperationsInput | string
    qrCode?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdOffline?: BoolFieldUpdateOperationsInput | boolean
    localId?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncStatus?: StringFieldUpdateOperationsInput | string
  }

  export type BookingUncheckedUpdateManyWithoutVerifiedByStaffInput = {
    id?: StringFieldUpdateOperationsInput | string
    queueId?: StringFieldUpdateOperationsInput | string
    seatsBooked?: IntFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    bookingSource?: StringFieldUpdateOperationsInput | string
    bookingType?: StringFieldUpdateOperationsInput | string
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    onlineTicketId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentStatus?: StringFieldUpdateOperationsInput | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    verificationCode?: StringFieldUpdateOperationsInput | string
    qrCode?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdOffline?: BoolFieldUpdateOperationsInput | boolean
    localId?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncStatus?: StringFieldUpdateOperationsInput | string
  }

  export type SessionUpdateWithoutStaffInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    staffData?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastActivity?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdOffline?: BoolFieldUpdateOperationsInput | boolean
    lastOfflineAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateWithoutStaffInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    staffData?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastActivity?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdOffline?: BoolFieldUpdateOperationsInput | boolean
    lastOfflineAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyWithoutStaffInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    staffData?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastActivity?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdOffline?: BoolFieldUpdateOperationsInput | boolean
    lastOfflineAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VehicleQueueCreateManyVehicleInput = {
    id: string
    destinationId: string
    destinationName: string
    queueType?: string
    queuePosition: number
    status?: string
    enteredAt: Date | string
    availableSeats: number
    totalSeats: number
    basePrice: number
    estimatedDeparture?: Date | string | null
    actualDeparture?: Date | string | null
    syncedAt: Date | string
  }

  export type VehicleAuthorizedStationCreateManyVehicleInput = {
    id?: string
    stationId: string
    createdAt?: Date | string
    syncedAt: Date | string
  }

  export type VehicleQueueUpdateWithoutVehicleInput = {
    id?: StringFieldUpdateOperationsInput | string
    destinationId?: StringFieldUpdateOperationsInput | string
    destinationName?: StringFieldUpdateOperationsInput | string
    queueType?: StringFieldUpdateOperationsInput | string
    queuePosition?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    enteredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    availableSeats?: IntFieldUpdateOperationsInput | number
    totalSeats?: IntFieldUpdateOperationsInput | number
    basePrice?: FloatFieldUpdateOperationsInput | number
    estimatedDeparture?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualDeparture?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookings?: BookingUpdateManyWithoutQueueNestedInput
  }

  export type VehicleQueueUncheckedUpdateWithoutVehicleInput = {
    id?: StringFieldUpdateOperationsInput | string
    destinationId?: StringFieldUpdateOperationsInput | string
    destinationName?: StringFieldUpdateOperationsInput | string
    queueType?: StringFieldUpdateOperationsInput | string
    queuePosition?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    enteredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    availableSeats?: IntFieldUpdateOperationsInput | number
    totalSeats?: IntFieldUpdateOperationsInput | number
    basePrice?: FloatFieldUpdateOperationsInput | number
    estimatedDeparture?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualDeparture?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookings?: BookingUncheckedUpdateManyWithoutQueueNestedInput
  }

  export type VehicleQueueUncheckedUpdateManyWithoutVehicleInput = {
    id?: StringFieldUpdateOperationsInput | string
    destinationId?: StringFieldUpdateOperationsInput | string
    destinationName?: StringFieldUpdateOperationsInput | string
    queueType?: StringFieldUpdateOperationsInput | string
    queuePosition?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    enteredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    availableSeats?: IntFieldUpdateOperationsInput | number
    totalSeats?: IntFieldUpdateOperationsInput | number
    basePrice?: FloatFieldUpdateOperationsInput | number
    estimatedDeparture?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualDeparture?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VehicleAuthorizedStationUpdateWithoutVehicleInput = {
    id?: StringFieldUpdateOperationsInput | string
    stationId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VehicleAuthorizedStationUncheckedUpdateWithoutVehicleInput = {
    id?: StringFieldUpdateOperationsInput | string
    stationId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VehicleAuthorizedStationUncheckedUpdateManyWithoutVehicleInput = {
    id?: StringFieldUpdateOperationsInput | string
    stationId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingCreateManyQueueInput = {
    id: string
    seatsBooked: number
    totalAmount: number
    bookingSource: string
    bookingType?: string
    customerName?: string | null
    customerPhone?: string | null
    onlineTicketId?: string | null
    paymentStatus?: string
    paymentMethod?: string
    verificationCode: string
    qrCode?: string | null
    isVerified?: boolean
    verifiedAt?: Date | string | null
    verifiedById?: string | null
    createdOffline?: boolean
    localId?: string | null
    createdBy?: string | null
    createdAt?: Date | string
    syncStatus?: string
  }

  export type BookingUpdateWithoutQueueInput = {
    id?: StringFieldUpdateOperationsInput | string
    seatsBooked?: IntFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    bookingSource?: StringFieldUpdateOperationsInput | string
    bookingType?: StringFieldUpdateOperationsInput | string
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    onlineTicketId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentStatus?: StringFieldUpdateOperationsInput | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    verificationCode?: StringFieldUpdateOperationsInput | string
    qrCode?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdOffline?: BoolFieldUpdateOperationsInput | boolean
    localId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncStatus?: StringFieldUpdateOperationsInput | string
    createdByStaff?: StaffUpdateOneWithoutBookingsNestedInput
    verifiedByStaff?: StaffUpdateOneWithoutVerificationsNestedInput
  }

  export type BookingUncheckedUpdateWithoutQueueInput = {
    id?: StringFieldUpdateOperationsInput | string
    seatsBooked?: IntFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    bookingSource?: StringFieldUpdateOperationsInput | string
    bookingType?: StringFieldUpdateOperationsInput | string
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    onlineTicketId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentStatus?: StringFieldUpdateOperationsInput | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    verificationCode?: StringFieldUpdateOperationsInput | string
    qrCode?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verifiedById?: NullableStringFieldUpdateOperationsInput | string | null
    createdOffline?: BoolFieldUpdateOperationsInput | boolean
    localId?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncStatus?: StringFieldUpdateOperationsInput | string
  }

  export type BookingUncheckedUpdateManyWithoutQueueInput = {
    id?: StringFieldUpdateOperationsInput | string
    seatsBooked?: IntFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    bookingSource?: StringFieldUpdateOperationsInput | string
    bookingType?: StringFieldUpdateOperationsInput | string
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    onlineTicketId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentStatus?: StringFieldUpdateOperationsInput | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    verificationCode?: StringFieldUpdateOperationsInput | string
    qrCode?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verifiedById?: NullableStringFieldUpdateOperationsInput | string | null
    createdOffline?: BoolFieldUpdateOperationsInput | boolean
    localId?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncStatus?: StringFieldUpdateOperationsInput | string
  }

  export type VehicleScheduleCreateManyRouteInput = {
    id: string
    vehicleId: string
    departureTime: Date | string
    availableSeats: number
    totalSeats: number
    status?: string
    actualDeparture?: Date | string | null
    syncedAt: Date | string
  }

  export type VehicleScheduleUpdateWithoutRouteInput = {
    id?: StringFieldUpdateOperationsInput | string
    vehicleId?: StringFieldUpdateOperationsInput | string
    departureTime?: DateTimeFieldUpdateOperationsInput | Date | string
    availableSeats?: IntFieldUpdateOperationsInput | number
    totalSeats?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    actualDeparture?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VehicleScheduleUncheckedUpdateWithoutRouteInput = {
    id?: StringFieldUpdateOperationsInput | string
    vehicleId?: StringFieldUpdateOperationsInput | string
    departureTime?: DateTimeFieldUpdateOperationsInput | Date | string
    availableSeats?: IntFieldUpdateOperationsInput | number
    totalSeats?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    actualDeparture?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VehicleScheduleUncheckedUpdateManyWithoutRouteInput = {
    id?: StringFieldUpdateOperationsInput | string
    vehicleId?: StringFieldUpdateOperationsInput | string
    departureTime?: DateTimeFieldUpdateOperationsInput | Date | string
    availableSeats?: IntFieldUpdateOperationsInput | number
    totalSeats?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    actualDeparture?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}