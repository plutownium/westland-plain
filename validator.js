class Validator {
    // helper methods to validate form inputs
    validName(name) {
        return name.length >= 2;
    }

    validHasChildren(hasChildren) {
        if (hasChildren == "Yes" || hasChildren == "No") {
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
        if (drives == "Yes" || drives == "No") {
            return true;
        } else {
            return false;
        }
    }

    validYearsExperience(years) {
        console.log(typeof years, years.length, 34);
        if (years.length > 0) {
            return true;
        } else {
            return false;
        }
    }
}
