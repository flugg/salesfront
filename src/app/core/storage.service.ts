import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {
  storage: Storage;
  memory = [];

  constructor() {
    this.storage = this.resolveStorage();
  }

  get(key: string): string | null {
    if (this.storage) {
      return this.storage.getItem(key);
    }

    return this.memory[key];
  }

  set(key: string, value: string): void {
    if (this.storage) {
      this.storage.setItem(key, value);
    }

    this.memory[key] = value;
  }

  remove(key: string): void {
    if (this.storage) {
      this.storage.removeItem(key);
    }

    delete this.memory[key];
  }

  private resolveStorage() {
    try {
      localStorage.setItem('test', '');
      localStorage.removeItem('test');

      return localStorage;
    } catch (error) {
      return null;
    }
  }
}
