let xhrPool = {
	requests: []
};

xhrPool.abortAll = function() { // our abort function
	$(this).each(function(idx, jqXHR) {
		jqXHR.abort();
	});
	xhrPool.requests.length = 0
};

module.exports = xhrPool;