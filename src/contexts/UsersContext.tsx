import { createContext, useState, useReducer, useEffect } from "react";

import { User, UsersContextTypes, ChildrenProp, UsersReducerActionTypes } from "../types";

const reducer = (state: User[], action: UsersReducerActionTypes): User[] => {
    switch (action.type) {
        case 'setData':
            return action.data;
        case 'addUser':
            fetch(`http://localhost:8080/users`, {
                method: "POST",
                headers: {
                    "Content-Type": "application.json"
                },
                body: JSON.stringify(action.newUser)
            })
            return [...state, action.newUser];
        default:
            return state;
    }
};

const UsersContext = createContext<UsersContextTypes | undefined>(undefined);

const UsersProvider = ({ children }: ChildrenProp) => {

    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
    const [users, dispatch] = useReducer(reducer, []);

    useEffect(() => {
        fetch(`http://localhost:8080/users`)
            .then(res => res.json())
            .then((data: User[]) => {
                dispatch({
                    type: 'setData',
                    data: data
                });
                setLoggedInUser(null);
            })
    }, []);

    return (
        <UsersContext.Provider
            value={{
                loggedInUser,
                setLoggedInUser,
                users,
                dispatch
            }}>
            {children}
        </UsersContext.Provider>
    )
}

export { UsersProvider };
export default UsersContext;