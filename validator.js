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

    changeWouldYieldEmptyArray(newHobby, currentHobbies) {
        const changeYieldsEmptyArray =
            currentHobbies.includes(newHobby) && currentHobbies.length === 1;
        if (changeYieldsEmptyArray) {
            return true;
        } else {
            return false;
        }
    }

    wellFormedHobby(hobby) {
        const malformedSelection = hobby.includes("\n");
        if (malformedSelection) {
            return false;
        }
        return true;
    }

    validDrivesCar(drives) {
        if (drives == "Yes" || drives == "No") {
            return true;
        } else {
            return false;
        }
    }

    validYearsExperience(years) {
        console.log(typeof years, years, 34);
        if (years !== null && years >= 0) {
            return true;
        } else {
            return false;
        }
    }
}
