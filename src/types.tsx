export type User = {
    id: string,
    username: string,
    email: string,
    password: string,
    passwordText: string,
    dob: string,
    role: "admin" | "user"
};

export type ChildrenProp = {
    children: React.ReactElement
};

export type UsersReducerActionTypes =
    { type: 'setData', data: User[] } |
    { type: 'addUser', newUser: User };

export type UsersContextTypes = {
    users: User[],
    loggedInUser: User | null,
    setLoggedInUser: React.Dispatch<React.SetStateAction<User | null>>,
    dispatch: React.ActionDispatch<[action: UsersReducerActionTypes]>
};

