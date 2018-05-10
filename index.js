/**
 * Example problem with existing solution and passing test.
 * See problem 0 in the spec file for the assertion
 * @returns {string}
 */
exports.example = () => 'hello world'

exports.stripPrivateProperties = (privateProperties, users) => 
	users.map(user =>
		// I've destructured the object as the accumulator to avoid mutating the original object
        privateProperties.reduce((cleanedUser, property) => {
			delete cleanedUser[property]
			return cleanedUser
		}, {...user})
    )

exports.excludeByProperty = (exclusionProperty, objectsArray) =>
	objectsArray.filter(obj => 
		// This will filter out objects with the specified key, even if the value at that location is falsy
		// I opted for this solution because the specs ask for the existence of a property, not the values truthiness
		!obj.hasOwnProperty(exclusionProperty)
	)

exports.sumDeep = (objectsArray) => {
	// This function makes the assumption that the data structure will stay the same,
	// but also allows for summing multiple properties as long as the summable property is 'val'

	const getValueArraySums = (array) =>
		array.reduce((acc, obj) => {
			const number = obj.val && parseInt(obj.val)
			if (number) {
				return acc + number
			}
			return acc
		}, 0)

	return objectsArray.map(item => 
		Object.keys(item).reduce((objSums, property) => {
			objSums[property] = getValueArraySums(item[property])
			return objSums
		}, {})
	)
}

exports.applyStatusColor = (colorMap, statuses) => {
	const statusColorMap = Object.keys(colorMap).reduce((statusColors, color) => {
		colorMap[color].forEach(status => {
			statusColors[status] = color
		})
		return statusColors
	}, {})

	return statuses
		.filter(item => statusColorMap[item.status])
		.map(item => ({
			status: item.status,
			color: statusColorMap[item.status]
		}))
}

exports.createGreeting = (greeterFunc, greeting) => name =>
	greeterFunc(greeting, name)

exports.setDefaults = defaults => item => 
	// I've destructured the object as the accumulator to avoid mutating the original object
	Object.keys(defaults).reduce((updatedItem, property) => {
		updatedItem[property] = item.hasOwnProperty(property)
			? item[property]
			: defaults[property]
		return updatedItem
	}, {...item})

exports.sanitizeUser = user => {
	// Create a helper that converts the users name to an array
	// The users name is their full name. We want easy access to the first name.
    const getFirstName = name => 
        name ? name.toString().split(' ')[0] : ''

	// Ensure a user has an `fullAddress` property by combining `address.streetNum, address.streetName, address.suburb`
	const createFullAddress = address =>
		// This assumes that we will have each address property, if the address object exists
		// because trying to account for addresses can be a complex discussion
		address ? `${address.num} ${address.street}, ${address.suburb}` : ''

    // The given user always returns the `monthJoined` as 0 to 11. We need it to be 1 to 12 so add 1.
	const offsetMonth = month => parseInt(month) + 1

	const { name, address, monthJoined } = user
	
    return {
		name,
		address,
		firstName: user.firstName || getFirstName(name),
		fullAddress: user.fullAddress || createFullAddress(address),
		monthJoined: offsetMonth(monthJoined)
	}
}

