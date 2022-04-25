module.exports = {
    title: {
        error: 'Error',
        info: 'Information',
        success: 'Success'
    },
    error: {
        // genral
        anUnexpectedErrorHasOccurred: 'An unexpected error has occurred',
        // auth
        theUserDoesNotExist: 'The user does not exist.',
        incorrectPassword: 'The password is incorrect.',
        usernameIsInvalid: 'The username is invalid.' + '\n' + 'Only use (a-z) and (.) or Space.',
        usernameIsAlreadyRegistered: 'The username is already registered.',
        emailAddressIsAlreadyInUse: 'the email address is already in use.',
        weNeedYouToTellUsWhyYouWantToJoinUs: 'we need you to tell us, why you want to join us?',
        tellUsHowYouFoundUs: 'Tell us how you found us.',
        wayDiscoverUsIsInvalid: 'The way discover us is invalid.',
        // profile
        theRoleToWhichYouApplyDoesNotExistOrYouAreNotQualified: 'The role to which you apply does not exist or you are not qualified.',
        anErrorOccurredWhileCreatingYourRequest: 'An error occurred while creating your request',
        youAlreadyOccupyThatRole: 'You already occupy that role.'
    },
    info: {
        // profile
        youAlreadyHaveAPendingRoleRequest: 'You already have a pending role request.'
    },
    success: {
        // profile
        yourEmailHasBeenChangedSuccessfully: 'Your email has been changed successfully.',
        yourPasswordHasBeenSuccessfullyUpdated: 'Your password has been successfully updated.',
        yourLanguageHasBeenUpdated: 'Your language has been updated.',
        yourRoleRequestHasBeenGenerated: 'Your role request has been generated.'
    },
    btn: 'Close'
}