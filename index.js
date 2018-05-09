/**
 * Example problem with existing solution and passing test.
 * See problem 0 in the spec file for the assertion
 * @returns {string}
 */
exports.example = () => {
    return 'hello world';
};

exports.stripPrivateProperties = (privateProperties, objectsArray) => {
    return objectsArray.map(obj => {
        let strippedObj = {}
        for (const key in obj) {
            if (privateProperties.indexOf(key) < 0) {
				strippedObj[key] = obj[key]
			}
        }
        return strippedObj
    })
};

exports.excludeByProperty = (ignoreWithKey, objectsArray) => {
	return objectsArray.filter(obj => {
		//This will filter out objects with the specified key, even if they value at that location is falsy
		return !obj.hasOwnProperty(ignoreWithKey)
	})
};
exports.sumDeep = (objectsArray) => {
	function getNestedValueSums (array) {
		return array.reduce((acc, obj) => {
			return Number.isInteger(obj.val) ? (acc + obj.val) : acc
		}, 0)
	}

	return objectsArray.map(obj => {
		return {
			objects: getNestedValueSums(obj.objects)
		}
	})
};
exports.applyStatusColor = (colorMap, statuses) => {
	function getStatusColor (status) {
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

exports.sanitizeUser = () => {
    var foundUsersFirstname;

    // Create a helper that converts the users name to an array
    function getNameArray() {
        return user.name.split('');
    }

    // Ensure a user has an `fullAddress` property by combining `address.streetNum, address.streetName, address.suburb`
    if (user.address.num && user.address.street && user.address.suburb) {
        user.fullAddress = user.address.num + ' ' + user.address.street + ', ' + user.address.suburb;
    }

    // The given user always returns the `monthJoined` as 0 to 11. We need it to be 1 to 12 so add 1.
    user.monthJoined = user.monthJoined + 1;

    // The users name is their full name. We want easy access to the first name.
    for (i = 0; i < getNameArray().length; i++) {

        // Make sure `firstName` exists and is a String
        if (!user.firstName) user.firstName = '';

        // We can detect the first name by assuming it is separated with a space. So check if the current character is a space.
        if (!foundUsersFirstname) foundUsersFirstname = getNameArray()[i] != ' ' ? false : true;

        // If we haven't found the first name yet, append the next character
        if (getNameArray()[i] && !foundUsersFirstname) {
            user.firstName = user.firstName + getNameArray()[i];
        }
    }

    return user;
};

