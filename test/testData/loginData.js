

const envSpecificLoginData = {
    dev: {
        username: 'standard_user',
        password :'secret_sauce',
        expectedMessage: 'Welcome, dev_user!', // Expected message for assertions
    },
    qa: {
        username: 'standard_user',
        password :'secret_sauce',
        expectedMessage: 'Welcome, qa_user!',
    },
    prod: {
        username: 'standard_user',
        password :'secret_sauce',
        expectedMessage: 'Welcome, prod_user!',
    },
};

export default envSpecificLoginData;