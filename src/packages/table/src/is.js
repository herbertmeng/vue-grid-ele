const is = {

}
var userAgent = (navigator && navigator.userAgent || '').toLowerCase();
var vendor = (navigator && navigator.vendor || '').toLowerCase();
var comparator = {
  '<': function(a, b) { return a < b; },
  '<=': function(a, b) { return a <= b; },
  '>': function(a, b) { return a > b; },
  '>=': function(a, b) { return a >= b; }
};

// helper function which compares a version to a range
function compareVersion(version, range) {
  var string = (range + '');
  var n = +(string.match(/\d+/) || NaN);
  var op = string.match(/^[<>]=?|/)[0];
  return comparator[op] ? comparator[op](version, n) : (version == n || n !== n);
}

is.safari = function(range) {
  var match = userAgent.match(/version\/(\d+).+?safari/);
  return match !== null && compareVersion(match[1], range);
};
is.chrome = function(range) {
  var match = /google inc/.test(vendor) ? userAgent.match(/(?:chrome|crios)\/(\d+)/) : null;
  return match !== null && !is.opera() && compareVersion(match[1], range);
};
is.opera = function(range) {
  var match = userAgent.match(/(?:^opera.+?version|opr)\/(\d+)/);
  return match !== null && compareVersion(match[1], range);
};
export default is