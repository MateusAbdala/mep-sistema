angular.module('mep')

.service('PagerService', function() {
    var service = {};

    service.GetPager = function(totalItems, currentPage, visiblePages, pageSize ){
        currentPage = currentPage || 1;
        pageSize = pageSize || 8;

        var totalPages = Math.ceil(totalItems / pageSize);

        var startPage, endPage;
        if (totalPages <= visiblePages) {
            startPage = 1;
            endPage = totalPages;
        } else {
            if (currentPage <= (visiblePages - 2)) {
                startPage = 1;
                endPage = visiblePages;
            } else if (currentPage + 2 >= totalPages) {
                startPage = totalPages - 7;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 2;
            }
        }

        var startIndex = (currentPage - 1) * pageSize;
        var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        var pages = _.range(startPage, endPage + 1);

        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    };
    return service;    
});