class Validator {
    // helper methods to validate form inputs
    validName(name) {
        return name.length > 1;
    }

    validHasChildren(hasChildren) {
        if (hasChildren === true || hasChildren === false) {
            return true;
        } else {
            return false;
        }
    }

    validHobbies(currentHobbies, newHobby) {
        const changeYieldsEmptyArray =
            currentHobbies.includes(newHobby) && currentHobbies.length === 1;
        if (changeYieldsEmptyArray) {
            return false;
        } else {
            return true;
        }
    }

    validDrivesCar(drives) {
        if (drives === true || drives === false) {
            return true;
        } else {
            return false;
        }
    }

    validYearsExperience(years) {
        if (years === null) {
            return false;
        } else {
            return true;
        }
    }
}
