{
	function type(type, value, text) {
		return {type, value, text}
	}

	function flatten(values) {
		return [values[0]].concat(values[1].map(v => v[1]))
	}

	function resolve(result) {
		const resolveString = (val) => type("ws", val, val)
		const resolveArray = (val) => type("group", val, val.map(v => v.text).join(','))
		let pos = 0
		return result
			.map(val => typeof val == "string" ? resolveString(val) : resolveArray(val))
			.map(val => {
				const cursor = [pos, pos + val.text.length - 1]
				pos += val.text.length
				return {...val, cursor}
			})
	}
}

start = result:(minute _ hour _ date _ month _ day) {
	return resolve(result)
}

minute = common
hour = common
date = common
month = v:(monthTypes ("," monthTypes)*) {
	return flatten(v)
}
day = v:(dayTypes ("," dayTypes)*) {
	return flatten(v)
}
common = v:(commonTypes ("," commonTypes)*) {
	return flatten(v)
}

commonTypes = range / number / any
monthTypes = commonTypes / altMonths
dayTypes = commonTypes / altDays

int = n:([0-9]+) {
	return parseInt(n.join(''))
}

days = "MON" / "TUE" / "WED" / "THU" / "FRI" / "SAT" / "SUN"
months = "JAN" / "FEB" / "MAR" / "APR" / "MAY" / "JUN" / "JUL" / "AUG" / "SEP" / "OCT" / "NOV" / "DEC"

number = v:(int step?) {
	let text = `${v[0]}`
	if (v[1]) text += `/${v[1]}`
	return type("number", {number: v[0], step: v[1]}, text)
}

range = v:(int "-" int step?) {
	let text = `${v[0]}-${v[2]}`
	if (v[3]) text += `/${v[3]}`
	return type("range", {from: v[0], to:v[2], step: v[3]}, text)
}

step = v:("/" int) {
	return v[1]
}

altDays = v:(days ("," days)*) {
	const value = [v[0]].concat(v[1].map(s => s[1]))
	return type("days", value, value.join(','))
}

altMonths = v:(months ("," months)*) {
	const value = [v[0]].concat(v[1].map(s => s[1]))
	return type("months", value, value.join(','))
}

any = "*" {
	return type("any", true, '*')
}

_ "whitespace" = ws:([ \t]*) {
	return ws.join('')
}