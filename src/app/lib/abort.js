let xhrPool = {
	requests: []
};

xhrPool.abortAll = function() { // our abort function
	xhrPool.requests.forEach(function(jqXHR) {
		jqXHR.abort();
	});
	xhrPool.requests.length = 0;
};


xhrPool.abortLast = function() { // our abort function
	let len = xhrPool.requests.length;

	len && xhrPool.requests[len - 1].abort();
};

module.exports = xhrPool;