export default function useStateCode(stateName) {
	const states = {
		Alabama: 'AL',
		Alaska: 'AK',
		Arizona: 'AZ',
		Arkansas: 'AR',
		California: 'CA',
		Colorado: 'CO',
		Connecticut: 'CT',
		Delaware: 'DE',
		'District of Columbia': 'D.C.',
		Florida: 'FL',
		Georgia: 'GA',
		Hawaii: 'HI',
		Idaho: 'ID',
		Illinois: 'IL',
		Indiana: 'IN',
		Iowa: 'IA',
		Kansas: 'KS',
		Kentucky: 'KY',
		Louisiana: 'LA',
		Maine: 'ME',
		Maryland: 'MD',
		Massachusetts: 'MA',
		Michigan: 'MI',
		Minnesota: 'MN',
		Mississippi: 'MS',
		Missouri: 'MO',
		Montana: 'MT',
		Nebraska: 'NE',
		Nevada: 'NV',
		'New Hampshire': 'NH',
		'New Jersey': 'NJ',
		'New Mexico': 'NM',
		'New York': 'NY',
		'North Carolina': 'NC',
		'North Dakota': 'ND',
		Ohio: 'OH',
		Oklahoma: 'OK',
		Oregon: 'OR',
		Pennsylvania: 'PA',
		'Rhode Island': 'RI',
		'South Carolina': 'SC',
		'South Dakota': 'SD',
		Tennessee: 'TN',
		Texas: 'TX',
		Utah: 'UT',
		Vermont: 'VT',
		Virginia: 'VA',
		Washington: 'WA',
		'West Virginia': 'WV',
		Wisconsin: 'WI',
		Wyoming: 'WY',
	}

	if (stateName === 'District of Columbia') {
		return 'D.C.'
	}

	// define array of words to not capitalize
	const doNotCapitalize = ['and', 'of', 'the']

	// convert state name to title case for better matching
	const stateTitleCase = stateName
		.toLowerCase()
		.split(' ')
		.map((word) => {
			if (doNotCapitalize.includes(word)) {
				return word.toLowerCase()
			}
			return word.charAt(0).toUpperCase() + word.slice(1)
		})
		.join(' ')

	// check if the state exists in the states object
	if (states[stateTitleCase]) {
		return states[stateTitleCase]
	} else {
		return
	}
}
