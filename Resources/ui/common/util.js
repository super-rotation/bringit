exports.countArrayElements = function(array) {
	var count = 0;
	for (key in array) { count++; }
	return count;
};

exports.getMinKey = function(array) {
	var count = 0;
	var minKey;
	for (key in array) {
		if (count === 0) minKey = key;
		if (key < minKey) minKey = key;
		count++;
	}
	return Number(minKey);
};