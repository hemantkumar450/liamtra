import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

export class BaseDataModel<T> {
  data: T[] = new Array<T>();
  totalRecords = 0;
}

export class BaseResponseModel<T> {
  successful: boolean;
  // data: any;
}

export class ObjectModel<T> {
  StatusDesc: string;
  Status: boolean;
  HasError: boolean;
  ErrorMessage: any;
  Result: T = {} as T;

}
export class ArrayModel<T> {
  StatusDesc: string;
  Status: boolean;
  HasError: boolean;
  ErrorMessage: any;
  Result: T[] = [];
}

export class ArrayResponseModel<T> {
  data: ArrayModel<T> = new ArrayModel<T>();
}

export class ObjectResponseModel<T> {
  data: ObjectModel<T> = new ObjectModel<T>();
  totalRecords = 0;
}

export class PostObjectResponseModel<T> extends ObjectResponseModel<T> {
  ValidatonResult: ValidationResult = new ValidationResult();
  constructor() {
    super();
  }
}

export class ValidationResult {
  validationErrors: ValidationErrors[] = new Array<ValidationErrors>();
}

export class ValidationErrors {
  errorMessage = '';
  memberNames: string[] = new Array<string>();
  errorCode = 0;
}

export class AsyncArrayPromiseHandler<T> extends Promise<ArrayResponseModel<T>>  {
  constructor(promise: Promise<any>) {
    super(async (resolve, reject) => {
      if (!promise) { return; }
      try {
        const res = await promise;
        const returnValue: ArrayResponseModel<T> = new ArrayResponseModel<T>();
        if (res.status === 200) {
          const data = res.json();
          if (data && data.length) {
            returnValue.data.Result = data;
          }
          returnValue.data.Status = true;
          returnValue.data.StatusDesc = 'success';
          resolve(returnValue);
        }
      } catch (error) {
        const returnValue: PostObjectResponseModel<T> = new PostObjectResponseModel<T>();
        returnValue.data.Status = error.status;
        returnValue.data.ErrorMessage = (error as any)._body;
        returnValue.data.HasError = true;
        try {
          const validationResult = error.json() as ValidationResult;
          if (validationResult) {
            (returnValue as PostObjectResponseModel<T>).ValidatonResult = validationResult;
          }
        } catch (ex) {
        }
        reject(returnValue);
      }
    });
  }
}

export class AsyncObjectPromiseHandler<T> extends Promise<ObjectResponseModel<T>>  {
  constructor(promise: Promise<any>) {
    super(async (resolve, reject) => {
      if (!promise) { return; }
      try {
        const res = await promise;
        const returnValue: PostObjectResponseModel<T> = new PostObjectResponseModel<T>();
        if (res.status === 200) {
          const data = res.json();
          returnValue.data.Result = data;
          returnValue.data.Status = true;
          returnValue.totalRecords = data.totalRecords;
          returnValue.data.StatusDesc = 'success';
          resolve(returnValue);
        }
        if (res.status === 204) {
          const data = res.json();
          returnValue.data.Result = data;
          returnValue.data.Status = true;
          returnValue.data.StatusDesc = 'No Content';
          resolve(returnValue);
        }
      } catch (error) {
        const returnValue: PostObjectResponseModel<T> = new PostObjectResponseModel<T>();
        returnValue.data.Status = error.status;
        returnValue.data.ErrorMessage = (error as any)._body;
        returnValue.data.HasError = true;
        try {
          const validationResult = error.json() as ValidationResult;
          if (validationResult) {
            returnValue.ValidatonResult = validationResult;
          }
        } catch (ex) {
        }
        reject(returnValue);
      }
    });
  }
}

export class PromiseHandler<T> extends Promise<BaseResponseModel<T>>  {
  constructor(promise: Promise<any>) {
    super((resolve, reject) => {
      if (!promise) { return; }
      promise.then(res => {
        const returnValue: BaseResponseModel<T> = {} as BaseResponseModel<T>;

        if (res.status === 200) {
          const data = res.json();

          if (data) {
            (returnValue as BaseResponseModel<T>) = data;
          } else {
            const dataObject = res.json();
            // if (dataObject) {
            // (returnValue as ObjectResponseModel<T>).data = dataObject;
            // }
          }
          returnValue.successful = true;
          resolve(returnValue);
        }

        if (res.status !== 200) {
          returnValue.successful = res.status;
          returnValue.successful = (res as any)._body;
          try {
            const validationResult = res.json() as ValidationResult;
            if (validationResult) {
              // (returnValue as PostObjectResponseModel<T>).ValidatonResult = validationResult;
            }
          } catch (ex) {
          }
          reject(returnValue);
        }

      });
      promise.catch(err => {
        const returnValue: PostObjectResponseModel<T> = new PostObjectResponseModel<T>();
        // returnValue.successful = err.status;
        // returnValue.successful = (err as any)._body;
        try {
          const validationResult = err.json() as ValidationResult;
          if (validationResult) {
            (returnValue as PostObjectResponseModel<T>).ValidatonResult = validationResult;
          }
        } catch (ex) {

        }
        reject(returnValue);
      });
    });
  }
}

export class DeletePromiseHandler<T> extends Promise<BaseResponseModel<T>>  {
  constructor(promise: Promise<any>) {
    super((resolve, reject) => {
      if (!promise) { return; }
      promise.then(res => {
        const returnValue: BaseResponseModel<T> = {} as BaseResponseModel<T>;

        if (res.status === 200) {
          const data = res as T[];
          if (data) {
            // (returnValue as ArrayResponseModel<T>).data.Result = data;
          } else {
            const dataObject = res.json() as T;
            if (dataObject) {
              // (returnValue as ObjectResponseModel<T>).data.Result = dataObject;
            }
          }
          returnValue.successful = true;
          resolve(returnValue);
        }

        if (res.status !== 200) {
          returnValue.successful = res.status;
          returnValue.successful = (res as any)._body;
          try {
            const validationResult = res.json() as ValidationResult;
            if (validationResult) {
              // (returnValue as PostObjectResponseModel<T>).ValidatonResult = validationResult;
            }
          } catch (ex) {

          }
          reject(returnValue);
        }

      });
      promise.catch(err => {
        const returnValue: PostObjectResponseModel<T> = new PostObjectResponseModel<T>();
        // returnValue.successful = err.status;
        // returnValue.successful = (err as any)._body;
        try {
          const validationResult = err.json() as ValidationResult;
          if (validationResult) {
            (returnValue as PostObjectResponseModel<T>).ValidatonResult = validationResult;
          }
        } catch (ex) {

        }
        reject(returnValue);
      });
    });
  }
}
