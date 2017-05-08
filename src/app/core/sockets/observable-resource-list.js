"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var ReplaySubject_1 = require("rxjs/ReplaySubject");
var ObservableResourceList = (function () {
    function ObservableResourceList() {
        /**
         * A snapshot of the list of resources.
         */
        this.snapshot = [];
        /**
         * The resource list subject.
         */
        this.subject = new ReplaySubject_1.ReplaySubject(1);
        /**
         * The number of resources to fetch when paginating.
         */
        this.limit = 15;
        /**
         * The cursor for the paginated resources.
         */
        this.paginator = new BehaviorSubject_1.BehaviorSubject(this.limit);
    }
    /**
     * Destroys the service.
     */
    ObservableResourceList.prototype.ngOnDestroy = function () {
        this.subject.unsubscribe();
    };
    /**
     * Loads more resources.
     */
    ObservableResourceList.prototype.paginate = function () {
        this.paginator.next(this.limit);
    };
    /**
     * Indicates if all resources have been loaded.
     */
    ObservableResourceList.prototype.isComplete = function () {
        return this.paginator.isStopped;
    };
    /**
     * Sets the observable list of resources to the current snapshot.
     */
    ObservableResourceList.prototype.updateFromSnapshot = function () {
        if (!this.subject.isStopped) {
            this.subject.next(this.snapshot);
        }
    };
    /**
     * Parses a pagination observable response.
     */
    ObservableResourceList.prototype.pagination = function (pagination) {
        var _this = this;
        return pagination.do(function (response) {
            _this.setCursor(response.cursor.next);
        }).map(function (response) { return response.data; });
    };
    /**
     * Adds a paginated data set to the observable list.
     */
    ObservableResourceList.prototype.add = function (resources) {
        (_a = this.snapshot).push.apply(_a, resources);
        this.updateFromSnapshot();
        var _a;
    };
    /**
     * Sets the current cursor id.
     */
    ObservableResourceList.prototype.setCursor = function (cursor) {
        this.cursor = cursor;
        if (cursor == null) {
            this.paginator.complete();
        }
    };
    return ObservableResourceList;
}());
exports.ObservableResourceList = ObservableResourceList;
