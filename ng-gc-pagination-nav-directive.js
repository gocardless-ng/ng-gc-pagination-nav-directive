/**
 * @license ng-gc-pagination-nav-directive v0.1.0
 * (c) 2013-2013 GoCardless, Ltd.
 * https://github.com/gocardless-ng/ng-gc-pagination-nav-directive.git
 * License: MIT
 */angular.module('pagination-nav-template.html', []).run(function($templateCache) {
  $templateCache.put('pagination-nav-template.html',
    '<div class="pagination-nav u-cf" ng-show="meta().records"><div class="u-pull-end u-text-h5"><span class="pagination-nav__detail">Viewing <span class="pagination-nav__current-range">{{ paginationStart(meta()) }}-{{ paginationEnd(meta()) }}</span> of <span class="pagination-nav__total-records">{{ meta().records }}</span> results</span> <a class="pagination-nav__btn pagination-nav__btn--previous" ng-class="{ \'is-disabled\': !meta().links.previous }" ng-href="{{ paginationLink(meta().links.previous) }}"><i class="ss-navigateleft pagination-nav__btn__icon btn-icon"></i></a> <a class="pagination-nav__btn pagination-nav__btn--next" ng-class="{ \'is-disabled\': !meta().links.next }" ng-href="{{ paginationLink(meta().links.next) }}"><i class="ss-navigateright pagination-nav__btn__icon btn-icon"></i></a></div></div>');
});

'use strict';

angular.module('gc.paginationNavController', [
  'gc.utils'
]).controller('PaginationNavController', [
  '$scope', '$location', 'utils',
  function PaginationNavController($scope, $location, utils) {

    function validMeta(meta) {
      return meta && angular.isNumber(meta.page) &&
        angular.isNumber(meta.per_page);
    }

    function getValidLink(link) {
      if (!link) {
        return '';
      }
      return link;
    }

    $scope.paginationLink = function paginationLink(page) {
      if (!page) {
        return '';
      }

      var search = angular.extend({}, $location.search());
      search.page = page;
      return $location.path() + getValidLink('?' + utils.param(search));
    };

    $scope.paginationStart = function paginationStart(meta) {
      var link = validMeta(meta) &&
        (meta.page - 1) * meta.per_page + 1;
      return getValidLink(link);
    };

    $scope.paginationEnd = function paginationEnd(meta) {
      var link = validMeta(meta) &&
        Math.min(meta.page * meta.per_page, meta.records);
      return getValidLink(link);
    };

  }
]);

'use strict';

angular.module('gc.paginationNav', [
  'gc.paginationNavController',
  'pagination-nav-template.html'
]).directive('paginationNav',
  [function paginationNavDirective() {

    return {
      restrict: 'E',
      templateUrl: 'pagination-nav-template.html',
      scope: {
        meta: '&'
      },
      controller: 'PaginationNavController',
      replace: true
    };

  }]);
