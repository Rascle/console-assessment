/**
 * Example problem with existing solution and passing test.
 * See problem 0 in the spec file for the assertion
 * @returns {string}
 */
exports.example = () => {
    return 'hello world';
};

exports.stripPrivateProperties = (privateProperties, users) => {
    return users.map(user => {
        return privateProperties.reduce((cleanedUser, property) => {
			delete cleanedUser[property]
			return cleanedUser
		}, {...user})
    })
};

exports.excludeByProperty = (exclusionProperty, objectsArray) => {
	return objectsArray.filter(obj => {
		//This will filter out objects with the specified key, even if the value at that location is falsy
		//I opted for this solution because the specs ask for the existence of a property, not the values truthiness
		return !obj.hasOwnProperty(exclusionProperty)
	})
};
exports.sumDeep = (objectsArray) => {
	function getValueArraySums(array) {
		return array.reduce((acc, obj) => {
			return Number.isInteger(obj.val) ? (acc + obj.val) : acc
		}, 0)
	}

	return objectsArray.map(obj => {
		return Object.keys(obj).reduce((objSums, property) => {
			objSums[property] = getValueArraySums(obj.objects)
			return objSums
		}, {})
	})
};
exports.applyStatusColor = (colorMap, statuses) => {
	function getStatusColor(status) {
		return Object.keys(colorMap).find(color => 
			colorMap[color].indexOf(status) >= 0
		)
	}

	return statuses.reduce((updatedStatuses, statusObj) => {
		statusObj.color = getStatusColor(statusObj.status)
		statusObj.color && updatedStatuses.push(statusObj)
		return updatedStatuses
	}, [])
};
exports.createGreeting = (greeterFunc, greeting) => {
	return (name) => {
		return greeterFunc(greeting, name)
	}
};
exports.setDefaults = (defaults) => {
	return (user) => {
		return Object.keys(defaults).reduce((updatedUser, property) => {
			user[property] = user.hasOwnProperty(property) ? user[property] : defaults[property]
			return updatedUser
		}, user)
	}
};

exports.sanitizeUser = (user) => {
    // Create a helper that converts the users name to an array
    function getFirstName(name) {
        return name ? name.toString().split(' ')[0] : ''
    }

	// Ensure a user has an `fullAddress` property by combining `address.streetNum, address.streetName, address.suburb`
	function getFullAddress(address) {
		if (!address) return ''

		const addressProperties = ['num', 'street', 'suburb']

		const fullAddress = addressProperties.reduce((addressArray, property) => {
			address[property] && addressArray.push(`${address[property]}${property === 'street' ? ',' : ''}`)
			return addressArray
		}, [])
		return fullAddress.length ? fullAddress.join(' ') : ''
	}

	function offsetMonth(month) {
		return Number.isInteger(+month) && 0 <= month < 12 ? month + 1 : -1
	}

	user.fullAddress = user.fullAddress || getFullAddress(user.address)

    // The given user always returns the `monthJoined` as 0 to 11. We need it to be 1 to 12 so add 1.
    user.monthJoined = offsetMonth(user.monthJoined);

    // The users name is their full name. We want easy access to the first name.
    user.firstName = getFirstName(user.name)

    return user;
};

