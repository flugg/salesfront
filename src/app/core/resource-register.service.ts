import { Component, Injectable } from '@angular/core';

@Injectable()
export class ResourceRegisterService {

  /**
   * Map of components to resource listeners
   */
  map: Map<Component, any>;

  constructor() { }

}
