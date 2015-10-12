/*!
 * jQuery JavaScript Library v1.11.3
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-04-28T16:19Z
 */

(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper window is present,
		// execute the factory and get jQuery
		// For environments that do not inherently posses a window with a document
		// (such as Node.js), expose a jQuery-making factory as module.exports
		// This accentuates the need for the creation of a real window
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//

var deletedIds = [];

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.11.3",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		return !jQuery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call(obj, "constructor") &&
				!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( support.ownLast ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.0-pre
 * http://sizzlejs.com/
 *
 * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-16
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];
	nodeType = context.nodeType;

	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	if ( !seed && documentIsHTML ) {

		// Try to shortcut find operations when possible (e.g., not under DocumentFragment)
		if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType !== 1 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;
	parent = doc.defaultView;

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Support tests
	---------------------------------------------------------------------- */
	documentIsHTML = !isXML( doc );

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\f]' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.2+, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.7+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter(function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.unique( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,
		// Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !(--remaining) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready );
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed, false );
		window.removeEventListener( "load", completed, false );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );

		// If IE event model is used
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};


var strundefined = typeof undefined;



// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownLast = i !== "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery(function() {
	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {
		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== strundefined ) {
		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {
			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
});




(function() {
	var div = document.createElement( "div" );

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( elem ) {
	var noData = jQuery.noData[ (elem.nodeName + " ").toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute("classid") === noData;
};


var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {
		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {
		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split(" ");
					}
				}
			} else {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[i] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, null
	} else {
		cache[ id ] = null;
	}
}

jQuery.extend({
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,
		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[0],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each(function() {
				jQuery.data( this, key, value );
			}) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray(data) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};



// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[0], key ) : emptyGet;
};
var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	// Minified: var a,b,c
	var input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		fragment = document.createDocumentFragment();

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );
	div.innerHTML = "<input type='radio' checked='checked' name='t'/>";

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Opera does not clone events (and typeof div.attachEvent === undefined).
	// IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
	support.noCloneEvent = true;
	if ( div.attachEvent ) {
		div.attachEvent( "onclick", function() {
			support.noCloneEvent = false;
		});

		div.cloneNode( true ).click();
	}

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}
})();


(function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox 23+ (lack focusin event)
	for ( i in { submit: true, change: true, focusin: true }) {
		eventName = "on" + i;

		if ( !(support[ i + "Bubbles" ] = eventName in window) ) {
			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i + "Bubbles" ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {
						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, ret, handleObj, matched, j,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var sel, handleObj, matches, i,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click") ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Chrome 23+, Safari?
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {
						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event, to properly expose it to GC
			if ( typeof elem[ name ] === strundefined ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;
		if ( !e ) {
			return;
		}
		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !jQuery._data( form, "submitBubbles" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					jQuery._data( form, "submitBubbles", true );
				}
			});
			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event, true );
				}
			}
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
						}
						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event, true );
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "changeBubbles" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					jQuery._data( elem, "changeBubbles", true );
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var type, origFn;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		area: [ 1, "<map>", "</map>" ],
		param: [ 1, "<object>", "</object>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
		// unless wrapped in a div with non-breaking characters in front of it.
		_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== strundefined ? context.querySelectorAll( tag || "*" ) :
			undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}

// Used in buildFragment, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (jQuery.find.attr( elem, "type" ) !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[1];
	} else {
		elem.removeAttribute("type");
	}
	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; (elem = elems[i]) != null; i++ ) {
		jQuery._data( elem, "globalEval", !refElements || jQuery._data( refElements[i], "globalEval" ) );
	}
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( (!support.noCloneEvent || !support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; (node = srcElements[i]) != null; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					fixCloneNodeIssues( node, destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; (node = srcElements[i]) != null; i++ ) {
					cloneCopyEvent( node, destElements[i] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var j, elem, contains,
			tmp, tag, tbody, wrap,
			l = elems.length,

			// Ensure a safe fragment
			safe = createSafeFragment( context ),

			nodes = [],
			i = 0;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || safe.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = (rtagName.exec( elem ) || [ "", "" ])[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;

					tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Manually add leading whitespace removed by IE
					if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						elem = tag === "table" && !rtbody.test( elem ) ?
							tmp.firstChild :

							// String was a bare <thead> or <tfoot>
							wrap[1] === "<table>" && !rtbody.test( elem ) ?
								tmp :
								0;

						j = elem && elem.childNodes.length;
						while ( j-- ) {
							if ( jQuery.nodeName( (tbody = elem.childNodes[j]), "tbody" ) && !tbody.childNodes.length ) {
								elem.removeChild( tbody );
							}
						}
					}

					jQuery.merge( nodes, tmp.childNodes );

					// Fix #12392 for WebKit and IE > 9
					tmp.textContent = "";

					// Fix #12392 for oldIE
					while ( tmp.firstChild ) {
						tmp.removeChild( tmp.firstChild );
					}

					// Remember the top-level container for proper cleanup
					tmp = safe.lastChild;
				}
			}
		}

		// Fix #11356: Clear elements from fragment
		if ( tmp ) {
			safe.removeChild( tmp );
		}

		// Reset defaultChecked for any radios and checkboxes
		// about to be appended to the DOM in IE 6/7 (#8060)
		if ( !support.appendChecked ) {
			jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
		}

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( safe.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		tmp = null;

		return safe;
	},

	cleanData: function( elems, /* internal */ acceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			deleteExpando = support.deleteExpando,
			special = jQuery.event.special;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( acceptData || jQuery.acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						if ( deleteExpando ) {
							delete elem[ internalKey ];

						} else if ( typeof elem.removeAttribute !== strundefined ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ (rtagName.exec( value ) || [ "", "" ])[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var first, node, hasScripts,
			scripts, doc, fragment,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[0],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[0] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[i], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!jQuery._data( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || "" ).replace( rcleanScript, "" ) );
							}
						}
					}
				}

				// Fix #11809: Avoid leaking memory
				fragment = first = null;
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone(true);
			jQuery( insert[i] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optmization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}


(function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== strundefined ) {
			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

})();
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );



var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {
		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		if ( elem.ownerDocument.defaultView.opener ) {
			return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
		}

		return window.getComputedStyle( elem, null );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( document.documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are proportional to the parent element instead
		// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			var condition = conditionFn();

			if ( condition == null ) {
				// The test was not ready at this point; screw the hook this time
				// but check again when needed next time.
				return;
			}

			if ( condition ) {
				// Hook not needed (or it's not possible to use it due to missing dependency),
				// remove it.
				// Since there are no other hooks for marginRight, remove the whole object.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.

			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	// Minified: var b,c,d,e,f,g, h,i
	var div, style, a, pixelPositionVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal;

	// Setup
	div = document.createElement( "div" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];
	style = a && a.style;

	// Finish early in limited (non-browser) environments
	if ( !style ) {
		return;
	}

	style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = style.boxSizing === "" || style.MozBoxSizing === "" ||
		style.WebkitBoxSizing === "";

	jQuery.extend(support, {
		reliableHiddenOffsets: function() {
			if ( reliableHiddenOffsetsVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		// Support: Android 2.3
		reliableMarginRight: function() {
			if ( reliableMarginRightVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		}
	});

	function computeStyleTests() {
		// Minified: var b,c,d,j
		var div, body, container, contents;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = false;
		reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			pixelPositionVal = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			boxSizingReliableVal =
				( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

			// Support: Android 2.3
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents, null ) || {} ).marginRight );

			div.removeChild( contents );
		}

		// Support: IE8
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
		contents = div.getElementsByTagName( "td" );
		contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
		reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		if ( reliableHiddenOffsetsVal ) {
			contents[ 0 ].style.display = "";
			contents[ 1 ].style.display = "none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		}

		body.removeChild( container );
	}

})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/,

	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = jQuery._data( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// Work around by temporarily setting element display to inline-block
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur()
				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {
	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	// Minified: var a,b,c,d,e
	var input, div, select, a, opt;

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName("a")[ 0 ];

	// First batch of tests.
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute("style") );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute("href") === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement("form").enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
})();


var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;
					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hook for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		// Use defaultChecked and defaultSelected for oldIE
		} else {
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}

		return name;
	}
};

// Retrieve booleans specially
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {

	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = getSetInput && getSetAttribute || !ruseDefault.test( name ) ?
		function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {
				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		} :
		function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
});

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {
				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {
				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					(ret = elem.ownerDocument.createAttribute( name ))
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return (ret = elem.getAttributeNode( name )) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	});
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case senstitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						-1;
			}
		}
	}
});

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {
	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each([ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	});
}

// Support: Safari, IE9+
// mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {
	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {
		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	}) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // Cross-domain detection vars
			parts,
			// Loop variable
			i,
			// URL without anti-cache param
			cacheURL,
			// Response headers as string
			responseHeadersString,
			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,
			// Response headers
			responseHeaders,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
		(!support.reliableHiddenOffsets() &&
			((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;
			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?
	// Support: IE6+
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		return !this.isLocal &&

			// Support: IE7-8
			// oldIE XHR does not support non-RFC2616 methods (#13240)
			// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
			// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
			// Although this check for six methods instead of eight
			// since IE also does not support "trace" and "connect"
			/^(get|post|head|put|delete|options)$/i.test( this.type ) &&

			createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	});
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport(function( options ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open( options.type, options.url, options.async, options.username, options.password );

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {
						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {
							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch( e ) {
									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;
								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					if ( !options.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback );
					} else {
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	});
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch( e ) {}
}




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery("head")[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement("script");

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, response, type,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};





var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray("auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true)
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));

/**
 * jQuery EasyUI 1.4.3
 * 
 * Copyright (c) 2009-2015 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL license: http://www.gnu.org/licenses/gpl.txt
 * To use it on other terms please contact us at info@jeasyui.com
 *
 */
(function($){
$.fn._remove=function(){
return this.each(function(){
$(this).remove();
try{
this.outerHTML="";
}
catch(err){
}
});
};
function _1(_2){
_2._remove();
};
function _3(_4,_5){
var _6=$.data(_4,"panel");
var _7=_6.options;
var _8=_6.panel;
var _9=_8.children(".panel-header");
var _a=_8.children(".panel-body");
var _b=_8.children(".panel-footer");
if(_5){
$.extend(_7,{width:_5.width,height:_5.height,minWidth:_5.minWidth,maxWidth:_5.maxWidth,minHeight:_5.minHeight,maxHeight:_5.maxHeight,left:_5.left,top:_5.top});
}
_8._size(_7);
_9.add(_a)._outerWidth(_8.width());
if(!isNaN(parseInt(_7.height))){
_a._outerHeight(_8.height()-_9._outerHeight()-_b._outerHeight());
}else{
_a.css("height","");
var _c=$.parser.parseValue("minHeight",_7.minHeight,_8.parent());
var _d=$.parser.parseValue("maxHeight",_7.maxHeight,_8.parent());
var _e=_9._outerHeight()+_b._outerHeight()+_8._outerHeight()-_8.height();
_a._size("minHeight",_c?(_c-_e):"");
_a._size("maxHeight",_d?(_d-_e):"");
}
_8.css({height:"",minHeight:"",maxHeight:"",left:_7.left,top:_7.top});
_7.onResize.apply(_4,[_7.width,_7.height]);
$(_4).panel("doLayout");
};
function _f(_10,_11){
var _12=$.data(_10,"panel").options;
var _13=$.data(_10,"panel").panel;
if(_11){
if(_11.left!=null){
_12.left=_11.left;
}
if(_11.top!=null){
_12.top=_11.top;
}
}
_13.css({left:_12.left,top:_12.top});
_12.onMove.apply(_10,[_12.left,_12.top]);
};
function _14(_15){
$(_15).addClass("panel-body")._size("clear");
var _16=$("<div class=\"panel\"></div>").insertBefore(_15);
_16[0].appendChild(_15);
_16.bind("_resize",function(e,_17){
if($(this).hasClass("easyui-fluid")||_17){
_3(_15);
}
return false;
});
return _16;
};
function _18(_19){
var _1a=$.data(_19,"panel");
var _1b=_1a.options;
var _1c=_1a.panel;
_1c.css(_1b.style);
_1c.addClass(_1b.cls);
_1d();
_1e();
var _1f=$(_19).panel("header");
var _20=$(_19).panel("body");
var _21=$(_19).siblings(".panel-footer");
if(_1b.border){
_1f.removeClass("panel-header-noborder");
_20.removeClass("panel-body-noborder");
_21.removeClass("panel-footer-noborder");
}else{
_1f.addClass("panel-header-noborder");
_20.addClass("panel-body-noborder");
_21.addClass("panel-footer-noborder");
}
_1f.addClass(_1b.headerCls);
_20.addClass(_1b.bodyCls);
$(_19).attr("id",_1b.id||"");
if(_1b.content){
$(_19).panel("clear");
$(_19).html(_1b.content);
$.parser.parse($(_19));
}
function _1d(){
if(_1b.noheader||(!_1b.title&&!_1b.header)){
_1(_1c.children(".panel-header"));
_1c.children(".panel-body").addClass("panel-body-noheader");
}else{
if(_1b.header){
$(_1b.header).addClass("panel-header").prependTo(_1c);
}else{
var _22=_1c.children(".panel-header");
if(!_22.length){
_22=$("<div class=\"panel-header\"></div>").prependTo(_1c);
}
if(!$.isArray(_1b.tools)){
_22.find("div.panel-tool .panel-tool-a").appendTo(_1b.tools);
}
_22.empty();
var _23=$("<div class=\"panel-title\"></div>").html(_1b.title).appendTo(_22);
if(_1b.iconCls){
_23.addClass("panel-with-icon");
$("<div class=\"panel-icon\"></div>").addClass(_1b.iconCls).appendTo(_22);
}
var _24=$("<div class=\"panel-tool\"></div>").appendTo(_22);
_24.bind("click",function(e){
e.stopPropagation();
});
if(_1b.tools){
if($.isArray(_1b.tools)){
$.map(_1b.tools,function(t){
_25(_24,t.iconCls,eval(t.handler));
});
}else{
$(_1b.tools).children().each(function(){
$(this).addClass($(this).attr("iconCls")).addClass("panel-tool-a").appendTo(_24);
});
}
}
if(_1b.collapsible){
_25(_24,"panel-tool-collapse",function(){
if(_1b.collapsed==true){
_4d(_19,true);
}else{
_3b(_19,true);
}
});
}
if(_1b.minimizable){
_25(_24,"panel-tool-min",function(){
_58(_19);
});
}
if(_1b.maximizable){
_25(_24,"panel-tool-max",function(){
if(_1b.maximized==true){
_5c(_19);
}else{
_3a(_19);
}
});
}
if(_1b.closable){
_25(_24,"panel-tool-close",function(){
_3c(_19);
});
}
}
_1c.children("div.panel-body").removeClass("panel-body-noheader");
}
};
function _25(c,_26,_27){
var a=$("<a href=\"javascript:void(0)\"></a>").addClass(_26).appendTo(c);
a.bind("click",_27);
};
function _1e(){
if(_1b.footer){
$(_1b.footer).addClass("panel-footer").appendTo(_1c);
$(_19).addClass("panel-body-nobottom");
}else{
_1c.children(".panel-footer").remove();
$(_19).removeClass("panel-body-nobottom");
}
};
};
function _28(_29,_2a){
var _2b=$.data(_29,"panel");
var _2c=_2b.options;
if(_2d){
_2c.queryParams=_2a;
}
if(!_2c.href){
return;
}
if(!_2b.isLoaded||!_2c.cache){
var _2d=$.extend({},_2c.queryParams);
if(_2c.onBeforeLoad.call(_29,_2d)==false){
return;
}
_2b.isLoaded=false;
$(_29).panel("clear");
if(_2c.loadingMessage){
$(_29).html($("<div class=\"panel-loading\"></div>").html(_2c.loadingMessage));
}
_2c.loader.call(_29,_2d,function(_2e){
var _2f=_2c.extractor.call(_29,_2e);
$(_29).html(_2f);
$.parser.parse($(_29));
_2c.onLoad.apply(_29,arguments);
_2b.isLoaded=true;
},function(){
_2c.onLoadError.apply(_29,arguments);
});
}
};
function _30(_31){
var t=$(_31);
t.find(".combo-f").each(function(){
$(this).combo("destroy");
});
t.find(".m-btn").each(function(){
$(this).menubutton("destroy");
});
t.find(".s-btn").each(function(){
$(this).splitbutton("destroy");
});
t.find(".tooltip-f").each(function(){
$(this).tooltip("destroy");
});
t.children("div").each(function(){
$(this)._size("unfit");
});
t.empty();
};
function _32(_33){
$(_33).panel("doLayout",true);
};
function _34(_35,_36){
var _37=$.data(_35,"panel").options;
var _38=$.data(_35,"panel").panel;
if(_36!=true){
if(_37.onBeforeOpen.call(_35)==false){
return;
}
}
_38.stop(true,true);
if($.isFunction(_37.openAnimation)){
_37.openAnimation.call(_35,cb);
}else{
switch(_37.openAnimation){
case "slide":
_38.slideDown(_37.openDuration,cb);
break;
case "fade":
_38.fadeIn(_37.openDuration,cb);
break;
case "show":
_38.show(_37.openDuration,cb);
break;
default:
_38.show();
cb();
}
}
function cb(){
_37.closed=false;
_37.minimized=false;
var _39=_38.children(".panel-header").find("a.panel-tool-restore");
if(_39.length){
_37.maximized=true;
}
_37.onOpen.call(_35);
if(_37.maximized==true){
_37.maximized=false;
_3a(_35);
}
if(_37.collapsed==true){
_37.collapsed=false;
_3b(_35);
}
if(!_37.collapsed){
_28(_35);
_32(_35);
}
};
};
function _3c(_3d,_3e){
var _3f=$.data(_3d,"panel").options;
var _40=$.data(_3d,"panel").panel;
if(_3e!=true){
if(_3f.onBeforeClose.call(_3d)==false){
return;
}
}
_40.stop(true,true);
_40._size("unfit");
if($.isFunction(_3f.closeAnimation)){
_3f.closeAnimation.call(_3d,cb);
}else{
switch(_3f.closeAnimation){
case "slide":
_40.slideUp(_3f.closeDuration,cb);
break;
case "fade":
_40.fadeOut(_3f.closeDuration,cb);
break;
case "hide":
_40.hide(_3f.closeDuration,cb);
break;
default:
_40.hide();
cb();
}
}
function cb(){
_3f.closed=true;
_3f.onClose.call(_3d);
};
};
function _41(_42,_43){
var _44=$.data(_42,"panel");
var _45=_44.options;
var _46=_44.panel;
if(_43!=true){
if(_45.onBeforeDestroy.call(_42)==false){
return;
}
}
$(_42).panel("clear").panel("clear","footer");
_1(_46);
_45.onDestroy.call(_42);
};
function _3b(_47,_48){
var _49=$.data(_47,"panel").options;
var _4a=$.data(_47,"panel").panel;
var _4b=_4a.children(".panel-body");
var _4c=_4a.children(".panel-header").find("a.panel-tool-collapse");
if(_49.collapsed==true){
return;
}
_4b.stop(true,true);
if(_49.onBeforeCollapse.call(_47)==false){
return;
}
_4c.addClass("panel-tool-expand");
if(_48==true){
_4b.slideUp("normal",function(){
_49.collapsed=true;
_49.onCollapse.call(_47);
});
}else{
_4b.hide();
_49.collapsed=true;
_49.onCollapse.call(_47);
}
};
function _4d(_4e,_4f){
var _50=$.data(_4e,"panel").options;
var _51=$.data(_4e,"panel").panel;
var _52=_51.children(".panel-body");
var _53=_51.children(".panel-header").find("a.panel-tool-collapse");
if(_50.collapsed==false){
return;
}
_52.stop(true,true);
if(_50.onBeforeExpand.call(_4e)==false){
return;
}
_53.removeClass("panel-tool-expand");
if(_4f==true){
_52.slideDown("normal",function(){
_50.collapsed=false;
_50.onExpand.call(_4e);
_28(_4e);
_32(_4e);
});
}else{
_52.show();
_50.collapsed=false;
_50.onExpand.call(_4e);
_28(_4e);
_32(_4e);
}
};
function _3a(_54){
var _55=$.data(_54,"panel").options;
var _56=$.data(_54,"panel").panel;
var _57=_56.children(".panel-header").find("a.panel-tool-max");
if(_55.maximized==true){
return;
}
_57.addClass("panel-tool-restore");
if(!$.data(_54,"panel").original){
$.data(_54,"panel").original={width:_55.width,height:_55.height,left:_55.left,top:_55.top,fit:_55.fit};
}
_55.left=0;
_55.top=0;
_55.fit=true;
_3(_54);
_55.minimized=false;
_55.maximized=true;
_55.onMaximize.call(_54);
};
function _58(_59){
var _5a=$.data(_59,"panel").options;
var _5b=$.data(_59,"panel").panel;
_5b._size("unfit");
_5b.hide();
_5a.minimized=true;
_5a.maximized=false;
_5a.onMinimize.call(_59);
};
function _5c(_5d){
var _5e=$.data(_5d,"panel").options;
var _5f=$.data(_5d,"panel").panel;
var _60=_5f.children(".panel-header").find("a.panel-tool-max");
if(_5e.maximized==false){
return;
}
_5f.show();
_60.removeClass("panel-tool-restore");
$.extend(_5e,$.data(_5d,"panel").original);
_3(_5d);
_5e.minimized=false;
_5e.maximized=false;
$.data(_5d,"panel").original=null;
_5e.onRestore.call(_5d);
};
function _61(_62,_63){
$.data(_62,"panel").options.title=_63;
$(_62).panel("header").find("div.panel-title").html(_63);
};
var _64=null;
$(window).unbind(".panel").bind("resize.panel",function(){
if(_64){
clearTimeout(_64);
}
_64=setTimeout(function(){
var _65=$("body.layout");
if(_65.length){
_65.layout("resize");
$("body").children(".easyui-fluid:visible").each(function(){
$(this).triggerHandler("_resize");
});
}else{
$("body").panel("doLayout");
}
_64=null;
},100);
});
$.fn.panel=function(_66,_67){
if(typeof _66=="string"){
return $.fn.panel.methods[_66](this,_67);
}
_66=_66||{};
return this.each(function(){
var _68=$.data(this,"panel");
var _69;
if(_68){
_69=$.extend(_68.options,_66);
_68.isLoaded=false;
}else{
_69=$.extend({},$.fn.panel.defaults,$.fn.panel.parseOptions(this),_66);
$(this).attr("title","");
_68=$.data(this,"panel",{options:_69,panel:_14(this),isLoaded:false});
}
_18(this);
if(_69.doSize==true){
_68.panel.css("display","block");
_3(this);
}
if(_69.closed==true||_69.minimized==true){
_68.panel.hide();
}else{
_34(this);
}
});
};
$.fn.panel.methods={options:function(jq){
return $.data(jq[0],"panel").options;
},panel:function(jq){
return $.data(jq[0],"panel").panel;
},header:function(jq){
return $.data(jq[0],"panel").panel.children(".panel-header");
},footer:function(jq){
return jq.panel("panel").children(".panel-footer");
},body:function(jq){
return $.data(jq[0],"panel").panel.children(".panel-body");
},setTitle:function(jq,_6a){
return jq.each(function(){
_61(this,_6a);
});
},open:function(jq,_6b){
return jq.each(function(){
_34(this,_6b);
});
},close:function(jq,_6c){
return jq.each(function(){
_3c(this,_6c);
});
},destroy:function(jq,_6d){
return jq.each(function(){
_41(this,_6d);
});
},clear:function(jq,_6e){
return jq.each(function(){
_30(_6e=="footer"?$(this).panel("footer"):this);
});
},refresh:function(jq,_6f){
return jq.each(function(){
var _70=$.data(this,"panel");
_70.isLoaded=false;
if(_6f){
if(typeof _6f=="string"){
_70.options.href=_6f;
}else{
_70.options.queryParams=_6f;
}
}
_28(this);
});
},resize:function(jq,_71){
return jq.each(function(){
_3(this,_71);
});
},doLayout:function(jq,all){
return jq.each(function(){
_72(this,"body");
_72($(this).siblings(".panel-footer")[0],"footer");
function _72(_73,_74){
if(!_73){
return;
}
var _75=_73==$("body")[0];
var s=$(_73).find("div.panel:visible,div.accordion:visible,div.tabs-container:visible,div.layout:visible,.easyui-fluid:visible").filter(function(_76,el){
var p=$(el).parents(".panel-"+_74+":first");
return _75?p.length==0:p[0]==_73;
});
s.each(function(){
$(this).triggerHandler("_resize",[all||false]);
});
};
});
},move:function(jq,_77){
return jq.each(function(){
_f(this,_77);
});
},maximize:function(jq){
return jq.each(function(){
_3a(this);
});
},minimize:function(jq){
return jq.each(function(){
_58(this);
});
},restore:function(jq){
return jq.each(function(){
_5c(this);
});
},collapse:function(jq,_78){
return jq.each(function(){
_3b(this,_78);
});
},expand:function(jq,_79){
return jq.each(function(){
_4d(this,_79);
});
}};
$.fn.panel.parseOptions=function(_7a){
var t=$(_7a);
var hh=t.children(".panel-header,header");
var ff=t.children(".panel-footer,footer");
return $.extend({},$.parser.parseOptions(_7a,["id","width","height","left","top","title","iconCls","cls","headerCls","bodyCls","tools","href","method","header","footer",{cache:"boolean",fit:"boolean",border:"boolean",noheader:"boolean"},{collapsible:"boolean",minimizable:"boolean",maximizable:"boolean"},{closable:"boolean",collapsed:"boolean",minimized:"boolean",maximized:"boolean",closed:"boolean"},"openAnimation","closeAnimation",{openDuration:"number",closeDuration:"number"},]),{loadingMessage:(t.attr("loadingMessage")!=undefined?t.attr("loadingMessage"):undefined),header:(hh.length?hh.removeClass("panel-header"):undefined),footer:(ff.length?ff.removeClass("panel-footer"):undefined)});
};
$.fn.panel.defaults={id:null,title:null,iconCls:null,width:"auto",height:"auto",left:null,top:null,cls:null,headerCls:null,bodyCls:null,style:{},href:null,cache:true,fit:false,border:true,doSize:true,noheader:false,content:null,collapsible:false,minimizable:false,maximizable:false,closable:false,collapsed:false,minimized:false,maximized:false,closed:false,openAnimation:false,openDuration:400,closeAnimation:false,closeDuration:400,tools:null,footer:null,header:null,queryParams:{},method:"get",href:null,loadingMessage:"Loading...",loader:function(_7b,_7c,_7d){
var _7e=$(this).panel("options");
if(!_7e.href){
return false;
}
$.ajax({type:_7e.method,url:_7e.href,cache:false,data:_7b,dataType:"html",success:function(_7f){
_7c(_7f);
},error:function(){
_7d.apply(this,arguments);
}});
},extractor:function(_80){
var _81=/<body[^>]*>((.|[\n\r])*)<\/body>/im;
var _82=_81.exec(_80);
if(_82){
return _82[1];
}else{
return _80;
}
},onBeforeLoad:function(_83){
},onLoad:function(){
},onLoadError:function(){
},onBeforeOpen:function(){
},onOpen:function(){
},onBeforeClose:function(){
},onClose:function(){
},onBeforeDestroy:function(){
},onDestroy:function(){
},onResize:function(_84,_85){
},onMove:function(_86,top){
},onMaximize:function(){
},onRestore:function(){
},onMinimize:function(){
},onBeforeCollapse:function(){
},onBeforeExpand:function(){
},onCollapse:function(){
},onExpand:function(){
}};
})(jQuery);


/**
 * jQuery EasyUI 1.4.3
 * 
 * Copyright (c) 2009-2015 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL license: http://www.gnu.org/licenses/gpl.txt
 * To use it on other terms please contact us at info@jeasyui.com
 *
 */
(function($){
$.parser={auto:true,onComplete:function(_1){
},plugins:["draggable","droppable","resizable","pagination","tooltip","linkbutton","menu","menubutton","splitbutton","switchbutton","progressbar","tree","textbox","filebox","combo","combobox","combotree","combogrid","numberbox","validatebox","searchbox","spinner","numberspinner","timespinner","datetimespinner","calendar","datebox","datetimebox","slider","layout","panel","datagrid","propertygrid","treegrid","datalist","tabs","accordion","window","dialog","form"],parse:function(_2){
var aa=[];
for(var i=0;i<$.parser.plugins.length;i++){
var _3=$.parser.plugins[i];
var r=$(".easyui-"+_3,_2);
if(r.length){
if(r[_3]){
r[_3]();
}else{
aa.push({name:_3,jq:r});
}
}
}
if(aa.length&&window.easyloader){
var _4=[];
for(var i=0;i<aa.length;i++){
_4.push(aa[i].name);
}
easyloader.load(_4,function(){
for(var i=0;i<aa.length;i++){
var _5=aa[i].name;
var jq=aa[i].jq;
jq[_5]();
}
$.parser.onComplete.call($.parser,_2);
});
}else{
$.parser.onComplete.call($.parser,_2);
}
},parseValue:function(_6,_7,_8,_9){
_9=_9||0;
var v=$.trim(String(_7||""));
var _a=v.substr(v.length-1,1);
if(_a=="%"){
v=parseInt(v.substr(0,v.length-1));
if(_6.toLowerCase().indexOf("width")>=0){
v=Math.floor((_8.width()-_9)*v/100);
}else{
v=Math.floor((_8.height()-_9)*v/100);
}
}else{
v=parseInt(v)||undefined;
}
return v;
},parseOptions:function(_b,_c){
var t=$(_b);
var _d={};
var s=$.trim(t.attr("data-options"));
if(s){
if(s.substring(0,1)!="{"){
s="{"+s+"}";
}
_d=(new Function("return "+s))();
}
$.map(["width","height","left","top","minWidth","maxWidth","minHeight","maxHeight"],function(p){
var pv=$.trim(_b.style[p]||"");
if(pv){
if(pv.indexOf("%")==-1){
pv=parseInt(pv)||undefined;
}
_d[p]=pv;
}
});
if(_c){
var _e={};
for(var i=0;i<_c.length;i++){
var pp=_c[i];
if(typeof pp=="string"){
_e[pp]=t.attr(pp);
}else{
for(var _f in pp){
var _10=pp[_f];
if(_10=="boolean"){
_e[_f]=t.attr(_f)?(t.attr(_f)=="true"):undefined;
}else{
if(_10=="number"){
_e[_f]=t.attr(_f)=="0"?0:parseFloat(t.attr(_f))||undefined;
}
}
}
}
}
$.extend(_d,_e);
}
return _d;
}};
$(function(){
var d=$("<div style=\"position:absolute;top:-1000px;width:100px;height:100px;padding:5px\"></div>").appendTo("body");
$._boxModel=d.outerWidth()!=100;
d.remove();
d=$("<div style=\"position:fixed\"></div>").appendTo("body");
$._positionFixed=(d.css("position")=="fixed");
d.remove();
if(!window.easyloader&&$.parser.auto){
$.parser.parse();
}
});
$.fn._outerWidth=function(_11){
if(_11==undefined){
if(this[0]==window){
return this.width()||document.body.clientWidth;
}
return this.outerWidth()||0;
}
return this._size("width",_11);
};
$.fn._outerHeight=function(_12){
if(_12==undefined){
if(this[0]==window){
return this.height()||document.body.clientHeight;
}
return this.outerHeight()||0;
}
return this._size("height",_12);
};
$.fn._scrollLeft=function(_13){
if(_13==undefined){
return this.scrollLeft();
}else{
return this.each(function(){
$(this).scrollLeft(_13);
});
}
};
$.fn._propAttr=$.fn.prop||$.fn.attr;
$.fn._size=function(_14,_15){
if(typeof _14=="string"){
if(_14=="clear"){
return this.each(function(){
$(this).css({width:"",minWidth:"",maxWidth:"",height:"",minHeight:"",maxHeight:""});
});
}else{
if(_14=="fit"){
return this.each(function(){
_16(this,this.tagName=="BODY"?$("body"):$(this).parent(),true);
});
}else{
if(_14=="unfit"){
return this.each(function(){
_16(this,$(this).parent(),false);
});
}else{
if(_15==undefined){
return _17(this[0],_14);
}else{
return this.each(function(){
_17(this,_14,_15);
});
}
}
}
}
}else{
return this.each(function(){
_15=_15||$(this).parent();
$.extend(_14,_16(this,_15,_14.fit)||{});
var r1=_18(this,"width",_15,_14);
var r2=_18(this,"height",_15,_14);
if(r1||r2){
$(this).addClass("easyui-fluid");
}else{
$(this).removeClass("easyui-fluid");
}
});
}
function _16(_19,_1a,fit){
if(!_1a.length){
return false;
}
var t=$(_19)[0];
var p=_1a[0];
var _1b=p.fcount||0;
if(fit){
if(!t.fitted){
t.fitted=true;
p.fcount=_1b+1;
$(p).addClass("panel-noscroll");
if(p.tagName=="BODY"){
$("html").addClass("panel-fit");
}
}
return {width:($(p).width()||1),height:($(p).height()||1)};
}else{
if(t.fitted){
t.fitted=false;
p.fcount=_1b-1;
if(p.fcount==0){
$(p).removeClass("panel-noscroll");
if(p.tagName=="BODY"){
$("html").removeClass("panel-fit");
}
}
}
return false;
}
};
function _18(_1c,_1d,_1e,_1f){
var t=$(_1c);
var p=_1d;
var p1=p.substr(0,1).toUpperCase()+p.substr(1);
var min=$.parser.parseValue("min"+p1,_1f["min"+p1],_1e);
var max=$.parser.parseValue("max"+p1,_1f["max"+p1],_1e);
var val=$.parser.parseValue(p,_1f[p],_1e);
var _20=(String(_1f[p]||"").indexOf("%")>=0?true:false);
if(!isNaN(val)){
var v=Math.min(Math.max(val,min||0),max||99999);
if(!_20){
_1f[p]=v;
}
t._size("min"+p1,"");
t._size("max"+p1,"");
t._size(p,v);
}else{
t._size(p,"");
t._size("min"+p1,min);
t._size("max"+p1,max);
}
return _20||_1f.fit;
};
function _17(_21,_22,_23){
var t=$(_21);
if(_23==undefined){
_23=parseInt(_21.style[_22]);
if(isNaN(_23)){
return undefined;
}
if($._boxModel){
_23+=_24();
}
return _23;
}else{
if(_23===""){
t.css(_22,"");
}else{
if($._boxModel){
_23-=_24();
if(_23<0){
_23=0;
}
}
t.css(_22,_23+"px");
}
}
function _24(){
if(_22.toLowerCase().indexOf("width")>=0){
return t.outerWidth()-t.width();
}else{
return t.outerHeight()-t.height();
}
};
};
};
})(jQuery);
(function($){
var _25=null;
var _26=null;
var _27=false;
function _28(e){
if(e.touches.length!=1){
return;
}
if(!_27){
_27=true;
dblClickTimer=setTimeout(function(){
_27=false;
},500);
}else{
clearTimeout(dblClickTimer);
_27=false;
_29(e,"dblclick");
}
_25=setTimeout(function(){
_29(e,"contextmenu",3);
},1000);
_29(e,"mousedown");
if($.fn.draggable.isDragging||$.fn.resizable.isResizing){
e.preventDefault();
}
};
function _2a(e){
if(e.touches.length!=1){
return;
}
if(_25){
clearTimeout(_25);
}
_29(e,"mousemove");
if($.fn.draggable.isDragging||$.fn.resizable.isResizing){
e.preventDefault();
}
};
function _2b(e){
if(_25){
clearTimeout(_25);
}
_29(e,"mouseup");
if($.fn.draggable.isDragging||$.fn.resizable.isResizing){
e.preventDefault();
}
};
function _29(e,_2c,_2d){
var _2e=new $.Event(_2c);
_2e.pageX=e.changedTouches[0].pageX;
_2e.pageY=e.changedTouches[0].pageY;
_2e.which=_2d||1;
$(e.target).trigger(_2e);
};
if(document.addEventListener){
document.addEventListener("touchstart",_28,true);
document.addEventListener("touchmove",_2a,true);
document.addEventListener("touchend",_2b,true);
}
})(jQuery);


/**
 * jQuery EasyUI 1.4.3
 * 
 * Copyright (c) 2009-2015 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL license: http://www.gnu.org/licenses/gpl.txt
 * To use it on other terms please contact us at info@jeasyui.com
 *
 */
(function($){
function _1(_2,_3){
var _4=$.data(_2,"accordion");
var _5=_4.options;
var _6=_4.panels;
var cc=$(_2);
if(_3){
$.extend(_5,{width:_3.width,height:_3.height});
}
cc._size(_5);
var _7=0;
var _8="auto";
var _9=cc.find(">.panel>.accordion-header");
if(_9.length){
_7=$(_9[0]).css("height","")._outerHeight();
}
if(!isNaN(parseInt(_5.height))){
_8=cc.height()-_7*_9.length;
}
_a(true,_8-_a(false)+1);
function _a(_b,_c){
var _d=0;
for(var i=0;i<_6.length;i++){
var p=_6[i];
var h=p.panel("header")._outerHeight(_7);
if(p.panel("options").collapsible==_b){
var _e=isNaN(_c)?undefined:(_c+_7*h.length);
p.panel("resize",{width:cc.width(),height:(_b?_e:undefined)});
_d+=p.panel("panel").outerHeight()-_7*h.length;
}
}
return _d;
};
};
function _f(_10,_11,_12,all){
var _13=$.data(_10,"accordion").panels;
var pp=[];
for(var i=0;i<_13.length;i++){
var p=_13[i];
if(_11){
if(p.panel("options")[_11]==_12){
pp.push(p);
}
}else{
if(p[0]==$(_12)[0]){
return i;
}
}
}
if(_11){
return all?pp:(pp.length?pp[0]:null);
}else{
return -1;
}
};
function _14(_15){
return _f(_15,"collapsed",false,true);
};
function _16(_17){
var pp=_14(_17);
return pp.length?pp[0]:null;
};
function _18(_19,_1a){
return _f(_19,null,_1a);
};
function _1b(_1c,_1d){
var _1e=$.data(_1c,"accordion").panels;
if(typeof _1d=="number"){
if(_1d<0||_1d>=_1e.length){
return null;
}else{
return _1e[_1d];
}
}
return _f(_1c,"title",_1d);
};
function _1f(_20){
var _21=$.data(_20,"accordion").options;
var cc=$(_20);
if(_21.border){
cc.removeClass("accordion-noborder");
}else{
cc.addClass("accordion-noborder");
}
};
function _22(_23){
var _24=$.data(_23,"accordion");
var cc=$(_23);
cc.addClass("accordion");
_24.panels=[];
cc.children("div").each(function(){
var _25=$.extend({},$.parser.parseOptions(this),{selected:($(this).attr("selected")?true:undefined)});
var pp=$(this);
_24.panels.push(pp);
_27(_23,pp,_25);
});
cc.bind("_resize",function(e,_26){
if($(this).hasClass("easyui-fluid")||_26){
_1(_23);
}
return false;
});
};
function _27(_28,pp,_29){
var _2a=$.data(_28,"accordion").options;
pp.panel($.extend({},{collapsible:true,minimizable:false,maximizable:false,closable:false,doSize:false,collapsed:true,headerCls:"accordion-header",bodyCls:"accordion-body"},_29,{onBeforeExpand:function(){
if(_29.onBeforeExpand){
if(_29.onBeforeExpand.call(this)==false){
return false;
}
}
if(!_2a.multiple){
var all=$.grep(_14(_28),function(p){
return p.panel("options").collapsible;
});
for(var i=0;i<all.length;i++){
_33(_28,_18(_28,all[i]));
}
}
var _2b=$(this).panel("header");
_2b.addClass("accordion-header-selected");
_2b.find(".accordion-collapse").removeClass("accordion-expand");
},onExpand:function(){
if(_29.onExpand){
_29.onExpand.call(this);
}
_2a.onSelect.call(_28,$(this).panel("options").title,_18(_28,this));
},onBeforeCollapse:function(){
if(_29.onBeforeCollapse){
if(_29.onBeforeCollapse.call(this)==false){
return false;
}
}
var _2c=$(this).panel("header");
_2c.removeClass("accordion-header-selected");
_2c.find(".accordion-collapse").addClass("accordion-expand");
},onCollapse:function(){
if(_29.onCollapse){
_29.onCollapse.call(this);
}
_2a.onUnselect.call(_28,$(this).panel("options").title,_18(_28,this));
}}));
var _2d=pp.panel("header");
var _2e=_2d.children("div.panel-tool");
_2e.children("a.panel-tool-collapse").hide();
var t=$("<a href=\"javascript:void(0)\"></a>").addClass("accordion-collapse accordion-expand").appendTo(_2e);
t.bind("click",function(){
_2f(pp);
return false;
});
pp.panel("options").collapsible?t.show():t.hide();
_2d.click(function(){
_2f(pp);
return false;
});
function _2f(p){
var _30=p.panel("options");
if(_30.collapsible){
var _31=_18(_28,p);
if(_30.collapsed){
_32(_28,_31);
}else{
_33(_28,_31);
}
}
};
};
function _32(_34,_35){
var p=_1b(_34,_35);
if(!p){
return;
}
_36(_34);
var _37=$.data(_34,"accordion").options;
p.panel("expand",_37.animate);
};
function _33(_38,_39){
var p=_1b(_38,_39);
if(!p){
return;
}
_36(_38);
var _3a=$.data(_38,"accordion").options;
p.panel("collapse",_3a.animate);
};
function _3b(_3c){
var _3d=$.data(_3c,"accordion").options;
var p=_f(_3c,"selected",true);
if(p){
_3e(_18(_3c,p));
}else{
_3e(_3d.selected);
}
function _3e(_3f){
var _40=_3d.animate;
_3d.animate=false;
_32(_3c,_3f);
_3d.animate=_40;
};
};
function _36(_41){
var _42=$.data(_41,"accordion").panels;
for(var i=0;i<_42.length;i++){
_42[i].stop(true,true);
}
};
function add(_43,_44){
var _45=$.data(_43,"accordion");
var _46=_45.options;
var _47=_45.panels;
if(_44.selected==undefined){
_44.selected=true;
}
_36(_43);
var pp=$("<div></div>").appendTo(_43);
_47.push(pp);
_27(_43,pp,_44);
_1(_43);
_46.onAdd.call(_43,_44.title,_47.length-1);
if(_44.selected){
_32(_43,_47.length-1);
}
};
function _48(_49,_4a){
var _4b=$.data(_49,"accordion");
var _4c=_4b.options;
var _4d=_4b.panels;
_36(_49);
var _4e=_1b(_49,_4a);
var _4f=_4e.panel("options").title;
var _50=_18(_49,_4e);
if(!_4e){
return;
}
if(_4c.onBeforeRemove.call(_49,_4f,_50)==false){
return;
}
_4d.splice(_50,1);
_4e.panel("destroy");
if(_4d.length){
_1(_49);
var _51=_16(_49);
if(!_51){
_32(_49,0);
}
}
_4c.onRemove.call(_49,_4f,_50);
};
$.fn.accordion=function(_52,_53){
if(typeof _52=="string"){
return $.fn.accordion.methods[_52](this,_53);
}
_52=_52||{};
return this.each(function(){
var _54=$.data(this,"accordion");
if(_54){
$.extend(_54.options,_52);
}else{
$.data(this,"accordion",{options:$.extend({},$.fn.accordion.defaults,$.fn.accordion.parseOptions(this),_52),accordion:$(this).addClass("accordion"),panels:[]});
_22(this);
}
_1f(this);
_1(this);
_3b(this);
});
};
$.fn.accordion.methods={options:function(jq){
return $.data(jq[0],"accordion").options;
},panels:function(jq){
return $.data(jq[0],"accordion").panels;
},resize:function(jq,_55){
return jq.each(function(){
_1(this,_55);
});
},getSelections:function(jq){
return _14(jq[0]);
},getSelected:function(jq){
return _16(jq[0]);
},getPanel:function(jq,_56){
return _1b(jq[0],_56);
},getPanelIndex:function(jq,_57){
return _18(jq[0],_57);
},select:function(jq,_58){
return jq.each(function(){
_32(this,_58);
});
},unselect:function(jq,_59){
return jq.each(function(){
_33(this,_59);
});
},add:function(jq,_5a){
return jq.each(function(){
add(this,_5a);
});
},remove:function(jq,_5b){
return jq.each(function(){
_48(this,_5b);
});
}};
$.fn.accordion.parseOptions=function(_5c){
var t=$(_5c);
return $.extend({},$.parser.parseOptions(_5c,["width","height",{fit:"boolean",border:"boolean",animate:"boolean",multiple:"boolean",selected:"number"}]));
};
$.fn.accordion.defaults={width:"auto",height:"auto",fit:false,border:true,animate:true,multiple:false,selected:0,onSelect:function(_5d,_5e){
},onUnselect:function(_5f,_60){
},onAdd:function(_61,_62){
},onBeforeRemove:function(_63,_64){
},onRemove:function(_65,_66){
}};
})(jQuery);


/**
 * jQuery EasyUI 1.4.3
 * 
 * Copyright (c) 2009-2015 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL license: http://www.gnu.org/licenses/gpl.txt
 * To use it on other terms please contact us at info@jeasyui.com
 *
 */
(function($){
function _1(_2,_3){
var _4=$.data(_2,"linkbutton").options;
if(_3){
$.extend(_4,_3);
}
if(_4.width||_4.height||_4.fit){
var _5=$(_2);
var _6=_5.parent();
var _7=_5.is(":visible");
if(!_7){
var _8=$("<div style=\"display:none\"></div>").insertBefore(_2);
var _9={position:_5.css("position"),display:_5.css("display"),left:_5.css("left")};
_5.appendTo("body");
_5.css({position:"absolute",display:"inline-block",left:-20000});
}
_5._size(_4,_6);
var _a=_5.find(".l-btn-left");
_a.css("margin-top",0);
_a.css("margin-top",parseInt((_5.height()-_a.height())/2)+"px");
if(!_7){
_5.insertAfter(_8);
_5.css(_9);
_8.remove();
}
}
};
function _b(_c){
var _d=$.data(_c,"linkbutton").options;
var t=$(_c).empty();
t.addClass("l-btn").removeClass("l-btn-plain l-btn-selected l-btn-plain-selected l-btn-outline");
t.removeClass("l-btn-small l-btn-medium l-btn-large").addClass("l-btn-"+_d.size);
if(_d.plain){
t.addClass("l-btn-plain");
}
if(_d.outline){
t.addClass("l-btn-outline");
}
if(_d.selected){
t.addClass(_d.plain?"l-btn-selected l-btn-plain-selected":"l-btn-selected");
}
t.attr("group",_d.group||"");
t.attr("id",_d.id||"");
var _e=$("<span class=\"l-btn-left\"></span>").appendTo(t);
if(_d.text){
$("<span class=\"l-btn-text\"></span>").html(_d.text).appendTo(_e);
}else{
$("<span class=\"l-btn-text l-btn-empty\">&nbsp;</span>").appendTo(_e);
}
if(_d.iconCls){
$("<span class=\"l-btn-icon\">&nbsp;</span>").addClass(_d.iconCls).appendTo(_e);
_e.addClass("l-btn-icon-"+_d.iconAlign);
}
t.unbind(".linkbutton").bind("focus.linkbutton",function(){
if(!_d.disabled){
$(this).addClass("l-btn-focus");
}
}).bind("blur.linkbutton",function(){
$(this).removeClass("l-btn-focus");
}).bind("click.linkbutton",function(){
if(!_d.disabled){
if(_d.toggle){
if(_d.selected){
$(this).linkbutton("unselect");
}else{
$(this).linkbutton("select");
}
}
_d.onClick.call(this);
}
});
_f(_c,_d.selected);
_10(_c,_d.disabled);
};
function _f(_11,_12){
var _13=$.data(_11,"linkbutton").options;
if(_12){
if(_13.group){
$("a.l-btn[group=\""+_13.group+"\"]").each(function(){
var o=$(this).linkbutton("options");
if(o.toggle){
$(this).removeClass("l-btn-selected l-btn-plain-selected");
o.selected=false;
}
});
}
$(_11).addClass(_13.plain?"l-btn-selected l-btn-plain-selected":"l-btn-selected");
_13.selected=true;
}else{
if(!_13.group){
$(_11).removeClass("l-btn-selected l-btn-plain-selected");
_13.selected=false;
}
}
};
function _10(_14,_15){
var _16=$.data(_14,"linkbutton");
var _17=_16.options;
$(_14).removeClass("l-btn-disabled l-btn-plain-disabled");
if(_15){
_17.disabled=true;
var _18=$(_14).attr("href");
if(_18){
_16.href=_18;
$(_14).attr("href","javascript:void(0)");
}
if(_14.onclick){
_16.onclick=_14.onclick;
_14.onclick=null;
}
_17.plain?$(_14).addClass("l-btn-disabled l-btn-plain-disabled"):$(_14).addClass("l-btn-disabled");
}else{
_17.disabled=false;
if(_16.href){
$(_14).attr("href",_16.href);
}
if(_16.onclick){
_14.onclick=_16.onclick;
}
}
};
$.fn.linkbutton=function(_19,_1a){
if(typeof _19=="string"){
return $.fn.linkbutton.methods[_19](this,_1a);
}
_19=_19||{};
return this.each(function(){
var _1b=$.data(this,"linkbutton");
if(_1b){
$.extend(_1b.options,_19);
}else{
$.data(this,"linkbutton",{options:$.extend({},$.fn.linkbutton.defaults,$.fn.linkbutton.parseOptions(this),_19)});
$(this).removeAttr("disabled");
$(this).bind("_resize",function(e,_1c){
if($(this).hasClass("easyui-fluid")||_1c){
_1(this);
}
return false;
});
}
_b(this);
_1(this);
});
};
$.fn.linkbutton.methods={options:function(jq){
return $.data(jq[0],"linkbutton").options;
},resize:function(jq,_1d){
return jq.each(function(){
_1(this,_1d);
});
},enable:function(jq){
return jq.each(function(){
_10(this,false);
});
},disable:function(jq){
return jq.each(function(){
_10(this,true);
});
},select:function(jq){
return jq.each(function(){
_f(this,true);
});
},unselect:function(jq){
return jq.each(function(){
_f(this,false);
});
}};
$.fn.linkbutton.parseOptions=function(_1e){
var t=$(_1e);
return $.extend({},$.parser.parseOptions(_1e,["id","iconCls","iconAlign","group","size","text",{plain:"boolean",toggle:"boolean",selected:"boolean",outline:"boolean"}]),{disabled:(t.attr("disabled")?true:undefined),text:($.trim(t.html())||undefined),iconCls:(t.attr("icon")||t.attr("iconCls"))});
};
$.fn.linkbutton.defaults={id:null,disabled:false,toggle:false,selected:false,outline:false,group:null,plain:false,text:"",iconCls:null,iconAlign:"left",size:"small",onClick:function(){
}};
})(jQuery);


/**
 * jQuery EasyUI 1.4.3
 * 
 * Copyright (c) 2009-2015 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL license: http://www.gnu.org/licenses/gpl.txt
 * To use it on other terms please contact us at info@jeasyui.com
 *
 */
(function($){
function _1(_2){
$(_2).addClass("tooltip-f");
};
function _3(_4){
var _5=$.data(_4,"tooltip").options;
$(_4).unbind(".tooltip").bind(_5.showEvent+".tooltip",function(e){
$(_4).tooltip("show",e);
}).bind(_5.hideEvent+".tooltip",function(e){
$(_4).tooltip("hide",e);
}).bind("mousemove.tooltip",function(e){
if(_5.trackMouse){
_5.trackMouseX=e.pageX;
_5.trackMouseY=e.pageY;
$(_4).tooltip("reposition");
}
});
};
function _6(_7){
var _8=$.data(_7,"tooltip");
if(_8.showTimer){
clearTimeout(_8.showTimer);
_8.showTimer=null;
}
if(_8.hideTimer){
clearTimeout(_8.hideTimer);
_8.hideTimer=null;
}
};
function _9(_a){
var _b=$.data(_a,"tooltip");
if(!_b||!_b.tip){
return;
}
var _c=_b.options;
var _d=_b.tip;
var _e={left:-100000,top:-100000};
if($(_a).is(":visible")){
_e=_f(_c.position);
if(_c.position=="top"&&_e.top<0){
_e=_f("bottom");
}else{
if((_c.position=="bottom")&&(_e.top+_d._outerHeight()>$(window)._outerHeight()+$(document).scrollTop())){
_e=_f("top");
}
}
if(_e.left<0){
if(_c.position=="left"){
_e=_f("right");
}else{
$(_a).tooltip("arrow").css("left",_d._outerWidth()/2+_e.left);
_e.left=0;
}
}else{
if(_e.left+_d._outerWidth()>$(window)._outerWidth()+$(document)._scrollLeft()){
if(_c.position=="right"){
_e=_f("left");
}else{
var _10=_e.left;
_e.left=$(window)._outerWidth()+$(document)._scrollLeft()-_d._outerWidth();
$(_a).tooltip("arrow").css("left",_d._outerWidth()/2-(_e.left-_10));
}
}
}
}
_d.css({left:_e.left,top:_e.top,zIndex:(_c.zIndex!=undefined?_c.zIndex:($.fn.window?$.fn.window.defaults.zIndex++:""))});
_c.onPosition.call(_a,_e.left,_e.top);
function _f(_11){
_c.position=_11||"bottom";
_d.removeClass("tooltip-top tooltip-bottom tooltip-left tooltip-right").addClass("tooltip-"+_c.position);
var _12,top;
if(_c.trackMouse){
t=$();
_12=_c.trackMouseX+_c.deltaX;
top=_c.trackMouseY+_c.deltaY;
}else{
var t=$(_a);
_12=t.offset().left+_c.deltaX;
top=t.offset().top+_c.deltaY;
}
switch(_c.position){
case "right":
_12+=t._outerWidth()+12+(_c.trackMouse?12:0);
top-=(_d._outerHeight()-t._outerHeight())/2;
break;
case "left":
_12-=_d._outerWidth()+12+(_c.trackMouse?12:0);
top-=(_d._outerHeight()-t._outerHeight())/2;
break;
case "top":
_12-=(_d._outerWidth()-t._outerWidth())/2;
top-=_d._outerHeight()+12+(_c.trackMouse?12:0);
break;
case "bottom":
_12-=(_d._outerWidth()-t._outerWidth())/2;
top+=t._outerHeight()+12+(_c.trackMouse?12:0);
break;
}
return {left:_12,top:top};
};
};
function _13(_14,e){
var _15=$.data(_14,"tooltip");
var _16=_15.options;
var tip=_15.tip;
if(!tip){
tip=$("<div tabindex=\"-1\" class=\"tooltip\">"+"<div class=\"tooltip-content\"></div>"+"<div class=\"tooltip-arrow-outer\"></div>"+"<div class=\"tooltip-arrow\"></div>"+"</div>").appendTo("body");
_15.tip=tip;
_17(_14);
}
_6(_14);
_15.showTimer=setTimeout(function(){
$(_14).tooltip("reposition");
tip.show();
_16.onShow.call(_14,e);
var _18=tip.children(".tooltip-arrow-outer");
var _19=tip.children(".tooltip-arrow");
var bc="border-"+_16.position+"-color";
_18.add(_19).css({borderTopColor:"",borderBottomColor:"",borderLeftColor:"",borderRightColor:""});
_18.css(bc,tip.css(bc));
_19.css(bc,tip.css("backgroundColor"));
},_16.showDelay);
};
function _1a(_1b,e){
var _1c=$.data(_1b,"tooltip");
if(_1c&&_1c.tip){
_6(_1b);
_1c.hideTimer=setTimeout(function(){
_1c.tip.hide();
_1c.options.onHide.call(_1b,e);
},_1c.options.hideDelay);
}
};
function _17(_1d,_1e){
var _1f=$.data(_1d,"tooltip");
var _20=_1f.options;
if(_1e){
_20.content=_1e;
}
if(!_1f.tip){
return;
}
var cc=typeof _20.content=="function"?_20.content.call(_1d):_20.content;
_1f.tip.children(".tooltip-content").html(cc);
_20.onUpdate.call(_1d,cc);
};
function _21(_22){
var _23=$.data(_22,"tooltip");
if(_23){
_6(_22);
var _24=_23.options;
if(_23.tip){
_23.tip.remove();
}
if(_24._title){
$(_22).attr("title",_24._title);
}
$.removeData(_22,"tooltip");
$(_22).unbind(".tooltip").removeClass("tooltip-f");
_24.onDestroy.call(_22);
}
};
$.fn.tooltip=function(_25,_26){
if(typeof _25=="string"){
return $.fn.tooltip.methods[_25](this,_26);
}
_25=_25||{};
return this.each(function(){
var _27=$.data(this,"tooltip");
if(_27){
$.extend(_27.options,_25);
}else{
$.data(this,"tooltip",{options:$.extend({},$.fn.tooltip.defaults,$.fn.tooltip.parseOptions(this),_25)});
_1(this);
}
_3(this);
_17(this);
});
};
$.fn.tooltip.methods={options:function(jq){
return $.data(jq[0],"tooltip").options;
},tip:function(jq){
return $.data(jq[0],"tooltip").tip;
},arrow:function(jq){
return jq.tooltip("tip").children(".tooltip-arrow-outer,.tooltip-arrow");
},show:function(jq,e){
return jq.each(function(){
_13(this,e);
});
},hide:function(jq,e){
return jq.each(function(){
_1a(this,e);
});
},update:function(jq,_28){
return jq.each(function(){
_17(this,_28);
});
},reposition:function(jq){
return jq.each(function(){
_9(this);
});
},destroy:function(jq){
return jq.each(function(){
_21(this);
});
}};
$.fn.tooltip.parseOptions=function(_29){
var t=$(_29);
var _2a=$.extend({},$.parser.parseOptions(_29,["position","showEvent","hideEvent","content",{trackMouse:"boolean",deltaX:"number",deltaY:"number",showDelay:"number",hideDelay:"number"}]),{_title:t.attr("title")});
t.attr("title","");
if(!_2a.content){
_2a.content=_2a._title;
}
return _2a;
};
$.fn.tooltip.defaults={position:"bottom",content:null,trackMouse:false,deltaX:0,deltaY:0,showEvent:"mouseenter",hideEvent:"mouseleave",showDelay:200,hideDelay:100,onShow:function(e){
},onHide:function(e){
},onUpdate:function(_2b){
},onPosition:function(_2c,top){
},onDestroy:function(){
}};
})(jQuery);


/**
 * jQuery EasyUI 1.4.3
 * 
 * Copyright (c) 2009-2015 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL license: http://www.gnu.org/licenses/gpl.txt
 * To use it on other terms please contact us at info@jeasyui.com
 *
 */
(function($){
function _1(_2){
$(_2).addClass("validatebox-text");
};
function _3(_4){
var _5=$.data(_4,"validatebox");
_5.validating=false;
if(_5.timer){
clearTimeout(_5.timer);
}
$(_4).tooltip("destroy");
$(_4).unbind();
$(_4).remove();
};
function _6(_7){
var _8=$.data(_7,"validatebox").options;
var _9=$(_7);
_9.unbind(".validatebox");
if(_8.novalidate||_9.is(":disabled")){
return;
}
for(var _a in _8.events){
$(_7).bind(_a+".validatebox",{target:_7},_8.events[_a]);
}
};
function _b(e){
var _c=e.data.target;
var _d=$.data(_c,"validatebox");
var _e=$(_c);
if($(_c).attr("readonly")){
return;
}
_d.validating=true;
_d.value=undefined;
(function(){
if(_d.validating){
if(_d.value!=_e.val()){
_d.value=_e.val();
if(_d.timer){
clearTimeout(_d.timer);
}
_d.timer=setTimeout(function(){
$(_c).validatebox("validate");
},_d.options.delay);
}else{
_f(_c);
}
setTimeout(arguments.callee,200);
}
})();
};
function _10(e){
var _11=e.data.target;
var _12=$.data(_11,"validatebox");
if(_12.timer){
clearTimeout(_12.timer);
_12.timer=undefined;
}
_12.validating=false;
_13(_11);
};
function _14(e){
var _15=e.data.target;
if($(_15).hasClass("validatebox-invalid")){
_16(_15);
}
};
function _17(e){
var _18=e.data.target;
var _19=$.data(_18,"validatebox");
if(!_19.validating){
_13(_18);
}
};
function _16(_1a){
var _1b=$.data(_1a,"validatebox");
var _1c=_1b.options;
$(_1a).tooltip($.extend({},_1c.tipOptions,{content:_1b.message,position:_1c.tipPosition,deltaX:_1c.deltaX})).tooltip("show");
_1b.tip=true;
};
function _f(_1d){
var _1e=$.data(_1d,"validatebox");
if(_1e&&_1e.tip){
$(_1d).tooltip("reposition");
}
};
function _13(_1f){
var _20=$.data(_1f,"validatebox");
_20.tip=false;
$(_1f).tooltip("hide");
};
function _21(_22){
var _23=$.data(_22,"validatebox");
var _24=_23.options;
var box=$(_22);
_24.onBeforeValidate.call(_22);
var _25=_26();
_24.onValidate.call(_22,_25);
return _25;
function _27(msg){
_23.message=msg;
};
function _28(_29,_2a){
var _2b=box.val();
var _2c=/([a-zA-Z_]+)(.*)/.exec(_29);
var _2d=_24.rules[_2c[1]];
if(_2d&&_2b){
var _2e=_2a||_24.validParams||eval(_2c[2]);
if(!_2d["validator"].call(_22,_2b,_2e)){
box.addClass("validatebox-invalid");
var _2f=_2d["message"];
if(_2e){
for(var i=0;i<_2e.length;i++){
_2f=_2f.replace(new RegExp("\\{"+i+"\\}","g"),_2e[i]);
}
}
_27(_24.invalidMessage||_2f);
if(_23.validating){
_16(_22);
}
return false;
}
}
return true;
};
function _26(){
box.removeClass("validatebox-invalid");
_13(_22);
if(_24.novalidate||box.is(":disabled")){
return true;
}
if(_24.required){
if(box.val()==""){
box.addClass("validatebox-invalid");
_27(_24.missingMessage);
if(_23.validating){
_16(_22);
}
return false;
}
}
if(_24.validType){
if($.isArray(_24.validType)){
for(var i=0;i<_24.validType.length;i++){
if(!_28(_24.validType[i])){
return false;
}
}
}else{
if(typeof _24.validType=="string"){
if(!_28(_24.validType)){
return false;
}
}else{
for(var _30 in _24.validType){
var _31=_24.validType[_30];
if(!_28(_30,_31)){
return false;
}
}
}
}
}
return true;
};
};
function _32(_33,_34){
var _35=$.data(_33,"validatebox").options;
if(_34!=undefined){
_35.novalidate=_34;
}
if(_35.novalidate){
$(_33).removeClass("validatebox-invalid");
_13(_33);
}
_21(_33);
_6(_33);
};
$.fn.validatebox=function(_36,_37){
if(typeof _36=="string"){
return $.fn.validatebox.methods[_36](this,_37);
}
_36=_36||{};
return this.each(function(){
var _38=$.data(this,"validatebox");
if(_38){
$.extend(_38.options,_36);
}else{
_1(this);
$.data(this,"validatebox",{options:$.extend({},$.fn.validatebox.defaults,$.fn.validatebox.parseOptions(this),_36)});
}
_32(this);
_21(this);
});
};
$.fn.validatebox.methods={options:function(jq){
return $.data(jq[0],"validatebox").options;
},destroy:function(jq){
return jq.each(function(){
_3(this);
});
},validate:function(jq){
return jq.each(function(){
_21(this);
});
},isValid:function(jq){
return _21(jq[0]);
},enableValidation:function(jq){
return jq.each(function(){
_32(this,false);
});
},disableValidation:function(jq){
return jq.each(function(){
_32(this,true);
});
}};
$.fn.validatebox.parseOptions=function(_39){
var t=$(_39);
return $.extend({},$.parser.parseOptions(_39,["validType","missingMessage","invalidMessage","tipPosition",{delay:"number",deltaX:"number"}]),{required:(t.attr("required")?true:undefined),novalidate:(t.attr("novalidate")!=undefined?true:undefined)});
};
$.fn.validatebox.defaults={required:false,validType:null,validParams:null,delay:200,missingMessage:"This field is required.",invalidMessage:null,tipPosition:"right",deltaX:0,novalidate:false,events:{focus:_b,blur:_10,mouseenter:_14,mouseleave:_17,click:function(e){
var t=$(e.data.target);
if(!t.is(":focus")){
t.trigger("focus");
}
}},tipOptions:{showEvent:"none",hideEvent:"none",showDelay:0,hideDelay:0,zIndex:"",onShow:function(){
$(this).tooltip("tip").css({color:"#000",borderColor:"#CC9933",backgroundColor:"#FFFFCC"});
},onHide:function(){
$(this).tooltip("destroy");
}},rules:{email:{validator:function(_3a){
return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(_3a);
},message:"Please enter a valid email address."},url:{validator:function(_3b){
return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(_3b);
},message:"Please enter a valid URL."},length:{validator:function(_3c,_3d){
var len=$.trim(_3c).length;
return len>=_3d[0]&&len<=_3d[1];
},message:"Please enter a value between {0} and {1}."},remote:{validator:function(_3e,_3f){
var _40={};
_40[_3f[1]]=_3e;
var _41=$.ajax({url:_3f[0],dataType:"json",data:_40,async:false,cache:false,type:"post"}).responseText;
return _41=="true";
},message:"Please fix this field."}},onBeforeValidate:function(){
},onValidate:function(_42){
}};
})(jQuery);


/**
 * jQuery EasyUI 1.4.3
 * 
 * Copyright (c) 2009-2015 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL license: http://www.gnu.org/licenses/gpl.txt
 * To use it on other terms please contact us at info@jeasyui.com
 *
 */
(function($){
function _1(_2){
$(_2).addClass("textbox-f").hide();
var _3=$("<span class=\"textbox\">"+"<input class=\"textbox-text\" autocomplete=\"off\">"+"<input type=\"hidden\" class=\"textbox-value\">"+"</span>").insertAfter(_2);
var _4=$(_2).attr("name");
if(_4){
_3.find("input.textbox-value").attr("name",_4);
$(_2).removeAttr("name").attr("textboxName",_4);
}
return _3;
};
function _5(_6){
var _7=$.data(_6,"textbox");
var _8=_7.options;
var tb=_7.textbox;
tb.find(".textbox-text").remove();
if(_8.multiline){
$("<textarea class=\"textbox-text\" autocomplete=\"off\"></textarea>").prependTo(tb);
}else{
$("<input type=\""+_8.type+"\" class=\"textbox-text\" autocomplete=\"off\">").prependTo(tb);
}
tb.find(".textbox-addon").remove();
var bb=_8.icons?$.extend(true,[],_8.icons):[];
if(_8.iconCls){
bb.push({iconCls:_8.iconCls,disabled:true});
}
if(bb.length){
var bc=$("<span class=\"textbox-addon\"></span>").prependTo(tb);
bc.addClass("textbox-addon-"+_8.iconAlign);
for(var i=0;i<bb.length;i++){
bc.append("<a href=\"javascript:void(0)\" class=\"textbox-icon "+bb[i].iconCls+"\" icon-index=\""+i+"\" tabindex=\"-1\"></a>");
}
}
tb.find(".textbox-button").remove();
if(_8.buttonText||_8.buttonIcon){
var _9=$("<a href=\"javascript:void(0)\" class=\"textbox-button\"></a>").prependTo(tb);
_9.addClass("textbox-button-"+_8.buttonAlign).linkbutton({text:_8.buttonText,iconCls:_8.buttonIcon});
}
_a(_6,_8.disabled);
_b(_6,_8.readonly);
};
function _c(_d){
var tb=$.data(_d,"textbox").textbox;
tb.find(".textbox-text").validatebox("destroy");
tb.remove();
$(_d).remove();
};
function _e(_f,_10){
var _11=$.data(_f,"textbox");
var _12=_11.options;
var tb=_11.textbox;
var _13=tb.parent();
if(_10){
_12.width=_10;
}
if(isNaN(parseInt(_12.width))){
var c=$(_f).clone();
c.css("visibility","hidden");
c.insertAfter(_f);
_12.width=c.outerWidth();
c.remove();
}
var _14=tb.is(":visible");
if(!_14){
tb.appendTo("body");
}
var _15=tb.find(".textbox-text");
var btn=tb.find(".textbox-button");
var _16=tb.find(".textbox-addon");
var _17=_16.find(".textbox-icon");
tb._size(_12,_13);
btn.linkbutton("resize",{height:tb.height()});
btn.css({left:(_12.buttonAlign=="left"?0:""),right:(_12.buttonAlign=="right"?0:"")});
_16.css({left:(_12.iconAlign=="left"?(_12.buttonAlign=="left"?btn._outerWidth():0):""),right:(_12.iconAlign=="right"?(_12.buttonAlign=="right"?btn._outerWidth():0):"")});
_17.css({width:_12.iconWidth+"px",height:tb.height()+"px"});
_15.css({paddingLeft:(_f.style.paddingLeft||""),paddingRight:(_f.style.paddingRight||""),marginLeft:_18("left"),marginRight:_18("right")});
if(_12.multiline){
_15.css({paddingTop:(_f.style.paddingTop||""),paddingBottom:(_f.style.paddingBottom||"")});
_15._outerHeight(tb.height());
}else{
var _19=Math.floor((tb.height()-_15.height())/2);
_15.css({paddingTop:_19+"px",paddingBottom:_19+"px"});
}
_15._outerWidth(tb.width()-_17.length*_12.iconWidth-btn._outerWidth());
if(!_14){
tb.insertAfter(_f);
}
_12.onResize.call(_f,_12.width,_12.height);
function _18(_1a){
return (_12.iconAlign==_1a?_16._outerWidth():0)+(_12.buttonAlign==_1a?btn._outerWidth():0);
};
};
function _1b(_1c){
var _1d=$(_1c).textbox("options");
var _1e=$(_1c).textbox("textbox");
_1e.validatebox($.extend({},_1d,{deltaX:$(_1c).textbox("getTipX"),onBeforeValidate:function(){
var box=$(this);
if(!box.is(":focus")){
_1d.oldInputValue=box.val();
box.val(_1d.value);
}
},onValidate:function(_1f){
var box=$(this);
if(_1d.oldInputValue!=undefined){
box.val(_1d.oldInputValue);
_1d.oldInputValue=undefined;
}
var tb=box.parent();
if(_1f){
tb.removeClass("textbox-invalid");
}else{
tb.addClass("textbox-invalid");
}
}}));
};
function _20(_21){
var _22=$.data(_21,"textbox");
var _23=_22.options;
var tb=_22.textbox;
var _24=tb.find(".textbox-text");
_24.attr("placeholder",_23.prompt);
_24.unbind(".textbox");
if(!_23.disabled&&!_23.readonly){
_24.bind("blur.textbox",function(e){
if(!tb.hasClass("textbox-focused")){
return;
}
_23.value=$(this).val();
if(_23.value==""){
$(this).val(_23.prompt).addClass("textbox-prompt");
}else{
$(this).removeClass("textbox-prompt");
}
tb.removeClass("textbox-focused");
}).bind("focus.textbox",function(e){
if(tb.hasClass("textbox-focused")){
return;
}
if($(this).val()!=_23.value){
$(this).val(_23.value);
}
$(this).removeClass("textbox-prompt");
tb.addClass("textbox-focused");
});
for(var _25 in _23.inputEvents){
_24.bind(_25+".textbox",{target:_21},_23.inputEvents[_25]);
}
}
var _26=tb.find(".textbox-addon");
_26.unbind().bind("click",{target:_21},function(e){
var _27=$(e.target).closest("a.textbox-icon:not(.textbox-icon-disabled)");
if(_27.length){
var _28=parseInt(_27.attr("icon-index"));
var _29=_23.icons[_28];
if(_29&&_29.handler){
_29.handler.call(_27[0],e);
_23.onClickIcon.call(_21,_28);
}
}
});
_26.find(".textbox-icon").each(function(_2a){
var _2b=_23.icons[_2a];
var _2c=$(this);
if(!_2b||_2b.disabled||_23.disabled||_23.readonly){
_2c.addClass("textbox-icon-disabled");
}else{
_2c.removeClass("textbox-icon-disabled");
}
});
var btn=tb.find(".textbox-button");
btn.unbind(".textbox").bind("click.textbox",function(){
if(!btn.linkbutton("options").disabled){
_23.onClickButton.call(_21);
}
});
btn.linkbutton((_23.disabled||_23.readonly)?"disable":"enable");
tb.unbind(".textbox").bind("_resize.textbox",function(e,_2d){
if($(this).hasClass("easyui-fluid")||_2d){
_e(_21);
}
return false;
});
};
function _a(_2e,_2f){
var _30=$.data(_2e,"textbox");
var _31=_30.options;
var tb=_30.textbox;
if(_2f){
_31.disabled=true;
$(_2e).attr("disabled","disabled");
tb.addClass("textbox-disabled");
tb.find(".textbox-text,.textbox-value").attr("disabled","disabled");
}else{
_31.disabled=false;
tb.removeClass("textbox-disabled");
$(_2e).removeAttr("disabled");
tb.find(".textbox-text,.textbox-value").removeAttr("disabled");
}
};
function _b(_32,_33){
var _34=$.data(_32,"textbox");
var _35=_34.options;
_35.readonly=_33==undefined?true:_33;
_34.textbox.removeClass("textbox-readonly").addClass(_35.readonly?"textbox-readonly":"");
var _36=_34.textbox.find(".textbox-text");
_36.removeAttr("readonly");
if(_35.readonly||!_35.editable){
_36.attr("readonly","readonly");
}
};
$.fn.textbox=function(_37,_38){
if(typeof _37=="string"){
var _39=$.fn.textbox.methods[_37];
if(_39){
return _39(this,_38);
}else{
return this.each(function(){
var _3a=$(this).textbox("textbox");
_3a.validatebox(_37,_38);
});
}
}
_37=_37||{};
return this.each(function(){
var _3b=$.data(this,"textbox");
if(_3b){
$.extend(_3b.options,_37);
if(_37.value!=undefined){
_3b.options.originalValue=_37.value;
}
}else{
_3b=$.data(this,"textbox",{options:$.extend({},$.fn.textbox.defaults,$.fn.textbox.parseOptions(this),_37),textbox:_1(this)});
_3b.options.originalValue=_3b.options.value;
}
_5(this);
_20(this);
_e(this);
_1b(this);
$(this).textbox("initValue",_3b.options.value);
});
};
$.fn.textbox.methods={options:function(jq){
return $.data(jq[0],"textbox").options;
},cloneFrom:function(jq,_3c){
return jq.each(function(){
var t=$(this);
if(t.data("textbox")){
return;
}
if(!$(_3c).data("textbox")){
$(_3c).textbox();
}
var _3d=t.attr("name")||"";
t.addClass("textbox-f").hide();
t.removeAttr("name").attr("textboxName",_3d);
var _3e=$(_3c).next().clone().insertAfter(t);
_3e.find("input.textbox-value").attr("name",_3d);
$.data(this,"textbox",{options:$.extend(true,{},$(_3c).textbox("options")),textbox:_3e});
var _3f=$(_3c).textbox("button");
if(_3f.length){
t.textbox("button").linkbutton($.extend(true,{},_3f.linkbutton("options")));
}
_20(this);
_1b(this);
});
},textbox:function(jq){
return $.data(jq[0],"textbox").textbox.find(".textbox-text");
},button:function(jq){
return $.data(jq[0],"textbox").textbox.find(".textbox-button");
},destroy:function(jq){
return jq.each(function(){
_c(this);
});
},resize:function(jq,_40){
return jq.each(function(){
_e(this,_40);
});
},disable:function(jq){
return jq.each(function(){
_a(this,true);
_20(this);
});
},enable:function(jq){
return jq.each(function(){
_a(this,false);
_20(this);
});
},readonly:function(jq,_41){
return jq.each(function(){
_b(this,_41);
_20(this);
});
},isValid:function(jq){
return jq.textbox("textbox").validatebox("isValid");
},clear:function(jq){
return jq.each(function(){
$(this).textbox("setValue","");
});
},setText:function(jq,_42){
return jq.each(function(){
var _43=$(this).textbox("options");
var _44=$(this).textbox("textbox");
_42=_42==undefined?"":String(_42);
if($(this).textbox("getText")!=_42){
_44.val(_42);
}
_43.value=_42;
if(!_44.is(":focus")){
if(_42){
_44.removeClass("textbox-prompt");
}else{
_44.val(_43.prompt).addClass("textbox-prompt");
}
}
$(this).textbox("validate");
});
},initValue:function(jq,_45){
return jq.each(function(){
var _46=$.data(this,"textbox");
_46.options.value="";
$(this).textbox("setText",_45);
_46.textbox.find(".textbox-value").val(_45);
$(this).val(_45);
});
},setValue:function(jq,_47){
return jq.each(function(){
var _48=$.data(this,"textbox").options;
var _49=$(this).textbox("getValue");
$(this).textbox("initValue",_47);
if(_49!=_47){
_48.onChange.call(this,_47,_49);
$(this).closest("form").trigger("_change",[this]);
}
});
},getText:function(jq){
var _4a=jq.textbox("textbox");
if(_4a.is(":focus")){
return _4a.val();
}else{
return jq.textbox("options").value;
}
},getValue:function(jq){
return jq.data("textbox").textbox.find(".textbox-value").val();
},reset:function(jq){
return jq.each(function(){
var _4b=$(this).textbox("options");
$(this).textbox("setValue",_4b.originalValue);
});
},getIcon:function(jq,_4c){
return jq.data("textbox").textbox.find(".textbox-icon:eq("+_4c+")");
},getTipX:function(jq){
var _4d=jq.data("textbox");
var _4e=_4d.options;
var tb=_4d.textbox;
var _4f=tb.find(".textbox-text");
var _50=tb.find(".textbox-addon")._outerWidth();
var _51=tb.find(".textbox-button")._outerWidth();
if(_4e.tipPosition=="right"){
return (_4e.iconAlign=="right"?_50:0)+(_4e.buttonAlign=="right"?_51:0)+1;
}else{
if(_4e.tipPosition=="left"){
return (_4e.iconAlign=="left"?-_50:0)+(_4e.buttonAlign=="left"?-_51:0)-1;
}else{
return _50/2*(_4e.iconAlign=="right"?1:-1);
}
}
}};
$.fn.textbox.parseOptions=function(_52){
var t=$(_52);
return $.extend({},$.fn.validatebox.parseOptions(_52),$.parser.parseOptions(_52,["prompt","iconCls","iconAlign","buttonText","buttonIcon","buttonAlign",{multiline:"boolean",editable:"boolean",iconWidth:"number"}]),{value:(t.val()||undefined),type:(t.attr("type")?t.attr("type"):undefined),disabled:(t.attr("disabled")?true:undefined),readonly:(t.attr("readonly")?true:undefined)});
};
$.fn.textbox.defaults=$.extend({},$.fn.validatebox.defaults,{width:"auto",height:22,prompt:"",value:"",type:"text",multiline:false,editable:true,disabled:false,readonly:false,icons:[],iconCls:null,iconAlign:"right",iconWidth:18,buttonText:"",buttonIcon:null,buttonAlign:"right",inputEvents:{blur:function(e){
var t=$(e.data.target);
var _53=t.textbox("options");
t.textbox("setValue",_53.value);
},keydown:function(e){
if(e.keyCode==13){
var t=$(e.data.target);
t.textbox("setValue",t.textbox("getText"));
}
}},onChange:function(_54,_55){
},onResize:function(_56,_57){
},onClickButton:function(){
},onClickIcon:function(_58){
}});
})(jQuery);


/**
 * jQuery EasyUI 1.4.3
 * 
 * Copyright (c) 2009-2015 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL license: http://www.gnu.org/licenses/gpl.txt
 * To use it on other terms please contact us at info@jeasyui.com
 *
 */
(function($){
$(function(){
$(document).unbind(".combo").bind("mousedown.combo mousewheel.combo",function(e){
var p=$(e.target).closest("span.combo,div.combo-p,div.menu");
if(p.length){
_1(p);
return;
}
$("body>div.combo-p>div.combo-panel:visible").panel("close");
});
});
function _2(_3){
var _4=$.data(_3,"combo");
var _5=_4.options;
if(!_4.panel){
_4.panel=$("<div class=\"combo-panel\"></div>").appendTo("body");
_4.panel.panel({minWidth:_5.panelMinWidth,maxWidth:_5.panelMaxWidth,minHeight:_5.panelMinHeight,maxHeight:_5.panelMaxHeight,doSize:false,closed:true,cls:"combo-p",style:{position:"absolute",zIndex:10},onOpen:function(){
var _6=$(this).panel("options").comboTarget;
var _7=$.data(_6,"combo");
if(_7){
_7.options.onShowPanel.call(_6);
}
},onBeforeClose:function(){
_1(this);
},onClose:function(){
var _8=$(this).panel("options").comboTarget;
var _9=$(_8).data("combo");
if(_9){
_9.options.onHidePanel.call(_8);
}
}});
}
var _a=$.extend(true,[],_5.icons);
if(_5.hasDownArrow){
_a.push({iconCls:"combo-arrow",handler:function(e){
_f(e.data.target);
}});
}
$(_3).addClass("combo-f").textbox($.extend({},_5,{icons:_a,onChange:function(){
}}));
$(_3).attr("comboName",$(_3).attr("textboxName"));
_4.combo=$(_3).next();
_4.combo.addClass("combo");
};
function _b(_c){
var _d=$.data(_c,"combo");
var _e=_d.options;
var p=_d.panel;
if(p.is(":visible")){
p.panel("close");
}
if(!_e.cloned){
p.panel("destroy");
}
$(_c).textbox("destroy");
};
function _f(_10){
var _11=$.data(_10,"combo").panel;
if(_11.is(":visible")){
_12(_10);
}else{
var p=$(_10).closest("div.combo-panel");
$("div.combo-panel:visible").not(_11).not(p).panel("close");
$(_10).combo("showPanel");
}
$(_10).combo("textbox").focus();
};
function _1(_13){
$(_13).find(".combo-f").each(function(){
var p=$(this).combo("panel");
if(p.is(":visible")){
p.panel("close");
}
});
};
function _14(e){
var _15=e.data.target;
var _16=$.data(_15,"combo");
var _17=_16.options;
var _18=_16.panel;
if(!_17.editable){
_f(_15);
}else{
var p=$(_15).closest("div.combo-panel");
$("div.combo-panel:visible").not(_18).not(p).panel("close");
}
};
function _19(e){
var _1a=e.data.target;
var t=$(_1a);
var _1b=t.data("combo");
var _1c=t.combo("options");
switch(e.keyCode){
case 38:
_1c.keyHandler.up.call(_1a,e);
break;
case 40:
_1c.keyHandler.down.call(_1a,e);
break;
case 37:
_1c.keyHandler.left.call(_1a,e);
break;
case 39:
_1c.keyHandler.right.call(_1a,e);
break;
case 13:
e.preventDefault();
_1c.keyHandler.enter.call(_1a,e);
return false;
case 9:
case 27:
_12(_1a);
break;
default:
if(_1c.editable){
if(_1b.timer){
clearTimeout(_1b.timer);
}
_1b.timer=setTimeout(function(){
var q=t.combo("getText");
if(_1b.previousText!=q){
_1b.previousText=q;
t.combo("showPanel");
_1c.keyHandler.query.call(_1a,q,e);
t.combo("validate");
}
},_1c.delay);
}
}
};
function _1d(_1e){
var _1f=$.data(_1e,"combo");
var _20=_1f.combo;
var _21=_1f.panel;
var _22=$(_1e).combo("options");
var _23=_21.panel("options");
_23.comboTarget=_1e;
if(_23.closed){
_21.panel("panel").show().css({zIndex:($.fn.menu?$.fn.menu.defaults.zIndex++:$.fn.window.defaults.zIndex++),left:-999999});
_21.panel("resize",{width:(_22.panelWidth?_22.panelWidth:_20._outerWidth()),height:_22.panelHeight});
_21.panel("panel").hide();
_21.panel("open");
}
(function(){
if(_21.is(":visible")){
_21.panel("move",{left:_24(),top:_25()});
setTimeout(arguments.callee,200);
}
})();
function _24(){
var _26=_20.offset().left;
if(_22.panelAlign=="right"){
_26+=_20._outerWidth()-_21._outerWidth();
}
if(_26+_21._outerWidth()>$(window)._outerWidth()+$(document).scrollLeft()){
_26=$(window)._outerWidth()+$(document).scrollLeft()-_21._outerWidth();
}
if(_26<0){
_26=0;
}
return _26;
};
function _25(){
var top=_20.offset().top+_20._outerHeight();
if(top+_21._outerHeight()>$(window)._outerHeight()+$(document).scrollTop()){
top=_20.offset().top-_21._outerHeight();
}
if(top<$(document).scrollTop()){
top=_20.offset().top+_20._outerHeight();
}
return top;
};
};
function _12(_27){
var _28=$.data(_27,"combo").panel;
_28.panel("close");
};
function _29(_2a,_2b){
var _2c=$.data(_2a,"combo");
var _2d=$(_2a).textbox("getText");
if(_2d!=_2b){
$(_2a).textbox("setText",_2b);
_2c.previousText=_2b;
}
};
function _2e(_2f){
var _30=[];
var _31=$.data(_2f,"combo").combo;
_31.find(".textbox-value").each(function(){
_30.push($(this).val());
});
return _30;
};
function _32(_33,_34){
var _35=$.data(_33,"combo");
var _36=_35.options;
var _37=_35.combo;
if(!$.isArray(_34)){
_34=_34.split(_36.separator);
}
var _38=_2e(_33);
_37.find(".textbox-value").remove();
var _39=$(_33).attr("textboxName")||"";
for(var i=0;i<_34.length;i++){
var _3a=$("<input type=\"hidden\" class=\"textbox-value\">").appendTo(_37);
_3a.attr("name",_39);
if(_36.disabled){
_3a.attr("disabled","disabled");
}
_3a.val(_34[i]);
}
var _3b=(function(){
if(_38.length!=_34.length){
return true;
}
var a1=$.extend(true,[],_38);
var a2=$.extend(true,[],_34);
a1.sort();
a2.sort();
for(var i=0;i<a1.length;i++){
if(a1[i]!=a2[i]){
return true;
}
}
return false;
})();
if(_3b){
if(_36.multiple){
_36.onChange.call(_33,_34,_38);
}else{
_36.onChange.call(_33,_34[0],_38[0]);
}
$(_33).closest("form").trigger("_change",[_33]);
}
};
function _3c(_3d){
var _3e=_2e(_3d);
return _3e[0];
};
function _3f(_40,_41){
_32(_40,[_41]);
};
function _42(_43){
var _44=$.data(_43,"combo").options;
var _45=_44.onChange;
_44.onChange=function(){
};
if(_44.multiple){
_32(_43,_44.value?_44.value:[]);
}else{
_3f(_43,_44.value);
}
_44.onChange=_45;
};
$.fn.combo=function(_46,_47){
if(typeof _46=="string"){
var _48=$.fn.combo.methods[_46];
if(_48){
return _48(this,_47);
}else{
return this.textbox(_46,_47);
}
}
_46=_46||{};
return this.each(function(){
var _49=$.data(this,"combo");
if(_49){
$.extend(_49.options,_46);
if(_46.value!=undefined){
_49.options.originalValue=_46.value;
}
}else{
_49=$.data(this,"combo",{options:$.extend({},$.fn.combo.defaults,$.fn.combo.parseOptions(this),_46),previousText:""});
_49.options.originalValue=_49.options.value;
}
_2(this);
_42(this);
});
};
$.fn.combo.methods={options:function(jq){
var _4a=jq.textbox("options");
return $.extend($.data(jq[0],"combo").options,{width:_4a.width,height:_4a.height,disabled:_4a.disabled,readonly:_4a.readonly});
},cloneFrom:function(jq,_4b){
return jq.each(function(){
$(this).textbox("cloneFrom",_4b);
$.data(this,"combo",{options:$.extend(true,{cloned:true},$(_4b).combo("options")),combo:$(this).next(),panel:$(_4b).combo("panel")});
$(this).addClass("combo-f").attr("comboName",$(this).attr("textboxName"));
});
},panel:function(jq){
return $.data(jq[0],"combo").panel;
},destroy:function(jq){
return jq.each(function(){
_b(this);
});
},showPanel:function(jq){
return jq.each(function(){
_1d(this);
});
},hidePanel:function(jq){
return jq.each(function(){
_12(this);
});
},clear:function(jq){
return jq.each(function(){
$(this).textbox("setText","");
var _4c=$.data(this,"combo").options;
if(_4c.multiple){
$(this).combo("setValues",[]);
}else{
$(this).combo("setValue","");
}
});
},reset:function(jq){
return jq.each(function(){
var _4d=$.data(this,"combo").options;
if(_4d.multiple){
$(this).combo("setValues",_4d.originalValue);
}else{
$(this).combo("setValue",_4d.originalValue);
}
});
},setText:function(jq,_4e){
return jq.each(function(){
_29(this,_4e);
});
},getValues:function(jq){
return _2e(jq[0]);
},setValues:function(jq,_4f){
return jq.each(function(){
_32(this,_4f);
});
},getValue:function(jq){
return _3c(jq[0]);
},setValue:function(jq,_50){
return jq.each(function(){
_3f(this,_50);
});
}};
$.fn.combo.parseOptions=function(_51){
var t=$(_51);
return $.extend({},$.fn.textbox.parseOptions(_51),$.parser.parseOptions(_51,["separator","panelAlign",{panelWidth:"number",hasDownArrow:"boolean",delay:"number",selectOnNavigation:"boolean"},{panelMinWidth:"number",panelMaxWidth:"number",panelMinHeight:"number",panelMaxHeight:"number"}]),{panelHeight:(t.attr("panelHeight")=="auto"?"auto":parseInt(t.attr("panelHeight"))||undefined),multiple:(t.attr("multiple")?true:undefined)});
};
$.fn.combo.defaults=$.extend({},$.fn.textbox.defaults,{inputEvents:{click:_14,keydown:_19,paste:_19,drop:_19},panelWidth:null,panelHeight:200,panelMinWidth:null,panelMaxWidth:null,panelMinHeight:null,panelMaxHeight:null,panelAlign:"left",multiple:false,selectOnNavigation:true,separator:",",hasDownArrow:true,delay:200,keyHandler:{up:function(e){
},down:function(e){
},left:function(e){
},right:function(e){
},enter:function(e){
},query:function(q,e){
}},onShowPanel:function(){
},onHidePanel:function(){
},onChange:function(_52,_53){
}});
})(jQuery);


/**
 * jQuery EasyUI 1.4.3
 * 
 * Copyright (c) 2009-2015 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL license: http://www.gnu.org/licenses/gpl.txt
 * To use it on other terms please contact us at info@jeasyui.com
 *
 */
(function($){
var _1=0;
function _2(_3,_4){
var _5=$.data(_3,"combobox");
var _6=_5.options;
var _7=_5.data;
for(var i=0;i<_7.length;i++){
if(_7[i][_6.valueField]==_4){
return i;
}
}
return -1;
};
function _8(_9,_a){
var _b=$.data(_9,"combobox").options;
var _c=$(_9).combo("panel");
var _d=_b.finder.getEl(_9,_a);
if(_d.length){
if(_d.position().top<=0){
var h=_c.scrollTop()+_d.position().top;
_c.scrollTop(h);
}else{
if(_d.position().top+_d.outerHeight()>_c.height()){
var h=_c.scrollTop()+_d.position().top+_d.outerHeight()-_c.height();
_c.scrollTop(h);
}
}
}
};
function _e(_f,dir){
var _10=$.data(_f,"combobox").options;
var _11=$(_f).combobox("panel");
var _12=_11.children("div.combobox-item-hover");
if(!_12.length){
_12=_11.children("div.combobox-item-selected");
}
_12.removeClass("combobox-item-hover");
var _13="div.combobox-item:visible:not(.combobox-item-disabled):first";
var _14="div.combobox-item:visible:not(.combobox-item-disabled):last";
if(!_12.length){
_12=_11.children(dir=="next"?_13:_14);
}else{
if(dir=="next"){
_12=_12.nextAll(_13);
if(!_12.length){
_12=_11.children(_13);
}
}else{
_12=_12.prevAll(_13);
if(!_12.length){
_12=_11.children(_14);
}
}
}
if(_12.length){
_12.addClass("combobox-item-hover");
var row=_10.finder.getRow(_f,_12);
if(row){
_8(_f,row[_10.valueField]);
if(_10.selectOnNavigation){
_15(_f,row[_10.valueField]);
}
}
}
};
function _15(_16,_17){
var _18=$.data(_16,"combobox").options;
var _19=$(_16).combo("getValues");
if($.inArray(_17+"",_19)==-1){
if(_18.multiple){
_19.push(_17);
}else{
_19=[_17];
}
_1a(_16,_19);
_18.onSelect.call(_16,_18.finder.getRow(_16,_17));
}
};
function _1b(_1c,_1d){
var _1e=$.data(_1c,"combobox").options;
var _1f=$(_1c).combo("getValues");
var _20=$.inArray(_1d+"",_1f);
if(_20>=0){
_1f.splice(_20,1);
_1a(_1c,_1f);
_1e.onUnselect.call(_1c,_1e.finder.getRow(_1c,_1d));
}
};
function _1a(_21,_22,_23){
var _24=$.data(_21,"combobox").options;
var _25=$(_21).combo("panel");
if(!$.isArray(_22)){
_22=_22.split(_24.separator);
}
_25.find("div.combobox-item-selected").removeClass("combobox-item-selected");
var vv=[],ss=[];
for(var i=0;i<_22.length;i++){
var v=_22[i];
var s=v;
_24.finder.getEl(_21,v).addClass("combobox-item-selected");
var row=_24.finder.getRow(_21,v);
if(row){
s=row[_24.textField];
}
vv.push(v);
ss.push(s);
}
if(!_23){
$(_21).combo("setText",ss.join(_24.separator));
}
$(_21).combo("setValues",vv);
};
function _26(_27,_28,_29){
var _2a=$.data(_27,"combobox");
var _2b=_2a.options;
_2a.data=_2b.loadFilter.call(_27,_28);
_2a.groups=[];
_28=_2a.data;
var _2c=$(_27).combobox("getValues");
var dd=[];
var _2d=undefined;
for(var i=0;i<_28.length;i++){
var row=_28[i];
var v=row[_2b.valueField]+"";
var s=row[_2b.textField];
var g=row[_2b.groupField];
if(g){
if(_2d!=g){
_2d=g;
_2a.groups.push(g);
dd.push("<div id=\""+(_2a.groupIdPrefix+"_"+(_2a.groups.length-1))+"\" class=\"combobox-group\">");
dd.push(_2b.groupFormatter?_2b.groupFormatter.call(_27,g):g);
dd.push("</div>");
}
}else{
_2d=undefined;
}
var cls="combobox-item"+(row.disabled?" combobox-item-disabled":"")+(g?" combobox-gitem":"");
dd.push("<div id=\""+(_2a.itemIdPrefix+"_"+i)+"\" class=\""+cls+"\">");
dd.push(_2b.formatter?_2b.formatter.call(_27,row):s);
dd.push("</div>");
if(row["selected"]&&$.inArray(v,_2c)==-1){
_2c.push(v);
}
}
$(_27).combo("panel").html(dd.join(""));
if(_2b.multiple){
_1a(_27,_2c,_29);
}else{
_1a(_27,_2c.length?[_2c[_2c.length-1]]:[],_29);
}
_2b.onLoadSuccess.call(_27,_28);
};
function _2e(_2f,url,_30,_31){
var _32=$.data(_2f,"combobox").options;
if(url){
_32.url=url;
}
_30=$.extend({},_32.queryParams,_30||{});
if(_32.onBeforeLoad.call(_2f,_30)==false){
return;
}
_32.loader.call(_2f,_30,function(_33){
_26(_2f,_33,_31);
},function(){
_32.onLoadError.apply(this,arguments);
});
};
function _34(_35,q){
var _36=$.data(_35,"combobox");
var _37=_36.options;
var qq=_37.multiple?q.split(_37.separator):[q];
if(_37.mode=="remote"){
_38(qq);
_2e(_35,null,{q:q},true);
}else{
var _39=$(_35).combo("panel");
_39.find("div.combobox-item-selected,div.combobox-item-hover").removeClass("combobox-item-selected combobox-item-hover");
_39.find("div.combobox-item,div.combobox-group").hide();
var _3a=_36.data;
var vv=[];
$.map(qq,function(q){
q=$.trim(q);
var _3b=q;
var _3c=undefined;
for(var i=0;i<_3a.length;i++){
var row=_3a[i];
if(_37.filter.call(_35,q,row)){
var v=row[_37.valueField];
var s=row[_37.textField];
var g=row[_37.groupField];
var _3d=_37.finder.getEl(_35,v).show();
if(s.toLowerCase()==q.toLowerCase()){
_3b=v;
_3d.addClass("combobox-item-selected");
_37.onSelect.call(_35,row);
}
if(_37.groupField&&_3c!=g){
$("#"+_36.groupIdPrefix+"_"+$.inArray(g,_36.groups)).show();
_3c=g;
}
}
}
vv.push(_3b);
});
_38(vv);
}
function _38(vv){
_1a(_35,_37.multiple?(q?vv:[]):vv,true);
};
};
function _3e(_3f){
var t=$(_3f);
var _40=t.combobox("options");
var _41=t.combobox("panel");
var _42=_41.children("div.combobox-item-hover");
if(_42.length){
var row=_40.finder.getRow(_3f,_42);
var _43=row[_40.valueField];
if(_40.multiple){
if(_42.hasClass("combobox-item-selected")){
t.combobox("unselect",_43);
}else{
t.combobox("select",_43);
}
}else{
t.combobox("select",_43);
}
}
var vv=[];
$.map(t.combobox("getValues"),function(v){
if(_2(_3f,v)>=0){
vv.push(v);
}
});
t.combobox("setValues",vv);
if(!_40.multiple){
t.combobox("hidePanel");
}
};
function _44(_45){
var _46=$.data(_45,"combobox");
var _47=_46.options;
_1++;
_46.itemIdPrefix="_easyui_combobox_i"+_1;
_46.groupIdPrefix="_easyui_combobox_g"+_1;
$(_45).addClass("combobox-f");
$(_45).combo($.extend({},_47,{onShowPanel:function(){
$(_45).combo("panel").find("div.combobox-item:hidden,div.combobox-group:hidden").show();
_8(_45,$(_45).combobox("getValue"));
_47.onShowPanel.call(_45);
}}));
$(_45).combo("panel").unbind().bind("mouseover",function(e){
$(this).children("div.combobox-item-hover").removeClass("combobox-item-hover");
var _48=$(e.target).closest("div.combobox-item");
if(!_48.hasClass("combobox-item-disabled")){
_48.addClass("combobox-item-hover");
}
e.stopPropagation();
}).bind("mouseout",function(e){
$(e.target).closest("div.combobox-item").removeClass("combobox-item-hover");
e.stopPropagation();
}).bind("click",function(e){
var _49=$(e.target).closest("div.combobox-item");
if(!_49.length||_49.hasClass("combobox-item-disabled")){
return;
}
var row=_47.finder.getRow(_45,_49);
if(!row){
return;
}
var _4a=row[_47.valueField];
if(_47.multiple){
if(_49.hasClass("combobox-item-selected")){
_1b(_45,_4a);
}else{
_15(_45,_4a);
}
}else{
_15(_45,_4a);
$(_45).combo("hidePanel");
}
e.stopPropagation();
});
};
$.fn.combobox=function(_4b,_4c){
if(typeof _4b=="string"){
var _4d=$.fn.combobox.methods[_4b];
if(_4d){
return _4d(this,_4c);
}else{
return this.combo(_4b,_4c);
}
}
_4b=_4b||{};
return this.each(function(){
var _4e=$.data(this,"combobox");
if(_4e){
$.extend(_4e.options,_4b);
}else{
_4e=$.data(this,"combobox",{options:$.extend({},$.fn.combobox.defaults,$.fn.combobox.parseOptions(this),_4b),data:[]});
}
_44(this);
if(_4e.options.data){
_26(this,_4e.options.data);
}else{
var _4f=$.fn.combobox.parseData(this);
if(_4f.length){
_26(this,_4f);
}
}
_2e(this);
});
};
$.fn.combobox.methods={options:function(jq){
var _50=jq.combo("options");
return $.extend($.data(jq[0],"combobox").options,{width:_50.width,height:_50.height,originalValue:_50.originalValue,disabled:_50.disabled,readonly:_50.readonly});
},getData:function(jq){
return $.data(jq[0],"combobox").data;
},setValues:function(jq,_51){
return jq.each(function(){
_1a(this,_51);
});
},setValue:function(jq,_52){
return jq.each(function(){
_1a(this,[_52]);
});
},clear:function(jq){
return jq.each(function(){
$(this).combo("clear");
var _53=$(this).combo("panel");
_53.find("div.combobox-item-selected").removeClass("combobox-item-selected");
});
},reset:function(jq){
return jq.each(function(){
var _54=$(this).combobox("options");
if(_54.multiple){
$(this).combobox("setValues",_54.originalValue);
}else{
$(this).combobox("setValue",_54.originalValue);
}
});
},loadData:function(jq,_55){
return jq.each(function(){
_26(this,_55);
});
},reload:function(jq,url){
return jq.each(function(){
if(typeof url=="string"){
_2e(this,url);
}else{
if(url){
var _56=$(this).combobox("options");
_56.queryParams=url;
}
_2e(this);
}
});
},select:function(jq,_57){
return jq.each(function(){
_15(this,_57);
});
},unselect:function(jq,_58){
return jq.each(function(){
_1b(this,_58);
});
}};
$.fn.combobox.parseOptions=function(_59){
var t=$(_59);
return $.extend({},$.fn.combo.parseOptions(_59),$.parser.parseOptions(_59,["valueField","textField","groupField","mode","method","url"]));
};
$.fn.combobox.parseData=function(_5a){
var _5b=[];
var _5c=$(_5a).combobox("options");
$(_5a).children().each(function(){
if(this.tagName.toLowerCase()=="optgroup"){
var _5d=$(this).attr("label");
$(this).children().each(function(){
_5e(this,_5d);
});
}else{
_5e(this);
}
});
return _5b;
function _5e(el,_5f){
var t=$(el);
var row={};
row[_5c.valueField]=t.attr("value")!=undefined?t.attr("value"):t.text();
row[_5c.textField]=t.text();
row["selected"]=t.is(":selected");
row["disabled"]=t.is(":disabled");
if(_5f){
_5c.groupField=_5c.groupField||"group";
row[_5c.groupField]=_5f;
}
_5b.push(row);
};
};
$.fn.combobox.defaults=$.extend({},$.fn.combo.defaults,{valueField:"value",textField:"text",groupField:null,groupFormatter:function(_60){
return _60;
},mode:"local",method:"post",url:null,data:null,queryParams:{},keyHandler:{up:function(e){
_e(this,"prev");
e.preventDefault();
},down:function(e){
_e(this,"next");
e.preventDefault();
},left:function(e){
},right:function(e){
},enter:function(e){
_3e(this);
},query:function(q,e){
_34(this,q);
}},filter:function(q,row){
var _61=$(this).combobox("options");
return row[_61.textField].toLowerCase().indexOf(q.toLowerCase())==0;
},formatter:function(row){
var _62=$(this).combobox("options");
return row[_62.textField];
},loader:function(_63,_64,_65){
var _66=$(this).combobox("options");
if(!_66.url){
return false;
}
$.ajax({type:_66.method,url:_66.url,data:_63,dataType:"json",success:function(_67){
_64(_67);
},error:function(){
_65.apply(this,arguments);
}});
},loadFilter:function(_68){
return _68;
},finder:{getEl:function(_69,_6a){
var _6b=_2(_69,_6a);
var id=$.data(_69,"combobox").itemIdPrefix+"_"+_6b;
return $("#"+id);
},getRow:function(_6c,p){
var _6d=$.data(_6c,"combobox");
var _6e=(p instanceof jQuery)?p.attr("id").substr(_6d.itemIdPrefix.length+1):_2(_6c,p);
return _6d.data[parseInt(_6e)];
}},onBeforeLoad:function(_6f){
},onLoadSuccess:function(){
},onLoadError:function(){
},onSelect:function(_70){
},onUnselect:function(_71){
}});
})(jQuery);


/**
 * jQuery EasyUI 1.4.3
 * 
 * Copyright (c) 2009-2015 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL license: http://www.gnu.org/licenses/gpl.txt
 * To use it on other terms please contact us at info@jeasyui.com
 *
 */
(function($){
function _1(e){
var _2=$.data(e.data.target,"draggable");
var _3=_2.options;
var _4=_2.proxy;
var _5=e.data;
var _6=_5.startLeft+e.pageX-_5.startX;
var _7=_5.startTop+e.pageY-_5.startY;
if(_4){
if(_4.parent()[0]==document.body){
if(_3.deltaX!=null&&_3.deltaX!=undefined){
_6=e.pageX+_3.deltaX;
}else{
_6=e.pageX-e.data.offsetWidth;
}
if(_3.deltaY!=null&&_3.deltaY!=undefined){
_7=e.pageY+_3.deltaY;
}else{
_7=e.pageY-e.data.offsetHeight;
}
}else{
if(_3.deltaX!=null&&_3.deltaX!=undefined){
_6+=e.data.offsetWidth+_3.deltaX;
}
if(_3.deltaY!=null&&_3.deltaY!=undefined){
_7+=e.data.offsetHeight+_3.deltaY;
}
}
}
if(e.data.parent!=document.body){
_6+=$(e.data.parent).scrollLeft();
_7+=$(e.data.parent).scrollTop();
}
if(_3.axis=="h"){
_5.left=_6;
}else{
if(_3.axis=="v"){
_5.top=_7;
}else{
_5.left=_6;
_5.top=_7;
}
}
};
function _8(e){
var _9=$.data(e.data.target,"draggable");
var _a=_9.options;
var _b=_9.proxy;
if(!_b){
_b=$(e.data.target);
}
_b.css({left:e.data.left,top:e.data.top});
$("body").css("cursor",_a.cursor);
};
function _c(e){
if(!$.fn.draggable.isDragging){
return false;
}
var _d=$.data(e.data.target,"draggable");
var _e=_d.options;
var _f=$(".droppable").filter(function(){
return e.data.target!=this;
}).filter(function(){
var _10=$.data(this,"droppable").options.accept;
if(_10){
return $(_10).filter(function(){
return this==e.data.target;
}).length>0;
}else{
return true;
}
});
_d.droppables=_f;
var _11=_d.proxy;
if(!_11){
if(_e.proxy){
if(_e.proxy=="clone"){
_11=$(e.data.target).clone().insertAfter(e.data.target);
}else{
_11=_e.proxy.call(e.data.target,e.data.target);
}
_d.proxy=_11;
}else{
_11=$(e.data.target);
}
}
_11.css("position","absolute");
_1(e);
_8(e);
_e.onStartDrag.call(e.data.target,e);
return false;
};
function _12(e){
if(!$.fn.draggable.isDragging){
return false;
}
var _13=$.data(e.data.target,"draggable");
_1(e);
if(_13.options.onDrag.call(e.data.target,e)!=false){
_8(e);
}
var _14=e.data.target;
_13.droppables.each(function(){
var _15=$(this);
if(_15.droppable("options").disabled){
return;
}
var p2=_15.offset();
if(e.pageX>p2.left&&e.pageX<p2.left+_15.outerWidth()&&e.pageY>p2.top&&e.pageY<p2.top+_15.outerHeight()){
if(!this.entered){
$(this).trigger("_dragenter",[_14]);
this.entered=true;
}
$(this).trigger("_dragover",[_14]);
}else{
if(this.entered){
$(this).trigger("_dragleave",[_14]);
this.entered=false;
}
}
});
return false;
};
function _16(e){
if(!$.fn.draggable.isDragging){
_17();
return false;
}
_12(e);
var _18=$.data(e.data.target,"draggable");
var _19=_18.proxy;
var _1a=_18.options;
if(_1a.revert){
if(_1b()==true){
$(e.data.target).css({position:e.data.startPosition,left:e.data.startLeft,top:e.data.startTop});
}else{
if(_19){
var _1c,top;
if(_19.parent()[0]==document.body){
_1c=e.data.startX-e.data.offsetWidth;
top=e.data.startY-e.data.offsetHeight;
}else{
_1c=e.data.startLeft;
top=e.data.startTop;
}
_19.animate({left:_1c,top:top},function(){
_1d();
});
}else{
$(e.data.target).animate({left:e.data.startLeft,top:e.data.startTop},function(){
$(e.data.target).css("position",e.data.startPosition);
});
}
}
}else{
$(e.data.target).css({position:"absolute",left:e.data.left,top:e.data.top});
_1b();
}
_1a.onStopDrag.call(e.data.target,e);
_17();
function _1d(){
if(_19){
_19.remove();
}
_18.proxy=null;
};
function _1b(){
var _1e=false;
_18.droppables.each(function(){
var _1f=$(this);
if(_1f.droppable("options").disabled){
return;
}
var p2=_1f.offset();
if(e.pageX>p2.left&&e.pageX<p2.left+_1f.outerWidth()&&e.pageY>p2.top&&e.pageY<p2.top+_1f.outerHeight()){
if(_1a.revert){
$(e.data.target).css({position:e.data.startPosition,left:e.data.startLeft,top:e.data.startTop});
}
$(this).trigger("_drop",[e.data.target]);
_1d();
_1e=true;
this.entered=false;
return false;
}
});
if(!_1e&&!_1a.revert){
_1d();
}
return _1e;
};
return false;
};
function _17(){
if($.fn.draggable.timer){
clearTimeout($.fn.draggable.timer);
$.fn.draggable.timer=undefined;
}
$(document).unbind(".draggable");
$.fn.draggable.isDragging=false;
setTimeout(function(){
$("body").css("cursor","");
},100);
};
$.fn.draggable=function(_20,_21){
if(typeof _20=="string"){
return $.fn.draggable.methods[_20](this,_21);
}
return this.each(function(){
var _22;
var _23=$.data(this,"draggable");
if(_23){
_23.handle.unbind(".draggable");
_22=$.extend(_23.options,_20);
}else{
_22=$.extend({},$.fn.draggable.defaults,$.fn.draggable.parseOptions(this),_20||{});
}
var _24=_22.handle?(typeof _22.handle=="string"?$(_22.handle,this):_22.handle):$(this);
$.data(this,"draggable",{options:_22,handle:_24});
if(_22.disabled){
$(this).css("cursor","");
return;
}
_24.unbind(".draggable").bind("mousemove.draggable",{target:this},function(e){
if($.fn.draggable.isDragging){
return;
}
var _25=$.data(e.data.target,"draggable").options;
if(_26(e)){
$(this).css("cursor",_25.cursor);
}else{
$(this).css("cursor","");
}
}).bind("mouseleave.draggable",{target:this},function(e){
$(this).css("cursor","");
}).bind("mousedown.draggable",{target:this},function(e){
if(_26(e)==false){
return;
}
$(this).css("cursor","");
var _27=$(e.data.target).position();
var _28=$(e.data.target).offset();
var _29={startPosition:$(e.data.target).css("position"),startLeft:_27.left,startTop:_27.top,left:_27.left,top:_27.top,startX:e.pageX,startY:e.pageY,offsetWidth:(e.pageX-_28.left),offsetHeight:(e.pageY-_28.top),target:e.data.target,parent:$(e.data.target).parent()[0]};
$.extend(e.data,_29);
var _2a=$.data(e.data.target,"draggable").options;
if(_2a.onBeforeDrag.call(e.data.target,e)==false){
return;
}
$(document).bind("mousedown.draggable",e.data,_c);
$(document).bind("mousemove.draggable",e.data,_12);
$(document).bind("mouseup.draggable",e.data,_16);
$.fn.draggable.timer=setTimeout(function(){
$.fn.draggable.isDragging=true;
_c(e);
},_2a.delay);
return false;
});
function _26(e){
var _2b=$.data(e.data.target,"draggable");
var _2c=_2b.handle;
var _2d=$(_2c).offset();
var _2e=$(_2c).outerWidth();
var _2f=$(_2c).outerHeight();
var t=e.pageY-_2d.top;
var r=_2d.left+_2e-e.pageX;
var b=_2d.top+_2f-e.pageY;
var l=e.pageX-_2d.left;
return Math.min(t,r,b,l)>_2b.options.edge;
};
});
};
$.fn.draggable.methods={options:function(jq){
return $.data(jq[0],"draggable").options;
},proxy:function(jq){
return $.data(jq[0],"draggable").proxy;
},enable:function(jq){
return jq.each(function(){
$(this).draggable({disabled:false});
});
},disable:function(jq){
return jq.each(function(){
$(this).draggable({disabled:true});
});
}};
$.fn.draggable.parseOptions=function(_30){
var t=$(_30);
return $.extend({},$.parser.parseOptions(_30,["cursor","handle","axis",{"revert":"boolean","deltaX":"number","deltaY":"number","edge":"number","delay":"number"}]),{disabled:(t.attr("disabled")?true:undefined)});
};
$.fn.draggable.defaults={proxy:null,revert:false,cursor:"move",deltaX:null,deltaY:null,handle:null,disabled:false,edge:0,axis:null,delay:100,onBeforeDrag:function(e){
},onStartDrag:function(e){
},onDrag:function(e){
},onStopDrag:function(e){
}};
$.fn.draggable.isDragging=false;
})(jQuery);


/**
 * jQuery EasyUI 1.4.3
 * 
 * Copyright (c) 2009-2015 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL license: http://www.gnu.org/licenses/gpl.txt
 * To use it on other terms please contact us at info@jeasyui.com
 *
 */
(function($){
function _1(_2){
$(_2).addClass("droppable");
$(_2).bind("_dragenter",function(e,_3){
$.data(_2,"droppable").options.onDragEnter.apply(_2,[e,_3]);
});
$(_2).bind("_dragleave",function(e,_4){
$.data(_2,"droppable").options.onDragLeave.apply(_2,[e,_4]);
});
$(_2).bind("_dragover",function(e,_5){
$.data(_2,"droppable").options.onDragOver.apply(_2,[e,_5]);
});
$(_2).bind("_drop",function(e,_6){
$.data(_2,"droppable").options.onDrop.apply(_2,[e,_6]);
});
};
$.fn.droppable=function(_7,_8){
if(typeof _7=="string"){
return $.fn.droppable.methods[_7](this,_8);
}
_7=_7||{};
return this.each(function(){
var _9=$.data(this,"droppable");
if(_9){
$.extend(_9.options,_7);
}else{
_1(this);
$.data(this,"droppable",{options:$.extend({},$.fn.droppable.defaults,$.fn.droppable.parseOptions(this),_7)});
}
});
};
$.fn.droppable.methods={options:function(jq){
return $.data(jq[0],"droppable").options;
},enable:function(jq){
return jq.each(function(){
$(this).droppable({disabled:false});
});
},disable:function(jq){
return jq.each(function(){
$(this).droppable({disabled:true});
});
}};
$.fn.droppable.parseOptions=function(_a){
var t=$(_a);
return $.extend({},$.parser.parseOptions(_a,["accept"]),{disabled:(t.attr("disabled")?true:undefined)});
};
$.fn.droppable.defaults={accept:null,disabled:false,onDragEnter:function(e,_b){
},onDragOver:function(e,_c){
},onDragLeave:function(e,_d){
},onDrop:function(e,_e){
}};
})(jQuery);


/**
 * jQuery EasyUI 1.4.3
 * 
 * Copyright (c) 2009-2015 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL license: http://www.gnu.org/licenses/gpl.txt
 * To use it on other terms please contact us at info@jeasyui.com
 *
 */
(function($){
function _1(_2){
var _3=$(_2);
_3.addClass("tree");
return _3;
};
function _4(_5){
var _6=$.data(_5,"tree").options;
$(_5).unbind().bind("mouseover",function(e){
var tt=$(e.target);
var _7=tt.closest("div.tree-node");
if(!_7.length){
return;
}
_7.addClass("tree-node-hover");
if(tt.hasClass("tree-hit")){
if(tt.hasClass("tree-expanded")){
tt.addClass("tree-expanded-hover");
}else{
tt.addClass("tree-collapsed-hover");
}
}
e.stopPropagation();
}).bind("mouseout",function(e){
var tt=$(e.target);
var _8=tt.closest("div.tree-node");
if(!_8.length){
return;
}
_8.removeClass("tree-node-hover");
if(tt.hasClass("tree-hit")){
if(tt.hasClass("tree-expanded")){
tt.removeClass("tree-expanded-hover");
}else{
tt.removeClass("tree-collapsed-hover");
}
}
e.stopPropagation();
}).bind("click",function(e){
var tt=$(e.target);
var _9=tt.closest("div.tree-node");
if(!_9.length){
return;
}
if(tt.hasClass("tree-hit")){
_8f(_5,_9[0]);
return false;
}else{
if(tt.hasClass("tree-checkbox")){
_34(_5,_9[0]);
return false;
}else{
_e9(_5,_9[0]);
_6.onClick.call(_5,_c(_5,_9[0]));
}
}
e.stopPropagation();
}).bind("dblclick",function(e){
var _a=$(e.target).closest("div.tree-node");
if(!_a.length){
return;
}
_e9(_5,_a[0]);
_6.onDblClick.call(_5,_c(_5,_a[0]));
e.stopPropagation();
}).bind("contextmenu",function(e){
var _b=$(e.target).closest("div.tree-node");
if(!_b.length){
return;
}
_6.onContextMenu.call(_5,e,_c(_5,_b[0]));
e.stopPropagation();
});
};
function _d(_e){
var _f=$.data(_e,"tree").options;
_f.dnd=false;
var _10=$(_e).find("div.tree-node");
_10.draggable("disable");
_10.css("cursor","pointer");
};
function _11(_12){
var _13=$.data(_12,"tree");
var _14=_13.options;
var _15=_13.tree;
_13.disabledNodes=[];
_14.dnd=true;
_15.find("div.tree-node").draggable({disabled:false,revert:true,cursor:"pointer",proxy:function(_16){
var p=$("<div class=\"tree-node-proxy\"></div>").appendTo("body");
p.html("<span class=\"tree-dnd-icon tree-dnd-no\">&nbsp;</span>"+$(_16).find(".tree-title").html());
p.hide();
return p;
},deltaX:15,deltaY:15,onBeforeDrag:function(e){
if(_14.onBeforeDrag.call(_12,_c(_12,this))==false){
return false;
}
if($(e.target).hasClass("tree-hit")||$(e.target).hasClass("tree-checkbox")){
return false;
}
if(e.which!=1){
return false;
}
var _17=$(this).find("span.tree-indent");
if(_17.length){
e.data.offsetWidth-=_17.length*_17.width();
}
},onStartDrag:function(e){
$(this).next("ul").find("div.tree-node").each(function(){
$(this).droppable("disable");
_13.disabledNodes.push(this);
});
$(this).draggable("proxy").css({left:-10000,top:-10000});
_14.onStartDrag.call(_12,_c(_12,this));
var _18=_c(_12,this);
if(_18.id==undefined){
_18.id="easyui_tree_node_id_temp";
_64(_12,_18);
}
_13.draggingNodeId=_18.id;
},onDrag:function(e){
var x1=e.pageX,y1=e.pageY,x2=e.data.startX,y2=e.data.startY;
var d=Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
if(d>3){
$(this).draggable("proxy").show();
}
this.pageY=e.pageY;
},onStopDrag:function(){
for(var i=0;i<_13.disabledNodes.length;i++){
$(_13.disabledNodes[i]).droppable("enable");
}
_13.disabledNodes=[];
var _19=_dc(_12,_13.draggingNodeId);
if(_19&&_19.id=="easyui_tree_node_id_temp"){
_19.id="";
_64(_12,_19);
}
_14.onStopDrag.call(_12,_19);
}}).droppable({accept:"div.tree-node",onDragEnter:function(e,_1a){
if(_14.onDragEnter.call(_12,this,_1b(_1a))==false){
_1c(_1a,false);
$(this).removeClass("tree-node-append tree-node-top tree-node-bottom");
$(this).droppable("disable");
_13.disabledNodes.push(this);
}
},onDragOver:function(e,_1d){
if($(this).droppable("options").disabled){
return;
}
var _1e=_1d.pageY;
var top=$(this).offset().top;
var _1f=top+$(this).outerHeight();
_1c(_1d,true);
$(this).removeClass("tree-node-append tree-node-top tree-node-bottom");
if(_1e>top+(_1f-top)/2){
if(_1f-_1e<5){
$(this).addClass("tree-node-bottom");
}else{
$(this).addClass("tree-node-append");
}
}else{
if(_1e-top<5){
$(this).addClass("tree-node-top");
}else{
$(this).addClass("tree-node-append");
}
}
if(_14.onDragOver.call(_12,this,_1b(_1d))==false){
_1c(_1d,false);
$(this).removeClass("tree-node-append tree-node-top tree-node-bottom");
$(this).droppable("disable");
_13.disabledNodes.push(this);
}
},onDragLeave:function(e,_20){
_1c(_20,false);
$(this).removeClass("tree-node-append tree-node-top tree-node-bottom");
_14.onDragLeave.call(_12,this,_1b(_20));
},onDrop:function(e,_21){
var _22=this;
var _23,_24;
if($(this).hasClass("tree-node-append")){
_23=_25;
_24="append";
}else{
_23=_26;
_24=$(this).hasClass("tree-node-top")?"top":"bottom";
}
if(_14.onBeforeDrop.call(_12,_22,_1b(_21),_24)==false){
$(this).removeClass("tree-node-append tree-node-top tree-node-bottom");
return;
}
_23(_21,_22,_24);
$(this).removeClass("tree-node-append tree-node-top tree-node-bottom");
}});
function _1b(_27,pop){
return $(_27).closest("ul.tree").tree(pop?"pop":"getData",_27);
};
function _1c(_28,_29){
var _2a=$(_28).draggable("proxy").find("span.tree-dnd-icon");
_2a.removeClass("tree-dnd-yes tree-dnd-no").addClass(_29?"tree-dnd-yes":"tree-dnd-no");
};
function _25(_2b,_2c){
if(_c(_12,_2c).state=="closed"){
_83(_12,_2c,function(){
_2d();
});
}else{
_2d();
}
function _2d(){
var _2e=_1b(_2b,true);
$(_12).tree("append",{parent:_2c,data:[_2e]});
_14.onDrop.call(_12,_2c,_2e,"append");
};
};
function _26(_2f,_30,_31){
var _32={};
if(_31=="top"){
_32.before=_30;
}else{
_32.after=_30;
}
var _33=_1b(_2f,true);
_32.data=_33;
$(_12).tree("insert",_32);
_14.onDrop.call(_12,_30,_33,_31);
};
};
function _34(_35,_36,_37){
var _38=$.data(_35,"tree");
var _39=_38.options;
if(!_39.checkbox){
return;
}
var _3a=_c(_35,_36);
if(_37==undefined){
var ck=$(_36).find(".tree-checkbox");
if(ck.hasClass("tree-checkbox1")){
_37=false;
}else{
if(ck.hasClass("tree-checkbox0")){
_37=true;
}else{
if(_3a._checked==undefined){
_3a._checked=$(_36).find(".tree-checkbox").hasClass("tree-checkbox1");
}
_37=!_3a._checked;
}
}
}
_3a._checked=_37;
if(_39.onBeforeCheck.call(_35,_3a,_37)==false){
return;
}
if(_39.cascadeCheck){
_3b(_3a,_37);
_3c(_3a,_37);
}else{
_3d($(_3a.target),_37?"1":"0");
}
_39.onCheck.call(_35,_3a,_37);
function _3d(_3e,_3f){
var ck=_3e.find(".tree-checkbox");
ck.removeClass("tree-checkbox0 tree-checkbox1 tree-checkbox2");
ck.addClass("tree-checkbox"+_3f);
};
function _3b(_40,_41){
if(_39.deepCheck){
var _42=$("#"+_40.domId);
var _43=_41?"1":"0";
_3d(_42,_43);
_3d(_42.next(),_43);
}else{
_44(_40,_41);
_68(_40.children||[],function(n){
_44(n,_41);
});
}
};
function _44(_45,_46){
if(_45.hidden){
return;
}
var cls="tree-checkbox"+(_46?"1":"0");
var _47=$("#"+_45.domId);
_3d(_47,_46?"1":"0");
if(_45.children){
for(var i=0;i<_45.children.length;i++){
if(_45.children[i].hidden){
if(!$("#"+_45.children[i].domId).find("."+cls).length){
_3d(_47,"2");
var _48=_9a(_35,_47[0]);
while(_48){
_3d($(_48.target),"2");
_48=_9a(_35,_48[0]);
}
return;
}
}
}
}
};
function _3c(_49,_4a){
var _4b=$("#"+_49.domId);
var _4c=_9a(_35,_4b[0]);
if(_4c){
var _4d="";
if(_4e(_4b,true)){
_4d="1";
}else{
if(_4e(_4b,false)){
_4d="0";
}else{
_4d="2";
}
}
_3d($(_4c.target),_4d);
_3c(_4c,_4a);
}
};
function _4e(_4f,_50){
var cls="tree-checkbox"+(_50?"1":"0");
var ck=_4f.find(".tree-checkbox");
if(!ck.hasClass(cls)){
return false;
}
var b=true;
_4f.parent().siblings().each(function(){
var ck=$(this).children("div.tree-node").children(".tree-checkbox");
if(ck.length&&!ck.hasClass(cls)){
b=false;
return false;
}
});
return b;
};
};
function _51(_52,_53){
var _54=$.data(_52,"tree").options;
if(!_54.checkbox){
return;
}
var _55=$(_53);
if(_56(_52,_53)){
var ck=_55.find(".tree-checkbox");
if(ck.length){
if(ck.hasClass("tree-checkbox1")){
_34(_52,_53,true);
}else{
_34(_52,_53,false);
}
}else{
if(_54.onlyLeafCheck){
$("<span class=\"tree-checkbox tree-checkbox0\"></span>").insertBefore(_55.find(".tree-title"));
}
}
}else{
var ck=_55.find(".tree-checkbox");
if(_54.onlyLeafCheck){
ck.remove();
}else{
if(ck.hasClass("tree-checkbox1")){
_34(_52,_53,true);
}else{
if(ck.hasClass("tree-checkbox2")){
var _57=true;
var _58=true;
var _59=_5a(_52,_53);
for(var i=0;i<_59.length;i++){
if(_59[i].checked){
_58=false;
}else{
_57=false;
}
}
if(_57){
_34(_52,_53,true);
}
if(_58){
_34(_52,_53,false);
}
}
}
}
}
};
function _5b(_5c,ul,_5d,_5e){
var _5f=$.data(_5c,"tree");
var _60=_5f.options;
var _61=$(ul).prevAll("div.tree-node:first");
_5d=_60.loadFilter.call(_5c,_5d,_61[0]);
var _62=_63(_5c,"domId",_61.attr("id"));
if(!_5e){
_62?_62.children=_5d:_5f.data=_5d;
$(ul).empty();
}else{
if(_62){
_62.children?_62.children=_62.children.concat(_5d):_62.children=_5d;
}else{
_5f.data=_5f.data.concat(_5d);
}
}
_60.view.render.call(_60.view,_5c,ul,_5d);
if(_60.dnd){
_11(_5c);
}
if(_62){
_64(_5c,_62);
}
var _65=[];
var _66=[];
for(var i=0;i<_5d.length;i++){
var _67=_5d[i];
if(!_67.checked){
_65.push(_67);
}
}
_68(_5d,function(_69){
if(_69.checked){
_66.push(_69);
}
});
var _6a=_60.onCheck;
_60.onCheck=function(){
};
if(_65.length){
_34(_5c,$("#"+_65[0].domId)[0],false);
}
for(var i=0;i<_66.length;i++){
_34(_5c,$("#"+_66[i].domId)[0],true);
}
_60.onCheck=_6a;
setTimeout(function(){
_6b(_5c,_5c);
},0);
_60.onLoadSuccess.call(_5c,_62,_5d);
};
function _6b(_6c,ul,_6d){
var _6e=$.data(_6c,"tree").options;
if(_6e.lines){
$(_6c).addClass("tree-lines");
}else{
$(_6c).removeClass("tree-lines");
return;
}
if(!_6d){
_6d=true;
$(_6c).find("span.tree-indent").removeClass("tree-line tree-join tree-joinbottom");
$(_6c).find("div.tree-node").removeClass("tree-node-last tree-root-first tree-root-one");
var _6f=$(_6c).tree("getRoots");
if(_6f.length>1){
$(_6f[0].target).addClass("tree-root-first");
}else{
if(_6f.length==1){
$(_6f[0].target).addClass("tree-root-one");
}
}
}
$(ul).children("li").each(function(){
var _70=$(this).children("div.tree-node");
var ul=_70.next("ul");
if(ul.length){
if($(this).next().length){
_71(_70);
}
_6b(_6c,ul,_6d);
}else{
_72(_70);
}
});
var _73=$(ul).children("li:last").children("div.tree-node").addClass("tree-node-last");
_73.children("span.tree-join").removeClass("tree-join").addClass("tree-joinbottom");
function _72(_74,_75){
var _76=_74.find("span.tree-icon");
_76.prev("span.tree-indent").addClass("tree-join");
};
function _71(_77){
var _78=_77.find("span.tree-indent, span.tree-hit").length;
_77.next().find("div.tree-node").each(function(){
$(this).children("span:eq("+(_78-1)+")").addClass("tree-line");
});
};
};
function _79(_7a,ul,_7b,_7c){
var _7d=$.data(_7a,"tree").options;
_7b=$.extend({},_7d.queryParams,_7b||{});
var _7e=null;
if(_7a!=ul){
var _7f=$(ul).prev();
_7e=_c(_7a,_7f[0]);
}
if(_7d.onBeforeLoad.call(_7a,_7e,_7b)==false){
return;
}
var _80=$(ul).prev().children("span.tree-folder");
_80.addClass("tree-loading");
var _81=_7d.loader.call(_7a,_7b,function(_82){
_80.removeClass("tree-loading");
_5b(_7a,ul,_82);
if(_7c){
_7c();
}
},function(){
_80.removeClass("tree-loading");
_7d.onLoadError.apply(_7a,arguments);
if(_7c){
_7c();
}
});
if(_81==false){
_80.removeClass("tree-loading");
}
};
function _83(_84,_85,_86){
var _87=$.data(_84,"tree").options;
var hit=$(_85).children("span.tree-hit");
if(hit.length==0){
return;
}
if(hit.hasClass("tree-expanded")){
return;
}
var _88=_c(_84,_85);
if(_87.onBeforeExpand.call(_84,_88)==false){
return;
}
hit.removeClass("tree-collapsed tree-collapsed-hover").addClass("tree-expanded");
hit.next().addClass("tree-folder-open");
var ul=$(_85).next();
if(ul.length){
if(_87.animate){
ul.slideDown("normal",function(){
_88.state="open";
_87.onExpand.call(_84,_88);
if(_86){
_86();
}
});
}else{
ul.css("display","block");
_88.state="open";
_87.onExpand.call(_84,_88);
if(_86){
_86();
}
}
}else{
var _89=$("<ul style=\"display:none\"></ul>").insertAfter(_85);
_79(_84,_89[0],{id:_88.id},function(){
if(_89.is(":empty")){
_89.remove();
}
if(_87.animate){
_89.slideDown("normal",function(){
_88.state="open";
_87.onExpand.call(_84,_88);
if(_86){
_86();
}
});
}else{
_89.css("display","block");
_88.state="open";
_87.onExpand.call(_84,_88);
if(_86){
_86();
}
}
});
}
};
function _8a(_8b,_8c){
var _8d=$.data(_8b,"tree").options;
var hit=$(_8c).children("span.tree-hit");
if(hit.length==0){
return;
}
if(hit.hasClass("tree-collapsed")){
return;
}
var _8e=_c(_8b,_8c);
if(_8d.onBeforeCollapse.call(_8b,_8e)==false){
return;
}
hit.removeClass("tree-expanded tree-expanded-hover").addClass("tree-collapsed");
hit.next().removeClass("tree-folder-open");
var ul=$(_8c).next();
if(_8d.animate){
ul.slideUp("normal",function(){
_8e.state="closed";
_8d.onCollapse.call(_8b,_8e);
});
}else{
ul.css("display","none");
_8e.state="closed";
_8d.onCollapse.call(_8b,_8e);
}
};
function _8f(_90,_91){
var hit=$(_91).children("span.tree-hit");
if(hit.length==0){
return;
}
if(hit.hasClass("tree-expanded")){
_8a(_90,_91);
}else{
_83(_90,_91);
}
};
function _92(_93,_94){
var _95=_5a(_93,_94);
if(_94){
_95.unshift(_c(_93,_94));
}
for(var i=0;i<_95.length;i++){
_83(_93,_95[i].target);
}
};
function _96(_97,_98){
var _99=[];
var p=_9a(_97,_98);
while(p){
_99.unshift(p);
p=_9a(_97,p.target);
}
for(var i=0;i<_99.length;i++){
_83(_97,_99[i].target);
}
};
function _9b(_9c,_9d){
var c=$(_9c).parent();
while(c[0].tagName!="BODY"&&c.css("overflow-y")!="auto"){
c=c.parent();
}
var n=$(_9d);
var _9e=n.offset().top;
if(c[0].tagName!="BODY"){
var _9f=c.offset().top;
if(_9e<_9f){
c.scrollTop(c.scrollTop()+_9e-_9f);
}else{
if(_9e+n.outerHeight()>_9f+c.outerHeight()-18){
c.scrollTop(c.scrollTop()+_9e+n.outerHeight()-_9f-c.outerHeight()+18);
}
}
}else{
c.scrollTop(_9e);
}
};
function _a0(_a1,_a2){
var _a3=_5a(_a1,_a2);
if(_a2){
_a3.unshift(_c(_a1,_a2));
}
for(var i=0;i<_a3.length;i++){
_8a(_a1,_a3[i].target);
}
};
function _a4(_a5,_a6){
var _a7=$(_a6.parent);
var _a8=_a6.data;
if(!_a8){
return;
}
_a8=$.isArray(_a8)?_a8:[_a8];
if(!_a8.length){
return;
}
var ul;
if(_a7.length==0){
ul=$(_a5);
}else{
if(_56(_a5,_a7[0])){
var _a9=_a7.find("span.tree-icon");
_a9.removeClass("tree-file").addClass("tree-folder tree-folder-open");
var hit=$("<span class=\"tree-hit tree-expanded\"></span>").insertBefore(_a9);
if(hit.prev().length){
hit.prev().remove();
}
}
ul=_a7.next();
if(!ul.length){
ul=$("<ul></ul>").insertAfter(_a7);
}
}
_5b(_a5,ul[0],_a8,true);
_51(_a5,ul.prev());
};
function _aa(_ab,_ac){
var ref=_ac.before||_ac.after;
var _ad=_9a(_ab,ref);
var _ae=_ac.data;
if(!_ae){
return;
}
_ae=$.isArray(_ae)?_ae:[_ae];
if(!_ae.length){
return;
}
_a4(_ab,{parent:(_ad?_ad.target:null),data:_ae});
var _af=_ad?_ad.children:$(_ab).tree("getRoots");
for(var i=0;i<_af.length;i++){
if(_af[i].domId==$(ref).attr("id")){
for(var j=_ae.length-1;j>=0;j--){
_af.splice((_ac.before?i:(i+1)),0,_ae[j]);
}
_af.splice(_af.length-_ae.length,_ae.length);
break;
}
}
var li=$();
for(var i=0;i<_ae.length;i++){
li=li.add($("#"+_ae[i].domId).parent());
}
if(_ac.before){
li.insertBefore($(ref).parent());
}else{
li.insertAfter($(ref).parent());
}
};
function _b0(_b1,_b2){
var _b3=del(_b2);
$(_b2).parent().remove();
if(_b3){
if(!_b3.children||!_b3.children.length){
var _b4=$(_b3.target);
_b4.find(".tree-icon").removeClass("tree-folder").addClass("tree-file");
_b4.find(".tree-hit").remove();
$("<span class=\"tree-indent\"></span>").prependTo(_b4);
_b4.next().remove();
}
_64(_b1,_b3);
_51(_b1,_b3.target);
}
_6b(_b1,_b1);
function del(_b5){
var id=$(_b5).attr("id");
var _b6=_9a(_b1,_b5);
var cc=_b6?_b6.children:$.data(_b1,"tree").data;
for(var i=0;i<cc.length;i++){
if(cc[i].domId==id){
cc.splice(i,1);
break;
}
}
return _b6;
};
};
function _64(_b7,_b8){
var _b9=$.data(_b7,"tree").options;
var _ba=$(_b8.target);
var _bb=_c(_b7,_b8.target);
var _bc=_bb.checked;
if(_bb.iconCls){
_ba.find(".tree-icon").removeClass(_bb.iconCls);
}
$.extend(_bb,_b8);
_ba.find(".tree-title").html(_b9.formatter.call(_b7,_bb));
if(_bb.iconCls){
_ba.find(".tree-icon").addClass(_bb.iconCls);
}
if(_bc!=_bb.checked){
_34(_b7,_b8.target,_bb.checked);
}
};
function _bd(_be,_bf){
if(_bf){
var p=_9a(_be,_bf);
while(p){
_bf=p.target;
p=_9a(_be,_bf);
}
return _c(_be,_bf);
}else{
var _c0=_c1(_be);
return _c0.length?_c0[0]:null;
}
};
function _c1(_c2){
var _c3=$.data(_c2,"tree").data;
for(var i=0;i<_c3.length;i++){
_c4(_c3[i]);
}
return _c3;
};
function _5a(_c5,_c6){
var _c7=[];
var n=_c(_c5,_c6);
var _c8=n?(n.children||[]):$.data(_c5,"tree").data;
_68(_c8,function(_c9){
_c7.push(_c4(_c9));
});
return _c7;
};
function _9a(_ca,_cb){
var p=$(_cb).closest("ul").prevAll("div.tree-node:first");
return _c(_ca,p[0]);
};
function _cc(_cd,_ce){
_ce=_ce||"checked";
if(!$.isArray(_ce)){
_ce=[_ce];
}
var _cf=[];
for(var i=0;i<_ce.length;i++){
var s=_ce[i];
if(s=="checked"){
_cf.push("span.tree-checkbox1");
}else{
if(s=="unchecked"){
_cf.push("span.tree-checkbox0");
}else{
if(s=="indeterminate"){
_cf.push("span.tree-checkbox2");
}
}
}
}
var _d0=[];
$(_cd).find(_cf.join(",")).each(function(){
var _d1=$(this).parent();
_d0.push(_c(_cd,_d1[0]));
});
return _d0;
};
function _d2(_d3){
var _d4=$(_d3).find("div.tree-node-selected");
return _d4.length?_c(_d3,_d4[0]):null;
};
function _d5(_d6,_d7){
var _d8=_c(_d6,_d7);
if(_d8&&_d8.children){
_68(_d8.children,function(_d9){
_c4(_d9);
});
}
return _d8;
};
function _c(_da,_db){
return _63(_da,"domId",$(_db).attr("id"));
};
function _dc(_dd,id){
return _63(_dd,"id",id);
};
function _63(_de,_df,_e0){
var _e1=$.data(_de,"tree").data;
var _e2=null;
_68(_e1,function(_e3){
if(_e3[_df]==_e0){
_e2=_c4(_e3);
return false;
}
});
return _e2;
};
function _c4(_e4){
var d=$("#"+_e4.domId);
_e4.target=d[0];
_e4.checked=d.find(".tree-checkbox").hasClass("tree-checkbox1");
return _e4;
};
function _68(_e5,_e6){
var _e7=[];
for(var i=0;i<_e5.length;i++){
_e7.push(_e5[i]);
}
while(_e7.length){
var _e8=_e7.shift();
if(_e6(_e8)==false){
return;
}
if(_e8.children){
for(var i=_e8.children.length-1;i>=0;i--){
_e7.unshift(_e8.children[i]);
}
}
}
};
function _e9(_ea,_eb){
var _ec=$.data(_ea,"tree").options;
var _ed=_c(_ea,_eb);
if(_ec.onBeforeSelect.call(_ea,_ed)==false){
return;
}
$(_ea).find("div.tree-node-selected").removeClass("tree-node-selected");
$(_eb).addClass("tree-node-selected");
_ec.onSelect.call(_ea,_ed);
};
function _56(_ee,_ef){
return $(_ef).children("span.tree-hit").length==0;
};
function _f0(_f1,_f2){
var _f3=$.data(_f1,"tree").options;
var _f4=_c(_f1,_f2);
if(_f3.onBeforeEdit.call(_f1,_f4)==false){
return;
}
$(_f2).css("position","relative");
var nt=$(_f2).find(".tree-title");
var _f5=nt.outerWidth();
nt.empty();
var _f6=$("<input class=\"tree-editor\">").appendTo(nt);
_f6.val(_f4.text).focus();
_f6.width(_f5+20);
_f6.height(document.compatMode=="CSS1Compat"?(18-(_f6.outerHeight()-_f6.height())):18);
_f6.bind("click",function(e){
return false;
}).bind("mousedown",function(e){
e.stopPropagation();
}).bind("mousemove",function(e){
e.stopPropagation();
}).bind("keydown",function(e){
if(e.keyCode==13){
_f7(_f1,_f2);
return false;
}else{
if(e.keyCode==27){
_fd(_f1,_f2);
return false;
}
}
}).bind("blur",function(e){
e.stopPropagation();
_f7(_f1,_f2);
});
};
function _f7(_f8,_f9){
var _fa=$.data(_f8,"tree").options;
$(_f9).css("position","");
var _fb=$(_f9).find("input.tree-editor");
var val=_fb.val();
_fb.remove();
var _fc=_c(_f8,_f9);
_fc.text=val;
_64(_f8,_fc);
_fa.onAfterEdit.call(_f8,_fc);
};
function _fd(_fe,_ff){
var opts=$.data(_fe,"tree").options;
$(_ff).css("position","");
$(_ff).find("input.tree-editor").remove();
var node=_c(_fe,_ff);
_64(_fe,node);
opts.onCancelEdit.call(_fe,node);
};
function _100(_101,q){
var _102=$.data(_101,"tree");
var opts=_102.options;
var ids={};
_68(_102.data,function(node){
if(opts.filter.call(_101,q,node)){
$("#"+node.domId).removeClass("tree-node-hidden");
ids[node.domId]=1;
node.hidden=false;
}else{
$("#"+node.domId).addClass("tree-node-hidden");
node.hidden=true;
}
});
for(var id in ids){
_103(id);
}
function _103(_104){
var p=$(_101).tree("getParent",$("#"+_104)[0]);
while(p){
$(p.target).removeClass("tree-node-hidden");
p.hidden=false;
p=$(_101).tree("getParent",p.target);
}
};
};
$.fn.tree=function(_105,_106){
if(typeof _105=="string"){
return $.fn.tree.methods[_105](this,_106);
}
var _105=_105||{};
return this.each(function(){
var _107=$.data(this,"tree");
var opts;
if(_107){
opts=$.extend(_107.options,_105);
_107.options=opts;
}else{
opts=$.extend({},$.fn.tree.defaults,$.fn.tree.parseOptions(this),_105);
$.data(this,"tree",{options:opts,tree:_1(this),data:[]});
var data=$.fn.tree.parseData(this);
if(data.length){
_5b(this,this,data);
}
}
_4(this);
if(opts.data){
_5b(this,this,$.extend(true,[],opts.data));
}
_79(this,this);
});
};
$.fn.tree.methods={options:function(jq){
return $.data(jq[0],"tree").options;
},loadData:function(jq,data){
return jq.each(function(){
_5b(this,this,data);
});
},getNode:function(jq,_108){
return _c(jq[0],_108);
},getData:function(jq,_109){
return _d5(jq[0],_109);
},reload:function(jq,_10a){
return jq.each(function(){
if(_10a){
var node=$(_10a);
var hit=node.children("span.tree-hit");
hit.removeClass("tree-expanded tree-expanded-hover").addClass("tree-collapsed");
node.next().remove();
_83(this,_10a);
}else{
$(this).empty();
_79(this,this);
}
});
},getRoot:function(jq,_10b){
return _bd(jq[0],_10b);
},getRoots:function(jq){
return _c1(jq[0]);
},getParent:function(jq,_10c){
return _9a(jq[0],_10c);
},getChildren:function(jq,_10d){
return _5a(jq[0],_10d);
},getChecked:function(jq,_10e){
return _cc(jq[0],_10e);
},getSelected:function(jq){
return _d2(jq[0]);
},isLeaf:function(jq,_10f){
return _56(jq[0],_10f);
},find:function(jq,id){
return _dc(jq[0],id);
},select:function(jq,_110){
return jq.each(function(){
_e9(this,_110);
});
},check:function(jq,_111){
return jq.each(function(){
_34(this,_111,true);
});
},uncheck:function(jq,_112){
return jq.each(function(){
_34(this,_112,false);
});
},collapse:function(jq,_113){
return jq.each(function(){
_8a(this,_113);
});
},expand:function(jq,_114){
return jq.each(function(){
_83(this,_114);
});
},collapseAll:function(jq,_115){
return jq.each(function(){
_a0(this,_115);
});
},expandAll:function(jq,_116){
return jq.each(function(){
_92(this,_116);
});
},expandTo:function(jq,_117){
return jq.each(function(){
_96(this,_117);
});
},scrollTo:function(jq,_118){
return jq.each(function(){
_9b(this,_118);
});
},toggle:function(jq,_119){
return jq.each(function(){
_8f(this,_119);
});
},append:function(jq,_11a){
return jq.each(function(){
_a4(this,_11a);
});
},insert:function(jq,_11b){
return jq.each(function(){
_aa(this,_11b);
});
},remove:function(jq,_11c){
return jq.each(function(){
_b0(this,_11c);
});
},pop:function(jq,_11d){
var node=jq.tree("getData",_11d);
jq.tree("remove",_11d);
return node;
},update:function(jq,_11e){
return jq.each(function(){
_64(this,_11e);
});
},enableDnd:function(jq){
return jq.each(function(){
_11(this);
});
},disableDnd:function(jq){
return jq.each(function(){
_d(this);
});
},beginEdit:function(jq,_11f){
return jq.each(function(){
_f0(this,_11f);
});
},endEdit:function(jq,_120){
return jq.each(function(){
_f7(this,_120);
});
},cancelEdit:function(jq,_121){
return jq.each(function(){
_fd(this,_121);
});
},doFilter:function(jq,q){
return jq.each(function(){
_100(this,q);
});
}};
$.fn.tree.parseOptions=function(_122){
var t=$(_122);
return $.extend({},$.parser.parseOptions(_122,["url","method",{checkbox:"boolean",cascadeCheck:"boolean",onlyLeafCheck:"boolean"},{animate:"boolean",lines:"boolean",dnd:"boolean"}]));
};
$.fn.tree.parseData=function(_123){
var data=[];
_124(data,$(_123));
return data;
function _124(aa,tree){
tree.children("li").each(function(){
var node=$(this);
var item=$.extend({},$.parser.parseOptions(this,["id","iconCls","state"]),{checked:(node.attr("checked")?true:undefined)});
item.text=node.children("span").html();
if(!item.text){
item.text=node.html();
}
var _125=node.children("ul");
if(_125.length){
item.children=[];
_124(item.children,_125);
}
aa.push(item);
});
};
};
var _126=1;
var _127={render:function(_128,ul,data){
var opts=$.data(_128,"tree").options;
var _129=$(ul).prev("div.tree-node").find("span.tree-indent, span.tree-hit").length;
var cc=_12a(_129,data);
$(ul).append(cc.join(""));
function _12a(_12b,_12c){
var cc=[];
for(var i=0;i<_12c.length;i++){
var item=_12c[i];
if(item.state!="open"&&item.state!="closed"){
item.state="open";
}
item.domId="_easyui_tree_"+_126++;
cc.push("<li>");
cc.push("<div id=\""+item.domId+"\" class=\"tree-node\">");
for(var j=0;j<_12b;j++){
cc.push("<span class=\"tree-indent\"></span>");
}
var _12d=false;
if(item.state=="closed"){
cc.push("<span class=\"tree-hit tree-collapsed\"></span>");
cc.push("<span class=\"tree-icon tree-folder "+(item.iconCls?item.iconCls:"")+"\"></span>");
}else{
if(item.children&&item.children.length){
cc.push("<span class=\"tree-hit tree-expanded\"></span>");
cc.push("<span class=\"tree-icon tree-folder tree-folder-open "+(item.iconCls?item.iconCls:"")+"\"></span>");
}else{
cc.push("<span class=\"tree-indent\"></span>");
cc.push("<span class=\"tree-icon tree-file "+(item.iconCls?item.iconCls:"")+"\"></span>");
_12d=true;
}
}
if(opts.checkbox){
if((!opts.onlyLeafCheck)||_12d){
cc.push("<span class=\"tree-checkbox tree-checkbox0\"></span>");
}
}
cc.push("<span class=\"tree-title\">"+opts.formatter.call(_128,item)+"</span>");
cc.push("</div>");
if(item.children&&item.children.length){
var tmp=_12a(_12b+1,item.children);
cc.push("<ul style=\"display:"+(item.state=="closed"?"none":"block")+"\">");
cc=cc.concat(tmp);
cc.push("</ul>");
}
cc.push("</li>");
}
return cc;
};
}};
$.fn.tree.defaults={url:null,method:"post",animate:false,checkbox:false,cascadeCheck:true,onlyLeafCheck:false,lines:false,dnd:false,data:null,queryParams:{},formatter:function(node){
return node.text;
},filter:function(q,node){
return node.text.toLowerCase().indexOf(q.toLowerCase())>=0;
},loader:function(_12e,_12f,_130){
var opts=$(this).tree("options");
if(!opts.url){
return false;
}
$.ajax({type:opts.method,url:opts.url,data:_12e,dataType:"json",success:function(data){
_12f(data);
},error:function(){
_130.apply(this,arguments);
}});
},loadFilter:function(data,_131){
return data;
},view:_127,onBeforeLoad:function(node,_132){
},onLoadSuccess:function(node,data){
},onLoadError:function(){
},onClick:function(node){
},onDblClick:function(node){
},onBeforeExpand:function(node){
},onExpand:function(node){
},onBeforeCollapse:function(node){
},onCollapse:function(node){
},onBeforeCheck:function(node,_133){
},onCheck:function(node,_134){
},onBeforeSelect:function(node){
},onSelect:function(node){
},onContextMenu:function(e,node){
},onBeforeDrag:function(node){
},onStartDrag:function(node){
},onStopDrag:function(node){
},onDragEnter:function(_135,_136){
},onDragOver:function(_137,_138){
},onDragLeave:function(_139,_13a){
},onBeforeDrop:function(_13b,_13c,_13d){
},onDrop:function(_13e,_13f,_140){
},onBeforeEdit:function(node){
},onAfterEdit:function(node){
},onCancelEdit:function(node){
}};
})(jQuery);


/**
 * jQuery EasyUI 1.4.3
 * 
 * Copyright (c) 2009-2015 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL license: http://www.gnu.org/licenses/gpl.txt
 * To use it on other terms please contact us at info@jeasyui.com
 *
 */
(function($){
function _1(_2){
var _3=$.data(_2,"combotree");
var _4=_3.options;
var _5=_3.tree;
$(_2).addClass("combotree-f");
$(_2).combo(_4);
var _6=$(_2).combo("panel");
if(!_5){
_5=$("<ul></ul>").appendTo(_6);
$.data(_2,"combotree").tree=_5;
}
_5.tree($.extend({},_4,{checkbox:_4.multiple,onLoadSuccess:function(_7,_8){
var _9=$(_2).combotree("getValues");
if(_4.multiple){
var _a=_5.tree("getChecked");
for(var i=0;i<_a.length;i++){
var id=_a[i].id;
(function(){
for(var i=0;i<_9.length;i++){
if(id==_9[i]){
return;
}
}
_9.push(id);
})();
}
}
$(_2).combotree("setValues",_9);
_4.onLoadSuccess.call(this,_7,_8);
},onClick:function(_b){
if(_4.multiple){
$(this).tree(_b.checked?"uncheck":"check",_b.target);
}else{
$(_2).combo("hidePanel");
}
_e(_2);
_4.onClick.call(this,_b);
},onCheck:function(_c,_d){
_e(_2);
_4.onCheck.call(this,_c,_d);
}}));
};
function _e(_f){
var _10=$.data(_f,"combotree");
var _11=_10.options;
var _12=_10.tree;
var vv=[],ss=[];
if(_11.multiple){
var _13=_12.tree("getChecked");
for(var i=0;i<_13.length;i++){
vv.push(_13[i].id);
ss.push(_13[i].text);
}
}else{
var _14=_12.tree("getSelected");
if(_14){
vv.push(_14.id);
ss.push(_14.text);
}
}
$(_f).combo("setText",ss.join(_11.separator)).combo("setValues",_11.multiple?vv:(vv.length?vv:[""]));
};
function _15(_16,_17){
var _18=$.data(_16,"combotree");
var _19=_18.options;
var _1a=_18.tree;
var _1b=_1a.tree("options");
var _1c=_1b.onCheck;
var _1d=_1b.onSelect;
_1b.onCheck=_1b.onSelect=function(){
};
_1a.find("span.tree-checkbox").addClass("tree-checkbox0").removeClass("tree-checkbox1 tree-checkbox2");
if(!$.isArray(_17)){
_17=_17.split(_19.separator);
}
var vv=$.map(_17,function(_1e){
return String(_1e);
});
var ss=[];
$.map(vv,function(v){
var _1f=_1a.tree("find",v);
if(_1f){
_1a.tree("check",_1f.target).tree("select",_1f.target);
ss.push(_1f.text);
}else{
ss.push(v);
}
});
if(_19.multiple){
var _20=_1a.tree("getChecked");
$.map(_20,function(_21){
var id=String(_21.id);
if($.inArray(id,vv)==-1){
vv.push(id);
ss.push(_21.text);
}
});
}
_1b.onCheck=_1c;
_1b.onSelect=_1d;
$(_16).combo("setText",ss.join(_19.separator)).combo("setValues",_19.multiple?vv:(vv.length?vv:[""]));
};
$.fn.combotree=function(_22,_23){
if(typeof _22=="string"){
var _24=$.fn.combotree.methods[_22];
if(_24){
return _24(this,_23);
}else{
return this.combo(_22,_23);
}
}
_22=_22||{};
return this.each(function(){
var _25=$.data(this,"combotree");
if(_25){
$.extend(_25.options,_22);
}else{
$.data(this,"combotree",{options:$.extend({},$.fn.combotree.defaults,$.fn.combotree.parseOptions(this),_22)});
}
_1(this);
});
};
$.fn.combotree.methods={options:function(jq){
var _26=jq.combo("options");
return $.extend($.data(jq[0],"combotree").options,{width:_26.width,height:_26.height,originalValue:_26.originalValue,disabled:_26.disabled,readonly:_26.readonly});
},clone:function(jq,_27){
var t=jq.combo("clone",_27);
t.data("combotree",{options:$.extend(true,{},jq.combotree("options")),tree:jq.combotree("tree")});
return t;
},tree:function(jq){
return $.data(jq[0],"combotree").tree;
},loadData:function(jq,_28){
return jq.each(function(){
var _29=$.data(this,"combotree").options;
_29.data=_28;
var _2a=$.data(this,"combotree").tree;
_2a.tree("loadData",_28);
});
},reload:function(jq,url){
return jq.each(function(){
var _2b=$.data(this,"combotree").options;
var _2c=$.data(this,"combotree").tree;
if(url){
_2b.url=url;
}
_2c.tree({url:_2b.url});
});
},setValues:function(jq,_2d){
return jq.each(function(){
_15(this,_2d);
});
},setValue:function(jq,_2e){
return jq.each(function(){
_15(this,[_2e]);
});
},clear:function(jq){
return jq.each(function(){
var _2f=$.data(this,"combotree").tree;
_2f.find("div.tree-node-selected").removeClass("tree-node-selected");
var cc=_2f.tree("getChecked");
for(var i=0;i<cc.length;i++){
_2f.tree("uncheck",cc[i].target);
}
$(this).combo("clear");
});
},reset:function(jq){
return jq.each(function(){
var _30=$(this).combotree("options");
if(_30.multiple){
$(this).combotree("setValues",_30.originalValue);
}else{
$(this).combotree("setValue",_30.originalValue);
}
});
}};
$.fn.combotree.parseOptions=function(_31){
return $.extend({},$.fn.combo.parseOptions(_31),$.fn.tree.parseOptions(_31));
};
$.fn.combotree.defaults=$.extend({},$.fn.combo.defaults,$.fn.tree.defaults,{editable:false});
})(jQuery);


/**
 * jQuery EasyUI 1.4.3
 * 
 * Copyright (c) 2009-2015 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL license: http://www.gnu.org/licenses/gpl.txt
 * To use it on other terms please contact us at info@jeasyui.com
 *
 */
(function($){
$.fn.resizable=function(_1,_2){
if(typeof _1=="string"){
return $.fn.resizable.methods[_1](this,_2);
}
function _3(e){
var _4=e.data;
var _5=$.data(_4.target,"resizable").options;
if(_4.dir.indexOf("e")!=-1){
var _6=_4.startWidth+e.pageX-_4.startX;
_6=Math.min(Math.max(_6,_5.minWidth),_5.maxWidth);
_4.width=_6;
}
if(_4.dir.indexOf("s")!=-1){
var _7=_4.startHeight+e.pageY-_4.startY;
_7=Math.min(Math.max(_7,_5.minHeight),_5.maxHeight);
_4.height=_7;
}
if(_4.dir.indexOf("w")!=-1){
var _6=_4.startWidth-e.pageX+_4.startX;
_6=Math.min(Math.max(_6,_5.minWidth),_5.maxWidth);
_4.width=_6;
_4.left=_4.startLeft+_4.startWidth-_4.width;
}
if(_4.dir.indexOf("n")!=-1){
var _7=_4.startHeight-e.pageY+_4.startY;
_7=Math.min(Math.max(_7,_5.minHeight),_5.maxHeight);
_4.height=_7;
_4.top=_4.startTop+_4.startHeight-_4.height;
}
};
function _8(e){
var _9=e.data;
var t=$(_9.target);
t.css({left:_9.left,top:_9.top});
if(t.outerWidth()!=_9.width){
t._outerWidth(_9.width);
}
if(t.outerHeight()!=_9.height){
t._outerHeight(_9.height);
}
};
function _a(e){
$.fn.resizable.isResizing=true;
$.data(e.data.target,"resizable").options.onStartResize.call(e.data.target,e);
return false;
};
function _b(e){
_3(e);
if($.data(e.data.target,"resizable").options.onResize.call(e.data.target,e)!=false){
_8(e);
}
return false;
};
function _c(e){
$.fn.resizable.isResizing=false;
_3(e,true);
_8(e);
$.data(e.data.target,"resizable").options.onStopResize.call(e.data.target,e);
$(document).unbind(".resizable");
$("body").css("cursor","");
return false;
};
return this.each(function(){
var _d=null;
var _e=$.data(this,"resizable");
if(_e){
$(this).unbind(".resizable");
_d=$.extend(_e.options,_1||{});
}else{
_d=$.extend({},$.fn.resizable.defaults,$.fn.resizable.parseOptions(this),_1||{});
$.data(this,"resizable",{options:_d});
}
if(_d.disabled==true){
return;
}
$(this).bind("mousemove.resizable",{target:this},function(e){
if($.fn.resizable.isResizing){
return;
}
var _f=_10(e);
if(_f==""){
$(e.data.target).css("cursor","");
}else{
$(e.data.target).css("cursor",_f+"-resize");
}
}).bind("mouseleave.resizable",{target:this},function(e){
$(e.data.target).css("cursor","");
}).bind("mousedown.resizable",{target:this},function(e){
var dir=_10(e);
if(dir==""){
return;
}
function _11(css){
var val=parseInt($(e.data.target).css(css));
if(isNaN(val)){
return 0;
}else{
return val;
}
};
var _12={target:e.data.target,dir:dir,startLeft:_11("left"),startTop:_11("top"),left:_11("left"),top:_11("top"),startX:e.pageX,startY:e.pageY,startWidth:$(e.data.target).outerWidth(),startHeight:$(e.data.target).outerHeight(),width:$(e.data.target).outerWidth(),height:$(e.data.target).outerHeight(),deltaWidth:$(e.data.target).outerWidth()-$(e.data.target).width(),deltaHeight:$(e.data.target).outerHeight()-$(e.data.target).height()};
$(document).bind("mousedown.resizable",_12,_a);
$(document).bind("mousemove.resizable",_12,_b);
$(document).bind("mouseup.resizable",_12,_c);
$("body").css("cursor",dir+"-resize");
});
function _10(e){
var tt=$(e.data.target);
var dir="";
var _13=tt.offset();
var _14=tt.outerWidth();
var _15=tt.outerHeight();
var _16=_d.edge;
if(e.pageY>_13.top&&e.pageY<_13.top+_16){
dir+="n";
}else{
if(e.pageY<_13.top+_15&&e.pageY>_13.top+_15-_16){
dir+="s";
}
}
if(e.pageX>_13.left&&e.pageX<_13.left+_16){
dir+="w";
}else{
if(e.pageX<_13.left+_14&&e.pageX>_13.left+_14-_16){
dir+="e";
}
}
var _17=_d.handles.split(",");
for(var i=0;i<_17.length;i++){
var _18=_17[i].replace(/(^\s*)|(\s*$)/g,"");
if(_18=="all"||_18==dir){
return dir;
}
}
return "";
};
});
};
$.fn.resizable.methods={options:function(jq){
return $.data(jq[0],"resizable").options;
},enable:function(jq){
return jq.each(function(){
$(this).resizable({disabled:false});
});
},disable:function(jq){
return jq.each(function(){
$(this).resizable({disabled:true});
});
}};
$.fn.resizable.parseOptions=function(_19){
var t=$(_19);
return $.extend({},$.parser.parseOptions(_19,["handles",{minWidth:"number",minHeight:"number",maxWidth:"number",maxHeight:"number",edge:"number"}]),{disabled:(t.attr("disabled")?true:undefined)});
};
$.fn.resizable.defaults={disabled:false,handles:"n, e, s, w, ne, se, sw, nw, all",minWidth:10,minHeight:10,maxWidth:10000,maxHeight:10000,edge:5,onStartResize:function(e){
},onResize:function(e){
},onStopResize:function(e){
}};
$.fn.resizable.isResizing=false;
})(jQuery);


/**
 * jQuery EasyUI 1.4.3
 * 
 * Copyright (c) 2009-2015 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL license: http://www.gnu.org/licenses/gpl.txt
 * To use it on other terms please contact us at info@jeasyui.com
 *
 */
(function($){
function _1(_2){
var _3=$.data(_2,"pagination");
var _4=_3.options;
var bb=_3.bb={};
var _5=$(_2).addClass("pagination").html("<table cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tr></tr></table>");
var tr=_5.find("tr");
var aa=$.extend([],_4.layout);
if(!_4.showPageList){
_6(aa,"list");
}
if(!_4.showRefresh){
_6(aa,"refresh");
}
if(aa[0]=="sep"){
aa.shift();
}
if(aa[aa.length-1]=="sep"){
aa.pop();
}
for(var _7=0;_7<aa.length;_7++){
var _8=aa[_7];
if(_8=="list"){
var ps=$("<select class=\"pagination-page-list\"></select>");
ps.bind("change",function(){
_4.pageSize=parseInt($(this).val());
_4.onChangePageSize.call(_2,_4.pageSize);
_10(_2,_4.pageNumber);
});
for(var i=0;i<_4.pageList.length;i++){
$("<option></option>").text(_4.pageList[i]).appendTo(ps);
}
$("<td></td>").append(ps).appendTo(tr);
}else{
if(_8=="sep"){
$("<td><div class=\"pagination-btn-separator\"></div></td>").appendTo(tr);
}else{
if(_8=="first"){
bb.first=_9("first");
}else{
if(_8=="prev"){
bb.prev=_9("prev");
}else{
if(_8=="next"){
bb.next=_9("next");
}else{
if(_8=="last"){
bb.last=_9("last");
}else{
if(_8=="manual"){
$("<span style=\"padding-left:6px;\"></span>").html(_4.beforePageText).appendTo(tr).wrap("<td></td>");
bb.num=$("<input class=\"pagination-num\" type=\"text\" value=\"1\" size=\"2\">").appendTo(tr).wrap("<td></td>");
bb.num.unbind(".pagination").bind("keydown.pagination",function(e){
if(e.keyCode==13){
var _a=parseInt($(this).val())||1;
_10(_2,_a);
return false;
}
});
bb.after=$("<span style=\"padding-right:6px;\"></span>").appendTo(tr).wrap("<td></td>");
}else{
if(_8=="refresh"){
bb.refresh=_9("refresh");
}else{
if(_8=="links"){
$("<td class=\"pagination-links\"></td>").appendTo(tr);
}
}
}
}
}
}
}
}
}
}
if(_4.buttons){
$("<td><div class=\"pagination-btn-separator\"></div></td>").appendTo(tr);
if($.isArray(_4.buttons)){
for(var i=0;i<_4.buttons.length;i++){
var _b=_4.buttons[i];
if(_b=="-"){
$("<td><div class=\"pagination-btn-separator\"></div></td>").appendTo(tr);
}else{
var td=$("<td></td>").appendTo(tr);
var a=$("<a href=\"javascript:void(0)\"></a>").appendTo(td);
a[0].onclick=eval(_b.handler||function(){
});
a.linkbutton($.extend({},_b,{plain:true}));
}
}
}else{
var td=$("<td></td>").appendTo(tr);
$(_4.buttons).appendTo(td).show();
}
}
$("<div class=\"pagination-info\"></div>").appendTo(_5);
$("<div style=\"clear:both;\"></div>").appendTo(_5);
function _9(_c){
var _d=_4.nav[_c];
var a=$("<a href=\"javascript:void(0)\"></a>").appendTo(tr);
a.wrap("<td></td>");
a.linkbutton({iconCls:_d.iconCls,plain:true}).unbind(".pagination").bind("click.pagination",function(){
_d.handler.call(_2);
});
return a;
};
function _6(aa,_e){
var _f=$.inArray(_e,aa);
if(_f>=0){
aa.splice(_f,1);
}
return aa;
};
};
function _10(_11,_12){
var _13=$.data(_11,"pagination").options;
_14(_11,{pageNumber:_12});
_13.onSelectPage.call(_11,_13.pageNumber,_13.pageSize);
};
function _14(_15,_16){
var _17=$.data(_15,"pagination");
var _18=_17.options;
var bb=_17.bb;
$.extend(_18,_16||{});
var ps=$(_15).find("select.pagination-page-list");
if(ps.length){
ps.val(_18.pageSize+"");
_18.pageSize=parseInt(ps.val());
}
var _19=Math.ceil(_18.total/_18.pageSize)||1;
if(_18.pageNumber<1){
_18.pageNumber=1;
}
if(_18.pageNumber>_19){
_18.pageNumber=_19;
}
if(_18.total==0){
_18.pageNumber=0;
_19=0;
}
if(bb.num){
bb.num.val(_18.pageNumber);
}
if(bb.after){
bb.after.html(_18.afterPageText.replace(/{pages}/,_19));
}
var td=$(_15).find("td.pagination-links");
if(td.length){
td.empty();
var _1a=_18.pageNumber-Math.floor(_18.links/2);
if(_1a<1){
_1a=1;
}
var _1b=_1a+_18.links-1;
if(_1b>_19){
_1b=_19;
}
_1a=_1b-_18.links+1;
if(_1a<1){
_1a=1;
}
for(var i=_1a;i<=_1b;i++){
var a=$("<a class=\"pagination-link\" href=\"javascript:void(0)\"></a>").appendTo(td);
a.linkbutton({plain:true,text:i});
if(i==_18.pageNumber){
a.linkbutton("select");
}else{
a.unbind(".pagination").bind("click.pagination",{pageNumber:i},function(e){
_10(_15,e.data.pageNumber);
});
}
}
}
var _1c=_18.displayMsg;
_1c=_1c.replace(/{from}/,_18.total==0?0:_18.pageSize*(_18.pageNumber-1)+1);
_1c=_1c.replace(/{to}/,Math.min(_18.pageSize*(_18.pageNumber),_18.total));
_1c=_1c.replace(/{total}/,_18.total);
$(_15).find("div.pagination-info").html(_1c);
if(bb.first){
bb.first.linkbutton({disabled:((!_18.total)||_18.pageNumber==1)});
}
if(bb.prev){
bb.prev.linkbutton({disabled:((!_18.total)||_18.pageNumber==1)});
}
if(bb.next){
bb.next.linkbutton({disabled:(_18.pageNumber==_19)});
}
if(bb.last){
bb.last.linkbutton({disabled:(_18.pageNumber==_19)});
}
_1d(_15,_18.loading);
};
function _1d(_1e,_1f){
var _20=$.data(_1e,"pagination");
var _21=_20.options;
_21.loading=_1f;
if(_21.showRefresh&&_20.bb.refresh){
_20.bb.refresh.linkbutton({iconCls:(_21.loading?"pagination-loading":"pagination-load")});
}
};
$.fn.pagination=function(_22,_23){
if(typeof _22=="string"){
return $.fn.pagination.methods[_22](this,_23);
}
_22=_22||{};
return this.each(function(){
var _24;
var _25=$.data(this,"pagination");
if(_25){
_24=$.extend(_25.options,_22);
}else{
_24=$.extend({},$.fn.pagination.defaults,$.fn.pagination.parseOptions(this),_22);
$.data(this,"pagination",{options:_24});
}
_1(this);
_14(this);
});
};
$.fn.pagination.methods={options:function(jq){
return $.data(jq[0],"pagination").options;
},loading:function(jq){
return jq.each(function(){
_1d(this,true);
});
},loaded:function(jq){
return jq.each(function(){
_1d(this,false);
});
},refresh:function(jq,_26){
return jq.each(function(){
_14(this,_26);
});
},select:function(jq,_27){
return jq.each(function(){
_10(this,_27);
});
}};
$.fn.pagination.parseOptions=function(_28){
var t=$(_28);
return $.extend({},$.parser.parseOptions(_28,[{total:"number",pageSize:"number",pageNumber:"number",links:"number"},{loading:"boolean",showPageList:"boolean",showRefresh:"boolean"}]),{pageList:(t.attr("pageList")?eval(t.attr("pageList")):undefined)});
};
$.fn.pagination.defaults={total:1,pageSize:10,pageNumber:1,pageList:[10,20,30,50],loading:false,buttons:null,showPageList:true,showRefresh:true,links:10,layout:["list","sep","first","prev","sep","manual","sep","next","last","sep","refresh"],onSelectPage:function(_29,_2a){
},onBeforeRefresh:function(_2b,_2c){
},onRefresh:function(_2d,_2e){
},onChangePageSize:function(_2f){
},beforePageText:"Page",afterPageText:"of {pages}",displayMsg:"Displaying {from} to {to} of {total} items",nav:{first:{iconCls:"pagination-first",handler:function(){
var _30=$(this).pagination("options");
if(_30.pageNumber>1){
$(this).pagination("select",1);
}
}},prev:{iconCls:"pagination-prev",handler:function(){
var _31=$(this).pagination("options");
if(_31.pageNumber>1){
$(this).pagination("select",_31.pageNumber-1);
}
}},next:{iconCls:"pagination-next",handler:function(){
var _32=$(this).pagination("options");
var _33=Math.ceil(_32.total/_32.pageSize);
if(_32.pageNumber<_33){
$(this).pagination("select",_32.pageNumber+1);
}
}},last:{iconCls:"pagination-last",handler:function(){
var _34=$(this).pagination("options");
var _35=Math.ceil(_34.total/_34.pageSize);
if(_34.pageNumber<_35){
$(this).pagination("select",_35);
}
}},refresh:{iconCls:"pagination-refresh",handler:function(){
var _36=$(this).pagination("options");
if(_36.onBeforeRefresh.call(this,_36.pageNumber,_36.pageSize)!=false){
$(this).pagination("select",_36.pageNumber);
_36.onRefresh.call(this,_36.pageNumber,_36.pageSize);
}
}}}};
})(jQuery);


/**
 * jQuery EasyUI 1.4.3
 * 
 * Copyright (c) 2009-2015 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL license: http://www.gnu.org/licenses/gpl.txt
 * To use it on other terms please contact us at info@jeasyui.com
 *
 */
(function($){
var _1=0;
function _2(a,o){
for(var i=0,_3=a.length;i<_3;i++){
if(a[i]==o){
return i;
}
}
return -1;
};
function _4(a,o,id){
if(typeof o=="string"){
for(var i=0,_5=a.length;i<_5;i++){
if(a[i][o]==id){
a.splice(i,1);
return;
}
}
}else{
var _6=_2(a,o);
if(_6!=-1){
a.splice(_6,1);
}
}
};
function _7(a,o,r){
for(var i=0,_8=a.length;i<_8;i++){
if(a[i][o]==r[o]){
return;
}
}
a.push(r);
};
function _9(_a,aa){
return $.data(_a,"treegrid")?aa.slice(1):aa;
};
function _b(_c){
var _d=$.data(_c,"datagrid");
var _e=_d.options;
var _f=_d.panel;
var dc=_d.dc;
var ss=null;
if(_e.sharedStyleSheet){
ss=typeof _e.sharedStyleSheet=="boolean"?"head":_e.sharedStyleSheet;
}else{
ss=_f.closest("div.datagrid-view");
if(!ss.length){
ss=dc.view;
}
}
var cc=$(ss);
var _10=$.data(cc[0],"ss");
if(!_10){
_10=$.data(cc[0],"ss",{cache:{},dirty:[]});
}
return {add:function(_11){
var ss=["<style type=\"text/css\" easyui=\"true\">"];
for(var i=0;i<_11.length;i++){
_10.cache[_11[i][0]]={width:_11[i][1]};
}
var _12=0;
for(var s in _10.cache){
var _13=_10.cache[s];
_13.index=_12++;
ss.push(s+"{width:"+_13.width+"}");
}
ss.push("</style>");
$(ss.join("\n")).appendTo(cc);
cc.children("style[easyui]:not(:last)").remove();
},getRule:function(_14){
var _15=cc.children("style[easyui]:last")[0];
var _16=_15.styleSheet?_15.styleSheet:(_15.sheet||document.styleSheets[document.styleSheets.length-1]);
var _17=_16.cssRules||_16.rules;
return _17[_14];
},set:function(_18,_19){
var _1a=_10.cache[_18];
if(_1a){
_1a.width=_19;
var _1b=this.getRule(_1a.index);
if(_1b){
_1b.style["width"]=_19;
}
}
},remove:function(_1c){
var tmp=[];
for(var s in _10.cache){
if(s.indexOf(_1c)==-1){
tmp.push([s,_10.cache[s].width]);
}
}
_10.cache={};
this.add(tmp);
},dirty:function(_1d){
if(_1d){
_10.dirty.push(_1d);
}
},clean:function(){
for(var i=0;i<_10.dirty.length;i++){
this.remove(_10.dirty[i]);
}
_10.dirty=[];
}};
};
function _1e(_1f,_20){
var _21=$.data(_1f,"datagrid");
var _22=_21.options;
var _23=_21.panel;
if(_20){
$.extend(_22,_20);
}
if(_22.fit==true){
var p=_23.panel("panel").parent();
_22.width=p.width();
_22.height=p.height();
}
_23.panel("resize",_22);
};
function _24(_25){
var _26=$.data(_25,"datagrid");
var _27=_26.options;
var dc=_26.dc;
var _28=_26.panel;
var _29=_28.width();
var _2a=_28.height();
var _2b=dc.view;
var _2c=dc.view1;
var _2d=dc.view2;
var _2e=_2c.children("div.datagrid-header");
var _2f=_2d.children("div.datagrid-header");
var _30=_2e.find("table");
var _31=_2f.find("table");
_2b.width(_29);
var _32=_2e.children("div.datagrid-header-inner").show();
_2c.width(_32.find("table").width());
if(!_27.showHeader){
_32.hide();
}
_2d.width(_29-_2c._outerWidth());
_2c.children()._outerWidth(_2c.width());
_2d.children()._outerWidth(_2d.width());
var all=_2e.add(_2f).add(_30).add(_31);
all.css("height","");
var hh=Math.max(_30.height(),_31.height());
all._outerHeight(hh);
dc.body1.add(dc.body2).children("table.datagrid-btable-frozen").css({position:"absolute",top:dc.header2._outerHeight()});
var _33=dc.body2.children("table.datagrid-btable-frozen")._outerHeight();
var _34=_33+_2f._outerHeight()+_2d.children(".datagrid-footer")._outerHeight();
_28.children(":not(.datagrid-view,.datagrid-mask,.datagrid-mask-msg)").each(function(){
_34+=$(this)._outerHeight();
});
var _35=_28.outerHeight()-_28.height();
var _36=_28._size("minHeight")||"";
var _37=_28._size("maxHeight")||"";
_2c.add(_2d).children("div.datagrid-body").css({marginTop:_33,height:(isNaN(parseInt(_27.height))?"":(_2a-_34)),minHeight:(_36?_36-_35-_34:""),maxHeight:(_37?_37-_35-_34:"")});
_2b.height(_2d.height());
};
function _38(_39,_3a,_3b){
var _3c=$.data(_39,"datagrid").data.rows;
var _3d=$.data(_39,"datagrid").options;
var dc=$.data(_39,"datagrid").dc;
if(!dc.body1.is(":empty")&&(!_3d.nowrap||_3d.autoRowHeight||_3b)){
if(_3a!=undefined){
var tr1=_3d.finder.getTr(_39,_3a,"body",1);
var tr2=_3d.finder.getTr(_39,_3a,"body",2);
_3e(tr1,tr2);
}else{
var tr1=_3d.finder.getTr(_39,0,"allbody",1);
var tr2=_3d.finder.getTr(_39,0,"allbody",2);
_3e(tr1,tr2);
if(_3d.showFooter){
var tr1=_3d.finder.getTr(_39,0,"allfooter",1);
var tr2=_3d.finder.getTr(_39,0,"allfooter",2);
_3e(tr1,tr2);
}
}
}
_24(_39);
if(_3d.height=="auto"){
var _3f=dc.body1.parent();
var _40=dc.body2;
var _41=_42(_40);
var _43=_41.height;
if(_41.width>_40.width()){
_43+=18;
}
_43-=parseInt(_40.css("marginTop"))||0;
_3f.height(_43);
_40.height(_43);
dc.view.height(dc.view2.height());
}
dc.body2.triggerHandler("scroll");
function _3e(_44,_45){
for(var i=0;i<_45.length;i++){
var tr1=$(_44[i]);
var tr2=$(_45[i]);
tr1.css("height","");
tr2.css("height","");
var _46=Math.max(tr1.height(),tr2.height());
tr1.css("height",_46);
tr2.css("height",_46);
}
};
function _42(cc){
var _47=0;
var _48=0;
$(cc).children().each(function(){
var c=$(this);
if(c.is(":visible")){
_48+=c._outerHeight();
if(_47<c._outerWidth()){
_47=c._outerWidth();
}
}
});
return {width:_47,height:_48};
};
};
function _49(_4a,_4b){
var _4c=$.data(_4a,"datagrid");
var _4d=_4c.options;
var dc=_4c.dc;
if(!dc.body2.children("table.datagrid-btable-frozen").length){
dc.body1.add(dc.body2).prepend("<table class=\"datagrid-btable datagrid-btable-frozen\" cellspacing=\"0\" cellpadding=\"0\"></table>");
}
_4e(true);
_4e(false);
_24(_4a);
function _4e(_4f){
var _50=_4f?1:2;
var tr=_4d.finder.getTr(_4a,_4b,"body",_50);
(_4f?dc.body1:dc.body2).children("table.datagrid-btable-frozen").append(tr);
};
};
function _51(_52,_53){
function _54(){
var _55=[];
var _56=[];
$(_52).children("thead").each(function(){
var opt=$.parser.parseOptions(this,[{frozen:"boolean"}]);
$(this).find("tr").each(function(){
var _57=[];
$(this).find("th").each(function(){
var th=$(this);
var col=$.extend({},$.parser.parseOptions(this,["field","align","halign","order","width",{sortable:"boolean",checkbox:"boolean",resizable:"boolean",fixed:"boolean"},{rowspan:"number",colspan:"number"}]),{title:(th.html()||undefined),hidden:(th.attr("hidden")?true:undefined),formatter:(th.attr("formatter")?eval(th.attr("formatter")):undefined),styler:(th.attr("styler")?eval(th.attr("styler")):undefined),sorter:(th.attr("sorter")?eval(th.attr("sorter")):undefined)});
if(col.width&&String(col.width).indexOf("%")==-1){
col.width=parseInt(col.width);
}
if(th.attr("editor")){
var s=$.trim(th.attr("editor"));
if(s.substr(0,1)=="{"){
col.editor=eval("("+s+")");
}else{
col.editor=s;
}
}
_57.push(col);
});
opt.frozen?_55.push(_57):_56.push(_57);
});
});
return [_55,_56];
};
var _58=$("<div class=\"datagrid-wrap\">"+"<div class=\"datagrid-view\">"+"<div class=\"datagrid-view1\">"+"<div class=\"datagrid-header\">"+"<div class=\"datagrid-header-inner\"></div>"+"</div>"+"<div class=\"datagrid-body\">"+"<div class=\"datagrid-body-inner\"></div>"+"</div>"+"<div class=\"datagrid-footer\">"+"<div class=\"datagrid-footer-inner\"></div>"+"</div>"+"</div>"+"<div class=\"datagrid-view2\">"+"<div class=\"datagrid-header\">"+"<div class=\"datagrid-header-inner\"></div>"+"</div>"+"<div class=\"datagrid-body\"></div>"+"<div class=\"datagrid-footer\">"+"<div class=\"datagrid-footer-inner\"></div>"+"</div>"+"</div>"+"</div>"+"</div>").insertAfter(_52);
_58.panel({doSize:false,cls:"datagrid"});
$(_52).addClass("datagrid-f").hide().appendTo(_58.children("div.datagrid-view"));
var cc=_54();
var _59=_58.children("div.datagrid-view");
var _5a=_59.children("div.datagrid-view1");
var _5b=_59.children("div.datagrid-view2");
return {panel:_58,frozenColumns:cc[0],columns:cc[1],dc:{view:_59,view1:_5a,view2:_5b,header1:_5a.children("div.datagrid-header").children("div.datagrid-header-inner"),header2:_5b.children("div.datagrid-header").children("div.datagrid-header-inner"),body1:_5a.children("div.datagrid-body").children("div.datagrid-body-inner"),body2:_5b.children("div.datagrid-body"),footer1:_5a.children("div.datagrid-footer").children("div.datagrid-footer-inner"),footer2:_5b.children("div.datagrid-footer").children("div.datagrid-footer-inner")}};
};
function _5c(_5d){
var _5e=$.data(_5d,"datagrid");
var _5f=_5e.options;
var dc=_5e.dc;
var _60=_5e.panel;
_5e.ss=$(_5d).datagrid("createStyleSheet");
_60.panel($.extend({},_5f,{id:null,doSize:false,onResize:function(_61,_62){
if($.data(_5d,"datagrid")){
_24(_5d);
$(_5d).datagrid("fitColumns");
_5f.onResize.call(_60,_61,_62);
}
},onExpand:function(){
if($.data(_5d,"datagrid")){
$(_5d).datagrid("fixRowHeight").datagrid("fitColumns");
_5f.onExpand.call(_60);
}
}}));
_5e.rowIdPrefix="datagrid-row-r"+(++_1);
_5e.cellClassPrefix="datagrid-cell-c"+_1;
_63(dc.header1,_5f.frozenColumns,true);
_63(dc.header2,_5f.columns,false);
_64();
dc.header1.add(dc.header2).css("display",_5f.showHeader?"block":"none");
dc.footer1.add(dc.footer2).css("display",_5f.showFooter?"block":"none");
if(_5f.toolbar){
if($.isArray(_5f.toolbar)){
$("div.datagrid-toolbar",_60).remove();
var tb=$("<div class=\"datagrid-toolbar\"><table cellspacing=\"0\" cellpadding=\"0\"><tr></tr></table></div>").prependTo(_60);
var tr=tb.find("tr");
for(var i=0;i<_5f.toolbar.length;i++){
var btn=_5f.toolbar[i];
if(btn=="-"){
$("<td><div class=\"datagrid-btn-separator\"></div></td>").appendTo(tr);
}else{
var td=$("<td></td>").appendTo(tr);
var _65=$("<a href=\"javascript:void(0)\"></a>").appendTo(td);
_65[0].onclick=eval(btn.handler||function(){
});
_65.linkbutton($.extend({},btn,{plain:true}));
}
}
}else{
$(_5f.toolbar).addClass("datagrid-toolbar").prependTo(_60);
$(_5f.toolbar).show();
}
}else{
$("div.datagrid-toolbar",_60).remove();
}
$("div.datagrid-pager",_60).remove();
if(_5f.pagination){
var _66=$("<div class=\"datagrid-pager\"></div>");
if(_5f.pagePosition=="bottom"){
_66.appendTo(_60);
}else{
if(_5f.pagePosition=="top"){
_66.addClass("datagrid-pager-top").prependTo(_60);
}else{
var _67=$("<div class=\"datagrid-pager datagrid-pager-top\"></div>").prependTo(_60);
_66.appendTo(_60);
_66=_66.add(_67);
}
}
_66.pagination({total:(_5f.pageNumber*_5f.pageSize),pageNumber:_5f.pageNumber,pageSize:_5f.pageSize,pageList:_5f.pageList,onSelectPage:function(_68,_69){
_5f.pageNumber=_68||1;
_5f.pageSize=_69;
_66.pagination("refresh",{pageNumber:_68,pageSize:_69});
_b2(_5d);
}});
_5f.pageSize=_66.pagination("options").pageSize;
}
function _63(_6a,_6b,_6c){
if(!_6b){
return;
}
$(_6a).show();
$(_6a).empty();
var _6d=[];
var _6e=[];
if(_5f.sortName){
_6d=_5f.sortName.split(",");
_6e=_5f.sortOrder.split(",");
}
var t=$("<table class=\"datagrid-htable\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\"><tbody></tbody></table>").appendTo(_6a);
for(var i=0;i<_6b.length;i++){
var tr=$("<tr class=\"datagrid-header-row\"></tr>").appendTo($("tbody",t));
var _6f=_6b[i];
for(var j=0;j<_6f.length;j++){
var col=_6f[j];
var _70="";
if(col.rowspan){
_70+="rowspan=\""+col.rowspan+"\" ";
}
if(col.colspan){
_70+="colspan=\""+col.colspan+"\" ";
}
var td=$("<td "+_70+"></td>").appendTo(tr);
if(col.checkbox){
td.attr("field",col.field);
$("<div class=\"datagrid-header-check\"></div>").html("<input type=\"checkbox\"/>").appendTo(td);
}else{
if(col.field){
td.attr("field",col.field);
td.append("<div class=\"datagrid-cell\"><span></span><span class=\"datagrid-sort-icon\"></span></div>");
$("span",td).html(col.title);
$("span.datagrid-sort-icon",td).html("&nbsp;");
var _71=td.find("div.datagrid-cell");
var pos=_2(_6d,col.field);
if(pos>=0){
_71.addClass("datagrid-sort-"+_6e[pos]);
}
if(col.resizable==false){
_71.attr("resizable","false");
}
if(col.width){
var _72=$.parser.parseValue("width",col.width,dc.view,_5f.scrollbarSize);
_71._outerWidth(_72-1);
col.boxWidth=parseInt(_71[0].style.width);
col.deltaWidth=_72-col.boxWidth;
}else{
col.auto=true;
}
_71.css("text-align",(col.halign||col.align||""));
col.cellClass=_5e.cellClassPrefix+"-"+col.field.replace(/[\.|\s]/g,"-");
_71.addClass(col.cellClass).css("width","");
}else{
$("<div class=\"datagrid-cell-group\"></div>").html(col.title).appendTo(td);
}
}
if(col.hidden){
td.hide();
}
}
}
if(_6c&&_5f.rownumbers){
var td=$("<td rowspan=\""+_5f.frozenColumns.length+"\"><div class=\"datagrid-header-rownumber\"></div></td>");
if($("tr",t).length==0){
td.wrap("<tr class=\"datagrid-header-row\"></tr>").parent().appendTo($("tbody",t));
}else{
td.prependTo($("tr:first",t));
}
}
};
function _64(){
var _73=[];
var _74=_75(_5d,true).concat(_75(_5d));
for(var i=0;i<_74.length;i++){
var col=_76(_5d,_74[i]);
if(col&&!col.checkbox){
_73.push(["."+col.cellClass,col.boxWidth?col.boxWidth+"px":"auto"]);
}
}
_5e.ss.add(_73);
_5e.ss.dirty(_5e.cellSelectorPrefix);
_5e.cellSelectorPrefix="."+_5e.cellClassPrefix;
};
};
function _77(_78){
var _79=$.data(_78,"datagrid");
var _7a=_79.panel;
var _7b=_79.options;
var dc=_79.dc;
var _7c=dc.header1.add(dc.header2);
_7c.find("input[type=checkbox]").unbind(".datagrid").bind("click.datagrid",function(e){
if(_7b.singleSelect&&_7b.selectOnCheck){
return false;
}
if($(this).is(":checked")){
_128(_78);
}else{
_12e(_78);
}
e.stopPropagation();
});
var _7d=_7c.find("div.datagrid-cell");
_7d.closest("td").unbind(".datagrid").bind("mouseenter.datagrid",function(){
if(_79.resizing){
return;
}
$(this).addClass("datagrid-header-over");
}).bind("mouseleave.datagrid",function(){
$(this).removeClass("datagrid-header-over");
}).bind("contextmenu.datagrid",function(e){
var _7e=$(this).attr("field");
_7b.onHeaderContextMenu.call(_78,e,_7e);
});
_7d.unbind(".datagrid").bind("click.datagrid",function(e){
var p1=$(this).offset().left+5;
var p2=$(this).offset().left+$(this)._outerWidth()-5;
if(e.pageX<p2&&e.pageX>p1){
_a6(_78,$(this).parent().attr("field"));
}
}).bind("dblclick.datagrid",function(e){
var p1=$(this).offset().left+5;
var p2=$(this).offset().left+$(this)._outerWidth()-5;
var _7f=_7b.resizeHandle=="right"?(e.pageX>p2):(_7b.resizeHandle=="left"?(e.pageX<p1):(e.pageX<p1||e.pageX>p2));
if(_7f){
var _80=$(this).parent().attr("field");
var col=_76(_78,_80);
if(col.resizable==false){
return;
}
$(_78).datagrid("autoSizeColumn",_80);
col.auto=false;
}
});
var _81=_7b.resizeHandle=="right"?"e":(_7b.resizeHandle=="left"?"w":"e,w");
_7d.each(function(){
$(this).resizable({handles:_81,disabled:($(this).attr("resizable")?$(this).attr("resizable")=="false":false),minWidth:25,onStartResize:function(e){
_79.resizing=true;
_7c.css("cursor",$("body").css("cursor"));
if(!_79.proxy){
_79.proxy=$("<div class=\"datagrid-resize-proxy\"></div>").appendTo(dc.view);
}
_79.proxy.css({left:e.pageX-$(_7a).offset().left-1,display:"none"});
setTimeout(function(){
if(_79.proxy){
_79.proxy.show();
}
},500);
},onResize:function(e){
_79.proxy.css({left:e.pageX-$(_7a).offset().left-1,display:"block"});
return false;
},onStopResize:function(e){
_7c.css("cursor","");
$(this).css("height","");
var _82=$(this).parent().attr("field");
var col=_76(_78,_82);
col.width=$(this)._outerWidth();
col.boxWidth=col.width-col.deltaWidth;
col.auto=undefined;
$(this).css("width","");
$(_78).datagrid("fixColumnSize",_82);
_79.proxy.remove();
_79.proxy=null;
if($(this).parents("div:first.datagrid-header").parent().hasClass("datagrid-view1")){
_24(_78);
}
$(_78).datagrid("fitColumns");
_7b.onResizeColumn.call(_78,_82,col.width);
setTimeout(function(){
_79.resizing=false;
},0);
}});
});
var bb=dc.body1.add(dc.body2);
bb.unbind();
for(var _83 in _7b.rowEvents){
bb.bind(_83,_7b.rowEvents[_83]);
}
dc.body1.bind("mousewheel DOMMouseScroll",function(e){
var e1=e.originalEvent||window.event;
var _84=e1.wheelDelta||e1.detail*(-1);
var dg=$(e.target).closest("div.datagrid-view").children(".datagrid-f");
var dc=dg.data("datagrid").dc;
dc.body2.scrollTop(dc.body2.scrollTop()-_84);
});
dc.body2.bind("scroll",function(){
var b1=dc.view1.children("div.datagrid-body");
b1.scrollTop($(this).scrollTop());
var c1=dc.body1.children(":first");
var c2=dc.body2.children(":first");
if(c1.length&&c2.length){
var _85=c1.offset().top;
var _86=c2.offset().top;
if(_85!=_86){
b1.scrollTop(b1.scrollTop()+_85-_86);
}
}
dc.view2.children("div.datagrid-header,div.datagrid-footer")._scrollLeft($(this)._scrollLeft());
dc.body2.children("table.datagrid-btable-frozen").css("left",-$(this)._scrollLeft());
});
};
function _87(_88){
return function(e){
var tr=_89(e.target);
if(!tr){
return;
}
var _8a=_8b(tr);
if($.data(_8a,"datagrid").resizing){
return;
}
var _8c=_8d(tr);
if(_88){
_8e(_8a,_8c);
}else{
var _8f=$.data(_8a,"datagrid").options;
_8f.finder.getTr(_8a,_8c).removeClass("datagrid-row-over");
}
};
};
function _90(e){
var tr=_89(e.target);
if(!tr){
return;
}
var _91=_8b(tr);
var _92=$.data(_91,"datagrid").options;
var _93=_8d(tr);
var tt=$(e.target);
if(tt.parent().hasClass("datagrid-cell-check")){
if(_92.singleSelect&&_92.selectOnCheck){
tt._propAttr("checked",!tt.is(":checked"));
_94(_91,_93);
}else{
if(tt.is(":checked")){
tt._propAttr("checked",false);
_94(_91,_93);
}else{
tt._propAttr("checked",true);
_95(_91,_93);
}
}
}else{
var row=_92.finder.getRow(_91,_93);
var td=tt.closest("td[field]",tr);
if(td.length){
var _96=td.attr("field");
_92.onClickCell.call(_91,_93,_96,row[_96]);
}
if(_92.singleSelect==true){
_97(_91,_93);
}else{
if(_92.ctrlSelect){
if(e.ctrlKey){
if(tr.hasClass("datagrid-row-selected")){
_98(_91,_93);
}else{
_97(_91,_93);
}
}else{
if(e.shiftKey){
$(_91).datagrid("clearSelections");
var _99=Math.min(_92.lastSelectedIndex||0,_93);
var _9a=Math.max(_92.lastSelectedIndex||0,_93);
for(var i=_99;i<=_9a;i++){
_97(_91,i);
}
}else{
$(_91).datagrid("clearSelections");
_97(_91,_93);
_92.lastSelectedIndex=_93;
}
}
}else{
if(tr.hasClass("datagrid-row-selected")){
_98(_91,_93);
}else{
_97(_91,_93);
}
}
}
_92.onClickRow.apply(_91,_9(_91,[_93,row]));
}
};
function _9b(e){
var tr=_89(e.target);
if(!tr){
return;
}
var _9c=_8b(tr);
var _9d=$.data(_9c,"datagrid").options;
var _9e=_8d(tr);
var row=_9d.finder.getRow(_9c,_9e);
var td=$(e.target).closest("td[field]",tr);
if(td.length){
var _9f=td.attr("field");
_9d.onDblClickCell.call(_9c,_9e,_9f,row[_9f]);
}
_9d.onDblClickRow.apply(_9c,_9(_9c,[_9e,row]));
};
function _a0(e){
var tr=_89(e.target);
if(tr){
var _a1=_8b(tr);
var _a2=$.data(_a1,"datagrid").options;
var _a3=_8d(tr);
var row=_a2.finder.getRow(_a1,_a3);
_a2.onRowContextMenu.call(_a1,e,_a3,row);
}else{
var _a4=_89(e.target,".datagrid-body");
if(_a4){
var _a1=_8b(_a4);
var _a2=$.data(_a1,"datagrid").options;
_a2.onRowContextMenu.call(_a1,e,-1,null);
}
}
};
function _8b(t){
return $(t).closest("div.datagrid-view").children(".datagrid-f")[0];
};
function _89(t,_a5){
var tr=$(t).closest(_a5||"tr.datagrid-row");
if(tr.length&&tr.parent().length){
return tr;
}else{
return undefined;
}
};
function _8d(tr){
if(tr.attr("datagrid-row-index")){
return parseInt(tr.attr("datagrid-row-index"));
}else{
return tr.attr("node-id");
}
};
function _a6(_a7,_a8){
var _a9=$.data(_a7,"datagrid");
var _aa=_a9.options;
_a8=_a8||{};
var _ab={sortName:_aa.sortName,sortOrder:_aa.sortOrder};
if(typeof _a8=="object"){
$.extend(_ab,_a8);
}
var _ac=[];
var _ad=[];
if(_ab.sortName){
_ac=_ab.sortName.split(",");
_ad=_ab.sortOrder.split(",");
}
if(typeof _a8=="string"){
var _ae=_a8;
var col=_76(_a7,_ae);
if(!col.sortable||_a9.resizing){
return;
}
var _af=col.order||"asc";
var pos=_2(_ac,_ae);
if(pos>=0){
var _b0=_ad[pos]=="asc"?"desc":"asc";
if(_aa.multiSort&&_b0==_af){
_ac.splice(pos,1);
_ad.splice(pos,1);
}else{
_ad[pos]=_b0;
}
}else{
if(_aa.multiSort){
_ac.push(_ae);
_ad.push(_af);
}else{
_ac=[_ae];
_ad=[_af];
}
}
_ab.sortName=_ac.join(",");
_ab.sortOrder=_ad.join(",");
}
if(_aa.onBeforeSortColumn.call(_a7,_ab.sortName,_ab.sortOrder)==false){
return;
}
$.extend(_aa,_ab);
var dc=_a9.dc;
var _b1=dc.header1.add(dc.header2);
_b1.find("div.datagrid-cell").removeClass("datagrid-sort-asc datagrid-sort-desc");
for(var i=0;i<_ac.length;i++){
var col=_76(_a7,_ac[i]);
_b1.find("div."+col.cellClass).addClass("datagrid-sort-"+_ad[i]);
}
if(_aa.remoteSort){
_b2(_a7);
}else{
_b3(_a7,$(_a7).datagrid("getData"));
}
_aa.onSortColumn.call(_a7,_aa.sortName,_aa.sortOrder);
};
function _b4(_b5){
var _b6=$.data(_b5,"datagrid");
var _b7=_b6.options;
var dc=_b6.dc;
var _b8=dc.view2.children("div.datagrid-header");
dc.body2.css("overflow-x","");
_b9();
_ba();
_bb();
_b9(true);
if(_b8.width()>=_b8.find("table").width()){
dc.body2.css("overflow-x","hidden");
}
function _bb(){
if(!_b7.fitColumns){
return;
}
if(!_b6.leftWidth){
_b6.leftWidth=0;
}
var _bc=0;
var cc=[];
var _bd=_75(_b5,false);
for(var i=0;i<_bd.length;i++){
var col=_76(_b5,_bd[i]);
if(_be(col)){
_bc+=col.width;
cc.push({field:col.field,col:col,addingWidth:0});
}
}
if(!_bc){
return;
}
cc[cc.length-1].addingWidth-=_b6.leftWidth;
var _bf=_b8.children("div.datagrid-header-inner").show();
var _c0=_b8.width()-_b8.find("table").width()-_b7.scrollbarSize+_b6.leftWidth;
var _c1=_c0/_bc;
if(!_b7.showHeader){
_bf.hide();
}
for(var i=0;i<cc.length;i++){
var c=cc[i];
var _c2=parseInt(c.col.width*_c1);
c.addingWidth+=_c2;
_c0-=_c2;
}
cc[cc.length-1].addingWidth+=_c0;
for(var i=0;i<cc.length;i++){
var c=cc[i];
if(c.col.boxWidth+c.addingWidth>0){
c.col.boxWidth+=c.addingWidth;
c.col.width+=c.addingWidth;
}
}
_b6.leftWidth=_c0;
$(_b5).datagrid("fixColumnSize");
};
function _ba(){
var _c3=false;
var _c4=_75(_b5,true).concat(_75(_b5,false));
$.map(_c4,function(_c5){
var col=_76(_b5,_c5);
if(String(col.width||"").indexOf("%")>=0){
var _c6=$.parser.parseValue("width",col.width,dc.view,_b7.scrollbarSize)-col.deltaWidth;
if(_c6>0){
col.boxWidth=_c6;
_c3=true;
}
}
});
if(_c3){
$(_b5).datagrid("fixColumnSize");
}
};
function _b9(fit){
var _c7=dc.header1.add(dc.header2).find(".datagrid-cell-group");
if(_c7.length){
_c7.each(function(){
$(this)._outerWidth(fit?$(this).parent().width():10);
});
if(fit){
_24(_b5);
}
}
};
function _be(col){
if(String(col.width||"").indexOf("%")>=0){
return false;
}
if(!col.hidden&&!col.checkbox&&!col.auto&&!col.fixed){
return true;
}
};
};
function _c8(_c9,_ca){
var _cb=$.data(_c9,"datagrid");
var _cc=_cb.options;
var dc=_cb.dc;
var tmp=$("<div class=\"datagrid-cell\" style=\"position:absolute;left:-9999px\"></div>").appendTo("body");
if(_ca){
_1e(_ca);
$(_c9).datagrid("fitColumns");
}else{
var _cd=false;
var _ce=_75(_c9,true).concat(_75(_c9,false));
for(var i=0;i<_ce.length;i++){
var _ca=_ce[i];
var col=_76(_c9,_ca);
if(col.auto){
_1e(_ca);
_cd=true;
}
}
if(_cd){
$(_c9).datagrid("fitColumns");
}
}
tmp.remove();
function _1e(_cf){
var _d0=dc.view.find("div.datagrid-header td[field=\""+_cf+"\"] div.datagrid-cell");
_d0.css("width","");
var col=$(_c9).datagrid("getColumnOption",_cf);
col.width=undefined;
col.boxWidth=undefined;
col.auto=true;
$(_c9).datagrid("fixColumnSize",_cf);
var _d1=Math.max(_d2("header"),_d2("allbody"),_d2("allfooter"))+1;
_d0._outerWidth(_d1-1);
col.width=_d1;
col.boxWidth=parseInt(_d0[0].style.width);
col.deltaWidth=_d1-col.boxWidth;
_d0.css("width","");
$(_c9).datagrid("fixColumnSize",_cf);
_cc.onResizeColumn.call(_c9,_cf,col.width);
function _d2(_d3){
var _d4=0;
if(_d3=="header"){
_d4=_d5(_d0);
}else{
_cc.finder.getTr(_c9,0,_d3).find("td[field=\""+_cf+"\"] div.datagrid-cell").each(function(){
var w=_d5($(this));
if(_d4<w){
_d4=w;
}
});
}
return _d4;
function _d5(_d6){
return _d6.is(":visible")?_d6._outerWidth():tmp.html(_d6.html())._outerWidth();
};
};
};
};
function _d7(_d8,_d9){
var _da=$.data(_d8,"datagrid");
var _db=_da.options;
var dc=_da.dc;
var _dc=dc.view.find("table.datagrid-btable,table.datagrid-ftable");
_dc.css("table-layout","fixed");
if(_d9){
fix(_d9);
}else{
var ff=_75(_d8,true).concat(_75(_d8,false));
for(var i=0;i<ff.length;i++){
fix(ff[i]);
}
}
_dc.css("table-layout","");
_dd(_d8);
_38(_d8);
_de(_d8);
function fix(_df){
var col=_76(_d8,_df);
if(col.cellClass){
_da.ss.set("."+col.cellClass,col.boxWidth?col.boxWidth+"px":"auto");
}
};
};
function _dd(_e0){
var dc=$.data(_e0,"datagrid").dc;
dc.view.find("td.datagrid-td-merged").each(function(){
var td=$(this);
var _e1=td.attr("colspan")||1;
var col=_76(_e0,td.attr("field"));
var _e2=col.boxWidth+col.deltaWidth-1;
for(var i=1;i<_e1;i++){
td=td.next();
col=_76(_e0,td.attr("field"));
_e2+=col.boxWidth+col.deltaWidth;
}
$(this).children("div.datagrid-cell")._outerWidth(_e2);
});
};
function _de(_e3){
var dc=$.data(_e3,"datagrid").dc;
dc.view.find("div.datagrid-editable").each(function(){
var _e4=$(this);
var _e5=_e4.parent().attr("field");
var col=$(_e3).datagrid("getColumnOption",_e5);
_e4._outerWidth(col.boxWidth+col.deltaWidth-1);
var ed=$.data(this,"datagrid.editor");
if(ed.actions.resize){
ed.actions.resize(ed.target,_e4.width());
}
});
};
function _76(_e6,_e7){
function _e8(_e9){
if(_e9){
for(var i=0;i<_e9.length;i++){
var cc=_e9[i];
for(var j=0;j<cc.length;j++){
var c=cc[j];
if(c.field==_e7){
return c;
}
}
}
}
return null;
};
var _ea=$.data(_e6,"datagrid").options;
var col=_e8(_ea.columns);
if(!col){
col=_e8(_ea.frozenColumns);
}
return col;
};
function _75(_eb,_ec){
var _ed=$.data(_eb,"datagrid").options;
var _ee=(_ec==true)?(_ed.frozenColumns||[[]]):_ed.columns;
if(_ee.length==0){
return [];
}
var aa=[];
var _ef=_f0();
for(var i=0;i<_ee.length;i++){
aa[i]=new Array(_ef);
}
for(var _f1=0;_f1<_ee.length;_f1++){
$.map(_ee[_f1],function(col){
var _f2=_f3(aa[_f1]);
if(_f2>=0){
var _f4=col.field||"";
for(var c=0;c<(col.colspan||1);c++){
for(var r=0;r<(col.rowspan||1);r++){
aa[_f1+r][_f2]=_f4;
}
_f2++;
}
}
});
}
return aa[aa.length-1];
function _f0(){
var _f5=0;
$.map(_ee[0],function(col){
_f5+=col.colspan||1;
});
return _f5;
};
function _f3(a){
for(var i=0;i<a.length;i++){
if(a[i]==undefined){
return i;
}
}
return -1;
};
};
function _b3(_f6,_f7){
var _f8=$.data(_f6,"datagrid");
var _f9=_f8.options;
var dc=_f8.dc;
_f7=_f9.loadFilter.call(_f6,_f7);
_f7.total=parseInt(_f7.total);
_f8.data=_f7;
if(_f7.footer){
_f8.footer=_f7.footer;
}
if(!_f9.remoteSort&&_f9.sortName){
var _fa=_f9.sortName.split(",");
var _fb=_f9.sortOrder.split(",");
_f7.rows.sort(function(r1,r2){
var r=0;
for(var i=0;i<_fa.length;i++){
var sn=_fa[i];
var so=_fb[i];
var col=_76(_f6,sn);
var _fc=col.sorter||function(a,b){
return a==b?0:(a>b?1:-1);
};
r=_fc(r1[sn],r2[sn])*(so=="asc"?1:-1);
if(r!=0){
return r;
}
}
return r;
});
}
if(_f9.view.onBeforeRender){
_f9.view.onBeforeRender.call(_f9.view,_f6,_f7.rows);
}
_f9.view.render.call(_f9.view,_f6,dc.body2,false);
_f9.view.render.call(_f9.view,_f6,dc.body1,true);
if(_f9.showFooter){
_f9.view.renderFooter.call(_f9.view,_f6,dc.footer2,false);
_f9.view.renderFooter.call(_f9.view,_f6,dc.footer1,true);
}
if(_f9.view.onAfterRender){
_f9.view.onAfterRender.call(_f9.view,_f6);
}
_f8.ss.clean();
var _fd=$(_f6).datagrid("getPager");
if(_fd.length){
var _fe=_fd.pagination("options");
if(_fe.total!=_f7.total){
_fd.pagination("refresh",{total:_f7.total});
if(_f9.pageNumber!=_fe.pageNumber&&_fe.pageNumber>0){
_f9.pageNumber=_fe.pageNumber;
_b2(_f6);
}
}
}
_38(_f6);
dc.body2.triggerHandler("scroll");
$(_f6).datagrid("setSelectionState");
$(_f6).datagrid("autoSizeColumn");
_f9.onLoadSuccess.call(_f6,_f7);
};
function _ff(_100){
var _101=$.data(_100,"datagrid");
var opts=_101.options;
var dc=_101.dc;
dc.header1.add(dc.header2).find("input[type=checkbox]")._propAttr("checked",false);
if(opts.idField){
var _102=$.data(_100,"treegrid")?true:false;
var _103=opts.onSelect;
var _104=opts.onCheck;
opts.onSelect=opts.onCheck=function(){
};
var rows=opts.finder.getRows(_100);
for(var i=0;i<rows.length;i++){
var row=rows[i];
var _105=_102?row[opts.idField]:i;
if(_106(_101.selectedRows,row)){
_97(_100,_105,true);
}
if(_106(_101.checkedRows,row)){
_94(_100,_105,true);
}
}
opts.onSelect=_103;
opts.onCheck=_104;
}
function _106(a,r){
for(var i=0;i<a.length;i++){
if(a[i][opts.idField]==r[opts.idField]){
a[i]=r;
return true;
}
}
return false;
};
};
function _107(_108,row){
var _109=$.data(_108,"datagrid");
var opts=_109.options;
var rows=_109.data.rows;
if(typeof row=="object"){
return _2(rows,row);
}else{
for(var i=0;i<rows.length;i++){
if(rows[i][opts.idField]==row){
return i;
}
}
return -1;
}
};
function _10a(_10b){
var _10c=$.data(_10b,"datagrid");
var opts=_10c.options;
var data=_10c.data;
if(opts.idField){
return _10c.selectedRows;
}else{
var rows=[];
opts.finder.getTr(_10b,"","selected",2).each(function(){
rows.push(opts.finder.getRow(_10b,$(this)));
});
return rows;
}
};
function _10d(_10e){
var _10f=$.data(_10e,"datagrid");
var opts=_10f.options;
if(opts.idField){
return _10f.checkedRows;
}else{
var rows=[];
opts.finder.getTr(_10e,"","checked",2).each(function(){
rows.push(opts.finder.getRow(_10e,$(this)));
});
return rows;
}
};
function _110(_111,_112){
var _113=$.data(_111,"datagrid");
var dc=_113.dc;
var opts=_113.options;
var tr=opts.finder.getTr(_111,_112);
if(tr.length){
if(tr.closest("table").hasClass("datagrid-btable-frozen")){
return;
}
var _114=dc.view2.children("div.datagrid-header")._outerHeight();
var _115=dc.body2;
var _116=_115.outerHeight(true)-_115.outerHeight();
var top=tr.position().top-_114-_116;
if(top<0){
_115.scrollTop(_115.scrollTop()+top);
}else{
if(top+tr._outerHeight()>_115.height()-18){
_115.scrollTop(_115.scrollTop()+top+tr._outerHeight()-_115.height()+18);
}
}
}
};
function _8e(_117,_118){
var _119=$.data(_117,"datagrid");
var opts=_119.options;
opts.finder.getTr(_117,_119.highlightIndex).removeClass("datagrid-row-over");
opts.finder.getTr(_117,_118).addClass("datagrid-row-over");
_119.highlightIndex=_118;
};
function _97(_11a,_11b,_11c){
var _11d=$.data(_11a,"datagrid");
var opts=_11d.options;
var row=opts.finder.getRow(_11a,_11b);
if(opts.onBeforeSelect.apply(_11a,_9(_11a,[_11b,row]))==false){
return;
}
if(opts.singleSelect){
_11e(_11a,true);
_11d.selectedRows=[];
}
if(!_11c&&opts.checkOnSelect){
_94(_11a,_11b,true);
}
if(opts.idField){
_7(_11d.selectedRows,opts.idField,row);
}
opts.finder.getTr(_11a,_11b).addClass("datagrid-row-selected");
opts.onSelect.apply(_11a,_9(_11a,[_11b,row]));
_110(_11a,_11b);
};
function _98(_11f,_120,_121){
var _122=$.data(_11f,"datagrid");
var dc=_122.dc;
var opts=_122.options;
var row=opts.finder.getRow(_11f,_120);
if(opts.onBeforeUnselect.apply(_11f,_9(_11f,[_120,row]))==false){
return;
}
if(!_121&&opts.checkOnSelect){
_95(_11f,_120,true);
}
opts.finder.getTr(_11f,_120).removeClass("datagrid-row-selected");
if(opts.idField){
_4(_122.selectedRows,opts.idField,row[opts.idField]);
}
opts.onUnselect.apply(_11f,_9(_11f,[_120,row]));
};
function _123(_124,_125){
var _126=$.data(_124,"datagrid");
var opts=_126.options;
var rows=opts.finder.getRows(_124);
var _127=$.data(_124,"datagrid").selectedRows;
if(!_125&&opts.checkOnSelect){
_128(_124,true);
}
opts.finder.getTr(_124,"","allbody").addClass("datagrid-row-selected");
if(opts.idField){
for(var _129=0;_129<rows.length;_129++){
_7(_127,opts.idField,rows[_129]);
}
}
opts.onSelectAll.call(_124,rows);
};
function _11e(_12a,_12b){
var _12c=$.data(_12a,"datagrid");
var opts=_12c.options;
var rows=opts.finder.getRows(_12a);
var _12d=$.data(_12a,"datagrid").selectedRows;
if(!_12b&&opts.checkOnSelect){
_12e(_12a,true);
}
opts.finder.getTr(_12a,"","selected").removeClass("datagrid-row-selected");
if(opts.idField){
for(var _12f=0;_12f<rows.length;_12f++){
_4(_12d,opts.idField,rows[_12f][opts.idField]);
}
}
opts.onUnselectAll.call(_12a,rows);
};
function _94(_130,_131,_132){
var _133=$.data(_130,"datagrid");
var opts=_133.options;
var row=opts.finder.getRow(_130,_131);
if(opts.onBeforeCheck.apply(_130,_9(_130,[_131,row]))==false){
return;
}
if(opts.singleSelect&&opts.selectOnCheck){
_12e(_130,true);
_133.checkedRows=[];
}
if(!_132&&opts.selectOnCheck){
_97(_130,_131,true);
}
var tr=opts.finder.getTr(_130,_131).addClass("datagrid-row-checked");
tr.find("div.datagrid-cell-check input[type=checkbox]")._propAttr("checked",true);
tr=opts.finder.getTr(_130,"","checked",2);
if(tr.length==opts.finder.getRows(_130).length){
var dc=_133.dc;
dc.header1.add(dc.header2).find("input[type=checkbox]")._propAttr("checked",true);
}
if(opts.idField){
_7(_133.checkedRows,opts.idField,row);
}
opts.onCheck.apply(_130,_9(_130,[_131,row]));
};
function _95(_134,_135,_136){
var _137=$.data(_134,"datagrid");
var opts=_137.options;
var row=opts.finder.getRow(_134,_135);
if(opts.onBeforeUncheck.apply(_134,_9(_134,[_135,row]))==false){
return;
}
if(!_136&&opts.selectOnCheck){
_98(_134,_135,true);
}
var tr=opts.finder.getTr(_134,_135).removeClass("datagrid-row-checked");
tr.find("div.datagrid-cell-check input[type=checkbox]")._propAttr("checked",false);
var dc=_137.dc;
var _138=dc.header1.add(dc.header2);
_138.find("input[type=checkbox]")._propAttr("checked",false);
if(opts.idField){
_4(_137.checkedRows,opts.idField,row[opts.idField]);
}
opts.onUncheck.apply(_134,_9(_134,[_135,row]));
};
function _128(_139,_13a){
var _13b=$.data(_139,"datagrid");
var opts=_13b.options;
var rows=opts.finder.getRows(_139);
if(!_13a&&opts.selectOnCheck){
_123(_139,true);
}
var dc=_13b.dc;
var hck=dc.header1.add(dc.header2).find("input[type=checkbox]");
var bck=opts.finder.getTr(_139,"","allbody").addClass("datagrid-row-checked").find("div.datagrid-cell-check input[type=checkbox]");
hck.add(bck)._propAttr("checked",true);
if(opts.idField){
for(var i=0;i<rows.length;i++){
_7(_13b.checkedRows,opts.idField,rows[i]);
}
}
opts.onCheckAll.call(_139,rows);
};
function _12e(_13c,_13d){
var _13e=$.data(_13c,"datagrid");
var opts=_13e.options;
var rows=opts.finder.getRows(_13c);
if(!_13d&&opts.selectOnCheck){
_11e(_13c,true);
}
var dc=_13e.dc;
var hck=dc.header1.add(dc.header2).find("input[type=checkbox]");
var bck=opts.finder.getTr(_13c,"","checked").removeClass("datagrid-row-checked").find("div.datagrid-cell-check input[type=checkbox]");
hck.add(bck)._propAttr("checked",false);
if(opts.idField){
for(var i=0;i<rows.length;i++){
_4(_13e.checkedRows,opts.idField,rows[i][opts.idField]);
}
}
opts.onUncheckAll.call(_13c,rows);
};
function _13f(_140,_141){
var opts=$.data(_140,"datagrid").options;
var tr=opts.finder.getTr(_140,_141);
var row=opts.finder.getRow(_140,_141);
if(tr.hasClass("datagrid-row-editing")){
return;
}
if(opts.onBeforeEdit.apply(_140,_9(_140,[_141,row]))==false){
return;
}
tr.addClass("datagrid-row-editing");
_142(_140,_141);
_de(_140);
tr.find("div.datagrid-editable").each(function(){
var _143=$(this).parent().attr("field");
var ed=$.data(this,"datagrid.editor");
ed.actions.setValue(ed.target,row[_143]);
});
_144(_140,_141);
opts.onBeginEdit.apply(_140,_9(_140,[_141,row]));
};
function _145(_146,_147,_148){
var _149=$.data(_146,"datagrid");
var opts=_149.options;
var _14a=_149.updatedRows;
var _14b=_149.insertedRows;
var tr=opts.finder.getTr(_146,_147);
var row=opts.finder.getRow(_146,_147);
if(!tr.hasClass("datagrid-row-editing")){
return;
}
if(!_148){
if(!_144(_146,_147)){
return;
}
var _14c=false;
var _14d={};
tr.find("div.datagrid-editable").each(function(){
var _14e=$(this).parent().attr("field");
var ed=$.data(this,"datagrid.editor");
var t=$(ed.target);
var _14f=t.data("textbox")?t.textbox("textbox"):t;
_14f.triggerHandler("blur");
var _150=ed.actions.getValue(ed.target);
if(row[_14e]!=_150){
row[_14e]=_150;
_14c=true;
_14d[_14e]=_150;
}
});
if(_14c){
if(_2(_14b,row)==-1){
if(_2(_14a,row)==-1){
_14a.push(row);
}
}
}
opts.onEndEdit.apply(_146,_9(_146,[_147,row,_14d]));
}
tr.removeClass("datagrid-row-editing");
_151(_146,_147);
$(_146).datagrid("refreshRow",_147);
if(!_148){
opts.onAfterEdit.apply(_146,_9(_146,[_147,row,_14d]));
}else{
opts.onCancelEdit.apply(_146,_9(_146,[_147,row]));
}
};
function _152(_153,_154){
var opts=$.data(_153,"datagrid").options;
var tr=opts.finder.getTr(_153,_154);
var _155=[];
tr.children("td").each(function(){
var cell=$(this).find("div.datagrid-editable");
if(cell.length){
var ed=$.data(cell[0],"datagrid.editor");
_155.push(ed);
}
});
return _155;
};
function _156(_157,_158){
var _159=_152(_157,_158.index!=undefined?_158.index:_158.id);
for(var i=0;i<_159.length;i++){
if(_159[i].field==_158.field){
return _159[i];
}
}
return null;
};
function _142(_15a,_15b){
var opts=$.data(_15a,"datagrid").options;
var tr=opts.finder.getTr(_15a,_15b);
tr.children("td").each(function(){
var cell=$(this).find("div.datagrid-cell");
var _15c=$(this).attr("field");
var col=_76(_15a,_15c);
if(col&&col.editor){
var _15d,_15e;
if(typeof col.editor=="string"){
_15d=col.editor;
}else{
_15d=col.editor.type;
_15e=col.editor.options;
}
var _15f=opts.editors[_15d];
if(_15f){
var _160=cell.html();
var _161=cell._outerWidth();
cell.addClass("datagrid-editable");
cell._outerWidth(_161);
cell.html("<table border=\"0\" cellspacing=\"0\" cellpadding=\"1\"><tr><td></td></tr></table>");
cell.children("table").bind("click dblclick contextmenu",function(e){
e.stopPropagation();
});
$.data(cell[0],"datagrid.editor",{actions:_15f,target:_15f.init(cell.find("td"),_15e),field:_15c,type:_15d,oldHtml:_160});
}
}
});
_38(_15a,_15b,true);
};
function _151(_162,_163){
var opts=$.data(_162,"datagrid").options;
var tr=opts.finder.getTr(_162,_163);
tr.children("td").each(function(){
var cell=$(this).find("div.datagrid-editable");
if(cell.length){
var ed=$.data(cell[0],"datagrid.editor");
if(ed.actions.destroy){
ed.actions.destroy(ed.target);
}
cell.html(ed.oldHtml);
$.removeData(cell[0],"datagrid.editor");
cell.removeClass("datagrid-editable");
cell.css("width","");
}
});
};
function _144(_164,_165){
var tr=$.data(_164,"datagrid").options.finder.getTr(_164,_165);
if(!tr.hasClass("datagrid-row-editing")){
return true;
}
var vbox=tr.find(".validatebox-text");
vbox.validatebox("validate");
vbox.trigger("mouseleave");
var _166=tr.find(".validatebox-invalid");
return _166.length==0;
};
function _167(_168,_169){
var _16a=$.data(_168,"datagrid").insertedRows;
var _16b=$.data(_168,"datagrid").deletedRows;
var _16c=$.data(_168,"datagrid").updatedRows;
if(!_169){
var rows=[];
rows=rows.concat(_16a);
rows=rows.concat(_16b);
rows=rows.concat(_16c);
return rows;
}else{
if(_169=="inserted"){
return _16a;
}else{
if(_169=="deleted"){
return _16b;
}else{
if(_169=="updated"){
return _16c;
}
}
}
}
return [];
};
function _16d(_16e,_16f){
var _170=$.data(_16e,"datagrid");
var opts=_170.options;
var data=_170.data;
var _171=_170.insertedRows;
var _172=_170.deletedRows;
$(_16e).datagrid("cancelEdit",_16f);
var row=opts.finder.getRow(_16e,_16f);
if(_2(_171,row)>=0){
_4(_171,row);
}else{
_172.push(row);
}
_4(_170.selectedRows,opts.idField,row[opts.idField]);
_4(_170.checkedRows,opts.idField,row[opts.idField]);
opts.view.deleteRow.call(opts.view,_16e,_16f);
if(opts.height=="auto"){
_38(_16e);
}
$(_16e).datagrid("getPager").pagination("refresh",{total:data.total});
};
function _173(_174,_175){
var data=$.data(_174,"datagrid").data;
var view=$.data(_174,"datagrid").options.view;
var _176=$.data(_174,"datagrid").insertedRows;
view.insertRow.call(view,_174,_175.index,_175.row);
_176.push(_175.row);
$(_174).datagrid("getPager").pagination("refresh",{total:data.total});
};
function _177(_178,row){
var data=$.data(_178,"datagrid").data;
var view=$.data(_178,"datagrid").options.view;
var _179=$.data(_178,"datagrid").insertedRows;
view.insertRow.call(view,_178,null,row);
_179.push(row);
$(_178).datagrid("getPager").pagination("refresh",{total:data.total});
};
function _17a(_17b){
var _17c=$.data(_17b,"datagrid");
var data=_17c.data;
var rows=data.rows;
var _17d=[];
for(var i=0;i<rows.length;i++){
_17d.push($.extend({},rows[i]));
}
_17c.originalRows=_17d;
_17c.updatedRows=[];
_17c.insertedRows=[];
_17c.deletedRows=[];
};
function _17e(_17f){
var data=$.data(_17f,"datagrid").data;
var ok=true;
for(var i=0,len=data.rows.length;i<len;i++){
if(_144(_17f,i)){
$(_17f).datagrid("endEdit",i);
}else{
ok=false;
}
}
if(ok){
_17a(_17f);
}
};
function _180(_181){
var _182=$.data(_181,"datagrid");
var opts=_182.options;
var _183=_182.originalRows;
var _184=_182.insertedRows;
var _185=_182.deletedRows;
var _186=_182.selectedRows;
var _187=_182.checkedRows;
var data=_182.data;
function _188(a){
var ids=[];
for(var i=0;i<a.length;i++){
ids.push(a[i][opts.idField]);
}
return ids;
};
function _189(ids,_18a){
for(var i=0;i<ids.length;i++){
var _18b=_107(_181,ids[i]);
if(_18b>=0){
(_18a=="s"?_97:_94)(_181,_18b,true);
}
}
};
for(var i=0;i<data.rows.length;i++){
$(_181).datagrid("cancelEdit",i);
}
var _18c=_188(_186);
var _18d=_188(_187);
_186.splice(0,_186.length);
_187.splice(0,_187.length);
data.total+=_185.length-_184.length;
data.rows=_183;
_b3(_181,data);
_189(_18c,"s");
_189(_18d,"c");
_17a(_181);
};
function _b2(_18e,_18f){
var opts=$.data(_18e,"datagrid").options;
if(_18f){
opts.queryParams=_18f;
}
var _190=$.extend({},opts.queryParams);
if(opts.pagination){
$.extend(_190,{page:opts.pageNumber||1,rows:opts.pageSize});
}
if(opts.sortName){
$.extend(_190,{sort:opts.sortName,order:opts.sortOrder});
}
if(opts.onBeforeLoad.call(_18e,_190)==false){
return;
}
$(_18e).datagrid("loading");
var _191=opts.loader.call(_18e,_190,function(data){
$(_18e).datagrid("loaded");
$(_18e).datagrid("loadData",data);
},function(){
$(_18e).datagrid("loaded");
opts.onLoadError.apply(_18e,arguments);
});
if(_191==false){
$(_18e).datagrid("loaded");
}
};
function _192(_193,_194){
var opts=$.data(_193,"datagrid").options;
_194.type=_194.type||"body";
_194.rowspan=_194.rowspan||1;
_194.colspan=_194.colspan||1;
if(_194.rowspan==1&&_194.colspan==1){
return;
}
var tr=opts.finder.getTr(_193,(_194.index!=undefined?_194.index:_194.id),_194.type);
if(!tr.length){
return;
}
var td=tr.find("td[field=\""+_194.field+"\"]");
td.attr("rowspan",_194.rowspan).attr("colspan",_194.colspan);
td.addClass("datagrid-td-merged");
_195(td.next(),_194.colspan-1);
for(var i=1;i<_194.rowspan;i++){
tr=tr.next();
if(!tr.length){
break;
}
td=tr.find("td[field=\""+_194.field+"\"]");
_195(td,_194.colspan);
}
_dd(_193);
function _195(td,_196){
for(var i=0;i<_196;i++){
td.hide();
td=td.next();
}
};
};
$.fn.datagrid=function(_197,_198){
if(typeof _197=="string"){
return $.fn.datagrid.methods[_197](this,_198);
}
_197=_197||{};
return this.each(function(){
var _199=$.data(this,"datagrid");
var opts;
if(_199){
opts=$.extend(_199.options,_197);
_199.options=opts;
}else{
opts=$.extend({},$.extend({},$.fn.datagrid.defaults,{queryParams:{}}),$.fn.datagrid.parseOptions(this),_197);
$(this).css("width","").css("height","");
var _19a=_51(this,opts.rownumbers);
if(!opts.columns){
opts.columns=_19a.columns;
}
if(!opts.frozenColumns){
opts.frozenColumns=_19a.frozenColumns;
}
opts.columns=$.extend(true,[],opts.columns);
opts.frozenColumns=$.extend(true,[],opts.frozenColumns);
opts.view=$.extend({},opts.view);
$.data(this,"datagrid",{options:opts,panel:_19a.panel,dc:_19a.dc,ss:null,selectedRows:[],checkedRows:[],data:{total:0,rows:[]},originalRows:[],updatedRows:[],insertedRows:[],deletedRows:[]});
}
_5c(this);
_77(this);
_1e(this);
if(opts.data){
$(this).datagrid("loadData",opts.data);
}else{
var data=$.fn.datagrid.parseData(this);
if(data.total>0){
$(this).datagrid("loadData",data);
}else{
opts.view.renderEmptyRow(this);
$(this).datagrid("autoSizeColumn");
}
}
_b2(this);
});
};
function _19b(_19c){
var _19d={};
$.map(_19c,function(name){
_19d[name]=_19e(name);
});
return _19d;
function _19e(name){
function isA(_19f){
return $.data($(_19f)[0],name)!=undefined;
};
return {init:function(_1a0,_1a1){
var _1a2=$("<input type=\"text\" class=\"datagrid-editable-input\">").appendTo(_1a0);
if(_1a2[name]&&name!="text"){
return _1a2[name](_1a1);
}else{
return _1a2;
}
},destroy:function(_1a3){
if(isA(_1a3,name)){
$(_1a3)[name]("destroy");
}
},getValue:function(_1a4){
if(isA(_1a4,name)){
var opts=$(_1a4)[name]("options");
if(opts.multiple){
return $(_1a4)[name]("getValues").join(opts.separator);
}else{
return $(_1a4)[name]("getValue");
}
}else{
return $(_1a4).val();
}
},setValue:function(_1a5,_1a6){
if(isA(_1a5,name)){
var opts=$(_1a5)[name]("options");
if(opts.multiple){
if(_1a6){
$(_1a5)[name]("setValues",_1a6.split(opts.separator));
}else{
$(_1a5)[name]("clear");
}
}else{
$(_1a5)[name]("setValue",_1a6);
}
}else{
$(_1a5).val(_1a6);
}
},resize:function(_1a7,_1a8){
if(isA(_1a7,name)){
$(_1a7)[name]("resize",_1a8);
}else{
$(_1a7)._outerWidth(_1a8)._outerHeight(22);
}
}};
};
};
var _1a9=$.extend({},_19b(["text","textbox","numberbox","numberspinner","combobox","combotree","combogrid","datebox","datetimebox","timespinner","datetimespinner"]),{textarea:{init:function(_1aa,_1ab){
var _1ac=$("<textarea class=\"datagrid-editable-input\"></textarea>").appendTo(_1aa);
return _1ac;
},getValue:function(_1ad){
return $(_1ad).val();
},setValue:function(_1ae,_1af){
$(_1ae).val(_1af);
},resize:function(_1b0,_1b1){
$(_1b0)._outerWidth(_1b1);
}},checkbox:{init:function(_1b2,_1b3){
var _1b4=$("<input type=\"checkbox\">").appendTo(_1b2);
_1b4.val(_1b3.on);
_1b4.attr("offval",_1b3.off);
return _1b4;
},getValue:function(_1b5){
if($(_1b5).is(":checked")){
return $(_1b5).val();
}else{
return $(_1b5).attr("offval");
}
},setValue:function(_1b6,_1b7){
var _1b8=false;
if($(_1b6).val()==_1b7){
_1b8=true;
}
$(_1b6)._propAttr("checked",_1b8);
}},validatebox:{init:function(_1b9,_1ba){
var _1bb=$("<input type=\"text\" class=\"datagrid-editable-input\">").appendTo(_1b9);
_1bb.validatebox(_1ba);
return _1bb;
},destroy:function(_1bc){
$(_1bc).validatebox("destroy");
},getValue:function(_1bd){
return $(_1bd).val();
},setValue:function(_1be,_1bf){
$(_1be).val(_1bf);
},resize:function(_1c0,_1c1){
$(_1c0)._outerWidth(_1c1)._outerHeight(22);
}}});
$.fn.datagrid.methods={options:function(jq){
var _1c2=$.data(jq[0],"datagrid").options;
var _1c3=$.data(jq[0],"datagrid").panel.panel("options");
var opts=$.extend(_1c2,{width:_1c3.width,height:_1c3.height,closed:_1c3.closed,collapsed:_1c3.collapsed,minimized:_1c3.minimized,maximized:_1c3.maximized});
return opts;
},setSelectionState:function(jq){
return jq.each(function(){
_ff(this);
});
},createStyleSheet:function(jq){
return _b(jq[0]);
},getPanel:function(jq){
return $.data(jq[0],"datagrid").panel;
},getPager:function(jq){
return $.data(jq[0],"datagrid").panel.children("div.datagrid-pager");
},getColumnFields:function(jq,_1c4){
return _75(jq[0],_1c4);
},getColumnOption:function(jq,_1c5){
return _76(jq[0],_1c5);
},resize:function(jq,_1c6){
return jq.each(function(){
_1e(this,_1c6);
});
},load:function(jq,_1c7){
return jq.each(function(){
var opts=$(this).datagrid("options");
if(typeof _1c7=="string"){
opts.url=_1c7;
_1c7=null;
}
opts.pageNumber=1;
var _1c8=$(this).datagrid("getPager");
_1c8.pagination("refresh",{pageNumber:1});
_b2(this,_1c7);
});
},reload:function(jq,_1c9){
return jq.each(function(){
var opts=$(this).datagrid("options");
if(typeof _1c9=="string"){
opts.url=_1c9;
_1c9=null;
}
_b2(this,_1c9);
});
},reloadFooter:function(jq,_1ca){
return jq.each(function(){
var opts=$.data(this,"datagrid").options;
var dc=$.data(this,"datagrid").dc;
if(_1ca){
$.data(this,"datagrid").footer=_1ca;
}
if(opts.showFooter){
opts.view.renderFooter.call(opts.view,this,dc.footer2,false);
opts.view.renderFooter.call(opts.view,this,dc.footer1,true);
if(opts.view.onAfterRender){
opts.view.onAfterRender.call(opts.view,this);
}
$(this).datagrid("fixRowHeight");
}
});
},loading:function(jq){
return jq.each(function(){
var opts=$.data(this,"datagrid").options;
$(this).datagrid("getPager").pagination("loading");
if(opts.loadMsg){
var _1cb=$(this).datagrid("getPanel");
if(!_1cb.children("div.datagrid-mask").length){
$("<div class=\"datagrid-mask\" style=\"display:block\"></div>").appendTo(_1cb);
var msg=$("<div class=\"datagrid-mask-msg\" style=\"display:block;left:50%\"></div>").html(opts.loadMsg).appendTo(_1cb);
msg._outerHeight(40);
msg.css({marginLeft:(-msg.outerWidth()/2),lineHeight:(msg.height()+"px")});
}
}
});
},loaded:function(jq){
return jq.each(function(){
$(this).datagrid("getPager").pagination("loaded");
var _1cc=$(this).datagrid("getPanel");
_1cc.children("div.datagrid-mask-msg").remove();
_1cc.children("div.datagrid-mask").remove();
});
},fitColumns:function(jq){
return jq.each(function(){
_b4(this);
});
},fixColumnSize:function(jq,_1cd){
return jq.each(function(){
_d7(this,_1cd);
});
},fixRowHeight:function(jq,_1ce){
return jq.each(function(){
_38(this,_1ce);
});
},freezeRow:function(jq,_1cf){
return jq.each(function(){
_49(this,_1cf);
});
},autoSizeColumn:function(jq,_1d0){
return jq.each(function(){
_c8(this,_1d0);
});
},loadData:function(jq,data){
return jq.each(function(){
_b3(this,data);
_17a(this);
});
},getData:function(jq){
return $.data(jq[0],"datagrid").data;
},getRows:function(jq){
return $.data(jq[0],"datagrid").data.rows;
},getFooterRows:function(jq){
return $.data(jq[0],"datagrid").footer;
},getRowIndex:function(jq,id){
return _107(jq[0],id);
},getChecked:function(jq){
return _10d(jq[0]);
},getSelected:function(jq){
var rows=_10a(jq[0]);
return rows.length>0?rows[0]:null;
},getSelections:function(jq){
return _10a(jq[0]);
},clearSelections:function(jq){
return jq.each(function(){
var _1d1=$.data(this,"datagrid");
var _1d2=_1d1.selectedRows;
var _1d3=_1d1.checkedRows;
_1d2.splice(0,_1d2.length);
_11e(this);
if(_1d1.options.checkOnSelect){
_1d3.splice(0,_1d3.length);
}
});
},clearChecked:function(jq){
return jq.each(function(){
var _1d4=$.data(this,"datagrid");
var _1d5=_1d4.selectedRows;
var _1d6=_1d4.checkedRows;
_1d6.splice(0,_1d6.length);
_12e(this);
if(_1d4.options.selectOnCheck){
_1d5.splice(0,_1d5.length);
}
});
},scrollTo:function(jq,_1d7){
return jq.each(function(){
_110(this,_1d7);
});
},highlightRow:function(jq,_1d8){
return jq.each(function(){
_8e(this,_1d8);
_110(this,_1d8);
});
},selectAll:function(jq){
return jq.each(function(){
_123(this);
});
},unselectAll:function(jq){
return jq.each(function(){
_11e(this);
});
},selectRow:function(jq,_1d9){
return jq.each(function(){
_97(this,_1d9);
});
},selectRecord:function(jq,id){
return jq.each(function(){
var opts=$.data(this,"datagrid").options;
if(opts.idField){
var _1da=_107(this,id);
if(_1da>=0){
$(this).datagrid("selectRow",_1da);
}
}
});
},unselectRow:function(jq,_1db){
return jq.each(function(){
_98(this,_1db);
});
},checkRow:function(jq,_1dc){
return jq.each(function(){
_94(this,_1dc);
});
},uncheckRow:function(jq,_1dd){
return jq.each(function(){
_95(this,_1dd);
});
},checkAll:function(jq){
return jq.each(function(){
_128(this);
});
},uncheckAll:function(jq){
return jq.each(function(){
_12e(this);
});
},beginEdit:function(jq,_1de){
return jq.each(function(){
_13f(this,_1de);
});
},endEdit:function(jq,_1df){
return jq.each(function(){
_145(this,_1df,false);
});
},cancelEdit:function(jq,_1e0){
return jq.each(function(){
_145(this,_1e0,true);
});
},getEditors:function(jq,_1e1){
return _152(jq[0],_1e1);
},getEditor:function(jq,_1e2){
return _156(jq[0],_1e2);
},refreshRow:function(jq,_1e3){
return jq.each(function(){
var opts=$.data(this,"datagrid").options;
opts.view.refreshRow.call(opts.view,this,_1e3);
});
},validateRow:function(jq,_1e4){
return _144(jq[0],_1e4);
},updateRow:function(jq,_1e5){
return jq.each(function(){
var opts=$.data(this,"datagrid").options;
opts.view.updateRow.call(opts.view,this,_1e5.index,_1e5.row);
});
},appendRow:function(jq,row){
return jq.each(function(){
_177(this,row);
});
},insertRow:function(jq,_1e6){
return jq.each(function(){
_173(this,_1e6);
});
},deleteRow:function(jq,_1e7){
return jq.each(function(){
_16d(this,_1e7);
});
},getChanges:function(jq,_1e8){
return _167(jq[0],_1e8);
},acceptChanges:function(jq){
return jq.each(function(){
_17e(this);
});
},rejectChanges:function(jq){
return jq.each(function(){
_180(this);
});
},mergeCells:function(jq,_1e9){
return jq.each(function(){
_192(this,_1e9);
});
},showColumn:function(jq,_1ea){
return jq.each(function(){
var _1eb=$(this).datagrid("getPanel");
_1eb.find("td[field=\""+_1ea+"\"]").show();
$(this).datagrid("getColumnOption",_1ea).hidden=false;
$(this).datagrid("fitColumns");
});
},hideColumn:function(jq,_1ec){
return jq.each(function(){
var _1ed=$(this).datagrid("getPanel");
_1ed.find("td[field=\""+_1ec+"\"]").hide();
$(this).datagrid("getColumnOption",_1ec).hidden=true;
$(this).datagrid("fitColumns");
});
},sort:function(jq,_1ee){
return jq.each(function(){
_a6(this,_1ee);
});
}};
$.fn.datagrid.parseOptions=function(_1ef){
var t=$(_1ef);
return $.extend({},$.fn.panel.parseOptions(_1ef),$.parser.parseOptions(_1ef,["url","toolbar","idField","sortName","sortOrder","pagePosition","resizeHandle",{sharedStyleSheet:"boolean",fitColumns:"boolean",autoRowHeight:"boolean",striped:"boolean",nowrap:"boolean"},{rownumbers:"boolean",singleSelect:"boolean",ctrlSelect:"boolean",checkOnSelect:"boolean",selectOnCheck:"boolean"},{pagination:"boolean",pageSize:"number",pageNumber:"number"},{multiSort:"boolean",remoteSort:"boolean",showHeader:"boolean",showFooter:"boolean"},{scrollbarSize:"number"}]),{pageList:(t.attr("pageList")?eval(t.attr("pageList")):undefined),loadMsg:(t.attr("loadMsg")!=undefined?t.attr("loadMsg"):undefined),rowStyler:(t.attr("rowStyler")?eval(t.attr("rowStyler")):undefined)});
};
$.fn.datagrid.parseData=function(_1f0){
var t=$(_1f0);
var data={total:0,rows:[]};
var _1f1=t.datagrid("getColumnFields",true).concat(t.datagrid("getColumnFields",false));
t.find("tbody tr").each(function(){
data.total++;
var row={};
$.extend(row,$.parser.parseOptions(this,["iconCls","state"]));
for(var i=0;i<_1f1.length;i++){
row[_1f1[i]]=$(this).find("td:eq("+i+")").html();
}
data.rows.push(row);
});
return data;
};
var _1f2={render:function(_1f3,_1f4,_1f5){
var rows=$(_1f3).datagrid("getRows");
$(_1f4).html(this.renderTable(_1f3,0,rows,_1f5));
},renderFooter:function(_1f6,_1f7,_1f8){
var opts=$.data(_1f6,"datagrid").options;
var rows=$.data(_1f6,"datagrid").footer||[];
var _1f9=$(_1f6).datagrid("getColumnFields",_1f8);
var _1fa=["<table class=\"datagrid-ftable\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody>"];
for(var i=0;i<rows.length;i++){
_1fa.push("<tr class=\"datagrid-row\" datagrid-row-index=\""+i+"\">");
_1fa.push(this.renderRow.call(this,_1f6,_1f9,_1f8,i,rows[i]));
_1fa.push("</tr>");
}
_1fa.push("</tbody></table>");
$(_1f7).html(_1fa.join(""));
},renderTable:function(_1fb,_1fc,rows,_1fd){
var _1fe=$.data(_1fb,"datagrid");
var opts=_1fe.options;
if(_1fd){
if(!(opts.rownumbers||(opts.frozenColumns&&opts.frozenColumns.length))){
return "";
}
}
var _1ff=$(_1fb).datagrid("getColumnFields",_1fd);
var _200=["<table class=\"datagrid-btable\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody>"];
for(var i=0;i<rows.length;i++){
var row=rows[i];
var css=opts.rowStyler?opts.rowStyler.call(_1fb,_1fc,row):"";
var _201="";
var _202="";
if(typeof css=="string"){
_202=css;
}else{
if(css){
_201=css["class"]||"";
_202=css["style"]||"";
}
}
var cls="class=\"datagrid-row "+(_1fc%2&&opts.striped?"datagrid-row-alt ":" ")+_201+"\"";
var _203=_202?"style=\""+_202+"\"":"";
var _204=_1fe.rowIdPrefix+"-"+(_1fd?1:2)+"-"+_1fc;
_200.push("<tr id=\""+_204+"\" datagrid-row-index=\""+_1fc+"\" "+cls+" "+_203+">");
_200.push(this.renderRow.call(this,_1fb,_1ff,_1fd,_1fc,row));
_200.push("</tr>");
_1fc++;
}
_200.push("</tbody></table>");
return _200.join("");
},renderRow:function(_205,_206,_207,_208,_209){
var opts=$.data(_205,"datagrid").options;
var cc=[];
if(_207&&opts.rownumbers){
var _20a=_208+1;
if(opts.pagination){
_20a+=(opts.pageNumber-1)*opts.pageSize;
}
cc.push("<td class=\"datagrid-td-rownumber\"><div class=\"datagrid-cell-rownumber\">"+_20a+"</div></td>");
}
for(var i=0;i<_206.length;i++){
var _20b=_206[i];
var col=$(_205).datagrid("getColumnOption",_20b);
if(col){
var _20c=_209[_20b];
var css=col.styler?(col.styler(_20c,_209,_208)||""):"";
var _20d="";
var _20e="";
if(typeof css=="string"){
_20e=css;
}else{
if(css){
_20d=css["class"]||"";
_20e=css["style"]||"";
}
}
var cls=_20d?"class=\""+_20d+"\"":"";
var _20f=col.hidden?"style=\"display:none;"+_20e+"\"":(_20e?"style=\""+_20e+"\"":"");
cc.push("<td field=\""+_20b+"\" "+cls+" "+_20f+">");
var _20f="";
if(!col.checkbox){
if(col.align){
_20f+="text-align:"+col.align+";";
}
if(!opts.nowrap){
_20f+="white-space:normal;height:auto;";
}else{
if(opts.autoRowHeight){
_20f+="height:auto;";
}
}
}
cc.push("<div style=\""+_20f+"\" ");
cc.push(col.checkbox?"class=\"datagrid-cell-check\"":"class=\"datagrid-cell "+col.cellClass+"\"");
cc.push(">");
if(col.checkbox){
cc.push("<input type=\"checkbox\" "+(_209.checked?"checked=\"checked\"":""));
cc.push(" name=\""+_20b+"\" value=\""+(_20c!=undefined?_20c:"")+"\">");
}else{
if(col.formatter){
cc.push(col.formatter(_20c,_209,_208));
}else{
cc.push(_20c);
}
}
cc.push("</div>");
cc.push("</td>");
}
}
return cc.join("");
},refreshRow:function(_210,_211){
this.updateRow.call(this,_210,_211,{});
},updateRow:function(_212,_213,row){
var opts=$.data(_212,"datagrid").options;
var rows=$(_212).datagrid("getRows");
var _214=_215(_213);
$.extend(rows[_213],row);
var _216=_215(_213);
var _217=_214.c;
var _218=_216.s;
var _219="datagrid-row "+(_213%2&&opts.striped?"datagrid-row-alt ":" ")+_216.c;
function _215(_21a){
var css=opts.rowStyler?opts.rowStyler.call(_212,_21a,rows[_21a]):"";
var _21b="";
var _21c="";
if(typeof css=="string"){
_21c=css;
}else{
if(css){
_21b=css["class"]||"";
_21c=css["style"]||"";
}
}
return {c:_21b,s:_21c};
};
function _21d(_21e){
var _21f=$(_212).datagrid("getColumnFields",_21e);
var tr=opts.finder.getTr(_212,_213,"body",(_21e?1:2));
var _220=tr.find("div.datagrid-cell-check input[type=checkbox]").is(":checked");
tr.html(this.renderRow.call(this,_212,_21f,_21e,_213,rows[_213]));
tr.attr("style",_218).removeClass(_217).addClass(_219);
if(_220){
tr.find("div.datagrid-cell-check input[type=checkbox]")._propAttr("checked",true);
}
};
_21d.call(this,true);
_21d.call(this,false);
$(_212).datagrid("fixRowHeight",_213);
},insertRow:function(_221,_222,row){
var _223=$.data(_221,"datagrid");
var opts=_223.options;
var dc=_223.dc;
var data=_223.data;
if(_222==undefined||_222==null){
_222=data.rows.length;
}
if(_222>data.rows.length){
_222=data.rows.length;
}
function _224(_225){
var _226=_225?1:2;
for(var i=data.rows.length-1;i>=_222;i--){
var tr=opts.finder.getTr(_221,i,"body",_226);
tr.attr("datagrid-row-index",i+1);
tr.attr("id",_223.rowIdPrefix+"-"+_226+"-"+(i+1));
if(_225&&opts.rownumbers){
var _227=i+2;
if(opts.pagination){
_227+=(opts.pageNumber-1)*opts.pageSize;
}
tr.find("div.datagrid-cell-rownumber").html(_227);
}
if(opts.striped){
tr.removeClass("datagrid-row-alt").addClass((i+1)%2?"datagrid-row-alt":"");
}
}
};
function _228(_229){
var _22a=_229?1:2;
var _22b=$(_221).datagrid("getColumnFields",_229);
var _22c=_223.rowIdPrefix+"-"+_22a+"-"+_222;
var tr="<tr id=\""+_22c+"\" class=\"datagrid-row\" datagrid-row-index=\""+_222+"\"></tr>";
if(_222>=data.rows.length){
if(data.rows.length){
opts.finder.getTr(_221,"","last",_22a).after(tr);
}else{
var cc=_229?dc.body1:dc.body2;
cc.html("<table cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody>"+tr+"</tbody></table>");
}
}else{
opts.finder.getTr(_221,_222+1,"body",_22a).before(tr);
}
};
_224.call(this,true);
_224.call(this,false);
_228.call(this,true);
_228.call(this,false);
data.total+=1;
data.rows.splice(_222,0,row);
this.refreshRow.call(this,_221,_222);
},deleteRow:function(_22d,_22e){
var _22f=$.data(_22d,"datagrid");
var opts=_22f.options;
var data=_22f.data;
function _230(_231){
var _232=_231?1:2;
for(var i=_22e+1;i<data.rows.length;i++){
var tr=opts.finder.getTr(_22d,i,"body",_232);
tr.attr("datagrid-row-index",i-1);
tr.attr("id",_22f.rowIdPrefix+"-"+_232+"-"+(i-1));
if(_231&&opts.rownumbers){
var _233=i;
if(opts.pagination){
_233+=(opts.pageNumber-1)*opts.pageSize;
}
tr.find("div.datagrid-cell-rownumber").html(_233);
}
if(opts.striped){
tr.removeClass("datagrid-row-alt").addClass((i-1)%2?"datagrid-row-alt":"");
}
}
};
opts.finder.getTr(_22d,_22e).remove();
_230.call(this,true);
_230.call(this,false);
data.total-=1;
data.rows.splice(_22e,1);
},onBeforeRender:function(_234,rows){
},onAfterRender:function(_235){
var _236=$.data(_235,"datagrid");
var opts=_236.options;
if(opts.showFooter){
var _237=$(_235).datagrid("getPanel").find("div.datagrid-footer");
_237.find("div.datagrid-cell-rownumber,div.datagrid-cell-check").css("visibility","hidden");
}
if(opts.finder.getRows(_235).length==0){
this.renderEmptyRow(_235);
}
},renderEmptyRow:function(_238){
var cols=$.map($(_238).datagrid("getColumnFields"),function(_239){
return $(_238).datagrid("getColumnOption",_239);
});
$.map(cols,function(col){
col.formatter1=col.formatter;
col.styler1=col.styler;
col.formatter=col.styler=undefined;
});
var _23a=$.data(_238,"datagrid").dc.body2;
_23a.html(this.renderTable(_238,0,[{}],false));
_23a.find("tbody *").css({height:1,borderColor:"transparent",background:"transparent"});
var tr=_23a.find(".datagrid-row");
tr.removeClass("datagrid-row").removeAttr("datagrid-row-index");
tr.find(".datagrid-cell,.datagrid-cell-check").empty();
$.map(cols,function(col){
col.formatter=col.formatter1;
col.styler=col.styler1;
col.formatter1=col.styler1=undefined;
});
}};
$.fn.datagrid.defaults=$.extend({},$.fn.panel.defaults,{sharedStyleSheet:false,frozenColumns:undefined,columns:undefined,fitColumns:false,resizeHandle:"right",autoRowHeight:true,toolbar:null,striped:false,method:"post",nowrap:true,idField:null,url:null,data:null,loadMsg:"Processing, please wait ...",rownumbers:false,singleSelect:false,ctrlSelect:false,selectOnCheck:true,checkOnSelect:true,pagination:false,pagePosition:"bottom",pageNumber:1,pageSize:10,pageList:[10,20,30,40,50],queryParams:{},sortName:null,sortOrder:"asc",multiSort:false,remoteSort:true,showHeader:true,showFooter:false,scrollbarSize:18,rowEvents:{mouseover:_87(true),mouseout:_87(false),click:_90,dblclick:_9b,contextmenu:_a0},rowStyler:function(_23b,_23c){
},loader:function(_23d,_23e,_23f){
var opts=$(this).datagrid("options");
if(!opts.url){
return false;
}
$.ajax({type:opts.method,url:opts.url,data:_23d,dataType:"json",success:function(data){
_23e(data);
},error:function(){
_23f.apply(this,arguments);
}});
},loadFilter:function(data){
if(typeof data.length=="number"&&typeof data.splice=="function"){
return {total:data.length,rows:data};
}else{
return data;
}
},editors:_1a9,finder:{getTr:function(_240,_241,type,_242){
type=type||"body";
_242=_242||0;
var _243=$.data(_240,"datagrid");
var dc=_243.dc;
var opts=_243.options;
if(_242==0){
var tr1=opts.finder.getTr(_240,_241,type,1);
var tr2=opts.finder.getTr(_240,_241,type,2);
return tr1.add(tr2);
}else{
if(type=="body"){
var tr=$("#"+_243.rowIdPrefix+"-"+_242+"-"+_241);
if(!tr.length){
tr=(_242==1?dc.body1:dc.body2).find(">table>tbody>tr[datagrid-row-index="+_241+"]");
}
return tr;
}else{
if(type=="footer"){
return (_242==1?dc.footer1:dc.footer2).find(">table>tbody>tr[datagrid-row-index="+_241+"]");
}else{
if(type=="selected"){
return (_242==1?dc.body1:dc.body2).find(">table>tbody>tr.datagrid-row-selected");
}else{
if(type=="highlight"){
return (_242==1?dc.body1:dc.body2).find(">table>tbody>tr.datagrid-row-over");
}else{
if(type=="checked"){
return (_242==1?dc.body1:dc.body2).find(">table>tbody>tr.datagrid-row-checked");
}else{
if(type=="editing"){
return (_242==1?dc.body1:dc.body2).find(">table>tbody>tr.datagrid-row-editing");
}else{
if(type=="last"){
return (_242==1?dc.body1:dc.body2).find(">table>tbody>tr[datagrid-row-index]:last");
}else{
if(type=="allbody"){
return (_242==1?dc.body1:dc.body2).find(">table>tbody>tr[datagrid-row-index]");
}else{
if(type=="allfooter"){
return (_242==1?dc.footer1:dc.footer2).find(">table>tbody>tr[datagrid-row-index]");
}
}
}
}
}
}
}
}
}
}
},getRow:function(_244,p){
var _245=(typeof p=="object")?p.attr("datagrid-row-index"):p;
return $.data(_244,"datagrid").data.rows[parseInt(_245)];
},getRows:function(_246){
return $(_246).datagrid("getRows");
}},view:_1f2,onBeforeLoad:function(_247){
},onLoadSuccess:function(){
},onLoadError:function(){
},onClickRow:function(_248,_249){
},onDblClickRow:function(_24a,_24b){
},onClickCell:function(_24c,_24d,_24e){
},onDblClickCell:function(_24f,_250,_251){
},onBeforeSortColumn:function(sort,_252){
},onSortColumn:function(sort,_253){
},onResizeColumn:function(_254,_255){
},onBeforeSelect:function(_256,_257){
},onSelect:function(_258,_259){
},onBeforeUnselect:function(_25a,_25b){
},onUnselect:function(_25c,_25d){
},onSelectAll:function(rows){
},onUnselectAll:function(rows){
},onBeforeCheck:function(_25e,_25f){
},onCheck:function(_260,_261){
},onBeforeUncheck:function(_262,_263){
},onUncheck:function(_264,_265){
},onCheckAll:function(rows){
},onUncheckAll:function(rows){
},onBeforeEdit:function(_266,_267){
},onBeginEdit:function(_268,_269){
},onEndEdit:function(_26a,_26b,_26c){
},onAfterEdit:function(_26d,_26e,_26f){
},onCancelEdit:function(_270,_271){
},onHeaderContextMenu:function(e,_272){
},onRowContextMenu:function(e,_273,_274){
}});
})(jQuery);


/**
 * jQuery EasyUI 1.4.3
 * 
 * Copyright (c) 2009-2015 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL license: http://www.gnu.org/licenses/gpl.txt
 * To use it on other terms please contact us at info@jeasyui.com
 *
 */
(function($){
function _1(_2,_3){
var _4=$.data(_2,"calendar").options;
var t=$(_2);
if(_3){
$.extend(_4,{width:_3.width,height:_3.height});
}
t._size(_4,t.parent());
t.find(".calendar-body")._outerHeight(t.height()-t.find(".calendar-header")._outerHeight());
if(t.find(".calendar-menu").is(":visible")){
_5(_2);
}
};
function _6(_7){
$(_7).addClass("calendar").html("<div class=\"calendar-header\">"+"<div class=\"calendar-nav calendar-prevmonth\"></div>"+"<div class=\"calendar-nav calendar-nextmonth\"></div>"+"<div class=\"calendar-nav calendar-prevyear\"></div>"+"<div class=\"calendar-nav calendar-nextyear\"></div>"+"<div class=\"calendar-title\">"+"<span class=\"calendar-text\"></span>"+"</div>"+"</div>"+"<div class=\"calendar-body\">"+"<div class=\"calendar-menu\">"+"<div class=\"calendar-menu-year-inner\">"+"<span class=\"calendar-nav calendar-menu-prev\"></span>"+"<span><input class=\"calendar-menu-year\" type=\"text\"></input></span>"+"<span class=\"calendar-nav calendar-menu-next\"></span>"+"</div>"+"<div class=\"calendar-menu-month-inner\">"+"</div>"+"</div>"+"</div>");
$(_7).bind("_resize",function(e,_8){
if($(this).hasClass("easyui-fluid")||_8){
_1(_7);
}
return false;
});
};
function _9(_a){
var _b=$.data(_a,"calendar").options;
var _c=$(_a).find(".calendar-menu");
_c.find(".calendar-menu-year").unbind(".calendar").bind("keypress.calendar",function(e){
if(e.keyCode==13){
_d(true);
}
});
$(_a).unbind(".calendar").bind("mouseover.calendar",function(e){
var t=_e(e.target);
if(t.hasClass("calendar-nav")||t.hasClass("calendar-text")||(t.hasClass("calendar-day")&&!t.hasClass("calendar-disabled"))){
t.addClass("calendar-nav-hover");
}
}).bind("mouseout.calendar",function(e){
var t=_e(e.target);
if(t.hasClass("calendar-nav")||t.hasClass("calendar-text")||(t.hasClass("calendar-day")&&!t.hasClass("calendar-disabled"))){
t.removeClass("calendar-nav-hover");
}
}).bind("click.calendar",function(e){
var t=_e(e.target);
if(t.hasClass("calendar-menu-next")||t.hasClass("calendar-nextyear")){
_f(1);
}else{
if(t.hasClass("calendar-menu-prev")||t.hasClass("calendar-prevyear")){
_f(-1);
}else{
if(t.hasClass("calendar-menu-month")){
_c.find(".calendar-selected").removeClass("calendar-selected");
t.addClass("calendar-selected");
_d(true);
}else{
if(t.hasClass("calendar-prevmonth")){
_10(-1);
}else{
if(t.hasClass("calendar-nextmonth")){
_10(1);
}else{
if(t.hasClass("calendar-text")){
if(_c.is(":visible")){
_c.hide();
}else{
_5(_a);
}
}else{
if(t.hasClass("calendar-day")){
if(t.hasClass("calendar-disabled")){
return;
}
var _11=_b.current;
t.closest("div.calendar-body").find(".calendar-selected").removeClass("calendar-selected");
t.addClass("calendar-selected");
var _12=t.attr("abbr").split(",");
var y=parseInt(_12[0]);
var m=parseInt(_12[1]);
var d=parseInt(_12[2]);
_b.current=new Date(y,m-1,d);
_b.onSelect.call(_a,_b.current);
if(!_11||_11.getTime()!=_b.current.getTime()){
_b.onChange.call(_a,_b.current,_11);
}
if(_b.year!=y||_b.month!=m){
_b.year=y;
_b.month=m;
_19(_a);
}
}
}
}
}
}
}
}
});
function _e(t){
var day=$(t).closest(".calendar-day");
if(day.length){
return day;
}else{
return $(t);
}
};
function _d(_13){
var _14=$(_a).find(".calendar-menu");
var _15=_14.find(".calendar-menu-year").val();
var _16=_14.find(".calendar-selected").attr("abbr");
if(!isNaN(_15)){
_b.year=parseInt(_15);
_b.month=parseInt(_16);
_19(_a);
}
if(_13){
_14.hide();
}
};
function _f(_17){
_b.year+=_17;
_19(_a);
_c.find(".calendar-menu-year").val(_b.year);
};
function _10(_18){
_b.month+=_18;
if(_b.month>12){
_b.year++;
_b.month=1;
}else{
if(_b.month<1){
_b.year--;
_b.month=12;
}
}
_19(_a);
_c.find("td.calendar-selected").removeClass("calendar-selected");
_c.find("td:eq("+(_b.month-1)+")").addClass("calendar-selected");
};
};
function _5(_1a){
var _1b=$.data(_1a,"calendar").options;
$(_1a).find(".calendar-menu").show();
if($(_1a).find(".calendar-menu-month-inner").is(":empty")){
$(_1a).find(".calendar-menu-month-inner").empty();
var t=$("<table class=\"calendar-mtable\"></table>").appendTo($(_1a).find(".calendar-menu-month-inner"));
var idx=0;
for(var i=0;i<3;i++){
var tr=$("<tr></tr>").appendTo(t);
for(var j=0;j<4;j++){
$("<td class=\"calendar-nav calendar-menu-month\"></td>").html(_1b.months[idx++]).attr("abbr",idx).appendTo(tr);
}
}
}
var _1c=$(_1a).find(".calendar-body");
var _1d=$(_1a).find(".calendar-menu");
var _1e=_1d.find(".calendar-menu-year-inner");
var _1f=_1d.find(".calendar-menu-month-inner");
_1e.find("input").val(_1b.year).focus();
_1f.find("td.calendar-selected").removeClass("calendar-selected");
_1f.find("td:eq("+(_1b.month-1)+")").addClass("calendar-selected");
_1d._outerWidth(_1c._outerWidth());
_1d._outerHeight(_1c._outerHeight());
_1f._outerHeight(_1d.height()-_1e._outerHeight());
};
function _20(_21,_22,_23){
var _24=$.data(_21,"calendar").options;
var _25=[];
var _26=new Date(_22,_23,0).getDate();
for(var i=1;i<=_26;i++){
_25.push([_22,_23,i]);
}
var _27=[],_28=[];
var _29=-1;
while(_25.length>0){
var _2a=_25.shift();
_28.push(_2a);
var day=new Date(_2a[0],_2a[1]-1,_2a[2]).getDay();
if(_29==day){
day=0;
}else{
if(day==(_24.firstDay==0?7:_24.firstDay)-1){
_27.push(_28);
_28=[];
}
}
_29=day;
}
if(_28.length){
_27.push(_28);
}
var _2b=_27[0];
if(_2b.length<7){
while(_2b.length<7){
var _2c=_2b[0];
var _2a=new Date(_2c[0],_2c[1]-1,_2c[2]-1);
_2b.unshift([_2a.getFullYear(),_2a.getMonth()+1,_2a.getDate()]);
}
}else{
var _2c=_2b[0];
var _28=[];
for(var i=1;i<=7;i++){
var _2a=new Date(_2c[0],_2c[1]-1,_2c[2]-i);
_28.unshift([_2a.getFullYear(),_2a.getMonth()+1,_2a.getDate()]);
}
_27.unshift(_28);
}
var _2d=_27[_27.length-1];
while(_2d.length<7){
var _2e=_2d[_2d.length-1];
var _2a=new Date(_2e[0],_2e[1]-1,_2e[2]+1);
_2d.push([_2a.getFullYear(),_2a.getMonth()+1,_2a.getDate()]);
}
if(_27.length<6){
var _2e=_2d[_2d.length-1];
var _28=[];
for(var i=1;i<=7;i++){
var _2a=new Date(_2e[0],_2e[1]-1,_2e[2]+i);
_28.push([_2a.getFullYear(),_2a.getMonth()+1,_2a.getDate()]);
}
_27.push(_28);
}
return _27;
};
function _19(_2f){
var _30=$.data(_2f,"calendar").options;
if(_30.current&&!_30.validator.call(_2f,_30.current)){
_30.current=null;
}
var now=new Date();
var _31=now.getFullYear()+","+(now.getMonth()+1)+","+now.getDate();
var _32=_30.current?(_30.current.getFullYear()+","+(_30.current.getMonth()+1)+","+_30.current.getDate()):"";
var _33=6-_30.firstDay;
var _34=_33+1;
if(_33>=7){
_33-=7;
}
if(_34>=7){
_34-=7;
}
$(_2f).find(".calendar-title span").html(_30.months[_30.month-1]+" "+_30.year);
var _35=$(_2f).find("div.calendar-body");
_35.children("table").remove();
var _36=["<table class=\"calendar-dtable\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\">"];
_36.push("<thead><tr>");
for(var i=_30.firstDay;i<_30.weeks.length;i++){
_36.push("<th>"+_30.weeks[i]+"</th>");
}
for(var i=0;i<_30.firstDay;i++){
_36.push("<th>"+_30.weeks[i]+"</th>");
}
_36.push("</tr></thead>");
_36.push("<tbody>");
var _37=_20(_2f,_30.year,_30.month);
for(var i=0;i<_37.length;i++){
var _38=_37[i];
var cls="";
if(i==0){
cls="calendar-first";
}else{
if(i==_37.length-1){
cls="calendar-last";
}
}
_36.push("<tr class=\""+cls+"\">");
for(var j=0;j<_38.length;j++){
var day=_38[j];
var s=day[0]+","+day[1]+","+day[2];
var _39=new Date(day[0],parseInt(day[1])-1,day[2]);
var d=_30.formatter.call(_2f,_39);
var css=_30.styler.call(_2f,_39);
var _3a="";
var _3b="";
if(typeof css=="string"){
_3b=css;
}else{
if(css){
_3a=css["class"]||"";
_3b=css["style"]||"";
}
}
var cls="calendar-day";
if(!(_30.year==day[0]&&_30.month==day[1])){
cls+=" calendar-other-month";
}
if(s==_31){
cls+=" calendar-today";
}
if(s==_32){
cls+=" calendar-selected";
}
if(j==_33){
cls+=" calendar-saturday";
}else{
if(j==_34){
cls+=" calendar-sunday";
}
}
if(j==0){
cls+=" calendar-first";
}else{
if(j==_38.length-1){
cls+=" calendar-last";
}
}
cls+=" "+_3a;
if(!_30.validator.call(_2f,_39)){
cls+=" calendar-disabled";
}
_36.push("<td class=\""+cls+"\" abbr=\""+s+"\" style=\""+_3b+"\">"+d+"</td>");
}
_36.push("</tr>");
}
_36.push("</tbody>");
_36.push("</table>");
_35.append(_36.join(""));
_35.children("table.calendar-dtable").prependTo(_35);
_30.onNavigate.call(_2f,_30.year,_30.month);
};
$.fn.calendar=function(_3c,_3d){
if(typeof _3c=="string"){
return $.fn.calendar.methods[_3c](this,_3d);
}
_3c=_3c||{};
return this.each(function(){
var _3e=$.data(this,"calendar");
if(_3e){
$.extend(_3e.options,_3c);
}else{
_3e=$.data(this,"calendar",{options:$.extend({},$.fn.calendar.defaults,$.fn.calendar.parseOptions(this),_3c)});
_6(this);
}
if(_3e.options.border==false){
$(this).addClass("calendar-noborder");
}
_1(this);
_9(this);
_19(this);
$(this).find("div.calendar-menu").hide();
});
};
$.fn.calendar.methods={options:function(jq){
return $.data(jq[0],"calendar").options;
},resize:function(jq,_3f){
return jq.each(function(){
_1(this,_3f);
});
},moveTo:function(jq,_40){
return jq.each(function(){
if(!_40){
var now=new Date();
$(this).calendar({year:now.getFullYear(),month:now.getMonth()+1,current:_40});
return;
}
var _41=$(this).calendar("options");
if(_41.validator.call(this,_40)){
var _42=_41.current;
$(this).calendar({year:_40.getFullYear(),month:_40.getMonth()+1,current:_40});
if(!_42||_42.getTime()!=_40.getTime()){
_41.onChange.call(this,_41.current,_42);
}
}
});
}};
$.fn.calendar.parseOptions=function(_43){
var t=$(_43);
return $.extend({},$.parser.parseOptions(_43,[{firstDay:"number",fit:"boolean",border:"boolean"}]));
};
$.fn.calendar.defaults={width:180,height:180,fit:false,border:true,firstDay:0,weeks:["S","M","T","W","T","F","S"],months:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],year:new Date().getFullYear(),month:new Date().getMonth()+1,current:(function(){
var d=new Date();
return new Date(d.getFullYear(),d.getMonth(),d.getDate());
})(),formatter:function(_44){
return _44.getDate();
},styler:function(_45){
return "";
},validator:function(_46){
return true;
},onSelect:function(_47){
},onChange:function(_48,_49){
},onNavigate:function(_4a,_4b){
}};
})(jQuery);


/**
 * jQuery EasyUI 1.4.3
 * 
 * Copyright (c) 2009-2015 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL license: http://www.gnu.org/licenses/gpl.txt
 * To use it on other terms please contact us at info@jeasyui.com
 *
 */
(function($){
function _1(_2){
var _3=$.data(_2,"datebox");
var _4=_3.options;
$(_2).addClass("datebox-f").combo($.extend({},_4,{onShowPanel:function(){
_5(this);
_6(this);
_7(this);
_18(this,$(this).datebox("getText"),true);
_4.onShowPanel.call(this);
}}));
if(!_3.calendar){
var _8=$(_2).combo("panel").css("overflow","hidden");
_8.panel("options").onBeforeDestroy=function(){
var c=$(this).find(".calendar-shared");
if(c.length){
c.insertBefore(c[0].pholder);
}
};
var cc=$("<div class=\"datebox-calendar-inner\"></div>").prependTo(_8);
if(_4.sharedCalendar){
var c=$(_4.sharedCalendar);
if(!c[0].pholder){
c[0].pholder=$("<div class=\"calendar-pholder\" style=\"display:none\"></div>").insertAfter(c);
}
c.addClass("calendar-shared").appendTo(cc);
if(!c.hasClass("calendar")){
c.calendar();
}
_3.calendar=c;
}else{
_3.calendar=$("<div></div>").appendTo(cc).calendar();
}
$.extend(_3.calendar.calendar("options"),{fit:true,border:false,onSelect:function(_9){
var _a=this.target;
var _b=$(_a).datebox("options");
_18(_a,_b.formatter.call(_a,_9));
$(_a).combo("hidePanel");
_b.onSelect.call(_a,_9);
}});
}
$(_2).combo("textbox").parent().addClass("datebox");
$(_2).datebox("initValue",_4.value);
function _5(_c){
var _d=$(_c).datebox("options");
var _e=$(_c).combo("panel");
_e.unbind(".datebox").bind("click.datebox",function(e){
if($(e.target).hasClass("datebox-button-a")){
var _f=parseInt($(e.target).attr("datebox-button-index"));
_d.buttons[_f].handler.call(e.target,_c);
}
});
};
function _6(_10){
var _11=$(_10).combo("panel");
if(_11.children("div.datebox-button").length){
return;
}
var _12=$("<div class=\"datebox-button\"><table cellspacing=\"0\" cellpadding=\"0\" style=\"width:100%\"><tr></tr></table></div>").appendTo(_11);
var tr=_12.find("tr");
for(var i=0;i<_4.buttons.length;i++){
var td=$("<td></td>").appendTo(tr);
var btn=_4.buttons[i];
var t=$("<a class=\"datebox-button-a\" href=\"javascript:void(0)\"></a>").html($.isFunction(btn.text)?btn.text(_10):btn.text).appendTo(td);
t.attr("datebox-button-index",i);
}
tr.find("td").css("width",(100/_4.buttons.length)+"%");
};
function _7(_13){
var _14=$(_13).combo("panel");
var cc=_14.children("div.datebox-calendar-inner");
_14.children()._outerWidth(_14.width());
_3.calendar.appendTo(cc);
_3.calendar[0].target=_13;
if(_4.panelHeight!="auto"){
var _15=_14.height();
_14.children().not(cc).each(function(){
_15-=$(this).outerHeight();
});
cc._outerHeight(_15);
}
_3.calendar.calendar("resize");
};
};
function _16(_17,q){
_18(_17,q,true);
};
function _19(_1a){
var _1b=$.data(_1a,"datebox");
var _1c=_1b.options;
var _1d=_1b.calendar.calendar("options").current;
if(_1d){
_18(_1a,_1c.formatter.call(_1a,_1d));
$(_1a).combo("hidePanel");
}
};
function _18(_1e,_1f,_20){
var _21=$.data(_1e,"datebox");
var _22=_21.options;
var _23=_21.calendar;
_23.calendar("moveTo",_22.parser.call(_1e,_1f));
if(_20){
$(_1e).combo("setValue",_1f);
}else{
if(_1f){
_1f=_22.formatter.call(_1e,_23.calendar("options").current);
}
$(_1e).combo("setText",_1f).combo("setValue",_1f);
}
};
$.fn.datebox=function(_24,_25){
if(typeof _24=="string"){
var _26=$.fn.datebox.methods[_24];
if(_26){
return _26(this,_25);
}else{
return this.combo(_24,_25);
}
}
_24=_24||{};
return this.each(function(){
var _27=$.data(this,"datebox");
if(_27){
$.extend(_27.options,_24);
}else{
$.data(this,"datebox",{options:$.extend({},$.fn.datebox.defaults,$.fn.datebox.parseOptions(this),_24)});
}
_1(this);
});
};
$.fn.datebox.methods={options:function(jq){
var _28=jq.combo("options");
return $.extend($.data(jq[0],"datebox").options,{width:_28.width,height:_28.height,originalValue:_28.originalValue,disabled:_28.disabled,readonly:_28.readonly});
},cloneFrom:function(jq,_29){
return jq.each(function(){
$(this).combo("cloneFrom",_29);
$.data(this,"datebox",{options:$.extend(true,{},$(_29).datebox("options")),calendar:$(_29).datebox("calendar")});
$(this).addClass("datebox-f");
});
},calendar:function(jq){
return $.data(jq[0],"datebox").calendar;
},initValue:function(jq,_2a){
return jq.each(function(){
var _2b=$(this).datebox("options");
var _2c=_2b.value;
if(_2c){
_2c=_2b.formatter.call(this,_2b.parser.call(this,_2c));
}
$(this).combo("initValue",_2c).combo("setText",_2c);
});
},setValue:function(jq,_2d){
return jq.each(function(){
_18(this,_2d);
});
},reset:function(jq){
return jq.each(function(){
var _2e=$(this).datebox("options");
$(this).datebox("setValue",_2e.originalValue);
});
}};
$.fn.datebox.parseOptions=function(_2f){
return $.extend({},$.fn.combo.parseOptions(_2f),$.parser.parseOptions(_2f,["sharedCalendar"]));
};
$.fn.datebox.defaults=$.extend({},$.fn.combo.defaults,{panelWidth:180,panelHeight:"auto",sharedCalendar:null,keyHandler:{up:function(e){
},down:function(e){
},left:function(e){
},right:function(e){
},enter:function(e){
_19(this);
},query:function(q,e){
_16(this,q);
}},currentText:"Today",closeText:"Close",okText:"Ok",buttons:[{text:function(_30){
return $(_30).datebox("options").currentText;
},handler:function(_31){
var now=new Date();
$(_31).datebox("calendar").calendar({year:now.getFullYear(),month:now.getMonth()+1,current:new Date(now.getFullYear(),now.getMonth(),now.getDate())});
_19(_31);
}},{text:function(_32){
return $(_32).datebox("options").closeText;
},handler:function(_33){
$(this).closest("div.combo-panel").panel("close");
}}],formatter:function(_34){
var y=_34.getFullYear();
var m=_34.getMonth()+1;
var d=_34.getDate();
return (m<10?("0"+m):m)+"/"+(d<10?("0"+d):d)+"/"+y;
},parser:function(s){
if(!s){
return new Date();
}
var ss=s.split("/");
var m=parseInt(ss[0],10);
var d=parseInt(ss[1],10);
var y=parseInt(ss[2],10);
if(!isNaN(y)&&!isNaN(m)&&!isNaN(d)){
return new Date(y,m-1,d);
}else{
return new Date();
}
},onSelect:function(_35){
}});
})(jQuery);


/**
 * jQuery EasyUI 1.4.3
 * 
 * Copyright (c) 2009-2015 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL license: http://www.gnu.org/licenses/gpl.txt
 * To use it on other terms please contact us at info@jeasyui.com
 *
 */
(function($){
function _1(_2){
var _3=$.data(_2,"spinner");
var _4=_3.options;
var _5=$.extend(true,[],_4.icons);
_5.push({iconCls:"spinner-arrow",handler:function(e){
_6(e);
}});
$(_2).addClass("spinner-f").textbox($.extend({},_4,{icons:_5}));
var _7=$(_2).textbox("getIcon",_5.length-1);
_7.append("<a href=\"javascript:void(0)\" class=\"spinner-arrow-up\" tabindex=\"-1\"></a>");
_7.append("<a href=\"javascript:void(0)\" class=\"spinner-arrow-down\" tabindex=\"-1\"></a>");
$(_2).attr("spinnerName",$(_2).attr("textboxName"));
_3.spinner=$(_2).next();
_3.spinner.addClass("spinner");
};
function _6(e){
var _8=e.data.target;
var _9=$(_8).spinner("options");
var up=$(e.target).closest("a.spinner-arrow-up");
if(up.length){
_9.spin.call(_8,false);
_9.onSpinUp.call(_8);
$(_8).spinner("validate");
}
var _a=$(e.target).closest("a.spinner-arrow-down");
if(_a.length){
_9.spin.call(_8,true);
_9.onSpinDown.call(_8);
$(_8).spinner("validate");
}
};
$.fn.spinner=function(_b,_c){
if(typeof _b=="string"){
var _d=$.fn.spinner.methods[_b];
if(_d){
return _d(this,_c);
}else{
return this.textbox(_b,_c);
}
}
_b=_b||{};
return this.each(function(){
var _e=$.data(this,"spinner");
if(_e){
$.extend(_e.options,_b);
}else{
_e=$.data(this,"spinner",{options:$.extend({},$.fn.spinner.defaults,$.fn.spinner.parseOptions(this),_b)});
}
_1(this);
});
};
$.fn.spinner.methods={options:function(jq){
var _f=jq.textbox("options");
return $.extend($.data(jq[0],"spinner").options,{width:_f.width,value:_f.value,originalValue:_f.originalValue,disabled:_f.disabled,readonly:_f.readonly});
}};
$.fn.spinner.parseOptions=function(_10){
return $.extend({},$.fn.textbox.parseOptions(_10),$.parser.parseOptions(_10,["min","max",{increment:"number"}]));
};
$.fn.spinner.defaults=$.extend({},$.fn.textbox.defaults,{min:null,max:null,increment:1,spin:function(_11){
},onSpinUp:function(){
},onSpinDown:function(){
}});
})(jQuery);


/**
 * jQuery EasyUI 1.4.3
 * 
 * Copyright (c) 2009-2015 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL license: http://www.gnu.org/licenses/gpl.txt
 * To use it on other terms please contact us at info@jeasyui.com
 *
 */
(function($){
function _1(_2){
var _3=0;
if(typeof _2.selectionStart=="number"){
_3=_2.selectionStart;
}else{
if(_2.createTextRange){
var _4=_2.createTextRange();
var s=document.selection.createRange();
s.setEndPoint("StartToStart",_4);
_3=s.text.length;
}
}
return _3;
};
function _5(_6,_7,_8){
if(_6.setSelectionRange){
_6.setSelectionRange(_7,_8);
}else{
if(_6.createTextRange){
var _9=_6.createTextRange();
_9.collapse();
_9.moveEnd("character",_8);
_9.moveStart("character",_7);
_9.select();
}
}
};
function _a(_b){
var _c=$.data(_b,"timespinner").options;
$(_b).addClass("timespinner-f").spinner(_c);
var _d=_c.formatter.call(_b,_c.parser.call(_b,_c.value));
$(_b).timespinner("initValue",_d);
};
function _e(e){
var _f=e.data.target;
var _10=$.data(_f,"timespinner").options;
var _11=_1(this);
for(var i=0;i<_10.selections.length;i++){
var _12=_10.selections[i];
if(_11>=_12[0]&&_11<=_12[1]){
_13(_f,i);
return;
}
}
};
function _13(_14,_15){
var _16=$.data(_14,"timespinner").options;
if(_15!=undefined){
_16.highlight=_15;
}
var _17=_16.selections[_16.highlight];
if(_17){
var tb=$(_14).timespinner("textbox");
_5(tb[0],_17[0],_17[1]);
tb.focus();
}
};
function _18(_19,_1a){
var _1b=$.data(_19,"timespinner").options;
var _1a=_1b.parser.call(_19,_1a);
var _1c=_1b.formatter.call(_19,_1a);
$(_19).spinner("setValue",_1c);
};
function _1d(_1e,_1f){
var _20=$.data(_1e,"timespinner").options;
var s=$(_1e).timespinner("getValue");
var _21=_20.selections[_20.highlight];
var s1=s.substring(0,_21[0]);
var s2=s.substring(_21[0],_21[1]);
var s3=s.substring(_21[1]);
var v=s1+((parseInt(s2)||0)+_20.increment*(_1f?-1:1))+s3;
$(_1e).timespinner("setValue",v);
_13(_1e);
};
$.fn.timespinner=function(_22,_23){
if(typeof _22=="string"){
var _24=$.fn.timespinner.methods[_22];
if(_24){
return _24(this,_23);
}else{
return this.spinner(_22,_23);
}
}
_22=_22||{};
return this.each(function(){
var _25=$.data(this,"timespinner");
if(_25){
$.extend(_25.options,_22);
}else{
$.data(this,"timespinner",{options:$.extend({},$.fn.timespinner.defaults,$.fn.timespinner.parseOptions(this),_22)});
}
_a(this);
});
};
$.fn.timespinner.methods={options:function(jq){
var _26=jq.data("spinner")?jq.spinner("options"):{};
return $.extend($.data(jq[0],"timespinner").options,{width:_26.width,value:_26.value,originalValue:_26.originalValue,disabled:_26.disabled,readonly:_26.readonly});
},setValue:function(jq,_27){
return jq.each(function(){
_18(this,_27);
});
},getHours:function(jq){
var _28=$.data(jq[0],"timespinner").options;
var vv=jq.timespinner("getValue").split(_28.separator);
return parseInt(vv[0],10);
},getMinutes:function(jq){
var _29=$.data(jq[0],"timespinner").options;
var vv=jq.timespinner("getValue").split(_29.separator);
return parseInt(vv[1],10);
},getSeconds:function(jq){
var _2a=$.data(jq[0],"timespinner").options;
var vv=jq.timespinner("getValue").split(_2a.separator);
return parseInt(vv[2],10)||0;
}};
$.fn.timespinner.parseOptions=function(_2b){
return $.extend({},$.fn.spinner.parseOptions(_2b),$.parser.parseOptions(_2b,["separator",{showSeconds:"boolean",highlight:"number"}]));
};
$.fn.timespinner.defaults=$.extend({},$.fn.spinner.defaults,{inputEvents:$.extend({},$.fn.spinner.defaults.inputEvents,{click:function(e){
_e.call(this,e);
},blur:function(e){
var t=$(e.data.target);
t.timespinner("setValue",t.timespinner("getText"));
},keydown:function(e){
if(e.keyCode==13){
var t=$(e.data.target);
t.timespinner("setValue",t.timespinner("getText"));
}
}}),formatter:function(_2c){
if(!_2c){
return "";
}
var _2d=$(this).timespinner("options");
var tt=[_2e(_2c.getHours()),_2e(_2c.getMinutes())];
if(_2d.showSeconds){
tt.push(_2e(_2c.getSeconds()));
}
return tt.join(_2d.separator);
function _2e(_2f){
return (_2f<10?"0":"")+_2f;
};
},parser:function(s){
var _30=$(this).timespinner("options");
var _31=_32(s);
if(_31){
var min=_32(_30.min);
var max=_32(_30.max);
if(min&&min>_31){
_31=min;
}
if(max&&max<_31){
_31=max;
}
}
return _31;
function _32(s){
if(!s){
return null;
}
var tt=s.split(_30.separator);
return new Date(1900,0,0,parseInt(tt[0],10)||0,parseInt(tt[1],10)||0,parseInt(tt[2],10)||0);
};
if(!s){
return null;
}
var tt=s.split(_30.separator);
return new Date(1900,0,0,parseInt(tt[0],10)||0,parseInt(tt[1],10)||0,parseInt(tt[2],10)||0);
},selections:[[0,2],[3,5],[6,8]],separator:":",showSeconds:false,highlight:0,spin:function(_33){
_1d(this,_33);
}});
})(jQuery);


/**
 * jQuery EasyUI 1.4.3
 * 
 * Copyright (c) 2009-2015 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL license: http://www.gnu.org/licenses/gpl.txt
 * To use it on other terms please contact us at info@jeasyui.com
 *
 */
(function($){
function _1(_2){
var _3=$.data(_2,"datetimebox");
var _4=_3.options;
$(_2).datebox($.extend({},_4,{onShowPanel:function(){
var _5=$(this).datetimebox("getValue");
_d(this,_5,true);
_4.onShowPanel.call(this);
},formatter:$.fn.datebox.defaults.formatter,parser:$.fn.datebox.defaults.parser}));
$(_2).removeClass("datebox-f").addClass("datetimebox-f");
$(_2).datebox("calendar").calendar({onSelect:function(_6){
_4.onSelect.call(this.target,_6);
}});
if(!_3.spinner){
var _7=$(_2).datebox("panel");
var p=$("<div style=\"padding:2px\"><input></div>").insertAfter(_7.children("div.datebox-calendar-inner"));
_3.spinner=p.children("input");
}
_3.spinner.timespinner({width:_4.spinnerWidth,showSeconds:_4.showSeconds,separator:_4.timeSeparator});
$(_2).datetimebox("initValue",_4.value);
};
function _8(_9){
var c=$(_9).datetimebox("calendar");
var t=$(_9).datetimebox("spinner");
var _a=c.calendar("options").current;
return new Date(_a.getFullYear(),_a.getMonth(),_a.getDate(),t.timespinner("getHours"),t.timespinner("getMinutes"),t.timespinner("getSeconds"));
};
function _b(_c,q){
_d(_c,q,true);
};
function _e(_f){
var _10=$.data(_f,"datetimebox").options;
var _11=_8(_f);
_d(_f,_10.formatter.call(_f,_11));
$(_f).combo("hidePanel");
};
function _d(_12,_13,_14){
var _15=$.data(_12,"datetimebox").options;
$(_12).combo("setValue",_13);
if(!_14){
if(_13){
var _16=_15.parser.call(_12,_13);
$(_12).combo("setText",_15.formatter.call(_12,_16));
$(_12).combo("setValue",_15.formatter.call(_12,_16));
}else{
$(_12).combo("setText",_13);
}
}
var _16=_15.parser.call(_12,_13);
$(_12).datetimebox("calendar").calendar("moveTo",_16);
$(_12).datetimebox("spinner").timespinner("setValue",_17(_16));
function _17(_18){
function _19(_1a){
return (_1a<10?"0":"")+_1a;
};
var tt=[_19(_18.getHours()),_19(_18.getMinutes())];
if(_15.showSeconds){
tt.push(_19(_18.getSeconds()));
}
return tt.join($(_12).datetimebox("spinner").timespinner("options").separator);
};
};
$.fn.datetimebox=function(_1b,_1c){
if(typeof _1b=="string"){
var _1d=$.fn.datetimebox.methods[_1b];
if(_1d){
return _1d(this,_1c);
}else{
return this.datebox(_1b,_1c);
}
}
_1b=_1b||{};
return this.each(function(){
var _1e=$.data(this,"datetimebox");
if(_1e){
$.extend(_1e.options,_1b);
}else{
$.data(this,"datetimebox",{options:$.extend({},$.fn.datetimebox.defaults,$.fn.datetimebox.parseOptions(this),_1b)});
}
_1(this);
});
};
$.fn.datetimebox.methods={options:function(jq){
var _1f=jq.datebox("options");
return $.extend($.data(jq[0],"datetimebox").options,{originalValue:_1f.originalValue,disabled:_1f.disabled,readonly:_1f.readonly});
},cloneFrom:function(jq,_20){
return jq.each(function(){
$(this).datebox("cloneFrom",_20);
$.data(this,"datetimebox",{options:$.extend(true,{},$(_20).datetimebox("options")),spinner:$(_20).datetimebox("spinner")});
$(this).removeClass("datebox-f").addClass("datetimebox-f");
});
},spinner:function(jq){
return $.data(jq[0],"datetimebox").spinner;
},initValue:function(jq,_21){
return jq.each(function(){
var _22=$(this).datetimebox("options");
var _23=_22.value;
if(_23){
_23=_22.formatter.call(this,_22.parser.call(this,_23));
}
$(this).combo("initValue",_23).combo("setText",_23);
});
},setValue:function(jq,_24){
return jq.each(function(){
_d(this,_24);
});
},reset:function(jq){
return jq.each(function(){
var _25=$(this).datetimebox("options");
$(this).datetimebox("setValue",_25.originalValue);
});
}};
$.fn.datetimebox.parseOptions=function(_26){
var t=$(_26);
return $.extend({},$.fn.datebox.parseOptions(_26),$.parser.parseOptions(_26,["timeSeparator","spinnerWidth",{showSeconds:"boolean"}]));
};
$.fn.datetimebox.defaults=$.extend({},$.fn.datebox.defaults,{spinnerWidth:"100%",showSeconds:true,timeSeparator:":",keyHandler:{up:function(e){
},down:function(e){
},left:function(e){
},right:function(e){
},enter:function(e){
_e(this);
},query:function(q,e){
_b(this,q);
}},buttons:[{text:function(_27){
return $(_27).datetimebox("options").currentText;
},handler:function(_28){
var _29=$(_28).datetimebox("options");
_d(_28,_29.formatter.call(_28,new Date()));
$(_28).datetimebox("hidePanel");
}},{text:function(_2a){
return $(_2a).datetimebox("options").okText;
},handler:function(_2b){
_e(_2b);
}},{text:function(_2c){
return $(_2c).datetimebox("options").closeText;
},handler:function(_2d){
$(_2d).datetimebox("hidePanel");
}}],formatter:function(_2e){
var h=_2e.getHours();
var M=_2e.getMinutes();
var s=_2e.getSeconds();
function _2f(_30){
return (_30<10?"0":"")+_30;
};
var _31=$(this).datetimebox("spinner").timespinner("options").separator;
var r=$.fn.datebox.defaults.formatter(_2e)+" "+_2f(h)+_31+_2f(M);
if($(this).datetimebox("options").showSeconds){
r+=_31+_2f(s);
}
return r;
},parser:function(s){
if($.trim(s)==""){
return new Date();
}
var dt=s.split(" ");
var d=$.fn.datebox.defaults.parser(dt[0]);
if(dt.length<2){
return d;
}
var _32=$(this).datetimebox("spinner").timespinner("options").separator;
var tt=dt[1].split(_32);
var _33=parseInt(tt[0],10)||0;
var _34=parseInt(tt[1],10)||0;
var _35=parseInt(tt[2],10)||0;
return new Date(d.getFullYear(),d.getMonth(),d.getDate(),_33,_34,_35);
}});
})(jQuery);


/**
 * jQuery EasyUI 1.4.3
 * 
 * Copyright (c) 2009-2015 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL license: http://www.gnu.org/licenses/gpl.txt
 * To use it on other terms please contact us at info@jeasyui.com
 *
 */
(function($){
function _1(_2,_3){
var _4=$.data(_2,"window");
if(_3){
if(_3.left!=null){
_4.options.left=_3.left;
}
if(_3.top!=null){
_4.options.top=_3.top;
}
}
$(_2).panel("move",_4.options);
if(_4.shadow){
_4.shadow.css({left:_4.options.left,top:_4.options.top});
}
};
function _5(_6,_7){
var _8=$.data(_6,"window").options;
var pp=$(_6).window("panel");
var _9=pp._outerWidth();
if(_8.inline){
var _a=pp.parent();
_8.left=Math.ceil((_a.width()-_9)/2+_a.scrollLeft());
}else{
_8.left=Math.ceil(($(window)._outerWidth()-_9)/2+$(document).scrollLeft());
}
if(_7){
_1(_6);
}
};
function _b(_c,_d){
var _e=$.data(_c,"window").options;
var pp=$(_c).window("panel");
var _f=pp._outerHeight();
if(_e.inline){
var _10=pp.parent();
_e.top=Math.ceil((_10.height()-_f)/2+_10.scrollTop());
}else{
_e.top=Math.ceil(($(window)._outerHeight()-_f)/2+$(document).scrollTop());
}
if(_d){
_1(_c);
}
};
function _11(_12){
var _13=$.data(_12,"window");
var _14=_13.options;
var win=$(_12).panel($.extend({},_13.options,{border:false,doSize:true,closed:true,cls:"window",headerCls:"window-header",bodyCls:"window-body "+(_14.noheader?"window-body-noheader":""),onBeforeDestroy:function(){
if(_14.onBeforeDestroy.call(_12)==false){
return false;
}
if(_13.shadow){
_13.shadow.remove();
}
if(_13.mask){
_13.mask.remove();
}
},onClose:function(){
if(_13.shadow){
_13.shadow.hide();
}
if(_13.mask){
_13.mask.hide();
}
_14.onClose.call(_12);
},onOpen:function(){
if(_13.mask){
_13.mask.css($.extend({display:"block",zIndex:$.fn.window.defaults.zIndex++},$.fn.window.getMaskSize(_12)));
}
if(_13.shadow){
_13.shadow.css({display:"block",zIndex:$.fn.window.defaults.zIndex++,left:_14.left,top:_14.top,width:_13.window._outerWidth(),height:_13.window._outerHeight()});
}
_13.window.css("z-index",$.fn.window.defaults.zIndex++);
_14.onOpen.call(_12);
},onResize:function(_15,_16){
var _17=$(this).panel("options");
$.extend(_14,{width:_17.width,height:_17.height,left:_17.left,top:_17.top});
if(_13.shadow){
_13.shadow.css({left:_14.left,top:_14.top,width:_13.window._outerWidth(),height:_13.window._outerHeight()});
}
_14.onResize.call(_12,_15,_16);
},onMinimize:function(){
if(_13.shadow){
_13.shadow.hide();
}
if(_13.mask){
_13.mask.hide();
}
_13.options.onMinimize.call(_12);
},onBeforeCollapse:function(){
if(_14.onBeforeCollapse.call(_12)==false){
return false;
}
if(_13.shadow){
_13.shadow.hide();
}
},onExpand:function(){
if(_13.shadow){
_13.shadow.show();
}
_14.onExpand.call(_12);
}}));
_13.window=win.panel("panel");
if(_13.mask){
_13.mask.remove();
}
if(_14.modal==true){
_13.mask=$("<div class=\"window-mask\" style=\"display:none\"></div>").insertAfter(_13.window);
}
if(_13.shadow){
_13.shadow.remove();
}
if(_14.shadow==true){
_13.shadow=$("<div class=\"window-shadow\" style=\"display:none\"></div>").insertAfter(_13.window);
}
if(_14.left==null){
_5(_12);
}
if(_14.top==null){
_b(_12);
}
_1(_12);
if(!_14.closed){
win.window("open");
}
};
function _18(_19){
var _1a=$.data(_19,"window");
_1a.window.draggable({handle:">div.panel-header>div.panel-title",disabled:_1a.options.draggable==false,onStartDrag:function(e){
if(_1a.mask){
_1a.mask.css("z-index",$.fn.window.defaults.zIndex++);
}
if(_1a.shadow){
_1a.shadow.css("z-index",$.fn.window.defaults.zIndex++);
}
_1a.window.css("z-index",$.fn.window.defaults.zIndex++);
if(!_1a.proxy){
_1a.proxy=$("<div class=\"window-proxy\"></div>").insertAfter(_1a.window);
}
_1a.proxy.css({display:"none",zIndex:$.fn.window.defaults.zIndex++,left:e.data.left,top:e.data.top});
_1a.proxy._outerWidth(_1a.window._outerWidth());
_1a.proxy._outerHeight(_1a.window._outerHeight());
setTimeout(function(){
if(_1a.proxy){
_1a.proxy.show();
}
},500);
},onDrag:function(e){
_1a.proxy.css({display:"block",left:e.data.left,top:e.data.top});
return false;
},onStopDrag:function(e){
_1a.options.left=e.data.left;
_1a.options.top=e.data.top;
$(_19).window("move");
_1a.proxy.remove();
_1a.proxy=null;
}});
_1a.window.resizable({disabled:_1a.options.resizable==false,onStartResize:function(e){
if(_1a.pmask){
_1a.pmask.remove();
}
_1a.pmask=$("<div class=\"window-proxy-mask\"></div>").insertAfter(_1a.window);
_1a.pmask.css({zIndex:$.fn.window.defaults.zIndex++,left:e.data.left,top:e.data.top,width:_1a.window._outerWidth(),height:_1a.window._outerHeight()});
if(_1a.proxy){
_1a.proxy.remove();
}
_1a.proxy=$("<div class=\"window-proxy\"></div>").insertAfter(_1a.window);
_1a.proxy.css({zIndex:$.fn.window.defaults.zIndex++,left:e.data.left,top:e.data.top});
_1a.proxy._outerWidth(e.data.width)._outerHeight(e.data.height);
},onResize:function(e){
_1a.proxy.css({left:e.data.left,top:e.data.top});
_1a.proxy._outerWidth(e.data.width);
_1a.proxy._outerHeight(e.data.height);
return false;
},onStopResize:function(e){
$(_19).window("resize",e.data);
_1a.pmask.remove();
_1a.pmask=null;
_1a.proxy.remove();
_1a.proxy=null;
}});
};
$(window).resize(function(){
$("body>div.window-mask").css({width:$(window)._outerWidth(),height:$(window)._outerHeight()});
setTimeout(function(){
$("body>div.window-mask").css($.fn.window.getMaskSize());
},50);
});
$.fn.window=function(_1b,_1c){
if(typeof _1b=="string"){
var _1d=$.fn.window.methods[_1b];
if(_1d){
return _1d(this,_1c);
}else{
return this.panel(_1b,_1c);
}
}
_1b=_1b||{};
return this.each(function(){
var _1e=$.data(this,"window");
if(_1e){
$.extend(_1e.options,_1b);
}else{
_1e=$.data(this,"window",{options:$.extend({},$.fn.window.defaults,$.fn.window.parseOptions(this),_1b)});
if(!_1e.options.inline){
document.body.appendChild(this);
}
}
_11(this);
_18(this);
});
};
$.fn.window.methods={options:function(jq){
var _1f=jq.panel("options");
var _20=$.data(jq[0],"window").options;
return $.extend(_20,{closed:_1f.closed,collapsed:_1f.collapsed,minimized:_1f.minimized,maximized:_1f.maximized});
},window:function(jq){
return $.data(jq[0],"window").window;
},move:function(jq,_21){
return jq.each(function(){
_1(this,_21);
});
},hcenter:function(jq){
return jq.each(function(){
_5(this,true);
});
},vcenter:function(jq){
return jq.each(function(){
_b(this,true);
});
},center:function(jq){
return jq.each(function(){
_5(this);
_b(this);
_1(this);
});
}};
$.fn.window.getMaskSize=function(_22){
var _23=$(_22).data("window");
var _24=(_23&&_23.options.inline);
return {width:(_24?"100%":$(document).width()),height:(_24?"100%":$(document).height())};
};
$.fn.window.parseOptions=function(_25){
return $.extend({},$.fn.panel.parseOptions(_25),$.parser.parseOptions(_25,[{draggable:"boolean",resizable:"boolean",shadow:"boolean",modal:"boolean",inline:"boolean"}]));
};
$.fn.window.defaults=$.extend({},$.fn.panel.defaults,{zIndex:9000,draggable:true,resizable:true,shadow:true,modal:false,inline:false,title:"New Window",collapsible:true,minimizable:true,maximizable:true,closable:true,closed:false});
})(jQuery);


/**
 * jQuery EasyUI 1.4.3
 * 
 * Copyright (c) 2009-2015 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL license: http://www.gnu.org/licenses/gpl.txt
 * To use it on other terms please contact us at info@jeasyui.com
 *
 */
(function($){
function _1(_2){
var _3=$.data(_2,"dialog").options;
_3.inited=false;
$(_2).window($.extend({},_3,{onResize:function(w,h){
if(_3.inited){
_b(this);
_3.onResize.call(this,w,h);
}
}}));
var _4=$(_2).window("window");
if(_3.toolbar){
if($.isArray(_3.toolbar)){
$(_2).siblings("div.dialog-toolbar").remove();
var _5=$("<div class=\"dialog-toolbar\"><table cellspacing=\"0\" cellpadding=\"0\"><tr></tr></table></div>").appendTo(_4);
var tr=_5.find("tr");
for(var i=0;i<_3.toolbar.length;i++){
var _6=_3.toolbar[i];
if(_6=="-"){
$("<td><div class=\"dialog-tool-separator\"></div></td>").appendTo(tr);
}else{
var td=$("<td></td>").appendTo(tr);
var _7=$("<a href=\"javascript:void(0)\"></a>").appendTo(td);
_7[0].onclick=eval(_6.handler||function(){
});
_7.linkbutton($.extend({},_6,{plain:true}));
}
}
}else{
$(_3.toolbar).addClass("dialog-toolbar").appendTo(_4);
$(_3.toolbar).show();
}
}else{
$(_2).siblings("div.dialog-toolbar").remove();
}
if(_3.buttons){
if($.isArray(_3.buttons)){
$(_2).siblings("div.dialog-button").remove();
var _8=$("<div class=\"dialog-button\"></div>").appendTo(_4);
for(var i=0;i<_3.buttons.length;i++){
var p=_3.buttons[i];
var _9=$("<a href=\"javascript:void(0)\"></a>").appendTo(_8);
if(p.handler){
_9[0].onclick=p.handler;
}
_9.linkbutton(p);
}
}else{
$(_3.buttons).addClass("dialog-button").appendTo(_4);
$(_3.buttons).show();
}
}else{
$(_2).siblings("div.dialog-button").remove();
}
_3.inited=true;
var _a=_3.closed;
_4.show();
$(_2).window("resize");
if(_a){
_4.hide();
}
};
function _b(_c,_d){
var t=$(_c);
var _e=t.dialog("options");
var _f=_e.noheader;
var tb=t.siblings(".dialog-toolbar");
var bb=t.siblings(".dialog-button");
tb.insertBefore(_c).css({position:"relative",borderTopWidth:(_f?1:0),top:(_f?tb.length:0)});
bb.insertAfter(_c).css({position:"relative",top:-1});
tb.add(bb)._outerWidth(t._outerWidth()).find(".easyui-fluid:visible").each(function(){
$(this).triggerHandler("_resize");
});
if(!isNaN(parseInt(_e.height))){
t._outerHeight(t._outerHeight()-tb._outerHeight()-bb._outerHeight());
}
var _10=$.data(_c,"window").shadow;
if(_10){
var cc=t.panel("panel");
_10.css({width:cc._outerWidth(),height:cc._outerHeight()});
}
};
$.fn.dialog=function(_11,_12){
if(typeof _11=="string"){
var _13=$.fn.dialog.methods[_11];
if(_13){
return _13(this,_12);
}else{
return this.window(_11,_12);
}
}
_11=_11||{};
return this.each(function(){
var _14=$.data(this,"dialog");
if(_14){
$.extend(_14.options,_11);
}else{
$.data(this,"dialog",{options:$.extend({},$.fn.dialog.defaults,$.fn.dialog.parseOptions(this),_11)});
}
_1(this);
});
};
$.fn.dialog.methods={options:function(jq){
var _15=$.data(jq[0],"dialog").options;
var _16=jq.panel("options");
$.extend(_15,{width:_16.width,height:_16.height,left:_16.left,top:_16.top,closed:_16.closed,collapsed:_16.collapsed,minimized:_16.minimized,maximized:_16.maximized});
return _15;
},dialog:function(jq){
return jq.window("window");
}};
$.fn.dialog.parseOptions=function(_17){
var t=$(_17);
return $.extend({},$.fn.window.parseOptions(_17),$.parser.parseOptions(_17,["toolbar","buttons"]),{toolbar:(t.children(".dialog-toolbar").length?t.children(".dialog-toolbar").removeClass("dialog-toolbar"):undefined),buttons:(t.children(".dialog-button").length?t.children(".dialog-button").removeClass("dialog-button"):undefined)});
};
$.fn.dialog.defaults=$.extend({},$.fn.window.defaults,{title:"New Dialog",collapsible:false,minimizable:false,maximizable:false,resizable:false,toolbar:null,buttons:null});
})(jQuery);


/**
 * jQuery EasyUI 1.4.3
 * 
 * Copyright (c) 2009-2015 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL license: http://www.gnu.org/licenses/gpl.txt
 * To use it on other terms please contact us at info@jeasyui.com
 *
 */
(function($){
function _1(_2,_3){
var _4=$.data(_2,"form").options;
$.extend(_4,_3||{});
var _5=$.extend({},_4.queryParams);
if(_4.onSubmit.call(_2,_5)==false){
return;
}
$(_2).find(".textbox-text:focus").blur();
var _6="easyui_frame_"+(new Date().getTime());
var _7=$("<iframe id="+_6+" name="+_6+"></iframe>").appendTo("body");
_7.attr("src",window.ActiveXObject?"javascript:false":"about:blank");
_7.css({position:"absolute",top:-1000,left:-1000});
_7.bind("load",cb);
_8(_5);
function _8(_9){
var _a=$(_2);
if(_4.url){
_a.attr("action",_4.url);
}
var t=_a.attr("target"),a=_a.attr("action");
_a.attr("target",_6);
var _b=$();
try{
for(var n in _9){
var _c=$("<input type=\"hidden\" name=\""+n+"\">").val(_9[n]).appendTo(_a);
_b=_b.add(_c);
}
_d();
_a[0].submit();
}
finally{
_a.attr("action",a);
t?_a.attr("target",t):_a.removeAttr("target");
_b.remove();
}
};
function _d(){
var f=$("#"+_6);
if(!f.length){
return;
}
try{
var s=f.contents()[0].readyState;
if(s&&s.toLowerCase()=="uninitialized"){
setTimeout(_d,100);
}
}
catch(e){
cb();
}
};
var _e=10;
function cb(){
var f=$("#"+_6);
if(!f.length){
return;
}
f.unbind();
var _f="";
try{
var _10=f.contents().find("body");
_f=_10.html();
if(_f==""){
if(--_e){
setTimeout(cb,100);
return;
}
}
var ta=_10.find(">textarea");
if(ta.length){
_f=ta.val();
}else{
var pre=_10.find(">pre");
if(pre.length){
_f=pre.html();
}
}
}
catch(e){
}
_4.success(_f);
setTimeout(function(){
f.unbind();
f.remove();
},100);
};
};
function _11(_12,_13){
var _14=$.data(_12,"form").options;
if(typeof _13=="string"){
var _15={};
if(_14.onBeforeLoad.call(_12,_15)==false){
return;
}
$.ajax({url:_13,data:_15,dataType:"json",success:function(_16){
_17(_16);
},error:function(){
_14.onLoadError.apply(_12,arguments);
}});
}else{
_17(_13);
}
function _17(_18){
var _19=$(_12);
for(var _1a in _18){
var val=_18[_1a];
if(!_1b(_1a,val)){
if(!_1c(_1a,val)){
_19.find("input[name=\""+_1a+"\"]").val(val);
_19.find("textarea[name=\""+_1a+"\"]").val(val);
_19.find("select[name=\""+_1a+"\"]").val(val);
}
}
}
_14.onLoadSuccess.call(_12,_18);
_19.form("validate");
};
function _1b(_1d,val){
var cc=$(_12).find("[switchbuttonName=\""+_1d+"\"]");
if(cc.length){
cc.switchbutton("uncheck");
cc.each(function(){
if(_1e($(this).switchbutton("options").value,val)){
$(this).switchbutton("check");
}
});
return true;
}
cc=$(_12).find("input[name=\""+_1d+"\"][type=radio], input[name=\""+_1d+"\"][type=checkbox]");
if(cc.length){
cc._propAttr("checked",false);
cc.each(function(){
if(_1e($(this).val(),val)){
$(this)._propAttr("checked",true);
}
});
return true;
}
return false;
};
function _1e(v,val){
if(v==String(val)||$.inArray(v,$.isArray(val)?val:[val])>=0){
return true;
}else{
return false;
}
};
function _1c(_1f,val){
var _20=$(_12).find("[textboxName=\""+_1f+"\"],[sliderName=\""+_1f+"\"]");
if(_20.length){
for(var i=0;i<_14.fieldTypes.length;i++){
var _21=_14.fieldTypes[i];
var _22=_20.data(_21);
if(_22){
if(_22.options.multiple||_22.options.range){
_20[_21]("setValues",val);
}else{
_20[_21]("setValue",val);
}
return true;
}
}
}
return false;
};
};
function _23(_24){
$("input,select,textarea",_24).each(function(){
var t=this.type,tag=this.tagName.toLowerCase();
if(t=="text"||t=="hidden"||t=="password"||tag=="textarea"){
this.value="";
}else{
if(t=="file"){
var _25=$(this);
if(!_25.hasClass("textbox-value")){
var _26=_25.clone().val("");
_26.insertAfter(_25);
if(_25.data("validatebox")){
_25.validatebox("destroy");
_26.validatebox();
}else{
_25.remove();
}
}
}else{
if(t=="checkbox"||t=="radio"){
this.checked=false;
}else{
if(tag=="select"){
this.selectedIndex=-1;
}
}
}
}
});
var _27=$(_24);
var _28=$.data(_24,"form").options;
for(var i=_28.fieldTypes.length-1;i>=0;i--){
var _29=_28.fieldTypes[i];
var _2a=_27.find("."+_29+"-f");
if(_2a.length&&_2a[_29]){
_2a[_29]("clear");
}
}
_27.form("validate");
};
function _2b(_2c){
_2c.reset();
var _2d=$(_2c);
var _2e=$.data(_2c,"form").options;
for(var i=_2e.fieldTypes.length-1;i>=0;i--){
var _2f=_2e.fieldTypes[i];
var _30=_2d.find("."+_2f+"-f");
if(_30.length&&_30[_2f]){
_30[_2f]("reset");
}
}
_2d.form("validate");
};
function _31(_32){
var _33=$.data(_32,"form").options;
$(_32).unbind(".form");
if(_33.ajax){
$(_32).bind("submit.form",function(){
setTimeout(function(){
_1(_32,_33);
},0);
return false;
});
}
$(_32).bind("_change.form",function(e,t){
_33.onChange.call(this,t);
}).bind("change.form",function(e){
var t=e.target;
if(!$(t).hasClass("textbox-text")){
_33.onChange.call(this,t);
}
});
_34(_32,_33.novalidate);
};
function _35(_36,_37){
_37=_37||{};
var _38=$.data(_36,"form");
if(_38){
$.extend(_38.options,_37);
}else{
$.data(_36,"form",{options:$.extend({},$.fn.form.defaults,$.fn.form.parseOptions(_36),_37)});
}
};
function _39(_3a){
if($.fn.validatebox){
var t=$(_3a);
t.find(".validatebox-text:not(:disabled)").validatebox("validate");
var _3b=t.find(".validatebox-invalid");
_3b.filter(":not(:disabled):first").focus();
return _3b.length==0;
}
return true;
};
function _34(_3c,_3d){
var _3e=$.data(_3c,"form").options;
_3e.novalidate=_3d;
$(_3c).find(".validatebox-text:not(:disabled)").validatebox(_3d?"disableValidation":"enableValidation");
};
$.fn.form=function(_3f,_40){
if(typeof _3f=="string"){
this.each(function(){
_35(this);
});
return $.fn.form.methods[_3f](this,_40);
}
return this.each(function(){
_35(this,_3f);
_31(this);
});
};
$.fn.form.methods={options:function(jq){
return $.data(jq[0],"form").options;
},submit:function(jq,_41){
return jq.each(function(){
_1(this,_41);
});
},load:function(jq,_42){
return jq.each(function(){
_11(this,_42);
});
},clear:function(jq){
return jq.each(function(){
_23(this);
});
},reset:function(jq){
return jq.each(function(){
_2b(this);
});
},validate:function(jq){
return _39(jq[0]);
},disableValidation:function(jq){
return jq.each(function(){
_34(this,true);
});
},enableValidation:function(jq){
return jq.each(function(){
_34(this,false);
});
}};
$.fn.form.parseOptions=function(_43){
var t=$(_43);
return $.extend({},$.parser.parseOptions(_43,[{ajax:"boolean"}]),{url:(t.attr("action")?t.attr("action"):undefined)});
};
$.fn.form.defaults={fieldTypes:["combobox","combotree","combogrid","datetimebox","datebox","combo","datetimespinner","timespinner","numberspinner","spinner","slider","searchbox","numberbox","textbox","switchbutton"],novalidate:false,ajax:true,url:null,queryParams:{},onSubmit:function(_44){
return $(this).form("validate");
},success:function(_45){
},onBeforeLoad:function(_46){
},onLoadSuccess:function(_47){
},onLoadError:function(){
},onChange:function(_48){
}};
})(jQuery);


/**
 * jQuery EasyUI 1.4.3
 * 
 * Copyright (c) 2009-2015 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL license: http://www.gnu.org/licenses/gpl.txt
 * To use it on other terms please contact us at info@jeasyui.com
 *
 */
(function($){
$(function(){
$(document).unbind(".menu").bind("mousedown.menu",function(e){
var m=$(e.target).closest("div.menu,div.combo-p");
if(m.length){
return;
}
$("body>div.menu-top:visible").not(".menu-inline").menu("hide");
_1($("body>div.menu:visible").not(".menu-inline"));
});
});
function _2(_3){
var _4=$.data(_3,"menu").options;
$(_3).addClass("menu-top");
_4.inline?$(_3).addClass("menu-inline"):$(_3).appendTo("body");
$(_3).bind("_resize",function(e,_5){
if($(this).hasClass("easyui-fluid")||_5){
$(_3).menu("resize",_3);
}
return false;
});
var _6=_7($(_3));
for(var i=0;i<_6.length;i++){
_8(_6[i]);
}
function _7(_9){
var _a=[];
_9.addClass("menu");
_a.push(_9);
if(!_9.hasClass("menu-content")){
_9.children("div").each(function(){
var _b=$(this).children("div");
if(_b.length){
_b.appendTo("body");
this.submenu=_b;
var mm=_7(_b);
_a=_a.concat(mm);
}
});
}
return _a;
};
function _8(_c){
var wh=$.parser.parseOptions(_c[0],["width","height"]);
_c[0].originalHeight=wh.height||0;
if(_c.hasClass("menu-content")){
_c[0].originalWidth=wh.width||_c._outerWidth();
}else{
_c[0].originalWidth=wh.width||0;
_c.children("div").each(function(){
var _d=$(this);
var _e=$.extend({},$.parser.parseOptions(this,["name","iconCls","href",{separator:"boolean"}]),{disabled:(_d.attr("disabled")?true:undefined)});
if(_e.separator){
_d.addClass("menu-sep");
}
if(!_d.hasClass("menu-sep")){
_d[0].itemName=_e.name||"";
_d[0].itemHref=_e.href||"";
var _f=_d.addClass("menu-item").html();
_d.empty().append($("<div class=\"menu-text\"></div>").html(_f));
if(_e.iconCls){
$("<div class=\"menu-icon\"></div>").addClass(_e.iconCls).appendTo(_d);
}
if(_e.disabled){
_10(_3,_d[0],true);
}
if(_d[0].submenu){
$("<div class=\"menu-rightarrow\"></div>").appendTo(_d);
}
_11(_3,_d);
}
});
$("<div class=\"menu-line\"></div>").prependTo(_c);
}
_12(_3,_c);
if(!_c.hasClass("menu-inline")){
_c.hide();
}
_13(_3,_c);
};
};
function _12(_14,_15){
var _16=$.data(_14,"menu").options;
var _17=_15.attr("style")||"";
_15.css({display:"block",left:-10000,height:"auto",overflow:"hidden"});
_15.find(".menu-item").each(function(){
$(this)._outerHeight(_16.itemHeight);
$(this).find(".menu-text").css({height:(_16.itemHeight-2)+"px",lineHeight:(_16.itemHeight-2)+"px"});
});
_15.removeClass("menu-noline").addClass(_16.noline?"menu-noline":"");
var _18=_15[0].originalWidth||"auto";
if(isNaN(parseInt(_18))){
_18=0;
_15.find("div.menu-text").each(function(){
if(_18<$(this)._outerWidth()){
_18=$(this)._outerWidth();
}
});
_18+=40;
}
var _19=_15.outerHeight();
var _1a=_15[0].originalHeight||"auto";
if(isNaN(parseInt(_1a))){
_1a=_19;
if(_15.hasClass("menu-top")&&_16.alignTo){
var at=$(_16.alignTo);
var h1=at.offset().top-$(document).scrollTop();
var h2=$(window)._outerHeight()+$(document).scrollTop()-at.offset().top-at._outerHeight();
_1a=Math.min(_1a,Math.max(h1,h2));
}else{
if(_1a>$(window)._outerHeight()){
_1a=$(window).height();
}
}
}
_15.attr("style",_17);
_15._size({fit:(_15[0]==_14?_16.fit:false),width:_18,minWidth:_16.minWidth,height:_1a});
_15.css("overflow",_15.outerHeight()<_19?"auto":"hidden");
_15.children("div.menu-line")._outerHeight(_19-2);
};
function _13(_1b,_1c){
if(_1c.hasClass("menu-inline")){
return;
}
var _1d=$.data(_1b,"menu");
_1c.unbind(".menu").bind("mouseenter.menu",function(){
if(_1d.timer){
clearTimeout(_1d.timer);
_1d.timer=null;
}
}).bind("mouseleave.menu",function(){
if(_1d.options.hideOnUnhover){
_1d.timer=setTimeout(function(){
_1e(_1b,$(_1b).hasClass("menu-inline"));
},_1d.options.duration);
}
});
};
function _11(_1f,_20){
if(!_20.hasClass("menu-item")){
return;
}
_20.unbind(".menu");
_20.bind("click.menu",function(){
if($(this).hasClass("menu-item-disabled")){
return;
}
if(!this.submenu){
_1e(_1f,$(_1f).hasClass("menu-inline"));
var _21=this.itemHref;
if(_21){
location.href=_21;
}
}
$(this).trigger("mouseenter");
var _22=$(_1f).menu("getItem",this);
$.data(_1f,"menu").options.onClick.call(_1f,_22);
}).bind("mouseenter.menu",function(e){
_20.siblings().each(function(){
if(this.submenu){
_1(this.submenu);
}
$(this).removeClass("menu-active");
});
_20.addClass("menu-active");
if($(this).hasClass("menu-item-disabled")){
_20.addClass("menu-active-disabled");
return;
}
var _23=_20[0].submenu;
if(_23){
$(_1f).menu("show",{menu:_23,parent:_20});
}
}).bind("mouseleave.menu",function(e){
_20.removeClass("menu-active menu-active-disabled");
var _24=_20[0].submenu;
if(_24){
if(e.pageX>=parseInt(_24.css("left"))){
_20.addClass("menu-active");
}else{
_1(_24);
}
}else{
_20.removeClass("menu-active");
}
});
};
function _1e(_25,_26){
var _27=$.data(_25,"menu");
if(_27){
if($(_25).is(":visible")){
_1($(_25));
if(_26){
$(_25).show();
}else{
_27.options.onHide.call(_25);
}
}
}
return false;
};
function _28(_29,_2a){
var _2b,top;
_2a=_2a||{};
var _2c=$(_2a.menu||_29);
$(_29).menu("resize",_2c[0]);
if(_2c.hasClass("menu-top")){
var _2d=$.data(_29,"menu").options;
$.extend(_2d,_2a);
_2b=_2d.left;
top=_2d.top;
if(_2d.alignTo){
var at=$(_2d.alignTo);
_2b=at.offset().left;
top=at.offset().top+at._outerHeight();
if(_2d.align=="right"){
_2b+=at.outerWidth()-_2c.outerWidth();
}
}
if(_2b+_2c.outerWidth()>$(window)._outerWidth()+$(document)._scrollLeft()){
_2b=$(window)._outerWidth()+$(document).scrollLeft()-_2c.outerWidth()-5;
}
if(_2b<0){
_2b=0;
}
top=_2e(top,_2d.alignTo);
}else{
var _2f=_2a.parent;
_2b=_2f.offset().left+_2f.outerWidth()-2;
if(_2b+_2c.outerWidth()+5>$(window)._outerWidth()+$(document).scrollLeft()){
_2b=_2f.offset().left-_2c.outerWidth()+2;
}
top=_2e(_2f.offset().top-3);
}
function _2e(top,_30){
if(top+_2c.outerHeight()>$(window)._outerHeight()+$(document).scrollTop()){
if(_30){
top=$(_30).offset().top-_2c._outerHeight();
}else{
top=$(window)._outerHeight()+$(document).scrollTop()-_2c.outerHeight();
}
}
if(top<0){
top=0;
}
return top;
};
_2c.css({left:_2b,top:top});
_2c.show(0,function(){
if(!_2c[0].shadow){
_2c[0].shadow=$("<div class=\"menu-shadow\"></div>").insertAfter(_2c);
}
_2c[0].shadow.css({display:(_2c.hasClass("menu-inline")?"none":"block"),zIndex:$.fn.menu.defaults.zIndex++,left:_2c.css("left"),top:_2c.css("top"),width:_2c.outerWidth(),height:_2c.outerHeight()});
_2c.css("z-index",$.fn.menu.defaults.zIndex++);
if(_2c.hasClass("menu-top")){
$.data(_2c[0],"menu").options.onShow.call(_2c[0]);
}
});
};
function _1(_31){
if(_31&&_31.length){
_32(_31);
_31.find("div.menu-item").each(function(){
if(this.submenu){
_1(this.submenu);
}
$(this).removeClass("menu-active");
});
}
function _32(m){
m.stop(true,true);
if(m[0].shadow){
m[0].shadow.hide();
}
m.hide();
};
};
function _33(_34,_35){
var _36=null;
var tmp=$("<div></div>");
function _37(_38){
_38.children("div.menu-item").each(function(){
var _39=$(_34).menu("getItem",this);
var s=tmp.empty().html(_39.text).text();
if(_35==$.trim(s)){
_36=_39;
}else{
if(this.submenu&&!_36){
_37(this.submenu);
}
}
});
};
_37($(_34));
tmp.remove();
return _36;
};
function _10(_3a,_3b,_3c){
var t=$(_3b);
if(!t.hasClass("menu-item")){
return;
}
if(_3c){
t.addClass("menu-item-disabled");
if(_3b.onclick){
_3b.onclick1=_3b.onclick;
_3b.onclick=null;
}
}else{
t.removeClass("menu-item-disabled");
if(_3b.onclick1){
_3b.onclick=_3b.onclick1;
_3b.onclick1=null;
}
}
};
function _3d(_3e,_3f){
var _40=$.data(_3e,"menu").options;
var _41=$(_3e);
if(_3f.parent){
if(!_3f.parent.submenu){
var _42=$("<div class=\"menu\"><div class=\"menu-line\"></div></div>").appendTo("body");
_42.hide();
_3f.parent.submenu=_42;
$("<div class=\"menu-rightarrow\"></div>").appendTo(_3f.parent);
}
_41=_3f.parent.submenu;
}
if(_3f.separator){
var _43=$("<div class=\"menu-sep\"></div>").appendTo(_41);
}else{
var _43=$("<div class=\"menu-item\"></div>").appendTo(_41);
$("<div class=\"menu-text\"></div>").html(_3f.text).appendTo(_43);
}
if(_3f.iconCls){
$("<div class=\"menu-icon\"></div>").addClass(_3f.iconCls).appendTo(_43);
}
if(_3f.id){
_43.attr("id",_3f.id);
}
if(_3f.name){
_43[0].itemName=_3f.name;
}
if(_3f.href){
_43[0].itemHref=_3f.href;
}
if(_3f.onclick){
if(typeof _3f.onclick=="string"){
_43.attr("onclick",_3f.onclick);
}else{
_43[0].onclick=eval(_3f.onclick);
}
}
if(_3f.handler){
_43[0].onclick=eval(_3f.handler);
}
if(_3f.disabled){
_10(_3e,_43[0],true);
}
_11(_3e,_43);
_13(_3e,_41);
_12(_3e,_41);
};
function _44(_45,_46){
function _47(el){
if(el.submenu){
el.submenu.children("div.menu-item").each(function(){
_47(this);
});
var _48=el.submenu[0].shadow;
if(_48){
_48.remove();
}
el.submenu.remove();
}
$(el).remove();
};
var _49=$(_46).parent();
_47(_46);
_12(_45,_49);
};
function _4a(_4b,_4c,_4d){
var _4e=$(_4c).parent();
if(_4d){
$(_4c).show();
}else{
$(_4c).hide();
}
_12(_4b,_4e);
};
function _4f(_50){
$(_50).children("div.menu-item").each(function(){
_44(_50,this);
});
if(_50.shadow){
_50.shadow.remove();
}
$(_50).remove();
};
$.fn.menu=function(_51,_52){
if(typeof _51=="string"){
return $.fn.menu.methods[_51](this,_52);
}
_51=_51||{};
return this.each(function(){
var _53=$.data(this,"menu");
if(_53){
$.extend(_53.options,_51);
}else{
_53=$.data(this,"menu",{options:$.extend({},$.fn.menu.defaults,$.fn.menu.parseOptions(this),_51)});
_2(this);
}
$(this).css({left:_53.options.left,top:_53.options.top});
});
};
$.fn.menu.methods={options:function(jq){
return $.data(jq[0],"menu").options;
},show:function(jq,pos){
return jq.each(function(){
_28(this,pos);
});
},hide:function(jq){
return jq.each(function(){
_1e(this);
});
},destroy:function(jq){
return jq.each(function(){
_4f(this);
});
},setText:function(jq,_54){
return jq.each(function(){
$(_54.target).children("div.menu-text").html(_54.text);
});
},setIcon:function(jq,_55){
return jq.each(function(){
$(_55.target).children("div.menu-icon").remove();
if(_55.iconCls){
$("<div class=\"menu-icon\"></div>").addClass(_55.iconCls).appendTo(_55.target);
}
});
},getItem:function(jq,_56){
var t=$(_56);
var _57={target:_56,id:t.attr("id"),text:$.trim(t.children("div.menu-text").html()),disabled:t.hasClass("menu-item-disabled"),name:_56.itemName,href:_56.itemHref,onclick:_56.onclick};
var _58=t.children("div.menu-icon");
if(_58.length){
var cc=[];
var aa=_58.attr("class").split(" ");
for(var i=0;i<aa.length;i++){
if(aa[i]!="menu-icon"){
cc.push(aa[i]);
}
}
_57.iconCls=cc.join(" ");
}
return _57;
},findItem:function(jq,_59){
return _33(jq[0],_59);
},appendItem:function(jq,_5a){
return jq.each(function(){
_3d(this,_5a);
});
},removeItem:function(jq,_5b){
return jq.each(function(){
_44(this,_5b);
});
},enableItem:function(jq,_5c){
return jq.each(function(){
_10(this,_5c,false);
});
},disableItem:function(jq,_5d){
return jq.each(function(){
_10(this,_5d,true);
});
},showItem:function(jq,_5e){
return jq.each(function(){
_4a(this,_5e,true);
});
},hideItem:function(jq,_5f){
return jq.each(function(){
_4a(this,_5f,false);
});
},resize:function(jq,_60){
return jq.each(function(){
_12(this,$(_60));
});
}};
$.fn.menu.parseOptions=function(_61){
return $.extend({},$.parser.parseOptions(_61,[{minWidth:"number",itemHeight:"number",duration:"number",hideOnUnhover:"boolean"},{fit:"boolean",inline:"boolean",noline:"boolean"}]));
};
$.fn.menu.defaults={zIndex:110000,left:0,top:0,alignTo:null,align:"left",minWidth:120,itemHeight:22,duration:100,hideOnUnhover:true,inline:false,fit:false,noline:false,onShow:function(){
},onHide:function(){
},onClick:function(_62){
}};
})(jQuery);


/**
 * jQuery EasyUI 1.4.3
 * 
 * Copyright (c) 2009-2015 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL license: http://www.gnu.org/licenses/gpl.txt
 * To use it on other terms please contact us at info@jeasyui.com
 *
 */
(function($){
function _1(_2){
var _3=$.data(_2,"menubutton").options;
var _4=$(_2);
_4.linkbutton(_3);
if(_3.hasDownArrow){
_4.removeClass(_3.cls.btn1+" "+_3.cls.btn2).addClass("m-btn");
_4.removeClass("m-btn-small m-btn-medium m-btn-large").addClass("m-btn-"+_3.size);
var _5=_4.find(".l-btn-left");
$("<span></span>").addClass(_3.cls.arrow).appendTo(_5);
$("<span></span>").addClass("m-btn-line").appendTo(_5);
}
$(_2).menubutton("resize");
if(_3.menu){
$(_3.menu).menu({duration:_3.duration});
var _6=$(_3.menu).menu("options");
var _7=_6.onShow;
var _8=_6.onHide;
$.extend(_6,{onShow:function(){
var _9=$(this).menu("options");
var _a=$(_9.alignTo);
var _b=_a.menubutton("options");
_a.addClass((_b.plain==true)?_b.cls.btn2:_b.cls.btn1);
_7.call(this);
},onHide:function(){
var _c=$(this).menu("options");
var _d=$(_c.alignTo);
var _e=_d.menubutton("options");
_d.removeClass((_e.plain==true)?_e.cls.btn2:_e.cls.btn1);
_8.call(this);
}});
}
};
function _f(_10){
var _11=$.data(_10,"menubutton").options;
var btn=$(_10);
var t=btn.find("."+_11.cls.trigger);
if(!t.length){
t=btn;
}
t.unbind(".menubutton");
var _12=null;
t.bind("click.menubutton",function(){
if(!_13()){
_14(_10);
return false;
}
}).bind("mouseenter.menubutton",function(){
if(!_13()){
_12=setTimeout(function(){
_14(_10);
},_11.duration);
return false;
}
}).bind("mouseleave.menubutton",function(){
if(_12){
clearTimeout(_12);
}
$(_11.menu).triggerHandler("mouseleave");
});
function _13(){
return $(_10).linkbutton("options").disabled;
};
};
function _14(_15){
var _16=$(_15).menubutton("options");
if(_16.disabled||!_16.menu){
return;
}
$("body>div.menu-top").menu("hide");
var btn=$(_15);
var mm=$(_16.menu);
if(mm.length){
mm.menu("options").alignTo=btn;
mm.menu("show",{alignTo:btn,align:_16.menuAlign});
}
btn.blur();
};
$.fn.menubutton=function(_17,_18){
if(typeof _17=="string"){
var _19=$.fn.menubutton.methods[_17];
if(_19){
return _19(this,_18);
}else{
return this.linkbutton(_17,_18);
}
}
_17=_17||{};
return this.each(function(){
var _1a=$.data(this,"menubutton");
if(_1a){
$.extend(_1a.options,_17);
}else{
$.data(this,"menubutton",{options:$.extend({},$.fn.menubutton.defaults,$.fn.menubutton.parseOptions(this),_17)});
$(this).removeAttr("disabled");
}
_1(this);
_f(this);
});
};
$.fn.menubutton.methods={options:function(jq){
var _1b=jq.linkbutton("options");
return $.extend($.data(jq[0],"menubutton").options,{toggle:_1b.toggle,selected:_1b.selected,disabled:_1b.disabled});
},destroy:function(jq){
return jq.each(function(){
var _1c=$(this).menubutton("options");
if(_1c.menu){
$(_1c.menu).menu("destroy");
}
$(this).remove();
});
}};
$.fn.menubutton.parseOptions=function(_1d){
var t=$(_1d);
return $.extend({},$.fn.linkbutton.parseOptions(_1d),$.parser.parseOptions(_1d,["menu",{plain:"boolean",hasDownArrow:"boolean",duration:"number"}]));
};
$.fn.menubutton.defaults=$.extend({},$.fn.linkbutton.defaults,{plain:true,hasDownArrow:true,menu:null,menuAlign:"left",duration:100,cls:{btn1:"m-btn-active",btn2:"m-btn-plain-active",arrow:"m-btn-downarrow",trigger:"m-btn"}});
})(jQuery);


/**
 * jQuery EasyUI 1.4.3
 * 
 * Copyright (c) 2009-2015 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL license: http://www.gnu.org/licenses/gpl.txt
 * To use it on other terms please contact us at info@jeasyui.com
 *
 */
(function($){
function _1(_2){
$(_2).addClass("progressbar");
$(_2).html("<div class=\"progressbar-text\"></div><div class=\"progressbar-value\"><div class=\"progressbar-text\"></div></div>");
$(_2).bind("_resize",function(e,_3){
if($(this).hasClass("easyui-fluid")||_3){
_4(_2);
}
return false;
});
return $(_2);
};
function _4(_5,_6){
var _7=$.data(_5,"progressbar").options;
var _8=$.data(_5,"progressbar").bar;
if(_6){
_7.width=_6;
}
_8._size(_7);
_8.find("div.progressbar-text").css("width",_8.width());
_8.find("div.progressbar-text,div.progressbar-value").css({height:_8.height()+"px",lineHeight:_8.height()+"px"});
};
$.fn.progressbar=function(_9,_a){
if(typeof _9=="string"){
var _b=$.fn.progressbar.methods[_9];
if(_b){
return _b(this,_a);
}
}
_9=_9||{};
return this.each(function(){
var _c=$.data(this,"progressbar");
if(_c){
$.extend(_c.options,_9);
}else{
_c=$.data(this,"progressbar",{options:$.extend({},$.fn.progressbar.defaults,$.fn.progressbar.parseOptions(this),_9),bar:_1(this)});
}
$(this).progressbar("setValue",_c.options.value);
_4(this);
});
};
$.fn.progressbar.methods={options:function(jq){
return $.data(jq[0],"progressbar").options;
},resize:function(jq,_d){
return jq.each(function(){
_4(this,_d);
});
},getValue:function(jq){
return $.data(jq[0],"progressbar").options.value;
},setValue:function(jq,_e){
if(_e<0){
_e=0;
}
if(_e>100){
_e=100;
}
return jq.each(function(){
var _f=$.data(this,"progressbar").options;
var _10=_f.text.replace(/{value}/,_e);
var _11=_f.value;
_f.value=_e;
$(this).find("div.progressbar-value").width(_e+"%");
$(this).find("div.progressbar-text").html(_10);
if(_11!=_e){
_f.onChange.call(this,_e,_11);
}
});
}};
$.fn.progressbar.parseOptions=function(_12){
return $.extend({},$.parser.parseOptions(_12,["width","height","text",{value:"number"}]));
};
$.fn.progressbar.defaults={width:"auto",height:22,value:0,text:"{value}%",onChange:function(_13,_14){
}};
})(jQuery);


/**
 * jQuery EasyUI 1.4.3
 * 
 * Copyright (c) 2009-2015 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL license: http://www.gnu.org/licenses/gpl.txt
 * To use it on other terms please contact us at info@jeasyui.com
 *
 */
(function($){
function _1(){
$(document).unbind(".messager").bind("keydown.messager",function(e){
if(e.keyCode==27){
$("body").children("div.messager-window").children("div.messager-body").each(function(){
$(this).window("close");
});
}else{
if(e.keyCode==9){
var _2=$("body").children("div.messager-window").children("div.messager-body");
if(!_2.length){
return;
}
var _3=_2.find(".messager-input,.messager-button .l-btn");
for(var i=0;i<_3.length;i++){
if($(_3[i]).is(":focus")){
$(_3[i>=_3.length-1?0:i+1]).focus();
return false;
}
}
}
}
});
};
function _4(){
$(document).unbind(".messager");
};
function _5(_6){
var _7=$.extend({},$.messager.defaults,{modal:false,shadow:false,draggable:false,resizable:false,closed:true,style:{left:"",top:"",right:0,zIndex:$.fn.window.defaults.zIndex++,bottom:-document.body.scrollTop-document.documentElement.scrollTop},title:"",width:250,height:100,showType:"slide",showSpeed:600,msg:"",timeout:4000},_6);
var _8=$("<div class=\"messager-body\"></div>").html(_7.msg).appendTo("body");
_8.window($.extend({},_7,{openAnimation:(_7.showType),closeAnimation:(_7.showType=="show"?"hide":_7.showType),openDuration:_7.showSpeed,closeDuration:_7.showSpeed,onOpen:function(){
_8.window("window").hover(function(){
if(_7.timer){
clearTimeout(_7.timer);
}
},function(){
_9();
});
_9();
function _9(){
if(_7.timeout>0){
_7.timer=setTimeout(function(){
if(_8.length&&_8.data("window")){
_8.window("close");
}
},_7.timeout);
}
};
if(_6.onOpen){
_6.onOpen.call(this);
}else{
_7.onOpen.call(this);
}
},onClose:function(){
if(_7.timer){
clearTimeout(_7.timer);
}
if(_6.onClose){
_6.onClose.call(this);
}else{
_7.onClose.call(this);
}
_8.window("destroy");
}}));
_8.window("window").css(_7.style);
_8.window("open");
return _8;
};
function _a(_b){
_1();
var _c=$("<div class=\"messager-body\"></div>").appendTo("body");
_c.window($.extend({},_b,{doSize:false,noheader:(_b.title?false:true),onClose:function(){
_4();
if(_b.onClose){
_b.onClose.call(this);
}
setTimeout(function(){
_c.window("destroy");
},100);
}}));
if(_b.buttons&&_b.buttons.length){
var tb=$("<div class=\"messager-button\"></div>").appendTo(_c);
$.map(_b.buttons,function(_d){
$("<a href=\"javascript:void(0)\" style=\"margin-left:10px\"></a>").appendTo(tb).linkbutton(_d);
});
}
_c.window("window").addClass("messager-window");
_c.window("resize");
_c.children("div.messager-button").children("a:first").focus();
return _c;
};
$.messager={show:function(_e){
return _5(_e);
},alert:function(_f,msg,_10,fn){
var _11=typeof _f=="object"?_f:{title:_f,msg:msg,icon:_10,fn:fn};
var cls=_11.icon?"messager-icon messager-"+_11.icon:"";
_11=$.extend({},$.messager.defaults,{content:"<div class=\""+cls+"\"></div>"+"<div>"+_11.msg+"</div>"+"<div style=\"clear:both;\"/>",buttons:[{text:$.messager.defaults.ok,onClick:function(){
win.window("close");
_11.fn();
}}]},_11);
var win=_a(_11);
return win;
},confirm:function(_12,msg,fn){
var _13=typeof _12=="object"?_12:{title:_12,msg:msg,fn:fn};
_13=$.extend({},$.messager.defaults,{content:"<div class=\"messager-icon messager-question\"></div>"+"<div>"+_13.msg+"</div>"+"<div style=\"clear:both;\"/>",buttons:[{text:$.messager.defaults.ok,onClick:function(){
win.window("close");
_13.fn(true);
}},{text:$.messager.defaults.cancel,onClick:function(){
win.window("close");
_13.fn(false);
}}]},_13);
var win=_a(_13);
return win;
},prompt:function(_14,msg,fn){
var _15=typeof _14=="object"?_14:{title:_14,msg:msg,fn:fn};
_15=$.extend({},$.messager.defaults,{content:"<div class=\"messager-icon messager-question\"></div>"+"<div>"+_15.msg+"</div>"+"<br/>"+"<div style=\"clear:both;\"/>"+"<div><input class=\"messager-input\" type=\"text\"/></div>",buttons:[{text:$.messager.defaults.ok,onClick:function(){
win.window("close");
_15.fn(win.find(".messager-input").val());
}},{text:$.messager.defaults.cancel,onClick:function(){
win.window("close");
_15.fn();
}}]},_15);
var win=_a(_15);
win.find("input.messager-input").focus();
return win;
},progress:function(_16){
var _17={bar:function(){
return $("body>div.messager-window").find("div.messager-p-bar");
},close:function(){
var win=$("body>div.messager-window>div.messager-body:has(div.messager-progress)");
if(win.length){
win.window("close");
}
}};
if(typeof _16=="string"){
var _18=_17[_16];
return _18();
}
var _19=$.extend({},{title:"",content:undefined,msg:"",text:undefined,interval:300},_16||{});
var win=_a($.extend({},$.messager.defaults,{content:"<div class=\"messager-progress\"><div class=\"messager-p-msg\">"+_19.msg+"</div><div class=\"messager-p-bar\"></div></div>",closable:false,doSize:false},_19,{onClose:function(){
if(this.timer){
clearInterval(this.timer);
}
if(_16.onClose){
_16.onClose.call(this);
}else{
$.messager.defaults.onClose.call(this);
}
}}));
var bar=win.find("div.messager-p-bar");
bar.progressbar({text:_19.text});
win.window("resize");
if(_19.interval){
win[0].timer=setInterval(function(){
var v=bar.progressbar("getValue");
v+=10;
if(v>100){
v=0;
}
bar.progressbar("setValue",v);
},_19.interval);
}
return win;
}};
$.messager.defaults=$.extend({},$.fn.window.defaults,{ok:"Ok",cancel:"Cancel",width:300,height:"auto",modal:true,collapsible:false,minimizable:false,maximizable:false,resizable:false,fn:function(){
}});
})(jQuery);


/**
 * jQuery EasyUI 1.4.3
 * 
 * Copyright (c) 2009-2015 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL license: http://www.gnu.org/licenses/gpl.txt
 * To use it on other terms please contact us at info@jeasyui.com
 *
 */
(function($){
function _1(_2){
var _3=$.data(_2,"numberbox");
var _4=_3.options;
$(_2).addClass("numberbox-f").textbox(_4);
$(_2).textbox("textbox").css({imeMode:"disabled"});
$(_2).attr("numberboxName",$(_2).attr("textboxName"));
_3.numberbox=$(_2).next();
_3.numberbox.addClass("numberbox");
var _5=_4.parser.call(_2,_4.value);
var _6=_4.formatter.call(_2,_5);
$(_2).numberbox("initValue",_5).numberbox("setText",_6);
};
function _7(_8,_9){
var _a=$.data(_8,"numberbox");
var _b=_a.options;
var _9=_b.parser.call(_8,_9);
var _c=_b.formatter.call(_8,_9);
_b.value=_9;
$(_8).textbox("setText",_c).textbox("setValue",_9);
_c=_b.formatter.call(_8,$(_8).textbox("getValue"));
$(_8).textbox("setText",_c);
};
$.fn.numberbox=function(_d,_e){
if(typeof _d=="string"){
var _f=$.fn.numberbox.methods[_d];
if(_f){
return _f(this,_e);
}else{
return this.textbox(_d,_e);
}
}
_d=_d||{};
return this.each(function(){
var _10=$.data(this,"numberbox");
if(_10){
$.extend(_10.options,_d);
}else{
_10=$.data(this,"numberbox",{options:$.extend({},$.fn.numberbox.defaults,$.fn.numberbox.parseOptions(this),_d)});
}
_1(this);
});
};
$.fn.numberbox.methods={options:function(jq){
var _11=jq.data("textbox")?jq.textbox("options"):{};
return $.extend($.data(jq[0],"numberbox").options,{width:_11.width,originalValue:_11.originalValue,disabled:_11.disabled,readonly:_11.readonly});
},fix:function(jq){
return jq.each(function(){
$(this).numberbox("setValue",$(this).numberbox("getText"));
});
},setValue:function(jq,_12){
return jq.each(function(){
_7(this,_12);
});
},clear:function(jq){
return jq.each(function(){
$(this).textbox("clear");
$(this).numberbox("options").value="";
});
},reset:function(jq){
return jq.each(function(){
$(this).textbox("reset");
$(this).numberbox("setValue",$(this).numberbox("getValue"));
});
}};
$.fn.numberbox.parseOptions=function(_13){
var t=$(_13);
return $.extend({},$.fn.textbox.parseOptions(_13),$.parser.parseOptions(_13,["decimalSeparator","groupSeparator","suffix",{min:"number",max:"number",precision:"number"}]),{prefix:(t.attr("prefix")?t.attr("prefix"):undefined)});
};
$.fn.numberbox.defaults=$.extend({},$.fn.textbox.defaults,{inputEvents:{keypress:function(e){
var _14=e.data.target;
var _15=$(_14).numberbox("options");
return _15.filter.call(_14,e);
},blur:function(e){
var _16=e.data.target;
$(_16).numberbox("setValue",$(_16).numberbox("getText"));
},keydown:function(e){
if(e.keyCode==13){
var _17=e.data.target;
$(_17).numberbox("setValue",$(_17).numberbox("getText"));
}
}},min:null,max:null,precision:0,decimalSeparator:".",groupSeparator:"",prefix:"",suffix:"",filter:function(e){
var _18=$(this).numberbox("options");
var s=$(this).numberbox("getText");
if(e.which==13){
return true;
}
if(e.which==45){
return (s.indexOf("-")==-1?true:false);
}
var c=String.fromCharCode(e.which);
if(c==_18.decimalSeparator){
return (s.indexOf(c)==-1?true:false);
}else{
if(c==_18.groupSeparator){
return true;
}else{
if((e.which>=48&&e.which<=57&&e.ctrlKey==false&&e.shiftKey==false)||e.which==0||e.which==8){
return true;
}else{
if(e.ctrlKey==true&&(e.which==99||e.which==118)){
return true;
}else{
return false;
}
}
}
}
},formatter:function(_19){
if(!_19){
return _19;
}
_19=_19+"";
var _1a=$(this).numberbox("options");
var s1=_19,s2="";
var _1b=_19.indexOf(".");
if(_1b>=0){
s1=_19.substring(0,_1b);
s2=_19.substring(_1b+1,_19.length);
}
if(_1a.groupSeparator){
var p=/(\d+)(\d{3})/;
while(p.test(s1)){
s1=s1.replace(p,"$1"+_1a.groupSeparator+"$2");
}
}
if(s2){
return _1a.prefix+s1+_1a.decimalSeparator+s2+_1a.suffix;
}else{
return _1a.prefix+s1+_1a.suffix;
}
},parser:function(s){
s=s+"";
var _1c=$(this).numberbox("options");
if(parseFloat(s)!=s){
if(_1c.prefix){
s=$.trim(s.replace(new RegExp("\\"+$.trim(_1c.prefix),"g"),""));
}
if(_1c.suffix){
s=$.trim(s.replace(new RegExp("\\"+$.trim(_1c.suffix),"g"),""));
}
if(_1c.groupSeparator){
s=$.trim(s.replace(new RegExp("\\"+_1c.groupSeparator,"g"),""));
}
if(_1c.decimalSeparator){
s=$.trim(s.replace(new RegExp("\\"+_1c.decimalSeparator,"g"),"."));
}
s=s.replace(/\s/g,"");
}
var val=parseFloat(s).toFixed(_1c.precision);
if(isNaN(val)){
val="";
}else{
if(typeof (_1c.min)=="number"&&val<_1c.min){
val=_1c.min.toFixed(_1c.precision);
}else{
if(typeof (_1c.max)=="number"&&val>_1c.max){
val=_1c.max.toFixed(_1c.precision);
}
}
}
return val;
}});
})(jQuery);


/**
 * jQuery EasyUI 1.4.3
 * 
 * Copyright (c) 2009-2015 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL license: http://www.gnu.org/licenses/gpl.txt
 * To use it on other terms please contact us at info@jeasyui.com
 *
 */
(function($){
function _1(_2){
$(_2).addClass("numberspinner-f");
var _3=$.data(_2,"numberspinner").options;
$(_2).numberbox(_3).spinner(_3);
$(_2).numberbox("setValue",_3.value);
};
function _4(_5,_6){
var _7=$.data(_5,"numberspinner").options;
var v=parseFloat($(_5).numberbox("getValue")||_7.value)||0;
if(_6){
v-=_7.increment;
}else{
v+=_7.increment;
}
$(_5).numberbox("setValue",v);
};
$.fn.numberspinner=function(_8,_9){
if(typeof _8=="string"){
var _a=$.fn.numberspinner.methods[_8];
if(_a){
return _a(this,_9);
}else{
return this.numberbox(_8,_9);
}
}
_8=_8||{};
return this.each(function(){
var _b=$.data(this,"numberspinner");
if(_b){
$.extend(_b.options,_8);
}else{
$.data(this,"numberspinner",{options:$.extend({},$.fn.numberspinner.defaults,$.fn.numberspinner.parseOptions(this),_8)});
}
_1(this);
});
};
$.fn.numberspinner.methods={options:function(jq){
var _c=jq.numberbox("options");
return $.extend($.data(jq[0],"numberspinner").options,{width:_c.width,value:_c.value,originalValue:_c.originalValue,disabled:_c.disabled,readonly:_c.readonly});
}};
$.fn.numberspinner.parseOptions=function(_d){
return $.extend({},$.fn.spinner.parseOptions(_d),$.fn.numberbox.parseOptions(_d),{});
};
$.fn.numberspinner.defaults=$.extend({},$.fn.spinner.defaults,$.fn.numberbox.defaults,{spin:function(_e){
_4(this,_e);
}});
})(jQuery);


/**
 * jQuery EasyUI 1.4.3
 * 
 * Copyright (c) 2009-2015 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL license: http://www.gnu.org/licenses/gpl.txt
 * To use it on other terms please contact us at info@jeasyui.com
 *
 */
(function($){
var _1;
$(document).unbind(".propertygrid").bind("mousedown.propertygrid",function(e){
var p=$(e.target).closest("div.datagrid-view,div.combo-panel");
if(p.length){
return;
}
_2(_1);
_1=undefined;
});
function _3(_4){
var _5=$.data(_4,"propertygrid");
var _6=$.data(_4,"propertygrid").options;
$(_4).datagrid($.extend({},_6,{cls:"propertygrid",view:(_6.showGroup?_6.groupView:_6.view),onBeforeEdit:function(_7,_8){
if(_6.onBeforeEdit.call(_4,_7,_8)==false){
return false;
}
var dg=$(this);
var _8=dg.datagrid("getRows")[_7];
var _9=dg.datagrid("getColumnOption","value");
_9.editor=_8.editor;
},onClickCell:function(_a,_b,_c){
if(_1!=this){
_2(_1);
_1=this;
}
if(_6.editIndex!=_a){
_2(_1);
$(this).datagrid("beginEdit",_a);
var ed=$(this).datagrid("getEditor",{index:_a,field:_b});
if(!ed){
ed=$(this).datagrid("getEditor",{index:_a,field:"value"});
}
if(ed){
var t=$(ed.target);
var _d=t.data("textbox")?t.textbox("textbox"):t;
_d.focus();
_6.editIndex=_a;
}
}
_6.onClickCell.call(_4,_a,_b,_c);
},loadFilter:function(_e){
_2(this);
return _6.loadFilter.call(this,_e);
}}));
};
function _2(_f){
var t=$(_f);
if(!t.length){
return;
}
var _10=$.data(_f,"propertygrid").options;
_10.finder.getTr(_f,null,"editing").each(function(){
var _11=parseInt($(this).attr("datagrid-row-index"));
if(t.datagrid("validateRow",_11)){
t.datagrid("endEdit",_11);
}else{
t.datagrid("cancelEdit",_11);
}
});
_10.editIndex=undefined;
};
$.fn.propertygrid=function(_12,_13){
if(typeof _12=="string"){
var _14=$.fn.propertygrid.methods[_12];
if(_14){
return _14(this,_13);
}else{
return this.datagrid(_12,_13);
}
}
_12=_12||{};
return this.each(function(){
var _15=$.data(this,"propertygrid");
if(_15){
$.extend(_15.options,_12);
}else{
var _16=$.extend({},$.fn.propertygrid.defaults,$.fn.propertygrid.parseOptions(this),_12);
_16.frozenColumns=$.extend(true,[],_16.frozenColumns);
_16.columns=$.extend(true,[],_16.columns);
$.data(this,"propertygrid",{options:_16});
}
_3(this);
});
};
$.fn.propertygrid.methods={options:function(jq){
return $.data(jq[0],"propertygrid").options;
}};
$.fn.propertygrid.parseOptions=function(_17){
return $.extend({},$.fn.datagrid.parseOptions(_17),$.parser.parseOptions(_17,[{showGroup:"boolean"}]));
};
var _18=$.extend({},$.fn.datagrid.defaults.view,{render:function(_19,_1a,_1b){
var _1c=[];
var _1d=this.groups;
for(var i=0;i<_1d.length;i++){
_1c.push(this.renderGroup.call(this,_19,i,_1d[i],_1b));
}
$(_1a).html(_1c.join(""));
},renderGroup:function(_1e,_1f,_20,_21){
var _22=$.data(_1e,"datagrid");
var _23=_22.options;
var _24=$(_1e).datagrid("getColumnFields",_21);
var _25=[];
_25.push("<div class=\"datagrid-group\" group-index="+_1f+">");
_25.push("<table cellspacing=\"0\" cellpadding=\"0\" border=\"0\" style=\"height:100%\"><tbody>");
_25.push("<tr>");
if((_21&&(_23.rownumbers||_23.frozenColumns.length))||(!_21&&!(_23.rownumbers||_23.frozenColumns.length))){
_25.push("<td style=\"border:0;text-align:center;width:25px\"><span class=\"datagrid-row-expander datagrid-row-collapse\" style=\"display:inline-block;width:16px;height:16px;cursor:pointer\">&nbsp;</span></td>");
}
_25.push("<td style=\"border:0;\">");
if(!_21){
_25.push("<span class=\"datagrid-group-title\">");
_25.push(_23.groupFormatter.call(_1e,_20.value,_20.rows));
_25.push("</span>");
}
_25.push("</td>");
_25.push("</tr>");
_25.push("</tbody></table>");
_25.push("</div>");
_25.push("<table class=\"datagrid-btable\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody>");
var _26=_20.startIndex;
for(var j=0;j<_20.rows.length;j++){
var css=_23.rowStyler?_23.rowStyler.call(_1e,_26,_20.rows[j]):"";
var _27="";
var _28="";
if(typeof css=="string"){
_28=css;
}else{
if(css){
_27=css["class"]||"";
_28=css["style"]||"";
}
}
var cls="class=\"datagrid-row "+(_26%2&&_23.striped?"datagrid-row-alt ":" ")+_27+"\"";
var _29=_28?"style=\""+_28+"\"":"";
var _2a=_22.rowIdPrefix+"-"+(_21?1:2)+"-"+_26;
_25.push("<tr id=\""+_2a+"\" datagrid-row-index=\""+_26+"\" "+cls+" "+_29+">");
_25.push(this.renderRow.call(this,_1e,_24,_21,_26,_20.rows[j]));
_25.push("</tr>");
_26++;
}
_25.push("</tbody></table>");
return _25.join("");
},bindEvents:function(_2b){
var _2c=$.data(_2b,"datagrid");
var dc=_2c.dc;
var _2d=dc.body1.add(dc.body2);
var _2e=($.data(_2d[0],"events")||$._data(_2d[0],"events")).click[0].handler;
_2d.unbind("click").bind("click",function(e){
var tt=$(e.target);
var _2f=tt.closest("span.datagrid-row-expander");
if(_2f.length){
var _30=_2f.closest("div.datagrid-group").attr("group-index");
if(_2f.hasClass("datagrid-row-collapse")){
$(_2b).datagrid("collapseGroup",_30);
}else{
$(_2b).datagrid("expandGroup",_30);
}
}else{
_2e(e);
}
e.stopPropagation();
});
},onBeforeRender:function(_31,_32){
var _33=$.data(_31,"datagrid");
var _34=_33.options;
_35();
var _36=[];
for(var i=0;i<_32.length;i++){
var row=_32[i];
var _37=_38(row[_34.groupField]);
if(!_37){
_37={value:row[_34.groupField],rows:[row]};
_36.push(_37);
}else{
_37.rows.push(row);
}
}
var _39=0;
var _3a=[];
for(var i=0;i<_36.length;i++){
var _37=_36[i];
_37.startIndex=_39;
_39+=_37.rows.length;
_3a=_3a.concat(_37.rows);
}
_33.data.rows=_3a;
this.groups=_36;
var _3b=this;
setTimeout(function(){
_3b.bindEvents(_31);
},0);
function _38(_3c){
for(var i=0;i<_36.length;i++){
var _3d=_36[i];
if(_3d.value==_3c){
return _3d;
}
}
return null;
};
function _35(){
if(!$("#datagrid-group-style").length){
$("head").append("<style id=\"datagrid-group-style\">"+".datagrid-group{height:25px;overflow:hidden;font-weight:bold;border-bottom:1px solid #ccc;}"+"</style>");
}
};
}});
$.extend($.fn.datagrid.methods,{expandGroup:function(jq,_3e){
return jq.each(function(){
var _3f=$.data(this,"datagrid").dc.view;
var _40=_3f.find(_3e!=undefined?"div.datagrid-group[group-index=\""+_3e+"\"]":"div.datagrid-group");
var _41=_40.find("span.datagrid-row-expander");
if(_41.hasClass("datagrid-row-expand")){
_41.removeClass("datagrid-row-expand").addClass("datagrid-row-collapse");
_40.next("table").show();
}
$(this).datagrid("fixRowHeight");
});
},collapseGroup:function(jq,_42){
return jq.each(function(){
var _43=$.data(this,"datagrid").dc.view;
var _44=_43.find(_42!=undefined?"div.datagrid-group[group-index=\""+_42+"\"]":"div.datagrid-group");
var _45=_44.find("span.datagrid-row-expander");
if(_45.hasClass("datagrid-row-collapse")){
_45.removeClass("datagrid-row-collapse").addClass("datagrid-row-expand");
_44.next("table").hide();
}
$(this).datagrid("fixRowHeight");
});
}});
$.extend(_18,{refreshGroupTitle:function(_46,_47){
var _48=$.data(_46,"datagrid");
var _49=_48.options;
var dc=_48.dc;
var _4a=this.groups[_47];
var _4b=dc.body2.children("div.datagrid-group[group-index="+_47+"]").find("span.datagrid-group-title");
_4b.html(_49.groupFormatter.call(_46,_4a.value,_4a.rows));
},insertRow:function(_4c,_4d,row){
var _4e=$.data(_4c,"datagrid");
var _4f=_4e.options;
var dc=_4e.dc;
var _50=null;
var _51;
for(var i=0;i<this.groups.length;i++){
if(this.groups[i].value==row[_4f.groupField]){
_50=this.groups[i];
_51=i;
break;
}
}
if(_50){
if(_4d==undefined||_4d==null){
_4d=_4e.data.rows.length;
}
if(_4d<_50.startIndex){
_4d=_50.startIndex;
}else{
if(_4d>_50.startIndex+_50.rows.length){
_4d=_50.startIndex+_50.rows.length;
}
}
$.fn.datagrid.defaults.view.insertRow.call(this,_4c,_4d,row);
if(_4d>=_50.startIndex+_50.rows.length){
_52(_4d,true);
_52(_4d,false);
}
_50.rows.splice(_4d-_50.startIndex,0,row);
}else{
_50={value:row[_4f.groupField],rows:[row],startIndex:_4e.data.rows.length};
_51=this.groups.length;
dc.body1.append(this.renderGroup.call(this,_4c,_51,_50,true));
dc.body2.append(this.renderGroup.call(this,_4c,_51,_50,false));
this.groups.push(_50);
_4e.data.rows.push(row);
}
this.refreshGroupTitle(_4c,_51);
function _52(_53,_54){
var _55=_54?1:2;
var _56=_4f.finder.getTr(_4c,_53-1,"body",_55);
var tr=_4f.finder.getTr(_4c,_53,"body",_55);
tr.insertAfter(_56);
};
},updateRow:function(_57,_58,row){
var _59=$.data(_57,"datagrid").options;
$.fn.datagrid.defaults.view.updateRow.call(this,_57,_58,row);
var tb=_59.finder.getTr(_57,_58,"body",2).closest("table.datagrid-btable");
var _5a=parseInt(tb.prev().attr("group-index"));
this.refreshGroupTitle(_57,_5a);
},deleteRow:function(_5b,_5c){
var _5d=$.data(_5b,"datagrid");
var _5e=_5d.options;
var dc=_5d.dc;
var _5f=dc.body1.add(dc.body2);
var tb=_5e.finder.getTr(_5b,_5c,"body",2).closest("table.datagrid-btable");
var _60=parseInt(tb.prev().attr("group-index"));
$.fn.datagrid.defaults.view.deleteRow.call(this,_5b,_5c);
var _61=this.groups[_60];
if(_61.rows.length>1){
_61.rows.splice(_5c-_61.startIndex,1);
this.refreshGroupTitle(_5b,_60);
}else{
_5f.children("div.datagrid-group[group-index="+_60+"]").remove();
for(var i=_60+1;i<this.groups.length;i++){
_5f.children("div.datagrid-group[group-index="+i+"]").attr("group-index",i-1);
}
this.groups.splice(_60,1);
}
var _5c=0;
for(var i=0;i<this.groups.length;i++){
var _61=this.groups[i];
_61.startIndex=_5c;
_5c+=_61.rows.length;
}
}});
$.fn.propertygrid.defaults=$.extend({},$.fn.datagrid.defaults,{singleSelect:true,remoteSort:false,fitColumns:true,loadMsg:"",frozenColumns:[[{field:"f",width:16,resizable:false}]],columns:[[{field:"name",title:"Name",width:100,sortable:true},{field:"value",title:"Value",width:100,resizable:false}]],showGroup:false,groupView:_18,groupField:"group",groupFormatter:function(_62,_63){
return _62;
}});
})(jQuery);


/**
 * jQuery EasyUI 1.4.3
 * 
 * Copyright (c) 2009-2015 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL license: http://www.gnu.org/licenses/gpl.txt
 * To use it on other terms please contact us at info@jeasyui.com
 *
 */
(function($){
function _1(c){
var w=0;
$(c).children().each(function(){
w+=$(this).outerWidth(true);
});
return w;
};
function _2(_3){
var _4=$.data(_3,"tabs").options;
if(_4.tabPosition=="left"||_4.tabPosition=="right"||!_4.showHeader){
return;
}
var _5=$(_3).children("div.tabs-header");
var _6=_5.children("div.tabs-tool:not(.tabs-tool-hidden)");
var _7=_5.children("div.tabs-scroller-left");
var _8=_5.children("div.tabs-scroller-right");
var _9=_5.children("div.tabs-wrap");
var _a=_5.outerHeight();
if(_4.plain){
_a-=_a-_5.height();
}
_6._outerHeight(_a);
var _b=_1(_5.find("ul.tabs"));
var _c=_5.width()-_6._outerWidth();
if(_b>_c){
_7.add(_8).show()._outerHeight(_a);
if(_4.toolPosition=="left"){
_6.css({left:_7.outerWidth(),right:""});
_9.css({marginLeft:_7.outerWidth()+_6._outerWidth(),marginRight:_8._outerWidth(),width:_c-_7.outerWidth()-_8.outerWidth()});
}else{
_6.css({left:"",right:_8.outerWidth()});
_9.css({marginLeft:_7.outerWidth(),marginRight:_8.outerWidth()+_6._outerWidth(),width:_c-_7.outerWidth()-_8.outerWidth()});
}
}else{
_7.add(_8).hide();
if(_4.toolPosition=="left"){
_6.css({left:0,right:""});
_9.css({marginLeft:_6._outerWidth(),marginRight:0,width:_c});
}else{
_6.css({left:"",right:0});
_9.css({marginLeft:0,marginRight:_6._outerWidth(),width:_c});
}
}
};
function _d(_e){
var _f=$.data(_e,"tabs").options;
var _10=$(_e).children("div.tabs-header");
if(_f.tools){
if(typeof _f.tools=="string"){
$(_f.tools).addClass("tabs-tool").appendTo(_10);
$(_f.tools).show();
}else{
_10.children("div.tabs-tool").remove();
var _11=$("<div class=\"tabs-tool\"><table cellspacing=\"0\" cellpadding=\"0\" style=\"height:100%\"><tr></tr></table></div>").appendTo(_10);
var tr=_11.find("tr");
for(var i=0;i<_f.tools.length;i++){
var td=$("<td></td>").appendTo(tr);
var _12=$("<a href=\"javascript:void(0);\"></a>").appendTo(td);
_12[0].onclick=eval(_f.tools[i].handler||function(){
});
_12.linkbutton($.extend({},_f.tools[i],{plain:true}));
}
}
}else{
_10.children("div.tabs-tool").remove();
}
};
function _13(_14,_15){
var _16=$.data(_14,"tabs");
var _17=_16.options;
var cc=$(_14);
if(!_17.doSize){
return;
}
if(_15){
$.extend(_17,{width:_15.width,height:_15.height});
}
cc._size(_17);
var _18=cc.children("div.tabs-header");
var _19=cc.children("div.tabs-panels");
var _1a=_18.find("div.tabs-wrap");
var ul=_1a.find(".tabs");
ul.children("li").removeClass("tabs-first tabs-last");
ul.children("li:first").addClass("tabs-first");
ul.children("li:last").addClass("tabs-last");
if(_17.tabPosition=="left"||_17.tabPosition=="right"){
_18._outerWidth(_17.showHeader?_17.headerWidth:0);
_19._outerWidth(cc.width()-_18.outerWidth());
_18.add(_19)._outerHeight(_17.height);
_1a._outerWidth(_18.width());
ul._outerWidth(_1a.width()).css("height","");
}else{
_18.children("div.tabs-scroller-left,div.tabs-scroller-right,div.tabs-tool:not(.tabs-tool-hidden)").css("display",_17.showHeader?"block":"none");
_18._outerWidth(cc.width()).css("height","");
if(_17.showHeader){
_18.css("background-color","");
_1a.css("height","");
}else{
_18.css("background-color","transparent");
_18._outerHeight(0);
_1a._outerHeight(0);
}
ul._outerHeight(_17.tabHeight).css("width","");
ul._outerHeight(ul.outerHeight()-ul.height()-1+_17.tabHeight).css("width","");
_19._size("height",isNaN(_17.height)?"":(_17.height-_18.outerHeight()));
_19._size("width",isNaN(_17.width)?"":_17.width);
}
if(_16.tabs.length){
var d1=ul.outerWidth(true)-ul.width();
var li=ul.children("li:first");
var d2=li.outerWidth(true)-li.width();
var _1b=_18.width()-_18.children(".tabs-tool:not(.tabs-tool-hidden)")._outerWidth();
var _1c=Math.floor((_1b-d1-d2*_16.tabs.length)/_16.tabs.length);
$.map(_16.tabs,function(p){
_1d(p,(_17.justified&&$.inArray(_17.tabPosition,["top","bottom"])>=0)?_1c:undefined);
});
if(_17.justified&&$.inArray(_17.tabPosition,["top","bottom"])>=0){
var _1e=_1b-d1-_1(ul);
_1d(_16.tabs[_16.tabs.length-1],_1c+_1e);
}
}
_2(_14);
function _1d(p,_1f){
var _20=p.panel("options");
var p_t=_20.tab.find("a.tabs-inner");
var _1f=_1f?_1f:(parseInt(_20.tabWidth||_17.tabWidth||undefined));
if(_1f){
p_t._outerWidth(_1f);
}else{
p_t.css("width","");
}
p_t._outerHeight(_17.tabHeight);
p_t.css("lineHeight",p_t.height()+"px");
p_t.find(".easyui-fluid:visible").triggerHandler("_resize");
};
};
function _21(_22){
var _23=$.data(_22,"tabs").options;
var tab=_24(_22);
if(tab){
var _25=$(_22).children("div.tabs-panels");
var _26=_23.width=="auto"?"auto":_25.width();
var _27=_23.height=="auto"?"auto":_25.height();
tab.panel("resize",{width:_26,height:_27});
}
};
function _28(_29){
var _2a=$.data(_29,"tabs").tabs;
var cc=$(_29).addClass("tabs-container");
var _2b=$("<div class=\"tabs-panels\"></div>").insertBefore(cc);
cc.children("div").each(function(){
_2b[0].appendChild(this);
});
cc[0].appendChild(_2b[0]);
$("<div class=\"tabs-header\">"+"<div class=\"tabs-scroller-left\"></div>"+"<div class=\"tabs-scroller-right\"></div>"+"<div class=\"tabs-wrap\">"+"<ul class=\"tabs\"></ul>"+"</div>"+"</div>").prependTo(_29);
cc.children("div.tabs-panels").children("div").each(function(i){
var _2c=$.extend({},$.parser.parseOptions(this),{selected:($(this).attr("selected")?true:undefined)});
_3c(_29,_2c,$(this));
});
cc.children("div.tabs-header").find(".tabs-scroller-left, .tabs-scroller-right").hover(function(){
$(this).addClass("tabs-scroller-over");
},function(){
$(this).removeClass("tabs-scroller-over");
});
cc.bind("_resize",function(e,_2d){
if($(this).hasClass("easyui-fluid")||_2d){
_13(_29);
_21(_29);
}
return false;
});
};
function _2e(_2f){
var _30=$.data(_2f,"tabs");
var _31=_30.options;
$(_2f).children("div.tabs-header").unbind().bind("click",function(e){
if($(e.target).hasClass("tabs-scroller-left")){
$(_2f).tabs("scrollBy",-_31.scrollIncrement);
}else{
if($(e.target).hasClass("tabs-scroller-right")){
$(_2f).tabs("scrollBy",_31.scrollIncrement);
}else{
var li=$(e.target).closest("li");
if(li.hasClass("tabs-disabled")){
return false;
}
var a=$(e.target).closest("a.tabs-close");
if(a.length){
_5a(_2f,_32(li));
}else{
if(li.length){
var _33=_32(li);
var _34=_30.tabs[_33].panel("options");
if(_34.collapsible){
_34.closed?_50(_2f,_33):_74(_2f,_33);
}else{
_50(_2f,_33);
}
}
}
return false;
}
}
}).bind("contextmenu",function(e){
var li=$(e.target).closest("li");
if(li.hasClass("tabs-disabled")){
return;
}
if(li.length){
_31.onContextMenu.call(_2f,e,li.find("span.tabs-title").html(),_32(li));
}
});
function _32(li){
var _35=0;
li.parent().children("li").each(function(i){
if(li[0]==this){
_35=i;
return false;
}
});
return _35;
};
};
function _36(_37){
var _38=$.data(_37,"tabs").options;
var _39=$(_37).children("div.tabs-header");
var _3a=$(_37).children("div.tabs-panels");
_39.removeClass("tabs-header-top tabs-header-bottom tabs-header-left tabs-header-right");
_3a.removeClass("tabs-panels-top tabs-panels-bottom tabs-panels-left tabs-panels-right");
if(_38.tabPosition=="top"){
_39.insertBefore(_3a);
}else{
if(_38.tabPosition=="bottom"){
_39.insertAfter(_3a);
_39.addClass("tabs-header-bottom");
_3a.addClass("tabs-panels-top");
}else{
if(_38.tabPosition=="left"){
_39.addClass("tabs-header-left");
_3a.addClass("tabs-panels-right");
}else{
if(_38.tabPosition=="right"){
_39.addClass("tabs-header-right");
_3a.addClass("tabs-panels-left");
}
}
}
}
if(_38.plain==true){
_39.addClass("tabs-header-plain");
}else{
_39.removeClass("tabs-header-plain");
}
_39.removeClass("tabs-header-narrow").addClass(_38.narrow?"tabs-header-narrow":"");
var _3b=_39.find(".tabs");
_3b.removeClass("tabs-pill").addClass(_38.pill?"tabs-pill":"");
_3b.removeClass("tabs-narrow").addClass(_38.narrow?"tabs-narrow":"");
_3b.removeClass("tabs-justified").addClass(_38.justified?"tabs-justified":"");
if(_38.border==true){
_39.removeClass("tabs-header-noborder");
_3a.removeClass("tabs-panels-noborder");
}else{
_39.addClass("tabs-header-noborder");
_3a.addClass("tabs-panels-noborder");
}
_38.doSize=true;
};
function _3c(_3d,_3e,pp){
_3e=_3e||{};
var _3f=$.data(_3d,"tabs");
var _40=_3f.tabs;
if(_3e.index==undefined||_3e.index>_40.length){
_3e.index=_40.length;
}
if(_3e.index<0){
_3e.index=0;
}
var ul=$(_3d).children("div.tabs-header").find("ul.tabs");
var _41=$(_3d).children("div.tabs-panels");
var tab=$("<li>"+"<a href=\"javascript:void(0)\" class=\"tabs-inner\">"+"<span class=\"tabs-title\"></span>"+"<span class=\"tabs-icon\"></span>"+"</a>"+"</li>");
if(!pp){
pp=$("<div></div>");
}
if(_3e.index>=_40.length){
tab.appendTo(ul);
pp.appendTo(_41);
_40.push(pp);
}else{
tab.insertBefore(ul.children("li:eq("+_3e.index+")"));
pp.insertBefore(_41.children("div.panel:eq("+_3e.index+")"));
_40.splice(_3e.index,0,pp);
}
pp.panel($.extend({},_3e,{tab:tab,border:false,noheader:true,closed:true,doSize:false,iconCls:(_3e.icon?_3e.icon:undefined),onLoad:function(){
if(_3e.onLoad){
_3e.onLoad.call(this,arguments);
}
_3f.options.onLoad.call(_3d,$(this));
},onBeforeOpen:function(){
if(_3e.onBeforeOpen){
if(_3e.onBeforeOpen.call(this)==false){
return false;
}
}
var p=$(_3d).tabs("getSelected");
if(p){
if(p[0]!=this){
$(_3d).tabs("unselect",_4a(_3d,p));
p=$(_3d).tabs("getSelected");
if(p){
return false;
}
}else{
_21(_3d);
return false;
}
}
var _42=$(this).panel("options");
_42.tab.addClass("tabs-selected");
var _43=$(_3d).find(">div.tabs-header>div.tabs-wrap");
var _44=_42.tab.position().left;
var _45=_44+_42.tab.outerWidth();
if(_44<0||_45>_43.width()){
var _46=_44-(_43.width()-_42.tab.width())/2;
$(_3d).tabs("scrollBy",_46);
}else{
$(_3d).tabs("scrollBy",0);
}
var _47=$(this).panel("panel");
_47.css("display","block");
_21(_3d);
_47.css("display","none");
},onOpen:function(){
if(_3e.onOpen){
_3e.onOpen.call(this);
}
var _48=$(this).panel("options");
_3f.selectHis.push(_48.title);
_3f.options.onSelect.call(_3d,_48.title,_4a(_3d,this));
},onBeforeClose:function(){
if(_3e.onBeforeClose){
if(_3e.onBeforeClose.call(this)==false){
return false;
}
}
$(this).panel("options").tab.removeClass("tabs-selected");
},onClose:function(){
if(_3e.onClose){
_3e.onClose.call(this);
}
var _49=$(this).panel("options");
_3f.options.onUnselect.call(_3d,_49.title,_4a(_3d,this));
}}));
$(_3d).tabs("update",{tab:pp,options:pp.panel("options"),type:"header"});
};
function _4b(_4c,_4d){
var _4e=$.data(_4c,"tabs");
var _4f=_4e.options;
if(_4d.selected==undefined){
_4d.selected=true;
}
_3c(_4c,_4d);
_4f.onAdd.call(_4c,_4d.title,_4d.index);
if(_4d.selected){
_50(_4c,_4d.index);
}
};
function _51(_52,_53){
_53.type=_53.type||"all";
var _54=$.data(_52,"tabs").selectHis;
var pp=_53.tab;
var _55=pp.panel("options");
var _56=_55.title;
$.extend(_55,_53.options,{iconCls:(_53.options.icon?_53.options.icon:undefined)});
if(_53.type=="all"||_53.type=="body"){
pp.panel();
}
if(_53.type=="all"||_53.type=="header"){
var tab=_55.tab;
if(_55.header){
tab.find(".tabs-inner").html($(_55.header));
}else{
var _57=tab.find("span.tabs-title");
var _58=tab.find("span.tabs-icon");
_57.html(_55.title);
_58.attr("class","tabs-icon");
tab.find("a.tabs-close").remove();
if(_55.closable){
_57.addClass("tabs-closable");
$("<a href=\"javascript:void(0)\" class=\"tabs-close\"></a>").appendTo(tab);
}else{
_57.removeClass("tabs-closable");
}
if(_55.iconCls){
_57.addClass("tabs-with-icon");
_58.addClass(_55.iconCls);
}else{
_57.removeClass("tabs-with-icon");
}
if(_55.tools){
var _59=tab.find("span.tabs-p-tool");
if(!_59.length){
var _59=$("<span class=\"tabs-p-tool\"></span>").insertAfter(tab.find("a.tabs-inner"));
}
if($.isArray(_55.tools)){
_59.empty();
for(var i=0;i<_55.tools.length;i++){
var t=$("<a href=\"javascript:void(0)\"></a>").appendTo(_59);
t.addClass(_55.tools[i].iconCls);
if(_55.tools[i].handler){
t.bind("click",{handler:_55.tools[i].handler},function(e){
if($(this).parents("li").hasClass("tabs-disabled")){
return;
}
e.data.handler.call(this);
});
}
}
}else{
$(_55.tools).children().appendTo(_59);
}
var pr=_59.children().length*12;
if(_55.closable){
pr+=8;
}else{
pr-=3;
_59.css("right","5px");
}
_57.css("padding-right",pr+"px");
}else{
tab.find("span.tabs-p-tool").remove();
_57.css("padding-right","");
}
}
if(_56!=_55.title){
for(var i=0;i<_54.length;i++){
if(_54[i]==_56){
_54[i]=_55.title;
}
}
}
}
_13(_52);
$.data(_52,"tabs").options.onUpdate.call(_52,_55.title,_4a(_52,pp));
};
function _5a(_5b,_5c){
var _5d=$.data(_5b,"tabs").options;
var _5e=$.data(_5b,"tabs").tabs;
var _5f=$.data(_5b,"tabs").selectHis;
if(!_60(_5b,_5c)){
return;
}
var tab=_61(_5b,_5c);
var _62=tab.panel("options").title;
var _63=_4a(_5b,tab);
if(_5d.onBeforeClose.call(_5b,_62,_63)==false){
return;
}
var tab=_61(_5b,_5c,true);
tab.panel("options").tab.remove();
tab.panel("destroy");
_5d.onClose.call(_5b,_62,_63);
_13(_5b);
for(var i=0;i<_5f.length;i++){
if(_5f[i]==_62){
_5f.splice(i,1);
i--;
}
}
var _64=_5f.pop();
if(_64){
_50(_5b,_64);
}else{
if(_5e.length){
_50(_5b,0);
}
}
};
function _61(_65,_66,_67){
var _68=$.data(_65,"tabs").tabs;
if(typeof _66=="number"){
if(_66<0||_66>=_68.length){
return null;
}else{
var tab=_68[_66];
if(_67){
_68.splice(_66,1);
}
return tab;
}
}
for(var i=0;i<_68.length;i++){
var tab=_68[i];
if(tab.panel("options").title==_66){
if(_67){
_68.splice(i,1);
}
return tab;
}
}
return null;
};
function _4a(_69,tab){
var _6a=$.data(_69,"tabs").tabs;
for(var i=0;i<_6a.length;i++){
if(_6a[i][0]==$(tab)[0]){
return i;
}
}
return -1;
};
function _24(_6b){
var _6c=$.data(_6b,"tabs").tabs;
for(var i=0;i<_6c.length;i++){
var tab=_6c[i];
if(tab.panel("options").tab.hasClass("tabs-selected")){
return tab;
}
}
return null;
};
function _6d(_6e){
var _6f=$.data(_6e,"tabs");
var _70=_6f.tabs;
for(var i=0;i<_70.length;i++){
if(_70[i].panel("options").selected){
_50(_6e,i);
return;
}
}
_50(_6e,_6f.options.selected);
};
function _50(_71,_72){
var p=_61(_71,_72);
if(p&&!p.is(":visible")){
_73(_71);
p.panel("open");
}
};
function _74(_75,_76){
var p=_61(_75,_76);
if(p&&p.is(":visible")){
_73(_75);
p.panel("close");
}
};
function _73(_77){
$(_77).children("div.tabs-panels").each(function(){
$(this).stop(true,true);
});
};
function _60(_78,_79){
return _61(_78,_79)!=null;
};
function _7a(_7b,_7c){
var _7d=$.data(_7b,"tabs").options;
_7d.showHeader=_7c;
$(_7b).tabs("resize");
};
function _7e(_7f,_80){
var _81=$(_7f).find(">.tabs-header>.tabs-tool");
if(_80){
_81.removeClass("tabs-tool-hidden").show();
}else{
_81.addClass("tabs-tool-hidden").hide();
}
$(_7f).tabs("resize").tabs("scrollBy",0);
};
$.fn.tabs=function(_82,_83){
if(typeof _82=="string"){
return $.fn.tabs.methods[_82](this,_83);
}
_82=_82||{};
return this.each(function(){
var _84=$.data(this,"tabs");
if(_84){
$.extend(_84.options,_82);
}else{
$.data(this,"tabs",{options:$.extend({},$.fn.tabs.defaults,$.fn.tabs.parseOptions(this),_82),tabs:[],selectHis:[]});
_28(this);
}
_d(this);
_36(this);
_13(this);
_2e(this);
_6d(this);
});
};
$.fn.tabs.methods={options:function(jq){
var cc=jq[0];
var _85=$.data(cc,"tabs").options;
var s=_24(cc);
_85.selected=s?_4a(cc,s):-1;
return _85;
},tabs:function(jq){
return $.data(jq[0],"tabs").tabs;
},resize:function(jq,_86){
return jq.each(function(){
_13(this,_86);
_21(this);
});
},add:function(jq,_87){
return jq.each(function(){
_4b(this,_87);
});
},close:function(jq,_88){
return jq.each(function(){
_5a(this,_88);
});
},getTab:function(jq,_89){
return _61(jq[0],_89);
},getTabIndex:function(jq,tab){
return _4a(jq[0],tab);
},getSelected:function(jq){
return _24(jq[0]);
},select:function(jq,_8a){
return jq.each(function(){
_50(this,_8a);
});
},unselect:function(jq,_8b){
return jq.each(function(){
_74(this,_8b);
});
},exists:function(jq,_8c){
return _60(jq[0],_8c);
},update:function(jq,_8d){
return jq.each(function(){
_51(this,_8d);
});
},enableTab:function(jq,_8e){
return jq.each(function(){
$(this).tabs("getTab",_8e).panel("options").tab.removeClass("tabs-disabled");
});
},disableTab:function(jq,_8f){
return jq.each(function(){
$(this).tabs("getTab",_8f).panel("options").tab.addClass("tabs-disabled");
});
},showHeader:function(jq){
return jq.each(function(){
_7a(this,true);
});
},hideHeader:function(jq){
return jq.each(function(){
_7a(this,false);
});
},showTool:function(jq){
return jq.each(function(){
_7e(this,true);
});
},hideTool:function(jq){
return jq.each(function(){
_7e(this,false);
});
},scrollBy:function(jq,_90){
return jq.each(function(){
var _91=$(this).tabs("options");
var _92=$(this).find(">div.tabs-header>div.tabs-wrap");
var pos=Math.min(_92._scrollLeft()+_90,_93());
_92.animate({scrollLeft:pos},_91.scrollDuration);
function _93(){
var w=0;
var ul=_92.children("ul");
ul.children("li").each(function(){
w+=$(this).outerWidth(true);
});
return w-_92.width()+(ul.outerWidth()-ul.width());
};
});
}};
$.fn.tabs.parseOptions=function(_94){
return $.extend({},$.parser.parseOptions(_94,["tools","toolPosition","tabPosition",{fit:"boolean",border:"boolean",plain:"boolean"},{headerWidth:"number",tabWidth:"number",tabHeight:"number",selected:"number"},{showHeader:"boolean",justified:"boolean",narrow:"boolean",pill:"boolean"}]));
};
$.fn.tabs.defaults={width:"auto",height:"auto",headerWidth:150,tabWidth:"auto",tabHeight:27,selected:0,showHeader:true,plain:false,fit:false,border:true,justified:false,narrow:false,pill:false,tools:null,toolPosition:"right",tabPosition:"top",scrollIncrement:100,scrollDuration:400,onLoad:function(_95){
},onSelect:function(_96,_97){
},onUnselect:function(_98,_99){
},onBeforeClose:function(_9a,_9b){
},onClose:function(_9c,_9d){
},onAdd:function(_9e,_9f){
},onUpdate:function(_a0,_a1){
},onContextMenu:function(e,_a2,_a3){
}};
})(jQuery);


/**
 * jQuery EasyUI 1.4.3
 * 
 * Copyright (c) 2009-2015 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL license: http://www.gnu.org/licenses/gpl.txt
 * To use it on other terms please contact us at info@jeasyui.com
 *
 */
(function($){
function _1(_2){
var _3=$.data(_2,"treegrid");
var _4=_3.options;
$(_2).datagrid($.extend({},_4,{url:null,data:null,loader:function(){
return false;
},onBeforeLoad:function(){
return false;
},onLoadSuccess:function(){
},onResizeColumn:function(_5,_6){
_16(_2);
_4.onResizeColumn.call(_2,_5,_6);
},onBeforeSortColumn:function(_7,_8){
if(_4.onBeforeSortColumn.call(_2,_7,_8)==false){
return false;
}
},onSortColumn:function(_9,_a){
_4.sortName=_9;
_4.sortOrder=_a;
if(_4.remoteSort){
_15(_2);
}else{
var _b=$(_2).treegrid("getData");
_2f(_2,0,_b);
}
_4.onSortColumn.call(_2,_9,_a);
},onClickCell:function(_c,_d){
_4.onClickCell.call(_2,_d,_37(_2,_c));
},onDblClickCell:function(_e,_f){
_4.onDblClickCell.call(_2,_f,_37(_2,_e));
},onRowContextMenu:function(e,_10){
_4.onContextMenu.call(_2,e,_37(_2,_10));
}}));
var _11=$.data(_2,"datagrid").options;
_4.columns=_11.columns;
_4.frozenColumns=_11.frozenColumns;
_3.dc=$.data(_2,"datagrid").dc;
if(_4.pagination){
var _12=$(_2).datagrid("getPager");
_12.pagination({pageNumber:_4.pageNumber,pageSize:_4.pageSize,pageList:_4.pageList,onSelectPage:function(_13,_14){
_4.pageNumber=_13;
_4.pageSize=_14;
_15(_2);
}});
_4.pageSize=_12.pagination("options").pageSize;
}
};
function _16(_17,_18){
var _19=$.data(_17,"datagrid").options;
var dc=$.data(_17,"datagrid").dc;
if(!dc.body1.is(":empty")&&(!_19.nowrap||_19.autoRowHeight)){
if(_18!=undefined){
var _1a=_1b(_17,_18);
for(var i=0;i<_1a.length;i++){
_1c(_1a[i][_19.idField]);
}
}
}
$(_17).datagrid("fixRowHeight",_18);
function _1c(_1d){
var tr1=_19.finder.getTr(_17,_1d,"body",1);
var tr2=_19.finder.getTr(_17,_1d,"body",2);
tr1.css("height","");
tr2.css("height","");
var _1e=Math.max(tr1.height(),tr2.height());
tr1.css("height",_1e);
tr2.css("height",_1e);
};
};
function _1f(_20){
var dc=$.data(_20,"datagrid").dc;
var _21=$.data(_20,"treegrid").options;
if(!_21.rownumbers){
return;
}
dc.body1.find("div.datagrid-cell-rownumber").each(function(i){
$(this).html(i+1);
});
};
function _22(_23){
return function(e){
$.fn.datagrid.defaults.rowEvents[_23?"mouseover":"mouseout"](e);
var tt=$(e.target);
var fn=_23?"addClass":"removeClass";
if(tt.hasClass("tree-hit")){
tt.hasClass("tree-expanded")?tt[fn]("tree-expanded-hover"):tt[fn]("tree-collapsed-hover");
}
};
};
function _24(e){
var tt=$(e.target);
if(tt.hasClass("tree-hit")){
var tr=tt.closest("tr.datagrid-row");
var _25=tr.closest("div.datagrid-view").children(".datagrid-f")[0];
_26(_25,tr.attr("node-id"));
}else{
$.fn.datagrid.defaults.rowEvents.click(e);
}
};
function _27(_28,_29){
var _2a=$.data(_28,"treegrid").options;
var tr1=_2a.finder.getTr(_28,_29,"body",1);
var tr2=_2a.finder.getTr(_28,_29,"body",2);
var _2b=$(_28).datagrid("getColumnFields",true).length+(_2a.rownumbers?1:0);
var _2c=$(_28).datagrid("getColumnFields",false).length;
_2d(tr1,_2b);
_2d(tr2,_2c);
function _2d(tr,_2e){
$("<tr class=\"treegrid-tr-tree\">"+"<td style=\"border:0px\" colspan=\""+_2e+"\">"+"<div></div>"+"</td>"+"</tr>").insertAfter(tr);
};
};
function _2f(_30,_31,_32,_33){
var _34=$.data(_30,"treegrid");
var _35=_34.options;
var dc=_34.dc;
_32=_35.loadFilter.call(_30,_32,_31);
var _36=_37(_30,_31);
if(_36){
var _38=_35.finder.getTr(_30,_31,"body",1);
var _39=_35.finder.getTr(_30,_31,"body",2);
var cc1=_38.next("tr.treegrid-tr-tree").children("td").children("div");
var cc2=_39.next("tr.treegrid-tr-tree").children("td").children("div");
if(!_33){
_36.children=[];
}
}else{
var cc1=dc.body1;
var cc2=dc.body2;
if(!_33){
_34.data=[];
}
}
if(!_33){
cc1.empty();
cc2.empty();
}
if(_35.view.onBeforeRender){
_35.view.onBeforeRender.call(_35.view,_30,_31,_32);
}
_35.view.render.call(_35.view,_30,cc1,true);
_35.view.render.call(_35.view,_30,cc2,false);
if(_35.showFooter){
_35.view.renderFooter.call(_35.view,_30,dc.footer1,true);
_35.view.renderFooter.call(_35.view,_30,dc.footer2,false);
}
if(_35.view.onAfterRender){
_35.view.onAfterRender.call(_35.view,_30);
}
if(!_31&&_35.pagination){
var _3a=$.data(_30,"treegrid").total;
var _3b=$(_30).datagrid("getPager");
if(_3b.pagination("options").total!=_3a){
_3b.pagination({total:_3a});
}
}
_16(_30);
_1f(_30);
$(_30).treegrid("showLines");
$(_30).treegrid("setSelectionState");
$(_30).treegrid("autoSizeColumn");
_35.onLoadSuccess.call(_30,_36,_32);
};
function _15(_3c,_3d,_3e,_3f,_40){
var _41=$.data(_3c,"treegrid").options;
var _42=$(_3c).datagrid("getPanel").find("div.datagrid-body");
if(_3e){
_41.queryParams=_3e;
}
var _43=$.extend({},_41.queryParams);
if(_41.pagination){
$.extend(_43,{page:_41.pageNumber,rows:_41.pageSize});
}
if(_41.sortName){
$.extend(_43,{sort:_41.sortName,order:_41.sortOrder});
}
var row=_37(_3c,_3d);
if(_41.onBeforeLoad.call(_3c,row,_43)==false){
return;
}
var _44=_42.find("tr[node-id=\""+_3d+"\"] span.tree-folder");
_44.addClass("tree-loading");
$(_3c).treegrid("loading");
var _45=_41.loader.call(_3c,_43,function(_46){
_44.removeClass("tree-loading");
$(_3c).treegrid("loaded");
_2f(_3c,_3d,_46,_3f);
if(_40){
_40();
}
},function(){
_44.removeClass("tree-loading");
$(_3c).treegrid("loaded");
_41.onLoadError.apply(_3c,arguments);
if(_40){
_40();
}
});
if(_45==false){
_44.removeClass("tree-loading");
$(_3c).treegrid("loaded");
}
};
function _47(_48){
var _49=_4a(_48);
if(_49.length){
return _49[0];
}else{
return null;
}
};
function _4a(_4b){
return $.data(_4b,"treegrid").data;
};
function _4c(_4d,_4e){
var row=_37(_4d,_4e);
if(row._parentId){
return _37(_4d,row._parentId);
}else{
return null;
}
};
function _1b(_4f,_50){
var _51=$.data(_4f,"treegrid").options;
var _52=$(_4f).datagrid("getPanel").find("div.datagrid-view2 div.datagrid-body");
var _53=[];
if(_50){
_54(_50);
}else{
var _55=_4a(_4f);
for(var i=0;i<_55.length;i++){
_53.push(_55[i]);
_54(_55[i][_51.idField]);
}
}
function _54(_56){
var _57=_37(_4f,_56);
if(_57&&_57.children){
for(var i=0,len=_57.children.length;i<len;i++){
var _58=_57.children[i];
_53.push(_58);
_54(_58[_51.idField]);
}
}
};
return _53;
};
function _59(_5a,_5b){
if(!_5b){
return 0;
}
var _5c=$.data(_5a,"treegrid").options;
var _5d=$(_5a).datagrid("getPanel").children("div.datagrid-view");
var _5e=_5d.find("div.datagrid-body tr[node-id=\""+_5b+"\"]").children("td[field=\""+_5c.treeField+"\"]");
return _5e.find("span.tree-indent,span.tree-hit").length;
};
function _37(_5f,_60){
var _61=$.data(_5f,"treegrid").options;
var _62=$.data(_5f,"treegrid").data;
var cc=[_62];
while(cc.length){
var c=cc.shift();
for(var i=0;i<c.length;i++){
var _63=c[i];
if(_63[_61.idField]==_60){
return _63;
}else{
if(_63["children"]){
cc.push(_63["children"]);
}
}
}
}
return null;
};
function _64(_65,_66){
var _67=$.data(_65,"treegrid").options;
var row=_37(_65,_66);
var tr=_67.finder.getTr(_65,_66);
var hit=tr.find("span.tree-hit");
if(hit.length==0){
return;
}
if(hit.hasClass("tree-collapsed")){
return;
}
if(_67.onBeforeCollapse.call(_65,row)==false){
return;
}
hit.removeClass("tree-expanded tree-expanded-hover").addClass("tree-collapsed");
hit.next().removeClass("tree-folder-open");
row.state="closed";
tr=tr.next("tr.treegrid-tr-tree");
var cc=tr.children("td").children("div");
if(_67.animate){
cc.slideUp("normal",function(){
$(_65).treegrid("autoSizeColumn");
_16(_65,_66);
_67.onCollapse.call(_65,row);
});
}else{
cc.hide();
$(_65).treegrid("autoSizeColumn");
_16(_65,_66);
_67.onCollapse.call(_65,row);
}
};
function _68(_69,_6a){
var _6b=$.data(_69,"treegrid").options;
var tr=_6b.finder.getTr(_69,_6a);
var hit=tr.find("span.tree-hit");
var row=_37(_69,_6a);
if(hit.length==0){
return;
}
if(hit.hasClass("tree-expanded")){
return;
}
if(_6b.onBeforeExpand.call(_69,row)==false){
return;
}
hit.removeClass("tree-collapsed tree-collapsed-hover").addClass("tree-expanded");
hit.next().addClass("tree-folder-open");
var _6c=tr.next("tr.treegrid-tr-tree");
if(_6c.length){
var cc=_6c.children("td").children("div");
_6d(cc);
}else{
_27(_69,row[_6b.idField]);
var _6c=tr.next("tr.treegrid-tr-tree");
var cc=_6c.children("td").children("div");
cc.hide();
var _6e=$.extend({},_6b.queryParams||{});
_6e.id=row[_6b.idField];
_15(_69,row[_6b.idField],_6e,true,function(){
if(cc.is(":empty")){
_6c.remove();
}else{
_6d(cc);
}
});
}
function _6d(cc){
row.state="open";
if(_6b.animate){
cc.slideDown("normal",function(){
$(_69).treegrid("autoSizeColumn");
_16(_69,_6a);
_6b.onExpand.call(_69,row);
});
}else{
cc.show();
$(_69).treegrid("autoSizeColumn");
_16(_69,_6a);
_6b.onExpand.call(_69,row);
}
};
};
function _26(_6f,_70){
var _71=$.data(_6f,"treegrid").options;
var tr=_71.finder.getTr(_6f,_70);
var hit=tr.find("span.tree-hit");
if(hit.hasClass("tree-expanded")){
_64(_6f,_70);
}else{
_68(_6f,_70);
}
};
function _72(_73,_74){
var _75=$.data(_73,"treegrid").options;
var _76=_1b(_73,_74);
if(_74){
_76.unshift(_37(_73,_74));
}
for(var i=0;i<_76.length;i++){
_64(_73,_76[i][_75.idField]);
}
};
function _77(_78,_79){
var _7a=$.data(_78,"treegrid").options;
var _7b=_1b(_78,_79);
if(_79){
_7b.unshift(_37(_78,_79));
}
for(var i=0;i<_7b.length;i++){
_68(_78,_7b[i][_7a.idField]);
}
};
function _7c(_7d,_7e){
var _7f=$.data(_7d,"treegrid").options;
var ids=[];
var p=_4c(_7d,_7e);
while(p){
var id=p[_7f.idField];
ids.unshift(id);
p=_4c(_7d,id);
}
for(var i=0;i<ids.length;i++){
_68(_7d,ids[i]);
}
};
function _80(_81,_82){
var _83=$.data(_81,"treegrid").options;
if(_82.parent){
var tr=_83.finder.getTr(_81,_82.parent);
if(tr.next("tr.treegrid-tr-tree").length==0){
_27(_81,_82.parent);
}
var _84=tr.children("td[field=\""+_83.treeField+"\"]").children("div.datagrid-cell");
var _85=_84.children("span.tree-icon");
if(_85.hasClass("tree-file")){
_85.removeClass("tree-file").addClass("tree-folder tree-folder-open");
var hit=$("<span class=\"tree-hit tree-expanded\"></span>").insertBefore(_85);
if(hit.prev().length){
hit.prev().remove();
}
}
}
_2f(_81,_82.parent,_82.data,true);
};
function _86(_87,_88){
var ref=_88.before||_88.after;
var _89=$.data(_87,"treegrid").options;
var _8a=_4c(_87,ref);
_80(_87,{parent:(_8a?_8a[_89.idField]:null),data:[_88.data]});
var _8b=_8a?_8a.children:$(_87).treegrid("getRoots");
for(var i=0;i<_8b.length;i++){
if(_8b[i][_89.idField]==ref){
var _8c=_8b[_8b.length-1];
_8b.splice(_88.before?i:(i+1),0,_8c);
_8b.splice(_8b.length-1,1);
break;
}
}
_8d(true);
_8d(false);
_1f(_87);
$(_87).treegrid("showLines");
function _8d(_8e){
var _8f=_8e?1:2;
var tr=_89.finder.getTr(_87,_88.data[_89.idField],"body",_8f);
var _90=tr.closest("table.datagrid-btable");
tr=tr.parent().children();
var _91=_89.finder.getTr(_87,ref,"body",_8f);
if(_88.before){
tr.insertBefore(_91);
}else{
var sub=_91.next("tr.treegrid-tr-tree");
tr.insertAfter(sub.length?sub:_91);
}
_90.remove();
};
};
function _92(_93,_94){
var _95=$.data(_93,"treegrid");
$(_93).datagrid("deleteRow",_94);
_1f(_93);
_95.total-=1;
$(_93).datagrid("getPager").pagination("refresh",{total:_95.total});
$(_93).treegrid("showLines");
};
function _96(_97){
var t=$(_97);
var _98=t.treegrid("options");
if(_98.lines){
t.treegrid("getPanel").addClass("tree-lines");
}else{
t.treegrid("getPanel").removeClass("tree-lines");
return;
}
t.treegrid("getPanel").find("span.tree-indent").removeClass("tree-line tree-join tree-joinbottom");
t.treegrid("getPanel").find("div.datagrid-cell").removeClass("tree-node-last tree-root-first tree-root-one");
var _99=t.treegrid("getRoots");
if(_99.length>1){
_9a(_99[0]).addClass("tree-root-first");
}else{
if(_99.length==1){
_9a(_99[0]).addClass("tree-root-one");
}
}
_9b(_99);
_9c(_99);
function _9b(_9d){
$.map(_9d,function(_9e){
if(_9e.children&&_9e.children.length){
_9b(_9e.children);
}else{
var _9f=_9a(_9e);
_9f.find(".tree-icon").prev().addClass("tree-join");
}
});
if(_9d.length){
var _a0=_9a(_9d[_9d.length-1]);
_a0.addClass("tree-node-last");
_a0.find(".tree-join").removeClass("tree-join").addClass("tree-joinbottom");
}
};
function _9c(_a1){
$.map(_a1,function(_a2){
if(_a2.children&&_a2.children.length){
_9c(_a2.children);
}
});
for(var i=0;i<_a1.length-1;i++){
var _a3=_a1[i];
var _a4=t.treegrid("getLevel",_a3[_98.idField]);
var tr=_98.finder.getTr(_97,_a3[_98.idField]);
var cc=tr.next().find("tr.datagrid-row td[field=\""+_98.treeField+"\"] div.datagrid-cell");
cc.find("span:eq("+(_a4-1)+")").addClass("tree-line");
}
};
function _9a(_a5){
var tr=_98.finder.getTr(_97,_a5[_98.idField]);
var _a6=tr.find("td[field=\""+_98.treeField+"\"] div.datagrid-cell");
return _a6;
};
};
$.fn.treegrid=function(_a7,_a8){
if(typeof _a7=="string"){
var _a9=$.fn.treegrid.methods[_a7];
if(_a9){
return _a9(this,_a8);
}else{
return this.datagrid(_a7,_a8);
}
}
_a7=_a7||{};
return this.each(function(){
var _aa=$.data(this,"treegrid");
if(_aa){
$.extend(_aa.options,_a7);
}else{
_aa=$.data(this,"treegrid",{options:$.extend({},$.fn.treegrid.defaults,$.fn.treegrid.parseOptions(this),_a7),data:[]});
}
_1(this);
if(_aa.options.data){
$(this).treegrid("loadData",_aa.options.data);
}
_15(this);
});
};
$.fn.treegrid.methods={options:function(jq){
return $.data(jq[0],"treegrid").options;
},resize:function(jq,_ab){
return jq.each(function(){
$(this).datagrid("resize",_ab);
});
},fixRowHeight:function(jq,_ac){
return jq.each(function(){
_16(this,_ac);
});
},loadData:function(jq,_ad){
return jq.each(function(){
_2f(this,_ad.parent,_ad);
});
},load:function(jq,_ae){
return jq.each(function(){
$(this).treegrid("options").pageNumber=1;
$(this).treegrid("getPager").pagination({pageNumber:1});
$(this).treegrid("reload",_ae);
});
},reload:function(jq,id){
return jq.each(function(){
var _af=$(this).treegrid("options");
var _b0={};
if(typeof id=="object"){
_b0=id;
}else{
_b0=$.extend({},_af.queryParams);
_b0.id=id;
}
if(_b0.id){
var _b1=$(this).treegrid("find",_b0.id);
if(_b1.children){
_b1.children.splice(0,_b1.children.length);
}
_af.queryParams=_b0;
var tr=_af.finder.getTr(this,_b0.id);
tr.next("tr.treegrid-tr-tree").remove();
tr.find("span.tree-hit").removeClass("tree-expanded tree-expanded-hover").addClass("tree-collapsed");
_68(this,_b0.id);
}else{
_15(this,null,_b0);
}
});
},reloadFooter:function(jq,_b2){
return jq.each(function(){
var _b3=$.data(this,"treegrid").options;
var dc=$.data(this,"datagrid").dc;
if(_b2){
$.data(this,"treegrid").footer=_b2;
}
if(_b3.showFooter){
_b3.view.renderFooter.call(_b3.view,this,dc.footer1,true);
_b3.view.renderFooter.call(_b3.view,this,dc.footer2,false);
if(_b3.view.onAfterRender){
_b3.view.onAfterRender.call(_b3.view,this);
}
$(this).treegrid("fixRowHeight");
}
});
},getData:function(jq){
return $.data(jq[0],"treegrid").data;
},getFooterRows:function(jq){
return $.data(jq[0],"treegrid").footer;
},getRoot:function(jq){
return _47(jq[0]);
},getRoots:function(jq){
return _4a(jq[0]);
},getParent:function(jq,id){
return _4c(jq[0],id);
},getChildren:function(jq,id){
return _1b(jq[0],id);
},getLevel:function(jq,id){
return _59(jq[0],id);
},find:function(jq,id){
return _37(jq[0],id);
},isLeaf:function(jq,id){
var _b4=$.data(jq[0],"treegrid").options;
var tr=_b4.finder.getTr(jq[0],id);
var hit=tr.find("span.tree-hit");
return hit.length==0;
},select:function(jq,id){
return jq.each(function(){
$(this).datagrid("selectRow",id);
});
},unselect:function(jq,id){
return jq.each(function(){
$(this).datagrid("unselectRow",id);
});
},collapse:function(jq,id){
return jq.each(function(){
_64(this,id);
});
},expand:function(jq,id){
return jq.each(function(){
_68(this,id);
});
},toggle:function(jq,id){
return jq.each(function(){
_26(this,id);
});
},collapseAll:function(jq,id){
return jq.each(function(){
_72(this,id);
});
},expandAll:function(jq,id){
return jq.each(function(){
_77(this,id);
});
},expandTo:function(jq,id){
return jq.each(function(){
_7c(this,id);
});
},append:function(jq,_b5){
return jq.each(function(){
_80(this,_b5);
});
},insert:function(jq,_b6){
return jq.each(function(){
_86(this,_b6);
});
},remove:function(jq,id){
return jq.each(function(){
_92(this,id);
});
},pop:function(jq,id){
var row=jq.treegrid("find",id);
jq.treegrid("remove",id);
return row;
},refresh:function(jq,id){
return jq.each(function(){
var _b7=$.data(this,"treegrid").options;
_b7.view.refreshRow.call(_b7.view,this,id);
});
},update:function(jq,_b8){
return jq.each(function(){
var _b9=$.data(this,"treegrid").options;
_b9.view.updateRow.call(_b9.view,this,_b8.id,_b8.row);
});
},beginEdit:function(jq,id){
return jq.each(function(){
$(this).datagrid("beginEdit",id);
$(this).treegrid("fixRowHeight",id);
});
},endEdit:function(jq,id){
return jq.each(function(){
$(this).datagrid("endEdit",id);
});
},cancelEdit:function(jq,id){
return jq.each(function(){
$(this).datagrid("cancelEdit",id);
});
},showLines:function(jq){
return jq.each(function(){
_96(this);
});
}};
$.fn.treegrid.parseOptions=function(_ba){
return $.extend({},$.fn.datagrid.parseOptions(_ba),$.parser.parseOptions(_ba,["treeField",{animate:"boolean"}]));
};
var _bb=$.extend({},$.fn.datagrid.defaults.view,{render:function(_bc,_bd,_be){
var _bf=$.data(_bc,"treegrid").options;
var _c0=$(_bc).datagrid("getColumnFields",_be);
var _c1=$.data(_bc,"datagrid").rowIdPrefix;
if(_be){
if(!(_bf.rownumbers||(_bf.frozenColumns&&_bf.frozenColumns.length))){
return;
}
}
var _c2=this;
if(this.treeNodes&&this.treeNodes.length){
var _c3=_c4(_be,this.treeLevel,this.treeNodes);
$(_bd).append(_c3.join(""));
}
function _c4(_c5,_c6,_c7){
var _c8=$(_bc).treegrid("getParent",_c7[0][_bf.idField]);
var _c9=(_c8?_c8.children.length:$(_bc).treegrid("getRoots").length)-_c7.length;
var _ca=["<table class=\"datagrid-btable\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody>"];
for(var i=0;i<_c7.length;i++){
var row=_c7[i];
if(row.state!="open"&&row.state!="closed"){
row.state="open";
}
var css=_bf.rowStyler?_bf.rowStyler.call(_bc,row):"";
var _cb="";
var _cc="";
if(typeof css=="string"){
_cc=css;
}else{
if(css){
_cb=css["class"]||"";
_cc=css["style"]||"";
}
}
var cls="class=\"datagrid-row "+(_c9++%2&&_bf.striped?"datagrid-row-alt ":" ")+_cb+"\"";
var _cd=_cc?"style=\""+_cc+"\"":"";
var _ce=_c1+"-"+(_c5?1:2)+"-"+row[_bf.idField];
_ca.push("<tr id=\""+_ce+"\" node-id=\""+row[_bf.idField]+"\" "+cls+" "+_cd+">");
_ca=_ca.concat(_c2.renderRow.call(_c2,_bc,_c0,_c5,_c6,row));
_ca.push("</tr>");
if(row.children&&row.children.length){
var tt=_c4(_c5,_c6+1,row.children);
var v=row.state=="closed"?"none":"block";
_ca.push("<tr class=\"treegrid-tr-tree\"><td style=\"border:0px\" colspan="+(_c0.length+(_bf.rownumbers?1:0))+"><div style=\"display:"+v+"\">");
_ca=_ca.concat(tt);
_ca.push("</div></td></tr>");
}
}
_ca.push("</tbody></table>");
return _ca;
};
},renderFooter:function(_cf,_d0,_d1){
var _d2=$.data(_cf,"treegrid").options;
var _d3=$.data(_cf,"treegrid").footer||[];
var _d4=$(_cf).datagrid("getColumnFields",_d1);
var _d5=["<table class=\"datagrid-ftable\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody>"];
for(var i=0;i<_d3.length;i++){
var row=_d3[i];
row[_d2.idField]=row[_d2.idField]||("foot-row-id"+i);
_d5.push("<tr class=\"datagrid-row\" node-id=\""+row[_d2.idField]+"\">");
_d5.push(this.renderRow.call(this,_cf,_d4,_d1,0,row));
_d5.push("</tr>");
}
_d5.push("</tbody></table>");
$(_d0).html(_d5.join(""));
},renderRow:function(_d6,_d7,_d8,_d9,row){
var _da=$.data(_d6,"treegrid").options;
var cc=[];
if(_d8&&_da.rownumbers){
cc.push("<td class=\"datagrid-td-rownumber\"><div class=\"datagrid-cell-rownumber\">0</div></td>");
}
for(var i=0;i<_d7.length;i++){
var _db=_d7[i];
var col=$(_d6).datagrid("getColumnOption",_db);
if(col){
var css=col.styler?(col.styler(row[_db],row)||""):"";
var _dc="";
var _dd="";
if(typeof css=="string"){
_dd=css;
}else{
if(cc){
_dc=css["class"]||"";
_dd=css["style"]||"";
}
}
var cls=_dc?"class=\""+_dc+"\"":"";
var _de=col.hidden?"style=\"display:none;"+_dd+"\"":(_dd?"style=\""+_dd+"\"":"");
cc.push("<td field=\""+_db+"\" "+cls+" "+_de+">");
var _de="";
if(!col.checkbox){
if(col.align){
_de+="text-align:"+col.align+";";
}
if(!_da.nowrap){
_de+="white-space:normal;height:auto;";
}else{
if(_da.autoRowHeight){
_de+="height:auto;";
}
}
}
cc.push("<div style=\""+_de+"\" ");
if(col.checkbox){
cc.push("class=\"datagrid-cell-check ");
}else{
cc.push("class=\"datagrid-cell "+col.cellClass);
}
cc.push("\">");
if(col.checkbox){
if(row.checked){
cc.push("<input type=\"checkbox\" checked=\"checked\"");
}else{
cc.push("<input type=\"checkbox\"");
}
cc.push(" name=\""+_db+"\" value=\""+(row[_db]!=undefined?row[_db]:"")+"\">");
}else{
var val=null;
if(col.formatter){
val=col.formatter(row[_db],row);
}else{
val=row[_db];
}
if(_db==_da.treeField){
for(var j=0;j<_d9;j++){
cc.push("<span class=\"tree-indent\"></span>");
}
if(row.state=="closed"){
cc.push("<span class=\"tree-hit tree-collapsed\"></span>");
cc.push("<span class=\"tree-icon tree-folder "+(row.iconCls?row.iconCls:"")+"\"></span>");
}else{
if(row.children&&row.children.length){
cc.push("<span class=\"tree-hit tree-expanded\"></span>");
cc.push("<span class=\"tree-icon tree-folder tree-folder-open "+(row.iconCls?row.iconCls:"")+"\"></span>");
}else{
cc.push("<span class=\"tree-indent\"></span>");
cc.push("<span class=\"tree-icon tree-file "+(row.iconCls?row.iconCls:"")+"\"></span>");
}
}
cc.push("<span class=\"tree-title\">"+val+"</span>");
}else{
cc.push(val);
}
}
cc.push("</div>");
cc.push("</td>");
}
}
return cc.join("");
},refreshRow:function(_df,id){
this.updateRow.call(this,_df,id,{});
},updateRow:function(_e0,id,row){
var _e1=$.data(_e0,"treegrid").options;
var _e2=$(_e0).treegrid("find",id);
$.extend(_e2,row);
var _e3=$(_e0).treegrid("getLevel",id)-1;
var _e4=_e1.rowStyler?_e1.rowStyler.call(_e0,_e2):"";
var _e5=$.data(_e0,"datagrid").rowIdPrefix;
var _e6=_e2[_e1.idField];
function _e7(_e8){
var _e9=$(_e0).treegrid("getColumnFields",_e8);
var tr=_e1.finder.getTr(_e0,id,"body",(_e8?1:2));
var _ea=tr.find("div.datagrid-cell-rownumber").html();
var _eb=tr.find("div.datagrid-cell-check input[type=checkbox]").is(":checked");
tr.html(this.renderRow(_e0,_e9,_e8,_e3,_e2));
tr.attr("style",_e4||"");
tr.find("div.datagrid-cell-rownumber").html(_ea);
if(_eb){
tr.find("div.datagrid-cell-check input[type=checkbox]")._propAttr("checked",true);
}
if(_e6!=id){
tr.attr("id",_e5+"-"+(_e8?1:2)+"-"+_e6);
tr.attr("node-id",_e6);
}
};
_e7.call(this,true);
_e7.call(this,false);
$(_e0).treegrid("fixRowHeight",id);
},deleteRow:function(_ec,id){
var _ed=$.data(_ec,"treegrid").options;
var tr=_ed.finder.getTr(_ec,id);
tr.next("tr.treegrid-tr-tree").remove();
tr.remove();
var _ee=del(id);
if(_ee){
if(_ee.children.length==0){
tr=_ed.finder.getTr(_ec,_ee[_ed.idField]);
tr.next("tr.treegrid-tr-tree").remove();
var _ef=tr.children("td[field=\""+_ed.treeField+"\"]").children("div.datagrid-cell");
_ef.find(".tree-icon").removeClass("tree-folder").addClass("tree-file");
_ef.find(".tree-hit").remove();
$("<span class=\"tree-indent\"></span>").prependTo(_ef);
}
}
function del(id){
var cc;
var _f0=$(_ec).treegrid("getParent",id);
if(_f0){
cc=_f0.children;
}else{
cc=$(_ec).treegrid("getData");
}
for(var i=0;i<cc.length;i++){
if(cc[i][_ed.idField]==id){
cc.splice(i,1);
break;
}
}
return _f0;
};
},onBeforeRender:function(_f1,_f2,_f3){
if($.isArray(_f2)){
_f3={total:_f2.length,rows:_f2};
_f2=null;
}
if(!_f3){
return false;
}
var _f4=$.data(_f1,"treegrid");
var _f5=_f4.options;
if(_f3.length==undefined){
if(_f3.footer){
_f4.footer=_f3.footer;
}
if(_f3.total){
_f4.total=_f3.total;
}
_f3=this.transfer(_f1,_f2,_f3.rows);
}else{
function _f6(_f7,_f8){
for(var i=0;i<_f7.length;i++){
var row=_f7[i];
row._parentId=_f8;
if(row.children&&row.children.length){
_f6(row.children,row[_f5.idField]);
}
}
};
_f6(_f3,_f2);
}
var _f9=_37(_f1,_f2);
if(_f9){
if(_f9.children){
_f9.children=_f9.children.concat(_f3);
}else{
_f9.children=_f3;
}
}else{
_f4.data=_f4.data.concat(_f3);
}
this.sort(_f1,_f3);
this.treeNodes=_f3;
this.treeLevel=$(_f1).treegrid("getLevel",_f2);
},sort:function(_fa,_fb){
var _fc=$.data(_fa,"treegrid").options;
if(!_fc.remoteSort&&_fc.sortName){
var _fd=_fc.sortName.split(",");
var _fe=_fc.sortOrder.split(",");
_ff(_fb);
}
function _ff(rows){
rows.sort(function(r1,r2){
var r=0;
for(var i=0;i<_fd.length;i++){
var sn=_fd[i];
var so=_fe[i];
var col=$(_fa).treegrid("getColumnOption",sn);
var _100=col.sorter||function(a,b){
return a==b?0:(a>b?1:-1);
};
r=_100(r1[sn],r2[sn])*(so=="asc"?1:-1);
if(r!=0){
return r;
}
}
return r;
});
for(var i=0;i<rows.length;i++){
var _101=rows[i].children;
if(_101&&_101.length){
_ff(_101);
}
}
};
},transfer:function(_102,_103,data){
var opts=$.data(_102,"treegrid").options;
var rows=[];
for(var i=0;i<data.length;i++){
rows.push(data[i]);
}
var _104=[];
for(var i=0;i<rows.length;i++){
var row=rows[i];
if(!_103){
if(!row._parentId){
_104.push(row);
rows.splice(i,1);
i--;
}
}else{
if(row._parentId==_103){
_104.push(row);
rows.splice(i,1);
i--;
}
}
}
var toDo=[];
for(var i=0;i<_104.length;i++){
toDo.push(_104[i]);
}
while(toDo.length){
var node=toDo.shift();
for(var i=0;i<rows.length;i++){
var row=rows[i];
if(row._parentId==node[opts.idField]){
if(node.children){
node.children.push(row);
}else{
node.children=[row];
}
toDo.push(row);
rows.splice(i,1);
i--;
}
}
}
return _104;
}});
$.fn.treegrid.defaults=$.extend({},$.fn.datagrid.defaults,{treeField:null,lines:false,animate:false,singleSelect:true,view:_bb,rowEvents:$.extend({},$.fn.datagrid.defaults.rowEvents,{mouseover:_22(true),mouseout:_22(false),click:_24}),loader:function(_105,_106,_107){
var opts=$(this).treegrid("options");
if(!opts.url){
return false;
}
$.ajax({type:opts.method,url:opts.url,data:_105,dataType:"json",success:function(data){
_106(data);
},error:function(){
_107.apply(this,arguments);
}});
},loadFilter:function(data,_108){
return data;
},finder:{getTr:function(_109,id,type,_10a){
type=type||"body";
_10a=_10a||0;
var dc=$.data(_109,"datagrid").dc;
if(_10a==0){
var opts=$.data(_109,"treegrid").options;
var tr1=opts.finder.getTr(_109,id,type,1);
var tr2=opts.finder.getTr(_109,id,type,2);
return tr1.add(tr2);
}else{
if(type=="body"){
var tr=$("#"+$.data(_109,"datagrid").rowIdPrefix+"-"+_10a+"-"+id);
if(!tr.length){
tr=(_10a==1?dc.body1:dc.body2).find("tr[node-id=\""+id+"\"]");
}
return tr;
}else{
if(type=="footer"){
return (_10a==1?dc.footer1:dc.footer2).find("tr[node-id=\""+id+"\"]");
}else{
if(type=="selected"){
return (_10a==1?dc.body1:dc.body2).find("tr.datagrid-row-selected");
}else{
if(type=="highlight"){
return (_10a==1?dc.body1:dc.body2).find("tr.datagrid-row-over");
}else{
if(type=="checked"){
return (_10a==1?dc.body1:dc.body2).find("tr.datagrid-row-checked");
}else{
if(type=="last"){
return (_10a==1?dc.body1:dc.body2).find("tr:last[node-id]");
}else{
if(type=="allbody"){
return (_10a==1?dc.body1:dc.body2).find("tr[node-id]");
}else{
if(type=="allfooter"){
return (_10a==1?dc.footer1:dc.footer2).find("tr[node-id]");
}
}
}
}
}
}
}
}
}
},getRow:function(_10b,p){
var id=(typeof p=="object")?p.attr("node-id"):p;
return $(_10b).treegrid("find",id);
},getRows:function(_10c){
return $(_10c).treegrid("getChildren");
}},onBeforeLoad:function(row,_10d){
},onLoadSuccess:function(row,data){
},onLoadError:function(){
},onBeforeCollapse:function(row){
},onCollapse:function(row){
},onBeforeExpand:function(row){
},onExpand:function(row){
},onClickRow:function(row){
},onDblClickRow:function(row){
},onClickCell:function(_10e,row){
},onDblClickCell:function(_10f,row){
},onContextMenu:function(e,row){
},onBeforeEdit:function(row){
},onAfterEdit:function(row,_110){
},onCancelEdit:function(row){
}});
})(jQuery);


if ($.fn.pagination){
	$.fn.pagination.defaults.beforePageText = '第';
	$.fn.pagination.defaults.afterPageText = '共{pages}页';
	$.fn.pagination.defaults.displayMsg = '显示{from}到{to},共{total}记录';
}
if ($.fn.datagrid){
	$.fn.datagrid.defaults.loadMsg = '正在处理，请稍待。。。';
}
if ($.fn.treegrid && $.fn.datagrid){
	$.fn.treegrid.defaults.loadMsg = $.fn.datagrid.defaults.loadMsg;
}
if ($.messager){
	$.messager.defaults.ok = '确定';
	$.messager.defaults.cancel = '取消';
}
$.map(['validatebox','textbox','filebox','searchbox',
		'combo','combobox','combogrid','combotree',
		'datebox','datetimebox','numberbox',
		'spinner','numberspinner','timespinner','datetimespinner'], function(plugin){
	if ($.fn[plugin]){
		$.fn[plugin].defaults.missingMessage = '该输入项为必输项';
	}
});
if ($.fn.validatebox){
	$.fn.validatebox.defaults.rules.email.message = '请输入有效的电子邮件地址';
	$.fn.validatebox.defaults.rules.url.message = '请输入有效的URL地址';
	$.fn.validatebox.defaults.rules.length.message = '输入内容长度必须介于{0}和{1}之间';
	$.fn.validatebox.defaults.rules.remote.message = '请修正该字段';
}
if ($.fn.calendar){
	$.fn.calendar.defaults.weeks = ['日','一','二','三','四','五','六'];
	$.fn.calendar.defaults.months = ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'];
}
if ($.fn.datebox){
	$.fn.datebox.defaults.currentText = '今天';
	$.fn.datebox.defaults.closeText = '关闭';
	$.fn.datebox.defaults.okText = '确定';
	$.fn.datebox.defaults.formatter = function(date){
		var y = date.getFullYear();
		var m = date.getMonth()+1;
		var d = date.getDate();
		return y+'-'+(m<10?('0'+m):m)+'-'+(d<10?('0'+d):d);
	};
	$.fn.datebox.defaults.parser = function(s){
		if (!s) return new Date();
		var ss = s.split('-');
		var y = parseInt(ss[0],10);
		var m = parseInt(ss[1],10);
		var d = parseInt(ss[2],10);
		if (!isNaN(y) && !isNaN(m) && !isNaN(d)){
			return new Date(y,m-1,d);
		} else {
			return new Date();
		}
	};
}
if ($.fn.datetimebox && $.fn.datebox){
	$.extend($.fn.datetimebox.defaults,{
		currentText: $.fn.datebox.defaults.currentText,
		closeText: $.fn.datebox.defaults.closeText,
		okText: $.fn.datebox.defaults.okText
	});
}
if ($.fn.datetimespinner){
	$.fn.datetimespinner.defaults.selections = [[0,4],[5,7],[8,10],[11,13],[14,16],[17,19]]
}
