(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared_service_route_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./shared/service/route.service */ "./src/app/shared/service/route.service.ts");
/* harmony import */ var _database_database_route__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./database/database.route */ "./src/app/database/database.route.ts");
/* harmony import */ var _skill_simulator_skill_simulator_route__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./skill-simulator/skill-simulator.route */ "./src/app/skill-simulator/skill-simulator.route.ts");
/* harmony import */ var _home_home_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./home/home.module */ "./src/app/home/home.module.ts");
/* harmony import */ var _database_database_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./database/database.module */ "./src/app/database/database.module.ts");
/* harmony import */ var _skill_simulator_skill_simulator_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./skill-simulator/skill-simulator.module */ "./src/app/skill-simulator/skill-simulator.module.ts");
/* harmony import */ var _home_welcome_welcome_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./home/welcome/welcome.component */ "./src/app/home/welcome/welcome.component.ts");
/* harmony import */ var _home_patreon_patreon_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./home/patreon/patreon.component */ "./src/app/home/patreon/patreon.component.ts");











var ROUTES_APP = [
    {
        path: 'database',
        children: _database_database_route__WEBPACK_IMPORTED_MODULE_4__["ROUTES_DATABASE"],
    },
    {
        path: 'home',
        canActivate: [_shared_service_route_service__WEBPACK_IMPORTED_MODULE_3__["RouteService"]],
        canDeactivate: [_shared_service_route_service__WEBPACK_IMPORTED_MODULE_3__["RouteService"]],
        component: _home_welcome_welcome_component__WEBPACK_IMPORTED_MODULE_9__["WelcomeComponent"],
    },
    {
        path: 'patreon',
        canActivate: [_shared_service_route_service__WEBPACK_IMPORTED_MODULE_3__["RouteService"]],
        canDeactivate: [_shared_service_route_service__WEBPACK_IMPORTED_MODULE_3__["RouteService"]],
        component: _home_patreon_patreon_component__WEBPACK_IMPORTED_MODULE_10__["PatreonComponent"],
    },
    {
        path: 'simulator',
        children: _skill_simulator_skill_simulator_route__WEBPACK_IMPORTED_MODULE_5__["ROUTES_SKILL_SIMULATOR"],
    },
    {
        path: '**',
        redirectTo: 'home',
    },
];
var ROUTES_REGION = [
    {
        path: '',
        redirectTo: '/itos/home',
        pathMatch: 'full'
    },
    {
        path: 'itos',
        canActivate: [_shared_service_route_service__WEBPACK_IMPORTED_MODULE_3__["RouteService"]],
        canDeactivate: [_shared_service_route_service__WEBPACK_IMPORTED_MODULE_3__["RouteService"]],
        children: ROUTES_APP,
    },
    {
        path: 'jtos',
        canActivate: [_shared_service_route_service__WEBPACK_IMPORTED_MODULE_3__["RouteService"]],
        canDeactivate: [_shared_service_route_service__WEBPACK_IMPORTED_MODULE_3__["RouteService"]],
        children: ROUTES_APP,
    },
    {
        path: 'ktest',
        children: ROUTES_APP,
        canActivate: [_shared_service_route_service__WEBPACK_IMPORTED_MODULE_3__["RouteService"]],
        canDeactivate: [_shared_service_route_service__WEBPACK_IMPORTED_MODULE_3__["RouteService"]],
    },
    {
        path: 'ktos',
        children: ROUTES_APP,
        canActivate: [_shared_service_route_service__WEBPACK_IMPORTED_MODULE_3__["RouteService"]],
        canDeactivate: [_shared_service_route_service__WEBPACK_IMPORTED_MODULE_3__["RouteService"]],
    },
    {
        path: 'twtos',
        children: ROUTES_APP,
        canActivate: [_shared_service_route_service__WEBPACK_IMPORTED_MODULE_3__["RouteService"]],
        canDeactivate: [_shared_service_route_service__WEBPACK_IMPORTED_MODULE_3__["RouteService"]],
    },
    {
        matcher: _shared_service_route_service__WEBPACK_IMPORTED_MODULE_3__["RouteService"].UrlMatcher,
        redirectTo: '/itos/:redirect',
        pathMatch: 'full'
    }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _database_database_module__WEBPACK_IMPORTED_MODULE_7__["DatabaseModule"],
                _home_home_module__WEBPACK_IMPORTED_MODULE_6__["HomeModule"],
                _skill_simulator_skill_simulator_module__WEBPACK_IMPORTED_MODULE_8__["SkillSimulatorModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(ROUTES_REGION, {
                    anchorScrolling: 'enabled',
                    //enableTracing: true,
                    onSameUrlNavigation: 'ignore',
                    scrollPositionRestoration: 'disabled' // Note: as of angular 6.1, when 'enabled', we can't disable it for specific routes (e.g. the simulator)
                })
            ],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<tos-loading></tos-loading>\n<tos-shell>\n  <router-outlet></router-outlet>\n</tos-shell>\n"

/***/ }),

/***/ "./src/app/app.component.scss":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");



var AppComponent = /** @class */ (function () {
    function AppComponent(ngbTooltipConfig) {
        this.ngbTooltipConfig = ngbTooltipConfig;
        this.ngbTooltipConfig.disableTooltip = !!('ontouchstart' in window || navigator.msMaxTouchPoints);
    }
    AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_2__["NgbTooltipConfig"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @fortawesome/angular-fontawesome */ "./node_modules/@fortawesome/angular-fontawesome/fesm5/angular-fontawesome.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var _shell_shell_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./shell/shell.module */ "./src/app/shell/shell.module.ts");
/* harmony import */ var _shell_loading_loading_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./shell/loading/loading.component */ "./src/app/shell/loading/loading.component.ts");











var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"],
                _shell_loading_loading_component__WEBPACK_IMPORTED_MODULE_10__["LoadingComponent"],
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["BrowserModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClientModule"],
                _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_4__["FontAwesomeModule"],
                _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__["NgbModule"],
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_8__["SharedModule"].forRoot(),
                _app_routing_module__WEBPACK_IMPORTED_MODULE_7__["AppRoutingModule"],
                _shell_shell_module__WEBPACK_IMPORTED_MODULE_9__["ShellModule"],
            ],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/database/database.module.ts":
/*!*********************************************!*\
  !*** ./src/app/database/database.module.ts ***!
  \*********************************************/
/*! exports provided: DatabaseModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DatabaseModule", function() { return DatabaseModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var _entity_filter_entity_list_filter_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./entity-filter/entity-list-filter.component */ "./src/app/database/entity-filter/entity-list-filter.component.ts");
/* harmony import */ var _entity_detail_entity_detail_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./entity-detail/entity-detail.component */ "./src/app/database/entity-detail/entity-detail.component.ts");
/* harmony import */ var _entity_list_entity_list_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./entity-list/entity-list.component */ "./src/app/database/entity-list/entity-list.component.ts");
/* harmony import */ var _resolvers_attribute_list_configuration_resolver__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./resolvers/attribute-list-configuration.resolver */ "./src/app/database/resolvers/attribute-list-configuration.resolver.ts");
/* harmony import */ var _resolvers_book_list_configuration_resolver__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./resolvers/book-list-configuration.resolver */ "./src/app/database/resolvers/book-list-configuration.resolver.ts");
/* harmony import */ var _resolvers_card_list_configuration_resolver__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./resolvers/card-list-configuration.resolver */ "./src/app/database/resolvers/card-list-configuration.resolver.ts");
/* harmony import */ var _resolvers_collection_list_configuration_resolver__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./resolvers/collection-list-configuration.resolver */ "./src/app/database/resolvers/collection-list-configuration.resolver.ts");
/* harmony import */ var _resolvers_cube_list_configuration_resolver__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./resolvers/cube-list-configuration.resolver */ "./src/app/database/resolvers/cube-list-configuration.resolver.ts");
/* harmony import */ var _resolvers_equipment_list_configuration_resolver_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./resolvers/equipment-list-configuration-resolver.service */ "./src/app/database/resolvers/equipment-list-configuration-resolver.service.ts");
/* harmony import */ var _resolvers_equipment_set_list_configuration_resolver__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./resolvers/equipment-set-list-configuration.resolver */ "./src/app/database/resolvers/equipment-set-list-configuration.resolver.ts");
/* harmony import */ var _resolvers_gem_list_configuration_resolver__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./resolvers/gem-list-configuration.resolver */ "./src/app/database/resolvers/gem-list-configuration.resolver.ts");
/* harmony import */ var _resolvers_item_list_configuration_resolver__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./resolvers/item-list-configuration.resolver */ "./src/app/database/resolvers/item-list-configuration.resolver.ts");
/* harmony import */ var _resolvers_job_list_configuration_resolver__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./resolvers/job-list-configuration.resolver */ "./src/app/database/resolvers/job-list-configuration.resolver.ts");
/* harmony import */ var _resolvers_monster_list_configuration_resolver__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./resolvers/monster-list-configuration.resolver */ "./src/app/database/resolvers/monster-list-configuration.resolver.ts");
/* harmony import */ var _resolvers_recipe_list_configuration_resolver__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./resolvers/recipe-list-configuration.resolver */ "./src/app/database/resolvers/recipe-list-configuration.resolver.ts");
/* harmony import */ var _resolvers_skill_list_configuration_resolver__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./resolvers/skill-list-configuration.resolver */ "./src/app/database/resolvers/skill-list-configuration.resolver.ts");
/* harmony import */ var _resolvers_map_list_configuration_resolver__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./resolvers/map-list-configuration.resolver */ "./src/app/database/resolvers/map-list-configuration.resolver.ts");
/* harmony import */ var _entity_detail_v2_entity_detail_map_entity_detail_map_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./entity-detail-v2/entity-detail-map/entity-detail-map.component */ "./src/app/database/entity-detail-v2/entity-detail-map/entity-detail-map.component.ts");





















var DatabaseModule = /** @class */ (function () {
    function DatabaseModule() {
    }
    DatabaseModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_2__["SharedModule"],
            ],
            declarations: [
                _entity_detail_entity_detail_component__WEBPACK_IMPORTED_MODULE_4__["EntityDetailComponent"],
                _entity_list_entity_list_component__WEBPACK_IMPORTED_MODULE_5__["EntityListComponent"],
                _entity_filter_entity_list_filter_component__WEBPACK_IMPORTED_MODULE_3__["EntityListFilterComponent"],
                _entity_detail_v2_entity_detail_map_entity_detail_map_component__WEBPACK_IMPORTED_MODULE_20__["EntityDetailMapComponent"],
            ],
            providers: [
                _resolvers_attribute_list_configuration_resolver__WEBPACK_IMPORTED_MODULE_6__["AttributeListConfigurationResolver"],
                _resolvers_book_list_configuration_resolver__WEBPACK_IMPORTED_MODULE_7__["BookListConfigurationResolver"],
                _resolvers_card_list_configuration_resolver__WEBPACK_IMPORTED_MODULE_8__["CardListConfigurationResolver"],
                _resolvers_collection_list_configuration_resolver__WEBPACK_IMPORTED_MODULE_9__["CollectionListConfigurationResolver"],
                _resolvers_cube_list_configuration_resolver__WEBPACK_IMPORTED_MODULE_10__["CubeListConfigurationResolver"],
                _resolvers_equipment_list_configuration_resolver_service__WEBPACK_IMPORTED_MODULE_11__["EquipmentListConfigurationResolver"],
                _resolvers_equipment_set_list_configuration_resolver__WEBPACK_IMPORTED_MODULE_12__["EquipmentSetListConfigurationResolver"],
                _resolvers_gem_list_configuration_resolver__WEBPACK_IMPORTED_MODULE_13__["GemListConfigurationResolver"],
                _resolvers_item_list_configuration_resolver__WEBPACK_IMPORTED_MODULE_14__["ItemListConfigurationResolver"],
                _resolvers_job_list_configuration_resolver__WEBPACK_IMPORTED_MODULE_15__["JobListConfigurationResolver"],
                _resolvers_map_list_configuration_resolver__WEBPACK_IMPORTED_MODULE_19__["MapListConfigurationResolver"],
                _resolvers_monster_list_configuration_resolver__WEBPACK_IMPORTED_MODULE_16__["MonsterListConfigurationResolver"],
                _resolvers_recipe_list_configuration_resolver__WEBPACK_IMPORTED_MODULE_17__["RecipeListConfigurationResolver"],
                _resolvers_skill_list_configuration_resolver__WEBPACK_IMPORTED_MODULE_18__["SkillListConfigurationResolver"],
            ]
        })
    ], DatabaseModule);
    return DatabaseModule;
}());



/***/ }),

/***/ "./src/app/database/database.route.ts":
/*!********************************************!*\
  !*** ./src/app/database/database.route.ts ***!
  \********************************************/
/*! exports provided: ROUTES_DATABASE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ROUTES_DATABASE", function() { return ROUTES_DATABASE; });
/* harmony import */ var _shared_domain_tos_item_tos_item_resolver__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/domain/tos/item/tos-item.resolver */ "./src/app/shared/domain/tos/item/tos-item.resolver.ts");
/* harmony import */ var _resolvers_item_list_configuration_resolver__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./resolvers/item-list-configuration.resolver */ "./src/app/database/resolvers/item-list-configuration.resolver.ts");
/* harmony import */ var _resolvers_equipment_list_configuration_resolver_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./resolvers/equipment-list-configuration-resolver.service */ "./src/app/database/resolvers/equipment-list-configuration-resolver.service.ts");
/* harmony import */ var _shared_domain_tos_item_equipment_tos_equipment_resolver__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/domain/tos/item/equipment/tos-equipment.resolver */ "./src/app/shared/domain/tos/item/equipment/tos-equipment.resolver.ts");
/* harmony import */ var _resolvers_book_list_configuration_resolver__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./resolvers/book-list-configuration.resolver */ "./src/app/database/resolvers/book-list-configuration.resolver.ts");
/* harmony import */ var _shared_domain_tos_item_book_tos_book_resolver__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/domain/tos/item/book/tos-book.resolver */ "./src/app/shared/domain/tos/item/book/tos-book.resolver.ts");
/* harmony import */ var _resolvers_collection_list_configuration_resolver__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./resolvers/collection-list-configuration.resolver */ "./src/app/database/resolvers/collection-list-configuration.resolver.ts");
/* harmony import */ var _shared_domain_tos_item_collection_tos_collection_resolver__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../shared/domain/tos/item/collection/tos-collection.resolver */ "./src/app/shared/domain/tos/item/collection/tos-collection.resolver.ts");
/* harmony import */ var _resolvers_monster_list_configuration_resolver__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./resolvers/monster-list-configuration.resolver */ "./src/app/database/resolvers/monster-list-configuration.resolver.ts");
/* harmony import */ var _shared_domain_tos_monster_tos_monster_resolver__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../shared/domain/tos/monster/tos-monster.resolver */ "./src/app/shared/domain/tos/monster/tos-monster.resolver.ts");
/* harmony import */ var _entity_detail_entity_detail_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./entity-detail/entity-detail.component */ "./src/app/database/entity-detail/entity-detail.component.ts");
/* harmony import */ var _entity_list_entity_list_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./entity-list/entity-list.component */ "./src/app/database/entity-list/entity-list.component.ts");
/* harmony import */ var _shared_domain_tos_item_recipe_tos_recipe_resolver__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../shared/domain/tos/item/recipe/tos-recipe.resolver */ "./src/app/shared/domain/tos/item/recipe/tos-recipe.resolver.ts");
/* harmony import */ var _resolvers_recipe_list_configuration_resolver__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./resolvers/recipe-list-configuration.resolver */ "./src/app/database/resolvers/recipe-list-configuration.resolver.ts");
/* harmony import */ var _resolvers_equipment_set_list_configuration_resolver__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./resolvers/equipment-set-list-configuration.resolver */ "./src/app/database/resolvers/equipment-set-list-configuration.resolver.ts");
/* harmony import */ var _resolvers_cube_list_configuration_resolver__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./resolvers/cube-list-configuration.resolver */ "./src/app/database/resolvers/cube-list-configuration.resolver.ts");
/* harmony import */ var _shared_domain_tos_item_cube_tos_cube_resolver__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../shared/domain/tos/item/cube/tos-cube.resolver */ "./src/app/shared/domain/tos/item/cube/tos-cube.resolver.ts");
/* harmony import */ var _shared_domain_tos_item_equipment_tos_equipment_set_resolver__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../shared/domain/tos/item/equipment/tos-equipment-set.resolver */ "./src/app/shared/domain/tos/item/equipment/tos-equipment-set.resolver.ts");
/* harmony import */ var _resolvers_card_list_configuration_resolver__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./resolvers/card-list-configuration.resolver */ "./src/app/database/resolvers/card-list-configuration.resolver.ts");
/* harmony import */ var _shared_domain_tos_item_card_tos_card_resolver__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../shared/domain/tos/item/card/tos-card.resolver */ "./src/app/shared/domain/tos/item/card/tos-card.resolver.ts");
/* harmony import */ var _resolvers_gem_list_configuration_resolver__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./resolvers/gem-list-configuration.resolver */ "./src/app/database/resolvers/gem-list-configuration.resolver.ts");
/* harmony import */ var _shared_domain_tos_item_gem_tos_gem_resolver__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../shared/domain/tos/item/gem/tos-gem.resolver */ "./src/app/shared/domain/tos/item/gem/tos-gem.resolver.ts");
/* harmony import */ var _shared_domain_tos_attribute_tos_attribute_resolver__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../shared/domain/tos/attribute/tos-attribute.resolver */ "./src/app/shared/domain/tos/attribute/tos-attribute.resolver.ts");
/* harmony import */ var _resolvers_attribute_list_configuration_resolver__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./resolvers/attribute-list-configuration.resolver */ "./src/app/database/resolvers/attribute-list-configuration.resolver.ts");
/* harmony import */ var _resolvers_skill_list_configuration_resolver__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./resolvers/skill-list-configuration.resolver */ "./src/app/database/resolvers/skill-list-configuration.resolver.ts");
/* harmony import */ var _shared_domain_tos_skill_tos_skill_resolver__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ../shared/domain/tos/skill/tos-skill.resolver */ "./src/app/shared/domain/tos/skill/tos-skill.resolver.ts");
/* harmony import */ var _resolvers_job_list_configuration_resolver__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./resolvers/job-list-configuration.resolver */ "./src/app/database/resolvers/job-list-configuration.resolver.ts");
/* harmony import */ var _shared_domain_tos_job_tos_job_resolver__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ../shared/domain/tos/job/tos-job.resolver */ "./src/app/shared/domain/tos/job/tos-job.resolver.ts");
/* harmony import */ var _shared_service_route_service__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ../shared/service/route.service */ "./src/app/shared/service/route.service.ts");
/* harmony import */ var _resolvers_map_list_configuration_resolver__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./resolvers/map-list-configuration.resolver */ "./src/app/database/resolvers/map-list-configuration.resolver.ts");
/* harmony import */ var _shared_domain_tos_map_tos_map_resolver__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ../shared/domain/tos/map/tos-map.resolver */ "./src/app/shared/domain/tos/map/tos-map.resolver.ts");
/* harmony import */ var _entity_detail_v2_entity_detail_map_entity_detail_map_component__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./entity-detail-v2/entity-detail-map/entity-detail-map.component */ "./src/app/database/entity-detail-v2/entity-detail-map/entity-detail-map.component.ts");
/* harmony import */ var _shared_domain_tos_monster_tos_npc_resolver__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ../shared/domain/tos/monster/tos-npc.resolver */ "./src/app/shared/domain/tos/monster/tos-npc.resolver.ts");

































var ROUTES_DATABASE = [
    {
        path: '',
        redirectTo: 'items',
        pathMatch: 'full'
    },
    {
        path: 'attributes',
        canActivate: [_shared_service_route_service__WEBPACK_IMPORTED_MODULE_28__["RouteService"]],
        canDeactivate: [_shared_service_route_service__WEBPACK_IMPORTED_MODULE_28__["RouteService"]],
        component: _entity_list_entity_list_component__WEBPACK_IMPORTED_MODULE_11__["EntityListComponent"],
        resolve: {
            configuration: _resolvers_attribute_list_configuration_resolver__WEBPACK_IMPORTED_MODULE_23__["AttributeListConfigurationResolver"],
            response: _shared_domain_tos_attribute_tos_attribute_resolver__WEBPACK_IMPORTED_MODULE_22__["TOSAttributeResolver"],
        },
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    },
    {
        path: 'attributes/:id',
        canActivate: [_shared_service_route_service__WEBPACK_IMPORTED_MODULE_28__["RouteService"]],
        canDeactivate: [_shared_service_route_service__WEBPACK_IMPORTED_MODULE_28__["RouteService"]],
        component: _entity_detail_entity_detail_component__WEBPACK_IMPORTED_MODULE_10__["EntityDetailComponent"],
        resolve: { response: _shared_domain_tos_attribute_tos_attribute_resolver__WEBPACK_IMPORTED_MODULE_22__["TOSAttributeResolver"] },
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    },
    {
        path: 'books',
        canActivate: [_shared_service_route_service__WEBPACK_IMPORTED_MODULE_28__["RouteService"]],
        canDeactivate: [_shared_service_route_service__WEBPACK_IMPORTED_MODULE_28__["RouteService"]],
        component: _entity_list_entity_list_component__WEBPACK_IMPORTED_MODULE_11__["EntityListComponent"],
        resolve: {
            configuration: _resolvers_book_list_configuration_resolver__WEBPACK_IMPORTED_MODULE_4__["BookListConfigurationResolver"],
            response: _shared_domain_tos_item_book_tos_book_resolver__WEBPACK_IMPORTED_MODULE_5__["TOSBookResolver"],
        },
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    },
    {
        path: 'books/:id',
        canActivate: [_shared_service_route_service__WEBPACK_IMPORTED_MODULE_28__["RouteService"]],
        canDeactivate: [_shared_service_route_service__WEBPACK_IMPORTED_MODULE_28__["RouteService"]],
        component: _entity_detail_entity_detail_component__WEBPACK_IMPORTED_MODULE_10__["EntityDetailComponent"],
        resolve: { response: _shared_domain_tos_item_book_tos_book_resolver__WEBPACK_IMPORTED_MODULE_5__["TOSBookResolver"] },
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    },
    {
        path: 'cards',
        canActivate: [_shared_service_route_service__WEBPACK_IMPORTED_MODULE_28__["RouteService"]],
        canDeactivate: [_shared_service_route_service__WEBPACK_IMPORTED_MODULE_28__["RouteService"]],
        component: _entity_list_entity_list_component__WEBPACK_IMPORTED_MODULE_11__["EntityListComponent"],
        resolve: {
            configuration: _resolvers_card_list_configuration_resolver__WEBPACK_IMPORTED_MODULE_18__["CardListConfigurationResolver"],
            response: _shared_domain_tos_item_card_tos_card_resolver__WEBPACK_IMPORTED_MODULE_19__["TOSCardResolver"],
        },
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    },
    {
        path: 'cards/:id',
        canActivate: [_shared_service_route_service__WEBPACK_IMPORTED_MODULE_28__["RouteService"]],
        canDeactivate: [_shared_service_route_service__WEBPACK_IMPORTED_MODULE_28__["RouteService"]],
        component: _entity_detail_entity_detail_component__WEBPACK_IMPORTED_MODULE_10__["EntityDetailComponent"],
        resolve: { response: _shared_domain_tos_item_card_tos_card_resolver__WEBPACK_IMPORTED_MODULE_19__["TOSCardResolver"] },
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    },
    {
        path: 'classes',
        canActivate: [_shared_service_route_service__WEBPACK_IMPORTED_MODULE_28__["RouteService"]],
        canDeactivate: [_shared_service_route_service__WEBPACK_IMPORTED_MODULE_28__["RouteService"]],
        component: _entity_list_entity_list_component__WEBPACK_IMPORTED_MODULE_11__["EntityListComponent"],
        resolve: {
            configuration: _resolvers_job_list_configuration_resolver__WEBPACK_IMPORTED_MODULE_26__["JobListConfigurationResolver"],
            response: _shared_domain_tos_job_tos_job_resolver__WEBPACK_IMPORTED_MODULE_27__["TOSJobResolver"],
        },
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    },
    {
        path: 'classes/:id',
        canActivate: [_shared_service_route_service__WEBPACK_IMPORTED_MODULE_28__["RouteService"]],
        canDeactivate: [_shared_service_route_service__WEBPACK_IMPORTED_MODULE_28__["RouteService"]],
        component: _entity_detail_entity_detail_component__WEBPACK_IMPORTED_MODULE_10__["EntityDetailComponent"],
        resolve: { response: _shared_domain_tos_job_tos_job_resolver__WEBPACK_IMPORTED_MODULE_27__["TOSJobResolver"] },
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    },
    {
        path: 'collections',
        canActivate: [_shared_service_route_service__WEBPACK_IMPORTED_MODULE_28__["RouteService"]],
        canDeactivate: [_shared_service_route_service__WEBPACK_IMPORTED_MODULE_28__["RouteService"]],
        component: _entity_list_entity_list_component__WEBPACK_IMPORTED_MODULE_11__["EntityListComponent"],
        resolve: {
            configuration: _resolvers_collection_list_configuration_resolver__WEBPACK_IMPORTED_MODULE_6__["CollectionListConfigurationResolver"],
            response: _shared_domain_tos_item_collection_tos_collection_resolver__WEBPACK_IMPORTED_MODULE_7__["TOSCollectionResolver"],
        },
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    },
    {
        path: 'collections/:id',
        canActivate: [_shared_service_route_service__WEBPACK_IMPORTED_MODULE_28__["RouteService"]],
        canDeactivate: [_shared_service_route_service__WEBPACK_IMPORTED_MODULE_28__["RouteService"]],
        component: _entity_detail_entity_detail_component__WEBPACK_IMPORTED_MODULE_10__["EntityDetailComponent"],
        resolve: { response: _shared_domain_tos_item_collection_tos_collection_resolver__WEBPACK_IMPORTED_MODULE_7__["TOSCollectionResolver"] },
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    },
    {
        path: 'cubes',
        canActivate: [_shared_service_route_service__WEBPACK_IMPORTED_MODULE_28__["RouteService"]],
        canDeactivate: [_shared_service_route_service__WEBPACK_IMPORTED_MODULE_28__["RouteService"]],
        component: _entity_list_entity_list_component__WEBPACK_IMPORTED_MODULE_11__["EntityListComponent"],
        resolve: {
            configuration: _resolvers_cube_list_configuration_resolver__WEBPACK_IMPORTED_MODULE_15__["CubeListConfigurationResolver"],
            response: _shared_domain_tos_item_cube_tos_cube_resolver__WEBPACK_IMPORTED_MODULE_16__["TOSCubeResolver"],
        },
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    },
    {
        path: 'cubes/:id',
        canActivate: [_shared_service_route_service__WEBPACK_IMPORTED_MODULE_28__["RouteService"]],
        canDeactivate: [_shared_service_route_service__WEBPACK_IMPORTED_MODULE_28__["RouteService"]],
        component: _entity_detail_entity_detail_component__WEBPACK_IMPORTED_MODULE_10__["EntityDetailComponent"],
        resolve: { response: _shared_domain_tos_item_cube_tos_cube_resolver__WEBPACK_IMPORTED_MODULE_16__["TOSCubeResolver"] },
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    },
    {
        path: 'equipment',
        canActivate: [_shared_service_route_service__WEBPACK_IMPORTED_MODULE_28__["RouteService"]],
        canDeactivate: [_shared_service_route_service__WEBPACK_IMPORTED_MODULE_28__["RouteService"]],
        component: _entity_list_entity_list_component__WEBPACK_IMPORTED_MODULE_11__["EntityListComponent"],
        resolve: {
            configuration: _resolvers_equipment_list_configuration_resolver_service__WEBPACK_IMPORTED_MODULE_2__["EquipmentListConfigurationResolver"],
            response: _shared_domain_tos_item_equipment_tos_equipment_resolver__WEBPACK_IMPORTED_MODULE_3__["TOSEquipmentResolver"],
        },
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    },
    {
        path: 'equipment/:id',
        canActivate: [_shared_service_route_service__WEBPACK_IMPORTED_MODULE_28__["RouteService"]],
        canDeactivate: [_shared_service_route_service__WEBPACK_IMPORTED_MODULE_28__["RouteService"]],
        component: _entity_detail_entity_detail_component__WEBPACK_IMPORTED_MODULE_10__["EntityDetailComponent"],
        resolve: { response: _shared_domain_tos_item_equipment_tos_equipment_resolver__WEBPACK_IMPORTED_MODULE_3__["TOSEquipmentResolver"] },
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    },
    {
        path: 'equipment-sets',
        canActivate: [_shared_service_route_service__WEBPACK_IMPORTED_MODULE_28__["RouteService"]],
        canDeactivate: [_shared_service_route_service__WEBPACK_IMPORTED_MODULE_28__["RouteService"]],
        component: _entity_list_entity_list_component__WEBPACK_IMPORTED_MODULE_11__["EntityListComponent"],
        resolve: {
            configuration: _resolvers_equipment_set_list_configuration_resolver__WEBPACK_IMPORTED_MODULE_14__["EquipmentSetListConfigurationResolver"],
            response: _shared_domain_tos_item_equipment_tos_equipment_set_resolver__WEBPACK_IMPORTED_MODULE_17__["TOSEquipmentSetResolver"],
        },
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    },
    {
        path: 'equipment-sets/:id',
        canActivate: [_shared_service_route_service__WEBPACK_IMPORTED_MODULE_28__["RouteService"]],
        canDeactivate: [_shared_service_route_service__WEBPACK_IMPORTED_MODULE_28__["RouteService"]],
        component: _entity_detail_entity_detail_component__WEBPACK_IMPORTED_MODULE_10__["EntityDetailComponent"],
        resolve: { response: _shared_domain_tos_item_equipment_tos_equipment_set_resolver__WEBPACK_IMPORTED_MODULE_17__["TOSEquipmentSetResolver"] },
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    },
    {
        path: 'gems',
        canActivate: [_shared_service_route_service__WEBPACK_IMPORTED_MODULE_28__["RouteService"]],
        canDeactivate: [_shared_service_route_service__WEBPACK_IMPORTED_MODULE_28__["RouteService"]],
        component: _entity_list_entity_list_component__WEBPACK_IMPORTED_MODULE_11__["EntityListComponent"],
        resolve: {
            configuration: _resolvers_gem_list_configuration_resolver__WEBPACK_IMPORTED_MODULE_20__["GemListConfigurationResolver"],
            response: _shared_domain_tos_item_gem_tos_gem_resolver__WEBPACK_IMPORTED_MODULE_21__["TOSGemResolver"],
        },
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    },
    {
        path: 'gems/:id',
        canActivate: [_shared_service_route_service__WEBPACK_IMPORTED_MODULE_28__["RouteService"]],
        canDeactivate: [_shared_service_route_service__WEBPACK_IMPORTED_MODULE_28__["RouteService"]],
        component: _entity_detail_entity_detail_component__WEBPACK_IMPORTED_MODULE_10__["EntityDetailComponent"],
        resolve: { response: _shared_domain_tos_item_gem_tos_gem_resolver__WEBPACK_IMPORTED_MODULE_21__["TOSGemResolver"] },
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    },
    {
        path: 'items',
        canActivate: [_shared_service_route_service__WEBPACK_IMPORTED_MODULE_28__["RouteService"]],
        canDeactivate: [_shared_service_route_service__WEBPACK_IMPORTED_MODULE_28__["RouteService"]],
        component: _entity_list_entity_list_component__WEBPACK_IMPORTED_MODULE_11__["EntityListComponent"],
        resolve: {
            configuration: _resolvers_item_list_configuration_resolver__WEBPACK_IMPORTED_MODULE_1__["ItemListConfigurationResolver"],
            response: _shared_domain_tos_item_tos_item_resolver__WEBPACK_IMPORTED_MODULE_0__["TOSItemResolver"],
        },
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    },
    {
        path: 'items/:id',
        canActivate: [_shared_service_route_service__WEBPACK_IMPORTED_MODULE_28__["RouteService"]],
        canDeactivate: [_shared_service_route_service__WEBPACK_IMPORTED_MODULE_28__["RouteService"]],
        component: _entity_detail_entity_detail_component__WEBPACK_IMPORTED_MODULE_10__["EntityDetailComponent"],
        resolve: { response: _shared_domain_tos_item_tos_item_resolver__WEBPACK_IMPORTED_MODULE_0__["TOSItemResolver"] },
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    },
    {
        path: 'maps',
        canActivate: [_shared_service_route_service__WEBPACK_IMPORTED_MODULE_28__["RouteService"]],
        canDeactivate: [_shared_service_route_service__WEBPACK_IMPORTED_MODULE_28__["RouteService"]],
        component: _entity_list_entity_list_component__WEBPACK_IMPORTED_MODULE_11__["EntityListComponent"],
        resolve: {
            configuration: _resolvers_map_list_configuration_resolver__WEBPACK_IMPORTED_MODULE_29__["MapListConfigurationResolver"],
            response: _shared_domain_tos_map_tos_map_resolver__WEBPACK_IMPORTED_MODULE_30__["TOSMapResolver"],
        },
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    },
    {
        path: 'maps/:id',
        canActivate: [_shared_service_route_service__WEBPACK_IMPORTED_MODULE_28__["RouteService"]],
        canDeactivate: [_shared_service_route_service__WEBPACK_IMPORTED_MODULE_28__["RouteService"]],
        component: _entity_detail_v2_entity_detail_map_entity_detail_map_component__WEBPACK_IMPORTED_MODULE_31__["EntityDetailMapComponent"],
        resolve: { response: _shared_domain_tos_map_tos_map_resolver__WEBPACK_IMPORTED_MODULE_30__["TOSMapResolver"] },
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    },
    {
        path: 'monsters',
        canActivate: [_shared_service_route_service__WEBPACK_IMPORTED_MODULE_28__["RouteService"]],
        canDeactivate: [_shared_service_route_service__WEBPACK_IMPORTED_MODULE_28__["RouteService"]],
        component: _entity_list_entity_list_component__WEBPACK_IMPORTED_MODULE_11__["EntityListComponent"],
        resolve: {
            configuration: _resolvers_monster_list_configuration_resolver__WEBPACK_IMPORTED_MODULE_8__["MonsterListConfigurationResolver"],
            response: _shared_domain_tos_monster_tos_monster_resolver__WEBPACK_IMPORTED_MODULE_9__["TOSMonsterResolver"],
        },
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    },
    {
        path: 'monsters/:id',
        canActivate: [_shared_service_route_service__WEBPACK_IMPORTED_MODULE_28__["RouteService"]],
        canDeactivate: [_shared_service_route_service__WEBPACK_IMPORTED_MODULE_28__["RouteService"]],
        component: _entity_detail_entity_detail_component__WEBPACK_IMPORTED_MODULE_10__["EntityDetailComponent"],
        resolve: { response: _shared_domain_tos_monster_tos_monster_resolver__WEBPACK_IMPORTED_MODULE_9__["TOSMonsterResolver"] },
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    },
    /*
    {
      path: 'npcs',
      canActivate: [RouteService],
      canDeactivate: [RouteService],
      component: EntityListComponent,
      resolve: {
        configuration: NPCListConfigurationResolver,
        response: TOSNPCResolver,
      },
      runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    },
    */
    {
        path: 'npcs/:id',
        canActivate: [_shared_service_route_service__WEBPACK_IMPORTED_MODULE_28__["RouteService"]],
        canDeactivate: [_shared_service_route_service__WEBPACK_IMPORTED_MODULE_28__["RouteService"]],
        component: _entity_detail_entity_detail_component__WEBPACK_IMPORTED_MODULE_10__["EntityDetailComponent"],
        resolve: { response: _shared_domain_tos_monster_tos_npc_resolver__WEBPACK_IMPORTED_MODULE_32__["TOSNPCResolver"] },
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    },
    {
        path: 'recipes',
        canActivate: [_shared_service_route_service__WEBPACK_IMPORTED_MODULE_28__["RouteService"]],
        canDeactivate: [_shared_service_route_service__WEBPACK_IMPORTED_MODULE_28__["RouteService"]],
        component: _entity_list_entity_list_component__WEBPACK_IMPORTED_MODULE_11__["EntityListComponent"],
        resolve: {
            configuration: _resolvers_recipe_list_configuration_resolver__WEBPACK_IMPORTED_MODULE_13__["RecipeListConfigurationResolver"],
            response: _shared_domain_tos_item_recipe_tos_recipe_resolver__WEBPACK_IMPORTED_MODULE_12__["TOSRecipeResolver"],
        },
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    },
    {
        path: 'recipes/:id',
        canActivate: [_shared_service_route_service__WEBPACK_IMPORTED_MODULE_28__["RouteService"]],
        canDeactivate: [_shared_service_route_service__WEBPACK_IMPORTED_MODULE_28__["RouteService"]],
        component: _entity_detail_entity_detail_component__WEBPACK_IMPORTED_MODULE_10__["EntityDetailComponent"],
        resolve: { response: _shared_domain_tos_item_recipe_tos_recipe_resolver__WEBPACK_IMPORTED_MODULE_12__["TOSRecipeResolver"] },
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    },
    {
        path: 'skills',
        canActivate: [_shared_service_route_service__WEBPACK_IMPORTED_MODULE_28__["RouteService"]],
        canDeactivate: [_shared_service_route_service__WEBPACK_IMPORTED_MODULE_28__["RouteService"]],
        component: _entity_list_entity_list_component__WEBPACK_IMPORTED_MODULE_11__["EntityListComponent"],
        resolve: {
            configuration: _resolvers_skill_list_configuration_resolver__WEBPACK_IMPORTED_MODULE_24__["SkillListConfigurationResolver"],
            response: _shared_domain_tos_skill_tos_skill_resolver__WEBPACK_IMPORTED_MODULE_25__["TOSSkillResolver"],
        },
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    },
    {
        path: 'skills/:id',
        canActivate: [_shared_service_route_service__WEBPACK_IMPORTED_MODULE_28__["RouteService"]],
        canDeactivate: [_shared_service_route_service__WEBPACK_IMPORTED_MODULE_28__["RouteService"]],
        component: _entity_detail_entity_detail_component__WEBPACK_IMPORTED_MODULE_10__["EntityDetailComponent"],
        resolve: { response: _shared_domain_tos_skill_tos_skill_resolver__WEBPACK_IMPORTED_MODULE_25__["TOSSkillResolver"] },
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    },
];


/***/ }),

/***/ "./src/app/database/entity-detail-v2/entity-detail-map/entity-detail-map.component.html":
/*!**********************************************************************************************!*\
  !*** ./src/app/database/entity-detail-v2/entity-detail-map/entity-detail-map.component.html ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n\n  <!-- Header -->\n  <tos-entity-detail-Header class=\"h4 mb-3\" [entity]=\"map\" [idName]=\"true\"></tos-entity-detail-Header>\n\n  <!-- Map Viewer -->\n  <div class=\"card bg-light mb-4\">\n    <div class=\"card-body\">\n      <div class=\"position-relative\" style=\"overflow: hidden\" cssMaxHeight=\"calc(100% - 80px - 60px - 9rem)\">\n        <!-- Filter -->\n        <div class=\"d-flex flex-column position-absolute ml-1 mt-1\" style=\"left: 0; z-index: 1\">\n          <button class=\"btn btn-primary rounded-circle\" (click)=\"filter = true\"><fa-icon [icon]=\"faFilter\"></fa-icon></button>\n        </div>\n\n        <!-- Filter Overlay -->\n        <div class=\"d-flex flex-column bg-light h-100 position-absolute pr-sm-3 shadow\" style=\"max-width: 100%; width: 400px; z-index: 2; transition: all ease-in-out 0.2s\"\n             [ngStyle]=\"{ 'left': filter ? '0' : '-420px', 'opacity': filter ? '1' : '0' }\">\n          <div class=\"d-flex align-items-center ml-1 mt-1\">\n            <button class=\"btn btn-primary rounded-circle\" (click)=\"filter = false\"><fa-icon [icon]=\"faTimes\"></fa-icon></button>\n            <h5 class=\"mb-0 ml-3\">Filter</h5>\n          </div>\n\n          <div class=\"d-flex flex-column flex-grow-1\">\n            <h5 *ngIf=\"spawnsMonsters?.length\" class=\"bg-primary mb-2 mt-3 pl-3 pr-3 pt-1 pb-1 rounded text-white w-100\">Monsters</h5>\n            <tos-entity-table *ngIf=\"spawnsMonsters?.length\" class=\"flex-grow-1\" style=\"flex-basis: 0\"\n                              [columns]=\"COLUMNS_MAPS_NPCS\"\n                              [data]=\"spawnsMonsters\"\n                              [header]=\"false\"\n                              [hideMobile]=\"true\"\n                              [hideTablet]=\"true\"\n                              [selected]=\"true\"\n            ></tos-entity-table>\n\n            <h5 *ngIf=\"spawnsNPCs?.length\" class=\"bg-primary mb-2 mt-3 pl-3 pr-3 pt-1 pb-1 rounded text-white w-100\">NPCs</h5>\n            <tos-entity-table *ngIf=\"spawnsNPCs?.length\" class=\"flex-grow-1\" style=\"flex-basis: 0\"\n                              [columns]=\"COLUMNS_MAPS_NPCS\"\n                              [data]=\"spawnsNPCs\"\n                              [header]=\"false\"\n                              [hideMobile]=\"true\"\n                              [hideTablet]=\"true\"\n                              [selected]=\"true\"\n            ></tos-entity-table>\n\n            <h5 *ngIf=\"spawnsTreasures?.length\" class=\"bg-primary mb-2 mt-3 pl-3 pr-3 pt-1 pb-1 rounded text-white w-100\">Treasures</h5>\n            <tos-entity-table *ngIf=\"spawnsTreasures?.length\" class=\"flex-grow-1\" style=\"flex-basis: 0\"\n                              [columns]=\"COLUMNS_MAPS_NPCS\"\n                              [data]=\"spawnsTreasures\"\n                              [header]=\"false\"\n                              [hideMobile]=\"true\"\n                              [hideTablet]=\"true\"\n                              [selected]=\"true\"\n            ></tos-entity-table>\n          </div>\n\n        </div>\n\n        <!-- Map Level / Stars -->\n        <div class=\"position-absolute mt-1 text-center text-outline text-white w-100\" style=\"pointer-events: none; z-index: 1\">\n          <h5 class=\"mb-0\">Level {{ map.Level }}</h5>\n          <h5 class=\"text-warning\"><span *ngFor=\"let x of mapStars\">★</span></h5>\n        </div>\n\n        <!-- Zoom In/Out -->\n        <div class=\"d-flex flex-column position-absolute mr-1 mt-1\" style=\"right: 0; z-index: 1\">\n          <button class=\"btn btn-primary rounded-circle mb-2\" (click)=\"onMapScale(1)\"><fa-icon [icon]=\"faSearchPlus\"></fa-icon></button>\n          <button class=\"btn btn-primary rounded-circle\" (click)=\"onMapScale(-1)\"><fa-icon [icon]=\"faSearchMinus\"></fa-icon></button>\n        </div>\n\n        <!-- Map -->\n        <div class=\"map-container\" style=\"cursor: move; touch-action: none\" #mapElement\n             (pointerdown)=\"onMapMouseDown($event)\"\n             (mousewheel)=\"onMapMouseWheel($event)\">\n          <div class=\"map\">\n            <img [src]=\"map.Layout\" (load)=\"onMapLoad($event)\" />\n\n            <div *ngFor=\"let spawn of spawns\" class=\"map-icon-container\"\n                 [ngClass]=\"{ 'd-none': !spawn.Selected }\">\n              <img *ngFor=\"let position of spawn.Positions\" class=\"map-icon\"\n                   [src]=\"spawn.Icon\"\n                   [style.top]=\"position[1] + 'px'\"\n                   [style.left]=\"position[0] + 'px'\"\n                   [title]=\"spawn.Name\" />\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"row\">\n\n    <!-- Connected Maps -->\n    <tos-entity-detail-Table class=\"col-md-6 mb-4\"\n                             [columns]=\"COLUMNS_MAPS\"\n                             [data$]=\"map.Link_Maps\"\n                             [entity]=\"map\"\n                             [header]=\"'Connected Maps'\"\n    ></tos-entity-detail-Table>\n\n    <!-- Exploration Rewards -->\n    <tos-entity-detail-Table class=\"col-md-6 mb-4\"\n                             [columns]=\"COLUMNS_MAPS_ITEMS\"\n                             [data$]=\"map.Link_Items_Exploration\"\n                             [entity]=\"map\"\n                             [header]=\"'Exploration Rewards'\"\n    ></tos-entity-detail-Table>\n\n    <!-- Global Drops -->\n    <tos-entity-detail-Table class=\"col-md-6 mb-4\" *ngIf=\"map.Link_Items\"\n                             [columns]=\"COLUMNS_MAPS_ITEMS\"\n                             [data$]=\"map.Link_Items\"\n                             [entity]=\"map\"\n                             [header]=\"'Global Drops'\"\n    ></tos-entity-detail-Table>\n\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/database/entity-detail-v2/entity-detail-map/entity-detail-map.component.scss":
/*!**********************************************************************************************!*\
  !*** ./src/app/database/entity-detail-v2/entity-detail-map/entity-detail-map.component.scss ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".card button {\n  height: 40px;\n  width: 40px;\n}\n\n.map {\n  max-width: 100%;\n  overflow: hidden;\n  transform: rotate(45deg);\n}\n\n.map-container {\n  overflow: hidden;\n  transform-origin: 0 0;\n}\n\n.map-icon {\n  position: absolute;\n  height: 32px;\n  width: 32px;\n  margin-left: -16px;\n  margin-top: -16px;\n  transform: rotate(-45deg) scale(calc(1 / var(--scale)));\n}\n\n.map-icon-container {\n  position: absolute;\n  left: 0;\n  top: 0;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9mdW5naS9FL1Rvc1Byb2plY3QvVG9zR3VydUJhc2UvdG9zLWRhdGFiYXNlL3Rvcy13ZWIvc3JjL2FwcC9kYXRhYmFzZS9lbnRpdHktZGV0YWlsLXYyL2VudGl0eS1kZXRhaWwtbWFwL2VudGl0eS1kZXRhaWwtbWFwLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9kYXRhYmFzZS9lbnRpdHktZGV0YWlsLXYyL2VudGl0eS1kZXRhaWwtbWFwL2VudGl0eS1kZXRhaWwtbWFwLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBO0VBQ0UsYUFBQTtFQUNBLFlBQUE7Q0NERDs7QURJRDtFQUNFLGdCQUFBO0VBQ0EsaUJBQUE7RUFDQSx5QkFBQTtDQ0REOztBREdEO0VBQ0UsaUJBQUE7RUFDQSxzQkFBQTtDQ0FEOztBREVEO0VBQ0UsbUJBQUE7RUFDQSxhQWxCYztFQW1CZCxZQW5CYztFQW9CZCxtQkFBQTtFQUNBLGtCQUFBO0VBQ0Esd0RBQUE7Q0NDRDs7QURDRDtFQUNFLG1CQUFBO0VBQ0EsUUFBQTtFQUNBLE9BQUE7Q0NFRCIsImZpbGUiOiJzcmMvYXBwL2RhdGFiYXNlL2VudGl0eS1kZXRhaWwtdjIvZW50aXR5LWRldGFpbC1tYXAvZW50aXR5LWRldGFpbC1tYXAuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIkbWFwLWljb24tc2l6ZTogMzJweDtcblxuLmNhcmQgYnV0dG9uIHtcbiAgaGVpZ2h0OiA0MHB4O1xuICB3aWR0aDogNDBweDtcbn1cblxuLm1hcCB7XG4gIG1heC13aWR0aDogMTAwJTtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgdHJhbnNmb3JtOiByb3RhdGUoNDVkZWcpO1xufVxuLm1hcC1jb250YWluZXIge1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICB0cmFuc2Zvcm0tb3JpZ2luOiAwIDA7XG59XG4ubWFwLWljb24ge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGhlaWdodDogJG1hcC1pY29uLXNpemU7XG4gIHdpZHRoOiAkbWFwLWljb24tc2l6ZTtcbiAgbWFyZ2luLWxlZnQ6IC0kbWFwLWljb24tc2l6ZSAvIDI7XG4gIG1hcmdpbi10b3A6IC0kbWFwLWljb24tc2l6ZSAvIDI7XG4gIHRyYW5zZm9ybTogcm90YXRlKC00NWRlZykgc2NhbGUoY2FsYygxIC8gdmFyKC0tc2NhbGUpKSk7XG59XG4ubWFwLWljb24tY29udGFpbmVyIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBsZWZ0OiAwO1xuICB0b3A6IDA7XG59XG4iLCIuY2FyZCBidXR0b24ge1xuICBoZWlnaHQ6IDQwcHg7XG4gIHdpZHRoOiA0MHB4O1xufVxuXG4ubWFwIHtcbiAgbWF4LXdpZHRoOiAxMDAlO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICB0cmFuc2Zvcm06IHJvdGF0ZSg0NWRlZyk7XG59XG5cbi5tYXAtY29udGFpbmVyIHtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgdHJhbnNmb3JtLW9yaWdpbjogMCAwO1xufVxuXG4ubWFwLWljb24ge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGhlaWdodDogMzJweDtcbiAgd2lkdGg6IDMycHg7XG4gIG1hcmdpbi1sZWZ0OiAtMTZweDtcbiAgbWFyZ2luLXRvcDogLTE2cHg7XG4gIHRyYW5zZm9ybTogcm90YXRlKC00NWRlZykgc2NhbGUoY2FsYygxIC8gdmFyKC0tc2NhbGUpKSk7XG59XG5cbi5tYXAtaWNvbi1jb250YWluZXIge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDA7XG4gIHRvcDogMDtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/database/entity-detail-v2/entity-detail-map/entity-detail-map.component.ts":
/*!********************************************************************************************!*\
  !*** ./src/app/database/entity-detail-v2/entity-detail-map/entity-detail-map.component.ts ***!
  \********************************************************************************************/
/*! exports provided: EntityDetailMapComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EntityDetailMapComponent", function() { return EntityDetailMapComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _entity_detail_entity_detail_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../entity-detail/entity-detail.component */ "./src/app/database/entity-detail/entity-detail.component.ts");
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "./node_modules/@fortawesome/free-solid-svg-icons/index.es.js");
/* harmony import */ var _shared_domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../shared/domain/tos/tos-domain */ "./src/app/shared/domain/tos/tos-domain.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");






var MAP_SCALE_MIN = 0.85;
var MAP_SCALE_MAX = 3;
var MAP_SCALE_SPEED = 0.25;
var EntityDetailMapComponent = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](EntityDetailMapComponent, _super);
    function EntityDetailMapComponent(changeDetector, route, router, zone) {
        var _this = _super.call(this, changeDetector, route, router) || this;
        _this.zone = zone;
        _this.faFilter = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__["faFilter"];
        _this.faStar = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__["faStar"];
        _this.faTimes = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__["faTimes"];
        _this.faSearchPlus = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__["faSearchPlus"];
        _this.faSearchMinus = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__["faSearchMinus"];
        _this.filter = false;
        _this.mapHeight = 0;
        _this.mapWidth = 0;
        _this.mapScale = MAP_SCALE_MIN;
        _this.mapX = 0;
        _this.mapY = 0;
        _this.onMapMouseMove = _this.onMapMouseMove.bind(_this);
        _this.onMapMouseUp = _this.onMapMouseUp.bind(_this);
        return _this;
    }
    Object.defineProperty(EntityDetailMapComponent.prototype, "mapStars", {
        get: function () {
            var stars = this.map && this.map.Stars || 0;
            var starsList = [];
            for (var i = 0; i < stars; i++)
                starsList.push(0);
            return starsList;
        },
        enumerable: true,
        configurable: true
    });
    ;
    EntityDetailMapComponent.prototype.onInit = function () {
        var _this = this;
        _super.prototype.onInit.call(this);
        this.spawns = null;
        this.spawnsMonsters = null;
        this.spawnsNPCs = null;
        this.spawnsTreasures = null;
        this.map.Link_NPCs && this.map.Link_NPCs.subscribe(function (value) {
            _this.spawns = value.filter(function (value) { return value.Link && value.Icon; });
            _this.spawnsMonsters = _this.spawns.filter(function (value) { return value.NPC && value.NPC.Type == _shared_domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_4__["TOSMonsterType"].MONSTER; });
            _this.spawnsNPCs = _this.spawns.filter(function (value) { return value.NPC && value.NPC.Type != _shared_domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_4__["TOSMonsterType"].MONSTER; });
            _this.spawnsTreasures = _this.spawns.filter(function (value) { return value.Item; });
            _this.changeDetector.markForCheck();
        });
    };
    EntityDetailMapComponent.prototype.onMapLoad = function (event) {
        var map = event.target;
        var mapContainer = this.mapElement.nativeElement.parentNode.getBoundingClientRect();
        this.mapElement.nativeElement.style.height = (this.mapHeight = map.height) + "px";
        this.mapElement.nativeElement.style.width = (this.mapWidth = map.width) + "px";
        this.mapX = -this.mapWidth * this.mapScale / 2 + mapContainer.width / 2;
        this.mapY = -this.mapHeight * this.mapScale / 2 + mapContainer.height / 2;
        this.update();
    };
    EntityDetailMapComponent.prototype.onMapMouseDown = function (event) {
        var _this = this;
        this.mouseX = event.clientX;
        this.mouseY = event.clientY;
        this.zone.runOutsideAngular(function () {
            document.addEventListener('pointermove', _this.onMapMouseMove);
            document.addEventListener('pointerup', _this.onMapMouseUp);
        });
        return false;
    };
    EntityDetailMapComponent.prototype.onMapMouseMove = function (event) {
        this.mapX += (event.clientX - this.mouseX);
        this.mapY += (event.clientY - this.mouseY);
        this.mouseX = event.clientX;
        this.mouseY = event.clientY;
        this.update();
        return false;
    };
    EntityDetailMapComponent.prototype.onMapMouseUp = function (event) {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            document.removeEventListener('pointermove', _this.onMapMouseMove);
            document.removeEventListener('pointerup', _this.onMapMouseUp);
        });
    };
    EntityDetailMapComponent.prototype.onMapMouseWheel = function (event) {
        this.onMapScale(event.deltaY > 0 ? -1 : 1, event);
        return false;
    };
    EntityDetailMapComponent.prototype.onMapScale = function (direction, event) {
        var mapContainer = this.mapElement.nativeElement.parentNode.getBoundingClientRect();
        var mapScale = this.mapScale;
        // Calculate new scale
        this.mapScale += direction * MAP_SCALE_SPEED;
        this.mapScale = Math.max(MAP_SCALE_MIN, Math.min(MAP_SCALE_MAX, this.mapScale));
        if (this.mapScale == mapScale)
            return;
        // Calculate scale origin
        // https://stackoverflow.com/a/46833254
        var zoomPointX = (event ? event.pageX : mapContainer.left + mapContainer.width / 2) - (mapContainer.left + window.pageXOffset);
        var zoomPointY = (event ? event.pageY : mapContainer.top + mapContainer.height / 2) - (mapContainer.top + window.pageYOffset);
        // Update map position so it scales towards the mouse
        var zoomTargetX = (zoomPointX - this.mapX) / mapScale;
        var zoomTargetY = (zoomPointY - this.mapY) / mapScale;
        this.mapX = -zoomTargetX * this.mapScale + zoomPointX;
        this.mapY = -zoomTargetY * this.mapScale + zoomPointY;
        this.update();
    };
    EntityDetailMapComponent.prototype.update = function () {
        var _this = this;
        var mapContainer = this.mapElement.nativeElement.parentNode.getBoundingClientRect();
        // Make sure the map stays inside the container
        if (this.mapX > 0)
            this.mapX = 0;
        if (this.mapX + this.mapWidth * this.mapScale < mapContainer.width)
            this.mapX = mapContainer.width - this.mapWidth * this.mapScale;
        if (this.mapY > 0)
            this.mapY = 0;
        if (this.mapY + this.mapHeight * this.mapScale < mapContainer.height)
            this.mapY = mapContainer.height - this.mapHeight * this.mapScale;
        window.requestAnimationFrame(function () {
            _this.mapElement.nativeElement.style.transform = "translate(" + _this.mapX + "px, " + _this.mapY + "px) scale(" + _this.mapScale + ")";
            _this.mapElement.nativeElement.style.setProperty('--scale', _this.mapScale);
        });
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('mapElement'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"])
    ], EntityDetailMapComponent.prototype, "mapElement", void 0);
    EntityDetailMapComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
            selector: 'tos-entity-detail-map',
            template: __webpack_require__(/*! ./entity-detail-map.component.html */ "./src/app/database/entity-detail-v2/entity-detail-map/entity-detail-map.component.html"),
            styles: [__webpack_require__(/*! ./entity-detail-map.component.scss */ "./src/app/database/entity-detail-v2/entity-detail-map/entity-detail-map.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"], _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"], _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]])
    ], EntityDetailMapComponent);
    return EntityDetailMapComponent;
}(_entity_detail_entity_detail_component__WEBPACK_IMPORTED_MODULE_2__["EntityDetailComponent"]));



/***/ }),

/***/ "./src/app/database/entity-detail/entity-detail.component.html":
/*!*********************************************************************!*\
  !*** ./src/app/database/entity-detail/entity-detail.component.html ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n\n  <div class=\"row\">\n    <!-- Name and Material/Type -->\n    <tos-entity-detail-Header class=\"col h4 mb-3\" [entity]=\"entity\" [idName]=\"true\"></tos-entity-detail-Header>\n  </div>\n\n  <div class=\"row mb-4\">\n\n    <div class=\"col-lg-6 mb-4 mt-5 pt-5\" *ngIf=\"card\">\n      <tos-entity-detail-Card [entity]=\"card\"></tos-entity-detail-Card>\n    </div>\n\n    <div class=\"col-lg-6 mb-4\" *ngIf=\"!card\">\n      <div class=\"card bg-light m-auto\"\n           [style.minWidth]=\"('calc(' + ICON_WIDTH + 'px + 2.5rem)') | sanitizeCSS\"\n           [style.maxWidth]=\"('calc(' + ICON_WIDTH + 'px + 2.5rem)') | sanitizeCSS\">\n        <div class=\"card-body\">\n          <!-- Icon, Grade and Class -->\n          <tos-entity-detail-ClassIconGrade *ngIf=\"!job\"\n                                            [entity]=\"entity\"\n                                            [labels]=\"true\"\n                                            [size]=\"equipment ? 'large' : 'small'\"></tos-entity-detail-ClassIconGrade>\n\n          <tos-entity-detail-JobIcon *ngIf=\"job\" class=\"m-auto\"\n                                     [circle]=\"job.CircleMax\"\n                                     [job]=\"job\"></tos-entity-detail-JobIcon>\n          <tos-entity-detail-JobAnimation [entity]=\"entity\"></tos-entity-detail-JobAnimation>\n\n          <!-- Description -->\n          <tos-entity-detail-Description *ngIf=\"attribute\"\n                                         [divider]=\"true\"\n                                         [entity]=\"entity\"></tos-entity-detail-Description>\n\n          <!-- Physical and Magical Attack / Defense -->\n          <tos-entity-detail-AttackDefense [anvilLevel]=\"anvilLevel\"\n                                           [transcendLevel]=\"transcendLevel\"\n                                           [entity]=\"entity\"></tos-entity-detail-AttackDefense>\n\n          <!-- Bonus Stats and Unidentified -->\n          <tos-entity-detail-BonusStatsUnidentified [divider]=\"true\"\n                                                    [entity]=\"entity\"></tos-entity-detail-BonusStatsUnidentified>\n\n          <!-- Potential, Durability and Sockets -->\n          <tos-entity-detail-DurabilityPotentialSockets [entity]=\"entity\"></tos-entity-detail-DurabilityPotentialSockets>\n\n          <!-- Book Pages -->\n          <tos-entity-detail-Book *ngIf=\"book?.Pages\"\n                                  [entity]=\"entity\"></tos-entity-detail-Book>\n\n          <!-- Gem -->\n          <tos-entity-detail-Gem *ngIf=\"gem\"\n                                 [entity]=\"gem\"\n                                 [header]=\"true\"></tos-entity-detail-Gem>\n\n          <!-- Recipe Materials -->\n          <tos-entity-detail-Table *ngIf=\"entity['Link_Materials']\" class=\"table-borderless\"\n                                   [columns]=\"COLUMNS_RECIPES_MATERIALS\"\n                                   [data$]=\"entity['Link_Materials']\"\n                                   [divider]=\"true\"\n                                   [entity]=\"entity\"\n                                   [header]=\"'Materials'\">\n          </tos-entity-detail-Table>\n\n          <!-- Skill -->\n          <tos-entity-detail-Skill [build]=\"build\"\n                                   [entity]=\"entity\"\n                                   [input]=\"true\"></tos-entity-detail-Skill>\n\n        </div>\n      </div>\n    </div>\n\n    <div class=\"col-lg-6\">\n\n      <!-- Recipe Source (Crafted by) -->\n      <tos-entity-detail-Table *ngIf=\"entity['Link_RecipeTarget']\" class=\"table-borderless\"\n                               [columns]=\"COLUMNS_RECIPES\"\n                               [data$]=\"entity['Link_RecipeTarget']\"\n                               [entity]=\"entity\"\n                               [header]=\"'Crafted by'\">\n      </tos-entity-detail-Table>\n\n      <!-- Description -->\n      <tos-entity-detail-Description *ngIf=\"!attribute && !skill\"\n                                     [divider]=\"entity['Link_RecipeTarget']\"\n                                     [entity]=\"entity\"\n                                     [header]=\"true\"></tos-entity-detail-Description>\n\n      <!-- Information (CoolDown/Level, LifeTime, Weight, Price, Tradability) -->\n      <tos-entity-detail-Information *ngIf=\"!skill\"\n                                     [entity]=\"entity\"\n                                     [divider]=\"!attribute && !skill && (entity['Description'] || entity['DescriptionHTML'])\"\n                                     [header]=\"true\"></tos-entity-detail-Information>\n\n      <!-- Set -->\n      <tos-entity-detail-Table *ngIf=\"equipment && equipment.Link_Set\" class=\"table-borderless\"\n                               [columns]=\"COLUMNS_SET\"\n                               [data$]=\"equipment.Link_Set\"\n                               [divider]=\"true\"\n                               [entity]=\"entity\"\n                               [header]=\"'Set'\"\n                               [themeInvert]=\"true\">\n      </tos-entity-detail-Table>\n      <tos-entity-detail-BonusStatsUnidentified *ngIf=\"equipment && equipment.Link_Set\"\n                                                [entity]=\"equipment.Link_Set | async\"></tos-entity-detail-BonusStatsUnidentified>\n\n      <!-- Stats -->\n      <tos-entity-detail-Stats *ngIf=\"card || monster\"\n                               [entity]=\"entity\"></tos-entity-detail-Stats>\n\n      <!-- Enhancement -->\n      <tos-entity-detail-Enhancement *ngIf=\"attribute || equipment && (equipment.IsAnvilAvailable || equipment.IsTranscendAvailable)\"\n                                     [header]=\"attribute ? 'Cost' : 'Enhancement'\"\n                                     [(anvilLevel)]=\"anvilLevel\"\n                                     [(transcendLevel)]=\"transcendLevel\"\n                                     [entity]=\"entity\"></tos-entity-detail-Enhancement>\n\n      <!-- Recipe Target (Produces) -->\n      <tos-entity-detail-Table *ngIf=\"entity['Link_Target']\" class=\"table-borderless\"\n                               [columns]=\"COLUMNS_ITEMS\"\n                               [data$]=\"entity['Link_Target']\"\n                               [divider]=\"true\"\n                               [entity]=\"entity\"\n                               [header]=\"'Produces'\">\n      </tos-entity-detail-Table>\n\n      <!-- Classes -->\n      <tos-entity-detail-Table *ngIf=\"entity['Link_Jobs'] || entity['Link_Job']\"\n                               [columns]=\"COLUMNS_JOBS\"\n                               [data$]=\"entity['Link_Jobs'] || entity['Link_Job']\"\n                               [entity]=\"entity\"\n                               [header]=\"entity['Link_Jobs'] ? 'Classes' : 'Class'\"\n      ></tos-entity-detail-Table>\n\n      <!-- Skill Formulas -->\n      <tos-entity-detail-SkillFormula [build]=\"build\"\n                                      [divider]=\"true\"\n                                      [entity]=\"entity\"></tos-entity-detail-SkillFormula>\n\n      <!-- Gem -->\n      <tos-entity-detail-Table *ngIf=\"entity['Link_Gem']\"\n                               [columns]=\"COLUMNS_GEMS\"\n                               [data$]=\"entity['Link_Gem']\"\n                               [divider]=\"true\"\n                               [entity]=\"entity\"\n                               [header]=\"'Gem'\"\n      ></tos-entity-detail-Table>\n\n      <!-- Skill -->\n      <tos-entity-detail-Table *ngIf=\"entity['Link_Skill']\"\n                               [columns]=\"COLUMNS_SKILLS\"\n                               [data$]=\"entity['Link_Skill']\"\n                               [divider]=\"true\"\n                               [entity]=\"entity\"\n                               [header]=\"'Skill'\"\n      ></tos-entity-detail-Table>\n    </div>\n\n  </div>\n\n  <div class=\"row\">\n    <!-- Attributes -->\n    <tos-entity-detail-Table *ngIf=\"entity['Link_Attributes']\" class=\"col-md-6 mb-4\"\n                             [columns]=\"COLUMNS_ATTRIBUTES\"\n                             [data$]=\"entity['Link_Attributes']\"\n                             [entity]=\"entity\"\n                             [header]=\"'Attributes'\"\n    ></tos-entity-detail-Table>\n\n    <!-- Collections -->\n    <tos-entity-detail-Table *ngIf=\"entity['Link_Collections']\" class=\"col-md-6 mb-4\"\n                             [columns]=\"COLUMNS_COLLECTIONS\"\n                             [data$]=\"entity['Link_Collections']\"\n                             [entity]=\"entity\"\n                             [header]=\"'Collections'\"\n    ></tos-entity-detail-Table>\n\n    <!-- Dropped by -->\n    <tos-entity-detail-Table *ngIf=\"entity['Link_Monsters']\" class=\"col-md-6 mb-4\"\n                             [columns]=\"COLUMNS_ITEMS_MONSTERS\"\n                             [data$]=\"entity['Link_Monsters']\"\n                             [entity]=\"entity\"\n                             [header]=\"'Dropped by'\">\n    </tos-entity-detail-Table>\n\n    <!-- Exploration Reward from -->\n    <tos-entity-detail-Table *ngIf=\"entity['Link_Maps_Exploration']\" class=\"col-md-6 mb-4\"\n                             [columns]=\"COLUMNS_ITEMS_MAPS\"\n                             [data$]=\"entity['Link_Maps_Exploration']\"\n                             [entity]=\"entity\"\n                             [header]=\"'Exploration Reward from'\">\n    </tos-entity-detail-Table>\n\n    <!-- Found in -->\n    <tos-entity-detail-Table *ngIf=\"entity['Link_Cubes']\" class=\"col-md-6 mb-4\"\n                             [columns]=\"COLUMNS_CUBES\"\n                             [data$]=\"entity['Link_Cubes']\"\n                             [entity]=\"entity\"\n                             [header]=\"'Found in'\">\n    </tos-entity-detail-Table>\n\n    <!-- Items -->\n    <tos-entity-detail-Table *ngIf=\"entity['Link_Items'] && !monster\" class=\"col-md-6 mb-4\"\n                             [columns]=\"COLUMNS_ITEMS\"\n                             [data$]=\"entity['Link_Items']\"\n                             [entity]=\"entity\"\n                             [header]=\"cube ? 'Drops' : 'Items'\">\n    </tos-entity-detail-Table>\n\n    <!-- Items (Monster) -->\n    <tos-entity-detail-Table *ngIf=\"entity['Link_Items'] && monster\" class=\"col-md-6 mb-4\"\n                             [columns]=\"COLUMNS_MONSTERS_DROPS\"\n                             [data$]=\"entity['Link_Items']\"\n                             [entity]=\"entity\"\n                             [header]=\"'Drops'\">\n    </tos-entity-detail-Table>\n\n\n    <!-- Required for -->\n    <tos-entity-detail-Table *ngIf=\"entity['Link_RecipeMaterial'] && !recipe\" class=\"col-md-6 mb-4\"\n                             [columns]=\"COLUMNS_RECIPES\"\n                             [data$]=\"entity['Link_RecipeMaterial']\"\n                             [entity]=\"entity\"\n                             [header]=\"'Required for'\">\n    </tos-entity-detail-Table>\n\n    <!-- Skills -->\n    <tos-entity-detail-Table *ngIf=\"entity['Link_Skills']\" class=\"col-md-6 mb-4\"\n                             [columns]=\"COLUMNS_SKILLS\"\n                             [data$]=\"entity['Link_Skills']\"\n                             [entity]=\"entity\"\n                             [header]=\"'Skills'\"\n    ></tos-entity-detail-Table>\n\n    <!-- Spawn Locations (Monster) -->\n    <tos-entity-detail-Table *ngIf=\"entity['Link_Maps'] && monster\" class=\"col-md-6 mb-4\"\n                             [columns]=\"COLUMNS_MONSTERS_MAPS\"\n                             [data$]=\"entity['Link_Maps']\"\n                             [entity]=\"entity\"\n                             [header]=\"'Spawn Locations'\">\n    </tos-entity-detail-Table>\n\n    <!-- Spawn Locations (Item) -->\n    <tos-entity-detail-Table *ngIf=\"entity['Link_Maps'] && item\" class=\"col-md-6 mb-4\"\n                             [columns]=\"COLUMNS_ITEMS_MAPS\"\n                             [data$]=\"entity['Link_Maps']\"\n                             [entity]=\"entity\"\n                             [header]=\"'Drop Locations'\">\n    </tos-entity-detail-Table>\n\n  </div>\n\n</div>\n"

/***/ }),

/***/ "./src/app/database/entity-detail/entity-detail.component.scss":
/*!*********************************************************************!*\
  !*** ./src/app/database/entity-detail/entity-detail.component.scss ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".card {\n  transform: translateX(-1.25rem);\n}\n\n@media (min-width: 768px) {\n  .card {\n    transform: initial !important;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9mdW5naS9FL1Rvc1Byb2plY3QvVG9zR3VydUJhc2UvdG9zLWRhdGFiYXNlL3Rvcy13ZWIvc3JjL2FwcC9kYXRhYmFzZS9lbnRpdHktZGV0YWlsL2VudGl0eS1kZXRhaWwuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL2RhdGFiYXNlL2VudGl0eS1kZXRhaWwvZW50aXR5LWRldGFpbC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGdDQUFBO0NDQ0Q7O0FER0Q7RUFDRTtJQUNFLDhCQUFBO0dDQUQ7Q0FDRiIsImZpbGUiOiJzcmMvYXBwL2RhdGFiYXNlL2VudGl0eS1kZXRhaWwvZW50aXR5LWRldGFpbC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5jYXJkIHtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0xLjI1cmVtKTtcbn1cblxuLy8gTWVkaXVtIGRldmljZXMgKHRhYmxldHMsIDc2OHB4IGFuZCB1cClcbkBtZWRpYSAobWluLXdpZHRoOiA3NjhweCkge1xuICAuY2FyZCB7XG4gICAgdHJhbnNmb3JtOiBpbml0aWFsICFpbXBvcnRhbnQ7XG4gIH1cbn1cbiIsIi5jYXJkIHtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0xLjI1cmVtKTtcbn1cblxuQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KSB7XG4gIC5jYXJkIHtcbiAgICB0cmFuc2Zvcm06IGluaXRpYWwgIWltcG9ydGFudDtcbiAgfVxufSJdfQ== */"

/***/ }),

/***/ "./src/app/database/entity-detail/entity-detail.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/database/entity-detail/entity-detail.component.ts ***!
  \*******************************************************************/
/*! exports provided: EntityDetailComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EntityDetailComponent", function() { return EntityDetailComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared_domain_tos_item_tos_item_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/domain/tos/item/tos-item.model */ "./src/app/shared/domain/tos/item/tos-item.model.ts");
/* harmony import */ var _shared_domain_tos_item_equipment_tos_equipment_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/domain/tos/item/equipment/tos-equipment.model */ "./src/app/shared/domain/tos/item/equipment/tos-equipment.model.ts");
/* harmony import */ var _shared_domain_tos_item_book_tos_book_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../shared/domain/tos/item/book/tos-book.model */ "./src/app/shared/domain/tos/item/book/tos-book.model.ts");
/* harmony import */ var _shared_domain_tos_item_collection_tos_collection_model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../shared/domain/tos/item/collection/tos-collection.model */ "./src/app/shared/domain/tos/item/collection/tos-collection.model.ts");
/* harmony import */ var _shared_domain_tos_monster_tos_monster_model__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../shared/domain/tos/monster/tos-monster.model */ "./src/app/shared/domain/tos/monster/tos-monster.model.ts");
/* harmony import */ var _shared_domain_tos_item_recipe_tos_recipe_model__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../shared/domain/tos/item/recipe/tos-recipe.model */ "./src/app/shared/domain/tos/item/recipe/tos-recipe.model.ts");
/* harmony import */ var _shared_domain_tos_item_cube_tos_cube_model__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../shared/domain/tos/item/cube/tos-cube.model */ "./src/app/shared/domain/tos/item/cube/tos-cube.model.ts");
/* harmony import */ var _shared_domain_tos_item_card_tos_card_model__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../shared/domain/tos/item/card/tos-card.model */ "./src/app/shared/domain/tos/item/card/tos-card.model.ts");
/* harmony import */ var _shared_domain_tos_item_gem_tos_gem_model__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../shared/domain/tos/item/gem/tos-gem.model */ "./src/app/shared/domain/tos/item/gem/tos-gem.model.ts");
/* harmony import */ var _shared_components_entity_detail_entity_detail_ClassIconGrade_entity_detail_ClassIconGrade_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../shared/components/entity-detail/entity-detail-ClassIconGrade/entity-detail-ClassIconGrade.component */ "./src/app/shared/components/entity-detail/entity-detail-ClassIconGrade/entity-detail-ClassIconGrade.component.ts");
/* harmony import */ var _shared_domain_tos_attribute_tos_attribute_model__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../shared/domain/tos/attribute/tos-attribute.model */ "./src/app/shared/domain/tos/attribute/tos-attribute.model.ts");
/* harmony import */ var _shared_domain_tos_skill_tos_skill_model__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../shared/domain/tos/skill/tos-skill.model */ "./src/app/shared/domain/tos/skill/tos-skill.model.ts");
/* harmony import */ var _shared_domain_tos_tos_build__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../shared/domain/tos/tos-build */ "./src/app/shared/domain/tos/tos-build.ts");
/* harmony import */ var _shared_domain_tos_job_tos_job_model__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../shared/domain/tos/job/tos-job.model */ "./src/app/shared/domain/tos/job/tos-job.model.ts");
/* harmony import */ var _resolvers_attribute_list_configuration_resolver__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../resolvers/attribute-list-configuration.resolver */ "./src/app/database/resolvers/attribute-list-configuration.resolver.ts");
/* harmony import */ var _resolvers_collection_list_configuration_resolver__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../resolvers/collection-list-configuration.resolver */ "./src/app/database/resolvers/collection-list-configuration.resolver.ts");
/* harmony import */ var _resolvers_gem_list_configuration_resolver__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../resolvers/gem-list-configuration.resolver */ "./src/app/database/resolvers/gem-list-configuration.resolver.ts");
/* harmony import */ var _resolvers_item_list_configuration_resolver__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../resolvers/item-list-configuration.resolver */ "./src/app/database/resolvers/item-list-configuration.resolver.ts");
/* harmony import */ var _resolvers_job_list_configuration_resolver__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../resolvers/job-list-configuration.resolver */ "./src/app/database/resolvers/job-list-configuration.resolver.ts");
/* harmony import */ var _resolvers_skill_list_configuration_resolver__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../resolvers/skill-list-configuration.resolver */ "./src/app/database/resolvers/skill-list-configuration.resolver.ts");
/* harmony import */ var _resolvers_recipe_list_configuration_resolver__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../resolvers/recipe-list-configuration.resolver */ "./src/app/database/resolvers/recipe-list-configuration.resolver.ts");
/* harmony import */ var _resolvers_monster_list_configuration_resolver__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ../resolvers/monster-list-configuration.resolver */ "./src/app/database/resolvers/monster-list-configuration.resolver.ts");
/* harmony import */ var _resolvers_cube_list_configuration_resolver__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ../resolvers/cube-list-configuration.resolver */ "./src/app/database/resolvers/cube-list-configuration.resolver.ts");
/* harmony import */ var _resolvers_equipment_set_list_configuration_resolver__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ../resolvers/equipment-set-list-configuration.resolver */ "./src/app/database/resolvers/equipment-set-list-configuration.resolver.ts");
/* harmony import */ var _shared_domain_tos_region__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ../../shared/domain/tos-region */ "./src/app/shared/domain/tos-region.ts");
/* harmony import */ var _shared_domain_tos_map_tos_map_model__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ../../shared/domain/tos/map/tos-map.model */ "./src/app/shared/domain/tos/map/tos-map.model.ts");
/* harmony import */ var _resolvers_map_list_configuration_resolver__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ../resolvers/map-list-configuration.resolver */ "./src/app/database/resolvers/map-list-configuration.resolver.ts");






























var EntityDetailComponent = /** @class */ (function () {
    function EntityDetailComponent(changeDetector, route, router) {
        this.changeDetector = changeDetector;
        this.route = route;
        this.router = router;
        this.COLUMNS_ATTRIBUTES = _resolvers_attribute_list_configuration_resolver__WEBPACK_IMPORTED_MODULE_17__["AttributeListConfigurationResolver"].COLUMNS;
        this.COLUMNS_COLLECTIONS = _resolvers_collection_list_configuration_resolver__WEBPACK_IMPORTED_MODULE_18__["CollectionListConfigurationResolver"].COLUMNS;
        this.COLUMNS_CUBES = _resolvers_cube_list_configuration_resolver__WEBPACK_IMPORTED_MODULE_25__["CubeListConfigurationResolver"].COLUMNS;
        this.COLUMNS_GEMS = _resolvers_gem_list_configuration_resolver__WEBPACK_IMPORTED_MODULE_19__["GemListConfigurationResolver"].COLUMNS;
        this.COLUMNS_ITEMS = _resolvers_item_list_configuration_resolver__WEBPACK_IMPORTED_MODULE_20__["ItemListConfigurationResolver"].COLUMNS;
        this.COLUMNS_ITEMS_MONSTERS = _resolvers_item_list_configuration_resolver__WEBPACK_IMPORTED_MODULE_20__["ItemListConfigurationResolver"].COLUMNS_MONSTERS;
        this.COLUMNS_ITEMS_MAPS = _resolvers_item_list_configuration_resolver__WEBPACK_IMPORTED_MODULE_20__["ItemListConfigurationResolver"].COLUMNS_MAPS;
        this.COLUMNS_JOBS = _resolvers_job_list_configuration_resolver__WEBPACK_IMPORTED_MODULE_21__["JobListConfigurationResolver"].COLUMNS;
        this.COLUMNS_MAPS = _resolvers_map_list_configuration_resolver__WEBPACK_IMPORTED_MODULE_29__["MapListConfigurationResolver"].COLUMNS;
        this.COLUMNS_MAPS_ITEMS = _resolvers_map_list_configuration_resolver__WEBPACK_IMPORTED_MODULE_29__["MapListConfigurationResolver"].COLUMNS_ITEMS;
        this.COLUMNS_MAPS_NPCS = _resolvers_map_list_configuration_resolver__WEBPACK_IMPORTED_MODULE_29__["MapListConfigurationResolver"].COLUMNS_NPCS;
        this.COLUMNS_RECIPES_MATERIALS = _resolvers_recipe_list_configuration_resolver__WEBPACK_IMPORTED_MODULE_23__["RecipeListConfigurationResolver"].COLUMNS_MATERIALS;
        this.COLUMNS_RECIPES = _resolvers_recipe_list_configuration_resolver__WEBPACK_IMPORTED_MODULE_23__["RecipeListConfigurationResolver"].COLUMNS;
        this.COLUMNS_SET = _resolvers_equipment_set_list_configuration_resolver__WEBPACK_IMPORTED_MODULE_26__["EquipmentSetListConfigurationResolver"].COLUMNS;
        this.COLUMNS_SKILLS = _resolvers_skill_list_configuration_resolver__WEBPACK_IMPORTED_MODULE_22__["SkillListConfigurationResolver"].COLUMNS;
        this.COLUMNS_MONSTERS_DROPS = _resolvers_monster_list_configuration_resolver__WEBPACK_IMPORTED_MODULE_24__["MonsterListConfigurationResolver"].COLUMNS_ITEMS;
        this.COLUMNS_MONSTERS_MAPS = _resolvers_monster_list_configuration_resolver__WEBPACK_IMPORTED_MODULE_24__["MonsterListConfigurationResolver"].COLUMNS_MAPS;
        this.ICON_WIDTH = _shared_components_entity_detail_entity_detail_ClassIconGrade_entity_detail_ClassIconGrade_component__WEBPACK_IMPORTED_MODULE_12__["EntityDetailClassIconGradeComponent"].ICON_LARGE_WIDTH;
        this.anvilLevel = 0;
        this.transcendLevel = 0;
    }
    EntityDetailComponent.prototype.onInit = function () { };
    EntityDetailComponent.prototype.onDestroy = function () { };
    EntityDetailComponent.prototype.ngOnDestroy = function () {
        this.onDestroy();
        this.subscriptionRoute && this.subscriptionRoute.unsubscribe();
        this.subscriptionSkill && this.subscriptionSkill.unsubscribe();
    };
    EntityDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscriptionRoute = this.route.data.subscribe(function (_a) {
            var response = _a.response;
            _this.entity = response;
            _this.attribute = _this.entity instanceof _shared_domain_tos_attribute_tos_attribute_model__WEBPACK_IMPORTED_MODULE_13__["TOSAttribute"] ? _this.entity : null;
            _this.book = _this.entity instanceof _shared_domain_tos_item_book_tos_book_model__WEBPACK_IMPORTED_MODULE_5__["TOSBook"] ? _this.entity : null;
            _this.collection = _this.entity instanceof _shared_domain_tos_item_collection_tos_collection_model__WEBPACK_IMPORTED_MODULE_6__["TOSCollection"] ? _this.entity : null;
            _this.card = _this.entity instanceof _shared_domain_tos_item_card_tos_card_model__WEBPACK_IMPORTED_MODULE_10__["TOSCard"] ? _this.entity : null;
            _this.cube = _this.entity instanceof _shared_domain_tos_item_cube_tos_cube_model__WEBPACK_IMPORTED_MODULE_9__["TOSCube"] ? _this.entity : null;
            _this.equipment = _this.entity instanceof _shared_domain_tos_item_equipment_tos_equipment_model__WEBPACK_IMPORTED_MODULE_4__["TOSEquipment"] ? _this.entity : null;
            _this.equipmentSet = _this.entity instanceof _shared_domain_tos_item_equipment_tos_equipment_model__WEBPACK_IMPORTED_MODULE_4__["TOSEquipmentSet"] ? _this.entity : null;
            _this.gem = _this.entity instanceof _shared_domain_tos_item_gem_tos_gem_model__WEBPACK_IMPORTED_MODULE_11__["TOSGem"] ? _this.entity : null;
            _this.item = _this.entity instanceof _shared_domain_tos_item_tos_item_model__WEBPACK_IMPORTED_MODULE_3__["TOSItem"] ? _this.entity : null;
            _this.job = _this.entity instanceof _shared_domain_tos_job_tos_job_model__WEBPACK_IMPORTED_MODULE_16__["TOSJob"] ? _this.entity : null;
            _this.map = _this.entity instanceof _shared_domain_tos_map_tos_map_model__WEBPACK_IMPORTED_MODULE_28__["TOSMap"] ? _this.entity : null;
            _this.monster = _this.entity instanceof _shared_domain_tos_monster_tos_monster_model__WEBPACK_IMPORTED_MODULE_7__["TOSMonster"] ? _this.entity : null;
            _this.recipe = _this.entity instanceof _shared_domain_tos_item_recipe_tos_recipe_model__WEBPACK_IMPORTED_MODULE_8__["TOSRecipe"] ? _this.entity : null;
            _this.skill = _this.entity instanceof _shared_domain_tos_skill_tos_skill_model__WEBPACK_IMPORTED_MODULE_14__["TOSSkill"] ? _this.entity : null;
            if (_this.skill) {
                _this.subscriptionSkill && _this.subscriptionSkill.unsubscribe();
                _this.subscriptionSkill = _this.skill.Link_Job.subscribe(function (value) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                    var build;
                    return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                build = _shared_domain_tos_tos_build__WEBPACK_IMPORTED_MODULE_15__["TOSDatabaseBuild"].new(_shared_domain_tos_region__WEBPACK_IMPORTED_MODULE_27__["TOSRegionService"].get());
                                return [4 /*yield*/, build.jobAdd$(value)];
                            case 1:
                                _a.sent(); // Note: we need to add them 3 times, as on pre-Re:Build the level max scales with the selected Job circle
                                return [4 /*yield*/, build.jobAdd$(value)];
                            case 2:
                                _a.sent();
                                return [4 /*yield*/, build.jobAdd$(value)];
                            case 3:
                                _a.sent();
                                this.build = build;
                                this.changeDetector.markForCheck();
                                return [2 /*return*/];
                        }
                    });
                }); });
            }
            _this.onInit();
            _this.changeDetector.markForCheck();
        });
    };
    EntityDetailComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
            selector: 'app-entity-detail',
            template: __webpack_require__(/*! ./entity-detail.component.html */ "./src/app/database/entity-detail/entity-detail.component.html"),
            styles: [__webpack_require__(/*! ./entity-detail.component.scss */ "./src/app/database/entity-detail/entity-detail.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], EntityDetailComponent);
    return EntityDetailComponent;
}());



/***/ }),

/***/ "./src/app/database/entity-filter/entity-list-filter.component.html":
/*!**************************************************************************!*\
  !*** ./src/app/database/entity-filter/entity-list-filter.component.html ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n  <div *ngFor=\"let filter of config; index as i\"\n       class=\"col mb-2 text-left\"\n       style=\"flex-grow: 0\">\n\n    <label>{{ filter.label || filter.column }}</label>\n\n    <button class=\"btn btn-primary dropdown-toggle\"\n            type=\"button\"\n            [attachOutsideOnClick]=\"true\"\n            [ngClass]=\"{ 'disabled': disabled }\"\n            (click)=\"onOpen(filter)\"\n            (clickOutside)=\"isOpen[filter.column] = false\">\n      {{ value[filter.column] ? filter.toString(value[filter.column].value) : 'All' }}\n    </button>\n\n    <div class=\"dropdown-menu\" [ngClass]=\"{ 'show': isOpen[filter.column] }\">\n      <div *ngFor=\"let optionGroup of optionGroups[i]; index as j\">\n\n        <div class=\"dropdown-header\" *ngIf=\"optionGroup.header\">{{ optionGroup.header }}</div>\n\n        <a class=\"dropdown-item\" *ngFor=\"let option of optionGroup.options\" [href]=\"'#' + option?.toString() || 'All'\"\n           [ngClass]=\"{ 'active': option && filter.indexOf(option) == value[filter.column]?.value }\"\n           (click)=\"onSelect($event, filter, option)\">\n          {{ option || 'All' }}\n        </a>\n\n        <div class=\"dropdown-divider\" *ngIf=\"j < optionGroups[i].length - 1\"></div>\n      </div>\n\n    </div>\n\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/database/entity-filter/entity-list-filter.component.scss":
/*!**************************************************************************!*\
  !*** ./src/app/database/entity-filter/entity-list-filter.component.scss ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".dropdown-menu {\n  max-height: 400px;\n  overflow-y: auto;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9mdW5naS9FL1Rvc1Byb2plY3QvVG9zR3VydUJhc2UvdG9zLWRhdGFiYXNlL3Rvcy13ZWIvc3JjL2FwcC9kYXRhYmFzZS9lbnRpdHktZmlsdGVyL2VudGl0eS1saXN0LWZpbHRlci5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvZGF0YWJhc2UvZW50aXR5LWZpbHRlci9lbnRpdHktbGlzdC1maWx0ZXIuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxrQkFBQTtFQUNBLGlCQUFBO0NDQ0QiLCJmaWxlIjoic3JjL2FwcC9kYXRhYmFzZS9lbnRpdHktZmlsdGVyL2VudGl0eS1saXN0LWZpbHRlci5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5kcm9wZG93bi1tZW51IHtcbiAgbWF4LWhlaWdodDogNDAwcHg7XG4gIG92ZXJmbG93LXk6IGF1dG87XG59XG4iLCIuZHJvcGRvd24tbWVudSB7XG4gIG1heC1oZWlnaHQ6IDQwMHB4O1xuICBvdmVyZmxvdy15OiBhdXRvO1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/database/entity-filter/entity-list-filter.component.ts":
/*!************************************************************************!*\
  !*** ./src/app/database/entity-filter/entity-list-filter.component.ts ***!
  \************************************************************************/
/*! exports provided: EntityListFilterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EntityListFilterComponent", function() { return EntityListFilterComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_directives_filter_directive__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/directives/filter.directive */ "./src/app/shared/directives/filter.directive.ts");



var EntityListFilterComponent = /** @class */ (function () {
    function EntityListFilterComponent() {
        this.isOpen = {};
        this.value = {};
        this.modelChange = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
    }
    EntityListFilterComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes['config'] && this.config) {
            this.optionGroups = this.config.map(function (value) { return [{ options: [null] }].concat(value.groupBy()); });
        }
        if (changes['disabled'] && this.disabled) {
            this.isOpen = {};
        }
        if (changes['model']) {
            this.value = {};
            this.model.forEach(function (filter) { return _this.value[filter.column] = filter; });
        }
    };
    EntityListFilterComponent.prototype.onOpen = function (filter) {
        if (this.disabled)
            return;
        this.isOpen[filter.column] = !this.isOpen[filter.column];
    };
    EntityListFilterComponent.prototype.onSelect = function (event, filter, option) {
        event.preventDefault();
        if (this.disabled)
            return;
        var result = (this.model || []).filter(function (f) { return f && f.column != filter.column; });
        if (option != null && option != '')
            result.push(new _shared_directives_filter_directive__WEBPACK_IMPORTED_MODULE_2__["Filter"](filter.column, filter.indexOf(option)));
        this.isOpen[filter.column] = false;
        this.modelChange.emit(result);
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Array)
    ], EntityListFilterComponent.prototype, "config", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Boolean)
    ], EntityListFilterComponent.prototype, "disabled", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Array)
    ], EntityListFilterComponent.prototype, "model", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
    ], EntityListFilterComponent.prototype, "modelChange", void 0);
    EntityListFilterComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
            selector: 'app-entity-list-filter',
            template: __webpack_require__(/*! ./entity-list-filter.component.html */ "./src/app/database/entity-filter/entity-list-filter.component.html"),
            styles: [__webpack_require__(/*! ./entity-list-filter.component.scss */ "./src/app/database/entity-filter/entity-list-filter.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], EntityListFilterComponent);
    return EntityListFilterComponent;
}());



/***/ }),

/***/ "./src/app/database/entity-list/entity-list.component.html":
/*!*****************************************************************!*\
  !*** ./src/app/database/entity-list/entity-list.component.html ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- Filter -->\n<div id=\"top\">\n  <div class=\"row mb-4\" *ngIf=\"config?.filter\">\n    <app-entity-list-filter class=\"form-group col\"\n                            [config]=\"config.filter\"\n                            [model]=\"pageFilter\"\n                            (modelChange)=\"onFilterChange($event)\">\n    </app-entity-list-filter>\n  </div>\n</div>\n\n<!-- Table -->\n<tos-entity-table [columns]=\"config.tableColumns\"\n                  [data]=\"data\"\n                  [sort]=\"pageSort\"\n                  (sortChange)=\"onSortChange($event)\"\n></tos-entity-table>\n\n<!-- Pagination -->\n<ngb-pagination\n  class=\"d-flex justify-content-center mt-3\"\n  [collectionSize]=\"dataSize\"\n  [page]=\"page\"\n  [pageSize]=\"pageSize\"\n  [maxSize]=\"5\"\n  [boundaryLinks]=\"true\"\n  [ellipses]=\"false\"\n  [rotate]=\"true\"\n  (pageChange)=\"onPageChange($event)\"\n>\n</ngb-pagination>\n"

/***/ }),

/***/ "./src/app/database/entity-list/entity-list.component.scss":
/*!*****************************************************************!*\
  !*** ./src/app/database/entity-list/entity-list.component.scss ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "a {\n  color: inherit;\n}\n\na:hover {\n  text-decoration: underline;\n}\n\n.dropdown-toggle {\n  min-width: 10rem;\n}\n\n.tos-equipment-grade {\n  display: inline-block;\n  height: 16px;\n  width: 16px;\n  border-radius: 8px;\n  vertical-align: text-bottom;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9mdW5naS9FL1Rvc1Byb2plY3QvVG9zR3VydUJhc2UvdG9zLWRhdGFiYXNlL3Rvcy13ZWIvc3JjL2FwcC9kYXRhYmFzZS9lbnRpdHktbGlzdC9lbnRpdHktbGlzdC5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvZGF0YWJhc2UvZW50aXR5LWxpc3QvZW50aXR5LWxpc3QuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFBSSxlQUFBO0NDRUg7O0FEREQ7RUFBVSwyQkFBQTtDQ0tUOztBREhEO0VBQW1CLGlCQUFBO0NDT2xCOztBRExEO0VBQ0Usc0JBQUE7RUFDQSxhQUFBO0VBQ0EsWUFBQTtFQUNBLG1CQUFBO0VBQ0EsNEJBQUE7Q0NRRCIsImZpbGUiOiJzcmMvYXBwL2RhdGFiYXNlL2VudGl0eS1saXN0L2VudGl0eS1saXN0LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiYSB7IGNvbG9yOiBpbmhlcml0OyB9XG5hOmhvdmVyIHsgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7IH1cblxuLmRyb3Bkb3duLXRvZ2dsZSB7IG1pbi13aWR0aDogMTByZW07IH1cblxuLnRvcy1lcXVpcG1lbnQtZ3JhZGUge1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIGhlaWdodDogMTZweDtcbiAgd2lkdGg6IDE2cHg7XG4gIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgdmVydGljYWwtYWxpZ246IHRleHQtYm90dG9tO1xufVxuIiwiYSB7XG4gIGNvbG9yOiBpbmhlcml0O1xufVxuXG5hOmhvdmVyIHtcbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XG59XG5cbi5kcm9wZG93bi10b2dnbGUge1xuICBtaW4td2lkdGg6IDEwcmVtO1xufVxuXG4udG9zLWVxdWlwbWVudC1ncmFkZSB7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgaGVpZ2h0OiAxNnB4O1xuICB3aWR0aDogMTZweDtcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xuICB2ZXJ0aWNhbC1hbGlnbjogdGV4dC1ib3R0b207XG59Il19 */"

/***/ }),

/***/ "./src/app/database/entity-list/entity-list.component.ts":
/*!***************************************************************!*\
  !*** ./src/app/database/entity-list/entity-list.component.ts ***!
  \***************************************************************/
/*! exports provided: EntityListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EntityListComponent", function() { return EntityListComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared_service_CRUD_resolver__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/service/CRUD.resolver */ "./src/app/shared/service/CRUD.resolver.ts");
/* harmony import */ var _shared_directives_filter_directive__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/directives/filter.directive */ "./src/app/shared/directives/filter.directive.ts");
/* harmony import */ var _shared_directives_sort_directive__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../shared/directives/sort.directive */ "./src/app/shared/directives/sort.directive.ts");






var EntityListComponent = /** @class */ (function () {
    function EntityListComponent(changeDetector, route, router) {
        this.changeDetector = changeDetector;
        this.route = route;
        this.router = router;
        this.pageSize = _shared_service_CRUD_resolver__WEBPACK_IMPORTED_MODULE_3__["CRUDResolver"].PAGE_SIZE;
        this.toggleFilter = false;
    }
    EntityListComponent.prototype.reload = function () {
        var params = {};
        params[_shared_service_CRUD_resolver__WEBPACK_IMPORTED_MODULE_3__["CRUDResolver"].PARAM_FILTER] = this.pageFilter ? this.pageFilter.join(';') : null;
        params[_shared_service_CRUD_resolver__WEBPACK_IMPORTED_MODULE_3__["CRUDResolver"].PARAM_PAGE] = this.page;
        params[_shared_service_CRUD_resolver__WEBPACK_IMPORTED_MODULE_3__["CRUDResolver"].PARAM_SORT] = this.pageSort;
        this.toggleFilter = false;
        this.tooltip = null;
        this.router.navigate(['.'], { fragment: 'top', queryParams: params, relativeTo: this.route });
    };
    EntityListComponent.prototype.ngOnDestroy = function () {
        this.subscription ? this.subscription.unsubscribe() : null;
    };
    EntityListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.route.queryParamMap.subscribe(function (params) {
            _this.config = _this.route.snapshot.data.configuration;
            var response = _this.route.snapshot.data.response;
            _this.data = response.result;
            _this.dataSize = response.size;
            _this.page = +params.get(_shared_service_CRUD_resolver__WEBPACK_IMPORTED_MODULE_3__["CRUDResolver"].PARAM_PAGE) || 1;
            _this.pageSort = _shared_directives_sort_directive__WEBPACK_IMPORTED_MODULE_5__["Sort"].valueOf(params.get(_shared_service_CRUD_resolver__WEBPACK_IMPORTED_MODULE_3__["CRUDResolver"].PARAM_SORT)) || _shared_directives_sort_directive__WEBPACK_IMPORTED_MODULE_5__["Sort"].default(_this.config);
            _this.pageFilter = (params.get(_shared_service_CRUD_resolver__WEBPACK_IMPORTED_MODULE_3__["CRUDResolver"].PARAM_FILTER) || '').split(';')
                .map(function (filter) { return _shared_directives_filter_directive__WEBPACK_IMPORTED_MODULE_4__["Filter"].valueOf(filter); })
                .filter(function (filter) { return filter; });
            _this.changeDetector.markForCheck();
        });
    };
    EntityListComponent.prototype.onFilterChange = function (filter) {
        if (this.pageFilter === filter)
            return;
        this.page = 1;
        this.pageFilter = filter;
        this.pageSort = null;
        this.reload();
    };
    EntityListComponent.prototype.onPageChange = function (page) {
        this.page = page;
        this.reload();
    };
    EntityListComponent.prototype.onSortChange = function (sort) {
        this.page = 1;
        this.pageSort = sort;
        this.reload();
    };
    EntityListComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
            selector: 'app-entity-list',
            template: __webpack_require__(/*! ./entity-list.component.html */ "./src/app/database/entity-list/entity-list.component.html"),
            styles: [__webpack_require__(/*! ./entity-list.component.scss */ "./src/app/database/entity-list/entity-list.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], EntityListComponent);
    return EntityListComponent;
}());



/***/ }),

/***/ "./src/app/database/resolvers/attribute-list-configuration.resolver.ts":
/*!*****************************************************************************!*\
  !*** ./src/app/database/resolvers/attribute-list-configuration.resolver.ts ***!
  \*****************************************************************************/
/*! exports provided: AttributeListConfigurationResolver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AttributeListConfigurationResolver", function() { return AttributeListConfigurationResolver; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_components_entity_table_pipes_table_cell_icon_pipe__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/components/entity-table/pipes/table-cell-icon.pipe */ "./src/app/shared/components/entity-table/pipes/table-cell-icon.pipe.ts");
/* harmony import */ var _shared_components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/components/entity-table/pipes/table-cell-text.pipe */ "./src/app/shared/components/entity-table/pipes/table-cell-text.pipe.ts");
/* harmony import */ var _shared_components_entity_table_pipes_table_cell_link_pipe__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/components/entity-table/pipes/table-cell-link.pipe */ "./src/app/shared/components/entity-table/pipes/table-cell-link.pipe.ts");





var AttributeListConfigurationResolver = /** @class */ (function () {
    function AttributeListConfigurationResolver() {
    }
    AttributeListConfigurationResolver_1 = AttributeListConfigurationResolver;
    AttributeListConfigurationResolver.prototype.resolve = function (route, state) {
        return {
            sortColumn: '$ID',
            tableColumns: AttributeListConfigurationResolver_1.COLUMNS,
        };
    };
    var AttributeListConfigurationResolver_1;
    AttributeListConfigurationResolver.COLUMNS = [
        { label: '', pipe: new _shared_components_entity_table_pipes_table_cell_icon_pipe__WEBPACK_IMPORTED_MODULE_2__["TableCellIconPipeDefinition"]('Icon'), class: 'p-1 text-center' },
        { label: '$ID', pipe: new _shared_components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_3__["TableCellTextPipeDefinition"]('$ID'), hideMobile: true },
        { label: 'Name', pipe: new _shared_components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_3__["TableCellTextPipeDefinition"]('Name'), wide: true },
        { label: 'Description', pipe: new _shared_components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_3__["TableCellTextPipeDefinition"]('Description', _shared_components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_3__["TableCellTextPipeFormat"].MULTILINE), hideMobile: true, wide: true },
        { label: 'Skill', pipe: new _shared_components_entity_table_pipes_table_cell_link_pipe__WEBPACK_IMPORTED_MODULE_4__["TableCellLinkPipeDefinition"]('Link_Skill'), class: 'p-1' },
    ];
    AttributeListConfigurationResolver = AttributeListConfigurationResolver_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
    ], AttributeListConfigurationResolver);
    return AttributeListConfigurationResolver;
}());



/***/ }),

/***/ "./src/app/database/resolvers/book-list-configuration.resolver.ts":
/*!************************************************************************!*\
  !*** ./src/app/database/resolvers/book-list-configuration.resolver.ts ***!
  \************************************************************************/
/*! exports provided: BookListConfigurationResolver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BookListConfigurationResolver", function() { return BookListConfigurationResolver; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_components_entity_table_pipes_table_cell_icon_pipe__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/components/entity-table/pipes/table-cell-icon.pipe */ "./src/app/shared/components/entity-table/pipes/table-cell-icon.pipe.ts");
/* harmony import */ var _shared_components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/components/entity-table/pipes/table-cell-text.pipe */ "./src/app/shared/components/entity-table/pipes/table-cell-text.pipe.ts");




var BookListConfigurationResolver = /** @class */ (function () {
    function BookListConfigurationResolver() {
    }
    BookListConfigurationResolver.prototype.resolve = function (route, state) {
        return {
            sortColumn: '$ID',
            tableColumns: [
                { label: '', pipe: new _shared_components_entity_table_pipes_table_cell_icon_pipe__WEBPACK_IMPORTED_MODULE_2__["TableCellIconPipeDefinition"]('Icon'), class: 'p-1' },
                { label: '$ID', pipe: new _shared_components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_3__["TableCellTextPipeDefinition"]('$ID'), hideMobile: true },
                { label: 'Name', pipe: new _shared_components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_3__["TableCellTextPipeDefinition"]('Name'), wide: true },
            ]
        };
    };
    BookListConfigurationResolver = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
    ], BookListConfigurationResolver);
    return BookListConfigurationResolver;
}());



/***/ }),

/***/ "./src/app/database/resolvers/card-list-configuration.resolver.ts":
/*!************************************************************************!*\
  !*** ./src/app/database/resolvers/card-list-configuration.resolver.ts ***!
  \************************************************************************/
/*! exports provided: CardListConfigurationResolver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CardListConfigurationResolver", function() { return CardListConfigurationResolver; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/domain/tos/tos-domain */ "./src/app/shared/domain/tos/tos-domain.ts");
/* harmony import */ var _shared_components_entity_table_pipes_table_cell_icon_pipe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/components/entity-table/pipes/table-cell-icon.pipe */ "./src/app/shared/components/entity-table/pipes/table-cell-icon.pipe.ts");
/* harmony import */ var _shared_components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/components/entity-table/pipes/table-cell-text.pipe */ "./src/app/shared/components/entity-table/pipes/table-cell-text.pipe.ts");





var CardListConfigurationResolver = /** @class */ (function () {
    function CardListConfigurationResolver() {
    }
    CardListConfigurationResolver.prototype.resolve = function (route, state) {
        return {
            filter: [
                {
                    column: 'TypeCard',
                    label: 'Type',
                    groupBy: _shared_domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_2__["TOSCardTypeService"].groupBy,
                    indexOf: _shared_domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_2__["TOSCardTypeService"].indexOf,
                    toString: _shared_domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_2__["TOSCardTypeService"].toString,
                },
            ],
            sortColumn: '$ID',
            tableColumns: [
                { label: '', pipe: new _shared_components_entity_table_pipes_table_cell_icon_pipe__WEBPACK_IMPORTED_MODULE_3__["TableCellIconPipeDefinition"]('Icon'), class: 'p-1 text-center' },
                { label: '$ID', pipe: new _shared_components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_4__["TableCellTextPipeDefinition"]('$ID'), hideMobile: true },
                { label: 'Name', pipe: new _shared_components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_4__["TableCellTextPipeDefinition"]('Name'), wide: true },
                { label: 'Element', pipe: new _shared_components_entity_table_pipes_table_cell_icon_pipe__WEBPACK_IMPORTED_MODULE_3__["TableCellIconPipeDefinition"]('MonsterElement', _shared_domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_2__["TOSElementService"].icon), class: 'p-1 text-center', hideMobile: true },
                { label: 'Race', pipe: new _shared_components_entity_table_pipes_table_cell_icon_pipe__WEBPACK_IMPORTED_MODULE_3__["TableCellIconPipeDefinition"]('MonsterRace', _shared_domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_2__["TOSMonsterRaceService"].icon), class: 'p-1 text-center', hideMobile: true },
                { label: 'Type', pipe: new _shared_components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_4__["TableCellTextPipeDefinition"]('TypeCard') },
            ]
        };
    };
    CardListConfigurationResolver = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
    ], CardListConfigurationResolver);
    return CardListConfigurationResolver;
}());



/***/ }),

/***/ "./src/app/database/resolvers/collection-list-configuration.resolver.ts":
/*!******************************************************************************!*\
  !*** ./src/app/database/resolvers/collection-list-configuration.resolver.ts ***!
  \******************************************************************************/
/*! exports provided: CollectionListConfigurationResolver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CollectionListConfigurationResolver", function() { return CollectionListConfigurationResolver; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_components_entity_table_pipes_table_cell_icon_pipe__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/components/entity-table/pipes/table-cell-icon.pipe */ "./src/app/shared/components/entity-table/pipes/table-cell-icon.pipe.ts");
/* harmony import */ var _shared_components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/components/entity-table/pipes/table-cell-text.pipe */ "./src/app/shared/components/entity-table/pipes/table-cell-text.pipe.ts");
/* harmony import */ var _shared_components_entity_table_pipes_table_cell_link_pipe__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/components/entity-table/pipes/table-cell-link.pipe */ "./src/app/shared/components/entity-table/pipes/table-cell-link.pipe.ts");





var CollectionListConfigurationResolver = /** @class */ (function () {
    function CollectionListConfigurationResolver() {
    }
    CollectionListConfigurationResolver_1 = CollectionListConfigurationResolver;
    CollectionListConfigurationResolver.prototype.resolve = function (route, state) {
        return {
            sortColumn: '$ID',
            tableColumns: CollectionListConfigurationResolver_1.COLUMNS,
        };
    };
    var CollectionListConfigurationResolver_1;
    CollectionListConfigurationResolver.COLUMNS = [
        { label: '', pipe: new _shared_components_entity_table_pipes_table_cell_icon_pipe__WEBPACK_IMPORTED_MODULE_2__["TableCellIconPipeDefinition"]('Icon'), class: 'p-1 text-center' },
        { label: '$ID', pipe: new _shared_components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_3__["TableCellTextPipeDefinition"]('$ID'), hideMobile: true },
        { label: 'Name', pipe: new _shared_components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_3__["TableCellTextPipeDefinition"]('Name'), wide: true },
        { label: 'Items', pipe: new _shared_components_entity_table_pipes_table_cell_link_pipe__WEBPACK_IMPORTED_MODULE_4__["TableCellLinkPipeDefinition"]('Link_Items'), class: 'p-1 text-nowrap' }
    ];
    CollectionListConfigurationResolver = CollectionListConfigurationResolver_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
    ], CollectionListConfigurationResolver);
    return CollectionListConfigurationResolver;
}());



/***/ }),

/***/ "./src/app/database/resolvers/cube-list-configuration.resolver.ts":
/*!************************************************************************!*\
  !*** ./src/app/database/resolvers/cube-list-configuration.resolver.ts ***!
  \************************************************************************/
/*! exports provided: CubeListConfigurationResolver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CubeListConfigurationResolver", function() { return CubeListConfigurationResolver; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_components_entity_table_pipes_table_cell_icon_pipe__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/components/entity-table/pipes/table-cell-icon.pipe */ "./src/app/shared/components/entity-table/pipes/table-cell-icon.pipe.ts");
/* harmony import */ var _shared_components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/components/entity-table/pipes/table-cell-text.pipe */ "./src/app/shared/components/entity-table/pipes/table-cell-text.pipe.ts");




var CubeListConfigurationResolver = /** @class */ (function () {
    function CubeListConfigurationResolver() {
    }
    CubeListConfigurationResolver_1 = CubeListConfigurationResolver;
    CubeListConfigurationResolver.prototype.resolve = function (route, state) {
        return {
            sortColumn: '$ID',
            tableColumns: CubeListConfigurationResolver_1.COLUMNS,
        };
    };
    var CubeListConfigurationResolver_1;
    CubeListConfigurationResolver.COLUMNS = [
        { label: '', pipe: new _shared_components_entity_table_pipes_table_cell_icon_pipe__WEBPACK_IMPORTED_MODULE_2__["TableCellIconPipeDefinition"]('Icon'), class: 'p-1 text-center' },
        { label: '$ID', pipe: new _shared_components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_3__["TableCellTextPipeDefinition"]('$ID'), hideMobile: true },
        { label: 'Name', pipe: new _shared_components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_3__["TableCellTextPipeDefinition"]('Name'), wide: true },
    ];
    CubeListConfigurationResolver = CubeListConfigurationResolver_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
    ], CubeListConfigurationResolver);
    return CubeListConfigurationResolver;
}());



/***/ }),

/***/ "./src/app/database/resolvers/equipment-list-configuration-resolver.service.ts":
/*!*************************************************************************************!*\
  !*** ./src/app/database/resolvers/equipment-list-configuration-resolver.service.ts ***!
  \*************************************************************************************/
/*! exports provided: EquipmentListConfigurationResolver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EquipmentListConfigurationResolver", function() { return EquipmentListConfigurationResolver; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/domain/tos/tos-domain */ "./src/app/shared/domain/tos/tos-domain.ts");
/* harmony import */ var _shared_components_entity_table_pipes_table_cell_icon_pipe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/components/entity-table/pipes/table-cell-icon.pipe */ "./src/app/shared/components/entity-table/pipes/table-cell-icon.pipe.ts");
/* harmony import */ var _shared_components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/components/entity-table/pipes/table-cell-text.pipe */ "./src/app/shared/components/entity-table/pipes/table-cell-text.pipe.ts");
/* harmony import */ var _shared_components_entity_table_pipes_table_cell_number_pipe__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../shared/components/entity-table/pipes/table-cell-number.pipe */ "./src/app/shared/components/entity-table/pipes/table-cell-number.pipe.ts");
/* harmony import */ var _shared_components_entity_table_pipes_table_cell_badge_pipe__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../shared/components/entity-table/pipes/table-cell-badge.pipe */ "./src/app/shared/components/entity-table/pipes/table-cell-badge.pipe.ts");







var EquipmentListConfigurationResolver = /** @class */ (function () {
    function EquipmentListConfigurationResolver() {
    }
    EquipmentListConfigurationResolver.prototype.resolve = function (route, state) {
        return {
            filter: [
                {
                    column: 'Grade',
                    groupBy: _shared_domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_2__["TOSEquipmentGradeService"].groupBy,
                    indexOf: _shared_domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_2__["TOSEquipmentGradeService"].indexOf,
                    toString: _shared_domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_2__["TOSEquipmentGradeService"].toString,
                },
                {
                    column: 'Material',
                    groupBy: _shared_domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_2__["TOSEquipmentMaterialService"].groupBy,
                    indexOf: _shared_domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_2__["TOSEquipmentMaterialService"].indexOf,
                    toString: _shared_domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_2__["TOSEquipmentMaterialService"].toString,
                },
                {
                    column: 'TypeEquipment',
                    label: 'Type',
                    groupBy: _shared_domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_2__["TOSEquipmentTypeService"].groupBy,
                    indexOf: _shared_domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_2__["TOSEquipmentTypeService"].indexOf,
                    toString: _shared_domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_2__["TOSEquipmentTypeService"].toString,
                }
            ],
            sortColumn: '$ID',
            tableColumns: [
                { label: '', pipe: new _shared_components_entity_table_pipes_table_cell_icon_pipe__WEBPACK_IMPORTED_MODULE_3__["TableCellIconPipeDefinition"]('Icon'), class: 'p-1 text-center' },
                { label: '$ID', pipe: new _shared_components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_4__["TableCellTextPipeDefinition"]('$ID'), hideMobile: true },
                { label: 'Name', pipe: new _shared_components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_4__["TableCellTextPipeDefinition"]('Name'), wide: true },
                { label: 'Material', pipe: new _shared_components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_4__["TableCellTextPipeDefinition"]('Material'), hideMobile: true },
                { label: 'Grade', pipe: new _shared_components_entity_table_pipes_table_cell_badge_pipe__WEBPACK_IMPORTED_MODULE_6__["TableCellBadgePipeDefinition"]('Grade', function (o) { return _shared_domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_2__["TOSEquipmentGradeService"].color(o); }), hideMobile: true },
                { label: 'Level', pipe: new _shared_components_entity_table_pipes_table_cell_number_pipe__WEBPACK_IMPORTED_MODULE_5__["TableCellNumberPipeDefinition"]('RequiredLevel') },
                { label: 'Type', pipe: new _shared_components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_4__["TableCellTextPipeDefinition"]('TypeEquipment'), class: 'text-nowrap', hideMobile: true },
            ]
        };
    };
    EquipmentListConfigurationResolver = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
    ], EquipmentListConfigurationResolver);
    return EquipmentListConfigurationResolver;
}());



/***/ }),

/***/ "./src/app/database/resolvers/equipment-set-list-configuration.resolver.ts":
/*!*********************************************************************************!*\
  !*** ./src/app/database/resolvers/equipment-set-list-configuration.resolver.ts ***!
  \*********************************************************************************/
/*! exports provided: EquipmentSetListConfigurationResolver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EquipmentSetListConfigurationResolver", function() { return EquipmentSetListConfigurationResolver; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/components/entity-table/pipes/table-cell-text.pipe */ "./src/app/shared/components/entity-table/pipes/table-cell-text.pipe.ts");
/* harmony import */ var _shared_components_entity_table_pipes_table_cell_link_pipe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/components/entity-table/pipes/table-cell-link.pipe */ "./src/app/shared/components/entity-table/pipes/table-cell-link.pipe.ts");




var EquipmentSetListConfigurationResolver = /** @class */ (function () {
    function EquipmentSetListConfigurationResolver() {
    }
    EquipmentSetListConfigurationResolver_1 = EquipmentSetListConfigurationResolver;
    EquipmentSetListConfigurationResolver.prototype.resolve = function (route, state) {
        return {
            sortColumn: '$ID',
            tableColumns: EquipmentSetListConfigurationResolver_1.COLUMNS,
        };
    };
    var EquipmentSetListConfigurationResolver_1;
    EquipmentSetListConfigurationResolver.COLUMNS = [
        { label: '$ID', pipe: new _shared_components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_2__["TableCellTextPipeDefinition"]('$ID'), hideMobile: true },
        { label: 'Name', pipe: new _shared_components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_2__["TableCellTextPipeDefinition"]('Name'), wide: true },
        { label: 'Items', pipe: new _shared_components_entity_table_pipes_table_cell_link_pipe__WEBPACK_IMPORTED_MODULE_3__["TableCellLinkPipeDefinition"]('Link_Items'), class: 'p-1 text-nowrap' }
    ];
    EquipmentSetListConfigurationResolver = EquipmentSetListConfigurationResolver_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
    ], EquipmentSetListConfigurationResolver);
    return EquipmentSetListConfigurationResolver;
}());



/***/ }),

/***/ "./src/app/database/resolvers/gem-list-configuration.resolver.ts":
/*!***********************************************************************!*\
  !*** ./src/app/database/resolvers/gem-list-configuration.resolver.ts ***!
  \***********************************************************************/
/*! exports provided: GemListConfigurationResolver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GemListConfigurationResolver", function() { return GemListConfigurationResolver; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/domain/tos/tos-domain */ "./src/app/shared/domain/tos/tos-domain.ts");
/* harmony import */ var _shared_components_entity_table_pipes_table_cell_icon_pipe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/components/entity-table/pipes/table-cell-icon.pipe */ "./src/app/shared/components/entity-table/pipes/table-cell-icon.pipe.ts");
/* harmony import */ var _shared_components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/components/entity-table/pipes/table-cell-text.pipe */ "./src/app/shared/components/entity-table/pipes/table-cell-text.pipe.ts");





var GemListConfigurationResolver = /** @class */ (function () {
    function GemListConfigurationResolver() {
    }
    GemListConfigurationResolver_1 = GemListConfigurationResolver;
    GemListConfigurationResolver.prototype.resolve = function (route, state) {
        return {
            filter: [
                {
                    column: 'TypeGem',
                    label: 'Type',
                    groupBy: _shared_domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_2__["TOSGemTypeService"].groupBy,
                    indexOf: _shared_domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_2__["TOSGemTypeService"].indexOf,
                    toString: _shared_domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_2__["TOSGemTypeService"].toString,
                },
            ],
            sortColumn: '$ID',
            tableColumns: GemListConfigurationResolver_1.COLUMNS,
        };
    };
    var GemListConfigurationResolver_1;
    GemListConfigurationResolver.COLUMNS = [
        { label: '', pipe: new _shared_components_entity_table_pipes_table_cell_icon_pipe__WEBPACK_IMPORTED_MODULE_3__["TableCellIconPipeDefinition"]('Icon'), class: 'p-1 text-center' },
        { label: '$ID', pipe: new _shared_components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_4__["TableCellTextPipeDefinition"]('$ID'), hideMobile: true },
        { label: 'Name', pipe: new _shared_components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_4__["TableCellTextPipeDefinition"]('Name'), wide: true },
        { label: 'Type', pipe: new _shared_components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_4__["TableCellTextPipeDefinition"]('TypeGem') },
    ];
    GemListConfigurationResolver = GemListConfigurationResolver_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
    ], GemListConfigurationResolver);
    return GemListConfigurationResolver;
}());



/***/ }),

/***/ "./src/app/database/resolvers/item-list-configuration.resolver.ts":
/*!************************************************************************!*\
  !*** ./src/app/database/resolvers/item-list-configuration.resolver.ts ***!
  \************************************************************************/
/*! exports provided: ItemListConfigurationResolver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ItemListConfigurationResolver", function() { return ItemListConfigurationResolver; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/domain/tos/tos-domain */ "./src/app/shared/domain/tos/tos-domain.ts");
/* harmony import */ var _shared_components_entity_table_pipes_table_cell_icon_pipe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/components/entity-table/pipes/table-cell-icon.pipe */ "./src/app/shared/components/entity-table/pipes/table-cell-icon.pipe.ts");
/* harmony import */ var _shared_components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/components/entity-table/pipes/table-cell-text.pipe */ "./src/app/shared/components/entity-table/pipes/table-cell-text.pipe.ts");





var ItemListConfigurationResolver = /** @class */ (function () {
    function ItemListConfigurationResolver() {
    }
    ItemListConfigurationResolver_1 = ItemListConfigurationResolver;
    ItemListConfigurationResolver.prototype.resolve = function (route, state) {
        return {
            filter: [
                {
                    column: 'Type',
                    groupBy: _shared_domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_2__["TOSItemTypeService"].groupBy,
                    indexOf: _shared_domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_2__["TOSItemTypeService"].indexOf,
                    toString: _shared_domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_2__["TOSItemTypeService"].toString,
                },
            ],
            sortColumn: '$ID',
            tableColumns: ItemListConfigurationResolver_1.COLUMNS,
        };
    };
    var ItemListConfigurationResolver_1;
    ItemListConfigurationResolver.COLUMNS = [
        { label: '', pipe: new _shared_components_entity_table_pipes_table_cell_icon_pipe__WEBPACK_IMPORTED_MODULE_3__["TableCellIconPipeDefinition"]('Icon'), class: 'p-1 text-center' },
        { label: '$ID', pipe: new _shared_components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_4__["TableCellTextPipeDefinition"]('$ID'), hideMobile: true },
        { label: 'Name', pipe: new _shared_components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_4__["TableCellTextPipeDefinition"]('Name'), wide: true },
        { label: 'Type', pipe: new _shared_components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_4__["TableCellTextPipeDefinition"]('Type') },
    ];
    ItemListConfigurationResolver.COLUMNS_MONSTERS = [
        { label: '', pipe: new _shared_components_entity_table_pipes_table_cell_icon_pipe__WEBPACK_IMPORTED_MODULE_3__["TableCellIconPipeDefinition"]('Icon'), class: 'p-1 text-center' },
        { label: '$ID', pipe: new _shared_components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_4__["TableCellTextPipeDefinition"]('$ID'), hideMobile: true },
        { label: 'Name', pipe: new _shared_components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_4__["TableCellTextPipeDefinition"]('Name'), wide: true },
        { label: 'Chance', pipe: new _shared_components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_4__["TableCellTextPipeDefinition"]('Chance', _shared_components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_4__["TableCellTextPipeFormat"].PERCENTAGE), class: 'text-nowrap' },
    ];
    ItemListConfigurationResolver.COLUMNS_MAPS = [
        { label: '$ID', pipe: new _shared_components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_4__["TableCellTextPipeDefinition"]('$ID'), hideMobile: true },
        { label: 'Name', pipe: new _shared_components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_4__["TableCellTextPipeDefinition"]('Name'), wide: true },
        { label: 'Chance', pipe: new _shared_components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_4__["TableCellTextPipeDefinition"]('Chance', _shared_components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_4__["TableCellTextPipeFormat"].PERCENTAGE), class: 'text-nowrap' },
    ];
    ItemListConfigurationResolver = ItemListConfigurationResolver_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
    ], ItemListConfigurationResolver);
    return ItemListConfigurationResolver;
}());



/***/ }),

/***/ "./src/app/database/resolvers/job-list-configuration.resolver.ts":
/*!***********************************************************************!*\
  !*** ./src/app/database/resolvers/job-list-configuration.resolver.ts ***!
  \***********************************************************************/
/*! exports provided: JobListConfigurationResolver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JobListConfigurationResolver", function() { return JobListConfigurationResolver; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/domain/tos/tos-domain */ "./src/app/shared/domain/tos/tos-domain.ts");
/* harmony import */ var _shared_components_entity_table_pipes_table_cell_icon_pipe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/components/entity-table/pipes/table-cell-icon.pipe */ "./src/app/shared/components/entity-table/pipes/table-cell-icon.pipe.ts");
/* harmony import */ var _shared_components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/components/entity-table/pipes/table-cell-text.pipe */ "./src/app/shared/components/entity-table/pipes/table-cell-text.pipe.ts");
/* harmony import */ var _shared_components_entity_table_pipes_table_cell_link_pipe__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../shared/components/entity-table/pipes/table-cell-link.pipe */ "./src/app/shared/components/entity-table/pipes/table-cell-link.pipe.ts");






var JobListConfigurationResolver = /** @class */ (function () {
    function JobListConfigurationResolver() {
    }
    JobListConfigurationResolver_1 = JobListConfigurationResolver;
    JobListConfigurationResolver.prototype.resolve = function (route, state) {
        return {
            filter: [
                {
                    column: 'JobDifficulty',
                    label: 'Difficulty',
                    groupBy: _shared_domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_2__["TOSJobDifficultyService"].groupBy,
                    indexOf: _shared_domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_2__["TOSJobDifficultyService"].indexOf,
                    toString: _shared_domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_2__["TOSJobDifficultyService"].toString,
                },
                {
                    column: 'JobTree',
                    label: 'Tree',
                    groupBy: _shared_domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_2__["TOSJobTreeService"].groupBy,
                    indexOf: _shared_domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_2__["TOSJobTreeService"].indexOf,
                    toString: _shared_domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_2__["TOSJobTreeService"].toString,
                },
            ],
            sortColumn: '$ID',
            tableColumns: JobListConfigurationResolver_1.COLUMNS,
        };
    };
    var JobListConfigurationResolver_1;
    JobListConfigurationResolver.COLUMNS = [
        { label: '', pipe: new _shared_components_entity_table_pipes_table_cell_icon_pipe__WEBPACK_IMPORTED_MODULE_3__["TableCellIconPipeDefinition"]('Icon'), class: 'p-1 text-center' },
        { label: '$ID', pipe: new _shared_components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_4__["TableCellTextPipeDefinition"]('$ID'), hideMobile: true },
        { label: 'Name', pipe: new _shared_components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_4__["TableCellTextPipeDefinition"]('Name'), wide: true },
        { label: 'Attributes', pipe: new _shared_components_entity_table_pipes_table_cell_link_pipe__WEBPACK_IMPORTED_MODULE_5__["TableCellLinkPipeDefinition"]('Link_Attributes'), class: 'p-1 text-nowrap' },
        { label: 'Difficulty', pipe: new _shared_components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_4__["TableCellTextPipeDefinition"]('JobDifficulty'), hideMobile: true },
        { label: 'Tree', pipe: new _shared_components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_4__["TableCellTextPipeDefinition"]('JobTree') },
    ];
    JobListConfigurationResolver = JobListConfigurationResolver_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
    ], JobListConfigurationResolver);
    return JobListConfigurationResolver;
}());



/***/ }),

/***/ "./src/app/database/resolvers/map-list-configuration.resolver.ts":
/*!***********************************************************************!*\
  !*** ./src/app/database/resolvers/map-list-configuration.resolver.ts ***!
  \***********************************************************************/
/*! exports provided: MapListConfigurationResolver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MapListConfigurationResolver", function() { return MapListConfigurationResolver; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/components/entity-table/pipes/table-cell-text.pipe */ "./src/app/shared/components/entity-table/pipes/table-cell-text.pipe.ts");
/* harmony import */ var _shared_components_entity_table_pipes_table_cell_number_pipe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/components/entity-table/pipes/table-cell-number.pipe */ "./src/app/shared/components/entity-table/pipes/table-cell-number.pipe.ts");
/* harmony import */ var _shared_components_entity_table_pipes_table_cell_icon_pipe__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/components/entity-table/pipes/table-cell-icon.pipe */ "./src/app/shared/components/entity-table/pipes/table-cell-icon.pipe.ts");





var MapListConfigurationResolver = /** @class */ (function () {
    function MapListConfigurationResolver() {
    }
    MapListConfigurationResolver_1 = MapListConfigurationResolver;
    MapListConfigurationResolver.prototype.resolve = function (route, state) {
        return {
            filter: [
                {
                    column: 'HasChallengeMode',
                    label: 'ChallengeMode',
                    groupBy: function () { return [{ options: ['Yes'] }]; },
                    indexOf: function (value) { return value == 'Yes' ? -1 : -2; },
                    toString: function (value) { return value ? 'Yes' : null; },
                },
                {
                    column: 'HasWarp',
                    label: 'Warp',
                    groupBy: function () { return [{ options: ['Yes'] }]; },
                    indexOf: function (value) { return value == 'Yes' ? -1 : -2; },
                    toString: function (value) { return value ? 'Yes' : null; },
                },
            ],
            sortColumn: '$ID',
            tableColumns: MapListConfigurationResolver_1.COLUMNS,
        };
    };
    var MapListConfigurationResolver_1;
    MapListConfigurationResolver.COLUMNS = [
        { label: '$ID', pipe: new _shared_components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_2__["TableCellTextPipeDefinition"]('$ID'), hideMobile: true },
        { label: 'Name', pipe: new _shared_components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_2__["TableCellTextPipeDefinition"]('Name'), wide: true },
        { label: 'Level', pipe: new _shared_components_entity_table_pipes_table_cell_number_pipe__WEBPACK_IMPORTED_MODULE_3__["TableCellNumberPipeDefinition"]('Level') },
        { label: 'Rank', pipe: new _shared_components_entity_table_pipes_table_cell_number_pipe__WEBPACK_IMPORTED_MODULE_3__["TableCellNumberPipeDefinition"]('Stars'), hideMobile: true },
        { label: 'Type', pipe: new _shared_components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_2__["TableCellTextPipeDefinition"]('Type') },
    ];
    MapListConfigurationResolver.COLUMNS_ITEMS = [
        { label: '', pipe: new _shared_components_entity_table_pipes_table_cell_icon_pipe__WEBPACK_IMPORTED_MODULE_4__["TableCellIconPipeDefinition"]('Icon'), class: 'p-1 text-center' },
        { label: '$ID', pipe: new _shared_components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_2__["TableCellTextPipeDefinition"]('$ID'), hideMobile: true },
        { label: 'Name', pipe: new _shared_components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_2__["TableCellTextPipeDefinition"]('Name'), wide: true },
        { label: 'Quantity', pipe: new _shared_components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_2__["TableCellTextPipeDefinition"]('Quantity_MIN.Quantity_MAX', _shared_components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_2__["TableCellTextPipeFormat"].QUANTITY_RANGE), class: 'text-nowrap' },
        { label: 'Chance', pipe: new _shared_components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_2__["TableCellTextPipeDefinition"]('Chance', _shared_components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_2__["TableCellTextPipeFormat"].PERCENTAGE), class: 'text-nowrap' },
    ];
    MapListConfigurationResolver.COLUMNS_NPCS = [
        { label: '', pipe: new _shared_components_entity_table_pipes_table_cell_icon_pipe__WEBPACK_IMPORTED_MODULE_4__["TableCellIconPipeDefinition"]('Icon'), class: 'p-1 text-center' },
        { label: '$ID', pipe: new _shared_components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_2__["TableCellTextPipeDefinition"]('$ID'), hideMobile: true },
        { label: 'Name', pipe: new _shared_components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_2__["TableCellTextPipeDefinition"]('Name'), wide: true },
        { label: 'Population', pipe: new _shared_components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_2__["TableCellTextPipeDefinition"]('Population', _shared_components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_2__["TableCellTextPipeFormat"].QUANTITY), class: 'text-nowrap' },
        { label: 'Respawn', pipe: new _shared_components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_2__["TableCellTextPipeDefinition"]('TimeRespawn', _shared_components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_2__["TableCellTextPipeFormat"].TIME), class: 'text-nowrap' },
    ];
    MapListConfigurationResolver = MapListConfigurationResolver_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
    ], MapListConfigurationResolver);
    return MapListConfigurationResolver;
}());



/***/ }),

/***/ "./src/app/database/resolvers/monster-list-configuration.resolver.ts":
/*!***************************************************************************!*\
  !*** ./src/app/database/resolvers/monster-list-configuration.resolver.ts ***!
  \***************************************************************************/
/*! exports provided: MonsterListConfigurationResolver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MonsterListConfigurationResolver", function() { return MonsterListConfigurationResolver; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/domain/tos/tos-domain */ "./src/app/shared/domain/tos/tos-domain.ts");
/* harmony import */ var _shared_components_entity_table_pipes_table_cell_icon_pipe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/components/entity-table/pipes/table-cell-icon.pipe */ "./src/app/shared/components/entity-table/pipes/table-cell-icon.pipe.ts");
/* harmony import */ var _shared_components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/components/entity-table/pipes/table-cell-text.pipe */ "./src/app/shared/components/entity-table/pipes/table-cell-text.pipe.ts");
/* harmony import */ var _shared_components_entity_table_pipes_table_cell_number_pipe__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../shared/components/entity-table/pipes/table-cell-number.pipe */ "./src/app/shared/components/entity-table/pipes/table-cell-number.pipe.ts");






var MonsterListConfigurationResolver = /** @class */ (function () {
    function MonsterListConfigurationResolver() {
    }
    MonsterListConfigurationResolver_1 = MonsterListConfigurationResolver;
    MonsterListConfigurationResolver.prototype.resolve = function (route, state) {
        return {
            filter: [
                {
                    column: 'Armor',
                    groupBy: _shared_domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_2__["TOSEquipmentMaterialService"].groupBy,
                    indexOf: _shared_domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_2__["TOSEquipmentMaterialService"].indexOf,
                    toString: _shared_domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_2__["TOSEquipmentMaterialService"].toString,
                },
                {
                    column: 'Element',
                    groupBy: _shared_domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_2__["TOSElementService"].groupBy,
                    indexOf: _shared_domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_2__["TOSElementService"].indexOf,
                    toString: _shared_domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_2__["TOSElementService"].toString,
                },
                {
                    column: 'Race',
                    groupBy: _shared_domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_2__["TOSMonsterRaceService"].groupBy,
                    indexOf: _shared_domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_2__["TOSMonsterRaceService"].indexOf,
                    toString: _shared_domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_2__["TOSMonsterRaceService"].toString,
                },
                {
                    column: 'Rank',
                    groupBy: _shared_domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_2__["TOSMonsterRankService"].groupBy,
                    indexOf: _shared_domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_2__["TOSMonsterRankService"].indexOf,
                    toString: _shared_domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_2__["TOSMonsterRankService"].toString,
                },
                {
                    column: 'Size',
                    groupBy: _shared_domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_2__["TOSMonsterSizeService"].groupBy,
                    indexOf: _shared_domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_2__["TOSMonsterSizeService"].indexOf,
                    toString: _shared_domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_2__["TOSMonsterSizeService"].toString,
                },
            ],
            sortColumn: '$ID',
            tableColumns: MonsterListConfigurationResolver_1.COLUMNS,
        };
    };
    var MonsterListConfigurationResolver_1;
    MonsterListConfigurationResolver.COLUMNS = [
        { label: '', pipe: new _shared_components_entity_table_pipes_table_cell_icon_pipe__WEBPACK_IMPORTED_MODULE_3__["TableCellIconPipeDefinition"]('Icon'), class: 'p-1 text-center' },
        { label: '$ID', pipe: new _shared_components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_4__["TableCellTextPipeDefinition"]('$ID'), hideMobile: true },
        { label: 'Name', pipe: new _shared_components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_4__["TableCellTextPipeDefinition"]('Name'), wide: true },
        { label: 'Armor', pipe: new _shared_components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_4__["TableCellTextPipeDefinition"]('Armor'), hideMobile: true },
        { label: 'Element', pipe: new _shared_components_entity_table_pipes_table_cell_icon_pipe__WEBPACK_IMPORTED_MODULE_3__["TableCellIconPipeDefinition"]('Element', _shared_domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_2__["TOSElementService"].icon), class: 'p-1 text-center', hideMobile: true },
        { label: 'Level', pipe: new _shared_components_entity_table_pipes_table_cell_number_pipe__WEBPACK_IMPORTED_MODULE_5__["TableCellNumberPipeDefinition"]('Level'), hideMobile: true },
        { label: 'Race', pipe: new _shared_components_entity_table_pipes_table_cell_icon_pipe__WEBPACK_IMPORTED_MODULE_3__["TableCellIconPipeDefinition"]('Race', _shared_domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_2__["TOSMonsterRaceService"].icon), class: 'p-1 text-center', hideMobile: true },
        { label: 'Rank', pipe: new _shared_components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_4__["TableCellTextPipeDefinition"]('Rank') },
        { label: 'Size', pipe: new _shared_components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_4__["TableCellTextPipeDefinition"]('Size'), hideMobile: true },
    ];
    MonsterListConfigurationResolver.COLUMNS_ITEMS = [
        { label: '', pipe: new _shared_components_entity_table_pipes_table_cell_icon_pipe__WEBPACK_IMPORTED_MODULE_3__["TableCellIconPipeDefinition"]('Icon'), class: 'p-1 text-center' },
        { label: '$ID', pipe: new _shared_components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_4__["TableCellTextPipeDefinition"]('$ID'), hideMobile: true },
        { label: 'Name', pipe: new _shared_components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_4__["TableCellTextPipeDefinition"]('Name'), wide: true },
        { label: 'Quantity', pipe: new _shared_components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_4__["TableCellTextPipeDefinition"]('Quantity_MIN.Quantity_MAX', _shared_components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_4__["TableCellTextPipeFormat"].QUANTITY_RANGE), class: 'text-nowrap' },
        { label: 'Chance', pipe: new _shared_components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_4__["TableCellTextPipeDefinition"]('Chance', _shared_components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_4__["TableCellTextPipeFormat"].PERCENTAGE), class: 'text-nowrap' },
    ];
    MonsterListConfigurationResolver.COLUMNS_MAPS = [
        { label: '$ID', pipe: new _shared_components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_4__["TableCellTextPipeDefinition"]('$ID'), hideMobile: true },
        { label: 'Name', pipe: new _shared_components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_4__["TableCellTextPipeDefinition"]('Name'), wide: true },
        { label: 'Population', pipe: new _shared_components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_4__["TableCellTextPipeDefinition"]('Population', _shared_components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_4__["TableCellTextPipeFormat"].QUANTITY), class: 'text-nowrap' },
        { label: 'Respawn', pipe: new _shared_components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_4__["TableCellTextPipeDefinition"]('TimeRespawn', _shared_components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_4__["TableCellTextPipeFormat"].TIME), class: 'text-nowrap' },
    ];
    MonsterListConfigurationResolver = MonsterListConfigurationResolver_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
    ], MonsterListConfigurationResolver);
    return MonsterListConfigurationResolver;
}());



/***/ }),

/***/ "./src/app/database/resolvers/recipe-list-configuration.resolver.ts":
/*!**************************************************************************!*\
  !*** ./src/app/database/resolvers/recipe-list-configuration.resolver.ts ***!
  \**************************************************************************/
/*! exports provided: RecipeListConfigurationResolver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RecipeListConfigurationResolver", function() { return RecipeListConfigurationResolver; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/components/entity-table/pipes/table-cell-text.pipe */ "./src/app/shared/components/entity-table/pipes/table-cell-text.pipe.ts");
/* harmony import */ var _shared_components_entity_table_pipes_table_cell_link_pipe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/components/entity-table/pipes/table-cell-link.pipe */ "./src/app/shared/components/entity-table/pipes/table-cell-link.pipe.ts");
/* harmony import */ var _shared_components_entity_table_pipes_table_cell_icon_pipe__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/components/entity-table/pipes/table-cell-icon.pipe */ "./src/app/shared/components/entity-table/pipes/table-cell-icon.pipe.ts");





var RecipeListConfigurationResolver = /** @class */ (function () {
    function RecipeListConfigurationResolver() {
    }
    RecipeListConfigurationResolver_1 = RecipeListConfigurationResolver;
    RecipeListConfigurationResolver.prototype.resolve = function (route, state) {
        return {
            sortColumn: '$ID',
            tableColumns: RecipeListConfigurationResolver_1.COLUMNS,
        };
    };
    var RecipeListConfigurationResolver_1;
    RecipeListConfigurationResolver.COLUMNS = [
        { label: '', pipe: new _shared_components_entity_table_pipes_table_cell_link_pipe__WEBPACK_IMPORTED_MODULE_3__["TableCellLinkPipeDefinition"]('Link_Target'), class: 'p-1' },
        { label: '$ID', pipe: new _shared_components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_2__["TableCellTextPipeDefinition"]('$ID'), hideMobile: true },
        { label: 'Name', pipe: new _shared_components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_2__["TableCellTextPipeDefinition"]('Name'), wide: true },
        { label: 'Materials', pipe: new _shared_components_entity_table_pipes_table_cell_link_pipe__WEBPACK_IMPORTED_MODULE_3__["TableCellLinkPipeDefinition"]('Link_Materials', function (o) { return o.Quantity; }), class: 'p-1 text-nowrap' }
    ];
    RecipeListConfigurationResolver.COLUMNS_MATERIALS = [
        { label: '', pipe: new _shared_components_entity_table_pipes_table_cell_icon_pipe__WEBPACK_IMPORTED_MODULE_4__["TableCellIconPipeDefinition"]('Icon'), class: 'p-1 text-center' },
        { label: '$ID', pipe: new _shared_components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_2__["TableCellTextPipeDefinition"]('$ID'), hideMobile: true },
        { label: 'Name', pipe: new _shared_components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_2__["TableCellTextPipeDefinition"]('Name'), wide: true },
        { label: 'Quantity', pipe: new _shared_components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_2__["TableCellTextPipeDefinition"]('Quantity', _shared_components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_2__["TableCellTextPipeFormat"].QUANTITY), class: 'text-nowrap' },
    ];
    RecipeListConfigurationResolver = RecipeListConfigurationResolver_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
    ], RecipeListConfigurationResolver);
    return RecipeListConfigurationResolver;
}());



/***/ }),

/***/ "./src/app/database/resolvers/skill-list-configuration.resolver.ts":
/*!*************************************************************************!*\
  !*** ./src/app/database/resolvers/skill-list-configuration.resolver.ts ***!
  \*************************************************************************/
/*! exports provided: SkillListConfigurationResolver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SkillListConfigurationResolver", function() { return SkillListConfigurationResolver; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/domain/tos/tos-domain */ "./src/app/shared/domain/tos/tos-domain.ts");
/* harmony import */ var _shared_components_entity_table_pipes_table_cell_icon_pipe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/components/entity-table/pipes/table-cell-icon.pipe */ "./src/app/shared/components/entity-table/pipes/table-cell-icon.pipe.ts");
/* harmony import */ var _shared_components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/components/entity-table/pipes/table-cell-text.pipe */ "./src/app/shared/components/entity-table/pipes/table-cell-text.pipe.ts");
/* harmony import */ var _shared_components_entity_table_pipes_table_cell_link_pipe__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../shared/components/entity-table/pipes/table-cell-link.pipe */ "./src/app/shared/components/entity-table/pipes/table-cell-link.pipe.ts");






var SkillListConfigurationResolver = /** @class */ (function () {
    function SkillListConfigurationResolver() {
    }
    SkillListConfigurationResolver_1 = SkillListConfigurationResolver;
    SkillListConfigurationResolver.prototype.resolve = function (route, state) {
        return {
            filter: [
                {
                    column: 'RequiredStanceCompanion',
                    label: 'Companion',
                    groupBy: _shared_domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_2__["TOSSkillRequiredStanceCompanionService"].groupBy,
                    indexOf: _shared_domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_2__["TOSSkillRequiredStanceCompanionService"].indexOf,
                    toString: _shared_domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_2__["TOSSkillRequiredStanceCompanionService"].toString,
                },
                {
                    column: 'Element',
                    groupBy: _shared_domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_2__["TOSElementService"].groupBy,
                    indexOf: _shared_domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_2__["TOSElementService"].indexOf,
                    toString: _shared_domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_2__["TOSElementService"].toString,
                },
                {
                    column: 'IsEnchanter',
                    label: 'Enchanter',
                    groupBy: function () { return [{ options: ['Yes'] }]; },
                    indexOf: function (value) { return value == 'Yes' ? -1 : -2; },
                    toString: function (value) { return value ? 'Yes' : null; },
                },
                {
                    column: 'IsPardoner',
                    label: 'Pardoner',
                    groupBy: function () { return [{ options: ['Yes'] }]; },
                    indexOf: function (value) { return value == 'Yes' ? -1 : -2; },
                    toString: function (value) { return value ? 'Yes' : null; },
                },
                {
                    column: 'IsRunecaster',
                    label: 'Runecaster',
                    groupBy: function () { return [{ options: ['Yes'] }]; },
                    indexOf: function (value) { return value == 'Yes' ? -1 : -2; },
                    toString: function (value) { return value ? 'Yes' : null; },
                },
                {
                    column: 'IsShinobi',
                    label: 'Shinobi',
                    groupBy: function () { return [{ options: ['Yes'] }]; },
                    indexOf: function (value) { return value == 'Yes' ? -1 : -2; },
                    toString: function (value) { return value ? 'Yes' : null; },
                },
            ],
            sortColumn: '$ID',
            tableColumns: SkillListConfigurationResolver_1.COLUMNS,
        };
    };
    var SkillListConfigurationResolver_1;
    SkillListConfigurationResolver.COLUMNS = [
        { label: '', pipe: new _shared_components_entity_table_pipes_table_cell_icon_pipe__WEBPACK_IMPORTED_MODULE_3__["TableCellIconPipeDefinition"]('Icon'), class: 'p-1 text-center' },
        { label: '$ID', pipe: new _shared_components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_4__["TableCellTextPipeDefinition"]('$ID'), hideMobile: true },
        { label: 'Name', pipe: new _shared_components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_4__["TableCellTextPipeDefinition"]('Name'), wide: true },
        { label: 'Attributes', pipe: new _shared_components_entity_table_pipes_table_cell_link_pipe__WEBPACK_IMPORTED_MODULE_5__["TableCellLinkPipeDefinition"]('Link_Attributes'), class: 'p-1 text-nowrap' },
        { label: 'Class', pipe: new _shared_components_entity_table_pipes_table_cell_link_pipe__WEBPACK_IMPORTED_MODULE_5__["TableCellLinkPipeDefinition"]('Link_Job'), class: 'p-1' }
    ];
    SkillListConfigurationResolver = SkillListConfigurationResolver_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
    ], SkillListConfigurationResolver);
    return SkillListConfigurationResolver;
}());



/***/ }),

/***/ "./src/app/home/home.module.ts":
/*!*************************************!*\
  !*** ./src/app/home/home.module.ts ***!
  \*************************************/
/*! exports provided: HomeModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeModule", function() { return HomeModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _welcome_welcome_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./welcome/welcome.component */ "./src/app/home/welcome/welcome.component.ts");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var _patreon_patreon_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./patreon/patreon.component */ "./src/app/home/patreon/patreon.component.ts");





var HomeModule = /** @class */ (function () {
    function HomeModule() {
    }
    HomeModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_3__["SharedModule"],
            ],
            declarations: [
                _welcome_welcome_component__WEBPACK_IMPORTED_MODULE_2__["WelcomeComponent"],
                _patreon_patreon_component__WEBPACK_IMPORTED_MODULE_4__["PatreonComponent"]
            ],
        })
    ], HomeModule);
    return HomeModule;
}());



/***/ }),

/***/ "./src/app/home/patreon/patreon.component.html":
/*!*****************************************************!*\
  !*** ./src/app/home/patreon/patreon.component.html ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"d-flex align-items-center justify-content-between\">\n  <div>\n    <h2>Thank you!</h2></div>\n  <div>\n    <a class=\"d-none d-sm-inline btn-patreon\" href=\"https://www.patreon.com/bePatron?u=16097026\">\n      <img src=\"/assets/images/logo_patreon.png\" height=\"20\" width=\"20\" />\n      <span>Become a patron</span>\n    </a>\n  </div>\n</div>\n<p class=\"mb-5\">Thanks to all tos.guru patrons for keeping the server up and supporting the development!</p>\n\n<div class=\"d-flex flex-wrap justify-content-around mb-4\" *ngIf=\"PatreonService.PATRONS_KUPOLE.length\">\n  <div class=\"d-flex col-6 col-md-4 col-xl-3 align-items-center mb-3\" *ngFor=\"let patron of PatreonService.PATRONS_KUPOLE\">\n    <img height=\"64\" width=\"64\" class=\"p-1 rounded-circle\" style=\"background: #F1C40F; box-shadow: 0 0 2rem #F1C40F\"\n         [src]=\"'/assets/images/emoticons/' + emoticon(patron, PatreonService.EMOTICONS_KUPOLE)\" />\n    <span class=\"ml-3\">{{ patron }}</span>\n  </div>\n</div>\n\n<div class=\"d-flex flex-wrap justify-content-around mb-4\" *ngIf=\"PatreonService.PATRONS_POPOLION.length\">\n  <div class=\"d-flex col-6 col-md-4 col-xl-3 align-items-center mb-3\" *ngFor=\"let patron of PatreonService.PATRONS_POPOLION\">\n    <img height=\"60\" width=\"60\" class=\"p-1 rounded-circle\" style=\"background: #9B59B6; box-shadow: 0 0 1.5rem #9B59B6\"\n         [src]=\"'/assets/images/emoticons/' + emoticon(patron, PatreonService.EMOTICONS_POPOLION)\" />\n    <span class=\"ml-3\">{{ patron }}</span>\n  </div>\n</div>\n\n<div class=\"d-flex flex-wrap justify-content-around mb-4\" *ngIf=\"PatreonService.PATRONS_TINI.length\">\n  <div class=\"d-flex col-6 col-md-4 col-xl-3 align-items-center mb-3\" *ngFor=\"let patron of PatreonService.PATRONS_TINI\">\n    <img height=\"56\" width=\"56\" class=\"p-1 rounded-circle\" style=\"background: #3498DB; box-shadow: 0 0 1rem #3498DB\"\n         [src]=\"'/assets/images/emoticons/' + emoticon(patron, PatreonService.EMOTICONS_TINI)\" />\n    <span class=\"ml-3\">{{ patron }}</span>\n  </div>\n</div>\n\n<div class=\"d-flex flex-wrap justify-content-around mb-4\" *ngIf=\"PatreonService.PATRONS_KEPA.length\">\n  <div class=\"d-flex col-6 col-md-4 col-xl-3 align-items-center mb-3\" *ngFor=\"let patron of PatreonService.PATRONS_KEPA\">\n    <img height=\"52\" width=\"52\" class=\"bg-primary p-1 rounded-circle\"\n         [src]=\"'/assets/images/emoticons/' + emoticon(patron, PatreonService.EMOTICONS_KEPA)\" />\n    <span class=\"ml-3\">{{ patron }}</span>\n  </div>\n</div>\n\n<div class=\"d-flex justify-content-center mb-5\">\n  <a class=\"d-sm-none btn-patreon\" href=\"https://www.patreon.com/bePatron?u=16097026\">\n    <img src=\"/assets/images/logo_patreon.png\" height=\"20\" width=\"20\" />\n    <span>Become a patron</span>\n  </a>\n</div>\n"

/***/ }),

/***/ "./src/app/home/patreon/patreon.component.scss":
/*!*****************************************************!*\
  !*** ./src/app/home/patreon/patreon.component.scss ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".btn-patreon {\n  align-items: center;\n  background: #f96854;\n  color: white;\n  display: flex;\n  font-family: America, sans-serif;\n  font-size: 0.78rem !important;\n  font-weight: 800;\n  padding: 0.5rem 0.75rem;\n  text-transform: uppercase;\n  text-rendering: optimizelegibility;\n  transition: all 300ms cubic-bezier(0.19, 1, 0.22, 1) 0s;\n}\n\n.btn-patreon:hover {\n  text-decoration: none;\n  background-color: #fa7664;\n  border-color: #fa7664;\n  box-shadow: rgba(5, 45, 73, 0.098) 0 0.25rem 0.75rem;\n}\n\n.btn-patreon img {\n  margin-right: 0.5rem;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9mdW5naS9FL1Rvc1Byb2plY3QvVG9zR3VydUJhc2UvdG9zLWRhdGFiYXNlL3Rvcy13ZWIvc3JjL2FwcC9ob21lL3BhdHJlb24vcGF0cmVvbi5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvaG9tZS9wYXRyZW9uL3BhdHJlb24uY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxvQkFBQTtFQUNBLG9CQUFBO0VBQ0EsYUFBQTtFQUNBLGNBQUE7RUFDQSxpQ0FBQTtFQUNBLDhCQUFBO0VBQ0EsaUJBQUE7RUFDQSx3QkFBQTtFQUNBLDBCQUFBO0VBQ0EsbUNBQUE7RUFDQSx3REFBQTtDQ0NEOztBRENEO0VBQ0Usc0JBQUE7RUFDQSwwQkFBQTtFQUNBLHNCQUFBO0VBQ0EscURBQUE7Q0NFRDs7QURDRDtFQUNFLHFCQUFBO0NDRUQiLCJmaWxlIjoic3JjL2FwcC9ob21lL3BhdHJlb24vcGF0cmVvbi5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5idG4tcGF0cmVvbiB7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGJhY2tncm91bmQ6ICNmOTY4NTQ7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgZGlzcGxheTogZmxleDtcbiAgZm9udC1mYW1pbHk6IEFtZXJpY2EsIHNhbnMtc2VyaWY7XG4gIGZvbnQtc2l6ZTogMC43OHJlbSAhaW1wb3J0YW50O1xuICBmb250LXdlaWdodDogODAwO1xuICBwYWRkaW5nOiAwLjVyZW0gMC43NXJlbTtcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgdGV4dC1yZW5kZXJpbmc6IG9wdGltaXplbGVnaWJpbGl0eTtcbiAgdHJhbnNpdGlvbjogYWxsIDMwMG1zIGN1YmljLWJlemllcigwLjE5LCAxLCAwLjIyLCAxKSAwcztcbn1cbi5idG4tcGF0cmVvbjpob3ZlciB7XG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI1MCwgMTE4LCAxMDApO1xuICBib3JkZXItY29sb3I6IHJnYigyNTAsIDExOCwgMTAwKTtcbiAgYm94LXNoYWRvdzogcmdiYSg1LCA0NSwgNzMsIDAuMDk4KSAwIDAuMjVyZW0gMC43NXJlbTtcbn1cblxuLmJ0bi1wYXRyZW9uIGltZyB7XG4gIG1hcmdpbi1yaWdodDogMC41cmVtO1xufVxuIiwiLmJ0bi1wYXRyZW9uIHtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgYmFja2dyb3VuZDogI2Y5Njg1NDtcbiAgY29sb3I6IHdoaXRlO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmb250LWZhbWlseTogQW1lcmljYSwgc2Fucy1zZXJpZjtcbiAgZm9udC1zaXplOiAwLjc4cmVtICFpbXBvcnRhbnQ7XG4gIGZvbnQtd2VpZ2h0OiA4MDA7XG4gIHBhZGRpbmc6IDAuNXJlbSAwLjc1cmVtO1xuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICB0ZXh0LXJlbmRlcmluZzogb3B0aW1pemVsZWdpYmlsaXR5O1xuICB0cmFuc2l0aW9uOiBhbGwgMzAwbXMgY3ViaWMtYmV6aWVyKDAuMTksIDEsIDAuMjIsIDEpIDBzO1xufVxuXG4uYnRuLXBhdHJlb246aG92ZXIge1xuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmYTc2NjQ7XG4gIGJvcmRlci1jb2xvcjogI2ZhNzY2NDtcbiAgYm94LXNoYWRvdzogcmdiYSg1LCA0NSwgNzMsIDAuMDk4KSAwIDAuMjVyZW0gMC43NXJlbTtcbn1cblxuLmJ0bi1wYXRyZW9uIGltZyB7XG4gIG1hcmdpbi1yaWdodDogMC41cmVtO1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/home/patreon/patreon.component.ts":
/*!***************************************************!*\
  !*** ./src/app/home/patreon/patreon.component.ts ***!
  \***************************************************/
/*! exports provided: PatreonComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PatreonComponent", function() { return PatreonComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _patreon_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./patreon.service */ "./src/app/home/patreon/patreon.service.ts");



var PatreonComponent = /** @class */ (function () {
    function PatreonComponent() {
        this.PatreonService = _patreon_service__WEBPACK_IMPORTED_MODULE_2__["PatreonService"];
    }
    PatreonComponent.prototype.emoticon = function (name, emoticons) {
        var hash = 0;
        for (var i = 0; i < name.length; i++)
            hash += name.charCodeAt(i);
        return emoticons[hash % emoticons.length];
    };
    PatreonComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'tos-patreon',
            template: __webpack_require__(/*! ./patreon.component.html */ "./src/app/home/patreon/patreon.component.html"),
            styles: [__webpack_require__(/*! ./patreon.component.scss */ "./src/app/home/patreon/patreon.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], PatreonComponent);
    return PatreonComponent;
}());



/***/ }),

/***/ "./src/app/home/patreon/patreon.service.ts":
/*!*************************************************!*\
  !*** ./src/app/home/patreon/patreon.service.ts ***!
  \*************************************************/
/*! exports provided: PatreonService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PatreonService", function() { return PatreonService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var KEY_PATREON = 'patreon';
var PATRONS = JSON.parse(document.getElementById('tos-patreon').innerText);
var PatreonService = /** @class */ (function () {
    function PatreonService() {
    }
    Object.defineProperty(PatreonService, "PATRONS_KEPA", {
        get: function () { return PATRONS[PatreonTier.KEPA] || []; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(PatreonService, "PATRONS_KUPOLE", {
        get: function () { return PATRONS[PatreonTier.KUPOLE] || []; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(PatreonService, "PATRONS_POPOLION", {
        get: function () { return PATRONS[PatreonTier.POPOLION] || []; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(PatreonService, "PATRONS_TINI", {
        get: function () { return PATRONS[PatreonTier.TINI] || []; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(PatreonService, "all", {
        get: function () { return this.PATRONS_KEPA.concat(this.PATRONS_POPOLION).concat(this.PATRONS_TINI).concat(this.PATRONS_KUPOLE); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PatreonService, "count", {
        get: function () { return this.PATRONS_KEPA.length + this.PATRONS_POPOLION.length + this.PATRONS_TINI.length + this.PATRONS_KUPOLE.length; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PatreonService, "show", {
        get: function () { return localStorage.getItem(KEY_PATREON) == null || new Date(localStorage.getItem(KEY_PATREON)) < new Date(); },
        enumerable: true,
        configurable: true
    });
    PatreonService.dismiss = function () {
        // Dismiss for 5-10 days
        var dismiss = new Date();
        dismiss.setDate(dismiss.getDate() + (5 + Math.round(Math.random() * 5)));
        localStorage.setItem(KEY_PATREON, dismiss.toISOString());
    };
    PatreonService.random = function (count) {
        if (this.count <= count)
            return this.all;
        var result = [];
        var all = this.PATRONS_KEPA
            .concat(this.PATRONS_POPOLION)
            .concat(this.PATRONS_TINI)
            .concat(this.PATRONS_TINI)
            .concat(this.PATRONS_KUPOLE)
            .concat(this.PATRONS_KUPOLE)
            .concat(this.PATRONS_KUPOLE);
        while (count > 0) {
            var random = all[Math.floor(Math.random() * all.length)];
            if (result.indexOf(random) == -1) {
                result.push(random);
                count--;
            }
        }
        return result;
    };
    PatreonService.EMOTICONS_KEPA = ['emoticon_0002.png', 'emoticon_0003.png', 'emoticon_0028.png', 'emoticon_0029.png'];
    PatreonService.EMOTICONS_TINI = ['emoticon_0004.png', 'emoticon_0005.png', 'emoticon_0030.png', 'emoticon_0031.png', 'emoticon_0032.png', 'emoticon_0033.png', 'emoticon_0034.png', 'emoticon_0035.png', 'emoticon_0036.png'];
    PatreonService.EMOTICONS_POPOLION = ['emoticon_0006.png', 'emoticon_0008.png', 'emoticon_0009.png', 'emoticon_0010.png', 'emoticon_0011.png', 'emoticon_0012.png', 'emoticon_0013.png', 'emoticon_0014.png', 'emoticon_0015.png', 'emoticon_0016.png', 'emoticon_0017.png', 'emoticon_0018.png', 'emoticon_0019.png', 'emoticon_0020.png', 'emoticon_0021.png', 'emoticon_0022.png', 'emoticon_0023.png', 'emoticon_0037.png', 'emoticon_0038.png', 'emoticon_0039.png', 'emoticon_0040.png', 'emoticon_0041.png', 'emoticon_0042.png', 'emoticon_0043.png', 'emoticon_0044.png', 'emoticon_0045.png', 'emoticon_0046.png'];
    PatreonService.EMOTICONS_KUPOLE = ['kupole_emotion01.png', 'kupole_emotion02.png', 'kupole_emotion03.png', 'kupole_emotion04.png', 'kupole_emotion05.png', 'kupole_emotion06.png'];
    PatreonService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], PatreonService);
    return PatreonService;
}());

var PatreonTier;
(function (PatreonTier) {
    PatreonTier[PatreonTier["KEPA"] = 100] = "KEPA";
    PatreonTier[PatreonTier["TINI"] = 500] = "TINI";
    PatreonTier[PatreonTier["POPOLION"] = 1000] = "POPOLION";
    PatreonTier[PatreonTier["KUPOLE"] = 2000] = "KUPOLE";
})(PatreonTier || (PatreonTier = {}));


/***/ }),

/***/ "./src/app/home/welcome/welcome.component.html":
/*!*****************************************************!*\
  !*** ./src/app/home/welcome/welcome.component.html ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h2>Welcome to tos.guru!</h2>\n\n<div class=\"row\">\n\n  <div class=\"col-lg-6\">\n    <p>\n      This is an open-source database for Tree of Savior, a game being developed by IMC Games.<br/>\n    </p>\n\n    <p>\n      It is still in active development, taking multiple updates per week, with the latest patches and new features.\n      <span class=\"badge badge-success\">Re:Build</span> patch is already supported<br/>\n    </p>\n\n    <p>\n      Currently, a <a [routerLink]=\"routerLink('simulator')\">Skill Simulator</a> is available, making use of the in-game formulas to calculate skill damage, skill SP costs and attribute unlock logic.<br/>\n    </p>\n\n    <p>\n      A Database is also available, and currently supports the following datasets:\n    </p>\n    <ul *ngFor=\"let group of TOSDataSetService.VALUES; index as i\">\n      <li *ngFor=\"let option of group.options\">\n        <a [routerLink]=\"routerLink('database/' + TOSDataSetService.toUrl(option))\">{{ TOSDataSetService.toLabel(option) }}</a>\n      </li>\n    </ul>\n\n    <p>\n      <b>Found an issue?</b><br/>\n      <b>Try clearing the cache, by clicking on the version string at the footer</b><br/>\n      <b>If still present, please report it to @rjgtav on Discord</b>\n    </p>\n  </div>\n\n  <div class=\"col-lg-6\">\n    <div class=\"card bg-light\">\n      <div class=\"card-header\">\n        Changelog\n      </div>\n      <div class=\"card-body\" style=\"max-height: calc(100vh - 16rem); overflow-y: auto\">\n\n        <h6>2020-05-18</h6>\n        <ul>\n          <li><span class=\"badge badge-warning\">Fixed</span> Added support to EP 12 equipment</li>\n          <li><span class=\"badge badge-warning\">Fixed</span> Added support to SUBEXPORB item group and VELNAIS monster race</li>\n        </ul>\n\n        <h6>2019-12-27</h6>\n        <ul>\n          <li><span class=\"badge badge-info\">Notice</span> Merry Chritmas 🎅 and a Happy New Year 🎆!</li>\n          <li><span class=\"badge badge-warning\">Fixed</span> Added support to the new 4ever Arks, Classes, Trinkets, ...</li>\n        </ul>\n\n        <h6>2019-10-31</h6>\n        <ul>\n          <li><span class=\"badge badge-info\">Notice</span> Boo!👻</li>\n          <li><span class=\"badge badge-warning\">Fixed</span> Cooldown and SP are being calculated correctly again. Thanks <b>@PetroSpark</b></li>\n        </ul>\n\n        <h6>2019-10-28</h6>\n        <ul>\n          <li><span class=\"badge badge-warning\">Fixed</span> Added support for Special Costume skins (inside the Database &gt; Equipment section)</li>\n          <li><span class=\"badge badge-warning\">Fixed</span> Automatic updates are working again for all regions. Thanks <b>@xZeroGodx</b></li>\n          <li><span class=\"badge badge-info\">Notice</span> Sorry for the lack of updates but I haven't had much free time over the past months. I'm still working on a major rework for the entire website, you can follow the development over at my discord.</li>\n        </ul>\n\n        <h6>2019-06-29</h6>\n        <ul>\n          <li><span class=\"badge badge-warning\">Fixed</span> Translations are no longer missing for the new classes in the twTOS Simulator. Thanks <b>蘋果🍎</b></li>\n        </ul>\n\n        <h6>2019-06-25</h6>\n        <ul>\n          <li><span class=\"badge badge-warning\">Fixed</span> SkillFactors are being calculated again. Thanks <b>@PetroSpark</b>, <b>@Edoweiss</b>, <b>@Fenatte</b>, <b>@Kashou</b></li>\n          <li><span class=\"badge badge-warning\">Fixed</span> CaptionRatio2 for Heal is being calculated again. Thanks <b>@PetroSpark</b></li>\n          <li><span class=\"badge badge-info\">Notice</span> Sorry for the lack of updates but last month I've been finishing my university. I'm now back to reworking a big part of tos.guru to improve the performance, add more data, etc.</li>\n        </ul>\n\n        <h6>2019-05-17</h6>\n        <ul>\n          <li><span class=\"badge badge-warning\">Fixed</span> Search is now working correctly for twTOS. Thanks <b>@真庭赤狐</b></li>\n          <li><span class=\"badge badge-success\">Improved</span> Improved search for kTOS and kTEST</li>\n        </ul>\n\n        <h6>2019-05-12</h6>\n        <ul>\n          <li><span class=\"badge badge-warning\">Fixed</span> Added the missing drop information for some maps (e.g. Primus drop information in Astral Tower 1F). Thanks <b>@Liel</b></li>\n          <li><span class=\"badge badge-warning\">Fixed</span> Fixed the drop chance for the loot tables (e.g. Ruby's drop chance on Bauba's Cave). Thanks <b>@Liel</b></li>\n        </ul>\n\n        <h6>2019-05-11</h6>\n        <ul>\n          <li><span class=\"badge badge-success\">New</span> Added Maps, which includes an interactive minimap for visualizing the location of NPCs and Monsters spawns</li>\n          <li><span class=\"badge badge-success\">New</span> Added zone-level drop information (e.g. primus equipment and all other unidentified equipment)</li>\n          <li><span class=\"badge badge-success\">New</span> Added map exploration rewards</li>\n          <li><span class=\"badge badge-success\">New</span> Added Collections/Treasures locations</li>\n          <li><span class=\"badge badge-danger\">Bug</span> Loading time has increased, due to the new Map and NPC information</li>\n          <li><span class=\"badge badge-info\">Notice</span> Next I'll be working on significantly reducing the loading time and reduce the amount of bugs due to new game patches. World Map will be coming after.</li>\n        </ul>\n\n        <h6>2019-04-26</h6>\n        <ul>\n          <li><span class=\"badge badge-warning\">Fixed</span> Level cap has been updated to 420 (due to limitations this has been applied to all regions). Thanks <b>@PetroSpark</b></li>\n          <li><span class=\"badge badge-warning\">Fixed</span> kTOS and kTEST Skill cooldown and SP consumption is working again. Thanks <b>@PetroSpark</b></li>\n          <li><span class=\"badge badge-warning\">Fixed</span> Assassin's Hasisas has a working description again. Thanks <b>@Kashou</b></li>\n        </ul>\n\n        <h6>2019-04-19</h6>\n        <ul>\n          <li><span class=\"badge badge-info\">Notice</span> Sorry for taking so long to release a new update, IRL has been extremely busy. Next up it's Maps</li>\n          <li><span class=\"badge badge-success\">Improved</span> Revamped the entire offline mode from scratch. Should no longer fail to install when behind an antivirus or fail to open when the cache becomes corrupted</li>\n          <li><span class=\"badge badge-success\">Improved</span> Simplified the overall deployment process. The server will no longer crash by running out of memory and will update to the new game patches more quickly</li>\n          <li><span class=\"badge badge-success\">Improved</span> Import process now uses the entire LUA code from the client, which should lead to less crashes due to code refactoring</li>\n          <li><span class=\"badge badge-success\">Improved</span> Sharing a build as an URL or opening a linked build is now more reliable as it goes through my own webserver. Thanks <b>@Palemoon</b></li>\n          <li><span class=\"badge badge-warning\">Fixed</span> All images/icons will now always be extracted from kTEST (except for the region specific items)</li>\n          <li><span class=\"badge badge-warning\">Fixed</span> All monsters are now correctly calculating their atk/def values, even when using virtual equipment. Thanks <b>@acc97862</b>, <b>@Crevox</b></li>\n          <li><span class=\"badge badge-warning\">Fixed</span> Added missing monsters (e.g. Velcoffaner). Thanks <b>@Lubu20</b>, <b>@TerminalEssense</b></li>\n          <li><span class=\"badge badge-warning\">Fixed</span> Cooldown is working correctly again for Cleric classes</li>\n        </ul>\n\n        <h6>2019-02-08</h6>\n        <ul>\n          <li><span class=\"badge badge-success\">New</span> Added a 'Thank You' page for all the patrons, for supporting tos.guru!</li>\n          <li><span class=\"badge badge-success\">New</span> Added a message at the top thanking a random selection of patrons. You can dismiss this message for a week</li>\n        </ul>\n\n        <h6>2019-01-30</h6>\n        <ul>\n          <li><span class=\"badge badge-success\">New</span> Added Taiwanese TOS (twTOS) region. Thanks 蘋果🍎</li>\n          <li><span class=\"badge badge-warning\">Fixed</span> Fashion-related filters on the Equipment section are now working again. Thanks <b>@Muniqui</b></li>\n        </ul>\n\n        <h6>2019-01-27</h6>\n        <ul>\n          <li><span class=\"badge badge-success\">New</span> tos.guru will now automatically check for new game patches and update every hour (e.g. 09:15, 10:15, 11:15, ...)</li>\n          <li><span class=\"badge badge-warning\">Fixed</span> Added missing orange background color to Missile Skills (e.g. most Archer's Skills)</li>\n          <li><span class=\"badge badge-warning\">Fixed</span> Skill max levels are now being correctly calculated (e.g. Alchemist's Gem Roasting). Thanks <b>@Crevox </b><b>@Saiko </b><b>@Xvkr</b></li>\n          <li><span class=\"badge badge-warning\">Fixed</span> Some attributes (e.g. Frenzy: Enhance) is now correctly assigned to its skill. Thanks <b>@Skykyrie</b></li>\n          <li><span class=\"badge badge-warning\">Fixed</span> Database pages now show the correct total page number when filtering. Thanks <b>@Lamisedaxeh</b></li>\n          <li><span class=\"badge badge-warning\">Fixed</span> Mortal Slash cooldown is now being correctly calculated. Thanks <b>@Zeucleio</b></li>\n          <li><span class=\"badge badge-warning\">Fixed</span> Mortal Slash is no longer showing as 'Cloneable by Shinobi'. Thanks <b>@Zeucleio</b></li>\n          <li><span class=\"badge badge-warning\">Fixed</span> Updated Pardoner for Re:Build and added Runecaster filter to Skills page</li>\n          <li><span class=\"badge badge-warning\">Fixed</span> Added missing skill icons (again)</li>\n          <li><span class=\"badge badge-warning\">Fixed</span> tos.guru will now wait for at least 30 minutes before checking for updates again</li>\n        </ul>\n\n        <h6>2019-01-25</h6>\n        <ul>\n          <li><span class=\"badge badge-success\">Improved</span> Improved tap registration on the Skill Simulator on mobile</li>\n          <li><span class=\"badge badge-success\">Improved</span> Skill cooldown is now calculated using in-game scripts. Thanks <b>@Hillgarm</b> and <b>@muskekteer</b></li>\n          <li><span class=\"badge badge-success\">Improved</span> Minor design tweaks to the Formulas section of a Skill detail page</li>\n          <li><span class=\"badge badge-success\">Improved</span> Added support to attributes which are shared between multiple skills (e.g. Cannoneer's Detonate). Thanks <b>@Fenatte</b>, <b>@Isthelte</b> and <b>@PetroSpark</b></li>\n          <li><span class=\"badge badge-success\">Improved</span> Skill simulator now always shows the plus/minus buttons on mobile. Thanks <b>@Crevox</b></li>\n          <li><span class=\"badge badge-success\">Improved</span> You can now level a Skill beyond it's maximum level on its Database page. Thanks <b>@Crevox</b></li>\n          <li><span class=\"badge badge-warning\">Fixed</span> Skill factors no longer show as undefined when the translation uses some deprecated methods. (e.g. Snow Rolling) Thanks <b>@Jurcan</b></li>\n          <li><span class=\"badge badge-warning\">Fixed</span> Skill factors no longer fail to calculate when the code updates one of the skill's attributes. (e.g. Throw Sand) Thanks <b>@Xvkr </b><b>@Zeucleio </b><b>@Skykyrie</b></li>\n          <li><span class=\"badge badge-warning\">Fixed</span> Animated GIFs for the new classes (Assassin and Outlaw) are no longer missing</li>\n          <li><span class=\"badge badge-warning\">Fixed</span> Job Type/Role is now showing correctly again. Thanks <b>@Xvkr</b></li>\n          <li><span class=\"badge badge-warning\">Fixed</span> Skill synergy description color is now rendering correctly. Thanks <b>@marq</b> and <b>@Crevox</b></li>\n          <li><span class=\"badge badge-warning\">Fixed</span> Possible fix? for the ERR_FAILED error which plagued some users. Please ping me in case you see it again</li>\n          <li><span class=\"badge badge-warning\">Fixed</span> Possible fix? for header dropdown menus (e.g. Database and Region) which weren't opening at all on iOS Safari</li>\n        </ul>\n\n        <h6>2019-01-21</h6>\n        <ul>\n          <li><span class=\"badge badge-success\">New</span> Added a 'Clear cache' button to the loading screen in case it gets stuck while loading</li>\n          <li><span class=\"badge badge-success\">New</span> Added a 'Clear cache' button to the footer. (click the patch version to trigger)</li>\n          <li><span class=\"badge\">New</span> Added a 'Checking for updates...' notice to the header, to make it clearer when tos.guru is checking for updates</li>\n          <li><span class=\"badge badge-success\">Improved</span> tos.guru now automatically checks for updates every hour and updates to the latest game patches</li>\n          <li><span class=\"badge badge-success\">Improved</span> Cleaned up the design of the header and the footer</li>\n          <li><span class=\"badge badge-warning\">Fixed</span> Fixed installation issues for some users when they were running Kaspersky Antivirus</li>\n          <li><span class=\"badge badge-warning\">Fixed</span> Multiple reliability improvements when installing/updating tos.guru. Should be a bit slower, but will use less RAM and CPU</li>\n        </ul>\n\n        <h6>2019-01-12</h6>\n        <ul>\n          <li><span class=\"badge badge-secondary\">Updated</span> Updated iTOS, jTOS, kTOS and kTEST to the latest versions</li>\n          <li><span class=\"badge badge-success\">Improved</span> tos.guru will now display a message in case your browser isn't supported</li>\n          <li><span class=\"badge badge-success\">Improved</span> Reduced overall download size per region (~10MB -> ~2MB) when updating the database</li>\n          <li><span class=\"badge badge-success\">Improved</span> Improved overall response times when loading assets for the first time, by caching most of the website on CloudFlare</li>\n          <li><span class=\"badge badge-warning\">Fixed</span> Offline mode is now correctly caching all main pages (Database, Home and Simulator) from the start</li>\n        </ul>\n\n        <h6>2019-01-04</h6>\n        <ul>\n          <li><span class=\"badge badge-warning\">Fixed</span> Search is working again. Thanks <b>@Muniqui</b></li>\n          <li><span class=\"badge badge-warning\">Fixed</span> Equipment required classes and item tradability are showing correctly again. Thanks <b>@Hillgarm</b> and <b>@PetroSpark</b></li>\n        </ul>\n\n        <h6>2019-01-03</h6>\n        <ul>\n          <li>[Update] Updated iTOS, jTOS, kTOS and kTEST to the latest versions</li>\n          <li><span class=\"badge badge-success\">Improved</span> Added patch version to the loading screen and to the footer</li>\n        </ul>\n\n        <h6>2019-01-02</h6>\n        <ul>\n          <li><span class=\"badge badge-warning\">Fixed</span> Page no longer shows white when switching regions and using the dark theme. Thanks <b>@Crevox</b></li>\n          <li><span class=\"badge badge-warning\">Fixed</span> Internal database no longer gets into a state with incomplete data</li>\n          <li><span class=\"badge badge-warning\">Fixed</span> Offline mode is now working as intended</li>\n        </ul>\n\n        <h6>2019-01-01</h6>\n        <ul>\n          <li><span class=\"badge badge-info\">Notice</span> Happy New Year! 🐷</li>\n          <li><span class=\"badge badge-success\">New</span> tos.guru is now available offline! Note: in order to save disk, images will be cached on demand</li>\n          <li><span class=\"badge badge-success\">New</span> tos.guru can now be installed on Mobile and on PC (Browser Menu -> Add to Home Screen)</li>\n          <li><span class=\"badge badge-success\">New</span> Added a new fullscreen loading animation when new database updates are available</li>\n          <li><span class=\"badge badge-success\">New</span> Added a new 'Update is Available' indicator to the top menu</li>\n          <li><span class=\"badge badge-success\">New</span> I now have a Patreon! Become a patron and support the development of tos.guru</li>\n          <li><span class=\"badge badge-success\">Improved</span> Significantly reduced the overall RAM usage (by around 50%)</li>\n          <li><span class=\"badge badge-success\">Improved</span> Significantly reduced loading time when no new updates are available</li>\n          <li><span class=\"badge badge-success\">Improved</span> Reduced search loading time by removing the 'Description' field from the index</li>\n          <li><span class=\"badge badge-success\">Improved</span> Updated cache from a time-based to a hash-based implementation, which will reduce the overall network traffic</li>\n          <li><span class=\"badge badge-warning\">Fixed</span> Collections are no longer showing the wrong items in rare situations of duplicate IDs. Thanks <b>@Zeucleio</b></li>\n          <li><span class=\"badge badge-warning\">Fixed</span> Browsers now correctly prompt for translating the page when a foreign region is selected</li>\n          <li><span class=\"badge badge-warning\">Fixed</span> Search no longer crashes when returning Equipment Sets. Thanks <b>@Hillgarm</b> and <b>@Sujiru</b></li>\n          <li><span class=\"badge badge-warning\">Fixed</span> Restored stat attributes for some discontinued items (e.g. CAN05_101). Thanks <b>@Sujiru</b></li>\n          <li><span class=\"badge badge-danger\">Removed</span> Older browsers no longer support tos.guru. For more information, check the browsers in green <a href=\"https://caniuse.com/serviceworkers\">here</a></li>\n        </ul>\n\n        <h6>2018-12-26</h6>\n        <ul>\n          <li><span class=\"badge badge-warning\">Fixed</span> Skills of higher circles are now showing up correctly on the simulator. Thanks <b>@Ramon</b></li>\n          <li><span class=\"badge badge-warning\">Fixed</span> Search accuracy improved quite significantly. Thanks <b>@Crevox</b></li>\n        </ul>\n\n        <h6>2018-12-25</h6>\n        <ul>\n          <li>Ho ho ho 🎅</li>\n          <li><span class=\"badge badge-warning\">Fixed</span> Gems stats are no longer messed up. Thanks <b>@WhiteDwarf</b>, <b>@AmberRei</b> and <b>@Ramon</b></li>\n        </ul>\n\n        <h6>2018-12-24</h6>\n        <ul>\n          <li><span class=\"badge badge-success\">Improved</span> Added attributes to Classes and Skills list pages</li>\n          <li><span class=\"badge badge-success\">Improved</span> Improved tooltip's position so it doesn't cover the important bits as often</li>\n          <li><span class=\"badge badge-warning\">Fixed</span> Removed some more deprecated attributes. Thanks <b>@Ramon</b></li>\n          <li><span class=\"badge badge-warning\">Fixed</span> Fixed some simulator attribute unlock propagation issues. Thanks <b>@Ramon</b></li>\n        </ul>\n\n        <h6>2018-12-23</h6>\n        <ul>\n          <li><span class=\"badge badge-warning\">Fixed</span> Removed deprecated attributes that were re-introduced with the last update. Thanks <b>@Ramon</b>, <b>@Shinobi</b>, <b>@Umineko</b> and <b>@Zeucleio</b></li>\n          <li><span class=\"badge badge-warning\">Fixed</span> Classes on the Simulator are now ordered by ID instead of by Name. Thanks <b>@Crevox</b></li>\n        </ul>\n\n        <h6>2018-12-22</h6>\n        <ul>\n          <li><span class=\"badge badge-secondary\">Updated</span> Updated iTOS, jTOS, kTOS and kTEST to the latest versions</li>\n          <li><span class=\"badge badge-success\">Improved</span> Initial loading time has been reduced even further, however RAM requirements have increased. This will be addressed on the next update.</li>\n          <li><span class=\"badge badge-success\">Improved</span> Header dropdown menus now open immediately on mouse hover</li>\n          <li><span class=\"badge badge-success\">Improved</span> Improved search performance and reliability</li>\n          <li><span class=\"badge badge-success\">Improved</span> Entity detail pages now have more details for referenced entities (e.g. each collection on Tanu Flower's detail page now shows all the other items which also belong to those collections)</li>\n          <li><span class=\"badge badge-success\">Improved</span> Set the appropriate document language, to trigger the browser's Translate button. Note: this only works when opening the page, not when switching regions. Thanks <b>@Nekorin</b></li>\n          <li><span class=\"badge badge-warning\">Fixed</span> Rank 1 classes no longer show duplicated on the Simulator. Thanks <b>@PetroSpark</b>, <b>@Zeucleio</b>, <b>@Montz</b> and everyone else who reported!</li>\n          <li><span class=\"badge badge-warning\">Fixed</span> Shields/Shirts/Pants are no longer missing their +40 Anvil Enhancement bonus. Thanks <b>@Crevox</b></li>\n          <li><span class=\"badge badge-warning\">Fixed</span> Added missing elements to some skills descriptions (e.g. Monk's Energy Blast on Re:Build). Thanks <b>@4lkruzeth</b></li>\n          <li><span class=\"badge badge-warning\">Fixed</span> As per Re:Build, Cannons are now a 2-Handed Weapon on the Equipment list Type filter. Thanks <b>@Hillgarm</b> and <b>@Laynaria</b></li>\n          <li><span class=\"badge badge-warning\">Fixed</span> Mergen skills no longer show Crossbow as a possible stance. Thanks <b>@TerminalEssence</b></li>\n          <li><span class=\"badge badge-warning\">Fixed</span> Added missing class attributes (e.g. SwordMastery_DEForATK). Thanks <b>@Hillgarm</b></li>\n          <li><span class=\"badge badge-warning\">Fixed</span> Removed extra 0s on some skill description values (e.g. Paladin's Stone Skin on kTEST at level 3)</li>\n          <li><span class=\"badge badge-danger\">Removed</span> Removed Google Adsense test code, as Google continues rejecting serving ads to the website.</li>\n        </ul>\n\n        <h6>2018-12-06</h6>\n        <ul>\n          <li><span class=\"badge badge-secondary\">Updated</span> kTOS is now on Re:Build</li>\n          <li><span class=\"badge badge-secondary\">Updated</span> Updated iTOS, jTOS, kTOS and kTEST to the latest versions</li>\n        </ul>\n\n        <h6>2018-12-01</h6>\n        <ul>\n          <li><span class=\"badge badge-secondary\">Updated</span> Updated iTOS, jTOS, kTOS and kTEST to the latest versions</li>\n          <li><span class=\"badge badge-success\">Improved</span> Improved initial loading time and when changing regions</li>\n          <li><span class=\"badge badge-warning\">Fixed</span> Double Punch is no longer crashing on the detail page</li>\n        </ul>\n\n        <h6>2018-11-24</h6>\n        <ul>\n          <li><span class=\"badge badge-warning\">Fixed</span> kTEST Simulator no longer crashes on certain classes. Thanks <b>@Laynaria</b></li>\n          <li><span class=\"badge badge-warning\">Fixed</span> kTEST Gems (red, green, blue, white) are now showing all stat bonuses. Thanks <b>@KriLanze</b> + <b>@Cotoco</b></li>\n          <li><span class=\"badge badge-warning\">Fixed</span> iTOS, jTOS and kTOS are now able to level their skills again on the Skill detail page. Thanks <b>@TermiNekoEXence</b></li>\n        </ul>\n\n        <h6>2018-11-21</h6>\n        <ul>\n          <li><span class=\"badge badge-success\">New</span> Added SP formulas to Skill detail page</li>\n          <li><span class=\"badge badge-success\">New</span> Added a homepage with a brief introduction and a changelog</li>\n          <li><span class=\"badge badge-secondary\">Updated</span> Updated iTOS, jTOS, kTOS and kTEST to the latest versions</li>\n          <li><span class=\"badge badge-warning\">Fixed</span> Magical Attack no longer appears duplicated on an Equipment stats. Thanks <b>@Crevox</b></li>\n          <li><span class=\"badge badge-warning\">Fixed</span> Skill SP calculation now uses the in-game formulas</li>\n          <li><span class=\"badge badge-warning\">Fixed</span> Search now returns the correct results even on slower machines. Thanks <b>@TermiNekoEXence</b></li>\n          <li><span class=\"badge badge-warning\">Fixed</span> Removed invalid search results from the search index. Thanks <b>@Mia</b></li>\n          <li><span class=\"badge badge-warning\">Fixed</span> Monster detail page is no longer crashing</li>\n        </ul>\n\n        <h6>2018-11-16</h6>\n        <ul>\n          <li><span class=\"badge badge-success\">New</span> Added Stats to Re:Build Simulator</li>\n          <li><span class=\"badge badge-success\">Improved</span> When no more skill points are available, and you left click a skill at level &lt; levelMax, it now goes back to 0. Thanks <b>@PetroSpark</b></li>\n          <li><span class=\"badge badge-success\">Improved</span> Added 'Usable by Scout' icon to equipment tooltip and detail pages</li>\n          <li><span class=\"badge badge-success\">Improved</span> Updated cards' frames to the latest design. Thanks <b>@Crevox</b></li>\n          <li><span class=\"badge badge-warning\">Fixed</span> Chaplain is no longer considered a Secret class. Thanks <b>@Laynaria</b></li>\n          <li><span class=\"badge badge-warning\">Fixed</span> 'Summon'-like skills have been purged from all databases. Thanks <b>@Hillgarm</b></li>\n          <li><span class=\"badge badge-warning\">Fixed</span> Re:Build Simulator builds are again able to be shared around</li>\n        </ul>\n      </div>\n    </div>\n  </div>\n\n</div>\n"

/***/ }),

/***/ "./src/app/home/welcome/welcome.component.scss":
/*!*****************************************************!*\
  !*** ./src/app/home/welcome/welcome.component.scss ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2hvbWUvd2VsY29tZS93ZWxjb21lLmNvbXBvbmVudC5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/home/welcome/welcome.component.ts":
/*!***************************************************!*\
  !*** ./src/app/home/welcome/welcome.component.ts ***!
  \***************************************************/
/*! exports provided: WelcomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WelcomeComponent", function() { return WelcomeComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_service_tos_url_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/service/tos-url.service */ "./src/app/shared/service/tos-url.service.ts");
/* harmony import */ var _shared_domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/domain/tos/tos-domain */ "./src/app/shared/domain/tos/tos-domain.ts");




var WelcomeComponent = /** @class */ (function () {
    function WelcomeComponent() {
        this.TOSDataSetService = _shared_domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_3__["TOSDataSetService"];
    }
    WelcomeComponent.prototype.routerLink = function (url) {
        return _shared_service_tos_url_service__WEBPACK_IMPORTED_MODULE_2__["TOSUrlService"].Route(url);
    };
    WelcomeComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
            selector: 'tos-welcome',
            template: __webpack_require__(/*! ./welcome.component.html */ "./src/app/home/welcome/welcome.component.html"),
            styles: [__webpack_require__(/*! ./welcome.component.scss */ "./src/app/home/welcome/welcome.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], WelcomeComponent);
    return WelcomeComponent;
}());



/***/ }),

/***/ "./src/app/shared/components/entity-detail/entity-detail-AttackDefense/entity-detail-AttackDefense.component.html":
/*!************************************************************************************************************************!*\
  !*** ./src/app/shared/components/entity-detail/entity-detail-AttackDefense/entity-detail-AttackDefense.component.html ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\" *ngIf=\"AttackPhysical && AttackPhysical[0] || AttackMagical && AttackMagical[0] || DefensePhysical || DefenseMagical\">\n  <div class=\"col\">\n    <div class=\"w-100\"><hr></div>\n\n    <div class=\"bg-primary text-white p-2\">\n      <div class=\"row\" *ngIf=\"AttackPhysical && AttackPhysical[0]\">\n        <div class=\"col text-left tos-icon tos-icon-attack\"><b>Physical Attack</b></div>\n        <div class=\"col text-right\">\n          <span>{{ (AttackPhysical[0] + anvilATK) | number }}</span>\n          <span *ngIf=\"AttackPhysical[1]\"> ~ {{ (AttackPhysical[1] + anvilATK) | number }}</span>\n        </div>\n      </div>\n\n      <div class=\"row\" *ngIf=\"AttackMagical && AttackMagical[0]\">\n        <div class=\"col text-left tos-icon tos-icon-attack\"><b>Magic Attack</b></div>\n        <div class=\"col text-right\">\n          <span>{{ (AttackMagical[0] + anvilATK) | number }}</span>\n          <span *ngIf=\"AttackMagical[1]\"> ~ {{ (AttackMagical[1] + anvilATK) | number }}</span>\n        </div>\n      </div>\n\n      <div class=\"row\" *ngIf=\"DefensePhysical\">\n        <div class=\"col text-left tos-icon tos-icon-defense\"><b>Physical Defense</b></div>\n        <div class=\"col text-right\">{{ (DefensePhysical + anvilDEF) | number }}</div>\n      </div>\n\n      <div class=\"row\" *ngIf=\"DefenseMagical\">\n        <div class=\"col text-left tos-icon tos-icon-defense\"><b>Magic Defense</b></div>\n        <div class=\"col text-right\">{{ (DefenseMagical + anvilDEF) | number }}</div>\n      </div>\n\n      <div class=\"text-right\" *ngIf=\"anvilLevel\">\n        Anvil Enhancement <span class=\"text-success\">▲</span> {{ (anvilDEF || anvilATK) | number }}\n      </div>\n      <div class=\"text-right\" *ngIf=\"transcendLevel\">\n        Transcendence <span class=\"text-success\">▲</span> {{ (transcendATKRatio - 1) | percent }}\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/shared/components/entity-detail/entity-detail-AttackDefense/entity-detail-AttackDefense.component.scss":
/*!************************************************************************************************************************!*\
  !*** ./src/app/shared/components/entity-detail/entity-detail-AttackDefense/entity-detail-AttackDefense.component.scss ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3NoYXJlZC9jb21wb25lbnRzL2VudGl0eS1kZXRhaWwvZW50aXR5LWRldGFpbC1BdHRhY2tEZWZlbnNlL2VudGl0eS1kZXRhaWwtQXR0YWNrRGVmZW5zZS5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/shared/components/entity-detail/entity-detail-AttackDefense/entity-detail-AttackDefense.component.ts":
/*!**********************************************************************************************************************!*\
  !*** ./src/app/shared/components/entity-detail/entity-detail-AttackDefense/entity-detail-AttackDefense.component.ts ***!
  \**********************************************************************************************************************/
/*! exports provided: EntityDetailAttackDefenseComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EntityDetailAttackDefenseComponent", function() { return EntityDetailAttackDefenseComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _entity_detail_child_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../entity-detail-child.component */ "./src/app/shared/components/entity-detail/entity-detail-child.component.ts");



var EntityDetailAttackDefenseComponent = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](EntityDetailAttackDefenseComponent, _super);
    function EntityDetailAttackDefenseComponent(changeDetector) {
        var _this = _super.call(this, changeDetector) || this;
        _this.anvilATK = 0;
        _this.anvilDEF = 0;
        _this.transcendATKRatio = 1;
        _this.transcendMDEFRatio = 1;
        _this.transcendPDEFRatio = 1;
        return _this;
    }
    Object.defineProperty(EntityDetailAttackDefenseComponent.prototype, "AttackPhysical", {
        get: function () {
            if (this.equipment)
                return [
                    Math.round(this.equipment.Stat_ATTACK_PHYSICAL_MIN * this.transcendATKRatio),
                    Math.round(this.equipment.Stat_ATTACK_PHYSICAL_MAX * this.transcendATKRatio)
                ];
            if (this.monster)
                return [
                    this.monster.Stat_ATTACK_PHYSICAL_MIN,
                    this.monster.Stat_ATTACK_PHYSICAL_MAX
                ];
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityDetailAttackDefenseComponent.prototype, "AttackMagical", {
        get: function () {
            if (this.equipment)
                return [Math.round(this.equipment.Stat_ATTACK_MAGICAL * this.transcendATKRatio), null];
            if (this.monster)
                return [
                    this.monster.Stat_ATTACK_MAGICAL_MIN,
                    this.monster.Stat_ATTACK_MAGICAL_MAX
                ];
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityDetailAttackDefenseComponent.prototype, "DefenseMagical", {
        get: function () {
            if (this.equipment)
                return Math.round(this.equipment.Stat_DEFENSE_MAGICAL * this.transcendMDEFRatio);
            if (this.monster)
                return this.monster.Stat_DEFENSE_MAGICAL;
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityDetailAttackDefenseComponent.prototype, "DefensePhysical", {
        get: function () {
            if (this.equipment)
                return Math.round(this.equipment.Stat_DEFENSE_PHYSICAL * this.transcendPDEFRatio);
            if (this.monster)
                return this.monster.Stat_DEFENSE_PHYSICAL;
            return null;
        },
        enumerable: true,
        configurable: true
    });
    EntityDetailAttackDefenseComponent.prototype.ngOnChanges = function (changes) {
        _super.prototype.ngOnChanges.call(this, changes);
        if (changes.anvilLevel && this.equipment) {
            this.anvilATK = this.equipment.AnvilATK(this.anvilLevel);
            this.anvilDEF = this.equipment.AnvilDEF(this.anvilLevel);
        }
        if (changes.transcendLevel && this.equipment) {
            this.transcendATKRatio = 1 + this.equipment.TranscendATKRatio(this.transcendLevel);
            this.transcendMDEFRatio = 1 + this.equipment.TranscendMDEFRatio(this.transcendLevel);
            this.transcendPDEFRatio = 1 + this.equipment.TranscendPDEFRatio(this.transcendLevel);
        }
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Number)
    ], EntityDetailAttackDefenseComponent.prototype, "anvilLevel", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Number)
    ], EntityDetailAttackDefenseComponent.prototype, "transcendLevel", void 0);
    EntityDetailAttackDefenseComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'tos-entity-detail-AttackDefense',
            template: __webpack_require__(/*! ./entity-detail-AttackDefense.component.html */ "./src/app/shared/components/entity-detail/entity-detail-AttackDefense/entity-detail-AttackDefense.component.html"),
            styles: [__webpack_require__(/*! ./entity-detail-AttackDefense.component.scss */ "./src/app/shared/components/entity-detail/entity-detail-AttackDefense/entity-detail-AttackDefense.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]])
    ], EntityDetailAttackDefenseComponent);
    return EntityDetailAttackDefenseComponent;
}(_entity_detail_child_component__WEBPACK_IMPORTED_MODULE_2__["EntityDetailChildComponent"]));



/***/ }),

/***/ "./src/app/shared/components/entity-detail/entity-detail-BonusStatsUnidentified/entity-detail-BonusStatsUnidentified.component.html":
/*!******************************************************************************************************************************************!*\
  !*** ./src/app/shared/components/entity-detail/entity-detail-BonusStatsUnidentified/entity-detail-BonusStatsUnidentified.component.html ***!
  \******************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"(collection || equipment || equipmentSet) && (entity['Bonus'] && entity['Bonus'] != [] || entity['Unidentified'] || entity['UnidentifiedRandom'])\">\n  <div *ngIf=\"divider\" class=\"w-100\"><hr></div>\n  <h5 *ngIf=\"header && collection\">Bonus</h5>\n  <h5 *ngIf=\"header && equipment\">Stats</h5>\n\n  <div class=\"row\" *ngIf=\"!equipmentSet\">\n    <div class=\"col\">\n      <div class=\"row\" *ngFor=\"let bonus of entity['Bonus']\">\n        <div class=\"col\" *ngIf=\"bonus.Value\">\n          {{ bonus.Stat }}\n          <span class=\"text-success\" *ngIf=\"bonus.Value > 0\">▲</span>\n          <span class=\"text-danger\" *ngIf=\"bonus.Value < 0\">▼</span>\n          {{ Math.abs(bonus.Value) }}\n        </div>\n        <div class=\"col\" *ngIf=\"bonus.ValueHTML\" [innerHTML]=\"'- ' + bonus.ValueHTML\"></div>\n      </div>\n\n      <div class=\"row\">\n        <div class=\"col text-muted\" *ngIf=\"equipment?.Unidentified\">*Unidentified</div>\n        <div class=\"col text-muted\" *ngIf=\"equipment?.UnidentifiedRandom\">*Unidentified with random stats</div>\n      </div>\n    </div>\n  </div>\n\n  <table class=\"table table-borderless mb-0\" *ngIf=\"equipmentSet\">\n    <tbody>\n      <tr *ngFor=\"let entry of equipmentSet.Bonus | keyvalue\">\n        <th scope=\"row\" class=\"text-nowrap\" width=\"1\">{{ entry.key }}+ Pieces</th>\n        <td><div *ngFor=\"let bonus of entry.value\" [innerHTML]=\"bonus.ValueHTML\"></div></td>\n      </tr>\n    </tbody>\n  </table>\n\n</div>\n"

/***/ }),

/***/ "./src/app/shared/components/entity-detail/entity-detail-BonusStatsUnidentified/entity-detail-BonusStatsUnidentified.component.scss":
/*!******************************************************************************************************************************************!*\
  !*** ./src/app/shared/components/entity-detail/entity-detail-BonusStatsUnidentified/entity-detail-BonusStatsUnidentified.component.scss ***!
  \******************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3NoYXJlZC9jb21wb25lbnRzL2VudGl0eS1kZXRhaWwvZW50aXR5LWRldGFpbC1Cb251c1N0YXRzVW5pZGVudGlmaWVkL2VudGl0eS1kZXRhaWwtQm9udXNTdGF0c1VuaWRlbnRpZmllZC5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/shared/components/entity-detail/entity-detail-BonusStatsUnidentified/entity-detail-BonusStatsUnidentified.component.ts":
/*!****************************************************************************************************************************************!*\
  !*** ./src/app/shared/components/entity-detail/entity-detail-BonusStatsUnidentified/entity-detail-BonusStatsUnidentified.component.ts ***!
  \****************************************************************************************************************************************/
/*! exports provided: EntityDetailBonusStatsUnidentifiedComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EntityDetailBonusStatsUnidentifiedComponent", function() { return EntityDetailBonusStatsUnidentifiedComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _entity_detail_child_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../entity-detail-child.component */ "./src/app/shared/components/entity-detail/entity-detail-child.component.ts");



var EntityDetailBonusStatsUnidentifiedComponent = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](EntityDetailBonusStatsUnidentifiedComponent, _super);
    function EntityDetailBonusStatsUnidentifiedComponent(changeDetector) {
        return _super.call(this, changeDetector) || this;
    }
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('divider'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Boolean)
    ], EntityDetailBonusStatsUnidentifiedComponent.prototype, "divider", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('header'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Boolean)
    ], EntityDetailBonusStatsUnidentifiedComponent.prototype, "header", void 0);
    EntityDetailBonusStatsUnidentifiedComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'tos-entity-detail-BonusStatsUnidentified',
            template: __webpack_require__(/*! ./entity-detail-BonusStatsUnidentified.component.html */ "./src/app/shared/components/entity-detail/entity-detail-BonusStatsUnidentified/entity-detail-BonusStatsUnidentified.component.html"),
            styles: [__webpack_require__(/*! ./entity-detail-BonusStatsUnidentified.component.scss */ "./src/app/shared/components/entity-detail/entity-detail-BonusStatsUnidentified/entity-detail-BonusStatsUnidentified.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]])
    ], EntityDetailBonusStatsUnidentifiedComponent);
    return EntityDetailBonusStatsUnidentifiedComponent;
}(_entity_detail_child_component__WEBPACK_IMPORTED_MODULE_2__["EntityDetailChildComponent"]));



/***/ }),

/***/ "./src/app/shared/components/entity-detail/entity-detail-Book/entity-detail-Book.component.html":
/*!******************************************************************************************************!*\
  !*** ./src/app/shared/components/entity-detail/entity-detail-Book/entity-detail-Book.component.html ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"w-100\"><hr></div>\n<h5 class=\"text-center\">{{ 'Page ' + page + ' of ' + pages.length }}</h5>\n\n<ngb-carousel class=\"row\" style=\"min-height: 25rem;\" [interval]=\"false\" [wrap]=\"false\" (slide)=\"onSlide($event)\">\n  <ng-template ngbSlide *ngFor=\"let page of pages\">\n    <p class=\"pl-5 pr-5 pb-5 text-multiline\">{{ page }}</p>\n  </ng-template>\n</ngb-carousel>\n"

/***/ }),

/***/ "./src/app/shared/components/entity-detail/entity-detail-Book/entity-detail-Book.component.scss":
/*!******************************************************************************************************!*\
  !*** ./src/app/shared/components/entity-detail/entity-detail-Book/entity-detail-Book.component.scss ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3NoYXJlZC9jb21wb25lbnRzL2VudGl0eS1kZXRhaWwvZW50aXR5LWRldGFpbC1Cb29rL2VudGl0eS1kZXRhaWwtQm9vay5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/shared/components/entity-detail/entity-detail-Book/entity-detail-Book.component.ts":
/*!****************************************************************************************************!*\
  !*** ./src/app/shared/components/entity-detail/entity-detail-Book/entity-detail-Book.component.ts ***!
  \****************************************************************************************************/
/*! exports provided: EntityDetailBookComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EntityDetailBookComponent", function() { return EntityDetailBookComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _entity_detail_child_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../entity-detail-child.component */ "./src/app/shared/components/entity-detail/entity-detail-child.component.ts");



var EntityDetailBookComponent = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](EntityDetailBookComponent, _super);
    function EntityDetailBookComponent(changeDetector) {
        var _this = _super.call(this, changeDetector) || this;
        _this.page = 1;
        return _this;
    }
    EntityDetailBookComponent.prototype.ngOnChanges = function (changes) {
        _super.prototype.ngOnChanges.call(this, changes);
        if (this.book)
            this.pages = this.book.Pages.split('{np}');
    };
    EntityDetailBookComponent.prototype.onSlide = function (event) {
        if (event.direction == 'left')
            this.page++;
        if (event.direction == 'right')
            this.page--;
    };
    EntityDetailBookComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'tos-entity-detail-Book',
            template: __webpack_require__(/*! ./entity-detail-Book.component.html */ "./src/app/shared/components/entity-detail/entity-detail-Book/entity-detail-Book.component.html"),
            styles: [__webpack_require__(/*! ./entity-detail-Book.component.scss */ "./src/app/shared/components/entity-detail/entity-detail-Book/entity-detail-Book.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]])
    ], EntityDetailBookComponent);
    return EntityDetailBookComponent;
}(_entity_detail_child_component__WEBPACK_IMPORTED_MODULE_2__["EntityDetailChildComponent"]));



/***/ }),

/***/ "./src/app/shared/components/entity-detail/entity-detail-Card/entity-detail-Card.component.html":
/*!******************************************************************************************************!*\
  !*** ./src/app/shared/components/entity-detail/entity-detail-Card/entity-detail-Card.component.html ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- Icon -->\n<tos-entity-detail-ClassIconGrade [entity]=\"entity\" [size]=\"'xlarge'\"></tos-entity-detail-ClassIconGrade>\n\n<!-- Name -->\n<h5 class=\"position-absolute text-center text-outline text-white w-100\" style=\"top: -36px;\">\n  {{ card.Name }}\n</h5>\n\n<!-- Element and Race -->\n<img class=\"position-absolute\" height=\"40\" width=\"40\" [src]=\"TOSElementService.icon(card.MonsterElement)\" [title]=\"card.MonsterElement\" style=\"left: 24px; top: 6px;\"/>\n<img class=\"position-absolute\" height=\"40\" width=\"40\" [src]=\"TOSMonsterRaceService.icon(card.MonsterRace)\" [title]=\"card.MonsterRace\" style=\"right: 24px; top: 8px;\"/>\n"

/***/ }),

/***/ "./src/app/shared/components/entity-detail/entity-detail-Card/entity-detail-Card.component.scss":
/*!******************************************************************************************************!*\
  !*** ./src/app/shared/components/entity-detail/entity-detail-Card/entity-detail-Card.component.scss ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  position: relative;\n  display: block;\n  margin: auto;\n  max-width: 100%;\n  width: 363px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9mdW5naS9FL1Rvc1Byb2plY3QvVG9zR3VydUJhc2UvdG9zLWRhdGFiYXNlL3Rvcy13ZWIvc3JjL2FwcC9zaGFyZWQvY29tcG9uZW50cy9lbnRpdHktZGV0YWlsL2VudGl0eS1kZXRhaWwtQ2FyZC9lbnRpdHktZGV0YWlsLUNhcmQuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL3NoYXJlZC9jb21wb25lbnRzL2VudGl0eS1kZXRhaWwvZW50aXR5LWRldGFpbC1DYXJkL2VudGl0eS1kZXRhaWwtQ2FyZC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLG1CQUFBO0VBQ0EsZUFBQTtFQUNBLGFBQUE7RUFDQSxnQkFBQTtFQUNBLGFBQUE7Q0NDRCIsImZpbGUiOiJzcmMvYXBwL3NoYXJlZC9jb21wb25lbnRzL2VudGl0eS1kZXRhaWwvZW50aXR5LWRldGFpbC1DYXJkL2VudGl0eS1kZXRhaWwtQ2FyZC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIjpob3N0IHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBkaXNwbGF5OiBibG9jaztcbiAgbWFyZ2luOiBhdXRvO1xuICBtYXgtd2lkdGg6IDEwMCU7XG4gIHdpZHRoOiAzNjNweDtcbn1cbiIsIjpob3N0IHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBkaXNwbGF5OiBibG9jaztcbiAgbWFyZ2luOiBhdXRvO1xuICBtYXgtd2lkdGg6IDEwMCU7XG4gIHdpZHRoOiAzNjNweDtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/shared/components/entity-detail/entity-detail-Card/entity-detail-Card.component.ts":
/*!****************************************************************************************************!*\
  !*** ./src/app/shared/components/entity-detail/entity-detail-Card/entity-detail-Card.component.ts ***!
  \****************************************************************************************************/
/*! exports provided: EntityDetailCardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EntityDetailCardComponent", function() { return EntityDetailCardComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _entity_detail_child_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../entity-detail-child.component */ "./src/app/shared/components/entity-detail/entity-detail-child.component.ts");



var EntityDetailCardComponent = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](EntityDetailCardComponent, _super);
    function EntityDetailCardComponent(changeDetector) {
        return _super.call(this, changeDetector) || this;
    }
    EntityDetailCardComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'tos-entity-detail-Card',
            template: __webpack_require__(/*! ./entity-detail-Card.component.html */ "./src/app/shared/components/entity-detail/entity-detail-Card/entity-detail-Card.component.html"),
            styles: [__webpack_require__(/*! ./entity-detail-Card.component.scss */ "./src/app/shared/components/entity-detail/entity-detail-Card/entity-detail-Card.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]])
    ], EntityDetailCardComponent);
    return EntityDetailCardComponent;
}(_entity_detail_child_component__WEBPACK_IMPORTED_MODULE_2__["EntityDetailChildComponent"]));



/***/ }),

/***/ "./src/app/shared/components/entity-detail/entity-detail-ClassIconGrade/entity-detail-ClassIconGrade.component.html":
/*!**************************************************************************************************************************!*\
  !*** ./src/app/shared/components/entity-detail/entity-detail-ClassIconGrade/entity-detail-ClassIconGrade.component.html ***!
  \**************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"!equipmentSet\">\n  <div class=\"m-auto\" [style.width]=\"ICON_WIDTH + 'px'\">\n    <div class=\"w-100\" [style.height]=\"ICON_HEIGHT + 'px'\">\n      <div class=\"position-relative d-flex align-items-center justify-content-center w-100 h-100\">\n        <img class=\"position-absolute\"\n             style=\"max-height: 100%; max-width: 100%; left: 0; top: 0\"\n             [src]=\"'assets/images/equipment_grade_' + (equipment.Grade + '').toLowerCase() + '_' + size + '.png'\"\n             *ngIf=\"equipment\"\n        />\n        <img class=\"position-relative m-auto\"\n             style=\"max-height: 100%; max-width: 100%;\"\n             [src]=\"Icon\"\n        />\n        <img class=\"position-absolute\"\n             style=\"height: 533px; width: 363px; transform: translateY(-35px);\"\n             [src]=\"'assets/images/card_frame_' + (card.TypeCard + '').toLowerCase() + '.png'\"\n             *ngIf=\"card\"\n        />\n      </div>\n    </div>\n\n    <div class=\"row justify-content-around ml-auto mr-auto\" *ngIf=\"equipment\"\n         [ngClass]=\"{ 'mt-2': !labels }\">\n      <div *ngFor=\"let classTree of [TOSClassTree.ARCHER, TOSClassTree.SCOUT, TOSClassTree.SWORDSMAN, TOSClassTree.CLERIC, TOSClassTree.WIZARD]\" class=\"col-4 p-0\"\n           [ngClass]=\"{ 'mt-3': labels, 'mt-1': !labels }\">\n        <img [src]=\"'assets/images/equipment_class_' + classTree.toString().toLowerCase() + '_' + (equipment.IsUsableBy(classTree) ? 'yes' : 'no') + '.png'\" style=\"vertical-align: top\" />\n        <span class=\"ml-1\" [ngClass]=\"{ 'text-muted': !equipment.IsUsableBy(classTree) }\" *ngIf=\"labels\">\n          {{ classTree.toString() }}\n        </span>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"row ml-auto mr-auto justify-content-center\" *ngIf=\"skill\">\n    <div *ngFor=\"let stance of skill.RequiredStance\">\n      <img [alt]=\"stance.Name\" [title]=\"stance.Name\" [src]=\"stance.Icon\" />\n    </div>\n  </div>\n\n</div>\n"

/***/ }),

/***/ "./src/app/shared/components/entity-detail/entity-detail-ClassIconGrade/entity-detail-ClassIconGrade.component.scss":
/*!**************************************************************************************************************************!*\
  !*** ./src/app/shared/components/entity-detail/entity-detail-ClassIconGrade/entity-detail-ClassIconGrade.component.scss ***!
  \**************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3NoYXJlZC9jb21wb25lbnRzL2VudGl0eS1kZXRhaWwvZW50aXR5LWRldGFpbC1DbGFzc0ljb25HcmFkZS9lbnRpdHktZGV0YWlsLUNsYXNzSWNvbkdyYWRlLmNvbXBvbmVudC5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/shared/components/entity-detail/entity-detail-ClassIconGrade/entity-detail-ClassIconGrade.component.ts":
/*!************************************************************************************************************************!*\
  !*** ./src/app/shared/components/entity-detail/entity-detail-ClassIconGrade/entity-detail-ClassIconGrade.component.ts ***!
  \************************************************************************************************************************/
/*! exports provided: EntityDetailClassIconGradeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EntityDetailClassIconGradeComponent", function() { return EntityDetailClassIconGradeComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _entity_detail_child_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../entity-detail-child.component */ "./src/app/shared/components/entity-detail/entity-detail-child.component.ts");
/* harmony import */ var _domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../domain/tos/tos-domain */ "./src/app/shared/domain/tos/tos-domain.ts");




var EntityDetailClassIconGradeComponent = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](EntityDetailClassIconGradeComponent, _super);
    function EntityDetailClassIconGradeComponent(changeDetector, zone) {
        var _this = _super.call(this, changeDetector) || this;
        _this.changeDetector = changeDetector;
        _this.zone = zone;
        return _this;
    }
    EntityDetailClassIconGradeComponent_1 = EntityDetailClassIconGradeComponent;
    Object.defineProperty(EntityDetailClassIconGradeComponent.prototype, "Icon", {
        get: function () {
            if (this.card)
                return this.card.IconTooltip;
            if (this.equipment && this.iconInterval)
                return this.iconIntervalChange
                    ? this.equipment.Icon.replace('_f', '_m')
                    : this.equipment.Icon.replace('_m', '_f');
            return this.entity.Icon;
        },
        enumerable: true,
        configurable: true
    });
    EntityDetailClassIconGradeComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        _super.prototype.ngOnChanges.call(this, changes);
        if (changes.entity) {
            clearInterval(this.iconInterval);
            // In case it's a class costume (with no male/female suffix), flip between the two
            if (this.equipment && this.equipment.Icon) {
                var isClassCostume = this.equipment.TypeEquipment == _domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_3__["TOSEquipmentType"].COSTUME_OUTFIT &&
                    !this.equipment.Name.includes('(Female)') &&
                    !this.equipment.Name.includes('(Male)') && (this.equipment.Icon.includes('_f') && !this.equipment.$ID_NAME.includes('_f') ||
                    this.equipment.Icon.includes('_m') && !this.equipment.$ID_NAME.includes('_m'));
                if (isClassCostume) {
                    this.zone.runOutsideAngular(function () { return _this.iconInterval = setInterval(function () {
                        _this.iconIntervalChange = !_this.iconIntervalChange;
                        _this.changeDetector.detectChanges();
                    }, 1500); });
                }
            }
        }
        if (changes.size) {
            if (this.size == 'xlarge') {
                this.ICON_HEIGHT = EntityDetailClassIconGradeComponent_1.ICON_XLARGE_HEIGHT;
                this.ICON_WIDTH = EntityDetailClassIconGradeComponent_1.ICON_XLARGE_WIDTH;
            }
            else if (this.size == 'large') {
                this.ICON_HEIGHT = EntityDetailClassIconGradeComponent_1.ICON_LARGE_HEIGHT;
                this.ICON_WIDTH = EntityDetailClassIconGradeComponent_1.ICON_LARGE_WIDTH;
            }
            else if (this.size == 'small' || !this.equipment) {
                this.ICON_HEIGHT = EntityDetailClassIconGradeComponent_1.ICON_SMALL_HEIGHT;
                this.ICON_WIDTH = EntityDetailClassIconGradeComponent_1.ICON_SMALL_WIDTH;
            }
        }
    };
    EntityDetailClassIconGradeComponent.prototype.ngOnDestroy = function () {
        clearInterval(this.iconInterval);
    };
    var EntityDetailClassIconGradeComponent_1;
    EntityDetailClassIconGradeComponent.ICON_SMALL_HEIGHT = 100;
    EntityDetailClassIconGradeComponent.ICON_SMALL_WIDTH = 100;
    EntityDetailClassIconGradeComponent.ICON_LARGE_HEIGHT = 229;
    EntityDetailClassIconGradeComponent.ICON_LARGE_WIDTH = 351;
    EntityDetailClassIconGradeComponent.ICON_XLARGE_HEIGHT = 440;
    EntityDetailClassIconGradeComponent.ICON_XLARGE_WIDTH = 330;
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('size'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], EntityDetailClassIconGradeComponent.prototype, "size", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('labels'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Boolean)
    ], EntityDetailClassIconGradeComponent.prototype, "labels", void 0);
    EntityDetailClassIconGradeComponent = EntityDetailClassIconGradeComponent_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'tos-entity-detail-ClassIconGrade',
            template: __webpack_require__(/*! ./entity-detail-ClassIconGrade.component.html */ "./src/app/shared/components/entity-detail/entity-detail-ClassIconGrade/entity-detail-ClassIconGrade.component.html"),
            styles: [__webpack_require__(/*! ./entity-detail-ClassIconGrade.component.scss */ "./src/app/shared/components/entity-detail/entity-detail-ClassIconGrade/entity-detail-ClassIconGrade.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]])
    ], EntityDetailClassIconGradeComponent);
    return EntityDetailClassIconGradeComponent;
}(_entity_detail_child_component__WEBPACK_IMPORTED_MODULE_2__["EntityDetailChildComponent"]));



/***/ }),

/***/ "./src/app/shared/components/entity-detail/entity-detail-Description/entity-detail-Description.component.html":
/*!********************************************************************************************************************!*\
  !*** ./src/app/shared/components/entity-detail/entity-detail-Description/entity-detail-Description.component.html ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"entity['Description'] || entity['DescriptionHTML']\">\n  <div class=\"w-100\" *ngIf=\"divider\"><hr></div>\n  <h5 *ngIf=\"header\">Description</h5>\n\n  <p class=\"text-multiline mb-0\" [innerHTML]=\"((entity['Description'] || '') + (entity['DescriptionRequired'] || '')) | sanitizeHTML\"></p>\n</div>\n"

/***/ }),

/***/ "./src/app/shared/components/entity-detail/entity-detail-Description/entity-detail-Description.component.scss":
/*!********************************************************************************************************************!*\
  !*** ./src/app/shared/components/entity-detail/entity-detail-Description/entity-detail-Description.component.scss ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3NoYXJlZC9jb21wb25lbnRzL2VudGl0eS1kZXRhaWwvZW50aXR5LWRldGFpbC1EZXNjcmlwdGlvbi9lbnRpdHktZGV0YWlsLURlc2NyaXB0aW9uLmNvbXBvbmVudC5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/shared/components/entity-detail/entity-detail-Description/entity-detail-Description.component.ts":
/*!******************************************************************************************************************!*\
  !*** ./src/app/shared/components/entity-detail/entity-detail-Description/entity-detail-Description.component.ts ***!
  \******************************************************************************************************************/
/*! exports provided: EntityDetailDescriptionComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EntityDetailDescriptionComponent", function() { return EntityDetailDescriptionComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _entity_detail_child_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../entity-detail-child.component */ "./src/app/shared/components/entity-detail/entity-detail-child.component.ts");



var EntityDetailDescriptionComponent = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](EntityDetailDescriptionComponent, _super);
    function EntityDetailDescriptionComponent(changeDetector) {
        return _super.call(this, changeDetector) || this;
    }
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Boolean)
    ], EntityDetailDescriptionComponent.prototype, "divider", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Boolean)
    ], EntityDetailDescriptionComponent.prototype, "header", void 0);
    EntityDetailDescriptionComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'tos-entity-detail-Description',
            template: __webpack_require__(/*! ./entity-detail-Description.component.html */ "./src/app/shared/components/entity-detail/entity-detail-Description/entity-detail-Description.component.html"),
            styles: [__webpack_require__(/*! ./entity-detail-Description.component.scss */ "./src/app/shared/components/entity-detail/entity-detail-Description/entity-detail-Description.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]])
    ], EntityDetailDescriptionComponent);
    return EntityDetailDescriptionComponent;
}(_entity_detail_child_component__WEBPACK_IMPORTED_MODULE_2__["EntityDetailChildComponent"]));



/***/ }),

/***/ "./src/app/shared/components/entity-detail/entity-detail-DurabilityPotentialSockets/entity-detail-DurabilityPotentialSockets.component.html":
/*!**************************************************************************************************************************************************!*\
  !*** ./src/app/shared/components/entity-detail/entity-detail-DurabilityPotentialSockets/entity-detail-DurabilityPotentialSockets.component.html ***!
  \**************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\" *ngIf=\"equipment || monster\">\n  <div class=\"col\">\n    <div class=\"w-100\"><hr></div>\n\n    <div *ngIf=\"equipment\">\n      <div class=\"row\">\n        <div class=\"col-5\">Potential</div>\n        <div class=\"col text-center text-white\">\n          <div class=\"rounded tos-bar\" style=\"background: #528273;\">\n            {{ equipment.Potential + ' / ' + equipment.Potential }}\n          </div>\n        </div>\n      </div>\n\n      <div class=\"row mt-1\">\n        <div class=\"col-5\">Durability</div>\n        <div class=\"col text-center text-white\">\n          <div class=\"rounded tos-bar\" style=\"background: #B55108;\">\n            {{ equipment.Durability + ' / ' + equipment.Durability }}\n          </div>\n        </div>\n      </div>\n\n      <div class=\"row mt-1\">\n        <div class=\"col-5\">Sockets</div>\n        <div class=\"col text-center\">{{ equipment.Sockets + ' / ' + equipment.SocketsLimit }}</div>\n      </div>\n    </div>\n\n    <div *ngIf=\"monster\">\n      <div class=\"row mt-1\">\n        <div class=\"col-5\">HP</div>\n        <div class=\"col text-center text-white\">\n          <div class=\"rounded tos-bar\" style=\"background: linear-gradient(to bottom, #DE5900 0%, #BD4D00 80%);\">\n            {{ monster.Stat_HP | number }}\n          </div>\n        </div>\n      </div>\n\n      <div class=\"row mt-1\">\n        <div class=\"col-5\">SP</div>\n        <div class=\"col text-center text-white\">\n          <div class=\"rounded tos-bar\" style=\"background: linear-gradient(to bottom, #288CC9 0%, #1F72AF 80%);\">\n            {{ monster.Stat_SP | number }}\n          </div>\n        </div>\n      </div>\n\n      <div class=\"row mt-1\">\n        <div class=\"col-5\">EXP</div>\n        <div class=\"col text-center text-white\">\n            <div class=\"rounded tos-bar\" style=\"background: linear-gradient(to bottom, #F7D308 0%, #BDA208 80%);\">\n            {{ monster.EXP | number }}\n          </div>\n        </div>\n      </div>\n\n      <div class=\"row mt-1\">\n        <div class=\"col-5\">Class EXP</div>\n        <div class=\"col text-center text-white\">\n          <div class=\"rounded tos-bar\" style=\"background: linear-gradient(to bottom, #8CCF52 0%, #63A229 80%);\">\n            {{ monster.EXPClass | number }}\n          </div>\n        </div>\n      </div>\n    </div>\n\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/shared/components/entity-detail/entity-detail-DurabilityPotentialSockets/entity-detail-DurabilityPotentialSockets.component.scss":
/*!**************************************************************************************************************************************************!*\
  !*** ./src/app/shared/components/entity-detail/entity-detail-DurabilityPotentialSockets/entity-detail-DurabilityPotentialSockets.component.scss ***!
  \**************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".tos-bar {\n  box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.5);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9mdW5naS9FL1Rvc1Byb2plY3QvVG9zR3VydUJhc2UvdG9zLWRhdGFiYXNlL3Rvcy13ZWIvc3JjL2FwcC9zaGFyZWQvY29tcG9uZW50cy9lbnRpdHktZGV0YWlsL2VudGl0eS1kZXRhaWwtRHVyYWJpbGl0eVBvdGVudGlhbFNvY2tldHMvZW50aXR5LWRldGFpbC1EdXJhYmlsaXR5UG90ZW50aWFsU29ja2V0cy5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvc2hhcmVkL2NvbXBvbmVudHMvZW50aXR5LWRldGFpbC9lbnRpdHktZGV0YWlsLUR1cmFiaWxpdHlQb3RlbnRpYWxTb2NrZXRzL2VudGl0eS1kZXRhaWwtRHVyYWJpbGl0eVBvdGVudGlhbFNvY2tldHMuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSw2Q0FBQTtDQ0NEIiwiZmlsZSI6InNyYy9hcHAvc2hhcmVkL2NvbXBvbmVudHMvZW50aXR5LWRldGFpbC9lbnRpdHktZGV0YWlsLUR1cmFiaWxpdHlQb3RlbnRpYWxTb2NrZXRzL2VudGl0eS1kZXRhaWwtRHVyYWJpbGl0eVBvdGVudGlhbFNvY2tldHMuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIudG9zLWJhciB7XG4gIGJveC1zaGFkb3c6IGluc2V0IDAgMCA4cHggcmdiYSgwLCAwLCAwLCAwLjUpO1xufVxuIiwiLnRvcy1iYXIge1xuICBib3gtc2hhZG93OiBpbnNldCAwIDAgOHB4IHJnYmEoMCwgMCwgMCwgMC41KTtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/shared/components/entity-detail/entity-detail-DurabilityPotentialSockets/entity-detail-DurabilityPotentialSockets.component.ts":
/*!************************************************************************************************************************************************!*\
  !*** ./src/app/shared/components/entity-detail/entity-detail-DurabilityPotentialSockets/entity-detail-DurabilityPotentialSockets.component.ts ***!
  \************************************************************************************************************************************************/
/*! exports provided: EntityDetailDurabilityPotentialSocketsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EntityDetailDurabilityPotentialSocketsComponent", function() { return EntityDetailDurabilityPotentialSocketsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _entity_detail_child_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../entity-detail-child.component */ "./src/app/shared/components/entity-detail/entity-detail-child.component.ts");



var EntityDetailDurabilityPotentialSocketsComponent = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](EntityDetailDurabilityPotentialSocketsComponent, _super);
    function EntityDetailDurabilityPotentialSocketsComponent(changeDetector) {
        return _super.call(this, changeDetector) || this;
    }
    EntityDetailDurabilityPotentialSocketsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'tos-entity-detail-DurabilityPotentialSockets',
            template: __webpack_require__(/*! ./entity-detail-DurabilityPotentialSockets.component.html */ "./src/app/shared/components/entity-detail/entity-detail-DurabilityPotentialSockets/entity-detail-DurabilityPotentialSockets.component.html"),
            styles: [__webpack_require__(/*! ./entity-detail-DurabilityPotentialSockets.component.scss */ "./src/app/shared/components/entity-detail/entity-detail-DurabilityPotentialSockets/entity-detail-DurabilityPotentialSockets.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]])
    ], EntityDetailDurabilityPotentialSocketsComponent);
    return EntityDetailDurabilityPotentialSocketsComponent;
}(_entity_detail_child_component__WEBPACK_IMPORTED_MODULE_2__["EntityDetailChildComponent"]));



/***/ }),

/***/ "./src/app/shared/components/entity-detail/entity-detail-Enhancement/entity-detail-Enhancement.component.html":
/*!********************************************************************************************************************!*\
  !*** ./src/app/shared/components/entity-detail/entity-detail-Enhancement/entity-detail-Enhancement.component.html ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"w-100\"><hr></div>\n<h5 *ngIf=\"header\">{{ header }}</h5>\n\n<table class=\"table table-borderless table-sm text-center\">\n  <tbody>\n    <!-- Anvil -->\n    <tr *ngIf=\"anvilAvailable\" class=\"table-primary\">\n      <th width=\"120\">Anvil</th>\n      <th>Bonus</th>\n      <th>Silver</th>\n      <th>Total</th>\n    </tr>\n    <tr *ngIf=\"anvilAvailable\">\n      <td>\n        <tos-input-number [min]=\"0\"\n                          [max]=\"40\"\n                          [model]=\"anvilLevel\"\n                          (modelChange)=\"onAnvilChange($event)\"></tos-input-number>\n      </td>\n      <td class=\"align-middle\">{{ anvilBonus }}</td>\n      <td class=\"align-middle\">{{ anvilSilver | number }}</td>\n      <td class=\"align-middle\">{{ anvilSilverTotal | number }}</td>\n    </tr>\n\n    <!-- Attribute -->\n    <tr *ngIf=\"attributeAvailable\" class=\"table-primary\">\n      <th width=\"120\">Level</th>\n      <th>Attribute Points</th>\n      <th>Silver</th>\n      <th>Total</th>\n    </tr>\n    <tr *ngIf=\"attributeAvailable\">\n      <td>\n        <tos-input-number [min]=\"0\"\n                          [max]=\"attribute.LevelMax\"\n                          [model]=\"attributeLevel\"\n                          (modelChange)=\"onAttributeChange($event)\"></tos-input-number>\n      </td>\n      <td class=\"align-middle\">{{ attributePoints | number }}</td>\n      <td class=\"align-middle\">{{ attributeSilver | number }}</td>\n      <td class=\"align-middle\">{{ attributeSilverTotal | number }}</td>\n    </tr>\n\n    <!-- Transcendence -->\n    <tr *ngIf=\"transcendAvailable\" class=\"table-primary\">\n      <th width=\"120\">Transcendence</th>\n      <th>Bonus</th>\n      <th class=\"text-nowrap\">Blessed Gems</th>\n      <th>Total</th>\n    </tr>\n    <tr *ngIf=\"transcendAvailable\">\n      <td>\n        <tos-input-number [min]=\"0\"\n                          [max]=\"10\"\n                          [model]=\"transcendLevel\"\n                          (modelChange)=\"onTranscendChange($event)\"></tos-input-number>\n      </td>\n      <td class=\"align-middle\">{{ transcendBonus | percent }}</td>\n      <td class=\"align-middle\">{{ transcendShards }}</td>\n      <td class=\"align-middle\">{{ transcendShardsTotal }}</td>\n    </tr>\n\n  </tbody>\n</table>\n"

/***/ }),

/***/ "./src/app/shared/components/entity-detail/entity-detail-Enhancement/entity-detail-Enhancement.component.scss":
/*!********************************************************************************************************************!*\
  !*** ./src/app/shared/components/entity-detail/entity-detail-Enhancement/entity-detail-Enhancement.component.scss ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3NoYXJlZC9jb21wb25lbnRzL2VudGl0eS1kZXRhaWwvZW50aXR5LWRldGFpbC1FbmhhbmNlbWVudC9lbnRpdHktZGV0YWlsLUVuaGFuY2VtZW50LmNvbXBvbmVudC5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/shared/components/entity-detail/entity-detail-Enhancement/entity-detail-Enhancement.component.ts":
/*!******************************************************************************************************************!*\
  !*** ./src/app/shared/components/entity-detail/entity-detail-Enhancement/entity-detail-Enhancement.component.ts ***!
  \******************************************************************************************************************/
/*! exports provided: EntityDetailEnhancementComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EntityDetailEnhancementComponent", function() { return EntityDetailEnhancementComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _entity_detail_child_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../entity-detail-child.component */ "./src/app/shared/components/entity-detail/entity-detail-child.component.ts");



var EntityDetailEnhancementComponent = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](EntityDetailEnhancementComponent, _super);
    function EntityDetailEnhancementComponent(changeDetector) {
        var _this = _super.call(this, changeDetector) || this;
        _this.anvilLevelChange = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        _this.anvilBonus = 0;
        _this.anvilSilver = 0;
        _this.anvilSilverTotal = 0;
        _this.attributeLevel = 0;
        _this.attributePoints = 0;
        _this.attributeSilver = 0;
        _this.attributeSilverTotal = 0;
        _this.transcendLevelChange = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        _this.transcendBonus = 0;
        _this.transcendShards = 0;
        _this.transcendShardsTotal = 0;
        return _this;
    }
    EntityDetailEnhancementComponent.prototype.ngOnChanges = function (changes) {
        _super.prototype.ngOnChanges.call(this, changes);
        this.anvilAvailable = this.equipment && this.equipment.IsAnvilAvailable;
        this.attributeAvailable = !!this.attribute;
        this.transcendAvailable = this.equipment && this.equipment.IsTranscendAvailable;
    };
    EntityDetailEnhancementComponent.prototype.onAnvilChange = function (newValue) {
        if (this.anvilLevel == newValue)
            return;
        this.anvilLevel = newValue;
        this.anvilLevelChange.emit(newValue);
        this.anvilBonus = this.equipment.AnvilDEF(this.anvilLevel) || this.equipment.AnvilATK(this.anvilLevel);
        this.anvilSilver = this.equipment.AnvilPrice(this.anvilLevel);
        this.anvilSilverTotal = this.equipment.AnvilPriceTotal(this.anvilLevel);
    };
    EntityDetailEnhancementComponent.prototype.onAttributeChange = function (newValue) {
        if (this.attributeLevel == newValue)
            return;
        this.attributeLevel = newValue;
        this.attributePoints = this.attribute.Price(this.attributeLevel);
        this.attributeSilver = this.attributePoints * 1000;
        this.attributeSilverTotal = this.attribute.PriceTotal(this.attributeLevel) * 1000;
    };
    EntityDetailEnhancementComponent.prototype.onTranscendChange = function (newValue) {
        if (this.transcendLevel == newValue)
            return;
        this.transcendLevel = newValue;
        this.transcendLevelChange.emit(newValue);
        this.transcendBonus = this.equipment.TranscendATKRatio(this.transcendLevel);
        this.transcendShards = this.equipment.TranscendPrice(this.transcendLevel);
        this.transcendShardsTotal = this.equipment.TranscendPriceTotal(this.transcendLevel);
    };
    EntityDetailEnhancementComponent.prototype.onWheel = function (event) { }; // Do nothing.. just so the user can use the wheel to control the input
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], EntityDetailEnhancementComponent.prototype, "header", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Number)
    ], EntityDetailEnhancementComponent.prototype, "anvilLevel", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
    ], EntityDetailEnhancementComponent.prototype, "anvilLevelChange", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Number)
    ], EntityDetailEnhancementComponent.prototype, "transcendLevel", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
    ], EntityDetailEnhancementComponent.prototype, "transcendLevelChange", void 0);
    EntityDetailEnhancementComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'tos-entity-detail-Enhancement',
            template: __webpack_require__(/*! ./entity-detail-Enhancement.component.html */ "./src/app/shared/components/entity-detail/entity-detail-Enhancement/entity-detail-Enhancement.component.html"),
            styles: [__webpack_require__(/*! ./entity-detail-Enhancement.component.scss */ "./src/app/shared/components/entity-detail/entity-detail-Enhancement/entity-detail-Enhancement.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]])
    ], EntityDetailEnhancementComponent);
    return EntityDetailEnhancementComponent;
}(_entity_detail_child_component__WEBPACK_IMPORTED_MODULE_2__["EntityDetailChildComponent"]));



/***/ }),

/***/ "./src/app/shared/components/entity-detail/entity-detail-Gem/entity-detail-Gem.component.html":
/*!****************************************************************************************************!*\
  !*** ./src/app/shared/components/entity-detail/entity-detail-Gem/entity-detail-Gem.component.html ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"p-2 mt-3\" *ngIf=\"gem\">\n  <tos-input-number class=\"h5 text-center\" *ngIf=\"editable && gem.TypeGem != TOSGemType.SKILL\"\n                    [label]=\"'Level'\"\n                    [min]=\"1\" [max]=\"10\"\n                    [(model)]=\"level\"></tos-input-number>\n\n  <table class=\"table table-borderless mb-0\">\n    <tbody>\n      <tr *ngFor=\"let entry of gem.Bonus(level) | keyvalue\">\n        <td class=\"p-1 align-middle\" width=\"1\">\n          <img class=\"bg-primary rounded-circle p-2\" [src]=\"'assets/images/gem_effect_' + entry.key.toLowerCase() + '.png'\" [title]=\"entry.key\" />\n        </td>\n        <td [innerHTML]=\"entry.value.join('<br/>')\"></td>\n      </tr>\n    </tbody>\n  </table>\n</div>\n"

/***/ }),

/***/ "./src/app/shared/components/entity-detail/entity-detail-Gem/entity-detail-Gem.component.scss":
/*!****************************************************************************************************!*\
  !*** ./src/app/shared/components/entity-detail/entity-detail-Gem/entity-detail-Gem.component.scss ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "button[disabled] {\n  opacity: 0 !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9mdW5naS9FL1Rvc1Byb2plY3QvVG9zR3VydUJhc2UvdG9zLWRhdGFiYXNlL3Rvcy13ZWIvc3JjL2FwcC9zaGFyZWQvY29tcG9uZW50cy9lbnRpdHktZGV0YWlsL2VudGl0eS1kZXRhaWwtR2VtL2VudGl0eS1kZXRhaWwtR2VtLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9zaGFyZWQvY29tcG9uZW50cy9lbnRpdHktZGV0YWlsL2VudGl0eS1kZXRhaWwtR2VtL2VudGl0eS1kZXRhaWwtR2VtLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0Usc0JBQUE7Q0NDRCIsImZpbGUiOiJzcmMvYXBwL3NoYXJlZC9jb21wb25lbnRzL2VudGl0eS1kZXRhaWwvZW50aXR5LWRldGFpbC1HZW0vZW50aXR5LWRldGFpbC1HZW0uY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJidXR0b25bZGlzYWJsZWRdIHtcbiAgb3BhY2l0eTogMCAhaW1wb3J0YW50Oztcbn1cbiIsImJ1dHRvbltkaXNhYmxlZF0ge1xuICBvcGFjaXR5OiAwICFpbXBvcnRhbnQ7XG59Il19 */"

/***/ }),

/***/ "./src/app/shared/components/entity-detail/entity-detail-Gem/entity-detail-Gem.component.ts":
/*!**************************************************************************************************!*\
  !*** ./src/app/shared/components/entity-detail/entity-detail-Gem/entity-detail-Gem.component.ts ***!
  \**************************************************************************************************/
/*! exports provided: EntityDetailGemComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EntityDetailGemComponent", function() { return EntityDetailGemComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _entity_detail_child_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../entity-detail-child.component */ "./src/app/shared/components/entity-detail/entity-detail-child.component.ts");
/* harmony import */ var _domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../domain/tos/tos-domain */ "./src/app/shared/domain/tos/tos-domain.ts");




var EntityDetailGemComponent = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](EntityDetailGemComponent, _super);
    function EntityDetailGemComponent(changeDetector) {
        var _this = _super.call(this, changeDetector) || this;
        _this.TOSGemType = _domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_3__["TOSGemType"];
        _this.level = 1;
        _this.editable = true;
        return _this;
    }
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Boolean)
    ], EntityDetailGemComponent.prototype, "editable", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Boolean)
    ], EntityDetailGemComponent.prototype, "header", void 0);
    EntityDetailGemComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'tos-entity-detail-Gem',
            template: __webpack_require__(/*! ./entity-detail-Gem.component.html */ "./src/app/shared/components/entity-detail/entity-detail-Gem/entity-detail-Gem.component.html"),
            styles: [__webpack_require__(/*! ./entity-detail-Gem.component.scss */ "./src/app/shared/components/entity-detail/entity-detail-Gem/entity-detail-Gem.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]])
    ], EntityDetailGemComponent);
    return EntityDetailGemComponent;
}(_entity_detail_child_component__WEBPACK_IMPORTED_MODULE_2__["EntityDetailChildComponent"]));



/***/ }),

/***/ "./src/app/shared/components/entity-detail/entity-detail-Header/entity-detail-header.component.html":
/*!**********************************************************************************************************!*\
  !*** ./src/app/shared/components/entity-detail/entity-detail-Header/entity-detail-header.component.html ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div>\n  <div>{{ entity.Name }}</div>\n  <small class=\"text-muted\" *ngIf=\"titleSmall\">{{ titleSmall }}</small>\n  <small class=\"text-muted\" *ngIf=\"titleSmall && idName\"> · </small>\n  <small class=\"text-muted\" *ngIf=\"idName\">{{ entity.$ID + ' · ' + entity.$ID_NAME }}</small>\n</div>\n"

/***/ }),

/***/ "./src/app/shared/components/entity-detail/entity-detail-Header/entity-detail-header.component.scss":
/*!**********************************************************************************************************!*\
  !*** ./src/app/shared/components/entity-detail/entity-detail-Header/entity-detail-header.component.scss ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: block;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9mdW5naS9FL1Rvc1Byb2plY3QvVG9zR3VydUJhc2UvdG9zLWRhdGFiYXNlL3Rvcy13ZWIvc3JjL2FwcC9zaGFyZWQvY29tcG9uZW50cy9lbnRpdHktZGV0YWlsL2VudGl0eS1kZXRhaWwtSGVhZGVyL2VudGl0eS1kZXRhaWwtaGVhZGVyLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9zaGFyZWQvY29tcG9uZW50cy9lbnRpdHktZGV0YWlsL2VudGl0eS1kZXRhaWwtSGVhZGVyL2VudGl0eS1kZXRhaWwtaGVhZGVyLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsZUFBQTtDQ0NEIiwiZmlsZSI6InNyYy9hcHAvc2hhcmVkL2NvbXBvbmVudHMvZW50aXR5LWRldGFpbC9lbnRpdHktZGV0YWlsLUhlYWRlci9lbnRpdHktZGV0YWlsLWhlYWRlci5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIjpob3N0IHtcbiAgZGlzcGxheTogYmxvY2s7XG59XG4iLCI6aG9zdCB7XG4gIGRpc3BsYXk6IGJsb2NrO1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/shared/components/entity-detail/entity-detail-Header/entity-detail-header.component.ts":
/*!********************************************************************************************************!*\
  !*** ./src/app/shared/components/entity-detail/entity-detail-Header/entity-detail-header.component.ts ***!
  \********************************************************************************************************/
/*! exports provided: EntityDetailHeaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EntityDetailHeaderComponent", function() { return EntityDetailHeaderComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _entity_detail_child_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../entity-detail-child.component */ "./src/app/shared/components/entity-detail/entity-detail-child.component.ts");
/* harmony import */ var _domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../domain/tos/tos-domain */ "./src/app/shared/domain/tos/tos-domain.ts");




var EntityDetailHeaderComponent = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](EntityDetailHeaderComponent, _super);
    function EntityDetailHeaderComponent(changeDetector) {
        return _super.call(this, changeDetector) || this;
    }
    Object.defineProperty(EntityDetailHeaderComponent.prototype, "titleSmall", {
        get: function () {
            if (this.equipment)
                return _domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_3__["TOSEquipmentTypeService"].toStringHuman(this.equipment.TypeEquipment) +
                    (this.equipment.Material ? ' [' + this.equipment.Material + ']' : '') +
                    (this.equipment.TypeAttack ? ' [' + this.equipment.TypeAttack + ']' : '');
            else if (this.monster)
                return this.monster.Rank + ' [' + this.monster.Armor + ']';
            else if (this.gem)
                return this.item.Type + ' [' + this.gem.TypeGem + ']';
            else if (this.item)
                return this.item.Type;
        },
        enumerable: true,
        configurable: true
    });
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Boolean)
    ], EntityDetailHeaderComponent.prototype, "idName", void 0);
    EntityDetailHeaderComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'tos-entity-detail-Header',
            template: __webpack_require__(/*! ./entity-detail-header.component.html */ "./src/app/shared/components/entity-detail/entity-detail-Header/entity-detail-header.component.html"),
            styles: [__webpack_require__(/*! ./entity-detail-header.component.scss */ "./src/app/shared/components/entity-detail/entity-detail-Header/entity-detail-header.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]])
    ], EntityDetailHeaderComponent);
    return EntityDetailHeaderComponent;
}(_entity_detail_child_component__WEBPACK_IMPORTED_MODULE_2__["EntityDetailChildComponent"]));



/***/ }),

/***/ "./src/app/shared/components/entity-detail/entity-detail-Information/entity-detail-Information.component.html":
/*!********************************************************************************************************************!*\
  !*** ./src/app/shared/components/entity-detail/entity-detail-Information/entity-detail-Information.component.html ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"attribute || item || job || monster || skill\">\n  <div class=\"w-100\" *ngIf=\"divider\"><hr></div>\n  <h5 *ngIf=\"header\">Information</h5>\n\n  <!-- Level/Difficulty/CoolDown and Toggleable/LifeTime/Rank/Size/SP -->\n  <div class=\"row pt-2 text-nowrap\" *ngIf=\"attribute || item || job || monster || skill\">\n    <div class=\"col\" *ngIf=\"attribute || equipment || job || monster\">\n      <h6 *ngIf=\"attribute\">Maximum Level: {{ attribute.LevelMax }}</h6>\n      <h6 *ngIf=\"job\" class=\"d-flex flex-row\">\n        <span class=\"badge badge-primary pt-1 pb-1 text-left\">Difficulty</span>\n        <span class=\"col pt-1 pb-1 text-right\">{{ job.JobDifficulty }}</span>\n      </h6>\n      <h6 *ngIf=\"equipment || monster\">Level {{ equipment?.RequiredLevel || monster?.Level }}</h6>\n    </div>\n    <div class=\"col\" *ngIf=\"skill || item && !equipment\"><h6>\n      <fa-icon class=\"mr-1\" [icon]=\"faClock\"></fa-icon>\n      {{ ((item ? item.TimeCoolDown : skillCoolDown) | tosTime) || 'No cooldown' }}</h6>\n    </div>\n\n    <div class=\"col text-right\">\n      <h6 *ngIf=\"attribute\">{{ attribute.IsToggleable ? 'Toggleable' : '' }}</h6>\n      <h6 *ngIf=\"item\">{{ item.TimeLifeTime ? ('Expires in ' + (item.TimeLifeTime | tosTime)) : 'No expiration' }}</h6>\n      <h6 *ngIf=\"job\" class=\"d-flex flex-row\">\n        <span class=\"badge badge-primary pt-1 pb-1 text-left\">Rank</span>\n        <span class=\"col pt-1 pb-1 text-right\">{{ job.Rank }}</span>\n      </h6>\n      <h6 *ngIf=\"monster\">{{ monster.Size }}</h6>\n      <h6 *ngIf=\"skill\">{{ skillSP }}&nbsp;<fa-icon style=\"color: #319AFF\" [icon]=\"faTint\"></fa-icon></h6>\n    </div>\n  </div>\n\n  <!-- Weight/Type/OverHeat and Price/Shinobi+Simony -->\n  <div class=\"row text-nowrap\" *ngIf=\"item || job || skill\">\n    <div class=\"col\" *ngIf=\"item\"><h6>\n      <fa-icon class=\"mr-1\" [icon]=\"faWeightHanging\"></fa-icon>\n      {{ (item.Weight | number) || 0 }}</h6>\n    </div>\n    <div class=\"col\" *ngIf=\"job\">\n      <h6 *ngIf=\"job\" class=\"d-flex flex-row\">\n        <span class=\"badge badge-primary pt-1 pb-1 text-left\">Role</span>\n        <span class=\"col pt-1 pb-1 text-right\">{{ job.JobType ? job.JobType.join(', ') : '' }}</span>\n      </h6>\n    </div>\n    <div class=\"col\" *ngIf=\"skill && skill.OverHeat\"><h6>\n      <fa-icon class=\"ml-1 mr-1\" [icon]=\"faBolt\"></fa-icon>\n      {{ skill.OverHeat }} overheat</h6>\n    </div>\n\n    <div class=\"col text-right\" *ngIf=\"item || skill\">\n      <h6 *ngIf=\"item\" class=\"tos-icon tos-icon-price\">{{ item.Price }}</h6>\n      <h6 *ngIf=\"skill && (skill.IsEnchanter || skill.IsPardoner || skill.IsRunecaster || skill.IsShinobi)\">\n        {{ skill.IsEnchanter\n            ? 'Craftable by Enchanter'\n            : skill.IsPardoner\n                ? 'Craftable by Pardoner'\n                : skill.IsRunecaster\n                  ? 'Craftable by Runecaster'\n                  : skill.IsShinobi\n                    ? 'Cloneable by Shinobi'\n                    : '' }}\n      </h6>\n    </div>\n  </div>\n\n  <!-- Element and Race -->\n  <div class=\"row text-nowrap\" *ngIf=\"monster\">\n    <div class=\"col\">\n      <h6>\n        <img class=\"align-middle mr-1\"\n             height=\"24\"\n             width=\"24\"\n             [src]=\"'assets/images/element_' + entity['Element'].toString().toLowerCase() + '.png'\" />\n        <span>{{ entity['Element'] }}</span>\n      </h6>\n    </div>\n    <div class=\"col\">\n      <h6 class=\"text-right\">\n        <span>{{ monster.Race }}</span>\n        <img class=\"align-middle ml-1\"\n             height=\"24\"\n             width=\"24\"\n             [src]=\"'assets/images/monster_race_' + monster.Race.toString().toLowerCase() + '.png'\" />\n      </h6>\n    </div>\n  </div>\n\n  <!-- Tradability -->\n  <div class=\"row mt-1\" *ngIf=\"item\">\n    <div class=\"col\">\n      <table class=\"table table-sm text-center mb-0\">\n        <tbody>\n        <tr>\n          <td [class]=\"item.isTradable(TOSItemTradability.MARKET) ? 'table-success' : 'table-secondary'\" >{{ TOSItemTradability.MARKET }}</td>\n          <td [class]=\"item.isTradable(TOSItemTradability.PLAYER) ? 'table-success' : 'table-secondary'\" >{{ TOSItemTradability.PLAYER }}</td>\n          <td [class]=\"item.isTradable(TOSItemTradability.SHOP) ? 'table-success' : 'table-secondary'\" >{{ TOSItemTradability.SHOP }}</td>\n          <td [class]=\"item.isTradable(TOSItemTradability.TEAM) ? 'table-success' : 'table-secondary'\" >{{ TOSItemTradability.TEAM }}</td>\n        </tr>\n        </tbody>\n      </table>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/shared/components/entity-detail/entity-detail-Information/entity-detail-Information.component.scss":
/*!********************************************************************************************************************!*\
  !*** ./src/app/shared/components/entity-detail/entity-detail-Information/entity-detail-Information.component.scss ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".badge {\n  font-size: inherit;\n}\n\n.table td {\n  border-top: none !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9mdW5naS9FL1Rvc1Byb2plY3QvVG9zR3VydUJhc2UvdG9zLWRhdGFiYXNlL3Rvcy13ZWIvc3JjL2FwcC9zaGFyZWQvY29tcG9uZW50cy9lbnRpdHktZGV0YWlsL2VudGl0eS1kZXRhaWwtSW5mb3JtYXRpb24vZW50aXR5LWRldGFpbC1JbmZvcm1hdGlvbi5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvc2hhcmVkL2NvbXBvbmVudHMvZW50aXR5LWRldGFpbC9lbnRpdHktZGV0YWlsLUluZm9ybWF0aW9uL2VudGl0eS1kZXRhaWwtSW5mb3JtYXRpb24uY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxtQkFBQTtDQ0NEOztBREVEO0VBQ0UsNEJBQUE7Q0NDRCIsImZpbGUiOiJzcmMvYXBwL3NoYXJlZC9jb21wb25lbnRzL2VudGl0eS1kZXRhaWwvZW50aXR5LWRldGFpbC1JbmZvcm1hdGlvbi9lbnRpdHktZGV0YWlsLUluZm9ybWF0aW9uLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmJhZGdlIHtcbiAgZm9udC1zaXplOiBpbmhlcml0O1xufVxuXG4udGFibGUgdGQge1xuICBib3JkZXItdG9wOiBub25lICFpbXBvcnRhbnQ7XG59XG4iLCIuYmFkZ2Uge1xuICBmb250LXNpemU6IGluaGVyaXQ7XG59XG5cbi50YWJsZSB0ZCB7XG4gIGJvcmRlci10b3A6IG5vbmUgIWltcG9ydGFudDtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/shared/components/entity-detail/entity-detail-Information/entity-detail-Information.component.ts":
/*!******************************************************************************************************************!*\
  !*** ./src/app/shared/components/entity-detail/entity-detail-Information/entity-detail-Information.component.ts ***!
  \******************************************************************************************************************/
/*! exports provided: EntityDetailInformationComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EntityDetailInformationComponent", function() { return EntityDetailInformationComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _entity_detail_child_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../entity-detail-child.component */ "./src/app/shared/components/entity-detail/entity-detail-child.component.ts");
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "./node_modules/@fortawesome/free-solid-svg-icons/index.es.js");
/* harmony import */ var _fortawesome_free_regular_svg_icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @fortawesome/free-regular-svg-icons */ "./node_modules/@fortawesome/free-regular-svg-icons/index.es.js");





var EntityDetailInformationComponent = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](EntityDetailInformationComponent, _super);
    function EntityDetailInformationComponent(changeDetector) {
        var _this = _super.call(this, changeDetector) || this;
        _this.faBolt = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__["faBolt"];
        _this.faClock = _fortawesome_free_regular_svg_icons__WEBPACK_IMPORTED_MODULE_4__["faClock"];
        _this.faTint = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__["faTint"];
        _this.faWeightHanging = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__["faWeightHanging"];
        return _this;
    }
    EntityDetailInformationComponent.prototype.onSkillChange = function (value) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a, _b;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!(value == null || value.$ID == this.skill.$ID)) return [3 /*break*/, 3];
                        _a = this;
                        return [4 /*yield*/, this.skill.BuildCoolDown(this.build).toPromise()];
                    case 1:
                        _a.skillCoolDown = (_c.sent()) / 1000;
                        _b = this;
                        return [4 /*yield*/, this.skill.BuildSP(this.build).toPromise()];
                    case 2:
                        _b.skillSP = _c.sent();
                        this.changeDetector.markForCheck();
                        _c.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    EntityDetailInformationComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        _super.prototype.ngOnChanges.call(this, changes);
        if (this.build && this.skill) {
            this.subscriptionSkill && this.subscriptionSkill.unsubscribe();
            this.subscriptionSkill = this.build.Skill$.subscribe(function (value) { return _this.onSkillChange(value); });
            this.onSkillChange(null);
        }
    };
    EntityDetailInformationComponent.prototype.ngOnDestroy = function () {
        this.changeDetector.detach();
        this.subscriptionSkill && this.subscriptionSkill.unsubscribe();
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], EntityDetailInformationComponent.prototype, "build", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Boolean)
    ], EntityDetailInformationComponent.prototype, "divider", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Boolean)
    ], EntityDetailInformationComponent.prototype, "header", void 0);
    EntityDetailInformationComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
            selector: 'tos-entity-detail-Information',
            template: __webpack_require__(/*! ./entity-detail-Information.component.html */ "./src/app/shared/components/entity-detail/entity-detail-Information/entity-detail-Information.component.html"),
            styles: [__webpack_require__(/*! ./entity-detail-Information.component.scss */ "./src/app/shared/components/entity-detail/entity-detail-Information/entity-detail-Information.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]])
    ], EntityDetailInformationComponent);
    return EntityDetailInformationComponent;
}(_entity_detail_child_component__WEBPACK_IMPORTED_MODULE_2__["EntityDetailChildComponent"]));



/***/ }),

/***/ "./src/app/shared/components/entity-detail/entity-detail-JobAnimation/entity-detail-JobAnimation.component.html":
/*!**********************************************************************************************************************!*\
  !*** ./src/app/shared/components/entity-detail/entity-detail-JobAnimation/entity-detail-JobAnimation.component.html ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"job && job.IconAnimations\">\n  <ngb-carousel class=\"row d-flex align-items-center pt-3 pb-5\" [interval]=\"false\" [wrap]=\"true\">\n    <ng-template ngbSlide *ngFor=\"let icon of job.IconAnimations\">\n      <div class=\"d-flex justify-content-center w-100\">\n        <img class=\"rounded\" style=\"background: #ecf0f1\" [src]=\"icon\" />\n      </div>\n    </ng-template>\n  </ngb-carousel>\n</div>\n"

/***/ }),

/***/ "./src/app/shared/components/entity-detail/entity-detail-JobAnimation/entity-detail-JobAnimation.component.scss":
/*!**********************************************************************************************************************!*\
  !*** ./src/app/shared/components/entity-detail/entity-detail-JobAnimation/entity-detail-JobAnimation.component.scss ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3NoYXJlZC9jb21wb25lbnRzL2VudGl0eS1kZXRhaWwvZW50aXR5LWRldGFpbC1Kb2JBbmltYXRpb24vZW50aXR5LWRldGFpbC1Kb2JBbmltYXRpb24uY29tcG9uZW50LnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/shared/components/entity-detail/entity-detail-JobAnimation/entity-detail-JobAnimation.component.ts":
/*!********************************************************************************************************************!*\
  !*** ./src/app/shared/components/entity-detail/entity-detail-JobAnimation/entity-detail-JobAnimation.component.ts ***!
  \********************************************************************************************************************/
/*! exports provided: EntityDetailJobAnimationComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EntityDetailJobAnimationComponent", function() { return EntityDetailJobAnimationComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _entity_detail_child_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../entity-detail-child.component */ "./src/app/shared/components/entity-detail/entity-detail-child.component.ts");



var EntityDetailJobAnimationComponent = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](EntityDetailJobAnimationComponent, _super);
    function EntityDetailJobAnimationComponent(changeDetector) {
        return _super.call(this, changeDetector) || this;
    }
    EntityDetailJobAnimationComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'tos-entity-detail-JobAnimation',
            template: __webpack_require__(/*! ./entity-detail-JobAnimation.component.html */ "./src/app/shared/components/entity-detail/entity-detail-JobAnimation/entity-detail-JobAnimation.component.html"),
            styles: [__webpack_require__(/*! ./entity-detail-JobAnimation.component.scss */ "./src/app/shared/components/entity-detail/entity-detail-JobAnimation/entity-detail-JobAnimation.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]])
    ], EntityDetailJobAnimationComponent);
    return EntityDetailJobAnimationComponent;
}(_entity_detail_child_component__WEBPACK_IMPORTED_MODULE_2__["EntityDetailChildComponent"]));



/***/ }),

/***/ "./src/app/shared/components/entity-detail/entity-detail-JobIcon/skill-builder-job-icon.component.html":
/*!*************************************************************************************************************!*\
  !*** ./src/app/shared/components/entity-detail/entity-detail-JobIcon/skill-builder-job-icon.component.html ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<img class=\"position-absolute w-100 h-100\" [src]=\"job.Icon\" />\n<div class=\"d-flex flex-row position-absolute justify-content-center w-100\" style=\"bottom: 0\">\n  <fa-icon *ngFor=\"let c of job.CircleAvailable\" [icon]=\"faStar\"\n           [size]=\"size\"\n           [ngClass]=\"{ 'text-warning': c <= circle }\"></fa-icon>\n</div>\n"

/***/ }),

/***/ "./src/app/shared/components/entity-detail/entity-detail-JobIcon/skill-builder-job-icon.component.scss":
/*!*************************************************************************************************************!*\
  !*** ./src/app/shared/components/entity-detail/entity-detail-JobIcon/skill-builder-job-icon.component.scss ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: block;\n  position: relative;\n  width: 4rem;\n  height: 4rem;\n}\n\nfa-icon {\n  color: #bbb;\n  filter: drop-shadow(0 0 1px #222);\n  stroke: #222;\n  stroke-width: 3rem;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9mdW5naS9FL1Rvc1Byb2plY3QvVG9zR3VydUJhc2UvdG9zLWRhdGFiYXNlL3Rvcy13ZWIvc3JjL2FwcC9zaGFyZWQvY29tcG9uZW50cy9lbnRpdHktZGV0YWlsL2VudGl0eS1kZXRhaWwtSm9iSWNvbi9za2lsbC1idWlsZGVyLWpvYi1pY29uLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9zaGFyZWQvY29tcG9uZW50cy9lbnRpdHktZGV0YWlsL2VudGl0eS1kZXRhaWwtSm9iSWNvbi9za2lsbC1idWlsZGVyLWpvYi1pY29uLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsZUFBQTtFQUNBLG1CQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7Q0NDRDs7QURFRDtFQUNFLFlBQUE7RUFDQSxrQ0FBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtDQ0NEIiwiZmlsZSI6InNyYy9hcHAvc2hhcmVkL2NvbXBvbmVudHMvZW50aXR5LWRldGFpbC9lbnRpdHktZGV0YWlsLUpvYkljb24vc2tpbGwtYnVpbGRlci1qb2ItaWNvbi5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIjpob3N0IHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgd2lkdGg6IDRyZW07XG4gIGhlaWdodDogNHJlbTtcbn1cblxuZmEtaWNvbiB7XG4gIGNvbG9yOiAjYmJiO1xuICBmaWx0ZXI6IGRyb3Atc2hhZG93KCAwIDAgMXB4ICMyMjIgKTtcbiAgc3Ryb2tlOiAjMjIyO1xuICBzdHJva2Utd2lkdGg6IDNyZW07XG59XG4iLCI6aG9zdCB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHdpZHRoOiA0cmVtO1xuICBoZWlnaHQ6IDRyZW07XG59XG5cbmZhLWljb24ge1xuICBjb2xvcjogI2JiYjtcbiAgZmlsdGVyOiBkcm9wLXNoYWRvdygwIDAgMXB4ICMyMjIpO1xuICBzdHJva2U6ICMyMjI7XG4gIHN0cm9rZS13aWR0aDogM3JlbTtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/shared/components/entity-detail/entity-detail-JobIcon/skill-builder-job-icon.component.ts":
/*!***********************************************************************************************************!*\
  !*** ./src/app/shared/components/entity-detail/entity-detail-JobIcon/skill-builder-job-icon.component.ts ***!
  \***********************************************************************************************************/
/*! exports provided: EntityDetailJobIconComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EntityDetailJobIconComponent", function() { return EntityDetailJobIconComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _domain_tos_job_tos_job_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../domain/tos/job/tos-job.model */ "./src/app/shared/domain/tos/job/tos-job.model.ts");
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "./node_modules/@fortawesome/free-solid-svg-icons/index.es.js");




var EntityDetailJobIconComponent = /** @class */ (function () {
    function EntityDetailJobIconComponent() {
        this.faStar = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__["faStar"];
    }
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Number)
    ], EntityDetailJobIconComponent.prototype, "circle", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _domain_tos_job_tos_job_model__WEBPACK_IMPORTED_MODULE_2__["TOSJob"])
    ], EntityDetailJobIconComponent.prototype, "job", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], EntityDetailJobIconComponent.prototype, "size", void 0);
    EntityDetailJobIconComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
            selector: 'tos-entity-detail-JobIcon',
            template: __webpack_require__(/*! ./skill-builder-job-icon.component.html */ "./src/app/shared/components/entity-detail/entity-detail-JobIcon/skill-builder-job-icon.component.html"),
            styles: [__webpack_require__(/*! ./skill-builder-job-icon.component.scss */ "./src/app/shared/components/entity-detail/entity-detail-JobIcon/skill-builder-job-icon.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], EntityDetailJobIconComponent);
    return EntityDetailJobIconComponent;
}());



/***/ }),

/***/ "./src/app/shared/components/entity-detail/entity-detail-Skill/entity-detail-Skill.component.html":
/*!********************************************************************************************************!*\
  !*** ./src/app/shared/components/entity-detail/entity-detail-Skill/entity-detail-Skill.component.html ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"build && skill\">\n  <div class=\"w-100\" *ngIf=\"divider\"><hr></div>\n\n  <tos-input-number class=\"h5 text-center mt-3 mb-3\" *ngIf=\"input\"\n                    [label]=\"'Level'\"\n                    [labelMax]=\"build.skillLevelMax$(skill) | async\"\n                    [min]=\"0\" [max]=\"(build.skillLevelMax$(skill) | async) + 5\"\n                    [model]=\"skillLevel\"\n                    (modelChange)=\"onSkillLevelIncrement($event)\"></tos-input-number>\n\n  <!-- Description -->\n  <tos-entity-detail-Description [entity]=\"entity\"></tos-entity-detail-Description>\n\n  <!-- Skill Effects -->\n  <div *ngIf=\"build\">\n    <hr />\n    <p class=\"text-multiline mb-0\" [innerHTML]=\"effectHTML | sanitizeHTML\"></p>\n  </div>\n\n  <!-- Information -->\n  <tos-entity-detail-Information [build]=\"build\"\n                                 [entity]=\"entity\"\n                                 [divider]=\"true\"></tos-entity-detail-Information>\n\n</div>\n"

/***/ }),

/***/ "./src/app/shared/components/entity-detail/entity-detail-Skill/entity-detail-Skill.component.scss":
/*!********************************************************************************************************!*\
  !*** ./src/app/shared/components/entity-detail/entity-detail-Skill/entity-detail-Skill.component.scss ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3NoYXJlZC9jb21wb25lbnRzL2VudGl0eS1kZXRhaWwvZW50aXR5LWRldGFpbC1Ta2lsbC9lbnRpdHktZGV0YWlsLVNraWxsLmNvbXBvbmVudC5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/shared/components/entity-detail/entity-detail-Skill/entity-detail-Skill.component.ts":
/*!******************************************************************************************************!*\
  !*** ./src/app/shared/components/entity-detail/entity-detail-Skill/entity-detail-Skill.component.ts ***!
  \******************************************************************************************************/
/*! exports provided: EntityDetailSkillComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EntityDetailSkillComponent", function() { return EntityDetailSkillComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _entity_detail_child_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../entity-detail-child.component */ "./src/app/shared/components/entity-detail/entity-detail-child.component.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");




var EntityDetailSkillComponent = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](EntityDetailSkillComponent, _super);
    function EntityDetailSkillComponent(changeDetector) {
        return _super.call(this, changeDetector) || this;
    }
    EntityDetailSkillComponent.prototype.onSkillChange = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.skillLevel = this.build.skillLevel(this.skill);
                        _a = this;
                        return [4 /*yield*/, this.build.skillEffect$(this.skill, this.input).toPromise()];
                    case 1:
                        _a.effectHTML = _b.sent();
                        this.changeDetector.markForCheck();
                        return [2 /*return*/];
                }
            });
        });
    };
    EntityDetailSkillComponent.prototype.onSkillLevelIncrement = function (value) {
        this.build.skillLevelIncrement$(this.skill, value - this.skillLevel, true);
    };
    EntityDetailSkillComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        _super.prototype.ngOnChanges.call(this, changes);
        if (this.build && this.skill) {
            this.subscriptionSkill && this.subscriptionSkill.unsubscribe();
            this.subscriptionSkill = this.build.Skill$
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["filter"])(function (value) { return value && value.$ID == _this.skill.$ID; }))
                .subscribe(function (value) { return _this.onSkillChange(); });
            this.onSkillChange();
        }
        else if (!this.skill) {
            this.subscriptionSkill && this.subscriptionSkill.unsubscribe();
        }
    };
    EntityDetailSkillComponent.prototype.ngOnDestroy = function () {
        this.subscriptionSkill && this.subscriptionSkill.unsubscribe();
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], EntityDetailSkillComponent.prototype, "build", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Boolean)
    ], EntityDetailSkillComponent.prototype, "divider", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Boolean)
    ], EntityDetailSkillComponent.prototype, "input", void 0);
    EntityDetailSkillComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
            selector: 'tos-entity-detail-Skill',
            template: __webpack_require__(/*! ./entity-detail-Skill.component.html */ "./src/app/shared/components/entity-detail/entity-detail-Skill/entity-detail-Skill.component.html"),
            styles: [__webpack_require__(/*! ./entity-detail-Skill.component.scss */ "./src/app/shared/components/entity-detail/entity-detail-Skill/entity-detail-Skill.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]])
    ], EntityDetailSkillComponent);
    return EntityDetailSkillComponent;
}(_entity_detail_child_component__WEBPACK_IMPORTED_MODULE_2__["EntityDetailChildComponent"]));



/***/ }),

/***/ "./src/app/shared/components/entity-detail/entity-detail-SkillFormula/entity-detail-SkillFormula.component.html":
/*!**********************************************************************************************************************!*\
  !*** ./src/app/shared/components/entity-detail/entity-detail-SkillFormula/entity-detail-SkillFormula.component.html ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"build && skill\">\n  <div class=\"w-100\" *ngIf=\"divider\"><hr></div>\n  <h5>Formulas</h5>\n\n  <ul class=\"nav nav-tabs flex-nowrap\" style=\"overflow-x: auto; overflow-y: hidden; border-bottom: 0 !important\">\n    <li *ngFor=\"let tab of tabs\" class=\"nav-item\">\n      <a class=\"nav-link text-capitalize\"\n         [ngClass]=\"{ 'active': active == tab}\"\n         [href]=\"'#' + tab\"\n         (click)=\"onTabClick($event, tab)\">{{ tab }}</a>\n    </li>\n  </ul>\n\n  <div class=\"card\" style=\"border-top: 0 !important; border-top-left-radius: 0\">\n    <small class=\"card-body text-monospace\" style=\"line-height: 1.3; max-height: 20rem; overflow-x: auto; white-space: pre\"\n         [innerHTML]=\"tabsHTML[active] | sanitizeHTML\"></small>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/shared/components/entity-detail/entity-detail-SkillFormula/entity-detail-SkillFormula.component.scss":
/*!**********************************************************************************************************************!*\
  !*** ./src/app/shared/components/entity-detail/entity-detail-SkillFormula/entity-detail-SkillFormula.component.scss ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3NoYXJlZC9jb21wb25lbnRzL2VudGl0eS1kZXRhaWwvZW50aXR5LWRldGFpbC1Ta2lsbEZvcm11bGEvZW50aXR5LWRldGFpbC1Ta2lsbEZvcm11bGEuY29tcG9uZW50LnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/shared/components/entity-detail/entity-detail-SkillFormula/entity-detail-SkillFormula.component.ts":
/*!********************************************************************************************************************!*\
  !*** ./src/app/shared/components/entity-detail/entity-detail-SkillFormula/entity-detail-SkillFormula.component.ts ***!
  \********************************************************************************************************************/
/*! exports provided: EntityDetailSkillFormulaComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EntityDetailSkillFormulaComponent", function() { return EntityDetailSkillFormulaComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _entity_detail_child_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../entity-detail-child.component */ "./src/app/shared/components/entity-detail/entity-detail-child.component.ts");



var EntityDetailSkillFormulaComponent = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](EntityDetailSkillFormulaComponent, _super);
    function EntityDetailSkillFormulaComponent(changeDetector) {
        var _this = _super.call(this, changeDetector) || this;
        _this.tabsHTML = {};
        return _this;
    }
    EntityDetailSkillFormulaComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        _super.prototype.ngOnChanges.call(this, changes);
        if (this.build && this.skill) {
            this.tabs = this.skill.EffectProps
                .map(function (match) { return match[1]; })
                .filter(function (value, index, self) { return self.indexOf(value) === index; })
                .concat(['CoolDown', 'SP']);
            this.active = this.tabs[0];
            this.tabs.map(function (tab) { return _this.build
                .skillEffectFormula$(_this.skill, tab)
                .subscribe(function (value) {
                _this.tabsHTML[tab] = value;
                _this.changeDetector.markForCheck();
            }); });
        }
    };
    EntityDetailSkillFormulaComponent.prototype.ngOnDestroy = function () {
        this.changeDetector.detach();
    };
    EntityDetailSkillFormulaComponent.prototype.onTabClick = function (event, tab) {
        event.preventDefault();
        this.active = tab;
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], EntityDetailSkillFormulaComponent.prototype, "build", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Boolean)
    ], EntityDetailSkillFormulaComponent.prototype, "divider", void 0);
    EntityDetailSkillFormulaComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
            selector: 'tos-entity-detail-SkillFormula',
            template: __webpack_require__(/*! ./entity-detail-SkillFormula.component.html */ "./src/app/shared/components/entity-detail/entity-detail-SkillFormula/entity-detail-SkillFormula.component.html"),
            styles: [__webpack_require__(/*! ./entity-detail-SkillFormula.component.scss */ "./src/app/shared/components/entity-detail/entity-detail-SkillFormula/entity-detail-SkillFormula.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]])
    ], EntityDetailSkillFormulaComponent);
    return EntityDetailSkillFormulaComponent;
}(_entity_detail_child_component__WEBPACK_IMPORTED_MODULE_2__["EntityDetailChildComponent"]));



/***/ }),

/***/ "./src/app/shared/components/entity-detail/entity-detail-Stats/entity-detail-Stats.component.html":
/*!********************************************************************************************************!*\
  !*** ./src/app/shared/components/entity-detail/entity-detail-Stats/entity-detail-Stats.component.html ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"w-100\"><hr></div>\n<h5 *ngIf=\"card\">Stats (Card Battle)</h5>\n<h5 *ngIf=\"monster\">Stats</h5>\n\n<div *ngIf=\"card\">\n  <div class=\"row text-center\">\n    <div class=\"col\">\n      <table class=\"table table-borderless table-sm mb-0\">\n        <thead>\n        <tr class=\"table-primary\">\n          <th scope=\"col\">Height</th>\n          <th scope=\"col\">Legs</th>\n          <th scope=\"col\">Weight</th>\n        </tr>\n        </thead>\n        <tbody>\n        <tr>\n          <td>{{ card.Stat_Height | number }}</td>\n          <td>{{ card.Stat_Legs | number }}</td>\n          <td>{{ card.Stat_Weight | number }}</td>\n        </tr>\n        </tbody>\n      </table>\n    </div>\n  </div>\n</div>\n\n<div *ngIf=\"monster\">\n  <div class=\"row text-center\">\n    <div class=\"col\">\n      <table class=\"table table-borderless table-sm\">\n        <thead>\n        <tr class=\"table-primary\">\n          <th scope=\"col\">STR</th>\n          <th scope=\"col\">CON</th>\n          <th scope=\"col\">INT</th>\n          <th scope=\"col\">SPR</th>\n          <th scope=\"col\">DEX</th>\n        </tr>\n        </thead>\n        <tbody>\n        <tr>\n          <td>{{ monster.Stat_STR | number }}</td>\n          <td>{{ monster.Stat_CON | number }}</td>\n          <td>{{ monster.Stat_INT | number }}</td>\n          <td>{{ monster.Stat_SPR | number }}</td>\n          <td>{{ monster.Stat_DEX | number }}</td>\n        </tr>\n        </tbody>\n      </table>\n    </div>\n  </div>\n\n  <div class=\"row text-center\">\n    <div class=\"col\">\n      <table class=\"table table-borderless table-sm\">\n        <thead>\n        <tr class=\"table-primary\">\n          <th scope=\"col\">Accuracy</th>\n          <th scope=\"col\">Evasion</th>\n          <th scope=\"col\">Defense</th>\n          <th scope=\"col\">Magic Defense</th>\n        </tr>\n        </thead>\n        <tbody>\n        <tr>\n          <td>{{ monster.Stat_Accuracy | number }}</td>\n          <td>{{ monster.Stat_Evasion | number }}</td>\n          <td>{{ monster.Stat_DEFENSE_PHYSICAL | number }}</td>\n          <td>{{ monster.Stat_DEFENSE_MAGICAL | number }}</td>\n        </tr>\n        </tbody>\n      </table>\n    </div>\n  </div>\n\n  <div class=\"row text-center\">\n    <div class=\"col\">\n      <table class=\"table table-borderless table-sm\">\n        <thead>\n        <tr class=\"table-primary\">\n          <th scope=\"col\">Critical Damage</th>\n          <th scope=\"col\">Critical Defense</th>\n          <th scope=\"col\">Critical Rate</th>\n        </tr>\n        </thead>\n        <tbody>\n        <tr>\n          <td>{{ monster.Stat_CriticalDamage | number }}</td>\n          <td>{{ monster.Stat_CriticalDefense | number }}</td>\n          <td>{{ monster.Stat_CriticalRate | number }}</td>\n        </tr>\n        </tbody>\n      </table>\n    </div>\n  </div>\n\n  <div class=\"row text-center\">\n    <div class=\"col\">\n      <table class=\"table table-borderless table-sm mb-0\">\n        <thead>\n        <tr class=\"table-primary\">\n          <th scope=\"col\">Block Penetration</th>\n          <th scope=\"col\">Block Rate</th>\n        </tr>\n        </thead>\n        <tbody>\n        <tr>\n          <td>{{ monster.Stat_BlockPenetration | number }}</td>\n          <td>{{ monster.Stat_BlockRate | number }}</td>\n        </tr>\n        </tbody>\n      </table>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/shared/components/entity-detail/entity-detail-Stats/entity-detail-Stats.component.scss":
/*!********************************************************************************************************!*\
  !*** ./src/app/shared/components/entity-detail/entity-detail-Stats/entity-detail-Stats.component.scss ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3NoYXJlZC9jb21wb25lbnRzL2VudGl0eS1kZXRhaWwvZW50aXR5LWRldGFpbC1TdGF0cy9lbnRpdHktZGV0YWlsLVN0YXRzLmNvbXBvbmVudC5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/shared/components/entity-detail/entity-detail-Stats/entity-detail-Stats.component.ts":
/*!******************************************************************************************************!*\
  !*** ./src/app/shared/components/entity-detail/entity-detail-Stats/entity-detail-Stats.component.ts ***!
  \******************************************************************************************************/
/*! exports provided: EntityDetailStatsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EntityDetailStatsComponent", function() { return EntityDetailStatsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _entity_detail_child_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../entity-detail-child.component */ "./src/app/shared/components/entity-detail/entity-detail-child.component.ts");



var EntityDetailStatsComponent = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](EntityDetailStatsComponent, _super);
    function EntityDetailStatsComponent(changeDetector) {
        return _super.call(this, changeDetector) || this;
    }
    EntityDetailStatsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'tos-entity-detail-Stats',
            template: __webpack_require__(/*! ./entity-detail-Stats.component.html */ "./src/app/shared/components/entity-detail/entity-detail-Stats/entity-detail-Stats.component.html"),
            styles: [__webpack_require__(/*! ./entity-detail-Stats.component.scss */ "./src/app/shared/components/entity-detail/entity-detail-Stats/entity-detail-Stats.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]])
    ], EntityDetailStatsComponent);
    return EntityDetailStatsComponent;
}(_entity_detail_child_component__WEBPACK_IMPORTED_MODULE_2__["EntityDetailChildComponent"]));



/***/ }),

/***/ "./src/app/shared/components/entity-detail/entity-detail-Table/entity-detail-Table.component.html":
/*!********************************************************************************************************!*\
  !*** ./src/app/shared/components/entity-detail/entity-detail-Table/entity-detail-Table.component.html ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div>\n  <div class=\"w-100\" *ngIf=\"divider\"><hr></div>\n  <h5>{{ header }}</h5>\n\n  <tos-entity-table class=\"d-block\" style=\"max-height: calc(49px * 4.5); overflow-y: auto;\"\n                    [columns]=\"columns\"\n                    [data]=\"data\"\n                    [header]=\"false\"\n                    [hideMobile]=\"true\"\n                    [hideTablet]=\"true\"\n                    [selected]=\"selected\"\n                    [themeInvert]=\"themeInvert\"\n  ></tos-entity-table>\n</div>\n"

/***/ }),

/***/ "./src/app/shared/components/entity-detail/entity-detail-Table/entity-detail-Table.component.scss":
/*!********************************************************************************************************!*\
  !*** ./src/app/shared/components/entity-detail/entity-detail-Table/entity-detail-Table.component.scss ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3NoYXJlZC9jb21wb25lbnRzL2VudGl0eS1kZXRhaWwvZW50aXR5LWRldGFpbC1UYWJsZS9lbnRpdHktZGV0YWlsLVRhYmxlLmNvbXBvbmVudC5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/shared/components/entity-detail/entity-detail-Table/entity-detail-Table.component.ts":
/*!******************************************************************************************************!*\
  !*** ./src/app/shared/components/entity-detail/entity-detail-Table/entity-detail-Table.component.ts ***!
  \******************************************************************************************************/
/*! exports provided: EntityDetailTableComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EntityDetailTableComponent", function() { return EntityDetailTableComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _entity_detail_child_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../entity-detail-child.component */ "./src/app/shared/components/entity-detail/entity-detail-child.component.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");




var EntityDetailTableComponent = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](EntityDetailTableComponent, _super);
    function EntityDetailTableComponent(changeDetector) {
        return _super.call(this, changeDetector) || this;
    }
    EntityDetailTableComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        _super.prototype.ngOnChanges.call(this, changes);
        if (changes.data$ && this.data$) {
            this.subscriptionData && this.subscriptionData.unsubscribe();
            this.subscriptionData = this.data$.subscribe(function (value) {
                _this.data = Array.isArray(value) ? value : [value];
                _this.changeDetector.markForCheck();
            });
        }
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Array)
    ], EntityDetailTableComponent.prototype, "columns", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", rxjs__WEBPACK_IMPORTED_MODULE_3__["Observable"])
    ], EntityDetailTableComponent.prototype, "data$", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Boolean)
    ], EntityDetailTableComponent.prototype, "divider", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], EntityDetailTableComponent.prototype, "header", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Boolean)
    ], EntityDetailTableComponent.prototype, "selected", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Boolean)
    ], EntityDetailTableComponent.prototype, "themeInvert", void 0);
    EntityDetailTableComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'tos-entity-detail-Table',
            template: __webpack_require__(/*! ./entity-detail-Table.component.html */ "./src/app/shared/components/entity-detail/entity-detail-Table/entity-detail-Table.component.html"),
            styles: [__webpack_require__(/*! ./entity-detail-Table.component.scss */ "./src/app/shared/components/entity-detail/entity-detail-Table/entity-detail-Table.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]])
    ], EntityDetailTableComponent);
    return EntityDetailTableComponent;
}(_entity_detail_child_component__WEBPACK_IMPORTED_MODULE_2__["EntityDetailChildComponent"]));



/***/ }),

/***/ "./src/app/shared/components/entity-detail/entity-detail-child.component.ts":
/*!**********************************************************************************!*\
  !*** ./src/app/shared/components/entity-detail/entity-detail-child.component.ts ***!
  \**********************************************************************************/
/*! exports provided: EntityDetailChildComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EntityDetailChildComponent", function() { return EntityDetailChildComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _domain_tos_tos_entity_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../domain/tos/tos-entity.model */ "./src/app/shared/domain/tos/tos-entity.model.ts");
/* harmony import */ var _domain_tos_item_tos_item_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../domain/tos/item/tos-item.model */ "./src/app/shared/domain/tos/item/tos-item.model.ts");
/* harmony import */ var _domain_tos_monster_tos_monster_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../domain/tos/monster/tos-monster.model */ "./src/app/shared/domain/tos/monster/tos-monster.model.ts");
/* harmony import */ var _domain_tos_item_book_tos_book_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../domain/tos/item/book/tos-book.model */ "./src/app/shared/domain/tos/item/book/tos-book.model.ts");
/* harmony import */ var _domain_tos_item_card_tos_card_model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../domain/tos/item/card/tos-card.model */ "./src/app/shared/domain/tos/item/card/tos-card.model.ts");
/* harmony import */ var _domain_tos_item_collection_tos_collection_model__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../domain/tos/item/collection/tos-collection.model */ "./src/app/shared/domain/tos/item/collection/tos-collection.model.ts");
/* harmony import */ var _domain_tos_item_gem_tos_gem_model__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../domain/tos/item/gem/tos-gem.model */ "./src/app/shared/domain/tos/item/gem/tos-gem.model.ts");
/* harmony import */ var _domain_tos_item_equipment_tos_equipment_model__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../domain/tos/item/equipment/tos-equipment.model */ "./src/app/shared/domain/tos/item/equipment/tos-equipment.model.ts");
/* harmony import */ var _domain_tos_item_recipe_tos_recipe_model__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../domain/tos/item/recipe/tos-recipe.model */ "./src/app/shared/domain/tos/item/recipe/tos-recipe.model.ts");
/* harmony import */ var _domain_tos_skill_tos_skill_model__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../domain/tos/skill/tos-skill.model */ "./src/app/shared/domain/tos/skill/tos-skill.model.ts");
/* harmony import */ var _domain_tos_map_tos_map_model__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../domain/tos/map/tos-map.model */ "./src/app/shared/domain/tos/map/tos-map.model.ts");
/* harmony import */ var _domain_tos_job_tos_job_model__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../domain/tos/job/tos-job.model */ "./src/app/shared/domain/tos/job/tos-job.model.ts");
/* harmony import */ var _domain_tos_attribute_tos_attribute_model__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../domain/tos/attribute/tos-attribute.model */ "./src/app/shared/domain/tos/attribute/tos-attribute.model.ts");
/* harmony import */ var _domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../domain/tos/tos-domain */ "./src/app/shared/domain/tos/tos-domain.ts");
















var EntityDetailChildComponent = /** @class */ (function () {
    function EntityDetailChildComponent(changeDetector) {
        this.changeDetector = changeDetector;
        this.Math = Math;
        this.TOSClassTree = _domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_15__["TOSClassTree"];
        this.TOSElementService = _domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_15__["TOSElementService"];
        this.TOSItemTradability = _domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_15__["TOSItemTradability"];
        this.TOSMonsterRaceService = _domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_15__["TOSMonsterRaceService"];
    }
    EntityDetailChildComponent.prototype.ngOnChanges = function (changes) {
        if (changes.entity) {
            this.attribute = this.entity instanceof _domain_tos_attribute_tos_attribute_model__WEBPACK_IMPORTED_MODULE_14__["TOSAttribute"] ? this.entity : null;
            this.book = this.entity instanceof _domain_tos_item_book_tos_book_model__WEBPACK_IMPORTED_MODULE_5__["TOSBook"] ? this.entity : null;
            this.card = this.entity instanceof _domain_tos_item_card_tos_card_model__WEBPACK_IMPORTED_MODULE_6__["TOSCard"] ? this.entity : null;
            this.collection = this.entity instanceof _domain_tos_item_collection_tos_collection_model__WEBPACK_IMPORTED_MODULE_7__["TOSCollection"] ? this.entity : null;
            this.equipment = this.entity instanceof _domain_tos_item_equipment_tos_equipment_model__WEBPACK_IMPORTED_MODULE_9__["TOSEquipment"] ? this.entity : null;
            this.equipmentSet = this.entity instanceof _domain_tos_item_equipment_tos_equipment_model__WEBPACK_IMPORTED_MODULE_9__["TOSEquipmentSet"] ? this.entity : null;
            this.gem = this.entity instanceof _domain_tos_item_gem_tos_gem_model__WEBPACK_IMPORTED_MODULE_8__["TOSGem"] ? this.entity : null;
            this.item = this.entity instanceof _domain_tos_item_tos_item_model__WEBPACK_IMPORTED_MODULE_3__["TOSItem"] ? this.entity : null;
            this.job = this.entity instanceof _domain_tos_job_tos_job_model__WEBPACK_IMPORTED_MODULE_13__["TOSJob"] ? this.entity : null;
            this.map = this.entity instanceof _domain_tos_map_tos_map_model__WEBPACK_IMPORTED_MODULE_12__["TOSMap"] ? this.entity : null;
            this.monster = this.entity instanceof _domain_tos_monster_tos_monster_model__WEBPACK_IMPORTED_MODULE_4__["TOSMonster"] ? this.entity : null;
            this.recipe = this.entity instanceof _domain_tos_item_recipe_tos_recipe_model__WEBPACK_IMPORTED_MODULE_10__["TOSRecipe"] ? this.entity : null;
            this.skill = this.entity instanceof _domain_tos_skill_tos_skill_model__WEBPACK_IMPORTED_MODULE_11__["TOSSkill"] ? this.entity : null;
        }
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _domain_tos_tos_entity_model__WEBPACK_IMPORTED_MODULE_2__["TOSEntity"])
    ], EntityDetailChildComponent.prototype, "entity", void 0);
    EntityDetailChildComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
            template: ''
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]])
    ], EntityDetailChildComponent);
    return EntityDetailChildComponent;
}());



/***/ }),

/***/ "./src/app/shared/components/entity-table/entity-table.component.html":
/*!****************************************************************************!*\
  !*** ./src/app/shared/components/entity-table/entity-table.component.html ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- Table -->\n<table class=\"table table-hover mb-0\">\n  <thead *ngIf=\"header\">\n    <tr tosSortGroup [ngModel]=\"sort\" (ngModelChange)=\"sortChange.emit($event)\">\n      <th *ngIf=\"selected\" [width]=\"1\"></th>\n      <th *ngFor=\"let column of columnsFiltered\" tosSort\n          [column]=\"column.pipe.column\"\n          [label]=\"column.label\"\n          [ngClass]=\"{\n            'd-none': column.hideMobile || column.hideTablet,\n            'd-sm-table-cell': column.hideMobile,\n            'd-lg-table-cell': column.hideTablet,\n            'text-nowrap': !column.wide\n          }\"\n          [width]=\"column.wide ? '' : 1\"></th>\n    </tr>\n  </thead>\n  <tbody>\n    <a *ngFor=\"let row of data; trackBy: trackByIndex\" class=\"d-table-row\"\n       [ngClass]=\"{ 'bg-primary': themeInvert, 'text-white': themeInvert }\"\n       [routerLink]=\"row['Url$'] ? (row['Url$'] | async) : row.Url\"\n       (click)=\"onRowMouseClick($event, row)\"\n       (mouseover)=\"onRowMouseOver($event, row)\"\n       (mouseleave)=\"onRowMouseLeave($event)\">\n      <!-- Selected -->\n      <td *ngIf=\"selected\" class=\"text-center\" [width]=\"1\">\n        <input type=\"checkbox\" style=\"transform: scale(2)\"\n               [(ngModel)]=\"row.Selected\"\n               (click)=\"$event.stopImmediatePropagation()\" />\n      </td>\n\n      <td *ngFor=\"let column of columnsFiltered\"\n          [class]=\"column.class\"\n          [innerHTML]=\"row | tosTableCell:column:changeDetector | async\"\n          [ngClass]=\"{\n            'd-none': column.hideMobile || column.hideTablet,\n            'd-sm-table-cell': column.hideMobile,\n            'd-lg-table-cell': column.hideTablet,\n            'text-nowrap': column.wide || column.class?.indexOf('text-nowrap') >= 0\n          }\"\n          [width]=\"column.wide ? '' : 1\">\n      </td>\n    </a>\n  </tbody>\n</table>\n\n<!-- Tooltip -->\n<app-entity-tooltip class=\"d-none d-md-block\"\n                    [debug]=\"false\"\n                    [tooltip]=\"tooltip\"></app-entity-tooltip>\n"

/***/ }),

/***/ "./src/app/shared/components/entity-table/entity-table.component.scss":
/*!****************************************************************************!*\
  !*** ./src/app/shared/components/entity-table/entity-table.component.scss ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: block;\n  overflow: auto;\n}\n\na:first-child td {\n  border: 0 !important;\n}\n\ntd {\n  vertical-align: middle;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9mdW5naS9FL1Rvc1Byb2plY3QvVG9zR3VydUJhc2UvdG9zLWRhdGFiYXNlL3Rvcy13ZWIvc3JjL2FwcC9zaGFyZWQvY29tcG9uZW50cy9lbnRpdHktdGFibGUvZW50aXR5LXRhYmxlLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9zaGFyZWQvY29tcG9uZW50cy9lbnRpdHktdGFibGUvZW50aXR5LXRhYmxlLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsZUFBQTtFQUNBLGVBQUE7Q0NDRDs7QURFRDtFQUFtQixxQkFBQTtDQ0VsQjs7QURBRDtFQUNFLHVCQUFBO0NDR0QiLCJmaWxlIjoic3JjL2FwcC9zaGFyZWQvY29tcG9uZW50cy9lbnRpdHktdGFibGUvZW50aXR5LXRhYmxlLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3Qge1xuICBkaXNwbGF5OiBibG9jaztcbiAgb3ZlcmZsb3c6IGF1dG87XG59XG5cbmE6Zmlyc3QtY2hpbGQgdGQgeyBib3JkZXI6IDAgIWltcG9ydGFudDsgfVxuXG50ZCB7XG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG59XG4iLCI6aG9zdCB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBvdmVyZmxvdzogYXV0bztcbn1cblxuYTpmaXJzdC1jaGlsZCB0ZCB7XG4gIGJvcmRlcjogMCAhaW1wb3J0YW50O1xufVxuXG50ZCB7XG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG59Il19 */"

/***/ }),

/***/ "./src/app/shared/components/entity-table/entity-table.component.ts":
/*!**************************************************************************!*\
  !*** ./src/app/shared/components/entity-table/entity-table.component.ts ***!
  \**************************************************************************/
/*! exports provided: EntityTableComponent, EntityTablePipeDefinition */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EntityTableComponent", function() { return EntityTableComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EntityTablePipeDefinition", function() { return EntityTablePipeDefinition; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _directives_sort_directive__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../directives/sort.directive */ "./src/app/shared/directives/sort.directive.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");




var EntityTableComponent = /** @class */ (function () {
    function EntityTableComponent(changeDetector, router) {
        this.changeDetector = changeDetector;
        this.router = router;
        this.header = true;
        this.hideMobile = false;
        this.hideTablet = false;
        this.selected = false;
        this.sortChange = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.themeInvert = false;
    }
    EntityTableComponent_1 = EntityTableComponent;
    EntityTableComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes.columns && this.columns) {
            this.columnsFiltered = this.columns
                .filter(function (value) {
                return (!_this.hideMobile || _this.hideMobile != value.hideMobile) &&
                    (!_this.hideTablet || _this.hideTablet != value.hideTablet);
            });
        }
        if (changes.data) {
            this.data = this.data && !Array.isArray(this.data) ? [this.data] : this.data;
        }
    };
    EntityTableComponent.prototype.onRowMouseClick = function (event, row) {
        var target = event.target;
        if (target.getAttribute(EntityTableComponent_1.ATTRIBUTE_DATA_ROUTER)) {
            event.stopPropagation();
            event.stopImmediatePropagation();
            var url = target.getAttribute(EntityTableComponent_1.ATTRIBUTE_DATA_ROUTER);
            this.router.navigate([url]);
        }
    };
    EntityTableComponent.prototype.onRowMouseOver = function (event, row) {
        var _this = this;
        var target = event.target;
        if (target.getAttribute(EntityTableComponent_1.ATTRIBUTE_DATA_COLUMN)) {
            // Show tooltips for linked ITOSEntity lists
            var column = this.columns.find(function (value) { return value.pipe.column == target.getAttribute(EntityTableComponent_1.ATTRIBUTE_DATA_COLUMN); });
            var definition = column.pipe;
            var observable = row[definition.column];
            observable.subscribe(function (value) {
                var array = Array.isArray(value) ? value : [value];
                var entity = array[+target.getAttribute(EntityTableComponent_1.ATTRIBUTE_DATA_I)];
                _this.tooltip = entity;
                _this.changeDetector.markForCheck();
            });
        }
        else {
            this.tooltip = row;
        }
    };
    EntityTableComponent.prototype.onRowMouseLeave = function (event) {
        this.tooltip = null;
    };
    EntityTableComponent.prototype.trackByIndex = function (index, value) {
        return index;
    };
    var EntityTableComponent_1;
    EntityTableComponent.ATTRIBUTE_DATA_COLUMN = 'data-column';
    EntityTableComponent.ATTRIBUTE_DATA_I = 'data-i';
    EntityTableComponent.ATTRIBUTE_DATA_ROUTER = 'data-router';
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Array)
    ], EntityTableComponent.prototype, "columns", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Array)
    ], EntityTableComponent.prototype, "data", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Boolean)
    ], EntityTableComponent.prototype, "header", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Boolean)
    ], EntityTableComponent.prototype, "hideMobile", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Boolean)
    ], EntityTableComponent.prototype, "hideTablet", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Boolean)
    ], EntityTableComponent.prototype, "selected", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _directives_sort_directive__WEBPACK_IMPORTED_MODULE_2__["Sort"])
    ], EntityTableComponent.prototype, "sort", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
    ], EntityTableComponent.prototype, "sortChange", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Boolean)
    ], EntityTableComponent.prototype, "themeInvert", void 0);
    EntityTableComponent = EntityTableComponent_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
            selector: 'tos-entity-table',
            template: __webpack_require__(/*! ./entity-table.component.html */ "./src/app/shared/components/entity-table/entity-table.component.html"),
            styles: [__webpack_require__(/*! ./entity-table.component.scss */ "./src/app/shared/components/entity-table/entity-table.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]])
    ], EntityTableComponent);
    return EntityTableComponent;
}());

var EntityTablePipeDefinition = /** @class */ (function () {
    function EntityTablePipeDefinition(column, pipeClass) {
        this.column = column;
        this.pipeClass = pipeClass;
    }
    return EntityTablePipeDefinition;
}());



/***/ }),

/***/ "./src/app/shared/components/entity-table/pipes/table-cell-badge.pipe.ts":
/*!*******************************************************************************!*\
  !*** ./src/app/shared/components/entity-table/pipes/table-cell-badge.pipe.ts ***!
  \*******************************************************************************/
/*! exports provided: TableCellBadgePipe, TableCellBadgePipeDefinition */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TableCellBadgePipe", function() { return TableCellBadgePipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TableCellBadgePipeDefinition", function() { return TableCellBadgePipeDefinition; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _entity_table_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../entity-table.component */ "./src/app/shared/components/entity-table/entity-table.component.ts");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _table_cell_pipe__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./table-cell.pipe */ "./src/app/shared/components/entity-table/pipes/table-cell.pipe.ts");






var TableCellBadgePipe = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](TableCellBadgePipe, _super);
    function TableCellBadgePipe(sanitizer) {
        return _super.call(this, sanitizer) || this;
    }
    TableCellBadgePipe.prototype.transform = function (row, definition) {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["of"])(this.sanitizer.bypassSecurityTrustHtml("\n        <span>\n            <span class=\"d-inline-block align-text-bottom mr-sm-1 rounded-circle\"\n                  style=\"background: " + definition.transformColor(row[definition.column]) + ";\n                         height: 1rem; width: 1rem;\"></span>\n            <span class=\"d-none d-sm-table-cell\">" + row[definition.column] + "</span>\n        </span>\n    "));
    };
    TableCellBadgePipe = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"])({
            name: 'tableCellBadge'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["DomSanitizer"]])
    ], TableCellBadgePipe);
    return TableCellBadgePipe;
}(_table_cell_pipe__WEBPACK_IMPORTED_MODULE_5__["TableCellPipeBase"]));

var TableCellBadgePipeDefinition = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](TableCellBadgePipeDefinition, _super);
    function TableCellBadgePipeDefinition(column, transformColor) {
        var _this = _super.call(this, column, TableCellBadgePipe) || this;
        _this.column = column;
        _this.transformColor = transformColor;
        return _this;
    }
    return TableCellBadgePipeDefinition;
}(_entity_table_component__WEBPACK_IMPORTED_MODULE_2__["EntityTablePipeDefinition"]));



/***/ }),

/***/ "./src/app/shared/components/entity-table/pipes/table-cell-icon.pipe.ts":
/*!******************************************************************************!*\
  !*** ./src/app/shared/components/entity-table/pipes/table-cell-icon.pipe.ts ***!
  \******************************************************************************/
/*! exports provided: TableCellIconPipe, TableCellIconPipeDefinition */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TableCellIconPipe", function() { return TableCellIconPipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TableCellIconPipeDefinition", function() { return TableCellIconPipeDefinition; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _entity_table_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../entity-table.component */ "./src/app/shared/components/entity-table/entity-table.component.ts");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _table_cell_pipe__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./table-cell.pipe */ "./src/app/shared/components/entity-table/pipes/table-cell.pipe.ts");






var TableCellIconPipe = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](TableCellIconPipe, _super);
    function TableCellIconPipe(sanitizer) {
        return _super.call(this, sanitizer) || this;
    }
    TableCellIconPipe.prototype.transform = function (entity, definition) {
        var src = definition.transformValue ? definition.transformValue(entity[definition.column]) : entity[definition.column];
        var title = entity[definition.column];
        title = title.indexOf('http') == 0 ? '' : title;
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["of"])(this.sanitizer.bypassSecurityTrustHtml("<img height=\"40\" width=\"40\" src=\"" + src + "\" title=\"" + title + "\" />"));
    };
    TableCellIconPipe = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"])({
            name: 'tableCellIcon'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["DomSanitizer"]])
    ], TableCellIconPipe);
    return TableCellIconPipe;
}(_table_cell_pipe__WEBPACK_IMPORTED_MODULE_5__["TableCellPipeBase"]));

var TableCellIconPipeDefinition = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](TableCellIconPipeDefinition, _super);
    function TableCellIconPipeDefinition(column, transformValue) {
        var _this = _super.call(this, column, TableCellIconPipe) || this;
        _this.column = column;
        _this.transformValue = transformValue;
        return _this;
    }
    return TableCellIconPipeDefinition;
}(_entity_table_component__WEBPACK_IMPORTED_MODULE_2__["EntityTablePipeDefinition"]));



/***/ }),

/***/ "./src/app/shared/components/entity-table/pipes/table-cell-link.pipe.ts":
/*!******************************************************************************!*\
  !*** ./src/app/shared/components/entity-table/pipes/table-cell-link.pipe.ts ***!
  \******************************************************************************/
/*! exports provided: TableCellLinkPipe, TableCellLinkPipeDefinition */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TableCellLinkPipe", function() { return TableCellLinkPipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TableCellLinkPipeDefinition", function() { return TableCellLinkPipeDefinition; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _entity_table_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../entity-table.component */ "./src/app/shared/components/entity-table/entity-table.component.ts");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _table_cell_pipe__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./table-cell.pipe */ "./src/app/shared/components/entity-table/pipes/table-cell.pipe.ts");






var TableCellLinkPipe = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](TableCellLinkPipe, _super);
    function TableCellLinkPipe(sanitizer) {
        return _super.call(this, sanitizer) || this;
    }
    TableCellLinkPipe.prototype.transform = function (row, definition, changeDetector) {
        var _this = this;
        var observable = row[definition.column];
        return observable && observable.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (value) {
            var html = '';
            var array = Array.isArray(value) ? value : [value];
            for (var i = 0; i < array.length; i++) {
                var entity = array[i];
                var value_1 = definition.transformValue ? definition.transformValue(array[i]) : null;
                html +=
                    "<a href=\"" + entity.Url + "\" class=\"d-block position-relative mr-1\" style=\"height: 40px; width: 40px\">\n                <img height=\"40\" width=\"40\" class=\"position-absolute\" style=\"top: 0; left: 0\"\n                     " + _entity_table_component__WEBPACK_IMPORTED_MODULE_2__["EntityTableComponent"].ATTRIBUTE_DATA_COLUMN + "=\"" + definition.column + "\"\n                     " + _entity_table_component__WEBPACK_IMPORTED_MODULE_2__["EntityTableComponent"].ATTRIBUTE_DATA_I + "=\"" + i + "\"\n                     " + _entity_table_component__WEBPACK_IMPORTED_MODULE_2__["EntityTableComponent"].ATTRIBUTE_DATA_ROUTER + "=\"" + entity.Url + "\"\n                     src=\"" + entity.Icon + "\" />\n          " + (value_1 != null ? "\n                <span class=\"position-absolute text-outline text-white\"\n                      style=\"bottom: 0; right: 0.25rem; pointer-events: none\">" + value_1 + "</span>\n          " : '') + "\n            </a>";
            }
            changeDetector.detectChanges();
            return _this.sanitizer.bypassSecurityTrustHtml('<span class="d-flex">' + html + '</span>');
        }));
    };
    TableCellLinkPipe = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"])({
            name: 'tableCellLink'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["DomSanitizer"]])
    ], TableCellLinkPipe);
    return TableCellLinkPipe;
}(_table_cell_pipe__WEBPACK_IMPORTED_MODULE_5__["TableCellPipeBase"]));

var TableCellLinkPipeDefinition = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](TableCellLinkPipeDefinition, _super);
    function TableCellLinkPipeDefinition(column, transformValue) {
        var _this = _super.call(this, column, TableCellLinkPipe) || this;
        _this.column = column;
        _this.transformValue = transformValue;
        return _this;
    }
    return TableCellLinkPipeDefinition;
}(_entity_table_component__WEBPACK_IMPORTED_MODULE_2__["EntityTablePipeDefinition"]));



/***/ }),

/***/ "./src/app/shared/components/entity-table/pipes/table-cell-number.pipe.ts":
/*!********************************************************************************!*\
  !*** ./src/app/shared/components/entity-table/pipes/table-cell-number.pipe.ts ***!
  \********************************************************************************/
/*! exports provided: TableCellNumberPipe, TableCellNumberPipeDefinition */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TableCellNumberPipe", function() { return TableCellNumberPipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TableCellNumberPipeDefinition", function() { return TableCellNumberPipeDefinition; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _entity_table_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../entity-table.component */ "./src/app/shared/components/entity-table/entity-table.component.ts");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _table_cell_pipe__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./table-cell.pipe */ "./src/app/shared/components/entity-table/pipes/table-cell.pipe.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");







var TableCellNumberPipe = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](TableCellNumberPipe, _super);
    function TableCellNumberPipe(decimal, sanitizer) {
        var _this = _super.call(this, sanitizer) || this;
        _this.decimal = decimal;
        return _this;
    }
    TableCellNumberPipe.prototype.transform = function (row, definition) {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_6__["of"])(this.sanitizer.bypassSecurityTrustHtml("\n      <span class=\"text-right\">\n        " + this.decimal.transform(row[definition.column]) + "\n      </span>\n    "));
    };
    TableCellNumberPipe = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"])({
            name: 'tableCellNumber'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common__WEBPACK_IMPORTED_MODULE_4__["DecimalPipe"], _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["DomSanitizer"]])
    ], TableCellNumberPipe);
    return TableCellNumberPipe;
}(_table_cell_pipe__WEBPACK_IMPORTED_MODULE_5__["TableCellPipeBase"]));

var TableCellNumberPipeDefinition = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](TableCellNumberPipeDefinition, _super);
    function TableCellNumberPipeDefinition(column) {
        var _this = _super.call(this, column, TableCellNumberPipe) || this;
        _this.column = column;
        return _this;
    }
    return TableCellNumberPipeDefinition;
}(_entity_table_component__WEBPACK_IMPORTED_MODULE_2__["EntityTablePipeDefinition"]));



/***/ }),

/***/ "./src/app/shared/components/entity-table/pipes/table-cell-text.pipe.ts":
/*!******************************************************************************!*\
  !*** ./src/app/shared/components/entity-table/pipes/table-cell-text.pipe.ts ***!
  \******************************************************************************/
/*! exports provided: TableCellTextPipe, TableCellTextPipeDefinition, TableCellTextPipeFormat */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TableCellTextPipe", function() { return TableCellTextPipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TableCellTextPipeDefinition", function() { return TableCellTextPipeDefinition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TableCellTextPipeFormat", function() { return TableCellTextPipeFormat; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _entity_table_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../entity-table.component */ "./src/app/shared/components/entity-table/entity-table.component.ts");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _table_cell_pipe__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./table-cell.pipe */ "./src/app/shared/components/entity-table/pipes/table-cell.pipe.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _directives_time_pipe__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../directives/time.pipe */ "./src/app/shared/directives/time.pipe.ts");








var TableCellTextPipe = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](TableCellTextPipe, _super);
    function TableCellTextPipe(percent, sanitizer, time) {
        var _this = _super.call(this, sanitizer) || this;
        _this.percent = percent;
        _this.time = time;
        return _this;
    }
    TableCellTextPipe.prototype.transform = function (entity, definition) {
        var html = '';
        if (definition.format != null) {
            switch (definition.format) {
                case TableCellTextPipeFormat.MULTILINE:
                    html = "<span class=\"text-multiline\">" + entity[definition.column] + "</span>";
                    break;
                case TableCellTextPipeFormat.PERCENTAGE:
                    html = "<span>" + this.percent.transform(entity[definition.column] / 100, '1.1-5') + "</span>";
                    break;
                case TableCellTextPipeFormat.QUANTITY:
                    html = "<span>&times; " + entity[definition.column] + "</span>";
                    break;
                case TableCellTextPipeFormat.QUANTITY_RANGE:
                    var quantityMin = entity[definition.column.split('.')[0]];
                    var quantityMax = entity[definition.column.split('.')[1]];
                    if (quantityMin > 0 || quantityMax > 0)
                        if (quantityMax != quantityMin)
                            html = "<span>&times; " + quantityMin + "~" + quantityMax + "</span>";
                        else
                            html = "<span>&times; " + quantityMin + "</span>";
                    break;
                case TableCellTextPipeFormat.TIME:
                    html = "<span>" + this.time.transform(entity[definition.column]) + "</span>";
                    break;
            }
        }
        else {
            html = "<span>" + entity[definition.column] + "</span>";
        }
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_5__["of"])(this.sanitizer.bypassSecurityTrustHtml(html));
    };
    TableCellTextPipe = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"])({
            name: 'tableCellText'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common__WEBPACK_IMPORTED_MODULE_6__["PercentPipe"], _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["DomSanitizer"], _directives_time_pipe__WEBPACK_IMPORTED_MODULE_7__["TimePipe"]])
    ], TableCellTextPipe);
    return TableCellTextPipe;
}(_table_cell_pipe__WEBPACK_IMPORTED_MODULE_4__["TableCellPipeBase"]));

var TableCellTextPipeDefinition = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](TableCellTextPipeDefinition, _super);
    function TableCellTextPipeDefinition(column, format) {
        var _this = _super.call(this, column, TableCellTextPipe) || this;
        _this.column = column;
        _this.format = format;
        return _this;
    }
    return TableCellTextPipeDefinition;
}(_entity_table_component__WEBPACK_IMPORTED_MODULE_2__["EntityTablePipeDefinition"]));

var TableCellTextPipeFormat;
(function (TableCellTextPipeFormat) {
    TableCellTextPipeFormat[TableCellTextPipeFormat["MULTILINE"] = 0] = "MULTILINE";
    TableCellTextPipeFormat[TableCellTextPipeFormat["PERCENTAGE"] = 1] = "PERCENTAGE";
    TableCellTextPipeFormat[TableCellTextPipeFormat["QUANTITY"] = 2] = "QUANTITY";
    TableCellTextPipeFormat[TableCellTextPipeFormat["QUANTITY_RANGE"] = 3] = "QUANTITY_RANGE";
    TableCellTextPipeFormat[TableCellTextPipeFormat["TIME"] = 4] = "TIME";
})(TableCellTextPipeFormat || (TableCellTextPipeFormat = {}));


/***/ }),

/***/ "./src/app/shared/components/entity-table/pipes/table-cell.pipe.ts":
/*!*************************************************************************!*\
  !*** ./src/app/shared/components/entity-table/pipes/table-cell.pipe.ts ***!
  \*************************************************************************/
/*! exports provided: TableCellPipe, TableCellPipeBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TableCellPipe", function() { return TableCellPipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TableCellPipeBase", function() { return TableCellPipeBase; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var TableCellPipe = /** @class */ (function () {
    function TableCellPipe(injector) {
        this.injector = injector;
    }
    // Thanks to https://stackoverflow.com/a/46910713
    TableCellPipe.prototype.transform = function (row, column, changeDetector) {
        return this.injector
            .get(column.pipe.pipeClass)
            .transform(row, column.pipe, changeDetector);
    };
    TableCellPipe = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"])({
            name: 'tosTableCell'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injector"]])
    ], TableCellPipe);
    return TableCellPipe;
}());

var TableCellPipeBase = /** @class */ (function () {
    function TableCellPipeBase(sanitizer) {
        this.sanitizer = sanitizer;
    }
    return TableCellPipeBase;
}());



/***/ }),

/***/ "./src/app/shared/components/entity-tooltip/entity-tooltip.component.html":
/*!********************************************************************************!*\
  !*** ./src/app/shared/components/entity-tooltip/entity-tooltip.component.html ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"card bg-light shadow ml-4 mt-3\" style=\"width: 480px;\" *ngIf=\"entity && !card && !map && !npc\">\n  <div class=\"card-body\">\n\n    <!-- Base Information -->\n    <div class=\"row\">\n      <!-- Icon, Grade and Class -->\n      <tos-entity-detail-ClassIconGrade class=\"ml-3 mr-3\" [entity]=\"entity\" [size]=\"'small'\"></tos-entity-detail-ClassIconGrade>\n\n      <div class=\"col pl-0\">\n        <!-- Name and Material/Type -->\n        <tos-entity-detail-Header class=\"h5\" [entity]=\"entity\"></tos-entity-detail-Header>\n\n        <!-- Description -->\n        <tos-entity-detail-Description *ngIf=\"job\"\n                                       [entity]=\"entity\"></tos-entity-detail-Description>\n\n        <!-- Skill -->\n        <tos-entity-detail-Skill [build]=\"build\"\n                                 [entity]=\"entity\"></tos-entity-detail-Skill>\n\n        <!-- CoolDown/Level, LifeTime, Weight, Price, Tradability -->\n        <tos-entity-detail-Information *ngIf=\"!skill\"\n                                       [entity]=\"entity\"\n                                       [divider]=\"skill\"></tos-entity-detail-Information>\n\n      </div>\n    </div>\n\n    <!-- Gem -->\n    <tos-entity-detail-Gem [editable]=\"false\"\n                           [entity]=\"entity\"></tos-entity-detail-Gem>\n\n    <!-- Description -->\n    <tos-entity-detail-Description *ngIf=\"item && !equipment || attribute\"\n                                   [divider]=\"true\"\n                                   [entity]=\"entity\"></tos-entity-detail-Description>\n\n    <!-- Physical and Magical Attack / Defense -->\n    <tos-entity-detail-AttackDefense [entity]=\"entity\"></tos-entity-detail-AttackDefense>\n\n    <!-- Stats & Unidentified -->\n    <tos-entity-detail-BonusStatsUnidentified [divider]=\"true\"\n                                              [entity]=\"entity\"></tos-entity-detail-BonusStatsUnidentified>\n\n    <!-- Potential, Durability and Sockets / Base EXP and Class EXP -->\n    <tos-entity-detail-DurabilityPotentialSockets [entity]=\"entity\"></tos-entity-detail-DurabilityPotentialSockets>\n\n  </div>\n\n</div>\n\n<div style=\"width: 363px;\" *ngIf=\"card && !npc\">\n\n  <!-- Card -->\n  <tos-entity-detail-Card [entity]=\"entity\"></tos-entity-detail-Card>\n\n  <div class=\"card bg-primary text-white shadow mt-3\">\n    <div class=\"card-body\">\n\n      <!-- Description -->\n      <tos-entity-detail-Description [entity]=\"entity\"></tos-entity-detail-Description>\n\n    </div>\n  </div>\n\n</div>\n"

/***/ }),

/***/ "./src/app/shared/components/entity-tooltip/entity-tooltip.component.scss":
/*!********************************************************************************!*\
  !*** ./src/app/shared/components/entity-tooltip/entity-tooltip.component.scss ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  position: fixed;\n  transform: translateZ(0);\n  pointer-events: none;\n  z-index: 1000;\n}\n\n.table td {\n  border-top: none;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9mdW5naS9FL1Rvc1Byb2plY3QvVG9zR3VydUJhc2UvdG9zLWRhdGFiYXNlL3Rvcy13ZWIvc3JjL2FwcC9zaGFyZWQvY29tcG9uZW50cy9lbnRpdHktdG9vbHRpcC9lbnRpdHktdG9vbHRpcC5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvc2hhcmVkL2NvbXBvbmVudHMvZW50aXR5LXRvb2x0aXAvZW50aXR5LXRvb2x0aXAuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxnQkFBQTtFQUNBLHlCQUFBO0VBQ0EscUJBQUE7RUFDQSxjQUFBO0NDQ0Q7O0FERUQ7RUFDRSxpQkFBQTtDQ0NEIiwiZmlsZSI6InNyYy9hcHAvc2hhcmVkL2NvbXBvbmVudHMvZW50aXR5LXRvb2x0aXAvZW50aXR5LXRvb2x0aXAuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyI6aG9zdCB7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVaKDApO1xuICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgei1pbmRleDogMTAwMDtcbn1cblxuLnRhYmxlIHRkIHtcbiAgYm9yZGVyLXRvcDogbm9uZTtcbn1cbiIsIjpob3N0IHtcbiAgcG9zaXRpb246IGZpeGVkO1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVooMCk7XG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICB6LWluZGV4OiAxMDAwO1xufVxuXG4udGFibGUgdGQge1xuICBib3JkZXItdG9wOiBub25lO1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/shared/components/entity-tooltip/entity-tooltip.component.ts":
/*!******************************************************************************!*\
  !*** ./src/app/shared/components/entity-tooltip/entity-tooltip.component.ts ***!
  \******************************************************************************/
/*! exports provided: EntityTooltipComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EntityTooltipComponent", function() { return EntityTooltipComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
/* harmony import */ var _domain_tos_item_tos_item_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../domain/tos/item/tos-item.model */ "./src/app/shared/domain/tos/item/tos-item.model.ts");
/* harmony import */ var _domain_tos_tos_entity_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../domain/tos/tos-entity.model */ "./src/app/shared/domain/tos/tos-entity.model.ts");
/* harmony import */ var _domain_tos_item_card_tos_card_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../domain/tos/item/card/tos-card.model */ "./src/app/shared/domain/tos/item/card/tos-card.model.ts");
/* harmony import */ var _domain_tos_item_equipment_tos_equipment_model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../domain/tos/item/equipment/tos-equipment.model */ "./src/app/shared/domain/tos/item/equipment/tos-equipment.model.ts");
/* harmony import */ var _domain_tos_skill_tos_skill_model__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../domain/tos/skill/tos-skill.model */ "./src/app/shared/domain/tos/skill/tos-skill.model.ts");
/* harmony import */ var _domain_tos_attribute_tos_attribute_model__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../domain/tos/attribute/tos-attribute.model */ "./src/app/shared/domain/tos/attribute/tos-attribute.model.ts");
/* harmony import */ var _domain_tos_map_tos_map_model__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../domain/tos/map/tos-map.model */ "./src/app/shared/domain/tos/map/tos-map.model.ts");
/* harmony import */ var _domain_tos_job_tos_job_model__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../domain/tos/job/tos-job.model */ "./src/app/shared/domain/tos/job/tos-job.model.ts");
/* harmony import */ var _domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../domain/tos/tos-domain */ "./src/app/shared/domain/tos/tos-domain.ts");
/* harmony import */ var _domain_tos_tos_build__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../domain/tos/tos-build */ "./src/app/shared/domain/tos/tos-build.ts");
/* harmony import */ var _domain_tos_region__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../domain/tos-region */ "./src/app/shared/domain/tos-region.ts");
/* harmony import */ var _domain_tos_monster_tos_npc_model__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../domain/tos/monster/tos-npc.model */ "./src/app/shared/domain/tos/monster/tos-npc.model.ts");















var PADDING = 8;
var EntityTooltipComponent = /** @class */ (function () {
    function EntityTooltipComponent(changeDetector, element, ngbTooltipConfig, zone) {
        var _this = this;
        this.changeDetector = changeDetector;
        this.element = element;
        this.ngbTooltipConfig = ngbTooltipConfig;
        this.zone = zone;
        this.Math = Math;
        this.TOSClassTree = _domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_11__["TOSClassTree"];
        this.TOSElement = _domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_11__["TOSElement"];
        this.TOSMonsterRace = _domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_11__["TOSMonsterRace"];
        this.TOSEquipmentType = _domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_11__["TOSEquipmentType"];
        this.TOSItemTradable = _domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_11__["TOSItemTradability"];
        this.TOSStat = _domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_11__["TOSStat"];
        this.onMouseMove = function (e) {
            e.preventDefault();
            _this.zone.runOutsideAngular(function () {
                var x = e.clientX, y = e.clientY;
                var height = _this.element.nativeElement.clientHeight, width = _this.element.nativeElement.clientWidth;
                var top = 0, bottom = window.innerHeight - height - PADDING * 2;
                var left = 0, right = window.innerWidth - width - PADDING * 2;
                if (x > right)
                    x = x - width - PADDING;
                if (y > bottom)
                    y = y - height - PADDING;
                _this.element.nativeElement.style.left = Math.max(left, Math.min(right, x)) + 'px';
                _this.element.nativeElement.style.top = Math.max(top, Math.min(bottom, y)) + 'px';
            });
        };
        this.onMouseLeave();
    }
    EntityTooltipComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes.tooltip) {
            this.tooltip ? this.onMouseEnter() : this.onMouseLeave();
            this.tooltip = this.tooltip instanceof _domain_tos_tos_entity_model__WEBPACK_IMPORTED_MODULE_4__["TOSEntityLink"] ? this.tooltip.Link : this.tooltip;
            this.entity = this.tooltip;
            this.card = this.entity instanceof _domain_tos_item_card_tos_card_model__WEBPACK_IMPORTED_MODULE_5__["TOSCard"] ? this.entity : null;
            this.attribute = this.entity instanceof _domain_tos_attribute_tos_attribute_model__WEBPACK_IMPORTED_MODULE_8__["TOSAttribute"] ? this.entity : null;
            this.equipment = this.entity instanceof _domain_tos_item_equipment_tos_equipment_model__WEBPACK_IMPORTED_MODULE_6__["TOSEquipment"] ? this.entity : null;
            this.item = this.entity instanceof _domain_tos_item_tos_item_model__WEBPACK_IMPORTED_MODULE_3__["TOSItem"] ? this.entity : null;
            this.job = this.entity instanceof _domain_tos_job_tos_job_model__WEBPACK_IMPORTED_MODULE_10__["TOSJob"] ? this.entity : null;
            this.map = this.entity instanceof _domain_tos_map_tos_map_model__WEBPACK_IMPORTED_MODULE_9__["TOSMap"] ? this.entity : null;
            this.npc = this.entity instanceof _domain_tos_monster_tos_npc_model__WEBPACK_IMPORTED_MODULE_14__["TOSNPC"] ? this.entity : null;
            this.skill = this.entity instanceof _domain_tos_skill_tos_skill_model__WEBPACK_IMPORTED_MODULE_7__["TOSSkill"] ? this.entity : null;
            if (this.skill) {
                if (this.build == null || this.build instanceof _domain_tos_tos_build__WEBPACK_IMPORTED_MODULE_12__["TOSDatabaseBuild"]) {
                    this.build = null;
                    this.skill.Link_Job.subscribe(function (value) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                        var build;
                        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    build = _domain_tos_tos_build__WEBPACK_IMPORTED_MODULE_12__["TOSDatabaseBuild"].new(_domain_tos_region__WEBPACK_IMPORTED_MODULE_13__["TOSRegionService"].get());
                                    return [4 /*yield*/, build.jobAdd$(value)];
                                case 1:
                                    _a.sent(); // Note: we need to add them 3 times, as on pre-Re:Build the level max scales with the selected Job circle
                                    return [4 /*yield*/, build.jobAdd$(value)];
                                case 2:
                                    _a.sent();
                                    return [4 /*yield*/, build.jobAdd$(value)];
                                case 3:
                                    _a.sent();
                                    this.build = build;
                                    this.changeDetector.markForCheck();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                }
            }
        }
    };
    EntityTooltipComponent.prototype.ngOnDestroy = function () {
        this.onMouseLeave();
    };
    EntityTooltipComponent.prototype.onMouseEnter = function () {
        var _this = this;
        if (this._isVisible == (this._isVisible = true))
            return;
        this.zone.runOutsideAngular(function () {
            document.body.addEventListener('mousemove', _this.onMouseMove);
            _this.element.nativeElement.style.visibility = 'visible';
        });
    };
    EntityTooltipComponent.prototype.onMouseLeave = function () {
        var _this = this;
        if (this._isVisible == (this._isVisible = false))
            return;
        this.zone.runOutsideAngular(function () {
            document.body.removeEventListener('mousemove', _this.onMouseMove);
            if (!_this.debug)
                _this.element.nativeElement.style.visibility = 'hidden';
        });
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], EntityTooltipComponent.prototype, "build", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Boolean)
    ], EntityTooltipComponent.prototype, "debug", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _domain_tos_tos_entity_model__WEBPACK_IMPORTED_MODULE_4__["TOSEntity"])
    ], EntityTooltipComponent.prototype, "tooltip", void 0);
    EntityTooltipComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
            selector: 'app-entity-tooltip',
            template: __webpack_require__(/*! ./entity-tooltip.component.html */ "./src/app/shared/components/entity-tooltip/entity-tooltip.component.html"),
            styles: [__webpack_require__(/*! ./entity-tooltip.component.scss */ "./src/app/shared/components/entity-tooltip/entity-tooltip.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"],
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_2__["NgbTooltipConfig"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]])
    ], EntityTooltipComponent);
    return EntityTooltipComponent;
}());



/***/ }),

/***/ "./src/app/shared/components/input-number/input-number.component.html":
/*!****************************************************************************!*\
  !*** ./src/app/shared/components/input-number/input-number.component.html ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"align-items-center d-inline-flex w-100\">\n  <button class=\"btn btn-primary\"\n          type=\"button\"\n          [disabled]=\"min != null && model <= min\"\n          (click)=\"onClick($event, -1)\">-</button>\n\n  <span class=\"flex-grow-1 text-center\"\n        [ngClass]=\"{ 'position-fixed': keyboardOpen, 'invisible': keyboardOpen }\"\n        (click)=\"onKeyboard(true)\"\n        (wheel)=\"onWheel($event)\">\n    {{ (label ? label + ' ' : '') + model + '/' + (labelMax || max) }}\n  </span>\n\n  <input class=\"form-control text-center p-0 border-0\" type=\"number\" [min]=\"min\" [max]=\"max\" #keyboard\n         (focusout)=\"onKeyboard(false)\"\n         [ngClass]=\"{ 'position-fixed': !keyboardOpen, 'invisible': !keyboardOpen }\"\n         [ngModel]=\"model\"\n         (ngModelChange)=\"onModelChange($event)\" />\n\n  <button class=\"btn btn-primary\"\n          type=\"button\"\n          [disabled]=\"max != null && model >= max\"\n          (click)=\"onClick($event, +1)\">+</button>\n</div>\n"

/***/ }),

/***/ "./src/app/shared/components/input-number/input-number.component.scss":
/*!****************************************************************************!*\
  !*** ./src/app/shared/components/input-number/input-number.component.scss ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: block;\n}\n\nbutton[disabled] {\n  opacity: 0 !important;\n}\n\ninput[type=number]::-webkit-inner-spin-button,\ninput[type=number]::-webkit-outer-spin-button {\n  -webkit-appearance: none;\n  margin: 0;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9mdW5naS9FL1Rvc1Byb2plY3QvVG9zR3VydUJhc2UvdG9zLWRhdGFiYXNlL3Rvcy13ZWIvc3JjL2FwcC9zaGFyZWQvY29tcG9uZW50cy9pbnB1dC1udW1iZXIvaW5wdXQtbnVtYmVyLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9zaGFyZWQvY29tcG9uZW50cy9pbnB1dC1udW1iZXIvaW5wdXQtbnVtYmVyLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsZUFBQTtDQ0NEOztBREVEO0VBQ0Usc0JBQUE7Q0NDRDs7QURFRDs7RUFFRSx5QkFBQTtFQUNBLFVBQUE7Q0NDRCIsImZpbGUiOiJzcmMvYXBwL3NoYXJlZC9jb21wb25lbnRzL2lucHV0LW51bWJlci9pbnB1dC1udW1iZXIuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyI6aG9zdCB7XG4gIGRpc3BsYXk6IGJsb2NrO1xufVxuXG5idXR0b25bZGlzYWJsZWRdIHtcbiAgb3BhY2l0eTogMCAhaW1wb3J0YW50Oztcbn1cblxuaW5wdXRbdHlwZT1udW1iZXJdOjotd2Via2l0LWlubmVyLXNwaW4tYnV0dG9uLFxuaW5wdXRbdHlwZT1udW1iZXJdOjotd2Via2l0LW91dGVyLXNwaW4tYnV0dG9uIHtcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xuICBtYXJnaW46IDA7XG59XG4iLCI6aG9zdCB7XG4gIGRpc3BsYXk6IGJsb2NrO1xufVxuXG5idXR0b25bZGlzYWJsZWRdIHtcbiAgb3BhY2l0eTogMCAhaW1wb3J0YW50O1xufVxuXG5pbnB1dFt0eXBlPW51bWJlcl06Oi13ZWJraXQtaW5uZXItc3Bpbi1idXR0b24sXG5pbnB1dFt0eXBlPW51bWJlcl06Oi13ZWJraXQtb3V0ZXItc3Bpbi1idXR0b24ge1xuICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XG4gIG1hcmdpbjogMDtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/shared/components/input-number/input-number.component.ts":
/*!**************************************************************************!*\
  !*** ./src/app/shared/components/input-number/input-number.component.ts ***!
  \**************************************************************************/
/*! exports provided: InputNumberComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InputNumberComponent", function() { return InputNumberComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var InputNumberComponent = /** @class */ (function () {
    function InputNumberComponent() {
        this.modelChange = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
    }
    InputNumberComponent.prototype.ngOnChanges = function (changes) {
        if (changes.model)
            this.model = this.limit(this.model);
    };
    InputNumberComponent.prototype.onClick = function (event, delta) {
        this.model = this.limit(this.model + delta);
        this.modelChange.emit(this.model);
    };
    InputNumberComponent.prototype.onKeyboard = function (value) {
        var _this = this;
        this.keyboardOpen = value;
        if (this.keyboardOpen)
            window.requestAnimationFrame(function () { return _this.keyboard.nativeElement.focus(); });
    };
    InputNumberComponent.prototype.onModelChange = function (newValue) {
        this.model = this.limit(newValue);
        this.modelChange.emit(this.model);
    };
    InputNumberComponent.prototype.onWheel = function (event) {
        event.preventDefault();
        this.model = this.limit(this.model + (event.deltaY < 0 ? 1 : -1));
        this.modelChange.emit(this.model);
    };
    InputNumberComponent.prototype.limit = function (model) {
        return Math.max(this.min, Math.min(this.max, model));
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Number)
    ], InputNumberComponent.prototype, "max", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Number)
    ], InputNumberComponent.prototype, "min", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Number)
    ], InputNumberComponent.prototype, "model", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
    ], InputNumberComponent.prototype, "modelChange", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], InputNumberComponent.prototype, "label", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Number)
    ], InputNumberComponent.prototype, "labelMax", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('keyboard'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"])
    ], InputNumberComponent.prototype, "keyboard", void 0);
    InputNumberComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
            selector: 'tos-input-number',
            template: __webpack_require__(/*! ./input-number.component.html */ "./src/app/shared/components/input-number/input-number.component.html"),
            styles: [__webpack_require__(/*! ./input-number.component.scss */ "./src/app/shared/components/input-number/input-number.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], InputNumberComponent);
    return InputNumberComponent;
}());



/***/ }),

/***/ "./src/app/shared/directives/css-max-height.directive.ts":
/*!***************************************************************!*\
  !*** ./src/app/shared/directives/css-max-height.directive.ts ***!
  \***************************************************************/
/*! exports provided: CssMaxHeightDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CssMaxHeightDirective", function() { return CssMaxHeightDirective; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var CssMaxHeightDirective = /** @class */ (function () {
    function CssMaxHeightDirective(zone) {
        this.zone = zone;
        this.update = this.update.bind(this);
    }
    CssMaxHeightDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.zone.runOutsideAngular(function () { return window.addEventListener('resize', _this.update); });
    };
    CssMaxHeightDirective.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    CssMaxHeightDirective.prototype.ngOnDestroy = function () {
        var _this = this;
        this.zone.runOutsideAngular(function () { return window.removeEventListener('resize', _this.update); });
    };
    CssMaxHeightDirective.prototype.update = function () {
        var _this = this;
        this.zone.run(function () { return _this.maxHeight = _this.maxHeight$ && _this.maxHeight$.replace(/([0-9]+)%/g, function (match, n) { return (+n * window.innerHeight / 100) + 'px'; }); });
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('cssMaxHeight'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], CssMaxHeightDirective.prototype, "maxHeight$", void 0);
    CssMaxHeightDirective = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"])({
            selector: '[cssMaxHeight]',
            host: {
                '[style.maxHeight]': 'maxHeight'
            }
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]])
    ], CssMaxHeightDirective);
    return CssMaxHeightDirective;
}());



/***/ }),

/***/ "./src/app/shared/directives/filter.directive.ts":
/*!*******************************************************!*\
  !*** ./src/app/shared/directives/filter.directive.ts ***!
  \*******************************************************/
/*! exports provided: FilterGroupDirective, FilterDirective, Filter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FilterGroupDirective", function() { return FilterGroupDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FilterDirective", function() { return FilterDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Filter", function() { return Filter; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _group_child_directive__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./group-child.directive */ "./src/app/shared/directives/group-child.directive.ts");




var PROVIDER_VALUE_ACCESSOR = {
    provide: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NG_VALUE_ACCESSOR"],
    useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["forwardRef"])(function () { return FilterGroupDirective; }),
    multi: true
};
var FilterGroupDirective = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](FilterGroupDirective, _super);
    function FilterGroupDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FilterGroupDirective.prototype.onChildChange = function (child) {
        var value = child.getNewValue();
        child = value == null ? null : child;
        if (this.toggle && this.$value && this.$value.value == value.value)
            child = null;
        _super.prototype.onChildChange.call(this, child);
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('column'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], FilterGroupDirective.prototype, "column", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('toggle'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Boolean)
    ], FilterGroupDirective.prototype, "toggle", void 0);
    FilterGroupDirective = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"])({
            selector: '[tosFilterGroup]',
            host: { 'role': 'group' },
            providers: [PROVIDER_VALUE_ACCESSOR]
        })
    ], FilterGroupDirective);
    return FilterGroupDirective;
}(_group_child_directive__WEBPACK_IMPORTED_MODULE_3__["TOSGroupDirective"]));

var FilterDirective = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](FilterDirective, _super);
    function FilterDirective(_group, _element) {
        var _this = _super.call(this, _group, _element) || this;
        _this._group = _group;
        _this._element = _element;
        return _this;
    }
    FilterDirective.prototype.getNewValue = function () {
        return this.value
            ? new Filter(this.$group.column, this.value)
            : null;
    };
    FilterDirective.prototype.onClick = function (e) {
        if (!this.disabled)
            this._group.onChildChange(this);
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('value'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Number)
    ], FilterDirective.prototype, "value", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"])('click'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Function),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [MouseEvent]),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:returntype", void 0)
    ], FilterDirective.prototype, "onClick", null);
    FilterDirective = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"])({
            selector: '[tosFilter]',
            host: {
                '[disabled]': 'disabled',
                '[class.active]': '$value && value == $value.value',
                '[style.cursor]': 'disabled ? "default" : "pointer"',
                '[style.white-space]': '"nowrap"',
            }
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [FilterGroupDirective, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"]])
    ], FilterDirective);
    return FilterDirective;
}(_group_child_directive__WEBPACK_IMPORTED_MODULE_3__["TOSGroupChildDirective"]));

var Filter = /** @class */ (function () {
    function Filter(column, value) {
        this.column = column;
        this.value = value;
    }
    Filter.prototype.toString = function () {
        return this.column + ',' + this.value;
    };
    Filter.valueOf = function (value) {
        if (value == null || (value + '') == '')
            return null;
        var parts = value.split(',');
        return new Filter(parts[0], +parts[1]);
    };
    return Filter;
}());



/***/ }),

/***/ "./src/app/shared/directives/group-child.directive.ts":
/*!************************************************************!*\
  !*** ./src/app/shared/directives/group-child.directive.ts ***!
  \************************************************************/
/*! exports provided: TOSGroupDirective, TOSGroupChildDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSGroupDirective", function() { return TOSGroupDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSGroupChildDirective", function() { return TOSGroupChildDirective; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var TOSGroupDirective = /** @class */ (function () {
    function TOSGroupDirective() {
        this._children = new Set();
        // ControlValueAccessor
        this.onChange = function (_) { };
        this.onTouched = function () { };
    }
    Object.defineProperty(TOSGroupDirective.prototype, "disabled", {
        get: function () { return this._disabled; },
        set: function (disabled) { this._disabled = disabled; this._childrenUpdate(true); },
        enumerable: true,
        configurable: true
    });
    TOSGroupDirective.prototype.childRegister = function (child) { this._children.add(child); };
    TOSGroupDirective.prototype.childUnregister = function (child) { this._children.delete(child); };
    TOSGroupDirective.prototype._childrenUpdate = function (updateDisabled) {
        var _this = this;
        if (updateDisabled === void 0) { updateDisabled = false; }
        this._children.forEach(function (child) {
            if (updateDisabled)
                child.disabled = _this.disabled;
            child.updateValue(_this.$value);
        });
    };
    TOSGroupDirective.prototype.onChildChange = function (child) {
        var value = child ? child.getNewValue() : null;
        this.writeValue(value);
        this.onChange(value);
    };
    TOSGroupDirective.prototype.registerOnChange = function (fn) { this.onChange = fn; };
    TOSGroupDirective.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
    TOSGroupDirective.prototype.setDisabledState = function (isDisabled) { };
    TOSGroupDirective.prototype.writeValue = function (value) {
        this.$value = value;
        this._childrenUpdate();
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('disabled'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Boolean),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [Boolean])
    ], TOSGroupDirective.prototype, "disabled", null);
    return TOSGroupDirective;
}());

var TOSGroupChildDirective = /** @class */ (function () {
    function TOSGroupChildDirective($group, $element) {
        this.$group = $group;
        this.$element = $element;
        this.disabled = this.$group.disabled;
        this.$group.childRegister(this);
    }
    Object.defineProperty(TOSGroupChildDirective.prototype, "disabled", {
        get: function () { return this._disabled; },
        set: function (disabled) { this._disabled = disabled; },
        enumerable: true,
        configurable: true
    });
    TOSGroupChildDirective.prototype.updateValue = function (value) { this.$value = value; };
    TOSGroupChildDirective.prototype.ngOnDestroy = function () {
        this.$group.childUnregister(this);
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('disabled'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Boolean),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [Boolean])
    ], TOSGroupChildDirective.prototype, "disabled", null);
    return TOSGroupChildDirective;
}());



/***/ }),

/***/ "./src/app/shared/directives/sanitize-css.pipe.ts":
/*!********************************************************!*\
  !*** ./src/app/shared/directives/sanitize-css.pipe.ts ***!
  \********************************************************/
/*! exports provided: SanitizeCSSPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SanitizeCSSPipe", function() { return SanitizeCSSPipe; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");



var SanitizeCSSPipe = /** @class */ (function () {
    function SanitizeCSSPipe(sanitizer) {
        this.sanitizer = sanitizer;
    }
    SanitizeCSSPipe.prototype.transform = function (value, args) {
        return this.sanitizer.bypassSecurityTrustStyle(value);
    };
    SanitizeCSSPipe = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"])({
            name: 'sanitizeCSS'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["DomSanitizer"]])
    ], SanitizeCSSPipe);
    return SanitizeCSSPipe;
}());



/***/ }),

/***/ "./src/app/shared/directives/sanitize-html.pipe.ts":
/*!*********************************************************!*\
  !*** ./src/app/shared/directives/sanitize-html.pipe.ts ***!
  \*********************************************************/
/*! exports provided: SanitizeHTMLPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SanitizeHTMLPipe", function() { return SanitizeHTMLPipe; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");



var SanitizeHTMLPipe = /** @class */ (function () {
    function SanitizeHTMLPipe(sanitizer) {
        this.sanitizer = sanitizer;
    }
    SanitizeHTMLPipe.prototype.transform = function (value, args) {
        return this.sanitizer.bypassSecurityTrustHtml(value);
    };
    SanitizeHTMLPipe = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"])({
            name: 'sanitizeHTML'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["DomSanitizer"]])
    ], SanitizeHTMLPipe);
    return SanitizeHTMLPipe;
}());



/***/ }),

/***/ "./src/app/shared/directives/sort.directive.ts":
/*!*****************************************************!*\
  !*** ./src/app/shared/directives/sort.directive.ts ***!
  \*****************************************************/
/*! exports provided: SortGroupDirective, SortDirective, Sort, SortOrder */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SortGroupDirective", function() { return SortGroupDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SortDirective", function() { return SortDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Sort", function() { return Sort; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SortOrder", function() { return SortOrder; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _group_child_directive__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./group-child.directive */ "./src/app/shared/directives/group-child.directive.ts");




var PROVIDER_VALUE_ACCESSOR = {
    provide: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NG_VALUE_ACCESSOR"],
    useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["forwardRef"])(function () { return SortGroupDirective; }),
    multi: true
};
var SortGroupDirective = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](SortGroupDirective, _super);
    function SortGroupDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SortGroupDirective = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"])({
            selector: '[tosSortGroup]',
            host: { 'role': 'group' },
            providers: [PROVIDER_VALUE_ACCESSOR]
        })
    ], SortGroupDirective);
    return SortGroupDirective;
}(_group_child_directive__WEBPACK_IMPORTED_MODULE_3__["TOSGroupDirective"]));

var SortDirective = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](SortDirective, _super);
    function SortDirective(_group, _element) {
        var _this = _super.call(this, _group, _element) || this;
        _this._group = _group;
        _this._element = _element;
        return _this;
    }
    Object.defineProperty(SortDirective.prototype, "column", {
        get: function () { return this._column; },
        set: function (column) { this._column = column; this.updateDisabled(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SortDirective.prototype, "label", {
        get: function () { return this._label; },
        set: function (label) { this._label = label; this.updateDisabled(); },
        enumerable: true,
        configurable: true
    });
    SortDirective.prototype.getNewValue = function () {
        var order = this.$value != null && this.$value.column == this.column && this.$value.order == SortOrder.ASC
            ? SortOrder.DESC
            : SortOrder.ASC;
        return new Sort(this.column, order);
    };
    SortDirective.prototype.updateDisabled = function () {
        this.disabled = this.disabled || this.label != null && this.label.length == 0 && this.column != null && this.column.length > 0;
    };
    SortDirective.prototype.updateValue = function (value) {
        _super.prototype.updateValue.call(this, value);
        var direction = this.disabled || value == null || value.column != this.column
            ? ''
            : value.order == SortOrder.ASC
                ? '▲'
                : '▼';
        this._element.nativeElement.innerText = (this.label != null ? this.label : this.column) + ' ' + direction;
    };
    SortDirective.prototype.onClick = function (e) {
        if (!this.disabled)
            this._group.onChildChange(this);
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('column'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [String])
    ], SortDirective.prototype, "column", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('label'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [String])
    ], SortDirective.prototype, "label", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"])('click'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Function),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [MouseEvent]),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:returntype", void 0)
    ], SortDirective.prototype, "onClick", null);
    SortDirective = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"])({
            selector: '[tosSort]',
            host: {
                '[style.cursor]': 'disabled ? "default" : "pointer"',
                '[style.white-space]': '"nowrap"',
            }
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [SortGroupDirective, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"]])
    ], SortDirective);
    return SortDirective;
}(_group_child_directive__WEBPACK_IMPORTED_MODULE_3__["TOSGroupChildDirective"]));

var Sort = /** @class */ (function () {
    function Sort(column, order) {
        this.column = column;
        this.order = order;
    }
    Sort.default = function (config) {
        return config.sortColumn
            ? new Sort(config.sortColumn, SortOrder.ASC)
            : null;
    };
    Sort.prototype.toString = function () {
        return this.column + ',' + this.order.toString();
    };
    Sort.valueOf = function (value) {
        if (value == null)
            return null;
        var parts = value.split(',');
        return new Sort(parts[0], SortOrder.valueOf(parts[1]));
    };
    return Sort;
}());

var SortOrderEnum;
(function (SortOrderEnum) {
    SortOrderEnum[SortOrderEnum["ASC"] = 0] = "ASC";
    SortOrderEnum[SortOrderEnum["DESC"] = 1] = "DESC";
})(SortOrderEnum || (SortOrderEnum = {}));
var SortOrder = /** @class */ (function () {
    function SortOrder(_enum) {
        this._enum = _enum;
    }
    SortOrder.prototype.toString = function () {
        switch (this._enum) {
            case SortOrderEnum.ASC: return 'ASC';
            case SortOrderEnum.DESC: return 'DESC';
            default: return null;
        }
    };
    SortOrder.valueOf = function (value) {
        switch (value) {
            case 'ASC': return SortOrder.ASC;
            case 'DESC': return SortOrder.DESC;
            default: return SortOrder.ASC;
        }
    };
    SortOrder.ASC = new SortOrder(SortOrderEnum.ASC);
    SortOrder.DESC = new SortOrder(SortOrderEnum.DESC);
    return SortOrder;
}());



/***/ }),

/***/ "./src/app/shared/directives/time.pipe.ts":
/*!************************************************!*\
  !*** ./src/app/shared/directives/time.pipe.ts ***!
  \************************************************/
/*! exports provided: TimePipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TimePipe", function() { return TimePipe; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var TIME_MINUTE = 60;
var TIME_HOUR = TIME_MINUTE * 60;
var TIME_DAY = TIME_HOUR * 24;
var TimePipe = /** @class */ (function () {
    function TimePipe() {
    }
    TimePipe.prototype.transform = function (value, args) {
        value = +value;
        var days = Math.floor(value / TIME_DAY);
        var hours = Math.floor(value % TIME_DAY / TIME_HOUR);
        var minutes = Math.floor(value % TIME_HOUR / TIME_MINUTE);
        var seconds = value % TIME_MINUTE;
        var result = [];
        if (days >= 1)
            result.push(days + ' day' + (days > 1 ? 's' : ''));
        if (hours >= 1)
            result.push(hours + ' hour' + (hours > 1 ? 's' : ''));
        if (minutes >= 1)
            result.push(minutes + ' minute' + (minutes > 1 ? 's' : ''));
        if (seconds >= 1)
            result.push(seconds + ' second' + (seconds > 1 ? 's' : ''));
        return result.join(' ');
    };
    TimePipe = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"])({
            name: 'tosTime'
        })
    ], TimePipe);
    return TimePipe;
}());



/***/ }),

/***/ "./src/app/shared/domain/tos-region.ts":
/*!*********************************************!*\
  !*** ./src/app/shared/domain/tos-region.ts ***!
  \*********************************************/
/*! exports provided: TOSRegion, VERSIONS, TOSRegionService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSRegion", function() { return TOSRegion; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VERSIONS", function() { return VERSIONS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSRegionService", function() { return TOSRegionService; });
var TOSRegion;
(function (TOSRegion) {
    TOSRegion["iTOS"] = "iTOS";
    TOSRegion["jTOS"] = "jTOS";
    TOSRegion["kTEST"] = "kTEST";
    TOSRegion["kTOS"] = "kTOS";
    TOSRegion["twTOS"] = "twTOS";
})(TOSRegion || (TOSRegion = {}));
var VERSIONS = JSON.parse(document.getElementById('tos-region').innerText);
var TOSRegionService;
(function (TOSRegionService) {
    var Region = null;
    function get() {
        if (Region)
            return Region;
        for (var _i = 0, _a = Object.values(TOSRegion); _i < _a.length; _i++) {
            var region = _a[_i];
            if (location.href.indexOf("/" + toUrl(region) + "/") > -1)
                return region;
        }
        return TOSRegion.iTOS;
    }
    TOSRegionService.get = get;
    function getUrl() {
        return toUrl(get());
    }
    TOSRegionService.getUrl = getUrl;
    function isRebuild(value) {
        return VERSIONS[value].rebuild;
    }
    TOSRegionService.isRebuild = isRebuild;
    function select(region) {
        // Update url
        var regionOld = "/" + toUrl(TOSRegionService.get()) + "/";
        var regionNew = "/" + toUrl(region) + "/";
        //console.log('region select', regionOld, regionNew, url)
        location.href = location.href.replace(regionOld, regionNew);
    }
    TOSRegionService.select = select;
    function toUrl(value) {
        return value.toString().toLowerCase();
    }
    function valueOf(param) {
        return Object
            .values(TOSRegion)
            .find(function (value) { return toUrl(value) == param.toLowerCase(); });
    }
    TOSRegionService.valueOf = valueOf;
})(TOSRegionService || (TOSRegionService = {}));


/***/ }),

/***/ "./src/app/shared/domain/tos/attribute/tos-attribute.model.ts":
/*!********************************************************************!*\
  !*** ./src/app/shared/domain/tos/attribute/tos-attribute.model.ts ***!
  \********************************************************************/
/*! exports provided: TOSAttribute, TOSAttributeUnlockArg */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSAttribute", function() { return TOSAttribute; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSAttributeUnlockArg", function() { return TOSAttributeUnlockArg; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _tos_entity_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../tos-entity.model */ "./src/app/shared/domain/tos/tos-entity.model.ts");
/* harmony import */ var _tos_domain__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../tos-domain */ "./src/app/shared/domain/tos/tos-domain.ts");
/* harmony import */ var _tos_domain_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../tos-domain.service */ "./src/app/shared/domain/tos/tos-domain.service.ts");
/* harmony import */ var _service_lua_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../service/lua.service */ "./src/app/shared/service/lua.service.ts");
/* harmony import */ var rxjs_internal_compatibility__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/internal-compatibility */ "./node_modules/rxjs/_esm5/internal-compatibility/index.js");






var TOSAttribute = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](TOSAttribute, _super);
    function TOSAttribute(json) {
        return _super.call(this, _tos_domain__WEBPACK_IMPORTED_MODULE_2__["TOSDataSet"].ATTRIBUTES, json) || this;
    }
    Object.defineProperty(TOSAttribute.prototype, "DescriptionRequired", {
        get: function () { return this.$lazyPropertyStringMultiline('DescriptionRequired', function (value) { return '<br/>' + value; }); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSAttribute.prototype, "IsToggleable", {
        get: function () { return this.$lazyPropertyBoolean('IsToggleable'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSAttribute.prototype, "LevelMax", {
        get: function () { return this.$lazyPropertyNumber('LevelMax'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSAttribute.prototype, "Unlock", {
        get: function () { return this.$lazyPropertyJSONArray('Unlock'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSAttribute.prototype, "UnlockArgs", {
        get: function () { return this.$lazyPropertyJSONObject('UnlockArgs', function (value) { return new TOSAttributeUnlockArg(value); }); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSAttribute.prototype, "UpgradePrice", {
        get: function () { return this.$lazyPropertyJSONArray('UpgradePrice'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSAttribute.prototype, "Link_Jobs", {
        get: function () { return this.$lazyPropertyLink('Link_Jobs', function (value) { return _tos_domain_service__WEBPACK_IMPORTED_MODULE_3__["TOSDomainService"].jobsById(value); }); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSAttribute.prototype, "Link_Skills", {
        get: function () { return this.$lazyPropertyLink('Link_Skills', function (value) { return _tos_domain_service__WEBPACK_IMPORTED_MODULE_3__["TOSDomainService"].skillsById(value); }); },
        enumerable: true,
        configurable: true
    });
    TOSAttribute.prototype.Price = function (level) { return level > 0 && this.UpgradePrice ? this.UpgradePrice[level - 1] : 0; };
    TOSAttribute.prototype.PriceTotal = function (level) {
        var _this = this;
        return Array.from({ length: level + 1 }, function (x, i) { return _this.Price(i); }).reduce(function (a, b) { return a + b; }, 0);
    };
    TOSAttribute.prototype.unlockAvailable = function (build) {
        var _this = this;
        return Object(rxjs_internal_compatibility__WEBPACK_IMPORTED_MODULE_5__["fromPromise"])((function () { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
            var _i, _a, unlockArg, source, context, unlock;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.Unlock)
                            return [2 /*return*/, true];
                        _i = 0, _a = Object.values(this.UnlockArgs);
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        unlockArg = _a[_i];
                        source = this.Unlock;
                        context = {
                            'abilIES': null,
                            'abilName': "'" + unlockArg.UnlockArgStr + "'",
                            'jobName': "'" + unlockArg.UnlockArgStr + "'",
                            'jobClassName': "'" + unlockArg.UnlockArgStr + "'",
                            'sklName': "'" + unlockArg.UnlockArgStr + "'",
                            'levelFix': unlockArg.UnlockArgNum,
                            'limitLevel': unlockArg.UnlockArgNum,
                            'limitRank': unlockArg.UnlockArgNum,
                            'player': {
                                'JobName': "'" + unlockArg.UnlockArgStr + "'",
                            }
                        };
                        return [4 /*yield*/, _service_lua_service__WEBPACK_IMPORTED_MODULE_4__["LUAService"].eval(build, source, context).toPromise()];
                    case 2:
                        unlock = (_b.sent());
                        if (unlock === 'UNLOCK')
                            return [2 /*return*/, true];
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, false];
                }
            });
        }); })());
    };
    TOSAttribute.prototype.unlockAvailableCheck = function (args) {
        if (this.UnlockArgs != null)
            for (var _i = 0, _a = Object.values(this.UnlockArgs); _i < _a.length; _i++) {
                var attributeUnlock = _a[_i];
                for (var _b = 0, args_1 = args; _b < args_1.length; _b++) {
                    var value = args_1[_b];
                    if (value == attributeUnlock.UnlockArgStr)
                        return true;
                }
            }
        return false;
    };
    return TOSAttribute;
}(_tos_entity_model__WEBPACK_IMPORTED_MODULE_1__["TOSEntity"]));

var TOSAttributeUnlockArg = /** @class */ (function () {
    function TOSAttributeUnlockArg(json) {
        this.UnlockArgStr = json.UnlockArgStr;
        this.UnlockArgNum = +json.UnlockArgNum;
    }
    return TOSAttributeUnlockArg;
}());



/***/ }),

/***/ "./src/app/shared/domain/tos/attribute/tos-attribute.resolver.ts":
/*!***********************************************************************!*\
  !*** ./src/app/shared/domain/tos/attribute/tos-attribute.resolver.ts ***!
  \***********************************************************************/
/*! exports provided: TOSAttributeResolver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSAttributeResolver", function() { return TOSAttributeResolver; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _service_CRUD_resolver__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../service/CRUD.resolver */ "./src/app/shared/service/CRUD.resolver.ts");
/* harmony import */ var _tos_domain__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../tos-domain */ "./src/app/shared/domain/tos/tos-domain.ts");




var TOSAttributeResolver = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](TOSAttributeResolver, _super);
    function TOSAttributeResolver() {
        return _super.call(this, _tos_domain__WEBPACK_IMPORTED_MODULE_3__["TOSDataSet"].ATTRIBUTES) || this;
    }
    TOSAttributeResolver = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], TOSAttributeResolver);
    return TOSAttributeResolver;
}(_service_CRUD_resolver__WEBPACK_IMPORTED_MODULE_2__["CRUDResolver"]));



/***/ }),

/***/ "./src/app/shared/domain/tos/item/book/tos-book.model.ts":
/*!***************************************************************!*\
  !*** ./src/app/shared/domain/tos/item/book/tos-book.model.ts ***!
  \***************************************************************/
/*! exports provided: TOSBook */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSBook", function() { return TOSBook; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _tos_item_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../tos-item.model */ "./src/app/shared/domain/tos/item/tos-item.model.ts");
/* harmony import */ var _tos_domain__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../tos-domain */ "./src/app/shared/domain/tos/tos-domain.ts");



var TOSBook = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](TOSBook, _super);
    function TOSBook(json) {
        return _super.call(this, _tos_domain__WEBPACK_IMPORTED_MODULE_2__["TOSDataSet"].BOOKS, json) || this;
    }
    Object.defineProperty(TOSBook.prototype, "Pages", {
        get: function () { return this.$lazyPropertyStringMultiline('Text'); },
        enumerable: true,
        configurable: true
    });
    return TOSBook;
}(_tos_item_model__WEBPACK_IMPORTED_MODULE_1__["TOSItem"]));



/***/ }),

/***/ "./src/app/shared/domain/tos/item/book/tos-book.resolver.ts":
/*!******************************************************************!*\
  !*** ./src/app/shared/domain/tos/item/book/tos-book.resolver.ts ***!
  \******************************************************************/
/*! exports provided: TOSBookResolver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSBookResolver", function() { return TOSBookResolver; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _service_CRUD_resolver__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../service/CRUD.resolver */ "./src/app/shared/service/CRUD.resolver.ts");
/* harmony import */ var _tos_domain__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../tos-domain */ "./src/app/shared/domain/tos/tos-domain.ts");




var TOSBookResolver = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](TOSBookResolver, _super);
    function TOSBookResolver() {
        return _super.call(this, _tos_domain__WEBPACK_IMPORTED_MODULE_3__["TOSDataSet"].BOOKS) || this;
    }
    TOSBookResolver = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], TOSBookResolver);
    return TOSBookResolver;
}(_service_CRUD_resolver__WEBPACK_IMPORTED_MODULE_2__["CRUDResolver"]));



/***/ }),

/***/ "./src/app/shared/domain/tos/item/card/tos-card.model.ts":
/*!***************************************************************!*\
  !*** ./src/app/shared/domain/tos/item/card/tos-card.model.ts ***!
  \***************************************************************/
/*! exports provided: TOSCard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSCard", function() { return TOSCard; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _tos_item_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../tos-item.model */ "./src/app/shared/domain/tos/item/tos-item.model.ts");
/* harmony import */ var _tos_domain__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../tos-domain */ "./src/app/shared/domain/tos/tos-domain.ts");



var TOSCard = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](TOSCard, _super);
    function TOSCard(json) {
        return _super.call(this, _tos_domain__WEBPACK_IMPORTED_MODULE_2__["TOSDataSet"].CARDS, json) || this;
    }
    Object.defineProperty(TOSCard.prototype, "Description", {
        get: function () {
            return this.$lazyPropertyStringMultiline('Description')
                .split('{img star_mark 20 20}')
                .join('<span class="text-warning">★</span>');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSCard.prototype, "IconTooltip", {
        get: function () {
            var icon = this.$lazyPropertyString('IconTooltip');
            return icon
                ? 'assets/icons/' + icon.toLowerCase() + '.jpg'
                : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSCard.prototype, "MonsterElement", {
        get: function () { return this.$lazyPropertyEnum('MonsterElement', _tos_domain__WEBPACK_IMPORTED_MODULE_2__["TOSElement"]); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSCard.prototype, "MonsterRace", {
        get: function () { return this.$lazyPropertyEnum('MonsterRace', _tos_domain__WEBPACK_IMPORTED_MODULE_2__["TOSMonsterRace"]); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSCard.prototype, "Stat_Height", {
        get: function () { return this.$lazyPropertyNumber('Stat_Height'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSCard.prototype, "Stat_Legs", {
        get: function () { return this.$lazyPropertyNumber('Stat_Legs'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSCard.prototype, "Stat_Weight", {
        get: function () { return this.$lazyPropertyNumber('Stat_Weight'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSCard.prototype, "TypeCard", {
        get: function () { return this.$lazyPropertyEnum('TypeCard', _tos_domain__WEBPACK_IMPORTED_MODULE_2__["TOSCardType"]); },
        enumerable: true,
        configurable: true
    });
    return TOSCard;
}(_tos_item_model__WEBPACK_IMPORTED_MODULE_1__["TOSItem"]));



/***/ }),

/***/ "./src/app/shared/domain/tos/item/card/tos-card.resolver.ts":
/*!******************************************************************!*\
  !*** ./src/app/shared/domain/tos/item/card/tos-card.resolver.ts ***!
  \******************************************************************/
/*! exports provided: TOSCardResolver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSCardResolver", function() { return TOSCardResolver; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _service_CRUD_resolver__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../service/CRUD.resolver */ "./src/app/shared/service/CRUD.resolver.ts");
/* harmony import */ var _tos_domain__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../tos-domain */ "./src/app/shared/domain/tos/tos-domain.ts");




var TOSCardResolver = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](TOSCardResolver, _super);
    function TOSCardResolver() {
        return _super.call(this, _tos_domain__WEBPACK_IMPORTED_MODULE_3__["TOSDataSet"].CARDS) || this;
    }
    TOSCardResolver = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], TOSCardResolver);
    return TOSCardResolver;
}(_service_CRUD_resolver__WEBPACK_IMPORTED_MODULE_2__["CRUDResolver"]));



/***/ }),

/***/ "./src/app/shared/domain/tos/item/collection/tos-collection.model.ts":
/*!***************************************************************************!*\
  !*** ./src/app/shared/domain/tos/item/collection/tos-collection.model.ts ***!
  \***************************************************************************/
/*! exports provided: TOSCollection, TOSCollectionBonus */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSCollection", function() { return TOSCollection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSCollectionBonus", function() { return TOSCollectionBonus; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _tos_item_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../tos-item.model */ "./src/app/shared/domain/tos/item/tos-item.model.ts");
/* harmony import */ var _tos_domain__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../tos-domain */ "./src/app/shared/domain/tos/tos-domain.ts");
/* harmony import */ var _tos_domain_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../tos-domain.service */ "./src/app/shared/domain/tos/tos-domain.service.ts");
/* harmony import */ var _utils_array_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../utils/array-utils */ "./src/app/shared/utils/array-utils.ts");





var TOSCollection = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](TOSCollection, _super);
    function TOSCollection(json) {
        return _super.call(this, _tos_domain__WEBPACK_IMPORTED_MODULE_2__["TOSDataSet"].COLLECTIONS, json) || this;
    }
    Object.defineProperty(TOSCollection.prototype, "Bonus", {
        get: function () { return this.$lazyPropertyJSONArray('Bonus', function (value) { return new TOSCollectionBonus(value); }, _utils_array_utils__WEBPACK_IMPORTED_MODULE_4__["ArrayUtils"].sort); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSCollection.prototype, "Link_Items", {
        get: function () { return this.$lazyPropertyLink('Link_Items', function (value) { return _tos_domain_service__WEBPACK_IMPORTED_MODULE_3__["TOSDomainService"].itemsByIdLink(value); }); },
        enumerable: true,
        configurable: true
    });
    return TOSCollection;
}(_tos_item_model__WEBPACK_IMPORTED_MODULE_1__["TOSItem"]));

var TOSCollectionBonus = /** @class */ (function () {
    function TOSCollectionBonus(json) {
        this.Stat = json[0];
        this.Value = +json[1];
    }
    TOSCollectionBonus.prototype.toString = function () {
        return this.Stat + ' ' + (this.Value > 0 ? '+' : '') + this.Value;
    };
    return TOSCollectionBonus;
}());



/***/ }),

/***/ "./src/app/shared/domain/tos/item/collection/tos-collection.resolver.ts":
/*!******************************************************************************!*\
  !*** ./src/app/shared/domain/tos/item/collection/tos-collection.resolver.ts ***!
  \******************************************************************************/
/*! exports provided: TOSCollectionResolver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSCollectionResolver", function() { return TOSCollectionResolver; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _service_CRUD_resolver__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../service/CRUD.resolver */ "./src/app/shared/service/CRUD.resolver.ts");
/* harmony import */ var _tos_domain__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../tos-domain */ "./src/app/shared/domain/tos/tos-domain.ts");




var TOSCollectionResolver = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](TOSCollectionResolver, _super);
    function TOSCollectionResolver() {
        return _super.call(this, _tos_domain__WEBPACK_IMPORTED_MODULE_3__["TOSDataSet"].COLLECTIONS) || this;
    }
    TOSCollectionResolver = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], TOSCollectionResolver);
    return TOSCollectionResolver;
}(_service_CRUD_resolver__WEBPACK_IMPORTED_MODULE_2__["CRUDResolver"]));



/***/ }),

/***/ "./src/app/shared/domain/tos/item/cube/tos-cube.model.ts":
/*!***************************************************************!*\
  !*** ./src/app/shared/domain/tos/item/cube/tos-cube.model.ts ***!
  \***************************************************************/
/*! exports provided: TOSCube */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSCube", function() { return TOSCube; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _tos_item_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../tos-item.model */ "./src/app/shared/domain/tos/item/tos-item.model.ts");
/* harmony import */ var _tos_domain__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../tos-domain */ "./src/app/shared/domain/tos/tos-domain.ts");
/* harmony import */ var _tos_domain_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../tos-domain.service */ "./src/app/shared/domain/tos/tos-domain.service.ts");




var TOSCube = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](TOSCube, _super);
    function TOSCube(json) {
        return _super.call(this, _tos_domain__WEBPACK_IMPORTED_MODULE_2__["TOSDataSet"].CUBES, json) || this;
    }
    Object.defineProperty(TOSCube.prototype, "Link_Items", {
        get: function () { return this.$lazyPropertyLink('Link_Items', function (value) { return _tos_domain_service__WEBPACK_IMPORTED_MODULE_3__["TOSDomainService"].itemsByIdLink(value); }); },
        enumerable: true,
        configurable: true
    });
    return TOSCube;
}(_tos_item_model__WEBPACK_IMPORTED_MODULE_1__["TOSItem"]));



/***/ }),

/***/ "./src/app/shared/domain/tos/item/cube/tos-cube.resolver.ts":
/*!******************************************************************!*\
  !*** ./src/app/shared/domain/tos/item/cube/tos-cube.resolver.ts ***!
  \******************************************************************/
/*! exports provided: TOSCubeResolver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSCubeResolver", function() { return TOSCubeResolver; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _service_CRUD_resolver__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../service/CRUD.resolver */ "./src/app/shared/service/CRUD.resolver.ts");
/* harmony import */ var _tos_domain__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../tos-domain */ "./src/app/shared/domain/tos/tos-domain.ts");




var TOSCubeResolver = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](TOSCubeResolver, _super);
    function TOSCubeResolver() {
        return _super.call(this, _tos_domain__WEBPACK_IMPORTED_MODULE_3__["TOSDataSet"].CUBES) || this;
    }
    TOSCubeResolver = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], TOSCubeResolver);
    return TOSCubeResolver;
}(_service_CRUD_resolver__WEBPACK_IMPORTED_MODULE_2__["CRUDResolver"]));



/***/ }),

/***/ "./src/app/shared/domain/tos/item/equipment/tos-equipment-set.resolver.ts":
/*!********************************************************************************!*\
  !*** ./src/app/shared/domain/tos/item/equipment/tos-equipment-set.resolver.ts ***!
  \********************************************************************************/
/*! exports provided: TOSEquipmentSetResolver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSEquipmentSetResolver", function() { return TOSEquipmentSetResolver; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _service_CRUD_resolver__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../service/CRUD.resolver */ "./src/app/shared/service/CRUD.resolver.ts");
/* harmony import */ var _tos_domain__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../tos-domain */ "./src/app/shared/domain/tos/tos-domain.ts");




var TOSEquipmentSetResolver = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](TOSEquipmentSetResolver, _super);
    function TOSEquipmentSetResolver() {
        return _super.call(this, _tos_domain__WEBPACK_IMPORTED_MODULE_3__["TOSDataSet"].EQUIPMENT_SETS) || this;
    }
    TOSEquipmentSetResolver = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], TOSEquipmentSetResolver);
    return TOSEquipmentSetResolver;
}(_service_CRUD_resolver__WEBPACK_IMPORTED_MODULE_2__["CRUDResolver"]));



/***/ }),

/***/ "./src/app/shared/domain/tos/item/equipment/tos-equipment.model.ts":
/*!*************************************************************************!*\
  !*** ./src/app/shared/domain/tos/item/equipment/tos-equipment.model.ts ***!
  \*************************************************************************/
/*! exports provided: TOSEquipment, TOSEquipmentBonus, TOSEquipmentSet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSEquipment", function() { return TOSEquipment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSEquipmentBonus", function() { return TOSEquipmentBonus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSEquipmentSet", function() { return TOSEquipmentSet; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _tos_entity_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../tos-entity.model */ "./src/app/shared/domain/tos/tos-entity.model.ts");
/* harmony import */ var _tos_item_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../tos-item.model */ "./src/app/shared/domain/tos/item/tos-item.model.ts");
/* harmony import */ var _tos_domain__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../tos-domain */ "./src/app/shared/domain/tos/tos-domain.ts");
/* harmony import */ var _tos_domain_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../tos-domain.service */ "./src/app/shared/domain/tos/tos-domain.service.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");






var TOSEquipment = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](TOSEquipment, _super);
    function TOSEquipment(json) {
        var _this = _super.call(this, _tos_domain__WEBPACK_IMPORTED_MODULE_3__["TOSDataSet"].EQUIPMENT, json) || this;
        _this.$comparators['Grade'] = _tos_domain__WEBPACK_IMPORTED_MODULE_3__["TOSEquipmentGradeService"].comparator;
        return _this;
    }
    Object.defineProperty(TOSEquipment.prototype, "Bonus", {
        get: function () { return this.$lazyPropertyJSONArray('Bonus', function (value) { return new TOSEquipmentBonus(value); }, function (a, b) { return _tos_domain__WEBPACK_IMPORTED_MODULE_3__["TOSStatService"].comparator(a.Stat, b.Stat); }); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSEquipment.prototype, "Durability", {
        get: function () { return this.$lazyPropertyNumber('Durability'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSEquipment.prototype, "Grade", {
        get: function () { return this.$lazyPropertyEnum('Grade', _tos_domain__WEBPACK_IMPORTED_MODULE_3__["TOSEquipmentGrade"]); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSEquipment.prototype, "IsAnvilAvailable", {
        get: function () { return (this.AnvilATK(1) > 0 || this.AnvilDEF(1) > 0) && this.AnvilPrice(1) > 0; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSEquipment.prototype, "IsTranscendAvailable", {
        get: function () { return this.TranscendPrice(1) > 0; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSEquipment.prototype, "Link_Set", {
        get: function () { return this.$lazyPropertyLink('Link_Set', function (value) { return _tos_domain_service__WEBPACK_IMPORTED_MODULE_4__["TOSDomainService"].equipmentSetsById(value); }); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSEquipment.prototype, "Level", {
        get: function () { return this.$lazyPropertyNumber('Level'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSEquipment.prototype, "Material", {
        get: function () { return this.$lazyPropertyEnum('Material', _tos_domain__WEBPACK_IMPORTED_MODULE_3__["TOSEquipmentMaterial"]); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSEquipment.prototype, "Potential", {
        get: function () { return this.$lazyPropertyNumber('Potential'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSEquipment.prototype, "RequiredClass", {
        get: function () { return this.$lazyPropertyString('RequiredClass'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSEquipment.prototype, "RequiredLevel", {
        get: function () { return this.$lazyPropertyNumber('RequiredLevel'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSEquipment.prototype, "Sockets", {
        get: function () { return this.$lazyPropertyNumber('Sockets'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSEquipment.prototype, "SocketsLimit", {
        get: function () { return this.$lazyPropertyNumber('SocketsLimit'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSEquipment.prototype, "Stars", {
        get: function () { return this.$lazyPropertyNumber('Stars'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSEquipment.prototype, "Stat_ATTACK_MAGICAL", {
        get: function () { return this.$lazyPropertyNumber('Stat_ATTACK_MAGICAL'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSEquipment.prototype, "Stat_ATTACK_PHYSICAL_MAX", {
        get: function () { return this.$lazyPropertyNumber('Stat_ATTACK_PHYSICAL_MAX'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSEquipment.prototype, "Stat_ATTACK_PHYSICAL_MIN", {
        get: function () { return this.$lazyPropertyNumber('Stat_ATTACK_PHYSICAL_MIN'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSEquipment.prototype, "Stat_DEFENSE_MAGICAL", {
        get: function () { return this.$lazyPropertyNumber('Stat_DEFENSE_MAGICAL'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSEquipment.prototype, "Stat_DEFENSE_PHYSICAL", {
        get: function () { return this.$lazyPropertyNumber('Stat_DEFENSE_PHYSICAL'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSEquipment.prototype, "TypeAttack", {
        get: function () { return this.$lazyPropertyEnum('TypeAttack', _tos_domain__WEBPACK_IMPORTED_MODULE_3__["TOSAttackType"]); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSEquipment.prototype, "TypeEquipment", {
        get: function () { return this.$lazyPropertyEnum('TypeEquipment', _tos_domain__WEBPACK_IMPORTED_MODULE_3__["TOSEquipmentType"]); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSEquipment.prototype, "Unidentified", {
        get: function () { return this.$lazyPropertyBoolean('Unidentified'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSEquipment.prototype, "UnidentifiedRandom", {
        get: function () { return this.$lazyPropertyBoolean('UnidentifiedRandom'); },
        enumerable: true,
        configurable: true
    });
    TOSEquipment.prototype.IsUsableBy = function (classTree) {
        var index = Object.values(_tos_domain__WEBPACK_IMPORTED_MODULE_3__["TOSClassTree"]).indexOf(classTree);
        return this.RequiredClass[index] == 'T';
    };
    TOSEquipment.prototype.AnvilATK = function (level) {
        var anvilATK = this.$lazyPropertyJSONArray('AnvilATK');
        return level > 0 && anvilATK && anvilATK[level - 1] || 0;
    };
    TOSEquipment.prototype.AnvilDEF = function (level) {
        var anvilDEF = this.$lazyPropertyJSONArray('AnvilDEF');
        return level > 0 && anvilDEF && anvilDEF[level - 1] || 0;
    };
    TOSEquipment.prototype.AnvilPrice = function (level) {
        var anvilPrice = this.$lazyPropertyJSONArray('AnvilPrice');
        return level > 0 && anvilPrice && anvilPrice[level - 1] || 0;
    };
    TOSEquipment.prototype.AnvilPriceTotal = function (level) {
        var _this = this;
        return Array.from({ length: level + 1 }, function (x, i) { return _this.AnvilPrice(i); }).reduce(function (a, b) { return a + b; }, 0);
    };
    TOSEquipment.prototype.TranscendATKRatio = function (level) { return level * 0.1; };
    TOSEquipment.prototype.TranscendMDEFRatio = function (level) { return level * 0.1; };
    TOSEquipment.prototype.TranscendPDEFRatio = function (level) { return level * 0.1; };
    TOSEquipment.prototype.TranscendPrice = function (level) {
        var transcendPrice = this.$lazyPropertyJSONArray('TranscendPrice');
        return level > 0 && transcendPrice && transcendPrice[level - 1] || 0;
    };
    TOSEquipment.prototype.TranscendPriceTotal = function (level) {
        for (var sum = 0, i = 1; i <= level; i++)
            sum += this.TranscendPrice(i);
        return sum;
    };
    return TOSEquipment;
}(_tos_item_model__WEBPACK_IMPORTED_MODULE_2__["TOSItem"]));

var TOSEquipmentBonus = /** @class */ (function () {
    function TOSEquipmentBonus(json) {
        this.Stat = Object.values(_tos_domain__WEBPACK_IMPORTED_MODULE_3__["TOSStat"])[+json[0]];
        this.Value = isNaN(+json[1]) ? null : +json[1];
        this.ValueHTML = isNaN(+json[1]) ? json[1] : null;
        // HotFix: add special bonus' arrows
        if (this.ValueHTML) {
            this.ValueHTML = this.ValueHTML.split('{img green_up_arrow 16 16}').join('<span class="text-success">▲</span> ');
            this.ValueHTML = this.ValueHTML.split('{img red_down_arrow 16 16}').join('<span class="text-danger">▼</span> ');
        }
    }
    return TOSEquipmentBonus;
}());

// Note: we can't put this one on a separate class otherwise it generates a circular dependency
var TOSEquipmentSet = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](TOSEquipmentSet, _super);
    function TOSEquipmentSet(json) {
        var _this = _super.call(this, _tos_domain__WEBPACK_IMPORTED_MODULE_3__["TOSDataSet"].EQUIPMENT_SETS, json) || this;
        _this.json = json;
        return _this;
    }
    Object.defineProperty(TOSEquipmentSet.prototype, "Bonus", {
        get: function () {
            var result = [this.Bonus2, this.Bonus3, this.Bonus4, this.Bonus5, this.Bonus6, this.Bonus7]
                .map(function (bonusGroup) { return (bonusGroup || '')
                .split('{nl}')
                .map(function (bonus) { return bonus ? new TOSEquipmentBonus([_tos_domain__WEBPACK_IMPORTED_MODULE_3__["TOSStat"].UNKNOWN.toString(), bonus]) : null; })
                .filter(function (bonus) { return bonus; }); })
                .reduce(function (result, bonusGroup, i) {
                if (bonusGroup.length)
                    result[i + 2] = bonusGroup;
                return result;
            }, {});
            return result;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSEquipmentSet.prototype, "Bonus2", {
        get: function () { return this.$lazyPropertyString('Bonus2'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSEquipmentSet.prototype, "Bonus3", {
        get: function () { return this.$lazyPropertyString('Bonus3'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSEquipmentSet.prototype, "Bonus4", {
        get: function () { return this.$lazyPropertyString('Bonus4'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSEquipmentSet.prototype, "Bonus5", {
        get: function () { return this.$lazyPropertyString('Bonus5'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSEquipmentSet.prototype, "Bonus6", {
        get: function () { return this.$lazyPropertyString('Bonus6'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSEquipmentSet.prototype, "Bonus7", {
        get: function () { return this.$lazyPropertyString('Bonus7'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSEquipmentSet.prototype, "Icon", {
        get: function () { throw new Error('Unsupported operation'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSEquipmentSet.prototype, "Icon$", {
        get: function () { return this.Link_Items.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (value) { return value && value[0].Icon; })); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSEquipmentSet.prototype, "Url", {
        get: function () { throw new Error('Unsupported operation'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSEquipmentSet.prototype, "Url$", {
        get: function () { return this.Link_Items.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (value) { return value && value[0].Url; })); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSEquipmentSet.prototype, "Link_Items", {
        get: function () { return this.$lazyPropertyLink('Link_Items', function (value) { return _tos_domain_service__WEBPACK_IMPORTED_MODULE_4__["TOSDomainService"].itemsByIdLink(value); }); },
        enumerable: true,
        configurable: true
    });
    return TOSEquipmentSet;
}(_tos_entity_model__WEBPACK_IMPORTED_MODULE_1__["TOSEntity"]));



/***/ }),

/***/ "./src/app/shared/domain/tos/item/equipment/tos-equipment.resolver.ts":
/*!****************************************************************************!*\
  !*** ./src/app/shared/domain/tos/item/equipment/tos-equipment.resolver.ts ***!
  \****************************************************************************/
/*! exports provided: TOSEquipmentResolver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSEquipmentResolver", function() { return TOSEquipmentResolver; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _service_CRUD_resolver__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../service/CRUD.resolver */ "./src/app/shared/service/CRUD.resolver.ts");
/* harmony import */ var _tos_domain__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../tos-domain */ "./src/app/shared/domain/tos/tos-domain.ts");




var TOSEquipmentResolver = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](TOSEquipmentResolver, _super);
    function TOSEquipmentResolver() {
        return _super.call(this, _tos_domain__WEBPACK_IMPORTED_MODULE_3__["TOSDataSet"].EQUIPMENT) || this;
    }
    TOSEquipmentResolver = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], TOSEquipmentResolver);
    return TOSEquipmentResolver;
}(_service_CRUD_resolver__WEBPACK_IMPORTED_MODULE_2__["CRUDResolver"]));



/***/ }),

/***/ "./src/app/shared/domain/tos/item/gem/tos-gem.model.ts":
/*!*************************************************************!*\
  !*** ./src/app/shared/domain/tos/item/gem/tos-gem.model.ts ***!
  \*************************************************************/
/*! exports provided: TOSGem, TOSGemBonus */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSGem", function() { return TOSGem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSGemBonus", function() { return TOSGemBonus; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _tos_item_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../tos-item.model */ "./src/app/shared/domain/tos/item/tos-item.model.ts");
/* harmony import */ var _tos_domain__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../tos-domain */ "./src/app/shared/domain/tos/tos-domain.ts");
/* harmony import */ var _tos_domain_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../tos-domain.service */ "./src/app/shared/domain/tos/tos-domain.service.ts");




var TOSGem = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](TOSGem, _super);
    function TOSGem(json) {
        return _super.call(this, _tos_domain__WEBPACK_IMPORTED_MODULE_2__["TOSDataSet"].GEMS, json) || this;
    }
    Object.defineProperty(TOSGem.prototype, "BonusBoots", {
        get: function () { return this.$lazyPropertyJSONArray('BonusBoots', function (value) { return new TOSGemBonus(value); }); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSGem.prototype, "BonusGloves", {
        get: function () { return this.$lazyPropertyJSONArray('BonusGloves', function (value) { return new TOSGemBonus(value); }); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSGem.prototype, "BonusSubWeapon", {
        get: function () { return this.$lazyPropertyJSONArray('BonusSubWeapon', function (value) { return new TOSGemBonus(value); }); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSGem.prototype, "BonusTopAndBottom", {
        get: function () { return this.$lazyPropertyJSONArray('BonusTopAndBottom', function (value) { return new TOSGemBonus(value); }); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSGem.prototype, "BonusWeapon", {
        get: function () { return this.$lazyPropertyJSONArray('BonusWeapon', function (value) { return new TOSGemBonus(value); }); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSGem.prototype, "Link_Skill", {
        get: function () { return this.$lazyPropertyLink('Link_Skill', function (value) { return _tos_domain_service__WEBPACK_IMPORTED_MODULE_3__["TOSDomainService"].skillsById(value); }); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSGem.prototype, "TypeGem", {
        get: function () { return this.$lazyPropertyEnum('TypeGem', _tos_domain__WEBPACK_IMPORTED_MODULE_2__["TOSGemType"]); },
        enumerable: true,
        configurable: true
    });
    TOSGem.prototype.Bonus = function (level) {
        var _this = this;
        return Object
            .values(_tos_domain__WEBPACK_IMPORTED_MODULE_2__["TOSGemSlot"])
            .reduce(function (result, slot, i) {
            if (_this['Bonus' + slot])
                result[slot] = [
                    _this['Bonus' + slot][(level - 1) * 2],
                    _this['Bonus' + slot][(level - 1) * 2 + 1]
                ];
            return result;
        }, {});
    };
    return TOSGem;
}(_tos_item_model__WEBPACK_IMPORTED_MODULE_1__["TOSItem"]));

var TOSGemBonus = /** @class */ (function () {
    function TOSGemBonus(json) {
        this.Stat = Object.values(_tos_domain__WEBPACK_IMPORTED_MODULE_2__["TOSStat"])[+json.Stat] || json.Stat;
        this.Value = +json.Value;
    }
    TOSGemBonus.prototype.toString = function () {
        var string = isNaN(this.Value)
            ? this.Stat
            : this.Stat + ' ' + (this.Value > 0 ? '+ ' : this.Value < 0 ? '- ' : '') + Math.abs(this.Value);
        string = string.split('+').join('<span class="text-success">▲</span>');
        if (this.Value < 0)
            string = string.split('-').join('<span class="text-danger">▼</span>');
        return string;
    };
    return TOSGemBonus;
}());



/***/ }),

/***/ "./src/app/shared/domain/tos/item/gem/tos-gem.resolver.ts":
/*!****************************************************************!*\
  !*** ./src/app/shared/domain/tos/item/gem/tos-gem.resolver.ts ***!
  \****************************************************************/
/*! exports provided: TOSGemResolver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSGemResolver", function() { return TOSGemResolver; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _service_CRUD_resolver__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../service/CRUD.resolver */ "./src/app/shared/service/CRUD.resolver.ts");
/* harmony import */ var _tos_domain__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../tos-domain */ "./src/app/shared/domain/tos/tos-domain.ts");




var TOSGemResolver = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](TOSGemResolver, _super);
    function TOSGemResolver() {
        return _super.call(this, _tos_domain__WEBPACK_IMPORTED_MODULE_3__["TOSDataSet"].GEMS) || this;
    }
    TOSGemResolver = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], TOSGemResolver);
    return TOSGemResolver;
}(_service_CRUD_resolver__WEBPACK_IMPORTED_MODULE_2__["CRUDResolver"]));



/***/ }),

/***/ "./src/app/shared/domain/tos/item/recipe/tos-recipe.model.ts":
/*!*******************************************************************!*\
  !*** ./src/app/shared/domain/tos/item/recipe/tos-recipe.model.ts ***!
  \*******************************************************************/
/*! exports provided: TOSRecipe, TOSRecipeMaterial */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSRecipe", function() { return TOSRecipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSRecipeMaterial", function() { return TOSRecipeMaterial; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _tos_item_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../tos-item.model */ "./src/app/shared/domain/tos/item/tos-item.model.ts");
/* harmony import */ var _tos_domain__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../tos-domain */ "./src/app/shared/domain/tos/tos-domain.ts");
/* harmony import */ var _tos_domain_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../tos-domain.service */ "./src/app/shared/domain/tos/tos-domain.service.ts");
/* harmony import */ var rxjs_internal_compatibility__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/internal-compatibility */ "./node_modules/rxjs/_esm5/internal-compatibility/index.js");
/* harmony import */ var _tos_entity_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../tos-entity.model */ "./src/app/shared/domain/tos/tos-entity.model.ts");






var TOSRecipe = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](TOSRecipe, _super);
    function TOSRecipe(json) {
        return _super.call(this, _tos_domain__WEBPACK_IMPORTED_MODULE_2__["TOSDataSet"].RECIPES, json) || this;
    }
    Object.defineProperty(TOSRecipe.prototype, "Link_Materials", {
        get: function () {
            var _this = this;
            return this.$lazyPropertyLink('Link_Materials', function (value) { return _this.TOSRecipeLinkItem(value); });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSRecipe.prototype, "Link_Target", {
        get: function () { return this.$lazyPropertyLink('Link_Target', function (value) { return _tos_domain_service__WEBPACK_IMPORTED_MODULE_3__["TOSDomainService"].itemsByIdLink(value); }); },
        enumerable: true,
        configurable: true
    });
    TOSRecipe.prototype.TOSRecipeLinkItem = function (value) {
        var _this = this;
        return Object(rxjs_internal_compatibility__WEBPACK_IMPORTED_MODULE_4__["fromPromise"])((function () { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
            var object, _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        object = new TOSRecipeMaterial(value);
                        _a = object;
                        return [4 /*yield*/, _tos_domain_service__WEBPACK_IMPORTED_MODULE_3__["TOSDomainService"].itemsByIdLink(+object.Item).toPromise()];
                    case 1:
                        _a.Item = _b.sent();
                        return [2 /*return*/, object];
                }
            });
        }); })());
    };
    return TOSRecipe;
}(_tos_item_model__WEBPACK_IMPORTED_MODULE_1__["TOSItem"]));

var TOSRecipeMaterial = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](TOSRecipeMaterial, _super);
    function TOSRecipeMaterial(json) {
        var _this = _super.call(this) || this;
        _this.Item = json.Item;
        _this.Quantity = +json.Quantity;
        return _this;
    }
    Object.defineProperty(TOSRecipeMaterial.prototype, "Link", {
        get: function () { return this.Item; },
        enumerable: true,
        configurable: true
    });
    return TOSRecipeMaterial;
}(_tos_entity_model__WEBPACK_IMPORTED_MODULE_5__["TOSEntityLink"]));



/***/ }),

/***/ "./src/app/shared/domain/tos/item/recipe/tos-recipe.resolver.ts":
/*!**********************************************************************!*\
  !*** ./src/app/shared/domain/tos/item/recipe/tos-recipe.resolver.ts ***!
  \**********************************************************************/
/*! exports provided: TOSRecipeResolver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSRecipeResolver", function() { return TOSRecipeResolver; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _service_CRUD_resolver__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../service/CRUD.resolver */ "./src/app/shared/service/CRUD.resolver.ts");
/* harmony import */ var _tos_domain__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../tos-domain */ "./src/app/shared/domain/tos/tos-domain.ts");




var TOSRecipeResolver = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](TOSRecipeResolver, _super);
    function TOSRecipeResolver() {
        return _super.call(this, _tos_domain__WEBPACK_IMPORTED_MODULE_3__["TOSDataSet"].RECIPES) || this;
    }
    TOSRecipeResolver = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], TOSRecipeResolver);
    return TOSRecipeResolver;
}(_service_CRUD_resolver__WEBPACK_IMPORTED_MODULE_2__["CRUDResolver"]));



/***/ }),

/***/ "./src/app/shared/domain/tos/item/tos-item.model.ts":
/*!**********************************************************!*\
  !*** ./src/app/shared/domain/tos/item/tos-item.model.ts ***!
  \**********************************************************/
/*! exports provided: TOSItem, TOSItemLinkMonster, TOSItemLinkMap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSItem", function() { return TOSItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSItemLinkMonster", function() { return TOSItemLinkMonster; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSItemLinkMap", function() { return TOSItemLinkMap; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _tos_entity_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../tos-entity.model */ "./src/app/shared/domain/tos/tos-entity.model.ts");
/* harmony import */ var _tos_domain__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../tos-domain */ "./src/app/shared/domain/tos/tos-domain.ts");
/* harmony import */ var _tos_domain_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../tos-domain.service */ "./src/app/shared/domain/tos/tos-domain.service.ts");
/* harmony import */ var rxjs_internal_compatibility__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/internal-compatibility */ "./node_modules/rxjs/_esm5/internal-compatibility/index.js");





var TOSItem = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](TOSItem, _super);
    function TOSItem(dataset, json) {
        var _this = _super.call(this, dataset, json) || this;
        _this.Selected = true;
        return _this;
    }
    Object.defineProperty(TOSItem.prototype, "Link_Collections", {
        get: function () { return this.$lazyPropertyLink('Link_Collections', function (value) { return _tos_domain_service__WEBPACK_IMPORTED_MODULE_3__["TOSDomainService"].collectionsById(value); }); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSItem.prototype, "Link_Cubes", {
        get: function () { return this.$lazyPropertyLink('Link_Cubes', function (value) { return _tos_domain_service__WEBPACK_IMPORTED_MODULE_3__["TOSDomainService"].cubesById(value); }); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSItem.prototype, "Link_Monsters", {
        get: function () {
            var _this = this;
            return this.$lazyPropertyLink('Link_Monsters', function (value) { return _this.TOSItemLinkMonster(value); });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSItem.prototype, "Link_RecipeMaterial", {
        get: function () { return this.$lazyPropertyLink('Link_RecipeMaterial', function (value) { return _tos_domain_service__WEBPACK_IMPORTED_MODULE_3__["TOSDomainService"].recipesById(value); }); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSItem.prototype, "Link_RecipeTarget", {
        get: function () { return this.$lazyPropertyLink('Link_RecipeTarget', function (value) { return _tos_domain_service__WEBPACK_IMPORTED_MODULE_3__["TOSDomainService"].recipesById(value); }); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSItem.prototype, "Link_Maps", {
        get: function () {
            var _this = this;
            return this.$lazyPropertyLink('Link_Maps', function (value) { return _this.TOSItemLinkMap(value); });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSItem.prototype, "Link_Maps_Exploration", {
        get: function () {
            var _this = this;
            return this.$lazyPropertyLink('Link_Maps_Exploration', function (value) { return _this.TOSItemLinkMap(value); });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSItem.prototype, "Price", {
        get: function () { return this.$lazyPropertyNumber('Price'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSItem.prototype, "TimeCoolDown", {
        get: function () { return this.$lazyPropertyNumber('TimeCoolDown'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSItem.prototype, "TimeLifeTime", {
        get: function () { return this.$lazyPropertyNumber('TimeLifeTime'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSItem.prototype, "Tradability", {
        get: function () { return this.$lazyPropertyString('Tradability'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSItem.prototype, "Type", {
        get: function () { return this.$lazyPropertyEnum('Type', _tos_domain__WEBPACK_IMPORTED_MODULE_2__["TOSItemType"]); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSItem.prototype, "Weight", {
        get: function () { return this.$lazyPropertyNumber('Weight'); },
        enumerable: true,
        configurable: true
    });
    TOSItem.prototype.isTradable = function (tradable) {
        var index = Object.values(_tos_domain__WEBPACK_IMPORTED_MODULE_2__["TOSItemTradability"]).indexOf(tradable);
        return this.Tradability && this.Tradability[index] == 'T';
    };
    TOSItem.prototype.TOSItemLinkMonster = function (value) {
        var _this = this;
        return Object(rxjs_internal_compatibility__WEBPACK_IMPORTED_MODULE_4__["fromPromise"])((function () { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
            var object, _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        object = new TOSItemLinkMonster(value);
                        _a = object;
                        return [4 /*yield*/, _tos_domain_service__WEBPACK_IMPORTED_MODULE_3__["TOSDomainService"].monstersById(+object.Monster).toPromise()];
                    case 1:
                        _a.Monster = _b.sent();
                        return [2 /*return*/, object];
                }
            });
        }); })());
    };
    TOSItem.prototype.TOSItemLinkMap = function (value) {
        var _this = this;
        return Object(rxjs_internal_compatibility__WEBPACK_IMPORTED_MODULE_4__["fromPromise"])((function () { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
            var object, _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        object = new TOSItemLinkMap(value);
                        _a = object;
                        return [4 /*yield*/, _tos_domain_service__WEBPACK_IMPORTED_MODULE_3__["TOSDomainService"].mapsById(+object.Map).toPromise()];
                    case 1:
                        _a.Map = _b.sent();
                        return [2 /*return*/, object];
                }
            });
        }); })());
    };
    return TOSItem;
}(_tos_entity_model__WEBPACK_IMPORTED_MODULE_1__["TOSEntity"]));

var TOSItemLinkMonster = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](TOSItemLinkMonster, _super);
    function TOSItemLinkMonster(json) {
        var _this = _super.call(this) || this;
        _this.Chance = +json.Chance;
        _this.Monster = json.Monster;
        _this.Quantity_MAX = +json.Quantity_MAX;
        _this.Quantity_MIN = +json.Quantity_MIN;
        return _this;
    }
    Object.defineProperty(TOSItemLinkMonster.prototype, "Link", {
        get: function () { return this.Monster; },
        enumerable: true,
        configurable: true
    });
    return TOSItemLinkMonster;
}(_tos_entity_model__WEBPACK_IMPORTED_MODULE_1__["TOSEntityLink"]));

var TOSItemLinkMap = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](TOSItemLinkMap, _super);
    function TOSItemLinkMap(json) {
        var _this = _super.call(this) || this;
        _this.Chance = +json.Chance;
        _this.Map = json.Map;
        _this.Quantity_MAX = +json.Quantity_MAX;
        _this.Quantity_MIN = +json.Quantity_MIN;
        return _this;
    }
    Object.defineProperty(TOSItemLinkMap.prototype, "Link", {
        get: function () { return this.Map; },
        enumerable: true,
        configurable: true
    });
    return TOSItemLinkMap;
}(_tos_entity_model__WEBPACK_IMPORTED_MODULE_1__["TOSEntityLink"]));



/***/ }),

/***/ "./src/app/shared/domain/tos/item/tos-item.resolver.ts":
/*!*************************************************************!*\
  !*** ./src/app/shared/domain/tos/item/tos-item.resolver.ts ***!
  \*************************************************************/
/*! exports provided: TOSItemResolver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSItemResolver", function() { return TOSItemResolver; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _service_CRUD_resolver__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../service/CRUD.resolver */ "./src/app/shared/service/CRUD.resolver.ts");
/* harmony import */ var _tos_domain__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../tos-domain */ "./src/app/shared/domain/tos/tos-domain.ts");




var TOSItemResolver = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](TOSItemResolver, _super);
    function TOSItemResolver() {
        return _super.call(this, _tos_domain__WEBPACK_IMPORTED_MODULE_3__["TOSDataSet"].ITEMS) || this;
    }
    TOSItemResolver = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], TOSItemResolver);
    return TOSItemResolver;
}(_service_CRUD_resolver__WEBPACK_IMPORTED_MODULE_2__["CRUDResolver"]));



/***/ }),

/***/ "./src/app/shared/domain/tos/job/tos-job.model.ts":
/*!********************************************************!*\
  !*** ./src/app/shared/domain/tos/job/tos-job.model.ts ***!
  \********************************************************/
/*! exports provided: TOSJob */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSJob", function() { return TOSJob; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _tos_entity_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../tos-entity.model */ "./src/app/shared/domain/tos/tos-entity.model.ts");
/* harmony import */ var _tos_domain__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../tos-domain */ "./src/app/shared/domain/tos/tos-domain.ts");
/* harmony import */ var _tos_domain_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../tos-domain.service */ "./src/app/shared/domain/tos/tos-domain.service.ts");
/* harmony import */ var _tos_build__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../tos-build */ "./src/app/shared/domain/tos/tos-build.ts");





var TOSJob = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](TOSJob, _super);
    function TOSJob(json) {
        var _this = _super.call(this, _tos_domain__WEBPACK_IMPORTED_MODULE_2__["TOSDataSet"].JOBS, json) || this;
        _this.json = json;
        return _this;
    }
    Object.defineProperty(TOSJob.prototype, "CircleAvailable", {
        get: function () { return Array.from(Array(this.CircleMax).keys(), function (n) { return n + 1; }); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSJob.prototype, "CircleMax", {
        get: function () { return this.$lazyPropertyNumber('CircleMax'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSJob.prototype, "IconAnimations", {
        get: function () {
            return this.Rank > _tos_build__WEBPACK_IMPORTED_MODULE_4__["RANK_LIMIT"]
                ? null
                : [
                    'assets/images/classes/' + this.$ID_NAME + '_f.gif',
                    'assets/images/classes/' + this.$ID_NAME + '_m.gif',
                ];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSJob.prototype, "IsHidden", {
        get: function () { return this.$lazyPropertyBoolean('IsHidden'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSJob.prototype, "IsSecret", {
        get: function () { return this.$lazyPropertyBoolean('IsSecret'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSJob.prototype, "IsStarter", {
        get: function () { return this.$lazyPropertyBoolean('IsStarter'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSJob.prototype, "JobDifficulty", {
        get: function () { return this.$lazyPropertyEnum('JobDifficulty', _tos_domain__WEBPACK_IMPORTED_MODULE_2__["TOSJobDifficulty"]); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSJob.prototype, "JobTree", {
        get: function () { return this.$lazyPropertyEnum('JobTree', _tos_domain__WEBPACK_IMPORTED_MODULE_2__["TOSJobTree"]); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSJob.prototype, "JobType", {
        get: function () { return this.$lazyPropertyJSONArray('JobType', function (value) { return Object.values(_tos_domain__WEBPACK_IMPORTED_MODULE_2__["TOSJobType"])[value]; }); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSJob.prototype, "Rank", {
        get: function () { return this.$lazyPropertyNumber('Rank'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSJob.prototype, "Stat_CON", {
        get: function () { return this.$lazyPropertyNumber('Stat_CON'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSJob.prototype, "Stat_DEX", {
        get: function () { return this.$lazyPropertyNumber('Stat_DEX'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSJob.prototype, "Stat_INT", {
        get: function () { return this.$lazyPropertyNumber('Stat_INT'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSJob.prototype, "Stat_SPR", {
        get: function () { return this.$lazyPropertyNumber('Stat_SPR'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSJob.prototype, "Stat_STR", {
        get: function () { return this.$lazyPropertyNumber('Stat_STR'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSJob.prototype, "StatBase_CON", {
        get: function () { return this.$lazyPropertyNumber('StatBase_CON'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSJob.prototype, "StatBase_DEX", {
        get: function () { return this.$lazyPropertyNumber('StatBase_DEX'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSJob.prototype, "StatBase_INT", {
        get: function () { return this.$lazyPropertyNumber('StatBase_INT'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSJob.prototype, "StatBase_SPR", {
        get: function () { return this.$lazyPropertyNumber('StatBase_SPR'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSJob.prototype, "StatBase_STR", {
        get: function () { return this.$lazyPropertyNumber('StatBase_STR'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSJob.prototype, "Link_Attributes", {
        get: function () { return this.$lazyPropertyLink('Link_Attributes', function (value) { return _tos_domain_service__WEBPACK_IMPORTED_MODULE_3__["TOSDomainService"].attributesById(value); }); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSJob.prototype, "Link_Skills", {
        get: function () { return this.$lazyPropertyLink('Link_Skills', function (value) { return _tos_domain_service__WEBPACK_IMPORTED_MODULE_3__["TOSDomainService"].skillsById(value); }); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSJob.prototype, "Link_Skills$ID", {
        get: function () { return this.$lazyPropertyLinkOriginal('Link_Skills'); },
        enumerable: true,
        configurable: true
    });
    return TOSJob;
}(_tos_entity_model__WEBPACK_IMPORTED_MODULE_1__["TOSEntity"]));



/***/ }),

/***/ "./src/app/shared/domain/tos/job/tos-job.resolver.ts":
/*!***********************************************************!*\
  !*** ./src/app/shared/domain/tos/job/tos-job.resolver.ts ***!
  \***********************************************************/
/*! exports provided: TOSJobResolver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSJobResolver", function() { return TOSJobResolver; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _service_CRUD_resolver__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../service/CRUD.resolver */ "./src/app/shared/service/CRUD.resolver.ts");
/* harmony import */ var _tos_domain__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../tos-domain */ "./src/app/shared/domain/tos/tos-domain.ts");




var TOSJobResolver = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](TOSJobResolver, _super);
    function TOSJobResolver() {
        return _super.call(this, _tos_domain__WEBPACK_IMPORTED_MODULE_3__["TOSDataSet"].JOBS) || this;
    }
    TOSJobResolver = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], TOSJobResolver);
    return TOSJobResolver;
}(_service_CRUD_resolver__WEBPACK_IMPORTED_MODULE_2__["CRUDResolver"]));



/***/ }),

/***/ "./src/app/shared/domain/tos/map/tos-map.model.ts":
/*!********************************************************!*\
  !*** ./src/app/shared/domain/tos/map/tos-map.model.ts ***!
  \********************************************************/
/*! exports provided: TOSMap, TOSMapLinkItem, TOSMapLinkNPC */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSMap", function() { return TOSMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSMapLinkItem", function() { return TOSMapLinkItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSMapLinkNPC", function() { return TOSMapLinkNPC; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _tos_entity_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../tos-entity.model */ "./src/app/shared/domain/tos/tos-entity.model.ts");
/* harmony import */ var _tos_domain__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../tos-domain */ "./src/app/shared/domain/tos/tos-domain.ts");
/* harmony import */ var _tos_domain_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../tos-domain.service */ "./src/app/shared/domain/tos/tos-domain.service.ts");
/* harmony import */ var rxjs_internal_compatibility__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/internal-compatibility */ "./node_modules/rxjs/_esm5/internal-compatibility/index.js");
/* harmony import */ var _service_tos_url_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../service/tos-url.service */ "./src/app/shared/service/tos-url.service.ts");






var TOSMap = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](TOSMap, _super);
    function TOSMap(json) {
        return _super.call(this, _tos_domain__WEBPACK_IMPORTED_MODULE_2__["TOSDataSet"].MAPS, json) || this;
    }
    Object.defineProperty(TOSMap.prototype, "HasChallengeMode", {
        get: function () { return this.$lazyPropertyBoolean('HasChallengeMode'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSMap.prototype, "HasWarp", {
        get: function () { return this.$lazyPropertyBoolean('HasWarp'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSMap.prototype, "Layout", {
        get: function () { return _service_tos_url_service__WEBPACK_IMPORTED_MODULE_5__["TOSUrlService"].Asset('assets/images/maps/' + this.$ID_NAME.toLowerCase() + '.png'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSMap.prototype, "Level", {
        get: function () { return this.$lazyPropertyNumber('Level'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSMap.prototype, "Prop_EliteMonsterCapacity", {
        get: function () { return this.$lazyPropertyNumber('Prop_EliteMonsterCapacity'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSMap.prototype, "Prop_MaxHateCount", {
        get: function () { return this.$lazyPropertyNumber('Prop_MaxHateCount'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSMap.prototype, "Prop_RewardEXPBM", {
        get: function () { return this.$lazyPropertyNumber('Prop_RewardEXPBM'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSMap.prototype, "Stars", {
        get: function () { return this.$lazyPropertyNumber('Stars'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSMap.prototype, "Type", {
        get: function () { return this.$lazyPropertyEnum('Type', _tos_domain__WEBPACK_IMPORTED_MODULE_2__["TOSMapType"]); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSMap.prototype, "Warp", {
        get: function () { return this.$lazyPropertyNumber('Warp'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSMap.prototype, "WorldMap", {
        get: function () { return this.$lazyPropertyJSONArray('WorldMap', function (value) { return +value; }); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSMap.prototype, "Link_Collections", {
        get: function () { return this.$lazyPropertyLink('Link_Collections', function (value) { return _tos_domain_service__WEBPACK_IMPORTED_MODULE_3__["TOSDomainService"].collectionsById(value); }); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSMap.prototype, "Link_Items", {
        get: function () {
            var _this = this;
            return this.$lazyPropertyLink('Link_Items', function (value) { return _this.TOSMapLinkItem(value); });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSMap.prototype, "Link_Items_Exploration", {
        get: function () {
            var _this = this;
            return this.$lazyPropertyLink('Link_Items_Exploration', function (value) { return _this.TOSMapLinkItem(value); });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSMap.prototype, "Link_Maps", {
        get: function () { return this.$lazyPropertyLink('Link_Maps', function (value) { return _tos_domain_service__WEBPACK_IMPORTED_MODULE_3__["TOSDomainService"].mapsById(value); }); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSMap.prototype, "Link_Maps_Floors", {
        get: function () { return this.$lazyPropertyLink('Link_Maps_Floors', function (value) { return _tos_domain_service__WEBPACK_IMPORTED_MODULE_3__["TOSDomainService"].mapsById(value); }); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSMap.prototype, "Link_NPCs", {
        get: function () {
            var _this = this;
            return this.$lazyPropertyLink('Link_NPCs', function (value) { return _this.TOSMapLinkNPC(value); });
        },
        enumerable: true,
        configurable: true
    });
    TOSMap.prototype.TOSMapLinkItem = function (value) {
        var _this = this;
        return Object(rxjs_internal_compatibility__WEBPACK_IMPORTED_MODULE_4__["fromPromise"])((function () { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
            var object, _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        object = new TOSMapLinkItem(value);
                        _a = object;
                        return [4 /*yield*/, (object.Item && _tos_domain_service__WEBPACK_IMPORTED_MODULE_3__["TOSDomainService"].itemsByIdLink(+object.Item).toPromise())];
                    case 1:
                        _a.Item = _b.sent();
                        return [2 /*return*/, object];
                }
            });
        }); })());
    };
    TOSMap.prototype.TOSMapLinkNPC = function (value) {
        var _this = this;
        return Object(rxjs_internal_compatibility__WEBPACK_IMPORTED_MODULE_4__["fromPromise"])((function () { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
            var object, _a, _b;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_c) {
                switch (_c.label) {
                    case 0:
                        object = new TOSMapLinkNPC(value);
                        _a = object;
                        return [4 /*yield*/, (object.Item && _tos_domain_service__WEBPACK_IMPORTED_MODULE_3__["TOSDomainService"].itemsByIdLink(+object.Item).toPromise())];
                    case 1:
                        _a.Item = _c.sent();
                        _b = object;
                        return [4 /*yield*/, (object.NPC && _tos_domain_service__WEBPACK_IMPORTED_MODULE_3__["TOSDomainService"].npcsByIdLink(+object.NPC).toPromise())];
                    case 2:
                        _b.NPC = _c.sent();
                        return [2 /*return*/, object];
                }
            });
        }); })());
    };
    return TOSMap;
}(_tos_entity_model__WEBPACK_IMPORTED_MODULE_1__["TOSEntity"]));

var TOSMapLinkItem = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](TOSMapLinkItem, _super);
    function TOSMapLinkItem(json) {
        var _this = _super.call(this) || this;
        _this.Chance = +json.Chance;
        _this.Item = json.Item;
        _this.Quantity_MAX = +json.Quantity_MAX;
        _this.Quantity_MIN = +json.Quantity_MIN;
        return _this;
    }
    Object.defineProperty(TOSMapLinkItem.prototype, "Link", {
        get: function () { return this.Item; },
        enumerable: true,
        configurable: true
    });
    return TOSMapLinkItem;
}(_tos_entity_model__WEBPACK_IMPORTED_MODULE_1__["TOSEntityLink"]));

var TOSMapLinkNPC = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](TOSMapLinkNPC, _super);
    function TOSMapLinkNPC(json) {
        var _this = _super.call(this) || this;
        _this.Item = json.Item;
        _this.NPC = json.NPC;
        _this.Population = +json.Population;
        _this.Positions = json.Positions;
        _this.TimeRespawn = +json.TimeRespawn;
        return _this;
    }
    Object.defineProperty(TOSMapLinkNPC.prototype, "Link", {
        get: function () { return this.Item || this.NPC; },
        enumerable: true,
        configurable: true
    });
    return TOSMapLinkNPC;
}(_tos_entity_model__WEBPACK_IMPORTED_MODULE_1__["TOSEntityLink"]));



/***/ }),

/***/ "./src/app/shared/domain/tos/map/tos-map.resolver.ts":
/*!***********************************************************!*\
  !*** ./src/app/shared/domain/tos/map/tos-map.resolver.ts ***!
  \***********************************************************/
/*! exports provided: TOSMapResolver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSMapResolver", function() { return TOSMapResolver; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _service_CRUD_resolver__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../service/CRUD.resolver */ "./src/app/shared/service/CRUD.resolver.ts");
/* harmony import */ var _tos_domain__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../tos-domain */ "./src/app/shared/domain/tos/tos-domain.ts");




var TOSMapResolver = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](TOSMapResolver, _super);
    function TOSMapResolver() {
        return _super.call(this, _tos_domain__WEBPACK_IMPORTED_MODULE_3__["TOSDataSet"].MAPS) || this;
    }
    TOSMapResolver = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], TOSMapResolver);
    return TOSMapResolver;
}(_service_CRUD_resolver__WEBPACK_IMPORTED_MODULE_2__["CRUDResolver"]));



/***/ }),

/***/ "./src/app/shared/domain/tos/monster/tos-monster.model.ts":
/*!****************************************************************!*\
  !*** ./src/app/shared/domain/tos/monster/tos-monster.model.ts ***!
  \****************************************************************/
/*! exports provided: TOSMonster, TOSMonsterLinkItem, TOSMonsterLinkMap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSMonster", function() { return TOSMonster; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSMonsterLinkItem", function() { return TOSMonsterLinkItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSMonsterLinkMap", function() { return TOSMonsterLinkMap; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _tos_domain__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../tos-domain */ "./src/app/shared/domain/tos/tos-domain.ts");
/* harmony import */ var _tos_domain_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../tos-domain.service */ "./src/app/shared/domain/tos/tos-domain.service.ts");
/* harmony import */ var rxjs_internal_compatibility__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/internal-compatibility */ "./node_modules/rxjs/_esm5/internal-compatibility/index.js");
/* harmony import */ var _tos_entity_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../tos-entity.model */ "./src/app/shared/domain/tos/tos-entity.model.ts");





var TOSMonster = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](TOSMonster, _super);
    function TOSMonster(dataset, json) {
        var _this = _super.call(this, _tos_domain__WEBPACK_IMPORTED_MODULE_1__["TOSDataSet"].MONSTERS, json) || this;
        _this.$comparators['Rank'] = _tos_domain__WEBPACK_IMPORTED_MODULE_1__["TOSMonsterRankService"].comparator;
        _this.$comparators['Size'] = _tos_domain__WEBPACK_IMPORTED_MODULE_1__["TOSMonsterSizeService"].comparator;
        _this.Selected = _this.Type != _tos_domain__WEBPACK_IMPORTED_MODULE_1__["TOSMonsterType"].MONSTER;
        return _this;
    }
    Object.defineProperty(TOSMonster.prototype, "Armor", {
        get: function () { return this.$lazyPropertyEnum('Armor', _tos_domain__WEBPACK_IMPORTED_MODULE_1__["TOSEquipmentMaterial"]); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSMonster.prototype, "Element", {
        get: function () { return this.$lazyPropertyEnum('Element', _tos_domain__WEBPACK_IMPORTED_MODULE_1__["TOSElement"]); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSMonster.prototype, "EXP", {
        get: function () { return this.$lazyPropertyNumber('EXP'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSMonster.prototype, "EXPClass", {
        get: function () { return this.$lazyPropertyNumber('EXPClass'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSMonster.prototype, "Level", {
        get: function () { return this.$lazyPropertyNumber('Level'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSMonster.prototype, "Race", {
        get: function () { return this.$lazyPropertyEnum('Race', _tos_domain__WEBPACK_IMPORTED_MODULE_1__["TOSMonsterRace"]); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSMonster.prototype, "Rank", {
        get: function () { return this.$lazyPropertyEnum('Rank', _tos_domain__WEBPACK_IMPORTED_MODULE_1__["TOSMonsterRank"]); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSMonster.prototype, "Size", {
        get: function () { return this.$lazyPropertyEnum('Size', _tos_domain__WEBPACK_IMPORTED_MODULE_1__["TOSMonsterSize"]); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSMonster.prototype, "Stat_CON", {
        get: function () { return this.$lazyPropertyNumber('Stat_CON'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSMonster.prototype, "Stat_DEX", {
        get: function () { return this.$lazyPropertyNumber('Stat_DEX'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSMonster.prototype, "Stat_INT", {
        get: function () { return this.$lazyPropertyNumber('Stat_INT'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSMonster.prototype, "Stat_SPR", {
        get: function () { return this.$lazyPropertyNumber('Stat_SPR'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSMonster.prototype, "Stat_STR", {
        get: function () { return this.$lazyPropertyNumber('Stat_STR'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSMonster.prototype, "Stat_HP", {
        get: function () { return this.$lazyPropertyNumber('Stat_HP'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSMonster.prototype, "Stat_SP", {
        get: function () { return this.$lazyPropertyNumber('Stat_SP'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSMonster.prototype, "Stat_ATTACK_MAGICAL_MAX", {
        get: function () { return this.$lazyPropertyNumber('Stat_ATTACK_MAGICAL_MAX'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSMonster.prototype, "Stat_ATTACK_MAGICAL_MIN", {
        get: function () { return this.$lazyPropertyNumber('Stat_ATTACK_MAGICAL_MIN'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSMonster.prototype, "Stat_ATTACK_PHYSICAL_MAX", {
        get: function () { return this.$lazyPropertyNumber('Stat_ATTACK_PHYSICAL_MAX'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSMonster.prototype, "Stat_ATTACK_PHYSICAL_MIN", {
        get: function () { return this.$lazyPropertyNumber('Stat_ATTACK_PHYSICAL_MIN'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSMonster.prototype, "Stat_DEFENSE_MAGICAL", {
        get: function () { return this.$lazyPropertyNumber('Stat_DEFENSE_MAGICAL'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSMonster.prototype, "Stat_DEFENSE_PHYSICAL", {
        get: function () { return this.$lazyPropertyNumber('Stat_DEFENSE_PHYSICAL'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSMonster.prototype, "Stat_Accuracy", {
        get: function () { return this.$lazyPropertyNumber('Stat_Accuracy'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSMonster.prototype, "Stat_Evasion", {
        get: function () { return this.$lazyPropertyNumber('Stat_Evasion'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSMonster.prototype, "Stat_CriticalDamage", {
        get: function () { return this.$lazyPropertyNumber('Stat_CriticalDamage'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSMonster.prototype, "Stat_CriticalDefense", {
        get: function () { return this.$lazyPropertyNumber('Stat_CriticalDefense'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSMonster.prototype, "Stat_CriticalRate", {
        get: function () { return this.$lazyPropertyNumber('Stat_CriticalRate'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSMonster.prototype, "Stat_BlockPenetration", {
        get: function () { return this.$lazyPropertyNumber('Stat_BlockPenetration'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSMonster.prototype, "Stat_BlockRate", {
        get: function () { return this.$lazyPropertyNumber('Stat_BlockRate'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSMonster.prototype, "Type", {
        get: function () { return this.$lazyPropertyEnum('Type', _tos_domain__WEBPACK_IMPORTED_MODULE_1__["TOSMonsterType"]); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSMonster.prototype, "Link_Items", {
        get: function () {
            var _this = this;
            return this.$lazyPropertyLink('Link_Items', function (value) { return _this.TOSMonsterLinkItem(value); });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSMonster.prototype, "Link_Maps", {
        get: function () {
            var _this = this;
            return this.$lazyPropertyLink('Link_Maps', function (value) { return _this.TOSMonsterLinkMap(value); });
        },
        enumerable: true,
        configurable: true
    });
    TOSMonster.prototype.TOSMonsterLinkItem = function (value) {
        var _this = this;
        return Object(rxjs_internal_compatibility__WEBPACK_IMPORTED_MODULE_3__["fromPromise"])((function () { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
            var object, _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        object = new TOSMonsterLinkItem(value);
                        _a = object;
                        return [4 /*yield*/, _tos_domain_service__WEBPACK_IMPORTED_MODULE_2__["TOSDomainService"].itemsByIdLink(+object.Item).toPromise()];
                    case 1:
                        _a.Item = _b.sent();
                        return [2 /*return*/, object];
                }
            });
        }); })());
    };
    TOSMonster.prototype.TOSMonsterLinkMap = function (value) {
        var _this = this;
        return Object(rxjs_internal_compatibility__WEBPACK_IMPORTED_MODULE_3__["fromPromise"])((function () { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
            var object, _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        object = new TOSMonsterLinkMap(value);
                        _a = object;
                        return [4 /*yield*/, _tos_domain_service__WEBPACK_IMPORTED_MODULE_2__["TOSDomainService"].mapsById(+object.Map).toPromise()];
                    case 1:
                        _a.Map = _b.sent();
                        return [2 /*return*/, object];
                }
            });
        }); })());
    };
    return TOSMonster;
}(_tos_entity_model__WEBPACK_IMPORTED_MODULE_4__["TOSEntity"]));

var TOSMonsterLinkItem = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](TOSMonsterLinkItem, _super);
    function TOSMonsterLinkItem(json) {
        var _this = _super.call(this) || this;
        _this.Chance = +json.Chance;
        _this.Item = json.Item;
        _this.Quantity_MAX = +json.Quantity_MAX;
        _this.Quantity_MIN = +json.Quantity_MIN;
        return _this;
    }
    Object.defineProperty(TOSMonsterLinkItem.prototype, "Link", {
        get: function () { return this.Item; },
        enumerable: true,
        configurable: true
    });
    return TOSMonsterLinkItem;
}(_tos_entity_model__WEBPACK_IMPORTED_MODULE_4__["TOSEntityLink"]));

var TOSMonsterLinkMap = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](TOSMonsterLinkMap, _super);
    function TOSMonsterLinkMap(json) {
        var _this = _super.call(this) || this;
        _this.Map = json.Map;
        _this.Population = +json.Population;
        _this.TimeRespawn = +json.TimeRespawn;
        return _this;
    }
    Object.defineProperty(TOSMonsterLinkMap.prototype, "Link", {
        get: function () { return this.Map; },
        enumerable: true,
        configurable: true
    });
    return TOSMonsterLinkMap;
}(_tos_entity_model__WEBPACK_IMPORTED_MODULE_4__["TOSEntityLink"]));



/***/ }),

/***/ "./src/app/shared/domain/tos/monster/tos-monster.resolver.ts":
/*!*******************************************************************!*\
  !*** ./src/app/shared/domain/tos/monster/tos-monster.resolver.ts ***!
  \*******************************************************************/
/*! exports provided: TOSMonsterResolver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSMonsterResolver", function() { return TOSMonsterResolver; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _service_CRUD_resolver__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../service/CRUD.resolver */ "./src/app/shared/service/CRUD.resolver.ts");
/* harmony import */ var _tos_domain__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../tos-domain */ "./src/app/shared/domain/tos/tos-domain.ts");




var TOSMonsterResolver = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](TOSMonsterResolver, _super);
    function TOSMonsterResolver() {
        return _super.call(this, _tos_domain__WEBPACK_IMPORTED_MODULE_3__["TOSDataSet"].MONSTERS) || this;
    }
    TOSMonsterResolver = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], TOSMonsterResolver);
    return TOSMonsterResolver;
}(_service_CRUD_resolver__WEBPACK_IMPORTED_MODULE_2__["CRUDResolver"]));



/***/ }),

/***/ "./src/app/shared/domain/tos/monster/tos-npc.model.ts":
/*!************************************************************!*\
  !*** ./src/app/shared/domain/tos/monster/tos-npc.model.ts ***!
  \************************************************************/
/*! exports provided: TOSNPC */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSNPC", function() { return TOSNPC; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _tos_domain__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../tos-domain */ "./src/app/shared/domain/tos/tos-domain.ts");
/* harmony import */ var _tos_monster_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tos-monster.model */ "./src/app/shared/domain/tos/monster/tos-monster.model.ts");



var TOSNPC = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](TOSNPC, _super);
    function TOSNPC(json) {
        return _super.call(this, _tos_domain__WEBPACK_IMPORTED_MODULE_1__["TOSDataSet"].NPCS, json) || this;
    }
    Object.defineProperty(TOSNPC.prototype, "Url", {
        get: function () { return null; },
        enumerable: true,
        configurable: true
    });
    return TOSNPC;
}(_tos_monster_model__WEBPACK_IMPORTED_MODULE_2__["TOSMonster"]));



/***/ }),

/***/ "./src/app/shared/domain/tos/monster/tos-npc.resolver.ts":
/*!***************************************************************!*\
  !*** ./src/app/shared/domain/tos/monster/tos-npc.resolver.ts ***!
  \***************************************************************/
/*! exports provided: TOSNPCResolver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSNPCResolver", function() { return TOSNPCResolver; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _tos_domain__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../tos-domain */ "./src/app/shared/domain/tos/tos-domain.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _service_CRUD_resolver__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../service/CRUD.resolver */ "./src/app/shared/service/CRUD.resolver.ts");




var TOSNPCResolver = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](TOSNPCResolver, _super);
    function TOSNPCResolver() {
        return _super.call(this, _tos_domain__WEBPACK_IMPORTED_MODULE_1__["TOSDataSet"].NPCS) || this;
    }
    TOSNPCResolver = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], TOSNPCResolver);
    return TOSNPCResolver;
}(_service_CRUD_resolver__WEBPACK_IMPORTED_MODULE_3__["CRUDResolver"]));



/***/ }),

/***/ "./src/app/shared/domain/tos/skill/tos-skill.model.ts":
/*!************************************************************!*\
  !*** ./src/app/shared/domain/tos/skill/tos-skill.model.ts ***!
  \************************************************************/
/*! exports provided: TOSSkill, TOSSkillRequiredStance */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSSkill", function() { return TOSSkill; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSSkillRequiredStance", function() { return TOSSkillRequiredStance; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _tos_entity_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../tos-entity.model */ "./src/app/shared/domain/tos/tos-entity.model.ts");
/* harmony import */ var _tos_domain__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../tos-domain */ "./src/app/shared/domain/tos/tos-domain.ts");
/* harmony import */ var _tos_domain_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../tos-domain.service */ "./src/app/shared/domain/tos/tos-domain.service.ts");
/* harmony import */ var _service_lua_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../service/lua.service */ "./src/app/shared/service/lua.service.ts");
/* harmony import */ var rxjs_internal_compatibility__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/internal-compatibility */ "./node_modules/rxjs/_esm5/internal-compatibility/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");







var TOSSkill = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](TOSSkill, _super);
    function TOSSkill(json) {
        return _super.call(this, _tos_domain__WEBPACK_IMPORTED_MODULE_2__["TOSDataSet"].SKILLS, json) || this;
    }
    Object.defineProperty(TOSSkill.prototype, "Description", {
        get: function () {
            var _this = this;
            return this.$lazyPropertyStringMultiline('Description', function (value) { return _this.tooltipToHTML(value); });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSSkill.prototype, "CoolDown", {
        get: function () { return this.$lazyPropertyJSONArray('CoolDown'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSSkill.prototype, "Effect", {
        get: function () {
            var _this = this;
            return this.$lazyPropertyStringMultiline('Effect', function (value) { return _this.tooltipToHTML(value); });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSSkill.prototype, "Effect_CaptionRatio", {
        get: function () { return this.$lazyPropertyJSONArray('Effect_CaptionRatio'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSSkill.prototype, "Effect_CaptionRatio2", {
        get: function () { return this.$lazyPropertyJSONArray('Effect_CaptionRatio2'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSSkill.prototype, "Effect_CaptionRatio3", {
        get: function () { return this.$lazyPropertyJSONArray('Effect_CaptionRatio3'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSSkill.prototype, "Effect_CaptionTime", {
        get: function () { return this.$lazyPropertyJSONArray('Effect_CaptionTime'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSSkill.prototype, "Effect_SkillAtkAdd", {
        get: function () { return this.$lazyPropertyJSONArray('Effect_SkillAtkAdd'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSSkill.prototype, "Effect_SkillFactor", {
        get: function () { return this.$lazyPropertyJSONArray('Effect_SkillFactor'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSSkill.prototype, "Effect_SkillSR", {
        get: function () { return this.$lazyPropertyJSONArray('Effect_SkillSR'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSSkill.prototype, "Effect_SpendItemCount", {
        get: function () { return this.$lazyPropertyJSONArray('Effect_SpendItemCount'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSSkill.prototype, "Effect_SpendPoison", {
        get: function () { return this.$lazyPropertyJSONArray('Effect_SpendPoison'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSSkill.prototype, "Effect_SpendSP", {
        get: function () { return this.$lazyPropertyJSONArray('Effect_SpendSP'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSSkill.prototype, "Element", {
        get: function () { return this.$lazyPropertyEnum('Element', _tos_domain__WEBPACK_IMPORTED_MODULE_2__["TOSElement"]); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSSkill.prototype, "IsEnchanter", {
        get: function () { return this.$lazyPropertyBoolean('IsEnchanter'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSSkill.prototype, "IsPardoner", {
        get: function () { return this.$lazyPropertyBoolean('IsPardoner'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSSkill.prototype, "IsRunecaster", {
        get: function () { return this.$lazyPropertyBoolean('IsRunecaster'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSSkill.prototype, "IsShinobi", {
        get: function () { return this.$lazyPropertyBoolean('IsShinobi'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSSkill.prototype, "Link_Attributes", {
        get: function () { return this.$lazyPropertyLink('Link_Attributes', function (value) { return _tos_domain_service__WEBPACK_IMPORTED_MODULE_3__["TOSDomainService"].attributesById(value); }); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSSkill.prototype, "Link_Gem", {
        get: function () { return this.$lazyPropertyLink('Link_Gem', function (value) { return _tos_domain_service__WEBPACK_IMPORTED_MODULE_3__["TOSDomainService"].gemsById(value); }); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSSkill.prototype, "Link_Job", {
        get: function () { return this.$lazyPropertyLink('Link_Job', function (value) { return _tos_domain_service__WEBPACK_IMPORTED_MODULE_3__["TOSDomainService"].jobsById(value); }); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSSkill.prototype, "Link_Job$ID", {
        get: function () { return this.$lazyPropertyLinkOriginal('Link_Job'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSSkill.prototype, "OverHeat", {
        get: function () { return this.$lazyPropertyNumber('OverHeat'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSSkill.prototype, "Prop_BasicCoolDown", {
        get: function () { return this.$lazyPropertyNumber('Prop_BasicCoolDown'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSSkill.prototype, "Prop_BasicPoison", {
        get: function () { return this.$lazyPropertyNumber('Prop_BasicPoison'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSSkill.prototype, "Prop_BasicSP", {
        get: function () { return this.$lazyPropertyNumber('Prop_BasicSP'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSSkill.prototype, "Prop_LevelPerGrade", {
        get: function () { return this.$lazyPropertyNumber('Prop_LevelPerGrade'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSSkill.prototype, "Prop_LvUpSpendPoison", {
        get: function () { return this.$lazyPropertyNumber('Prop_LvUpSpendPoison'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSSkill.prototype, "Prop_LvUpSpendSp", {
        get: function () { return this.$lazyPropertyNumber('Prop_LvUpSpendSp'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSSkill.prototype, "Prop_MaxLevel", {
        get: function () { return this.$lazyPropertyNumber('Prop_MaxLevel'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSSkill.prototype, "Prop_SklAtkAdd", {
        get: function () { return this.$lazyPropertyNumber('Prop_SklAtkAdd'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSSkill.prototype, "Prop_SklAtkAddByLevel", {
        get: function () { return this.$lazyPropertyNumber('Prop_SklAtkAddByLevel'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSSkill.prototype, "Prop_SklFactor", {
        get: function () { return this.$lazyPropertyNumber('Prop_SklFactor'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSSkill.prototype, "Prop_SklFactorByLevel", {
        get: function () { return this.$lazyPropertyNumber('Prop_SklFactorByLevel'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSSkill.prototype, "Prop_SklSR", {
        get: function () { return this.$lazyPropertyNumber('Prop_SklSR'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSSkill.prototype, "Prop_SpendItemBaseCount", {
        get: function () { return this.$lazyPropertyNumber('Prop_SpendItemBaseCount'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSSkill.prototype, "Prop_UnlockGrade", {
        get: function () { return this.$lazyPropertyNumber('Prop_UnlockGrade'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSSkill.prototype, "Prop_UnlockClassLevel", {
        get: function () { return this.$lazyPropertyNumber('Prop_UnlockClassLevel'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSSkill.prototype, "RequiredStance", {
        get: function () { return this.$lazyPropertyJSONArray('RequiredStance', function (value) { return new TOSSkillRequiredStance(value); }); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSSkill.prototype, "RequiredStanceCompanion", {
        get: function () { return this.$lazyPropertyEnum('RequiredStanceCompanion', _tos_domain__WEBPACK_IMPORTED_MODULE_2__["TOSSkillRequiredStanceCompanion"]); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSSkill.prototype, "RequiredSubWeapon", {
        get: function () { return this.$lazyPropertyBoolean('RequiredSubWeapon'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSSkill.prototype, "SP", {
        get: function () { return this.$lazyPropertyJSONArray('SP'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSSkill.prototype, "TypeAttack", {
        get: function () { return this.$lazyPropertyEnum('TypeAttack', _tos_domain__WEBPACK_IMPORTED_MODULE_2__["TOSAttackType"]); },
        enumerable: true,
        configurable: true
    });
    TOSSkill.prototype.BuildCoolDown = function (build) {
        return this
            .effectToEval('CoolDown', build)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["map"])(function (value) { return value.value; }));
    };
    TOSSkill.prototype.BuildSP = function (build) {
        return this
            .effectToEval('SP', build)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["map"])(function (value) { return value.value; }));
    };
    TOSSkill.prototype.EffectDescription = function (build, showFactors) {
        var _this = this;
        return Object(rxjs_internal_compatibility__WEBPACK_IMPORTED_MODULE_5__["fromPromise"])((function () { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
            var dependencies, effect, level;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dependencies = [];
                        effect = this.Effect;
                        return [4 /*yield*/, build.skillLevel(this)];
                    case 1:
                        level = _a.sent();
                        // Match effect properties (e.g. #{SkillFactor}#%{nl}AoE Attack Ratio: #{SkillSR}
                        return [4 /*yield*/, Promise.all(this.EffectProps.map(function (match) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                                var prop, result, e_1, _i, _a, dependency;
                                return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            prop = match[1];
                                            result = null;
                                            _b.label = 1;
                                        case 1:
                                            _b.trys.push([1, 3, , 4]);
                                            return [4 /*yield*/, this.effectToEval(prop, build).toPromise()];
                                        case 2:
                                            result = _b.sent();
                                            return [3 /*break*/, 4];
                                        case 3:
                                            e_1 = _b.sent();
                                            console.error('Failed to calculate prop', prop, 'for skill', this, e_1);
                                            return [3 /*break*/, 4];
                                        case 4:
                                            if (result != null)
                                                for (_i = 0, _a = result.dependencies; _i < _a.length; _i++) {
                                                    dependency = _a[_i];
                                                    if (dependencies.indexOf(dependency) == -1)
                                                        dependencies.push(dependency);
                                                }
                                            if (result == null || showFactors && level == 0) {
                                                effect = effect.replace(match[0], '<b>[' + prop + ']</b>');
                                            }
                                            else {
                                                effect = effect.replace(match[0], (result != null ? result.value : 0) + (result.dependencies.length ? '*' : ''));
                                            }
                                            return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 2:
                        // Match effect properties (e.g. #{SkillFactor}#%{nl}AoE Attack Ratio: #{SkillSR}
                        _a.sent();
                        // Add dependencies (if available)
                        if (dependencies) {
                            effect = effect + '\n';
                            dependencies.forEach(function (value) { return effect = effect + "\n* Depends on Character's " + value; });
                        }
                        return [2 /*return*/, effect.replace(/{nl}/g, '\n')];
                }
            });
        }); })());
    };
    TOSSkill.prototype.EffectFormula = function (prop, build) {
        return this.effectToHuman(prop, build);
    };
    Object.defineProperty(TOSSkill.prototype, "EffectProps", {
        get: function () {
            var match;
            var regexEffect = /(?:#{(\w+)}#)+/g;
            var result = [];
            while (match = regexEffect.exec(this.Effect))
                result.push(match);
            return result;
        },
        enumerable: true,
        configurable: true
    });
    TOSSkill.prototype.effectContext = function (prop, build, human) {
        var _this = this;
        return Object(rxjs_internal_compatibility__WEBPACK_IMPORTED_MODULE_5__["fromPromise"])((function () { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
            var player, skill, _a, _b;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_c) {
                switch (_c.label) {
                    case 0:
                        player = !human && {
                            CON: build.Stats.CON,
                            DEX: build.Stats.DEX,
                            INT: build.Stats.INT,
                            MNA: build.Stats.SPR,
                            STR: build.Stats.STR,
                        };
                        skill = {
                            'BasicCoolDown': this.Prop_BasicCoolDown,
                            'BasicPoison': this.Prop_BasicPoison,
                            'BasicSP': this.Prop_BasicSP,
                            'ClassName': '"' + this.$ID_NAME + '"',
                            'Level': Math.max(1, build.skillLevel(this)),
                            'LvUpSpendPoison': this.Prop_LvUpSpendPoison,
                            'LvUpSpendSp': this.Prop_LvUpSpendSp,
                            'SklAtkAdd': this.Prop_SklAtkAdd,
                            'SklAtkAddByLevel': this.Prop_SklAtkAddByLevel,
                            'SklFactor': this.Prop_SklFactor,
                            'SklFactorByLevel': this.Prop_SklFactorByLevel,
                            'SklSR': this.Prop_SklSR,
                            'SpendItemBaseCount': this.Prop_SpendItemBaseCount,
                        };
                        if (!(prop != 'SkillFactor' && this.effectSource('SkillFactor'))) return [3 /*break*/, 2];
                        _a = skill;
                        _b = 'SkillFactor';
                        return [4 /*yield*/, this.effectToEval('SkillFactor', build).toPromise()];
                    case 1:
                        _a[_b] = (_c.sent()).value;
                        _c.label = 2;
                    case 2: return [2 /*return*/, { player: player, skill: skill }];
                }
            });
        }); })());
    };
    TOSSkill.prototype.effectToEval = function (prop, build) {
        var _this = this;
        return Object(rxjs_internal_compatibility__WEBPACK_IMPORTED_MODULE_5__["fromPromise"])((function () { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
            var source, context, result, value;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        source = this.effectSource(prop);
                        return [4 /*yield*/, this.effectContext(prop, build).toPromise()];
                    case 1:
                        context = _a.sent();
                        if (source == null)
                            return [2 /*return*/, null];
                        return [4 /*yield*/, _service_lua_service__WEBPACK_IMPORTED_MODULE_4__["LUAService"].parse(build, source, context).toPromise()];
                    case 2:
                        result = _a.sent();
                        value = eval(result.func.join('\n'));
                        value = parseFloat(value.toFixed(2)); // Remove trailing 0s
                        return [2 /*return*/, { dependencies: result.dependencies, value: value }];
                }
            });
        }); })());
    };
    TOSSkill.prototype.effectToHuman = function (prop, build) {
        var _this = this;
        return Object(rxjs_internal_compatibility__WEBPACK_IMPORTED_MODULE_5__["fromPromise"])((function () { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
            var source, context, _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        source = this.effectSource(prop);
                        return [4 /*yield*/, this.effectContext(prop, build, true).toPromise()];
                    case 1:
                        context = _b.sent();
                        if (!(source != null)) return [3 /*break*/, 3];
                        return [4 /*yield*/, _service_lua_service__WEBPACK_IMPORTED_MODULE_4__["LUAService"].human(build, source, context).toPromise()];
                    case 2:
                        _a = _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        _a = '';
                        _b.label = 4;
                    case 4: return [2 /*return*/, _a];
                }
            });
        }); })());
    };
    TOSSkill.prototype.effectSource = function (prop) {
        return this[prop] || this['Effect_' + prop] || null;
    };
    TOSSkill.prototype.tooltipToHTML = function (description) {
        if (description == null)
            return null;
        var regexColor = /{(#.+?)}(.+?){\/}/g;
        var match;
        while (match = regexColor.exec(description)) {
            if (match[2].indexOf('speedofatk')) // TODO: No longer available in Re:Build
                match[2] = match[2].replace('{img tooltip_speedofatk}', ' <img src="assets/images/skill_attackspeed.png" /> ');
            description = description.replace(match[0], match[2].indexOf('[') != -1
                ? "<span class=\"p-1 rounded text-white\" style=\"background: " + match[1] + "; line-height: 2\">" + match[2] + "</span>"
                : "<span class=\"font-weight-bold\" style=\"color: " + match[1] + ";\">" + match[2] + "</span>");
        }
        return description
            .replace(/{\/}|{ol}/g, '');
    };
    return TOSSkill;
}(_tos_entity_model__WEBPACK_IMPORTED_MODULE_1__["TOSEntity"]));

var TOSSkillRequiredStance = /** @class */ (function () {
    function TOSSkillRequiredStance(json) {
        this.Icon = 'assets/icons/' + json.Icon + '.png';
        this.Name = json.Name;
    }
    return TOSSkillRequiredStance;
}());



/***/ }),

/***/ "./src/app/shared/domain/tos/skill/tos-skill.resolver.ts":
/*!***************************************************************!*\
  !*** ./src/app/shared/domain/tos/skill/tos-skill.resolver.ts ***!
  \***************************************************************/
/*! exports provided: TOSSkillResolver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSSkillResolver", function() { return TOSSkillResolver; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _service_CRUD_resolver__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../service/CRUD.resolver */ "./src/app/shared/service/CRUD.resolver.ts");
/* harmony import */ var _tos_domain__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../tos-domain */ "./src/app/shared/domain/tos/tos-domain.ts");




var TOSSkillResolver = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](TOSSkillResolver, _super);
    function TOSSkillResolver() {
        return _super.call(this, _tos_domain__WEBPACK_IMPORTED_MODULE_3__["TOSDataSet"].SKILLS) || this;
    }
    TOSSkillResolver = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], TOSSkillResolver);
    return TOSSkillResolver;
}(_service_CRUD_resolver__WEBPACK_IMPORTED_MODULE_2__["CRUDResolver"]));



/***/ }),

/***/ "./src/app/shared/domain/tos/tos-build.ts":
/*!************************************************!*\
  !*** ./src/app/shared/domain/tos/tos-build.ts ***!
  \************************************************/
/*! exports provided: LEVEL_LIMIT, RANK_LIMIT, TOSDatabaseBuild, TOSSimulatorBuild */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LEVEL_LIMIT", function() { return LEVEL_LIMIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RANK_LIMIT", function() { return RANK_LIMIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSDatabaseBuild", function() { return TOSDatabaseBuild; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSSimulatorBuild", function() { return TOSSimulatorBuild; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _tos_domain_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./tos-domain.service */ "./src/app/shared/domain/tos/tos-domain.service.ts");
/* harmony import */ var _tos_region__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../tos-region */ "./src/app/shared/domain/tos-region.ts");
/* harmony import */ var rxjs_internal_compatibility__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/internal-compatibility */ "./node_modules/rxjs/_esm5/internal-compatibility/index.js");







var LEVEL_LIMIT = 420; // TODO: find a way to retrieve this value from the game files (sharedconst.ies / sharedconst_system.ies)
var RANK_LIMIT = 10; // TODO: find a way to retrieve this value from the game files
var SKILL_POINTS_PER_CIRCLE = 15; // TODO: find a way to retrieve this value from the game files
var TOSBuild = /** @class */ (function () {
    function TOSBuild() {
        this.jobs = [];
        this.jobCirclesById = {};
        this.jobChange = new rxjs__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"](null);
        this.skillChange = new rxjs__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"](null);
        this.skillLevelsById = {};
        this.skillPointsByJob = {};
        this.statsPoints = new rxjs__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"](0);
        this.statsBonus = { CON: 0, DEX: 0, INT: 0, SPR: 0, STR: 0 };
        this.buildResetStats();
    }
    Object.defineProperty(TOSBuild.prototype, "Job$", {
        get: function () { return this.jobChange.asObservable(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSBuild.prototype, "Jobs", {
        get: function () { return this.jobs; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSBuild.prototype, "JobTree", {
        get: function () { return this.jobTree; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSBuild.prototype, "Rank", {
        get: function () { return this.jobs.length; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSBuild.prototype, "Skill$", {
        get: function () { return this.skillChange.asObservable(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSBuild.prototype, "Stats", {
        get: function () {
            var statsBase = this.StatsBase;
            var statsBonus = this.StatsBonus;
            return {
                CON: statsBase.CON + statsBonus.CON,
                DEX: statsBase.DEX + statsBonus.DEX,
                INT: statsBase.INT + statsBonus.INT,
                SPR: statsBase.SPR + statsBonus.SPR,
                STR: statsBase.STR + statsBonus.STR,
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSBuild.prototype, "StatsBonus", {
        get: function () {
            return {
                CON: this.statsBonus.CON,
                DEX: this.statsBonus.DEX,
                INT: this.statsBonus.INT,
                SPR: this.statsBonus.SPR,
                STR: this.statsBonus.STR,
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSBuild.prototype, "StatsPoints$", {
        get: function () { return this.statsPoints.asObservable(); },
        enumerable: true,
        configurable: true
    });
    TOSBuild.prototype.jobAdd$ = function (job) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.Rank >= RANK_LIMIT)
                            throw new Error('Rank limit of ' + RANK_LIMIT + ' has been reached');
                        // If it's rank 1, set the JobTree and the default stats
                        if (this.Rank + 1 == 1)
                            this.jobTree = job.JobTree;
                        // Initialize job circle
                        this.jobs.push(job);
                        this.jobCirclesById[job.$ID] = this.jobCirclesById[job.$ID] || 0;
                        this.jobCirclesById[job.$ID]++;
                        this.jobChange.next(job);
                        // Initialize skill levels & points
                        this.buildResetSkillPoints(job);
                        return [4 /*yield*/, this.buildResetSkillLevels$(job)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    TOSBuild.prototype.jobCircle = function (job) {
        return this.jobCirclesById[job.$ID] || 0;
    };
    TOSBuild.prototype.jobRanks = function (job) {
        return this.jobs.reduce(function (accumulator, value, index) {
            if (value.$ID == job.$ID)
                accumulator.push(index + 1);
            return accumulator;
        }, []);
    };
    TOSBuild.prototype.jobRemove$ = function (rank) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var r, job, circle;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        r = this.jobs.length - 1;
                        _a.label = 1;
                    case 1:
                        if (!(r >= rank - 1)) return [3 /*break*/, 6];
                        job = this.jobs[r];
                        return [4 /*yield*/, this.jobCircle(job)];
                    case 2:
                        circle = _a.sent();
                        // Update circle
                        this.jobs = this.jobs.slice(0, r);
                        this.jobCirclesById[job.$ID]--;
                        this.jobChange.next(job);
                        if (!(circle == 1)) return [3 /*break*/, 3];
                        job.Link_Skills$ID.forEach(function (value) { return delete _this.skillLevelsById[value]; });
                        delete this.jobCirclesById[job.$ID];
                        delete this.skillPointsByJob[job.$ID];
                        return [3 /*break*/, 5];
                    case 3:
                        if (!(circle > 0)) return [3 /*break*/, 5];
                        // Reset skill levels & points
                        this.buildResetSkillPoints(job);
                        return [4 /*yield*/, this.buildResetSkillLevels$(job)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        r--;
                        return [3 /*break*/, 1];
                    case 6:
                        // Reset stats
                        if (rank == 1)
                            this.buildResetStats();
                        return [2 /*return*/];
                }
            });
        });
    };
    TOSBuild.prototype.skillEffect$ = function (skill, showFactors) {
        return skill.EffectDescription(this, showFactors);
    };
    TOSBuild.prototype.skillEffectFormula$ = function (skill, prop) {
        return skill.EffectFormula(prop, this);
    };
    TOSBuild.prototype.skillLevel = function (skill) { return this.skillLevelsById[skill.$ID]; };
    TOSBuild.prototype.skillLevelIncrement$ = function (skill, delta, force, rollOver) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var skillLevel, skillPoints, _a, levelMax;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        skillLevel = this.skillLevel(skill);
                        skillPoints = this.skillPointsByJob[skill.Link_Job$ID];
                        _a = !force;
                        if (!_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.skillLevelIncrementAvailable$(skill, delta).toPromise()];
                    case 1:
                        _a = !(_b.sent());
                        _b.label = 2;
                    case 2:
                        if (!_a) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.skillLevelMax$(skill).toPromise()];
                    case 3:
                        levelMax = _b.sent();
                        if (rollOver && skillLevel == 0)
                            delta = Math.min(levelMax, skillPoints);
                        else if (rollOver && (skillLevel == levelMax || skillPoints == 0))
                            delta = -skillLevel;
                        else
                            throw new Error("Can't increment " + skill.$ID_NAME + "'s level or it gets out of bounds");
                        _b.label = 4;
                    case 4:
                        // Propagate update
                        this.skillLevelsById[skill.$ID] += delta;
                        this.skillPointsByJob[skill.Link_Job$ID] -= delta;
                        this.skillChange.next(skill);
                        return [2 /*return*/];
                }
            });
        });
    };
    TOSBuild.prototype.skillLevelIncrementAvailable$ = function (skill, delta) {
        var _this = this;
        var skillLevel = this.skillLevelsById[skill.$ID];
        var skillPoints = this.skillPointsByJob[skill.Link_Job$ID];
        return Object(rxjs_internal_compatibility__WEBPACK_IMPORTED_MODULE_6__["fromPromise"])((function () { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
            var _a, _b;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = 1 == 1
                            && skillPoints - delta >= 0
                            && skillLevel + delta >= 0;
                        if (!_a) return [3 /*break*/, 2];
                        _b = skillLevel + delta;
                        return [4 /*yield*/, this.skillLevelMax$(skill).toPromise()];
                    case 1:
                        _a = _b <= (_c.sent());
                        _c.label = 2;
                    case 2: return [2 /*return*/, _a];
                }
            });
        }); })());
    };
    TOSBuild.prototype.skillPoints = function (job) { return this.skillPointsByJob[job.$ID]; };
    TOSBuild.prototype.skillPointsMax = function (job) { return SKILL_POINTS_PER_CIRCLE * this.jobCircle(job); };
    TOSBuild.prototype.skillSP$ = function (skill) { return skill.BuildSP(this); };
    TOSBuild.prototype.statsIncrementLevel = function (stat, delta) {
        if (this.statsBonus[stat] == undefined)
            throw new Error("Can't increment unknown '" + stat + "' stat");
        if (!this.statsIncrementLevelAvailable(stat, delta))
            throw new Error("Can't increment " + stat + "'s level or it gets out of bounds");
        var statsPoints = this.statsPoints.getValue();
        statsPoints -= delta;
        this.statsBonus[stat] += delta;
        this.statsPoints.next(statsPoints);
    };
    TOSBuild.prototype.statsIncrementLevelAvailable = function (stat, delta) {
        var statsPoints = this.statsPoints.getValue();
        return 1 == 1
            //&& statsPoints - delta >= 0 // TODO: Until we implement the full simulator with equipment, this will have no cap
            && this.statsBonus[stat] + delta <= 9999
            && this.statsBonus[stat] + delta >= 0;
    };
    TOSBuild.prototype.buildResetSkillLevels$ = function (job) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var skillLevels, _a, _b, _i, skill$ID, delta, skill, skillPoints, _c, _d, _e, _f;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_g) {
                switch (_g.label) {
                    case 0:
                        skillLevels = {};
                        // Reset skill levels
                        job.Link_Skills$ID.forEach(function (value) {
                            skillLevels[value] = _this.skillLevelsById[value];
                            _this.skillLevelsById[value] = 0;
                        });
                        _a = [];
                        for (_b in skillLevels)
                            _a.push(_b);
                        _i = 0;
                        _g.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 9];
                        skill$ID = _a[_i];
                        delta = skillLevels[skill$ID];
                        return [4 /*yield*/, _tos_domain_service__WEBPACK_IMPORTED_MODULE_4__["TOSDomainService"].skillsById(+skill$ID).toPromise()];
                    case 2:
                        skill = _g.sent();
                        skillPoints = this.skillPointsByJob[job.$ID];
                        if (!(delta > 0)) return [3 /*break*/, 7];
                        if (!this.skillLevelIncrementAvailable$(skill, delta)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.skillLevelIncrement$(skill, delta)];
                    case 3:
                        _g.sent();
                        return [3 /*break*/, 7];
                    case 4:
                        _c = this.skillLevelIncrement$;
                        _d = [skill];
                        _f = (_e = Math).min;
                        return [4 /*yield*/, this.skillLevelMax$(skill).toPromise()];
                    case 5: return [4 /*yield*/, _c.apply(this, _d.concat([_f.apply(_e, [_g.sent(), skillPoints])]))];
                    case 6:
                        _g.sent();
                        _g.label = 7;
                    case 7:
                        this.skillChange.next(skill);
                        _g.label = 8;
                    case 8:
                        _i++;
                        return [3 /*break*/, 1];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    TOSBuild.prototype.buildResetSkillPoints = function (job) {
        this.skillPointsByJob[job.$ID] = this.skillPointsMax(job);
    };
    TOSBuild.prototype.buildResetStats = function () {
        this.statsBonus.CON = this.statsBonus.DEX = this.statsBonus.INT = this.statsBonus.SPR = this.statsBonus.STR = 0;
        this.statsPoints.next(this.statsPointsMax());
    };
    return TOSBuild;
}());
var TOSBuild_10 = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](TOSBuild_10, _super);
    function TOSBuild_10() {
        var _this = _super.call(this) || this;
        _this.stats = { CON: 0, DEX: 0, INT: 0, SPR: 0, STR: 0 };
        return _this;
    }
    Object.defineProperty(TOSBuild_10.prototype, "StatsBase", {
        get: function () {
            return {
                CON: this.stats.CON,
                DEX: this.stats.DEX,
                INT: this.stats.INT,
                SPR: this.stats.SPR,
                STR: this.stats.STR,
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSBuild_10.prototype, "Version", {
        get: function () {
            return 1.0;
        },
        enumerable: true,
        configurable: true
    });
    TOSBuild_10.prototype.jobAdd$ = function (job) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.Rank + 1 == 1) {
                            this.stats.CON = job.Stat_CON;
                            this.stats.DEX = job.Stat_DEX;
                            this.stats.INT = job.Stat_INT;
                            this.stats.SPR = job.Stat_SPR;
                            this.stats.STR = job.Stat_STR;
                        }
                        return [4 /*yield*/, _super.prototype.jobAdd$.call(this, job)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    TOSBuild_10.prototype.jobCircleMax = function (job) {
        return job.CircleMax;
    };
    TOSBuild_10.prototype.jobUnlockAvailable$ = function (job) {
        var _this = this;
        return Object(rxjs_internal_compatibility__WEBPACK_IMPORTED_MODULE_6__["fromPromise"])((function () { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
            var extra, _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        extra = true;
                        if (!(job.$ID_NAME == 'Char4_12')) return [3 /*break*/, 2];
                        _a = this.jobCircle;
                        return [4 /*yield*/, _tos_domain_service__WEBPACK_IMPORTED_MODULE_4__["TOSDomainService"].jobsById(4002).toPromise()];
                    case 1:
                        extra = _a.apply(this, [_b.sent()]) >= 3; // Priest
                        _b.label = 2;
                    case 2: // Priest
                    return [2 /*return*/, 1 == 1
                            && extra
                            && this.Rank + 1 <= RANK_LIMIT
                            && this.Rank + 1 >= job.Rank
                            && this.jobCircle(job) < this.jobCircleMax(job)];
                }
            });
        }); })());
    };
    TOSBuild_10.prototype.skillLevelMax$ = function (skill) {
        var _this = this;
        // Taken from shared.ipf/script/skilltree_condition.lua :: GET_SKILLTREE_MAXLV
        return skill.Link_Job.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (value) {
            var classLv = _this.jobCircle(value);
            var ret = (classLv - skill.Prop_UnlockGrade + 1) * skill.Prop_LevelPerGrade;
            return Math.min(ret, skill.Prop_MaxLevel);
        }));
    };
    TOSBuild_10.prototype.statsPointsMax = function () {
        // Bonus stat points:
        // + 390 - 1 > Level limit
        // + 40 > Hidden & Revelation Quests
        // + 12 > Zemyna Statues
        // More info: https://forum.treeofsavior.com/t/extra-stat-point-quests-guide/390257
        return LEVEL_LIMIT - 1 + 40 + 12;
    };
    return TOSBuild_10;
}(TOSBuild));
var TOSBuild_20 = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](TOSBuild_20, _super);
    function TOSBuild_20() {
        return _super.call(this) || this;
    }
    Object.defineProperty(TOSBuild_20.prototype, "Rank", {
        get: function () {
            return (this.Jobs.length > 0 ? 1 : 0) + Math.max((this.Jobs.length - 1) * 3, 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSBuild_20.prototype, "Version", {
        get: function () {
            return 2.0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSBuild_20.prototype, "StatsBase", {
        get: function () {
            var jobs = this.Jobs;
            var jobsStarter = jobs[0];
            var stats = jobs.reduce(function (previousValue, currentValue) {
                previousValue.CON += currentValue.Stat_CON;
                previousValue.DEX += currentValue.Stat_DEX;
                previousValue.INT += currentValue.Stat_INT;
                previousValue.SPR += currentValue.Stat_SPR;
                previousValue.STR += currentValue.Stat_STR;
                return previousValue;
            }, { CON: 0, DEX: 0, INT: 0, SPR: 0, STR: 0 });
            return {
                CON: Math.floor((LEVEL_LIMIT - 1) * stats.CON / (jobs.length * 100)) + (jobsStarter ? jobsStarter.StatBase_CON : 0),
                DEX: Math.floor((LEVEL_LIMIT - 1) * stats.DEX / (jobs.length * 100)) + (jobsStarter ? jobsStarter.StatBase_DEX : 0),
                INT: Math.floor((LEVEL_LIMIT - 1) * stats.INT / (jobs.length * 100)) + (jobsStarter ? jobsStarter.StatBase_INT : 0),
                SPR: Math.floor((LEVEL_LIMIT - 1) * stats.SPR / (jobs.length * 100)) + (jobsStarter ? jobsStarter.StatBase_SPR : 0),
                STR: Math.floor((LEVEL_LIMIT - 1) * stats.STR / (jobs.length * 100)) + (jobsStarter ? jobsStarter.StatBase_STR : 0),
            };
        },
        enumerable: true,
        configurable: true
    });
    TOSBuild_20.prototype.jobCircle = function (job) { return _super.prototype.jobCircle.call(this, job) ? this.jobCircleMax(job) : 0; };
    TOSBuild_20.prototype.jobCircleMax = function (job) { return job.Rank == 1 ? 1 : 3; };
    TOSBuild_20.prototype.jobUnlockAvailable$ = function (job) {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])(1 == 1
            && this.Rank + 1 <= RANK_LIMIT
            && this.Rank + 1 >= job.Rank
            && (!job.IsSecret || this.Rank + 1 > 2)
            && this.jobCircle(job) < this.jobCircleMax(job));
    };
    TOSBuild_20.prototype.skillLevelMax$ = function (skill) {
        var _this = this;
        // Taken from shared.ipf/script/skill/skill_enable_get_shared.lua :: GET_LIMIT_SKILL_LEVEL
        return skill.Link_Job.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (value) {
            var defMaxLevel = skill.Prop_MaxLevel;
            var pcJobLv = _this.jobCircleMax(value) * 15;
            var pcCircle = Math.floor((pcJobLv - 1) / 15) + 1;
            var sklCircle = Math.floor((skill.Prop_UnlockClassLevel - 1) / 15) + 1;
            var applyCircle = pcCircle - sklCircle + 1;
            return Math.min(applyCircle * 5, defMaxLevel);
        }));
    };
    TOSBuild_20.prototype.statsPointsMax = function () {
        // Bonus stat points:
        // + 40 > Hidden & Revelation Quests
        // + 12 > Zemyna Statues
        // More info: https://forum.treeofsavior.com/t/extra-stat-point-quests-guide/390257
        return 40 + 12;
    };
    return TOSBuild_20;
}(TOSBuild));
var TOSDatabaseBuild = /** @class */ (function () {
    function TOSDatabaseBuild(build) {
        this.build = build;
    }
    TOSDatabaseBuild.new = function (region) {
        var build = _tos_region__WEBPACK_IMPORTED_MODULE_5__["TOSRegionService"].isRebuild(region)
            ? new TOSBuild_20()
            : new TOSBuild_10();
        return new TOSDatabaseBuild(build);
    };
    Object.defineProperty(TOSDatabaseBuild.prototype, "Job$", {
        get: function () { return this.build.Job$; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSDatabaseBuild.prototype, "Jobs", {
        get: function () { return this.build.Jobs; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSDatabaseBuild.prototype, "JobTree", {
        get: function () { return this.build.JobTree; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSDatabaseBuild.prototype, "Rank", {
        get: function () { return this.build.Rank; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSDatabaseBuild.prototype, "Skill$", {
        get: function () { return this.build.Skill$; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSDatabaseBuild.prototype, "Stats", {
        get: function () { return this.build.Stats; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSDatabaseBuild.prototype, "StatsBase", {
        get: function () { return this.build.StatsBase; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSDatabaseBuild.prototype, "StatsBonus", {
        get: function () { return this.build.StatsBonus; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSDatabaseBuild.prototype, "StatsPoints$", {
        get: function () { return this.build.StatsPoints$; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSDatabaseBuild.prototype, "Version", {
        get: function () { return this.build.Version; },
        enumerable: true,
        configurable: true
    });
    TOSDatabaseBuild.prototype.jobAdd$ = function (job) { return this.build.jobAdd$(job); };
    TOSDatabaseBuild.prototype.jobCircle = function (job) { return this.build.jobCircle(job); };
    TOSDatabaseBuild.prototype.jobCircleMax = function (job) { return this.build.jobCircleMax(job); };
    TOSDatabaseBuild.prototype.jobRanks = function (job) { return this.build.jobRanks(job); };
    TOSDatabaseBuild.prototype.jobRemove$ = function (rank) { return this.build.jobRemove$(rank); };
    TOSDatabaseBuild.prototype.jobUnlockAvailable$ = function (job) { return this.build.jobUnlockAvailable$(job); };
    TOSDatabaseBuild.prototype.skillEffect$ = function (skill, showFactors) { return this.build.skillEffect$(skill, showFactors); };
    TOSDatabaseBuild.prototype.skillEffectFormula$ = function (skill, prop) { return this.build.skillEffectFormula$(skill, prop); };
    TOSDatabaseBuild.prototype.skillLevel = function (skill) { return this.build.skillLevel(skill); };
    TOSDatabaseBuild.prototype.skillLevelIncrement$ = function (skill, delta, force, rollOver) { return this.build.skillLevelIncrement$(skill, delta, force, rollOver); };
    TOSDatabaseBuild.prototype.skillLevelIncrementAvailable$ = function (skill, delta) { return this.build.skillLevelIncrementAvailable$(skill, delta); };
    TOSDatabaseBuild.prototype.skillLevelMax$ = function (skill) { return this.build.skillLevelMax$(skill); };
    TOSDatabaseBuild.prototype.skillPoints = function (job) { return this.build.skillPoints(job); };
    TOSDatabaseBuild.prototype.skillPointsMax = function (job) { return this.build.skillPointsMax(job); };
    TOSDatabaseBuild.prototype.skillSP$ = function (skill) { return this.build.skillSP$(skill); };
    TOSDatabaseBuild.prototype.statsIncrementLevel = function (stat, delta) { this.build.statsIncrementLevel(stat, delta); };
    TOSDatabaseBuild.prototype.statsIncrementLevelAvailable = function (stat, delta) { return this.build.statsIncrementLevelAvailable(stat, delta); };
    TOSDatabaseBuild.prototype.statsPointsMax = function () { return this.build.statsPointsMax(); };
    return TOSDatabaseBuild;
}());

var TOSSimulatorBuild = /** @class */ (function () {
    function TOSSimulatorBuild(build) {
        this.build = build;
        this.Tooltip = new _angular_core__WEBPACK_IMPORTED_MODULE_2__["EventEmitter"]();
    }
    TOSSimulatorBuild.base64Decode = function (region, text) {
        var _this = this;
        return Object(rxjs_internal_compatibility__WEBPACK_IMPORTED_MODULE_6__["fromPromise"])((function () { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
            var build, encoded, jobs, _i, jobs_1, job, _a, _b, skill$ID, skill, _c, _d, stat;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_e) {
                switch (_e.label) {
                    case 0:
                        build = TOSSimulatorBuild.new(region);
                        encoded = JSON.parse(atob(text));
                        if (!(build.Version == encoded.version)) return [3 /*break*/, 11];
                        return [4 /*yield*/, Promise.all(encoded.jobs.map(function (value) { return _tos_domain_service__WEBPACK_IMPORTED_MODULE_4__["TOSDomainService"].jobsByIdName(value).toPromise(); }))];
                    case 1:
                        jobs = _e.sent();
                        _i = 0, jobs_1 = jobs;
                        _e.label = 2;
                    case 2:
                        if (!(_i < jobs_1.length)) return [3 /*break*/, 5];
                        job = jobs_1[_i];
                        return [4 /*yield*/, build.jobAdd$(job)];
                    case 3:
                        _e.sent();
                        _e.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5:
                        _a = 0, _b = Object.keys(encoded.skills || {});
                        _e.label = 6;
                    case 6:
                        if (!(_a < _b.length)) return [3 /*break*/, 10];
                        skill$ID = _b[_a];
                        return [4 /*yield*/, _tos_domain_service__WEBPACK_IMPORTED_MODULE_4__["TOSDomainService"].skillsById(+skill$ID).toPromise()];
                    case 7:
                        skill = _e.sent();
                        return [4 /*yield*/, build.skillLevelIncrement$(skill, encoded.skills[skill$ID])];
                    case 8:
                        _e.sent();
                        _e.label = 9;
                    case 9:
                        _a++;
                        return [3 /*break*/, 6];
                    case 10:
                        // Parse stats
                        for (_c = 0, _d = Object.keys(encoded.stats || {}); _c < _d.length; _c++) {
                            stat = _d[_c];
                            build.statsIncrementLevel(stat, encoded.stats[stat]);
                        }
                        _e.label = 11;
                    case 11: return [2 /*return*/, build];
                }
            });
        }); })());
    };
    TOSSimulatorBuild.base64Encode = function (build) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var jobs, skills, skillLevels;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        jobs = build.Jobs.map(function (value) { return value.$ID_NAME; });
                        return [4 /*yield*/, Promise.all(build.Jobs.map(function (value) { return value.Link_Skills.toPromise(); }))];
                    case 1:
                        skills = _a.sent();
                        skillLevels = {};
                        skills
                            .forEach(function (value) { return value
                            .filter(function (value) { return build.skillLevel(value) > 0; })
                            .forEach(function (value) { return skillLevels[value.$ID] = build.skillLevel(value); }); });
                        return [2 /*return*/, jobs.length
                                ? btoa(JSON.stringify({ jobs: jobs, skills: skillLevels, stats: build.StatsBonus, version: build.Version }))
                                : ''];
                }
            });
        });
    };
    TOSSimulatorBuild.new = function (region) {
        var build = _tos_region__WEBPACK_IMPORTED_MODULE_5__["TOSRegionService"].isRebuild(region)
            ? new TOSBuild_20()
            : new TOSBuild_10();
        return new TOSSimulatorBuild(build);
    };
    Object.defineProperty(TOSSimulatorBuild.prototype, "Job$", {
        get: function () { return this.build.Job$; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSSimulatorBuild.prototype, "Jobs", {
        get: function () { return this.build.Jobs; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSSimulatorBuild.prototype, "JobTree", {
        get: function () { return this.build.JobTree; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSSimulatorBuild.prototype, "Rank", {
        get: function () { return this.build.Rank; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSSimulatorBuild.prototype, "Skill$", {
        get: function () { return this.build.Skill$; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSSimulatorBuild.prototype, "Stats", {
        get: function () { return this.build.Stats; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSSimulatorBuild.prototype, "StatsBase", {
        get: function () { return this.build.StatsBase; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSSimulatorBuild.prototype, "StatsBonus", {
        get: function () { return this.build.StatsBonus; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSSimulatorBuild.prototype, "StatsPoints$", {
        get: function () { return this.build.StatsPoints$; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSSimulatorBuild.prototype, "Version", {
        get: function () { return this.build.Version; },
        enumerable: true,
        configurable: true
    });
    TOSSimulatorBuild.prototype.jobAdd$ = function (job) { return this.build.jobAdd$(job); };
    TOSSimulatorBuild.prototype.jobCircle = function (job) { return this.build.jobCircle(job); };
    TOSSimulatorBuild.prototype.jobCircleMax = function (job) { return this.build.jobCircleMax(job); };
    TOSSimulatorBuild.prototype.jobRanks = function (job) { return this.build.jobRanks(job); };
    TOSSimulatorBuild.prototype.jobRemove$ = function (rank) { return this.build.jobRemove$(rank); };
    TOSSimulatorBuild.prototype.jobUnlockAvailable$ = function (job) { return this.build.jobUnlockAvailable$(job); };
    TOSSimulatorBuild.prototype.skillEffect$ = function (skill, showFactors) { return this.build.skillEffect$(skill, showFactors); };
    TOSSimulatorBuild.prototype.skillEffectFormula$ = function (skill, prop) { return this.build.skillEffectFormula$(skill, prop); };
    TOSSimulatorBuild.prototype.skillLevel = function (skill) { return this.build.skillLevel(skill); };
    TOSSimulatorBuild.prototype.skillLevelIncrement$ = function (skill, delta, force, rollOver) { return this.build.skillLevelIncrement$(skill, delta, force, rollOver); };
    TOSSimulatorBuild.prototype.skillLevelIncrementAvailable$ = function (skill, delta) { return this.build.skillLevelIncrementAvailable$(skill, delta); };
    TOSSimulatorBuild.prototype.skillLevelMax$ = function (skill) { return this.build.skillLevelMax$(skill); };
    TOSSimulatorBuild.prototype.skillPoints = function (job) { return this.build.skillPoints(job); };
    TOSSimulatorBuild.prototype.skillPointsMax = function (job) { return this.build.skillPointsMax(job); };
    TOSSimulatorBuild.prototype.skillSP$ = function (skill) { return this.build.skillSP$(skill); };
    TOSSimulatorBuild.prototype.statsIncrementLevel = function (stat, delta) { this.build.statsIncrementLevel(stat, delta); };
    TOSSimulatorBuild.prototype.statsIncrementLevelAvailable = function (stat, delta) { return this.build.statsIncrementLevelAvailable(stat, delta); };
    TOSSimulatorBuild.prototype.statsPointsMax = function () { return this.build.statsPointsMax(); };
    TOSSimulatorBuild.prototype.tooltip = function (entity, show) {
        this.Tooltip.emit(show && entity);
    };
    return TOSSimulatorBuild;
}());



/***/ }),

/***/ "./src/app/shared/domain/tos/tos-domain.repository.ts":
/*!************************************************************!*\
  !*** ./src/app/shared/domain/tos/tos-domain.repository.ts ***!
  \************************************************************/
/*! exports provided: TOSDomainRepository */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSDomainRepository", function() { return TOSDomainRepository; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _tos_domain__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tos-domain */ "./src/app/shared/domain/tos/tos-domain.ts");
/* harmony import */ var _service_tos_url_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../service/tos-url.service */ "./src/app/shared/service/tos-url.service.ts");
/* harmony import */ var _tos_region__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../tos-region */ "./src/app/shared/domain/tos-region.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _attribute_tos_attribute_model__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./attribute/tos-attribute.model */ "./src/app/shared/domain/tos/attribute/tos-attribute.model.ts");
/* harmony import */ var _item_book_tos_book_model__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./item/book/tos-book.model */ "./src/app/shared/domain/tos/item/book/tos-book.model.ts");
/* harmony import */ var _item_card_tos_card_model__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./item/card/tos-card.model */ "./src/app/shared/domain/tos/item/card/tos-card.model.ts");
/* harmony import */ var _item_collection_tos_collection_model__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./item/collection/tos-collection.model */ "./src/app/shared/domain/tos/item/collection/tos-collection.model.ts");
/* harmony import */ var _item_cube_tos_cube_model__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./item/cube/tos-cube.model */ "./src/app/shared/domain/tos/item/cube/tos-cube.model.ts");
/* harmony import */ var _item_equipment_tos_equipment_model__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./item/equipment/tos-equipment.model */ "./src/app/shared/domain/tos/item/equipment/tos-equipment.model.ts");
/* harmony import */ var _item_gem_tos_gem_model__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./item/gem/tos-gem.model */ "./src/app/shared/domain/tos/item/gem/tos-gem.model.ts");
/* harmony import */ var _item_tos_item_model__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./item/tos-item.model */ "./src/app/shared/domain/tos/item/tos-item.model.ts");
/* harmony import */ var _job_tos_job_model__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./job/tos-job.model */ "./src/app/shared/domain/tos/job/tos-job.model.ts");
/* harmony import */ var _map_tos_map_model__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./map/tos-map.model */ "./src/app/shared/domain/tos/map/tos-map.model.ts");
/* harmony import */ var _monster_tos_monster_model__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./monster/tos-monster.model */ "./src/app/shared/domain/tos/monster/tos-monster.model.ts");
/* harmony import */ var _item_recipe_tos_recipe_model__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./item/recipe/tos-recipe.model */ "./src/app/shared/domain/tos/item/recipe/tos-recipe.model.ts");
/* harmony import */ var _skill_tos_skill_model__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./skill/tos-skill.model */ "./src/app/shared/domain/tos/skill/tos-skill.model.ts");
/* harmony import */ var _monster_tos_npc_model__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./monster/tos-npc.model */ "./src/app/shared/domain/tos/monster/tos-npc.model.ts");





















var TOSDomainRepository = /** @class */ (function () {
    function TOSDomainRepository() {
        this.config = {
            'attributes': {
                factory: function (json) { return new _attribute_tos_attribute_model__WEBPACK_IMPORTED_MODULE_7__["TOSAttribute"](json); },
                schema: { primaryKey: '$ID', indexes: ['$ID_NAME'] },
            },
            'books': {
                factory: function (json) { return new _item_book_tos_book_model__WEBPACK_IMPORTED_MODULE_8__["TOSBook"](json); },
                schema: { primaryKey: '$ID' },
            },
            'cards': {
                factory: function (json) { return new _item_card_tos_card_model__WEBPACK_IMPORTED_MODULE_9__["TOSCard"](json); },
                schema: { primaryKey: '$ID' },
            },
            'collections': {
                factory: function (json) { return new _item_collection_tos_collection_model__WEBPACK_IMPORTED_MODULE_10__["TOSCollection"](json); },
                schema: { primaryKey: '$ID' },
            },
            'cubes': {
                factory: function (json) { return new _item_cube_tos_cube_model__WEBPACK_IMPORTED_MODULE_11__["TOSCube"](json); },
                schema: { primaryKey: '$ID' },
            },
            'equipment': {
                factory: function (json) { return new _item_equipment_tos_equipment_model__WEBPACK_IMPORTED_MODULE_12__["TOSEquipment"](json); },
                schema: { primaryKey: '$ID' },
            },
            'equipment-sets': {
                factory: function (json) { return new _item_equipment_tos_equipment_model__WEBPACK_IMPORTED_MODULE_12__["TOSEquipmentSet"](json); },
                schema: { primaryKey: '$ID' },
            },
            'gems': {
                factory: function (json) { return new _item_gem_tos_gem_model__WEBPACK_IMPORTED_MODULE_13__["TOSGem"](json); },
                schema: { primaryKey: '$ID' },
            },
            'items': {
                factory: function (json) { return new _item_tos_item_model__WEBPACK_IMPORTED_MODULE_14__["TOSItem"](_tos_domain__WEBPACK_IMPORTED_MODULE_3__["TOSDataSet"].ITEMS, json); },
                schema: { primaryKey: '$ID' },
            },
            'jobs': {
                factory: function (json) { return new _job_tos_job_model__WEBPACK_IMPORTED_MODULE_15__["TOSJob"](json); },
                schema: { primaryKey: '$ID', indexes: ['$ID_NAME', 'JobTree', 'IsStarter'] },
            },
            'maps': {
                factory: function (json) { return new _map_tos_map_model__WEBPACK_IMPORTED_MODULE_16__["TOSMap"](json); },
                schema: { primaryKey: '$ID' },
            },
            'monsters': {
                factory: function (json) { return new _monster_tos_monster_model__WEBPACK_IMPORTED_MODULE_17__["TOSMonster"](_tos_domain__WEBPACK_IMPORTED_MODULE_3__["TOSDataSet"].MONSTERS, json); },
                schema: { primaryKey: '$ID' },
            },
            'npcs': {
                factory: function (json) { return new _monster_tos_npc_model__WEBPACK_IMPORTED_MODULE_20__["TOSNPC"](json); },
                schema: { primaryKey: '$ID' },
            },
            'recipes': {
                factory: function (json) { return new _item_recipe_tos_recipe_model__WEBPACK_IMPORTED_MODULE_18__["TOSRecipe"](json); },
                schema: { primaryKey: '$ID' },
            },
            'skills': {
                factory: function (json) { return new _skill_tos_skill_model__WEBPACK_IMPORTED_MODULE_19__["TOSSkill"](json); },
                schema: { primaryKey: '$ID', indexes: ['$ID_NAME', 'Link_Job'] },
            }
        };
        this.WORKER_DEXIE_NONCE = 0;
        this.WORKER_PAPAPARSE_NONCE = 0;
        this.workerDexieHandler = {};
        this.workerPapaparseHandler = {};
        this.onPapaparseMessage = this.onPapaparseMessage.bind(this);
        this.onDexieMessage = this.onDexieMessage.bind(this);
    }
    TOSDomainRepository.prototype.find = function (dataset, page) {
        var _this = this;
        return this
            .postDexieMessage(WorkerDexieCommand.FIND, { dataset: dataset, region: _tos_region__WEBPACK_IMPORTED_MODULE_5__["TOSRegionService"].get(), page: page })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["map"])(function (value) {
            return {
                result: value.result.map(function (value) { return _this.config[dataset].factory(value); }),
                size: value.size,
            };
        }));
    };
    TOSDomainRepository.prototype.findByIndex = function (dataset, key, value, forceSingle) {
        var _this = this;
        return this
            .postDexieMessage(WorkerDexieCommand.FIND_BY_INDEX, { dataset: dataset, region: _tos_region__WEBPACK_IMPORTED_MODULE_5__["TOSRegionService"].get(), key: key, value: value })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["map"])(function (value) { return value.result.map(function (value) { return _this.config[dataset].factory(value); }); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["map"])(function (value) { return forceSingle ? value[0] : value; }));
    };
    TOSDomainRepository.prototype.load = function (dataset, region) {
        return this.postPapaparseMessage(WorkerPapaparseCommand.LOAD, dataset, {
            region: region,
            schema: this.config[dataset].schema,
        });
    };
    TOSDomainRepository.prototype.onDexieMessage = function (event) {
        var message = event.data;
        var handler = this.workerDexieHandler[message.nonce];
        handler.next(message.payload);
        handler.complete();
        delete this.workerDexieHandler[message.nonce];
    };
    TOSDomainRepository.prototype.onPapaparseMessage = function (event) {
        var message = event.data;
        var handler = this.workerPapaparseHandler[message.nonce];
        handler.next(message.payload);
        handler.complete();
        delete this.workerPapaparseHandler[message.nonce];
    };
    TOSDomainRepository.prototype.postDexieMessage = function (cmd, payload) {
        var nonce = this.WORKER_DEXIE_NONCE++;
        var message = { cmd: cmd, nonce: nonce, payload: payload };
        var subject = this.workerDexieHandler[nonce] = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        var worker = this.workerDexie = this.workerDexie || new Worker(_service_tos_url_service__WEBPACK_IMPORTED_MODULE_4__["TOSUrlService"].WORKER_DEXIE());
        worker.onmessage = this.onDexieMessage;
        worker.postMessage(message);
        return subject.asObservable();
    };
    TOSDomainRepository.prototype.postPapaparseMessage = function (cmd, dataset, payload) {
        var nonce = this.WORKER_PAPAPARSE_NONCE++;
        var message = { cmd: cmd, dataset: dataset, nonce: nonce, payload: payload };
        var subject = this.workerPapaparseHandler[nonce] = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        var worker = this.workerPapaparse = this.workerPapaparse || new Worker(_service_tos_url_service__WEBPACK_IMPORTED_MODULE_4__["TOSUrlService"].WORKER_PAPAPARSE());
        worker.onmessage = this.onPapaparseMessage;
        worker.postMessage(message);
        return subject.asObservable();
    };
    TOSDomainRepository = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], TOSDomainRepository);
    return TOSDomainRepository;
}());

var WorkerDexieCommand;
(function (WorkerDexieCommand) {
    WorkerDexieCommand["FIND"] = "find";
    WorkerDexieCommand["FIND_BY_INDEX"] = "findByIndex";
})(WorkerDexieCommand || (WorkerDexieCommand = {}));
var WorkerPapaparseCommand;
(function (WorkerPapaparseCommand) {
    WorkerPapaparseCommand["LOAD"] = "load";
})(WorkerPapaparseCommand || (WorkerPapaparseCommand = {}));


/***/ }),

/***/ "./src/app/shared/domain/tos/tos-domain.service.ts":
/*!*********************************************************!*\
  !*** ./src/app/shared/domain/tos/tos-domain.service.ts ***!
  \*********************************************************/
/*! exports provided: TOSDomainService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSDomainService", function() { return TOSDomainService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _tos_domain__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tos-domain */ "./src/app/shared/domain/tos/tos-domain.ts");
/* harmony import */ var rxjs_internal_compatibility__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/internal-compatibility */ "./node_modules/rxjs/_esm5/internal-compatibility/index.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var _this = undefined;




var TOSDomainService = /** @class */ (function () {
    function TOSDomainService(repository) {
        this.repository = repository;
        TOSDomainService_1.repository = repository;
    }
    TOSDomainService_1 = TOSDomainService;
    TOSDomainService.prototype.load = function (dataset, region) {
        return this.repository.load(dataset, region);
    };
    //---------------------------------------------------------------------------
    TOSDomainService.attributes = function (page) { return this.repository.find(_tos_domain__WEBPACK_IMPORTED_MODULE_1__["TOSDataSet"].ATTRIBUTES, page); };
    ;
    TOSDomainService.attributesById = function ($ID) { return this.repository.findByIndex(_tos_domain__WEBPACK_IMPORTED_MODULE_1__["TOSDataSet"].ATTRIBUTES, '$ID', $ID, true); };
    ;
    TOSDomainService.attributesByIdName = function ($ID_NAME) { return this.repository.findByIndex(_tos_domain__WEBPACK_IMPORTED_MODULE_1__["TOSDataSet"].ATTRIBUTES, '$ID_NAME', $ID_NAME, true); };
    ;
    TOSDomainService.books = function (page) { return this.repository.find(_tos_domain__WEBPACK_IMPORTED_MODULE_1__["TOSDataSet"].BOOKS, page); };
    ;
    TOSDomainService.booksById = function ($ID) { return this.repository.findByIndex(_tos_domain__WEBPACK_IMPORTED_MODULE_1__["TOSDataSet"].BOOKS, '$ID', $ID, true); };
    ;
    TOSDomainService.cards = function (page) { return this.repository.find(_tos_domain__WEBPACK_IMPORTED_MODULE_1__["TOSDataSet"].CARDS, page); };
    ;
    TOSDomainService.cardsById = function ($ID) { return this.repository.findByIndex(_tos_domain__WEBPACK_IMPORTED_MODULE_1__["TOSDataSet"].CARDS, '$ID', $ID, true); };
    ;
    TOSDomainService.collections = function (page) { return this.repository.find(_tos_domain__WEBPACK_IMPORTED_MODULE_1__["TOSDataSet"].COLLECTIONS, page); };
    ;
    TOSDomainService.collectionsById = function ($ID) { return this.repository.findByIndex(_tos_domain__WEBPACK_IMPORTED_MODULE_1__["TOSDataSet"].COLLECTIONS, '$ID', $ID, true); };
    ;
    TOSDomainService.cubes = function (page) { return this.repository.find(_tos_domain__WEBPACK_IMPORTED_MODULE_1__["TOSDataSet"].CUBES, page); };
    ;
    TOSDomainService.cubesById = function ($ID) { return this.repository.findByIndex(_tos_domain__WEBPACK_IMPORTED_MODULE_1__["TOSDataSet"].CUBES, '$ID', $ID, true); };
    ;
    TOSDomainService.equipment = function (page) { return this.repository.find(_tos_domain__WEBPACK_IMPORTED_MODULE_1__["TOSDataSet"].EQUIPMENT, page); };
    ;
    TOSDomainService.equipmentById = function ($ID) { return this.repository.findByIndex(_tos_domain__WEBPACK_IMPORTED_MODULE_1__["TOSDataSet"].EQUIPMENT, '$ID', $ID, true); };
    ;
    TOSDomainService.equipmentSets = function (page) { return this.repository.find(_tos_domain__WEBPACK_IMPORTED_MODULE_1__["TOSDataSet"].EQUIPMENT_SETS, page); };
    ;
    TOSDomainService.equipmentSetsById = function ($ID) { return this.repository.findByIndex(_tos_domain__WEBPACK_IMPORTED_MODULE_1__["TOSDataSet"].EQUIPMENT_SETS, '$ID', $ID, true); };
    ;
    TOSDomainService.gems = function (page) { return this.repository.find(_tos_domain__WEBPACK_IMPORTED_MODULE_1__["TOSDataSet"].GEMS, page); };
    ;
    TOSDomainService.gemsById = function ($ID) { return this.repository.findByIndex(_tos_domain__WEBPACK_IMPORTED_MODULE_1__["TOSDataSet"].GEMS, '$ID', $ID, true); };
    ;
    TOSDomainService.items = function (page) { return this.repository.find(_tos_domain__WEBPACK_IMPORTED_MODULE_1__["TOSDataSet"].ITEMS, page); };
    ;
    TOSDomainService.itemsById = function ($ID) { return this.repository.findByIndex(_tos_domain__WEBPACK_IMPORTED_MODULE_1__["TOSDataSet"].ITEMS, '$ID', $ID, true); };
    ;
    TOSDomainService.jobs = function (page) { return this.repository.find(_tos_domain__WEBPACK_IMPORTED_MODULE_1__["TOSDataSet"].JOBS, page); };
    ;
    TOSDomainService.jobsById = function ($ID) { return this.repository.findByIndex(_tos_domain__WEBPACK_IMPORTED_MODULE_1__["TOSDataSet"].JOBS, '$ID', $ID, true); };
    ;
    TOSDomainService.jobsByIdName = function ($ID_NAME) { return this.repository.findByIndex(_tos_domain__WEBPACK_IMPORTED_MODULE_1__["TOSDataSet"].JOBS, '$ID_NAME', $ID_NAME, true); };
    ;
    TOSDomainService.jobsByTree = function (jobTree) { return this.repository.findByIndex(_tos_domain__WEBPACK_IMPORTED_MODULE_1__["TOSDataSet"].JOBS, 'JobTree', _tos_domain__WEBPACK_IMPORTED_MODULE_1__["TOSJobTreeService"].indexOf(jobTree)); };
    ;
    TOSDomainService.jobsByStarter = function (isStarter) { return this.repository.findByIndex(_tos_domain__WEBPACK_IMPORTED_MODULE_1__["TOSDataSet"].JOBS, 'IsStarter', isStarter ? 'True' : 'False'); };
    ;
    TOSDomainService.maps = function (page) { return this.repository.find(_tos_domain__WEBPACK_IMPORTED_MODULE_1__["TOSDataSet"].MAPS, page); };
    ;
    TOSDomainService.mapsById = function ($ID) { return this.repository.findByIndex(_tos_domain__WEBPACK_IMPORTED_MODULE_1__["TOSDataSet"].MAPS, '$ID', $ID, true); };
    ;
    TOSDomainService.monsters = function (page) { return this.repository.find(_tos_domain__WEBPACK_IMPORTED_MODULE_1__["TOSDataSet"].MONSTERS, page); };
    ;
    TOSDomainService.monstersById = function ($ID) { return this.repository.findByIndex(_tos_domain__WEBPACK_IMPORTED_MODULE_1__["TOSDataSet"].MONSTERS, '$ID', $ID, true); };
    ;
    TOSDomainService.npcs = function (page) { return this.repository.find(_tos_domain__WEBPACK_IMPORTED_MODULE_1__["TOSDataSet"].NPCS, page); };
    ;
    TOSDomainService.npcsById = function ($ID) { return this.repository.findByIndex(_tos_domain__WEBPACK_IMPORTED_MODULE_1__["TOSDataSet"].NPCS, '$ID', $ID, true); };
    ;
    TOSDomainService.recipes = function (page) { return this.repository.find(_tos_domain__WEBPACK_IMPORTED_MODULE_1__["TOSDataSet"].RECIPES, page); };
    ;
    TOSDomainService.recipesById = function ($ID) { return this.repository.findByIndex(_tos_domain__WEBPACK_IMPORTED_MODULE_1__["TOSDataSet"].RECIPES, '$ID', $ID, true); };
    ;
    TOSDomainService.skills = function (page) { return this.repository.find(_tos_domain__WEBPACK_IMPORTED_MODULE_1__["TOSDataSet"].SKILLS, page); };
    ;
    TOSDomainService.skillsById = function ($ID) { return this.repository.findByIndex(_tos_domain__WEBPACK_IMPORTED_MODULE_1__["TOSDataSet"].SKILLS, '$ID', $ID, true); };
    ;
    TOSDomainService.skillsByIdName = function ($ID_NAME) { return this.repository.findByIndex(_tos_domain__WEBPACK_IMPORTED_MODULE_1__["TOSDataSet"].SKILLS, '$ID_NAME', $ID_NAME, true); };
    ;
    TOSDomainService.skillsByJob = function (job) { return this.repository.findByIndex(_tos_domain__WEBPACK_IMPORTED_MODULE_1__["TOSDataSet"].SKILLS, 'Link_Job', job.$ID); };
    ;
    var TOSDomainService_1;
    TOSDomainService.itemsByIdLink = function ($ID) {
        return Object(rxjs_internal_compatibility__WEBPACK_IMPORTED_MODULE_2__["fromPromise"])((function () { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_j) {
                switch (_j.label) {
                    case 0:
                        _h = null;
                        if (_h) return [3 /*break*/, 2];
                        return [4 /*yield*/, TOSDomainService_1.booksById($ID).toPromise()];
                    case 1:
                        _h = (_j.sent());
                        _j.label = 2;
                    case 2:
                        _g = _h;
                        if (_g) return [3 /*break*/, 4];
                        return [4 /*yield*/, TOSDomainService_1.cardsById($ID).toPromise()];
                    case 3:
                        _g = (_j.sent());
                        _j.label = 4;
                    case 4:
                        _f = _g;
                        if (_f) return [3 /*break*/, 6];
                        return [4 /*yield*/, TOSDomainService_1.collectionsById($ID).toPromise()];
                    case 5:
                        _f = (_j.sent());
                        _j.label = 6;
                    case 6:
                        _e = _f;
                        if (_e) return [3 /*break*/, 8];
                        return [4 /*yield*/, TOSDomainService_1.cubesById($ID).toPromise()];
                    case 7:
                        _e = (_j.sent());
                        _j.label = 8;
                    case 8:
                        _d = _e;
                        if (_d) return [3 /*break*/, 10];
                        return [4 /*yield*/, TOSDomainService_1.gemsById($ID).toPromise()];
                    case 9:
                        _d = (_j.sent());
                        _j.label = 10;
                    case 10:
                        _c = _d;
                        if (_c) return [3 /*break*/, 12];
                        return [4 /*yield*/, TOSDomainService_1.itemsById($ID).toPromise()];
                    case 11:
                        _c = (_j.sent());
                        _j.label = 12;
                    case 12:
                        _b = _c;
                        if (_b) return [3 /*break*/, 14];
                        return [4 /*yield*/, TOSDomainService_1.recipesById($ID).toPromise()];
                    case 13:
                        _b = (_j.sent());
                        _j.label = 14;
                    case 14:
                        _a = _b;
                        if (_a) return [3 /*break*/, 16];
                        return [4 /*yield*/, TOSDomainService_1.equipmentById($ID).toPromise()]; // Note: due to duplicate IDs, fashion items should be the last ones to be checked
                    case 15:
                        _a = (_j.sent() // Note: due to duplicate IDs, fashion items should be the last ones to be checked
                        );
                        _j.label = 16;
                    case 16: return [2 /*return*/, _a]; // Note: due to duplicate IDs, fashion items should be the last ones to be checked
                }
            });
        }); })());
    };
    TOSDomainService.npcsByIdLink = function ($ID) {
        return Object(rxjs_internal_compatibility__WEBPACK_IMPORTED_MODULE_2__["fromPromise"])((function () { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
            var _a, _b;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = null;
                        if (_b) return [3 /*break*/, 2];
                        return [4 /*yield*/, TOSDomainService_1.monstersById($ID).toPromise()];
                    case 1:
                        _b = (_c.sent());
                        _c.label = 2;
                    case 2:
                        _a = _b;
                        if (_a) return [3 /*break*/, 4];
                        return [4 /*yield*/, TOSDomainService_1.npcsById($ID).toPromise()];
                    case 3:
                        _a = (_c.sent());
                        _c.label = 4;
                    case 4: return [2 /*return*/, _a];
                }
            });
        }); })());
    };
    TOSDomainService = TOSDomainService_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Inject"])('ITOSDomainRepository')),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [Object])
    ], TOSDomainService);
    return TOSDomainService;
}());



/***/ }),

/***/ "./src/app/shared/domain/tos/tos-domain.ts":
/*!*************************************************!*\
  !*** ./src/app/shared/domain/tos/tos-domain.ts ***!
  \*************************************************/
/*! exports provided: TOSAttackType, TOSCardType, TOSCardTypeService, TOSClassTree, TOSDataSet, TOSDataSetService, TOSElement, TOSElementService, TOSEquipmentGrade, TOSEquipmentGradeService, TOSEquipmentMaterial, TOSEquipmentMaterialService, TOSEquipmentType, TOSEquipmentTypeService, TOSGemType, TOSGemTypeService, TOSGemSlot, TOSGemSlotService, TOSItemTradability, TOSItemTradabilityService, TOSItemType, TOSItemTypeService, TOSJobDifficulty, TOSJobDifficultyService, TOSJobTree, TOSJobTreeService, TOSJobType, TOSJobTypeService, TOSMapType, TOSMapTypeService, TOSMonsterRace, TOSMonsterRaceService, TOSMonsterRank, TOSMonsterRankService, TOSMonsterSize, TOSMonsterSizeService, TOSMonsterType, TOSMonsterTypeService, TOSSkillRequiredStanceCompanion, TOSSkillRequiredStanceCompanionService, TOSStat, TOSStatService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSAttackType", function() { return TOSAttackType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSCardType", function() { return TOSCardType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSCardTypeService", function() { return TOSCardTypeService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSClassTree", function() { return TOSClassTree; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSDataSet", function() { return TOSDataSet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSDataSetService", function() { return TOSDataSetService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSElement", function() { return TOSElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSElementService", function() { return TOSElementService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSEquipmentGrade", function() { return TOSEquipmentGrade; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSEquipmentGradeService", function() { return TOSEquipmentGradeService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSEquipmentMaterial", function() { return TOSEquipmentMaterial; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSEquipmentMaterialService", function() { return TOSEquipmentMaterialService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSEquipmentType", function() { return TOSEquipmentType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSEquipmentTypeService", function() { return TOSEquipmentTypeService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSGemType", function() { return TOSGemType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSGemTypeService", function() { return TOSGemTypeService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSGemSlot", function() { return TOSGemSlot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSGemSlotService", function() { return TOSGemSlotService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSItemTradability", function() { return TOSItemTradability; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSItemTradabilityService", function() { return TOSItemTradabilityService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSItemType", function() { return TOSItemType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSItemTypeService", function() { return TOSItemTypeService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSJobDifficulty", function() { return TOSJobDifficulty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSJobDifficultyService", function() { return TOSJobDifficultyService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSJobTree", function() { return TOSJobTree; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSJobTreeService", function() { return TOSJobTreeService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSJobType", function() { return TOSJobType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSJobTypeService", function() { return TOSJobTypeService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSMapType", function() { return TOSMapType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSMapTypeService", function() { return TOSMapTypeService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSMonsterRace", function() { return TOSMonsterRace; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSMonsterRaceService", function() { return TOSMonsterRaceService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSMonsterRank", function() { return TOSMonsterRank; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSMonsterRankService", function() { return TOSMonsterRankService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSMonsterSize", function() { return TOSMonsterSize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSMonsterSizeService", function() { return TOSMonsterSizeService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSMonsterType", function() { return TOSMonsterType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSMonsterTypeService", function() { return TOSMonsterTypeService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSSkillRequiredStanceCompanion", function() { return TOSSkillRequiredStanceCompanion; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSSkillRequiredStanceCompanionService", function() { return TOSSkillRequiredStanceCompanionService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSStat", function() { return TOSStat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSStatService", function() { return TOSStatService; });
/* harmony import */ var _service_tos_url_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../service/tos-url.service */ "./src/app/shared/service/tos-url.service.ts");

function EnumServiceFactory(enumeration) {
    return {
        groupBy: function () { return [{ options: Object.values(enumeration) }]; },
        indexOf: function (value) { return Object.values(enumeration).indexOf(value); },
        toString: function (value) { return Object.values(enumeration)[+value] + ''; }
    };
}
var TOSAttackType;
(function (TOSAttackType) {
    TOSAttackType["BUFF"] = "Buff";
    TOSAttackType["MAGIC"] = "Magic";
    TOSAttackType["MISSILE"] = "Missile";
    TOSAttackType["MISSILE_BOW"] = "Missile: Bow";
    TOSAttackType["MISSILE_CANNON"] = "Missile: Cannon";
    TOSAttackType["MISSILE_GUN"] = "Missile: Gun";
    TOSAttackType["MELEE"] = "Melee";
    TOSAttackType["MELEE_PIERCING"] = "Piercing";
    TOSAttackType["MELEE_SLASH"] = "Slash";
    TOSAttackType["MELEE_STRIKE"] = "Strike";
    TOSAttackType["MELEE_THRUST"] = "Thrust";
    TOSAttackType["TRUE"] = "True Damage";
    TOSAttackType["UNKNOWN"] = "";
})(TOSAttackType || (TOSAttackType = {}));
var TOSCardType;
(function (TOSCardType) {
    TOSCardType["ATTACK"] = "Attack";
    TOSCardType["DEFENSE"] = "Defense";
    TOSCardType["LEGENDARY"] = "Legendary";
    TOSCardType["REINFORCE"] = "Reinforce Cards";
    TOSCardType["STATS"] = "Stats";
    TOSCardType["UTILITY"] = "Utility";
})(TOSCardType || (TOSCardType = {}));
var TOSCardTypeService = EnumServiceFactory(TOSCardType);
var TOSClassTree;
(function (TOSClassTree) {
    TOSClassTree["ARCHER"] = "Archer";
    TOSClassTree["CLERIC"] = "Cleric";
    TOSClassTree["SCOUT"] = "Scout";
    TOSClassTree["SWORDSMAN"] = "Swordsman";
    TOSClassTree["WIZARD"] = "Wizard";
})(TOSClassTree || (TOSClassTree = {}));
var TOSDataSet;
(function (TOSDataSet) {
    TOSDataSet["ATTRIBUTES"] = "attributes";
    TOSDataSet["BOOKS"] = "books";
    TOSDataSet["CARDS"] = "cards";
    TOSDataSet["COLLECTIONS"] = "collections";
    TOSDataSet["CUBES"] = "cubes";
    TOSDataSet["EQUIPMENT"] = "equipment";
    TOSDataSet["EQUIPMENT_SETS"] = "equipment-sets";
    TOSDataSet["GEMS"] = "gems";
    TOSDataSet["ITEMS"] = "items";
    TOSDataSet["JOBS"] = "jobs";
    TOSDataSet["MAPS"] = "maps";
    TOSDataSet["MONSTERS"] = "monsters";
    TOSDataSet["NPCS"] = "npcs";
    TOSDataSet["RECIPES"] = "recipes";
    TOSDataSet["SKILLS"] = "skills";
})(TOSDataSet || (TOSDataSet = {}));
var TOSDataSetService;
(function (TOSDataSetService) {
    TOSDataSetService.VALUES = [
        {
            label: 'Character',
            options: [
                TOSDataSet.ATTRIBUTES,
                TOSDataSet.JOBS,
                TOSDataSet.SKILLS,
            ],
        },
        {
            label: 'Items',
            options: [
                TOSDataSet.BOOKS,
                TOSDataSet.CARDS,
                TOSDataSet.COLLECTIONS,
                TOSDataSet.CUBES,
                TOSDataSet.EQUIPMENT,
                TOSDataSet.EQUIPMENT_SETS,
                TOSDataSet.GEMS,
                TOSDataSet.ITEMS,
                TOSDataSet.RECIPES,
            ],
        },
        {
            label: 'World',
            options: [
                TOSDataSet.MAPS,
                TOSDataSet.MONSTERS,
            ],
        }
    ];
    function toLabel(value) {
        if (value == TOSDataSet.JOBS)
            return 'Classes';
        if (value == null || (value + '') == '')
            return null;
        return (value || '').toString() // Convert to Human Form
            .split('-')
            .map(function (value) { return value[0].toUpperCase() + value.slice(1); })
            .join(' ');
    }
    TOSDataSetService.toLabel = toLabel;
    function toProperty(value) {
        return (value || '').toString() // Convert to camelCase
            .split('-')
            .map(function (value, index) { return index > 0 ? value[0].toUpperCase() + value.slice(1) : value; })
            .join('');
    }
    TOSDataSetService.toProperty = toProperty;
    function toUrl(value) {
        if (value == TOSDataSet.JOBS)
            return 'classes';
        return value.toString();
    }
    TOSDataSetService.toUrl = toUrl;
})(TOSDataSetService || (TOSDataSetService = {}));
var TOSElement;
(function (TOSElement) {
    TOSElement["DARK"] = "Dark";
    TOSElement["EARTH"] = "Earth";
    TOSElement["FIRE"] = "Fire";
    TOSElement["HOLY"] = "Holy";
    TOSElement["ICE"] = "Ice";
    TOSElement["LIGHTNING"] = "Lightning";
    TOSElement["MELEE"] = "None";
    TOSElement["POISON"] = "Poison";
    TOSElement["PSYCHOKINESIS"] = "Psychokinesis";
})(TOSElement || (TOSElement = {}));
var TOSElementService = EnumServiceFactory(TOSElement);
TOSElementService.icon = function (value) { return 'assets/images/element_' + value.toString().toLowerCase() + '.png'; };
var TOSEquipmentGrade;
(function (TOSEquipmentGrade) {
    TOSEquipmentGrade["LEGENDARY"] = "Legendary";
    TOSEquipmentGrade["MAGIC"] = "Magic";
    TOSEquipmentGrade["NORMAL"] = "Normal";
    TOSEquipmentGrade["RARE"] = "Rare";
    TOSEquipmentGrade["UNIQUE"] = "Unique";
})(TOSEquipmentGrade || (TOSEquipmentGrade = {}));
var TOSEquipmentGradeService = EnumServiceFactory(TOSEquipmentGrade);
TOSEquipmentGradeService.comparator = function (a, b) {
    var i = TOSEquipmentGradeService.order(a);
    var j = TOSEquipmentGradeService.order(b);
    return (i < j) ? -1 : (i > j) ? 1 : 0;
};
TOSEquipmentGradeService.color = function (value) {
    if (value == TOSEquipmentGrade.NORMAL)
        return '#999999';
    if (value == TOSEquipmentGrade.MAGIC)
        return '#42BAF7';
    if (value == TOSEquipmentGrade.RARE)
        return '#CE69EF';
    if (value == TOSEquipmentGrade.UNIQUE)
        return '#EF6900';
    if (value == TOSEquipmentGrade.LEGENDARY)
        return '#F4E409';
};
TOSEquipmentGradeService.order = function (value) {
    if (value == TOSEquipmentGrade.NORMAL)
        return 0;
    if (value == TOSEquipmentGrade.MAGIC)
        return 1;
    if (value == TOSEquipmentGrade.RARE)
        return 2;
    if (value == TOSEquipmentGrade.UNIQUE)
        return 3;
    if (value == TOSEquipmentGrade.LEGENDARY)
        return 4;
};
var TOSEquipmentMaterial;
(function (TOSEquipmentMaterial) {
    TOSEquipmentMaterial["CHAIN"] = "Chain";
    TOSEquipmentMaterial["CLOTH"] = "Cloth";
    TOSEquipmentMaterial["GHOST"] = "Ghost";
    TOSEquipmentMaterial["LEATHER"] = "Leather";
    TOSEquipmentMaterial["PLATE"] = "Plate";
    TOSEquipmentMaterial["UNKNOWN"] = "";
})(TOSEquipmentMaterial || (TOSEquipmentMaterial = {}));
var TOSEquipmentMaterialService = EnumServiceFactory(TOSEquipmentMaterial);
var TOSEquipmentType;
(function (TOSEquipmentType) {
    TOSEquipmentType["ARK"] = "Ark";
    TOSEquipmentType["BOTTOM"] = "Pants";
    TOSEquipmentType["BRACELET"] = "Bracelets";
    TOSEquipmentType["CANNON"] = "Cannons";
    TOSEquipmentType["CHARM"] = "Charm";
    TOSEquipmentType["COSTUME_ARMBAND"] = "Armband";
    TOSEquipmentType["COSTUME_DOLL"] = "Doll";
    TOSEquipmentType["COSTUME_EFFECT"] = "Effect Costumes";
    TOSEquipmentType["COSTUME_HAIR"] = "Hair";
    TOSEquipmentType["COSTUME_HAIR_ACCESSORY"] = "Hair Accessories";
    TOSEquipmentType["COSTUME_HELMET"] = "Helmets";
    TOSEquipmentType["COSTUME_LENS"] = "Lens";
    TOSEquipmentType["COSTUME_OUTFIT"] = "Costume";
    TOSEquipmentType["COSTUME_SPECIAL"] = "Special Costume";
    TOSEquipmentType["COSTUME_SPECIAL_SKIN"] = "Special Costume Skin";
    TOSEquipmentType["COSTUME_TOY"] = "Toys";
    TOSEquipmentType["COSTUME_WING"] = "Wings";
    TOSEquipmentType["DAGGER"] = "Daggers";
    TOSEquipmentType["GLOVES"] = "Gloves";
    TOSEquipmentType["NECKLACE"] = "Necklaces";
    TOSEquipmentType["ONE_HANDED_BOW"] = "Crossbows";
    TOSEquipmentType["ONE_HANDED_GUN"] = "Pistols";
    TOSEquipmentType["ONE_HANDED_MACE"] = "Maces";
    TOSEquipmentType["ONE_HANDED_SPEAR"] = "Spears";
    TOSEquipmentType["ONE_HANDED_STAFF"] = "Rods";
    TOSEquipmentType["ONE_HANDED_SWORD"] = "Swords";
    TOSEquipmentType["RAPIER"] = "Rapiers";
    TOSEquipmentType["SEAL"] = "Seals";
    TOSEquipmentType["SHIELD"] = "Shields";
    TOSEquipmentType["SHOES"] = "Shoes";
    TOSEquipmentType["TOP"] = "Shirts";
    TOSEquipmentType["TRINKET"] = "Trinket";
    TOSEquipmentType["TWO_HANDED_BOW"] = "Bows";
    TOSEquipmentType["TWO_HANDED_GUN"] = "Muskets";
    TOSEquipmentType["TWO_HANDED_MACE"] = "2H Maces";
    TOSEquipmentType["TWO_HANDED_SPEAR"] = "2H Spears";
    TOSEquipmentType["TWO_HANDED_STAFF"] = "Staffs";
    TOSEquipmentType["TWO_HANDED_SWORD"] = "2H Swords";
})(TOSEquipmentType || (TOSEquipmentType = {}));
var TOSEquipmentTypeService = EnumServiceFactory(TOSEquipmentType);
TOSEquipmentTypeService.groupBy = function () { return [
    {
        header: 'Armor',
        options: [
            TOSEquipmentType.BRACELET,
            TOSEquipmentType.GLOVES,
            TOSEquipmentType.NECKLACE,
            TOSEquipmentType.BOTTOM,
            TOSEquipmentType.TOP,
            TOSEquipmentType.SHOES,
        ]
    },
    {
        header: 'Fashion',
        options: [
            TOSEquipmentType.COSTUME_ARMBAND,
            TOSEquipmentType.COSTUME_DOLL,
            TOSEquipmentType.COSTUME_EFFECT,
            TOSEquipmentType.COSTUME_HAIR,
            TOSEquipmentType.COSTUME_HAIR_ACCESSORY,
            TOSEquipmentType.COSTUME_HELMET,
            TOSEquipmentType.COSTUME_LENS,
            TOSEquipmentType.COSTUME_OUTFIT,
            TOSEquipmentType.COSTUME_SPECIAL,
            TOSEquipmentType.COSTUME_SPECIAL_SKIN,
            TOSEquipmentType.COSTUME_TOY,
            TOSEquipmentType.COSTUME_WING,
        ]
    },
    {
        header: '1-Handed Weapons',
        options: [
            TOSEquipmentType.ONE_HANDED_BOW,
            TOSEquipmentType.ONE_HANDED_MACE,
            TOSEquipmentType.RAPIER,
            TOSEquipmentType.ONE_HANDED_STAFF,
            TOSEquipmentType.ONE_HANDED_SPEAR,
            TOSEquipmentType.ONE_HANDED_SWORD,
        ]
    },
    {
        header: '2-Handed Weapons',
        options: [
            TOSEquipmentType.TWO_HANDED_BOW,
            TOSEquipmentType.CANNON,
            TOSEquipmentType.TWO_HANDED_MACE,
            TOSEquipmentType.TWO_HANDED_GUN,
            TOSEquipmentType.TWO_HANDED_SPEAR,
            TOSEquipmentType.TWO_HANDED_STAFF,
            TOSEquipmentType.TWO_HANDED_SWORD,
        ]
    },
    {
        header: 'Sub Weapons',
        options: [
            TOSEquipmentType.DAGGER,
            TOSEquipmentType.ONE_HANDED_GUN,
            TOSEquipmentType.SHIELD,
        ]
    },
    {
        header: 'Others',
        options: [
            TOSEquipmentType.ARK,
            TOSEquipmentType.SEAL,
            TOSEquipmentType.TRINKET,
        ]
    },
]; };
TOSEquipmentTypeService.toStringHuman = function (value) {
    if (value == TOSEquipmentType.COSTUME_LENS)
        return 'Lens';
    if (value == TOSEquipmentType.COSTUME_HAIR_ACCESSORY)
        return 'Hair Accessory';
    var result = (value + '');
    result = result.replace('2H', 'Two-Handed');
    result = result.endsWith('s') ? result.substr(0, result.length - 1) : result;
    return result;
};
var TOSGemType;
(function (TOSGemType) {
    TOSGemType["SKILL"] = "Skill";
    TOSGemType["STATS"] = "Stats";
})(TOSGemType || (TOSGemType = {}));
var TOSGemTypeService = EnumServiceFactory(TOSGemType);
var TOSGemSlot;
(function (TOSGemSlot) {
    TOSGemSlot["BOOTS"] = "Boots";
    TOSGemSlot["GLOVES"] = "Gloves";
    TOSGemSlot["SUBWEAPON"] = "SubWeapon";
    TOSGemSlot["TOPBOTTOM"] = "TopAndBottom";
    TOSGemSlot["WEAPON"] = "Weapon";
})(TOSGemSlot || (TOSGemSlot = {}));
var TOSGemSlotService = EnumServiceFactory(TOSGemSlot);
var TOSItemTradability;
(function (TOSItemTradability) {
    TOSItemTradability["MARKET"] = "Market";
    TOSItemTradability["PLAYER"] = "Players";
    TOSItemTradability["SHOP"] = "NPC Shops";
    TOSItemTradability["TEAM"] = "Team Storage";
})(TOSItemTradability || (TOSItemTradability = {}));
var TOSItemTradabilityService = EnumServiceFactory(TOSItemTradability);
var TOSItemType;
(function (TOSItemType) {
    TOSItemType["ARMBAND"] = "Arm Band";
    TOSItemType["ARMOR"] = "Armor";
    TOSItemType["ARK"] = "Ark";
    TOSItemType["BOOK"] = "Books";
    TOSItemType["CARD"] = "Card";
    TOSItemType["COLLECTION"] = "Collection";
    TOSItemType["CUBE"] = "Cubes";
    TOSItemType["DRUG"] = "Consumables";
    TOSItemType["EQUIPMENT"] = "Equipment";
    TOSItemType["EVENT"] = "Event";
    TOSItemType["EXPORB"] = "Experience Orb";
    TOSItemType["FISHINGROD"] = "Fishing Rod";
    TOSItemType["GEM"] = "Gem";
    TOSItemType["HELMET"] = "Helmet";
    TOSItemType["HIDDENABILITY"] = "Hidden Ability";
    TOSItemType["ICOR"] = "Icor";
    TOSItemType["LEGENDMATERIAL"] = "Legendary Material";
    TOSItemType["MAGICAMULET"] = "Magic Amulet";
    TOSItemType["MATERIAL"] = "Material";
    TOSItemType["MISC"] = "Miscellaneous";
    TOSItemType["PASTEBAIT"] = "Paste Bait";
    TOSItemType["PETARMOR"] = "Companion Armor";
    TOSItemType["PETWEAPON"] = "Companion Weapon";
    TOSItemType["PREMIUM"] = "Premium";
    TOSItemType["QUEST"] = "Quest";
    TOSItemType["RECIPE"] = "Recipe";
    TOSItemType["SEAL"] = "Seal";
    TOSItemType["SPECIALMATERIAL"] = "Special Material";
    TOSItemType["SUBEXPORB"] = "Sub Experience Orb";
    TOSItemType["SUBWEAPON"] = "Sub Weapon";
    TOSItemType["UNUSED"] = "Unused";
    TOSItemType["WEAPON"] = "Weapon";
})(TOSItemType || (TOSItemType = {}));
var TOSItemTypeService = EnumServiceFactory(TOSItemType);
TOSItemTypeService.groupBy = function () { return [
    {
        options: [
            TOSItemType.ARK,
            TOSItemType.DRUG,
            TOSItemType.EXPORB,
            TOSItemType.HIDDENABILITY,
            TOSItemType.EVENT,
            TOSItemType.LEGENDMATERIAL,
            TOSItemType.MATERIAL,
            TOSItemType.MISC,
            TOSItemType.PREMIUM,
            TOSItemType.QUEST,
            TOSItemType.SPECIALMATERIAL,
            TOSItemType.SUBEXPORB,
        ]
    },
]; };
var TOSJobDifficulty;
(function (TOSJobDifficulty) {
    TOSJobDifficulty["EASY"] = "Easy";
    TOSJobDifficulty["HARD"] = "Hard";
    TOSJobDifficulty["NORMAL"] = "Normal";
})(TOSJobDifficulty || (TOSJobDifficulty = {}));
var TOSJobDifficultyService = EnumServiceFactory(TOSJobDifficulty);
var TOSJobTree;
(function (TOSJobTree) {
    TOSJobTree["ARCHER"] = "Archer";
    TOSJobTree["CLERIC"] = "Cleric";
    TOSJobTree["SCOUT"] = "Scout";
    TOSJobTree["WARRIOR"] = "Warrior";
    TOSJobTree["WIZARD"] = "Wizard";
})(TOSJobTree || (TOSJobTree = {}));
var TOSJobTreeService = EnumServiceFactory(TOSJobTree);
var TOSJobType;
(function (TOSJobType) {
    TOSJobType["ATTACK"] = "Attack";
    TOSJobType["ATTACK_INSTALL"] = "Attack with Installations";
    TOSJobType["ATTACK_MANEUVERING"] = "Attack with Mobility";
    TOSJobType["ATTACK_SUMMON"] = "Attack with Summons";
    TOSJobType["CRAFTING"] = "Crafting";
    TOSJobType["DEFENSE"] = "Defense";
    TOSJobType["DEFENSE_PROVOKE"] = "Defense with Provoke";
    TOSJobType["SUPPORT"] = "Support";
    TOSJobType["SUPPORT_CONTROL"] = "Support with Control";
    TOSJobType["SUPPORT_PARTY"] = "Support with Party";
})(TOSJobType || (TOSJobType = {}));
var TOSJobTypeService = EnumServiceFactory(TOSJobType);
var TOSMapType;
(function (TOSMapType) {
    TOSMapType["BARRACK"] = "Barrack";
    TOSMapType["CITY"] = "City";
    TOSMapType["DUNGEON"] = "Dungeon";
    TOSMapType["FIELD"] = "Field";
    TOSMapType["INSTANCE"] = "Instance";
    TOSMapType["LOGIN"] = "Login";
})(TOSMapType || (TOSMapType = {}));
var TOSMapTypeService = EnumServiceFactory(TOSMapType);
var TOSMonsterRace;
(function (TOSMonsterRace) {
    TOSMonsterRace["BEAST"] = "Beast";
    TOSMonsterRace["DEMON"] = "Demon";
    TOSMonsterRace["INSECT"] = "Insect";
    TOSMonsterRace["ITEM"] = "Item";
    TOSMonsterRace["MUTANT"] = "Mutant";
    TOSMonsterRace["PLANT"] = "Plant";
    TOSMonsterRace["VELNAIS"] = "Velnais";
})(TOSMonsterRace || (TOSMonsterRace = {}));
var TOSMonsterRaceService = EnumServiceFactory(TOSMonsterRace);
TOSMonsterRaceService.icon = function (value) {
    return 'assets/images/monster_race_' + value.toString().toLowerCase() + '.png';
};
var TOSMonsterRank;
(function (TOSMonsterRank) {
    TOSMonsterRank["BOSS"] = "Boss";
    TOSMonsterRank["ELITE"] = "Elite";
    TOSMonsterRank["MATERIAL"] = "Material";
    TOSMonsterRank["MISC"] = "Misc";
    TOSMonsterRank["NEUTRAL"] = "Neutral";
    TOSMonsterRank["NORMAL"] = "Normal";
    TOSMonsterRank["NPC"] = "NPC";
    TOSMonsterRank["SPECIAL"] = "Special";
})(TOSMonsterRank || (TOSMonsterRank = {}));
var TOSMonsterRankService = EnumServiceFactory(TOSMonsterRank);
TOSMonsterRankService.comparator = function (a, b) {
    var i = TOSMonsterRankService.order(a);
    var j = TOSMonsterRankService.order(b);
    return (i < j) ? -1 : (i > j) ? 1 : 0;
};
TOSMonsterRankService.order = function (value) {
    if (value == TOSMonsterRank.NORMAL)
        return 0;
    if (value == TOSMonsterRank.ELITE)
        return 1;
    if (value == TOSMonsterRank.BOSS)
        return 2;
};
var TOSMonsterSize;
(function (TOSMonsterSize) {
    TOSMonsterSize["S"] = "S";
    TOSMonsterSize["M"] = "M";
    TOSMonsterSize["L"] = "L";
    TOSMonsterSize["XL"] = "XL";
    TOSMonsterSize["XXL"] = "XXL";
    TOSMonsterSize["HIDDEN"] = "Hidden";
})(TOSMonsterSize || (TOSMonsterSize = {}));
var TOSMonsterSizeService = EnumServiceFactory(TOSMonsterSize);
TOSMonsterSizeService.comparator = function (a, b) {
    var i = TOSMonsterSizeService.order(a);
    var j = TOSMonsterSizeService.order(b);
    return (i < j) ? -1 : (i > j) ? 1 : 0;
};
TOSMonsterSizeService.order = function (value) {
    if (value == TOSMonsterSize.S)
        return 0;
    if (value == TOSMonsterSize.M)
        return 1;
    if (value == TOSMonsterSize.L)
        return 2;
    if (value == TOSMonsterSize.XL)
        return 3;
};
var TOSMonsterType;
(function (TOSMonsterType) {
    TOSMonsterType["MONSTER"] = "Monster";
    TOSMonsterType["NEUTRAL"] = "Neutral";
    TOSMonsterType["NPC"] = "NPC";
    TOSMonsterType["SIGN"] = "Sign";
})(TOSMonsterType || (TOSMonsterType = {}));
var TOSMonsterTypeService = EnumServiceFactory(TOSMonsterType);
var TOSSkillRequiredStanceCompanion;
(function (TOSSkillRequiredStanceCompanion) {
    TOSSkillRequiredStanceCompanion["BOTH"] = "Yes";
    TOSSkillRequiredStanceCompanion["NO"] = "No";
    TOSSkillRequiredStanceCompanion["SELF"] = "Self";
    TOSSkillRequiredStanceCompanion["YES"] = "Exclusive";
})(TOSSkillRequiredStanceCompanion || (TOSSkillRequiredStanceCompanion = {}));
var TOSSkillRequiredStanceCompanionService = EnumServiceFactory(TOSSkillRequiredStanceCompanion);
var TOSStat;
(function (TOSStat) {
    TOSStat["CON"] = "CON";
    TOSStat["DEX"] = "DEX";
    TOSStat["INT"] = "INT";
    TOSStat["SPR"] = "SPR";
    TOSStat["STR"] = "STR";
    TOSStat["HP"] = "Maximum HP";
    TOSStat["HP_RECOVERY"] = "HP Recovery";
    TOSStat["SP"] = "Maximum SP";
    TOSStat["SP_RECOVERY"] = "SP Recovery";
    TOSStat["SP_RECOVERY_TIME"] = "SP Recovery Time";
    TOSStat["ATTACK_ELEMENT_DARK"] = "Dark Property Attack";
    TOSStat["ATTACK_ELEMENT_EARTH"] = "Earth Property Attack";
    TOSStat["ATTACK_ELEMENT_FIRE"] = "Fire Property Attack";
    TOSStat["ATTACK_ELEMENT_HOLY"] = "Holy Property Attack";
    TOSStat["ATTACK_ELEMENT_ICE"] = "Ice Property Attack";
    TOSStat["ATTACK_ELEMENT_LIGHTNING"] = "Lightning Property Attack";
    TOSStat["ATTACK_ELEMENT_POISON"] = "Poison Property Attack";
    TOSStat["ATTACK_ELEMENT_PSYCHOKINESIS"] = "Psychokinesis Property Attack";
    TOSStat["ATTACK_LIMIT_MAX"] = "Maximum Attack";
    TOSStat["ATTACK_LIMIT_MIN"] = "Minimum Attack";
    TOSStat["ATTACK_MATERIAL_CHAIN"] = "Attack against Chain Armored Targets";
    TOSStat["ATTACK_MATERIAL_CLOTH"] = "Attack against Cloth Armored Targets";
    TOSStat["ATTACK_MATERIAL_LEATHER"] = "Attack against Leather-armor Targets";
    TOSStat["ATTACK_MATERIAL_GHOST"] = "Attack against Ghost-armor Targets";
    TOSStat["ATTACK_MATERIAL_PLATE"] = "Attack against Plate-armor Targets";
    TOSStat["ATTACK_RACE_BEAST"] = "Attack against Beast-type Targets";
    TOSStat["ATTACK_RACE_DEVIL"] = "Attack against Devil-type Targets";
    TOSStat["ATTACK_RACE_INSECT"] = "Attack against Insect-type Targets";
    TOSStat["ATTACK_RACE_MUTANT"] = "Attack against Mutant-type Targets";
    TOSStat["ATTACK_RACE_PLANT"] = "Attack against Plant-type Targets";
    TOSStat["ATTACK_SIZE_SMALL"] = "Attack against Small-size Targets";
    TOSStat["ATTACK_SIZE_MEDIUM"] = "Attack against Medium-size Targets";
    TOSStat["ATTACK_SIZE_LARGE"] = "Attack against Large-size Targets";
    TOSStat["ATTACK_TYPE_PIERCING"] = "Piercing-type Attack";
    TOSStat["ATTACK_TYPE_SLASH"] = "Slash-type Attack";
    TOSStat["ATTACK_TYPE_STRIKE"] = "Strike-type Attack";
    TOSStat["ATTACK_MAGICAL"] = "Magic Attack";
    TOSStat["ATTACK_MAGICAL_AMPLIFICATION"] = "Magic Amplification";
    TOSStat["ATTACK_PHYSICAL"] = "Physical Attack";
    TOSStat["ATTACK_ANGLE"] = "Attack Angle";
    TOSStat["ATTACK_RANGE"] = "Attack Range";
    TOSStat["DEFENSE_ELEMENT_DARK"] = "Dark Property Resistance";
    TOSStat["DEFENSE_ELEMENT_EARTH"] = "Earth Property Resistance";
    TOSStat["DEFENSE_ELEMENT_FIRE"] = "Fire Property Resistance";
    TOSStat["DEFENSE_ELEMENT_HOLY"] = "Holy Property Resistance";
    TOSStat["DEFENSE_ELEMENT_ICE"] = "Ice Property Resistance";
    TOSStat["DEFENSE_ELEMENT_LIGHTNING"] = "Lightning Property Resistance";
    TOSStat["DEFENSE_ELEMENT_POISON"] = "Poison Property Resistance";
    TOSStat["DEFENSE_ELEMENT_PSYCHOKINESIS"] = "Psychokinesis Property Resistance";
    TOSStat["DEFENSE_TYPE_PIERCING"] = "Piercing Defense";
    TOSStat["DEFENSE_TYPE_SLASH"] = "Slash Defense";
    TOSStat["DEFENSE_TYPE_STRIKE"] = "Strike Defense";
    TOSStat["DEFENSE_MAGICAL"] = "Magic Defense";
    TOSStat["DEFENSE_PHYSICAL"] = "Physical Defense";
    TOSStat["ACCURACY"] = "Accuracy";
    TOSStat["EVASION"] = "Evasion";
    TOSStat["BLOCK"] = "Block";
    TOSStat["BLOCK_PENETRATION"] = "Block Penetration";
    TOSStat["BLOCK_RATE"] = "Block Rate";
    TOSStat["BLOCK_RATE_FINAL"] = "Final Block Rate";
    TOSStat["CRITICAL_ATTACK"] = "Critical Attack";
    TOSStat["CRITICAL_ATTACK_MAGICAL"] = "Critical Magic Attack";
    TOSStat["CRITICAL_DEFENSE"] = "Critical Resistance";
    TOSStat["CRITICAL_RATE"] = "Critical Rate";
    TOSStat["AOE_ATTACK_RATIO"] = "AoE Attack Ratio";
    TOSStat["AOE_DEFENSE_RATIO"] = "AoE Defense Ratio";
    TOSStat["MOVEMENT_SPEED"] = "Movement Speed";
    TOSStat["LOOTING_CHANCE"] = "Looting Chance";
    TOSStat["STAMINA"] = "Stamina";
    TOSStat["STAMINA_RECOVERY"] = "Stamina Recovery";
    TOSStat["UNKNOWN"] = "";
})(TOSStat || (TOSStat = {}));
var TOSStatService = EnumServiceFactory(TOSStat);
TOSStatService.comparator = function (a, b) {
    var i = Object.values(TOSStat).indexOf(a);
    var j = Object.values(TOSStat).indexOf(b);
    return (i < j) ? -1 : (i > j) ? 1 : 0;
};
TOSStatService.icon = function (stat) {
    return _service_tos_url_service__WEBPACK_IMPORTED_MODULE_0__["TOSUrlService"].Asset('assets/images/simulator_stat_' + stat.toLowerCase() + '.png');
};


/***/ }),

/***/ "./src/app/shared/domain/tos/tos-entity.model.ts":
/*!*******************************************************!*\
  !*** ./src/app/shared/domain/tos/tos-entity.model.ts ***!
  \*******************************************************/
/*! exports provided: Comparable, TOSEntity, TOSEntityLink */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Comparable", function() { return Comparable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSEntity", function() { return TOSEntity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSEntityLink", function() { return TOSEntityLink; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _service_tos_url_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../service/tos-url.service */ "./src/app/shared/service/tos-url.service.ts");
/* harmony import */ var _tos_domain__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tos-domain */ "./src/app/shared/domain/tos/tos-domain.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");




var COMPARATOR_ID = function (a, b) {
    var i = +a;
    var j = +b;
    return (i < j) ? -1 : (i > j) ? 1 : 0;
};
var STRING_INITIALIZED = '\u200B';
var Comparable = /** @class */ (function () {
    function Comparable() {
        this.$comparators = {};
    }
    return Comparable;
}());

var TOSEntity = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](TOSEntity, _super);
    function TOSEntity(Dataset, $json) {
        var _this = _super.call(this) || this;
        _this.Dataset = Dataset;
        _this.$json = $json;
        _this.$comparators['$ID'] = COMPARATOR_ID;
        return _this;
    }
    Object.defineProperty(TOSEntity.prototype, "$ID", {
        get: function () { return this.$lazyPropertyNumber('$ID'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSEntity.prototype, "$ID_NAME", {
        get: function () { return this.$lazyPropertyString('$ID_NAME'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSEntity.prototype, "Description", {
        get: function () { return this.$lazyPropertyStringMultiline('Description'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSEntity.prototype, "Icon", {
        get: function () {
            var icon = this.$lazyPropertyString('Icon');
            return icon
                ? _service_tos_url_service__WEBPACK_IMPORTED_MODULE_1__["TOSUrlService"].Asset('assets/icons/' + icon + '.png')
                : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSEntity.prototype, "Name", {
        get: function () { return this.$lazyPropertyString('Name'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSEntity.prototype, "Url", {
        get: function () {
            return this.url = this.url
                ? this.url
                : this.Dataset
                    ? _service_tos_url_service__WEBPACK_IMPORTED_MODULE_1__["TOSUrlService"].Route('/database/' + _tos_domain__WEBPACK_IMPORTED_MODULE_2__["TOSDataSetService"].toUrl(this.Dataset) + '/' + this.$ID)
                    : null;
        },
        enumerable: true,
        configurable: true
    });
    TOSEntity.trackBy = function (index, entity) { return entity.$ID; };
    TOSEntity.prototype.$lazyPropertyBoolean = function (prop) {
        return this.$json[prop] = typeof this.$json[prop] == 'boolean'
            ? this.$json[prop]
            : this.$json[prop] == 'True';
    };
    TOSEntity.prototype.$lazyPropertyEnum = function (prop, enumeration) {
        return this.$json[prop] = isNaN(+this.$json[prop])
            ? this.$json[prop]
            : this.$json[prop] != undefined
                ? Object.values(enumeration)[+this.$json[prop]]
                : null;
    };
    TOSEntity.prototype.$lazyPropertyJSONArray = function (prop, mapper, sorter) {
        var first = this.$json[prop] && this.$json[prop][0];
        if (first && isNaN(first) && !Array.isArray(first) && first.constructor != Object.prototype.constructor)
            return this.$json[prop];
        this.$json[prop] = this.$json[prop] && mapper && this.$json[prop].map(mapper) || this.$json[prop];
        this.$json[prop] = this.$json[prop] && sorter && this.$json[prop].sort(sorter) || this.$json[prop];
        this.$json[prop] = this.$json[prop] && this.$json[prop].filter(function (value) { return !!value; });
        return this.$json[prop];
    };
    TOSEntity.prototype.$lazyPropertyJSONObject = function (prop, mapper) {
        var _this = this;
        if (typeof this.$json[prop] == 'object')
            return this.$json[prop];
        this.$json[prop] = this.$json[prop] && JSON.parse(this.$json[prop]);
        this.$json[prop] && Object
            .keys(this.$json[prop])
            .forEach(function (key) { return _this.$json[prop][key] = mapper && mapper(_this.$json[prop][key]) || _this.$json[prop][key]; });
        return this.$json[prop];
    };
    TOSEntity.prototype.$lazyPropertyLink = function (prop, mapper) {
        if (Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["isObservable"])(this.$json[prop]))
            return this.$json[prop];
        if (this.$json[prop]) {
            var subject_1 = new rxjs__WEBPACK_IMPORTED_MODULE_3__["ReplaySubject"](1);
            var observable = /* typeof this.$json[prop] == 'string' && JSON.parse(this.$json[prop]) || */ this.$json[prop];
            observable = this.$json[prop + '$original'] = observable;
            observable = Array.isArray(observable) && observable.map(mapper) || mapper(observable);
            observable = Array.isArray(observable) && Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["forkJoin"])(observable) || observable;
            observable.subscribe(function (value) {
                subject_1.next(value);
                subject_1.complete();
            });
            return this.$json[prop] = subject_1.asObservable();
        }
        return null;
    };
    TOSEntity.prototype.$lazyPropertyLinkOriginal = function (propOriginal) {
        var prop = propOriginal + '$original';
        return this.$json[prop] = this.$json[prop] || this.$json[propOriginal];
        // Note: we now store the parsed JSON in the IndexedDB
        /*
        if (this.$json[prop] && typeof this.$json[prop] != 'string')
          return this.$json[prop];
    
        this.$json[prop] = this.$json[prop] || this.$json[propOriginal];
        this.$json[prop] = typeof this.$json[prop] == 'string' && JSON.parse(this.$json[prop]) || this.$json[prop + '$original'];
    
        return this.$json[prop];
        */
    };
    TOSEntity.prototype.$lazyPropertyNumber = function (prop, mapper) {
        if (mapper === void 0) { mapper = function (value) { return value; }; }
        return this.$json[prop] = typeof this.$json[prop] == 'number'
            ? this.$json[prop]
            : this.$json[prop] != undefined
                ? mapper(+this.$json[prop])
                : null;
    };
    TOSEntity.prototype.$lazyPropertyString = function (prop) {
        return this.$json[prop] = typeof this.$json[prop] == 'string'
            ? this.$json[prop]
            : this.$json[prop] + '';
    };
    TOSEntity.prototype.$lazyPropertyStringMultiline = function (prop, mapper) {
        if (mapper === void 0) { mapper = function (value) { return value; }; }
        return this.$json[prop] = this.$json[prop] && this.$json[prop][0] == STRING_INITIALIZED
            ? this.$json[prop]
            : this.$json[prop]
                ? STRING_INITIALIZED + mapper(this.$json[prop])
                    .replace(/{nl}/g, '\n')
                    .replace(/{b}?(.*){b}/g, '<b>$1</b>')
                    .trim()
                : null;
    };
    return TOSEntity;
}(Comparable));

var TOSEntityLink = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](TOSEntityLink, _super);
    function TOSEntityLink() {
        return _super.call(this, null, null) || this;
    }
    Object.defineProperty(TOSEntityLink.prototype, "$ID", {
        get: function () { return this.Link && this.Link.$ID; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSEntityLink.prototype, "$ID_NAME", {
        get: function () { return this.Link && this.Link.$ID_NAME; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSEntityLink.prototype, "Description", {
        get: function () { return this.Link && this.Link.Description; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSEntityLink.prototype, "Icon", {
        get: function () { return this.Link && this.Link.Icon; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSEntityLink.prototype, "Name", {
        get: function () { return this.Link && this.Link.Name; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSEntityLink.prototype, "Url", {
        get: function () { return this.Link && this.Link.Url; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSEntityLink.prototype, "Selected", {
        get: function () { return this.Link && this.Link.Selected; },
        set: function (value) { if (this.Link)
            this.Link.Selected = value; },
        enumerable: true,
        configurable: true
    });
    return TOSEntityLink;
}(TOSEntity));



/***/ }),

/***/ "./src/app/shared/service/CRUD.resolver.ts":
/*!*************************************************!*\
  !*** ./src/app/shared/service/CRUD.resolver.ts ***!
  \*************************************************/
/*! exports provided: CRUDResolver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CRUDResolver", function() { return CRUDResolver; });
/* harmony import */ var _domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../domain/tos/tos-domain */ "./src/app/shared/domain/tos/tos-domain.ts");
/* harmony import */ var _domain_tos_tos_domain_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../domain/tos/tos-domain.service */ "./src/app/shared/domain/tos/tos-domain.service.ts");


var CRUDResolver = /** @class */ (function () {
    function CRUDResolver(dataset) {
        this.dataset = dataset;
    }
    CRUDResolver.prototype.resolve = function (route, state) {
        var dataset = _domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_0__["TOSDataSetService"].toProperty(this.dataset);
        if (route.params[CRUDResolver.PARAM_ID])
            return _domain_tos_tos_domain_service__WEBPACK_IMPORTED_MODULE_1__["TOSDomainService"][dataset + 'ById'](+route.params[CRUDResolver.PARAM_ID]);
        var page = {
            filter: route.queryParams[CRUDResolver.PARAM_FILTER],
            pageNumber: +route.queryParams[CRUDResolver.PARAM_PAGE] || 1,
            pageSize: CRUDResolver.PAGE_SIZE,
            sort: route.queryParams[CRUDResolver.PARAM_SORT],
        };
        return _domain_tos_tos_domain_service__WEBPACK_IMPORTED_MODULE_1__["TOSDomainService"][dataset](page);
    };
    CRUDResolver.PAGE_SIZE = 15;
    CRUDResolver.PARAM_ID = 'id';
    CRUDResolver.PARAM_FILTER = 'filter';
    CRUDResolver.PARAM_PAGE = 'page';
    CRUDResolver.PARAM_SORT = 'sort';
    return CRUDResolver;
}());



/***/ }),

/***/ "./src/app/shared/service/analytics.service.ts":
/*!*****************************************************!*\
  !*** ./src/app/shared/service/analytics.service.ts ***!
  \*****************************************************/
/*! exports provided: AnalyticsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnalyticsService", function() { return AnalyticsService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");



var AnalyticsService = /** @class */ (function () {
    function AnalyticsService(router) {
        var _this = this;
        this.router = router;
        this.router.events.subscribe(function (event) {
            if (event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_2__["NavigationEnd"]) {
                // Track page views with Google Analytics
                var pageOld = _this.page;
                var pageNew = _this.page = event.urlAfterRedirects.split('?')[0];
                if (pageOld != pageNew)
                    window['dataLayer'].push({ event: 'pageview', page: { path: pageNew } });
            }
        });
    }
    AnalyticsService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], AnalyticsService);
    return AnalyticsService;
}());



/***/ }),

/***/ "./src/app/shared/service/clipboard.service.ts":
/*!*****************************************************!*\
  !*** ./src/app/shared/service/clipboard.service.ts ***!
  \*****************************************************/
/*! exports provided: ClipboardService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClipboardService", function() { return ClipboardService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var ClipboardService = /** @class */ (function () {
    function ClipboardService() {
    }
    // Thanks to https://stackoverflow.com/a/49121680
    ClipboardService.prototype.write = function (text) {
        var selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        selBox.value = text;
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand('copy');
        document.body.removeChild(selBox);
    };
    ClipboardService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], ClipboardService);
    return ClipboardService;
}());



/***/ }),

/***/ "./src/app/shared/service/integrations/tiny-url.service.ts":
/*!*****************************************************************!*\
  !*** ./src/app/shared/service/integrations/tiny-url.service.ts ***!
  \*****************************************************************/
/*! exports provided: TinyUrlService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TinyUrlService", function() { return TinyUrlService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");




var TinyUrlService = /** @class */ (function () {
    function TinyUrlService(http) {
        this.http = http;
    }
    TinyUrlService.prototype.create = function (url) {
        return this.http
            .post('/api/tinyurl/create', { url: url }, { responseType: 'text' })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (value) { return (value + '').split('http://tinyurl.com/')[1]; }));
    };
    TinyUrlService.prototype.parse = function (id) {
        return this.http
            .get('/api/tinyurl/get', { params: { id: id }, responseType: 'text' });
    };
    TinyUrlService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], TinyUrlService);
    return TinyUrlService;
}());



/***/ }),

/***/ "./src/app/shared/service/integrations/tos-neet.service.ts":
/*!*****************************************************************!*\
  !*** ./src/app/shared/service/integrations/tos-neet.service.ts ***!
  \*****************************************************************/
/*! exports provided: TosNeetService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TosNeetService", function() { return TosNeetService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _domain_tos_tos_build__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../domain/tos/tos-build */ "./src/app/shared/domain/tos/tos-build.ts");
/* harmony import */ var _domain_tos_tos_domain_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../domain/tos/tos-domain.service */ "./src/app/shared/domain/tos/tos-domain.service.ts");
/* harmony import */ var rxjs_internal_compatibility__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/internal-compatibility */ "./node_modules/rxjs/_esm5/internal-compatibility/index.js");
/* harmony import */ var _domain_tos_region__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../domain/tos-region */ "./src/app/shared/domain/tos-region.ts");






var TosNeetService = /** @class */ (function () {
    function TosNeetService() {
    }
    TosNeetService.prototype.decode = function (encoded) {
        var _this = this;
        return Object(rxjs_internal_compatibility__WEBPACK_IMPORTED_MODULE_4__["fromPromise"])((function () { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
            var build, partsEncoded, jobsDecoded, ranksEncoded, _loop_1, i, i, skillsEncoded, j, job, skills, skillClassID, skillLevel, skill, skillsIDs;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        build = _domain_tos_tos_build__WEBPACK_IMPORTED_MODULE_2__["TOSSimulatorBuild"].new(_domain_tos_region__WEBPACK_IMPORTED_MODULE_5__["TOSRegionService"].get());
                        partsEncoded = encoded.split('.');
                        jobsDecoded = [];
                        ranksEncoded = partsEncoded[0];
                        _loop_1 = function (i) {
                            var jobTree, jobClassName, job;
                            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        jobTree = ranksEncoded[0];
                                        jobClassName = 'Char' + jobTree + "_" + parseInt(ranksEncoded[i], 36);
                                        return [4 /*yield*/, _domain_tos_tos_domain_service__WEBPACK_IMPORTED_MODULE_3__["TOSDomainService"].jobsByIdName(jobClassName).toPromise()];
                                    case 1:
                                        job = _a.sent();
                                        if (!job) return [3 /*break*/, 3];
                                        if (!jobsDecoded.find(function (value) { return value.$ID == job.$ID; }))
                                            jobsDecoded.push(job);
                                        return [4 /*yield*/, build.jobAdd$(job)];
                                    case 2:
                                        _a.sent();
                                        _a.label = 3;
                                    case 3: return [2 /*return*/];
                                }
                            });
                        };
                        i = 1;
                        _a.label = 1;
                    case 1:
                        if (!(i < ranksEncoded.length)) return [3 /*break*/, 4];
                        return [5 /*yield**/, _loop_1(i)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4:
                        i = 1;
                        _a.label = 5;
                    case 5:
                        if (!(i < partsEncoded.length)) return [3 /*break*/, 12];
                        skillsEncoded = partsEncoded[i];
                        j = 0;
                        _a.label = 6;
                    case 6:
                        if (!(j < skillsEncoded.length)) return [3 /*break*/, 11];
                        job = jobsDecoded[i - 1];
                        return [4 /*yield*/, _domain_tos_tos_domain_service__WEBPACK_IMPORTED_MODULE_3__["TOSDomainService"].skillsByJob(job).toPromise()];
                    case 7:
                        skills = _a.sent();
                        skillClassID = skills[0].$ID;
                        skillClassID = parseInt(skillsEncoded[j], 36) + (skillClassID - skillClassID % 100);
                        skillLevel = parseInt(skillsEncoded[j + 1], 36);
                        return [4 /*yield*/, _domain_tos_tos_domain_service__WEBPACK_IMPORTED_MODULE_3__["TOSDomainService"].skillsById(skillClassID).toPromise()];
                    case 8:
                        skill = _a.sent();
                        skillsIDs = skills.map(function (value) { return value.$ID; });
                        if (!(skill && skillsIDs.indexOf(skill.$ID) > -1)) return [3 /*break*/, 10];
                        return [4 /*yield*/, build.skillLevelIncrement$(skill, skillLevel)];
                    case 9:
                        _a.sent();
                        _a.label = 10;
                    case 10:
                        j += 2;
                        return [3 /*break*/, 6];
                    case 11:
                        i++;
                        return [3 /*break*/, 5];
                    case 12: return [2 /*return*/, build];
                }
            });
        }); })());
    };
    TosNeetService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], TosNeetService);
    return TosNeetService;
}());



/***/ }),

/***/ "./src/app/shared/service/lua.service.ts":
/*!***********************************************!*\
  !*** ./src/app/shared/service/lua.service.ts ***!
  \***********************************************/
/*! exports provided: LUAService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LUAService", function() { return LUAService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../domain/tos/tos-domain */ "./src/app/shared/domain/tos/tos-domain.ts");
/* harmony import */ var _domain_tos_tos_domain_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../domain/tos/tos-domain.service */ "./src/app/shared/domain/tos/tos-domain.service.ts");
/* harmony import */ var _domain_tos_tos_build__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../domain/tos/tos-build */ "./src/app/shared/domain/tos/tos-build.ts");
/* harmony import */ var rxjs_internal_compatibility__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/internal-compatibility */ "./node_modules/rxjs/_esm5/internal-compatibility/index.js");






var LUAService = /** @class */ (function () {
    function LUAService() {
    }
    LUAService_1 = LUAService;
    LUAService.eval = function (build, source, context) {
        var _this = this;
        return Object(rxjs_internal_compatibility__WEBPACK_IMPORTED_MODULE_5__["fromPromise"])((function () { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
            var func;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.parse(build, source, context).toPromise()];
                    case 1:
                        func = (_a.sent()).func;
                        return [2 /*return*/, eval(func.join('\n'))];
                }
            });
        }); })());
    };
    LUAService.human = function (build, source, context) {
        var _this = this;
        return Object(rxjs_internal_compatibility__WEBPACK_IMPORTED_MODULE_5__["fromPromise"])((function () { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
            var func;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.parse(build, source, context, true).toPromise()];
                    case 1:
                        func = (_a.sent()).func;
                        return [4 /*yield*/, Promise.all(func.map(function (line) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                                var lineOriginal, regexGetProp, regexAbility, match, attribute;
                                return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            lineOriginal = line;
                                            regexGetProp = /TryGetProp\((\w+), "(\w+)"\)/g;
                                            regexAbility = /GetAbility\(pc, ["'](.+)["']\)/g;
                                            line = line.replace(/\/\*{b}\*\/(.+?)\/\*{b}\*\//g, '<b>$1</b>'); // Apply bolds
                                            line = line.replace(/(?:pc\.(\w+))+/g, 'player.$1'); // Rename pc to player
                                            line = line.replace(/!=/g, 'not');
                                            line = line.replace(/&&/g, 'and');
                                            line = line.replace(/null/g, 'Null');
                                            // TryGetProp(a, b) - return the 'b' property of the 'a' object
                                            while (match = regexGetProp.exec(lineOriginal)) {
                                                line = line.replace(match[0], match[1] + '.' + match[2]);
                                            }
                                            _a.label = 1;
                                        case 1:
                                            if (!(match = regexAbility.exec(lineOriginal))) return [3 /*break*/, 3];
                                            return [4 /*yield*/, _domain_tos_tos_domain_service__WEBPACK_IMPORTED_MODULE_3__["TOSDomainService"].attributesByIdName(match[1]).toPromise()];
                                        case 2:
                                            attribute = _a.sent();
                                            if (attribute)
                                                line = line.replace(match[0], '<b>[' + attribute.Name + ']</b>');
                                            else
                                                line = line.replace(match[0], 'Null');
                                            return [3 /*break*/, 1];
                                        case 3: return [2 /*return*/, line];
                                    }
                                });
                            }); }))];
                    case 2:
                        func = _a.sent();
                        return [2 /*return*/, func
                                .slice(1, -1)
                                .join('\n')];
                }
            });
        }); })());
    };
    LUAService.parse = function (build, source, context, human) {
        var _this = this;
        return Object(rxjs_internal_compatibility__WEBPACK_IMPORTED_MODULE_5__["fromPromise"])((function () { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
            var dependencies, skill, player, func;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dependencies = [];
                        skill = context && context['skill'] || {};
                        player = context && context['player'] || {};
                        player.ClassName = 'PC';
                        player.JobHistoryList = build.Jobs && build.Jobs.map(function (value) { return value.$ID; });
                        player.Lv = _domain_tos_tos_build__WEBPACK_IMPORTED_MODULE_4__["LEVEL_LIMIT"]; // TODO: get level from build
                        context && delete context['skill'];
                        context && delete context['player'];
                        return [4 /*yield*/, Promise.all(source.map(function (line) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                                var lineOriginal, regexGetJobGrade, regexGetJobLevelByName, regexGetSkill, regexPlayer, regexSkill, match, jobName, job, jobName, job, skillName, skill_1, prop, prop;
                                return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            lineOriginal = line;
                                            regexGetJobGrade = /GetJobGradeByName\(pc, (.+)\)/g;
                                            regexGetJobLevelByName = /GetJobLevelByName\(pc, curJobClsName\)/g;
                                            regexGetSkill = /GetSkill\(pc, (.+)\)/g;
                                            regexPlayer = /(?:pc\.(\w+))+/g;
                                            regexSkill = /(?:skill\.(\w+))+/g;
                                            // GetJobLevelByName(pc, curJobClsName);
                                            line = line.replace('GetTotalJobCount(pc)', build.Rank + '');
                                            _a.label = 1;
                                        case 1:
                                            if (!(match = regexGetJobGrade.exec(lineOriginal))) return [3 /*break*/, 3];
                                            jobName = (['"', "'"].indexOf(match[1][0]) > -1 ? match[1] : context[match[1]]).slice(1, -1);
                                            return [4 /*yield*/, _domain_tos_tos_domain_service__WEBPACK_IMPORTED_MODULE_3__["TOSDomainService"].jobsByIdName(jobName).toPromise()];
                                        case 2:
                                            job = _a.sent();
                                            line = line.replace(match[0], build.jobCircle(job) + '');
                                            return [3 /*break*/, 1];
                                        case 3:
                                            if (!(match = regexGetJobLevelByName.exec(lineOriginal))) return [3 /*break*/, 5];
                                            jobName = player['JobName'].slice(1, -1);
                                            return [4 /*yield*/, _domain_tos_tos_domain_service__WEBPACK_IMPORTED_MODULE_3__["TOSDomainService"].jobsByIdName(jobName).toPromise()];
                                        case 4:
                                            job = _a.sent();
                                            line = line.replace(match[0], build.jobCircle(job) + '');
                                            return [3 /*break*/, 3];
                                        case 5:
                                            if (!(match = regexGetSkill.exec(lineOriginal))) return [3 /*break*/, 7];
                                            skillName = (['"', "'"].indexOf(match[1][0]) > -1 ? match[1] : context[match[1]]).slice(1, -1);
                                            return [4 /*yield*/, _domain_tos_tos_domain_service__WEBPACK_IMPORTED_MODULE_3__["TOSDomainService"].skillsByIdName(skillName).toPromise()];
                                        case 6:
                                            skill_1 = _a.sent();
                                            line = line.replace(match[0], JSON.stringify({ LevelByDB: build.skillLevel(skill_1) }));
                                            return [3 /*break*/, 5];
                                        case 7:
                                            // Player properties - replace available properties in-place, make remaining ones bold
                                            while (match = regexPlayer.exec(lineOriginal)) {
                                                prop = match[1];
                                                // Hotfix: Ignore in case we're the left operand (e.g. skill.SklSr = 17)
                                                if (lineOriginal.indexOf('=') > lineOriginal.indexOf(prop))
                                                    continue;
                                                if (player[prop] != undefined && prop != 'Lv') {
                                                    line = line.replace(match[0], player[prop]);
                                                }
                                                else {
                                                    // Note: we need to slice in case there are multiple occurrences on the string (as we replace with the same matched value)
                                                    line =
                                                        line.slice(0, match.index) +
                                                            line.slice(match.index).replace(match[0], '/*{b}*/' + match[0] + '/*{b}*/');
                                                }
                                                player[prop] = player[prop] || 1;
                                                // Note: some stats are runtime only (e.g. MINPATK)
                                                dependencies.push(LUAService_1.STATS_RUNTIME[prop] + '');
                                            }
                                            // Skill properties - replace available properties in-place, make remaining ones bold
                                            while (match = regexSkill.exec(lineOriginal)) {
                                                prop = match[1];
                                                // Hotfix: Ignore in case we're the left operand (e.g. skill.SklSr = 17)
                                                if (lineOriginal.indexOf('=') > lineOriginal.indexOf(prop))
                                                    continue;
                                                if (skill[prop] != undefined && prop != 'Level')
                                                    line = line.replace(match[0], skill[prop]);
                                                else
                                                    // Note: we need to slice in case there are multiple occurrences on the string (as we replace with the same matched value)
                                                    line =
                                                        line.slice(0, match.index) +
                                                            line.slice(match.index).replace(match[0], '/*{b}*/' + match[0] + '/*{b}*/');
                                            }
                                            return [2 /*return*/, line];
                                    }
                                });
                            }); }))];
                    case 1:
                        // Process source code
                        source = _a.sent();
                        func = [];
                        func.push('(function () {');
                        // Initialize context
                        if (!human) {
                            func.push('var pc = ' + JSON.stringify(player) + ';');
                            func.push('var skill = ' + JSON.stringify(skill) + ';');
                            func = func.concat(LUAService_1.LUA_CONTEXT);
                            Object
                                .keys(context)
                                .forEach(function (key) {
                                var value = typeof context[key] == 'object' ? JSON.parse(context[key]) : context[key];
                                func.push('var ' + key + ' = ' + value + ';');
                            });
                        }
                        // Execute
                        func = func.concat(source);
                        func.push('}())');
                        //console.log('eval', func.join('\n'));
                        return [2 /*return*/, { dependencies: dependencies, func: func }];
                }
            });
        }); })());
    };
    var LUAService_1;
    // Some global functions used by IMC
    LUAService.LUA_CONTEXT = [
        '// LUA CONTEXT BEGIN ---------------------------',
        'var PARTY_NORMAL = 0;',
        'var GetAbility = (a, b) => null;',
        'var GetClassList = (a) => null;',
        'var GetClassByNameFromList = (a) => null;',
        'var GetExProp = (a, b) => null;',
        'var GetJobHistoryString = (a) => null;',
        'var GetJobHistoryList = (pc) => pc.JobHistoryList;',
        'var GetMyJobHistoryString = (a) => null;',
        'var GetSumOfEquipItem = (a, b) => 0;',
        'var GetZoneName = (a) => null;',
        'var TryGetProp = (a, b, c) => a && a[b] || c;',
        'var IsBuffApplied = (a, b) => null;',
        'var IsRaidField = (a) => 0;',
        'var IsPVPField = (a) => 0;',
        'var IsPVPServer = (a) => 0;',
        'var IsServerSection = (a) => 0;',
        'var IsServerObj = (a) => 0;',
        'var SCR_COMMON_COOLDOWN_DECREASE = (pc, basicCooldown) => basicCooldown;',
        'var string = { find: (a, b) => a.indexOf(b) != -1 ? a.indexOf(b) : null };',
        'var StringSplit = (a, b) => a.split(b);',
        'var tonumber = (a) => +a;',
        'var i = 0;',
        'var owner = pc;',
        'var session = { party: {' +
            '   GetMyPartyObj: (a) => null,' +
            '   GetPartyMemberList: (a) => null,' +
            '} };',
        'var skillOwner = pc;',
        'var value = 0;',
        'var zone = null;',
        '// LUA CONTEXT END ---------------------------',
    ];
    // Some player stats used by the formulas
    LUAService.STATS_RUNTIME = {
        'CON': _domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_2__["TOSStat"].CON,
        'DEX': _domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_2__["TOSStat"].DEX,
        'INT': _domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_2__["TOSStat"].INT,
        'MNA': _domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_2__["TOSStat"].SPR,
        'STR': _domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_2__["TOSStat"].STR,
        'Lv': 'Level',
        'HR': _domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_2__["TOSStat"].ACCURACY,
        'MHP': _domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_2__["TOSStat"].HP,
        'MSP': _domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_2__["TOSStat"].SP,
        'SR': _domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_2__["TOSStat"].AOE_ATTACK_RATIO,
        'MSPD': _domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_2__["TOSStat"].MOVEMENT_SPEED,
        'MDEF': _domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_2__["TOSStat"].DEFENSE_MAGICAL,
        'DEF': _domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_2__["TOSStat"].DEFENSE_PHYSICAL,
        'PATK': _domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_2__["TOSStat"].ATTACK_PHYSICAL,
        'MATK': _domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_2__["TOSStat"].ATTACK_MAGICAL,
        'MAXATK': _domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_2__["TOSStat"].ATTACK_LIMIT_MAX,
        'MAXMATK': 'Maximum Magic Attack',
        'MAXPATK': 'Minimum Physical Attack',
        'MAXPATK_SUB': 'Maximum Physical Attack (Sub-Weapon)',
        'MINATK': _domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_2__["TOSStat"].ATTACK_LIMIT_MIN,
        'MINMATK': 'Minimum Magic Attack',
        'MINPATK': 'Minimum Physical Attack',
        'MINPATK_SUB': 'Minimum Physical Attack (Sub-Weapon)',
    };
    LUAService = LUAService_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], LUAService);
    return LUAService;
}());



/***/ }),

/***/ "./src/app/shared/service/route.service.ts":
/*!*************************************************!*\
  !*** ./src/app/shared/service/route.service.ts ***!
  \*************************************************/
/*! exports provided: RouteService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RouteService", function() { return RouteService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _domain_tos_region__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../domain/tos-region */ "./src/app/shared/domain/tos-region.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _domain_tos_tos_domain_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../domain/tos/tos-domain.service */ "./src/app/shared/domain/tos/tos-domain.service.ts");
/* harmony import */ var _shell_loading_loading_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../shell/loading/loading.service */ "./src/app/shell/loading/loading.service.ts");






var RouteService = /** @class */ (function () {
    function RouteService(domain, loading) {
        this.domain = domain;
        this.loading = loading;
    }
    RouteService.UrlMatcher = function (segments, group, route) {
        var region = segments.length
            ? _domain_tos_region__WEBPACK_IMPORTED_MODULE_2__["TOSRegionService"].valueOf(segments[0].path)
            : null;
        //console.log('UrlMatcher region', region, TOSRegionService.region)
        return region == null && segments
            ? { consumed: [segments[0]], posParams: { redirect: segments[0] } }
            : null;
    };
    RouteService.prototype.canActivate = function (route, state) {
        var _this = this;
        return this.loading.installComplete$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["switchMap"])(function () { return _this.loading.updateComplete$; }));
    };
    RouteService.prototype.canDeactivate = function (component, currentRoute, currentState, nextState) {
        return this.loading.updateComplete$;
    };
    RouteService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_domain_tos_tos_domain_service__WEBPACK_IMPORTED_MODULE_4__["TOSDomainService"],
            _shell_loading_loading_service__WEBPACK_IMPORTED_MODULE_5__["LoadingService"]])
    ], RouteService);
    return RouteService;
}());



/***/ }),

/***/ "./src/app/shared/service/seo.service.ts":
/*!***********************************************!*\
  !*** ./src/app/shared/service/seo.service.ts ***!
  \***********************************************/
/*! exports provided: SEOService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SEOService", function() { return SEOService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../domain/tos/tos-domain */ "./src/app/shared/domain/tos/tos-domain.ts");
/* harmony import */ var _domain_tos_tos_domain_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../domain/tos/tos-domain.service */ "./src/app/shared/domain/tos/tos-domain.service.ts");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");






var SEOService = /** @class */ (function () {
    function SEOService(application, meta, router, title) {
        var _this = this;
        this.application = application;
        this.meta = meta;
        this.router = router;
        this.title = title;
        this.router.events.subscribe(function (event) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
            var url, urlTitle, urlDescription, parts_1, dataset, id, entity;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_2__["NavigationEnd"])) return [3 /*break*/, 4];
                        url = event.urlAfterRedirects;
                        url = url.indexOf('?') > 0 ? url.slice(0, url.indexOf('?')) : url;
                        urlTitle = 'Tree of Savior - Open-source Database and Skill Simulator';
                        urlDescription = "\n          A fan-made and open-source Database & Simulator for Tree of Savior.\n          Includes iTOS, jTOS, kTOS and kTEST regions.\n        ";
                        if (url.indexOf('/simulator') > 0) {
                            urlTitle = 'Skill Simulator - Tree of Savior';
                            urlDescription = "Plan your builds and share with other players.";
                        }
                        if (!(url.indexOf('/database') > 0)) return [3 /*break*/, 3];
                        parts_1 = url.slice(url.indexOf('/database')).split('/').slice(2);
                        dataset = Object.values(_domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_3__["TOSDataSet"]).find(function (value) { return _domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_3__["TOSDataSetService"].toUrl(value) == parts_1[0]; });
                        id = parts_1.length > 1 ? +parts_1[1] : null;
                        if (!id) return [3 /*break*/, 2];
                        return [4 /*yield*/, _domain_tos_tos_domain_service__WEBPACK_IMPORTED_MODULE_4__["TOSDomainService"][_domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_3__["TOSDataSetService"].toProperty(dataset) + 'ById'](id).toPromise()];
                    case 1:
                        entity = _a.sent();
                        urlTitle = entity.Name + ' - ' + _domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_3__["TOSDataSetService"].toLabel(dataset) + ' - Tree of Savior';
                        urlDescription = entity.Description;
                        return [3 /*break*/, 3];
                    case 2:
                        urlTitle = _domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_3__["TOSDataSetService"].toLabel(dataset) + ' - Tree of Savior';
                        urlDescription = 'List of ' + _domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_3__["TOSDataSetService"].toLabel(dataset) + ', with advanced filtering and sorting';
                        _a.label = 3;
                    case 3:
                        this.meta.updateTag({ name: 'description', content: urlDescription });
                        this.title.setTitle(urlTitle);
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    }
    SEOService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ApplicationRef"], _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__["Meta"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__["Title"]])
    ], SEOService);
    return SEOService;
}());



/***/ }),

/***/ "./src/app/shared/service/sw.service.ts":
/*!**********************************************!*\
  !*** ./src/app/shared/service/sw.service.ts ***!
  \**********************************************/
/*! exports provided: SWService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SWService", function() { return SWService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _tos_url_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tos-url.service */ "./src/app/shared/service/tos-url.service.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");






var SWService = /** @class */ (function () {
    function SWService() {
        var _this = this;
        this.WORKER_NONCE = 0;
        this.workerHandler = {};
        this.enabled && navigator.serviceWorker
            .register(_tos_url_service__WEBPACK_IMPORTED_MODULE_2__["TOSUrlService"].WORKER_SW())
            .then(function (value) { return _this.workerRegistration = value; });
    }
    Object.defineProperty(SWService.prototype, "enabled", {
        get: function () { return _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production && 'serviceWorker' in navigator; },
        enumerable: true,
        configurable: true
    });
    SWService.prototype.installComplete = function () {
        return this.workerRegistration && !!this.workerRegistration.active;
    };
    SWService.prototype.updateCheck$ = function () {
        return this
            .postMessage(WorkerCommand.UPDATE_CHECK)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (value) { return !!value; }));
    };
    SWService.prototype.updateInstall = function () {
        this.postMessage(WorkerCommand.UPDATE_INSTALL);
    };
    SWService.prototype.postMessage = function (cmd, payload) {
        var _this = this;
        var nonce = this.WORKER_NONCE++;
        var message = { cmd: cmd, nonce: nonce, payload: payload };
        var subject = this.workerHandler[nonce] = new rxjs__WEBPACK_IMPORTED_MODULE_4__["Subject"]();
        var worker = navigator.serviceWorker;
        worker.onmessage = function (event) { return _this.onMessage(event); };
        worker.controller && worker.controller.postMessage(message);
        return subject.asObservable();
    };
    SWService.prototype.onMessage = function (event) {
        var message = event.data;
        var handler = this.workerHandler[message.nonce];
        handler.next(message.payload);
        handler.complete();
        if (message.cmd == WorkerCommand.UPDATE_INSTALL)
            location.reload();
    };
    SWService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], SWService);
    return SWService;
}());

var WorkerCommand;
(function (WorkerCommand) {
    WorkerCommand["UPDATE_CHECK"] = "UPDATE_CHECK";
    WorkerCommand["UPDATE_INSTALL"] = "UPDATE_INSTALL";
})(WorkerCommand || (WorkerCommand = {}));


/***/ }),

/***/ "./src/app/shared/service/theme.service.ts":
/*!*************************************************!*\
  !*** ./src/app/shared/service/theme.service.ts ***!
  \*************************************************/
/*! exports provided: ThemeService, Theme */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ThemeService", function() { return ThemeService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Theme", function() { return Theme; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var KEY_THEME = 'theme';
var ThemeService = /** @class */ (function () {
    function ThemeService() {
        this.themeChange = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.style = document.getElementById('bootstrap-theme');
        this.set(+localStorage.getItem(KEY_THEME) || Theme.LIGHT);
    }
    ThemeService.prototype.is = function (theme) { return this.theme == theme; };
    ThemeService.prototype.subscribe = function (handler) { handler(this.theme); return this.themeChange.subscribe(handler); };
    ThemeService.prototype.toggle = function () { this.set(this.theme == Theme.LIGHT ? Theme.DARK : Theme.LIGHT); };
    ThemeService.prototype.set = function (theme) {
        var href = this.style.getAttribute('href');
        if (theme == Theme.LIGHT)
            href = 'assets/themes/flatly.min.css';
        if (theme == Theme.DARK)
            href = 'assets/themes/darkly.min.css';
        this.theme = theme;
        this.themeChange.emit(this.theme);
        this.style.setAttribute('href', href);
        localStorage.setItem(KEY_THEME, theme + '');
    };
    ThemeService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], ThemeService);
    return ThemeService;
}());

var Theme;
(function (Theme) {
    Theme[Theme["UNKNOWN"] = 0] = "UNKNOWN";
    Theme[Theme["DARK"] = 1] = "DARK";
    Theme[Theme["LIGHT"] = 2] = "LIGHT";
})(Theme || (Theme = {}));


/***/ }),

/***/ "./src/app/shared/service/tos-search.service.ts":
/*!******************************************************!*\
  !*** ./src/app/shared/service/tos-search.service.ts ***!
  \******************************************************/
/*! exports provided: TOSSearchService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSSearchService", function() { return TOSSearchService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _domain_tos_tos_domain_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../domain/tos/tos-domain.service */ "./src/app/shared/domain/tos/tos-domain.service.ts");
/* harmony import */ var _domain_tos_region__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../domain/tos-region */ "./src/app/shared/domain/tos-region.ts");
/* harmony import */ var _domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../domain/tos/tos-domain */ "./src/app/shared/domain/tos/tos-domain.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _tos_url_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./tos-url.service */ "./src/app/shared/service/tos-url.service.ts");
/* harmony import */ var _shell_loading_loading_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../shell/loading/loading.service */ "./src/app/shell/loading/loading.service.ts");









var TOSSearchService = /** @class */ (function () {
    function TOSSearchService(loading) {
        var _this = this;
        this.loading = loading;
        this.MESSAGE_ID = 0;
        this.isLoaded = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](false);
        this.workerHandlers = {};
        TOSSearchService_1.instance = this;
        this.onWorkerMessage = this.onWorkerMessage.bind(this);
        this.loading.installComplete$.subscribe(function (value) { return _this.onInstallComplete(value); });
    }
    TOSSearchService_1 = TOSSearchService;
    Object.defineProperty(TOSSearchService, "Instance", {
        get: function () { return TOSSearchService_1.instance; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TOSSearchService.prototype, "isLoaded$", {
        get: function () { return this.isLoaded.asObservable(); },
        enumerable: true,
        configurable: true
    });
    TOSSearchService.prototype.search = function (dataset, query, page) {
        return this
            .postMessage(WorkerCommand.QUERY, { dataset: dataset, page: page, query: query }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["switchMap"])(function (result) { return result && result.length && Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["forkJoin"])(result.map(function (value) {
            var file = value['ref'].split('#')[0];
            var id = +value['ref'].split('#')[1];
            var dataset = Object.values(_domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_5__["TOSDataSet"]).find(function (value2) { return file == value2; });
            return _domain_tos_tos_domain_service__WEBPACK_IMPORTED_MODULE_3__["TOSDomainService"][_domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_5__["TOSDataSetService"].toProperty(dataset) + 'ById'](id);
        })) || Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])([]); }), // Read more: https://github.com/ReactiveX/rxjs/issues/2816
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["map"])(function (value) { return ({ page: page, response: value }); }));
    };
    TOSSearchService.prototype.onInstallComplete = function (value) {
        var _this = this;
        this.isLoaded.next(false);
        this.subscriptionLoad && this.subscriptionLoad.unsubscribe();
        this.subscriptionLoad = this
            .postMessage(WorkerCommand.LOAD, { region: _domain_tos_region__WEBPACK_IMPORTED_MODULE_4__["TOSRegionService"].get() })
            .subscribe(function (value) { return _this.isLoaded.next(true); });
    };
    TOSSearchService.prototype.onWorkerMessage = function (event) {
        var message = event.data;
        var subject = this.workerHandlers[message.id];
        //console.log('onWorkerMessage', this.dataset, message);
        subject.next(message.payload);
        subject.complete();
        this.workerHandlers[message.id] = null;
    };
    TOSSearchService.prototype.postMessage = function (cmd, payload) {
        //console.trace('postMessage', this.dataset, cmd);
        var message = {
            cmd: cmd,
            id: this.MESSAGE_ID++,
            payload: payload
        };
        var subject = this.workerHandlers[message.id] = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        var worker = this.worker = this.worker || new Worker(_tos_url_service__WEBPACK_IMPORTED_MODULE_7__["TOSUrlService"].WORKER_LUNR());
        worker.onmessage = this.onWorkerMessage;
        worker.postMessage(message);
        return subject.asObservable();
    };
    var TOSSearchService_1;
    TOSSearchService = TOSSearchService_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_shell_loading_loading_service__WEBPACK_IMPORTED_MODULE_8__["LoadingService"]])
    ], TOSSearchService);
    return TOSSearchService;
}());

var WorkerCommand;
(function (WorkerCommand) {
    WorkerCommand["LOAD"] = "load";
    WorkerCommand["QUERY"] = "query";
})(WorkerCommand || (WorkerCommand = {}));


/***/ }),

/***/ "./src/app/shared/service/tos-url.service.ts":
/*!***************************************************!*\
  !*** ./src/app/shared/service/tos-url.service.ts ***!
  \***************************************************/
/*! exports provided: TOSUrlService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOSUrlService", function() { return TOSUrlService; });
/* harmony import */ var _domain_tos_region__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../domain/tos-region */ "./src/app/shared/domain/tos-region.ts");

var TOSUrlService = /** @class */ (function () {
    function TOSUrlService() {
    }
    TOSUrlService.Asset = function (url) {
        if (url.indexOf('data/') > -1)
            url = url.replace('data/', 'data/' + _domain_tos_region__WEBPACK_IMPORTED_MODULE_0__["TOSRegionService"].getUrl() + '/');
        return this.join(this.origin, url);
    };
    TOSUrlService.Route = function (url) {
        return this.join('', this.join(_domain_tos_region__WEBPACK_IMPORTED_MODULE_0__["TOSRegionService"].getUrl(), url));
    };
    TOSUrlService.join = function (url1, url2) {
        return url1 + ((url1.endsWith('/') || url2.startsWith('/')) ? '' : '/') + url2;
    };
    Object.defineProperty(TOSUrlService, "origin", {
        get: function () {
            var origin = location.origin + '/';
            origin = origin + (origin.indexOf('github.io') > 0 ? 'tos-database/' : '');
            return origin;
        },
        enumerable: true,
        configurable: true
    });
    TOSUrlService.WORKER_DEXIE = function () { return TOSUrlService.Asset('assets/js/dexie.worker.js'); };
    TOSUrlService.WORKER_LUNR = function () { return TOSUrlService.Asset('assets/js/lunr.worker.js'); };
    TOSUrlService.WORKER_PAPAPARSE = function () { return TOSUrlService.Asset('assets/js/papaparse.worker.js'); };
    TOSUrlService.WORKER_SW = function () { return TOSUrlService.Asset('tos-sw.worker.js'); };
    return TOSUrlService;
}());



/***/ }),

/***/ "./src/app/shared/service/update.service.ts":
/*!**************************************************!*\
  !*** ./src/app/shared/service/update.service.ts ***!
  \**************************************************/
/*! exports provided: UpdateService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UpdateService", function() { return UpdateService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _domain_tos_region__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../domain/tos-region */ "./src/app/shared/domain/tos-region.ts");



var KEY_VERSION = 'version';
var VERSION_HOTFIX = 2;
var UpdateService = /** @class */ (function () {
    function UpdateService() {
        this.region = _domain_tos_region__WEBPACK_IMPORTED_MODULE_2__["TOSRegionService"].get();
    }
    UpdateService.prototype.updateAvailable = function () { return this.versionNew != this.versionOld; };
    UpdateService.prototype.updateVersion = function (clear) {
        var version = JSON.parse(localStorage.getItem(KEY_VERSION) || '{}');
        version[this.region] = clear ? '' : this.versionNew;
        localStorage.setItem(KEY_VERSION, JSON.stringify(version));
    };
    Object.defineProperty(UpdateService.prototype, "versionNew", {
        get: function () { return _domain_tos_region__WEBPACK_IMPORTED_MODULE_2__["VERSIONS"][this.region].version + (VERSION_HOTFIX ? '_hotfix_' + VERSION_HOTFIX : ''); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UpdateService.prototype, "versionHuman", {
        get: function () { return this.region && (this.region.toString() + ' • ' + this.versionNew); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UpdateService.prototype, "versionOld", {
        get: function () { return JSON.parse(localStorage.getItem(KEY_VERSION) || '{}')[this.region]; },
        enumerable: true,
        configurable: true
    });
    UpdateService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], UpdateService);
    return UpdateService;
}());



/***/ }),

/***/ "./src/app/shared/shared.module.ts":
/*!*****************************************!*\
  !*** ./src/app/shared/shared.module.ts ***!
  \*****************************************/
/*! exports provided: SharedModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SharedModule", function() { return SharedModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _directives_sort_directive__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./directives/sort.directive */ "./src/app/shared/directives/sort.directive.ts");
/* harmony import */ var _directives_filter_directive__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./directives/filter.directive */ "./src/app/shared/directives/filter.directive.ts");
/* harmony import */ var _directives_time_pipe__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./directives/time.pipe */ "./src/app/shared/directives/time.pipe.ts");
/* harmony import */ var _domain_tos_item_tos_item_resolver__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./domain/tos/item/tos-item.resolver */ "./src/app/shared/domain/tos/item/tos-item.resolver.ts");
/* harmony import */ var _domain_tos_item_equipment_tos_equipment_resolver__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./domain/tos/item/equipment/tos-equipment.resolver */ "./src/app/shared/domain/tos/item/equipment/tos-equipment.resolver.ts");
/* harmony import */ var _domain_tos_item_book_tos_book_resolver__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./domain/tos/item/book/tos-book.resolver */ "./src/app/shared/domain/tos/item/book/tos-book.resolver.ts");
/* harmony import */ var _domain_tos_item_collection_tos_collection_resolver__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./domain/tos/item/collection/tos-collection.resolver */ "./src/app/shared/domain/tos/item/collection/tos-collection.resolver.ts");
/* harmony import */ var _domain_tos_monster_tos_monster_resolver__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./domain/tos/monster/tos-monster.resolver */ "./src/app/shared/domain/tos/monster/tos-monster.resolver.ts");
/* harmony import */ var _domain_tos_item_recipe_tos_recipe_resolver__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./domain/tos/item/recipe/tos-recipe.resolver */ "./src/app/shared/domain/tos/item/recipe/tos-recipe.resolver.ts");
/* harmony import */ var _domain_tos_item_cube_tos_cube_resolver__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./domain/tos/item/cube/tos-cube.resolver */ "./src/app/shared/domain/tos/item/cube/tos-cube.resolver.ts");
/* harmony import */ var _domain_tos_item_equipment_tos_equipment_set_resolver__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./domain/tos/item/equipment/tos-equipment-set.resolver */ "./src/app/shared/domain/tos/item/equipment/tos-equipment-set.resolver.ts");
/* harmony import */ var _domain_tos_item_card_tos_card_resolver__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./domain/tos/item/card/tos-card.resolver */ "./src/app/shared/domain/tos/item/card/tos-card.resolver.ts");
/* harmony import */ var _domain_tos_item_gem_tos_gem_resolver__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./domain/tos/item/gem/tos-gem.resolver */ "./src/app/shared/domain/tos/item/gem/tos-gem.resolver.ts");
/* harmony import */ var _components_input_number_input_number_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./components/input-number/input-number.component */ "./src/app/shared/components/input-number/input-number.component.ts");
/* harmony import */ var ng_click_outside__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ng-click-outside */ "./node_modules/ng-click-outside/lib/index.js");
/* harmony import */ var ng_click_outside__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(ng_click_outside__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _domain_tos_attribute_tos_attribute_resolver__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./domain/tos/attribute/tos-attribute.resolver */ "./src/app/shared/domain/tos/attribute/tos-attribute.resolver.ts");
/* harmony import */ var _domain_tos_job_tos_job_resolver__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./domain/tos/job/tos-job.resolver */ "./src/app/shared/domain/tos/job/tos-job.resolver.ts");
/* harmony import */ var _domain_tos_skill_tos_skill_resolver__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./domain/tos/skill/tos-skill.resolver */ "./src/app/shared/domain/tos/skill/tos-skill.resolver.ts");
/* harmony import */ var _components_entity_detail_entity_detail_AttackDefense_entity_detail_AttackDefense_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./components/entity-detail/entity-detail-AttackDefense/entity-detail-AttackDefense.component */ "./src/app/shared/components/entity-detail/entity-detail-AttackDefense/entity-detail-AttackDefense.component.ts");
/* harmony import */ var _components_entity_detail_entity_detail_Book_entity_detail_Book_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./components/entity-detail/entity-detail-Book/entity-detail-Book.component */ "./src/app/shared/components/entity-detail/entity-detail-Book/entity-detail-Book.component.ts");
/* harmony import */ var _components_entity_detail_entity_detail_Card_entity_detail_Card_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./components/entity-detail/entity-detail-Card/entity-detail-Card.component */ "./src/app/shared/components/entity-detail/entity-detail-Card/entity-detail-Card.component.ts");
/* harmony import */ var _components_entity_detail_entity_detail_ClassIconGrade_entity_detail_ClassIconGrade_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./components/entity-detail/entity-detail-ClassIconGrade/entity-detail-ClassIconGrade.component */ "./src/app/shared/components/entity-detail/entity-detail-ClassIconGrade/entity-detail-ClassIconGrade.component.ts");
/* harmony import */ var _components_entity_detail_entity_detail_Description_entity_detail_Description_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./components/entity-detail/entity-detail-Description/entity-detail-Description.component */ "./src/app/shared/components/entity-detail/entity-detail-Description/entity-detail-Description.component.ts");
/* harmony import */ var _components_entity_detail_entity_detail_DurabilityPotentialSockets_entity_detail_DurabilityPotentialSockets_component__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./components/entity-detail/entity-detail-DurabilityPotentialSockets/entity-detail-DurabilityPotentialSockets.component */ "./src/app/shared/components/entity-detail/entity-detail-DurabilityPotentialSockets/entity-detail-DurabilityPotentialSockets.component.ts");
/* harmony import */ var _components_entity_detail_entity_detail_Enhancement_entity_detail_Enhancement_component__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./components/entity-detail/entity-detail-Enhancement/entity-detail-Enhancement.component */ "./src/app/shared/components/entity-detail/entity-detail-Enhancement/entity-detail-Enhancement.component.ts");
/* harmony import */ var _components_entity_detail_entity_detail_Gem_entity_detail_Gem_component__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./components/entity-detail/entity-detail-Gem/entity-detail-Gem.component */ "./src/app/shared/components/entity-detail/entity-detail-Gem/entity-detail-Gem.component.ts");
/* harmony import */ var _components_entity_detail_entity_detail_Information_entity_detail_Information_component__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./components/entity-detail/entity-detail-Information/entity-detail-Information.component */ "./src/app/shared/components/entity-detail/entity-detail-Information/entity-detail-Information.component.ts");
/* harmony import */ var _components_entity_detail_entity_detail_BonusStatsUnidentified_entity_detail_BonusStatsUnidentified_component__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./components/entity-detail/entity-detail-BonusStatsUnidentified/entity-detail-BonusStatsUnidentified.component */ "./src/app/shared/components/entity-detail/entity-detail-BonusStatsUnidentified/entity-detail-BonusStatsUnidentified.component.ts");
/* harmony import */ var _components_entity_detail_entity_detail_Header_entity_detail_header_component__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./components/entity-detail/entity-detail-Header/entity-detail-header.component */ "./src/app/shared/components/entity-detail/entity-detail-Header/entity-detail-header.component.ts");
/* harmony import */ var _components_entity_detail_entity_detail_Stats_entity_detail_Stats_component__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./components/entity-detail/entity-detail-Stats/entity-detail-Stats.component */ "./src/app/shared/components/entity-detail/entity-detail-Stats/entity-detail-Stats.component.ts");
/* harmony import */ var _components_entity_detail_entity_detail_Table_entity_detail_Table_component__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./components/entity-detail/entity-detail-Table/entity-detail-Table.component */ "./src/app/shared/components/entity-detail/entity-detail-Table/entity-detail-Table.component.ts");
/* harmony import */ var _components_entity_tooltip_entity_tooltip_component__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./components/entity-tooltip/entity-tooltip.component */ "./src/app/shared/components/entity-tooltip/entity-tooltip.component.ts");
/* harmony import */ var _components_entity_detail_entity_detail_child_component__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./components/entity-detail/entity-detail-child.component */ "./src/app/shared/components/entity-detail/entity-detail-child.component.ts");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
/* harmony import */ var _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! @fortawesome/angular-fontawesome */ "./node_modules/@fortawesome/angular-fontawesome/fesm5/angular-fontawesome.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _directives_sanitize_css_pipe__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ./directives/sanitize-css.pipe */ "./src/app/shared/directives/sanitize-css.pipe.ts");
/* harmony import */ var _directives_sanitize_html_pipe__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ./directives/sanitize-html.pipe */ "./src/app/shared/directives/sanitize-html.pipe.ts");
/* harmony import */ var _components_entity_detail_entity_detail_Skill_entity_detail_Skill_component__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ./components/entity-detail/entity-detail-Skill/entity-detail-Skill.component */ "./src/app/shared/components/entity-detail/entity-detail-Skill/entity-detail-Skill.component.ts");
/* harmony import */ var _components_entity_detail_entity_detail_SkillFormula_entity_detail_SkillFormula_component__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! ./components/entity-detail/entity-detail-SkillFormula/entity-detail-SkillFormula.component */ "./src/app/shared/components/entity-detail/entity-detail-SkillFormula/entity-detail-SkillFormula.component.ts");
/* harmony import */ var _components_entity_detail_entity_detail_JobIcon_skill_builder_job_icon_component__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! ./components/entity-detail/entity-detail-JobIcon/skill-builder-job-icon.component */ "./src/app/shared/components/entity-detail/entity-detail-JobIcon/skill-builder-job-icon.component.ts");
/* harmony import */ var _components_entity_detail_entity_detail_JobAnimation_entity_detail_JobAnimation_component__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! ./components/entity-detail/entity-detail-JobAnimation/entity-detail-JobAnimation.component */ "./src/app/shared/components/entity-detail/entity-detail-JobAnimation/entity-detail-JobAnimation.component.ts");
/* harmony import */ var _components_entity_table_entity_table_component__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! ./components/entity-table/entity-table.component */ "./src/app/shared/components/entity-table/entity-table.component.ts");
/* harmony import */ var _components_entity_table_pipes_table_cell_pipe__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! ./components/entity-table/pipes/table-cell.pipe */ "./src/app/shared/components/entity-table/pipes/table-cell.pipe.ts");
/* harmony import */ var _components_entity_table_pipes_table_cell_number_pipe__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(/*! ./components/entity-table/pipes/table-cell-number.pipe */ "./src/app/shared/components/entity-table/pipes/table-cell-number.pipe.ts");
/* harmony import */ var _components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(/*! ./components/entity-table/pipes/table-cell-text.pipe */ "./src/app/shared/components/entity-table/pipes/table-cell-text.pipe.ts");
/* harmony import */ var _components_entity_table_pipes_table_cell_icon_pipe__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(/*! ./components/entity-table/pipes/table-cell-icon.pipe */ "./src/app/shared/components/entity-table/pipes/table-cell-icon.pipe.ts");
/* harmony import */ var _components_entity_table_pipes_table_cell_link_pipe__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(/*! ./components/entity-table/pipes/table-cell-link.pipe */ "./src/app/shared/components/entity-table/pipes/table-cell-link.pipe.ts");
/* harmony import */ var _components_entity_table_pipes_table_cell_badge_pipe__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(/*! ./components/entity-table/pipes/table-cell-badge.pipe */ "./src/app/shared/components/entity-table/pipes/table-cell-badge.pipe.ts");
/* harmony import */ var _domain_tos_tos_domain_repository__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__(/*! ./domain/tos/tos-domain.repository */ "./src/app/shared/domain/tos/tos-domain.repository.ts");
/* harmony import */ var _service_seo_service__WEBPACK_IMPORTED_MODULE_54__ = __webpack_require__(/*! ./service/seo.service */ "./src/app/shared/service/seo.service.ts");
/* harmony import */ var _service_sw_service__WEBPACK_IMPORTED_MODULE_55__ = __webpack_require__(/*! ./service/sw.service */ "./src/app/shared/service/sw.service.ts");
/* harmony import */ var _service_analytics_service__WEBPACK_IMPORTED_MODULE_56__ = __webpack_require__(/*! ./service/analytics.service */ "./src/app/shared/service/analytics.service.ts");
/* harmony import */ var _domain_tos_map_tos_map_resolver__WEBPACK_IMPORTED_MODULE_57__ = __webpack_require__(/*! ./domain/tos/map/tos-map.resolver */ "./src/app/shared/domain/tos/map/tos-map.resolver.ts");
/* harmony import */ var _directives_css_max_height_directive__WEBPACK_IMPORTED_MODULE_58__ = __webpack_require__(/*! ./directives/css-max-height.directive */ "./src/app/shared/directives/css-max-height.directive.ts");
/* harmony import */ var _domain_tos_monster_tos_npc_resolver__WEBPACK_IMPORTED_MODULE_59__ = __webpack_require__(/*! ./domain/tos/monster/tos-npc.resolver */ "./src/app/shared/domain/tos/monster/tos-npc.resolver.ts");




























































var SharedModule = /** @class */ (function () {
    function SharedModule(analytics, seo, sw) {
        this.analytics = analytics;
        this.seo = seo;
        this.sw = sw;
    }
    SharedModule_1 = SharedModule;
    // Read more: https://medium.com/@chrishouse/when-to-use-angulars-forroot-method-400094a0ebb7
    SharedModule.forRoot = function () {
        return {
            ngModule: SharedModule_1,
            providers: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["DecimalPipe"],
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["PercentPipe"],
                _directives_time_pipe__WEBPACK_IMPORTED_MODULE_5__["TimePipe"],
                _components_entity_table_pipes_table_cell_badge_pipe__WEBPACK_IMPORTED_MODULE_52__["TableCellBadgePipe"],
                _components_entity_table_pipes_table_cell_icon_pipe__WEBPACK_IMPORTED_MODULE_50__["TableCellIconPipe"],
                _components_entity_table_pipes_table_cell_link_pipe__WEBPACK_IMPORTED_MODULE_51__["TableCellLinkPipe"],
                _components_entity_table_pipes_table_cell_number_pipe__WEBPACK_IMPORTED_MODULE_48__["TableCellNumberPipe"],
                _components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_49__["TableCellTextPipe"],
                _domain_tos_attribute_tos_attribute_resolver__WEBPACK_IMPORTED_MODULE_19__["TOSAttributeResolver"],
                _domain_tos_item_book_tos_book_resolver__WEBPACK_IMPORTED_MODULE_8__["TOSBookResolver"],
                _domain_tos_item_card_tos_card_resolver__WEBPACK_IMPORTED_MODULE_14__["TOSCardResolver"],
                _domain_tos_item_collection_tos_collection_resolver__WEBPACK_IMPORTED_MODULE_9__["TOSCollectionResolver"],
                _domain_tos_item_cube_tos_cube_resolver__WEBPACK_IMPORTED_MODULE_12__["TOSCubeResolver"],
                _domain_tos_item_equipment_tos_equipment_resolver__WEBPACK_IMPORTED_MODULE_7__["TOSEquipmentResolver"],
                _domain_tos_item_equipment_tos_equipment_set_resolver__WEBPACK_IMPORTED_MODULE_13__["TOSEquipmentSetResolver"],
                _domain_tos_item_gem_tos_gem_resolver__WEBPACK_IMPORTED_MODULE_15__["TOSGemResolver"],
                _domain_tos_item_tos_item_resolver__WEBPACK_IMPORTED_MODULE_6__["TOSItemResolver"],
                _domain_tos_job_tos_job_resolver__WEBPACK_IMPORTED_MODULE_20__["TOSJobResolver"],
                _domain_tos_map_tos_map_resolver__WEBPACK_IMPORTED_MODULE_57__["TOSMapResolver"],
                _domain_tos_monster_tos_monster_resolver__WEBPACK_IMPORTED_MODULE_10__["TOSMonsterResolver"],
                _domain_tos_monster_tos_npc_resolver__WEBPACK_IMPORTED_MODULE_59__["TOSNPCResolver"],
                _domain_tos_item_recipe_tos_recipe_resolver__WEBPACK_IMPORTED_MODULE_11__["TOSRecipeResolver"],
                _domain_tos_skill_tos_skill_resolver__WEBPACK_IMPORTED_MODULE_21__["TOSSkillResolver"],
                { provide: 'ITOSDomainRepository', useClass: _domain_tos_tos_domain_repository__WEBPACK_IMPORTED_MODULE_53__["TOSDomainRepository"] },
            ]
        };
    };
    var SharedModule_1;
    SharedModule = SharedModule_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                ng_click_outside__WEBPACK_IMPORTED_MODULE_17__["ClickOutsideModule"],
                _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_38__["FontAwesomeModule"],
                _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_37__["NgbModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_18__["FormsModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_39__["RouterModule"],
            ],
            declarations: [
                // Components
                _components_entity_detail_entity_detail_AttackDefense_entity_detail_AttackDefense_component__WEBPACK_IMPORTED_MODULE_22__["EntityDetailAttackDefenseComponent"],
                _components_entity_detail_entity_detail_BonusStatsUnidentified_entity_detail_BonusStatsUnidentified_component__WEBPACK_IMPORTED_MODULE_31__["EntityDetailBonusStatsUnidentifiedComponent"],
                _components_entity_detail_entity_detail_Book_entity_detail_Book_component__WEBPACK_IMPORTED_MODULE_23__["EntityDetailBookComponent"],
                _components_entity_detail_entity_detail_Card_entity_detail_Card_component__WEBPACK_IMPORTED_MODULE_24__["EntityDetailCardComponent"],
                _components_entity_detail_entity_detail_child_component__WEBPACK_IMPORTED_MODULE_36__["EntityDetailChildComponent"],
                _components_entity_detail_entity_detail_ClassIconGrade_entity_detail_ClassIconGrade_component__WEBPACK_IMPORTED_MODULE_25__["EntityDetailClassIconGradeComponent"],
                _components_entity_detail_entity_detail_Description_entity_detail_Description_component__WEBPACK_IMPORTED_MODULE_26__["EntityDetailDescriptionComponent"],
                _components_entity_detail_entity_detail_DurabilityPotentialSockets_entity_detail_DurabilityPotentialSockets_component__WEBPACK_IMPORTED_MODULE_27__["EntityDetailDurabilityPotentialSocketsComponent"],
                _components_entity_detail_entity_detail_Enhancement_entity_detail_Enhancement_component__WEBPACK_IMPORTED_MODULE_28__["EntityDetailEnhancementComponent"],
                _components_entity_detail_entity_detail_Gem_entity_detail_Gem_component__WEBPACK_IMPORTED_MODULE_29__["EntityDetailGemComponent"],
                _components_entity_detail_entity_detail_Information_entity_detail_Information_component__WEBPACK_IMPORTED_MODULE_30__["EntityDetailInformationComponent"],
                _components_entity_detail_entity_detail_JobAnimation_entity_detail_JobAnimation_component__WEBPACK_IMPORTED_MODULE_45__["EntityDetailJobAnimationComponent"],
                _components_entity_detail_entity_detail_JobIcon_skill_builder_job_icon_component__WEBPACK_IMPORTED_MODULE_44__["EntityDetailJobIconComponent"],
                _components_entity_detail_entity_detail_Header_entity_detail_header_component__WEBPACK_IMPORTED_MODULE_32__["EntityDetailHeaderComponent"],
                _components_entity_detail_entity_detail_Skill_entity_detail_Skill_component__WEBPACK_IMPORTED_MODULE_42__["EntityDetailSkillComponent"],
                _components_entity_detail_entity_detail_SkillFormula_entity_detail_SkillFormula_component__WEBPACK_IMPORTED_MODULE_43__["EntityDetailSkillFormulaComponent"],
                _components_entity_detail_entity_detail_Stats_entity_detail_Stats_component__WEBPACK_IMPORTED_MODULE_33__["EntityDetailStatsComponent"],
                _components_entity_detail_entity_detail_Table_entity_detail_Table_component__WEBPACK_IMPORTED_MODULE_34__["EntityDetailTableComponent"],
                _components_entity_table_entity_table_component__WEBPACK_IMPORTED_MODULE_46__["EntityTableComponent"],
                _components_entity_tooltip_entity_tooltip_component__WEBPACK_IMPORTED_MODULE_35__["EntityTooltipComponent"],
                _components_input_number_input_number_component__WEBPACK_IMPORTED_MODULE_16__["InputNumberComponent"],
                // Directives
                _directives_css_max_height_directive__WEBPACK_IMPORTED_MODULE_58__["CssMaxHeightDirective"],
                _directives_filter_directive__WEBPACK_IMPORTED_MODULE_4__["FilterDirective"],
                _directives_filter_directive__WEBPACK_IMPORTED_MODULE_4__["FilterGroupDirective"],
                _directives_sort_directive__WEBPACK_IMPORTED_MODULE_3__["SortDirective"],
                _directives_sort_directive__WEBPACK_IMPORTED_MODULE_3__["SortGroupDirective"],
                // Pipes
                _directives_sanitize_css_pipe__WEBPACK_IMPORTED_MODULE_40__["SanitizeCSSPipe"],
                _directives_sanitize_html_pipe__WEBPACK_IMPORTED_MODULE_41__["SanitizeHTMLPipe"],
                _components_entity_table_pipes_table_cell_pipe__WEBPACK_IMPORTED_MODULE_47__["TableCellPipe"],
                _components_entity_table_pipes_table_cell_badge_pipe__WEBPACK_IMPORTED_MODULE_52__["TableCellBadgePipe"],
                _components_entity_table_pipes_table_cell_icon_pipe__WEBPACK_IMPORTED_MODULE_50__["TableCellIconPipe"],
                _components_entity_table_pipes_table_cell_link_pipe__WEBPACK_IMPORTED_MODULE_51__["TableCellLinkPipe"],
                _components_entity_table_pipes_table_cell_number_pipe__WEBPACK_IMPORTED_MODULE_48__["TableCellNumberPipe"],
                _components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_49__["TableCellTextPipe"],
                _directives_time_pipe__WEBPACK_IMPORTED_MODULE_5__["TimePipe"],
                _directives_css_max_height_directive__WEBPACK_IMPORTED_MODULE_58__["CssMaxHeightDirective"],
            ],
            exports: [
                // Components
                _components_entity_detail_entity_detail_AttackDefense_entity_detail_AttackDefense_component__WEBPACK_IMPORTED_MODULE_22__["EntityDetailAttackDefenseComponent"],
                _components_entity_detail_entity_detail_BonusStatsUnidentified_entity_detail_BonusStatsUnidentified_component__WEBPACK_IMPORTED_MODULE_31__["EntityDetailBonusStatsUnidentifiedComponent"],
                _components_entity_detail_entity_detail_Book_entity_detail_Book_component__WEBPACK_IMPORTED_MODULE_23__["EntityDetailBookComponent"],
                _components_entity_detail_entity_detail_Card_entity_detail_Card_component__WEBPACK_IMPORTED_MODULE_24__["EntityDetailCardComponent"],
                _components_entity_detail_entity_detail_child_component__WEBPACK_IMPORTED_MODULE_36__["EntityDetailChildComponent"],
                _components_entity_detail_entity_detail_ClassIconGrade_entity_detail_ClassIconGrade_component__WEBPACK_IMPORTED_MODULE_25__["EntityDetailClassIconGradeComponent"],
                _components_entity_detail_entity_detail_Description_entity_detail_Description_component__WEBPACK_IMPORTED_MODULE_26__["EntityDetailDescriptionComponent"],
                _components_entity_detail_entity_detail_DurabilityPotentialSockets_entity_detail_DurabilityPotentialSockets_component__WEBPACK_IMPORTED_MODULE_27__["EntityDetailDurabilityPotentialSocketsComponent"],
                _components_entity_detail_entity_detail_Enhancement_entity_detail_Enhancement_component__WEBPACK_IMPORTED_MODULE_28__["EntityDetailEnhancementComponent"],
                _components_entity_detail_entity_detail_Gem_entity_detail_Gem_component__WEBPACK_IMPORTED_MODULE_29__["EntityDetailGemComponent"],
                _components_entity_detail_entity_detail_Information_entity_detail_Information_component__WEBPACK_IMPORTED_MODULE_30__["EntityDetailInformationComponent"],
                _components_entity_detail_entity_detail_JobAnimation_entity_detail_JobAnimation_component__WEBPACK_IMPORTED_MODULE_45__["EntityDetailJobAnimationComponent"],
                _components_entity_detail_entity_detail_JobIcon_skill_builder_job_icon_component__WEBPACK_IMPORTED_MODULE_44__["EntityDetailJobIconComponent"],
                _components_entity_detail_entity_detail_Header_entity_detail_header_component__WEBPACK_IMPORTED_MODULE_32__["EntityDetailHeaderComponent"],
                _components_entity_detail_entity_detail_Skill_entity_detail_Skill_component__WEBPACK_IMPORTED_MODULE_42__["EntityDetailSkillComponent"],
                _components_entity_detail_entity_detail_SkillFormula_entity_detail_SkillFormula_component__WEBPACK_IMPORTED_MODULE_43__["EntityDetailSkillFormulaComponent"],
                _components_entity_detail_entity_detail_Stats_entity_detail_Stats_component__WEBPACK_IMPORTED_MODULE_33__["EntityDetailStatsComponent"],
                _components_entity_detail_entity_detail_Table_entity_detail_Table_component__WEBPACK_IMPORTED_MODULE_34__["EntityDetailTableComponent"],
                _components_entity_table_entity_table_component__WEBPACK_IMPORTED_MODULE_46__["EntityTableComponent"],
                _components_entity_tooltip_entity_tooltip_component__WEBPACK_IMPORTED_MODULE_35__["EntityTooltipComponent"],
                _components_input_number_input_number_component__WEBPACK_IMPORTED_MODULE_16__["InputNumberComponent"],
                // Directives
                _directives_css_max_height_directive__WEBPACK_IMPORTED_MODULE_58__["CssMaxHeightDirective"],
                _directives_filter_directive__WEBPACK_IMPORTED_MODULE_4__["FilterDirective"],
                _directives_filter_directive__WEBPACK_IMPORTED_MODULE_4__["FilterGroupDirective"],
                _directives_sort_directive__WEBPACK_IMPORTED_MODULE_3__["SortDirective"],
                _directives_sort_directive__WEBPACK_IMPORTED_MODULE_3__["SortGroupDirective"],
                // Modules
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                ng_click_outside__WEBPACK_IMPORTED_MODULE_17__["ClickOutsideModule"],
                _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_38__["FontAwesomeModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_18__["FormsModule"],
                _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_37__["NgbModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_39__["RouterModule"],
                // Pipes
                _directives_sanitize_css_pipe__WEBPACK_IMPORTED_MODULE_40__["SanitizeCSSPipe"],
                _directives_sanitize_html_pipe__WEBPACK_IMPORTED_MODULE_41__["SanitizeHTMLPipe"],
                _components_entity_table_pipes_table_cell_badge_pipe__WEBPACK_IMPORTED_MODULE_52__["TableCellBadgePipe"],
                _components_entity_table_pipes_table_cell_icon_pipe__WEBPACK_IMPORTED_MODULE_50__["TableCellIconPipe"],
                _components_entity_table_pipes_table_cell_link_pipe__WEBPACK_IMPORTED_MODULE_51__["TableCellLinkPipe"],
                _components_entity_table_pipes_table_cell_number_pipe__WEBPACK_IMPORTED_MODULE_48__["TableCellNumberPipe"],
                _components_entity_table_pipes_table_cell_text_pipe__WEBPACK_IMPORTED_MODULE_49__["TableCellTextPipe"],
                _directives_time_pipe__WEBPACK_IMPORTED_MODULE_5__["TimePipe"],
            ],
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_service_analytics_service__WEBPACK_IMPORTED_MODULE_56__["AnalyticsService"],
            _service_seo_service__WEBPACK_IMPORTED_MODULE_54__["SEOService"],
            _service_sw_service__WEBPACK_IMPORTED_MODULE_55__["SWService"]])
    ], SharedModule);
    return SharedModule;
}());



/***/ }),

/***/ "./src/app/shared/utils/array-utils.ts":
/*!*********************************************!*\
  !*** ./src/app/shared/utils/array-utils.ts ***!
  \*********************************************/
/*! exports provided: ArrayUtils */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ArrayUtils", function() { return ArrayUtils; });
var ArrayUtils = /** @class */ (function () {
    function ArrayUtils() {
    }
    Object.defineProperty(ArrayUtils, "sort", {
        get: function () {
            return function (a, b) { return a < b ? -1 : a > b ? 1 : 0; };
        },
        enumerable: true,
        configurable: true
    });
    ArrayUtils.reduce = function (data, key, array) {
        if (array === void 0) { array = false; }
        var keys = typeof key == 'string' ? key.split('.') : [key];
        var keyParent = keys[0];
        var keyChild = keys[Math.min(1, keys.length - 1)];
        var populate = function (accumulator, key, value) {
            if (key == null || value == null)
                return;
            if (typeof key == 'object')
                key = key[keyChild];
            if (array) {
                accumulator[key] = accumulator[key] || [];
                accumulator[key].push(value);
            }
            else {
                accumulator[key] = value;
            }
        };
        return data.reduce(function (accumulator, entry) {
            if (Array.isArray(entry[keyParent]))
                entry[keyParent].map(function (key) { return populate(accumulator, key, entry); });
            else
                populate(accumulator, entry[keyParent], entry);
            return accumulator;
        }, {});
    };
    return ArrayUtils;
}());



/***/ }),

/***/ "./src/app/shell/footer/footer.component.html":
/*!****************************************************!*\
  !*** ./src/app/shell/footer/footer.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container text-muted mb-3 mb-xl-0 pb-5 pb-xl-3\" style=\"border-top-width: 2px\">\n  <hr>\n  <div class=\"row\">\n    <div class=\"col-6 col-lg-3 order-0 text-left\">\n      <a href=\"http://imc.co.kr/?mid=IMC_EN\" target=\"_blank\" ngbTooltip=\"© IMCGAMES CO. LTD.\">\n        <img height=\"32\" [src]=\"'assets/images/logo_imc' + (isLightTheme ? '.png' : '_white.png')\" />\n      </a>\n    </div>\n    <a class=\"col-12 col-lg-6 order-2 text-center order-lg-1 d-flex\" ngbTooltip=\"Clear cache\" href=\"#clearCache\"\n       (click)=\"onClearCacheClick($event)\">\n      <div class=\"align-self-center flex-grow-1 text-muted\">{{ updateVersion }}</div>\n    </a>\n    <div class=\"col-6 col-lg-3 order-1 text-right order-lg-2 mb-3 mb-lg-0\">\n      <a href=\"https://discord.gg/8g76NAA\" target=\"_blank\" ngbTooltip=\"Thanks @Crevox, @Jiyuu, @KriLanze, @Palemoon, @Tekguel and more!\">\n        <img class=\"align-self-center mr-2\" height=\"32\" src=\"assets/images/logo_discord.png\" />\n      </a>\n      <a href=\"https://github.com/rjgtav/tos-database\" target=\"_blank\" ngbTooltip=\"Open-source!\">\n        <img class=\"align-self-center mr-2\" height=\"32\" [src]=\"'assets/images/logo_github' + (isLightTheme ? '.png' : '_white.png')\" />\n      </a>\n      <a href=\"https://patreon.com/rjgtav\" target=\"_blank\" ngbTooltip=\"Support the website\">\n        <img class=\"align-self-center mr-2\" height=\"32\" src=\"assets/images/logo_patreon.png\" />\n      </a>\n      <a href=\"https://www.twitch.tv/rjgtav\" target=\"_blank\" ngbTooltip=\"Follow the development\" container=\"body\">\n        <img class=\"align-self-center mr-2\" height=\"32\" src=\"assets/images/logo_twitch.png\" />\n      </a>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/shell/footer/footer.component.scss":
/*!****************************************************!*\
  !*** ./src/app/shell/footer/footer.component.scss ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  position: absolute;\n  bottom: 0;\n  width: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9mdW5naS9FL1Rvc1Byb2plY3QvVG9zR3VydUJhc2UvdG9zLWRhdGFiYXNlL3Rvcy13ZWIvc3JjL2FwcC9zaGVsbC9mb290ZXIvZm9vdGVyLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9zaGVsbC9mb290ZXIvZm9vdGVyLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsbUJBQUE7RUFDQSxVQUFBO0VBQ0EsWUFBQTtDQ0NEIiwiZmlsZSI6InNyYy9hcHAvc2hlbGwvZm9vdGVyL2Zvb3Rlci5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIjpob3N0IHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBib3R0b206IDA7XG4gIHdpZHRoOiAxMDAlO1xufVxuXG4iLCI6aG9zdCB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgYm90dG9tOiAwO1xuICB3aWR0aDogMTAwJTtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/shell/footer/footer.component.ts":
/*!**************************************************!*\
  !*** ./src/app/shell/footer/footer.component.ts ***!
  \**************************************************/
/*! exports provided: FooterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FooterComponent", function() { return FooterComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_service_theme_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/service/theme.service */ "./src/app/shared/service/theme.service.ts");
/* harmony import */ var _shared_service_update_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/service/update.service */ "./src/app/shared/service/update.service.ts");
/* harmony import */ var _loading_loading_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../loading/loading.service */ "./src/app/shell/loading/loading.service.ts");





var FooterComponent = /** @class */ (function () {
    function FooterComponent(changeDetector, loading, theme, update) {
        var _this = this;
        this.changeDetector = changeDetector;
        this.loading = loading;
        this.theme = theme;
        this.update = update;
        this.loading.updateComplete$.subscribe(function (value) { return _this.onUpdateComplete(); });
        this.subscriptionTheme = theme.subscribe(this.onThemeChange.bind(this));
    }
    FooterComponent.prototype.onClearCacheClick = function (event) {
        event.preventDefault();
        this.loading.clear();
    };
    FooterComponent.prototype.onThemeChange = function (theme) {
        this.isLightTheme = theme == _shared_service_theme_service__WEBPACK_IMPORTED_MODULE_2__["Theme"].LIGHT;
        this.changeDetector.markForCheck();
    };
    FooterComponent.prototype.onUpdateComplete = function () {
        this.updateVersion = this.update.versionHuman;
        this.changeDetector.markForCheck();
    };
    FooterComponent.prototype.ngOnDestroy = function () {
        this.subscriptionTheme.unsubscribe();
    };
    FooterComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
            selector: 'tos-footer',
            template: __webpack_require__(/*! ./footer.component.html */ "./src/app/shell/footer/footer.component.html"),
            styles: [__webpack_require__(/*! ./footer.component.scss */ "./src/app/shell/footer/footer.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"],
            _loading_loading_service__WEBPACK_IMPORTED_MODULE_4__["LoadingService"],
            _shared_service_theme_service__WEBPACK_IMPORTED_MODULE_2__["ThemeService"],
            _shared_service_update_service__WEBPACK_IMPORTED_MODULE_3__["UpdateService"]])
    ], FooterComponent);
    return FooterComponent;
}());



/***/ }),

/***/ "./src/app/shell/header/header-search/header-search.component.html":
/*!*************************************************************************!*\
  !*** ./src/app/shell/header/header-search/header-search.component.html ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- Query -->\n<div class=\"input-group align-items-center position-relative\">\n  <input type=\"text\" class=\"border-0 form-control\" #input\n         [attachOutsideOnClick]=\"true\"\n         [(ngModel)]=\"query\"\n         [disabled]=\"!isLoadedSearch\"\n         [placeholder]=\"!isLoadedSearch ? 'Loading search...' : 'ClassID, ClassName, Name'\"\n         (clickOutside)=\"onFocus(false)\"\n         (focus)=\"onFocus(true)\"\n         (keyup.arrowup)=\"onKeyboardSelect(-1)\"\n         (keyup.arrowdown)=\"onKeyboardSelect(1)\"\n         (keyup.enter)=\"onKeyboardNavigate(keyboardSelected)\"\n         (keyup.esc)=\"onFocus(false)\">\n\n  <div class=\"d-flex flex-row align-items-center position-absolute\" style=\"right: 0; z-index: 4\">\n    <a class=\"pl-3 pr-3 text-white-50\"\n       [href]=\"query ? '#clear' : '#'\"\n       (click)=\"$event.preventDefault(); query && onClear()\">\n      <fa-icon [icon]=\"query ? faTimes : faSearch\"></fa-icon>\n    </a>\n\n    <button class=\"btn dropdown-toggle text-white-50\"\n            type=\"button\"\n            [attachOutsideOnClick]=\"true\"\n            (click)=\"isOpenDataset = !isOpenDataset\"\n            (clickOutside)=\"isOpenDataset = false\">\n      {{ queryDataset ? TOSDataSetService.toLabel(queryDataset) : 'All' }}\n    </button>\n    <div class=\"dropdown-menu dropdown-menu-right\" [ngClass]=\"{ 'show': isOpenDataset }\">\n      <a class=\"dropdown-item\" href=\"#all\"\n         [ngClass]=\"{'active': queryDataset == null }\"\n         (click)=\"onDatasetChange($event, null)\">All</a>\n\n      <div *ngFor=\"let group of TOSDataSetService.VALUES; index as i\">\n        <div class=\"dropdown-header\">{{ group.label }}</div>\n        <a class=\"dropdown-item\" *ngFor=\"let option of group.options\" [href]=\"'#' + option\"\n           [ngClass]=\"{'active': queryDataset == option }\"\n           (click)=\"onDatasetChange($event, option)\">{{ TOSDataSetService.toLabel(option) }}</a>\n        <div class=\"dropdown-divider\" *ngIf=\"i < TOSDataSetService.VALUES.length - 1\"></div>\n      </div>\n    </div>\n  </div>\n\n</div>\n\n<!-- Results -->\n<div class=\"card position-absolute shadow w-100\" style=\"max-height: calc(100vh - 9rem); overflow-y: auto; z-index: 3\"\n     *ngIf=\"isOpen && results && results.length > 0\">\n  <div class=\"card-body\">\n    <table class=\"table table-hover mb-0\">\n      <tbody>\n        <a *ngFor=\"let entity of results; index as i\" class=\"d-table-row\"\n           [ngClass]=\"{'bg-secondary': keyboardSelected == i }\"\n           [routerLink]=\"entity && (entity['Url$'] ? (entity['Url$'] | async) : entity.Url)\"\n           (mouseenter)=\"tooltip = entity\"\n           (mouseleave)=\"tooltip = null\">\n\n          <!-- Icon -->\n          <td width=\"1\" class=\"p-1\">\n            <div class=\"text-center\">\n              <img height=\"40\" width=\"40\" [src]=\"entity['Icon$'] ? (entity['Icon$'] | async) : entity.Icon\" />\n            </div>\n          </td>\n\n          <!-- Name -->\n          <td class=\"align-middle\">{{ entity.Name }}</td>\n\n          <!-- Dataset -->\n          <td width=\"1\" class=\"align-middle text-right\">\n            <span class=\"badge badge-primary\">{{ TOSDataSetService.toLabel(entity.Dataset).toUpperCase() }}</span>\n          </td>\n        </a>\n      </tbody>\n    </table>\n\n    <div *ngIf=\"isLoadMore\" class=\"d-flex flex-row justify-content-center mt-3\"\n         (click)=\"onLoadMore()\">\n      <button class=\"btn btn-primary\">Load more</button>\n    </div>\n  </div>\n</div>\n\n<!-- Tooltip -->\n<app-entity-tooltip class=\"d-none d-md-block\"\n                    [debug]=\"false\"\n                    [tooltip]=\"tooltip\"></app-entity-tooltip>\n"

/***/ }),

/***/ "./src/app/shell/header/header-search/header-search.component.scss":
/*!*************************************************************************!*\
  !*** ./src/app/shell/header/header-search/header-search.component.scss ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  position: relative;\n  display: block;\n  background: rgba(0, 0, 0, 0.25);\n  max-width: 640px;\n  min-width: 320px;\n}\n\nbutton.dropdown-toggle {\n  background: transparent;\n}\n\nbutton.dropdown-toggle:focus {\n  background: rgba(0, 0, 0, 0.25);\n  box-shadow: none;\n}\n\nbutton.dropdown-toggle:hover {\n  background: rgba(0, 0, 0, 0.25);\n}\n\ninput {\n  background: transparent;\n  color: white;\n}\n\ninput:focus {\n  background: rgba(0, 0, 0, 0.25);\n  box-shadow: initial;\n  color: white;\n}\n\ninput:disabled {\n  background: transparent;\n}\n\ntbody > *:first-child td {\n  border-top: none;\n}\n\n.dropdown-item:hover {\n  color: white !important;\n}\n\n.text-white-50:focus,\n.text-white-50:hover {\n  color: white !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9mdW5naS9FL1Rvc1Byb2plY3QvVG9zR3VydUJhc2UvdG9zLWRhdGFiYXNlL3Rvcy13ZWIvc3JjL2FwcC9zaGVsbC9oZWFkZXIvaGVhZGVyLXNlYXJjaC9oZWFkZXItc2VhcmNoLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9zaGVsbC9oZWFkZXIvaGVhZGVyLXNlYXJjaC9oZWFkZXItc2VhcmNoLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBO0VBQ0UsbUJBQUE7RUFDQSxlQUFBO0VBQ0EsZ0NBTFc7RUFNWCxpQkFBQTtFQUNBLGlCQUFBO0NDREQ7O0FESUQ7RUFBeUIsd0JBQUE7Q0NBeEI7O0FEQ0Q7RUFBK0IsZ0NBWGxCO0VBVzJDLGlCQUFBO0NDSXZEOztBREhEO0VBQStCLGdDQVpsQjtDQ21CWjs7QURMRDtFQUNFLHdCQUFBO0VBQ0EsYUFBQTtDQ1FEOztBRExEO0VBQ0UsZ0NBcEJXO0VBcUJYLG9CQUFBO0VBQ0EsYUFBQTtDQ1FEOztBRE5EO0VBQ0Usd0JBQUE7Q0NTRDs7QURORDtFQUNFLGlCQUFBO0NDU0Q7O0FETkQ7RUFBdUIsd0JBQUE7Q0NVdEI7O0FEVEQ7O0VBQ3VCLHdCQUFBO0NDYXRCIiwiZmlsZSI6InNyYy9hcHAvc2hlbGwvaGVhZGVyL2hlYWRlci1zZWFyY2gvaGVhZGVyLXNlYXJjaC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIiRiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIDAuMjUpO1xuXG46aG9zdCB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgZGlzcGxheTogYmxvY2s7XG4gIGJhY2tncm91bmQ6ICRiYWNrZ3JvdW5kO1xuICBtYXgtd2lkdGg6IDY0MHB4O1xuICBtaW4td2lkdGg6IDMyMHB4O1xufVxuXG5idXR0b24uZHJvcGRvd24tdG9nZ2xlIHsgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7IH1cbmJ1dHRvbi5kcm9wZG93bi10b2dnbGU6Zm9jdXMgeyBiYWNrZ3JvdW5kOiAkYmFja2dyb3VuZDsgYm94LXNoYWRvdzogbm9uZTsgfVxuYnV0dG9uLmRyb3Bkb3duLXRvZ2dsZTpob3ZlciB7IGJhY2tncm91bmQ6ICRiYWNrZ3JvdW5kOyB9XG5cbmlucHV0IHtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGNvbG9yOiB3aGl0ZTtcbn1cblxuaW5wdXQ6Zm9jdXMge1xuICBiYWNrZ3JvdW5kOiAkYmFja2dyb3VuZDtcbiAgYm94LXNoYWRvdzogaW5pdGlhbDtcbiAgY29sb3I6IHdoaXRlO1xufVxuaW5wdXQ6ZGlzYWJsZWQge1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbn1cblxudGJvZHkgPiAqOmZpcnN0LWNoaWxkIHRkIHtcbiAgYm9yZGVyLXRvcDogbm9uZTtcbn1cblxuLmRyb3Bkb3duLWl0ZW06aG92ZXIgeyBjb2xvcjogd2hpdGUgIWltcG9ydGFudDsgfVxuLnRleHQtd2hpdGUtNTA6Zm9jdXMsXG4udGV4dC13aGl0ZS01MDpob3ZlciB7IGNvbG9yOiB3aGl0ZSAhaW1wb3J0YW50OyB9XG4iLCI6aG9zdCB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgZGlzcGxheTogYmxvY2s7XG4gIGJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgMC4yNSk7XG4gIG1heC13aWR0aDogNjQwcHg7XG4gIG1pbi13aWR0aDogMzIwcHg7XG59XG5cbmJ1dHRvbi5kcm9wZG93bi10b2dnbGUge1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbn1cblxuYnV0dG9uLmRyb3Bkb3duLXRvZ2dsZTpmb2N1cyB7XG4gIGJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgMC4yNSk7XG4gIGJveC1zaGFkb3c6IG5vbmU7XG59XG5cbmJ1dHRvbi5kcm9wZG93bi10b2dnbGU6aG92ZXIge1xuICBiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIDAuMjUpO1xufVxuXG5pbnB1dCB7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBjb2xvcjogd2hpdGU7XG59XG5cbmlucHV0OmZvY3VzIHtcbiAgYmFja2dyb3VuZDogcmdiYSgwLCAwLCAwLCAwLjI1KTtcbiAgYm94LXNoYWRvdzogaW5pdGlhbDtcbiAgY29sb3I6IHdoaXRlO1xufVxuXG5pbnB1dDpkaXNhYmxlZCB7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xufVxuXG50Ym9keSA+ICo6Zmlyc3QtY2hpbGQgdGQge1xuICBib3JkZXItdG9wOiBub25lO1xufVxuXG4uZHJvcGRvd24taXRlbTpob3ZlciB7XG4gIGNvbG9yOiB3aGl0ZSAhaW1wb3J0YW50O1xufVxuXG4udGV4dC13aGl0ZS01MDpmb2N1cyxcbi50ZXh0LXdoaXRlLTUwOmhvdmVyIHtcbiAgY29sb3I6IHdoaXRlICFpbXBvcnRhbnQ7XG59Il19 */"

/***/ }),

/***/ "./src/app/shell/header/header-search/header-search.component.ts":
/*!***********************************************************************!*\
  !*** ./src/app/shell/header/header-search/header-search.component.ts ***!
  \***********************************************************************/
/*! exports provided: HeaderSearchComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeaderSearchComponent", function() { return HeaderSearchComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "./node_modules/@fortawesome/free-solid-svg-icons/index.es.js");
/* harmony import */ var _shared_service_tos_search_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../shared/service/tos-search.service */ "./src/app/shared/service/tos-search.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared_domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../shared/domain/tos/tos-domain */ "./src/app/shared/domain/tos/tos-domain.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");








var HeaderSearchComponent = /** @class */ (function () {
    function HeaderSearchComponent(changeDetector, router, search) {
        var _this = this;
        this.changeDetector = changeDetector;
        this.router = router;
        this.search = search;
        this.faSearch = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_2__["faSearch"];
        this.faTimes = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_2__["faTimes"];
        this.TOSDataSetService = _shared_domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_5__["TOSDataSetService"];
        this.subscriptionLoad = search.isLoaded$.subscribe(function (value) { return _this.onLoad(value); });
    }
    HeaderSearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.input$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_6__["fromEvent"])(this.input.nativeElement, 'keyup').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["debounceTime"])(200));
        this.subscriptionInput = this.input$.subscribe(function (value) { return _this.onInputChange(); });
    };
    HeaderSearchComponent.prototype.ngOnDestroy = function () {
        this.subscriptionInput && this.subscriptionInput.unsubscribe();
        this.subscriptionLoad && this.subscriptionLoad.unsubscribe();
    };
    HeaderSearchComponent.prototype.onClear = function () {
        this.isOpen = false;
        this.query = null;
        this.queryDataset = null;
        this.queryPage = 0;
        this.queryPrevious = null;
        this.queryPreviousDataset = null;
        this.results = null;
        this.tooltip = null;
    };
    HeaderSearchComponent.prototype.onDatasetChange = function (event, dataset) {
        event && event.preventDefault();
        this.queryDataset = dataset;
        this.onFocus(false);
        this.onInputChange();
    };
    HeaderSearchComponent.prototype.onFocus = function (value) {
        this.keyboardSelected = -1;
        this.isOpen = value;
        this.tooltip = null;
        value && this.input.nativeElement.focus();
    };
    HeaderSearchComponent.prototype.onKeyboardNavigate = function (i) {
        document.activeElement && document.activeElement['blur']();
        this.onFocus(false);
        this.router.navigate([this.results[i].Url]);
    };
    HeaderSearchComponent.prototype.onKeyboardSelect = function (direction) {
        if (this.results && this.results.length) {
            this.keyboardSelected = this.keyboardSelected + direction;
            this.keyboardSelected = Math.max(0, Math.min(this.keyboardSelected, this.results.length - 1));
        }
    };
    HeaderSearchComponent.prototype.onLoad = function (loaded) {
        this.isLoadedSearch = loaded;
        if (!loaded)
            this.onClear();
        this.changeDetector.markForCheck();
    };
    HeaderSearchComponent.prototype.onLoadMore = function () {
        this.queryPage++;
        this.onFocus(true);
        this.onInputChange();
    };
    HeaderSearchComponent.prototype.onInputChange = function () {
        var _this = this;
        // Ignore empty and duplicate queries
        if (this.query == null || this.query == '' || this.query.length <= 2)
            return this.onQueryResult({ page: 0, response: [] });
        if (this.query == this.queryPrevious && this.queryPage == this.queryPreviousPage)
            return;
        if (this.query != this.queryPrevious || this.queryDataset != this.queryPreviousDataset) {
            this.isLoadMore = true;
            this.queryPage = 0;
            this.results = [];
        }
        this.query = this.query.replace(/[~*+]/g, '');
        this.queryPrevious = this.query;
        this.queryPreviousDataset = this.queryDataset;
        this.queryPreviousPage = this.queryPage;
        // Hotfix: deal with incomplete queries and make sure multi word queries use an AND
        var query = this.query.trim();
        var words = query.split(' ');
        query = words
            .map(function (value, index) { return index == words.length - 1 ? '+' + value + '*' : '+' + value; })
            .join(' ');
        this.search
            .search(this.queryDataset, query, this.queryPage)
            .subscribe(function (value) { return _this.onQueryResult(value); });
    };
    HeaderSearchComponent.prototype.onQueryResult = function (result) {
        if (result) {
            this.results = result.page == 0 ? result.response : this.results.concat(result.response);
            this.isLoadMore = result.response.length > 0; // Disable 'Load more' in case no more results are being returned
        }
        this.tooltip = null;
        this.onFocus(true);
        this.changeDetector.detectChanges();
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('input'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"])
    ], HeaderSearchComponent.prototype, "input", void 0);
    HeaderSearchComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
            selector: 'tos-header-search',
            template: __webpack_require__(/*! ./header-search.component.html */ "./src/app/shell/header/header-search/header-search.component.html"),
            styles: [__webpack_require__(/*! ./header-search.component.scss */ "./src/app/shell/header/header-search/header-search.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"],
            _shared_service_tos_search_service__WEBPACK_IMPORTED_MODULE_3__["TOSSearchService"]])
    ], HeaderSearchComponent);
    return HeaderSearchComponent;
}());



/***/ }),

/***/ "./src/app/shell/header/header.component.html":
/*!****************************************************!*\
  !*** ./src/app/shell/header/header.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-dark\" style=\"background: #002A3A;\">\n  <a class=\"navbar-brand mr-4 p-0 order-0\" [routerLink]=\"routerLink('')\">\n    <img src=\"assets/images/logo_tos.png\" height=\"47\" style=\"transform: scale(1.25)\" />\n  </a>\n  <div class=\"navbar-expand m-auto m-md-0 order-3 order-md-1 pb-2 pb-md-0 pt-3 pt-md-0\">\n    <ul class=\"navbar-nav\">\n      <!--\n        <a class=\"dropdown-item\" style=\"color: grey\" routerLink=\"game/achievements\">Achievements</a>\n        <a class=\"dropdown-item\" style=\"color: grey\" routerLink=\"game/treasures\">Treasure Chests</a>\n        <a class=\"dropdown-item\" style=\"color: grey\" routerLink=\"game/exp\">EXP Tables</a>\n        <a class=\"dropdown-item\" style=\"color: grey\" routerLink=\"game/npcs\">NPCs</a>\n        <a class=\"dropdown-item\" style=\"color: grey\" routerLink=\"game/quests\">Quests</a>\n        <a class=\"dropdown-item\" style=\"color: grey\" routerLink=\"game/world\">World Map</a>\n      -->\n\n      <li class=\"nav-item dropdown\">\n        <a class=\"nav-link dropdown-toggle tos-link\" href=\"javascript:void(0);\" routerLinkActive=\"active\">\n          Database <span class=\"badge badge-danger\">New</span>\n          <div class=\"dropdown-menu\">\n            <div *ngFor=\"let group of TOSDataSetService.VALUES; index as i\">\n              <div class=\"dropdown-header\">{{ group.label }}</div>\n              <a *ngFor=\"let option of group.options\" class=\"dropdown-item\" routerLinkActive=\"active\"\n                 [routerLink]=\"routerLink('database/' + TOSDataSetService.toUrl(option))\">\n                {{ TOSDataSetService.toLabel(option) }}&nbsp;\n                <span class=\"badge badge-danger\" *ngIf=\"option == TOSDataSet.MAPS\">New</span>\n              </a>\n              <div class=\"dropdown-divider\" *ngIf=\"i < TOSDataSetService.VALUES.length - 1\"></div>\n            </div>\n          </div>\n        </a>\n\n      </li>\n\n      <li class=\"nav-item\">\n        <a class=\"nav-link tos-link\" [routerLink]=\"routerLink('simulator')\" routerLinkActive=\"active\">Skill Simulator</a>\n      </li>\n\n      <li class=\"nav-item d-lg-none\">\n        <a class=\"nav-link tos-link\" (click)=\"isOpenSearch = !isOpenSearch\">\n          &nbsp;<fa-icon [icon]=\"faSearch\"></fa-icon>&nbsp;\n        </a>\n      </li>\n\n    </ul>\n  </div>\n\n  <div class=\"d-none d-lg-block flex-grow-1 justify-content-center mt-3 mt-lg-0 order-5 order-lg-3\"\n       [ngClass]=\"{ 'd-flex': isOpenSearch }\">\n      <tos-header-search class=\"flex-grow-1 ml-lg-3 mr-lg-3\"></tos-header-search>\n  </div>\n\n  <div class=\"order-2 w-100 d-md-none\"></div>\n  <div class=\"order-4 w-100 d-lg-none\"></div>\n\n  <div class=\"navbar-expand order-1 order-md-3\">\n    <ul class=\"navbar-nav align-items-center\">\n      <!-- Region selector -->\n      <li class=\"nav-item dropdown\">\n        <a class=\"nav-link dropdown-toggle tos-link\" href=\"javascript:void(0);\" style=\"text-transform: initial;\">\n          {{ TOSRegionService.get() }}\n          <div class=\"dropdown-menu dropdown-menu-right\">\n            <a *ngFor=\"let region of REGION\" class=\"dropdown-item\" style=\"text-transform: initial;\"\n               [href]=\"'#' + region\"\n               [ngClass]=\"{ 'active': TOSRegionService.get() == region }\"\n               (click)=\"regionSelect(region)\">\n              {{ region }}&nbsp;\n              <span class=\"badge badge-success\" *ngIf=\"TOSRegionService.isRebuild(region)\">Re:Build</span>\n            </a>\n          </div>\n        </a>\n      </li>\n      <!-- Check for updates (manually) -->\n      <a class=\"nav-item nav-link ml-1 mr-1\" (click)=\"updateCheck(true)\" ngbTooltip=\"Check for updates\" placement=\"bottom\">\n        <fa-icon [icon]=\"faSync\"></fa-icon>\n      </a>\n      <!-- Theme selector -->\n      <a class=\"nav-item nav-link ml-1 mr-1\" (click)=\"theme.toggle()\" [ngbTooltip]=\"(theme.is(Theme.LIGHT) ? 'Dark' : 'Light') + ' Theme'\" placement=\"bottom\">\n        <fa-icon [icon]=\"theme.is(Theme.LIGHT) ? faMoon : faSun\"></fa-icon>\n      </a>\n    </ul>\n  </div>\n\n</nav>\n\n<!-- Patreon -->\n<div class=\"d-flex text-left pl-4 pr-4 pt-1 pb-1 mb-0 w-100\" style=\"background: #f96854\" *ngIf=\"patrons\">\n  <a class=\"flex-grow-1 text-white\" [routerLink]=\"routerLink('patreon')\">\n    <span>Thanks &nbsp;</span>\n    <span *ngFor=\"let patron of patrons; index as i\"><b>{{ patron }}</b><span *ngIf=\"i < patrons.length - 1\">,</span>&nbsp;</span>\n    <span><span *ngIf=\"patronsCount > 0\">and <b>{{ patronsCount }}&nbsp;</b></span>other patrons for supporting tos.guru!</span>\n  </a>\n  <div class=\"d-flex align-items-center text-white\" style=\"cursor: pointer\" (click)=\"patreonDismiss()\">\n    <span class=\"d-none d-sm-inline pl-1\">Dismiss</span>&nbsp;\n    <fa-icon class=\"pl-3\" [icon]=\"faTimes\"></fa-icon>\n  </div>\n</div>\n\n<!-- Update status -->\n<div class=\"text-center text-white text-sm-left pl-4 pr-4 pt-1 pb-1 mb-0 w-100 bg-secondary\" *ngIf=\"isUpdateCheck && isUpdateCheckManual && !isUpdateAvailable\">\n  Checking for updates...\n</div>\n<div class=\"text-center text-white text-sm-left pl-4 pr-4 pt-1 pb-1 mb-0 w-100 bg-info\" *ngIf=\"isUpdateInstall\">\n  Updating... The page will automatically refresh when it finishes\n</div>\n<a class=\"text-center text-white text-sm-left pl-4 pr-4 pt-1 pb-1 mb-0 w-100 bg-info d-block\" *ngIf=\"isUpdateAvailable && !isUpdateInstall\"\n   href=\"#update\" (click)=\"updateInstall($event)\">\n  A new update is available. Click to install\n</a>\n\n"

/***/ }),

/***/ "./src/app/shell/header/header.component.scss":
/*!****************************************************!*\
  !*** ./src/app/shell/header/header.component.scss ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: block;\n  position: relative;\n}\n\n.dropdown:hover .dropdown-menu {\n  display: block;\n}\n\n.dropdown-header {\n  text-transform: initial !important;\n}\n\n.navbar-nav .nav-item {\n  position: relative;\n  margin-left: 0.5rem;\n  margin-right: 0.5rem;\n}\n\n.nav-link {\n  cursor: pointer;\n  transition: none;\n}\n\n.navbar-nav .nav-link:hover {\n  color: #006bbe;\n}\n\n.tos-link {\n  color: white !important;\n  padding: 0 !important;\n  text-transform: uppercase;\n}\n\n.tos-link:before {\n  content: \"\";\n  position: absolute;\n  left: 0;\n  bottom: -6px;\n  background: #006bbe;\n  width: 0;\n  height: 2.6px;\n  transition: all 0.2s ease-in;\n}\n\n.tos-link:hover.tos-link:before,\n.tos-link.active.tos-link:before {\n  width: 100%;\n}\n\n.bg-info {\n  background-color: #006bbe !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9mdW5naS9FL1Rvc1Byb2plY3QvVG9zR3VydUJhc2UvdG9zLWRhdGFiYXNlL3Rvcy13ZWIvc3JjL2FwcC9zaGVsbC9oZWFkZXIvaGVhZGVyLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9zaGVsbC9oZWFkZXIvaGVhZGVyLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBO0VBQ0UsZUFBQTtFQUNBLG1CQUFBO0NDREQ7O0FESUQ7RUFBaUMsZUFBQTtDQ0FoQzs7QURDRDtFQUFtQixtQ0FBQTtDQ0dsQjs7QURERDtFQUNFLG1CQUFBO0VBQ0Esb0JBQUE7RUFDQSxxQkFBQTtDQ0lEOztBREZEO0VBQ0UsZ0JBQUE7RUFDQSxpQkFBQTtDQ0tEOztBREhEO0VBQ0UsZUFwQlc7Q0MwQlo7O0FESEQ7RUFDRSx3QkFBQTtFQUNBLHNCQUFBO0VBQ0EsMEJBQUE7Q0NNRDs7QURKRDtFQUNFLFlBQUE7RUFDQSxtQkFBQTtFQUNBLFFBQUE7RUFDQSxhQUFBO0VBQ0Esb0JBakNXO0VBa0NYLFNBQUE7RUFDQSxjQUFBO0VBQ0EsNkJBQUE7Q0NPRDs7QURKRDs7RUFFRSxZQUFBO0NDT0Q7O0FESkQ7RUFBVyxxQ0FBQTtDQ1FWIiwiZmlsZSI6InNyYy9hcHAvc2hlbGwvaGVhZGVyL2hlYWRlci5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIiRjb2xvci1pbmZvOiAjMDA2YmJlO1xuXG46aG9zdCB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG5cbi5kcm9wZG93bjpob3ZlciAuZHJvcGRvd24tbWVudSB7IGRpc3BsYXk6IGJsb2NrOyB9XG4uZHJvcGRvd24taGVhZGVyIHsgdGV4dC10cmFuc2Zvcm06IGluaXRpYWwgIWltcG9ydGFudDsgfVxuXG4ubmF2YmFyLW5hdiAubmF2LWl0ZW0ge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIG1hcmdpbi1sZWZ0OiAwLjVyZW07XG4gIG1hcmdpbi1yaWdodDogMC41cmVtO1xufVxuLm5hdi1saW5rIHtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0cmFuc2l0aW9uOiBub25lO1xufVxuLm5hdmJhci1uYXYgLm5hdi1saW5rOmhvdmVyIHtcbiAgY29sb3I6ICRjb2xvci1pbmZvO1xufVxuXG4udG9zLWxpbmsge1xuICBjb2xvcjogd2hpdGUgIWltcG9ydGFudDtcbiAgcGFkZGluZzogMCAhaW1wb3J0YW50O1xuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xufVxuLnRvcy1saW5rOmJlZm9yZSB7XG4gIGNvbnRlbnQ6IFwiXCI7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogMDtcbiAgYm90dG9tOiAtNnB4O1xuICBiYWNrZ3JvdW5kOiAkY29sb3ItaW5mbztcbiAgd2lkdGg6IDA7XG4gIGhlaWdodDogMi42cHg7XG4gIHRyYW5zaXRpb246IGFsbCAuMnMgZWFzZS1pbjtcbn1cblxuLnRvcy1saW5rOmhvdmVyLnRvcy1saW5rOmJlZm9yZSxcbi50b3MtbGluay5hY3RpdmUudG9zLWxpbms6YmVmb3JlIHtcbiAgd2lkdGg6IDEwMCU7XG59XG5cbi5iZy1pbmZvIHsgYmFja2dyb3VuZC1jb2xvcjogJGNvbG9yLWluZm8gIWltcG9ydGFudDsgfVxuIiwiOmhvc3Qge1xuICBkaXNwbGF5OiBibG9jaztcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuXG4uZHJvcGRvd246aG92ZXIgLmRyb3Bkb3duLW1lbnUge1xuICBkaXNwbGF5OiBibG9jaztcbn1cblxuLmRyb3Bkb3duLWhlYWRlciB7XG4gIHRleHQtdHJhbnNmb3JtOiBpbml0aWFsICFpbXBvcnRhbnQ7XG59XG5cbi5uYXZiYXItbmF2IC5uYXYtaXRlbSB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgbWFyZ2luLWxlZnQ6IDAuNXJlbTtcbiAgbWFyZ2luLXJpZ2h0OiAwLjVyZW07XG59XG5cbi5uYXYtbGluayB7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgdHJhbnNpdGlvbjogbm9uZTtcbn1cblxuLm5hdmJhci1uYXYgLm5hdi1saW5rOmhvdmVyIHtcbiAgY29sb3I6ICMwMDZiYmU7XG59XG5cbi50b3MtbGluayB7XG4gIGNvbG9yOiB3aGl0ZSAhaW1wb3J0YW50O1xuICBwYWRkaW5nOiAwICFpbXBvcnRhbnQ7XG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG59XG5cbi50b3MtbGluazpiZWZvcmUge1xuICBjb250ZW50OiBcIlwiO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDA7XG4gIGJvdHRvbTogLTZweDtcbiAgYmFja2dyb3VuZDogIzAwNmJiZTtcbiAgd2lkdGg6IDA7XG4gIGhlaWdodDogMi42cHg7XG4gIHRyYW5zaXRpb246IGFsbCAwLjJzIGVhc2UtaW47XG59XG5cbi50b3MtbGluazpob3Zlci50b3MtbGluazpiZWZvcmUsXG4udG9zLWxpbmsuYWN0aXZlLnRvcy1saW5rOmJlZm9yZSB7XG4gIHdpZHRoOiAxMDAlO1xufVxuXG4uYmctaW5mbyB7XG4gIGJhY2tncm91bmQtY29sb3I6ICMwMDZiYmUgIWltcG9ydGFudDtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/shell/header/header.component.ts":
/*!**************************************************!*\
  !*** ./src/app/shell/header/header.component.ts ***!
  \**************************************************/
/*! exports provided: HeaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeaderComponent", function() { return HeaderComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_service_theme_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/service/theme.service */ "./src/app/shared/service/theme.service.ts");
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "./node_modules/@fortawesome/free-solid-svg-icons/index.es.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons_faSun__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons/faSun */ "./node_modules/@fortawesome/free-solid-svg-icons/faSun.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons_faSun__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_solid_svg_icons_faSun__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _shared_service_tos_url_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../shared/service/tos-url.service */ "./src/app/shared/service/tos-url.service.ts");
/* harmony import */ var _shared_domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../shared/domain/tos/tos-domain */ "./src/app/shared/domain/tos/tos-domain.ts");
/* harmony import */ var _shared_domain_tos_region__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../shared/domain/tos-region */ "./src/app/shared/domain/tos-region.ts");
/* harmony import */ var _home_patreon_patreon_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../home/patreon/patreon.service */ "./src/app/home/patreon/patreon.service.ts");
/* harmony import */ var _shared_service_sw_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../shared/service/sw.service */ "./src/app/shared/service/sw.service.ts");










var UPDATE_KEY = 'update';
var UPDATE_INTERVAL = 60 * 60 * 1000;
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(changeDetector, sw, theme, zone) {
        this.changeDetector = changeDetector;
        this.sw = sw;
        this.theme = theme;
        this.zone = zone;
        this.REGION = Object.values(_shared_domain_tos_region__WEBPACK_IMPORTED_MODULE_7__["TOSRegion"]);
        this.Theme = _shared_service_theme_service__WEBPACK_IMPORTED_MODULE_2__["Theme"];
        this.TOSDataSet = _shared_domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_6__["TOSDataSet"];
        this.TOSDataSetService = _shared_domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_6__["TOSDataSetService"];
        this.TOSRegion = _shared_domain_tos_region__WEBPACK_IMPORTED_MODULE_7__["TOSRegion"];
        this.TOSRegionService = _shared_domain_tos_region__WEBPACK_IMPORTED_MODULE_7__["TOSRegionService"];
        this.faMoon = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__["faMoon"];
        this.faSearch = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__["faSearch"];
        this.faSun = _fortawesome_free_solid_svg_icons_faSun__WEBPACK_IMPORTED_MODULE_4__["faSun"];
        this.faTimes = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__["faTimes"];
        this.faSync = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__["faSync"];
        if (_home_patreon_patreon_service__WEBPACK_IMPORTED_MODULE_8__["PatreonService"].show) {
            this.patrons = _home_patreon_patreon_service__WEBPACK_IMPORTED_MODULE_8__["PatreonService"].random(3);
            this.patronsCount = _home_patreon_patreon_service__WEBPACK_IMPORTED_MODULE_8__["PatreonService"].count - 3;
        }
    }
    HeaderComponent.prototype.ngOnInit = function () {
        this.updateCheck();
    };
    HeaderComponent.prototype.ngOnDestroy = function () {
        clearTimeout(this.isUpdateCheckTimeout);
    };
    HeaderComponent.prototype.patreonDismiss = function () {
        _home_patreon_patreon_service__WEBPACK_IMPORTED_MODULE_8__["PatreonService"].dismiss();
        this.patrons = null;
        this.patronsCount = -1;
    };
    HeaderComponent.prototype.routerLink = function (url) {
        return _shared_service_tos_url_service__WEBPACK_IMPORTED_MODULE_5__["TOSUrlService"].Route(url);
    };
    HeaderComponent.prototype.regionSelect = function (region) {
        _shared_domain_tos_region__WEBPACK_IMPORTED_MODULE_7__["TOSRegionService"].select(region);
        return false;
    };
    HeaderComponent.prototype.updateInstall = function (event) {
        event.preventDefault();
        this.isUpdateInstall = true;
        this.changeDetector.markForCheck();
        this.sw.updateInstall();
    };
    HeaderComponent.prototype.updateCheck = function (updateManual) {
        var _this = this;
        if (updateManual === void 0) { updateManual = false; }
        this.isUpdateCheckManual = updateManual;
        this.changeDetector.markForCheck();
        var now = new Date();
        var updateNext = localStorage.getItem(UPDATE_KEY) && new Date(localStorage.getItem(UPDATE_KEY));
        updateNext && updateNext.setTime(updateNext.getTime() + UPDATE_INTERVAL);
        updateNext = updateNext || now;
        // If the time has come, check for updates
        if (updateNext.getTime() <= new Date().getTime() || (this.isUpdateCheckManual && !this.isUpdateAvailable && !this.isUpdateCheck)) {
            localStorage.setItem(UPDATE_KEY, now.toISOString());
            this.isUpdateCheck = true;
            this.changeDetector.markForCheck();
            this.sw.updateCheck$().subscribe(function (value) {
                _this.isUpdateCheck = false;
                _this.isUpdateCheckManual = false;
                _this.isUpdateAvailable = value;
                _this.changeDetector.detectChanges();
                _this.updateCheck();
            });
        }
        // In case there is no update available, schedule to check again in the future
        if (!this.isUpdateAvailable)
            this.zone.runOutsideAngular(function () {
                return _this.isUpdateCheckTimeout = setTimeout(function () { return _this.updateCheck(); }, UPDATE_INTERVAL);
            });
    };
    HeaderComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
            selector: 'tos-header',
            template: __webpack_require__(/*! ./header.component.html */ "./src/app/shell/header/header.component.html"),
            styles: [__webpack_require__(/*! ./header.component.scss */ "./src/app/shell/header/header.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"],
            _shared_service_sw_service__WEBPACK_IMPORTED_MODULE_9__["SWService"],
            _shared_service_theme_service__WEBPACK_IMPORTED_MODULE_2__["ThemeService"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]])
    ], HeaderComponent);
    return HeaderComponent;
}());



/***/ }),

/***/ "./src/app/shell/loading/loading.component.html":
/*!******************************************************!*\
  !*** ./src/app/shell/loading/loading.component.html ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"d-flex align-items-center justify-content-center h-100 w-100\" style=\"background: #002A3A;\"\n     [ngClass]=\"{ 'show': updateAvailable && !updateComplete }\"\n     [style.pointerEvents]=\"updateAvailable && !updateComplete ? 'initial' : 'none'\"\n     [style.transitionDuration]=\"updateAvailable ? '0.25s' : '1s'\">\n  <div class=\"position-relative text-center text-white\">\n    <div *ngIf=\"installSupported\">\n      <img class=\"mb-4 mb-sm-5\" src=\"assets/images/logo_tos.png\" />\n\n      <div *ngIf=\"!installComplete\">\n        <div class=\"progress\"><div class=\"progress-bar progress-bar-animated progress-bar-striped w-100\"></div></div>\n        <div class=\"mt-2\">Loading tos.guru...</div>\n      </div>\n      <div *ngIf=\"installComplete\">\n        <div class=\"progress\">\n          <div class=\"progress-bar progress-bar-animated progress-bar-striped\"\n               [style.width]=\"(updateProgress * 100 / updateTotal) + '%'\"></div>\n        </div>\n        <div class=\"mt-2\">\n          Updating to the latest patch... <span *ngIf=\"updateProgress\">{{ updateProgress }}/{{ updateTotal }}</span><br/>\n          <span class=\"font-italic text-muted\">{{ updateVersion }}</span>\n        </div>\n      </div>\n    </div>\n    <div *ngIf=\"!installSupported\">\n      <img class=\"mb-4 mb-sm-5\" src=\"assets/images/emoticons/emoticon_0003.png\" />\n      <div>It seems your browser doesn't support tos.guru</div>\n      <hr class=\"border-white mt-4 mt-sm-5\" />\n      <div class=\"text-left\">\n        <b>Troubleshooting:</b>\n        <ul>\n          <li>Please make sure you aren't using Incognito/Private mode</li>\n          <li>Alternatively, you can use one of the following browsers:\n          </li>\n        </ul>\n        <div class=\"d-flex justify-content-around font-weight-bold text-center text-white mt-3\">\n          <a href=\"https://www.microsoft.com/en-us/windows/microsoft-edge\" target=\"_blank\" class=\"d-flex flex-column\">\n            <img class=\"align-self-center\" src=\"https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png\" />\n            <span class=\"mt-1\">Edge</span>\n          </a>\n          <a href=\"https://www.mozilla.org/\" target=\"_blank\" class=\"d-flex flex-column\">\n            <img class=\"align-self-center\" src=\"https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png\" />\n            <span class=\"mt-1\">Firefox</span>\n          </a>\n          <a href=\"https://www.google.com/chrome/\" target=\"_blank\" class=\"d-flex flex-column\">\n            <img class=\"align-self-center\" src=\"https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png\" />\n            <span class=\"mt-1\">Chrome</span>\n          </a>\n          <a href=\"https://www.apple.com/safari/\" target=\"_blank\" class=\"d-flex flex-column\">\n            <img class=\"align-self-center\" src=\"https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png\" />\n            <span class=\"mt-1\">Safari</span>\n          </a>\n          <a href=\"https://www.opera.com/\" target=\"_blank\" class=\"d-flex flex-column\">\n            <img class=\"align-self-center\" src=\"https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png\" />\n            <span class=\"mt-1\">Opera</span>\n          </a>\n        </div>\n      </div>\n      <hr class=\"border-white\" />\n    </div>\n\n    <div class=\"d-flex justify-content-around font-weight-bold text-center text-white mt-4 mt-sm-5\">\n      <a href=\"https://discord.gg/8g76NAA\" target=\"_blank\" class=\"d-flex flex-column\">\n        <img class=\"align-self-center\" src=\"assets/images/logo_discord.png\" />\n        <span class=\"mt-1\">Discord</span>\n      </a>\n      <a href=\"https://github.com/rjgtav/tos-database\" target=\"_blank\" class=\"d-flex flex-column\">\n        <img class=\"align-self-center\" src=\"assets/images/logo_github_white.png\" />\n        <span class=\"mt-1\">GitHub</span>\n      </a>\n      <a href=\"https://patreon.com/rjgtav\" target=\"_blank\" class=\"d-flex flex-column\">\n        <img class=\"align-self-center\" src=\"assets/images/logo_patreon.png\" />\n        <span class=\"mt-1\">Patreon</span>\n      </a>\n      <a href=\"https://www.twitch.tv/rjgtav\" target=\"_blank\" class=\"d-flex flex-column\">\n        <img class=\"align-self-center\" src=\"assets/images/logo_twitch.png\" />\n        <span class=\"mt-1\">Twitch</span>\n      </a>\n    </div>\n\n    <div class=\"position-absolute mt-4 mt-sm-5 text-center w-100\" *ngIf=\"isClearCacheAvailable\">\n      <div>Installation stuck?</div>\n      <button type=\"button\" class=\"btn btn-danger mt-2\" (click)=\"onClearCacheClick()\">Clear cache</button>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/shell/loading/loading.component.scss":
/*!******************************************************!*\
  !*** ./src/app/shell/loading/loading.component.scss ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host > div {\n  position: fixed;\n  bottom: 0;\n  top: 0;\n  height: 100%;\n  width: 100%;\n  z-index: 99999;\n  opacity: 0;\n  transition: opacity 1s ease-in;\n}\n\n:host > div.show {\n  opacity: 1;\n}\n\na {\n  color: white;\n}\n\n.progress-bar {\n  background-color: #006bbe;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9mdW5naS9FL1Rvc1Byb2plY3QvVG9zR3VydUJhc2UvdG9zLWRhdGFiYXNlL3Rvcy13ZWIvc3JjL2FwcC9zaGVsbC9sb2FkaW5nL2xvYWRpbmcuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL3NoZWxsL2xvYWRpbmcvbG9hZGluZy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGdCQUFBO0VBQ0EsVUFBQTtFQUNBLE9BQUE7RUFFQSxhQUFBO0VBQ0EsWUFBQTtFQUVBLGVBQUE7RUFFQSxXQUFBO0VBQ0EsK0JBQUE7Q0NGRDs7QURJRDtFQUNFLFdBQUE7Q0NERDs7QURJRDtFQUFJLGFBQUE7Q0NBSDs7QURFRDtFQUFnQiwwQkFBQTtDQ0VmIiwiZmlsZSI6InNyYy9hcHAvc2hlbGwvbG9hZGluZy9sb2FkaW5nLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3QgPiBkaXYge1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIGJvdHRvbTogMDtcbiAgdG9wOiAwO1xuXG4gIGhlaWdodDogMTAwJTtcbiAgd2lkdGg6IDEwMCU7XG5cbiAgei1pbmRleDogOTk5OTk7XG5cbiAgb3BhY2l0eTogMDtcbiAgdHJhbnNpdGlvbjogb3BhY2l0eSAxcyBlYXNlLWluO1xufVxuOmhvc3QgPiBkaXYuc2hvdyB7XG4gIG9wYWNpdHk6IDE7XG59XG5cbmEgeyBjb2xvcjogd2hpdGUgfVxuXG4ucHJvZ3Jlc3MtYmFyIHsgYmFja2dyb3VuZC1jb2xvcjogIzAwNmJiZSB9XG4iLCI6aG9zdCA+IGRpdiB7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgYm90dG9tOiAwO1xuICB0b3A6IDA7XG4gIGhlaWdodDogMTAwJTtcbiAgd2lkdGg6IDEwMCU7XG4gIHotaW5kZXg6IDk5OTk5O1xuICBvcGFjaXR5OiAwO1xuICB0cmFuc2l0aW9uOiBvcGFjaXR5IDFzIGVhc2UtaW47XG59XG5cbjpob3N0ID4gZGl2LnNob3cge1xuICBvcGFjaXR5OiAxO1xufVxuXG5hIHtcbiAgY29sb3I6IHdoaXRlO1xufVxuXG4ucHJvZ3Jlc3MtYmFyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwNmJiZTtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/shell/loading/loading.component.ts":
/*!****************************************************!*\
  !*** ./src/app/shell/loading/loading.component.ts ***!
  \****************************************************/
/*! exports provided: LoadingComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoadingComponent", function() { return LoadingComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_service_update_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/service/update.service */ "./src/app/shared/service/update.service.ts");
/* harmony import */ var _loading_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./loading.service */ "./src/app/shell/loading/loading.service.ts");




var LoadingComponent = /** @class */ (function () {
    function LoadingComponent(changeDetector, loading, update, zone) {
        var _this = this;
        this.changeDetector = changeDetector;
        this.loading = loading;
        this.update = update;
        this.zone = zone;
        this.updateProgress = 0;
        this.updateTotal = 0;
        this.loading.updateProgress$.subscribe(function (value) { return _this.onUpdateProgress(value); });
        this.loading.updateComplete$.subscribe(function (value) { return _this.onUpdateComplete(); });
        this.loading.installComplete$.subscribe(function (value) { return _this.onInstallComplete(); });
        this.installSupported = this.loading.installSupported;
        this.onUpdateAvailable();
    }
    LoadingComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.zone.runOutsideAngular(function () { return _this.isClearCacheAvailableTimeout = setTimeout(function () {
            _this.isClearCacheAvailable = true;
            _this.changeDetector.detectChanges();
        }, 5 * 1000); });
    };
    LoadingComponent.prototype.ngOnDestroy = function () {
        clearTimeout(this.isClearCacheAvailableTimeout);
    };
    LoadingComponent.prototype.onClearCacheClick = function () {
        this.loading.clear();
    };
    LoadingComponent.prototype.onInstallComplete = function () {
        this.installComplete = true;
        this.changeDetector.markForCheck();
    };
    LoadingComponent.prototype.onUpdateAvailable = function () {
        this.updateAvailable = this.update.updateAvailable();
        this.updateAvailable && this.changeDetector.markForCheck();
        this.updateVersion = this.update.versionHuman;
    };
    LoadingComponent.prototype.onUpdateComplete = function () {
        this.updateComplete = true;
        this.changeDetector.markForCheck();
    };
    LoadingComponent.prototype.onUpdateProgress = function (value) {
        if (!this.updateAvailable)
            return;
        this.updateProgress = Math.max(value, 0);
        this.updateTotal = this.loading.updateTotal;
        this.changeDetector.markForCheck();
    };
    LoadingComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
            selector: 'tos-loading',
            template: __webpack_require__(/*! ./loading.component.html */ "./src/app/shell/loading/loading.component.html"),
            styles: [__webpack_require__(/*! ./loading.component.scss */ "./src/app/shell/loading/loading.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"],
            _loading_service__WEBPACK_IMPORTED_MODULE_3__["LoadingService"],
            _shared_service_update_service__WEBPACK_IMPORTED_MODULE_2__["UpdateService"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]])
    ], LoadingComponent);
    return LoadingComponent;
}());



/***/ }),

/***/ "./src/app/shell/loading/loading.service.ts":
/*!**************************************************!*\
  !*** ./src/app/shell/loading/loading.service.ts ***!
  \**************************************************/
/*! exports provided: LoadingService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoadingService", function() { return LoadingService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _shared_service_update_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/service/update.service */ "./src/app/shared/service/update.service.ts");
/* harmony import */ var _shared_domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../shared/domain/tos/tos-domain */ "./src/app/shared/domain/tos/tos-domain.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _shared_domain_tos_region__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../shared/domain/tos-region */ "./src/app/shared/domain/tos-region.ts");
/* harmony import */ var _shared_domain_tos_tos_domain_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../shared/domain/tos/tos-domain.service */ "./src/app/shared/domain/tos/tos-domain.service.ts");
/* harmony import */ var _shared_service_sw_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../shared/service/sw.service */ "./src/app/shared/service/sw.service.ts");










var LoadingService = /** @class */ (function () {
    function LoadingService(domain, http, sw, update) {
        this.domain = domain;
        this.http = http;
        this.sw = sw;
        this.update = update;
        this.installComplete = new rxjs__WEBPACK_IMPORTED_MODULE_3__["ReplaySubject"](1);
        this.updateComplete = new rxjs__WEBPACK_IMPORTED_MODULE_3__["ReplaySubject"](1);
        this.updateProgress = new rxjs__WEBPACK_IMPORTED_MODULE_3__["BehaviorSubject"](-1);
        this.sw.enabled
            ? this.installCheck()
            : this.onInstallComplete();
    }
    Object.defineProperty(LoadingService.prototype, "installComplete$", {
        get: function () { return this.installComplete.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["take"])(1)); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoadingService.prototype, "installSupported", {
        get: function () { return !!navigator.serviceWorker && !!window.indexedDB; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoadingService.prototype, "updateComplete$", {
        get: function () { return this.updateComplete.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["take"])(1)); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoadingService.prototype, "updateProgress$", {
        get: function () { return this.updateProgress.asObservable(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoadingService.prototype, "updateTotal", {
        get: function () { return Object.values(_shared_domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_5__["TOSDataSet"]).length; },
        enumerable: true,
        configurable: true
    });
    LoadingService.prototype.clear = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var confirm, _a, _b, _c, _d;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_e) {
                switch (_e.label) {
                    case 0:
                        confirm = "\n      =====================================\n       Please close all other tos.guru tabs before proceeding\n      =====================================\n      \n      Are you sure you want to clear the cache?\n      This process will take a couple of minutes\n    ";
                        if (!window.confirm(confirm)) return [3 /*break*/, 7];
                        if (!window.caches) return [3 /*break*/, 3];
                        // Clear cache
                        console.log('Clearing cache...');
                        _b = (_a = Promise).all;
                        return [4 /*yield*/, window.caches.keys()];
                    case 1: return [4 /*yield*/, _b.apply(_a, [(_e.sent())
                                .map(function (value) { return window.caches.delete(value); })])];
                    case 2:
                        _e.sent();
                        _e.label = 3;
                    case 3:
                        // Clear IndexedDB for the current region
                        console.log('Clearing IndexedDB...');
                        return [4 /*yield*/, Promise
                                .all(Object.values(_shared_domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_5__["TOSDataSet"])
                                .map(function (value) { return new Promise(function (resolve) {
                                var request = window.indexedDB.deleteDatabase(_shared_domain_tos_region__WEBPACK_IMPORTED_MODULE_7__["TOSRegionService"].getUrl() + '/' + _shared_domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_5__["TOSDataSetService"].toUrl(value));
                                request.onsuccess = function () { return resolve(); };
                            }); }))];
                    case 4:
                        _e.sent();
                        // Clear version
                        console.log('Clearing version...');
                        this.update.updateVersion(true);
                        // Unregister service worker
                        console.log('Unregistering service worker...');
                        _d = (_c = Promise).all;
                        return [4 /*yield*/, navigator.serviceWorker.getRegistrations()];
                    case 5: return [4 /*yield*/, _d.apply(_c, [(_e.sent()).map(function (value) { return value.unregister(); })])];
                    case 6:
                        _e.sent();
                        location.reload(true);
                        _e.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    LoadingService.prototype.installCheck = function () {
        var _this = this;
        this.sw.installComplete()
            ? this.onInstallComplete()
            : setTimeout(function () { return _this.installCheck(); }, 250);
    };
    LoadingService.prototype.updateCheck = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var region, _i, _a, dataset;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        region = _shared_domain_tos_region__WEBPACK_IMPORTED_MODULE_7__["TOSRegionService"].get();
                        //console.log('updateCheck', region);
                        if (!this.update.updateAvailable())
                            return [2 /*return*/, this.onUpdateComplete()];
                        this.updateProgress.next(0);
                        _i = 0, _a = Object.values(_shared_domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_5__["TOSDataSet"]);
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        dataset = _a[_i];
                        return [4 /*yield*/, this.domain.load(dataset, region).toPromise()];
                    case 2:
                        _b.sent();
                        //console.log('updateProgress', this.updateProgress.getValue() + 1);
                        this.updateProgress.next(this.updateProgress.getValue() + 1);
                        this.updateProgress.getValue() == this.updateTotal && this.onUpdateComplete();
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        this.update.updateVersion();
                        return [2 /*return*/];
                }
            });
        });
    };
    LoadingService.prototype.onInstallComplete = function () {
        //console.log('onInstallComplete');
        this.installComplete.next(this.installSupported);
        this.updateCheck();
    };
    LoadingService.prototype.onUpdateComplete = function () {
        //console.log('onUpdateComplete');
        this.updateComplete.next(true);
    };
    LoadingService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_shared_domain_tos_tos_domain_service__WEBPACK_IMPORTED_MODULE_8__["TOSDomainService"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"],
            _shared_service_sw_service__WEBPACK_IMPORTED_MODULE_9__["SWService"],
            _shared_service_update_service__WEBPACK_IMPORTED_MODULE_4__["UpdateService"]])
    ], LoadingService);
    return LoadingService;
}());



/***/ }),

/***/ "./src/app/shell/shell.module.ts":
/*!***************************************!*\
  !*** ./src/app/shell/shell.module.ts ***!
  \***************************************/
/*! exports provided: ShellModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShellModule", function() { return ShellModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
/* harmony import */ var _header_header_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./header/header.component */ "./src/app/shell/header/header.component.ts");
/* harmony import */ var _footer_footer_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./footer/footer.component */ "./src/app/shell/footer/footer.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @fortawesome/angular-fontawesome */ "./node_modules/@fortawesome/angular-fontawesome/fesm5/angular-fontawesome.js");
/* harmony import */ var ng_click_outside__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ng-click-outside */ "./node_modules/ng-click-outside/lib/index.js");
/* harmony import */ var ng_click_outside__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(ng_click_outside__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _header_header_search_header_search_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./header/header-search/header-search.component */ "./src/app/shell/header/header-search/header-search.component.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var _shell_shell_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./shell/shell.component */ "./src/app/shell/shell/shell.component.ts");













var ShellModule = /** @class */ (function () {
    function ShellModule() {
    }
    ShellModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                ng_click_outside__WEBPACK_IMPORTED_MODULE_8__["ClickOutsideModule"],
                _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_7__["FontAwesomeModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_10__["FormsModule"],
                _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__["NgbModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_6__["RouterModule"],
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_11__["SharedModule"]
            ],
            declarations: [_shell_shell_component__WEBPACK_IMPORTED_MODULE_12__["ShellComponent"], _header_header_component__WEBPACK_IMPORTED_MODULE_4__["HeaderComponent"], _footer_footer_component__WEBPACK_IMPORTED_MODULE_5__["FooterComponent"], _header_header_search_header_search_component__WEBPACK_IMPORTED_MODULE_9__["HeaderSearchComponent"]],
            exports: [_shell_shell_component__WEBPACK_IMPORTED_MODULE_12__["ShellComponent"]]
        })
    ], ShellModule);
    return ShellModule;
}());



/***/ }),

/***/ "./src/app/shell/shell/shell.component.html":
/*!**************************************************!*\
  !*** ./src/app/shell/shell/shell.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<tos-header class=\"mb-3 mb-sm-5\"></tos-header>\n\n<div class=\"container\" style=\"min-height: calc(100% - 80px)\">\n  <ng-content></ng-content>\n</div>\n\n<tos-footer></tos-footer>\n\n<a class=\"position-fixed btn mb-3 mr-3 text-white\"\n   style=\"background: #006bbe; bottom: 0; right: 0; z-index: 1\"\n   href=\"http://feedback.userreport.com/e23e275c-deb8-4560-9434-070fc22b6208\" target=\"_blank\">\n  <fa-icon [icon]=\"faCommentAlt\"></fa-icon>\n  <span class=\"ml-1\">Feedback</span>\n</a>\n"

/***/ }),

/***/ "./src/app/shell/shell/shell.component.scss":
/*!**************************************************!*\
  !*** ./src/app/shell/shell/shell.component.scss ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3NoZWxsL3NoZWxsL3NoZWxsLmNvbXBvbmVudC5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/shell/shell/shell.component.ts":
/*!************************************************!*\
  !*** ./src/app/shell/shell/shell.component.ts ***!
  \************************************************/
/*! exports provided: ShellComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShellComponent", function() { return ShellComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "./node_modules/@fortawesome/free-solid-svg-icons/index.es.js");
/* harmony import */ var _fortawesome_free_brands_svg_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @fortawesome/free-brands-svg-icons */ "./node_modules/@fortawesome/free-brands-svg-icons/index.es.js");




var ShellComponent = /** @class */ (function () {
    function ShellComponent() {
        this.faCommentAlt = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_2__["faCommentAlt"];
        this.faPatreon = _fortawesome_free_brands_svg_icons__WEBPACK_IMPORTED_MODULE_3__["faPatreon"];
    }
    ShellComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
            selector: 'tos-shell',
            template: __webpack_require__(/*! ./shell.component.html */ "./src/app/shell/shell/shell.component.html"),
            styles: [__webpack_require__(/*! ./shell.component.scss */ "./src/app/shell/shell/shell.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], ShellComponent);
    return ShellComponent;
}());



/***/ }),

/***/ "./src/app/skill-simulator/skill-builder/skill-builder-job-rank-list/skill-builder-job-rank-list.component.html":
/*!**********************************************************************************************************************!*\
  !*** ./src/app/skill-simulator/skill-builder/skill-builder-job-rank-list/skill-builder-job-rank-list.component.html ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row justify-content-center\">\n  <div *ngFor=\"let job of jobs; let i = index\" class=\"position-relative\" style=\"width: 4rem\"\n       (mouseenter)=\"jobsHover[i] = true; build.tooltip(job, true)\"\n       (mouseleave)=\"jobsHover[i] = false; build.tooltip(job, false)\">\n\n    <!-- Icon -->\n    <tos-entity-detail-JobIcon class=\"w-100\" style=\"height: 4rem;\"\n                                [circle]=\"jobsCircle[i]\"\n                                [job]=\"job\"\n                                [size]=\"'xs'\"></tos-entity-detail-JobIcon>\n\n    <!-- Delete -->\n    <a *ngIf=\"jobsHover[i]\" href=\"#remove\"\n       class=\"d-flex align-items-center rounded-circle justify-content-center position-absolute text-white\"\n       style=\"background: rgba(0, 0, 0, 0.5); height: 3rem; width: 3rem; left: 0.5rem; top: 0.5rem\"\n       (click)=\"onRemoveClick($event, i + 1)\">\n      <fa-icon [icon]=\"faTrashAlt\"></fa-icon>\n    </a>\n  </div>\n\n  <!-- Next rank -->\n  <app-skill-builder-job-rank *ngIf=\"build.Rank < RANK_LIMIT\" class=\"mb-3\"\n                              [rank]=\"build.Rank + 1\"></app-skill-builder-job-rank>\n\n</div>\n"

/***/ }),

/***/ "./src/app/skill-simulator/skill-builder/skill-builder-job-rank-list/skill-builder-job-rank-list.component.scss":
/*!**********************************************************************************************************************!*\
  !*** ./src/app/skill-simulator/skill-builder/skill-builder-job-rank-list/skill-builder-job-rank-list.component.scss ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3NraWxsLXNpbXVsYXRvci9za2lsbC1idWlsZGVyL3NraWxsLWJ1aWxkZXItam9iLXJhbmstbGlzdC9za2lsbC1idWlsZGVyLWpvYi1yYW5rLWxpc3QuY29tcG9uZW50LnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/skill-simulator/skill-builder/skill-builder-job-rank-list/skill-builder-job-rank-list.component.ts":
/*!********************************************************************************************************************!*\
  !*** ./src/app/skill-simulator/skill-builder/skill-builder-job-rank-list/skill-builder-job-rank-list.component.ts ***!
  \********************************************************************************************************************/
/*! exports provided: SkillBuilderJobRankListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SkillBuilderJobRankListComponent", function() { return SkillBuilderJobRankListComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_domain_tos_tos_build__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../shared/domain/tos/tos-build */ "./src/app/shared/domain/tos/tos-build.ts");
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "./node_modules/@fortawesome/free-solid-svg-icons/index.es.js");




var SkillBuilderJobRankListComponent = /** @class */ (function () {
    function SkillBuilderJobRankListComponent(changeDetector) {
        this.changeDetector = changeDetector;
        this.faTrashAlt = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__["faTrashAlt"];
        this.RANK_LIMIT = _shared_domain_tos_tos_build__WEBPACK_IMPORTED_MODULE_2__["RANK_LIMIT"];
    }
    SkillBuilderJobRankListComponent.prototype.onRemoveClick = function (event, rank) {
        event.preventDefault();
        this.build.jobRemove$(rank);
    };
    SkillBuilderJobRankListComponent.prototype.onJobChange = function () {
        var _this = this;
        this.jobs = this.build.Jobs;
        this.jobsCircle = [];
        this.jobsHover = [];
        this.jobs.reduce(function (accumulator, value) {
            if (accumulator[value.$ID])
                _this.jobsCircle.push(accumulator[value.$ID] = accumulator[value.$ID] + 1);
            else
                _this.jobsCircle.push(accumulator[value.$ID] = 1);
            return accumulator;
        }, {});
        this.changeDetector.markForCheck();
    };
    SkillBuilderJobRankListComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (this.build) {
            this.subscriptionJobs && this.subscriptionJobs.unsubscribe();
            this.subscriptionJobs = this.build.Job$.subscribe(function (value) { return _this.onJobChange(); });
        }
    };
    SkillBuilderJobRankListComponent.prototype.ngOnDestroy = function () {
        this.changeDetector.detach();
        this.subscriptionJobs && this.subscriptionJobs.unsubscribe();
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _shared_domain_tos_tos_build__WEBPACK_IMPORTED_MODULE_2__["TOSSimulatorBuild"])
    ], SkillBuilderJobRankListComponent.prototype, "build", void 0);
    SkillBuilderJobRankListComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
            selector: 'app-skill-builder-job-rank-list',
            template: __webpack_require__(/*! ./skill-builder-job-rank-list.component.html */ "./src/app/skill-simulator/skill-builder/skill-builder-job-rank-list/skill-builder-job-rank-list.component.html"),
            styles: [__webpack_require__(/*! ./skill-builder-job-rank-list.component.scss */ "./src/app/skill-simulator/skill-builder/skill-builder-job-rank-list/skill-builder-job-rank-list.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]])
    ], SkillBuilderJobRankListComponent);
    return SkillBuilderJobRankListComponent;
}());



/***/ }),

/***/ "./src/app/skill-simulator/skill-builder/skill-builder-job-rank/skill-builder-job-rank.component.html":
/*!************************************************************************************************************!*\
  !*** ./src/app/skill-simulator/skill-builder/skill-builder-job-rank/skill-builder-job-rank.component.html ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"position-absolute h-100 w-100 bg-primary\" style=\"border-radius: 50%; transform: scale(0.85);\"></div>\n<div class=\"position-absolute h-100 w-100\" style=\"border: 2px dashed #bbb; border-radius: 50%;\"></div>\n<div class=\"position-absolute d-flex justify-content-center align-items-center h-100 w-100\">\n  <h5 class=\"text-white mb-0\">{{ rank }}</h5>\n</div>\n"

/***/ }),

/***/ "./src/app/skill-simulator/skill-builder/skill-builder-job-rank/skill-builder-job-rank.component.scss":
/*!************************************************************************************************************!*\
  !*** ./src/app/skill-simulator/skill-builder/skill-builder-job-rank/skill-builder-job-rank.component.scss ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  position: relative;\n  width: 3.75rem;\n  height: 3.75rem;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9mdW5naS9FL1Rvc1Byb2plY3QvVG9zR3VydUJhc2UvdG9zLWRhdGFiYXNlL3Rvcy13ZWIvc3JjL2FwcC9za2lsbC1zaW11bGF0b3Ivc2tpbGwtYnVpbGRlci9za2lsbC1idWlsZGVyLWpvYi1yYW5rL3NraWxsLWJ1aWxkZXItam9iLXJhbmsuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL3NraWxsLXNpbXVsYXRvci9za2lsbC1idWlsZGVyL3NraWxsLWJ1aWxkZXItam9iLXJhbmsvc2tpbGwtYnVpbGRlci1qb2ItcmFuay5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLG1CQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0NDQ0QiLCJmaWxlIjoic3JjL2FwcC9za2lsbC1zaW11bGF0b3Ivc2tpbGwtYnVpbGRlci9za2lsbC1idWlsZGVyLWpvYi1yYW5rL3NraWxsLWJ1aWxkZXItam9iLXJhbmsuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyI6aG9zdCB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgd2lkdGg6IDMuNzVyZW07XG4gIGhlaWdodDogMy43NXJlbTtcbn1cbiIsIjpob3N0IHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB3aWR0aDogMy43NXJlbTtcbiAgaGVpZ2h0OiAzLjc1cmVtO1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/skill-simulator/skill-builder/skill-builder-job-rank/skill-builder-job-rank.component.ts":
/*!**********************************************************************************************************!*\
  !*** ./src/app/skill-simulator/skill-builder/skill-builder-job-rank/skill-builder-job-rank.component.ts ***!
  \**********************************************************************************************************/
/*! exports provided: SkillBuilderJobRankComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SkillBuilderJobRankComponent", function() { return SkillBuilderJobRankComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var SkillBuilderJobRankComponent = /** @class */ (function () {
    function SkillBuilderJobRankComponent() {
    }
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Number)
    ], SkillBuilderJobRankComponent.prototype, "rank", void 0);
    SkillBuilderJobRankComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
            selector: 'app-skill-builder-job-rank',
            template: __webpack_require__(/*! ./skill-builder-job-rank.component.html */ "./src/app/skill-simulator/skill-builder/skill-builder-job-rank/skill-builder-job-rank.component.html"),
            styles: [__webpack_require__(/*! ./skill-builder-job-rank.component.scss */ "./src/app/skill-simulator/skill-builder/skill-builder-job-rank/skill-builder-job-rank.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], SkillBuilderJobRankComponent);
    return SkillBuilderJobRankComponent;
}());



/***/ }),

/***/ "./src/app/skill-simulator/skill-builder/skill-builder-job-selector/skill-builder-job-selector.component.html":
/*!********************************************************************************************************************!*\
  !*** ./src/app/skill-simulator/skill-builder/skill-builder-job-selector/skill-builder-job-selector.component.html ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"card mb-3 shadow\" *ngIf=\"jobsAvailable && jobsAvailable.length\">\n  <div class=\"card-body\">\n\n    <!-- Choose a class -->\n    <div class=\"row align-items-center mb-3\">\n\n      <app-skill-builder-job-rank class=\"ml-3\" [rank]=\"rank\"></app-skill-builder-job-rank>\n      <h4 class=\"col mb-0\"><span>Choose a Class</span></h4>\n\n    </div>\n\n    <!-- Class list -->\n    <div class=\"row\" [style.justifyContent]=\"rank == 1 ? 'center' : ''\">\n      <a *ngFor=\"let job of jobsAvailable; let i = index\" class=\"col-4 col-sm-3 col-md-2 mb-3 tos-job\"\n         [href]=\"'#' + job.Name\"\n         (click)=\"onJobClick($event, job)\"\n         (mouseenter)=\"build.tooltip(job, true)\"\n         (mouseleave)=\"build.tooltip(job, false)\">\n        <tos-entity-detail-JobIcon class=\"m-auto\"\n                                   [circle]=\"build.jobCircle(job) + 1\"\n                                   [job]=\"job\"\n                                   [size]=\"'xs'\"></tos-entity-detail-JobIcon>\n        <div class=\"text-center w-100\">{{ job.Name }}</div>\n      </a>\n    </div>\n\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/skill-simulator/skill-builder/skill-builder-job-selector/skill-builder-job-selector.component.scss":
/*!********************************************************************************************************************!*\
  !*** ./src/app/skill-simulator/skill-builder/skill-builder-job-selector/skill-builder-job-selector.component.scss ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".tos-job img {\n  transition: all 0.4s ease;\n}\n\n.tos-job:hover img {\n  transform: translateY(-8px);\n}\n\n.tos-job fa-icon {\n  color: #bbb;\n  filter: drop-shadow(0 0 1px #666);\n  stroke: white;\n  stroke-width: 3rem;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9mdW5naS9FL1Rvc1Byb2plY3QvVG9zR3VydUJhc2UvdG9zLWRhdGFiYXNlL3Rvcy13ZWIvc3JjL2FwcC9za2lsbC1zaW11bGF0b3Ivc2tpbGwtYnVpbGRlci9za2lsbC1idWlsZGVyLWpvYi1zZWxlY3Rvci9za2lsbC1idWlsZGVyLWpvYi1zZWxlY3Rvci5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvc2tpbGwtc2ltdWxhdG9yL3NraWxsLWJ1aWxkZXIvc2tpbGwtYnVpbGRlci1qb2Itc2VsZWN0b3Ivc2tpbGwtYnVpbGRlci1qb2Itc2VsZWN0b3IuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSwwQkFBQTtDQ0NEOztBRENEO0VBQ0UsNEJBQUE7Q0NFRDs7QURDRDtFQUNFLFlBQUE7RUFDQSxrQ0FBQTtFQUNBLGNBQUE7RUFDQSxtQkFBQTtDQ0VEIiwiZmlsZSI6InNyYy9hcHAvc2tpbGwtc2ltdWxhdG9yL3NraWxsLWJ1aWxkZXIvc2tpbGwtYnVpbGRlci1qb2Itc2VsZWN0b3Ivc2tpbGwtYnVpbGRlci1qb2Itc2VsZWN0b3IuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIudG9zLWpvYiBpbWcge1xuICB0cmFuc2l0aW9uOiBhbGwgLjRzIGVhc2U7XG59XG4udG9zLWpvYjpob3ZlciBpbWcge1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLThweCk7XG59XG5cbi50b3Mtam9iIGZhLWljb24ge1xuICBjb2xvcjogI2JiYjtcbiAgZmlsdGVyOiBkcm9wLXNoYWRvdyggMCAwIDFweCAjNjY2ICk7XG4gIHN0cm9rZTogd2hpdGU7XG4gIHN0cm9rZS13aWR0aDogM3JlbTtcbn1cbiIsIi50b3Mtam9iIGltZyB7XG4gIHRyYW5zaXRpb246IGFsbCAwLjRzIGVhc2U7XG59XG5cbi50b3Mtam9iOmhvdmVyIGltZyB7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtOHB4KTtcbn1cblxuLnRvcy1qb2IgZmEtaWNvbiB7XG4gIGNvbG9yOiAjYmJiO1xuICBmaWx0ZXI6IGRyb3Atc2hhZG93KDAgMCAxcHggIzY2Nik7XG4gIHN0cm9rZTogd2hpdGU7XG4gIHN0cm9rZS13aWR0aDogM3JlbTtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/skill-simulator/skill-builder/skill-builder-job-selector/skill-builder-job-selector.component.ts":
/*!******************************************************************************************************************!*\
  !*** ./src/app/skill-simulator/skill-builder/skill-builder-job-selector/skill-builder-job-selector.component.ts ***!
  \******************************************************************************************************************/
/*! exports provided: SkillBuilderJobSelectorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SkillBuilderJobSelectorComponent", function() { return SkillBuilderJobSelectorComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_domain_tos_tos_build__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../shared/domain/tos/tos-build */ "./src/app/shared/domain/tos/tos-build.ts");
/* harmony import */ var _shared_domain_tos_tos_domain_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../shared/domain/tos/tos-domain.service */ "./src/app/shared/domain/tos/tos-domain.service.ts");




var SkillBuilderJobSelectorComponent = /** @class */ (function () {
    function SkillBuilderJobSelectorComponent(changeDetector) {
        this.changeDetector = changeDetector;
    }
    SkillBuilderJobSelectorComponent.prototype.onJobClick = function (event, job) {
        event.preventDefault();
        this.build.jobAdd$(job);
    };
    SkillBuilderJobSelectorComponent.prototype.onJobChange = function () {
        var _this = this;
        this.rank = this.build.Rank + 1;
        var observable = this.rank == 1 ? _shared_domain_tos_tos_domain_service__WEBPACK_IMPORTED_MODULE_3__["TOSDomainService"].jobsByStarter(true) : _shared_domain_tos_tos_domain_service__WEBPACK_IMPORTED_MODULE_3__["TOSDomainService"].jobsByTree(this.build.JobTree);
        observable.subscribe(function (value) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
            var valueAvailable;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all(value.map(function (value) { return _this.build.jobUnlockAvailable$(value).toPromise(); }))];
                    case 1:
                        valueAvailable = _a.sent();
                        this.jobsAvailable = value
                            .filter(function (value, index) { return valueAvailable[index]; })
                            .sort(function (a, b) {
                            if (a.Rank != b.Rank)
                                return a.Rank - b.Rank;
                            return a.$ID < b.$ID ? -1 : a.$ID > b.$ID ? 1 : 0;
                        });
                        this.changeDetector.markForCheck();
                        return [2 /*return*/];
                }
            });
        }); });
    };
    SkillBuilderJobSelectorComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes.build) {
            this.subscriptionJobs && this.subscriptionJobs.unsubscribe();
            this.subscriptionJobs = this.build.Job$.subscribe(function (value) { return _this.onJobChange(); });
        }
    };
    SkillBuilderJobSelectorComponent.prototype.ngOnDestroy = function () {
        this.subscriptionJobs && this.subscriptionJobs.unsubscribe();
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _shared_domain_tos_tos_build__WEBPACK_IMPORTED_MODULE_2__["TOSSimulatorBuild"])
    ], SkillBuilderJobSelectorComponent.prototype, "build", void 0);
    SkillBuilderJobSelectorComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
            selector: 'app-skill-builder-job-selector',
            template: __webpack_require__(/*! ./skill-builder-job-selector.component.html */ "./src/app/skill-simulator/skill-builder/skill-builder-job-selector/skill-builder-job-selector.component.html"),
            styles: [__webpack_require__(/*! ./skill-builder-job-selector.component.scss */ "./src/app/skill-simulator/skill-builder/skill-builder-job-selector/skill-builder-job-selector.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]])
    ], SkillBuilderJobSelectorComponent);
    return SkillBuilderJobSelectorComponent;
}());



/***/ }),

/***/ "./src/app/skill-simulator/skill-builder/skill-builder-job/skill-builder-job.component.html":
/*!**************************************************************************************************!*\
  !*** ./src/app/skill-simulator/skill-builder/skill-builder-job/skill-builder-job.component.html ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"card d-flex flex-column flex-sm-row flex-wrap justify-content-center justify-content-sm-start mb-3 shadow\">\n\n  <!-- Job header -->\n  <div class=\"tos-job bg-primary justify-content-between pr-0 text-white\">\n    <div class=\"d-flex\">\n\n      <!-- Job Icon & Circle -->\n      <tos-entity-detail-JobIcon [circle]=\"circles.length\" style=\"width: 3rem; height: 3rem;\"\n                                 [job]=\"job\"\n                                 [size]=\"'xs'\"\n                                 (mouseenter)=\"build.tooltip(job, true)\"\n                                 (mouseleave)=\"build.tooltip(job, false)\"></tos-entity-detail-JobIcon>\n\n      <!-- Job Name & Job Attributes -->\n      <div class=\"pl-2\">\n        <a class=\"text-white\" [style.lineHeight]=\"attributes ? '' : '3rem'\"\n           [routerLink]=\"job.Url\">\n          {{ job.Name }}\n        </a>\n\n        <br *ngIf=\"attributes\"/>\n\n        <a *ngFor=\"let attribute of attributes; index as i; trackBy: TOSEntity.trackBy\" [routerLink]=\"attribute.Url\">\n          <img class=\"tos-attribute\"\n               [src]=\"attribute.Icon\"\n               [style.opacity]=\"attributesUnlock && attributesUnlock[i] ? 1 : 0.5\"\n               (mouseenter)=\"build.tooltip(attribute, true)\"\n               (mouseleave)=\"build.tooltip(attribute, false)\"/>\n        </a>\n      </div>\n\n    </div>\n\n    <!-- Skill Points -->\n    <div class=\"d-none d-sm-block position-absolute badge badge-primary rounded-0\" style=\"top: -0.5rem; right: -0.5rem; font-size: inherit\">\n      {{ skillPoints }} points\n    </div>\n    <div class=\"d-flex d-sm-none align-items-center pr-3\">\n      <a href=\"#remove\"\n         class=\"d-flex align-items-center justify-content-center bg-white text-primary rounded-circle mr-2\"\n         style=\"background: rgba(0, 0, 0, 0.5); height: 2.5rem; width: 2.5rem; z-index: 1\"\n         (click)=\"onRemoveClick($event)\">\n        <fa-icon [icon]=\"faTrashAlt\"></fa-icon>\n      </a>\n\n      <span style=\"z-index: 1; pointer-events: none\">{{ skillPoints }} points</span>\n    </div>\n  </div>\n\n  <!-- Job Skills -->\n  <app-skill-builder-skill *ngFor=\"let skill of skills; trackBy: TOSEntity.trackBy\" class=\"tos-skill\"\n                           [build]=\"build\"\n                           [job]=\"job\"\n                           [skill]=\"skill\"></app-skill-builder-skill>\n\n</div>\n"

/***/ }),

/***/ "./src/app/skill-simulator/skill-builder/skill-builder-job/skill-builder-job.component.scss":
/*!**************************************************************************************************!*\
  !*** ./src/app/skill-simulator/skill-builder/skill-builder-job/skill-builder-job.component.scss ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: block;\n  position: relative;\n}\n\n.tos-attribute {\n  width: 1.5rem;\n  height: 1.5rem;\n}\n\n.tos-job,\n.tos-skill {\n  display: flex;\n  align-items: center;\n  width: 215px;\n  padding: 10px;\n}\n\n@media (max-width: 575.98px) {\n  .tos-job, .tos-skill {\n    width: 100%;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9mdW5naS9FL1Rvc1Byb2plY3QvVG9zR3VydUJhc2UvdG9zLWRhdGFiYXNlL3Rvcy13ZWIvc3JjL2FwcC9za2lsbC1zaW11bGF0b3Ivc2tpbGwtYnVpbGRlci9za2lsbC1idWlsZGVyLWpvYi9za2lsbC1idWlsZGVyLWpvYi5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvc2tpbGwtc2ltdWxhdG9yL3NraWxsLWJ1aWxkZXIvc2tpbGwtYnVpbGRlci1qb2Ivc2tpbGwtYnVpbGRlci1qb2IuY29tcG9uZW50LnNjc3MiLCIvVXNlcnMvZnVuZ2kvRS9Ub3NQcm9qZWN0L1Rvc0d1cnVCYXNlL3Rvcy1kYXRhYmFzZS90b3Mtd2ViL25vZGVfbW9kdWxlcy9ib290c3RyYXAvc2Nzcy9taXhpbnMvX2JyZWFrcG9pbnRzLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBSUE7RUFDRSxlQUFBO0VBQ0EsbUJBQUE7Q0NIRDs7QURNRDtFQUNFLGNBQUE7RUFDQSxlQUFBO0NDSEQ7O0FETUQ7O0VBRUUsY0FBQTtFQUNBLG9CQUFBO0VBQ0EsYUFBQTtFQUNBLGNBQUE7Q0NIRDs7QUN5REc7RUZsREY7SUFBdUIsWUFBQTtHQ0Z0QjtDQUNGIiwiZmlsZSI6InNyYy9hcHAvc2tpbGwtc2ltdWxhdG9yL3NraWxsLWJ1aWxkZXIvc2tpbGwtYnVpbGRlci1qb2Ivc2tpbGwtYnVpbGRlci1qb2IuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJAaW1wb3J0ICd+Ym9vdHN0cmFwL3Njc3MvX2Z1bmN0aW9ucyc7XG5AaW1wb3J0ICd+Ym9vdHN0cmFwL3Njc3MvX3ZhcmlhYmxlcyc7XG5AaW1wb3J0ICd+Ym9vdHN0cmFwL3Njc3MvbWl4aW5zL19icmVha3BvaW50cyc7XG5cbjpob3N0IHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cblxuLnRvcy1hdHRyaWJ1dGUge1xuICB3aWR0aDogMS41cmVtO1xuICBoZWlnaHQ6IDEuNXJlbTtcbn1cblxuLnRvcy1qb2IsXG4udG9zLXNraWxsIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgd2lkdGg6IDIxNXB4O1xuICBwYWRkaW5nOiAxMHB4O1xufVxuXG5AaW5jbHVkZSBtZWRpYS1icmVha3BvaW50LWRvd24oeHMpIHtcbiAgLnRvcy1qb2IsIC50b3Mtc2tpbGwgeyB3aWR0aDogMTAwJTsgfVxufVxuIiwiOmhvc3Qge1xuICBkaXNwbGF5OiBibG9jaztcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuXG4udG9zLWF0dHJpYnV0ZSB7XG4gIHdpZHRoOiAxLjVyZW07XG4gIGhlaWdodDogMS41cmVtO1xufVxuXG4udG9zLWpvYixcbi50b3Mtc2tpbGwge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICB3aWR0aDogMjE1cHg7XG4gIHBhZGRpbmc6IDEwcHg7XG59XG5cbkBtZWRpYSAobWF4LXdpZHRoOiA1NzUuOThweCkge1xuICAudG9zLWpvYiwgLnRvcy1za2lsbCB7XG4gICAgd2lkdGg6IDEwMCU7XG4gIH1cbn0iLCIvLyBCcmVha3BvaW50IHZpZXdwb3J0IHNpemVzIGFuZCBtZWRpYSBxdWVyaWVzLlxuLy9cbi8vIEJyZWFrcG9pbnRzIGFyZSBkZWZpbmVkIGFzIGEgbWFwIG9mIChuYW1lOiBtaW5pbXVtIHdpZHRoKSwgb3JkZXIgZnJvbSBzbWFsbCB0byBsYXJnZTpcbi8vXG4vLyAgICAoeHM6IDAsIHNtOiA1NzZweCwgbWQ6IDc2OHB4LCBsZzogOTkycHgsIHhsOiAxMjAwcHgpXG4vL1xuLy8gVGhlIG1hcCBkZWZpbmVkIGluIHRoZSBgJGdyaWQtYnJlYWtwb2ludHNgIGdsb2JhbCB2YXJpYWJsZSBpcyB1c2VkIGFzIHRoZSBgJGJyZWFrcG9pbnRzYCBhcmd1bWVudCBieSBkZWZhdWx0LlxuXG4vLyBOYW1lIG9mIHRoZSBuZXh0IGJyZWFrcG9pbnQsIG9yIG51bGwgZm9yIHRoZSBsYXN0IGJyZWFrcG9pbnQuXG4vL1xuLy8gICAgPj4gYnJlYWtwb2ludC1uZXh0KHNtKVxuLy8gICAgbWRcbi8vICAgID4+IGJyZWFrcG9pbnQtbmV4dChzbSwgKHhzOiAwLCBzbTogNTc2cHgsIG1kOiA3NjhweCwgbGc6IDk5MnB4LCB4bDogMTIwMHB4KSlcbi8vICAgIG1kXG4vLyAgICA+PiBicmVha3BvaW50LW5leHQoc20sICRicmVha3BvaW50LW5hbWVzOiAoeHMgc20gbWQgbGcgeGwpKVxuLy8gICAgbWRcbkBmdW5jdGlvbiBicmVha3BvaW50LW5leHQoJG5hbWUsICRicmVha3BvaW50czogJGdyaWQtYnJlYWtwb2ludHMsICRicmVha3BvaW50LW5hbWVzOiBtYXAta2V5cygkYnJlYWtwb2ludHMpKSB7XG4gICRuOiBpbmRleCgkYnJlYWtwb2ludC1uYW1lcywgJG5hbWUpO1xuICBAcmV0dXJuIGlmKCRuIDwgbGVuZ3RoKCRicmVha3BvaW50LW5hbWVzKSwgbnRoKCRicmVha3BvaW50LW5hbWVzLCAkbiArIDEpLCBudWxsKTtcbn1cblxuLy8gTWluaW11bSBicmVha3BvaW50IHdpZHRoLiBOdWxsIGZvciB0aGUgc21hbGxlc3QgKGZpcnN0KSBicmVha3BvaW50LlxuLy9cbi8vICAgID4+IGJyZWFrcG9pbnQtbWluKHNtLCAoeHM6IDAsIHNtOiA1NzZweCwgbWQ6IDc2OHB4LCBsZzogOTkycHgsIHhsOiAxMjAwcHgpKVxuLy8gICAgNTc2cHhcbkBmdW5jdGlvbiBicmVha3BvaW50LW1pbigkbmFtZSwgJGJyZWFrcG9pbnRzOiAkZ3JpZC1icmVha3BvaW50cykge1xuICAkbWluOiBtYXAtZ2V0KCRicmVha3BvaW50cywgJG5hbWUpO1xuICBAcmV0dXJuIGlmKCRtaW4gIT0gMCwgJG1pbiwgbnVsbCk7XG59XG5cbi8vIE1heGltdW0gYnJlYWtwb2ludCB3aWR0aC4gTnVsbCBmb3IgdGhlIGxhcmdlc3QgKGxhc3QpIGJyZWFrcG9pbnQuXG4vLyBUaGUgbWF4aW11bSB2YWx1ZSBpcyBjYWxjdWxhdGVkIGFzIHRoZSBtaW5pbXVtIG9mIHRoZSBuZXh0IG9uZSBsZXNzIDAuMDJweFxuLy8gdG8gd29yayBhcm91bmQgdGhlIGxpbWl0YXRpb25zIG9mIGBtaW4tYCBhbmQgYG1heC1gIHByZWZpeGVzIGFuZCB2aWV3cG9ydHMgd2l0aCBmcmFjdGlvbmFsIHdpZHRocy5cbi8vIFNlZSBodHRwczovL3d3dy53My5vcmcvVFIvbWVkaWFxdWVyaWVzLTQvI21xLW1pbi1tYXhcbi8vIFVzZXMgMC4wMnB4IHJhdGhlciB0aGFuIDAuMDFweCB0byB3b3JrIGFyb3VuZCBhIGN1cnJlbnQgcm91bmRpbmcgYnVnIGluIFNhZmFyaS5cbi8vIFNlZSBodHRwczovL2J1Z3Mud2Via2l0Lm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MTc4MjYxXG4vL1xuLy8gICAgPj4gYnJlYWtwb2ludC1tYXgoc20sICh4czogMCwgc206IDU3NnB4LCBtZDogNzY4cHgsIGxnOiA5OTJweCwgeGw6IDEyMDBweCkpXG4vLyAgICA3NjcuOThweFxuQGZ1bmN0aW9uIGJyZWFrcG9pbnQtbWF4KCRuYW1lLCAkYnJlYWtwb2ludHM6ICRncmlkLWJyZWFrcG9pbnRzKSB7XG4gICRuZXh0OiBicmVha3BvaW50LW5leHQoJG5hbWUsICRicmVha3BvaW50cyk7XG4gIEByZXR1cm4gaWYoJG5leHQsIGJyZWFrcG9pbnQtbWluKCRuZXh0LCAkYnJlYWtwb2ludHMpIC0gLjAycHgsIG51bGwpO1xufVxuXG4vLyBSZXR1cm5zIGEgYmxhbmsgc3RyaW5nIGlmIHNtYWxsZXN0IGJyZWFrcG9pbnQsIG90aGVyd2lzZSByZXR1cm5zIHRoZSBuYW1lIHdpdGggYSBkYXNoIGluIGZyb250LlxuLy8gVXNlZnVsIGZvciBtYWtpbmcgcmVzcG9uc2l2ZSB1dGlsaXRpZXMuXG4vL1xuLy8gICAgPj4gYnJlYWtwb2ludC1pbmZpeCh4cywgKHhzOiAwLCBzbTogNTc2cHgsIG1kOiA3NjhweCwgbGc6IDk5MnB4LCB4bDogMTIwMHB4KSlcbi8vICAgIFwiXCIgIChSZXR1cm5zIGEgYmxhbmsgc3RyaW5nKVxuLy8gICAgPj4gYnJlYWtwb2ludC1pbmZpeChzbSwgKHhzOiAwLCBzbTogNTc2cHgsIG1kOiA3NjhweCwgbGc6IDk5MnB4LCB4bDogMTIwMHB4KSlcbi8vICAgIFwiLXNtXCJcbkBmdW5jdGlvbiBicmVha3BvaW50LWluZml4KCRuYW1lLCAkYnJlYWtwb2ludHM6ICRncmlkLWJyZWFrcG9pbnRzKSB7XG4gIEByZXR1cm4gaWYoYnJlYWtwb2ludC1taW4oJG5hbWUsICRicmVha3BvaW50cykgPT0gbnVsbCwgXCJcIiwgXCItI3skbmFtZX1cIik7XG59XG5cbi8vIE1lZGlhIG9mIGF0IGxlYXN0IHRoZSBtaW5pbXVtIGJyZWFrcG9pbnQgd2lkdGguIE5vIHF1ZXJ5IGZvciB0aGUgc21hbGxlc3QgYnJlYWtwb2ludC5cbi8vIE1ha2VzIHRoZSBAY29udGVudCBhcHBseSB0byB0aGUgZ2l2ZW4gYnJlYWtwb2ludCBhbmQgd2lkZXIuXG5AbWl4aW4gbWVkaWEtYnJlYWtwb2ludC11cCgkbmFtZSwgJGJyZWFrcG9pbnRzOiAkZ3JpZC1icmVha3BvaW50cykge1xuICAkbWluOiBicmVha3BvaW50LW1pbigkbmFtZSwgJGJyZWFrcG9pbnRzKTtcbiAgQGlmICRtaW4ge1xuICAgIEBtZWRpYSAobWluLXdpZHRoOiAkbWluKSB7XG4gICAgICBAY29udGVudDtcbiAgICB9XG4gIH0gQGVsc2Uge1xuICAgIEBjb250ZW50O1xuICB9XG59XG5cbi8vIE1lZGlhIG9mIGF0IG1vc3QgdGhlIG1heGltdW0gYnJlYWtwb2ludCB3aWR0aC4gTm8gcXVlcnkgZm9yIHRoZSBsYXJnZXN0IGJyZWFrcG9pbnQuXG4vLyBNYWtlcyB0aGUgQGNvbnRlbnQgYXBwbHkgdG8gdGhlIGdpdmVuIGJyZWFrcG9pbnQgYW5kIG5hcnJvd2VyLlxuQG1peGluIG1lZGlhLWJyZWFrcG9pbnQtZG93bigkbmFtZSwgJGJyZWFrcG9pbnRzOiAkZ3JpZC1icmVha3BvaW50cykge1xuICAkbWF4OiBicmVha3BvaW50LW1heCgkbmFtZSwgJGJyZWFrcG9pbnRzKTtcbiAgQGlmICRtYXgge1xuICAgIEBtZWRpYSAobWF4LXdpZHRoOiAkbWF4KSB7XG4gICAgICBAY29udGVudDtcbiAgICB9XG4gIH0gQGVsc2Uge1xuICAgIEBjb250ZW50O1xuICB9XG59XG5cbi8vIE1lZGlhIHRoYXQgc3BhbnMgbXVsdGlwbGUgYnJlYWtwb2ludCB3aWR0aHMuXG4vLyBNYWtlcyB0aGUgQGNvbnRlbnQgYXBwbHkgYmV0d2VlbiB0aGUgbWluIGFuZCBtYXggYnJlYWtwb2ludHNcbkBtaXhpbiBtZWRpYS1icmVha3BvaW50LWJldHdlZW4oJGxvd2VyLCAkdXBwZXIsICRicmVha3BvaW50czogJGdyaWQtYnJlYWtwb2ludHMpIHtcbiAgJG1pbjogYnJlYWtwb2ludC1taW4oJGxvd2VyLCAkYnJlYWtwb2ludHMpO1xuICAkbWF4OiBicmVha3BvaW50LW1heCgkdXBwZXIsICRicmVha3BvaW50cyk7XG5cbiAgQGlmICRtaW4gIT0gbnVsbCBhbmQgJG1heCAhPSBudWxsIHtcbiAgICBAbWVkaWEgKG1pbi13aWR0aDogJG1pbikgYW5kIChtYXgtd2lkdGg6ICRtYXgpIHtcbiAgICAgIEBjb250ZW50O1xuICAgIH1cbiAgfSBAZWxzZSBpZiAkbWF4ID09IG51bGwge1xuICAgIEBpbmNsdWRlIG1lZGlhLWJyZWFrcG9pbnQtdXAoJGxvd2VyLCAkYnJlYWtwb2ludHMpIHtcbiAgICAgIEBjb250ZW50O1xuICAgIH1cbiAgfSBAZWxzZSBpZiAkbWluID09IG51bGwge1xuICAgIEBpbmNsdWRlIG1lZGlhLWJyZWFrcG9pbnQtZG93bigkdXBwZXIsICRicmVha3BvaW50cykge1xuICAgICAgQGNvbnRlbnQ7XG4gICAgfVxuICB9XG59XG5cbi8vIE1lZGlhIGJldHdlZW4gdGhlIGJyZWFrcG9pbnQncyBtaW5pbXVtIGFuZCBtYXhpbXVtIHdpZHRocy5cbi8vIE5vIG1pbmltdW0gZm9yIHRoZSBzbWFsbGVzdCBicmVha3BvaW50LCBhbmQgbm8gbWF4aW11bSBmb3IgdGhlIGxhcmdlc3Qgb25lLlxuLy8gTWFrZXMgdGhlIEBjb250ZW50IGFwcGx5IG9ubHkgdG8gdGhlIGdpdmVuIGJyZWFrcG9pbnQsIG5vdCB2aWV3cG9ydHMgYW55IHdpZGVyIG9yIG5hcnJvd2VyLlxuQG1peGluIG1lZGlhLWJyZWFrcG9pbnQtb25seSgkbmFtZSwgJGJyZWFrcG9pbnRzOiAkZ3JpZC1icmVha3BvaW50cykge1xuICAkbWluOiBicmVha3BvaW50LW1pbigkbmFtZSwgJGJyZWFrcG9pbnRzKTtcbiAgJG1heDogYnJlYWtwb2ludC1tYXgoJG5hbWUsICRicmVha3BvaW50cyk7XG5cbiAgQGlmICRtaW4gIT0gbnVsbCBhbmQgJG1heCAhPSBudWxsIHtcbiAgICBAbWVkaWEgKG1pbi13aWR0aDogJG1pbikgYW5kIChtYXgtd2lkdGg6ICRtYXgpIHtcbiAgICAgIEBjb250ZW50O1xuICAgIH1cbiAgfSBAZWxzZSBpZiAkbWF4ID09IG51bGwge1xuICAgIEBpbmNsdWRlIG1lZGlhLWJyZWFrcG9pbnQtdXAoJG5hbWUsICRicmVha3BvaW50cykge1xuICAgICAgQGNvbnRlbnQ7XG4gICAgfVxuICB9IEBlbHNlIGlmICRtaW4gPT0gbnVsbCB7XG4gICAgQGluY2x1ZGUgbWVkaWEtYnJlYWtwb2ludC1kb3duKCRuYW1lLCAkYnJlYWtwb2ludHMpIHtcbiAgICAgIEBjb250ZW50O1xuICAgIH1cbiAgfVxufVxuIl19 */"

/***/ }),

/***/ "./src/app/skill-simulator/skill-builder/skill-builder-job/skill-builder-job.component.ts":
/*!************************************************************************************************!*\
  !*** ./src/app/skill-simulator/skill-builder/skill-builder-job/skill-builder-job.component.ts ***!
  \************************************************************************************************/
/*! exports provided: SkillBuilderJobComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SkillBuilderJobComponent", function() { return SkillBuilderJobComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_domain_tos_tos_build__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../shared/domain/tos/tos-build */ "./src/app/shared/domain/tos/tos-build.ts");
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "./node_modules/@fortawesome/free-solid-svg-icons/index.es.js");
/* harmony import */ var _shared_domain_tos_tos_entity_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../shared/domain/tos/tos-entity.model */ "./src/app/shared/domain/tos/tos-entity.model.ts");





var SkillBuilderJobComponent = /** @class */ (function () {
    function SkillBuilderJobComponent(changeDetector) {
        this.changeDetector = changeDetector;
        this.faTrashAlt = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__["faTrashAlt"];
        this.TOSEntity = _shared_domain_tos_tos_entity_model__WEBPACK_IMPORTED_MODULE_4__["TOSEntity"];
    }
    SkillBuilderJobComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (this.build && this.job) {
            this.subscriptionAttributes && this.subscriptionAttributes.unsubscribe();
            this.subscriptionAttributes = this.job.Link_Attributes && this.job.Link_Attributes.subscribe(function (value) { return _this.onAttributesChange(value); });
            this.subscriptionJob && this.subscriptionJob.unsubscribe();
            this.subscriptionJob = this.build.Job$.subscribe(function (value) { return _this.onJobChange(value); });
            this.subscriptionSkill && this.subscriptionSkill.unsubscribe();
            this.subscriptionSkill = this.build.Skill$.subscribe(function (value) { return _this.onSkillChange(value); });
            // Late init
            this.onJobChange(null);
            this.onSkillChange(null);
        }
    };
    SkillBuilderJobComponent.prototype.ngOnDestroy = function () {
        this.changeDetector.detach();
        this.subscriptionAttributes && this.subscriptionAttributes.unsubscribe();
        this.subscriptionJob && this.subscriptionJob.unsubscribe();
        this.subscriptionSkill && this.subscriptionSkill.unsubscribe();
    };
    SkillBuilderJobComponent.prototype.onAttributesChange = function (value) {
        this.attributes = value.filter(function (value) { return !value.Link_Skills; });
        this.attributesUnlock = new Array(this.attributes.length);
        this.changeDetector.markForCheck();
        this.unlockAttributes(null);
    };
    SkillBuilderJobComponent.prototype.onJobChange = function (value) {
        var _this = this;
        if (value == null || value.$ID == this.job.$ID) {
            var ranks = this.build.jobRanks(this.job);
            this.circles = Array.from({ length: ranks.length }, function (x, i) { return i + 1; });
            this.skillPoints = this.build.skillPoints(this.job);
            this.subscriptionSkills && this.subscriptionSkills.unsubscribe();
            this.subscriptionSkills = this.job.Link_Skills.subscribe(function (value) { return _this.onSkillsChange(value); });
        }
        if (value) {
            // We need to check whether the attribute has unlocked for every job change
            // Note: due to attributes that depend on rank change, we can't specify only the job ID in here
            this.unlockAttributes(null);
        }
    };
    SkillBuilderJobComponent.prototype.onSkillChange = function (value) {
        if (value == null || this.job.Link_Skills$ID.indexOf(value.$ID) >= 0) {
            this.skillPoints = this.build.skillPoints(this.job);
        }
        if (value) {
            // We need to check whether the attribute has unlocked for every skill change
            this.unlockAttributes([value.$ID_NAME]);
        }
    };
    SkillBuilderJobComponent.prototype.onSkillsChange = function (skills) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var skillsLevelMax;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all(skills.map(function (value) { return _this.build.skillLevelMax$(value).toPromise(); }))];
                    case 1:
                        skillsLevelMax = _a.sent();
                        this.skills = skills
                            .filter(function (value, i) { return skillsLevelMax[i] > 0; })
                            .sort(function (a, b) { return (a.Prop_UnlockClassLevel || a.Prop_UnlockGrade) - (b.Prop_UnlockClassLevel || b.Prop_UnlockGrade); });
                        this.changeDetector.markForCheck();
                        this.unlockAttributes(this.skills.map(function (value) { return value.$ID_NAME; }));
                        return [2 /*return*/];
                }
            });
        });
    };
    SkillBuilderJobComponent.prototype.onRemoveClick = function (event) {
        event.preventDefault();
        this.build.jobRemove$(this.build.jobRanks(this.job).pop());
    };
    SkillBuilderJobComponent.prototype.unlockAttributes = function (args) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var dirty, i, attribute, _a, _b;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!this.attributes)
                            return [2 /*return*/];
                        dirty = false;
                        i = 0;
                        _c.label = 1;
                    case 1:
                        if (!(i < this.attributes.length)) return [3 /*break*/, 4];
                        attribute = this.attributes[i];
                        if (!(args == null || attribute.unlockAvailableCheck(args))) return [3 /*break*/, 3];
                        dirty = true;
                        _a = this.attributesUnlock;
                        _b = i;
                        return [4 /*yield*/, attribute.unlockAvailable(this.build).toPromise()];
                    case 2:
                        _a[_b] = _c.sent();
                        _c.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4:
                        if (dirty)
                            this.changeDetector.markForCheck();
                        return [2 /*return*/];
                }
            });
        });
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _shared_domain_tos_tos_build__WEBPACK_IMPORTED_MODULE_2__["TOSSimulatorBuild"])
    ], SkillBuilderJobComponent.prototype, "build", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], SkillBuilderJobComponent.prototype, "job", void 0);
    SkillBuilderJobComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
            selector: 'app-skill-builder-job',
            template: __webpack_require__(/*! ./skill-builder-job.component.html */ "./src/app/skill-simulator/skill-builder/skill-builder-job/skill-builder-job.component.html"),
            styles: [__webpack_require__(/*! ./skill-builder-job.component.scss */ "./src/app/skill-simulator/skill-builder/skill-builder-job/skill-builder-job.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]])
    ], SkillBuilderJobComponent);
    return SkillBuilderJobComponent;
}());



/***/ }),

/***/ "./src/app/skill-simulator/skill-builder/skill-builder-skill/skill-builder-skill.component.html":
/*!******************************************************************************************************!*\
  !*** ./src/app/skill-simulator/skill-builder/skill-builder-skill/skill-builder-skill.component.html ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"position-relative d-flex flex-row m-auto\" style=\"width: 215px\">\n  <!-- Plus and Minus -->\n  <div class=\"position-absolute d-flex d-sm-none flex-column h-100 justify-content-around tos-skill-controls\">\n    <a href=\"#plus\" (click)=\"onSkillLevelIncrementClick($event, 1)\">\n      <fa-icon class=\"align-top\" [icon]=\"faPlusCircle\"></fa-icon>\n    </a>\n    <a href=\"#minus\" (click)=\"onSkillLevelIncrementClick($event, -1)\">\n      <fa-icon class=\"align-bottom\" [icon]=\"faMinusCircle\"></fa-icon>\n    </a>\n  </div>\n\n  <!-- Icon & Level -->\n  <div class=\"position-relative tos-skill mr-1\" style=\"cursor: pointer\"\n       (click)=\"onSkillLevelIncrementClick($event, 1)\"\n       (contextmenu)=\"onSkillLevelIncrementClick($event, -1)\"\n       (mouseenter)=\"build.tooltip(skill, true)\"\n       (mouseleave)=\"build.tooltip(skill, false)\">\n    <img [src]=\"skill.Icon\" />\n    <h6 class=\"font-weight-bold mb-0 pointer-disable position-absolute text-center text-outline text-white w-100\">\n      {{ skillLevel  + '/' + skillLevelMax }}\n    </h6>\n  </div>\n\n  <!-- Name & Attributes -->\n  <div class=\"d-flex flex-column\">\n    <a [routerLink]=\"skill.Url\">{{ skill.Name }}</a>\n    <div>\n      <a *ngFor=\"let attribute of attributes; index as i; trackBy: TOSEntity.trackBy\" [routerLink]=\"attribute.Url\">\n        <img class=\"tos-attribute\"\n             [src]=\"attribute.Icon\"\n             [style.opacity]=\"attributesUnlock && attributesUnlock[i] ? 1 : 0.5\"\n             (mouseenter)=\"$event.relatedTarget && build.tooltip(attribute, true)\"\n             (mouseleave)=\"$event.relatedTarget && build.tooltip(attribute, false)\"/>\n      </a>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/skill-simulator/skill-builder/skill-builder-skill/skill-builder-skill.component.scss":
/*!******************************************************************************************************!*\
  !*** ./src/app/skill-simulator/skill-builder/skill-builder-skill/skill-builder-skill.component.scss ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".tos-skill-controls {\n  left: -1.5rem;\n}\n\n.tos-skill-controls fa-icon {\n  font-size: 1.25rem;\n  line-height: 1;\n}\n\n.tos-attribute {\n  width: 1.5rem;\n  height: 1.5rem;\n}\n\n.tos-skill {\n  width: 3rem;\n  height: 3rem;\n}\n\n.tos-skill img {\n  width: inherit;\n  height: inherit;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n\n.tos-skill h6 {\n  bottom: 0;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9mdW5naS9FL1Rvc1Byb2plY3QvVG9zR3VydUJhc2UvdG9zLWRhdGFiYXNlL3Rvcy13ZWIvc3JjL2FwcC9za2lsbC1zaW11bGF0b3Ivc2tpbGwtYnVpbGRlci9za2lsbC1idWlsZGVyLXNraWxsL3NraWxsLWJ1aWxkZXItc2tpbGwuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL3NraWxsLXNpbXVsYXRvci9za2lsbC1idWlsZGVyL3NraWxsLWJ1aWxkZXItc2tpbGwvc2tpbGwtYnVpbGRlci1za2lsbC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGNBQUE7Q0NDRDs7QURDRDtFQUNFLG1CQUFBO0VBQ0EsZUFBQTtDQ0VEOztBRENEO0VBQ0UsY0FBQTtFQUNBLGVBQUE7Q0NFRDs7QURDRDtFQUNFLFlBQUE7RUFDQSxhQUFBO0NDRUQ7O0FEQUQ7RUFDRSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSwwQkFBQTtLQUFBLHVCQUFBO01BQUEsc0JBQUE7VUFBQSxrQkFBQTtDQ0dEOztBREREO0VBQ0UsVUFBQTtDQ0lEIiwiZmlsZSI6InNyYy9hcHAvc2tpbGwtc2ltdWxhdG9yL3NraWxsLWJ1aWxkZXIvc2tpbGwtYnVpbGRlci1za2lsbC9za2lsbC1idWlsZGVyLXNraWxsLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnRvcy1za2lsbC1jb250cm9scyB7XG4gIGxlZnQ6IC0xLjVyZW07XG59XG4udG9zLXNraWxsLWNvbnRyb2xzIGZhLWljb24ge1xuICBmb250LXNpemU6IDEuMjVyZW07XG4gIGxpbmUtaGVpZ2h0OiAxO1xufVxuXG4udG9zLWF0dHJpYnV0ZSB7XG4gIHdpZHRoOiAxLjVyZW07XG4gIGhlaWdodDogMS41cmVtO1xufVxuXG4udG9zLXNraWxsIHtcbiAgd2lkdGg6IDNyZW07XG4gIGhlaWdodDogM3JlbTtcbn1cbi50b3Mtc2tpbGwgaW1nIHtcbiAgd2lkdGg6IGluaGVyaXQ7XG4gIGhlaWdodDogaW5oZXJpdDtcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XG59XG4udG9zLXNraWxsIGg2IHtcbiAgYm90dG9tOiAwO1xufVxuIiwiLnRvcy1za2lsbC1jb250cm9scyB7XG4gIGxlZnQ6IC0xLjVyZW07XG59XG5cbi50b3Mtc2tpbGwtY29udHJvbHMgZmEtaWNvbiB7XG4gIGZvbnQtc2l6ZTogMS4yNXJlbTtcbiAgbGluZS1oZWlnaHQ6IDE7XG59XG5cbi50b3MtYXR0cmlidXRlIHtcbiAgd2lkdGg6IDEuNXJlbTtcbiAgaGVpZ2h0OiAxLjVyZW07XG59XG5cbi50b3Mtc2tpbGwge1xuICB3aWR0aDogM3JlbTtcbiAgaGVpZ2h0OiAzcmVtO1xufVxuXG4udG9zLXNraWxsIGltZyB7XG4gIHdpZHRoOiBpbmhlcml0O1xuICBoZWlnaHQ6IGluaGVyaXQ7XG4gIHVzZXItc2VsZWN0OiBub25lO1xufVxuXG4udG9zLXNraWxsIGg2IHtcbiAgYm90dG9tOiAwO1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/skill-simulator/skill-builder/skill-builder-skill/skill-builder-skill.component.ts":
/*!****************************************************************************************************!*\
  !*** ./src/app/skill-simulator/skill-builder/skill-builder-skill/skill-builder-skill.component.ts ***!
  \****************************************************************************************************/
/*! exports provided: SkillBuilderSkillComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SkillBuilderSkillComponent", function() { return SkillBuilderSkillComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_domain_tos_tos_build__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../shared/domain/tos/tos-build */ "./src/app/shared/domain/tos/tos-build.ts");
/* harmony import */ var _shared_domain_tos_tos_entity_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../shared/domain/tos/tos-entity.model */ "./src/app/shared/domain/tos/tos-entity.model.ts");
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "./node_modules/@fortawesome/free-solid-svg-icons/index.es.js");





var SkillBuilderSkillComponent = /** @class */ (function () {
    function SkillBuilderSkillComponent(changeDetector) {
        this.changeDetector = changeDetector;
        this.faPlusCircle = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_4__["faPlusCircle"];
        this.faMinusCircle = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_4__["faMinusCircle"];
        this.TOSEntity = _shared_domain_tos_tos_entity_model__WEBPACK_IMPORTED_MODULE_3__["TOSEntity"];
        this.skillLevel = 0;
        this.skillLevelMax = 0;
    }
    SkillBuilderSkillComponent.prototype.onSkillLevelIncrementClick = function (event, delta) {
        event.preventDefault();
        this.build.skillLevelIncrement$(this.skill, delta, false, true);
    };
    SkillBuilderSkillComponent.prototype.onAttributesChange = function (value) {
        this.attributes = value || [];
        this.attributesUnlock = new Array(this.attributes.length);
        this.unlockAttributes(null);
    };
    SkillBuilderSkillComponent.prototype.onJobChange = function (value) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(value == null || value.$ID == this.skill.Link_Job$ID)) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, this.build.skillLevelMax$(this.skill).toPromise()];
                    case 1:
                        _a.skillLevelMax = _b.sent();
                        this.changeDetector.markForCheck();
                        _b.label = 2;
                    case 2:
                        if (value) {
                            // We need to check whether the attribute has unlocked for every skill change
                            this.unlockAttributes([value.$ID_NAME]);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    SkillBuilderSkillComponent.prototype.onSkillChange = function (value) {
        if (value == null || value.$ID == this.skill.$ID)
            this.skillLevel = this.build.skillLevel(this.skill);
        if (value) {
            // We need to check whether the attribute has unlocked for every skill change
            this.unlockAttributes([value.$ID_NAME]);
        }
    };
    SkillBuilderSkillComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes.build && this.build || changes.skill && this.skill) {
            this.subscriptionAttributes && this.subscriptionAttributes.unsubscribe();
            this.subscriptionAttributes = this.skill.Link_Attributes && this.skill.Link_Attributes.subscribe(function (value) { return _this.onAttributesChange(value); });
            this.subscriptionJob && this.subscriptionJob.unsubscribe();
            this.subscriptionJob = this.build.Job$.subscribe(function (value) { return _this.onJobChange(value); });
            this.subscriptionSkill && this.subscriptionSkill.unsubscribe();
            this.subscriptionSkill = this.build.Skill$.subscribe(function (value) { return _this.onSkillChange(value); });
            // Late init
            this.onJobChange(null);
            this.onSkillChange(null);
        }
    };
    SkillBuilderSkillComponent.prototype.ngOnDestroy = function () {
        this.changeDetector.detach();
        this.subscriptionAttributes && this.subscriptionAttributes.unsubscribe();
        this.subscriptionJob && this.subscriptionJob.unsubscribe();
        this.subscriptionSkill && this.subscriptionSkill.unsubscribe();
    };
    SkillBuilderSkillComponent.prototype.unlockAttributes = function (args) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var dirty, i, attribute, _a, _b;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!this.attributes)
                            return [2 /*return*/];
                        dirty = false;
                        i = 0;
                        _c.label = 1;
                    case 1:
                        if (!(i < this.attributes.length)) return [3 /*break*/, 4];
                        attribute = this.attributes[i];
                        if (!(args == null || attribute.unlockAvailableCheck(args))) return [3 /*break*/, 3];
                        dirty = true;
                        _a = this.attributesUnlock;
                        _b = i;
                        return [4 /*yield*/, attribute.unlockAvailable(this.build).toPromise()];
                    case 2:
                        _a[_b] = _c.sent();
                        _c.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4:
                        if (dirty)
                            this.changeDetector.markForCheck();
                        return [2 /*return*/];
                }
            });
        });
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _shared_domain_tos_tos_build__WEBPACK_IMPORTED_MODULE_2__["TOSSimulatorBuild"])
    ], SkillBuilderSkillComponent.prototype, "build", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], SkillBuilderSkillComponent.prototype, "job", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], SkillBuilderSkillComponent.prototype, "skill", void 0);
    SkillBuilderSkillComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
            selector: 'app-skill-builder-skill',
            template: __webpack_require__(/*! ./skill-builder-skill.component.html */ "./src/app/skill-simulator/skill-builder/skill-builder-skill/skill-builder-skill.component.html"),
            styles: [__webpack_require__(/*! ./skill-builder-skill.component.scss */ "./src/app/skill-simulator/skill-builder/skill-builder-skill/skill-builder-skill.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]])
    ], SkillBuilderSkillComponent);
    return SkillBuilderSkillComponent;
}());



/***/ }),

/***/ "./src/app/skill-simulator/skill-builder/skill-builder-stat-selector/skill-builder-stat-selector.component.html":
/*!**********************************************************************************************************************!*\
  !*** ./src/app/skill-simulator/skill-builder/skill-builder-stat-selector/skill-builder-stat-selector.component.html ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- Points -->\n<div class=\"row justify-content-center mb-2\" [style.opacity]=\"rank > 0 ? 1 : 0\">\n  <div class=\"badge badge-primary\" style=\"font-size: inherit; background: #634539\">\n    {{ statsPoints }} points\n  </div>\n</div>\n\n<div class=\"row justify-content-center\">\n  <div *ngFor=\"let stat of stats\" class=\"position-relative\" style=\"width: 4rem\">\n\n    <!-- Icon -->\n    <img class=\"position-absolute w-100\" style=\"left: 0; top: 0; cursor: pointer\"\n         [src]=\"TOSStatService.icon(stat)\" />\n\n    <!-- Label -->\n    <div class=\"position-relative font-weight-bold text-center w-100\" style=\"color: #634539\">\n      {{ stat }}\n    </div>\n\n    <!-- Value -->\n    <form>\n      <input type=\"number\" max=\"9999\" min=\"{{ build.StatsBase[stat] }}\" name=\"value\"\n             class=\"position-relative bg-transparent border-0 font-weight-bold text-center text-outline text-white w-100\"\n             style=\"font-size: 1.5rem; line-height: 4rem;\"\n             [attr.disabled]=\"!rank ? '' : null\"\n             [ngModel]=\"rank ? build.Stats[stat] : ''\"\n             (change)=\"onIncrementChange($event, stat)\"\n              />\n    </form>\n\n    <!-- Plus and Minus -->\n    <div class=\"d-flex flex-row w-100 justify-content-around mt-1 tos-skill-controls\">\n      <a [ngClass]=\"{ 'invisible': !rank || !build.statsIncrementLevelAvailable(stat, 1) }\" href=\"#plus\"\n         (click)=\"onIncrementClick($event, stat, 1)\">\n        <fa-icon class=\"align-top\" [icon]=\"faPlusCircle\"></fa-icon>\n      </a>\n      <a [ngClass]=\"{ 'invisible': !rank || !build.statsIncrementLevelAvailable(stat, -1) }\" href=\"#minus\"\n         (click)=\"onIncrementClick($event, stat, -1)\">\n        <fa-icon class=\"align-bottom\" [icon]=\"faMinusCircle\"></fa-icon>\n      </a>\n    </div>\n\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/skill-simulator/skill-builder/skill-builder-stat-selector/skill-builder-stat-selector.component.scss":
/*!**********************************************************************************************************************!*\
  !*** ./src/app/skill-simulator/skill-builder/skill-builder-stat-selector/skill-builder-stat-selector.component.scss ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "input[type=number]:focus {\n  outline: none;\n}\n\ninput[type=number]::-webkit-inner-spin-button,\ninput[type=number]::-webkit-outer-spin-button {\n  -webkit-appearance: none;\n  margin: 0;\n}\n\n.tos-skill-controls fa-icon {\n  font-size: 1.25rem;\n  line-height: 1;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9mdW5naS9FL1Rvc1Byb2plY3QvVG9zR3VydUJhc2UvdG9zLWRhdGFiYXNlL3Rvcy13ZWIvc3JjL2FwcC9za2lsbC1zaW11bGF0b3Ivc2tpbGwtYnVpbGRlci9za2lsbC1idWlsZGVyLXN0YXQtc2VsZWN0b3Ivc2tpbGwtYnVpbGRlci1zdGF0LXNlbGVjdG9yLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9za2lsbC1zaW11bGF0b3Ivc2tpbGwtYnVpbGRlci9za2lsbC1idWlsZGVyLXN0YXQtc2VsZWN0b3Ivc2tpbGwtYnVpbGRlci1zdGF0LXNlbGVjdG9yLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsY0FBQTtDQ0NEOztBREVEOztFQUVFLHlCQUFBO0VBQ0EsVUFBQTtDQ0NEOztBREVEO0VBQ0UsbUJBQUE7RUFDQSxlQUFBO0NDQ0QiLCJmaWxlIjoic3JjL2FwcC9za2lsbC1zaW11bGF0b3Ivc2tpbGwtYnVpbGRlci9za2lsbC1idWlsZGVyLXN0YXQtc2VsZWN0b3Ivc2tpbGwtYnVpbGRlci1zdGF0LXNlbGVjdG9yLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiaW5wdXRbdHlwZT1udW1iZXJdOmZvY3VzIHtcbiAgb3V0bGluZTogbm9uZTtcbn1cblxuaW5wdXRbdHlwZT1udW1iZXJdOjotd2Via2l0LWlubmVyLXNwaW4tYnV0dG9uLFxuaW5wdXRbdHlwZT1udW1iZXJdOjotd2Via2l0LW91dGVyLXNwaW4tYnV0dG9uIHtcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xuICBtYXJnaW46IDA7XG59XG5cbi50b3Mtc2tpbGwtY29udHJvbHMgZmEtaWNvbiB7XG4gIGZvbnQtc2l6ZTogMS4yNXJlbTtcbiAgbGluZS1oZWlnaHQ6IDE7XG59XG4iLCJpbnB1dFt0eXBlPW51bWJlcl06Zm9jdXMge1xuICBvdXRsaW5lOiBub25lO1xufVxuXG5pbnB1dFt0eXBlPW51bWJlcl06Oi13ZWJraXQtaW5uZXItc3Bpbi1idXR0b24sXG5pbnB1dFt0eXBlPW51bWJlcl06Oi13ZWJraXQtb3V0ZXItc3Bpbi1idXR0b24ge1xuICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XG4gIG1hcmdpbjogMDtcbn1cblxuLnRvcy1za2lsbC1jb250cm9scyBmYS1pY29uIHtcbiAgZm9udC1zaXplOiAxLjI1cmVtO1xuICBsaW5lLWhlaWdodDogMTtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/skill-simulator/skill-builder/skill-builder-stat-selector/skill-builder-stat-selector.component.ts":
/*!********************************************************************************************************************!*\
  !*** ./src/app/skill-simulator/skill-builder/skill-builder-stat-selector/skill-builder-stat-selector.component.ts ***!
  \********************************************************************************************************************/
/*! exports provided: SkillBuilderStatSelectorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SkillBuilderStatSelectorComponent", function() { return SkillBuilderStatSelectorComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_domain_tos_tos_build__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../shared/domain/tos/tos-build */ "./src/app/shared/domain/tos/tos-build.ts");
/* harmony import */ var _shared_domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../shared/domain/tos/tos-domain */ "./src/app/shared/domain/tos/tos-domain.ts");
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "./node_modules/@fortawesome/free-solid-svg-icons/index.es.js");





var SkillBuilderStatSelectorComponent = /** @class */ (function () {
    function SkillBuilderStatSelectorComponent(changeDetector) {
        this.changeDetector = changeDetector;
        this.faMinusCircle = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_4__["faMinusCircle"];
        this.faPlusCircle = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_4__["faPlusCircle"];
        this.TOSStatService = _shared_domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_3__["TOSStatService"];
        this.stats = [_shared_domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_3__["TOSStat"].STR, _shared_domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_3__["TOSStat"].CON, _shared_domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_3__["TOSStat"].INT, _shared_domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_3__["TOSStat"].SPR, _shared_domain_tos_tos_domain__WEBPACK_IMPORTED_MODULE_3__["TOSStat"].DEX];
    }
    SkillBuilderStatSelectorComponent.prototype.onIncrementChange = function (event, stat) {
        var max = 9999;
        var min = this.build.StatsBase[stat];
        var value = Math.max(min, Math.min(max, +event.target['value']));
        var delta = value - this.build.Stats[stat];
        if (this.build.statsIncrementLevelAvailable(stat, delta))
            this.build.statsIncrementLevel(stat, delta);
        event.target['value'] = value;
    };
    SkillBuilderStatSelectorComponent.prototype.onIncrementClick = function (event, stat, delta) {
        event.preventDefault();
        delta *= event.shiftKey
            ? 10
            : event.ctrlKey
                ? 100
                : 1;
        if (this.build.statsIncrementLevelAvailable(stat, delta))
            this.build.statsIncrementLevel(stat, delta);
    };
    SkillBuilderStatSelectorComponent.prototype.onJobChange = function () {
        this.rank = this.build.Rank;
        this.changeDetector.markForCheck();
    };
    SkillBuilderStatSelectorComponent.prototype.onStatsPointsChange = function (value) {
        this.statsPoints = value;
        this.changeDetector.markForCheck();
    };
    SkillBuilderStatSelectorComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        this.ngOnDestroy();
        if (changes.build) {
            this.subscriptionJobs = this.build.Job$.subscribe(function (value) { return _this.onJobChange(); });
            this.subscriptionStatsPoints = this.build.StatsPoints$.subscribe(function (value) { return _this.onStatsPointsChange(value); });
        }
    };
    SkillBuilderStatSelectorComponent.prototype.ngOnDestroy = function () {
        this.subscriptionJobs && this.subscriptionJobs.unsubscribe();
        this.subscriptionStatsPoints && this.subscriptionStatsPoints.unsubscribe();
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _shared_domain_tos_tos_build__WEBPACK_IMPORTED_MODULE_2__["TOSSimulatorBuild"])
    ], SkillBuilderStatSelectorComponent.prototype, "build", void 0);
    SkillBuilderStatSelectorComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
            selector: 'app-skill-builder-stat-selector',
            template: __webpack_require__(/*! ./skill-builder-stat-selector.component.html */ "./src/app/skill-simulator/skill-builder/skill-builder-stat-selector/skill-builder-stat-selector.component.html"),
            styles: [__webpack_require__(/*! ./skill-builder-stat-selector.component.scss */ "./src/app/skill-simulator/skill-builder/skill-builder-stat-selector/skill-builder-stat-selector.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]])
    ], SkillBuilderStatSelectorComponent);
    return SkillBuilderStatSelectorComponent;
}());



/***/ }),

/***/ "./src/app/skill-simulator/skill-builder/skill-builder.component.html":
/*!****************************************************************************!*\
  !*** ./src/app/skill-simulator/skill-builder/skill-builder.component.html ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row justify-content-between justify-content-sm-end ml-0 mr-0 mb-3\">\n  <button type=\"button\" class=\"btn d-none d-sm-inline-block mr-3\"\n          [ngClass]=\"{\n            'btn-primary': !sharingAsImage,\n            'btn-warning': sharingAsImage\n          }\"\n          [disabled]=\"!jobs || !jobs.length\"\n          (click)=\"shareAsImage()\">\n    <fa-icon class=\"mr-1\" [icon]=\"faImage\"></fa-icon>\n    <span>{{ sharingAsImage ? 'Generating Image...' : 'Share as Image' }}</span>\n  </button>\n\n  <button type=\"button\" class=\"btn\"\n          [ngClass]=\"{\n            'btn-primary': !sharingAsUrl && !tinyUrl,\n            'btn-warning': sharingAsUrl,\n            'btn-success': tinyUrl\n          }\"\n          [disabled]=\"!jobs || !jobs.length\"\n          (click)=\"shareAsUrl()\">\n    <fa-icon class=\"mr-1\" [icon]=\"faLink\"></fa-icon>\n    <span>{{ sharingAsUrl ? 'Generating URL...' : tinyUrl ? 'Copy URL' : 'Share as URL'}}</span>\n  </button>\n</div>\n\n<!-- Select Stats -->\n<app-skill-builder-stat-selector class=\"d-block mb-3\"\n                                 [build]=\"build\"></app-skill-builder-stat-selector>\n\n<!-- Remove a Rank -->\n<app-skill-builder-job-rank-list class=\"d-none d-sm-block mb-3\"\n                                     [build]=\"build\"></app-skill-builder-job-rank-list>\n\n<!-- Select a Job -->\n<app-skill-builder-job-selector [build]=\"build\"></app-skill-builder-job-selector>\n\n<!-- Jobs -->\n<app-skill-builder-job *ngFor=\"let job of jobs; trackBy: TOSEntity.trackBy\"\n                       [build]=\"build\"\n                       [job]=\"job\"></app-skill-builder-job>\n\n<!-- Tooltip -->\n<app-entity-tooltip class=\"d-none d-md-block\"\n                    [build]=\"build\"\n                    [debug]=\"false\"\n                    [tooltip]=\"tooltip\"></app-entity-tooltip>\n"

/***/ }),

/***/ "./src/app/skill-simulator/skill-builder/skill-builder.component.scss":
/*!****************************************************************************!*\
  !*** ./src/app/skill-simulator/skill-builder/skill-builder.component.scss ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3NraWxsLXNpbXVsYXRvci9za2lsbC1idWlsZGVyL3NraWxsLWJ1aWxkZXIuY29tcG9uZW50LnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/skill-simulator/skill-builder/skill-builder.component.ts":
/*!**************************************************************************!*\
  !*** ./src/app/skill-simulator/skill-builder/skill-builder.component.ts ***!
  \**************************************************************************/
/*! exports provided: SkillBuilderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SkillBuilderComponent", function() { return SkillBuilderComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_domain_tos_tos_entity_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/domain/tos/tos-entity.model */ "./src/app/shared/domain/tos/tos-entity.model.ts");
/* harmony import */ var _shared_domain_tos_tos_build__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/domain/tos/tos-build */ "./src/app/shared/domain/tos/tos-build.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "./node_modules/@fortawesome/free-solid-svg-icons/index.es.js");
/* harmony import */ var _shared_service_integrations_tos_neet_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../shared/service/integrations/tos-neet.service */ "./src/app/shared/service/integrations/tos-neet.service.ts");
/* harmony import */ var _shared_service_integrations_tiny_url_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../shared/service/integrations/tiny-url.service */ "./src/app/shared/service/integrations/tiny-url.service.ts");
/* harmony import */ var _shared_service_clipboard_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../shared/service/clipboard.service */ "./src/app/shared/service/clipboard.service.ts");
/* harmony import */ var _shared_domain_tos_region__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../shared/domain/tos-region */ "./src/app/shared/domain/tos-region.ts");










var PARAM_BUILD = 'build';
var PARAM_TINYURL = 'tinyurl';
var PARAM_TOSNEET = 'tosneet';
var SkillBuilderComponent = /** @class */ (function () {
    function SkillBuilderComponent(changeDetector, clipboardService, element, route, router, tinyUrlService, tosNeetService) {
        this.changeDetector = changeDetector;
        this.clipboardService = clipboardService;
        this.element = element;
        this.route = route;
        this.router = router;
        this.tinyUrlService = tinyUrlService;
        this.tosNeetService = tosNeetService;
        this.faImage = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_5__["faImage"];
        this.faLink = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_5__["faLink"];
        this.TOSEntity = _shared_domain_tos_tos_entity_model__WEBPACK_IMPORTED_MODULE_2__["TOSEntity"];
        this.build = _shared_domain_tos_tos_build__WEBPACK_IMPORTED_MODULE_3__["TOSSimulatorBuild"].new(_shared_domain_tos_region__WEBPACK_IMPORTED_MODULE_9__["TOSRegionService"].get());
        this.buildChanged = 0;
        this.jobs = [];
    }
    SkillBuilderComponent.prototype.buildSubscribe = function () {
        var _this = this;
        this.subscriptionSkill && this.subscriptionSkill.unsubscribe();
        this.subscriptionJob && this.subscriptionJob.unsubscribe();
        this.subscriptionStatsPoints && this.subscriptionStatsPoints.unsubscribe();
        this.subscriptionTooltip && this.subscriptionTooltip.unsubscribe();
        this.subscriptionSkill = this.build.Skill$.subscribe(function (value) { return _this.onBuildChange(); });
        this.subscriptionJob = this.build.Job$.subscribe(function (value) { return _this.onJobChange(value); });
        this.subscriptionStatsPoints = this.build.StatsPoints$.subscribe(function (value) { return _this.onBuildChange(); });
        this.subscriptionTooltip = this.build.Tooltip.subscribe(function (value) { return _this.tooltip = value; });
    };
    SkillBuilderComponent.prototype.shareAsImage = function () {
        var _this = this;
        var element = this.element.nativeElement;
        var options = {
            backgroundColor: window.getComputedStyle(document.body).backgroundColor,
            foreignObjectRendering: false,
            ignoreElements: function (element) { return ['button', 'fa-icon'].indexOf(element.tagName.toLowerCase()) > -1; },
            logging: false,
            windowWidth: 1920,
        };
        // Configure ultra-wide design
        this.element.nativeElement.style.display = 'block';
        this.element.nativeElement.style.maxWidth = '1750px';
        this.element.nativeElement.style.width = '1750px';
        this.sharingAsImage = true;
        window['html2canvas'](element, options).then(function (canvas) {
            var a = document.createElement("a");
            a.href = canvas.toDataURL("image/png");
            a.download = 'build.png';
            a.click();
            // Revert ultra-wide design
            _this.element.nativeElement.style.display = '';
            _this.element.nativeElement.style.maxWidth = '';
            _this.element.nativeElement.style.width = '';
            _this.sharingAsImage = false;
            _this.changeDetector.detectChanges();
        });
    };
    SkillBuilderComponent.prototype.shareAsUrl = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var urlBase, url, _a;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.tinyUrl) {
                            this.clipboardService.write(this.tinyUrl);
                            return [2 /*return*/];
                        }
                        urlBase = location.protocol + '//' + location.host + location.pathname;
                        _a = urlBase + '?' + PARAM_BUILD + '=';
                        return [4 /*yield*/, _shared_domain_tos_tos_build__WEBPACK_IMPORTED_MODULE_3__["TOSSimulatorBuild"].base64Encode(this.build)];
                    case 1:
                        url = _a + (_b.sent());
                        this.tinyUrl = null;
                        this.sharingAsUrl = true;
                        this.tinyUrlService
                            .create(url)
                            .subscribe(function (value) {
                            _this.tinyUrl = urlBase + '?' + PARAM_TINYURL + '=' + value;
                            _this.sharingAsUrl = false;
                            _this.changeDetector.detectChanges();
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    SkillBuilderComponent.prototype.onBuildChange = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var encoded, queryParams;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _shared_domain_tos_tos_build__WEBPACK_IMPORTED_MODULE_3__["TOSSimulatorBuild"].base64Encode(this.build)];
                    case 1:
                        encoded = _a.sent();
                        if (this.router.url.indexOf(encoded) == -1) {
                            queryParams = {};
                            queryParams[PARAM_BUILD] = encoded;
                            this.router.navigate(['.'], { queryParams: queryParams, relativeTo: this.route });
                            this.buildChanged++;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    SkillBuilderComponent.prototype.onJobChange = function (job) {
        var jobs = this.build.Jobs;
        var unique = [];
        var uniqueIDs = [];
        for (var _i = 0, jobs_1 = jobs; _i < jobs_1.length; _i++) {
            var job_1 = jobs_1[_i];
            if (uniqueIDs.indexOf(job_1.$ID) == -1) {
                unique.push(job_1);
                uniqueIDs.push(job_1.$ID);
            }
        }
        this.jobs = unique;
        this.onBuildChange();
    };
    SkillBuilderComponent.prototype.onQueryParamsChange = function (value) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a, _b;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.buildChanged > 0) {
                            this.buildChanged--;
                            this.tinyUrl = null;
                            return [2 /*return*/];
                        }
                        if (!value[PARAM_TOSNEET]) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, this.tosNeetService.decode(value[PARAM_TOSNEET]).toPromise()];
                    case 1:
                        _a.build = _c.sent();
                        this.buildSubscribe();
                        return [3 /*break*/, 6];
                    case 2:
                        if (!value[PARAM_TINYURL]) return [3 /*break*/, 3];
                        this.tinyUrlService
                            .parse(value[PARAM_TINYURL])
                            .subscribe(function (url) {
                            var queryParams = {};
                            queryParams[PARAM_BUILD] = url.split('?' + PARAM_BUILD + '=')[1];
                            _this.router.navigate(['.'], { queryParams: queryParams, relativeTo: _this.route });
                        });
                        return [3 /*break*/, 6];
                    case 3:
                        if (!value[PARAM_BUILD]) return [3 /*break*/, 5];
                        _b = this;
                        return [4 /*yield*/, _shared_domain_tos_tos_build__WEBPACK_IMPORTED_MODULE_3__["TOSSimulatorBuild"].base64Decode(_shared_domain_tos_region__WEBPACK_IMPORTED_MODULE_9__["TOSRegionService"].get(), value[PARAM_BUILD]).toPromise()];
                    case 4:
                        _b.build = _c.sent();
                        this.buildSubscribe();
                        return [3 /*break*/, 6];
                    case 5:
                        this.build = _shared_domain_tos_tos_build__WEBPACK_IMPORTED_MODULE_3__["TOSSimulatorBuild"].new(_shared_domain_tos_region__WEBPACK_IMPORTED_MODULE_9__["TOSRegionService"].get());
                        this.buildSubscribe();
                        _c.label = 6;
                    case 6:
                        this.changeDetector.detectChanges();
                        return [2 /*return*/];
                }
            });
        });
    };
    SkillBuilderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscriptionQueryParams = this.route.queryParams.subscribe(function (value) { return _this.onQueryParamsChange(value); });
        this.buildSubscribe();
    };
    SkillBuilderComponent.prototype.ngOnDestroy = function () {
        this.subscriptionSkill && this.subscriptionSkill.unsubscribe();
        this.subscriptionQueryParams && this.subscriptionQueryParams.unsubscribe();
        this.subscriptionJob && this.subscriptionJob.unsubscribe();
        this.subscriptionStatsPoints && this.subscriptionStatsPoints.unsubscribe();
        this.subscriptionTooltip && this.subscriptionTooltip.unsubscribe();
    };
    SkillBuilderComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
            selector: 'app-builder',
            template: __webpack_require__(/*! ./skill-builder.component.html */ "./src/app/skill-simulator/skill-builder/skill-builder.component.html"),
            styles: [__webpack_require__(/*! ./skill-builder.component.scss */ "./src/app/skill-simulator/skill-builder/skill-builder.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"],
            _shared_service_clipboard_service__WEBPACK_IMPORTED_MODULE_8__["ClipboardService"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"],
            _shared_service_integrations_tiny_url_service__WEBPACK_IMPORTED_MODULE_7__["TinyUrlService"],
            _shared_service_integrations_tos_neet_service__WEBPACK_IMPORTED_MODULE_6__["TosNeetService"]])
    ], SkillBuilderComponent);
    return SkillBuilderComponent;
}());



/***/ }),

/***/ "./src/app/skill-simulator/skill-simulator.module.ts":
/*!***********************************************************!*\
  !*** ./src/app/skill-simulator/skill-simulator.module.ts ***!
  \***********************************************************/
/*! exports provided: SkillSimulatorModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SkillSimulatorModule", function() { return SkillSimulatorModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _skill_builder_skill_builder_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./skill-builder/skill-builder.component */ "./src/app/skill-simulator/skill-builder/skill-builder.component.ts");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var _skill_builder_skill_builder_job_skill_builder_job_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./skill-builder/skill-builder-job/skill-builder-job.component */ "./src/app/skill-simulator/skill-builder/skill-builder-job/skill-builder-job.component.ts");
/* harmony import */ var _skill_builder_skill_builder_skill_skill_builder_skill_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./skill-builder/skill-builder-skill/skill-builder-skill.component */ "./src/app/skill-simulator/skill-builder/skill-builder-skill/skill-builder-skill.component.ts");
/* harmony import */ var _skill_builder_skill_builder_job_selector_skill_builder_job_selector_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./skill-builder/skill-builder-job-selector/skill-builder-job-selector.component */ "./src/app/skill-simulator/skill-builder/skill-builder-job-selector/skill-builder-job-selector.component.ts");
/* harmony import */ var _skill_builder_skill_builder_job_rank_skill_builder_job_rank_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./skill-builder/skill-builder-job-rank/skill-builder-job-rank.component */ "./src/app/skill-simulator/skill-builder/skill-builder-job-rank/skill-builder-job-rank.component.ts");
/* harmony import */ var _skill_builder_skill_builder_job_rank_list_skill_builder_job_rank_list_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./skill-builder/skill-builder-job-rank-list/skill-builder-job-rank-list.component */ "./src/app/skill-simulator/skill-builder/skill-builder-job-rank-list/skill-builder-job-rank-list.component.ts");
/* harmony import */ var _skill_builder_skill_builder_stat_selector_skill_builder_stat_selector_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./skill-builder/skill-builder-stat-selector/skill-builder-stat-selector.component */ "./src/app/skill-simulator/skill-builder/skill-builder-stat-selector/skill-builder-stat-selector.component.ts");










var SkillSimulatorModule = /** @class */ (function () {
    function SkillSimulatorModule() {
    }
    SkillSimulatorModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_3__["SharedModule"],
            ],
            declarations: [
                _skill_builder_skill_builder_component__WEBPACK_IMPORTED_MODULE_2__["SkillBuilderComponent"],
                _skill_builder_skill_builder_job_skill_builder_job_component__WEBPACK_IMPORTED_MODULE_4__["SkillBuilderJobComponent"],
                _skill_builder_skill_builder_job_selector_skill_builder_job_selector_component__WEBPACK_IMPORTED_MODULE_6__["SkillBuilderJobSelectorComponent"],
                _skill_builder_skill_builder_job_rank_skill_builder_job_rank_component__WEBPACK_IMPORTED_MODULE_7__["SkillBuilderJobRankComponent"],
                _skill_builder_skill_builder_skill_skill_builder_skill_component__WEBPACK_IMPORTED_MODULE_5__["SkillBuilderSkillComponent"],
                _skill_builder_skill_builder_job_rank_list_skill_builder_job_rank_list_component__WEBPACK_IMPORTED_MODULE_8__["SkillBuilderJobRankListComponent"],
                _skill_builder_skill_builder_stat_selector_skill_builder_stat_selector_component__WEBPACK_IMPORTED_MODULE_9__["SkillBuilderStatSelectorComponent"]
            ]
        })
    ], SkillSimulatorModule);
    return SkillSimulatorModule;
}());



/***/ }),

/***/ "./src/app/skill-simulator/skill-simulator.route.ts":
/*!**********************************************************!*\
  !*** ./src/app/skill-simulator/skill-simulator.route.ts ***!
  \**********************************************************/
/*! exports provided: ROUTES_SKILL_SIMULATOR */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ROUTES_SKILL_SIMULATOR", function() { return ROUTES_SKILL_SIMULATOR; });
/* harmony import */ var _skill_builder_skill_builder_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./skill-builder/skill-builder.component */ "./src/app/skill-simulator/skill-builder/skill-builder.component.ts");
/* harmony import */ var _shared_service_route_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/service/route.service */ "./src/app/shared/service/route.service.ts");


var ROUTES_SKILL_SIMULATOR = [
    {
        path: '',
        canActivate: [_shared_service_route_service__WEBPACK_IMPORTED_MODULE_1__["RouteService"]],
        canDeactivate: [_shared_service_route_service__WEBPACK_IMPORTED_MODULE_1__["RouteService"]],
        component: _skill_builder_skill_builder_component__WEBPACK_IMPORTED_MODULE_0__["SkillBuilderComponent"],
    },
];


/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/fungi/E/TosProject/TosGuruBase/tos-database/tos-web/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map